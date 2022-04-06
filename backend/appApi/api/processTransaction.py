from urllib import request
from flask_restx import Resource
from appApi.utils import api, app
from appApi.models.transactionModel import transaction
from pprint import pprint
from flask import request 
from appApi.pymongo_connect import get_database
import uuid
import datetime



"""
    Returns all transactions done by the id
    Parameters:
        transactionId: unique user identifier
    Returns:
        transactionItem: transaction with id: transactionId
"""
class ProcessTransactionApi(Resource):
    # mod = transaction
    # @api.marshal_with(mod, code=200, mask = {})
    @api.doc(description="get transaction")
    def put(self, transactionId):

    
        try:
            result = self.processTransactionId(transactionId)
            return result
        except Exception as e:
            return e, 500

        
       

    """
    Obtains all documents from the db of the specified user 
    Parameters:
        transactionID: the unique identification name for the transaction <str>
    Returns:
        userTransactionsList: list containing all transaction
    """
    def processTransactionId(self, transactionId):

        db = get_database()
        TransactionInfoCollection = db["transactions"]
        transaction = TransactionInfoCollection.find_one({"transactionId": transactionId})  #mongodb returns a cursor object, which we must iterate through, or else is not serializable 
        
        if(transaction != None and transaction["transactionState"] == "Initialized"):
            userId = transaction["userId"]
            UserInfoCollection = db["user_account"]
            user = UserInfoCollection.find_one({"userId": userId})  
            amount = user["balanceAmount"] - transaction["transactionAmount"] 

            userName = user["userName"]
            firstName = user["firstName"]
            lastName = user["lastName"]
            email = user["email"]
            userPass = user["userPass"]

            newUser = {
                "userId" : userId,
                "userName": userName,
                "firstName": firstName,
                "lastName": lastName,
                "balanceAmount": amount,
                "email": email,
                "userPass": userPass
            }

            

            UserInfoCollection.replace_one({"userId": userId}, newUser)
            updatedUser = UserInfoCollection.find_one({"userId": userId})  

            updatedUser.pop("_id")

            date = str(transaction["date"])

            firstName = updatedUser["firstName"]
            lastName = updatedUser["lastName"]
            balanceAmount = updatedUser["balanceAmount"]
            withdrawAmount =  transaction["transactionAmount"]
            date = date.split()[0]

            
            transactionId = transaction["transactionId"]
            transactionAmount = transaction["transactionAmount"]

            newTransaction = {
                "userId" : userId,
                "transactionId": transactionId,
                "transactionAmount": transactionAmount,
                "transactionState": "Completed",
                "date": datetime.datetime.now()
            }
            newTransaction = TransactionInfoCollection.replace_one({"$and":[ {"userId":userId}, {"transactionId":transactionId}]}, newTransaction)


            accountSummary ={
                "transactionId": transactionId,
                "firstName": firstName,
                "lastName": lastName,
                "balanceAmount": balanceAmount,
                "withdrawAmount": withdrawAmount,
                "date": date
            }
                

            return accountSummary
        else:
            return ''
        
        
        
        


        




