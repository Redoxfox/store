//Array imagenes 

/* let content_static = ['/static/video/DWPierna.mp4',
'/static/video/DWBrazo.mp4',
'/static/video/DWTodos.mp4',
'/static/imgs/DWKits1.jpg',
'/static/imgs/DWPecho.jpeg',
'/static/imgs/DWDorzo.jpeg'
]; */


/**

 * Funcion para cambiar la imagen y link

 */

window.addEventListener('load', () => {
    /* background_media();
    setInterval(rotarImagenes,40000); 
    file_static("1"); */
    productos();
});

/*Llenar select categories*/
function productos(){
    const url = window.origin + "/all_products" 
    let select = document.getElementById("productos");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 

       console.log(data)
       let numbers = data;
       let newarray = numbers.map(myFunction);

    function myFunction(item) {
        if (item.id_product <= 12) {
            box = `
            <img src="/static/imgs/${item.media}">
            <h3>${item.name}</h3>
            <p>$ ${item.precio}</p>
            <p>${item.descripcion}</p>
            <a href="{{url}}/Servicios/1" class="btn">Ver servicios</a> `;
            return box
        }
        
    }
    for (let index = 0; index < 12; index++) {
        let box_root = document.getElementById("box");
        let listItem = document.createElement('div');
        listItem.innerHTML = newarray[index];
        listItem.classList.add("box");
        box_root.appendChild(listItem);
    }
    /* for (const key in newarray) {
            console.log(newarray)
            document.getElementById("box").innerHTML = newarray[key];
        }  */
    })
}

/* function background_media (){
    const url = window.origin + "/images" 
    let select = document.getElementById("images");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
        b = data.length - 1
        a = 1
        num_imagen1 = Math.round(Math.random()*(b-a)+parseInt(a))
        num_imagen2 = Math.round(Math.random()*(b-a)+parseInt(a))
        if (num_imagen1 == num_imagen2) {
           if (num_imagen2 == b) {
             num_imagen1 = b - 1
           } 

           if (num_imagen2 == a) {
             num_imagen1 = a + 1
           }  
        } 
        let media1 = data.filter((productos, index)=>{
            if (index == num_imagen1){
                return productos; 
            }     
        })

        let media2 = data.filter((productos, index)=>{
            if (index == num_imagen2){
                return productos; 
            }     
        })


        let boxa = document.getElementById("box_a");
        let product_a = document.getElementById("product_a");
        let price_a = document.getElementById("price_a");
        let url_product_a = document.getElementById("url_product_a");
        let boxb = document.getElementById("box_b");
        let product_b = document.getElementById("product_b");
        let price_b = document.getElementById("price_b");
        let url_product_b = document.getElementById("url_product_b");
        nom_imagen_a = media1[0].media;
        product_a.textContent = media1[0].name;
        price_a.textContent = media1[0].precio + "$";
        url_img_a = window.origin +"/" + "ver_product" + "/" + media1[0].id_product
        url_product_a.setAttribute("href", url_img_a);
        ruta_img_a = "/static/imgs/" + nom_imagen_a
        boxa.style.backgroundImage = "url("+ruta_img_a+")"; 
        boxa.style.backgroundSize= "cover";
        boxa.style.backgroundPosition="center";
        boxa.style.width = "400px"
        
        nom_imagen_b = media2[0].media;
        product_b.textContent = media2[0].name;
        price_b.textContent = media2[0].precio + "$";
        url_img_b = window.origin + "/" + "ver_product" + "/" + media2[0].id_product
        url_product_b.setAttribute("href", url_img_b);
        ruta_img_b = "/static/imgs/" + nom_imagen_b
        boxb.style.backgroundImage = "url("+ruta_img_b+")"; 
        boxb.style.backgroundSize= "cover";
        boxb.style.backgroundPosition="center";
        boxb.style.width = "400px"
    })
}
 */

