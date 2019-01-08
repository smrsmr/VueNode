<!--
   省份 城市搜索组件
-->
<template>
  <div>
    <el-form :inline="true" :model="formData" class="demo-form-inline">
      <el-form-item label="省份">
        <el-select v-model="formData.prov" placeholder="省份" clearable @change="setProv">
          <el-option v-for="(item,key) in data" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市">
        <el-select v-model="formData.city" placeholder="城市" clearable @change="setCity">
          <el-option v-for="(item,key) in cityArr" :key="key" :label="item" :value="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <add-dealer @leaveParent="leaveParent" @resetPage="resetPage" v-if="isUserName" />
  </div>
</template>
<script>
import addDealer from "./addDealer";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      formData: {
        prov: "",
        city: ""
      },
      data: [],
      cityArr: ["广州市", "深圳市", "佛山市", "东莞市", "潮州市"],
      page: 1
    };
  },
  components: {
    addDealer
  },
  computed: {
    ...mapGetters(["userInfo"]),
    isUserName() {
      if (this.userInfo[0] === "admin") {
        return true;
      } else {
        return false;
      }
    }
  },
  methods: {
    //触发重新渲染数据方法
    leaveParent() {
      this.$emit("clickGet", 1, 10);
    },
    //重置page页码方法
    resetPage() {
      this.$parent.getPage();
    },
    getProv() {
      //获取省份方法
      let that = this;
      this.axios
        .get(this.api + "getArea")
        .then(result => {
          if (result.data.status == 1) {
            that.data = result.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    setCity() {
      this.$parent.fullscreenLoading = true;
      //change 城市
      let data = this.formData;
      this.axios
        .post(this.api + "setCity", data)
        .then(() => {
          this.$parent.fullscreenLoading = false;
        })
        .then(() => {
          this.leaveParent();
        })
        .catch(err => {
          console.log(err);
        });
    },
    setProv() {
      //change省份
      this.$parent.fullscreenLoading = true;
      let that = this,
        data = this.formData;
      this.axios
        .post(this.api + "setProv", data)
        .then(result => {
          if (result.data.status == 1) {
            this.$parent.fullscreenLoading = false;
            // console.log(result);
            //请求城市数据
            that.cityArr = result.data.data;
            //请求城市数据之后 清空默认值
            that.formData.city = "";
            //当清除省份之后 城市数据用默认数组填充
            if (this.formData.prov == "") {
              that.cityArr = ["广州市", "深圳市", "佛山市", "东莞市", "潮州市"];
            }
          }
        })
        .then(() => {
          this.leaveParent();
          this.resetPage();
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    //组件 创建完成加载
    this.getProv(), this.setProv();
  }
};
</script>
<style lang="less" scoped>
.el-input__inner {
  width: 120px;
}
.el-form-item {
  margin: 11px 0 11px 27px;
  float: left;
}
</style>
