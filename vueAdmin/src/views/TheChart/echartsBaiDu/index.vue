<template>
    <div class="app-echart-main">
        <h1>{{message}}</h1>
        <histogram-bar />
    </div>
</template>
<script>
import histogramBar from "./components/histogramBar";
export default {
  name: "index",
  data() {
    return {
      message: "echartsBaiDu"
    };
  },
  components: {
    histogramBar
  }
};
</script>
<style lang="less" scoped>
.app-echart-main {
  padding: 10px;
}
</style>
