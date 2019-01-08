<template>
		<div class="app-export-main">
			<el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="省份:">
        <el-select v-model="formData.prov" placeholder="省份" clearable @change="setProv" style="width:120px">
          <el-option v-for="(item,key) in prov" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市:">
        <el-select v-model="formData.city" placeholder="城市" clearable @change="setCity" style="width:120px">
          <el-option v-for="(item,key) in cityArr" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
			<el-form-item label="文件名:">
				<el-input placeholder="请输入文件名(默认excel-list)" v-model="filename" clearable style="width:340px;" prefix-icon="el-icon-document"/>
			</el-form-item>
			<el-form-item label="导出类型:">
				<el-select v-model="formData.bookType" placeholder="请选择" style="width:120px">
					<el-option
						v-for="(item,key) in TypeList"
						:key="key"
						:label="item"
						:value="item">
					</el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="">
				 <el-button :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出Excel</el-button>
			</el-form-item>
    </el-form>
		
		</div>
</template>
<script>
export default {
  name: "export",
  data() {
    return {
      prov: [],
      city: [],
      data: [],
      cacheData: [],
      formData: {
        prov: "",
        city: "",
        bookType: "xlsx"
      },
      objData: {
        prov: [],
        city: []
      },
      cityArr: [],
      TypeList: ["xlsx", "csv", "txt"],
      downloadLoading: false,
      filename: "",
      autoWidth: true
    };
  },
  methods: {
    getProv() {
      this.axios
        .get(this.api + "getExcelDealers")
        .then(result => {
          let a = [];
          //全部经销商数据
          this.data = result.data.data;
          //缓存一份经销商数据
          this.cacheData = this.data;
          this.data.forEach(v => {
            a.push(v.prov);
          });
          a = new Set(a);
          this.prov = [...a];
        })
        .catch(err => {
          console.log(err);
          this.fullscreenLoading = false;
        });
    },
    setProv(value) {
      this.objData.prov = [];
      this.cacheData = [];
      this.formData.city = "";
      let b = [];
      this.data.forEach(v => {
        if (v.prov === value) {
          this.objData.prov.push(v);
          b.push(v.city);
        }
      });
      this.cacheData = this.objData.prov;
      this.$emit("setList", this.objData.prov);
      b = new Set(b);
      this.cityArr = [...b];
      if (this.formData.prov == "") {
        this.cacheData = this.data;
        this.$emit("setList");
      }
    },
    setCity(value) {
      this.objData.city = [];
      this.cacheData = [];
      this.data.forEach(v => {
        if (v.city === value) {
          this.objData.city.push(v);
        }
      });
      this.cacheData = this.objData.city;
      this.$emit("setList", this.objData.city);
      if (this.formData.city == "") {
        this.cacheData = this.objData.prov;
        this.$emit("setList", this.objData.prov);
      }
    },
    handleDownload() {
      this.downloadLoading = true;
      import("../../../assets/js/Export2Excel.js").then(excel => {
        const tHeader = [
          "地区",
          "省份",
          "城市",
          "编码",
          "电话",
          "经销商",
          "地址"
        ];
        const filterVal = [
          "area",
          "prov",
          "city",
          "code",
          "phone",
          "dealer",
          "address"
        ];
        const list = this.cacheData;
        const data = this.formatJson(filterVal, list);
        excel.export_json_to_excel({
          header: tHeader, //表头
          data, //数据
          filename: this.filename, //文件名
          autoWidth: this.autoWidth, //自动宽度
          bookType: this.formData.bookType // 导出文件类型
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v =>
        filterVal.map(j => {
          if (j === "code") {
            return v[j].toUpperCase();
          }
          return v[j];
        })
      );
    }
  },
  created() {
    this.getProv();
  }
};
</script>
<style lang="less" scoped>
.app-export-main {
  margin: 10px;
  height: auto;
}
</style>
