<template>
<div>
  <div class="result-page">
    <!-- <img v-if="!sharePoster" :src="thumb" class="thumb" alt="">
    <p v-if="!sharePoster" class="name">babalolo</p>
    <img v-if="!sharePoster" :src="line" class="line" alt="">
    <img v-if="!sharePoster" :src="percent[$route.params.percent]" class="percent" alt="">
    <img v-if="!sharePoster" :src="types[random]" alt="" class="bg"> -->
    <img :src="sharePoster" v-if="sharePoster" alt="" class="share"> 
    <img v-if="finished" :src="mask" class="mask" alt="">
    <button v-if="finished" class="btn1"><img :src="btn1" alt=""></button>
    <button v-if="finished" class="btn2"><img :src="btn2" alt=""></button>
    <p v-if="finished" class="tips">长按图片保存或截图发至朋友圈</p>
  </div>
  <canvas id="canvas" style="display: none;"></canvas>
</div>
</template>
<script>
import { Indicator } from 'mint-ui';

const logo = require('./images/logo.png');
const line = require('./images/line.png');
const btn1 = require('./images/btn1.png');
const btn2 = require('./images/btn2.png');
const qrcode = require('./images/qrcode.jpg');
const mask = require('./images/mask.jpg');
const thumb = require('./images/thumb.jpg');

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
      thumb,
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
      finished: false,
    }
  },
  created() {
    this.random = Math.ceil((Math.random()*8));
    Indicator.open({
      text: '正在生成结果...',
      spinnerType: 'fading-circle'
    });
  },
  mounted() {
    this.drawCanvas();
  },
  methods: {
    drawCanvas() {
      const that = this;
      let canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = window.innerWidth,
        h = window.innerHeight;

        if (h * 2 < 1100) {
          h = w / 750 * 1100;
        }

        canvas.width = w * 2;
        canvas.height = h * 2;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

      const w_ratio = w / 375;

      /** 加载并绘制背景图 */
      const bg = new Image();
      bg.onload = () => {

        ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
        /** 加载并绘制头像 */
        const thumb = new Image();
        // thumb.setAttribute('crossOrigin', 'anonymous');
        thumb.onload = () => {
          ctx.save(); // 保存当前ctx的状态
          ctx.arc(382, 93, 50, 0, 2*Math.PI); //画出圆
          ctx.strokeStyle="#e7af1a";
          ctx.lineWidth='10';
          ctx.stroke();
          ctx.clip(); //裁剪上面的圆形
          ctx.drawImage(
            thumb,
            332*w_ratio,
            43*w_ratio,
            thumb.width * w_ratio,
            thumb.height * w_ratio);
          ctx.restore();

          ctx.fillStyle = '#fff'; //设置笔触的颜色
          ctx.font = "bold 30px '字体','字体','微软雅黑','宋体'";
          ctx.textAlign="center";
          const txt = 'lalabobolalabobolalabobo'; // 名字
          ctx.fillText(txt, w, 180*w_ratio);

          /* 加载并绘制线条 */
          const line = new Image();
          line.onload = () => {
            ctx.drawImage(
              line,
              0,
              h * 2 - line.height*w_ratio,
              line.width * w_ratio,
              line.height * w_ratio);

            /* 加载并绘制人像 */
            const type = new Image();
            type.onload = () => {
              ctx.drawImage(
                type,
                88*w_ratio,
                h*2 - 109 - type.height*w_ratio,
                type.width * w_ratio,
                type.height * w_ratio)

              /* 加载并百分比 */
              const percent = new Image();
              percent.onload = () => {
                ctx.drawImage(
                  percent,
                  w*2 - percent.width*w_ratio,
                  h*2 - 788*w_ratio - percent.height*w_ratio,
                  percent.width * w_ratio,
                  percent.height * w_ratio);
                this.sharePoster = canvas.toDataURL('image/jpeg');
                this.finished = true;
                Indicator.close();
                /* 加载并绘制二维码 */
                // const qrcode = new Image();
                // qrcode.onload = () => {
                //   ctx.drawImage(
                //     qrcode,
                //     (w*2 - 10 - qrcode.width)*w_ratio,
                //     (h*2 - 10 - qrcode.height)*w_ratio);
                //   this.sharePoster = canvas.toDataURL('image/jpeg');
                // };
                // qrcode.src = this.qrcode;
              };
              // percent.src = this.percent[this.$route.params.percent];
              percent.src = require('./images/d.png');
            };
            // type.src = this.types[this.random];
            type.src = require('./images/8.png');
          }

          line.src = require('./images/line.png');
        };

        thumb.src = require('./images/thumb.jpg');
      };

      const imgUrl = require('../../assets/bg.jpg'); // 背景
      bg.src = imgUrl;
    }
  },
}
</script>
<style lang="scss" src="./style.scss"></style>
<style lang="scss" scoped>
  .page-view {
    width: 100%;
    height: 100%;
  }
</style>

