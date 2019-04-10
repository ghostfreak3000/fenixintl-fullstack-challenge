import json
from flask import jsonify,request
from user import User
from env import ENV

from shared import Db
database = Db.getInstance()
database.connect({"uri":ENV.get("DB_URL",""),"dbname":ENV.get("DB_NAME","")})

def signup():

    _in = {}

    try:
        _in = json.loads(request.form.get('_in',"\{\}"))
    except:
        pass

    required_input = [
        "username",
        "password",
        "name"
    ]

    for check in required_input:
        if check not in _in:
            out = { "code":500,"status":"error","errors":[{ "msg":"Missing required input : " + check}] }
            return jsonify(out)

    user = User.queryAll(database,{"match":{"username":_in["username"]}})
    
    if len(user):
        out = { "code":500,"status":"error","errors":[{ "msg":"Username taken : " + _in["username"]}] }
        return jsonify(out)

    new_user = User(_in)
    new_user.hashPass()
    new_user.save(database)

    res = {
        "username":new_user.username,
        "name":new_user.name
    }

    out = { "code":200,"status":"success","data":[res] }
    return jsonify(out)