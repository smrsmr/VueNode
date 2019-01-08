<template>
<div class="dealers" v-loading.fullscreen.lock="fullscreenLoading"
       element-loading-text="拼命加载中"
       element-loading-spinner="el-icon-loading"
       element-loading-background="rgba(255, 255, 255, 0.7)">
       <apexchart height="500" type="line" :options="polylineOptions" :series="polylineSeries" ref="polylineChart"></apexchart>
</div>
</template>
<script>
export default {
  name: "polylineOptions",
  data() {
    return {
      fullscreenLoading: false,
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
    getChare() {
      this.fullscreenLoading = true;
      //获取省份相关数据
      this.axios
        .get(this.api + "TheChart")
        .then(result => {
          this.fullscreenLoading = false;
          this.$refs.polylineChart.updateOptions({
            xaxis: {
              categories: result.data.data
            }
          });
          this.polylineSeries[0].data = result.data.len;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {
    this.getChare();
  }
};
</script>
<style lang="less" scoped>
</style>
