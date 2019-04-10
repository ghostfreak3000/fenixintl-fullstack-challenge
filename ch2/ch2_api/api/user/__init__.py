import uuid
from argon2 import PasswordHasher
ph = PasswordHasher()

class User():

    collection = "users"

    @staticmethod
    def queryAll(db,opts={}):        
        users = []
        _match = opts.get("match",{})

        for record in db.aggregate({"pipeline":[{"$match":_match}],"collection":User.collection}):
            user = User(record)
            users.append(user)

        return users

    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())
        self._id = opts.get("_id",random_id)
        self.name = opts.get("name","")
        self.username = opts.get("username","")        
        self.password = opts.get("password","")
    
    def save(self,db):       
        db.save(self.__dict__,User.collection) 

    def hashPass(self):
        #hash password using argon_2
        password = ph.hash(self.password)
        self.password = password

    def passwordMatches(self,password):
        matches = False

        try:
            matches = ph.verify(self.password, password)
        except:
            pass

        return matches

    def passwordNeedsRehash(self):
        return ph.check_needs_rehash(self.password)

    def rehashPass(self,password):        
        self.password = ph.hash(password)