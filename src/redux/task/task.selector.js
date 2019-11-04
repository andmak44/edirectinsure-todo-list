import {createSelector} from 'reselect';

const selectTask = state => state.taskToChange;

export const selecttaskToChange = createSelector(
  [selectTask],
  task => task.taskToChange
);
