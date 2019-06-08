<template>
  <div class="print">
    <h1>打印</h1>
    <hr />
    <!-- <div ref="print">
      <table-dom></table-dom>
      <div class="no-print">不要打印我</div>
    </div> -->
    <!-- <el-button type="primary" @click="btnPrint">打印</el-button> -->
    <el-button type="primary" v-print="printObj">打印</el-button>
    <div id="printTest">
      <table-dom></table-dom>
    </div>
  </div>
</template>
<script>
const tableDom = () => import("./childs/table.vue");
export default {
  name: "print",
  components: {
    tableDom
  },
  data() {
    return {
      printObj: {
        id: "printTest",
        popTitle: "广州国际中心"
        // extraCss: "https://www.baidu.com/,https://www.baidu.com/",
        // extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>'
      }
    };
  },
  methods: {
    btnPrint() {
      this.$print(this.$refs.print); // 使用
    }
  }
};
</script>
<style lang="less" scoped>
.print {
  padding-left: 20px;
}
</style>
