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


export default api;
