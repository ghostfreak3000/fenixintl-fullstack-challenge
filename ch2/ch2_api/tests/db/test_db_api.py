import os 
import sys
sys.path.append(os.path.abspath("."))

from api.shared import Db
database = Db.getInstance()

def test_should_expose_connect():
    assert hasattr(database,'connect')

def test_should_expose_bulkWrite():
    assert hasattr(database,'bulkWrite')

def test_should_expose_aggregate():
    assert hasattr(database,'aggregate')
