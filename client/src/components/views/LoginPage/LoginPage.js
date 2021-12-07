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

function LoginPage(props) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  console.log(user);

  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    let body = {
      email: Email,
      password: Password,
    };

    dispatch(loginUser(body)).then((response) => {
      // response 값에 user_reducer의 state 값이 리턴되어 들어옴
      console.log(response);
      if (response.payload.loginSuccess) {
        props.history.push('/home');
      } else {
        alert('Error˝');
      }
    });
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
        <label>Email</label>
        <SignInInput type="email" value={Email} onChange={onEmailHandler} placeholder="Email" />
        <label>Password</label>
        <SignInInput type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
        <br />
        <SignInButton type="submit">Login</SignInButton>
      </form>
    </div>
  );
}

export default withRouter(LoginPage);
