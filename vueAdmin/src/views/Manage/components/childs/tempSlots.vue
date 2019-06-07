<template>
  <div class="app-container-main">
    {{ message }}
    <slot :data="data"></slot>
  </div>
</template>
<script>
/**
 * 单组件的内容分发
 * 插槽显不显示取决于 父组件有没有html模板
 */
export default {
  name: "tempSlots",
  data() {
    return {
      message: "我是子组件jxs",
      data: ["JavaScript", "TypeScript", "NodeJs", "Mongodb"]
    };
  }
};
</script>
<style lang="less" scoped>
.app-container-main {
  margin: 20px 0;
  color: red;
}
</style>
