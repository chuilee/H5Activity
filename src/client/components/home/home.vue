<template>
  <div class="login-section" :style="{'background-image': 'url('+ bg +')'}" ref="home">
    <button :style="{'background-image': 'url('+ btn +')'}" class="img-w" @click="go()"></button>
    <button :style="{'background-image': 'url('+ btn +')'}" class="img-w img-w-b" @click="go()"></button>
    <div v-show="musicData.showMusic" class="music-warp">
      <img class="music" :src="musicData.musicBg"  @click="toggleAudio" :class="{isturn:isPlay}">
     <audio id="audio" :src="musicData.musicSrc" autoplay="autoplay" loop="loop">您的浏览器不支持 audio 标签.</audio>
    </div>
    <img :src="arrow" class="arrow" alt="">
    <follow :show="showQrcode"></follow>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import utils from '@/client/utils';
import Statistics from '../../statistics';
import follow from '../follow/follow';

const btn = require('./images/go-start.png');
const bg = require('./images/bg.jpg');
const musicbg = require('./images/music.png');
const musicsrc = require('./images/music.mp3');
const arrow = require('./images/arrow.png');
const qrcode = require('./images/qrcode.jpg');

export default {
  name: 'home',
  components: {
    follow,
  },
  data() {
    return {
      bg,
      btn,
      arrow,
      qrcode,
      musicData: {
        musicBg: musicbg,
        musicSrc: musicsrc,
        showMusic: true,
      },
      isPlay:true,
      showQrcode: false,
    };
  },
  mounted() {
    try {
      Statistics.homePage();
    } catch (err) {
      throw(err);
    }
    var audio = document.querySelector("#audio");
    document.addEventListener("WeixinJSBridgeReady", function() {
      audio.play();
    }, false);
  },
  methods: {
    go() {
      // try {
      //   Statistics.home_btn();
      // } catch (err) {
      //   throw (err);
      // }
      if (utils.getcookie('follow') === '0') {
      // todo：未关注
        this.showQrcode = true;
      } else {
        this.$router.push({ name: 'start' });
      }
    },
    showFollow() {
      //页面高度只剩一屏
      if (document.documentElement.clientHeight) {
        this.$refs.home.style.height = `${document.documentElement.clientHeight}px`;
      } else {
        this.$refs.home.style.height = `${document.body.offsetHeight}px`;
      }
      this.showQrcode = true;
    },
    toggleAudio() {
      this.isPlay = !this.isPlay;
      var audio = document.querySelector("#audio");
      if(audio.paused){
        this.musicBg = 'http://157.255.23.23/images/fsd/ap/20171208/88_8864959d_4fb2_4c8e_945f_010384a41ec1.png';
        this.musicStatus = 'play';
        audio.loop = true;
        audio.play();
      }else{
        this.musicBg = 'http://157.255.23.23/images/fsd/ap/20171208/88_8864959d_4fb2_4c8e_945f_010384a41ec1.png';
        this.musicStatus = 'pause';
        audio.pause();
      }
    },
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
