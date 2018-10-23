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
      canvas.height = 654 * w_ratio;
      canvas.style.width = canvas.width / 2 + "px";
      canvas.style.height = canvas.height / 2 + "px";

      that.drawImgs(ctx, w_ratio, () => {

        /* 加载并绘制作品 */
        const work = new Image();
        work.setAttribute('crossOrigin', 'anonymous');
        work.onload = () => {
          ctx.drawImage(
            work,
            10 * w_ratio,
            0,
            500 * w_ratio,
            460 * w_ratio);
          that.workImg = canvas.toDataURL("image/jpg");
          that.uploaded = true;
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
            480 * w_ratio,
            percent55.width * w_ratio,
            percent55.height * w_ratio);
          cb();
        };
        percent55.src = window.location.origin + this.percent55;
      };
      canvasbg.src = window.location.origin + this.canvasbg;
    },
    goRouter(route) {
      this.$router.push({
        name: route
      })
    },
    getWork() {
      Indicator.open('生成海报中...');
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
