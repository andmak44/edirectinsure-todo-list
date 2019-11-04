import React from 'react';
import './task.style.scss';
import {connect} from 'react-redux';
import {editTask, deleteTask, doneTask} from '../../redux/task/task.actions';

const Task = ({task, projId, handleEdit, handleDelete, handleDone}) => {

  return (
    <div id={task._id} className={`task ${task.finished ? 'done' : 'todo'}`}>
      {task.name}  
      {task.finished ? '' 
        : (<span>
            <span className='done' title='done' onClick={()=>{handleDone(task, projId);}}>&#10004;</span>
            <span className='edit' title='edit' onClick={()=>{handleEdit(task, projId);}}>&#9997;</span>
            <span className='delete' title='delete' onClick={()=>handleDelete(task, projId)}>&#10060;</span>
          </span>)}
      
    </div>
  );
}

const mapDispatchToProps = dispatch => ({
  editTask: (task, projId) => dispatch(editTask(task, projId)),
  deleteTask: (task, projId) => dispatch(deleteTask(task, projId)),
  doneTask: (task, projId) => dispatch(doneTask(task, projId))
});

export default connect(null, mapDispatchToProps)(Task);