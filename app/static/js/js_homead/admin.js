/*****************************************************************************************
 * Funciones para gestión de base de datos                                               *
 *****************************************************************************************/
/*********************************** 
 *Describir tablas base de datos   *
 **********************************/
function describir(id) {
    let contenedor = document.getElementById(id);
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
            id_tabla = "tabla" + id
            pintado = contenedor.childElementCount
            if (pintado == 2) { 
                let $table = document.createElement('table');
                let $thead_tb = document.createElement('thead');
                let $tr_tb_enc = document.createElement('tr');
                let $tbody = document.createElement('tbody');
                $tr_tb_enc.innerHTML =`
                <th>Campo</th>
                <th>Tipo</th>
                <th>Nulo</th>
                <th>Clave</th>
                <th>Defecto</th>
                <th>Extra</th>` 
                $table.appendChild($thead_tb);
                $thead_tb.appendChild($tr_tb_enc);
                var id_tabla = "tabla" + id
                $table.setAttribute("id", id_tabla);
                $table.classList.add("center"); 
                contenedor.appendChild($table);
                for (const key in data) {
                    if (data.hasOwnProperty(key)) {
                       /*console.log(key)*/
                       const elements = [];
                       if (key != 0) {
                        let $fragment_tr = document.createElement('tr');
                        let Campo = document.createElement('td');
                        let Tipo = document.createElement('td');
                        let Nulo = document.createElement('td');
                        let Clave = document.createElement('td');
                        let Defecto = document.createElement('td');
                        let Extra = document.createElement('td');
                        Campo.textContent = data[key].Field;
                        Tipo.textContent = data[key].Type;
                        Nulo.textContent = data[key].Null;
                        Clave.textContent = data[key].Key;
                        Defecto.textContent = data[key].Default;
                        Extra.textContent = data[key].Extra;
                        elements.push(Campo)
                        elements.push(Tipo)
                        elements.push(Nulo)
                        elements.push(Clave)
                        elements.push(Defecto)
                        elements.push(Extra)

                        elements.forEach(function(el){
                            $fragment_tr.appendChild(el)
                        })

                        $tbody.appendChild($fragment_tr);
                       } 
                    } 
                }
                $table.appendChild($tbody); 
            }else { 
                    id_tabla = "tabla" + id
                    let eliminarUltimo = document.querySelector(`#${id_tabla}`)
                    contenedor.removeChild(eliminarUltimo)
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
        let contenedor = document.getElementById("contenedor_principal");
        let contenedorSecond = document.getElementById("nodoSecond");
        contenedor.removeChild(contenedorSecond);
        contenedorSecond = document.createElement('div');
        contenedorSecond.setAttribute("id","nodoSecond");
        contenedor.appendChild(contenedorSecond); 
        let $collapsible = document.createElement('ul');
        $collapsible.setAttribute("class","collapsible")
        let $fragment = document.createDocumentFragment();
        for (const key in data) {
           if (data.hasOwnProperty(key)) {
              let key_table = Object.keys(data[key])
              value_key_table = key_table[0]
              let nombre_tabla = data[key][value_key_table]
              let $licollapsible = document.createElement('li');
              let $div1collapsible = document.createElement('div');
              let $div2collapsible = document.createElement('div');
              let $div3collapsible = document.createElement('div');
              let $icon1collapsible = document.createElement('i');
              let $icon2collapsible = document.createElement('i');
              let nombre_tabla1 = "describir('"+nombre_tabla+"')";
              $licollapsible.setAttribute("onclick",nombre_tabla1);
              $licollapsible.setAttribute("id",nombre_tabla);
              $div1collapsible.setAttribute("class","collapsible-header");
              $div3collapsible.textContent = nombre_tabla;
              $div2collapsible.setAttribute("class", "collapsible-body");
              $div2collapsible.textContent = nombre_tabla;
              $icon1collapsible.setAttribute("class", "material-icons");
              $icon1collapsible.textContent = "storage";
              $icon2collapsible.setAttribute("class", "right material-icons");
              $icon2collapsible.textContent = "expand_more";
              $div1collapsible.appendChild($icon1collapsible);
              $div1collapsible.appendChild($div3collapsible);
              $div1collapsible.appendChild($icon2collapsible);
              $licollapsible.appendChild($div1collapsible);
              $licollapsible.appendChild($div2collapsible);
              $fragment.appendChild($licollapsible);
            }  
        }
        
        $collapsible.appendChild($fragment);
        contenedorSecond.appendChild($collapsible);

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
    let contenedorSecond = document.getElementById("nodoSecond");
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond); 
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    listId_contenedor.classList.add("body_form"); 
    contenedorSecond.appendChild(listId_contenedor);
    document.getElementById("nodoSecond").innerHTML =`
    <h4 class="item_titulo">Registrar Categorias</h4>
    <div class="row">
        <form id="form1" class="col s12">
          <div class="row">
            <div class="input-field col s12">
                <label>Nombre Categoria:</label>
                <input type="text"  name = "category" >
            </div>
          
          </div>
          
          <select name="category" id="categories" class = "stlselect">
            
          </select>
          <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddCategory(event);">Add New
          </button>
         
        </form>
        <p class="item_form">
            <div id = "new_category">
            </div>
        </p>
    </div>`

    categories();
}

