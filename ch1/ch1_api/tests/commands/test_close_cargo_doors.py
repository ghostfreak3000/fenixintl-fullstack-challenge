import sys, os, pytest, json
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..",".."))

from api.commands import *
from api.commands.errors import *
from api.shared import Db

database = Db.getInstance()
database.connect({"uri":"mongodb://192.168.99.100:27017","dbname":"challenge1"})

def test_park_vehicle_command():
    cmd_str = '/close_cargo_doors vehicle:"uas4100"'
    result = exec_cmd(parse_cmd(cmd_str),database)
    print(result)
    assert False