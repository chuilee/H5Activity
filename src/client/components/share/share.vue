<template>
  <div class="page share-page">
    <img class="diy-slogan" :src="slogan" alt="">
    <div class="work-container">
      <img class="haibao-bg" :src="haibaobg" alt="">
      <img class="thumb" :src="work.img_url" alt="">
      <div class="infos">
        <div class="rank">排名 {{work.rn}}</div>
        <div class="like">{{work.like}}</div>
      </div>
    </div>
    <button v-show="!liked" class="btn-like-hime" @click="likeHim"><img :src="btnLike" alt=""></button>
    <div class="flex-wrp btns" v-show="liked">
      <div class="flex-item">
        <button class="btn-goon" @click="goRouter('home')"><img :src="btnCreate" alt=""></button>
      </div>
      <div class="flex-item">
        <button class="btn-viewlist" @click="invite"><img :src="btnMore" alt=""></button>
      </div>
    </div>
     <button class="btn-home" @click="goRouter('home')"><img :src="btnHome" alt=""></button>
    <canvas id="workCanvas" v-show="false"></canvas>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import Utils from '@/client/utils';
import api from '@/client/api';

const btnLike = require('../../assets/images/btn-share-like.png');
const canvasbg = require("../../assets/images/canvas-bg.jpg");
const btnCreate = require("../../assets/images/btn-create.png");
const btnMore = require("../../assets/images/btn-invite-more.png");
const percent55 = require("../../assets/images/55percent.png");
const slogan = require("../../assets/images/diy-slogan.png");
const btnHome = require("../../assets/images/btn-home1.png");
const haibaobg = require("../../assets/images/canvas-bg.jpg");

export default {
  name: 'share',
  data() {
    return {
      btnLike,
      canvasbg,
      btnMore,
      btnCreate,
      btnHome,
      percent55,
      haibaobg,
      workImg: '',
      uploaded: false,
      work: '',
      slogan,
      liked: false
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
        work.src = this.work.img_url;
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
      api.getWorkId(this, {
        work_id: this.$route.params.id,
      }, (response) => {
        Indicator.close();
        if (response.body.resCode === '0') {
          this.work = response.body.repBody.works[0];
          // this.createWork();
        } else {

        }
      }, (err) => {
        Indicator.close();
      })
    },

    likeHim() {
      api.addLike(this, {
        work_id: this.work.work_id
      }, (response) => {
        this.liked = true;
        if (response.body.resCode == '0') {
          this.work.like = parseInt(this.work.like, 10) + 1;
          return Toast('投票成功')
        }
        if (response.body.resCode == '10001') {
          return Toast(response.body.resMsg)
        }
      }, (err) => {

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
