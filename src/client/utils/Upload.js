import {
  Toast,
  Indicator
} from 'mint-ui';
import '../../../static/crypto-min';
import '../../../static/hmac-min';
import '../../../static/sha1-min';
import Base64 from '../../../static/base64';
import utils from './Utils';

let accessid = 'LTAIBIySKafuaaYh';
let accesskey = '4LgWJemVuiscrs7UOp2oxoXUqX9ERu';
let host = 'http://litecoder.oss-cn-shenzhen.aliyuncs.com';
let policyBase64 = '';
let signature = '';
let path = '';
/**
 * 获取签名
 * @return {[type]} [description]
 */
const policyText = {
  expiration: '2020-01-01T12:00:00.000Z', // 设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了
  conditions: [
    ['content-length-range', 0, 1048576000], // 设置上传文件的大小限制
  ]
};

policyBase64 = Base64.encode(window.JSON.stringify(policyText));
const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
  asBytes: true,
});
signature = Crypto.util.bytesToBase64(bytes);

/**
 * 获取后缀名
 * @param  {[String]} filename [文件名]
 * @return {[type]}          [description]
 */
function getSuffix(filename) {
  const pos = filename.lastIndexOf('.');
  let suffix = '';
  if (pos !== -1) {
    suffix = filename.substring(pos);
  }
  return suffix;
}

function setUploadParam(up, filename, ret) {
  path = `kidsing/${utils.formatDate('yyyyMMdd')}/${Date.now()}${getSuffix(filename)}`;
  const newMultipartParams = {
    key: path,
    policy: policyBase64,
    OSSAccessKeyId: accessid,
    success_action_status: '200', // 让服务端返回200,不然，默认会返回204
    signature,
  };

  up.setOption({
    url: host,
    multipart_params: newMultipartParams,
  });

  up.start();
}

function upload(self, callback, id) {
  const uploader = new plupload.Uploader({
    runtimes: 'html5,flash,silverlight,html4',
    browse_button: id ? `selectfiles${id}` : 'selectfiles',
    multi_selection: false,
    container: document.getElementById(id ? `container${id}` : 'container'),
    flash_swf_url: '../../../static/Moxie.swf',
    silverlight_xap_url: '../../../static/Moxie.xap',
    url: 'http://litecoder.oss-cn-shenzhen.aliyuncs.com',

    init: {
      PostInit() {
        console.log(id);
      },

      FilesAdded(up, files) {
        console.log(files)
        setUploadParam(uploader, '', false);
      },

      BeforeUpload(up, file) {
        // alert(file.name)
        if (/.(vob|ifo|mpg|mpeg|dat|mp4|3gp|mov|rm|ram|rmvb|wmv|asf|avi|asx)$/.test(file.name.toLowerCase())) {
          Toast('请上传图片文件')
          return;
        }
        Indicator.open('图片正在上传...');
        setUploadParam(up, file.name, true);
      },

      UploadProgress(up, file) {
        self[id ? `isUploadSuccess${id}` : 'isUploadSuccess'] = false;
        self[id ? `percent${id}` : 'percent'] = file.percent;
        if (self[id ? `percent${id}` : 'percent'] === 100) {
          self[id ? `isUploadSuccess${id}` : 'isUploadSuccess'] = true;
        }
      },

      FileUploaded(up, file, info) {
        Indicator.close();
        callback(`https://litecoder.oss-cn-shenzhen.aliyuncs.com/${path}`);
      },

      Error(up, err) {

      },
      Destroy(up) {
        console.log('dest');
      }
    }
  });
  uploader.init();
  return uploader;
}
export default {
  upload,
  setUploadParam,
};
