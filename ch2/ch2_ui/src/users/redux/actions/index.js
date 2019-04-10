import {
    USER_SIGNUP_FAIL,
    USER_SIGNUP_START,
    USER_SIGNUP_SUCCESS,
    USER_LOGIN_FAIL,
    USER_LOGIN_START,
    USER_LOGIN_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_START,
    USER_LOGOUT_SUCCESS
} from "../actionTypes/index";

import api from '../../../api';

// ============ SIGNUP ================

export const userSignupStart = (user) => ({
    type:USER_SIGNUP_START
});

export const userSignupSuccess = (user) => ({
    type:USER_SIGNUP_SUCCESS,
    payload:user
});

export const userSignupFail = (user) => ({
    type:USER_SIGNUP_FAIL
});

export const userSignup = (_user) => (dispatch) => {
    dispatch(userSignupStart());
    api.users.signup(_user)
        .then((user)=>{
            dispatch(userSignupSuccess(user));
        })
        .catch(()=>{
            dispatch(userSignupFail());
        });
};

// ============ LOGIN ================

export const userLoginStart = (user) => ({
    type:USER_LOGIN_START
});

export const userLoginSuccess = (user) => ({
    type:USER_LOGIN_SUCCESS,
    payload:user
});

export const userLoginFail = (user) => ({
    type:USER_LOGIN_FAIL
});

export const userLogin = (_user) => (dispatch) => {
    dispatch(userLoginStart());
    api.users.login(_user)
        .then((user)=>{
            dispatch(userLoginSuccess(user));
        })
        .catch(()=>{
            dispatch(userLoginFail());
        });
};

// ============ LOGOUT ================

export const userLogoutStart = (user) => ({
    type:USER_LOGOUT_START
});

export const userLogoutSuccess = (user) => ({
    type:USER_LOGOUT_SUCCESS,
    payload:user
});

export const userLogoutFail = (user) => ({
    type:USER_LOGOUT_FAIL
});

export const userLogout = (_user) => (dispatch) => {
    dispatch(userLogoutStart());
    dispatch(userLogoutSuccess());
};
