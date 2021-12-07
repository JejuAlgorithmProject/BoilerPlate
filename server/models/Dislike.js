const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* dislike 데이터 모델 */
const dislikeSchema = mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        commentId: {
            type: Schema.Types.ObjectId,
            ref: 'Comment',
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
    },
    {timestamps: true},
)

const Dislike = mongoose.model('Dislike', dislikeSchema)

module.exports = {Dislike}
