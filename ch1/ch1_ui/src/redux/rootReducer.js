import { combineReducers } from "redux";
import commands from '../commands/redux/reducers';
import messages from '../messages/redux/reducers';

export default combineReducers({commands,messages});