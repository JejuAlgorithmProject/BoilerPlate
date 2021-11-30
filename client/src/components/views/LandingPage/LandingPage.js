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
        <div
          style={{
            height: '280px',
            margin: '0.3rem',
            borderRadius: '40px 40px 0 0',
            backgroundColor: 'white',
            boxShadow: '5px 5px 5px 5px rgba(0, 0, 0.3, 0.3)',
          }}
        >
          <div style={{ textAlign: 'center', height: '150px', overflow: 'hidden', borderRadius: '40px 40px 0 0' }}>
            <a href={`/post/${post._id}`}>
              <img src={post.selectedFile} alt="" width="100%" height="100%" />
            </a>
          </div>
          <div style={{ textAlign: 'center', padding: '1rem' }}>
            <span>{post.writer.name} </span>
            <div>제목 {post.title}</div>
            <div>내용 {post.description}</div>
            <div>
              {moment(post.createdAt).format('Y')}년.{moment(post.createdAt).format('MM')}월.{moment(post.createdAt).format('D')}일.
              {moment(post.createdAt).format('H')}시.{moment(post.createdAt).format('m')}분
            </div>
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
        <Col span={8} style={{ margin: '0.3rem auto' }}>
          <UploadPage style={{ width: '100%' }} />
        </Col>
      </Row>
    </div>
  );
}

export default LandingPage;
