<template>
  <div class="page diy-page">
    <img class="logo" :src="logo" alt="">
    <swiper :options="swiperOption" ref="mySwiper" :prevent="true">
      <swiper-slide>
        <div id="left-container" ref="left_side1" style="width: 100%"></div>
      </swiper-slide>
      <swiper-slide>
        <div id="right-container" ref="right_side1" style="width: 100%"></div>
      </swiper-slide>
      <swiper-slide>
        <div id="front-container" ref="front_side1" style="width: 100%"></div>
      </swiper-slide>
      <swiper-slide>
        <div id="back-container" ref="back_side1" style="width: 100%"></div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <a
      class="hammer-container"
      v-hammer:pan="onPan"
      v-hammer:pinch="onPinch"></a>
    <button class="btn-finished" @click="complete"><img :src="finished" alt=""></button>
    <div class="side-container">
      <div class="side-items flex-wrp">
        <div class="flex-item">
          <div class="side-item" :class="side == 1 ? 'active' : null"><button @click="goSide(1)" class="side-left"><img :src="text_left" alt=""></button></div>
        </div>
        <div class="flex-item">
          <div class="side-item" :class="side == 2 ? 'active' : null"><button @click="goSide(2)" class="side-left"><img :src="text_right" alt=""></button></div>
        </div>
        <div class="flex-item">
          <div class="side-item" :class="side == 3 ? 'active' : null"><button @click="goSide(3)" class="side-left"><img :src="text_front" alt=""></button></div>
        </div>
        <div class="flex-item">
          <div class="side-item" :class="side == 4 ? 'active' : null"><button @click="goSide(4)" class="side-left"><img :src="text_back" alt=""></button></div>
        </div>
      </div>

      <div class="parts-container">
        <div class="side-parts"
          v-for="(sidePart, index) in sideParts"
          v-bind:key="'side'+index"
          v-show="side == index + 1">
          <span class="part-item"
            :class="part.code == currentPart ? 'active' : null"
            v-for="(part, n) in sidePart"
            v-bind:key="'part'+n"
            @click="setCurrentPart(part.code)">{{part.name}}</span>
        </div>
      </div>
    </div>
    <div class="diy-picker" ref="BScroll">
      <div class="diy-picker-scroll" :class="(currentPart == 'left_part_1' || currentPart == 'right_part_1') ? 'has-file' : null">
        <div class="diy-file" id="container1">
          <div class="text"><span>自定义图案</span><p>推荐宝宝的画</p></div>
          <button class="add-file" id="selectfiles1"><img :src="file" alt=""></button>
          <a id="postfiles1" href="javascript:void(0);"></a>
        </div>
        <div class="colors">
          <span>颜色({{colors.length}})</span>
          <span
            v-for="(color, index) in colors" :style="{'background': color}"
            v-bind:key="'color'+index"
            @click="diyColor(color)"
            class="color-item"></span>
        </div>
      </div>
    </div>
    <!-- <object id="shoes-1" type="image/svg+xml" :data="shoe_left" style="display:block;width:330px;height:240px" >
      <param name="src" :value="shoe_left">
    </object> -->
  </div>
</template>

<script>
import {Toast} from 'mint-ui';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Bscroll from 'better-scroll';
import Utils from '@/client/utils';
import api from '@/client/api';
import Upload from '../../utils/Upload';

const shoe_left = require('./images/shoe_left.svg');
const shoe_right = require('./images/shoe_right1.svg');
const shoe_front = require('./images/shoe_front.svg');
const shoe_back = require('./images/shoe_back.svg');
const finished = require("../../assets/images/btn-finished.png");
const file = require("../../assets/images/btn-file.jpg");
const text_front = require("../../assets/images/text_front.png");
const text_back = require("../../assets/images/text_back.png");
const text_left = require("../../assets/images/text_left.png");
const text_right = require("../../assets/images/text_right.png");
const logo = require("../../assets/images/logo.png");

