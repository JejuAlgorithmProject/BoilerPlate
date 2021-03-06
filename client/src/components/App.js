import React, {Suspense} from 'react'
import {Route, Switch} from 'react-router-dom'
import Auth from '../hoc/auth'
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js'
import LoginPage from './views/LoginPage/LoginPage.js'
import RegisterPage from './views/RegisterPage/RegisterPage.js'
import NavBar from './views/NavBar/NavBar'
import DetailPostPage from './views/DetailPostPage/DetailPostPage'
import UploadPage from './views/UploadPage/UploadPage.js'
import HomePage from './views/HomePage/HomePage'
import SignPage from './views/SignPage/SignPage'
import '../static/fonts/font.css'

/* App.js는 기본적으로 react-router-dom을 사용해서 페이지를 보여주는 도화지?역할이다 */
/* 기본적으로 navBar, 즉 상단바는 항상 표시하고 그 외 페이지는 /루트에 따라서 보여줌 */
/* 이때!, 페이지 별로auth를 적용해서 페이별로 권한을 부여하는 것이다 */
// null은 무상관,true 로그인 유저만 접근 가능, false 비로그인 유저 접근 가능

// CSS의 경우 기본적으로 styled.components 사용 + ant design 라이브러리 사용

function App() {
    return (
        // suspense 란 밑에 코드가 호출되기 전까지 보여주는,,
        <div style={{fontFamily: 'Sunflower'}}>
            <Suspense fallback={<div>Loading...</div>}>
                <NavBar />
                <div
                    style={{
                        paddingTop: '75px',
                        minHeight: 'calc(100vh)',
                        backgroundColor: '#D9C5A0',
                    }}
                >
                    <Switch>
                        <Route exact path="/" component={Auth(HomePage, null)} />
                        <Route exact={true} path="/home" component={Auth(LandingPage, true)} />
                        <Route exact path="/login" component={Auth(LoginPage, false)} />
                        <Route exact path="/register" component={Auth(RegisterPage, false)} />
                        <Route exact path="/sign" component={Auth(SignPage, false)} />
                        <Route exact path="/post/upload" component={Auth(UploadPage, true)} />
                        <Route exact path="/post/:postId" component={Auth(DetailPostPage, true)} />
                    </Switch>
                </div>
            </Suspense>
        </div>
    )
}

export default App
