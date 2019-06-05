<template>
  <div>
    <h1>attrs2</h1>
    <el-row>
      <el-button type="primary" @click="setFather">我是子组件attrs2</el-button>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "attrs2",
  data() {
    return {
      text: "子组件的数据"
    };
  },
  inheritAttrs: false, // 可以关闭自动挂载到组件根元素上的没有在props声明的属性
  mounted() {
    // console.log(this.$attrs);
  },
  methods: {
    setFather() {
      this.$emit("attrs2", { text: this.text, name: "attrs" });
      // console.log("我是子组件attrs2 发过来的信息");
    }
  }
};
</script>
<style lang="less" scoped></style>
