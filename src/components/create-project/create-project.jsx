import React from 'react';
import './create-project.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {setCurrentUser} from '../../redux/user/user.actions';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selectProjectToCreate} from '../../redux/project/project.selector';
import {createProject} from '../../redux/project/project.actions';
import CustomButton from '../custom-button/custom-button';

class CreateProject extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      ownerId: '',
      projectName: ''
    };
  }

  handleChange = e => {
    this.setState({projectName: e.target.value});
  }

  createProject = () => {
    const ownerId = this.props.currentUser._id;
    const projectName = this.state.projectName;
    
    if (ownerId === '' || projectName === '') return;
    const url = 'http://localhost:3006/api/v1/project';
    try {
      const data = { owner: ownerId, name: projectName }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(data => data.json())
      .then(res => {
        this.setState({ projectName: '' });
        this.props.createProject(res.project);
      });
    } catch (err) { console.log(err); }
  }

  render () {
    return (
      <div id='create-project'>
        <input className='input-pr' type='text' placeholder='Project name'
          onChange={this.handleChange} />
        <CustomButton type='button' onClick={this.createProject}>Create Project</CustomButton>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  projectToCreate: selectProjectToCreate
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  createProject: projectToCreate => dispatch(createProject(projectToCreate))
});

export default connect(mapStateToProps, mapDispatchToProps)(CreateProject);
