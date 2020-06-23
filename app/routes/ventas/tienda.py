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


@app.route("/images" , methods=["GET","POST"])
def images():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Images= dict()
    Tabla_All_Images = {'TABLE':'products',
        'Col1':'id_product',
        'Col2':'name',
        'Col3':'media',
        'Col4':'precio'
    }
   
    DatosAllImages = connect.SSP_TABLE(username, Tabla_All_Images)

    DatosAllImages_json = json.dumps(DatosAllImages) 
    
    return (DatosAllImages_json) 

#Consultar servicios prestados
@app.route('/ver_product/<id>/', methods=['POST', 'GET'])
def ver_product(id):
    urlrev = URLBASE
    return render_template("/home/depilW.html", url = urlrev) 
