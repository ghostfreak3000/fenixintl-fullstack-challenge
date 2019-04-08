class EmptyCommandError(SyntaxError):
    '''raise this when encountering an empty command'''

class UnknownCommandError(SyntaxError):
    '''raise this when encountering a command not known'''

class MissingRequiredInputError(SyntaxError):
    '''raise this when a command is missing a required input'''

class UnknownListSourceError(SyntaxError):
    '''raise this when encountering a list source not known'''

class UnknownFerryTypeError(SyntaxError):
    '''raise this when encountering a ferry type not known'''

class UnknownStationTypeError(SyntaxError):
    '''raise this when encountering a station type not known'''    

class UnknownInspectionTypeError(SyntaxError):
    '''raise this when encountering a inspection type not known'''

class UnknownVehicleTypeError(SyntaxError):
    '''raise this when encountering a vehicle type not known'''        

class NotFoundError(SyntaxError):
    '''raise this when encountering a not found'''