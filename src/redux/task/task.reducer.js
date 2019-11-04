import TaskActionTypes from './task.types'
import {mapTasksState, doneTask, editTask, deleteTask, addTask,  completeTask} from './task.utils'

const INITIAL_STATE = {taskToChange: []};

const taskReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TaskActionTypes.TASKS_STATE:
      return {
        ...state,
        tasks: mapTasksState(state.tasks, action.payload)
      };
    case TaskActionTypes.DONE_TASK:
      return {
        ...state,
        taskToChange: doneTask(state.tasks, action.payload)
      };
    case TaskActionTypes.EDIT_TASK:
      return {
        ...state,
        taskToChange: editTask(state, action.payload)
      };
    case TaskActionTypes.DELETE_TASK:
      return {
        ...state,
        taskToChange: deleteTask(state, action.payload)
      };
    case TaskActionTypes.COMPLETE_TASK:
      return {
        ...state,
        taskToChange: completeTask(state, action.payload)
      };
    case TaskActionTypes.ADD_TASK:
      return {
        ...state,
        taskToChange: addTask(state, action.payload)
      };
    default:
      return state;
  }
};

export default taskReducer;