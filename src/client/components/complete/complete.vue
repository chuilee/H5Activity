<template>
  <div class="page complete-page">
    <button class="btn-rebuild" @click=""><img :src="rebuild" alt=""></button>
    <div class="left-container" ref="left_side" style="width: 100%"></div>
    <img class="slogan" :src="slogan" alt="">
    <div class="input">
      <img :src="input" alt="">
      <input type="number" placeholder="填写电话号码，作为后期认领凭证">
    </div>
    <button class="btn-done" @click=""><img :src="btnDone" alt=""></button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui';
import Utils from '@/client/utils';

const rebuild = require('../../assets/images/btn-rebuild.png');
const slogan = require('../../assets/images/finish-slogan.png');
const input = require('../../assets/images/input-bg.png');
const btnDone = require('../../assets/images/btn-done.png');
const shoe_left = require('../diy/images/shoe_left.svg');

export default {
  name: 'complete',
  data() {
    return {
      rebuild,
      slogan,
      input,
      btnDone,
      shoe_left,
      activityDetails: false,
      parts: ['front_part_1', 'front_part_2', 'front_part_3', 'front_part_4', 'front_part_5','left_part_2']
    };
  },
  mounted() {
    const hash = (new Date()).getTime();
    this.$http['get'](`${this.shoe_left}?hash=${hash}`)
      .then((response) => {
        console.log(document.querySelector('#left-container'));
        this.$refs.left_side.innerHTML = response.body;

        document.querySelectorAll('.left_part_1').forEach((part,index) => {
          part.setAttribute('xlink:href', decodeURIComponent(Utils.getcookie('image_url')));
        })

        this.parts.forEach((part, index) => {
          // debugger
          document.querySelectorAll('.'+part).forEach((item, index) => {
            if (part == 'front_part_5') {
              item.style.stroke = decodeURIComponent(Utils.getcookie(part));
              document.querySelector('.left_side.'+part).style.fill = decodeURIComponent(Utils.getcookie(part));
            } else {
              item.style.fill = decodeURIComponent(Utils.getcookie(part));
            }
          })
          // document.querySelector('.' + part).style.fill = decodeURIComponent(Utils.getcookie(part))
        })
      }, (error) => {

      });
  },
  methods: {

  },
  watch: {

  }
};
</script>
<style lang="scss" src='./style.scss'></style>
