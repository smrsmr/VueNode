<template>
  <div>
    <h1>attrs</h1>
    <attrs-dom2 v-bind="$attrs" v-on="$listeners"></attrs-dom2>
  </div>
</template>
<script>
const attrsDom2 = () => import("./attrs2");
export default {
  name: "attrs",
  components: {
    attrsDom2
  },
  data() {
    return {};
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  mounted() {
    console.log(this.$attrs);
  }
};
</script>
<style lang="less" scoped></style>
