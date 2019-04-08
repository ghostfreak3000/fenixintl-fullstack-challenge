
import json
from api.vehicle.models.VehicleFactory import VehicleFactory
from api.inspection.models.Inspection import Inspection
from api.ferry.models.FerryFactory import FerryFactory
from api.employee.models.Employee import Employee
from api.terminal.models.Terminal import Terminal
from api.ticket.models.Ticket import Ticket
from api.station.models.StationFactory import StationFactory
from .errors import *


def refuel(_input,db):
    required_input = ["vehicle","station"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    tickets = Ticket.queryAll(db,{"match":{"vehicle":_input["vehicle"],"departed":False}})
    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})[0]
    station = StationFactory.queryAll(db,{"match":{"tag":_input["station"]}})[0]

    if len(tickets) > 0:
        raise Exception("vehicle "+_input["vehicle"]+" is already on the ferry.")

    if not vehicle.serviceNeeded:
        raise Exception("vehicle "+_input["vehicle"]+" doesn't need servicing.")

    if not StationFactory.stationSupportsVehicle({"vehicle":vehicle,"station":station}):
        raise Exception("vehicle "+_input["vehicle"]+" not supported by station "+_input["station"]+". Please provide a different vehicle or station")

    station.serviceVehicle(db,{"vehicle":vehicle,"gas":_input["gas"]})

    return { "msg":"service was a success" }
         



    