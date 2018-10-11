<template>
  <div class="page">
    <div id="svg-container" style="width: 100%"></div>
    <div id="container1">
      <mt-button id="selectfiles1">选择图片</mt-button>
      <mt-button id="postfiles" @click="uploadPic">开始上传</mt-button>
    </div>
    <img :src="workImg" alt="">
    <canvas id="workCanvas" style="display: none;"></canvas>
    <mt-button @click="createWork()">完成并上传</mt-button>
    <!-- <object id="shoes-1" type="image/svg+xml" :data="shoes_1" style="display:block;width:330px;height:240px" >
      <param name="src" :value="shoes_1">
    </object> -->
  </div>
</template>

<script>
import { Toast } from 'mint-ui';

import Upload from '../../utils/Upload';

const shoes_1 = require('./images/shoe2.svg');

export default {
  name: 'diy',
  data() {
    return {
      shoes_1,
      isUploadSuccess1: 0,
      percent1: 0,
      sendPic: '',
      workImg: '',
    };
  },
  mounted() {
    // var svg = document.querySelector('#shoes-1').contentDocument;
    // console.log(svg)
    // svg.querySelectorAll('.cls-3').forEach((item, index) => {
    //   console.log(item)
    //   item.style.fill='red';
    // })
    console.log(Upload.upload)
    this.sendPic = Upload.upload(this, (url) => {
      console.log(url)
      document.querySelector('#imgPath').setAttribute('xlink:href', url);
    }, 1);

    this.$http['get'](this.shoes_1)
      .then((response) => {
        console.log(document.querySelector('#svg-container'));
        document.querySelector('#svg-container').innerHTML = response.body;
        document.querySelectorAll('.part2').forEach((item, index) => {
          console.log(item)
          item.style.fill='red';
        })
        // document.querySelector('#imgPath').setAttribute('xlink:href', 'https://xd-learn.oss-cn-shenzhen.aliyuncs.com/learn/mp3/20181011/1539246726879.jpg');
        let svg = document.querySelector('#svg-container').innerHTML;
        this.workImg = 'data:image/svg+xml;base64,' +  window.btoa(unescape(encodeURIComponent(svg)))
        // this.workImg = 'data:image/svg+xml,' + unescape(encodeURIComponent(svg));//svg内容中可以有中文字符
      }, (error) => {

      })
  },
  methods: {
    uploadPic() {
      // console.log(this.sendPic)
      Upload.setUploadParam(this.sendPic, '')
    },
    createWork() {
      const that = this;
      let canvas = document.getElementById("workCanvas"),
        ctx = canvas.getContext("2d"),
        w = window.innerWidth,
        h = window.innerHeight;

      canvas.width = 375 * 2;
      canvas.height = 223 * 2;
      canvas.style.width = 375 + "px";
      canvas.style.height = 223 + "px";


    },
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
<style lang="scss" scoped>

	.btn{
        color: #fff;
	    background-color: #337ab7;
	    border-color: #2e6da4;
	    display: inline-block;
	    padding: 6px 12px;
	    margin-bottom: 0;
	    font-size: 14px;
	    font-weight: 400;
	    line-height: 1.42857143;
	    text-align: center;
	    white-space: nowrap;
	    text-decoration: none;
	    vertical-align: middle;
	    -ms-touch-action: manipulation;
	    touch-action: manipulation;
	    cursor: pointer;
	    -webkit-user-select: none;
	    -moz-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
	    background-image: none;
	    border: 1px solid transparent;
	    border-radius: 4px;
	}
	a.btn:hover{
      background-color: #3366b7;
	}
	.progress{
		margin-top:2px;
	    width: 200px;
	    height: 14px;
	    margin-bottom: 10px;
	    overflow: hidden;
	    background-color: #f5f5f5;
	    border-radius: 4px;
	    -webkit-box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
	    box-shadow: inset 0 1px 2px rgba(0,0,0,.1);
	}
	.progress-bar{
		background-color: rgb(92, 184, 92);
		background-image: linear-gradient(45deg, rgba(255, 255, 255, 0.14902) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 0.14902) 50%, rgba(255, 255, 255, 0.14902) 75%, transparent 75%, transparent);
		background-size: 40px 40px;
		box-shadow: rgba(0, 0, 0, 0.14902) 0px -1px 0px 0px inset;
		box-sizing: border-box;
		color: rgb(255, 255, 255);
		display: block;
		float: left;
		font-size: 12px;
		height: 20px;
		line-height: 20px;
		text-align: center;
		transition-delay: 0s;
		transition-duration: 0.6s;
		transition-property: width;
		transition-timing-function: ease;
		width: 266.188px;
	}
</style>
