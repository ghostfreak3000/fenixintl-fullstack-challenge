from .Ferry import Ferry, LargeFerry, SmallFerry
from .FerryTypes import FerryTypes
from api.vehicle.models.VehicleTypes import VehicleTypes
from api.ticket.models.Ticket import Ticket

class FerryFactory():
    
    FerrySupportMap = {
        "large":[
            VehicleTypes["bus"],
            VehicleTypes["truck"]
        ],
        "small":[
            VehicleTypes["car"],
            VehicleTypes["van"]
        ]
    }

    @staticmethod
    def ferryIsFull(db,opts={}):
        ferry = opts.get("ferry",None)
        tickets = Ticket.queryAll(db,{"match":{"ferryId":ferry._id,"departed":False}})
        return len(tickets) == ferry.threshold

    @staticmethod
    def ferrySupportsVehicle(opts={}):
        ferry = opts.get("ferry",None)
        vehicle = opts.get("vehicle",None)
        return vehicle.__class__ in FerryFactory.FerrySupportMap.get(ferry.type,[])


    @staticmethod
    def queryAll(db,opts={}):
        ferries = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":Ferry.collection}):
            ferry = FerryTypes.get(record["type"])(record)
            ferries.append(ferry)

        return ferries