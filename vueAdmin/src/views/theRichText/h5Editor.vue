<template>
  <div>
    <vue-html5-editor
      :content="content"
      :height="500"
      @change="getData"
    ></vue-html5-editor>
  </div>
</template>
<script>
export default {
  name: "h5Editor",
  data() {
    return {
      content: "vue-html5-editor"
    };
  },
  methods: {
    getData(e) {
      console.log(e);
    }
  }
};
</script>
<style lang="less" scoped></style>
