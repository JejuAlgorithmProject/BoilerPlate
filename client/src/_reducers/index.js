import { combineReducers } from 'redux';
import user from './user_reducer';

const rootReducer = combineReducers({
  // 이름을 여기서 user라고 지어주면 그것이 user_reducer의 함수 이름이 됨 (맘대로 지어줌)
  user,
});

export default rootReducer;
