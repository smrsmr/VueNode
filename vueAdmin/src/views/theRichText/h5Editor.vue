<template>
  <div>
    <vue-html5-editor :content="content" :height="500"></vue-html5-editor>
</div>
</template>
<script>
export default {
  // name: "vue-html5-editor",
  data() {
    return {
      content: ""
    };
  }
};
</script>
<style lang="less" scoped>
</style>
