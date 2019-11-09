import React from 'react';
import './task.style.scss';
import {connect} from 'react-redux';
import SvgIcon from '../svg-component/svg-component';
import {editTask, deleteTask, doneTask} from '../../redux/task/task.actions';

const Task = ({task, projId, handleEdit, handleDelete, handleDone, title}) => {

  return (
    <div id={task._id} className={`task ${task.finished ? 'done' : 'todo'}`} mytitle={title}>
      {task.name}  
      {task.finished ? '' 
        : (<span className='task-svg-icons'>
            <SvgIcon boxClassName='done' className='done-svg' viewBox='0 0 32 32' title='Done' svgId='check' onClick={()=>{handleDone(task, projId);}} />
            <SvgIcon boxClassName='edit' className='edit-svg' viewBox='0 0 32 32' title='Edit' svgId='edit' onClick={()=>{handleEdit(task, projId);}} />
            <SvgIcon boxClassName='delete' className='delete-svg' viewBox='0 0 32 32' title='Done' svgId='bin' onClick={()=>{handleDelete(task, projId);}} />
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