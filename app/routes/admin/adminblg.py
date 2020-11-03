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

@app.route("/AddCategoryBlg/", methods=["POST"])
def AddCategoryBlg():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    name_category = req["name_category"]
        
    #id = None
    Insert_ofCategory= dict()
    Insert_ofCategory = {'TABLE':'blg_category',
        'Col1':'id',
        'Col2':'name',
        'Val3':'%s',
        'Val4':'%s'
    } 

    nombre_id = "id"
    nombre_tabla = "blg_category"
    id_max = connect.MAX_ID_TABLE(username, nombre_tabla  , nombre_id) 
    print(id_max[0]["max_id"])
    if id_max[0]["max_id"] == None:
        id_sig = "1"
    else:
        proximo_id = id_max[0]["max_id"] + 1
        id_sig = str(proximo_id)
  
    Data = [id_sig, name_category]
    
    ''' result["new_proveedor"] = name '''
    res_insert = connect.IT_TABLE(username, Insert_ofCategory, Data) 
    result = {"hola":2}
    
    return result

@app.route("/AddPostBlg/", methods=["POST"])
def AddPostBlg():
    Urlbase = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect = Model(username)   
    req = request.get_json()
    result = {}
    id_category = req["id_category"]
    id_users = req["id_users"]
    title_post = req["title_post"]
    date_post = req["date_post"]
    
        
    #id = None
    Insert_ofPost= dict()
    Insert_ofPost = {'TABLE':'post',
        'Col1':'id',
        'Col2':'title',
        'Col3':'image',
        'Col4':'created_at',
        'Col5':'status',
        'Col6':'user_id',
        'Col7':'category_id',
        'Val8':'%s',
        'Val9':'%s',
        'Val10':'%s',
        'Val11':'%s',
        'Val12':'%s',
        'Val13':'%s',
        'Val14':'%s'
    } 

    nombre_id = "id"
    nombre_tabla = "post"
    id_max = connect.MAX_ID_TABLE(username, nombre_tabla  , nombre_id) 
    print(id_max[0]["max_id"])
    if id_max[0]["max_id"] == None:
        id_sig = "1"
    else:
        proximo_id = id_max[0]["max_id"] + 1
        id_sig = str(proximo_id)

    img_name = "post"+id_sig+"user"+id_users+"catg"+id_category+".jpg"
    status = "1"

    Data = [id_sig, title_post, img_name, date_post, status, id_users, id_category ]
   
    res_insert = connect.IT_TABLE(username, Insert_ofPost, Data) 
    result = {"hola":2}
    
    return result

@app.route("/categories_blg/")
def categories_blg():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Categories= dict()
    Tabla_All_Categories = {'TABLE':'blg_category',
        'Col1':'id',
        'Col2':'name'
    }
   
    DatosAllCategories = connect.SSP_TABLE(username, Tabla_All_Categories)

    DatosAllCategories_json = json.dumps(DatosAllCategories) 

    print(DatosAllCategories)
    
    return (DatosAllCategories_json) 

@app.route("/users_blg/")
def users_blg():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    
    Tabla_All_Categories= dict()
    Tabla_All_Categories = {'TABLE':'blg_user',
        'Col1':'id',
        'Col2':'username'
    }
   
    DatosAllCategories = connect.SSP_TABLE(username, Tabla_All_Categories)

    DatosAllCategories_json = json.dumps(DatosAllCategories) 

    return (DatosAllCategories_json) 

