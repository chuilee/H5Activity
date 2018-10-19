<template>
  <div class="page rank-page">
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
        <div class="bscroll-wrapper" ref="rankBScroll">
          <div class="bscroll-container clearfix">
            <div class="work-container"
              v-for="(work, index) in works"
              v-bind:key="'work'+index">
              <div class="work-item">
                <div class="img">
                  <img :src="work.img_url" alt="">
                </div>
                <p class="no">NO.{{work.work_id}}</p>
                <div class="clearfix">
                  <div class="like">{{work.like}}</div>
                  <div class="index">排名 {{work.rn}}</div>
                </div>
              </div>
              <button class="btn-work"><img :src="likeHim" alt=""></button>
            </div>
          </div>
        </div>
      </div>
    </div>
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

export default {
  name: 'rank',
  data() {
    return {
      title,
      search,
      rankAll,
      rankNew,
      likeHim,
      works: [],
      workid: '',
      currentRank: 'like' // type=like就是点赞榜单,type=time就是新榜
    };
  },
  created() {
    this.searchWorks(this.currentRank)
  },
  mounted() {
    // this.searchWorks('like')
  },
  methods: {
    searchWorks(type) {
      this.currentRank = type;

      api.getIndex(this, {
        type: type,
        page_num: 1,
        page_size: 9999,
      }, (response) => {
        console.log(response.body.repBody)
        this.works = response.body.repBody.works;
        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.rankBScroll, {})
          } else {
            this.scroll.refresh()
          }
        })
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

    }, 500)
  },
  watch: {

  }
};
</script>
<style lang="scss" src='./style.scss'></style>
