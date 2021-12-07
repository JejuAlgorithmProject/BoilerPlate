const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const saltRounds = 10
const jwt = require('jsonwebtoken')

/* User 데이터 모델 */
const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50,
    },
    email: {
        type: String,
        trim: true,
        unique: 1,
    },
    password: {
        type: String,
        minglength: 5,
    },
    lastname: {
        type: String,
        maxlength: 50,
    },
    role: {
        type: Number,
        default: 0,
    },
    image: String,
    token: {
        type: String,
    },
    tokenExp: {
        type: Number,
    },
})

/* Save 이전 */
userSchema.pre('save', function (next) {
    var user = this

    /* 비밀번호 암호화 작업 */
    if (user.isModified('password')) {
        /* bcrypt를 사용해서 패스워트를 암호화 */
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) return next(err)
                user.password = hash /* user의 암호를 bcrybt로 받은 hash값 입력 */
                next()
            })
        })
    } else {
        next()
    }
})

/* 비밀번호 비교 매서드 */
userSchema.methods.comparePassword = function (plainPassword, cb) {
    /* bcrypt로 암호화된 비밀번호를 비교 */
    bcrypt.compare(plainPassword, this.password, function (err, isMatch) {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

/* 토큰을 생성해주는 매서드 로그인 시 토큰값을 부여해서 로그인 유무 판단*/
userSchema.methods.generateToken = function (cb) {
    var user = this
    var token = jwt.sign(user._id.toHexString(), 'secret')
    /* jsonwebtoken 을 사용해서 user아이마다 토큰을 생성 */

    user.token = token
    /* 토큰값을 넣고 저장 */
    user.save(function (err, user) {
        if (err) return cb(err)
        cb(null, user)
    })
}

/* 부여한 토큰값을 찾아주는 매서드 */
userSchema.statics.findByToken = function (token, cb) {
    var user = this

    jwt.verify(token, 'secret', function (err, decode) {
        /* user id와 토큰을 비교해서 찾음 */
        user.findOne({_id: decode, token: token}, function (err, user) {
            if (err) return cb(err)
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema)

module.exports = {User}
