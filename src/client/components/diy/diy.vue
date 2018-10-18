<template>
  <div class="page diy-page">
    <swiper :options="swiperOption" ref="mySwiper">
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
    <button class="btn-finished" @click="complete"><img :src="finished" alt=""></button>
    <div class="side-items flex-wrp">
      <div class="flex-item">
        <div class="side-item" :class="side == 1 ? 'active' : null"><button @click="goSide(1)" class="side-left"><img :src="side == 1 ? text_left_active : text_left" alt=""></button></div>
      </div>
      <div class="flex-item">
        <div class="side-item" :class="side == 2 ? 'active' : null"><button @click="goSide(2)" class="side-left"><img :src="side == 2 ? text_right_active : text_right" alt=""></button></div>
      </div>
      <div class="flex-item">
        <div class="side-item" :class="side == 3 ? 'active' : null"><button @click="goSide(3)" class="side-left"><img :src="side == 3 ? text_front_active : text_front" alt=""></button></div>
      </div>
      <div class="flex-item">
        <div class="side-item" :class="side == 4 ? 'active' : null"><button @click="goSide(4)" class="side-left"><img :src="side == 4 ? text_back_active : text_back" alt=""></button></div>
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
    <div class="diy-picker" ref="BScroll">
      <div class="diy-picker-scroll" :class="(side == 1 || side == 2) ? 'has-file' : null">
        <div class="diy-file" id="container1">
          <span>自定义图片</span>
          <button class="add-file" id="selectfiles1"><img :src="file" alt=""></button>
          <a id="postfiles1" href="javascript:void(0);"></a>
        </div>
        <div class="colors">
          <span>颜色(12)</span>
          <span
            v-for="(color, index) in colors" :style="{'background': color}"
            v-bind:key="'color'+index"
            @click="diyColor(color)"
            class="color-item"></span>
        </div>
      </div>
    </div>
    <img :src="workImg" v-show="false" style="width: 100%" alt="">
    <canvas id="workCanvas" v-show="false"></canvas>
    <!-- <object id="shoes-1" type="image/svg+xml" :data="shoe_left" style="display:block;width:330px;height:240px" >
      <param name="src" :value="shoe_left">
    </object> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import 'swiper/dist/css/swiper.css';
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import Bscroll from 'better-scroll';
import Utils from '@/client/utils';

import Upload from '../../utils/Upload';

