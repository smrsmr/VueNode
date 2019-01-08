import Storage from "../../assets/js/Storage";
const app = {
  state: {
    userInfo: [],
    pageCurr: {
      currpage: 1, //当前第几页
      currData: 10 // 每页多少条数据
    },
    path: null,
    sidebar: {
      opened: true
    }
  },
  mutations: {
    //编写vuex方法的地方
    GET_USER: (state, user) => {
      state.userInfo = user;
    },
    getPage: (state, pageCurr) => {
      state.pageCurr = pageCurr;
    },
    getToPath: (state, path) => {
      state.path = path;
    },
    SET_COLLAPSE: state => {
      state.sidebar.opened = !state.sidebar.opened;
    },
    Toggle_COLLAPSE: (state, val) => {
      state.sidebar.opened = val;
    }
  },
  actions: {
    /**提交的是mutations方法 异步的 */
    // 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit("GET_USER", "");
        Storage.localRemove("user_name");
        Storage.localRemove("token");
        resolve();
      });
    },
    toggleSideBar({ commit }) {
      commit("SET_COLLAPSE");
    }
  }
};

export default app;
