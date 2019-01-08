<template>
  <div class="addAccoutn">
    <el-row>
      <el-button
        type="primary"
        icon="el-icon-circle-plus-outline"
        @click="dialogFormVisible = true"
      >增加账号</el-button>
    </el-row>
    <el-dialog
      title="增加账号"
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
        <el-form-item label="权限" :label-width="formLabelWidth" prop="privilege">
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
export default {
  name: "addAccount",
  data() {
    return {
      dialogFormVisible: false,
      form: {
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
  methods: {
    //增加用户保存方法
    Save(form) {
      let that = this;
      let data = this.form;
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios
            .post(this.api + "userControl/editorUser", data)
            .then(response => {
              // 触发修改父级数组
              that.$parent.list = response.data.data;
              this.dialogFormVisible = false;
              this.$refs[form].resetFields();
              this.$message({
                type: "success",
                message: "增加账号成功,下次重新登录生效!"
              });
            });
        } else {
          return false;
        }
      });
    },
    //取消增加用户方法数据
    Cancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
      this.$message({
        type: "info",
        message: "已取消"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.addAccoutn {
  line-height: 53px;
  margin: 0 10px;
}
</style>
