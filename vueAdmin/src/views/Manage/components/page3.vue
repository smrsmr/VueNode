<template>
  <div>
    <h1>{{ name }}</h1>
    <ul>
      <li v-for="v in obj" :key="v">{{ v }}</li>
    </ul>
    <el-row>
      <el-button type="primary" @click="addObj">主要按钮</el-button>
    </el-row>
    <attrs-dom
      :aoo="aoo"
      :boo="boo"
      :coo="coo"
      :roo="roo"
      v-on:attrs2="getChild"
    ></attrs-dom>
  </div>
</template>
<script>
/**
 * 简单来说： $attrs与 $listeners 是两个对象，
 * $attrs 里存放的是父组件中绑定的非 Props 属性，
 * $listeners里存放的是父组件中绑定的非原生事件。
 */
const attrsDom = () => import("./childs/attrs");
export default {
  components: {
    attrsDom
  },
  props: {
    roo: {
      type: String,
      default: function() {
        return "Node";
      }
    }
  },
  data() {
    return {
      name: "我是子组件3",
      obj: {
        a: "smr"
      },
      aoo: "vue",
      boo: "react",
      coo: "angular"
    };
  },
  methods: {
    addObj() {
      // this.obj.b = "obj.b";
      this.$set(this.obj, "b", "obj.b");
      console.log(this.obj);
    },
    getChild(e) {
      console.log("success getValue");
      console.log(e);
    }
  }
};
</script>
<style lang="less" scoped></style>
