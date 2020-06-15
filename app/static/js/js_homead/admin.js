/*****************************************************************************************
 * Funciones para gestión de base de datos                                               *
 *****************************************************************************************/
/*********************************** 
 *Describir tablas base de datos   *
 **********************************/
function describir(id) {
    let contenedor = document.getElementById(id);
    let listId_contenedor = document.createElement('div');
    var id_tabla = "tabla" + id
    listId_contenedor.setAttribute("id", id_tabla);
    listId_contenedor.classList.add("estructura_tabla"); 
    contenedor.appendChild(listId_contenedor);
    document.getElementById(id_tabla).innerHTML =`
        <div class="cabecera">Campo</div>
        <div class="cabecera">Tipo</div> 
        <div class="cabecera">Nulo</div>
        <div class="cabecera">Clave</div>  
        <div class="cabecera">Defecto</div>   
        <div class="cabecera">Extra</div>
    ` 
    const url = window.origin + "/Estructura_tabla/";
    var entry = {
        nombreTabla: id
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
            cont = 0 
            let contenedor_t = document.getElementById(id_tabla);
            pintado = contenedor.childElementCount
            if (pintado == 2) {
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                       /*console.log(key)*/
                       if (key != 0) {
                        let Campo = document.createElement('div');
                        let id_Campo = "Campo" + key
                        Campo.setAttribute("id", id_Campo);
                        Campo.classList.add("estructura_tabla"); 
                        Campo.textContent = data[key].Field
                        contenedor_t.appendChild(Campo);
                        let Tipo = document.createElement('div');
                        let id_Tipo  = "Tipo" + key
                        Tipo.setAttribute("id", id_Tipo);
                        Tipo.classList.add("estructura_tabla"); 
                        Tipo.textContent = data[key].Type
                        contenedor_t.appendChild(Tipo);
                        let Nulo = document.createElement('div');
                        let id_Nulo  = "Nulo" + key
                        Nulo.setAttribute("id", id_Nulo);
                        Nulo.classList.add("estructura_tabla"); 
                        Nulo.textContent = data[key].Null
                        contenedor_t.appendChild(Nulo);
                        let Clave = document.createElement('div');
                        let id_Clave  = "Clave" + key
                        Clave.setAttribute("id", id_Clave);
                        Clave.classList.add("estructura_tabla"); 
                        Clave.textContent = data[key].Key
                        contenedor_t.appendChild(Clave);
                        
                        let Defecto = document.createElement('div');
                        let id_Defecto  = "Defecto" + key
                        Defecto.setAttribute("id", id_Defecto);
                        Defecto.classList.add("estructura_tabla"); 
                        Defecto.textContent = data[key].Default
                        contenedor_t.appendChild(Defecto);
                        let Extra = document.createElement('div');
                        let id_Extra  = "Extra" + key
                        Extra.setAttribute("id", id_Extra);
                        Extra.classList.add("estructura_tabla"); 
                        Extra.textContent = data[key].Extra
                        contenedor_t.appendChild(Extra);
                       } 
                    }  
                 }
            } else {
                contenedor = document.getElementById(id);
                id_tabla = "tabla" + id
                contenedor_t = document.getElementById(id_tabla);
                contenedor.removeChild(contenedor_t);
                listId_contenedor.setAttribute("id", id_tabla);
                listId_contenedor.classList.add("estructura_tabla"); 
                contenedor.appendChild(listId_contenedor);
                document.getElementById(id_tabla).innerHTML =`
                    <div class="cabecera">Campo</div>
                    <div class="cabecera">Tipo</div> 
                    <div class="cabecera">Nulo</div>
                    <div class="cabecera">Clave</div>  
                    <div class="cabecera">Defecto</div>   
                    <div class="cabecera">Extra</div>
                ` 
                contenedor_t = document.getElementById(id_tabla);
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                       /*console.log(key)*/
                       if (key != 0) {
                        let Campo = document.createElement('div');
                        let id_Campo = "Campo" + key
                        Campo.setAttribute("id", id_Campo);
                        Campo.classList.add("estructura_tabla"); 
                        Campo.textContent = data[key].Field
                        contenedor_t.appendChild(Campo);
                        let Tipo = document.createElement('div');
                        let id_Tipo  = "Tipo" + key
                        Tipo.setAttribute("id", id_Tipo);
                        Tipo.classList.add("estructura_tabla"); 
                        Tipo.textContent = data[key].Type
                        contenedor_t.appendChild(Tipo);
                        let Nulo = document.createElement('div');
                        let id_Nulo  = "Nulo" + key
                        Nulo.setAttribute("id", id_Nulo);
                        Nulo.classList.add("estructura_tabla"); 
                        Nulo.textContent = data[key].Null
                        contenedor_t.appendChild(Nulo);
                        let Clave = document.createElement('div');
                        let id_Clave  = "Clave" + key
                        Clave.setAttribute("id", id_Clave);
                        Clave.classList.add("estructura_tabla"); 
                        Clave.textContent = data[key].Key
                        contenedor_t.appendChild(Clave);
                        
                        let Defecto = document.createElement('div');
                        let id_Defecto  = "Defecto" + key
                        Defecto.setAttribute("id", id_Defecto);
                        Defecto.classList.add("estructura_tabla"); 
                        Defecto.textContent = data[key].Default
                        contenedor_t.appendChild(Defecto);
                        let Extra = document.createElement('div');
                        let id_Extra  = "Extra" + key
                        Extra.setAttribute("id", id_Extra);
                        Extra.classList.add("estructura_tabla"); 
                        Extra.textContent = data[key].Extra
                        contenedor_t.appendChild(Extra);
                       } 
                    }  
                 }
            }
          
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    });
}

