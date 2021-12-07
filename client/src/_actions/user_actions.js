import axios from 'axios'
import {LOGIN_USER, REGISTER_USER, AUTH_USER, LOGOUT_USER} from './types'
import {USER_SERVER} from '../components/Config.js'

export function registerUser(dataToSubmit) {
    /* request변수에 host:5000/api/register 백엔드 호출, datatoSumit값 매개변수로 전달 */
    /* 전달받은 데이터를 백엔드에서 회원가입 진행 */
    const request = axios.post(`${USER_SERVER}/register`, dataToSubmit).then(response => response.data)

    /* 액션 타입과 requst값을 리듀서로 리턴 */
    return {
        type: REGISTER_USER,
        payload: request,
    }
}

export function loginUser(dataToSubmit) {
    /* request변수에 host:5000/api/login 백엔드 호출, datatoSumit값 매개변수로 전달 */
    /* 로그인 완료 된면 response.data값을 받아서 request변수에 삽입 */
    const request = axios.post(`${USER_SERVER}/login`, dataToSubmit).then(response => response.data)

    /* 받은 requst변수와 type을 리듀서로 리턴 */
    return {
        type: LOGIN_USER,
        payload: request,
    }
}

export function auth() {
    /* 인증을 위한 auth를 백엔드에서 가져옴, response.data를 request변수에 삽입 */
    const request = axios.get(`${USER_SERVER}/auth`).then(response => response.data)

    /* 마찬가지로 type과 request값을 리턴 */
    return {
        type: AUTH_USER,
        payload: request,
    }
}

export function logoutUser() {
    /* logout진행 후 response 데이터를 마찬가지로 request변수에 삽입 */
    const request = axios.get(`${USER_SERVER}/logout`).then(response => response.data)

    /* type과 payload값을 리듀서로 전달 */
    return {
        type: LOGOUT_USER,
        payload: request,
    }
}
