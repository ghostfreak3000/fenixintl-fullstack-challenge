import {
    USER_LOGIN_FAIL, USER_LOGIN_START, USER_LOGIN_SUCCESS, USER_LOGOUT_FAIL, USER_LOGOUT_START,
    USER_LOGOUT_SUCCESS, USER_SIGNUP_FAIL, USER_SIGNUP_START, USER_SIGNUP_SUCCESS
} from "../actionTypes/index";

const initialState = {
    "logout":{
        "running":false, //[ true,false ]
        "status":"n/a" //[n/a,failed,success,pending]
    },
    "login":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success,pending]
        "loggedIn":false, //[ true,false ]
        "card":{},
        "message":{}
    },
    "signup":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success,pending]
        "message":{}
    }
};

export default (state = initialState, action) => {
    switch(action.type){
        case USER_SIGNUP_START:{
            return{
                ...state,
                signup:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case USER_SIGNUP_SUCCESS:{
            return{
                ...state,
                signup:{
                    running:false,
                    status:"success"
                }
            }
        }
        case USER_SIGNUP_FAIL:{
            return{
                ...state,
                signup:{
                    message:action.payload,
                    running:false,
                    status:"fail"
                }
            }
        }
        case USER_LOGIN_START:{
            return{
                ...state,
                login:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case USER_LOGIN_SUCCESS:{
            return{
                ...state,
                login:{
                    running:false,
                    status:"success",
                    loggedIn:true,
                    card:action.payload
                }
            }
        }
        case USER_LOGIN_FAIL:{
            return{
                ...state,
                login:{
                    loggedIn:false,
                    card:{},
                    message:action.payload,
                    running:false,
                    status:"fail"
                }
            }
        }
        case USER_LOGOUT_START:{
            return{
                ...state,
                logout:{
                    running:true,
                    status:"pending"
                }
            }
        }
        case USER_LOGOUT_SUCCESS:{
            return{
                ...state,
                login:{
                    running:false,
                    status:"n/a",
                    loggedIn:false,
                    card:{}
                },
                logout:{
                    running:false,
                    status:"success"
                }
            }
        }
        case USER_LOGOUT_FAIL:{
            return{
                ...state,
                logout:{
                    running:false,
                    status:"fail"
                }
            }
        }
        default:
            return state;
    }
}