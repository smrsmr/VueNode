<script>
/**
 * 子组件之间传递作用域插槽
 */
import Vue from "vue";
export default {
  name: "childSlots",
  data() {
    return {};
  },
  render: function(createElement) {
    return createElement("div", [
      createElement("childer", {
        scopedSlots: {
          default: function(props) {
            return [
              createElement("p", "我是父组件"),
              createElement("p", props.text)
            ];
          }
        }
      })
    ]);
  }
};
Vue.component("childer", {
  render: function(createElement) {
    return createElement(
      "div",
      this.$scopedSlots.default({
        text: "我是子组件"
      })
    );
  }
});
</script>
<style lang="less" scoped>
</style>
