import uuid
class Employee():

    collection = "employees"

    @staticmethod
    def queryAll(db,opts={}):        
        employees = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":Employee.collection}):
            employee = Employee(record)
            employees.append(employee)

        return employees


    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.tag = opts.get("tag",random_id)
        self.salary = int(opts.get("salary",10))
    
    def save(self,db):       
        db.save(self.__dict__,Employee.collection) 

    