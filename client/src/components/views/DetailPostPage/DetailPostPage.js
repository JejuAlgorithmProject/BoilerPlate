import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Comments from './Sections/Comments'
import LikeDislikes from './Sections/LikeDislikes'
import styled from 'styled-components'

const Container = styled.div`
    margin-top: -75px;
    padding-top: 75px;
    background: linear-gradient(100deg, #4b4033 30%, rgba(0, 0, 0, 0) 25%);
    width: 100%;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Grid = styled.div`
    display: grid;
    grid-template-columns: 3fr 1.5fr;
`

const Card = styled.div`
    position: relative;
    width: 750px;
    height: 550px;
    background-color: #fff;
    margin: 5px;
    padding: 40px;
    border-radius: 20px;
`

const User = styled.div`
    flex: 1;
    margin: 5px;
    padding: 40px;
    background-color: #4b4033;
    border-radius: 20px;
    font-size: 1.1rem;
    color: white;
    display: flex;
    align-items: center;
`

const Reply = styled.div`
    flex: 2;
    margin: 5px;
    padding: 20px;
    background-color: #fff;
    border-radius: 20px;
`

const Descript = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        background: none;
    }
`
const Test = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    top: 60%;
    left: 0;
    padding: 2rem;
`

function DetailPostPage(props) {
    console.log(props)
    const postId = props.match.params.postId
    const [Post, setPost] = useState([])
    const [CommentLists, setCommentLists] = useState([])

    const postVariable = {
        postId: postId,
    }

    useEffect(() => {
        axios.post('/api/post/getPost', postVariable).then(response => {
            if (response.data.success) {
                setPost(response.data.post)
                console.log(response.data.post)
            } else {
                alert('Failed to get post Info')
            }
        })

        axios.post('/api/comment/getComments', postVariable).then(response => {
            if (response.data.success) {
                console.log('response.data.comments', response.data.comments)
                setCommentLists(response.data.comments)
            } else {
                alert('Failed to get video Info')
            }
        })
    }, [])

    const updateComment = newComment => {
        setCommentLists(CommentLists.concat(newComment))
    }

    if (Post.writer) {
        return (
            <Container>
                <Grid>
                    <Card>
                        <div style={{position: 'relative', width: '100%', height: '60%'}}>
                            <img
                                src={Post.selectedFile}
                                alt=""
                                style={{position: 'absolute', height: '100%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)'}}
                            />{' '}
                        </div>

                        <Descript>
                            <Test>
                                <div style={{display: 'flex', flexDirection: 'row', marginBottom: '0.5rem'}}>
                                    <div
                                        style={{
                                            flex: '1',
                                            padding: '0.3rem',
                                            backgroundColor: '#CCB997',
                                            borderRadius: '5px',
                                            marginRight: '0.5rem',
                                        }}
                                    >
                                        이 날의 날씨는 {Post.weather}
                                    </div>
                                    <div style={{flex: '1', padding: '0.3rem', backgroundColor: '#CCB997', borderRadius: '5px'}}>
                                        이 날의 기분은 {Post.category}
                                    </div>
                                    <div style={{flex: '2', padding: '0.3rem', textAlign: 'end'}}>
                                        <LikeDislikes Post postId={postId} userId={localStorage.getItem('userId')} />
                                    </div>
                                </div>

                                <div
                                    style={{
                                        padding: '0.3rem',
                                        fontSize: '1rem',
                                        backgroundColor: '#F2DCB3',
                                        borderRadius: '5px',
                                        marginBottom: '0.5rem',
                                    }}
                                >
                                    {Post.title}
                                </div>
                                <div style={{padding: '0.3rem', backgroundColor: '#FFE8BD', borderRadius: '5px'}}>{Post.description}</div>
                            </Test>
                        </Descript>
                    </Card>
                    <div style={{display: 'flex', flexDirection: 'column'}}>
                        <User>
                            <ion-icon name="person-circle-outline" style={{fontSize: '6rem', color: 'lightgrey'}}></ion-icon>
                            <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '20px'}}>
                                <div>{Post.writer.name}</div>
                                <div style={{color: 'lightgrey'}}>{Post.writer.email}</div>
                            </div>
                        </User>
                        <Reply>
                            <Comments CommentLists={CommentLists} postId={Post._id} refreshFunction={updateComment} />
                        </Reply>
                    </div>
                </Grid>
            </Container>
        )
    } else {
        return <div>Loading...</div>
    }
}

export default DetailPostPage
