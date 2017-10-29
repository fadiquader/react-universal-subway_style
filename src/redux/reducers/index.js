import { combineReducers } from 'redux';
import home from '../../containers/Home/reducer';
import auth from './auth';

const rootReducer = combineReducers({
  home,
  auth
});

export default rootReducer;
