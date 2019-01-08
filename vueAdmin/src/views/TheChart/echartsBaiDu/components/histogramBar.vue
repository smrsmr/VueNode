<template>
  <div
    class="app-charts"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  ></div>
</template>
<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
export default {
  name: "histogramBar",
  data() {
    return {
      fullscreenLoading: false,
      message: "echartsBaiDu图形管理组件",
      chart: null
    };
  },
  mounted() {
    this.initChart();
  },
  methods: {
    initChart() {
      this.fullscreenLoading = true;
      let that = this;
      that.chart = echarts.init(this.$el, "macarons");
      // 绘制图表
      this.axios
        .get(this.api + "TheChart")
        .then(result => {
          this.fullscreenLoading = false;
          that.chart.setOption({
            color: ["#3398DB"],
            tooltip: {
              trigger: "axis",
              axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: "3%",
              right: "4%",
              bottom: "3%",
              containLabel: true
            },
            xAxis: [
              {
                type: "category",
                data: result.data.data,
                axisTick: {
                  alignWithLabel: true
                }
              }
            ],
            yAxis: [
              {
                type: "value"
              }
            ],
            series: [
              {
                name: "经销商总数",
                type: "bar",
                barWidth: "60%",
                data: result.data.len
              }
            ]
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style lang="less" scoped>
.app-charts {
  width: 100%;
  height: 600px;
}
</style>
