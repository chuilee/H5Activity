<template>
  <div class="start-section" ref="start">
    <img class="bg" :src="bg" alt="">
    <div
      class="preview-container"
      @click="wxUploadImage">
      <img :src="preveiwImg" :style="preveiwImg_style" alt="">
    </div>
    <div class="btn-wrap">
      <div class="uploadImg" :style="{'background-image': 'url('+ btnTwo +')'}" @click="wxUploadImage"></div>
      <!-- <img :src="btnTwo" class="right" @click="wxUploadImage()"> -->
      <!-- <img :src="btnTwo" class="right" @click="uploadImage()">
      <input type="file" multiple class="uploadImg" @change="fileChange"> -->
      <div class="uploadImg left" :style="{'background-image': 'url('+ btnOne +')'}" @click="record"></div>
    </div>
    <div class="img-btn" :style="{'background-image': 'url('+ btnThree +')'}" @click="createPoster"></div>
    <div class="modal" ref="modal" v-show="showModal">
      <div class="modal-con">
        <img :src="modalBg" class="img">
        <p>{{timeH}}{{timeHT}}:{{timeM}}{{timeMT}}:{{timeS}}{{timeST}}</p>
      </div>
      <div class="modal-btn">
          <button :style="{'background-image': 'url('+ tryBtnBg +')'}" @click="tryFun"></button>
          <button :style="{'background-image': 'url('+ recordBtnBg +')'}" @click="startFun"></button>
          <button :style="{'background-image': 'url('+ doneBtnBg +')'}" @click="uploadRecord"></button>
        </div>
    </div>
    <div class="modal" ref="isRecordModal" v-show="isRecordModal">
      <div class="modal-con isrecord-modal">
        <img :src="isRecordImg" class="img">
        <div class="btns">
          <div class="flex-wrp">
            <div class="flex-item">
              <button @click="isRecordModal = false">取消</button>
            </div>
            <div class="flex-item">
              <button @click="resetRecord">确定</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Indicator } from 'mint-ui';
import utils from '@/client/utils';
import api from '../../api/index';
import Statistics from '../../statistics';

const bg = require('./images/game-bg.jpg');
const btnOne = require('./images/btn1.png');
const btnTwo = require('./images/btn2.png');
const btnThree = require('./images/btn3.png');
const modalBg = require('./images/modal.png');
const startImg = require('./images/start2.png');
const endImg = require('./images/end2.png');
const tryImg = require('./images/try.png');
const tryImgDisbale = require('./images/try_disable.png');
const doneImg = require('./images/end.png');
const doneImgDisable = require('./images/end_disable.png');
const isRecordImg = require('./images/isrecord.png');
const preveiwImg = require('./images/picPreview.png')

