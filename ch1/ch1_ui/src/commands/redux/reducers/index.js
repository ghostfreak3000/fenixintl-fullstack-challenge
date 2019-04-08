import {
    COMMANDS_RUN_COMMAND_START,
    COMMANDS_RUN_COMMAND_SUCCESS,
    COMMANDS_RUN_COMMAND_FAIL
} from "../actionTypes/index";

const initialState = {
    "run":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success]
        "result":{}
    }
};

export default (state = initialState, action) => {
    switch(action.type){
        case COMMANDS_RUN_COMMAND_START:{
            return{
                ...state,
                run:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case COMMANDS_RUN_COMMAND_SUCCESS:{
            return{
                ...state,
                run:{
                    running:false,
                    status:"success"
                }
            }
        }
        case COMMANDS_RUN_COMMAND_FAIL:{
            return{
                ...state,
                run:{
                    running:false,
                    status:"fail"
                }
            }
        }
        default:
            return state;
    }
}