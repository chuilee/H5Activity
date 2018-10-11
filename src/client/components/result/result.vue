<template>
<div>
  <img v-if="!finished" class="loading-img" :src="loading" alt="">
  <p v-if="!finished" class="loading-text">LOADING</p>
  <div class="result-page">
    <!-- <img v-if="!sharePoster" :src="thumb" class="thumb" alt="">
    <p v-if="!sharePoster" class="name">babalolo</p>
    <img v-if="!sharePoster" :src="line" class="line" alt="">
    <img v-if="!sharePoster" :src="percent[$route.params.percent]" class="percent" alt="">
    <img v-if="!sharePoster" :src="types[random]" alt="" class="bg"> -->
    <img :src="sharePoster" v-if="sharePoster" alt="" class="share">
    <img :src="mask" class="mask" alt="">
    <img v-if="finished" :src="qrcode" class="qrcode_mask" alt="">
    <button v-if="finished" class="btn1" @click="showMask = true"><img :src="btn1" alt=""></button>
    <button v-if="finished" class="btn2" @click="buy()"><img :src="btn2" alt=""></button>
    <p v-if="finished" class="tips">长按图片保存我的达人卡</p>
    <div v-show="showMask" class="share-mask" @click="showMask = false">
      <img :src="shareMask" alt="">
    </div>
  </div>
  <canvas id="canvas" style="display: none;"></canvas>
</div>
</template>
<script>
// import { Indicator } from "mint-ui";

const logo = require("./images/logo.png");
const bottom = require("./images/bottom.png");
const btn1 = require("./images/btn1.png");
const btn2 = require("./images/btn2.png");
const qrcode = require("./images/qrcode_mask.jpg");
const mask = require("./images/mask.png");
const thumb = require("./images/thumb.jpg");
const loading = require("../loading/LOADING.gif");
const shareMask = require("./images/shareMask.png");

export default {
  name: "result",
  data() {
    return {
      loading,
      logo,
      mask,
      qrcode,
      bottom,
      btn1,
      btn2,
      thumb,
      shareMask,
      showMask: false,
      sharePoster: "",
      percent: {
        a: require("./images/a.png"),
        b: require("./images/b.png"),
        c: require("./images/c.png"),
        d: require("./images/d.png")
      },
      types: {
        1: require("./images/1.jpg"),
        2: require("./images/2.jpg"),
        3: require("./images/3.jpg"),
        4: require("./images/4.jpg"),
        5: require("./images/5.jpg"),
        6: require("./images/6.jpg"),
        7: require("./images/7.jpg"),
        8: require("./images/8.jpg")
      },
      random: 1,
      finished: false
    };
  },
  created() {
    console.log(this.percent);
    this.random = Math.ceil(Math.random() * 8);
    // Indicator.open({
    //   text: "正在生成结果...",
    //   spinnerType: "fading-circle"
    // });
  },
  mounted() {
    let data = {
      nickname: 'CHUILEE',
      headimgurl: window.location.origin + this.thumb
    }
    this.drawCanvas(data.nickname, data.headimgurl);

    // 请求后台数据
    // this.$http["get"]("/index/act").then(
    //   response => {
    //     // success
    //     let data = response.body.data[0];
    //     this.drawCanvas(data.nickname, data.headimgurl);
    //   },
    //   response => {
    //     // error
    //     // if (funErr) {
    //     //   funErr(response);
    //     // }
    //   }
    // );
  },
  methods: {
    buy() {
      window.location.href = "https://h5.youzan.com/v2/feature/VzKBwD6w81";
    },
    drawCanvas(nickname, headimgurl) {
      const that = this;
      let canvas = document.getElementById("canvas"),
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight;

      if (h * 2 < 1140) {
        h = w / 750 * 1140;
      }

      canvas.width = w * 2;
      canvas.height = h * 2;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";

      const w_ratio = w / 375;

      /** 加载并绘制背景图 */
      const bg = new Image();
      bg.onload = () => {
        ctx.drawImage(
          bg,
          0,
          0,
          bg.width,
          bg.height,
          0,
          0,
          canvas.width,
          canvas.height
        );

        /* 加载并绘制人像 */
        const type = new Image();
        type.onload = () => {
          ctx.drawImage(
            type,
            0,
            30 * w_ratio,
            // 220 * w_ratio,
            type.width * w_ratio,
            type.height * w_ratio
          );

          /** 加载并绘制头像 */
          const thumb = new Image();
          thumb.setAttribute('crossOrigin', 'anonymous');
          thumb.onload = () => {
            ctx.save(); // 保存当前ctx的状态
            ctx.arc(w, 93, 50, 0, 2 * Math.PI); //画出圆
            ctx.strokeStyle = "#e7af1a";
            ctx.lineWidth = "10";
            ctx.stroke();
            ctx.clip(); //裁剪上面的圆形
            ctx.drawImage(
              thumb,
              0,
              0,
              thumb.width,
              thumb.height,
              w - 60,
              93 - 60,
              120,
              120
            );
            ctx.restore();

            ctx.fillStyle = "#fff"; //设置笔触的颜色
            ctx.font = "bold 30px '字体','字体','微软雅黑','宋体'";
            ctx.textAlign = "left";
            const txt = nickname; // 名字
            const txt_w = ctx.measureText(txt).width;
            ctx.fillText(txt, w - txt_w / 2, 180 * w_ratio);

            /* 加载并百分比 */
            const percent = new Image();
            percent.onload = () => {
              ctx.drawImage(
                percent,
                w * 2 - percent.width * w_ratio,
                168 * w_ratio,
                // 180 * w_ratio,
                percent.width * w_ratio,
                percent.height * w_ratio
              );

              ctx.fillStyle = "#888"; //设置笔触的颜色
              ctx.font = "20px '字体','字体','微软雅黑','宋体'";
              ctx.textAlign = "left";
              const txt = '关注公众号，邀请你来测'; // 名字
              const txt_w = ctx.measureText(txt).width;
              ctx.fillText(txt, w - txt_w / 2, 1100 * w_ratio);

              /* 加载并绘制二维码 */
              const bottom = new Image();
              bottom.onload = () => {
                ctx.drawImage(
                  bottom,
                  0,
                  993 * w_ratio,
                  bottom.width * w_ratio,
                  bottom.height * w_ratio);

                this.sharePoster = canvas.toDataURL("image/jpeg");
                this.finished = true;
                // Indicator.close();
              };
              bottom.src = this.bottom;
            };
            percent.src =
              window.location.origin + this.percent[this.$route.params.percent];
          };
          console.log(headimgurl)
          thumb.src = headimgurl; // 用户头像
        };
        type.src = window.location.origin + this.types[this.$route.params.type];
      };

      const imgUrl = require("../../assets/bg.jpg"); // 背景
      bg.src = window.location.origin + imgUrl;
    }
  },
  beforeRouteLeave (to, from, next) {
    const toDepth = parseInt(to.params.id, 10);
    if (toDepth) {
      next(false);
    } else {
      next();
    }
  }
};
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss" scoped>
.page-view {
  width: 100%;
  height: 100%;
}
</style>

