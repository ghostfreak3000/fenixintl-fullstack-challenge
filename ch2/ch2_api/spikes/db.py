import os
import sys
sys.path.append(os.path.abspath(".."))

from api.shared import Db
database = Db.getInstance()

database.connect({"uri":"mongodb://localhost:27017/","dbname":"challenge2"})
updates = database.bulkWrite({"pipeline":[{"updateOne":{ "filter":{"random":"doc"},"update":{"$set":{"version":"3"}} }}],"collection":"test_collection"})
test_info = database.aggregate({"pipeline":[{"$match":{}}],"collection":"test_collection"})

print(updates)
print(test_info)