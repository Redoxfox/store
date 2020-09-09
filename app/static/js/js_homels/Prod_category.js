window.addEventListener('load', () => {
    let id = document.getElementById("id").innerHTML;
    category(id);
});

/*Llenar select categories*/
function category(id){
    const url = window.origin + "/Category_id" 
    var entry = {
        id_categoria : id
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
          response.json().then(data =>{ 
            let box_root = document.getElementById("box");
            box_root.parentNode.removeChild(box_root);
            let container = document.getElementById("container");
            box_root = document.createElement('section');
            box_root.setAttribute("id", "box"); 
            box_root.classList.add("boxes");
            container.appendChild(box_root);
            
            console.log(data)
            let numbers = data;
            let newarray = numbers.map(myFunction);
     
         function myFunction(item) {
            if (item.id_product <= 12) {
                 url_b = window.origin 
                 show_p = "ver_product"
                 box = `
                 <img src="/static/imgs/${item.media}">
                 <h3>${item.name}</h3>
                 <p>$ ${item.precio}</p>
                 <p>${item.descripcion}</p>
                 <a href="${url_b}/${show_p}/${item.id_product}" class="btn">Ver servicios</a> `;
                 return box   
                } 
         }
         for (let index = 0; index < 12; index++) {
            
             console.log(typeof newarray[index])
             
             if (typeof newarray[index]!=='undefined') {
                let listItem = document.createElement('div');
                listItem.innerHTML = newarray[index];
                listItem.classList.add("box");
                box_root.appendChild(listItem);
             }
             
         }
          });
      })
      .catch(function (error) {
          console.log("Fetch error: " + error);
      });   
}


/*Formulario agregar nuevas categorias
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
*/
