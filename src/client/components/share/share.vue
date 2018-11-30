<template>
  <div class="page share-page">
    <img class="diy-slogan" :src="slogan" alt="">
    <!-- <div class="work-container">
      <img class="haibao-bg" :src="haibaobg" alt="">
      <img class="thumb" :src="work.img_url" alt="">
      <div class="infos">
        <div class="rank">排名 {{work.rank}}</div>
        <div class="like">{{work.like}}</div>
      </div>
    </div> -->
    <div class="work-container">
      <img :src="workImg" v-show="uploaded" alt="">
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
    <div id="qrcode" ref='qrcode' v-show="false"></div>
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
const pen = require("../../assets/images/icon-pen.png");
const slogan = require("../../assets/images/slogan2.png");
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
      pen,
      haibaobg,
      workImg: '',
      uploaded: false,
      work: {},
      slogan,
      liked: false
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
            508 * w_ratio,
            484 * w_ratio);
          // that.workImg = canvas.toDataURL("image/jpg");
          // that.uploaded = true;

          ctx.font="32px Arial";
          ctx.fillText(`No.${this.$route.params.id}`,
            15 * w_ratio,
            670 * w_ratio);

          ctx.fillText(`${this.work.like}`,
            45 * w_ratio,
            610 * w_ratio);

          ctx.font="46px Arial";
          ctx.lineWidth = 2;
          ctx.strokeText(`排名${this.work.rank}`,
            15 * w_ratio,
            550 * w_ratio);

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
        const pen = new Image();
        pen.onload = () => {
          ctx.drawImage(
            pen,
            10 * w_ratio,
            580 * w_ratio,
            pen.width * w_ratio,
            pen.height * w_ratio);
          cb();
        };
        pen.src = this.pen;
      };
      canvasbg.src = this.canvasbg;
    },
    goRouter(route) {
      this.$router.push({
        name: route
      })
    },
    getWork() {
      // this.work = {
      //   img_url: 'https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181031/2_6A8CD3E598385DFA82C831BC4F2E3F13.jpg',
      //   rank: 100,
      //   like: 9999
      // };
      // this.createWork();
      
      Indicator.open('生成海报中...');
      api.getWorkId(this, {
        work_id: this.$route.params.id,
      }, (response) => {
        Indicator.close();
        if (response.body.resCode === '0') {
          this.work = response.body.repBody.works[0];
          this.createWork();
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
