from tasks import *
from login import login
from signup import signup
from middleware import auth

from flask import Flask
from flask_cors import CORS
app = Flask(__name__)
CORS(app)

@app.route('/')
def hello_world():
    return 'Blank Slate For Challenge 2 Baby!'

app.add_url_rule('/login', view_func=login, methods=['POST',])
app.add_url_rule('/signup', view_func=signup, methods=['POST',])
app.add_url_rule('/tasks', view_func=auth(create_task), methods=['POST',])
app.add_url_rule('/tasks', view_func=read_tasks, methods=['GET',])
app.add_url_rule('/tasks/<task_id>', view_func=read_tasks, methods=['GET',])
app.add_url_rule('/tasks/<task_id>', view_func=auth(update_task), methods=['POST',])
#app.add_url_rule('/tasks/<task_id>', view_func=replace_task, methods=['PUT',])
app.add_url_rule('/tasks/<task_id>', view_func=auth(delete_task), methods=['DELETE',])