/*********************************** 
 *Mostrar tablas de base de datos  *
 **********************************/
function ver_tablas(){
    const tablas = window.origin + "/tablas/" 

    fetch(tablas)
    .then(res => res.json())
    .then(data => {
       for (const key in data) {
           if (data.hasOwnProperty(key)) {
              let key_table = Object.keys(data[key])
              value_key_table = key_table[0]
              let nombre_tabla = data[key][value_key_table]
              let contenedor = document.getElementById("contenedor_principal");
              let listId_contenedor = document.createElement('div');
              listId_contenedor.setAttribute("id", nombre_tabla);
              listId_contenedor.classList.add("contenedor_tabla"); 
              contenedor.appendChild(listId_contenedor);
              document.getElementById(nombre_tabla).innerHTML =`
              <div class="nombre_tabla">
                  <div>Nombre Tabla: </div>
                  <div>${nombre_tabla}</div>
                  <div></div>
                  <div class="icon">
                      <img class="img_icon" onclick="describir('${nombre_tabla}')" src="${window.origin}/static/imgs/edit.png">
                      <img class="img_icon" onclick="cerrar('${nombre_tabla}')"  src="${window.origin}/static/imgs/error.png">   
                  </div>
              </div>
              `
            }  
        }
    })
}

/*****************************************************************************************
 * Funciones para gestión de tienda                                            *
 *****************************************************************************************/
/*********************************** 
 *Formulario nueva categoria   *
 **********************************/
