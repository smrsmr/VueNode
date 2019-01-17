const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  lintOnSave: undefined,
  // 基本路径
  baseUrl: "./",
  // 输出文件目录
  outputDir: "dist",
  configureWebpack: config => {
    config.resolve = {
      extensions: [".js", ".vue", ".json", ".css"],
      alias: {
        vue$: "vue/dist/vue.esm.js",
        "@": resolve("src")
      }
    };
  }
  // webpack-dev-server 相关配置
  // devServer: {
  //     port: 3001,
  // },
};
