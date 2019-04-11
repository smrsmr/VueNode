<template>
    <div>
        <h1>{{name}}</h1>
				<ul>
					<li v-for="v in obj" :key="v">{{v}}</li>
				</ul>
				<el-row>
					<el-button type="primary" @click="addObj">主要按钮</el-button>
				</el-row>
    </div>
</template>
<script>
export default {
  data() {
    return {
      name: "我是子组件3",
      obj: {
        a: "smr"
      }
    };
  },
  methods: {
    addObj() {
      // this.obj.b = "obj.b";
      this.$set(this.obj, "b", "obj.b");
      console.log(this.obj);
    }
  }
};
</script>
<style lang="less" scoped>
</style>
