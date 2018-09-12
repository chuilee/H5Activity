<template>
  <div class="share-section" :style="{'background-image': 'url('+ bg +')'}" ref="share">
    <div class="poster">
      <!-- <img :src="logo" class="logo"> -->
      <div class="poster-pic" :style="{'background-image': 'url('+ picUrl +')'}"></div>
      <img :src="lele" class="lele">
    </div>
    <button
      class="img-btn"
      @click="playRecord"
      :style="'background-image:url('+ btnOne +')'">
    </button>
    <button
      class="img-btn-bottom"
      @click="goHome"
      :style="'background-image:url('+ btnTwo +')'">
    </button>
    <follow :show="showQrcode"></follow>
  </div>
</template>

<script>
import utils from '@/client/utils';
import { Toast, Indicator } from 'mint-ui';
import follow from '../follow/follow';
import api from '../../api/index';
import Statistics from '../../statistics';

const bg = require('./images/share.jpg');
const btnOne = require('./images/share-btn1.png');
const btnTwo = require('./images/share-btn2.png');
const logo = require('./images/logo.png');
const lele = require('./images/lele.png');

export default {
  components: {
    follow,
  },
  data() {
    return {
      bg,
      btnOne,
      btnTwo,
      logo,
      lele,
      picUrl: '',
      recordUrl: '',
      localRecordUrl: '',
      showQrcode: false,
    };
  },
  mounted() {
    try {
      Statistics.sharePage();
    } catch (err) {
      throw(err);
    }
    this.$refs.share.style.height = `${document.documentElement.clientHeight}px`;
    this.initInfos();
  },
  methods: {
    goHome() {
      const that = this;
      wx.stopVoice({
        localId: that.localRecordUrl, // 需要停止的音频的本地ID，由stopRecord接口获得
      });
      window.location.href = `http://${window.location.host}/dtu/login.jsp?aid=8899&channel=wx`;
    },
    initInfos() {
      var that = this;
      Indicator.open({
        text: '数据加载中...',
        spinnerType: 'fading-circle',
      });
      api.selectPoster(this, {
        id: that.$route.params.id,
      }, (back) => {
        Indicator.close();
        if (back.body.resCode === '0') {
          that.recordUrl = back.body.repBody[0].audio_url;
          if(back.body.repBody[0].img_url.indexOf('http://') === -1) { // 图片没有上传服务器
            // that.registerWx(back.body.repBody[0].img_url) 如果wx.ready 会覆盖之前wx.ready 采用这个 重新注册分享
            wx.ready(function(){
              that.getWxImage(back.body.repBody[0].poster_url);
            })
          } else {
            that.picUrl = back.body.repBody[0].img_url;
          }
        } else {
          Toast(back.body.resMsg);
        }
      });
    },
    playRecord() {
      const that = this;
      if (utils.getcookie('follow') === '0') {
      // todo：未关注
        this.showQrcode = true;
      } else {
        if (that.recordUrl) {
          wx.downloadVoice({
            serverId: that.recordUrl, // 需要下载的音频的服务器端ID，由uploadVoice接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success(res) {
              const localId = res.localId; // 返回音频的本地ID
              that.localRecordUrl = localId;
              wx.playVoice({
                localId, // 需要播放的音频的本地ID，由stopRecord接口获得
              });
            },
          });
        } else {
          Toast('可能网络原因，音频不见了~');
        }
      }
    },
    getWxImage(serverid) {
      var that = this;
      wx.downloadImage({
        serverId: serverid, // 需要下载的图片的服务器端ID，由uploadImage接口获得
        isShowProgressTips: 1, // 默认为1，显示进度提示
        success: function (res) {
          var localId = res.localId; // 返回图片下载后的本地ID
          wx.getLocalImgData({
            localId, // 图片的localID
            success: function (res) {
              var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
              if(localData.indexOf('data:image/') === -1) {
                that.picUrl = `data:image/jgp;base64,${localData}`;
              } else {
                that.picUrl = localData;
              }
            }
          });
        }
      });
    },
    // registerWx(imgUrl) {
    //   const that = this;
    //   const weixinShare = {
    //     title: '母亲节 | 我的妈呀，你听我说！',
    //     description: '这可能是妈妈最想要的礼物',
    //     imgUrl: 'http://huodong.10155.com/dtu/src/images/mother_share.jpg',
    //   };
    //   wx.config(back.body.repBody, '', () => {

    //     that.getWxImage(imgUrl);

    //     wx.share(weixinShare.title,
    //     weixinShare.description,
    //     "http://huodong.10155.com/dtu/login.jsp?aid=8899&channel=wx#/",
    //     weixinShare.imgUrl, (type) => {
    //       if (type === "success") {
    //         try {
    //           Statistics.share_btn('homePageSuccess');
    //         } catch (err) {
    //           throw(err);
    //         }
    //         return;
    //       }

    //       if (type === "fail") {
    //         try {
    //           Statistics.share_btn('homePageFail');
    //         } catch (err) {
    //           throw(err);
    //         }
    //         return;
    //       }

    //       if (type === "cancel") {
    //         try {
    //           Statistics.share_btn('homePageCancel');
    //         } catch (err) {
    //           throw(err);
    //         }
    //         return;
    //       }
    //     });
    //   });
    // }
  },
};
</script>
<style lang="scss" src='./style.scss'></style>
