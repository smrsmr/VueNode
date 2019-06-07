<template>
  <div
    class="app-excel-main"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <export-excel @setList="setList"></export-excel>
    <el-table
      :data="list"
      stripe
      show-overflow-tooltip="true"
      style="width: 100%"
      :height="height"
    >
      <el-table-column align="center" label="Id" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        prop="area"
        label="地区"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="prov"
        label="省份"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="city"
        label="城市"
        width="180"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="code"
        width="180"
        label="编码"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="phone"
        width="180"
        label="电话"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="name"
        width="300"
        label="经销商"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="address"
        label="地址"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
import exportExcel from "./components/export";
export default {
  data() {
    return {
      message: "exportExcel",
      list: null,
      fullscreenLoading: false,
      cacheList: null,
      height: 400
    };
  },
  components: {
    exportExcel
  },
  methods: {
    getDealers() {
      this.fullscreenLoading = true;
      this.axios
        .get(this.api + "getExcelDealers")
        .then(result => {
          this.list = result.data.data;
          this.cacheList = this.list;
          this.fullscreenLoading = false;
          // console.log(this.list);
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
        });
    },
    setList(v) {
      if (v) {
        this.list = v;
      } else {
        this.list = this.cacheList;
      }
    }
  },
  created() {
    this.getDealers();
    this.height = window.innerHeight - 180;
  }
};
</script>
<style lang="less" scoped>
.app-excel-main {
  padding: 10px;
}
</style>
