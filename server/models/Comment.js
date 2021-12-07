const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* Comment 데이터 모델 */
const commentSchema = mongoose.Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        postId: {
            type: Schema.Types.ObjectId,
            ref: 'Post',
        },
        responseTo: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        content: {
            type: String,
        },
    },
    {timestamps: true},
)

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {Comment}
