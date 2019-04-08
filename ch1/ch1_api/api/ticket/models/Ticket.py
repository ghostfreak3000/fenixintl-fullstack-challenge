import uuid, datetime, time, json
class Ticket():

    collection = "tickets"

    @staticmethod
    def queryAll(db,opts={}):        
        tickets = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":Ticket.collection}):            
            ticket = Ticket({"record":record})
            tickets.append(ticket)

        return tickets


    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        ferry = opts.get("ferry",{})
        if not isinstance(ferry,dict):
            ferry = ferry.__dict__

        vehicle = opts.get("vehicle",{})
        if not isinstance(vehicle,dict):
            vehicle = vehicle.__dict__
        
        employee = opts.get("employee",{})
        if not isinstance(employee,dict):
            employee = employee.__dict__

        terminal = opts.get("terminal",{})
        if not isinstance(terminal,dict):
            terminal = terminal.__dict__

        record = opts.get("record",{})

        self._id = opts.get("_id",random_id)
        
        self.ferry = record.get("ferry",ferry.get("tag"))
        self.ferryId = record.get("ferryId",ferry.get("_id")) 
        self.employee = record.get("employee",employee.get("tag"))
        self.employeeId = record.get("employeeId",employee.get("_id"))
        self.terminal = record.get("terminal",terminal.get("tag"))
        self.terminalId = record.get("terminalId",terminal.get("_id"))
        self.vehicle = record.get("vehicle",vehicle.get("tag"))
        self.vehicleId = record.get("vehicleId",vehicle.get("_id"))

        self.ferryChargeAmt = record.get("ferryChargeAmt",vehicle.get("ferryChargeAmt"))
        self.ferryChargeCurr = record.get("ferryChargeCurr",vehicle.get("ferryChargeCurr"))
        self.employeeSalary = record.get("employeeSalary",employee.get("salary"))
        self.employeeIncome = record.get("employeeIncome",(self.ferryChargeAmt * (self.employeeSalary/1000)))
        self.terminalRevenue = record.get("terminalRevenue",(self.ferryChargeAmt - self.employeeIncome))
        self.departed = record.get("departed",False)
        self.departed_at = record.get("departed_at","")

        utc_offset_sec = time.altzone if time.localtime().tm_isdst else time.timezone
        utc_offset = datetime.timedelta(seconds=-utc_offset_sec)

        created_at = datetime.datetime.now().replace(tzinfo=datetime.timezone(offset=utc_offset)).isoformat()
        self.created_at = record.get("created_at",created_at)
    
    def save(self,db):       
        db.save(self.__dict__,Ticket.collection) 