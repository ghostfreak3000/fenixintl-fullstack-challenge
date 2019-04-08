
import json
from api.terminal.models.TerminalFactory import TerminalFactory 
from .errors import *


def get_revenue(_input,db):
    required_input = ["terminal"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    revenue = TerminalFactory.getRevenue(db,{"terminal":_input["terminal"]})

    return revenue