<template>
  <section class="app-main">
    <!-- <transition name="fade-transform" mode="out-in">
      
    </transition>-->
    <keep-alive :include="include">
      <router-view v-if="$route.meta.keepAlive">
        <!-- 这里是会被缓存的视图组件 -->
      </router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive">
      <!-- 这里是不被缓存的视图组件 -->
    </router-view>
  </section>
</template>
<script>
export default {
  name: "mains",
  data() {
    return {
      include: []
    };
  },
  watch: {
    $route(to, from) {
      //如果 要 to(进入) 的页面是需要 keepAlive 缓存的，把 name push 进 include数组
      if (to.meta.keepAlive) {
        !this.include.includes(to.name) && this.include.push(to.name);
      }
      //如果 要 form(离开) 的页面是 keepAlive缓存的，
      //再根据 deepth 来判断是前进还是后退
      //如果是后退
      /**
       * deepth 列表详情页设置为2
       * 列表页设置为1
       * 其他不需要缓存路由设置为0.5
       *
       */
      if (from.meta.keepAlive && to.meta.deepth <= from.meta.deepth) {
        var index = this.include.indexOf(from.name);
        index !== -1 && this.include.splice(index, 1);
      }
    }
  }
};
</script>
<style lang="less" scoped>
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 84px);
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}
</style>
