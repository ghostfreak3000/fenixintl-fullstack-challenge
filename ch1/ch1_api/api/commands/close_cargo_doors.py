
import json
from api.vehicle.models.VehicleFactory import  VehicleFactory
from .errors import *


def close_cargo_doors(_input,db):
    required_input = ["vehicle"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})
    if not vehicle:
        raise NotFoundError("No vehicle found with tag : " + _input["vehicle"])
    vehicle = vehicle[0]

    if not getattr(vehicle,"hasCargoDoors",False):
        raise Exception("Vehicle [ "+vehicle.tag+" : "+vehicle.type+" ] doesn't have cargo doors")

    if not vehicle.cargoDoorsOpen:
        raise Exception("Vehicle [ "+vehicle.tag+" : "+vehicle.type+" ] cargo doors are closed")

    vehicle.cargoDoorsOpen = False
    vehicle.save(db)

    return { "msg":"Cargo doors closed successfully" }