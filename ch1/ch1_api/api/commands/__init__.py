import re

from .add_terminal import add_terminal
from .get_revenue import get_revenue
from .add_employee import add_employee
from .get_income import get_income
from .add_ferry import add_ferry
from .add_station import add_station
from .refuel import refuel
from .add_inspection import add_inspection
from .add_vehicle import add_vehicle
from .park_vehicle import park_vehicle
from .open_cargo_doors import open_cargo_doors
from .close_cargo_doors import close_cargo_doors
from .view_log import view_log
from .show import show
from .list import _list

from api.shared import Db
from .errors import *

COMMAND_LIST = {
    "add_terminal":add_terminal,
    "add_employee":add_employee,
    "add_ferry":add_ferry,
    "add_station":add_station,
    "add_inspection":add_inspection,
    "add_vehicle":add_vehicle,
    "park_vehicle":park_vehicle,
    "open_cargo_doors":open_cargo_doors,
    "close_cargo_doors":close_cargo_doors,
    "view_log":view_log,
    "get_income":get_income,
    "get_revenue":get_revenue,
    "refuel":refuel,
    "show":show,
    "list":_list
}

def parse_cmd(cmd_str=""):
    if cmd_str == None:
        cmd_str = ""
        
    cmd_str = cmd_str.strip()
    
    if not cmd_str:
        raise EmptyCommandError("Command String Empty")

    cmd_obj = {"cmd":"","input":{}}    
    
    cmd_regex = re.compile(r'/(\w+)')
    cmd_regex_result = cmd_regex.match(cmd_str)
    cmd_obj["cmd"] = cmd_regex_result.group(1)

    input_regex = re.compile(r'(\w+):[\'|"](\w*)[\'|"]?')
    input_regex_result = input_regex.findall(cmd_str)

    for in_key in input_regex_result:
        cmd_obj["input"].update([in_key])

    return cmd_obj

def exec_cmd(cmd_obj,db):
    cmd = cmd_obj.get("cmd","-1")
    _input = cmd_obj.get("input",{})
    
    if cmd not in COMMAND_LIST:
        raise UnknownCommandError("Unknown command : " + cmd)

    return COMMAND_LIST.get(cmd)(_input,db)