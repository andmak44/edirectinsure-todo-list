import React from 'react';
import './header.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import CustomButton from '../custom-button/custom-button';
import { logoutUser } from '../../redux/user/user.actions';

const Header = ({currentUser, logoutUser}) => (
  <div className="header">
    <div className="options">
      {currentUser 
        ? (<div className='option'>
            <div className='name'>{currentUser.name}</div>
            <span>&#9662;
            <CustomButton addClass='logout' type='button' onClick={()=>logoutUser(currentUser)}>LOG OUT</CustomButton>
            </span>
          </div>) : ''}
    </div>
  </div>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  logoutUser: currentUser => dispatch(logoutUser(currentUser))
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
