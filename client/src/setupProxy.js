const proxy = require('http-proxy-middleware')

/* 프록시 정책으로 인해 포트 번호가 다르면 접근 안됨. */
/* 따라서 http-proxy-middleware npm을 사용해서 5000번 포트, 즉 백엔드 포트에 접근 */
module.exports = function (app) {
    app.use(proxy('/api', {target: 'http://localhost:5000/'}))
}
