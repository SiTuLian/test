module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'components': '@/components',
        'network': '@/network',
        'publicJS': '@/publicJS',
        'views': '@/views'
      }
    }
  },
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.arthurdon.top:3000/',     //设置你调用的接口域名和端口号 别忘了加http
       changeOrigin: true,
       pathRewrite: {
       '^/api': '',     //这里理解成用'/api'代替target里面的地址，后面组件中我们掉接口时直接用api          代替 比如我要调用'http://xxx.xxx.xxx.xx:8081/user/add'，直接写‘/api/user/add’即可
         }
      }
    }
  },
  baseUrl: './'
}