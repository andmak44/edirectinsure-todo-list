import React from 'react';
import './register.style.scss';
import SignUp from '../../components/sign-up/sign-up';
import {Link} from 'react-router-dom';

const SignUpPage = () => (
  <div className="register">
    <SignUp />
    <Link to='./' className='login-link'>Login</Link>
  </div>
);

export default SignUpPage;