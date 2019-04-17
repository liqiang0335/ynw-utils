/**
 * 读取URL中的参数值
 * @param {String} n 名称
 * @return {String}
 */
export default function getParam(n) {
  var m = window.location.search.match(
    new RegExp("(\\?|&)" + n + "=([^&]*)(&|$)")
  );
  return !m ? "" : decodeURIComponent(m[2]);
}
