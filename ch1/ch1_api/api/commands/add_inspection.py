
import json
from api.inspection.models.InspectionTypes import InspectionTypes
from api.inspection.models.InspectionFactory import InspectionFactory
from .errors import *


def add_inspection(_input,db):
    required_input = ["tag","type","terminal"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    inspectionType = _input["type"]  

    if inspectionType not in InspectionTypes:
        raise UnknownInspectionTypeError("Unknown inspection type : " + inspectionType)

    inspection = InspectionFactory.queryAll(db,{"match":{"tag":_input["tag"]}})
    if len(inspection) > 0:
        raise Exception("Tag already in use")

    new_inspection = InspectionTypes.get(inspectionType)(_input)    
    new_inspection.save(db)
    
    return new_inspection.__dict__