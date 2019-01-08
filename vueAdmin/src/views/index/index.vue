<template>
    <div class="app-container-index">
        <v-chart></v-chart>
    </div>
</template>
<script>
import polylineChart from "../TheChart/VueApexCharts/polylineOptions";
export default {
  data() {
    return {};
  },
  components: {
    "v-chart": polylineChart
  }
};
</script>
<style lang="less" scoped>
.app-container-index {
  padding: 10px;
}
</style>
