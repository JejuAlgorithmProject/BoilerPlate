import React, { useEffect, useState } from 'react';
import { FaCode } from 'react-icons/fa';
import { Card, Avatar, Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import UploadPage from '../UploadPage/UploadPage';
import { useSelector } from 'react-redux';
import NavBar from '../NavBar/NavBar';

const { Title } = Typography;
// const { Meta } = Card;

function LandingPage() {
  const [Posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);

  useEffect(() => {
    axios.get('/api/post/getPosts').then((response) => {
      console.log(response);
      if (response.data.success) {
        // setPosts (보여줘야하는 posts )
        setPosts(response.data.posts);
      } else {
        alert('Failed to get posts');
      }
    });
  }, []);

  const renderCards = Posts.map((post, index) => {
    console.log(post);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        <div style={{ height: '280px', margin: '0.3rem', borderRadius: '40px 40px 0 0', backgroundColor: 'white' }}>
          <div style={{ textAlign: 'center', height: '150px', overflow: 'hidden', borderRadius: '40px 40px 0 0', opacity: '70%' }}>
            <a href={`/post/${post._id}`}>
              <img src={post.selectedFile} alt="" width="100%" height="100%" />
            </a>
          </div>
          <div>
            <span>작성자 {post.writer.name} </span>
            <div>제목 {post.title}</div>
            <div>내용 {post.description}</div>
            <br />
            <div> 조회 수{post.views}</div>
            <div> {moment(post.createdAt).format('MMM Do YY')} </div>
          </div>
        </div>
      </Col>
    );
  });

  return (
    <div style={{ width: '90%', margin: '3rem auto' }}>
      <Title level={2}> 일긔 </Title>
      <hr />

      <Row gutter={16} style={{ margin: '2rem auto' }}>
        <Col span={16}>
          <div style={{ marginRight: '2rem' }}>{renderCards}</div>
        </Col>
        <Col span={8}>
          <UploadPage style={{ width: '100%' }} />
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
