<template>
  <div class="setting">
    <h1>{{ name }}</h1>
    <br />
    <div class="input">
      <input type="text" v-model="value" />
    </div>
    <br />
  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      name: "我是设置组件",
      value: ""
    };
  },
  created() {},
  methods: {}
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
