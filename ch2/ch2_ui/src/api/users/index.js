import axios from 'axios';
import utils from '../utils';

const contractsUrl = "";

const signup = (user) => new Promise((resolve,reject) => {

    const signupUrl = utils.getApiUrl("signup");

    const params = new URLSearchParams();
    params.append('_in',JSON.stringify(user));

    const req_opts = {
        url:signupUrl,
        method:"POST",
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

const login = (user) => new Promise((resolve,reject) => {

    const loginUrl = utils.getApiUrl("login");

    const params = new URLSearchParams();
    params.append('_in',JSON.stringify(user));

    const req_opts = {
        url:loginUrl,
        method:"POST",
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

export default { signup, login };