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
    // const fullurl = `http://192.168.1.123/kids/${url}`;
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
 * 登录
 * @param {String} userAccount手机号
 * @param {String} userPass密码
 * ...
 *
 */
putApi('get', 'manager/get', '1000', '');

/**
 * 登录
 * @param {String} page_size
 * @param {String} page_num
 * ...
 *
 */
putApi('getUserList', 'bg/get_user_list', '1000', '');

/**
 * 登录
 * @param {String} page_size
 * @param {String} page_num
 * ...
 *
 */
putApi('getWorksList', 'bg/get_works_list', '1000', '');

/**
 * 登录
 * @param {String} page_size
 * @param {String} page_num
 * ...
 *
 */
putApi('getMaterialList', 'bg/get_material_list', '1000', '');


export default api;
