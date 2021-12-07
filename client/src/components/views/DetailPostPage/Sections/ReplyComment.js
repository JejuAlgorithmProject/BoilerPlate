import React, {useEffect, useState} from 'react'
import SingleComment from './SingleComment'

// 대댓글 화면, SingleComment와 구성은 동일하지만 역할이 다르기에 구분하여 작성
function ReplyComment(props) {
    const [ChildCommentNumber, setChildCommentNumber] = useState(0)
    const [OpenReplyComments, setOpenReplyComments] = useState(false)

    useEffect(() => {
        let commentNumber = 0
        // CommentList를 맵핑 commentNumber변수를 통해서 대댓글 갯수 구분
        props.CommentLists.map(comment => {
            if (comment.responseTo === props.parentCommentId) {
                commentNumber++
            }
        })
        setChildCommentNumber(commentNumber)
    }, [props.CommentLists, props.parentCommentId])

    let renderReplyComment = parentCommentId =>
        // CommentLists 매핑
        props.CommentLists.map((comment, index) => (
            <React.Fragment>
                {comment.responseTo === parentCommentId && (
                    // 대댓글 화면 return 대댓글에도 대댓글이 달릴 수 있기 때문에 구성은 댓글과 동일
                    <div style={{width: '80%', marginLeft: '40px'}} key={index}>
                        <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                        <ReplyComment
                            CommentLists={props.CommentLists}
                            parentCommentId={comment._id}
                            postId={props.postId}
                            refreshFunction={props.refreshFunction}
                        />
                    </div>
                )}
            </React.Fragment>
        ))

    const handleChange = () => {
        setOpenReplyComments(!OpenReplyComments)
    }

    return <div>{OpenReplyComments && renderReplyComment(props.parentCommentId)}</div>
}

export default ReplyComment
