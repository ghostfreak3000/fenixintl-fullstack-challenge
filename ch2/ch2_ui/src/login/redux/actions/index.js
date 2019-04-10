import {
    LOGIN_FAIL,
    LOGIN_START,
    LOGIN_SUCCESS
} from "../actionTypes/index";

import api from '../../../api';

// ============ LOGIN ================

export const loginStart = (message) => ({
    type:LOGIN_START
});

export const loginSuccess = (card) => ({
    type:LOGIN_SUCCESS,
    payload:card
});

export const loginFail = (message) => ({
    type:LOGIN_FAIL,
    payload:message
});

export const login = (user) => (dispatch) => {
    dispatch(loginStart());
    api.users.login(user)
        .then((card)=>{
            dispatch(loginSuccess(card));
        })
        .catch((message)=>{
            dispatch(loginFail(message));
        });
};