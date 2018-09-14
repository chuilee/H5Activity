<template>
  <div class="start-section" ref="start">
    <img class="bg" :src="bg" alt="">
    <transition name="fade">
      <div
        class="preview-container"
        v-if="show">
        <img :src="preveiwImg" :style="preveiwImg_style" alt="">
      </div>
    </transition>
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
      show: false,
    };
  },
  mounted() {

  },
  methods: {
    fileChange(event) { // 上传照片

    },
    startFun() { // 开始录音

    },
    tryFun() {

    },
    stopRecord() {

    },
    uploadRecord() {

    },
    record() { // 判断用户是否已经录制过祝福

    },
    resetRecord() {

    },
    createPoster() {
      this.$router.push({
        name: 'poster',
        params: {
          pic: 'url',
          id: 'id',
        },
      });
    },
    wxUploadImage() {
      this.show = !this.show;
    },
  },
  watch: {

  },
};
</script>
<style lang="scss" src='./style.scss'></style>
<style>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
