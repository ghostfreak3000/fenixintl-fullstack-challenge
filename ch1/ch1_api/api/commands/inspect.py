
import json
from api.vehicle.models.VehicleFactory import VehicleFactory
from api.inspection.models.Inspection import Inspection
from api.inspection.models.InspectionFactory import InspectionFactory
from api.ferry.models.FerryFactory import FerryFactory
from api.employee.models.Employee import Employee
from api.terminal.models.Terminal import Terminal
from api.ticket.models.Ticket import Ticket

from .errors import *


def inspect(_input,db):
    required_input = ["vehicle","inspection"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    tickets = Ticket.queryAll(db,{"match":{"vehicle":_input["vehicle"],"departed":False}})
    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})[0]
    inspection = InspectionFactory.queryAll(db,{"match":{"tag":_input["inspection"]}})[0]

    if len(tickets) > 0:
        raise Exception("vehicle "+_input["vehicle"]+" is already on the ferry.")

    if not vehicle.hasCargoDoors:
        raise Exception("vehicle "+_input["vehicle"]+" doesn't have cargo doors.")

    if not vehicle.inspectionCarriedOut:
        raise Exception("vehicle "+_input["vehicle"]+" has already been inspected.")

    if not InspectionFactory.inspectionSupportsVehicle({"vehicle":vehicle,"inspection":inspection}):
        raise Exception("vehicle "+_input["vehicle"]+" not supported by inspection "+_input["inspection"]+". Please provide a different vehicle or station")

    inspection.inspectVehicle(db,{"vehicle":vehicle})

    return {"msg":"inspection carried out successfully"}
         



    