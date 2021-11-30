import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import Auth from '../hoc/auth';
// pages for this product
import LandingPage from './views/LandingPage/LandingPage.js';
import LoginPage from './views/LoginPage/LoginPage.js';
import RegisterPage from './views/RegisterPage/RegisterPage.js';
import NavBar from './views/NavBar/NavBar';
import Footer from './views/Footer/Footer';
import DetailPostPage from './views/DetailPostPage/DetailPostPage';
import UploadPage from './views/UploadPage/UploadPage.js';
import HomePage from './views/HomePage/HomePage';
import SignPage from './views/SignPage/SignPage';
// import SubscriptionPage from "./views/SubscriptionPage/SubscriptionPage"
import '../static/fonts/font.css';
function App() {
  return (
    // suspense 란 밑에 코드가 호출되기 전까지 보여주는,,
    <div style={{ fontFamily: 'Dongle' }}>
      <Suspense fallback={<div>Loading...</div>}>
        <NavBar />
        <div
          style={{
            paddingTop: '75px',
            // minHeight: 'calc(100vh - 80px)',
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
  );
}

export default App;
