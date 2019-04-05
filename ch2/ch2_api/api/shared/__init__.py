from pymongo import MongoClient
from pymongo import InsertOne, UpdateOne, UpdateMany, DeleteOne, DeleteMany, ReplaceOne

class Db:
    __instance = None
    __conn = None
    __database = None

    @staticmethod
    def getInstance():
        if Db.__instance == None:
            Db()
        return Db.__instance
    
    def __init__(self):
        if Db.__instance != None:
            raise Exception("This class isn't meant to be instantiated!, use getInstance")
        else:
            Db.__instance = self

    def connect(self,opts):
        uri = opts["uri"]
        dbname = opts["dbname"]
        Db.__conn = MongoClient(uri)
        Db.__database = getattr(Db.__conn,dbname)

    def bulkWrite(self,opts):
        raw_pipeline = opts["pipeline"]
        collection = opts["collection"]
        pipeline = []

        for raw_op in raw_pipeline:
            if 'insertOne' in raw_op:                               
                document = raw_op["insertOne"].get("document",None)
                
                op = InsertOne(document)
                pipeline.append(op)

            if 'updateOne' in raw_op:                                
                _filter = raw_op["updateOne"].get("filter",None)
                update = raw_op["updateOne"].get("update",None)
                upsert = raw_op["updateOne"].get("upsert",None)
                collation = raw_op["updateOne"].get("collation",None)
                arrayFilters = raw_op["updateOne"].get("arrayFilters",None)
                
                op = UpdateOne(_filter,update,upsert,collation,arrayFilters)
                pipeline.append(op)

            if 'updateMany' in raw_op:                                
                _filter = raw_op["updateMany"].get("filter",None)
                update = raw_op["updateMany"].get("update",None)
                upsert = raw_op["updateMany"].get("upsert",None)
                collation = raw_op["updateMany"].get("collation",None)
                arrayFilters = raw_op["updateMany"].get("arrayFilters",None)
                                
                op = UpdateMany(_filter,update,upsert,collation,arrayFilters)
                pipeline.append(op)                

            if 'deleteOne' in raw_op:                                
                _filter = raw_op["deleteOne"].get("filter",None)
                collation = raw_op["deleteOne"].get("collation",None)
                                
                op = DeleteOne(_filter,collation)
                pipeline.append(op)   

            if 'deleteMany' in raw_op:                                
                _filter = raw_op["deleteMany"].get("filter",None)
                collation = raw_op["deleteMany"].get("collation",None)
                                
                op = DeleteMany(_filter,collation)
                pipeline.append(op)                         

            if 'replaceOne' in raw_op:                                
                _filter = raw_op["replaceOne"].get("filter",None)
                replacement = raw_op["replaceOne"].get("replacement",None)
                upsert = raw_op["updateOne"].get("upsert",None)
                collation = raw_op["updateOne"].get("collation",None)
                
                op = ReplaceOne(_filter,replacement,upsert,collation)
                pipeline.append(op)

        result = getattr(Db.__database,collection).bulk_write(pipeline)
        return result.bulk_api_result
        

    def aggregate(self,opts):
        pipeline = opts["pipeline"]
        collection = opts["collection"]
        return list(getattr(Db.__database,collection).aggregate(pipeline))