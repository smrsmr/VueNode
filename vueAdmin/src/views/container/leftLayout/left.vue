<template>
  <el-container
    class="sidebar-container leftLayout"
    :style="{height:height+'px'}"
  >
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        router
        class="el-menu-vertical-demo"
        :show-timeout="200"
        :collapse="isCollapse"
        mode="vertical"
        :default-active="$route.path"
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409EFF"
        menu-trigger="click"
      >
        <sidebar-item
          v-for="route in routers"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </el-container>
</template>
<script>
import { mapGetters } from "vuex";
import SidebarItem from "./components/SidebarItem";
export default {
  data() {
    return {
      height: 0
    };
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters(["sidebar", "permission_routers"]),
    isCollapse() {
      return !this.sidebar.opened;
    },
    routers() {
      const routersArr = [];
      this.permission_routers.map(item => {
        if (!item.hidden && item.children.length > 0) {
          routersArr.push(item);
        }
      });
      return routersArr;
    }
  },
  methods: {},
  mounted() {
    // console.log(this.routers);
  },
  created() {
    this.height = window.innerHeight;
  },
  updated() {}
};
</script>
<style lang="less" scoped>
.sidebar-container {
  position: fixed;
  bottom: 0;
  left: 0;
  top: 0;
  -webkit-transition: width 0.28s;
  font-size: 0;
  height: 100%;
  z-index: 100;
  transition: width 0.28s;
  background-color: #304156;
  .el-popper[x-placement^="bottom"] {
    margin-top: 0;
  }
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    height: 100%;
    min-height: 380px;
  }
  .el-menu {
    border-right: none;
  }
}
</style>
