import TaskActionTypes from './task.types';

export const mapTasksState = (taskToChange, todo) => ({
  type: TaskActionTypes.DONE_TASK,
  payload: {taskToChange, todo}
});

export const doneTask = (taskToChange, projId) => ({
  type: TaskActionTypes.DONE_TASK,
  payload: {taskToChange, projId}
});

export const editTask = (taskToChange, projId) => ({
  type: TaskActionTypes.EDIT_TASK,
  payload: {taskToChange, projId}
});

export const deleteTask = (taskToChange, projId) => ({
  type: TaskActionTypes.DELETE_TASK,
  payload: {taskToChange, projId}
});

export const completeTask = (taskToChange) => ({
  type: TaskActionTypes.COMPLETE_TASK,
  payload: {taskToChange}
});

export const addTask = (taskToChange) => ({
  type: TaskActionTypes.ADD_TASK,
  payload: {taskToChange}
});