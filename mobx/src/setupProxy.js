const proxy = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(proxy('/yunYing', {
    target: "http://192.168.1.102:32041",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/yunYing": ""
    }
  })),
  app.use(proxy('/face', {
    target: "http://39.98.33.132:8893",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/face": ""
    }
  })),
  app.use(proxy('/body', {
    target: "http://39.98.33.132:8892",
    changeOrigin: true,
    secure: false,
    pathRewrite: {
      "^/body": ""
    }
  }))
}