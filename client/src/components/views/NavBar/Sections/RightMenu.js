/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
const Upload = require('../../../../assets/images/upload.png');

const LogoutButton = styled.div`
  /* font-family: consolas; */
  font-size: 15px;
  line-height: 50px;
  padding: 10px;
  background: #261201;
  margin-top: 10px;
  border-radius: 50%;
  border: none;
  outline: none;
`;

const LogoutLink = styled.a`
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
    return null;
  } else {
    return (
      <LogoutButton>
        <LogoutLink onClick={logoutHandler} style={{ marginTop: '10px' }}>
          Logout
        </LogoutLink>
      </LogoutButton>
    );
  }
}

export default withRouter(RightMenu);
