<template>
  <div class="page work-details-page">
    <div class="work-container">
      <img :src="workImg" v-show="uploaded" alt="">
    </div>
    <button class="btn-done" @click="invite"><img :src="btnDone" alt=""></button>
    <div class="flex-wrp">
      <div class="flex-item">
        <button class="btn-goon" @click="goRouter('diy')"><img :src="btnGoon" alt=""></button>
      </div>
      <div class="flex-item">
        <button class="btn-viewlist" @click="goRouter('rank')"><img :src="btnView" alt=""></button>
      </div>
    </div>
    <canvas id="workCanvas" v-show="false"></canvas>
    <div id="qrcode" ref='qrcode' v-show="false"></div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import Utils from '@/client/utils';
import api from '@/client/api';

const btnDone = require('../../assets/images/btn-invite.png');
const canvasbg = require("../../assets/images/canvas-bg.jpg");
const btnGoon = require("../../assets/images/btn-goon.png");
const btnView = require("../../assets/images/btn-viewlist.png");
const percent55 = require("../../assets/images/55percent.png");

export default {
  name: 'work-details',
  data() {
    return {
      btnDone,
      canvasbg,
      btnView,
      btnGoon,
      percent55,
      workImg: '',
      uploaded: false,
      work_url: ''
    };
  },
  mounted() {
    this.getWork();
    new QRCode(this.$refs.qrcode, {
      text: `http://kidsing.litecoder.com/kids/index?share=${this.$route.params.id}`,
      width: 90,
      height: 90,
    });
  },
  methods: {
    createWork() {
      const that = this;
      let canvas = document.getElementById("workCanvas"),
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight;

      const w_ratio = w / 375;

      canvas.width = 519 * w_ratio;
      canvas.height = 695 * w_ratio;
      canvas.style.width = canvas.width / 2 + "px";
      canvas.style.height = canvas.height / 2 + "px";

      that.drawImgs(ctx, w_ratio, () => {

        /* 加载并绘制作品 */
        const work = new Image();
        work.setAttribute('crossOrigin', 'anonymous');
        work.onload = () => {
          ctx.drawImage(
            work,
            5 * w_ratio,
            0,
            work.width * w_ratio,
            work.height * w_ratio);
          // that.workImg = canvas.toDataURL("image/jpg");
          // that.uploaded = true;

          ctx.font="32px Arial";
          ctx.fillText(`No.${this.$route.params.id}`,
            15 * w_ratio,
            670 * w_ratio);


          const qrcode = new Image();
          qrcode.onload = () => {
            ctx.drawImage(
              qrcode,
              405 * w_ratio,
              518 * w_ratio,
              90 * w_ratio,
              90 * w_ratio);
            that.workImg = canvas.toDataURL("image/jpg");
            that.uploaded = true;
          }
          qrcode.src = this.$refs.qrcode.querySelector('img').src
        };
        work.src = this.work_url;
      })
    },

    drawImgs(ctx, w_ratio, cb) {
       /* 加载并绘制背景 */
      const canvasbg = new Image();
      canvasbg.onload = () => {
        ctx.drawImage(
          canvasbg,
          0,
          0,
          canvasbg.width * w_ratio,
          canvasbg.height * w_ratio);

        /* 加载并绘制打败百分数 */
        const percent55 = new Image();
        percent55.onload = () => {
          ctx.drawImage(
            percent55,
            10 * w_ratio,
            530 * w_ratio,
            percent55.width * w_ratio,
            percent55.height * w_ratio);
          cb();
        };
        percent55.src = this.percent55;
      };
      canvasbg.src = this.canvasbg;
    },
    goRouter(route) {
      this.$router.push({
        name: route
      })
    },
    getWork() {
      Indicator.open('生成海报中...');
      // this.work_url = 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181031/2_6A8CD3E598385DFA82C831BC4F2E3F13.jpg';
      // this.createWork();
      api.getWorkId(this, {
        work_id: this.$route.params.id,
      }, (response) => {
        Indicator.close();
        if (response.body.resCode === '0') {
          this.work_url = response.body.repBody.works[0].img_url;
          this.createWork();
        } else {

        }
      }, (err) => {
        Indicator.close();
      })
    },

    invite() {
      Toast('请通过右上角进行分享')
    }
  },
  watch: {

  }
};
</script>
<style lang="scss" src='./style.scss'></style>
