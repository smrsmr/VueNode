<template>
  <div class="setting">
    <h1>{{ name }}</h1>
    <br />
    <br />
    <section>
      <ul>
        <li v-for="(item, index) in dataWs" :key="index">
          {{ item.name }}---{{ item.age }}
        </li>
      </ul>
    </section>
    <br />
    <br />
    <el-button type="primary" @click="send">通过websocket发送消息</el-button>
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      name: "websocket",
      value: "",
      dataWs: [],
      websock: null
    };
  },
  created() {
    console.log("组件加载");
    this.initWebSocket();
  },
  destroyed: function() {
    //页面销毁时关闭长连接
    this.websocketclose();
  },
  methods: {
    initWebSocket() {
      //初始化weosocket
      this.websock = new WebSocket("ws://127.0.0.1:8080/websocket");
      this.websock.onopen = this.websocketonopen;

      this.websock.onerror = this.websocketonerror;

      this.websock.onmessage = this.websocketonmessage;
      this.websock.onclose = this.websocketclose;
      // 组件销毁时调用，中断websocket链接
      this.over = () => {
        this.websock.close();
      };
    },
    websocketonopen() {
      console.log("ws onopen");
    },
    websocketonerror(e) {
      console.log("WebSocket连接发生错误");
    },
    websocketonmessage(e) {
      console.log(e.data);
      console.log("ws onmessage");
      let obj = JSON.parse(e.data);
      this.dataWs = obj;
      console.log(e.data);
      // console.log("from server: " + strObj);
    },
    websocketclose() {
      this.over();
      // 关闭 websocket
      console.log("连接已关闭...");
    },
    send() {
      let obj = [
        {
          name: "张三",
          age: 18
        }
      ];
      this.dataWs = this.dataWs.length > 0 ? this.dataWs : obj;
      obj = JSON.stringify(this.dataWs);
      //发送给服务端
      this.websock.send(obj);
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
