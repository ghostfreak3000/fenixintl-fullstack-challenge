
import json
from api.vehicle.models.VehicleFactory import  VehicleFactory 
from api.activityLog.models.ActivityLog import ActivityLog
from .errors import *


def view_log(_input,db):
    required_input = ["vehicle"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})
    if not vehicle:
        raise NotFoundError("No vehicle found with tag : " + _input["vehicle"])
    vehicle = vehicle[0]

    acvtivity_logs =  ActivityLog.queryAll(db,{"match":{"meta.vehicle":_input["vehicle"],"sort":{"_id":-1}}})
    logs = []

    for log in acvtivity_logs:
            logs.append(log.__dict__)

    return logs