const localhost_endpoints = {
    "commands":"http://localhost:5001/command"
};

const host_url_map = {
    "localhost":localhost_endpoints,
    "127.0.0.1":localhost_endpoints,
    "default":localhost_endpoints,
};

const getApiUrl = function(concern){
    const endpoint = concern || "";
    const host = window.location.hostname;
    let url = (host_url_map[host] || host_url_map["default"])[endpoint];
    if(!host_url_map[host]){
        url = url.split("localhost").join(host);
    }
    return url;
};

export default { getApiUrl }