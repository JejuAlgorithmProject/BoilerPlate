import React, { useState } from 'react';
import RightMenu from './Sections/RightMenu';
import './Sections/Navbar.css';
import styled, { keyframes } from 'styled-components';

const round = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;
const Span = styled.span`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: 2px solid;
  animation: ${round} 5s linear infinite;
  &:nth-child(1) {
    border-radius: 38% 62% 64% 36% / 43% 35% 65% 57%;
    border-color: #261201;
  }
  &:nth-child(2) {
    animation-direction: reverse;
    border-radius: 31% 49% 50% 60% / 65% 66% 34% 35%;
    border-color: #8c704f;
  }
  &:nth-child(3) {
    animation-duration: 3s;
    border-radius: 83% 57% 76% 54% / 57% 34% 26% 43%;
    border-color: #735f4d;
  }
`;
const Home = styled.span`
  font-size: 0.8em;
  color: black;
  /* font-family: consolas; */
`;

function NavBar() {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  if (window.location.pathname === '/') {
    return null;
  }
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div className="menu__logo">
          <a href="/">
            <div
              style={{
                width: '60px',
                height: '60px',
                display: 'flex',
                position: 'relative',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
              }}
            >
              <Span />
              <Span />
              <Span />
              <Home>Home</Home>
            </div>
          </a>
        </div>
        <div>
          <RightMenu />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
