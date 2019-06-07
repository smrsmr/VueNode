<template>
  <div>
    <el-upload
      class="avatar-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :on-error="handleAvatarError"
    >
      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <!-- <i v-else class="el-icon-plus avatar-uploader-icon"></i> -->
      <i class="avatar-uploader-icon iconfont">&#xe60d;</i>
      <el-progress
        type="circle"
        :percentage="num"
        v-show="dialogVisible"
        class="upload-progress"
      ></el-progress>
    </el-upload>
  </div>
</template>
<script>
export default {
  name: "upload",
  data() {
    return {
      imageUrl: "",
      dialogVisible: false,
      num: 0
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.num = 100;
      this.imageUrl = URL.createObjectURL(file.raw);
      this.dialogVisible = false;
      console.log(this.imageUrl);
    },
    handleAvatarError(error) {
      this.dialogVisible = false;
      console.log(error);
    },
    beforeAvatarUpload(file) {
      this.dialogVisible = true;
      this.num = 0;
      let fileName = file.name;
      let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
      const isJPG = !regex.test(fileName.toLowerCase());
      console.log(isJPG);
      const isLt2M = file.size / 1024 / 1024 < 2;
      let times = setInterval(() => {
        this.num += 10;
        if (this.num >= 90) {
          clearInterval(times);
          this.num = 90;
        }
      }, 300);
      if (isJPG) {
        this.$message.error("图片格式不正确");
        this.dialogVisible = false;
        clearInterval(times);
        return;
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
        this.dialogVisible = false;
        clearInterval(times);
        return;
      }
      return !isJPG && isLt2M;
    }
  }
};
</script>
<style lang="less">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  width: 178px;
  height: 200px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  line-height: 200px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.upload-progress {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
}
</style>
