
import json
from api.vehicle.models.VehicleFactory import  VehicleFactory
from api.ticket.models.Ticket import Ticket
from .errors import *


def open_cargo_doors(_input,db):
    required_input = ["vehicle"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})
    if not vehicle:
        raise NotFoundError("No vehicle found with tag : " + _input["vehicle"])
    vehicle = vehicle[0]

    tickets = Ticket.queryAll(db,{"match":{"vehicle":_input["vehicle"],"departed":False}})

    if len(tickets) > 0:
        raise Exception("vehicle "+_input["vehicle"]+" is already on the ferry.")

    if not getattr(vehicle,"hasCargoDoors",False):
        raise Exception("Vehicle [ "+vehicle.tag+" : "+vehicle.type+" ] doesn't have cargo doors")

    if vehicle.cargoDoorsOpen:
        raise Exception("Vehicle [ "+vehicle.tag+" : "+vehicle.type+" ] cargo doors are open")

    vehicle.cargoDoorsOpen = True
    vehicle.save(db)

    return { "msg":"Cargo doors opened successfully" }