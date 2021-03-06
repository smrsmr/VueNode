import Vue from "vue";
import Router from "vue-router";
Vue.use(Router);

import Loyout from "./components/Layout";
//所有权限通用路由表
//如首页和登录页和一些不用权限的公用页面
export const constantRouterMap = [
  {
    path: "/",
    name: "index",
    hidden: true,
    redirect: "/index/index",
    meta: {
      keepAlive: false,
      deepth: 0.5
    }
  },
  {
    path: "/login",
    name: "登录",
    hidden: true,
    component: () => import("./components/login")
  },
  {
    path: "/index",
    name: "首页",
    redirect: "/index/index",
    component: Loyout,
    meta: {
      title: "首页",
      icon: "&#xe659;"
    },
    children: [
      {
        path: "index",
        component: () => import("./views/index/index"),
        name: "index",
        meta: {
          keepAlive: false,
          deepth: 0.5
        }
      }
    ]
  },
  {
    path: "/Charts",
    name: "图形管理",
    redirect: "noredirect",
    component: Loyout,
    meta: {
      title: "图形管理",
      icon: "&#xe608;"
    },
    children: [
      {
        path: "VueApexCharts",
        component: () => import("./views/TheChart/VueApexCharts/index"),
        name: "VueApexCharts",
        meta: {
          title: "VueApex",
          icon: "&#xe7af;",
          keepAlive: false,
          deepth: 0.5
        }
      },
      {
        path: "echartsBaiDu",
        component: () => import("./views/TheChart/echartsBaiDu/index"),
        name: "echartsBaiDu",
        meta: {
          title: "BaiDu",
          icon: "&#xe7af;",
          keepAlive: false,
          deepth: 0.5
        }
      },
      {
        path: "vCharts",
        component: () => import("./views/TheChart/vCharts/index.vue"),
        name: "vCharts",
        meta: {
          title: "vCharts",
          icon: "&#xe7af;",
          keepAlive: false,
          deepth: 0.5
        }
      }
    ]
  },
  {
    path: "/404",
    name: "404",
    hidden: true,
    component: () => import("./views/404")
  }
];
//实例化vue的时候只挂载constantRouter
export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: constantRouterMap
});

//异步挂载的路由
//动态需要根据权限加载的路由表
export const asyncRouterMap = [
  {
    path: "/Dealers",
    name: "数据管理",
    redirect: "noredirect",
    component: Loyout,
    meta: {
      title: "数据管理",
      icon: "&#xe605;"
    },
    children: [
      {
        path: "index",
        component: () => import("./views/dealers/index"), //路由懒加载
        name: "dealers",
        meta: {
          title: "数据管理",
          icon: "&#xe605;",
          roles: ["admin"],
          keepAlive: true,
          deepth: 1
        }
      },
      {
        path: "test",
        component: () => import("./views/dealers/components/test.vue"), //路由懒加载
        name: "test",
        meta: {
          title: "测试",
          icon: "&#xe605;",
          roles: ["admin"],
          keepAlive: false,
          deepth: 2
        }
      }
    ]
  },
  {
    path: "/Manage",
    name: "管理中心",
    redirect: "noredirect",
    component: Loyout,
    meta: {
      title: "管理中心",
      icon: "&#xe60a;"
    }, //页面需要的权限
    children: [
      {
        path: "account",
        component: () => import("./views/Manage/account"),
        name: "account",
        meta: {
          roles: ["admin"],
          title: "account",
          icon: " &#xe66d;",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "jxs",
        component: () => import("./views/Manage/components/jxs"),
        name: "jxs",
        meta: {
          roles: ["admin"],
          title: "jxs",
          icon: "&#xe60e;",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "page3",
        component: () => import("./views/Manage/components/page3"),
        name: "page3",
        meta: {
          roles: ["admin"],
          title: "page3",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "upload",
        component: () => import("./views/Manage/components/upload"),
        name: "upload",
        meta: {
          roles: ["admin"],
          title: "upload",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "print",
        component: () => import("./views/Manage/components/print"),
        name: "print",
        meta: {
          roles: ["admin"],
          title: "print",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "tree",
        component: () => import("./views/Manage/components/tree"),
        name: "tree",
        meta: {
          roles: ["admin"],
          title: "tree",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      }
    ]
  },
  {
    path: "/excel",
    name: "Excel",
    redirect: "noredirect",
    component: Loyout,
    meta: {
      title: "Excel",
      icon: "&#xe631;"
    }, //页面需要的权限
    children: [
      {
        path: "UploadExcel",
        component: () => import("./views/Excel/excelUpload.vue"),
        name: "UploadExcel",
        meta: {
          roles: ["东北大区"],
          title: "UploadExcel",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "exportExcel",
        component: () => import("./views/Excel/exportExcel.vue"),
        name: "exportExcel",
        meta: {
          roles: ["东北大区"],
          title: "exportExcel",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "page2",
        component: () => import("./views/Excel/page2.vue"),
        name: "page2",
        meta: {
          roles: ["东北大区"],
          title: "page2",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "page3",
        component: () => import("./views/Excel/page3.vue"),
        name: "page3",
        meta: {
          roles: ["东北大区"],
          title: "page3",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      }
    ]
  },
  {
    path: "/theRichText",
    name: "富文本",
    redirect: "noredirect",
    component: Loyout,
    meta: {
      title: "富文本",
      icon: "&#xe66f;"
    },
    children: [
      {
        path: "tinymce",
        component: () => import("./views/theRichText/tinymce.vue"),
        name: "tinymce",
        meta: {
          roles: ["admin"],
          title: "tinymce",
          keepAlive: false,
          deepth: 0.5
        }
      },
      {
        path: "html5-editor",
        component: () => import("./views/theRichText/h5Editor.vue"),
        name: "h5Editor",
        meta: {
          roles: ["admin"],
          title: "h5Editor",
          keepAlive: false,
          deepth: 0.5
        }
      }
    ]
  },
  {
    path: "/setting",
    name: "设置",
    redirect: "/setting/index",
    component: Loyout,
    meta: {
      title: "设置",
      icon: "&#xe6cf;"
    }, //页面需要的权限
    children: [
      {
        path: "index",
        component: () => import("./views/setting/index"),
        name: "setting",
        meta: {
          roles: ["华南大区"],
          title: "index",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      },
      {
        path: "websocket",
        component: () => import("./views/setting/websocket.vue"),
        name: "websocket",
        meta: {
          roles: ["华南大区"],
          title: "websocket",
          keepAlive: false,
          deepth: 0.5
        } //页面需要的权限
      }
    ]
  },
  {
    path: "*",
    redirect: "/404",
    hidden: true
  }
];
