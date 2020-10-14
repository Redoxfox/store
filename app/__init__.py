from flask import Flask, render_template, request, url_for, redirect

app = Flask(__name__)

#Rutas de administracion 
from app.routes.admin import view
from app.routes.admin import admin
from app.routes.admin import adminblg
from app.routes.admin import login
from app.routes.admin import registro
from app.routes.admin import validar

#Rutas de ventas
from app.routes.ventas import tienda

#Rutas de blog
from app.routes.blog import blog



