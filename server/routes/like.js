const express = require('express')
const router = express.Router()
const {Like} = require('../models/Like')
const {Dislike} = require('../models/Dislike')

/* getlikes 라우터 */
router.post('/getLikes', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {postId: req.body.postId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    /* req.body.postId와 일치하는 Like db 데이터를 찾고 찾으면 likes값 리턴 */
    Like.find(variable).exec((err, likes) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({success: true, likes})
    })
})

/* dislisks 싫어요 라우터 */
router.post('/getDislikes', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {postId: req.body.postId}
    } else {
        variable = {commentId: req.body.commentId}
    }
    /* getlisㅏ 방식은 일치하지만 dislike데이터를 리턴 */
    Dislike.find(variable).exec((err, dislikes) => {
        if (err) return res.status(400).send(err)
        res.status(200).json({success: true, dislikes})
    })
})

/* uplike 라우터 */
router.post('/upLike', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    /* 응답받은 데이터를 Like 모델에 저장한 후 like변수에 삽입 */
    const like = new Like(variable)
    /* like변수를 db에 save err발생시 err값 리턴*/
    like.save((err, likeResult) => {
        if (err) return res.json({success: false, err})
        /* 싫어요 -> 좋아요 변경시 Dislike의 값 삭제가 필요하기에 findOneAndDelete 메서드를 사용하여 dislike데이터 삭제 */
        Dislike.findOneAndDelete(variable).exec((err, disLikeResult) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })
    })
})

/* unLike 라우투 */
router.post('/unLike', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    /* 좋아요를 취소하는 경우, Like모델에서 variable데이터를 찾은 후 데이터를 삭제함 */
    Like.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true})
    })
})

/* upDisLike 라우터 */
router.post('/upDisLike', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }

    /* like와 방식은 동일, 단지 Dislike 모델에 저장 후 dislike변수에 삽입 후 저장*/
    const disLike = new Dislike(variable)
    disLike.save((err, dislikeResult) => {
        if (err) return res.json({success: false, err})
        /* Like와 동일하게 싫어요 클릭시 좋아요 취소를 위해 찾아서 delete */
        Like.findOneAndDelete(variable).exec((err, likeResult) => {
            if (err) return res.status(400).json({success: false, err})
            res.status(200).json({success: true})
        })
    })
})

/* unDisLike 라우터 */
router.post('/unDisLike', (req, res) => {
    let variable = {}
    if (req.body.postId) {
        variable = {postId: req.body.postId, userId: req.body.userId}
    } else {
        variable = {commentId: req.body.commentId, userId: req.body.userId}
    }
    /* like와 동일하게 그냥 취소하는 것이기 때문에 Dislike 모델에서 variable데이터를 찾은 후 삭제 */
    Dislike.findOneAndDelete(variable).exec((err, result) => {
        if (err) return res.status(400).json({success: false, err})
        res.status(200).json({success: true})
    })
})

module.exports = router
