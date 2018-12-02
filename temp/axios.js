const axios = require("axios");
const Qs = require("querystring");
import { Message } from "element-ui";
const showError = message => Message({ type: "error", message });

const http = axios.create({
  baseURL: "https://yincai.quanse.com.cn/yincai",
  timeout: 30000,
  headers: {
    "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
  },
  transformRequest: params => Qs.stringify(params)
});

const bodyErrorHandlers = {
  // 身份校验失败
  9401() {
    if (window._TEST_) {
      return;
    }
    window.location.hash = "/login";
  }
};

const serviceErrorHandler = {
  9413() {
    showError("账号或密码不对,请重试");
  }
};

http.interceptors.request.use(config => {
  // add token
  const t = { session3: window.token };
  if (window.token) {
    config.method == "post"
      ? (config.data = Object.assign({}, config.data, t))
      : (config.params = Object.assign({}, config.params, t));
  }
  return config;
});

http.interceptors.response.use(
  function(res) {
    const body = res.data;
    const { errmsg, errcode } = body;
    if (errcode) {
      if (bodyErrorHandlers[errcode]) {
        return bodyErrorHandlers[errcode](body);
      }
      showError(errmsg);
      return Promise.reject(body);
    }
    return Promise.resolve(body);
  },
  function(err) {
    if (err.code === "ECONNABORTED") {
      showError("网络连接超时");
      window.location.hash = "/login";
    }
    const res = err.response;
    if (res) {
      const { errmsg, errcode } = res.data;
      if (serviceErrorHandler[errcode]) {
        serviceErrorHandler[errcode](res.data);
      } else {
        showError(errmsg);
      }
    }
    return Promise.reject(err);
  }
);

export default http;
