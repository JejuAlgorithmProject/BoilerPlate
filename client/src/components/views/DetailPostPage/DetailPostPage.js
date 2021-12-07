import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import styled from 'styled-components';

const Container = styled.div`
  margin-top: -75px;
  padding-top: 75px;
  background: linear-gradient(100deg, #4b4033 30%, rgba(0, 0, 0, 0) 25%);
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 3fr 1.5fr;
`;

const Card = styled.div`
  position: relative;
  width: 750px;
  height: 550px;
  background-color: #fff;
  margin: 5px;
  padding: 40px;
  border-radius: 20px;
`;

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
`;

const Reply = styled.div`
  flex: 2;
  margin: 5px;
  padding: 20px;
  background-color: #fff;
  border-radius: 20px;
`;

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
`;
const Test = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 60%;
  left: 0;
  padding: 2rem;
`;

const Today = styled.div`
  flex: 1;
  padding: 0.3rem;
  background-color: #ccb997;
  border-radius: 5px;
`;

const Updown = styled.div`
  flex: 2;
  padding: 0.3rem;
  text-align: end;
`;

const Title = styled.div`
  padding: 0.3rem;
  font-size: 1rem;
  background-color: #f2dcb3;
  border-radius: 5px;
  margin-bottom: 0.5rem;
`;

const DetailDescript = styled.div`
  padding: 0.3rem;
  background-color: #ffe8bd;
  border-radius: 5px;
`;

const UserIntroduce = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 20px;
`;

function DetailPostPage(props) {
  console.log(props);

  const postId = props.match.params.postId;
  const [Post, setPost] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const postVariable = {
    postId: postId,
  };

  useEffect(() => {
    // postVariable(postId)에 따라 데이터 가져오기 -> 백엔드 코드 참고
    axios.post('/api/post/getPost', postVariable).then((response) => {
      if (response.data.success) {
        // 성공 시 setPost에 값 전달?
        setPost(response.data.post);
        console.log(response.data.post);
      } else {
        alert('Failed to get post Info');
      }
    });

    // postVariable(postId)에 따라 데이터 가져오기-> 백엔드 코드 참고
    axios.post('/api/comment/getComments', postVariable).then((response) => {
      if (response.data.success) {
        console.log('response.data.comments', response.data.comments);
        // 성공 시 setCommentLists에 값 전달?
        setCommentLists(response.data.comments);
      } else {
        alert('Failed to get video Info');
      }
    });
  }, []);

  const updateComment = (newComment) => {
    setCommentLists(CommentLists.concat(newComment));
  };

  if (Post.writer) {
    return (
      <Container>
        <Grid>
          <Card>
            <div style={{ position: 'relative', width: '100%', height: '60%' }}>
              {/* styledcomponent 사용 시 사진 보이지 않는 오류 */}
              <img
                style={{ position: 'absolute', height: '100%', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}
                src={Post.selectedFile}
                alt=""
              />{' '}
            </div>

            <Descript>
              <Test>
                <div style={{ display: 'flex', flexDirection: 'row', marginBottom: '0.5rem' }}>
                  <Today style={{ marginRight: '0.5rem' }}>이 날의 날씨는 {Post.weather}</Today>
                  <Today>이 날의 기분은 {Post.category}</Today>
                  <Updown>
                    <LikeDislikes Post postId={postId} userId={localStorage.getItem('userId')} />
                  </Updown>
                </div>

                <Title>{Post.title}</Title>
                <DetailDescript>{Post.description}</DetailDescript>
              </Test>
            </Descript>
          </Card>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <User>
              <ion-icon name="person-circle-outline" style={{ fontSize: '6rem', color: 'lightgrey' }}></ion-icon>
              <UserIntroduce>
                <div>{Post.writer.name}</div>
                <div style={{ color: 'lightgrey' }}>{Post.writer.email}</div>
              </UserIntroduce>
            </User>
            <Reply>
              {/* updateComment를 통해 comment 업로드 */}
              <Comments CommentLists={CommentLists} postId={Post._id} refreshFunction={updateComment} />
            </Reply>
          </div>
        </Grid>
      </Container>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailPostPage;
