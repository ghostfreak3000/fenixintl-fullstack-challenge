
import json
from api.terminal.models.Terminal import Terminal
from api.terminal.models.TerminalFactory import TerminalFactory
from api.employee.models.Employee import Employee
from api.employee.models.EmployeeFactory import EmployeeFactory
from api.ferry.models.FerryFactory import FerryFactory
from api.vehicle.models.VehicleFactory import VehicleFactory
from api.activityLog.models.ActivityLog import ActivityLog
from api.ticket.models.Ticket import Ticket

from .errors import *
# Again, heavily needs some algorithm or strategy pattern
def show(_input,db):
    
    required_input = []

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)

    if "terminal" in _input:
            terminal = Terminal.queryAll(db,{"match":{"tag":_input["terminal"]}})
            if not terminal:
                raise Exception("Terminal not found")
            terminal = terminal[0]               
            terminalRevenue = TerminalFactory.getRevenue(db,{"terminal":_input["terminal"]})
            terminal_dict = terminal.__dict__
            terminal_dict["revenue"] = terminalRevenue["terminalRevenue"]
            terminal_dict["tickets"] = terminalRevenue["tickets"]
            return terminal_dict

    if "employee" in _input:
            employee = Employee.queryAll(db,{"match":{"tag":_input["employee"]}})
            if not employee:
                raise Exception("Employee not found")
            employee = employee[0]                
            employeeIncome = EmployeeFactory.getIncome(db,{"employee":_input["employee"]})
            employee_dict = employee.__dict__
            employee_dict["income"] = employeeIncome["employeeIncome"]
            employee_dict["tickets"] = employeeIncome["tickets"]
            return employee_dict

    if "ferry" in _input:            
            ferry = FerryFactory.queryAll(db,{"match":{"tag":_input["ferry"]}})
            if not ferry:
                raise Exception("Ferry not found")
            ferry = ferry[0]    
            tickets = Ticket.queryAll(db,{"match":{"ferryId":ferry._id,"departed":False}})
            ferry_dict = ferry.__dict__
            ferry_dict["vehicles"] = len(tickets)
            return ferry_dict

    if "vehicle" in _input:            
            vehicle = VehicleFactory.queryAll(db,{"match":{"tag":_input["vehicle"]}})
            if not vehicle:
                raise Exception("Vehicle not found")
            vehicle = vehicle[0]    
            acvtivity_logs =  ActivityLog.queryAll(db,{"match":{"meta.vehicle":_input["vehicle"],"sort":{"_id":-1}}})
            vehicle_dict = vehicle.__dict__
            
            if acvtivity_logs:
                log = acvtivity_logs[0]
                log = log.__dict__
                vehicle_dict["currentLocation"] = log["meta"]["location"]

            return vehicle_dict

    
    return {}