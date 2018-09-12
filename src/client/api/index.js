import utils from '../utils';

const api = {};

function getCreds(proNo, body) {
  return {
    base: {
      reqTime: utils.formatDate(),
      proNo,
    },
    body,
  };
}
function putApi(name, url, code, method) {
  let httpmethod = method;
  if (!httpmethod) {
    httpmethod = 'post';
  }
  api[name] = (context, body, fun, funErr) => {
    const fullurl = `/dtu/${url}`;
    context.$http[httpmethod](fullurl, getCreds(code, body))
      .then((response) => {
        // success
        if (fun) {
          fun(response);
        }
      }, (response) => {
        // error
        if (funErr) {
          funErr(response);
        }
      });
  };
}
/**
 * 微信获取签名
 * @return {Object}
 */
putApi('wmObtainJssdk', 'stat/wmObtainJssdk', '70008')
/**
 * 插入,修改海报
 * @return {Object}
 */
putApi('addPoster', 'momday/addPoster', '90001')
/**
 * 查询海报
 * @return {Object}
 */
putApi('selectPoster', 'momday/selectPoster', '90002')

/**
 * 上传附件
 * @return {Object}
 */
putApi('upVideoOrFile', 'upload/upVideoOrFile', '70008')

/**
 * 下载微信图片到服务器
 * @return {Object}
 */
putApi('uploadFileFromWx', 'upload/uploadFileFromWx', '90003')

export default api;
