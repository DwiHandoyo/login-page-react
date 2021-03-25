import requests
import time
import flask
import json
from flask import request, jsonify,Response,send_from_directory
from flask_cors import CORS
import sqlite3
import datetime
import pandas as pd

app = flask.Flask(__name__)
app.config["DEBUG"] = True
CORS(app)

lastTime= datetime.datetime.now()

@app.route('/signUp', methods=['POST'])
def signUp() -> str:
        if request.headers['Content-Type'] == 'application/json':
                userEmail=json.loads(json.dumps(request.json))['userEmail']
                userPass=json.loads(json.dumps(request.json))['userPass']
                firstName=json.loads(json.dumps(request.json))['firstName']
                lastName=json.loads(json.dumps(request.json))['lastName']
                phoneNumber=json.loads(json.dumps(request.json))['phoneNumber']
                gender=json.loads(json.dumps(request.json))['gender']
                birthDay=json.loads(json.dumps(request.json))['birthDay']
        print(userEmail+' '+userPass)
        try:
                con = sqlite3.connect('user.db')   
                c = con.cursor()
                c.execute('''CREATE TABLE userData
                        (ID INTEGER PRIMARY KEY AUTOINCREMENT, userEmail text, userPass text, firstName text, lastName text, phoneNumber text, gender text, birthday date)''')
        except Exception as e:
                print(e)
                con.rollback()
                msg = "error in insert operation"     
        finally:
                with sqlite3.connect("user.db") as con:
                        cur = con.cursor()
                        c.execute("SELECT userEmail FROM userData WHERE userEmail = (?)",(userEmail,))
                        data=c.fetchall()
                        print(data)
                        if data:
                                msg = "Email is already registered"
                        else :
                                cur.execute("INSERT INTO userData (userEmail,userPass,firstName,lastName, phoneNumber,gender, birthDay) VALUES (?,?,?,?,?,?,?)",(userEmail,userPass,firstName,lastName,phoneNumber,gender,birthDay))
                                con.commit()
                                msg = "Success"
                                # con.close()
                print(msg)
        out={"message":msg}
        return jsonify(out)

@app.route('/logIn', methods=['POST'])
def logIn() -> str:
        print(request)
        if request.headers['Content-Type'] == 'application/json':
                userEmail=json.loads(json.dumps(request.json))['userEmail']
                userPass=json.loads(json.dumps(request.json))['userPass']

        print(userEmail+' '+userPass)
        try:
                con = sqlite3.connect('user.db')   
                c = con.cursor()
        except Exception as e:
                print(e)
                con.rollback()
 
        finally:
                with sqlite3.connect("user.db") as con:
                        cur = con.cursor()
                        c.execute("SELECT userEmail,userPass FROM userData WHERE userEmail = (?)",(userEmail,))
                        data=c.fetchall()
                        print(data)
                        if data:
                                if data[0][1] == userPass:
                                        msg="Success"
                                else:
                                        msg="Password didn't match"
                                
                        else :
                                msg = "User ID didn't registered"
                                # con.close()
                print(msg)
        out={"message":msg}
        return jsonify(out)


@app.route('/getName', methods=['POST'])
def getName() -> str:
        print(request)
        if request.headers['Content-Type'] == 'application/json':
                userEmail=json.loads(json.dumps(request.json))['userEmail']

        try:
                con = sqlite3.connect('user.db')   
                c = con.cursor()
        except Exception as e:
                print(e)
                con.rollback()
 
        finally:
                with sqlite3.connect("user.db") as con:
                        cur = con.cursor()
                        c.execute("SELECT firstName,lastName FROM userData WHERE userEmail = (?)",(userEmail,))
                        data=c.fetchall()
                        print(data)
                        msg = ' '.join(data[0])
                print(msg)
        out={"message":msg}
        return jsonify(out)


if __name__ == '__main__':
    app.run(debug=True,host='localhost', port=5000)

