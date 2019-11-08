import React from 'react';
import './login.style.scss';
import SignIn from '../../components/sign-in/sign-in';
import {Link} from 'react-router-dom';

const LoginPage = () => (
  <div className="login">
    <SignIn />
    <Link to='./register' className='register-link'>I do not have account</Link>
  </div>
);

export default LoginPage;