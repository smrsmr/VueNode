<template>
  <div class="app-addDealers">
    <div class="app-addDealers-main">
      <el-button type="primary" icon="el-icon-circle-plus-outline" @click="dialogFormVisible = true">添加经销商</el-button>
      <el-dialog
        title="添加经销商"
        :visible.sync="dialogFormVisible"
        class="add"
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
          <el-button @click="addCancel('form')">取消添加</el-button>
          <el-button type="primary" @click="addSave('form')">确定添加</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      name: "addDealers",
      dialogFormVisible: false,
      form: {
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
      formLabelWidth: "80px"
    };
  },
  methods: {
    addSave(form) {
      let data = this.form;
      this.$refs[form].validate(valid => {
        if (valid) {
          this.axios
            .post(this.api + "addDealer", data)
            .then(() => {
              this.dialogFormVisible = false;
              this.$message({
                type: "success",
                message: "添加成功!"
              });
              this.$refs[form].resetFields();
            })
            .then(() => {
              this.$emit("leaveParent");
              this.$emit("resetPage");
            });
        } else {
          return false;
        }
      });
    },
    addCancel(form) {
      this.dialogFormVisible = false;
      this.$refs[form].resetFields();
      this.$message({
        type: "info",
        message: "已取消添加"
      });
    }
  }
};
</script>
<style lang="less" scoped>
.app-addDealers {
  float: left;
  line-height: 62px;
  margin-left: 27px;
}
</style>
