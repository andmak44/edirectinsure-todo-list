import React from 'react';
import './edit-button.style.scss';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from '../../redux/user/user.selector';
import {selecttaskToChange} from '../../redux/task/task.selector';
import {editTask} from '../../redux/task/task.actions';

class EditButton extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      parentId: ''
    };
    this.editTask = this.editTask.bind(this);
  }

  editTask() {
    const editBoxId = this.state.parentId.toString();
    const editBox = document.getElementById(`${editBoxId}`);
    const name = editBox.querySelector('.name-edit').value;
    const desc = editBox.querySelector('.desc-edit').value;
    const taskId = editBox.getAttribute('task-id');

    if (name === '') return;
    const url = `http://localhost:3006/api/v1/task/update/${taskId}`;
    try {
      const data = { name: name, description: desc }
      fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(data => data.json())
      .then(res => {
        const origBox = document.getElementById(`${taskId}`);
        const child = origBox.firstElementChild.outerHTML;
        origBox.innerHTML = name + child;
        this.setState({ parentId: '' });
        this.props.editTask(res.todo);
      });
    } catch (err) { console.log(err); }

  }

  componentDidMount() {
    this.setState({
      parentId: ReactDOM.findDOMNode(this).parentNode.getAttribute("id")
    });
  }

  render () {
    return (<div className={'input-btn danger'} onClick={this.editTask}>Edit</div>)
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  taskToChange: selecttaskToChange
});

const mapDispatchToProps = (dispatch) => ({
  editTask: taskToChange => dispatch(editTask(taskToChange))
});

export default connect(mapStateToProps, mapDispatchToProps)(EditButton);