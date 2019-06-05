/* eslint-disable */
import Vue from "vue";
import router from "./router";
import { constantRouterMap } from "./router";
import axios from "axios";
//nprogress
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style
NProgress.configure({ showSpinner: false }); // NProgress Configuration
// 引入echarts
import echarts from "echarts";
Vue.prototype.$echarts = echarts;
//editor
import 'font-awesome/css/font-awesome.min.css'
import editor from './assets/js/html5Editor.js';
// v-charts
import VCharts from "v-charts";
Vue.use(VCharts);
//引入全局less
import "./assets/styles/index.less";
// import VueAxios from 'vue-axios';
import store from "./store/store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import Storage from "./assets/js/Storage";
import App from "./App.vue";
import aXioSapi from "./assets/js/api";
import VueApexCharts from "vue-apexcharts";
Vue.use(VueApexCharts);
Vue.component("apexchart", VueApexCharts);
Vue.config.productionTip = false;
Vue.use(ElementUI);
// Vue.use(VueAxios, axios);
//监听路由状态
router.beforeEach((to, form, next) => {
	NProgress.start(); // start progress bar
	let token = localStorage.getItem("token");
	let path = to.path;
	store.commit("getToPath", to.name);
	if (token) {
		if (path === "/login") {
			next("/index");
			NProgress.done(); // if current page is dashboard will not trigger	afterEach hook, so manually handle it
		} else {
			axios
				.get("http://127.0.0.1:3001/checkUser")
				.then(res => {
					localStorage.setItem("user_name", res.data.msg.name);
					if (store.getters.userInfo.length == 0) {
						const roles = [res.data.msg.name]; // note: roles must be a array! such as: ['editor','develop']
						store.commit("GET_USER", roles);
						store.dispatch("GenerateRoutes", { roles }).then(() => {
							// 根据 roles 权限生成可访问的路由表
							router.addRoutes(store.getters.addRouters); // 动态添加可访问路由表
							//next({ ...to, replace: true }) // hack 方法 确保 addRoutes 已完成 ,set the replace: true so the navigation will not leave a history record
						});
					}
				})
				.catch(err => {
					console.log(err);
				});
			next();
		}
	} else {
		if (path == "/login") {
			next();
		} else {
			next("/login");
			NProgress.done(); // if current page is login will not trigger afterEach hook, so manually handle it
		}
		// alert('登录已过期或没登录,请从新登录');
	}
});
router.afterEach(() => {
	NProgress.done(); // finish progress bar
});

//axios 全局拦截器
axios.interceptors.request.use(
	config => {
		// 每次请求时会从localStorage中获取token
		let token = Storage.localGet("token");
		if (token) {
			token = token.replace(/'|"/g, ""); // 把token加入到默认请求参数中
			config.headers.common["Authorization"] = `JSESSIONID ` + token;
		}
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	response => {
		// ①10010 token过期 ②10011 token无效
		if (response.data.status === 10010 || response.data.status === 10011) {
			Storage.localRemove("token"); // 删除已经失效或过期的token（不删除也可以，因为登录后覆盖）
			router.replace({
				path: "/login" // 到登录页重新获取token
			});
		}
		return response;
	},
	error => {
		return Promise.reject(error);
	}
);
new Vue({
	router,
	store,
	render: h => h(App)
}).$mount("#app");
