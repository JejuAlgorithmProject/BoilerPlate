import React, { useEffect, useState } from 'react';
import { List, Avatar, Row, Col } from 'antd';
import axios from 'axios';
import Comments from './Sections/Comments';
import LikeDislikes from './Sections/LikeDislikes';
import { useSelector } from 'react-redux';

function DetailPostPage(props) {
  console.log(props);
  const user = useSelector((state) => state.user);
  const postId = props.match.params.postId;
  const [Post, setPost] = useState([]);
  const [CommentLists, setCommentLists] = useState([]);

  const postVariable = {
    postId: postId,
  };

  useEffect(() => {
    axios.post('/api/post/getPost', postVariable).then((response) => {
      if (response.data.success) {
        setPost(response.data.post);
      } else {
        alert('Failed to get post Info');
      }
    });

    axios.post('/api/comment/getComments', postVariable).then((response) => {
      if (response.data.success) {
        console.log('response.data.comments', response.data.comments);
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
      <Row>
        <Col lg={18} xs={24}>
          <div
            className="postPage"
            style={{ width: '100%', padding: '3rem 4em' }}
          >
            <img src={Post.selectedFile} alt="" width="400px" />
            <List.Item
              actions={[
                <LikeDislikes
                  Post
                  postId={postId}
                  userId={localStorage.getItem('userId')}
                />,
              ]}
            >
              <List.Item.Meta
                avatar={
                  <Avatar src={Post.writer /*  && Post.writer.image */} />
                }
                title={<a href="">{Post.title}</a>}
                description={Post.description}
              />
              <div></div>
            </List.Item>

            <Comments
              CommentLists={CommentLists}
              postId={Post._id}
              refreshFunction={updateComment}
            />
          </div>
        </Col>
      </Row>
    );
  } else {
    return <div>Loading...</div>;
  }
}

export default DetailPostPage;
