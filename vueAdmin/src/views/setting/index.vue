<template>
    <div class="setting">
        <h1>{{name}}</h1>
				<br />
				<div class="input">
					<input type="text" v-model="value">
				</div>
				<br />
				<el-button type="primary" @click="send">发送消息</el-button>
    </div>
</template>
<script>
const ws = new WebSocket("ws://127.0.0.1:8080/websocket");
export default {
  name: "index",
  data() {
    return {
      name: "我是设置组件",
      value: ""
    };
  },
  created() {
    ws.onopen = function() {
      console.log("ws onopen");
      // 开启心跳检测，以免一段时间后收不到消息自动失联
      /* heartbeat_timer = setInterval(function () {
        _this.keepalive(ws);
      }, 5000); */
      //发送给服务端
      // ws.send("from client: vue");
    };
    ws.onmessage = function(e) {
      console.log("ws onmessage");
      // console.log("from server: " + e.data);
    };
    ws.onclose = function() {
      // clearInterval(heartbeat_timer);
      console.log("ws close");
    };
  },
  methods: {
    send() {
      if (this.value === "") {
        this.$message({
          message: "请不要发送空消息!!!",
          type: "warning"
        });
        return;
      }
      //发送给服务端
      ws.send(`vue: ${this.value}`);
    }
  }
};
</script>
<style lang="less" scoped>
.setting {
  padding-left: 10px;
  .input {
    width: 300px;
    height: 20px;
    border-radius: 6px;
    input {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
