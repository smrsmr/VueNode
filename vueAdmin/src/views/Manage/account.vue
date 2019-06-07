<template>
  <div class="app-container-main">
    <section class="app-container-head">
      <add-account />
    </section>
    <el-table
      :data="list"
      stripe
      show-overflow-tooltip="true"
      style="width: 100%"
      :default-sort="{ prop: 'privilege', order: 'ascending' }"
    >
      <el-table-column
        align="center"
        prop="name"
        label="账号"
        width="280"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="privilege"
        label="权限"
        sortable
        width="280"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="pass"
        label="密码"
      ></el-table-column>
      <el-table-column label="操作" fixed="right" width="200">
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
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      title="编辑"
      :visible.sync="dialogFormVisible"
      class="edit"
      width="500px"
      top="8vh"
      center
    >
      <el-form :model="form" status-icon :rules="rulesDialog" ref="form">
        <el-form-item label="账号" :label-width="formLabelWidth" prop="name">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item
          label="权限"
          :label-width="formLabelWidth"
          prop="privilege"
        >
          <el-input v-model="form.privilege" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="pass">
          <el-input v-model="form.pass" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="Cancel('form')">取消</el-button>
        <el-button type="primary" @click="Save('form')">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import addAccount from "./components/addAccount";
export default {
  name: "user",
  data() {
    return {
      list: [],
      dialogFormVisible: false,
      form: {
        id: "",
        name: "",
        privilege: "",
        pass: ""
      },
      rulesDialog: {
        name: [{ required: true, trigger: "blur", message: "请输入账号" }],
        privilege: [{ required: true, trigger: "blur", message: "请输入权限" }],
        pass: [{ required: true, trigger: "blur", message: "请输入密码" }]
      },
      formLabelWidth: "80px"
    };
  },
  components: {
    addAccount
  },
  methods: {
    getUserInfo() {
      let that = this;
      this.axios
        .get(this.api + "userControl/getUserInfo")
        .then(result => {
          that.list = result.data.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //点击弹出修改属性
    Edit(index, row) {
      this.dialogFormVisible = true;
      this.form.id = row._id;
      this.form.name = row.name;
      this.form.privilege = row.privilege;
      this.form.pass = row.pass;
    },
    //删除用户方法
    Delete(index, row) {
      let that = this;
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.axios
            .post(this.api + "userControl/deleteUser", { data: row })
            .then(response => {
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
    //编辑用户方法
    Save(form) {
      let that = this;
      let data = this.form;
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios
            .post(this.api + "userControl/editorUser", data)
            .then(response => {
              that.list = response.data.data;
              this.dialogFormVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                type: "success",
                message: "修改成功,下次重新登录生效!"
              });
            });
        } else {
          return false;
        }
      });
    },
    //取消修改用户数据
    Cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
      this.$message({
        type: "info",
        message: "已取消修改"
      });
    }
  },
  created() {
    this.getUserInfo();
  }
};
</script>
<style lang="less" scoped>
.app-container-main {
  padding: 10px 0 0 20px;
  .app-container-head {
    margin: 6px 4px 10px 0;
    width: 99%;
    height: 53px;
    border: 1px solid #ebeef5;
  }
}
</style>
