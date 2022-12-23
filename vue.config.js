
// vue.config.js
module.exports = {
    chainWebpack: config => {
        config.module
        .rule('js')
        .test(/\.js$/)
        .use('babel-loader')
        .loader('babel-loader')

      config.module
        .rule('vue')
        .test(/\.vue$/)
        .use('vue-loader')
        .loader('vue-loader')
    }
}
