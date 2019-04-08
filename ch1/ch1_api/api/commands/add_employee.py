
import json
from api.employee.models.Employee import Employee
from .errors import *


def add_employee(_input,db):
    required_input = ["tag"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)
    
    employee = Employee.queryAll(db,{"match":{"tag":_input["tag"]}})
    if len(employee) > 0:
        raise Exception("Tag already in use")    

    new_employee = Employee(_input)    
    new_employee.save(db)
    
    return new_employee.__dict__