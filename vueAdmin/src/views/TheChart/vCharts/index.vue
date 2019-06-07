<template>
  <div class="TheChart">
    <h1>{{ message }}</h1>
    <line-charts />
    <map-charts />
  </div>
</template>
<script>
import lineCharts from "./components/lineCharts";
import mapCharts from "./components/mapCharts";
export default {
  name: "index",
  data() {
    return {
      message: "v-charts 图形组件"
    };
  },
  components: {
    lineCharts,
    mapCharts
  }
};
</script>
<style lang="less" scoped>
.TheChart {
  padding: 10px;
  h1 {
    margin: 6px 0;
  }
}
</style>
