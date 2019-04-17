/**
 * @description 读取URL中的HASH值
 * @param {String} n 名称
 *
 * @return {String}
 */
export default function getURLHash(n) {
  var m = window.location.hash.match(new RegExp("(#|&)" + n + "=([^&]*)(&|$)"));
  return !m ? "" : decodeURIComponent(m[2]);
}
