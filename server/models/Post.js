const mongoose = require('mongoose')
const Schema = mongoose.Schema

/* post 데이터 모델 */
const PostSchema = mongoose.Schema(
    {
        writer: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            maxlength: 50,
        },
        description: {
            type: String,
        },
        weather: {
            type: String,
        },
        category: {
            type: String,
        },
        views: {
            type: Number,
            default: 0,
        },
        selectedFile: {
            type: String,
        },
    },
    {timestamps: true},
)

const Post = mongoose.model('Post', PostSchema)

module.exports = {Post}
