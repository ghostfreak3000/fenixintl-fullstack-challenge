import uuid
from abc import ABC, abstractmethod
from api.activityLog.models.ActivityLog import ActivityLog

class Station(ABC):

    collection = "stations"

    @staticmethod
    def queryAll(db,opts={}):
        stations = []

        for record in db.aggregate({"pipeline":[{"$match":{}}],"collection":Station.collection}):
            station = Station(record)
            stations.append(station)

        return stations

    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.tag = opts.get("tag",random_id)
        self.terminal = opts.get("terminal","n/a")
        self.type = opts.get("type")
    
    def save(self,db):       
        db.save(self.__dict__,Station.collection)         
    
    @abstractmethod
    def serviceVehicle(self,db,opts={}):
        """Services a vehicle based on the type of station"""


class GasStation(Station):
    def __init__(self,opts={}):
        opts["type"] = "gas"
        super().__init__(opts)
    
    def serviceVehicle(self,db,opts={}):
        vehicle = opts.get("vehicle",{})
        gas = opts.get("gas",100)
        old_gas = vehicle.gas
        vehicle.setGas(gas) 
        vehicle.save(db)  
        new_activity = ActivityLog({
                                    "what":"serviced vehicle [added gas]",
                                    "meta":{ 
                                            "location":"Gas Station", 
                                            "vehicleId":vehicle._id,
                                            "vehicle":vehicle.tag,
                                            "station":self.tag,
                                            "stationId":self._id, 
                                            "oldGas":old_gas,
                                            "newGas":gas
                                    }})
        new_activity.save(db)