from .Inspection import Inspection
from .InspectionTypes import InspectionTypes
from api.vehicle.models.VehicleTypes import VehicleTypes

class InspectionFactory():
    
    InspectionSupportMap = {
        "customs":[
            VehicleTypes["van"],
            VehicleTypes["truck"]
        ]
    }

    @staticmethod
    def inspectionSupportsVehicle(opts={}):
        inspection = opts.get("inspection",None)
        vehicle = opts.get("vehicle",None)
        return vehicle.__class__ in InspectionFactory.InspectionSupportMap.get(inspection.type,[])
    
    @staticmethod
    def queryAll(db,opts={}):
        inspections = []

        for record in db.aggregate({"pipeline":[{"$match":{}}],"collection":Inspection.collection}):
            inspection = InspectionTypes.get(record["type"])(record)
            inspections.append(inspection)

        return inspections