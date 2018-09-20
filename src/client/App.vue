<template>
  <div>
    <div v-show="musicData.showMusic" class="music-warp">
      <img class="music" :src="musicData.musicBg"  @click="toggleAudio" :class="{isturn:isPlay}">
     <audio id="audio" :src="musicData.musicSrc" autoplay="autoplay" loop="loop">您的浏览器不支持 audio 标签.</audio>
    </div>
    <transition :name="transitionName">
      <router-view  class="page-view"></router-view>
    </transition>
  </div>
</template>

<script>
import utils from '@/client/utils';
import wx from './utils/wx';

const musicbg = require('./assets/music.png');
const musicsrc = require('./assets/music.mp3');

export default {
  name: 'App',
  data() {
    return {
      transitionName: 'slide-right',
      musicData: {
        musicBg: musicbg,
        musicSrc: musicsrc,
        showMusic: true,
      },
      isPlay: true,
    }
  },
  created() {
    this.$http['get']('/index/getShare')
      .then((response) => {
        let data = response.body.data
        wx.config(data.signPackage, false, () => {
          wx.share(data.share.title, data.share.desc, data.share.url, data.share.img);
        })
      }, (error) => {

      })
  },
  mounted() {
    var audio = document.querySelector("#audio");
    document.addEventListener("WeixinJSBridgeReady", () => {
      // this.isPlay = true;
      audio.play();
    }, false);
  },
  methods: {
    toggleAudio() {
      this.isPlay = !this.isPlay;
      var audio = document.querySelector("#audio");
      if(audio.paused){
        // this.musicBg = 'http://157.255.23.23/images/fsd/ap/20171208/88_8864959d_4fb2_4c8e_945f_010384a41ec1.png';
        this.musicStatus = 'play';
        audio.loop = true;
        audio.play();
      }else{
        // this.musicBg = 'http://157.255.23.23/images/fsd/ap/20171208/88_8864959d_4fb2_4c8e_945f_010384a41ec1.png';
        this.musicStatus = 'pause';
        audio.pause();
      }
    },
  },
  // watch $route 决定使用哪种过渡
  watch: {
    '$route' (to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slide-right' : 'slide-left';
    }
  }
};
</script>

<style lang="scss" src="./assets/style/public.scss"></style>
