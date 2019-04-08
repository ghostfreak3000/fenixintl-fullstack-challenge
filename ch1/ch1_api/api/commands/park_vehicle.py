
import json
from api.vehicle.models.VehicleFactory import VehicleFactory
from api.inspection.models.Inspection import Inspection
from api.ferry.models.FerryFactory import FerryFactory
from api.employee.models.Employee import Employee
from api.terminal.models.Terminal import Terminal
from api.ticket.models.Ticket import Ticket
from api.activityLog.models.ActivityLog import ActivityLog
from .errors import *

def park_vehicle(_input,db):
    required_input = ["vehicle","ferry","employee"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    


    #Need to use some sort of stratgey or algorithm pattern here, <sigh>.. no time
    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})
    if not vehicle:
        raise NotFoundError("No vehicle found with tag : " + _input["vehicle"])
    vehicle = vehicle[0]

    ferry = FerryFactory.queryAll(db,{"match":{"tag":_input["ferry"]}})
    if not ferry:
        raise NotFoundError("No ferry found with tag : " + _input["ferry"])
    ferry = ferry[0]

    employee = Employee.queryAll(db,{"match":{"tag":_input["employee"]}})
    if not employee:
        raise NotFoundError("No employee found with tag : " + _input["employee"])
    employee = employee[0]

    terminal = Terminal.queryAll(db,{"match":{"tag":ferry.terminal}})
    if not terminal:
        raise NotFoundError("No terminal found with tag : " + ferry.terminal)
    terminal = terminal[0]    

    if vehicle.serviceNeeded:
        raise Exception("vehicle "+vehicle.tag+" is at "+str(vehicle.gas)+"% and needs service, please use the /refuel command")

    if vehicle.cargoDoorsOpen:
        raise Exception("vehicle "+vehicle.tag+" cargo doors are open. Please use the /close_cargo_doors command")

    if Inspection.needsInspection(vehicle):
        raise Exception("vehicle "+vehicle.tag+" needs inspection, please use the /open_cargo_doors,/close_cargo_doors and /inspect commands")

    if not FerryFactory.ferrySupportsVehicle({"ferry":ferry,"vehicle":vehicle}):
        raise Exception("Ferry [ "+ferry.tag+" : "+ferry.type+" ] does not support Vehicle [ "+vehicle.tag+" : "+vehicle.type+" ]. Please provide a different type of ferry or vehicle")

    if FerryFactory.ferryIsFull(db,{"ferry":ferry}):
        raise Exception("Ferry [ "+ferry.tag+" : "+ferry.type+" ] is full. Please provide a different ferry")

    tickets = Ticket.queryAll(db,{"match":{"ferryId":ferry._id,"vehicleId":vehicle._id,"departed":False}})

    if len(tickets) > 0:        
        raise Exception("Vehicle [ "+vehicle.tag+" : "+vehicle.type+" ] has already been parked on Ferry [ "+ferry.tag+" : "+ferry.type+" ]. Please provide a different vehicle")

    new_ticket = Ticket({"ferry":ferry,"employee":employee,"vehicle":vehicle,"terminal":terminal})
    new_ticket.save(db)

    new_activity = ActivityLog({
                            "what":"added vehicle to ferry",
                            "meta":{ 
                                    "location":"Ferry", 
                                    "vehicleId":vehicle._id,
                                    "vehicle":vehicle.tag,
                                    "ferry":ferry.tag,
                                    "ferryId":ferry._id, 
                                    "ticketId":new_ticket._id                                    
                            }})
    new_activity.save(db)

    return new_ticket.__dict__
         



    