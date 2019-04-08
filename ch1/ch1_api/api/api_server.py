import sys, os, pytest, json
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)),".."))

from flask import Flask, jsonify,request
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

from api.commands import exec_cmd, parse_cmd
from api.shared import Db
database = Db.getInstance()
database.connect({"uri":"mongodb://mongodb:27017","dbname":"challenge1"})

@app.route('/')
def hello_world():
    return 'Hello, World!.. for challenge 1'

@app.route('/command',methods=['POST'])
def command():
    cmd_str = request.form.get('_in')
    
    try:
        result = exec_cmd(parse_cmd(cmd_str),database)
        out = { "code":200,"status":"success","data":[result] }
        return jsonify(out)
    except Exception as e:
        out = { "code":500,"status":"error","errors":[{ "msg":str(e)}] }
        return jsonify(out)


    
