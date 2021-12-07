import React, { useState } from 'react';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import styled from 'styled-components';

const Container = styled.div`
  top: -5vh;
  position: relative;
  width: 1000px;
  height: 70vh;
  max-height: 70vh;
  margin: 100px auto;
`;

const Banner = styled.div`
  top: 5vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 60vh;
  background: rgba(255, 255, 255, 0.2);
  box-shadow: 0 5px 80px 20px rgba(0, 0, 0, 0.15);
  border-radius: 20px;
  background: #735f4d;
  &.active {
    background: #4b4033;
  }
`;

const Box = styled.div`
  position: relative;
  width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Boxh2 = styled.div`
  color: #fff;
  font-size: 1.7rem;
  font-weight: 500;
  margin-bottom: 10px;
`;

const FormBox = styled.div`
  position: absolute;
  left: 0;
  width: 50%;
  height: 100%;
  background: #bfb5a8;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 45px rgba(0, 0, 0, 0.25);
  border-radius: 20px;
  transition: 0.5s ease-in-out;
  overflow: hidden;
  &.active {
    left: 50%;
  }
`;

const SigninForm = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  transition: 0.5s;
  transition-delay: 0.25s;
  &.active {
    left: -100%;
  }
`;

const SignupForm = styled.div`
  position: absolute;
  left: 0;
  width: 100%;
  transition: 0.5s;
  left: 100%;
  transition-delay: 0.25s;
  &.active {
    left: 0;
    transition-delay: 0.25s;
  }
`;

const SignUpButton = styled.button`
  border: 0;
  background: #4b4033;
  display: block;
  margin: 10px auto;
  text-align: center;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  cursor: pointer;
`;

const SignInButton = styled.button`
  border: 0;
  background: #735f4d;
  display: block;
  margin: 10px auto;
  text-align: center;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  cursor: pointer;
`;

const SignPage = () => {
  // 로그인, 회원가입 페이지 구분을 위한 상태관리
  const [isOn, setIsOn] = useState(true);

  const handlerActive = () => {
    setIsOn(!isOn);
  };

  return (
    <Container>
      {/* 버튼 클릭 때마다 'active' class가 추가됨에 따라 로그인, 회원가입 페이지 전환 */}
      <Banner className={isOn ? ' ' : 'active'}>
        <Box>
          <Boxh2>Already Have an Account ?</Boxh2>
          <SignInButton onClick={handlerActive}>Sign in</SignInButton>
        </Box>
        <Box>
          <Boxh2>Don't Have an Account ?</Boxh2>
          <SignUpButton onClick={handlerActive}>Sign up</SignUpButton>
        </Box>
      </Banner>

      <FormBox className={isOn ? ' ' : 'active'}>
        <SigninForm className={isOn ? ' ' : 'active'}>
          <LoginPage />
        </SigninForm>
        <SignupForm className={isOn ? ' ' : 'active'}>
          <RegisterPage />
        </SignupForm>
      </FormBox>
    </Container>
  );
};

export default SignPage;
