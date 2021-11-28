import React, {useState} from 'react'
import Axios from 'axios'
import {useDispatch, useSelector} from 'react-redux'
import {loginUser} from '../../../_actions/user_actions'
import {withRouter} from 'react-router-dom'
import styled from 'styled-components'

const SignIn_Input = styled.input`
    border: 0;
    background: none;
    display: block;
    margin: 10px auto;
    text-align: center;
    border: 3px solid #735f4d;
    padding: 14px 10px;
    width: 200px;
    outline: none;
    color: white;
    border-radius: 24px;
    transition: 0.25s;
    &:focus {
        width: 280px;
        border-color: #4b4033;
    }
`

const SignIn_button = styled.button`
    border: 0;
    background: #735f4d;
    display: block;
    margin: 20px auto;
    text-align: center;
    padding: 14px 40px;
    outline: none;
    color: white;
    border-radius: 24px;
    cursor: pointer;
    transition: 0.25s;
    &:hover {
        background: #4b4033;
    }
`

function LoginPage(props) {
    const dispatch = useDispatch()
    const user = useSelector(state => state.user)
    console.log(user)

    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')

    const onEmailHandler = event => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = event => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = event => {
        event.preventDefault()

        let body = {
            email: Email,
            password: Password,
        }

        dispatch(loginUser(body)).then(response => {
            // response 값에 user_reducer의 state 값이 리턴되어 들어옴
            console.log(response)
            if (response.payload.loginSuccess) {
                props.history.push('/home')
            } else {
                alert('Error˝')
            }
        })
    }

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                height: '100vh',
            }}
        >
            <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onSubmitHandler}>
                <label>Email</label>
                <SignIn_Input type="email" value={Email} onChange={onEmailHandler} placeholder="Email" />
                {/* <input type="email" value={Email} onChange={onEmailHandler} /> */}
                <label>Password</label>
                <SignIn_Input type="password" value={Password} onChange={onPasswordHandler} placeholder="Password" />
                {/* <input type="password" value={Password} onChange={onPasswordHandler} /> */}
                <br />
                {/* <button type="submit">Login</button> */}
                <SignIn_button type="submit">Login</SignIn_button>
            </form>
        </div>
    )
}

export default withRouter(LoginPage)

// import React, { useState } from "react";
// import { withRouter } from "react-router-dom";
// import { loginUser } from "../../../_actions/user_actions";
// import { Formik } from 'formik';
// import * as Yup from 'yup';
// import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
// import { useDispatch } from "react-redux";

// const { Title } = Typography;

// function LoginPage(props) {
//   const dispatch = useDispatch();
//   const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

//   const [formErrorMessage, setFormErrorMessage] = useState('')
//   const [rememberMe, setRememberMe] = useState(rememberMeChecked)

//   const handleRememberMe = () => {
//     setRememberMe(!rememberMe)
//   };

//   const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

//   return (
//     <Formik
//       initialValues={{
//         email: initialEmail,
//         password: '',
//       }}
//       validationSchema={Yup.object().shape({
//         email: Yup.string()
//           .email('Email is invalid')
//           .required('Email is required'),
//         password: Yup.string()
//           .min(6, 'Password must be at least 6 characters')
//           .required('Password is required'),
//       })}
//       onSubmit={(values, { setSubmitting }) => {
//         setTimeout(() => {
//           let dataToSubmit = {
//             email: values.email,
//             password: values.password
//           };

//           dispatch(loginUser(dataToSubmit))
//             .then(response => {
//               if (response.payload.loginSuccess) {
//                 window.localStorage.setItem('userId', response.payload.userId);
//                 if (rememberMe === true) {
//                   window.localStorage.setItem('rememberMe', values.id);
//                 } else {
//                   localStorage.removeItem('rememberMe');
//                 }
//                 props.history.push("/");
//               } else {
//                 setFormErrorMessage('Check out your Account or Password again')
//               }
//             })
//             .catch(err => {
//               setFormErrorMessage('Check out your Account or Password again')
//               setTimeout(() => {
//                 setFormErrorMessage("")
//               }, 3000);
//             });
//           setSubmitting(false);
//         }, 500);
//       }}
//     >
//       {props => {
//         const {
//           values,
//           touched,
//           errors,
//           dirty,
//           isSubmitting,
//           handleChange,
//           handleBlur,
//           handleSubmit,
//           handleReset,
//         } = props;
//         return (
//           <div className="app">

//             <Title level={2}>Log In</Title>
//             <form onSubmit={handleSubmit} style={{ width: '350px' }}>

//               <Form.Item required>
//                 <Input
//                   id="email"
//                   prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                   placeholder="Enter your email"
//                   type="email"
//                   value={values.email}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.email && touched.email ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.email && touched.email && (
//                   <div className="input-feedback">{errors.email}</div>
//                 )}
//               </Form.Item>

//               <Form.Item required>
//                 <Input
//                   id="password"
//                   prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
//                   placeholder="Enter your password"
//                   type="password"
//                   value={values.password}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   className={
//                     errors.password && touched.password ? 'text-input error' : 'text-input'
//                   }
//                 />
//                 {errors.password && touched.password && (
//                   <div className="input-feedback">{errors.password}</div>
//                 )}
//               </Form.Item>

//               {formErrorMessage && (
//                 <label ><p style={{ color: '#ff0000bf', fontSize: '0.7rem', border: '1px solid', padding: '1rem', borderRadius: '10px' }}>{formErrorMessage}</p></label>
//               )}

//               <Form.Item>
//                 <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
//                 <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
//                   forgot password
//                   </a>
//                 <div>
//                   <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} disabled={isSubmitting} onSubmit={handleSubmit}>
//                     Log in
//                 </Button>
//                 </div>
//                 Or <a href="/register">register now!</a>
//               </Form.Item>
//             </form>
//           </div>
//         );
//       }}
//     </Formik>
//   );
// };

// export default withRouter(LoginPage);
