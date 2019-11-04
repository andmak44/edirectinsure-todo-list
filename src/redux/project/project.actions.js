import ProjectsActionTypes from './project.types';

export const createProject = projectToCreate => ({
  type: ProjectsActionTypes.CREATE_PROJECT,
  payload: projectToCreate
});

export const getProjects = projectsMap => ({
  type: ProjectsActionTypes.GET_PROJECTS,
  payload: projectsMap
});
