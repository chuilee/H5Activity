/* eslint-disable */

window._rAF = (() => {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function  (callback) {
      window.setTimeout(callback, 16);
    };
})();
const cancelAnimationFrame = window.cancelAnimationFrame ||
  window.webkitCancelAnimationFrame ||
  window.mozCancelAnimationFrame ||
  window.webkitCancelRequestAnimationFrame;
const DomUtil = {
  requestAnimationFrame: function (cb) {
    return window._rAF(cb);
  },
  cancelAnimationFrame: function (requestId) {
    cancelAnimationFrame(requestId);
  },
  animationFrameThrottle: function (cb) {
    let isQueued;
    return () => {
      const args = arguments;
      const context = this;
      if (!isQueued) {
        isQueued = true;
        this.requestAnimationFrame(() => {
          cb.apply(context, args);
          isQueued = false;
        });
      }
    };
  },
};

module.exports = DomUtil;
