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
// import editor from './assets/js/editor.js';
import 'font-awesome/css/font-awesome.min.css'
import VueHtml5Editor from 'vue-html5-editor';
Vue.use(VueHtml5Editor, {
	// 全局组件名称，使用new VueHtml5Editor(options)时该选项无效  
	// global component name 
	name: "vue-html5-editor",
	// 是否显示模块名称，开启的话会在工具栏的图标后台直接显示名称 
	// if set true,will append module name to toolbar after icon 
	showModuleName: true,
	// 自定义各个图标的class，默认使用的是font-awesome提供的图标 
	// custom icon class of built-in modules,default using font-awesome 
	icons: {
		text: "fa fa-pencil",
		color: "fa fa-paint-brush",
		font: "fa fa-font",
		align: "fa fa-align-justify",
		list: "fa fa-list",
		// link: "fa fa-chain",
		unlink: "fa fa-chain-broken",
		tabulation: "fa fa-table",
		image: "fa fa-file-image-o",
		hr: "fa fa-minus",
		eraser: "fa fa-eraser",
		undo: "fa-undo fa",
		"full-screen": "fa fa-arrows-alt",
		info: "fa fa-info",
	},
	// 配置图片模块 
	// config image module 
	image: {
		// 文件最大体积，单位字节  max file size 
		sizeLimit: 512 * 1024,
		// 上传参数,默认把图片转为base64而不上传 
		// upload config,default null and convert image to base64 
		upload: {
			url: null,
			headers: {},
			params: {},
			fieldName: {}
		},
		// 压缩参数,默认使用localResizeIMG进行压缩,设置为null禁止压缩 
		// compression config,default resize image by localResizeIMG (https://github.com/think2011/localResizeIMG) 
		// set null to disable compression 
		compress: {
			width: 1600,
			height: 1600,
			quality: 80
		},
		// 响应数据处理,最终返回图片链接 
		// handle response data，return image url 
		uploadHandler(responseText) {
			//default accept json data like  {ok:false,msg:"unexpected"} or {ok:true,data:"image url"} 
			var json = JSON.parse(responseText)
			if (!json.ok) {
				alert(json.msg)
			} else {
				return json.data
			}
		}
	},
	// 语言，内建的有英文（en-us）和中文（zh-cn） 
	//default en-us, en-us and zh-cn are built-in 
	language: "zh-cn",
	// 自定义语言 
	i18n: {
		//specify your language here 
		"zh-cn": {
			"align": "对齐方式",
			"image": "图片",
			"list": "列表",
			"link": "链接",
			"unlink": "去除链接",
			"table": "表格",
			"font": "文字",
			"full screen": "全屏",
			"text": "排版",
			"eraser": "格式清除",
			"info": "关于",
			"color": "颜色",
			"please enter a url": "请输入地址",
			"create link": "创建链接",
			"bold": "加粗",
			"italic": "倾斜",
			"underline": "下划线",
			"strike through": "删除线",
			"subscript": "上标",
			"superscript": "下标",
			"heading": "标题",
			"font name": "字体",
			"font size": "文字大小",
			"left justify": "左对齐",
			"center justify": "居中",
			"right justify": "右对齐",
			"ordered list": "有序列表",
			"unordered list": "无序列表",
			"fore color": "前景色",
			"background color": "背景色",
			"row count": "行数",
			"column count": "列数",
			"save": "确定",
			"upload": "上传",
			"progress": "进度",
			"unknown": "未知",
			"please wait": "请稍等",
			"error": "错误",
			"abort": "中断",
			"reset": "重置"
		}
	},
	// 隐藏不想要显示出来的模块 
	// the modules you don't want 
	hiddenModules: [],
	// 自定义要显示的模块，并控制顺序 
	// keep only the modules you want and customize the order. 
	// can be used with hiddenModules together 
	visibleModules: [
		"text",
		"color",
		"font",
		"align",
		"list",
		"link",
		"unlink",
		"tabulation",
		"image",
		"hr",
		"eraser",
		"undo",
		"full-screen",
		"info",
	],
	// 扩展模块，具体可以参考examples或查看源码 
	// extended modules 
	modules: {
		//omit,reference to source code of build-in modules 
	}
});
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
			config.headers.common["Authorization"] = `Bearer ` + token;
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
