import React from 'react';
import './App.css';
import {Switch, Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selector';

import LoginPage from './pages/login/login';
import SignUpPage from './pages/register/register';
import ProjectsPage from './pages/projects/projects';
import Header from './components/header/header'

class App extends React.Component {

  componentDidMount() {
    const {currentUser} = this.props;
    this.props.setCurrentUser(currentUser);
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/' exact render={() => this.props.currentUser ? (<Redirect to='/projects' />) : (<LoginPage />)} />
          <Route path='/register' exact component={SignUpPage} />
          <Route path='/projects' exact render={() => this.props.currentUser ? (<ProjectsPage />) : (<Redirect to='/'/>)} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
