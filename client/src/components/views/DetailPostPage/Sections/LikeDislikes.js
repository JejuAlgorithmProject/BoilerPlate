import React, {useEffect, useState} from 'react'
import {Tooltip, Icon} from 'antd'
import Axios from 'axios'

function LikeDislikes(props) {
    const [Likes, setLikes] = useState(0)
    const [Dislikes, setDislikes] = useState(0)
    const [LikeAction, setLikeAction] = useState(null)
    const [DislikeAction, setDislikeAction] = useState(null)
    let variable = {}

    console.log(props.Post)
    if (props.Post) {
        variable = {postId: props.postId, userId: props.userId}
    } else {
        variable = {commentId: props.commentId, userId: props.userId}
    }
    // 좋아요, 싫어요 버튼 부분
    useEffect(() => {
        // 좋아요 부분, 기존 좋아요 버튼 숫자를 불러옴. getLisks 백엔드 호출, variable값을 매개변수로 전달,
        Axios.post('/api/like/getLikes', variable).then(response => {
            console.log(response)
            if (response.data.success) {
                setLikes(response.data.likes.length)
                // 데이터를 성공적으로 전달하면, lisks를 LiskAction에 liked값 전달
                response.data.likes.map(like => {
                    if (like.userId === props.userId) {
                        setLikeAction('liked')
                    }
                })
            } else {
                alert('Failed to get likes')
            }
        })

        // 싫어요 부분, 좋아요 부분과 구성은 동일하나 dislike임
        Axios.post('/api/like/getDislikes', variable).then(response => {
            if (response.data.success) {
                setDislikes(response.data.dislikes.length)
                // 전달받은 데이터를 dislike에 전달
                response.data.dislikes.map(dislike => {
                    if (dislike.userId === props.userId) {
                        setDislikeAction('disliked')
                    }
                })
            } else {
                alert('Failed to get dislikes')
            }
        })
    }, [])

    // onLike 함수 -> 좋아요 버튼을 누를 때
    const onLike = () => {
        if (LikeAction === null) {
            // uplike 백엔드 호출
            Axios.post('/api/like/upLike', variable).then(response => {
                // 데이터를 성공적으로 받아오면 Likes + 1 좋아요 개수 추가,
                if (response.data.success) {
                    setLikes(Likes + 1)
                    setLikeAction('liked')

                    // 이미 싫어요 버튼을 눌렀을 경우엔 싫어요 버튼을 취소해줘야 함.
                    if (DislikeAction !== null) {
                        // null 값 부여 및 -1 하여 싫어요 제거 좋아요 추가
                        setDislikeAction(null)
                        setDislikes(Dislikes - 1)
                    }
                } else {
                    alert('Failed to increase the like')
                }
            })
        } else {
            // unlike는 좋아요 버튼을 다시 눌러 취소했을 때 unlike 백엔드 호출
            Axios.post('/api/like/unLike', variable).then(response => {
                // Dislike는 눌려져있지 않기 때문에 좋아요만 취소 -1, null
                if (response.data.success) {
                    setLikes(Likes - 1)
                    setLikeAction(null)
                } else {
                    alert('Failed to decrease the like')
                }
            })
        }
    }

    const onDisLike = () => {
        // 싫어요 버튼 구성, 구성은 좋아요 버튼과 동일하지만 기능이 다르기에 구분
        if (DislikeAction !== null) {
            // 싫어요 취소 버튼
            Axios.post('/api/like/unDisLike', variable).then(response => {
                // 데이터 받아오면 싫어요 취소
                if (response.data.success) {
                    setDislikes(Dislikes - 1)
                    setDislikeAction(null)
                } else {
                    alert('Failed to decrease dislike')
                }
            })
        } else {
            // 싫어요 버튼 누를 시
            Axios.post('/api/like/upDisLike', variable).then(response => {
                // 싫어요 버튼 추가 및, 좋아요 버튼 취소 필요
                if (response.data.success) {
                    setDislikes(Dislikes + 1)
                    setDislikeAction('disliked')

                    // 좋아요 버튼이 눌려있을 시 취소
                    if (LikeAction !== null) {
                        setLikeAction(null)
                        setLikes(Likes - 1)
                    }
                } else {
                    alert('Failed to increase dislike')
                }
            })
        }
    }

    return (
        // 화면에 나오는 부분, 좋아요 싫어요 부분은 ant디자인의 아이콘과 기능을 사용
        // 테마 또한 LikeActionv 값에 따라 filled, outlined로 구분하여 구분 점 부여
        <React.Fragment>
            <span key="comment-basic-like">
                <Tooltip title="Like">
                    <Icon type="like" theme={LikeAction === 'liked' ? 'filled' : 'outlined'} onClick={onLike} />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Likes}</span>
            </span>
            &nbsp;&nbsp;
            <span key="comment-basic-dislike">
                <Tooltip title="Dislike">
                    <Icon type="dislike" theme={DislikeAction === 'disliked' ? 'filled' : 'outlined'} onClick={onDisLike} />
                </Tooltip>
                <span style={{paddingLeft: '8px', cursor: 'auto'}}>{Dislikes}</span>
            </span>
        </React.Fragment>
    )
}

export default LikeDislikes
