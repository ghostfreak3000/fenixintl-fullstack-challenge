
import json
from api.vehicle.models.VehicleTypes import VehicleTypes
from api.vehicle.models.VehicleFactory import VehicleFactory
from .errors import *


def add_vehicle(_input,db):
    required_input = ["tag","type"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    vehicleType = _input["type"]  

    if vehicleType not in VehicleTypes:
        raise UnknownVehicleTypeError("Unknown vehicle type : " + vehicleType)

    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["tag"]}})
    if len(vehicle) > 0:
        raise Exception("Tag already in use")

    new_vehicle = VehicleTypes.get(vehicleType)(_input)    
    new_vehicle.save(db)
    
    return new_vehicle.__dict__