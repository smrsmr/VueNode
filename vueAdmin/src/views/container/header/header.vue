<template>
  <div class="app-container-header">
    <el-container>
      <el-header>
        <i class="iconfont munuCheck" @click="toggleSideBar">
          <span v-show="!isCollapse">&#xe600;</span>
          <span v-show="isCollapse">&#xe60b;</span>
        </i>
        <breadcrumb class="header-breadcrumb"/>
        <div>
          <el-dropdown
            class="infoUser"
            trigger="hover"
            v-loading.fullscreen.lock="fullscreenLoading"
            element-loading-text="正在努力退出中"
            element-loading-spinner="el-icon-loading"
            element-loading-background="rgba(255, 255, 255, 0.7)"
          >
            <span class="el-dropdown-link">
              <i class="iconfont">&#xe638;</i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>{{userInfo[0]}}</el-dropdown-item>
              <el-dropdown-item @click.native="exitUser()">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>     
      </el-header>
    </el-container>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import Breadcrumb from "./components/Breadcrumb";
export default {
  data() {
    return {
      fullscreenLoading: false,
      isCollapse: null
    };
  },
  components: { Breadcrumb },
  computed: {
    ...mapGetters(["sidebar", "userInfo"])
  },
  methods: {
    //退出用户登录
    exitUser() {
      this.fullscreenLoading = true;
      this.fullscreenLoading = false;
      this.$store.dispatch("FedLogOut").then(() => {
        location.reload(); // In order to re-instantiate the vue-router object to avoid bugs
      });
    },
    toggleSideBar() {
      this.$store.dispatch("toggleSideBar");
      this.isCollapse = this.$store.getters.sidebar.opened;
    }
  },
  mounted() {
    let that = this;
    // that.$emit("getWidth",that.isCollapse)
    //监听浏览器窗口变化
    window.onresize = function temp() {
      that.clientWidth = document.documentElement.clientWidth;
      if (that.clientWidth <= 1366) {
        that.$store.commit("Toggle_COLLAPSE", false);
        that.isCollapse = that.$store.getters.sidebar.opened;
      } else {
        that.$store.commit("Toggle_COLLAPSE", true);
        that.isCollapse = that.$store.getters.sidebar.opened;
      }
    };
  },
  created() {
    let that = this;
    //监听浏览器窗口变化
    that.clientWidth = document.documentElement.clientWidth;
    if (that.clientWidth <= 1366) {
      that.$store.commit("Toggle_COLLAPSE", false);
      that.isCollapse = that.$store.getters.sidebar.opened;
    } else {
      that.$store.commit("Toggle_COLLAPSE", true);
      that.isCollapse = that.$store.getters.sidebar.opened;
    }
  }
};
</script>
<style lang="less" scoped>
.app-container-header {
  width: 100%;
  height: auto;
  -webkit-transition: width 0.28s;
  transition: width 0.28s;
  .el-header {
    background-color: white;
    padding: 0 10px 20px 20px;
    color: #333;
    text-align: center;
    line-height: 60px;
    border-bottom: 1px solid #e6e6e6;
    .munuCheck {
      float: left;
      line-height: 60px;
      font-size: 26px;
      cursor: pointer;
      color: #409eff;
    }
    .header-breadcrumb {
      float: left;
      line-height: 60px;
      font-size: 18px;
      cursor: pointer;
      margin-left: 30px;
    }
    .infoUser {
      position: relative;
      float: right;
      width: 60px;
      height: 60px;
      text-align: center;
      cursor: pointer;
      i {
        font-size: 40px;
        color: #409eff;
        line-height: 60px;
      }
    }
  }
}
</style>
