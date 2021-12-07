import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import {BrowserRouter} from 'react-router-dom'

import Reducer from './_reducers'
import {Provider} from 'react-redux'
import {createStore, applyMiddleware} from 'redux'
import promiseMiddleware from 'redux-promise'
import ReduxThunk from 'redux-thunk'

/* 리덕스에서 store부분 createStoreWithMiddleware변수를 만들어서 middle웨어를 삽입, reduxThunk npm사용과 store사용을 위한 세팅 */
const createStoreWithMiddleware = applyMiddleware(promiseMiddleware, ReduxThunk)(createStore)

ReactDOM.render(
    /* 실직적으로 store가 적용되는 부분 Provider로 감싸주어야한다. */
    /* 이때 연결해주는 REducer가 rootReducer이다 *한번에 묶어서 연결! */
    <Provider store={createStoreWithMiddleware(Reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())}>
        <BrowserRouter>
            {/* 싱글페이지가 기본인 리액트, 즉 App.js를 연결해서 app.js에서 라우터를 이용해서 페이지 표현 */}
            <App />
        </BrowserRouter>
    </Provider>,
    document.getElementById('root'),
)
serviceWorker.unregister()
