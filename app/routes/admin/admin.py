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

@app.route("/admin/", methods=["GET", "POST"])
def admin():
    urlrev = URLBASE 
    username = CONFIG['TYPE_USER']['ROOT']
    return render_template("/admin/principal.html")


@app.route("/tablas/", methods=["GET", "POST"])
def tablas():
    urlrev = URLBASE 
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username) 
    tablas = connect.SHOW_TABLES(username)
    print(tablas)
    nom_server = {}
    nom_server["server"] = server 
    tablas.append(nom_server)
    result = json.dumps(tablas)

    return (result)

@app.route("/validar", methods=["GET", "POST"])
def validar():
    urlrev = URLBASE 
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username) 
    if request.method == "POST":
        nick = request.form["username"]
        password = request.form["password"]
    
    wid = nick
    TSWusers = dict()
    TSWusers = {'TABLE': 'users', 
        'Col1': 'nick',
        'Col2': 'password',
        'Col3': 'salt',
        'Col4': 'tipo_user',
        'Whe5': 'nick=%s'
    }
         
    Data = (wid,)
    DatosUsers = connect.SW_TABLE(username, TSWusers, Data)
    if DatosUsers:
        password_userbd = DatosUsers[0]['password']
        salt_userbd = DatosUsers[0]['salt']
        tipo_user = DatosUsers[0]['tipo_user']
        hash= validaciones.Validar()
        h2=hash.check_password(password_userbd, password, salt_userbd)

        if h2 == True and tipo_user=="admin":
            #return render_template("/admin/principal.html")
            return redirect(url_for('admin'))
        else:
            return render_template("/registro/login.html") 
    else:
        return render_template("/registro/login.html")

@app.route("/Estructura_tabla/", methods=["POST"])
def Estructura_tabla():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    nombreTabla = req["nombreTabla"]
    campos_tabla = connect.DESCRIBE_TABLES(username,  nombreTabla)
    print (nombreTabla)
    estructura = json.dumps(campos_tabla)
    
    return (estructura)


@app.route("/AddCategory", methods=["GET","POST"])
def AddCategory():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    wid = req["category"]
    name = wid
    nombre_id = "id"
    nombre_tabla = "grupo"
    id = None
    Insert_ofgrupo = dict()
    Insert_ofgrupo = {'TABLE':'category',
            'Col1':'id_category',
            'Col2':'name',
            'Val3':'%s',
            'Val4':'%s'
    }
    Data = [id, name]
    result["new_category"] = wid 
    res_insert = connect.IT_TABLE(username, Insert_ofgrupo , Data) 
    
    return result

@app.route("/categories")
def categories():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Categories= dict()
    Tabla_All_Categories = {'TABLE':'category',
        'Col1':'id_category',
        'Col2':'name'
    }
   
    DatosAllCategories = connect.SSP_TABLE(username, Tabla_All_Categories)

    DatosAllCategories_json = json.dumps(DatosAllCategories) 
    
    return (DatosAllCategories_json) 


@app.route("/AddMedia/", methods=["POST"])
def AddMedia():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    productos = req["productos"]
    media = req["media"]
    forma = req["forma"] 

    if media == "1":
        img = "1"
        video = "0"
        name = "img" + img
    else:
        img = "0"
        video = "1"
        name = "video" + video

    if forma == "portada":
        tipo = "portada"
    else:
        tipo = "miniatura"
        
    id = None
    Insert_ofMedia = dict()
    Insert_ofMedia = {'TABLE':'media',
        'Col1':'id',
        'Col2':'id_product',
        'Col3':'img',
        'Col4':'video',
        'Col5':'tipo',
        'Val6':'%s',
        'Val7':'%s',
        'Val8':'%s',
        'Val9':'%s',
        'Val10':'%s'
    } 

    Data = [id, productos, img, video, tipo]
    result["new_proveedor"] = name
    res_insert = connect.IT_TABLE(username, Insert_ofMedia, Data)  
    print(productos, media, forma)
    """ name = req["name"]
    direccion = req["direccion"]
    telefono = req["telefono"]
    web = req["web"]
    email = req["email"] 
    id = None
    Insert_ofProveedor = dict()
    Insert_ofProveedor = {'TABLE':'proveedor',
        'Col1':'id_proveedor',
        'Col2':'name',
        'Col3':'direccion',
        'Col4':'telefono',
        'Col5':'web',
        'Col6':'email',
        'Val7':'%s',
        'Val8':'%s',
        'Val9':'%s',
        'Val10':'%s',
        'Val11':'%s',
        'Val12':'%s'
    } 


    Data = [id, name, direccion, telefono, web, email]
    result["new_proveedor"] = name
    res_insert = connect.IT_TABLE(username, Insert_ofProveedor, Data)  """
    
    return result



