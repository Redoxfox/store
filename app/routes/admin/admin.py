from app import app, request, url_for, redirect
from app import app, render_template
from app.model.modeldb import Model
from app.static.lib import validaciones
import os
import json
from datetime import datetime, date
import re, shutil
from flask import jsonify
from werkzeug.utils import secure_filename





################################################################################################
#Validacion y cunfiguración de datos
################################################################################################
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
ROOT_FILE = CONFIG['DEFAULT']['ROOT_FILE']

#------------------------------------------------------------------------------------#
#Administrador
#------------------------------------------------------------------------------------#
@app.route("/admin/", methods=["GET", "POST"])
def admin():
    urlrev = URLBASE 
    username = CONFIG['TYPE_USER']['ROOT']
    return render_template("/admin/principal.html")


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

################################################################################################
# Metodos de selección 
################################################################################################

## Gestión base de datos #######################################################################

### Mostrar Tablas base de datos ###############
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


### Mostrar Estructura Tablas base de datos ###############
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

##Gestión tienda virtual ######################################################################
### Selección de categorias
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

### Selección de productos ####################################################################
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

### Selección de todos los productos store ####################################################
@app.route("/all_productos_store" , methods=["GET","POST"])
def all_productos_store():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Products = dict()
    Tabla_All_Products = {'TABLE':'products',
        'Col1':'id_product',
        'Col2':'name',
        'Col3':'precio'
    }
   
    DatosAllProducts = connect.SSP_TABLE(username, Tabla_All_Products)

    DatosAllProducts_json = json.dumps(DatosAllProducts) 
    
    return (DatosAllProducts_json) 

### Consultar datos producto por id ###########################################################
@app.route('/product_id/<id>/', methods=['POST', 'GET'])
def product_id(id):
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    wid = id
    TablaProduct = dict()
    TablaProduct = {'TABLE':'products',
        'Col1':'id_product ',
        'Col2':'id_proveedor',
        'Col3':'id_categoria',
        'Col4':'name',
        'Col5':'precio',
        'Col6':'descripcion',
        'Whe7':'id_product=%s'
        }
    Data = (wid,)

    DatosProductId = connect.SW_TABLE(username,TablaProduct, Data)

    DatosProductId_json = json.dumps(DatosProductId)

    return (DatosProductId_json)  


### Selección de todos los proveedores store ##################################################
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



################################################################################################
# Metodos de inserción de datos
################################################################################################

## Gestión tienda virtual ######################################################################

### Agregar nueva categoria ####################################################################
@app.route("/AddCategory/", methods=["GET","POST"])
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


### Agregar nueva media ######################################################################
@app.route("/AddMedia/", methods=["POST"])
def AddMedia():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    dir_act = os.getcwd()
    route_file_config = dir_act
    route_exist = route_file_config.find(ROOT_FILE)
    print(route_exist)
    if route_exist > 0:
        route_dir_files = dir_act + "/app/static/upload/"
        route_dir_imgs = dir_act + "/app/static/imgs/"
        print(route_dir_files)
    else:
       route_dir_files = dir_act + "/app/static/upload/"

    productos = req["productos"]
    media = req["media"]
    forma = req["forma"]    
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

    nombre_id = "id"
    nombre_tabla = "media"
    id_max = connect.MAX_ID_TABLE(username, nombre_tabla  , nombre_id) 
    proximo_id = id_max[0]["max_id"] + 1
    id_img = str(proximo_id)
    video = "img"+id_img+"m"+productos+".jpg"
    Data = [id, productos, media, video, forma]
    res_insert = connect.IT_TABLE(username, Insert_ofMedia, Data) 
    shutil.copy(os.path.join(route_dir_files, "default.jpg"), route_dir_imgs)
    os.rename(os.path.join(route_dir_imgs, "default.jpg"), os.path.join(route_dir_imgs, video))
    Tabla_All_Images = dict()
    Tabla_All_Images = {'TABLE':'media',
        'Col1':'media.id',
        'Col2':'products.name',
        'Col3':'media.img',
        'Col4':'media.video'
    }
    tables = dict()
    tables = {
        'table1':'media',
        'id_t1':'id_product',
        'table2':'products',
        'id_t2':'id_product'
    }
    list_images = connect.SINJ_TABLE(username, Tabla_All_Images, tables) 
    result = json.dumps(list_images)  
    return result


### Agregar nuevo proveedor ###################################################################
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

### Agregar nuevo producto ####################################################################
@app.route("/AddProduct", methods=["POST"])
def AddProduct():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    
    nombre_tabla = "products"
    nombre_id = "id_product"
    id_max = connect.MAX_ID_TABLE(username, nombre_tabla  , nombre_id) 
    proximo_id = id_max[0]["max_id"] + 1
    name_img_default = "img_product_" + str(proximo_id)
    if route_exist > 0:
        route_dir_files = dir_act + "/app/static/upload/"
        route_dir_imgs = dir_act + "/app/static/imgs/"
    else:
       route_dir_files = dir_act + "/app/static/upload/"

    shutil.copy(os.path.join(route_dir_files, "default.jpg"), route_dir_imgs)
    os.rename(os.path.join(route_dir_imgs, "default.jpg"), os.path.join(route_dir_imgs, name_img_default))
    
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
        'Col5':'media',
        'Col6':'precio',
        'Col7':'descripcion',
        'Val8':'%s',
        'Val9':'%s',
        'Val10':'%s',
        'Val11':'%s',
        'Val12':'%s',
        'Val13':'%s',
        'Val14':'%s'
    } 


    Data = [id, id_proveedor, id_categoria, producto, name_img_default, precio, descricion]
    result["new_proveedor"] = producto
    res_insert = connect.IT_TABLE(username, Insert_ofProduct, Data) 
    
    return result





################################################################################################
# Metodos de actualización de datos
################################################################################################

## Gestión tienda virtual ######################################################################

### Actualizar producto.


 