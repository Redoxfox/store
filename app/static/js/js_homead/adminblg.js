
/*********************************** 
*Formulario nuevo user blog       *
**********************************/
function new_userblg(){
    let contenedor = document.getElementById("contenedor_principal");
    let contenedorSecond = document.getElementById("nodoSecond");
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond); 
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedorSecond.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
        <div class="contenedor_primario_form">
            <h2 class="item_titulo">Registrar user blog</h2>
            <div class="contenedor_secundario">
                <div class="contenedor_info">
                    <h3>Registro Proveedor</h3>
                    <ul>
                        <li>Sandyvital Store</li>
                        <li>Salud y belleza</li>
                        <li>Productos de Calidad</li>
                        </br>
                        <div class="caja">
                            <div class="box">
                                <img src="/static/imgs/logo3.png" alt="">
                            </div>
                        </div>    
                    </ul>
                </div>
                <div class="contenedor_form">
                    <h3>Crear Nuevo User</h3>
                    <form id="form1">
                        <p>
                            <label>Name User:</label>
                            <input type="text"  name = "name" required>
                        </p>

                        <p>
                            <label>Last Name:</label>
                            <input type="text"  name = "lastname" required>
                        </p>

                        <p>
                            <label>User Name:</label>
                            <input type="text"  name = "username" required>
                        </p>

                        <p>
                            <label>Email:</label>
                            <input type="text"  name = "email" required>
                        </p>

                        <p>
                            <label>Password:</label>
                            <input type="password"  name = "password" required>
                        </p>

                        <p>
                            <label>Image:</label>
                            <input type="text"  name = "image" required>
                        </p>

                        <p>
                            <label>Created_at:</label>
                            <input type="date" id="fecha"  name='created_at' required>
                        </p>
                        
                        <p>
                            <button type="submit" onclick="AddUserBlg(event);">Agregar Nuevo</button>
                        </p> 
                   
                    </form>
                </div>
            </div>
        </div>
        `
}

/*Funcion para capturar evento formulario*/
function AddUserBlg(evt) {
    evt.preventDefault();
    let name_user = evt.target.form[0].value
    let lastname = evt.target.form[1].value
    let username = evt.target.form[2].value
    let email = evt.target.form[3].value
    let password = evt.target.form[4].value
    let image = evt.target.form[5].value
    let created_at = evt.target.form[6].value
    const url = window.origin +  "/AddUserBlg/";

  var entry = {
        name_user: name_user,
        lastname: lastname,
        username: username,
        email: email,
        password : password,
        image: image,
        created_at : created_at
    }; 

    fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(entry),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function (data) {
       
        evt.target.form[0].value = ""
        evt.target.form[1].value = ""
        evt.target.form[2].value = ""
        evt.target.form[3].value = ""
        evt.target.form[4].value = ""
        evt.target.form[5].value = ""
        evt.target.form[6].value = ""
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    }); 
}


/*********************************** 
*Formulario nueva categoria blog       *
**********************************/
function new_category_blg(){
    let contenedor = document.getElementById("contenedor_principal");
    let contenedorSecond = document.getElementById("nodoSecond");
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond);
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    contenedorSecond.appendChild(listId_contenedor);
    document.getElementById("nodoSecond").innerHTML =`
    <h4>Registrar Producto</h4>
    <div class="row">
        <form id="form1" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <label>Nombre Producto:</label>
                    <input type="text"  name = "category" >
                </div>
            </div>
            
            <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddCategoryBlg(event);">Add New
            </button>
           
        </form>
        <p class="item_form">
            <div id = "new_product"></div>
        </p>
    </div>`
}

/*Funcion para capturar evento formulario categoria blog*/
function AddCategoryBlg(evt) {
    evt.preventDefault();
    let name_category = evt.target.form[0].value
    const url = window.origin +  "/AddCategoryBlg/";
  


  var entry = {
        name_category: name_category
    }; 

    fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(entry),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function (data) {
        evt.target.form[0].value = ""
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    }); 
}

/*********************************** 
*Formulario nueva post blog       *
**********************************/
function new_post_blg(){
    let contenedor = document.getElementById("contenedor_principal");
    let contenedorSecond = document.getElementById("nodoSecond");
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond);
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    contenedorSecond.appendChild(listId_contenedor);
    document.getElementById("nodoSecond").innerHTML =`
    <h4>Registrar Post</h4>
    <div class="row">
        <form id="form1" class="col s12">
            <label>Categoria:</label>
            <select name="categoria" id="categories_blg" class = "stlselect">
            </select>

            <label>User:</label>
            <select name="users" id="users_blg" class = "stlselect">
            </select>

            <div class="row">
                <div class="input-field col s12">
                    <label>Titulo post:</label>
                    <input type="text"  name = "title" >
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input type="date"  name = "date" >
                </div>
            </div>
            
            <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddPostBlg(event);">Add New
            </button>
           
        </form>
        <p class="item_form">
            <div id = "new_product"></div>
        </p>
    </div>`
    
    categories_blg();
    users_blg();
}

/*Funcion para capturar evento formulario post blog*/
function AddPostBlg(evt) {
    evt.preventDefault();
    let id_category = evt.target.form[0].value
    let id_users = evt.target.form[1].value
    let title_post = evt.target.form[2].value
    let date_post = evt.target.form[3].value
    const url = window.origin +  "/AddPostBlg/";


  var entry = {
        id_category:id_category,
        id_users: id_users,
        title_post: title_post,
        date_post: date_post
    }; 

    fetch(url, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(entry),
      cache: "no-cache",
      headers: new Headers({
        "content-type": "application/json"
      })
    })
    .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function (data) {
        evt.target.form[0].value = ""
        evt.target.form[1].value = ""
        evt.target.form[2].value = ""
        evt.target.form[3].value = ""
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    }); 
}


/*Llenar select categories*/
function categories_blg(){
    const url = window.origin + "/categories_blg/" 
    let select = document.getElementById("categories_blg");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          select.options[key] = new Option(data[key].name , data[key].id);
        }
    })
}

/*Llenar select user*/
function users_blg(){
    const url = window.origin + "/users_blg/" 
    let select = document.getElementById("users_blg");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          select.options[key] = new Option(data[key].username , data[key].id);
        }
    })
}


/*********************************** 
*Formulario subir archivo servidor *
**********************************/
function new_file_blg(){
    let contenedor = document.getElementById("contenedor_principal");
    let contenedorSecond = document.getElementById("nodoSecond");
    const url = window.origin + "/upload/" 
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond);
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    contenedorSecond.appendChild(listId_contenedor);
    document.getElementById("nodoSecond").innerHTML =`
    <h4>Subir archivo a servidor</h4>
    <div class="row">
        <form id="form1" method="POST" enctype=multipart/form-data action="${url}" class="col s12" >
            <div class="row">
                <div class="input-field col s6">
                    <input class="btn waves-effect waves-light" type="file"  enctype="multipart/form-data" name = "file" >
                </div>
                <div class="input-field col s6">
                    <button class="btn waves-effect waves-light" type="submit" center-align">Add New
                    </button>
                </div>
            </div>
        </form>
        <p class="item_form">
            <div id = "new_product"></div>
        </p>
    </div>`
}

/*Funcion subir archivos al servidor*/
function AddFileServer(name_img) {
    let name_file = document.getElementById("formfile");
    let formData = new FormData(name_file);
    const url = window.origin +  "/upload2/";
    formData.append("name_img",name_img);
   
    fetch(url, {
      method: "POST",
      body: formData
    })
    .then(function (response) {
        if (response.status !== 200) {
            console.log(`Looks like there was a problem. Status code: ${response.status}`);
            return;
        }
        response.json().then(function (data) {
            console.log(data);
            
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    }); 
}

function Change_img_blg() {
    let contenedor = document.getElementById("contenedor_principal");
    let contenedorSecond = document.getElementById("nodoSecond");
    const url = window.origin + "/upload/" 
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond);
  /*   document.getElementById("nodoSecond").innerHTML =`
    <h4>Subir archivo a servidor</h4>
    <div class="container">
        <div class="row">
            <div class="col l4 m4 s12">
                <div class="card sticky-action">
                    <div class="card-image">
                        <img src="/static/imgs/imgbg/img_2.jpg">
                        <a class="btn red btn-floating halfway-fab pulse activator">
                            +
                        </a>
                    </div>
                    <div class="card-content">
                        <p>
                            Creando tarjeta para galeria.
                        </p>
                    </div>
                    <div class="card-reveal">
                        <span class="card-title">
                          Nuevo post.
                          <i class="right">X</i>
                        </span>
                        <p>
                            Creando tarjeta para galeria.
                        </p>
                    </div>
                    <div class="card-action">
                        <a>
                            Ver articulo completo.
                        </a>
                    </div>
                </div>
            </div>
        </div>   
    </div>` */

    const tablas = window.origin + "/all_media/" 

    fetch(tablas)
    .then(res => res.json())
    .then(data => {
        let contenedor = document.getElementById("contenedor_principal");
        let contenedorSecond = document.getElementById("nodoSecond");
        contenedor.removeChild(contenedorSecond);
        contenedorSecond = document.createElement('div');
        contenedorSecond.setAttribute("id","nodoSecond");
        contenedor.appendChild(contenedorSecond); 
        contenedorSecond.setAttribute("class","container")
        let $divcard1 = document.createElement('form');
        $divcard1.setAttribute("class", "row");
        $divcard1.setAttribute("id", "formfile");
        let $fragment_card = document.createDocumentFragment();
        let cont = 0
        for (const key in data) {
           if (data.hasOwnProperty(key)) {
              cont += 1 
              let key_table = Object.keys(data[key])
              let value_key_table3 = key_table[3]
              let value_key_table = key_table[0]
              let nombre_img = data[key][value_key_table3]
              let nombre_tabla = data[key][value_key_table]
              let $imgcard1 = document.createElement('img');
              let $spancard1 = document.createElement('span');
              let num_card_img = "card_img_" + String(cont)
              let $divcard2 = document.createElement('div');
              let $divcard3 = document.createElement('div');
              let $divcard4 = document.createElement('div');
              let $divcard5 = document.createElement('div');
              let $divcard6 = document.createElement('div');
              let $divcard7 = document.createElement('div');
              let $icard1 = document.createElement('i');
              let $acard1 = document.createElement('a');
              let $acard2 = document.createElement('a');
              let $ipcard2 = document.createElement('input');
              let $pcard1 = document.createElement('p');
              //let $pcard2 = document.createElement('p');
              let func_addfile = "AddFileServer('"+nombre_img+"')";
              let func_show_images = "media_server('"+num_card_img+"','"+nombre_img+"')"
              url_img = "/static/imgs/" + nombre_img 
              $imgcard1.setAttribute("src",url_img);
              $imgcard1.setAttribute("id",nombre_img);
              $ipcard2.setAttribute("type","file");
              $ipcard2.setAttribute("name",nombre_img);
              $ipcard2.setAttribute("enctype" ,"multipart/form-data");
              $ipcard2.textContent = "Change imagen ...";
              $ipcard2.setAttribute("id","change_imagen");
              $acard1.setAttribute("class","btn red btn-floating halfway-fab pulse activator");
              $acard1.textContent = "+";
              $acard1.setAttribute("onclick",func_show_images);
              $acard2.setAttribute("class","waves-effect waves-light btn-small");
              $acard2.textContent = "Upload file";
              $acard2.setAttribute("onclick",func_addfile);
              $spancard1.setAttribute("class","card-title");
              $spancard1.textContent = "Nuevo post.";
              $pcard1.textContent = "Aqui deben ir las imagenes.";
              $icard1.setAttribute("class","right");
              $divcard2.setAttribute("class", "col l4 m4 s12");
              $divcard3.setAttribute("class", "card sticky-action");
              $divcard4.setAttribute("class", "card-image");
              $divcard5.setAttribute("class", "card-content");
              $divcard6.setAttribute("id", num_card_img);
              $divcard6.setAttribute("class", "card-reveal");
              $divcard7.setAttribute("class", "card-action");
              //$divcard1.appendChild($divcard2);
              $divcard2.appendChild($divcard3);
              $divcard3.appendChild($divcard4);
              $divcard4.appendChild($imgcard1);
              $divcard4.appendChild($acard1);
              $divcard3.appendChild($divcard5);
              $divcard5.appendChild($pcard1);
              $divcard3.appendChild($divcard6);
              $divcard6.appendChild($spancard1);
              $spancard1.appendChild($icard1);
              //$divcard6.appendChild($pcard2);
              $divcard3.appendChild($divcard7);
              $divcard7.appendChild($ipcard2);
              $divcard7.appendChild($acard2);
              $fragment_card.appendChild($divcard2);
            }  
        }
        $divcard1.appendChild($fragment_card);
        contenedorSecond.appendChild($divcard1);
        //contenedorSecond.appendChild($collapsible);

    })
}

async function media_server(id,id2){
    try {
        let $contenedor = document.getElementById(id);
        let $divimages = document.createElement('div');
        $divimages.setAttribute("class", "row")
        let $fragment_card = document.createDocumentFragment();
        const url_media_server = window.origin + "/media_server/";
        const media_server = await fetch(url_media_server);
        const data = await media_server.json();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const files = data[key];
                for (let index = 0; index < files.length; index++) {
                    const element = files[index];
                    let change_media_server = "change_media_server('"+element+"','"+id2+"')" 
                    let $divimagex = document.createElement('div');
                    let $imagexserver = document.createElement('img');
                    $divimagex.setAttribute("class","col s6 m6")
                    url_img_file = "/static/upload/" + element 
                    $imagexserver.setAttribute("src",url_img_file)
                    $imagexserver.setAttribute("onclick",change_media_server);
                    $imagexserver.setAttribute("class","materialboxed responsive-img separador")
                    $divimagex.appendChild($imagexserver)
                    $fragment_card.appendChild($divimagex)
                } 
            }
        }
        $divimages.appendChild($fragment_card);
        $contenedor.appendChild($divimages);
    } catch (error) {
        console.log(error);
    }
}

async function change_media_server(name_media_server,name_media_bd){
    try {
        let entry = {
            name_media_server:name_media_server,
            name_media_bd: name_media_bd
        }; 
        const url_media_server = window.origin + "/change_media_server/";
        const media_server = await fetch(url_media_server,{
            method: "POST",
            credentials: "include",
            body: JSON.stringify(entry),
            cache: "no-cache",
            headers: new Headers({
              "content-type": "application/json"
            })
          });
        const data = await media_server.json();
    } catch (error) {
        console.log(error);
    }
  }



