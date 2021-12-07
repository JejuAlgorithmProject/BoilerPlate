import {combineReducers} from 'redux'
import user from './user_reducer'

/* 리듀서가 점점 많아진다면 store에 하나씩 연결해주는 것이 아니라*/
/*  이처럼 rootReducer로 묶어 합친 후 store와 rootReducer를 연결  */

const rootReducer = combineReducers({
    // 이름을 여기서 user라고 지어주면 그것이 user_reducer의 함수 이름이 됨 (맘대로 지어줌)
    user,
    /* user리듀서 post와 comment등의 기능은 아직 리듀서 구현 x 추후 과제 -> 리듀서로 구현하여 확장성을 높임 */
})

export default rootReducer
