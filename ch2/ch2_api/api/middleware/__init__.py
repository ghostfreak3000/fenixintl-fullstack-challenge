from jose import jwt
from functools import wraps
from flask import request, jsonify, g
from env import ENV


def auth(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        
        auth_header = "auth_token"

        if auth_header not in request.headers:
            out = {"code":500,"status":"error","errors":[{ "title":"Unauthorized","msg":"Missing auth header [auth_token]"}]}
            return jsonify(out)

        auth_token = request.headers.get(auth_header)
        
        decoded = {}

        try:
            decoded = jwt.decode(auth_token,ENV.get("SECRET",""), algorithms='HS256')
        except Exception as e:
            print(e)
            out = {"code":500,"status":"error","errors":[{ "title":"Unauthorized","msg":"Not authorized to carry out action"}]}
            return jsonify(out)

        g.auth_token_decoded = decoded

        return f(*args, **kwargs)

    return decorated_function