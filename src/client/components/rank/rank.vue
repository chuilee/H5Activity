<template>
  <div class="page rank-page">
    <img class="rank-title" :src="title" alt="">
    <div class="search">
      <img :src="search" alt="">
      <input type="text" placeholder="搜索作品编号">
    </div>
    <div class="rank-container">
      <div class="flex-wrp btns">
        <div class="flex-item">
          <button class="btn-rank" @click="searchWorks('like', 'all')" :class="currentRank == 'like' ? 'active' : null"><img :src="rankAll" alt=""></button>
        </div>
        <div class="flex-item">
          <button class="btn-rank" @click="searchWorks('time', 'new')" :class="currentRank == 'time' ? 'active' : null"><img :src="rankNew" alt=""></button>
        </div>
      </div>
      <div class="rank-list clearfix">
        <div class="work-container">
          <div class="work-item">
            <div class="img"></div>
            <p class="no">NO.1234</p>
            <div class="clearfix">
              <div class="like">9999</div>
              <div class="index">排名 10</div>
            </div>
          </div>
          <button class="btn-work"><img :src="likeHim" alt=""></button>
        </div>
        <div class="work-container">
          <div class="work-item">
            <div class="img"></div>
            <p class="no">NO.1234</p>
            <div class="clearfix">
              <div class="like">9999</div>
              <div class="index">排名 10</div>
            </div>
          </div>
          <button class="btn-work"><img :src="likeHim" alt=""></button>
        </div>
        <div class="work-container">
          <div class="work-item">
            <div class="img"></div>
            <p class="no">NO.1234</p>
            <div class="clearfix">
              <div class="like">9999</div>
              <div class="index">排名 10</div>
            </div>
          </div>
          <button class="btn-work"><img :src="likeHim" alt=""></button>
        </div>
        <div class="work-container">
          <div class="work-item">
            <div class="img"></div>
            <p class="no">NO.1234</p>
            <div class="clearfix">
              <div class="like">9999</div>
              <div class="index">排名 10</div>
            </div>
          </div>
          <button class="btn-work"><img :src="likeHim" alt=""></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import { Toast } from 'mint-ui';

import api from '@/client/api';

const title = require('../../assets/images/rank-title.png');
const search = require('../../assets/images/search-bg.png');
const rankAll = require('../../assets/images/rank-all.png');
const rankNew = require('../../assets/images/rank-new.png');
const likeHim = require('../../assets/images/btn-like-him.png');

export default {
  name: 'rank',
  data() {
    return {
      title,
      search,
      rankAll,
      rankNew,
      likeHim,
      currentRank: 'like' // type=like就是点赞榜单,type=time就是新榜
    };
  },
  created() {
    this.searchWorks('like')
  },
  mounted() {
    // this.searchWorks('like')
  },
  methods: {
    searchWorks(type, keyworks) {
      this.currentRank = type;

      api.getIndex(this, {
        type: type,
        page_num: 1,
        page_size: 9999,
      }, (response) => {
        console.log(response.body.reqBody)
      }, (err) => {

      })
    }
  },
  watch: {

  }
};
</script>
<style lang="scss" src='./style.scss'></style>
