const express = require('express')
const router = express.Router()
const {Post} = require('../models/Post')

/* getPosts 게시된 포스트를 전부 가져오는 라우터 */
router.get('/getPosts', (req, res) => {
    /* DB에 Post모델에 데이터를 가져옴 */
    Post.find()
        .populate('writer')
        .exec((err, posts) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, posts})
        })
})

/* 포스트를 업로드하는 라우터 */
router.post('/uploadPost', (req, res) => {
    /* req.body, 받은 데이터를 Post모델에 넣고, post변수에 삽입 */
    const post = new Post(req.body)

    /* post데이터를 db에 저장  실패시 200번 에러 발생*/
    post.save((err, post) => {
        if (err) return res.status(400).json({success: false, err})
        return res.status(200).json({
            success: true,
        })
    })
})

/* Posts들 중에서 원하는 post한개만 가져오기 -> 디테일 페이지로 활용 */
router.post('/getPost', (req, res) => {
    /* req.body.postId와 일치하는 _id를 찾은 후, post값을 리턴 */
    Post.findOne({_id: req.body.postId})
        .populate('writer')
        .exec((err, post) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, post})
        })
})

module.exports = router
