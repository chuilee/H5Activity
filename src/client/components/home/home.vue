<template>
  <div class="page home-page">
    <img class="diy-slogan" :src="slogan" alt="">
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
              <p class="title">
                参与KIDS.ING童鞋定制创作，<br>邀朋友投票助力即有机会获得免费定制名额，<br>限量100名噢！
              </p>
              <img class="title-rule" :src="titleRule" alt="">
              <!-- <p class="tmall">上天猫“kidsing旗舰店”可直接定制</p> -->
              <div>
                <p style="margin-bottom: 10px;">100名免费定制评选规则：</p>
              </div>
              <div class="rule-item">
                <span class="index">1</span>
                <p>活动将选出投票数最高前100名作品，获得免费定制特权；</p>
              </div>
              <div class="rule-item">
                <span class="index">2</span>
                <p>每个ID只能获得一次免费定制权；</p>
              </div>
              <div class="rule-item">
                <span class="index">3</span>
                <p>每位投票者每天有5票投票权；</p>
              </div>
              <div class="rule-item">
                <span class="index">4</span>
                <p>上传作品注意填写联系方式，作为后期认领凭证；</p>
              </div>
              <div class="rule-item">
                <span class="index">5</span>
                <p>不允许存在刷票舞弊行为，若经发现则取消该参赛资格；</p>
              </div>
              <div class="rule-item">
                <span class="index">6</span>
                <p>获奖鞋品将在30个工作日内完成制作并配送；</p>
              </div>
              <div class="rule-item">
                <span class="index">7</span>
                <p>所有获奖作品必须原创，KIDS.ING享有作品的使用权</p>
              </div>
              <div class="rule-item">
                <span class="index">8</span>
                <p>本活动时间截止2018年12月12日；</p>
              </div>
              <div class="rule-item">
                <span class="index">9</span>
                <p>如存在活动方面疑问，请联系微信客服kidsing888；</p>
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
const kids = require('../../assets/images/home.gif');
const details = require('../../assets/images/btn-details1.png');
const rank = require('../../assets/images/btn-rank1.png');
const works = require('../../assets/images/btn-works1.png');
const detailsTitle = require('../../assets/images/details-title1.png');
const titleRule = require('../../assets/images/details-rule.png');
const ruleIndex = require('../../assets/images/rule-index1.png');
const slogan = require("../../assets/images/slogan2.png");

export default {
  name: 'home',
  data() {
    return {
      start,
      kids,
      details,
      rank,
      works,
      slogan,
      detailsTitle,
      titleRule,
      ruleIndex,
      activityDetails: false,
    };
  },
  mounted() {
    // this.$root.$refs.goback.style.display='none';
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
