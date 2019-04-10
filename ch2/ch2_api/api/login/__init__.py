import json
from flask import jsonify,request
from jose import jwt
from user import User
from env import ENV

from shared import Db
database = Db.getInstance()
database.connect({"uri":ENV.get("DB_URL",""),"dbname":ENV.get("DB_NAME","")})

def login():

    _in = {}

    try:
        _in = json.loads(request.form.get('_in',"\{\}"))
    except:
        pass

    required_input = [
        "username",
        "password"
    ]

    for check in required_input:
        if check not in _in:
            out = {"code":500,"status":"error","errors":[{ "msg":"Missing required input : " + check}]}
            return jsonify(out)

    user = User.queryAll(database,{"match":{"username":_in["username"]}})

    if len(user) <= 0:
        out = {"code":404,"status":"error","errors":[{ "msg":"Account not found"}]}
        return jsonify(out)

    user = user[0]

    if not user.passwordMatches(_in["password"]):
        out = {"code":500,"status":"error","errors":[{ "msg":"Password mismatch"}]}
        return jsonify(out)

    if user.passwordNeedsRehash():
        user.rehashPass(_in["password"])
        user.save(database)

    pkg = {
        "_id":user._id,
        "name":user.name,
        "username":user.username
    }

    token = jwt.encode(pkg, ENV.get("SECRET",""), algorithm='HS256')
    
    pkg["token"] = token

    out = { "code":200,"status":"success","data":[pkg] }

    return jsonify(out)