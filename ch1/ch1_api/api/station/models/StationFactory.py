from .Station import Station,GasStation
from .StationTypes import StationTypes
from api.vehicle.models.VehicleTypes import VehicleTypes

class StationFactory():
        
    StationSupportMap = {
        "gas":[
            VehicleTypes["car"],
            VehicleTypes["van"],
            VehicleTypes["bus"],
            VehicleTypes["truck"]
        ]
    }

    @staticmethod
    def stationSupportsVehicle(opts={}):
        station = opts.get("station",None)
        vehicle = opts.get("vehicle",None)
        return vehicle.__class__ in StationFactory.StationSupportMap.get(station.type,[])


    @staticmethod
    def queryAll(db,opts={}):
        stations = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":Station.collection}):
            station = StationTypes.get(record["type"])(record)
            stations.append(station)

        return stations