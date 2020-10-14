from app import app, request, url_for, redirect
from app import app, render_template
from app.model.modeldb import Model
from app.static.lib import validaciones
import os
import json
from datetime import datetime, date
import re
from flask import jsonify

dir_act = os.getcwd()
route_file_config = dir_act 
route_exist = route_file_config.find("store")
if route_exist > 0:
    route_file_config = dir_act + "/app/config/config.json"
    server = "server"
else:
    route_file_config = dir_act + "/store/app/config/config.json"
    server = "server"

f = open(route_file_config , "r")
file = f.read()
CONFIG = json.loads(file)
MODODESARROLLO = 'DEFAULT'
URLBASE = CONFIG['DEFAULT']['URLBASE']

@app.route("/AddUserBlg/", methods=["GET","POST"])
def AddUserBlg():
    urlrev = URLBASE 
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    print(connect)
    req = request.get_json()
    #result = {}
    #wid = req["name_user"]
    id = None
    ''' let name_user = evt.target.form[0].value
    let lastname = evt.target.form[1].value
    let username = evt.target.form[2].value
    let email = evt.target.form[3].value
    let password = evt.target.form[4].value
    let image = evt.target.form[5].value
    let created_at = evt.target.form[6].value '''
    name_user = req["name_user"]
    lastname = req["lastname"]
    user_name = req["username"] 
    email = req["email"]
    password = req["password"]
    image = req["image"]
    created_at = req["created_at"]
    result = {}
        
    Insert_ofblg_user = dict()
    Insert_ofblg_user = {'TABLE':'blg_user',
        'Col1':'id',
        'Col2':'name',
        'Col3':'lastname',
        'Col4':'username',
        'Col5':'email',
        'Col6':'password',
        'Col7':'image',
        'Col8':'created_at',
        'Val9':'%s',
        'Val10':'%s',
        'Val11':'%s',
        'Val12':'%s',
        'Val13':'%s',
        'Val14':'%s',
        'Val15':'%s',
        'Val16':'%s'

    }
    Data = [id,  name_user, lastname,  user_name, email, password, image, created_at]
    result["new_topico"] = "Registro exitoso"
    res_insert = connect.IT_TABLE(username,  Insert_ofblg_user, Data)  
        
    return result





  