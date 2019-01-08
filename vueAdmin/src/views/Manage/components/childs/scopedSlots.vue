
<script>
/**
 * 作用域插槽（获取子组件数据）
 */
export default {
  name: "scopedSlots",
  data() {
    return {
      message: "Hello scopedSlots"
    };
  },
  render: function(createElement) {
    return createElement(
      "div",
      {
        style: {
          marginTop: "30px"
        }
      },
      [
        this.$scopedSlots.default({
          text: this.message
        })
      ]
    );
  }
};
</script>
<style lang="less" scoped>
</style>
