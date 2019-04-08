
from api.ticket.models.Ticket import Ticket

class EmployeeFactory():
    
    @staticmethod
    def getIncome(db,opts={}):

        employeeTag = opts.get("employee","")
        tickets = Ticket.queryAll(db,{"match":{"employee":employeeTag}})

        employeeTotalIncome = 0

        for ticket in tickets:
            employeeTotalIncome += ticket.employeeIncome

        res = {
            "tickets":len(tickets),
            "employee":employeeTag,
            "employeeIncome":employeeTotalIncome
        }

        return res