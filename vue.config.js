// const { defineConfig } = require('@vue/cli-service')
// module.exports = defineConfig({
//   transpileDependencies: true,
// })
const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://localhost:7001",
        changeOrigin: true,
      },
    },
  },
  configureWebpack: require("./webpack.config"),
};
