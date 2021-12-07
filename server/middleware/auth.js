const {User} = require('../models/User')

/* 인증을 위해 미들웨어를 작성 auth 로그인 여부, 또는 관리자 부여 등의 기능을 수행*/
/* 일기 앱에서는 비로그인시 진입 불가 페이지 생성을 위해서 사용 */
let auth = (req, res, next) => {
    let token = req.cookies.w_auth
    /* User 데이터 모델에서 token값을 찾음 */
    User.findByToken(token, (err, user) => {
        if (err) throw err
        /* user가 아닐경우 isAuth값 false부여  */
        if (!user)
            return res.json({
                isAuth: false,
                error: true,
            })

        /* 찾은 경우 req.token에 token값 삽입, req.user값에 user값 부여 */
        req.token = token
        req.user = user
        next()
    })
}

module.exports = {auth}
