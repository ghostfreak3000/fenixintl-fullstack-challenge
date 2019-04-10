import _ from 'underscore';

import {
    TASKS_ADD_TASK_FAIL,
    TASKS_ADD_TASK_START,
    TASKS_ADD_TASK_SUCCESS,
    TASKS_SET_TASKS,
    TASKS_UPDATE_TASK_START,
    TASKS_UPDATE_TASK_SUCCESS,
    TASKS_UPDATE_TASK_FAIL,
    TASKS_UPDATE_TASKS,
    TASKS_DEL_TASK_FAIL,
    TASKS_DEL_TASK_START,
    TASKS_DEL_TASK_SUCCESS
} from "../actionTypes/index";

const initialState = {
    "add":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success]
        "task":{}
    },
    "load":{
        "running":false, //[ true,false ]
        "status":"n/a" //[n/a,failed,success]
    },
    "update":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success]
    },
    "del":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success]
    },
    "byId":{},
    "allIds":[]
};

export default (state = initialState, action) => {
    switch(action.type){
        case TASKS_ADD_TASK_START:{
            return{
                ...state,
                add:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case TASKS_ADD_TASK_SUCCESS:{
            return{
                ...state,
                add:{
                    running:false,
                    status:"success",
                    task:action.payload
                }
            }
        }
        case TASKS_ADD_TASK_FAIL:{
            return{
                ...state,
                add:{
                    running:false,
                    status:"fail"
                }
            }
        }
        case TASKS_SET_TASKS:{
            let AllIds = [];
            let ById = {};

            action.payload.map((task) => {
                AllIds.push(task["_id"]);
                ById[task["_id"]] = task;
                return {}
            });

            return{
                ...state,
                byId:{...ById},
                allIds:[...AllIds]
            }
        }
        case TASKS_UPDATE_TASK_START:{
            return{
                ...state,
                update:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case TASKS_UPDATE_TASK_SUCCESS:{
            return{
                ...state,
                update:{
                    running:false,
                    status:"success"
                }
            }
        }
        case TASKS_UPDATE_TASK_FAIL:{
            return{
                ...state,
                update:{
                    running:false,
                    status:"fail"
                }
            }
        }
        case TASKS_UPDATE_TASKS:{
            let updateAllIds = [];
            let updateByIds = {};

            action.payload.map((task) => {
                updateAllIds.push(task["_id"]);
                updateByIds[task["_id"]] = task;
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
        case TASKS_DEL_TASK_START:{
            return{
                ...state,
                del:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case TASKS_DEL_TASK_SUCCESS:{
            return{
                ...state,
                del:{
                    running:false,
                    status:"success"
                }
            }
        }
        case TASKS_DEL_TASK_FAIL:{
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