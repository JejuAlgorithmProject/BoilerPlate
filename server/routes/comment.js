const express = require('express')
const router = express.Router()
const {Comment} = require('../models/Comment')

/* saveComment 라우터 */
router.post('/saveComment', (req, res) => {
    /* Comment 모델에 req.body데이터를 넣고, comment변수에 삽입 */
    const comment = new Comment(req.body)

    /* comment변수를 save*/
    comment.save((err, comment) => {
        if (err) return res.json({success: false, err})
        /* Commnet모델에서 comment._id을 찾은 후 result 값 리턴 */
        Comment.find({_id: comment._id})
            .populate('writer')
            .exec((err, result) => {
                if (err) return res.json({success: false, err})
                return res.status(200).json({success: true, result})
            })
    })
})

/* getComments 라우터 */
router.post('/getComments', (req, res) => {
    /* req.body.postId와 일치하는 Comment모델 데이터를 찾은 후 comments값을 리턴 */
    Comment.find({postId: req.body.postId})
        .populate('writer')
        .exec((err, comments) => {
            if (err) return res.status(400).send(err)
            res.status(200).json({success: true, comments})
        })
})

module.exports = router
