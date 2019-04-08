import uuid, datetime, time
class ActivityLog():

    collection = "activitylogs"

    @staticmethod
    def queryAll(db,opts={}):        
        activitylogs = []
        _match = opts.get("match",{})
        _sort = opts.get("sort",{})

        pipeline = [{"$match":_sort}]
        if _sort:
            pipeline.append({"$sort":_sort})

        for record in db.aggregate({"pipeline":pipeline,"collection":ActivityLog.collection}):
            activitylog = ActivityLog(record)
            activitylogs.append(activitylog)

        return activitylogs


    def __init__(self,opts={}):
        random_id = str(uuid.uuid4())

        self._id = opts.get("_id",random_id)
        self.what = opts.get("what","")

        utc_offset_sec = time.altzone if time.localtime().tm_isdst else time.timezone
        utc_offset = datetime.timedelta(seconds=-utc_offset_sec)

        created_at = datetime.datetime.now().replace(tzinfo=datetime.timezone(offset=utc_offset)).isoformat()        
        self.when = opts.get("when",created_at)
        self.created_at = created_at
        self.meta = opts.get("meta",{})
    
    def save(self,db):       
        db.save(self.__dict__,ActivityLog.collection) 

    