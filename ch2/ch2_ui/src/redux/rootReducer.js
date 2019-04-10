import { combineReducers } from "redux";
import signup from '../signup/redux/reducers';
import login from '../login/redux/reducers';
import tasks from '../tasks/redux/reducers';

export default combineReducers({ signup,login,tasks });