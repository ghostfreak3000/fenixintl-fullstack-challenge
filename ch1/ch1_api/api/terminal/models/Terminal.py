import uuid
class Terminal():

    collection = "terminals"

    @staticmethod
    def queryAll(db,opts={}):
        terminals = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":Terminal.collection}):
            terminal = Terminal(record)
            terminals.append(terminal)

        return terminals

    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.tag = opts.get("tag",random_id)
    
    def save(self,db):       
        db.save(self.__dict__,Terminal.collection)         