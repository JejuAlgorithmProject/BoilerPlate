/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Upload = require('../../../../assets/images/upload.png');

const Logout_Button = styled.div`
  font-family: consolas;
  font-size: 15px;
  padding: 10px;
  background: #261201;
  margin-top: 15px;
  border-radius: 40px;
`;

const Logout_Link = styled.a`
  color: white;
  &:hover {
    color: #8c704f;
  }
`;

function RightMenu(props) {
  const user = useSelector((state) => state.user);

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      if (response.status === 200) {
        props.history.push('/sign');
      } else {
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      // <Menu mode={props.mode}>
      //     <Menu.Item key="mail">
      //         <a href="/login">Signin</a>
      //     </Menu.Item>
      //     <Menu.Item key="app">
      //         <a href="/register">Signup</a>
      //     </Menu.Item>
      // </Menu>
      null
    );
  } else {
    return (
      <Menu mode={props.mode}>
        {/* <Menu.Item key="create">
          <a href="/post/upload">
            <img src={Upload} alt="Upload" />
          </a>
        </Menu.Item> */}
        {/* <Menu.Item key="logout">
          <a onClick={logoutHandler} style={{ marginTop: '10px' }}>
            Logout
          </a>
        </Menu.Item> */}
        <Logout_Button>
          <Logout_Link onClick={logoutHandler} style={{ marginTop: '10px' }}>
            Logout
          </Logout_Link>
        </Logout_Button>
      </Menu>
    );
  }
}

export default withRouter(RightMenu);
