from appApi.utils import app
from flask import Flask 
from appApi.routes.routes import *

ip = ""

if __name__ == "__main__":
    app.debug = True
    app.run(host=ip)