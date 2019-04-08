
import json
from api.employee.models.Employee import Employee
from api.terminal.models.Terminal import Terminal
from api.ferry.models.FerryFactory import FerryFactory
from api.station.models.StationFactory import StationFactory
from api.inspection.models.InspectionFactory import InspectionFactory
from api.vehicle.models.VehicleFactory import VehicleFactory
from api.ticket.models.Ticket import Ticket
from .errors import *

listSources = {
        "employees":Employee,
        "terminals":Terminal,
        "ferries":FerryFactory,
        "stations":StationFactory,
        "inspections":InspectionFactory,
        "vehicles":VehicleFactory,
        "tickets":Ticket
}

def _list(_input,db):
    
    required_input = ["tag"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)

    listSource = _input["tag"]

    if listSource not in listSources:
            raise UnknownListSourceError("Unknown list source : " + listSource)

    data = listSources.get(listSource).queryAll(db)    
    dict_data = []
    
    for datum in data:
            dict_data.append(datum.__dict__)
    
    return dict_data