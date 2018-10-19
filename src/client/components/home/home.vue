<template>
  <div class="page home-page">
    <button class="btn-details" @click="activityDetails = true"><img :src="details" alt=""></button>
    <img class="kids" :src="kids" alt="">
    <button class="btn-start" @click="startFn"><img :src="start" alt=""></button>
    <div class="flex-wrp">
      <div class="flex-item">
        <button class="btn-rank" @click="goRank"><img :src="rank" alt=""></button>
      </div>
      <div class="flex-item">
        <button class="btn-works" @click="goMyWork"><img :src="works" alt=""></button>
      </div>
    </div>
    <div class="details-container" v-show="activityDetails"  @click="activityDetails = false">
      <div class="details">
        <img class="details-title" :src="detailsTitle" alt="">
        <div class="details-content">
          <div class="BScroll" ref="BScroll">
            <div class="container">
              <p class="title">进入创作设计个性鞋款后，<br>上传作品即有机会获得免费定制鞋名额。</p>
              <img class="title-rule" :src="titleRule" alt="">
              <div class="rule-item">
                <span class="index">1</span>
                <p>活动截止后人气最高100名作品，将由KIDS.ING免费制作出鞋品赠送给设计者</p>
              </div>
              <div class="rule-item">
                <span class="index">2</span>
                <p>以投票数为人气标准，不允许存在刷票舞弊行为，若经发现则取消该参赛资格</p>
              </div>
              <div class="rule-item">
                <span class="index">3</span>
                <p>一个ID每天只能给一个选手作品投一票</p>
              </div>
              <div class="rule-item">
                <span class="index">4</span>
                <p>上传作品注意填写联系方式，作为后期认领凭证</p>
              </div>
              <div class="rule-item">
                <span class="index">5</span>
                <p>获奖鞋品将在30个工作日内完成制作并配送</p>
              </div>
              <div class="rule-item">
                <span class="index">2</span>
                <p>以投票数为人气标准，不允许存在刷票舞弊行为，若经发现则取消该参赛资格</p>
              </div>
              <div class="rule-item">
                <span class="index">3</span>
                <p>一个ID每天只能给一个选手作品投一票</p>
              </div>
              <div class="rule-item">
                <span class="index">4</span>
                <p>上传作品注意填写联系方式，作为后期认领凭证</p>
              </div>
              <div class="rule-item">
                <span class="index">5</span>
                <p>获奖鞋品将在30个工作日内完成制作并配送</p>
              </div>
              <div class="rule-item">
                <span class="index">5</span>
                <p>获奖鞋品将在30个工作日内完成制作并配送</p>
              </div>
              <div class="rule-item">
                <span class="index">2</span>
                <p>以投票数为人气标准，不允许存在刷票舞弊行为，若经发现则取消该参赛资格</p>
              </div>
              <div class="rule-item">
                <span class="index">3</span>
                <p>一个ID每天只能给一个选手作品投一票</p>
              </div>
              <div class="rule-item">
                <span class="index">4</span>
                <p>上传作品注意填写联系方式，作为后期认领凭证</p>
              </div>
              <div class="rule-item">
                <span class="index">5</span>
                <p>获奖鞋品将在30个工作日内完成制作并配送</p>
              </div>
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

const start = require('../../assets/images/btn-start.png');
const kids = require('../../assets/images/kids.png');
const details = require('../../assets/images/btn-details.png');
const rank = require('../../assets/images/btn-rank.png');
const works = require('../../assets/images/btn-works.png');
const detailsTitle = require('../../assets/images/details-title.png');
const titleRule = require('../../assets/images/title-rule.jpg');
const ruleIndex = require('../../assets/images/rule-index.jpg');

export default {
  name: 'home',
  data() {
    return {
      start,
      kids,
      details,
      rank,
      works,
      detailsTitle,
      titleRule,
      ruleIndex,
      activityDetails: false,
    };
  },
  mounted() {
    this.$nextTick(() => {
      if (!this.scroll) {
        this.scroll = new Bscroll(this.$refs.BScroll, {})
      } else {
        this.scroll.refresh()
      }
    })
  },
  methods: {
    startFn() {
      this.$router.push({
        name: 'diy',
      })
    },
    goRank() {
      this.$router.push({
        name: 'rank',
      })
    },
    goMyWork() {
      this.$router.push({
        name: 'my-work',
      })
    }
  },
  watch: {
    activityDetails(v) {
      if (v) {
        this.$nextTick(() => {
          this.scroll.refresh()
        })
      }
    }
  }
};
</script>
<style lang="scss" src='./style.scss'></style>
