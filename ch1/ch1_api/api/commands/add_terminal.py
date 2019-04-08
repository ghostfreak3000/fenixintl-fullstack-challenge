
import json
from api.terminal.models.Terminal import Terminal
from .errors import *


def add_terminal(_input,db):
    required_input = ["tag"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)
    
    terminal = Terminal.queryAll(db,{"match":{"tag":_input["tag"]}})
    if len(terminal) > 0:
        raise Exception("Tag already in use")

    new_terminal = Terminal(_input)    
    new_terminal.save(db)
    
    return new_terminal.__dict__