function new_category(){
    let contenedor = document.getElementById("contenedor_principal");
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedor.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
        <div class="contenedor_primario_form">
            <h2 class="item_titulo">Registrar Categorias</h2>
            <div class="contenedor_secundario">
                <div class="contenedor_info">
                    <h3>Registro Categorias</h3>
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
                    <h3>Crear Nueva Categoria</h3>
                    <form id="form1">
                      
                        <p>
                            <label>Nombre Categoria:</label>
                            <input type="text"  name = "category" >
                        </p>

                        <p>
                            <label>Categorias:</label>
                            <select name="category" id="categories">
                            </select>
                            <i></i>
                        </p>

                        <p>
                            <button type="submit" onclick="AddCategory(event);">Agregar Nuevo</button>
                        </p> 
                        <p class="item_form">
                            <div id = "new_category"></div>
                        </p>
                    </form>
                    
                </div>
            </div>
        </div>
        `
        categories();
}

/*Formulario agregar nuevas categorias*/
function AddCategory(evt) {
    evt.preventDefault();
    let category = evt.target.form[0].value
    const url = window.origin + "/AddCategory/";

    var entry = {
        category : category 
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
        console.log(data)
        document.getElementById("new_category").innerHTML =`
          ${data.new_category}
        `
        evt.target.form[0].value = ""
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    });
}

/*Llenar select categories*/
function categories(){
    const url = window.origin + "/categories" 
    let select = document.getElementById("categories");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          select.options[key] = new Option(data[key].name , data[key].id_category);
        }
    })
}

/*********************************** 
 *Formulario nuevo proveedor       *
 **********************************/
function new_proveedor(){
    let contenedor = document.getElementById("contenedor_principal");
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedor.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
        <div class="contenedor_primario_form">
            <h2 class="item_titulo">Registrar Proveedor</h2>
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
                    <h3>Crear Nuevo Proveedor</h3>
                    <form id="form1">
                      
                        <p>
                            <label>Nombre Proveedor:</label>
                            <input type="text"  name = "category" >
                        </p>

                        <p>
                            <label>Direccion:</label>
                            <input type="text"  name = "direccion" >
                        </p>

                        <p>
                            <label>Telefono:</label>
                            <input type="text"  name = "telefono" >
                        </p>

                        <p>
                            <label>Web:</label>
                            <input type="text"  name = "web" >
                        </p>

                        <p>
                            <label>email:</label>
                            <input type="text"  name = "email" >
                        </p>


                        <p>
                            <label>Proveedores:</label>
                                <select name="proveedor" id="proveedores">
                                </select>
                            <i></i>
                        </p>

                        <p>
                            <button type="submit" onclick="AddProveedor(event);">Agregar Nuevo</button>
                        </p> 
                        <p class="item_form">
                            <div id = "new_proveedor"></div>
                        </p>
                    </form>
                    
                </div>
            </div>
        </div>
        `
        proveedores();
}

/*Formulario agregar nuevo proveedor*/
function AddProveedor(evt) {
    evt.preventDefault();
    let name_proveedor = evt.target.form[0].value
    let direccion = evt.target.form[1].value
    let telefono = evt.target.form[2].value
    let web = evt.target.form[3].value
    let email = evt.target.form[4].value
    const url = window.origin +  "/AddProveedor";


  var entry = {
        name : name_proveedor,
        direccion: direccion,
        telefono: telefono,
        web: web,
        email : email
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
        console.log(data)
        document.getElementById("new_proveedor").innerHTML =`
          ${data.new_proveedor}
        `
        evt.target.form[0].value = ""
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    }); 
}

/*Llenar select proveedores*/
function proveedores(){
    const url = window.origin + "/proveedores" 
    let select = document.getElementById("proveedores");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          select.options[key] = new Option(data[key].name , data[key].id_proveedor);
        }
    })
}

/*********************************** 
 *Formulario nuevo producto         *
 **********************************/
