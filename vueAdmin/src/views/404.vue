<template>
  <div class="Error">
    <div class="Error_main">
      <div class="Error_left">
        <img src="../assets/img/404.png" alt="" />
      </div>
      <div class="Error_right">
        <p class="Error_right_oops">OOPS!</p>
        <p class="Error_right_info">
          版权所有<a
            href="https://wallstreetcn.com/"
            target="_blank"
            class="link_type"
            >华尔街见闻</a
          >
        </p>
        <p class="Error_right_headline">网管说这个页面你不能进......</p>
        <p class="Error_right_check">
          请检查您输入的网址是否正确，请点击以下按钮返回主页或者发送错误报告
        </p>
        <el-row>
          <el-button
            type="primary"
            round
            @click="return_Home"
            class="return_Home"
            >返回首页</el-button
          >
        </el-row>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "404",
  data() {
    return {};
  },
  methods: {
    return_Home() {
      this.$router.push({ path: "/index", query: {} });
    }
  }
};
</script>
<style lang="less" scoped>
@fontW: 700;
.Error {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: white;
  a {
    cursor: pointer;
    text-decoration: none;
    color: white;
  }
  .Error_main {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 1200px;
    transform: translate(-50%, -50%);
    .Error_left {
      width: 600px;
      float: left;
      opacity: 0;
      animation-name: slideTop;
      animation-duration: 0.5s;
      animation-delay: 0.3s;
      animation-fill-mode: forwards;
      img {
        max-width: 100%;
      }
    }
    .Error_right {
      width: 300px;
      padding: 30px 0;
      text-align: left;
      float: left;
      .Error_right_oops {
        color: #1482f0;
        font-size: 32px;
        line-height: 40px;
        margin-bottom: 20px;
        font-weight: 700;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
      }
      .Error_right_info {
        color: grey;
        font-size: 13px;
        line-height: 21px;
        margin-bottom: 30px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
        .link_type {
          color: #1482f0;
          margin-left: 5px;
        }
      }
      .Error_right_headline {
        color: #222;
        font-size: 20px;
        line-height: 24px;
        margin-bottom: 10px;
        font-weight: 700;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      .Error_right_check {
        color: grey;
        font-size: 13px;
        line-height: 21px;
        margin-bottom: 30px;
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      .return_Home {
        opacity: 0;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
    }
  }
  @keyframes slideUp {
    0% {
      transform: translateY(60px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes slideTop {
    0% {
      transform: translateY(-200px);
      opacity: 0;
    }
    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
}
</style>
