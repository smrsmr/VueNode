<template>
  <div
    class="app-chart-main"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <h1>{{ message }}</h1>
    <apexchart
      height="500"
      type="bar"
      :options="pillarOptions"
      :series="pillarSeries"
      ref="pillarChart"
    ></apexchart>
    <apexchart
      height="500"
      type="donut"
      :options="rotundityOptions"
      :series="rotunditySeries"
      ref="rotundityChart"
    ></apexchart>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      message: "VueApexCharts图形管理组件",
      fullscreenLoading: false,
      pillarOptions: {
        chart: {
          id: "vuechart-example"
        },
        xaxis: {
          categories: []
        }
      },
      pillarSeries: [
        {
          name: "经销商总数据",
          data: []
        }
      ],
      rotundityOptions: {
        labels: [],
        chartOptions: {
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200
                },
                legend: {
                  position: "bottom"
                }
              }
            }
          ]
        }
      },
      rotunditySeries: [22, 33, 565],
      polylineOptions: {
        xaxis: {
          categories: ["北京", "上海", "广东"]
        }
      },
      polylineSeries: [
        {
          name: "经销商总数据",
          data: []
        }
      ]
    };
  },
  methods: {
    getProv() {
      this.fullscreenLoading = true;
      //获取省份相关数据
      this.axios
        .get(this.api + "TheChart")
        .then(result => {
          this.fullscreenLoading = false;
          // console.log(result);
          this.$refs.pillarChart.updateOptions({
            xaxis: {
              categories: result.data.data
            }
          });
          this.$refs.rotundityChart.updateOptions({
            labels: result.data.data
          });
          this.pillarSeries[0].data = result.data.len;
          this.rotunditySeries = result.data.len;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //   this.getProv()
  },
  mounted() {
    //this.cs();
    this.getProv();
  }
};
</script>
<style lang="less" scoped>
.app-chart-main {
  padding: 10px;
}
.fl {
  float: left;
  margin-left: 20px;
}
</style>
