//公开导出state数据
const getters = {
  userInfo: state => state.app.userInfo,
  pageCurr: state => state.app.pageCurr,
  path: state => state.app.path,
  sidebar: state => state.app.sidebar, //侧边栏 收缩与展开状态
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
};
export default getters;
