import React from 'react';
import './sign-in.style.scss';
import urls from '../../assets/urls/url';
import FormInput from '../form-input/form-input';
import CustomButton from '../custom-button/custom-button';
import {connect} from 'react-redux';
import {setCurrentUser} from '../../redux/user/user.actions';
import {withRouter} from 'react-router-dom';

class SignIn extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      user: {
        currentUser: null
      }
    }    
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const url = urls.login;
    const {email, password} = this.state;
    try {
      const data = {
        email: email,
        password: password
      };

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

  handleUser = user => {
    localStorage.setItem('user', JSON.stringify(user));
    this.props.setCurrentUser(user);
    this.props.history.push('/projects');
  }

  handleChange = e => {
    const {value, name} = e.target;
    this.setState({[name]: value});
  }

  render() {
    return(
      <div className='sign-in'>
        <h2>LOGIN</h2>
        <form onSubmit={this.handleSubmit}>
          <FormInput 
            name='email' 
            type='email' 
            handleChange={this.handleChange} 
            value={this.state.email} 
            label='email'
            svgid='envelop'
            required />

          <FormInput 
            name='password' 
            type='password' 
            handleChange={this.handleChange} 
            value={this.state.password} 
            label='password'
            svgid='lock'
            required />
          <div className="buttons">
            <CustomButton type='submit'>Sign In</CustomButton>
          </div>

        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  currentUser: state.user.currentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: currentUser => dispatch(setCurrentUser(currentUser))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignIn));