export default {
  components: {
  },
  data() {
    return {
      bg,
      btnOne,
      btnTwo,
      btnThree,
      modalBg,
      startImg,
      tryImg,
      tryImgDisbale,
      endImg,
      doneImg,
      doneImgDisable,
      isRecordImg,
      preveiwImg,
      timeH: 0,
      timeM: 0,
      timeS: 0,
      timeHT: 0,
      timeMT: 0,
      timeST: 0,
      interval: null,
      showModal: false,
      isRecord: false,
      isDone: false,
      recordUrl: '', // 微信服务器音频地址
      localUrl: '', // 本地音频地址
      picUrl: '',
      wxPicUrl: '',
      localPicUrl: '',
      isRecordModal: false,
      playing: false,
      tryBtnBg: tryImgDisbale,
      doneBtnBg: doneImgDisable,
      recordBtnBg: startImg,
      preveiwImg_style: '',
    };
  },
  mounted() {
    try {
      Statistics.startPage();
    } catch (err) {
      throw (err);
    }
    // if (document.documentElement.clientHeight) {
    //   this.$refs.start.style.minHeight = `${document.documentElement.clientHeight}px`;
    // } else {
    //   this.$refs.start.style.minHeight = `${document.body.offsetHeight}px`;
    // }
  },
  methods: {
    fileChange(event) { // 上传照片
      let that = this;
      let target = event.srcElement || event.target
      if (target.files[0] &&
        target.files[0].type.indexOf('image') !== -1) {
        const form = new FormData();
        form.append('Content-Type', target.files[0].type ||
        'application/octet-stream');
        // our request will have the file in the ['file'] key
        form.append('file', target.files[0]);

        Indicator.open({
          text: '上传图片中...',
          spinnerType: 'fading-circle',
        });
        this.$http.post('/dtu/upload/upVideoOrFile', form)
          .then((response) => {
            Indicator.close();
            if (response.body.resCode === '0') {
              this.picUrl = `http://huodong.10155.com/images/fsd/${response.body.repBody.fileUrl}`;
              this.preveiwImg = `http://huodong.10155.com/images/fsd/${response.body.repBody.fileUrl}`;

              try {
                Statistics.upload_btn('startPageSuccess');
              } catch (err) {
                throw (err);
              }
            } else {
              Toast(response.body.resMsg);
              try {
                Statistics.upload_btn('startPageFail');
              } catch (err) {
                throw (err);
              }
            }
          }, (errResponse) => {
            Indicator.close();
            Toast('文件上传失败');
            try {
              Statistics.upload_btn('startPageFail');
            } catch (err) {
              throw (err);
            }
          });
      } else {
        Toast('未选择任何图片');
      }
    },
    startFun() { // 开始录音
      if (!this.isRecord) {
        wx.startRecord();

        this.timeST = 0;
        this.timeS = 0;
        this.interval = setInterval(() => {
          this.timeST += 1;
          if (this.timeST > 9) {
            this.timeS = this.timeS + 1;
            this.timeST = 0;
            // clearInterval(interval);
          }
          if (this.timeS === 3) {
            this.stopRecord();
            clearInterval(this.interval);
          }
        }, 1000);
        this.isRecord = true;
        this.isDone = false;
      } else {
        this.stopRecord();
        clearInterval(this.interval);
      }
    },
    tryFun() {
      const that = this;
      if(that.isDone){
        if (!that.isRecord) {
          // todo: 试听
          if (that.playing) {
            that.playing = false;
            wx.stopVoice({
              localId: that.localUrl, // 需要停止的音频的本地ID，由stopRecord接口获得
            });
          } else {
            that.playing = true;
            wx.playVoice({
              localId: that.localUrl, // 需要播放的音频的本地ID，由stopRecord接口获得
            });
          }
        }
      }
    },
    stopRecord() {
      const that = this;
      this.isRecord = false;
      // const recordTime = `${this.timeS}${this.timeST}`; // 最低录音时长限制
      // if (parseInt(recordTime, 10) < 15) {
      //   this.timeST = 0;
      //   this.timeS = 0;
      //   this.isDone = false;
      //   wx.stopRecord({ // 小于15s 不保存录音
      //     success(res) {
      //       that.localUrl = '';
      //     },
      //   });
      //   Toast('录音时间不能小于15s');
      // } else {
        this.isDone = true;
        wx.stopRecord({
          success(res) {
            that.localUrl = res.localId;
          },
        });
      // }
    },
    uploadRecord() {
      const that = this;
      if(that.isDone){
        if (!this.isRecord) {
          // todo: 保存录音
          this.showModal = false;
          wx.stopVoice({
            localId: that.localUrl, // 需要停止的音频的本地ID，由stopRecord接口获得
          });
          wx.uploadVoice({
            localId: that.localUrl, // 需要上传的音频的本地ID，由stopRecord接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success(res) {
              that.recordUrl = res.serverId; // 返回音频的服务器端ID
              try {
                Statistics.record_btn('startPage');
              } catch (err) {
                throw (err);
              }
            },
            fail() {
              try {
                Statistics.record_btn('recordPage');
              } catch (err) {
                throw (err);
              }
            },
          });
        }
      }
    },
    record() { // 判断用户是否已经录制过祝福
      if (this.recordUrl) {
        this.isRecordModal = true;
      } else {
        this.showModal = true;
      }
    },
    resetRecord() {
      this.isRecordModal = false;
      this.showModal = true;
      this.recordUrl = '';
    },
    createPoster() {
      // that.$router.push({
      //   name: 'poster',
      //   params: {
      //     pic: '111',
      //     id: '111',
      //   },
      // });
      // return
      var that = this;
      if (this.wxPicUrl === '') {
        return Toast('请上传一张妈妈的照片吧');
      }
      if (this.recordUrl === '') {
        return Toast('请录制一段祝福吧');
      }
      Indicator.open({
        text: '合成海报中...',
        spinnerType: 'fading-circle',
      });

      api.addPoster(this, {
        audio_url: this.recordUrl,
        id: '',
        img_url: '', // 服务器图片路径 this.picUrl
        poster_url: this.wxPicUrl, // 微信服务器图片
        share_img_url: '',
        usid: utils.getcookie('session_wx_user_id'),
      }, (back) => {
        Indicator.close();
        if (back.body.resCode === '0') {
          that.$router.push({
            name: 'poster',
            params: {
              pic: encodeURI(that.localPicUrl),
              id: back.body.resMsg,
            },
          });
          try {
            Statistics.poster_btn('posterPage');
          } catch (err) {
            throw (err);
          }
        } else {
          Toast(back.body.resMsg);
          try {
            Statistics.poster_btn('startPage');
          } catch (err) {
            throw (err);
          }
        }
      });
    },
    wxUploadImage() {
      // this.preveiwImg = 'http://huodong.10155.com/images/fsd/ap/20180510/88_1941367c_c18b_4f8f_a827_d36c4034edab.jpg'
      // const img = new Image()
      // img.src = this.preveiwImg;
      // img.onload = () => {
      //   if (img.width > img.height) {
      //     this.preveiwImg_style = 'height: 100%; width: auto';
      //   } else {
      //     this.preveiwImg_style = 'width: 100%; height: auto';
      //   }
      // }
      // return;
      var that = this;
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          that.localPicUrl = res.localIds[0]; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
          wx.uploadImage({
            localId: that.localPicUrl, // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (res) {
              that.wxPicUrl = res.serverId; // 返回图片的服务器端ID
              wx.getLocalImgData({
                localId: that.localPicUrl, // 图片的localID
                success: function (res) {
                  var localData = res.localData; // localData是图片的base64数据，可以用img标签显示
                  if (localData.indexOf('data:image') === -1) { // 安卓手机下是没有data:image前缀的
                    that.preveiwImg = `data:image/jgp;base64,${localData}`;
                  } else {
                    that.preveiwImg = localData;
                  }
                  // android 下background不支持这里的base64图片, 只能通过img方式
                  const img = new Image()
                  img.src = that.preveiwImg;
                  img.onload = () => {
                    if (img.width > img.height) {
                      that.preveiwImg_style = 'height: 100%; width: auto';
                    } else {
                      that.preveiwImg_style = 'width: 100%; height: auto';
                    }
                  }
                }
              });
            }
          });
        }
      });
    },
  },
  watch: {
    'isDone'(v) {
      if(v) {
        this.tryBtnBg = tryImg;
        this.doneBtnBg = doneImg;
      } else {
        this.tryBtnBg = tryImgDisbale;
        this.doneBtnBg = doneImgDisable;
      }
    },
    'isRecord'(v) {
      if(v) {
        this.recordBtnBg = endImg;
      } else {
        this.recordBtnBg = startImg;
      }
    }
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
