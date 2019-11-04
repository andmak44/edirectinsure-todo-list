import {combineReducers} from 'redux';
import userReducer from './user/user.reducer';
import projectReducer from './project/project.reducer';
import taskReducer from './task/task.reducer';

import {persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const rootReducer = combineReducers({
  user: userReducer,
  // projects: projectReducer,
  projectToCreate: projectReducer,
  taskToChange: taskReducer
});

export default persistReducer(persistConfig, rootReducer);
