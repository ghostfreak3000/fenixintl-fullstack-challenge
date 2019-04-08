import _ from 'underscore';

import {
    MESSAGES_ADD_MESSAGE_FAIL,
    MESSAGES_ADD_MESSAGE_START,
    MESSAGES_ADD_MESSAGE_SUCCESS,
    MESSAGES_SET_MESSAGES,
    MESSAGES_UPDATE_MESSAGES,
    MESSAGES_DEL_MESSAGE_FAIL,
    MESSAGES_DEL_MESSAGE_START,
    MESSAGES_DEL_MESSAGE_SUCCESS
} from "../actionTypes/index";

const initialState = {
    "add":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,fail,success,pending]
        "message":{}
    },
    "load":{
        "running":false, //[ true,false ]
        "status":"n/a" //[n/a,fail,success,pending]
    },
    "del":{
        "running":false, //[ true,false ]
        "status":"n/a" //[n/a,fail,success,pending]
    },
    "byId":{},
    "allIds":[]
};

export default (state = initialState, action) => {
    switch(action.type){
        case MESSAGES_ADD_MESSAGE_START:{
            return{
                ...state,
                add:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case MESSAGES_ADD_MESSAGE_SUCCESS:{
            return{
                ...state,
                add:{
                    running:false,
                    status:"success",
                    message:action.payload
                }
            }
        }
        case MESSAGES_ADD_MESSAGE_FAIL:{
            return{
                ...state,
                add:{
                    running:false,
                    status:"fail"
                }
            }
        }
        case MESSAGES_SET_MESSAGES:{
            let AllIds = [];
            let ById = {};

            action.payload.map((message) => {
                AllIds.push(message["_id"]);
                ById[message["_id"]] = message;
                return {}
            });

            return{
                ...state,
                byId:{...ById},
                allIds:[...AllIds]
            }
        }
        case MESSAGES_UPDATE_MESSAGES:{
            let updateAllIds = [];
            let updateByIds = {};

            action.payload.map((message) => {
                updateAllIds.push(message["_id"]);
                updateByIds[message["_id"]] = message;
                return {}
            });

            let cleanByIds = {...state.byId};
            Object.keys(updateByIds).map((id) => cleanByIds[id] = updateByIds[id]);

            return{
                ...state,
                byId:cleanByIds,
                allIds:_.uniq([...state.allIds,...updateAllIds])
            }
        }
        case MESSAGES_DEL_MESSAGE_START:{
            return{
                ...state,
                del:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case MESSAGES_DEL_MESSAGE_SUCCESS:{
            return{
                ...state,
                del:{
                    running:false,
                    status:"success"
                }
            }
        }
        case MESSAGES_DEL_MESSAGE_FAIL:{
            return{
                ...state,
                del:{
                    running:false,
                    status:"fail"
                }
            }
        }
        default:
            return state;
    }
}