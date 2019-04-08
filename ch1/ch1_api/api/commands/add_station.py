
import json
from api.station.models.StationTypes import StationTypes
from api.station.models.StationFactory import StationFactory
from .errors import *


def add_station(_input,db):
    required_input = ["tag","type","terminal"]

    for check in required_input:
        if check not in _input:
            raise MissingRequiredInputError("Missing required input : " + check)    

    stationType = _input["type"]  

    if stationType not in StationTypes:
        raise UnknownStationTypeError("Unknown station type : " + stationType)

    station = StationFactory.queryAll(db,{"match":{"tag":_input["tag"]}})
    if len(station) > 0:
        raise Exception("Tag already in use")

    new_station = StationTypes.get(stationType)(_input)    
    new_station.save(db)
    
    return new_station.__dict__