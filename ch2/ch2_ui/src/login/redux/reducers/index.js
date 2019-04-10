import {
    LOGIN_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS
} from "../actionTypes/index";

const initialState = {
    "running":false, //[ true,false ]
    "status":"n/a", //[n/a,failed,success,pending]
    "loggedIn":false, //[ true,false ]
    "card":{},
    "message":{}
};

export default (state = initialState, action) => {
    switch(action.type){
        case LOGIN_START:{
            return{
                ...state,
                running:true,
                status:"pending"
            }
        }
        case LOGIN_SUCCESS:{
            return{
                ...state,
                running:false,
                status:"success",
                loggedIn:true,
                card:action.payload,
                message:{}
            }
        }
        case LOGIN_FAIL:{
            return{
                ...state,
                running:false,
                status:"fail",
                loggedIn:false,
                card:{},
                message:action.payload
            }
        }
        default:
            return state;
    }
}