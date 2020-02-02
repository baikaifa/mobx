import axios from "axios";
import { message } from "antd";

// axios 请求map
let cancelTokenMap = {};
// 请求结果缓存
let resquestCache = {};
// api地址，默认同域
// const baseurl = "http://172.16.83.24:8900";
//const baseurl = '';
// axios 终止句柄
const cancelToken = axios.CancelToken;
// 获取token
const getToken = () => {
  try {
    let token = localStorage.getItem("token");
    return token ? token : "";
  } catch (e) {
    return "";
  }
};
/**
 * 获取请求key
 */
const getKey = (url, params = {}) => {
  let key = url;
  let arrParams = [];
  if (typeof params === "object") {
    let entriesParams = Object.entries(params);
    for (let [key, value] of entriesParams) {
      arrParams.push(key + "=" + value);
    }
  } else {
    arrParams.push(params);
  }
  return key + "?" + arrParams.join("&");
};

/**
 * 创建xhr实例
 * 路径前缀
 * 超时失败时间
 */
const service = axios.create({
  //baseURL: 'http://39.98.33.132:8893',
  timeout: 50000,
  async: true,
  crossDomain: true,
  withCredentials: true,
  headers: {
    Accept: "*/*",
    "Content-Type": "application/json; charset=UTF-8"
  }
});

/**
 * @desc 设置服务请求拦截器
 * 定义token请求设置
 */
service.interceptors.request.use(
  config => {
    let authToken = getToken();
    if (authToken) {
      config.headers["token"] = authToken;
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

/**
 * @desc 设置服务响应拦截器
 * 截取返回状态 统一定义成功失败
 */
service.interceptors.response.use(
  response => {
    const res = response;
    // 登录错误拦截，跳转登录界面 830暂时没有登录功能
    // if (res.code === '12' || res.code === '10') {
    //   window.location.href = "#/login";
    // }

    // 请求错误，提示信息
    if (
      res.code === "400" ||
      res.code === "404" ||
      res.code === "502" ||
      res.code === "503" ||
      res.code === "500"
    ) {
      message.error(res.message);
    }
    // console.log(res.status)
    return res;
  },
  error => {
    //console.log(error.response.data);
    return Promise.reject(error.response.data);
    // return Promise.reject(error);
  }
);

/**
 * 请求通用方法
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {String} method 请求方法
 * @param {Boolean} isCache 请求缓存(暂时屏蔽缓存数据功能)
 */
//'http://172.26.83.53:8888' +
const request = (url, params = {}, method = "get", isCache = false) => {
  let config = {
    url: url,
    method: method,
    cancelToken: getCancelToken(url, params, method)["token"]
  };

  if (method === "get" || method === "delete") {
    config.params = params;
  } else {
    config.data = params;
  }

  // let key = getKey(url, params = {});
  // if (isCache) {
  //   // 请求结果有缓存直接取缓存数据
  //   if (resquestCache[method] && resquestCache[method][key]) {
  //     return resquestCache[method][key];
  //   }
  // }

  return service(config)
    .then(
      rs => {
        // if (isCache) {
        //   if (!resquestCache[method]) {
        //     resquestCache[method] = {};
        //   }
        //   resquestCache[method][key] = rs.data;
        // }
        //console.log('original');
        //console.log(rs);
        return rs.data;
      },
      rj => {
        // message.error('请求错误');

        return rj;
      }
    )
    .catch(error => {
      //console.log(error);
      // message.error('请求错误');

      return false;
    });
};

/**
 * GET请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
const get = (url, params = {}) => {
  return request(url, params, "get");
};

/**
 * GET请求
 * @param {String} url 请求地址
 * @param {String} params 请求参数
 */
const getUrl = (url, params = "") => {
  url = url.replace(/\/$/, "") + "/" + params;
  return request(url, {}, "get");
};

/**
 * POST 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
const post = (url, params = {}) => {
  return request(url, params, "post");
};

/**
 * DELETE 请求
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 */
const _delete = (url, params = {}) => {
  return request(url, params, "delete");
};

/**
 * DELETE请求 拼接url
 * @param {String} url
 * @param {String} params 请求参数
 */
const _deleteUrl = (url, params = "") => {
  url = url.replace(/\/$/, "") + "/" + params;
  return request(url, {}, "delete");
};

const put = (url, params = {}) => {
  return request(url, params, "put");
};

/**
 * put请求 拼接url
 * @param {String} url
 * @param {String} params 请求参数
 */
const putUrl = (url, params = "") => {
  url = url.replace(/\/$/, "") + "/" + params;
  return request(url, {}, "put");
};

/**
 * 设置取消请求句柄
 * @param {String} url 请求地址
 * @param {Object} params 请求参数
 * @param {String} method 请求方法
 */
const getCancelToken = (url, params = {}, method) => {
  if (method) {
    let item = cancelTokenMap[method];
    if (!item) {
      cancelTokenMap[method] = {};
      item = cancelTokenMap[method];
    }

    let key = getKey(url, params);
    let cToken = cancelTokenMap[method][key];
    if (!cToken) {
      cancelTokenMap[method][key] = {};
      cToken = cancelTokenMap[method][key];
    }
    cToken["token"] =
      cToken["token"] ||
      new cancelToken(function executor(c) {
        cToken["cancel"] = c;
      });

    return cToken;
  }
};

/**
 * 终止incomplete的axios请求
 * @param {*} url axios请求地址
 * @param {*} params 请求参数
 * @param {*} method 请求方法
 */
const cancelAxiosToken = (url, params = {}, method = "get") => {
  if (method) {
    let item = cancelTokenMap[method];
    let key = getKey(url, params);
    if (item[key]) {
      if (typeof item[key]["cancel"] === "function") {
        item[key]["cancel"]();
      }
      delete cancelTokenMap[method][key];
    }
  }
};

/**
 * 终止所有incomplete的axios请求
 */
const cancelAxiosTokenAll = () => {
  for (let method in cancelTokenMap) {
    for (let key in cancelTokenMap[method]) {
      if (typeof cancelTokenMap[method][key].cancel === "function") {
        cancelTokenMap[method][key].cancel();
      }
      delete cancelTokenMap[method][key];
    }
  }
};

/**
 * 上传媒体资源
 * @param {*} url 请求地址
 * @param {*} data 请求参数
 */
const postMediaFormData = (url, data) => {
  return axios({
    url: url,
    method: "post",
    data: data,
    processData: false, // 告诉axios不要去处理发送的数据(重要参数)
    contentType: false // 告诉axios不要去设置Content-Type请求头
  })
    .then(res => {
      return res.data;
    })
    .catch(error => {
      message.error(error.response.status);

      return error;
    });
};

export {
  service,
  request,
  get,
  getUrl,
  post,
  _delete,
  _deleteUrl,
  put,
  putUrl,
  postMediaFormData,
  cancelAxiosToken,
  cancelAxiosTokenAll
};
