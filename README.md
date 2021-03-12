# Proyecto Personal E-Commerce

Repositorio proyecto personal (E-Commerce).

Este repositorio es un emprendimiento personal el cual tiene como finalidad crear un E-Commerce y al mismo tiempo ir reforzando mis conocimientos mientras construyo e integro las herramientas necesarias para su gestion y administracion en el momento he logrado implementar boton de facebook y whatsapp uploap de archivos para actualizacion de automatica de imagenes. Y en un futuro cercano la idea es implementar una pasarela de pago y asociarme con una empresa de envios e implementar un sistema de pago contraentrega que funcione a nivel nacional.

Tecnologias frontend:

HTML
Javascript
CSS

Tecnologias backend:

Frameword Flask (python)
Python

Bases de datos:

Mysql

Sistema operativo 

Linux (distribucion Centos 7)

Plataforma de despliege (DigitalOcean Droplet Ubuntu)

Visita sitio web:

___
[Proyecto Personal E-Commerce](https://www.sandyvitalstore.com/)

                 
            






def IT_TABLE(self):
        list_column = []
        list_values = []
        cont=0
        list_column.append("INSERT INTO ")
        list_values.append(" VALUES(")
        for items in self.Datos_table:
            valor = self.Datos_table[items]
            if items=="TABLE":
                Cadena = valor + "("
                list_column.append(Cadena)
            else:
                cont+=1
                num_col="Col" + str(cont)
                num_value="Val" + str(cont)
                if items == num_col:
                    Cadena = valor + ","
                    list_column.append(Cadena)
                if items == num_value:
                    Cadena = valor + ","
                    list_values.append(Cadena)

        Colunm= ' '.join(list_column)
        lenColunm = len(Colunm)
        ultimaCol = Colunm[lenColunm-1]
        if ultimaCol==",":
           Colunm=Colunm[0:lenColunm-1]
           Colunm = Colunm + ")"
        else:
           Colunm = Colunm + ")"

        Values= ' '.join(list_values)
        lenValues = len(Values)
        ultimaVal = Values[lenValues-1]
        if ultimaVal == ",":
           Values=Values[0:lenValues-1]
           Values = Values + ");"
        else:
           Values = Values + ");"

        result = Colunm + Values

        return result


    def SSP_TABLE(self):
        list_column = []
        list_table = []
        cont=0
        list_column.append("SELECT ")
        for items in self.Datos_table:
            valor = self.Datos_table[items]
            if items=="TABLE":
                Cadena = valor + ";"
                list_table.append(Cadena)
            else:
                cont+=1
                num_col="Col" + str(cont)
                if items == num_col:
                    Cadena = valor + ","
                    list_column.append(Cadena)

        Colunm= ' '.join(list_column)
        lenColunm = len(Colunm)
        ultimaCol = Colunm[lenColunm-1]
        if ultimaCol==",":
           Colunm=Colunm[0:lenColunm-1]
           Colunm = Colunm + " FROM "
        else:
           Colunm = Colunm + " FROM "

        Values= ' '.join(list_table)
        result = Colunm + Values

        return result

    def SW_TABLE(self):
        list_column = []
        list_table = []
        list_where = []
        cont=0
        list_column.append("SELECT ")
        for items in self.Datos_table:
            valor = self.Datos_table[items]
            if items=="TABLE":
                Cadena = valor + " "
                list_table.append(Cadena)
            else:
                cont+=1
                num_col="Col" + str(cont)
                num_whe="Whe" + str(cont)
                if items == num_col:
                    Cadena = valor + ","
                    list_column.append(Cadena)
                if items == num_whe:
                    Cadena = valor
                    list_where.append(Cadena)


        Colunm= ' '.join(list_column)
        lenColunm = len(Colunm)
        ultimaCol = Colunm[lenColunm-1]
        if ultimaCol==",":
           Colunm=Colunm[0:lenColunm-1]
           Colunm = Colunm + " FROM "
        else:
           Colunm = Colunm + " FROM "

        Values= ' '.join(list_table)

        Wheres= ' '.join(list_where)
        lenWheres= len(Wheres)
        ultimaVal = Wheres[lenWheres-1]
        if ultimaVal == ",":
           Wheres=Wheres[0:lenWheres-1]
           Wheres= Wheres + ";"
        else:
           Wheres = Wheres + ";"

        result = Colunm + Values + "WHERE " + Wheres

        return result

    def DELWT_TABLE(self):
        list_column = []
        list_table = []
        list_where = []
        cont=0
        list_column.append("DELETE FROM ")
        for items in self.Datos_table:
            valor = self.Datos_table[items]
            if items=="TABLE":
                Cadena = valor + " " 
                list_table.append(Cadena)
            else:
                cont+=1
                num_whe="Whe" + str(cont)
                if items == num_whe:
                    Cadena = valor
                    list_where.append(Cadena)


        Colunm= ' '.join(list_column)
        lenColunm = len(Colunm)
        ultimaCol = Colunm[lenColunm-1]
        """if ultimaCol==",":
           Colunm=Colunm[0:lenColunm-1]
           Colunm = Colunm + " SET "
        else:
           Colunm = Colunm + " SET " """

        Values= ' '.join(list_table)

        Wheres= ' '.join(list_where)
        lenWheres= len(Wheres)
        ultimaVal = Wheres[lenWheres-1]
        if ultimaVal == ",":
           Wheres=Wheres[0:lenWheres-1]
           Wheres= Wheres + ";"
        else:
           Wheres = Wheres + ";"

        result = Colunm +  Values + "WHERE " + Wheres

        return result


    def UPT_TABLE(self):
        list_column = []
        list_values = []
        list_where = []
        cont=0
        list_column.append("UPDATE ")
        for items in self.Datos_table:
            valor = self.Datos_table[items]
            if items=="TABLE":
                Cadena = valor + " SET "
                list_column.append(Cadena)
            else:
                cont+=1
                num_value="Val" + str(cont)
                num_whe="Whe" + str(cont)
                if items == num_value:
                    Cadena = valor + ","
                    list_values.append(Cadena)
                if items == num_whe:
                    Cadena = valor
                    list_where.append(Cadena) 

        Colunm = ' '.join(list_column)
        Values = ' '.join(list_values)
        Wheres = ' '.join(list_where)
        lenValues = len(Values)
        lenWheres = len(Wheres)
        ultimaVal = Wheres[lenWheres-1]
        ultimaValue = Values[lenValues-1]

        print(Values)
       
        if ultimaVal == ",":
           Wheres=Wheres[0:lenWheres-1]
           Wheres= Wheres + ";"
        else:
           Wheres = Wheres + ";"
        
        if ultimaValue == ",":
            Values = Values[0:lenValues-1]
        else:
           Values = Values 

        result = Colunm + Values + " WHERE " + Wheres

        return result

        #return result

        CREATE TABLE crucigrama (id INT PRIMARY KEY,  grupo INT NOT NULL, palabras TEXT);
        INSERT INTO crucigrama (id, grupo, palabras) VALUES (1, 1,""); 

        CREATE TABLE vocabulary (id INT PRIMARY KEY,  english VARCHAR(50) NOT NULL, spanish VARCHAR(50) NOT NULL, grupo INT NOT NULL, ejemplos TEXT);

        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (1, "LIVINGROOM", "SALA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (2, "KITCHEN", "COCINA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (3, "BED", "CAMA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (4, "GARAGE", "GARAGE", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (5, "ATTIC", "ATICO", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (6, "DRESSER", "MESANOCHE", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (7, "FLOOR", "PISO", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (8, "SOAP", "JABÓN", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (9, "CAN", "LATA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (10, "SINK", "LAVAPLATOS", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (11, "SOFA", "SOFA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (12, "TABLE", "MESA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (13, "CHAIR", "SILLA", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (14, "STOOL", "BANCO", 1,""); 
        INSERT INTO vocabulary (id, english, spanish, grupo, ejemplos) VALUES (15, "BOWL", "TAZON", 1,""); 

Media de proyecto 

media + tipo + id + ubicación + ".formato"

mediav1p.formato
https://www.sandyvitalstore.com/


UPDATE media SET media  = "img3m7.jpg"  WHERE id_product>=7 and id_product<10;

id | id_product | img      | video        | tipo      |

 UPDATE media SET id_product= 1, img ="spa", video="img1m1.jpg",   tipo="miniatura"  WHERE id=1;
 UPDATE media SET id_product= 4, img ="1 " , video="img2m4.jpg",   tipo="miniatura"  WHERE id=2;
 UPDATE media SET id_product= 7, img ="1 " , video="img3m7.jpg",   tipo="miniatura"  WHERE id=3;
 UPDATE media SET id_product=11, img ="1 " , video="img4m11.jpg",  tipo="miniatura"  WHERE id=4;
 UPDATE media SET id_product=10, img ="1 " , video="img5m10.jpg",  tipo="miniatura"  WHERE id=5;
 UPDATE media SET id_product=14, img ="1 " , video="img6m14.jpg",  tipo="miniatura"  WHERE id=6;
 UPDATE media SET id_product=17, img ="1 " , video="img7m17.jpg",  tipo="miniatura"  WHERE id=7;
 UPDATE media SET id_product=21, img ="1 " , video="img8m21.jpg",  tipo="miniatura"  WHERE id=8;
 UPDATE media SET id_product=13, img ="1 " , video="img9m13.jpg",  tipo="miniatura"  WHERE id=9;
10   1 img ="Dorzo"   , video="img10m1.jpg",  tipo="miniatura"
11   1 img ="Pecho"   , video="img11m1.jpg",  tipo="miniatura"
12   1 img ="Precios" , video="img12m1.jpg",  tipo="miniatura"
13   1 img ="spa"     , video="img13m1.jpg",  tipo="miniatura"
14   2 img ="spa"     , video="img14m2.jpg",  tipo="miniatura"
15   2 img ="Dorzo"   , video="img15m2.jpg",  tipo="miniatura"
16   2 img ="Pecho"   , video="img16m2.jpg",  tipo="miniatura"
17   2 img ="Precios" , video="img17m2.jpg",  tipo="miniatura"
18   2 img ="Oficina" , video="img18m2.jpg",  tipo="miniatura"
19   3 img ="spa"     , video="img19m3.jpg",  tipo="miniatura"
20   3 img ="Dorzo"   , video="img20m3.jpg",  tipo="miniatura"
21   3 img ="Pecho"   , video="img21m3.jpg",  tipo="miniatura"
22   3 img ="Precios" , video="img22m3.jpg",  tipo="miniatura"
23   3 img ="Oficina" , video="img23m3.jpg",  tipo="miniatura"
24   4 img ="Precios" , video="img24m4.jpg",  tipo="miniatura"
25   5 img ="Precios" , video="img25m5.jpg",  tipo="miniatura"
26   6 img ="Precios" , video="img26m6.jpg",  tipo="miniatura"
27   7 img ="cuerpo"  , video="img27m7.jpg",  tipo="miniatura"
28   7 img ="Taza"    , video="img28m7.jpg",  tipo="miniatura"
29   7 img ="Precios" , video="img29m7.jpg",  tipo="miniatura"
30   8 img ="cuerpo"  , video="img30m8.jpg",  tipo="miniatura"
31   8 img ="Taza"    , video="img31m8.jpg",  tipo="miniatura"
32   8 img ="Precios" , video="img32m8.jpg",  tipo="miniatura"
33   9 img ="cuerpo"  , video="img33m9.jpg",  tipo="miniatura"
34   9 img ="Taza"    , video="img34m9.jpg",  tipo="miniatura"
35   9 img ="Precios" , video="img35m9.jpg",  tipo="miniatura"
36  10 img ="products", video="img36m10.jpg", tipo="miniatura"
37  10 img ="chica"   , video="img37m10.jpg", tipo="miniatura"
38  11 img ="cuerpo"  , video="img38m11.jpg", tipo="miniatura"
39  11 img ="precios" , video="img39m11.jpg", tipo="miniatura"
40  12 img ="cuerpo"  , video="img40m12.jpg", tipo="miniatura"
41  12 img ="precios" , video="img41m12.jpg", tipo="miniatura"
42  13 img ="precio"  , video="img42m13.jpg", tipo="miniatura"
43  14 img ="precio"  , video="img43m14.jpg", tipo="miniatura"
44  15 img ="precio"  , video="img44m15.jpg", tipo="miniatura"
45  16 img ="precio"  , video="img45m16.jpg", tipo="miniatura"
46  17 img ="Kit"     , video="img46m17.jpg", tipo="miniatura"
47  18 img ="Kit"     , video="img47m18.jpg", tipo="miniatura"
48  19 img ="Kit"     , video="img48m19.jpg", tipo="miniatura"
49  20 img ="Kit"     , video="img49m20.jpg", tipo="miniatura"
50  21 img ="Manos"   , video="img50m21.jpg", tipo="miniatura"
51  22 img ="Manos"   , video="img51m22.jpg", tipo="miniatura"
52  23 img ="Manos"   , video="img52m23.jpg", tipo="miniatura"

create table blg_category(
	id int not null auto_increment primary key,
	name varchar(255)
);

create table blg_user(
	id int not null auto_increment primary key,
	name varchar(50),
	lastname varchar(50),
	username varchar(50),
	email varchar(255),
	password varchar(60),
	image varchar(255),
	status int default 1,
	kind int default 1, 
	created_at datetime
);

create table post(
	id int not null auto_increment primary key,
	title varchar(255),
	brief varchar(511),
	content text,
	image varchar(255),
	created_at datetime,
	status int default 1,
	user_id int not null,
	category_id int not null
);