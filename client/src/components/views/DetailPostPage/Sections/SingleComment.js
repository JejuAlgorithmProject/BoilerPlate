import React, {useState} from 'react'
import {Comment, Avatar} from 'antd'
import Axios from 'axios'
import {useSelector} from 'react-redux'
import LikeDislikes from './LikeDislikes'
import styled from 'styled-components'

const Textarea = styled.textarea`
    width: 70%;
    border: 1px solid #d9c5a0;
    transition: all 0.5s;
    font-size: 1rem;
    padding: 10px;
    margin-right: 5px;
    &:hover {
        box-shadow: 0px 0px 10px 2px #d9c5a0;
    }
    &:focus {
        outline: none;
        box-shadow: 0px 0px 5px 2px #d9c5a0;
    }
`

const Button = styled.button`
    width: 30%;
    height: 100%;
    border: 1px solid #d9c5a0;
    background: #d9c5a0;
    border-radius: 5px;
    font-size: 1rem;
    color: #fff;
    &:hover {
        box-shadow: 0px 0px 10px #d9c5a0;
        cursor: pointer;
    }
`

// 댓글 함수
function SingleComment(props) {
    // user 리듀서 user변수에 삽입
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState('')
    const [OpenReply, setOpenReply] = useState(false)

    // textarea onChange함수
    const handleChange = e => {
        setCommentValue(e.currentTarget.value)
    }

    // 대댓글 작성을 위해서 대댓글 작성 창 토글 함수
    const openReply = () => {
        setOpenReply(!OpenReply)
        /* 버튼을 눌러줄 떄마다 전환 */
    }

    const onSubmit = e => {
        // 새로고침 방지
        e.preventDefault()

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue,
        }

        // 백엔드 호출로 variables 데이터 저장
        Axios.post('/api/comment/saveComment', variables).then(response => {
            if (response.data.success) {
                setCommentValue('')
                setOpenReply(!OpenReply)
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    const actions = [
        // onclick버튼을 누를때 마다 true false 전환 대댓글 창 토글
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">
            Reply to{' '}
        </span>,
    ]

    return (
        <div>
            {/* 댓글 화면 ant 디자인 기능 사용 */}
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={<p>{props.comment.content}</p>}
            ></Comment>

            {/* 대댓을 토글, true의 경우 대댓글 창 오픈 */}
            {OpenReply && (
                // 대댓글 창은 댓글 화면 구성과 동일
                <form style={{display: 'flex', height: '52px'}} onSubmit={onSubmit}>
                    <Textarea
                        style={{width: '100%', borderRadius: '5px'}}
                        onChange={handleChange}
                        value={CommentValue}
                        placeholder="write some comments"
                    />
                    <br />
                    <Button style={{width: '20%', height: '52px'}} onClick={onSubmit}>
                        Submit
                    </Button>
                </form>
            )}
        </div>
    )
}

export default SingleComment
