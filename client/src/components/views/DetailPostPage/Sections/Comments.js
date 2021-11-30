import React, {useState} from 'react'
import axios from 'axios'
import {useSelector} from 'react-redux'
import SingleComment from './SingleComment'
import ReplyComment from './ReplyComment'
import styled from 'styled-components'

const Scroll = styled.div`
    height: 150px;
    width: 330px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        background: none;
        width: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background: #4b4033;
        border-radius: 20px;
    }
`

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
    font-size: 1.2rem;
    color: #fff;
    &:hover {
        box-shadow: 0px 0px 10px #d9c5a0;
        cursor: pointer;
    }
`

function Comments(props) {
    const user = useSelector(state => state.user)
    const [Comment, setComment] = useState('')

    const handleChange = e => {
        setComment(e.currentTarget.value)
    }

    const onSubmit = e => {
        e.preventDefault()
        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
        }

        axios.post('/api/comment/saveComment', variables).then(response => {
            if (response.data.success) {
                setComment('')
                props.refreshFunction(response.data.result)
            } else {
                alert('Failed to save Comment')
            }
        })
    }

    return (
        <div style={{heght: '100%', fontSize: '1rem'}}>
            <p> 댓글</p>
            <hr />
            {/* Comment Lists  */}
            {console.log(user)}

            <Scroll>
                {props.CommentLists &&
                    props.CommentLists.map(
                        (comment, index) =>
                            !comment.responseTo && (
                                <React.Fragment key={index}>
                                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                                    <ReplyComment
                                        CommentLists={props.CommentLists}
                                        postId={props.postId}
                                        parentCommentId={comment._id}
                                        refreshFunction={props.refreshFunction}
                                    />
                                </React.Fragment>
                            ),
                    )}
            </Scroll>

            {/* Root Comment Form */}
            <form style={{display: 'flex', height: '60px', marginTop: '10px'}} onSubmit={onSubmit}>
                <Textarea
                    style={{width: '100%', borderRadius: '5px'}}
                    onChange={handleChange}
                    value={Comment}
                    placeholder="write some comments"
                />
                <Button onClick={onSubmit}>Submit</Button>
            </form>
        </div>
    )
}

export default Comments