@app.route("/AddProveedor", methods=["POST"])
def AddProveedor():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    name = req["name"]
    direccion = req["direccion"]
    telefono = req["telefono"]
    web = req["web"]
    email = req["email"] 
    id = None
    Insert_ofProveedor = dict()
    Insert_ofProveedor = {'TABLE':'proveedor',
        'Col1':'id_proveedor',
        'Col2':'name',
        'Col3':'direccion',
        'Col4':'telefono',
        'Col5':'web',
        'Col6':'email',
        'Val7':'%s',
        'Val8':'%s',
        'Val9':'%s',
        'Val10':'%s',
        'Val11':'%s',
        'Val12':'%s'
    } 


    Data = [id, name, direccion, telefono, web, email]
    result["new_proveedor"] = name
    res_insert = connect.IT_TABLE(username, Insert_ofProveedor, Data) 
    
    return result

@app.route("/proveedores" , methods=["GET","POST"])
def proveedores():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Proveedores= dict()
    Tabla_All_Proveedores = {'TABLE':'proveedor',
        'Col1':'id_proveedor',
        'Col2':'name'
    }
   
    DatosAllProveedores = connect.SSP_TABLE(username, Tabla_All_Proveedores)

    DatosAllProveedores_json = json.dumps(DatosAllProveedores) 
    
    return (DatosAllProveedores_json) 



@app.route("/AddProduct", methods=["POST"])
def AddProduct():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    id_proveedor = req["id_proveedor"]
    id_categoria = req["id_categoria"] 
    producto = req["producto"]
    precio = req["precio"]
    descricion = req["descricion"]
    id = None
    Insert_ofProduct = dict()
    Insert_ofProduct = {'TABLE':'products',
        'Col1':'id_product',
        'Col2':'id_proveedor',
        'Col3':'id_categoria',
        'Col4':'name',
        'Col5':'precio',
        'Col6':'descripcion',
        'Val7':'%s',
        'Val8':'%s',
        'Val9':'%s',
        'Val10':'%s',
        'Val11':'%s',
        'Val12':'%s'
    } 


    Data = [id, id_proveedor, id_categoria, producto, precio, descricion]
    result["new_proveedor"] = producto
    res_insert = connect.IT_TABLE(username, Insert_ofProduct, Data) 
    
    return result

@app.route("/productos" , methods=["GET","POST"])
def productos():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Products = dict()
    Tabla_All_Products = {'TABLE':'products',
        'Col1':'id_product',
        'Col2':'name'
    }
   
    DatosAllProducts = connect.SSP_TABLE(username, Tabla_All_Products)

    DatosAllProducts_json = json.dumps(DatosAllProducts) 
    
    return (DatosAllProducts_json) 

@app.route("/add_palabra/", methods=["POST"])
def add_palabra():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    id = None
    english = req["english"].upper()
    spanish = req["spanish"].upper() 
    grupo = req["grupo"] 
    ejemplos = req["ejemplos"]
    
    
    wid = english
    TSWVocabulary = dict()
    TSWVocabulary = {'TABLE': 'vocabulary', 
        'Col1': 'english',
        'Whe2': 'english=%s'
    }
         
    Data = (wid,)
    DatosVocabulary = connect.SW_TABLE(username, TSWVocabulary, Data)

    if DatosVocabulary:
        result["new_topico"] = "Ya se encuentra registrado " + english + " en BD"
    else:
        Insert_ofvocabulary = dict()
        Insert_ofvocabulary = {'TABLE':'vocabulary',
            'Col1':'id',
            'Col2':'english',
            'Col3':'spanish',
            'Col4':'grupo',
            'Col5':'ejemplos',
            'Val6':'%s',
            'Val7':'%s',
            'Val8':'%s',
            'Val9':'%s',
            'Val10':'%s'
        }
        Data = [id,  english, spanish,  grupo, ejemplos]
        result["new_topico"] = "Registro exitoso"
        res_insert = connect.IT_TABLE(username,  Insert_ofvocabulary, Data) 
        
    return result




 