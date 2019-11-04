import React from 'react';
import './projects.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
// import {} from '../../redux/projects/projects.selector';
import {selecttaskToChange} from '../../redux/task/task.selector';
import {selectProjectToCreate} from '../../redux/project/project.selector';
import {addTask, doneTask, editTask, completeTask} from '../../redux/task/task.actions';
import {getProjects} from '../../redux/project/project.actions';
import Project from '../../components/project/project';
import CreateProject from '../../components/create-project/create-project';
import {mapProjects} from '../../redux/project/project.utils';

class ProjectsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    }
  }

  getTasks = () => {
    const userId = this.props.currentUser._id;

    const url = `http://localhost:3006/api/v1/project/task/${userId}`;
    try {
      fetch(url)
      .then(data => data.json())
      .then(result => {
        const projectsMap = mapProjects(result.projects);
        getProjects(projectsMap);
        const projects = result.projects.map(
          (proj) => {
            return (
              <Project key={proj._id} proj={proj} />
            );
          }
        )
        this.setState({projects: projects});
      });
    } catch (err) {
      console.log('error: ', err);
    }
  };

  componentDidMount() {
    // const {taskToChange, getProjects} = this.props;
    this.getTasks();
  }
  
  componentWillReceiveProps(nextProps) {
    console.log(this.props, nextProps);
    if (this.props.projectToCreate !== nextProps.projectToCreate) {
      this.setState({projects: []});
      this.getTasks();
    }
  }

  componentDidUpdate() {
    if (!Array.isArray(this.props.taskToChange)) {
      this.props.completeTask(this.props.taskToChange);
      this.setState({projects: []});
      this.getTasks();
    }
  }

  render() {
    return (
      <div className="projects">
        <h1>EDirectInsure TODO List</h1>
        <CreateProject />
        {this.state.projects}
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  taskToChange: selecttaskToChange,
  projectToCreate: selectProjectToCreate
});

const mapDispatchToProps = (dispatch) => ({
  getProjects: projectsMap => dispatch(getProjects(projectsMap)),
  completeTask: taskToChange => dispatch(completeTask(taskToChange)),
  addTask: taskToChange => dispatch(addTask(taskToChange)),
  doneTask: taskToChange => dispatch(doneTask(taskToChange)),
  editTask: taskToChange => dispatch(editTask(taskToChange))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPage);
