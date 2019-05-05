const path = require("path");
const resolve = dir => path.join(__dirname, dir);
const IS_PROD = ["production", "prod"].includes(process.env.NODE_ENV);
const PurgecssPlugin = require("purgecss-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const glob = require("glob-all");
module.exports = {
  // 基本路径
  baseUrl: "./",
  //   outputDir: "C:\Users\24893\Desktop\gamesCode\GameApp\BBPK-ANDROID\app\src\main\assets",
  //   outputDir: "C:\Users\24893\Desktop\test",
  // webpack-dev-server 相关配置
  devServer: {
    host: "0.0.0.0",
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: null, // 设置代理
    before: app => {}
  },
  chainWebpack: config => {
    // 添加别名
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("common", resolve("src/common"))
      .set("Images", resolve("src/assets/Images"))
      .set("components", resolve("src/components"))
      .set("layout", resolve("src/layout"))
      .set("views", resolve("src/views"))
      .set("static", resolve("src/static"));
  },
  // 去除多余无效的 css
  configureWebpack: config => {
    if (IS_PROD) {
      const plugins = [];
      // plugins.push(
      //   new PurgecssPlugin({
      //     paths: glob.sync([
      //       path.join(__dirname, "./src/index.html"),
      //       path.join(__dirname, "./**/*.vue"),
      //       path.join(__dirname, "./src/**/*.js")
      //     ])
      //   })
      // );
      //   plugins.push(
      //     new UglifyJsPlugin({
      //       uglifyOptions: {
      //         compress: {
      //           warnings: false,
      //           drop_console: true,
      //           drop_debugger: false,
      //           pure_funcs: ["console.log"] //移除console
      //         }
      //       },
      //       sourceMap: false,
      //       parallel: true
      //     })
      //   );
      //   config.plugins = [...config.plugins, ...plugins];
    }
  }
};
