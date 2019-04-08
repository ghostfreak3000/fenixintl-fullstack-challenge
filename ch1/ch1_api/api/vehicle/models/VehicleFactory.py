from .Vehicle import Vehicle
from .VehicleTypes import VehicleTypes

class VehicleFactory():
    
    @staticmethod
    def queryAll(db,opts={}):
        vehicles = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":Vehicle.collection}):
            vehicle = VehicleTypes.get(record["type"])(record)
            vehicles.append(vehicle)

        return vehicles