/*Formulario agregar nuevas categorias*/
function AddCategory(evt) {
    evt.preventDefault();
    console.log(evt)
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
    let contenedorSecond = document.getElementById("nodoSecond");
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond); 
    let listId_contenedor = document.createElement('div');
    listId_contenedor.setAttribute("id", "form");
    contenedorSecond.appendChild(listId_contenedor);
    document.getElementById("form").innerHTML =`
    <h4 class="item_titulo">Registrar Proveedores</h4>
    <div class="row">
        <form id="form1" class="col s12">
            <div class="row">
                <div class="input-field col s12">
                    <label>Nombre Proveedor:</label>
                    <input type="text"  name = "category" >
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <label>Direccion:</label>
                    <input type="text"  name = "direccion" >
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <label>Telefono:</label>
                    <input type="text"  name = "telefono" >
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <label>Web:</label>
                    <input type="text"  name = "web" >
                </div>
            </div>
            <div class="row">
                <div class="input-field col s12">
                    <label>email:</label>
                    <input type="text"  name = "email" >
                </div>
            </div>
            <label>Proveedores:</label>
            <select name="proveedor" id="proveedores" class = "stlselect">

            </select>
            <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddProveedor(event);">Add New
            </button>     
        </form> 
        <p class="item_form">
        <div id = "new_proveedor"></div>
    </p>               
    </div>`
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
            <label>Proveedor:</label>
            <select name="proveedor" id="proveedores" class = "stlselect">
            </select>

            <label>Categoria:</label>
            <select name="categoria" id="categories" class = "stlselect">
            </select>

            <div class="row">
                <div class="input-field col s12">
                    <label>Nombre Producto:</label>
                    <input type="text"  name = "producto" >
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <label>Precio Producto:</label>
                    <input type="text"  name = "Precio" >
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <label>Descricion Producto:</label>
                    <textarea name="descricion" rows="5" cols="49">Write something here</textarea>
                </div>
            </div>

            <label>Productos:</label>
            <select name="productos" id="productos" class = "stlselect">
            </select>
            
            <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddProduct(event);">Add New
            </button>
           
        </form>
        <p class="item_form">
            <div id = "new_product"></div>
        </p>
    </div>`

        proveedores();
        categories();
        productos();
}

/*Formulario agregar nuevas categorias*/
function AddProduct(evt) {
    evt.preventDefault();
    console.log(evt)
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

/*Tabla*/

function tabla(){
    // Ahora dibujamos la tabla
const $cuerpoTabla = document.querySelector("#cuerpoTabla");
// Recorrer todos los productos
productos.forEach(producto => {
    // Crear un <tr>
    const $tr = document.createElement("tr");
    // Creamos el <td> de nombre y lo adjuntamos a tr
    let $tdNombre = document.createElement("td");
    $tdNombre.textContent = producto.nombre; // el textContent del td es el nombre
    $tr.appendChild($tdNombre);
    // El td de precio
    let $tdPrecio = document.createElement("td");
    $tdPrecio.textContent = producto.precio;
    $tr.appendChild($tdPrecio);
    // El td del código
    let $tdCodigo = document.createElement("td");
    $tdCodigo.textContent = producto.codigo;
    $tr.appendChild($tdCodigo);
    // Finalmente agregamos el <tr> al cuerpo de la tabla
    $cuerpoTabla.appendChild($tr);
    // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
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
          select.options[key] = new Option(data[key].name , data[key].id_product);
        }
    })
}

/*Llenar select categories*/
function productosid(){
    const url = window.origin + "/productosid" 
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
 *Formulario nueva imagen producto  *
 **********************************/
function new_media(){
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
    <h4 class="item_titulo">Registrar Media</h4>
    <div class="row">
        <form id="form1" class="col s12">
      
            <label>Producto:</label>
            <select name="productos" id="productos" class = "stlselect">
            </select>
            
            <div class="row">
                <div class="input-field col s12">
                    <label>Nombre Imagen:</label>
                    <input type="text"  name="Media" >
                </div>
            </div>
          
            <label>Forma Media:</label>
            <select name="Forma" id="Forma" class = "stlselect">
                <option value="miniatura">Miniatura</option> 
            </select>
               
            <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddMedia(event);">Add New
            </button>
             
            
        </form>
        <p class="item_form">
            <div id = "new_category"></div>
        </p>
    </div>
    <table id = "mytable">
    <thead>
        <tr>
            <th>Id</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Video</th>
        </tr>
    </thead>
    <tbody id="cuerpoTabla">
        <tr id = "campos" >
            <td>Id</td>
            <td>Imagen</td>
            <td>Nombre</td>
            <td>Video</td>
        </tr>
    </tbody>
    </table>
        `
        productos();
}

