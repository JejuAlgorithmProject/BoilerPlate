import React, {useEffect, useState} from 'react'
import {FaCode} from 'react-icons/fa'
import {Card, Avatar, Col, Typography, Row} from 'antd'
import axios from 'axios'
import moment from 'moment'
import UploadPage from '../UploadPage/UploadPage'

const {Title} = Typography
const {Meta} = Card

function LandingPage() {
    const [Posts, setPosts] = useState([])

    useEffect(() => {
        axios.get('/api/post/getPosts').then(response => {
            if (response.data.success) {
                setPosts(response.data.posts)
            } else {
                alert('Failed to get posts')
            }
        })
    }, [])

    const renderCards = Posts.map((post, index) => {
        console.log(post)
        return (
            <Col lg={6} md={8} xs={24} key={index}>
                <div style={{position: 'relative'}}>
                    <a href={`/post/${post._id}`}>
                        <img src={post.selectedFile} alt="" width="230px" height="130px" />
                    </a>
                </div>
                <br />
                <span>작성자 {post.writer.name} </span>
                <div>제목 {post.title}</div>
                <div>내용 {post.description}</div>
                <br />
                <div> 조회 수{post.views}</div>
                <div> {moment(post.createdAt).format('MMM Do YY')} </div>
            </Col>
        )
    })

    return (
        <div style={{width: '85%', margin: '3rem auto'}}>
            <Title level={2}> 일긔 </Title>
            <hr />

            <Row gutter={16}>
                <Col span={20}>{renderCards}</Col>
                <Col span={4}>
                    <UploadPage />
                </Col>
            </Row>
        </div>
    )
}

export default LandingPage