function new_product(){
    let contenedor = document.getElementById("contenedor_principal");
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedor.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
        <div class="contenedor_primario_form">
            <h2 class="item_titulo">Registrar Proveedor</h2>
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
                    <h3>Crear Nuevo Proveedor</h3>
                    <form id="form1">
                      
                        <p>
                            <label>Proveedor:</label>
                            <select name="proveedor" id="proveedores">
                            </select>
                        </p>

                        <p>
                            <label>Categoria:</label>
                            <select name="categoria" id="categories">
                            </select>
                        </p>

                        <p>
                            <label>Nombre Producto:</label>
                            <input type="text"  name = "producto" >
                        </p>

                        <p>
                            <label>Precio Producto:</label>
                            <input type="text"  name = "Precio" >
                        </p>

                        <p>
                            <label>Descricion Producto:</label>
                            <textarea name="descricion" rows="5" cols="49">Write something here</textarea>
                        </p>


                        <p>
                            <label>Productos:</label>
                                <select name="productos" id="productos">
                                </select>
                            <i></i>
                        </p>

                        <p>
                            <button type="submit" onclick="AddProduct(event);">Agregar Nuevo</button>
                        </p> 
                        <p class="item_form">
                            <div id = "new_product"></div>
                        </p>
                    </form>
                    
                </div>
            </div>
        </div>
        `
        proveedores();
        categories();
        productos();
}

/*Formulario agregar nuevas categorias*/
function AddProduct(evt) {
    evt.preventDefault();
    let proveedor = evt.target.form[0].value
    let categoria = evt.target.form[1].value
    let producto = evt.target.form[2].value
    let precio = evt.target.form[3].value
    let descricion = evt.target.form[4].value
    const url = window.origin +  "/AddProduct";
    console.log(proveedor)
    console.log(categoria)
    console.log(producto)
    console.log(precio)
    console.log(descricion)

   var entry = {
        id_proveedor : proveedor,
        id_categoria : categoria,
        producto : producto,
        precio : precio,
        descricion : descricion
    }; 

    //console.log(entry)

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
        console.log(data)
        document.getElementById("new_product").innerHTML =`
          ${data.new_proveedor}
        `
        evt.target.form[2].value = ""
        evt.target.form[3].value = ""
        evt.target.form[4].value = ""
        });
    })
    .catch(function (error) {
        console.log("Fetch error: " + error);
    });   
}

/*Llenar select categories*/
function productos(){
    const url = window.origin + "/productos" 
    let select = document.getElementById("productos");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          select.options[key] = new Option(data[key].name , data[key].id_proveedor);
        }
    })
}


/*********************************** 
 *Formulario nuevo topico de palabras blog    *
 **********************************/
function new_topic(){
    let contenedor = document.getElementById("contenedor_principal");
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedor.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
        <div class="contenedor_primario_form">
            <h2 class="item_titulo">Registrar Palabras</h2>
            <div class="contenedor_secundario">
                <div class="contenedor_info">
                    <h3>Registro Palabras Ingles</h3>
                    <ul>
                        <li>Proyecto</li>
                        <li>Sopa letras</li>
                        <li>Insertar palabras</li>
                        <div class="caja">
                            <div class="box">
                                <img src="/static/imgs/sopa.jpg" alt="">
                            </div>
                        </div>    
                    </ul>
                </div>
                <div class="contenedor_form">
                    <h3>Agregar palabra vocabulario</h3>
                    <form id="form1">
                        <p class="item_form">
                            <label>Nombre Topico:</label>
                            <input type="text"  name = "topico" >
                        </p>
                        <p>
                            <button type="submit" onclick="AddCategory(event);">Enviar Registro</button>
                        </p>
                        <p class="item_form">
                            <div id = "new_topico"></div>
                        </p>
                    </form>
                </div>
            </div>
        </div>
          `
}




//Formulario vocabulario
function stopDefAction(evt) {
    evt.preventDefault();
    let english = evt.target.form[0].value
    let spanish = evt.target.form[1].value
    let grupo = evt.target.form[2].value
    let ejemplos = evt.target.form[3].value
    const url = window.origin + "/add_palabra/";
    var entry = {
        english: english,
        spanish: spanish,
        grupo:grupo,
        ejemplos:ejemplos
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
          console.log(data)
          document.getElementById("new_topico").innerHTML =`
            ${data.new_topico}
          `
          evt.target.form[0].value = ""
          evt.target.form[1].value = ""
          evt.target.form[3].value = ""
          });
      })
      .catch(function (error) {
          console.log("Fetch error: " + error);
      });
} 




/*****************************************************************************************
 * Funciones para animar elementos HTML                                                  *
 *****************************************************************************************/
function ocultar(id) {
    let submenu = document.getElementById(id);
    submenu.style.display = "none";
}

function mostrar(id) {
    let submenu = document.getElementById(id);
    submenu.style.display = "block";
}

function cerrar(id){
    let contenedor = document.getElementById(id);
    var id_tabla = "tabla" + id
    let contenedor_t = document.getElementById(id_tabla);
    contenedor.removeChild(contenedor_t);
}