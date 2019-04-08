import uuid
from abc import ABC
from random import randint

class Vehicle(ABC):

    collection = "vehicles"

    @staticmethod
    def queryAll(db,opts={}):
        vehicles = []

        for record in db.aggregate({"pipeline":[{"$match":{}}],"collection":Vehicle.collection}):
            vehicle = Vehicle(record)
            vehicles.append(vehicle)

        return vehicles

    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.tag = opts.get("tag",random_id)
        self.serviceNeeded = False
    
    def save(self,db):       
        import json
        print("Dict" + json.dumps(self.__dict__))
        db.save(self.__dict__,Vehicle.collection)         

    def needsService(self):
        self.serviceNeeded = True

    def doesntNeedService(self):
        self.serviceNeeded = False        

class GasVehicle(Vehicle):

    threshold = 10

    def __init__(self,opts={}):
        super().__init__(opts)
        self.gas = int(opts.get("gas",randint(0, 100)))        
        if self.gas < GasVehicle.threshold:
            self.serviceNeeded = True
        else:
            self.serviceNeeded = False

    def setGas(self,gas):
        self.gas = gas        
        if self.gas < GasVehicle.threshold:
            self.serviceNeeded = True
        else:
            self.serviceNeeded = False
            

class LargeGasVehicle(GasVehicle):
    def __init__(self,opts={}):
        super().__init__(opts)
        self.classifiction = "large"

class LargeCargoGasVehicle(LargeGasVehicle):
    def __init__(self,opts={}):
        self.hasCargoDoors = True
        self.cargoDoorsOpen = False
        self.inspectionNeeded = True
        self.inspectionCarriedOut = False
        super().__init__(opts)
    
    def openCargDoors(self):
        self.cargoDoorsOpen = True

    def closeCargDoors(self):
        self.cargoDoorsOpen = False

class Truck(LargeCargoGasVehicle):
    def __init__(self,opts={}):
        self.type = "truck"
        self.ferryChargeAmt = 6
        self.ferryChargeCurr = "EUR"
        super().__init__(opts)

class Bus(LargeGasVehicle):
    def __init__(self,opts={}):
        self.type = "bus"
        self.ferryChargeAmt = 5
        self.ferryChargeCurr = "EUR"
        super().__init__(opts)

class SmallGasVehicle(GasVehicle):
    def __init__(self,opts={}):
        self.classifiction = "small"
        super().__init__(opts)

class SmallCargoGasVehicle(SmallGasVehicle):
    def __init__(self,opts={}):
        self.hasCargoDoors = True
        self.cargoDoorsOpen = False
        self.inspectionNeeded = True
        self.inspectionCarriedOut = False
        super().__init__(opts)
    
    def openCargDoors(self):
        self.cargoDoorsOpen = True

    def closeCargDoors(self):
        self.cargoDoorsOpen = False

class Car(SmallGasVehicle):
    def __init__(self,opts={}):
        self.type = "car"
        self.ferryChargeAmt = 3
        self.ferryChargeCurr = "EUR"
        super().__init__(opts)

class Van(SmallCargoGasVehicle):
    def __init__(self,opts={}):
        self.type = "van"
        self.ferryChargeAmt = 4
        self.ferryChargeCurr = "EUR"
        super().__init__(opts)
