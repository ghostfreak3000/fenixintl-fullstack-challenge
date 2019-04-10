const state_tree_shape = {
    "tasks":{
        "add":{
            "running":false, //[ true,false ]
            "status":"n/a", //[n/a,failed,success]
            "task":{}
        },
        "load":{
            "running":false, //[ true,false ]
            "status":"n/a" //[n/a,failed,success]
        },
        "update":{
            "running":false, //[ true,false ]
            "status":"n/a", //[n/a,failed,success]
        },
        "del":{
            "running":false, //[ true,false ]
            "status":"n/a", //[n/a,failed,success]
        },
        "byId":{},
        "allIds":[]
    },
    "user":{
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
        }
    },
    "signup":{
        "running":false, //[ true,false ]
        "status":"n/a", //[n/a,failed,success,pending]
        "message":{}
    }
};