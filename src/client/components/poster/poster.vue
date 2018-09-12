<template>
  <div class="poster-section" ref="poster">
    <canvas id="canvas"></canvas>
    <img :src="combPic" alt=""  style="width: 100%;">
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Statistics from '../../statistics.js';

const jrQrcode = require('jr-qrcode');
const bg = require('./images/poster.jpg');
const t = require('./images/t.png');

export default {
  data() {
    return {
      bg,
      t,
      combPic: '',
    };
  },
  mounted() {
    try {
      Statistics.posterPage();
    } catch (err) {
      throw(err);
    }
    this.$refs.poster.style.minHeight = `${document.documentElement.clientHeight}px`;

    this.getLocalImgData();
    // this.drawCanvas('http://huodong.10155.com/images/fsd/ap/20180510/88_d8b543a2_c2db_40c4_ab4a_53dda72744e2.jpg')
  },
  methods: {
    createQrcode() {
      const host = location.host;
      const url = `http://${host}/dtu/login.jsp?aid=8899&channel=wx&shareid=${this.$route.params.id}`;
      return jrQrcode.getQrBase64(url);
    },
    getLocalImgData() {
      var that = this;
      wx.getLocalImgData({
        localId: decodeURI(that.$route.params.pic), // 图片的localID
        success: function (res) {
          var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
          if(localData.indexOf('data:image/') === -1) {
            that.drawCanvas(`data:image/jgp;base64,${localData}`);
          } else {
            that.drawCanvas(localData);
          }
        }
      });
    },
    drawCanvas(wxImg) {
      const that = this;
      const canvas = document.getElementById('canvas'),
        ctx = canvas.getContext('2d'),
        w = window.innerWidth,
        h = window.innerHeight;
        // canvas.width = w * 2;
        canvas.width = 750;
        // canvas.height = h * 2;
        canvas.height = 1300;
        canvas.style.width = w + 'px';
        canvas.style.height = h + 'px';

      /** 加载并绘制背景图 */
      const bg = new Image();
      bg.onload = () => {

        ctx.drawImage(bg, 0, 0, bg.width, bg.height, 0, 0, canvas.width, canvas.height);
        /** 加载并绘制照片 */
        const logo = new Image();
        // logo.setAttribute('crossOrigin', 'anonymous');
        logo.onload = () => {
          // 绘制虚线框
          ctx.lineWidth = 4;
          ctx.strokeStyle="#f6babd";
          ctx.strokeRect(canvas.width * 0.1 - 24, canvas.width * 0.312 - 24, canvas.width * 0.8 + 48, canvas.width * 0.8 + 48);

          ctx.lineWidth = 8;
          ctx.strokeStyle="#ffffff";
          ctx.strokeRect(canvas.width * 0.1 - 8, canvas.width * 0.312 - 8, canvas.width * 0.8 + 16, canvas.width * 0.8 + 16);

          let ratio = logo.width / logo.height;
          let sx = 0,
              sy = 0,
              swidth = 0,
              sheight = 0,
              x = 0,
              y = 0,
              width = 0,
              height = 0;
          // console.log(ratio)
          if(ratio < 1) {
            sy = (logo.height - logo.width) / 2;
            swidth = sheight = logo.width;
          } else {
            sx = (logo.width - logo.height) / 2;
            swidth = sheight = logo.height;
          }
          ctx.drawImage(
            logo,
            sx,
            sy,
            swidth,
            sheight,
            canvas.width * 0.1,
            canvas.width * 0.312,
            canvas.width * 0.8,
            canvas.width * 0.8);

          /** 加载并绘制二维码 */
          const wx = new Image();
          // wx.setAttribute('crossOrigin', 'anonymous');
          wx.onload = () => {
            ctx.drawImage(wx, 0, 0, wx.width, wx.height,
              canvas.width * 0.07, canvas.height * 0.745,
              canvas.width * 0.3, canvas.width * 0.3);
            const aa = canvas.toDataURL('image/jpeg');
            that.combPic = aa;
          };
          const wxUrl = that.createQrcode();
          wx.src = wxUrl;
          Toast({
            message: '长按图片保存，分享给妈妈和亲友',
            duration: 5000,
          });
        };
        logo.src = wxImg;
      };

      const imgUrl = require('./images/poster.jpg'); // 背景
      bg.src = imgUrl;
    }
  },
  watch: {
  },
};
</script>
<style lang="scss" src='./style.scss'></style>
