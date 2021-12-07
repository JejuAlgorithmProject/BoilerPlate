/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
import styled from 'styled-components';

const LogoutButton = styled.div`
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
  // 리덕스 useSelector 를 통해 user 리듀서의 값을 가져옴
  const user = useSelector((state) => state.user);

  // 로그아웃 핸들러
  const logoutHandler = () => {
    // axios를 통해 백엔드에 localhost:5000/api/logout 호출
    axios.get(`${USER_SERVER}/logout`).then((response) => {
      // 로그아웃 완료 시 /sign 페이지 이동
      if (response.status === 200) {
        props.history.push('/sign');
      } else {
        // 실패하면 알림창 띄우기
        alert('Log Out Failed');
      }
    });
  };

  if (user.userData && !user.userData.isAuth) {
    // homepage navbar 없어지지 않는 이슈로 인해 return null
    return null;
  } else {
    return (
      <LogoutButton>
        {/* 로그아웃 버튼 클릭 시 로그아웃 핸들러 호출 */}
        <LogoutLink onClick={logoutHandler} style={{ marginTop: '10px' }}>
          Logout
        </LogoutLink>
      </LogoutButton>
    );
  }
}

export default withRouter(RightMenu);
