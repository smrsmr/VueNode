<template>
  <div class="block">
    <span class="demonstration"></span>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currpage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="currData"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allpage"
    >
    </el-pagination>
  </div>
</template>

<script>
// 分页组件
export default {
  name: "mb",
  data() {
    return {
      currData: 10,
      currpage: 1
    };
  },
  props: ["allpage"],
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.currData = val;
      this.$emit("clickGet", this.currpage, this.currData);
    },
    handleCurrentChange(val) {
      this.currpage = val;
      this.$emit("clickGet", this.currpage, this.currData);
    }
  },
  created: function() {}
};
</script>
<style scoped>
.block {
  margin: 40px auto 0;
}
</style>
