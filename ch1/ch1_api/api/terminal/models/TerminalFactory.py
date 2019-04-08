
from api.ticket.models.Ticket import Ticket

class TerminalFactory():
    
    @staticmethod
    def getRevenue(db,opts={}):

        terminalTag = opts.get("terminal","")
        tickets = Ticket.queryAll(db,{"match":{"terminal":terminalTag}})

        terminalTotalRevenue = 0

        for ticket in tickets:
            terminalTotalRevenue += ticket.terminalRevenue

        res = {
            "tickets":len(tickets),
            "terminal":terminalTag,
            "terminalRevenue":terminalTotalRevenue
        }

        return res