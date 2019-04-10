import deepEql from 'fast-deep-equal';

import {
    TASKS_ADD_TASK_FAIL,
    TASKS_ADD_TASK_START,
    TASKS_ADD_TASK_SUCCESS,
    TASKS_GET_TASKS_FAIL,
    TASKS_GET_TASKS_START,
    TASKS_GET_TASKS_SUCCESS,
    TASKS_SET_TASKS,
    TASKS_UPDATE_TASK_FAIL,
    TASKS_UPDATE_TASK_START,
    TASKS_UPDATE_TASK_SUCCESS,
    TASKS_UPDATE_TASKS,
    TASKS_DEL_TASK_FAIL,
    TASKS_DEL_TASK_START,
    TASKS_DEL_TASK_SUCCESS
} from "../actionTypes/index";
import {getTaskById} from '../selectors';
import api from '../../../api';

// ============ ADD ================
export const addTaskStart = (task) => ({
    type:TASKS_ADD_TASK_START
});

export const addTaskSuccess = (task) => ({
    type:TASKS_ADD_TASK_SUCCESS,
    payload:task
});

export const addTaskFail = (task) => ({
    type:TASKS_ADD_TASK_FAIL
});

export const addTask = (_task) => (dispatch,getState) => {
    const {login} = getState();
    const token = login.card.token;

    dispatch(addTaskStart());
    api.tasks.add(_task,token)
        .then((task)=>{
            dispatch(addTaskSuccess(task));
            dispatch(updateTasks([task]));
        })
        .catch(()=>{
            dispatch(addTaskFail());
        });
};

// ============ GET ================
export const getTasksStart = (task) => ({
    type:TASKS_GET_TASKS_START
});

export const getTasksSuccess = (task) => ({
    type:TASKS_GET_TASKS_SUCCESS
});

export const getTasksFail = (task) => ({
    type:TASKS_GET_TASKS_FAIL
});

export const getTasks = (_task) => (dispatch) => {
    dispatch(getTasksStart());
    api.tasks.get()
        .then((tasks)=>{
            dispatch(getTasksSuccess());
            dispatch(setTasks(tasks));
        })
        .catch(()=>{
            dispatch(getTasksFail());
        });
};

export const setTasks = (tasks) => ({
    type:TASKS_SET_TASKS,
    payload:tasks
});

// ============ UPDATE ================

export const updateTaskStart = (task) => ({
    type:TASKS_UPDATE_TASK_START
});

export const updateTaskSuccess = (task) => ({
    type:TASKS_UPDATE_TASK_SUCCESS
});

export const updateTaskFail = (task) => ({
    type:TASKS_UPDATE_TASK_FAIL
});

export const updateTask = (_task) => (dispatch,getState) => {
    const state = getState();
    const {login} = getState();
    const token = login.card.token;
    const task = getTaskById(state,_task["_id"]);

    const shouldUpdate = !deepEql(task,_task);

    if(shouldUpdate){
        console.log("Old task : ",task)
        console.log("New task : ",_task)
        dispatch(updateTaskStart());
        api.tasks.update(_task,token)
        .then(()=>{
            dispatch(updateTaskSuccess());
            dispatch(updateTasks([_task]));
        })
        .catch((err)=>{
            dispatch(updateTaskFail());
        });
    }else{
        dispatch(updateTaskSuccess());
    }

};

export const updateTasks = (tasks) => ({
    type:TASKS_UPDATE_TASKS,
    payload:tasks
});

// ============ DEL ================
export const delTaskStart = (task) => ({
    type:TASKS_DEL_TASK_START
});

export const delTaskSuccess = (task) => ({
    type:TASKS_DEL_TASK_SUCCESS
});

export const delTaskFail = (task) => ({
    type:TASKS_DEL_TASK_FAIL
});

export const delTask = (_task) => (dispatch,getState) => {
    const {login} = getState();
    const token = login.card.token;

    dispatch(delTaskStart());
    api.tasks.del(_task,token)
        .then(()=>{
            dispatch(delTaskSuccess());
            dispatch(getTasks());
        })
        .catch(()=>{
            dispatch(delTaskFail());
        });
};