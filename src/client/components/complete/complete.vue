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
const workbg1 = require("../../assets/images/work-bg1.jpg");
const workbg2 = require("../../assets/images/work-bg2.jpg");
const workbg3 = require("../../assets/images/work-bg3.jpg");
const workbg4 = require("../../assets/images/work-bg4.jpg");

export default {
  name: 'complete',
  data() {
    return {
      rebuild,
      slogan,
      input,
      btnDone,
      shoe_left,
      workbg: [workbg1, workbg2, workbg3, workbg4],
      phone: '',
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
          part.setAttribute('crossOrigin', '');
          part.setAttribute('width', Utils.getcookie('img_width'));
          part.setAttribute('height', Utils.getcookie('img_height'));
          part.style.transform = `scale(${Utils.getcookie('img_scale')})`;
          part.setAttribute('x', Utils.getcookie('img_x'));
          part.setAttribute('y', Utils.getcookie('img_y'));
          part.setAttribute('xlink:href', decodeURIComponent(Utils.getcookie('image_url')).split(';')[0]);
        })

        this.parts.forEach((part, index) => {
          // debugger
          document.querySelectorAll('.'+part).forEach((item, index) => {
            if (part == 'front_part_5') {
              item.style.stroke = decodeURIComponent(Utils.getcookie(part));
              document.querySelectorAll('.left_side.'+part).forEach((side, index) => {
                side.style.fill = decodeURIComponent(Utils.getcookie(part));
              });
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

      canvas.width = 508 * w_ratio;
      canvas.height = 484 * w_ratio;
      canvas.style.width = canvas.width / 2 + "px";
      canvas.style.height = canvas.height / 2 + "px";


      let svg = this.$refs.left_side.innerHTML;

      that.drawImgs(ctx, w_ratio, () => {
        // ctx.drawSvg(svg, 50*w_ratio, 110*w_ratio, 295*w_ratio, 190*w_ratio);
        // that.uploaded = true;
        // that.workImg = canvas.toDataURL("image/jpg");
          // that.upload(); // 上传服务器
        canvg(canvas, svg, {
          scaleWidth: w_ratio > 1 ? 351.6*w_ratio*0.65 : 351.6*w_ratio*0.7,
          scaleHeight: w_ratio > 1 ? 227.1*w_ratio*0.65 : 227.1*w_ratio*0.7,
          offsetX: w_ratio > 1 ? 147*0.75 : 147*0.7,
          offsetY: w_ratio > 1 ?  107*0.65 : 107*0.7,
          useCORS: true,
          ignoreClear: true,
          renderCallback: () => {
            // that.uploaded = true;
            that.workImg = canvas.toDataURL("image/jpg");
            that.upload(); // 上传服务器
          }
        })
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
      workbg.src = window.location.origin + this.workbg[Math.floor(Math.random()*4)];
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
      // alert('upload');
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
                // this.uploaded = true;
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
