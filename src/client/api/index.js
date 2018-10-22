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
    const fullurl = `/kids/${url}`;
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
 * 作品页列表
 * @param {String} page_num
 * @param {String} page_size
 * ...
 *
 */
putApi('getIndex', 'get_index', '1000', '');

/**
 * 我的作品
 * @param {String} page_num
 * @param {String} page_size
 * ...
 *
 */
putApi('getMyWork', 'get_my_work', '1000', '');

/**
 * 保存图片
 * @param {String} page_num
 * @param {String} page_size
 * ...
 * img_url type=material
 * front back left right type=works
 */
putApi('addImg', 'add_img', '1000', '');

/**
 * 根据id获取作品
 * @param {String} page_num
 * @param {String} page_size
 * ...
 *
 */
putApi('getWorkId', 'get_work_by_id', '1000', '');

/**
 * 根据id获取作品
 * @param {String} page_num
 * @param {String} page_size
 * real_name  收货人
address   收货地址
mobile    电话
 *
 */
putApi('updateUserInfo', 'update_user_info', '1000', '');

/**
 * 上传base64格式图片
 * @param {String} page_num
 * @param {String} page_size
 *
 */
putApi('uploadToOss', 'uploadToOss', '1000', '');

/**
 * 点赞作品
 * @param {String} page_num
 * @param {String} page_size
 *
 */
putApi('addLike', 'add_like', '1000', '');

/**
 * 获取js签名
 * @param {String} page_num
 * @param {String} page_size
 *
 */
putApi('getJsConfig', 'getJsConfig', '1000', '');


export default api;
