import uuid
from abc import ABC, abstractmethod
from api.activityLog.models.ActivityLog import ActivityLog

class Inspection(ABC):

    collection = "inspections"

    @staticmethod
    def needsInspection(vehicle):
        return getattr(vehicle,"inspectionNeeded",False) and not getattr(vehicle,"inspectionCarriedOut",False)

    @staticmethod
    def queryAll(db,opts={}):
        inspections = []

        for record in db.aggregate({"pipeline":[{"$match":{}}],"collection":Inspection.collection}):
            inspection = Inspection(record)
            inspections.append(inspection)

        return inspections

    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.tag = opts.get("tag",random_id)
        self.terminal = opts.get("terminal","n/a")
        self.type = opts.get("type")
    
    def save(self,db):       
        db.save(self.__dict__,Inspection.collection)    

    @abstractmethod
    def inspectVehicle(self,db,opts={}):
        """Inspects a vehicle based on the type of inspection"""             


class CustomsInspection(Inspection):
    def __init__(self,opts={}):
        opts["type"] = "customs"
        super().__init__(opts)

    def inspectVehicle(self,db,opts={}):
        vehicle = opts.get("vehicle",{})
        vehicle.inspectionCarriedOut = True 
        vehicle.save(db)  
        new_activity = ActivityLog({
                                    "what":"inspected vehicle",
                                    "meta":{ 
                                            "location":"Customs Inspection", 
                                            "vehicleId":vehicle._id,
                                            "vehicle":vehicle.tag,
                                            "inspection":self.tag,
                                            "inspectionId":self._id
                                    }})
        new_activity.save(db)    