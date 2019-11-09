import React from 'react';
import './project.style.scss';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selecttaskToChange} from '../../redux/task/task.selector';
import {addTask, deleteTask, doneTask, editTask} from '../../redux/task/task.actions';
import Task from '../task/task';
import InputComponent from '../input-component/input-component';

class Project extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tasks: [], todo: [], done: [], inputField: '', inputFieldDesc: '', editField: '', editFieldDesc: '' }
  }

  handleChange = e => {
    e.target.classList.contains('name-edit') 
      ? this.setState({editField : e.target.value}) 
      : this.setState({inputField: e.target.value});
  }

  handleChangeDesc = e => {
    e.target.classList.contains('desc-edit') 
      ? this.setState({editFieldDesc : e.target.value}) 
      : this.setState({inputFieldDesc: e.target.value});
  }

  toggleDesc = e => {
    e.currentTarget.previousSibling.classList.toggle('none');
  }

  handleDone = task => {
    const url = `http://localhost:3006/api/v1/task/done/${task._id}`;
    try { const data = { finished: new Date() }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(data => data.json())
      .then(res => this.props.doneTask(task));
    } catch (err) { console.log(err); }
  }

  handleEdit = (taskEdit, prId) => {
    const dvBoxEditId = `#edit${prId}`;
    const dvBoxAddId = `#add${prId}`;
    const editBox = document.querySelector(`${dvBoxEditId}`);
    const currentTaskId = editBox.getAttribute('task-id');
        
    editBox.querySelector('.input-cm').value = `${taskEdit.name}`;
    editBox.querySelector('.input-desc').value = `${taskEdit.description}`;

    if (!currentTaskId || currentTaskId === taskEdit._id) {
      document.querySelector(`${dvBoxAddId}`).classList.toggle('none');
      editBox.classList.toggle('none');
    }

    editBox.setAttribute('task-id', taskEdit._id);

    this.setState({editField : taskEdit.name, editFieldDesc: taskEdit.description});
  }

  handleDelete = (task, projId) => {
    const url = 'http://localhost:3006/api/v1/task';
    try { const data = { id: task._id, projectId: projId }
      fetch(url, {
        method: 'DELETE',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(data => data.json())
      .then(res => this.props.deleteTask(task));
    } catch (err) { console.log(err); }
  }

  handleClick = e => {
    if (this.state.inputField === '') return;
      const url = `http://localhost:3006/api/v1/task/${this.props.proj._id}`;
      try {
        const data = { name: this.state.inputField, description: this.state.inputFieldDesc }
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(data => data.json())
        .then(res => {
          this.setState({ inputField: '', inputFieldDesc: '' });
          this.props.addTask(res.todo);
        });
      } catch (err) { console.log(err); }
  }

  componentDidMount() {
    const tasks = this.props.proj.todoList;
    const projId = this.props.proj._id;
    this.setState({taskToChange: this.props.taskToChange});

    const todo = tasks.filter(item => { return !item.finished; });
    const done = tasks.filter(item => { return item.finished; });

    const tasksTodo = todo.map( task => {
      return (<Task key={task._id} task={task} projId={projId} handleEdit={this.handleEdit} handleDelete={this.handleDelete} handleDone={this.handleDone} />);
    })
    const tasksDone = done.map( task => {
      const dateTime = task.finished.split('T');
      const date = dateTime[0];
      const time = dateTime[1].split('.')[0];
      return (<Task key={task._id} task={task} projId={projId} handleEdit={this.handleEdit} title={`finished in ${date} at ${time}`}/>);
    })
    this.setState({tasks: {todo:tasksTodo, done:tasksDone}});
  }

  render() {
    return (
      <div className="project">
        <h3>{this.props.proj.name}</h3>
        <h5>TODO</h5>
        <div className='tasks-box'>{this.state.tasks.todo}</div>
        <h5>DONE</h5>
        <div className='tasks-box'>{this.state.tasks.done}</div>
        <InputComponent 
          placeholder='Task'
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleChangeDesc={this.handleChangeDesc}
          toggleDesc={this.toggleDesc}
          description={true}
          placeholderDesc='Description'
          nameVal={this.state.inputField}
          descriptionVal={this.state.inputFieldDesc}
          divId={this.props.proj._id}
          add={true}
        />
        <InputComponent 
          placeholder='Task'
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          handleChangeDesc={this.handleChangeDesc}
          toggleDesc={this.toggleDesc}
          description={true}
          placeholderDesc='Description'
          nameVal={this.state.editField}
          descriptionVal={this.state.editFieldDesc}
          divId={this.props.proj._id}
          add={false}
        />
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  taskToChange: selecttaskToChange
});

const mapDispatchToProps = (dispatch) => ({
  addTask: taskToChange => dispatch(addTask(taskToChange)),
  deleteTask: taskToChange => dispatch(deleteTask(taskToChange)),
  doneTask: taskToChange => dispatch(doneTask(taskToChange)),
  editTask: taskToChange => dispatch(editTask(taskToChange))
});

export default connect(mapStateToProps, mapDispatchToProps)(Project);
