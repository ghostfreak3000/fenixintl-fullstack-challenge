import axios from 'axios';
import utils from '../utils';

const tasksUrl = utils.getApiUrl("tasks");

const add = (task,token) => new Promise((resolve,reject) => {

    const params = new URLSearchParams();
    params.append('_in',JSON.stringify(task));

    const req_opts = {
        url:tasksUrl,
        method:"POST",
        headers:{
          "auth_token":token
        },
        data:params
    };

    axios(req_opts)
        .then(function (response) {
            console.log("API Response : ",response.data);
            if(response.data["status"] === "error") {
                return reject(response.data.errors[0]);
            }
            return resolve(response.data.data[0]);
        })
        .catch(function (error) {
            console.log("API Error : ",error);
            reject(error || {});
        });

});

const get = (task) => new Promise((resolve,reject) => {

    const req_opts = {
        url:tasksUrl,
        method:"GET"
    };

    axios(req_opts)
        .then(function (response) {
            resolve(response.data.data);
        })
        .catch(function (error) {
            reject(error.response.data || {});
        });

});

const replace = (opts) => new Promise((resolve,reject) => {

    const { newTask, oldTask} = opts;

    let remove = {};
    Object.keys(oldTask).map((key) => {
        if(!newTask.hasOwnProperty(key)){
            remove[key] = oldTask[key]
        }
        return null;
    });

    const req_opts = {
        url:tasksUrl+"/"+oldTask["_id"],
        method:"PATCH",
        data:{
            remove:JSON.stringify(remove),
            update:JSON.stringify(newTask)
        }
    };

    axios(req_opts)
        .then(function (response) {
            console.log("API Response : ",response.data);
            resolve(response.data.data[0]);
        })
        .catch(function (error) {
            console.log("API Error : ",error.response.data);
            reject(error.response.data || {});
        });

});

const update = (task,token) => new Promise((resolve,reject) => {

    const params = new URLSearchParams();
    params.append('_in',JSON.stringify(task));

    const req_opts = {
        url:tasksUrl+"/"+task["_id"],
        method:"POST",
        headers:{
            "auth_token":token
        },
        data:params
    };

    axios(req_opts)
        .then(function (response) {
            console.log("API Response : ",response.data);
            if(response.data["status"] === "error") {
                return reject(response.data.errors[0]);
            }
            return resolve(response.data.data[0]);
        })
        .catch(function (error) {
            console.log("API Error : ",error);
            reject(error || {});
        });

});

const del = (task,token) => new Promise((resolve,reject) => {

    const req_opts = {
        url:tasksUrl+"/"+task["_id"],
        headers:{
            "auth_token":token
        },
        method:"DELETE"
    };

    axios(req_opts)
        .then(function (response) {
            console.log("API Response : ",response.data);
            resolve(response.data.data[0]);
        })
        .catch(function (error) {
            console.log("API Error : ",error.response.data);
            reject(error.response.data || {});
        });

});

export default { add, get, update, replace, del };