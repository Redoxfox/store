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
 * Funciones para gestión de blog                                              *
 *****************************************************************************************/
/*********************************** 
 *Formulario nueva palabra blog    *
 **********************************/
function new_palabra(){
    let contenedor = document.getElementById("contenedor_principal");
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedor.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
        <div class="contenedor_primario_form">
            <h2 class="item_titulo">Registrar palabras</h2>
            <div class="contenedor_secundario">
                <div class="contenedor_info">
                    <h3>Registro palabras ingles</h3>
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
                            <label>Palabra ingles:</label>
                            <input type="text"  name = "english" >
                        </p>
                        <p>
                            <label>Palabra español:</label>
                            <input type="text"  name = "spanish" >
                        </p>

                        <p>
                            <label>Grupo:</label>
                            <select name="grupo" id="grupo">
                            </select>
                            <i></i>
                        </p>
                        <p>
                            <label >Ejemplos:</label>
                            <textarea name="ejemplos" id="ejemplos" cols="30" rows="5"></textarea>
                        </p>

                        <p>
                        <button type="submit" onclick="stopDefAction(event);">Enviar Registro</button>
                        </p>

                        <p class="item_form">
                            <div id = "new_topico"></div>
                        </p>
                        
                    </form>
                    
                </div>
            </div>
        </div>
        `
        grupos();
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
            <h2 class="item_titulo">Registrar palabras</h2>
            <div class="contenedor_secundario">
                <div class="contenedor_info">
                    <h3>Registro palabras ingles</h3>
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
                        <button type="submit" onclick="topicos(event);">Enviar Registro</button>
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

/*Llenar select grupos*/
function grupos(){
    const url = window.origin + "/grupos/" 
    let select = document.getElementById("grupo");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          select.options[key] = new Option(data[key].topico , data[key].id);
        }
    })
}


/*Formulario vocabulario*/ 
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

/*Formulario topicos*/
function topicos(evt) {
    evt.preventDefault();
    let topico = evt.target.form[0].value
    const url = window.origin + "/add_topico/";

    var entry = {
      topico: topico
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