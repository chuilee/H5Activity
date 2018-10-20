<template>
  <div class="page complete-page">
    <button class="btn-rebuild" @click="goRebuild"><img :src="rebuild" alt=""></button>
    <div class="left-container" ref="left_side" style="width: 100%"></div>
    <img class="slogan" :src="slogan" alt="">
    <div class="input">
      <img :src="input" alt="">
      <input v-model="phone" type="number" placeholder="填写电话号码，作为后期认领凭证">
    </div>
    <button class="btn-done" @click="complete"><img :src="btnDone" alt=""></button>
    <img :src="workImg" v-show="uploaded" style="width: 100%" alt="">
    <canvas id="workCanvas" v-show="uploaded"></canvas>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import Utils from '@/client/utils';
import api from '@/client/api';

const rebuild = require('../../assets/images/btn-rebuild.png');
const slogan = require('../../assets/images/finish-slogan.png');
const input = require('../../assets/images/input-bg.png');
const btnDone = require('../../assets/images/btn-done.png');
const shoe_left = require('../diy/images/shoe_left.svg');
const workbg = require("../../assets/images/work-bg.jpg");

export default {
  name: 'complete',
  data() {
    return {
      rebuild,
      slogan,
      input,
      btnDone,
      shoe_left,
      workbg,
      phone: '13112312312',
      workImg: '',
      uploaded: false,
      activityDetails: false,
      parts: ['front_part_1', 'front_part_2', 'front_part_3', 'front_part_4', 'front_part_5','left_part_2']
    };
  },
  mounted() {
    const hash = (new Date()).getTime();
    // this.$refs.left_side.innerHTML = this.$refs.left_side1.innerHTML;
    this.$http['get'](`${this.shoe_left}?hash=${hash}`)
      .then((response) => {
        console.log(document.querySelector('#left-container'));
        this.$refs.left_side.innerHTML = response.body;

        document.querySelectorAll('.left_part_1').forEach((part,index) => {
          part.setAttribute('xlink:href', decodeURIComponent(Utils.getcookie('image_url')));
        })

        this.parts.forEach((part, index) => {
          // debugger
          document.querySelectorAll('.'+part).forEach((item, index) => {
            if (part == 'front_part_5') {
              item.style.stroke = decodeURIComponent(Utils.getcookie(part));
              document.querySelector('.left_side.'+part).style.fill = decodeURIComponent(Utils.getcookie(part));
            } else {
              item.style.fill = decodeURIComponent(Utils.getcookie(part));
            }
          })
          // document.querySelector('.' + part).style.fill = decodeURIComponent(Utils.getcookie(part))
        })
      }, (error) => {

      });
  },
  methods: {
    createWork() {
      Indicator.open('作品提交中...');
      const that = this;
      let canvas = document.getElementById("workCanvas"),
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight;

      const w_ratio = w / 375;

      canvas.width = 500 * w_ratio;
      canvas.height = 460 * w_ratio;
      canvas.style.width = canvas.width / 2 + "px";
      canvas.style.height = canvas.height / 2 + "px";
 
      
      let svg = this.$refs.left_side.innerHTML;

      that.drawImgs(ctx, w_ratio, () => {
        ctx.drawSvg(svg, 50*w_ratio, 110*w_ratio, 295*w_ratio, 190*w_ratio);
        setTimeout(() => {
          // that.uploaded = true;
          that.workImg = canvas.toDataURL("image/jpg");
          that.upload(); // 上传服务器
        }, 1000);
        // canvg(canvas, svg, {
        //   scaleWidth: 351.6*w_ratio,
        //   scaleHeight: 227.1*w_ratio,
        //   useCORS: true,
        //   renderCallback: () => {
        //     that.uploaded = true;
        //     that.workImg = canvas.toDataURL("image/png");
        //     // that.upload(); // 上传服务器
        //   }
        // })

        
      })

      
    },

    drawImgs(ctx, w_ratio, cb) {
       /* 加载并绘制二维码 */
      const workbg = new Image();
      workbg.onload = () => {
        ctx.drawImage(
          workbg,
          0,
          0,
          workbg.width * w_ratio,
          workbg.height * w_ratio);
        cb();
      };
      workbg.src = this.workbg;
    },

    goRebuild() {
      this.parts.forEach((part, index) => {
        // debugger
        Utils.addcookie(part, ''); 
        Utils.addcookie('image_url', ''); 
      })
      this.$router.push({
        name: 'diy'
      })
    },
    complete() {
      if (/^\d{11}$/.test(this.phone.replace(/\s/g, ''))) {
        this.createWork();
      } else {
        Toast('请输入正确的手机号码');
      }

    },
    upload() {
      

      api.updateUserInfo(this, {
        real_name: 'username',
        address: '',
        mobile: this.phone
      }, (response) => {
        if (response.body.resCode === '0') {
          api.uploadToOss(this, {
            base64: this.workImg.split(',')[1]
          }, (success2) => {
            api.addImg(this, {
              type: 'works',
              front: window.front_side,
              back: window.back_side,
              right: window.right_side,
              left: window.left_side,
              img_url: success2.body.url
            }, (response) => {
              console.log(response)
              api.addImg(this, {
                type: 'material',
                work_id: response.body.repBody.work_id,
                img_url: decodeURIComponent(Utils.getcookie('image_url'))
              }, (success1) => {
                this.$router.push({
                  name: 'work-details',
                  params: {
                    id: response.body.repBody.work_id
                  }
                })
                Indicator.close();
              }, (err1) => {
                Indicator.close();
              })
            }, (err) => {
              Indicator.close();
            })

          }, (err2) => {
            Indicator.close();
          })

        }
      }, (err) => {
        Indicator.close();
      })
    }
  },
  watch: {

  }
};
</script>
<style lang="scss" src='./style.scss'></style>
