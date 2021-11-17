import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  LOGOUT_USER,
} from '../_actions/types';

// reducer의 형태이므로 외워두기!
// (함수 이름 정해주지 않구,,) export 해준 거 reducers의 index.js 의 user로
export default function (state = {}, action) {
  // user_action의 type과 payload가 통째로 action 에 들어감
  switch (action.type) {
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case LOGIN_USER:
      // 빈객체state를 받아와서 loginSuccess : action.payload 로 저장
      return { ...state, loginSucces: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    case LOGOUT_USER:
      return { ...state };
    default:
      return state;
  }
}
