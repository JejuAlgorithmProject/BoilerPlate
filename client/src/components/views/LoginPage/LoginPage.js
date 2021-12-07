import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const SignInInput = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 10px auto;
  text-align: center;
  border: 3px solid #735f4d;
  padding: 14px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  &:focus {
    width: 280px;
    border-color: #4b4033;
  }
`;

const SignInButton = styled.button`
  border: 0;
  background: #735f4d;
  display: block;
  margin: 20px auto;
  text-align: center;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: #4b4033;
  }
`;

const Login = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`;

function LoginPage(props) {
  const dispatch = useDispatch();
  // 리덕스 useSelector 를 통해 user 리듀서의 값을 가져옴
  const user = useSelector((state) => state.user);
  console.log(user);

  // useState를 통해 상태관리
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  // 이메일
  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  // 패스워드
  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  //제출
  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    // body를 loginUser에 넣어 dispatch로 액션을 호출
    dispatch(loginUser(body)).then((response) => {
      // response 값에 user_reducer의 state 값이 리턴되어 들어옴
      console.log(response);
      // 성공시 /home 이동
      if (response.payload.loginSuccess) {
        props.history.push('/home');
      } else {
        // 실패시 알림 띄우기
        alert('Error˝');
      }
    });
  };

  return (
    <Login>
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <SignInInput type="email" value={Email} onChange={onEmailHandler} placeholder="Email" />
        <label>Password</label>
        <SignInInput type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
        <br />
        <SignInButton type="submit">Login</SignInButton>
      </form>
    </Login>
  );
}

export default withRouter(LoginPage);
