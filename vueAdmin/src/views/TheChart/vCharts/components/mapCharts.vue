<template>
  <ve-map
    :data="chartData"
    width="500px"
    :settings="chartSettings"
    :events="chartEvents"
  ></ve-map>
</template>

<script>
export default {
  name: "mapCharts",
  data() {
    this.chartSettings = {
      position: "china",
      selectedMode: "single",
      label: false,
      itemStyle: {
        normal: {
          borderColor: "#00f"
        }
      }
    };
    this.chartEvents = {
      click: v => {
        this.cityName = v.name;
      }
    };
    return {
      chartData: {
        columns: ["省份", "经销商"],
        rows: []
      }
    };
  },
  methods: {
    initChart() {
      let that = this;
      // 绘制图表
      this.axios
        .get(this.api + "TheChart")
        .then(result => {
          that.chartData.rows = result.data.rowObj;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.initChart();
  }
};
</script>
