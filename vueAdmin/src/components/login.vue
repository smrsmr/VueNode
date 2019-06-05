<template>
  <div class="login-container">
    <div class="loginB">
      <section
        v-loading.fullscreen.lock="fullscreenLoading"
        element-loading-text="Loading..."
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.7)"
      >
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          class="demo-ruleForm"
          hide-required-asterisk
        >
          <h3 class="title">Login Form</h3>
          <el-form-item prop="name">
            <i class="iconfont">&#xe609;</i>
            <el-input
              v-model.number="ruleForm.name"
              placeholder="账号"
            ></el-input>
            <i class="iconfont">
              <span style="display:inline-block;width:20px;"></span>
            </i>
          </el-form-item>
          <el-form-item prop="pass">
            <i class="iconfont">&#xe60c;</i>
            <el-input
              :type="typePass"
              v-model="ruleForm.pass"
              placeholder="密码"
              autocomplete="off"
              @keyup.enter.native="submitForm('ruleForm')"
            ></el-input>
            <i class="iconfont" @click="showPwd">
              <span v-show="typeIcon">&#xe621;</span>
              <span v-show="!typeIcon">&#xe606;</span>
            </i>
          </el-form-item>
          <el-form-item style="border:none;">
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
              style="width:100%;"
              >Log in</el-button
            >
          </el-form-item>
        </el-form>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    var checkName = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("账号不能为空"));
      }
      setTimeout(() => {
        if (Number.isInteger(value)) {
          callback(new Error("请输入中文或者英文"));
        } else {
          callback();
        }
      }, 1000);
    };
    var checkPass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ validator: checkName, trigger: "blur", required: true }],
        pass: [{ validator: checkPass, trigger: "blur" }]
      },
      fullscreenLoading: false,
      typePass: "Password",
      typeIcon: true
    };
  },
  methods: {
    open(text) {
      this.$alert(text, "提示", {
        confirmButtonText: "确定",
        type: "warning"
      });
    },
    showPwd() {
      if (this.typePass === "Password") {
        this.typePass = "text";
        this.typeIcon = false;
      } else {
        this.typePass = "Password";
        this.typeIcon = true;
      }
    },
    submitForm(formName) {
      this.fullscreenLoading = true;
      this.$refs[formName].validate(valid => {
        if (valid) {
          let bm = {
            name: this.ruleForm.name,
            pass: this.ruleForm.pass
          };
          this.axios
            .post(this.api + "login", bm)
            .then(res => {
              if (res.data.status == 1) {
                this.fullscreenLoading = false;
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("user_name", res.data.user_name);
                this.$router.push({ path: "/index", query: {} });
              } else if (res.data.status == 2) {
                this.open(res.data.mess);
                this.fullscreenLoading = false;
              } else {
                this.open(res.data.mess);
                this.fullscreenLoading = false;
              }
            })
            .catch(err => {
              this.open(err);
              this.fullscreenLoading = false;
            });
        } else {
          this.open("账号或密码错误");
          this.fullscreenLoading = false;
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style lang="less">
@bg: #283443;
@light_gray: #eee;
@cursor: #fff;
.login-container {
  text-align: center;
  .el-input {
    display: inline-block;
    height: 47px;
    width: 80%;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: @light_gray;
      height: 47px;
      font-size: 20px;
      caret-color: @cursor;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px @bg inset !important;
        box-shadow: 0 0 0px 1000px @bg inset !important;
        -webkit-text-fill-color: @cursor !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
    margin-bottom: 32px;
  }
}
</style>

<style lang="less" scoped>
.login-container {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: #2d3a4b;
  .loginB {
    width: 450px;
    height: 320px;
    border-radius: 6px;
    margin: 200px auto 0;
    opacity: 0;
    animation-name: slideTo;
    animation-duration: 0.8s;
    animation-delay: 0.3s;
    animation-fill-mode: forwards;
    i {
      font-size: 20px;
      color: #889aa4;
      cursor: pointer;
    }
    .title {
      font-size: 40px;
      color: #fff;
      margin: 0 auto 40px;
    }
  }
}
@keyframes slideTo {
  0% {
    transform: translateY(-200px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
