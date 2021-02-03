from app import app, render_template
from app.model.modeldb import Model
import os
import json
dir_act = os.getcwd()
route_file_config = dir_act 
route_exist = route_file_config.find("store")
if route_exist > 0:
    route_file_config = dir_act + "/app/config/config.json"
else:
    route_file_config = dir_act + "/store/app/config/config.json"

f =open(route_file_config,"r")
file=f.read()
CONFIG = json.loads(file)
MODODESARROLLO = 'DEFAULT'
URLBASE = CONFIG['DEFAULT']['URLBASE']

print(dir_act)
print(os.path.isfile(route_file_config))
print(os.path.isdir('app/config'))

@app.route("/")
def index():
    urlrev = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username) 
    wid = "1"
    TablaServicioAutomotor = dict()
    TablaServicioAutomotor = {'TABLE':'products',
        'Col1':'id_product',
        'Col2':'id_proveedor',
        'Col3':'id_categoria',
        'Col4':'name',
        'Col5':'precio',
        'Col6':'descripcion',
        'Whe7':'id_product=%s'
        }
    Data = (wid,)
   
    url_product = "/home/product" + "_" + wid + ".html"
    DatosServicioV = connect.SW_TABLE(username,TablaServicioAutomotor, Data)
    print(DatosServicioV)
    id_pdt = "/static/imgs/img_product_"+wid+".jpeg"
    
    return render_template("/home/index.html", url = urlrev, Oferta_Servicio = DatosServicioV, id_pdt = id_pdt)

@app.route("/perfil")
def perfil():

    Sql="ddasddf"
    url = URLBASE
    username = CONFIG['TYPE_USER']['ROOT']
    connect=Model(username)   
    Nick = "Redoxfox"
    TSWusers = dict()
    TSWusers = {'TABLE':'users',
        'Col1':'nick',
        'Col2':'password',
        'Col3':'salt',
        'Whe4':'nick=%s'
        }
    Data = (Nick,)
    DatosUsers = connect.SW_TABLE(username,TSWusers,Data)
    
    return render_template("/home/perfil.html", url=url, lista = DatosUsers)