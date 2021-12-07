const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const config = require('./config/key')
const mongoose = require('mongoose')

/* mongoDB 연결 */
const connect = mongoose
    .connect(config.mongoURI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('MongoDB Connected...')) /* mongoDB 성공 시 MongoDB Connected... 콘솔창에 출력 */
    .catch(err => console.log(err)) /* 에러 발생 시 err 콘솔창 출력 */

app.use(express.urlencoded({extended: true, limit: '10000mb'}))
app.use(express.json({extended: true, limit: '10000mb'}))
app.use(cookieParser())

/* 라우터 호출 */
app.use('/api/users', require('./routes/users'))
app.use('/api/post', require('./routes/post'))
app.use('/api/comment', require('./routes/comment'))
app.use('/api/like', require('./routes/like'))

/* backend port번호 지정 */
const port = process.env.PORT || 5000

/* backend port 연결 */
app.listen(port, () => {
    console.log(`Server Running at ${port}`)
})
