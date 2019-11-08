import React from 'react';
import './sign-up.style.scss';
import urls from '../../assets/urls/url';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../redux/user/user.actions';
import {withRouter} from 'react-router-dom';

class SignUp extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      user: {
        currentUser: null
      }
    }
  }

  handleSubmit = async e => {
    e.preventDefault();
    const url = urls.signup;
    const { name, email, password, confirmPassword} = this.state;

    if (password !== confirmPassword) {
      return;
    }

    try {
      const data = {
        name:name, 
        email:email, 
        password:password
      }
      await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((data) => data.json())
      .then((res) => {
        let user = res.currentUser;
        this.handleUser(user);
      });
    } catch (err) {
      console.log(err);
    }
  }

  handleUser = (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    this.props.setCurrentUser(user);
    this.props.history.push('/projects');
  }

  handleChange = e => {
    const {name, value} = e.target;
    this.setState({[name]: value});
  }

  render() {
    const {name, email, password, confirmPassword} = this.state;
    return(
      <div className="sign-up">
        <span>Sign up with your email and password</span>
        <form className='sign-up-form' onSubmit={this.handleSubmit}>
          <FormInput type='text' name='name' value={name} onChange= {this.handleChange} label='Name' svgid='user' required/>
          <FormInput type='email' name='email' value={email} onChange= {this.handleChange} label='Email' svgid='envelop' required/>
          <FormInput type='password' name='password' value={password} onChange= {this.handleChange} label='Password' svgid='lock' required/>
          <FormInput type='password' name='confirmPassword' value={confirmPassword} onChange= {this.handleChange} label='Confirm Password' svgid='lock' required/>
          <CustomButton type='submit'>Sign Up</CustomButton>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: currentUser => dispatch(setCurrentUser(currentUser))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignUp));