const shoe_left = require('./images/shoe_left.svg');
const shoe_right = require('./images/shoe_right.svg');
const shoe_front = require('./images/shoe_front.svg');
const shoe_back = require('./images/shoe_back.svg');
const qrcode = require("./images/qrcode.jpg");
const finished = require("../../assets/images/btn-finished.png");
const file = require("../../assets/images/btn-file.jpg");
const text_front = require("../../assets/images/side-front.jpg");
const text_front_active = require("../../assets/images/side-front_active.jpg");
const text_back = require("../../assets/images/side-back.jpg");
const text_back_active = require("../../assets/images/side-back_active.jpg");
const text_left = require("../../assets/images/side-left.jpg");
const text_left_active = require("../../assets/images/side-left_active.jpg");
const text_right = require("../../assets/images/side-right.jpg");
const text_right_active = require("../../assets/images/side-right_active.jpg");

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
      file,
      text_front,
      text_front_active,
      text_back,
      text_back_active,
      text_right,
      text_right_active,
      text_left,
      text_left_active,
      isUploadSuccess1: 0,
      percent1: 0,
      sendPic: '',
      workImg: '',
      qrcode,
      swiperOption: {
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        },
      },
      side: 1,
      currentPart: 'left_part_1',
      sideParts: [[{name: '左侧帮面', value: '', code: 'left_part_1'}, {name: '围条', value: '', code: 'left_part_2'}],
      [{name: '右侧帮面', value: '', code: 'right_part_1'}, {name: '围条', value: '', code: 'right_part_2'}, {name: '鞋扣', value: '', code: 'right_part_3'}],
      [{name: '魔术贴', value: '', code: 'front_part_1'}, {name: '鞋头', value: '', code: 'front_part_2'}, {name: '包头片', value: '', code: 'front_part_3'}, {name: '鞋舌', value: '', code: 'front_part_4'}, {name: '微笑曲线', value: '', code: 'front_part_5'}],
      [{name: 'LOGO', value: '', code: 'back_part_1'}, {name: '后跟条', value: '', code: 'back_part_2'}]],
      colors: ['#000000', '#cccccc', '#ff00dd', '#ff22de', '#cccccc', '#ff00dd', '#ff22de', '#cccccc', '#ff00dd', '#ff22de', '#cccccc', '#ff00dd']
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
    console.log(Upload.upload)
    this.sendPic = Upload.upload(this, (url) => {
      console.log(url)
      Utils.addcookie('image_url', url);
      document.querySelectorAll('.' + this.currentPart).forEach((part,index) => {
        part.setAttribute('xlink:href', url);
      })
    }, 1);

    // 左侧面
    this.$http['get'](this.shoe_left)
      .then((response) => {
        console.log(document.querySelector('#left-container'));
        this.$refs.left_side1.innerHTML = response.body;
        // document.querySelectorAll('.part2').forEach((item, index) => {
        //   console.log(item)
        //   item.style.fill='red';
        // })
        // document.querySelector('#imgPath').setAttribute('xlink:href', 'https://xd-learn.oss-cn-shenzhen.aliyuncs.com/learn/mp3/20181011/1539246726879.jpg');

        // this.createWork();
        // this.workImg = 'data:image/svg+xml;base64,' +  window.btoa(unescape(encodeURIComponent(svg)))

        // canvg(document.getElementById('workCanvas'), svg)

        // this.workImg = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
      }, (error) => {

      });

      // 右侧面
      this.$http['get'](this.shoe_right)
      .then((response) => {
        console.log(document.querySelector('#right-container'));
        this.$refs.right_side1.innerHTML = response.body;
      }, (error) => {

      });

      // 正面
      this.$http['get'](this.shoe_front)
      .then((response) => {
        console.log(document.querySelector('#front-container'));
        this.$refs.front_side1.innerHTML = response.body;
      }, (error) => {

      });

      // 后面
      this.$http['get'](this.shoe_back)
      .then((response) => {
        console.log(document.querySelector('#back-container'));
        this.$refs.back_side1.innerHTML = response.body;
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
      Upload.setUploadParam(this.sendPic, '')
    },
    createWork() {
      const that = this;
      let canvas = document.getElementById("workCanvas"),
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight;

      canvas.width = 375 * 2;
      canvas.height = 223 * 2;
      canvas.style.width = 375 + "px";
      canvas.style.height = 223 + "px";

      const w_ratio = w / 375;
      let svg = document.querySelector('#left-container').innerHTML;
      canvg(canvas, svg, {
        scaleWidth: 351.6*2,
        scaleHeight: 227.1*2,
        useCORS: true,
        renderCallback: function() {
          that.drawImgs(ctx, w_ratio, () => {
            that.workImg = canvas.toDataURL("image/png");
          })
        }
      })
    },

    drawImgs(ctx, w_ratio, cb) {
       /* 加载并绘制二维码 */
      const qrcode = new Image();
      qrcode.onload = () => {
        ctx.drawImage(
          qrcode,
          0,
          100 * w_ratio,
          qrcode.width * w_ratio,
          qrcode.height * w_ratio);

          cb();
      };
      qrcode.src = this.qrcode;
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
          document.querySelector('.left_side.'+this.currentPart).style.fill = color;
        } else {
          item.style.fill = color;
        }
      })
    },

    complete() {
      this.$router.push({
        name: 'complete'
      })
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
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
