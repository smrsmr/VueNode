<template>
    <div v-if="hasOneShowingChild(item.children,item)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
            <i class="iconfont icon" v-html="item.meta.icon"></i>
            <span slot="title" class="Title">{{item.meta.title}}</span>
        </el-menu-item>
    </div>
    <el-submenu v-else ref="submenu" :index="resolvePath(item.path)">
        <template slot="title">
            <i class="iconfont icon" v-html="item.meta.icon"></i>
            <span class="Title">{{item.meta.title}}</span>
        </template>

        <template v-for="child in item.children" >
            <sidebar-item
            v-if="child.children&&child.children.length>0"
            :item="child"
            :key="child.path"
            :base-path="resolvePath(child.path)"
            />
            <app-link v-else :to="resolvePath(child.path)" :key="child.name">
                <el-menu-item :index="resolvePath(child.path)" class="submenu-item"> 
                    <i class="iconfont icon min" v-html="child.meta.icon"></i>
                    <span slot="title" class="Title">{{child.meta.title}}</span>
                </el-menu-item>
            </app-link>
        </template>
    </el-submenu>
</template>
<script>
// 侧边栏组件
import path from "path";
import AppLink from "./Link";
export default {
  name: "SidebarItem",
  components: {
    AppLink
  },
  data() {
    return {
      onlyOneChild: null
    };
  },
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    basePath: {
      type: String,
      default: ""
    }
  },
  methods: {
    hasOneShowingChild(children, parent) {
      const showingChildren = children.filter(item => {
        this.onlyOneChild = item;
        return true;
      });
      // When there is only one child router, the child router is displayed by default
      if (showingChildren.length === 1) {
        return true;
      }
      // Show parent if there are no child router to display
      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: "" };
        return true;
      }
      return false;
    },
    resolvePath(routePath) {
      return path.resolve(this.basePath, routePath);
    }
  },
  mounted() {
    // console.log(this.onlyOneChild);
  }
};
</script>
<style lang="less" scoped>
.el-menu {
  border-right: none;
  .el-menu-item {
    width: 100%;
  }
  .icon {
    margin-right: 16px;
    font-size: 18px;
    text-align: center;
    width: 20px;
    float: left;
  }
  .min {
    margin-right: 8px;
  }
  .Title {
    font-size: 18px;
    float: left;
  }
}
</style>
