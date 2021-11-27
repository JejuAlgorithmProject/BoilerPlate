import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';

const SignUp_Input = styled.input`
  border: 0;
  background: none;
  display: block;
  margin: 5px auto;
  text-align: center;
  border: 3px solid #4b4033;
  padding: 5px 10px;
  width: 200px;
  outline: none;
  color: white;
  border-radius: 24px;
  transition: 0.25s;
  &:focus {
    width: 280px;
    border-color: #735f4d;
  }
`;
const SignUp_button = styled.button`
  border: 0;
  background: #4b4033;
  display: block;
  margin: 5px auto;
  text-align: center;
  padding: 14px 40px;
  outline: none;
  color: white;
  border-radius: 24px;
  cursor: pointer;
  transition: 0.25s;
  &:hover {
    background: #735f4d;
  }
`;

function RegisterPage(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState('');
  const [Name, setName] = useState('');
  const [Password, setPassword] = useState('');
  const [ConfirmPassword, setConfirmPassword] = useState('');

  const onEmailHandler = (event) => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = (event) => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = (event) => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = (event) => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();

    if (Password !== ConfirmPassword) {
      return alert('비밀번호와 비밀번호 확인은 같아야 합니다.');
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
    };
    dispatch(registerUser(body)).then((response) => {
      if (response.payload.success) {
        props.history.push('/login');
      } else {
        alert('Failed to sign up');
      }
    });
  };

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
      <form
        style={{ display: 'flex', flexDirection: 'column' }}
        onSubmit={onSubmitHandler}
      >
        <label>Email</label>
        {/* <input type="email" value={Email} onChange={onEmailHandler} /> */}
        <SignUp_Input
          type="email"
          value={Email}
          onChange={onEmailHandler}
          placeholder="Email"
        />
        <label>Name</label>
        {/* <input type="text" value={Name} onChange={onNameHandler} /> */}
        <SignUp_Input
          type="text"
          value={Name}
          onChange={onNameHandler}
          placeholder="Name"
        />
        <label>Password</label>
        {/* <input type="password" value={Password} onChange={onPasswordHandler} /> */}
        <SignUp_Input
          type="password"
          value={Password}
          onChange={onPasswordHandler}
          placeholder="Password"
        />
        <label>Confirm Password</label>
        {/* <input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
        /> */}
        <SignUp_Input
          type="password"
          value={ConfirmPassword}
          onChange={onConfirmPasswordHandler}
          placeholder="Confirm Password"
        />
        <br />
        {/* <button type="submit">Register</button> */}
        <SignUp_button type="submit">Register</SignUp_button>
      </form>
    </div>
  );
}

export default withRouter(RegisterPage);

// import React from 'react'
// import moment from 'moment'
// import {Formik} from 'formik'
// import * as Yup from 'yup'
// import {registerUser} from '../../../_actions/user_actions'
// import {useDispatch} from 'react-redux'

// import {Form, Input, Button} from 'antd'

// const formItemLayout = {
//     labelCol: {
//         xs: {span: 24},
//         sm: {span: 8},
//     },
//     wrapperCol: {
//         xs: {span: 24},
//         sm: {span: 16},
//     },
// }
// const tailFormItemLayout = {
//     wrapperCol: {
//         xs: {
//             span: 24,
//             offset: 0,
//         },
//         sm: {
//             span: 16,
//             offset: 8,
//         },
//     },
// }

// function RegisterPage(props) {
//     const dispatch = useDispatch()
//     return (
//         <Formik
//             initialValues={{
//                 email: '',
//                 lastName: '',
//                 name: '',
//                 password: '',
//                 confirmPassword: '',
//             }}
//             validationSchema={Yup.object().shape({
//                 name: Yup.string().required('Name is required'),
//                 lastName: Yup.string().required('Last Name is required'),
//                 email: Yup.string().email('Email is invalid').required('Email is required'),
//                 password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
//                 confirmPassword: Yup.string()
//                     .oneOf([Yup.ref('password'), null], 'Passwords must match')
//                     .required('Confirm Password is required'),
//             })}
//             onSubmit={(values, {setSubmitting}) => {
//                 setTimeout(() => {
//                     let dataToSubmit = {
//                         email: values.email,
//                         password: values.password,
//                         name: values.name,
//                         lastname: values.lastname,
//                         image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
//                     }

//                     dispatch(registerUser(dataToSubmit)).then(response => {
//                         if (response.payload.success) {
//                             props.history.push('/login')
//                         } else {
//                             alert(response.payload.err.errmsg)
//                         }
//                     })

//                     setSubmitting(false)
//                 }, 500)
//             }}
//         >
//             {props => {
//                 const {values, touched, errors, dirty, isSubmitting, handleChange, handleBlur, handleSubmit, handleReset} = props
//                 return (
//                     <div className="app">
//                         <h2>Sign up</h2>
//                         <Form style={{minWidth: '375px'}} {...formItemLayout} onSubmit={handleSubmit}>
//                             <Form.Item required label="Name">
//                                 <Input
//                                     id="name"
//                                     placeholder="Enter your name"
//                                     type="text"
//                                     value={values.name}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className={errors.name && touched.name ? 'text-input error' : 'text-input'}
//                                 />
//                                 {errors.name && touched.name && <div className="input-feedback">{errors.name}</div>}
//                             </Form.Item>

//                             <Form.Item required label="Last Name">
//                                 <Input
//                                     id="lastName"
//                                     placeholder="Enter your Last Name"
//                                     type="text"
//                                     value={values.lastName}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className={errors.lastName && touched.lastName ? 'text-input error' : 'text-input'}
//                                 />
//                                 {errors.lastName && touched.lastName && <div className="input-feedback">{errors.lastName}</div>}
//                             </Form.Item>

//                             <Form.Item
//                                 required
//                                 label="Email"
//                                 hasFeedback
//                                 validateStatus={errors.email && touched.email ? 'error' : 'success'}
//                             >
//                                 <Input
//                                     id="email"
//                                     placeholder="Enter your Email"
//                                     type="email"
//                                     value={values.email}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className={errors.email && touched.email ? 'text-input error' : 'text-input'}
//                                 />
//                                 {errors.email && touched.email && <div className="input-feedback">{errors.email}</div>}
//                             </Form.Item>

//                             <Form.Item
//                                 required
//                                 label="Password"
//                                 hasFeedback
//                                 validateStatus={errors.password && touched.password ? 'error' : 'success'}
//                             >
//                                 <Input
//                                     id="password"
//                                     placeholder="Enter your password"
//                                     type="password"
//                                     value={values.password}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className={errors.password && touched.password ? 'text-input error' : 'text-input'}
//                                 />
//                                 {errors.password && touched.password && <div className="input-feedback">{errors.password}</div>}
//                             </Form.Item>

//                             <Form.Item required label="Confirm" hasFeedback>
//                                 <Input
//                                     id="confirmPassword"
//                                     placeholder="Enter your confirmPassword"
//                                     type="password"
//                                     value={values.confirmPassword}
//                                     onChange={handleChange}
//                                     onBlur={handleBlur}
//                                     className={errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'}
//                                 />
//                                 {errors.confirmPassword && touched.confirmPassword && (
//                                     <div className="input-feedback">{errors.confirmPassword}</div>
//                                 )}
//                             </Form.Item>

//                             <Form.Item {...tailFormItemLayout}>
//                                 <Button onClick={handleSubmit} type="primary" disabled={isSubmitting}>
//                                     Submit
//                                 </Button>
//                             </Form.Item>
//                         </Form>
//                     </div>
//                 )
//             }}
//         </Formik>
//     )
// }

// export default RegisterPage
