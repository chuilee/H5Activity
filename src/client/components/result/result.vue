<template>
<div>
  <div class="result-page">
    <img v-if="!sharePoster" :src="logo" class="logo" alt="">
    <img v-if="!sharePoster" :src="line" class="line" alt="">
    <img v-if="!sharePoster" :src="percent[$route.params.percent]" class="percent" alt="">
    <img v-if="!sharePoster" :src="types[random]" alt="" class="bg">
    <img :src="sharePoster" v-if="sharePoster" alt="" class="share">
    <img :src="mask" class="mask" alt="">
    <button class="btn1"><img :src="btn1" alt=""></button>
    <button class="btn2"><img :src="btn2" alt=""></button>
    <p class="tips">长按图片保存或截图发至朋友圈</p>
  </div>
  <canvas id="canvas" style="display: none;"></canvas>
</div>
</template>
<script>
const logo = require('./images/logo.jpg');
const line = require('./images/line.png');
const btn1 = require('./images/btn1.png');
const btn2 = require('./images/btn2.png');
const qrcode = require('./images/qrcode.jpg');
const mask = require('./images/mask.png');

export default {
  name: 'result',
  data() {
    return {
      logo,
      mask,
      qrcode,
      line,
      btn1,
      btn2,
      sharePoster: '',
      percent: {
        a: require('./images/a.png'),
        b: require('./images/b.png'),
        c: require('./images/c.png'),
        d: require('./images/d.png'),
      },
      types: {
        1: require('./images/1.png'),
        2: require('./images/2.png'),
        3: require('./images/3.png'),
        4: require('./images/4.png'),
        5: require('./images/5.png'),
        6: require('./images/6.png'),
        7: require('./images/7.png'),
        8: require('./images/8.png'),
      },
      random: 1,
    }
  },
  created() {
    this.random = Math.ceil((Math.random()*8))
  },
  mounted() {
    this.drawCanvas()
  },
  methods: {
    drawCanvas() {
      const that = this;
      const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = window.innerWidth,
        h = window.innerHeight;
        canvas.width = w * 2;
        canvas.height = h * 2;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

      const w_ratio = w / 375;

      /** 加载并绘制背景图 */
      const bg = new Image();
      bg.onload = () => {

        ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
        /** 加载并绘制照片 */
        const logo = new Image();
        // logo.setAttribute('crossOrigin', 'anonymous');
        logo.onload = () => {
          ctx.drawImage(
            logo,
            172*w_ratio,
            82*w_ratio);

          /* 加载并绘制线条 */
          const line = new Image();
          line.onload = () => {
            ctx.drawImage(
              line,
              0,
              (h*2 - line.height)*w_ratio);

            /* 加载并绘制人像 */
            const type = new Image();
            type.onload = () => {
              ctx.drawImage(
                type,
                88*w_ratio,
                (h*2 - 109 - type.height)*w_ratio)

              /* 加载并百分比 */
              const percent = new Image();
              percent.onload = () => {
                ctx.drawImage(
                  percent,
                  (w*2-percent.width)*w_ratio,
                  (h*2 - 788 - percent.height)*w_ratio);

                /* 加载并绘制二维码 */
                const qrcode = new Image();
                qrcode.onload = () => {
                  ctx.drawImage(
                    qrcode,
                    (w*2 - 10 - qrcode.width)*w_ratio,
                    (h*2 - 10 - qrcode.height)*w_ratio);
                  this.sharePoster = canvas.toDataURL('image/jpeg');
                };
                qrcode.src = this.qrcode;
              };
              percent.src = this.percent[this.$route.params.percent];
            };
            type.src = this.types[this.random];
          }

          line.src = this.line;
        };

        logo.src = that.logo;
      };

      const imgUrl = require('../../assets/bg.jpg'); // 背景
      bg.src = imgUrl;
    }
  },
}
</script>
<style lang="scss" src="./style.scss"></style>
