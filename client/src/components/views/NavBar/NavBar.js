import React, {useState} from 'react'
import RightMenu from './Sections/RightMenu'
import './Sections/Navbar.css'
import styled from 'styled-components'

const Span = styled.span`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px solid;
    animation: animate 5s linear infinite;
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
`
const Home = styled.span`
    font-size: 0.8em;
    color: black;
    font-family: consolas;
`

function NavBar() {
    const [visible, setVisible] = useState(false)

    const showDrawer = () => {
        setVisible(true)
    }

    const onClose = () => {
        setVisible(false)
    }

<<<<<<< HEAD
    if (window.location.pathname === '/') {
        return null
    }
    return (
        <nav className="menu" style={{position: 'fixed', zIndex: 1, width: '100%'}}>
            <div style={{display: 'flex', justifyContent: 'space-between'}}>
                <div className="menu__logo">
                    <a href="/">
                        <div
                            style={{
                                width: '60px',
                                // marginTop: '-5px',
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
    )
=======

  if (window.location.pathname === '/') {
    return null;
  }
  return (
    <nav className="menu" style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
      <div className="menu__logo">
        <a href="/">
          {/* <img

            src="data:image/png;base64,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"
            alt="Logo"
            style={{ width: '50px', marginTop: '-5px' }}
          /> */}
                    <div
                        style={{
                            width: '60px',
                            // marginTop: '-5px',
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

            <div className="menu__container">
                {/* <div className="menu_left">
          <LeftMenu mode="horizontal" />
        </div> */}

        <div className="menu_rigth">
          <RightMenu mode="horizontal" />
        </div>
        <Button className="menu__mobile-button" type="primary" onClick={showDrawer}>
          <Icon type="align-right" />
        </Button>
        <Drawer title="Basic Drawer" placement="right" className="menu_drawer" closable={false} onClose={onClose} visible={visible}>
          <LeftMenu mode="inline" />
          <RightMenu mode="inline" />
        </Drawer>
      </div>
    </nav>
  );

>>>>>>> main
}

export default NavBar
