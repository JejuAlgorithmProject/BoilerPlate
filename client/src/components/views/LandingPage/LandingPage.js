import React, { useEffect, useState } from 'react';
import { Col, Typography, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import UploadPage from '../UploadPage/UploadPage';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const P = styled.p`
  position: absolute;
  width: 100%;
  font-size: large;
  font-weight: 300;
  color: #735f4d;
  opacity: 0;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
const DivPost = styled.div`
  height: 280px;
  margin: 0.3rem;
  border-radius: 40px 40px 0 0;
  background-color: white;
  box-shadow: 5px 5px 5px 5px rgba(0, 0, 0.3, 0.3);
  z-index: 2;
  transition: 0.25s;
  &:hover ${P} {
    transition: 0.25s;
    opacity: 1;
  }
  &:hover {
    box-shadow: 5px 5px 5px 10px rgba(0, 0, 0.3, 0.3);
  }
`;

const { Title } = Typography;

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
        <DivPost>
          <div style={{ textAlign: 'center', height: '150px', overflow: 'hidden', borderRadius: '40px 40px 0 0' }}>
            <a href={`/post/${post._id}`} style={{ height: '100%', position: 'relative' }}>
              <img src={post.selectedFile} alt="" width="100%" height="100%" />
              <P>자세히 보기</P>
            </a>
          </div>
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  borderRadius: '5px',
                  padding: '0.2rem',
                  flex: '1',
                  textAlign: 'center',
                  marginRight: '0.09rem',
                  backgroundColor: '#4b4033',
                  color: 'white',
                }}
              >
                {post.writer.name}
              </div>
              <div
                style={{
                  border: '0.5px solid',
                  borderRadius: '5px',
                  padding: '0.2rem',
                  flex: '2',
                  textAlign: 'center',
                  backgroundColor: '#735f4d',
                  color: 'white',
                }}
              >
                {post.title}
              </div>
            </div>
            <div
              style={{
                border: '0.5px solid',
                borderRadius: '5px',
                padding: '0.2rem',
                textAlign: 'center',
                overflow: 'hidden',
                whiteSpace: 'wrap',
                height: '70px',
                marginTop: '0.09rem',
                backgroundColor: '#9e9075',
                color: 'white',
              }}
            >
              {post.description}
            </div>
            <div style={{ fontSize: '0.1rem', padding: '0.2rem', textAlign: 'center' }}>
              {moment(post.createdAt).format('Y')}년.{moment(post.createdAt).format('MM')}월.{moment(post.createdAt).format('D')}일.
              {moment(post.createdAt).format('H')}:{moment(post.createdAt).format('m')}
            </div>
          </div>
        </DivPost>
      </Col>
    );
  });

  return (
    <div style={{ width: '90%', margin: '3rem auto' }}>
      <Title level={3}>일기를 꾸준히 써라. 그렇다면 언젠가는 일기가 너를 간직할 것이다_메이 웨스트</Title>
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