/*Formulario agregar nuevas categorias*/
function AddMedia(evt) {
    evt.preventDefault();
    let producto = evt.target.form[0].value
    let media = evt.target.form[1].value
    let forma = evt.target.form[2].value
    const url = window.origin+"/AddMedia/";
    console.log(url);

    var entry = {
        productos : producto, 
        media : media,
        forma : forma
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
        let contenedor = document.getElementById("cuerpoTabla");
        contenedor.remove( );
        
        for (const key in data) {
            let mytable = document.getElementById("mytable");
            let tbody = document.createElement("tbody");
            tbody.setAttribute("id", "cuerpoTabla");
            mytable.appendChild(tbody);
            const cuerpoTabla = document.querySelector("#cuerpoTabla");
            const tr = document.createElement("tr");
             // El td del código
            let tdid = document.createElement("td");
            tdid.textContent = data[key].id;
            tr.appendChild(tdid);
          
            let tdNombre = document.createElement("td");
            tdNombre.textContent = data[key].name; // el textContent del td es el nombre
            tr.appendChild(tdNombre);

            let tdimg = document.createElement("td");
            tdimg.textContent = data[key].img;
            tr.appendChild(tdimg);

            let tdvideo = document.createElement("td");
            tdvideo.textContent = data[key].video; // el textContent del td es el nombre
            tr.appendChild(tdvideo);
          
            // Finalmente agregamos el <tr> al cuerpo de la tabla
            cuerpoTabla.appendChild(tr);
            // Y el ciclo se repite hasta que se termina de recorrer todo el arreglo
          }
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

/****************************************** 
*Funcion para mostrar elementos de tablas
*******************************************/

async function show_lists(){
    let contenedor = document.getElementById("contenedor_principal");
    let contenedorSecond = document.getElementById("nodoSecond");
    const url = window.origin + "/upload/" 
    contenedor.removeChild(contenedorSecond);
    contenedorSecond = document.createElement('div');
    contenedorSecond.setAttribute("id","nodoSecond");
    contenedor.appendChild(contenedorSecond);
  
    try {
        let entry = {
            name_media_server:'hola'
        }; 
        const url_media_server = window.origin + "/all_productos_store";
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
        console.log(data)
        let contenedor = document.getElementById("contenedor_principal");
        let contenedorSecond = document.getElementById("nodoSecond");
        let $fragment_tbody = document.createDocumentFragment();
        contenedor.removeChild(contenedorSecond);
        contenedorSecond = document.createElement('div');
        contenedorSecond.setAttribute("id","nodoSecond");
        contenedor.appendChild(contenedorSecond); 
        contenedorSecond.setAttribute("class","container")
        let $table = document.createElement('table');
        let $thead = document.createElement('thead');
        let $tr = document.createElement('tr');
        let $th_id = document.createElement('th');
        let $th_name = document.createElement('th');
        let $th_precio = document.createElement('th');
        let $tbody = document.createElement('tbody');
        $th_id.textContent = "id";
        $th_name.textContent = "name";
        $th_precio.textContent = "precio";
        contenedorSecond.appendChild($table);
        $table.appendChild($thead);
        $thead.appendChild($tr);
        $tr.appendChild($th_id);
        $tr.appendChild($th_name);
        $tr.appendChild($th_precio);
        console.log(data)
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
               let key_table = Object.keys(data[key])
               let value_key_id = data[key]['id_product'];
               let value_key_name = data[key]['name'];
               let value_key_precio = data[key]['precio'];
               let $tr_fill = document.createElement('tr');
               let $td_id = document.createElement('td');
               let $td_name = document.createElement('td');
               let $td_price = document.createElement('td');
               let $td_edit = document.createElement('td');
               let $a_boton = document.createElement('a');
               let $i_boton = document.createElement('i');
               let func_edit_product = "edit_product('"+value_key_id+"')";
               $a_boton.setAttribute("class","btn-floating btn-large cyan pulse");
               $i_boton.setAttribute("class","material-icons");
               $i_boton.textContent = "edit"
            //    <a class="btn-floating btn-large cyan pulse"><i class="material-icons">edit</i></a>
               $a_boton.appendChild($i_boton);
               $td_edit.appendChild($a_boton);
               $a_boton.setAttribute("onclick",func_edit_product);
               $td_id.textContent = value_key_id;
               $td_name.textContent = value_key_name;
               $td_price.textContent = value_key_precio;
               $tr_fill.appendChild($td_id);
               $tr_fill.appendChild($td_name);
               $tr_fill.appendChild($td_price);
               $tr_fill.appendChild($td_edit);
               $fragment_tbody.appendChild($tr_fill);
             }  

         } 
         $table.appendChild($tbody);
         $tbody.appendChild($fragment_tbody);
        /* let cont = 0
        <table>
        <thead>
          <tr>
              <th>Name</th>
              <th>Item Name</th>
              <th>Item Price</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Alvin</td>
            <td>Eclair</td>
            <td>$0.87</td>
          </tr>
          <tr>
            <td>Alan</td>
            <td>Jellybean</td>
            <td>$3.76</td>
          </tr>
          <tr>
            <td>Jonathan</td>
            <td>Lollipop</td>
            <td>$7.00</td>
          </tr>
        </tbody>
      </table>
      
     */
        //contenedorSecond.appendChild($collapsible);
    } catch (error) {
        console.log(error);
    }
}

