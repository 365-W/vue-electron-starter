const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: './',
  outputDir: 'desktop/static',
  transpileDependencies: true,
  // filenameHashing: false, // 去掉文件名中的 hash
  // chainWebpack: config => {
  //   config.optimization.minimize(true)
  // }
})
