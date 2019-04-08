import {
    COMMANDS_RUN_COMMAND_FAIL,
    COMMANDS_RUN_COMMAND_START,
    COMMANDS_RUN_COMMAND_SUCCESS
} from "../actionTypes/index";

import moment from "moment";
import {addMessage} from "../../../messages/redux/actions";
import api from '../../../api';

// ============ RUN ================

export const runCommandStart = (command) => ({
    type:COMMANDS_RUN_COMMAND_START
});

export const runCommandSuccess = (command) => ({
    type:COMMANDS_RUN_COMMAND_SUCCESS
});

export const runCommandFail = (command) => ({
    type:COMMANDS_RUN_COMMAND_FAIL
});

export const runCommand = (command) => (dispatch,getState) => {

    dispatch(runCommandStart());
    api.commands.run(command)
    .then((result)=>{
        dispatch(runCommandSuccess());
        //add message
        let message = {};
        if(result["status"] === "error"){
            message = {
                _id:moment().utc()+"",
                type:"error",
                content:JSON.stringify(result,null,2)
            };
        }else{
            message = {
                _id:moment().utc()+"",
                type:"normal",
                content:JSON.stringify(result,null,2)
            };
        }

        dispatch(addMessage(message))
    })
    .catch((err)=>{
        dispatch(runCommandFail());
        const message = {
            _id:moment().utc()+"",
            type:"error",
            content:JSON.stringify(err,null,2)
        };
        dispatch(addMessage(message))
    });


};
