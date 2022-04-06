from flask_restx import Resource
from appApi.utils import api, app
from appApi.models.loginModel import loginModel
from appApi.pymongo_connect import get_database
import bcrypt
from pprint import pprint

"""
    Resource Login takes input on a GET protocol and and logs user in
    Parameters:
        username: unique input username correspoding to our user
        pwd: inout password by our user
    Returns:
        returnJson: contains result string and error msg if any
"""
class LoginApi(Resource):
    # mod = loginModel
    # @api.marshal_with(mod, code=200, mask = {})
    @api.doc(description="api to handle user login to the GoCash app")
    def get(self, username, pwd):        
        try:
            db = get_database()
            UserInfoCollection = db["user_account"]
            user = UserInfoCollection.find_one({"userName": username})
            if user != None:
                if user["userPass"] == pwd:
                    return user["userId"] 
                else:
                    return "Invalid Credentials", 401
            else:
                return "Invalid user", 404
        except: 
            return "Failed to access db", 500


