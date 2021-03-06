## Installation

prereq: need python3 and nodejs installed and expo cli (npm install --global expo-cli)

- inside the backend folder run "pip install -r requirements.txt"
- inside the app folder run "npm install"
- inside the atm folder run "npm install"



download the expo go app on the app store to emulate the app

## Setup network configurations

- connect to wifi on computer and same wifi on phone
- set wifi to private on computer by right clicking on the wifi connection, going to properties and changing to private
- update the ip on all the components at the top of each file (ipconfig on the terminal and fine the corresponding ip for the wifi network)
  - inside the backend folder, update the ip in app.py
  - inside the app folder, update the ip in /api/mock.js
  - inside the atm folder, update the ip in /src/components/QRscanner.js

## Start all the components

on 3 seperate terminals

- start backend inside the backend folder with "python app.py"
- then start app inside the app folder with "expo start"
- then start atm inside the atm folder with "npm start"

once the components are started

- test if backend working by going to: http://{ip}:5000/api/dummy
- test if app working by going to: http://localhost:19002, then scanning the QR code from that page on the expo go app to open it on your phone
- test if atm working by going to: http://localhost:3000
