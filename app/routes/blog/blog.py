from app import app, request, url_for, redirect
from app import app, render_template
import json
from app.model.modeldb import Model
from app.static.lib import validaciones
import os
import json
from datetime import datetime, date
import re
from flask import jsonify
import markdown
import markdown.extensions.fenced_code


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

@app.route("/ejemplomd/")
def ejemplomd():
    dir_md = os.getcwd()
    route_file_config = dir_md 
    route_exist = route_file_config.find("store")
    if route_exist > 0:
        route_file_config = dir_act + "/app/static/md/prueba.md"
        route_file_rm = dir_act + "/app/static/md/sport_new.md"
        nombre_nuevo = dir_act + "/app/static/md/sport_26.md"
        os.rename(route_file_rm, nombre_nuevo)
        server = "server"
    else:
        route_file_config = dir_act + "/store/app/static/md/prueba.md"
        route_file_rm = dir_act + "/app/static/md/sport_new.md"
        nombre_nuevo = dir_act + "/app/static/md/sport_26.md"
        os.rename(route_file_rm, nombre_nuevo)
        server = "server"
       
    #readme_file = open(".md", "r")
    f = open(route_file_config , "r")
    md_template_string = markdown.markdown(
        f.read(), extensions=["fenced_code"]
    )
    
    hola = {"post":1, "content":md_template_string }
    DatosAllMedia = json.dumps(hola) 

    print(type(md_template_string))
    
    

    return hola

@app.route("/blog/")
def blog():
    urlrev = URLBASE
    return render_template("/blog/blog.html", url = urlrev)

@app.route("/health/")
def health():
    urlrev = URLBASE
    return render_template("/blog/health.html", url = urlrev)

@app.route("/single/")
def single():
    urlrev = URLBASE
    return render_template("/blog/single.html", url = urlrev)