@app.route("/change_media_server/", methods=["GET", "POST"])
def change_media_server():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
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
       #print(route_dir_files) 

    req = request.get_json()
    media_server = req["name_media_server"]
    media_bd = req["name_media_bd"]
    shutil.move(os.path.join(route_dir_files, media_server), route_dir_imgs)
    shutil.move(os.path.join(route_dir_imgs, media_bd), route_dir_files)
    os.rename(os.path.join(route_dir_imgs, media_server), os.path.join(route_dir_imgs, media_bd))
    os.rename(os.path.join(route_dir_files, media_bd), os.path.join(route_dir_files, media_server))
    
    Tabla_All_Media = dict()
    Tabla_All_Media = {'TABLE':'media',
        'Col1':'id',
        'Col2':'id_product',
        'Col3':'img',
        'Col4':'video',
        'Col5':'tipo'
    }

    DatosAllMedia = connect.SSP_TABLE(username, Tabla_All_Media)  
    DatosAllMedia_json = json.dumps(DatosAllMedia) 

    #return (DatosAllMedia_json) 

    ''' UPLOAD_FOLDER = route_dir_files
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','JPG'}

    def allowed_file(filename):
        arg_mtx = filename.split(".")
        if arg_mtx[1] in ALLOWED_EXTENSIONS:
            return True
        else:
            return False

    name_file = request.form["name_img"]
    file = request.files[name_file]
    print(file.filename)
    if file.filename == '':
        result = {"hola":"No has seleccionado ningun archivo"}
    else:
        #print(file.content_length)
        if allowed_file(file.filename)==True:
            result = {"hola":"Cambio de imagen se realizo con exito"}
            filename = secure_filename(file.filename)
            file.save(os.path.join(route_dir_files, filename))
            print(os.path.join(route_dir_files, filename))
            print(route_dir_imgs)
            
            shutil.move(os.path.join(route_dir_files, filename), route_dir_imgs)
            shutil.move(os.path.join(route_dir_imgs, name_file), route_dir_files)
            num_files = os.listdir(route_dir_files)
            name_temp = 'temp' + '-' + str(len(num_files))
            os.rename(os.path.join(route_dir_imgs, filename), os.path.join(route_dir_imgs, name_file))
            os.rename(os.path.join(route_dir_files, name_file), os.path.join(route_dir_files, name_temp))
        else:
            result = {"hola":"Formato de archivo no valido"} '''
    
    return DatosAllMedia_json

@app.route("/upload2/", methods=["GET", "POST"])
def upload2():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
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
       #print(route_dir_files) 

    UPLOAD_FOLDER = route_dir_files
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','JPG'}

    def allowed_file(filename):
        arg_mtx = filename.split(".")
        if arg_mtx[1] in ALLOWED_EXTENSIONS:
            return True
        else:
            return False

    name_file = request.form["name_img"]
    file = request.files[name_file]
    print(file.filename)
    if file.filename == '':
        result = {"hola":"No has seleccionado ningun archivo"}
    else:
        #print(file.content_length)
        if allowed_file(file.filename)==True:
            result = {"hola":"Cambio de imagen se realizo con exito"}
            filename = secure_filename(file.filename)
            file.save(os.path.join(route_dir_files, filename))
            print(os.path.join(route_dir_files, filename))
            print(route_dir_imgs)
            
            shutil.move(os.path.join(route_dir_files, filename), route_dir_imgs)
            shutil.move(os.path.join(route_dir_imgs, name_file), route_dir_files)
            num_files = os.listdir(route_dir_files)
            name_temp = 'temp' + '-' + str(len(num_files))
            os.rename(os.path.join(route_dir_imgs, filename), os.path.join(route_dir_imgs, name_file))
            os.rename(os.path.join(route_dir_files, name_file), os.path.join(route_dir_files, name_temp))
        else:
            result = {"hola":"Formato de archivo no valido"}
    
    return result

@app.route("/upload/", methods=["GET", "POST"])
def upload():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    result = {}
    result = {"hola":2}
    data = request.form
   

    print(data)
    print(type(data))
    #file = req["file"]
    """print(type(id_category))"""
    dir_act = os.getcwd()
    route_file_config = dir_act
    route_exist = route_file_config.find(ROOT_FILE)
    if route_exist > 0:
        route_dir_files = dir_act + "/app/static/upload/"
        print(route_dir_files)
    else:
       route_dir_files = dir_act + "/app/static/upload/"
       print(route_dir_files) 

    UPLOAD_FOLDER = route_dir_files
    ALLOWED_EXTENSIONS = {'txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif','JPG'}

    def allowed_file(filename):
        return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

    if request.method == 'POST':
        file = request.files['file']
        # check if the post request has the file part
        if 'file' not in request.files:
            return redirect(request.url)
        
        # if user does not select file, browser also
        # submit an empty part without filename
        if file.filename == '':
            return redirect(request.url) 

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(route_dir_files, filename))
            print(route_dir_files) 

    
    return redirect(url_for('admin', filename=filename))


@app.route("/img_post/")
def img_post():
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

@app.route('/all_media/', methods=['POST', 'GET'])
def all_media():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username)   
    Tabla_All_Media = dict()
    Tabla_All_Media = {'TABLE':'media',
        'Col1':'id',
        'Col2':'id_product',
        'Col3':'img',
        'Col4':'video',
        'Col5':'tipo'
    }

    DatosAllMedia = connect.SSP_TABLE(username, Tabla_All_Media)  
    DatosAllMedia_json = json.dumps(DatosAllMedia) 

    return (DatosAllMedia_json) 

@app.route("/media_server/", methods=["GET", "POST"])
def media_server():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
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
       #print(route_dir_files) 

    num_files = os.listdir(route_dir_files)
 
    result = {"hola":num_files}
    
    return result





  