import axios from 'axios';
import utils from '../utils';

const commandsUrl = utils.getApiUrl("commands");

const run = (command) => new Promise((resolve,reject) => {

    console.log("URL : " + commandsUrl);

    const params = new URLSearchParams();
    params.append('_in',command);

    const req_opts = {
        url:commandsUrl,
        method:"POST",
        data:params
    };

    axios(req_opts)
        .then(function (response) {
            console.log("API Response : ",response.data);
            resolve(response.data);
        })
        .catch(function (error) {
            console.log("API Error : ",error);
            reject(error || {});
        });

});

export default { run};