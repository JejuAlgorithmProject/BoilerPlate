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
// 댓글 기능
function Comments(props) {
    // useSelector 메서드를 사용해서 user리듀서 값을 user변수에 삽입
    const user = useSelector(state => state.user)
    // Comment 변수 상태관리
    const [Comment, setComment] = useState('')

    // textarea onChange함수
    const handleChange = e => {
        setComment(e.currentTarget.value)
    }

    // form submit 함수
    const onSubmit = e => {
        // 새로고침 방지
        e.preventDefault()

        const variables = {
            content: Comment,
            writer: user.userData._id,
            postId: props.postId,
        }

        // axios를 사용하여 5000:/api/comment/saveComment 호출 매개변수로 variables 입력
        // Comment 저장이 완료되면 response.data.success true
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
            <Scroll>
                {props.CommentLists &&
                    props.CommentLists.map(
                        /* 댓글 리스트를 차례대로 map */
                        (comment, index) =>
                            !comment.responseTo && (
                                <React.Fragment key={index}>
                                    {/* 댓글 컴포넌트 */}
                                    <SingleComment comment={comment} postId={props.postId} refreshFunction={props.refreshFunction} />
                                    {/* 대댓글 컴포넌트 */}
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
