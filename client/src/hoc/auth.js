import React, {useEffect} from 'react'
import {auth} from '../_actions/user_actions'
import {useSelector, useDispatch} from 'react-redux'

/* 실질적으로 auth기능을 수행하는 곳 hoc폴더로 구분 */
/* 일기 프로그램에서는 로그인 되지 않는 유저는 ->sign페이지로 보냄 */
/* 추후 과제 -> 관리자 또는 유저 별로 차등 admin을 구분하여 추후에 차등 별로 페이지 입장 권한 부여 */
export default function (ComposedClass, reload, adminRoute = null) {
    function AuthenticationCheck(props) {
        /* 리덕스의 useSelector를 통하여 user리듀서 호출 */
        let user = useSelector(state => state.user)
        /* distach를 통하여 리덕스에서 액션을 호출가능하기에 useDispath()를 dispatch변수에 삽입 */
        const dispatch = useDispatch()

        useEffect(() => {
            /* dispathc를 통하여 auth액션을 호출 -> auth액션으로 넘어감 */
            dispatch(auth()).then(async response => {
                /* 데이터를 받고 isAuth값이 false 경우  */
                /* 백엔드 미들웨어에서 user가 아닌경우 isAuth에 false값을 부여했다 */
                /* 즉 비로그인 유저에 해당한다 */
                if (await !response.payload.isAuth) {
                    if (reload) {
                        // 비로그인 유저는 sign폴더로 보내서 로그인을 유도한다.
                        // 추후 과제 => 좀 더 발전 시켜 페이지별 접근을 세부화하기
                        props.history.push('/sign')
                    }
                } else {
                    /* 추후 admin유저를 부여하여 관리, 지금은 그냥 home으로 보낸다. */
                    if (adminRoute && !response.payload.isAdmin) {
                        props.history.push('/home')
                    } else {
                        if (reload === false) {
                            props.history.push('/home')
                        }
                    }
                }
            })
        }, [dispatch, props.history, user.googleAuth]) /* 리렌더링 되는 값, 값들이 변하면 리렌더링, 추후과제 */

        return <ComposedClass {...props} user={user} />
    }
    return AuthenticationCheck
}
