import Vue from "vue"; //引入vue
import axios from "axios"; //引入axios
import { axiosUrl } from "./config"; //引入配置的公共接口
axios.defaults.baseURL = axiosUrl; //axios 的基地址
Vue.prototype.$http = axios; //挂载axios到vue原型的$http属性下

Object.assign(Vue.prototype, {
  //vue原型合并 axios 和 axiosUrl
  axios: axios,
  api: axiosUrl
});
