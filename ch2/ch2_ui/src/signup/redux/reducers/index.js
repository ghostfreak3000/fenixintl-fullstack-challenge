import {
    SIGNUP_FAIL,
    SIGNUP_START,
    SIGNUP_SUCCESS
} from "../actionTypes/index";

const initialState = {
    "running":false, //[ true,false ]
    "status":"n/a", //[n/a,failed,success,pending]
    "message":{}
};

export default (state = initialState, action) => {
    switch(action.type){
        case SIGNUP_START:{
            return{
                ...state,
                running:true,
                status:"pending"
            }
        }
        case SIGNUP_SUCCESS:{
            return{
                ...state,
                running:false,
                status:"success"
            }
        }
        case SIGNUP_FAIL:{
            return{
                ...state,
                message:action.payload,
                running:false,
                status:"fail"
            }
        }
        default:
            return state;
    }
}