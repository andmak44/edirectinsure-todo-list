import ProjectsActionTypes from './project.types';

const INITIAL_STATE = {projectToCreate: '', projects: []};

const projectReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProjectsActionTypes.CREATE_PROJECT:
      return {
        ...state,
        projectToCreate: action.payload
      }
    case ProjectsActionTypes.GET_PROJECTS:
      return {
        ...state,
        projects: action.payload
      }
  
    default:
      return state;
  }
};

export default projectReducer;
