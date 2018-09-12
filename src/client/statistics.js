let channel_id = 'weixin';// 渠道号, 必填
let aid = 8899; // 活动id, 必填
let pathUrl = 'http://huodong.10155.com/gsu/activity.jsp?aid=' + aid + '&channle=' + channel_id + '#!/'
let visitPageCode = 'home' // 进入页面URL, 必填
let gatePageCode = 'null' // 当前页面URL, 必填
let gateModel = '' // 操作入口, 必填
let operate = 'load' // 必填
let contentId = '' // 选填
let account = '' // 选填
let portal = 'wap' // 必填
let nextPageUrl = pathUrl // 去往页面URL, 必填
let accountType = window.openid || 'phone' //
let songlistid = ''
let nameid = 'aid='+aid

export default {
  // 首页pv/uv
  homePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'homePage',
        'null',
        '首页',
        'login',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        'startPage',
        songlistid,
        nameid
      )
    }
  },
  // 留声机页面pv/uv
  startPage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'startPage',
        'homePage',
        '留声机页面',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        'startPage',
        songlistid,
        nameid)
    }
  },
  // 生成海报页面
  posterPage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'posterPage',
        'startPage',
        '生成海报页面',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        'null',
        songlistid,
        nameid)
    }
  },
  // 查看分享页面pv/uv
  sharePage: () => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'sharePage',
        'posterPage',
        '分享页面',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        'homePage',
        songlistid,
        nameid)
    }
  },
  // 上传图片人数
  upload_btn: (nextPage) => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'startPage',
        'startPage',
        '上传图片',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPage,
        songlistid,
        nameid)
    }
  },
  // 录制祝福人数
  record_btn: (nextPage) => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'recordPage',
        'recordPage',
        '录制',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPage,
        songlistid,
        nameid)
    }
  },
  // 生成海报
  poster_btn: (nextPage) => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'startPage',
        'startPage',
        '生成海报',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPage,
        songlistid,
        nameid)
    }
  },
  // 分享人数
  share_btn: (nextPage) => {
    if (window.submitStatInfo) {
      submitStatInfo(
        'homePage',
        'homePage',
        '分享',
        'click',
        contentId,
        account,
        portal,
        channel_id,
        accountType,
        nextPage,
        songlistid,
        nameid)
    }
  },
}
