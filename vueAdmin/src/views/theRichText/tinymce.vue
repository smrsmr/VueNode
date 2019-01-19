<template>
    <div class="app-tiny-main">
      <editor id="tinymce" v-model="tinymceHtml" :init="init"></editor>
      <div v-html="tinymceHtml" class="editor-content"></div>
    </div>
</template>
<script>
import tinymce from "tinymce/tinymce";
import "tinymce/themes/modern/theme";
import Editor from "@tinymce/tinymce-vue";
import plugins from "../../assets/js/plugins";

export default {
  name: "tinymceVue",
  data() {
    return {
      tinymceHtml: "请输入内容",
      init: {
        language_url: "./tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: "./tinymce/skins/lightgray",
        selector: "textarea",
        height: 300,
        plugins: plugins,
        toolbar:
          "searchreplace bold italic underline template strikethrough alignleft aligncenter alignright outdent indent  blockquote undo redo removeformat subscript superscript code codesample', 'hr bullist numlist visualchars link image charmap preview anchor pagebreak insertdatetime media table emoticons forecolor backcolor fullscreen",
        branding: false,
        browser_spellcheck: true,
        contextmenu: false,
        menubar: "insert",
        media_live_embeds: true,
        insertdatetime_formats: [
          "%H:%M:%S",
          "%Y年-%m月-%d日",
          "%I:%M:%S %p",
          "%D"
        ]
      }
    };
  },
  components: {
    Editor
  },
  mounted() {
    tinymce.init({});
  }
};
</script>
<style lang="less" scoped>
.app-tiny-main {
  padding: 10px;
  .editor-content {
    margin-top: 20px;
    margin-left: 20px;
  }
}
</style>
