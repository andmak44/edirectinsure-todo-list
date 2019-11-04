import {createSelector} from 'reselect';

const selectProjectsTasks = state => state.projects;
const selectProjectCreate = state => state.projectToCreate;

export const selectProjects = createSelector(
  [selectProjectsTasks],
  projects => projects.projects
);

export const selectProjectToCreate = createSelector(
  [selectProjectCreate],
  projectToCreate => projectToCreate.projectToCreate
);
