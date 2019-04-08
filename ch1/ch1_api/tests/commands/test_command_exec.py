import sys, os, pytest, json
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..",".."))

from api.commands import *
from api.commands.errors import *

database = Db.getInstance()
database.connect({"uri":"mongodb://192.168.99.100:27017","dbname":"challenge1"})

def test_unknown_command_returns_error():
    with pytest.raises(UnknownCommandError) as e_info:
        exec_cmd({"cmd":"unknown_command"})

# NEED TO TEST EACH COMMAND SEPERATELY, 
# BUT THAT'S FOR ANOTHER DAY

def test_command_add_terminal():
    cmd_str = "/add_terminal tag:'jinja_port'"
    exec_cmd(parse_cmd(cmd_str),database)
    assert True