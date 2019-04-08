
import json
from api.ferry.models.FerryTypes import FerryTypes
from api.ferry.models.FerryFactory import FerryFactory
from .errors import *


def add_ferry(_input,db):
    required_input = ["tag","type","terminal"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    ferryType = _input["type"]  

    if ferryType not in FerryTypes:
        raise UnknownFerryTypeError("Unknown ferry type : " + ferryType)

    ferry = FerryFactory.queryAll(db,{"match":{"tag":_input["tag"]}})
    if len(ferry) > 0:
        raise Exception("Tag already in use")

    new_ferry = FerryTypes.get(ferryType)(_input)    
    new_ferry.save(db)
    
    return new_ferry.__dict__