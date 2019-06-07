<script>
/**
 * this.$slots用法
 */
export default {
  data() {
    return {};
  },
  props: {
    myData: Array
  },
  render: function(createElement) {
    if (this.myData.length) {
      return createElement(
        "ul",
        this.myData.map(function(item) {
          return createElement("li", {
            style: {
              color: "red",
              fontSize: "18px",
              listStyle: "none"
            },
            domProps: {
              innerHTML: item.name
            }
          });
        })
      );
    } else {
      //this.$slots 返回的是一个插槽的数组
      const { header, footer } = this.$slots;
      const body = this.$slots.default;
      return createElement("div", [
        createElement("header", header),
        createElement("main", body),
        createElement("footer", footer)
      ]);
    }
  },
  created() {}
};
</script>
<style lang="less" scoped></style>
