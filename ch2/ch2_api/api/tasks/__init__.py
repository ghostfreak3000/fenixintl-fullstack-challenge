import json
from flask import jsonify,request
import sys
sys.path.append("..")
from shared import Db

database = Db.getInstance()
database.connect({"uri":"mongodb://mongodb:27017","dbname":"challenge2"})

def create_task():
    task = {}

    if(request.form.get('_in') != None):
        try:
            task = json.loads(request.form.get('_in'))
        except:
            pass
    
    database.bulkWrite({"pipeline":[{"insertOne":{"document":task}}],"collection":"tasks"})

    out = { "code":200,"status":"success","data":[] }
    return jsonify(out)

def read_tasks(task_id=None):

    _match = {}
    if task_id != None:
        _match["_id"] = task_id

    print(_match)

    tasks = database.aggregate({"pipeline":[{"$match":_match}],"collection":"tasks"})
    out = { "code":200,"status":"success","data":[tasks] }
    return jsonify(out)

def update_task(task_id):

    task = {}
    if(request.form.get('_in') != None):
        try:
            task = json.loads(request.form.get('_in'))
        except:
            pass

    _filter = {}
    if task_id != None:
        _filter["_id"] = task_id

    result = database.bulkWrite({"pipeline":[{"updateOne":{"filter":_filter,"update":{"$set":task}}}],"collection":"tasks"})

    out = { "code":200,"status":"success","data":[result] }
    return jsonify(out)

def replace_task(task_id):
    
    task = {}

    if(request.form.get('_in') != None):
        try:
            task = json.loads(request.form.get('_in'))
        except:
            pass

    _filter = {}
    if task_id != None:
        _filter["_id"] = task_id

    result = database.bulkWrite({"pipeline":[{"replaceOne":{"filter":_filter,"replacement":task}}],"collection":"tasks"})

    out = { "code":200,"status":"success","data":[result] }
    return jsonify(out)

def delete_task(task_id):

    _filter = {}
    if task_id != None:
        _filter["_id"] = task_id

    result = database.bulkWrite({"pipeline":[{"deleteOne":{"filter":_filter}}],"collection":"tasks"})

    out = { "code":200,"status":"success","data":[result] }
    return jsonify(out)
