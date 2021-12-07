const express = require('express')
const router = express.Router()
const {User} = require('../models/User')

const {auth} = require('../middleware/auth')

/* auth미들웨어 받는 데이터 user모델의 데이터*/
router.get('/auth', auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    })
})

/* 회원가입 라우터 */
router.post('/register', (req, res) => {
    const user = new User(req.body)
    /* User 모델에 req, 응답받은 body데이터를 넣고, user변수에 삽입 */

    /* user데이터를 저장, err 발생 시 200번 에러 발생 */
    user.save((err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).json({
            success: true,
        })
    })
})

/* 로그인 라우터 */
router.post('/login', (req, res) => {
    /* 응답받은 데이터의 email값을 User db데이터와 비교해서 찾음 */
    User.findOne({email: req.body.email}, (err, user) => {
        if (!user)
            /* user가 없다면 에러 메세지 리턴 */
            return res.json({
                loginSuccess: false,
                message: 'Auth failed, email not found',
            })

        /* 일치하는 email이 있다면 이젠 password값을 db데이터와 비교 user모델의 comparePassword메서드 사용 */
        user.comparePassword(req.body.password, (err, isMatch) => {
            /* 일치하지 않는경우 에러메세지 리턴 */
            if (!isMatch) return res.json({loginSuccess: false, message: 'Wrong password'})

            /* 비밀번호가 일치하면 로그인이 완료된 것이므로 generateToken메서드를 사용해서 토큰을 부여해서 로그인 유무 판별 */
            user.generateToken((err, user) => {
                if (err) return res.status(400).send(err)
                res.cookie('w_authExp', user.tokenExp)
                res.cookie('w_auth', user.token).status(200).json({
                    loginSuccess: true,
                    userId: user._id,
                })
            })
        })
    })
})

/* 로그아웃 라우터 */
router.get('/logout', auth, (req, res) => {
    /* req.user._id와 일치하는 id를 찾고 그 아이디의 토큰을 없애주며 로그아웃을 표현 */
    User.findOneAndUpdate({_id: req.user._id}, {token: '', tokenExp: ''}, (err, doc) => {
        if (err) return res.json({success: false, err})
        return res.status(200).send({
            success: true,
        })
    })
})

module.exports = router
