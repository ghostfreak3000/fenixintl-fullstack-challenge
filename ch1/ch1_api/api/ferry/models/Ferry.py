import uuid
from abc import ABC

class Ferry(ABC):

    collection = "ferries"

    @staticmethod
    def queryAll(db,opts={}):
        ferries = []

        for record in db.aggregate({"pipeline":[{"$match":{}}],"collection":Ferry.collection}):
            ferry = Ferry(record)
            ferries.append(ferry)

        return ferries

    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.tag = opts.get("tag",random_id)
        self.terminal = opts.get("terminal","n/a")
        self.threshold = opts.get("threshold")
        self.type = opts.get("type")
    
    def save(self,db):       
        db.save(self.__dict__,Ferry.collection)         


class LargeFerry(Ferry):
    def __init__(self,opts={}):
        opts["threshold"] = 6
        opts["type"] = "large"
        super().__init__(opts)

class SmallFerry(Ferry):
    def __init__(self,opts={}):
        opts["threshold"] = 8
        opts["type"] = "small"
        super().__init__(opts)