function edit_product(id){
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
            <label>Proveedor:</label>
            <select name="proveedor" id="proveedores" class = "stlselect">
            </select>

            <label>Categoria:</label>
            <select name="categoria" id="categories" class = "stlselect">
            </select>

            <div class="row">
                <div class="input-field col s12">
                    <input type="text" id="name" name = "producto" >
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input type="text"  name = "Precio" id = "precio" >
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <textarea name="descricion" id="descricion" rows="5" cols="49">Write something here</textarea>
                </div>
            </div>

            <label>Productos:</label>
            <select name="productos" id="productos" class = "stlselect">
            </select>
            
            <button class="btn waves-effect waves-light" type="submit" center-align onclick="AddProduct(event);">Add New
            </button>
           
        </form>
        <p class="item_form">
            <div id = "new_product"></div>
        </p>
    </div>`
    contenedor.appendChild(contenedorSecond)

    data_product_id(id);    
}

/*Llenar select proveedores*/
function proveedores_id(id){
    const url = window.origin + "/proveedores" 
    let select = document.getElementById("proveedores");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
           if (id == data[key].id_proveedor) {
            select.options[key] = new Option(data[key].name , data[key].id_proveedor,true,true);  
           } else {
            select.options[key] = new Option(data[key].name , data[key].id_proveedor);
           }
          
        }
    })
}

/*Llenar select categories*/
function categories_id(id){
    const url = window.origin + "/categories" 
    let select = document.getElementById("categories");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          if (id == data[key].id_category) {
            select.options[key] = new Option(data[key].name , data[key].id_category, true, true); 
           } else {
            select.options[key] = new Option(data[key].name , data[key].id_category);
           }
        }
    })
}

/*Llenar select categories*/
function productos_id(id){
    const url = window.origin + "/productos" 
    let select = document.getElementById("productos");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
       for (const key in data) {
          
          if (id == data[key].id_product) {
            select.options[key] = new Option(data[key].name , data[key].id_product, true, true); 
           } else {
            select.options[key] = new Option(data[key].name , data[key].id_product);
           }
        }
    })
}

async function data_product_id(id){

    try {
        let entry = {
            name_media_server:'hola'
        }; 
        const url_media_server = window.origin + "/product_id/" + id + "/";
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
        document.getElementById("name").value = data[0]["name"];
        document.getElementById("precio").value = data[0]["precio"];
        document.getElementById("descricion").value= data[0]["descripcion"];
        proveedores_id(data[0]["id_proveedor"]);
        categories_id(data[0]["id_categoria"]);
        productos_id(data[0]["id_product"]);
        
    } catch (error) {
        console.log(error);
    }
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

