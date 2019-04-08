import sys, os, pytest, json
sys.path.append(os.path.join(os.path.dirname(os.path.abspath(__file__)),"..",".."))

print(sys.path)

from api.commands import parse_cmd
from api.commands.errors import *

def test_empty_command_returns_error():
    with pytest.raises(EmptyCommandError) as e_info:
        parse_cmd(" ")


def test_command_add_terminal():
    cmd_str = "/add_terminal tag:'jinja_port'"
    exp_output = { "cmd":"add_terminal","input":{ "tag":"jinja_port" } }
    act_output = parse_cmd(cmd_str)

    exp_output_str = json.dumps(exp_output, sort_keys=True)
    act_output_str = json.dumps(act_output, sort_keys=True)

    assert exp_output == act_output