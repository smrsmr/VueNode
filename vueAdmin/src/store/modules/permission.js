/**获取 router.js 里面的asyncRouterMap，constantRouterMap方法 */
import { asyncRouterMap, constantRouterMap } from "../../router";

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    //some方法 一直在找符合条件的值，一旦找到，则不会继续迭代下去。
    return roles.some(role => route.meta.roles.includes(role));
  } else {
    return true;
  }
}
/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRouterMap
 * @param roles
 */
function filterAsyncRouter(routes, roles) {
  const res = [];

  routes.forEach(route => {
    const tmp = { ...route };
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRouter(tmp.children, roles);
      }
      res.push(tmp);
    }
  });

  return res;
}

const permission = {
  state: {
    routers: constantRouterMap,
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = constantRouterMap.concat(routers);
    }
  },
  actions: {
    GenerateRoutes({ commit }, data) {
      return new Promise(resolve => {
        const { roles } = data;
        let accessedRouters;
        if (roles.includes("admin")) {
          //如果是admin 将不做判断处理 所有动态路由均可跳转
          accessedRouters = asyncRouterMap;
        } else {
          accessedRouters = filterAsyncRouter(asyncRouterMap, roles);
        }
        commit("SET_ROUTERS", accessedRouters);
        resolve();
      });
    }
  }
};

export default permission;
