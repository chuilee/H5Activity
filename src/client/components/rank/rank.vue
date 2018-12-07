<template>

  <div class="page rank-page" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
    <!-- <mt-loadmore :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"> -->
    <img class="rank-title" :src="title" alt="">
    <div class="search">
      <img :src="search" alt="">
      <input type="number" v-model="workid" @input="debounceInput" placeholder="搜索作品编号">
    </div>
    <div class="rank-container">
      <div class="flex-wrp btns">
        <div class="flex-item">
          <button class="btn-rank" @click="searchWorks('like')" :class="currentRank == 'like' ? 'active' : null"><img :src="rankAll" alt=""></button>
        </div>
        <div class="flex-item">
          <button class="btn-rank" @click="searchWorks('time')" :class="currentRank == 'time' ? 'active' : null"><img :src="rankNew" alt=""></button>
        </div>
      </div>
      <div class="rank-list clearfix">
        <img class="rank-bg" :src="rankBg1" alt="">
        <div class="bscroll-wrapper" ref="rankBScroll">
          <div class="bscroll-container clearfix">
            <div class="work-container"
              v-for="(work, index) in works"
              v-bind:key="'work'+index">
              <div class="work-item">
                <button class="img" @click="getWork(work.img_url)">
                  <img :src="work.img_url" alt="">
                </button>
                <p class="no">NO.{{work.work_id}}</p>
                <div class="clearfix">
                  <div class="like">{{work.like}}</div>
                  <div class="index">排名 {{work.rank}}</div>
                </div>
              </div>
              <button class="btn-work" @click="likeWork(work)"><img :src="likeHim" alt=""></button>
            </div>
          </div>
        </div>
        <img class="rank-bg" :src="rankBg2" alt="">
      </div>
    </div>
    <div class="work-preview" v-show="preview">
      <div class="work">
        <img :src="thumb" alt="">
        <button class="btn-close" @click="preview = false"><img :src="btnClose" alt=""></button>
      </div>
    </div>
    <button class="btn-home" @click="goRouter('home')"><img :src="btnHome" alt=""></button>
  <!-- </mt-loadmore> -->
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import { Toast } from 'mint-ui';
import Debounce from 'debounce';

import api from '@/client/api';

const title = require('../../assets/images/rank-title.png');
const search = require('../../assets/images/search-bg.png');
const rankAll = require('../../assets/images/rank-all.png');
const rankNew = require('../../assets/images/rank-new.png');
const likeHim = require('../../assets/images/btn-like-him.png');
const btnClose = require('../../assets/images/btn-close.png');
const rankBg1 = require('../../assets/images/rank-bg_1.png');
const rankBg2 = require('../../assets/images/rank-bg_2.png');
const btnHome = require("../../assets/images/btn-home1.png");

export default {
  name: 'rank',
  data() {
    return {
      title,
      search,
      rankAll,
      rankNew,
      btnClose,
      likeHim,
      rankBg1,
      rankBg2,
      allLoaded: false,
      wrapperHeight: 0,
      works: [],
      workid: '',
      thumb: '',
      btnHome,
      preview: false,
      currentRank: 'like' // type=like就是点赞榜单,type=time就是新榜
    };
  },
  created() {
    this.searchWorks(this.currentRank)
  },
  mounted() {
    // this.searchWorks('like')
    this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    loadBottom(id) {
      this.searchWorks(this.currentRank);
      this.allLoaded = true;
      this.$refs.loadmore.onBottomLoaded();
    },
    searchWorks(type) {
      this.currentRank = type;

      api.getIndex(this, {
        type: type,
        page_num: 1,
        page_size: 10000,
      }, (response) => {
        console.log(response.body.repBody)
        this.works = response.body.repBody.works;
        // this.$nextTick(() => {
        //   if (!this.scroll) {
        //     this.scroll = new Bscroll(this.$refs.rankBScroll, {})
        //   } else {
        //     this.scroll.refresh()
        //   }
        // })
      }, (err) => {

      })
    },

    debounceInput: Debounce(function (e) {
      if (this.workid == '') {
        this.searchWorks(this.currentRank);
      } else {
        api.getWorkId(this, {
          work_id: this.workid
        }, (response) => {
          console.log(response.body.repBody.works)
          this.works = response.body.repBody.works
        })
      }

    }, 500),

    likeWork(work) {
      api.addLike(this, {
        work_id: work.work_id
      }, (response) => {
        this.liked = true;
        if (response.body.resCode == '0') {
          work.like = parseInt(work.like, 10) + 1;
          return Toast(response.body.resMsg)
        }
        if (response.body.resCode == '10001') {
          return Toast(response.body.resMsg)
        }
      }, (err) => {

      })
    },

    getWork(img_url) {
      this.thumb = img_url;
      this.preview = true;
    },

    goRouter(route, id) {
      if (id) {
        this.$router.push({
          name: route,
          params: {
            id: id
          }
        })
      } else {
        this.$router.push({
          name: route
        })
      }
      
    }
  },
  watch: {

  }
};
</script>
<style lang="scss" src='./style.scss'></style>