export default {
  name: 'diy',
  components: {
    swiper,
    swiperSlide
  },
  data() {
    return {
      shoe_left,
      shoe_right,
      shoe_front,
      shoe_back,
      finished,
      logo,
      file,
      text_front,
      text_back,
      text_right,
      text_left,
      uploadimgs: ['null', 'null'],
      isUploadSuccess1: 0,
      percent1: 0,
      sendPic: '',
      hammerInfo: '',
      left_pos: {
        x: 0,
        y: 0
      },
      right_pos: {
        x: 0,
        y: 0
      },
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      },
      side: 1,
      currentPart: 'left_part_1',
      sideParts: [[{name: '左侧帮面', value: '', code: 'left_part_1'}/*, {name: '围条', value: '', code: 'left_part_2'}*/],
      [{name: '右侧帮面', value: '', code: 'right_part_1'}/*, {name: '围条', value: '', code: 'right_part_2'}*/, {name: '鞋扣', value: '', code: 'right_part_3'}],
      [/*{name: '魔术贴', value: '', code: 'front_part_1'}, {name: '鞋头', value: '', code: 'front_part_2'}, {name: '包头片', value: '', code: 'front_part_3'}, {name: '鞋舌', value: '', code: 'front_part_4'}, */{name: '微笑曲线', value: '', code: 'front_part_5'}],
      [{name: 'LOGO', value: '', code: 'back_part_1'}/*, {name: '后跟条', value: '', code: 'back_part_2'}*/]],
      colors: ['#2d3036', '#cd2a3e', '#2e3561', '#f1acb0', '#00926a'],
    };
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    }
  },
  mounted() {
    // var svg = document.querySelector('#shoes-1').contentDocument;
    // console.log(svg)
    // svg.querySelectorAll('.cls-3').forEach((item, index) => {
    //   console.log(item)
    //   item.style.fill='red';
    // })
    const hash = (new Date()).getTime();
    console.log(Upload.upload)
    this.sendPic = Upload.upload(this, (url) => {
      console.log(url)
      // Indicator.close();
      const uploadimg = new Image();
      uploadimg.onload = () => {
        console.log(uploadimg.width, uploadimg.height)
        const img_ratio = uploadimg.width / uploadimg.height;
        const left_ratio = 222/126;
        const right_ratio = 226/126;
        const $leftupload = document.getElementById('left_upload');
        const $rightupload = document.getElementById('right_upload');
        let width = 0;
        let height = 0;
        let x = 0;
        let y = 0;
        if (this.currentPart == 'left_part_1') {
          this.uploadimgs[0] = url;
          if (img_ratio > left_ratio) {
            height = 165;
            width = uploadimg.width*height/uploadimg.height;
          }else{
            width = 296;
            height = uploadimg.height*width/uploadimg.width;
          }
          $leftupload.setAttribute('width', width);
          $leftupload.setAttribute('height', height);
          this.left_pos = {
            x: $leftupload.getBBox().x,
            y: $leftupload.getBBox().y
          }
          Utils.addcookie('img_width', width);
          Utils.addcookie('img_height', height);
          Utils.addcookie('img_x', this.left_pos.x);
          Utils.addcookie('img_y', this.left_pos.y);
          Utils.addcookie('img_scale', 1);
        }
        if (this.currentPart == 'right_part_1') {
          this.uploadimgs[1] = url;
          if (img_ratio > right_ratio) {
            height = 130;
            width = uploadimg.width*height/uploadimg.height;
          }else{
            width = 234;
            height = uploadimg.height*width/uploadimg.width;
          }
          $rightupload.setAttribute('width', width);
          $rightupload.setAttribute('height', height);
          this.right_pos = {
            x: $rightupload.getBBox().x,
            y: $rightupload.getBBox().y
          }
        }
        document.querySelectorAll('.' + this.currentPart).forEach((part,index) => {
          // alert(url)
          part.setAttribute('xlink:href', `${url}?hash=${hash+index}`);
        })
      }
      uploadimg.src = url
    }, 1);

    
    // 左侧面
    this.$http['get'](`${this.shoe_left}?hash=${hash}`)
      .then((response) => {
        console.log(document.querySelector('#left-container'));
        this.$refs.left_side1.innerHTML = response.body;

        // document.querySelectorAll('.part2').forEach((item, index) => {
        //   console.log(item)
        //   item.style.fill='red';
        // })
        // document.querySelector('#imgPath').setAttribute('xlink:href', 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg');

        // this.createWork();
        // this.workImg = 'data:image/svg+xml;base64,' +  window.btoa(unescape(encodeURIComponent(svg)))

        // canvg(document.getElementById('workCanvas'), svg)

        // this.workImg = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
      }, (error) => {

      });

      // 右侧面
      this.$http['get'](`${this.shoe_right}?hash=${hash}`)
      .then((response) => {
        this.$refs.right_side1.innerHTML = response.body;
      }, (error) => {

      });

      // 正面
      this.$http['get'](`${this.shoe_front}?hash=${hash}`)
      .then((response) => {
        console.log(document.querySelector('#front-container'));
        this.$refs.front_side1.innerHTML = response.body;
        document.querySelectorAll('.right_part_1').forEach((part,index) => {
          part.setAttribute('xlink:href', 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg');
        })
        document.querySelectorAll('.left_part_1').forEach((part,index) => {
          part.setAttribute('xlink:href', 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg');
        })
      }, (error) => {

      });

      // 后面
      this.$http['get'](`${this.shoe_back}?hash=${hash}`)
      .then((response) => {
        console.log(document.querySelector('#back-container'));
        this.$refs.back_side1.innerHTML = response.body;
        document.querySelectorAll('.right_part_1').forEach((part,index) => {
          part.setAttribute('xlink:href', 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg');
        })
        document.querySelectorAll('.left_part_1').forEach((part,index) => {
          part.setAttribute('xlink:href', 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg');
        })
      }, (error) => {

      });

      this.$nextTick(() => {
        if (!this.scroll) {
          this.scroll = new Bscroll(this.$refs.BScroll, {scrollX: true, scrollY: false, tap: true, click: true})
        } else {
          this.scroll.refresh()
        }
      })
  },
  methods: {
    uploadPic() {
      // console.log(this.sendPic)
      Indicator.open('正在上传图片...');
      Upload.setUploadParam(this.sendPic, '')
    },


    goSide(index) {
      this.side = index;
      this.swiper.slideTo(index-1, 1000, false);
      this.setCurrentPart(this.sideParts[index-1][0].code);
    },

    setCurrentPart(code) {
      this.currentPart = code;
    },

    diyColor(color) {
      console.log(color);
      document.querySelectorAll('.'+this.currentPart).forEach((item, index) => {
        console.log(item)
        Utils.addcookie(this.currentPart, color);
        if (this.currentPart == 'front_part_5') {
          item.style.stroke = color;
          document.querySelectorAll('.left_side.'+this.currentPart).forEach((side, index) => {
            side.style.fill = color;
          });
        } else {
          item.style.fill = color;
        }
      })
    },

    complete() {
      window.left_side = this.$refs.left_side1.innerHTML;
      window.right_side = this.$refs.right_side1.innerHTML;
      window.front_side = this.$refs.front_side1.innerHTML;
      window.back_side = this.$refs.back_side1.innerHTML;

      if (this.uploadimgs[0] == 'null') {
        return Toast('左侧帮面图片还没上传哦')
      }

      if (this.uploadimgs[1] == 'null') {
        return Toast('右侧帮面图片还没上传哦')
      }

      Utils.addcookie('image_url', this.uploadimgs.join(';'));

      this.$router.push({
        name: 'complete'
      })
    },

    onPan(ev) {
      this.hammerInfo = `move: ${ev.deltaX} ${ev.deltaY}`;
      let $left = document.getElementById('left_upload');
      let $right = document.getElementById('right_upload');
      // debugger;
      // let width = $left.getAttribute('width');
      if (this.currentPart == 'left_part_1' && this.uploadimgs[0] != 'null') {
        this.left_pos.x += ev.deltaX*0.06;
        this.left_pos.y += ev.deltaY*0.06;
        $left.setAttribute('x', this.left_pos.x);
        $left.setAttribute('y', this.left_pos.y);
        Utils.addcookie('img_x', this.left_pos.x);
        Utils.addcookie('img_y', this.left_pos.y);
      }
      if (this.currentPart == 'right_part_1' && this.uploadimgs[1] != 'null') {
        this.right_pos.x += ev.deltaX;
        this.right_pos.y += ev.deltaY;
        $right.setAttribute('x', this.right_pos.x*0.1);
        $right.setAttribute('y', this.right_pos.y*0.1);
      }
    },

    onPinch(ev) {
      this.hammerInfo = `pinch: ${ev.scale}`;
      let $left = document.getElementById('left_upload');
      let $right = document.getElementById('right_upload');
      let scale = ev.scale;

      if (ev.scale > 1) {
        scale = ev.scale*0.75;
      } else {
        scale = ev.scale*1.25;
      }

      if (this.currentPart == 'left_part_1' && this.uploadimgs[0] != 'null') {
        if (ev.scale > 1) {
          scale = ev.scale*0.95;
        } else {
          scale = ev.scale*1.05;
        }
        let width = $left.width.animVal.value;
        let height = $left.height.animVal.value;
        this.left_pos.x = 230 - width*scale/2;
        this.left_pos.y = 115 - height*scale/2;
        $left.setAttribute('width', width * scale);
        $left.setAttribute('height', height * scale);
        // $left.style.transform = `scale(${scale})`;
        Utils.addcookie('img_scale', scale);
        Utils.addcookie('img_width', width*scale);
        Utils.addcookie('img_height', height*scale);
        $left.setAttribute('x', this.left_pos.x);
        $left.setAttribute('y', this.left_pos.y);
        
      }
      if (this.currentPart == 'right_part_1' && this.uploadimgs[1] != 'null') {
        let width = $right.width.animVal.value;
        let height = $right.height.animVal.value;
        // this.right_pos.x = -80 - width*scale/2;
        // this.right_pos.y = 75 - height*scale/2;
        // $right.setAttribute('width', width);
        // $right.setAttribute('height', height);
        $right.style.transform = `scale(${scale})`;
        // $right.setAttribute('x', this.right_pos.x);
        // $right.setAttribute('y', this.right_pos.y);
      }
    }
  },
  watch: {
    side() {
      // this.$nextTick(() => {
      //   if (!this.scroll) {
      //     this.scroll = new Bscroll(this.$refs.BScroll, {scrollX: true, scrollY: false})
      //   } else {
      //     this.scroll.refresh()
      //   }
      // })
    },
    currentPart(v) {
      switch(v) {
        case 'back_part_1':
          this.colors = ['#2d3036', '#cd2a3e', '#2e3561', '#f1acb0', '#00926a']
          break;
        case 'right_part_3':
          this.colors = ['#2d3036', '#ffffff', '#cd2a3e', '#2e3561', '#f1acb0', '#00926a']
          break;
        case 'front_part_5':
          this.colors = ['#2d3036', '#cd2a3e', '#2e3561', '#f1acb0', '#00926a']
          break;
        default:
      }
    }
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
