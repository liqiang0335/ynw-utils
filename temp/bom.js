/**
 * @description 读取location.search
 *
 * @param {String} n 名称
 * @return {String} search值
 * @example
 * 		$.bom.query('mod');
 */
const Bom = {
  query: function(n) {
    var m = window.location.search.match(
      new RegExp("(\\?|&)" + n + "=([^&]*)(&|$)")
    );
    return !m ? "" : decodeURIComponent(m[2]);
  },
  getHash: function(n) {
    var m = window.location.hash.match(
      new RegExp("(#|&)" + n + "=([^&]*)(&|$)")
    );
    return !m ? "" : decodeURIComponent(m[2]);
  }
};
