<template>
  <div
    class="dealers"
    v-loading.fullscreen.lock="fullscreenLoading"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(255, 255, 255, 0.7)"
  >
    <v-screen v-on:clickGet="clickGet" :currpage="currpage"></v-screen>
    <el-table
      :data="list"
      stripe
      show-overflow-tooltip="true"
      style="width: 100%"
      :height="height"
    >
      <el-table-column
        fixed
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
        :width="!isUserName ? '' : 200"
        label="地址"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="300" v-if="isUserName">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="primary"
            @click="Edit(scope.$index, scope.row)"
            icon="el-icon-edit"
            >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.$index, scope.row)"
            icon="el-icon-delete"
            >删除</el-button
          >
          <el-button
            v-if="scope.$index != 0"
            size="mini"
            :disabled="scope.$index === 0"
            @click="moveUp(scope.$index, scope.row)"
          >
            <i class="el-icon-arrow-up"></i>
          </el-button>
          <el-button
            size="mini"
            v-if="scope.$index != list.length - 1"
            :disabled="scope.$index === list.length - 1"
            @click="moveDown(scope.$index, scope.row)"
          >
            <i class="el-icon-arrow-down"></i>
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <mb-page
      v-bind:allpage="allpage"
      v-on:clickGet="clickGet"
      ref="getPage"
    ></mb-page>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      class="edit"
      width="500px"
      top="8vh"
      center
    >
      <el-form :model="form" status-icon :rules="rulesDialog" ref="form">
        <el-form-item label="地区" :label-width="formLabelWidth" prop="area">
          <el-input v-model="form.area" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="省份" :label-width="formLabelWidth" prop="prov">
          <el-input v-model="form.prov" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" :label-width="formLabelWidth" prop="city">
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="编码" :label-width="formLabelWidth" prop="code">
          <el-input v-model="form.code" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="phone">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="经销商" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="地址" :label-width="formLabelWidth" prop="address">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editCancel">取消修改</el-button>
        <el-button type="primary" @click="editSave('form')">确定修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
//引入分页模板
import Page from "./components/mb";
import Screen from "./components/screen";
import { mapGetters } from "vuex";
export default {
  name: "dealers",
  data() {
    return {
      name: "经销商组件",
      currentpage: 1,
      list: [],
      allpage: null,
      fullscreenLoading: false,
      height: 0,
      dialogFormVisible: false,
      form: {
        id: "",
        area: "",
        prov: "",
        city: "",
        code: "",
        phone: "",
        name: "",
        address: ""
      },
      rulesDialog: {
        area: [{ required: true, trigger: "blur", message: "请输入地区" }],
        prov: [{ required: true, trigger: "blur", message: "请输入省份" }],
        city: [{ required: true, trigger: "blur", message: "请输入城市" }],
        code: [{ required: true, trigger: "blur", message: "请输入城市code" }],
        phone: [{ required: true, trigger: "blur", message: "请输入手机号" }],
        name: [
          { required: true, trigger: "blur", message: "请输入经销商名字" }
        ],
        address: [
          { required: true, trigger: "blur", message: "请输入经销商地址" }
        ]
      },
      formLabelWidth: "80px",
      currpage: 1
    };
  },
  components: {
    "mb-page": Page,
    "v-screen": Screen
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
    //弹框方法
    open(text) {
      this.$alert(text, "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
    },
    //上移
    moveUp(index, row) {
      var that = this;
      console.log("上移", index, row);
      console.log(that.list[index]);
      if (index > 0) {
        let upDate = that.list[index - 1];
        that.list.splice(index - 1, 1);
        that.list.splice(index, 0, upDate);
      } else {
        alert("已经是第一条，不可上移");
      }
    },

    //下移
    moveDown(index, row) {
      var that = this;
      console.log("下移", index, row);
      if (index + 1 === that.list.length) {
        alert("已经是最后一条，不可下移");
      } else {
        console.log(index);
        let downDate = that.list[index + 1];
        that.list.splice(index + 1, 1);
        that.list.splice(index, 0, downDate);
      }
    },
    //获取分页数据方法
    clickGet: function(currentpage, currData) {
      this.fullscreenLoading = true;
      let that = this;
      this.axios
        .post(this.api + "getdata", {
          currentpage: currentpage,
          currData: currData
        })
        .then(response => {
          that.allpage = response.data.len;
          that.list = response.data.data;
          this.fullscreenLoading = false;
        })
        .catch(err => {
          setTimeout(() => {
            this.open(err);
            this.fullscreenLoading = false;
          }, 3000);
        });
    },
    getPage() {
      //每次切换省份 分页数据都从第一页开始
      this.$refs.getPage.currpage = this.currpage;
    },
    //点击弹出修改属性
    Edit(index, row) {
      this.dialogFormVisible = true;
      this.form.id = row._id;
      this.form.area = row.area;
      this.form.prov = row.prov;
      this.form.city = row.city;
      this.form.code = row.code;
      this.form.phone = row.phone;
      this.form.name = row.name;
      this.form.address = row.address;
    },
    //删除经销商方法
    Delete(index, row) {
      let that = this;
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios.post(this.api + "delete", { data: row }).then(response => {
            that.allpage = response.data.len;
            that.list = response.data.data;
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
      // console.log(index, row);
    },
    //编辑经销商方法
    editSave(form) {
      let that = this;
      let data = this.form;
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios.post(this.api + "edit", data).then(response => {
            that.allpage = response.data.len;
            that.list = response.data.data;
            this.dialogFormVisible = false;
            this.$message({
              type: "success",
              message: "修改成功!"
            });
          });
        } else {
          return false;
        }
      });
      // console.log(this.form);
    },
    //取消修改经销商数据
    editCancel() {
      this.dialogFormVisible = false;
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    }
  },
  created: function() {
    this.clickGet(1, 10);
    this.height = window.innerHeight - 220;
  }
};
</script>
<style lang="less" scoped>
.dealers {
  padding: 10px 0 10px 10px;
}
.el-dialog--center .el-dialog__body {
  padding: 25px 25px 0;
}
</style>
