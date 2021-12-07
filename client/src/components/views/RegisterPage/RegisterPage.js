import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const SignUpInput = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 5px auto;
  text-align: center;
  border: 3px solid #4b4033;
  padding: 5px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  &:focus {
    width: 280px;
    border-color: #735f4d;
  }
`;
const SignUpButton = styled.button`
  border: 0;
  background: #4b4033;
  display: block;
  margin: 5px auto;
  text-align: center;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: #735f4d;
  }
`;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        window.location.replace('/sign');
        alert('Success to sign up');
      } else {
        alert('Failed to sign up');
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
        <SignUpInput type="email" value={Email} onChange={onEmailHandler} placeholder="Email" />
        <label>Name</label>
        <SignUpInput type="text" value={Name} onChange={onNameHandler} placeholder="Name" />
        <label>Password</label>
        <SignUpInput type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
        <label>Confirm Password</label>
        <SignUpInput type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} placeholder="Confirm Password" />
        <br />
        <SignUpButton type="submit">Register</SignUpButton>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);
