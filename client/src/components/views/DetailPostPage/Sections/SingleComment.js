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

function SingleComment(props) {
    console.log(props)
    const user = useSelector(state => state.user)
    const [CommentValue, setCommentValue] = useState('')
    const [OpenReply, setOpenReply] = useState(false)

    const handleChange = e => {
        setCommentValue(e.currentTarget.value)
    }

    const openReply = () => {
        setOpenReply(!OpenReply)
    }

    const onSubmit = e => {
        e.preventDefault()

        const variables = {
            writer: user.userData._id,
            postId: props.postId,
            responseTo: props.comment._id,
            content: CommentValue,
        }

        Axios.post('/api/comment/saveComment', variables).then(response => {
            if (response.data.success) {
                setCommentValue('')
                setOpenReply(!OpenReply)
                // 이부분이 이해가 안됨
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    const actions = [
        <LikeDislikes comment commentId={props.comment._id} userId={localStorage.getItem('userId')} />,
        <span onClick={openReply} key="comment-basic-reply-to">
            Reply to{' '}
        </span>,
    ]

    return (
        <div>
            <Comment
                actions={actions}
                author={props.comment.writer.name}
                avatar={<Avatar src={props.comment.writer.image} alt="image" />}
                content={<p>{props.comment.content}</p>}
            ></Comment>

            {OpenReply && (
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
