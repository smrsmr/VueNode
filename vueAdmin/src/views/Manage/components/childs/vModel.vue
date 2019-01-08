<script>
/**
 * v-model
 */
export default {
  name: "v-model",
  data() {
    return {};
  },
  render: function(createElement) {
    let self = this;
    return createElement("input", {
      style: {
        marginTop: "30px"
      },
      domProps: {
        value: self.value
      },
      on: {
        input: function(event) {
          self.$emit("input", event.target.value);
        }
      }
    });
  }
};
</script>
<style lang="less" scoped>
</style>
