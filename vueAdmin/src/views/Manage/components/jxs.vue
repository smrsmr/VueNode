<template>
  <div class="app-Manage-main">
    <h1>{{name}}</h1>
    <j-child :my-data="items">
      <h1 slot="header"><span>About Me</span></h1>
      <p>Here is some page content</p>
      <p slot="footer">Copyright 2018 Evan You</p>
      <p>If I have some content down here</p>
    </j-child>
    <j-vmodel :name="Jname" @input="val=>Jname=val">

    </j-vmodel>
    <p>你的名字是:{{Jname}}</p>

    <j-scoped>
        <template slot-scope="props">
            <span>{{props.text}}</span>
        </template>
    </j-scoped>

    <j-child-slots>
        
    </j-child-slots>

    <j-templots>
        <template slot-scope="props">
            <ul>
                <li v-for="item in props.data" :key="item">{{item}}</li>
            </ul>
        </template>
    </j-templots>
  </div>
</template>
<script>
import JChild from "./childs/child";
import JVmodel from "./childs/vModel";
import JScoped from "./childs/scopedSlots";
import JChildSlots from "./childs/childSlots";
import JTemplots from "./childs/tempSlots";
export default {
  data() {
    return {
      name: "深入理解Vue 渲染函数 &jxs 插槽",
      items: [{ name: "vue" }, { name: "React" }, { name: "JavaScript" }],
      Jname: ""
    };
  },
  components: {
    JChild,
    JVmodel,
    JScoped,
    JChildSlots,
    JTemplots
  }
};
</script>
<style lang="less" scoped>
.app-Manage-main {
  padding: 10px 0 0 20px;
}
</style>
