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
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Post = dict()
    Tabla_All_Post = {'TABLE':'post',
        'Col1':'post.id',
        'Col2':'post.title',
        'Col3':'post.image',
        'Col4':'post.created_at',
        'Col5':'blg_category.name',
        'Col6':'post.summary',
        'Col7':'post.category_id'
    }

    tables = dict()
    tables = {
        'table1':'post',
        'id_t1':'category_id',
        'table2':'blg_category',
        'id_t2':'id'
    }
    
    #DatosAllProveedores = connect.SSP_TABLE(username, Tabla_All_Proveedores)
    list_post = connect.SINJ_TABLE(username, Tabla_All_Post, tables) 

    #print(list_post)
    return render_template("/blog/blog.html", url = urlrev, all_post = list_post)

@app.route("/health/")
def health():
    urlrev = URLBASE
    return render_template("/blog/health.html", url = urlrev)

@app.route("/single/<id>/")
def single(id):
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)
    wid = id
    Tabla_All_Post = dict()
    Tabla_All_Post = {'TABLE':'post',
        'Col1':'post.id',
        'Col2':'post.title',
        'Col3':'post.image',
        'Col4':'post.created_at',
        'Col5':'blg_category.name',
        'Col6':'post.summary',
        'Col7':'post.category_id',
        'Whe8': 'post.id=%s'
    }    
    tables = dict()
    tables = {
        'table1':'post',
        'id_t1':'category_id',
        'table2':'blg_category',
        'id_t2':'id'
    }
    Data = (wid,)
    #DatosAllProveedores = connect.SSP_TABLE(username, Tabla_All_Proveedores)
    list_post_one = connect.SINJ_SW_TABLE(username, Tabla_All_Post, tables, Data) 
    print(list_post_one[0]["id"])
    name_post = "post_" + str(list_post_one[0]["id"]) + ".md"
    dir_md = os.getcwd()
    route_file_config = dir_md 
    route_exist = route_file_config.find("store")
    if route_exist > 0:
        route_file_config = dir_act + "/app/static/md/" + name_post
    else:
        route_file_config = dir_act + "/store/app/static/md/" + name_post
       
       
    #readme_file = open(".md", "r")
    f = open(route_file_config , "r")
    md_template_string = markdown.markdown(
        f.read(), extensions=["fenced_code"]
    )
    
    hola = {"post":1, "content":md_template_string }
    DatosAllMedia = json.dumps(hola) 

    print(type(md_template_string))
    return (DatosAllMedia)
    #return render_template("/blog/single.html", url = urlrev, datos_post = list_post_one, content_post =  html)