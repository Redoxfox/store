
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

/*Formulario agregar nuevo proveedor*/
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
    console.log(url)


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
        console.log(data)
       
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

