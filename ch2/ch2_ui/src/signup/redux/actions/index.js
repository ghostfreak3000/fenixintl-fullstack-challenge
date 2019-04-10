import {
    SIGNUP_FAIL,
    SIGNUP_START,
    SIGNUP_SUCCESS
} from "../actionTypes/index";

import api from '../../../api';

// ============ SIGNUP ================

export const signupStart = (message) => ({
    type:SIGNUP_START
});

export const signupSuccess = (message) => ({
    type:SIGNUP_SUCCESS
});

export const signupFail = (message) => ({
    type:SIGNUP_FAIL,
    payload:message
});

export const signup = (user) => (dispatch) => {
    dispatch(signupStart());
    api.users.signup(user)
        .then((message)=>{
            dispatch(signupSuccess(message));
        })
        .catch((message)=>{
            dispatch(signupFail(message));
        });
};