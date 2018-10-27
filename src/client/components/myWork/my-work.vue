<template>
  <div class="page my-work-page">
    <div class="rank-container">
      <div class="flex-wrp btns">
        <div class="flex-item">
          <img class="btn-mywork" :src="mywork" alt="">
        </div>
      </div>
      <div class="rank-list">
        <div class="bscroll-wrapper" ref="BScroll">
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
              <button class="btn-work" @click="goRouter('work-details', work.work_id)"><img :src="likeHim" alt=""></button>
            </div>
            <div class="work-container">
              <button class="work-item create" @click="goRouter('diy')">
                <img class="go-create" :src="gocreate" alt="">
              </button>
              <button class="btn-work" @click="goRouter('diy')"><img :src="btnGocreate" alt=""></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="work-preview" v-show="preview">
      <img class="work" :src="thumb" alt="">
      <button class="btn-close" @click="preview = false"><img :src="btnClose" alt=""></button>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll';
import { Toast } from 'mint-ui';

import api from '@/client/api';

const mywork = require('../../assets/images/mywork-title.png');
const likeHim = require('../../assets/images/btn-invite-friend.png');
const btnGocreate = require('../../assets/images/btn-go-create.png');
const gocreate = require('../../assets/images/go-create.png');
const btnClose = require('../../assets/images/btn-close.png');

export default {
  name: 'my-work',
  data() {
    return {
      mywork,
      likeHim,
      gocreate,
      btnClose,
      btnGocreate,
      works: [],
      thumb: '',
      preview: false
    };
  },
  created() {
    this.getWorks();
  },
  mounted() {
    // this.searchWorks('like')
  },
  methods: {
    getWorks() {
      api.getMyWork(this, {
      }, (response) => {
        console.log(response.body.repBody)
        this.works = response.body.repBody;

        this.$nextTick(() => {
          if (!this.scroll) {
            this.scroll = new Bscroll(this.$refs.BScroll, {})
          } else {
            this.scroll.refresh()
          }
        })
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
