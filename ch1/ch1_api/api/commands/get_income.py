
import json
from api.employee.models.EmployeeFactory import EmployeeFactory 
from .errors import *


def get_income(_input,db):
    required_input = ["employee"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    income = EmployeeFactory.getIncome(db,{"employee":_input["employee"]})

    return income