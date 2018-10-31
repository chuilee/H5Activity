<template>
  <div>
    <button ref='goback' class="btn-back" @click="goback"><img :src="back" alt=""></button>
    <div v-show="musicData.showMusic" class="music-warp">
      <img class="music" :src="isPlay ? musicData.musicBg : musicData.musicPause"  @click="toggleAudio" :class="{isturn:isPlay}">
     <audio ref='audio' id="audio" :src="musicData.musicSrc" loop="loop" preload="auto">您的浏览器不支持 audio 标签.</audio>
    </div>
    <transition :name="transitionName">
      <router-view  class="page-view"></router-view>
    </transition>
  </div>
</template>

<script>
import utils from "@/client/utils";
import api from "@/client/api";
import wx from "./utils/wx";

const musicbg = require("./assets/music.png");
const musicPause = require("./assets/music-close.png");
const musicsrc = require("./assets/music.mp3");
const back = require("./assets/images/btn-back.png");

export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right",
      back,
      musicData: {
        musicBg: musicbg,
        musicPause: musicPause,
        musicSrc: `https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181031/1540960892585.mp3`,
        // musicSrc: `http://176.122.170.131/music.77ba454.mp3`,
        // musicSrc: `${musicsrc}`,
        showMusic: true
      },
      isPlay: true,
      share: {
        title: "DIY童鞋定制大赛",
        desc: "KIDS.ING定制大赛，DIY宝宝的专属童鞋！",
        url: "http://kidsing.litecoder.com/kids/index",
        img:
          "https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg"
      },
      share2: {
        title: "为我助力吧",
        desc: "为我助力吧，KIDS.ING定制大赛，DIY宝宝的专属童鞋！",
        url: "http://kidsing.litecoder.com/kids/index",
        img:
          "https://litecoder.oss-cn-shenzhen.aliyuncs.com/kidsing/20181023/1540282512411.jpg"
      }
    };
  },
  created() {
    // this.$http['get']('/index/getShare')
    //   .then((response) => {
    //     let data = response.body.data
    //     wx.config(data.signPackage, false, () => {
    //       wx.share(data.share.title, data.share.desc, data.share.url, data.share.img);
    //     })
    //   }, (error) => {

    //   })

    api.getJsConfig(
      this,
      {
        jsurl: window.location.href
      },
      response => {
        wx.config(response.body.repBody, false, () => {
          const id = utils.getQueryStringByName("share");
          if (id !== "") {
            this.share2.url = `http://kidsing.litecoder.com/kids/index?share=${id}`;
            wx.share(
              this.share2.title,
              this.share2.desc,
              this.share2.url,
              this.share2.img
            );
            this.$router.push({
              name: "share",
              params: {
                id: id
              }
            });
          } else {
            wx.share(
              this.share.title,
              this.share.desc,
              this.share.url,
              this.share.img
            );
          }
        });
      },
      err => {}
    );
  },
  mounted() {
    const audio = this.$refs.audio;
    document.addEventListener(
      "WeixinJSBridgeReady",
      () => {
        this.isPlay = true;
        audio.play();
      },
      false
    );
    this.$refs.goback.style.display = "none";
  },
  methods: {
    toggleAudio() {
      this.isPlay = !this.isPlay;
      var audio = document.querySelector("#audio");
      if (audio.paused) {
        // this.musicBg = 'http://157.255.23.23/images/fsd/ap/20171208/88_8864959d_4fb2_4c8e_945f_010384a41ec1.png';
        this.musicStatus = "play";
        // audio.loop = true;
        audio.play();
      } else {
        // this.musicBg = 'http://157.255.23.23/images/fsd/ap/20171208/88_8864959d_4fb2_4c8e_945f_010384a41ec1.png';
        this.musicStatus = "pause";
        audio.pause();
      }
    },
    goback() {
      this.$router.go(-1);
    }
  },
  // watch $route 决定使用哪种过渡
  watch: {
    $route(to, from) {
      console.log(to);
      if (to.name == "share" || to.name == "work-details") {
        this.share2.url = `http://kidsing.litecoder.com/kids/index?share=${
          this.$route.params.id
        }`;
        wx.share(
          this.share2.title,
          this.share2.desc,
          this.share2.url,
          this.share2.img
        );
      } else {
        wx.share(
          this.share.title,
          this.share.desc,
          this.share.url,
          this.share.img
        );
      }
      if (to.name == "home" || to.name == "share") {
        this.$refs.goback.style.display = "none";
      } else {
        this.$refs.goback.style.display = "block";
      }
      const toDepth = to.path.split("/").length;
      const fromDepth = from.path.split("/").length;
      this.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
    }
  }
};
</script>

<style lang="scss" src="./assets/style/public.scss"></style>
