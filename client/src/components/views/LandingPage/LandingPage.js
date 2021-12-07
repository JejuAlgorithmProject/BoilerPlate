import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import axios from 'axios';
import moment from 'moment';
import UploadPage from '../UploadPage/UploadPage';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

// styled-components를 사용한 디자인
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
const PostList = styled.div`
  text-align: center;
  height: 150px;
  overflow: hidden;
  border-radius: 40px 40px 0 0;
`;
const Writer = styled.div`
  border-radius: 5px;
  padding: 0.2rem;
  flex: 1;
  text-align: center;
  margin-right: 0.09rem;
  background-color: #4b4033;
  color: white;
`;
const Descript = styled.div`
  border: 0.5px solid;
  border-radius: 5px;
  padding: 0.2rem;
  text-align: center;
  overflow: hidden;
  white-space: wrap;
  height: 70px;
  margin-top: 0.09rem;
  background-color: #9e9075;
  color: white;
`;
const Title = styled.div`
  border: 0.5px solid;
  border-radius: 5px;
  padding: 0.2rem;
  flex: 2;
  text-align: center;
  background-color: #735f4d;
  color: white;
`;
const Date = styled.div`
  font-size: 0.1rem;
  padding: 0.2rem;
  text-align: center;
`;

function LandingPage() {
  const [Posts, setPosts] = useState([]);
  const user = useSelector((state) => state.user);
  console.log(user);

  // 컴포넌트가 렌더링(화면에 그려지는 것)될 때마다 useEffect가 실행
  useEffect(() => {
    // axios 비동기 통신을 통해 아래의 url로 http get요청
    axios.get('/api/post/getPosts').then((response) => {
      // http요청을 통해 받아온 데이터를 처리
      console.log(response);
      if (response.data.success) {
        // setPosts (보여줘야하는 posts )
        setPosts(response.data.posts);
      } else {
        alert('Failed to get posts');
      }
    });
  }, []);

  // Posts 데이터를 map 함수 통해 컴포넌트 렌더링
  const renderCards = Posts.map((post, index) => {
    console.log(post);
    return (
      <Col lg={6} md={8} xs={24} key={index}>
        {/* 일기 내용 */}
        <DivPost>
          <PostList>
            {/* 이미지 클릭 시 post id에 따라 해당 디테일 페이지로 이동 */}
            <a href={`/post/${post._id}`} style={{ height: '100%', position: 'relative' }}>
              <img src={post.selectedFile} alt="" width="100%" height="100%" />
              <P>자세히 보기</P>
            </a>
          </PostList>
          {/* 일기 작성자,제목,내용,작성일  */}
          <div style={{ padding: '0.5rem' }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Writer>{post.writer.name}</Writer>
              <Title>{post.title}</Title>
            </div>
            <Descript>{post.description}</Descript>
            <Date>
              {moment(post.createdAt).format('Y')}년.{moment(post.createdAt).format('MM')}월.{moment(post.createdAt).format('D')}일.
              {moment(post.createdAt).format('H')}:{moment(post.createdAt).format('m')}
            </Date>
          </div>
        </DivPost>
      </Col>
    );
  });

  return (
    // LandingPage
    <div style={{ width: '90%', margin: '3rem auto' }}>
      <div style={{ fontSize: '2em' }}>일기를 꾸준히 써라. 그렇다면 언젠가는 일기가 너를 간직할 것이다_메이 웨스트</div>
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
