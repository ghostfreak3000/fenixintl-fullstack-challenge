from tasks import *
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Blank Slate For Challenge 2 Baby!'

app.add_url_rule('/tasks', view_func=create_task, methods=['POST',])
app.add_url_rule('/tasks', view_func=read_tasks, methods=['GET',])
app.add_url_rule('/tasks/<task_id>', view_func=read_tasks, methods=['GET',])
app.add_url_rule('/tasks/<task_id>', view_func=update_task, methods=['POST',])
app.add_url_rule('/tasks/<task_id>', view_func=replace_task, methods=['PUT',])
app.add_url_rule('/tasks/<task_id>', view_func=delete_task, methods=['DELETE',])

if __name__ == "__main__":
    app.run(host="0.0.0.0", debug=True)