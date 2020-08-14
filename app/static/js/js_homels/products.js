function file_static(id) {
    const url = window.origin + "/media/" + id
    // console.log( url)
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
        let media1 = data.filter((productos, index)=>{
            /* console.log(productos["id"]) */
            return productos;  
        }) 
        console.log(media1[0]["video"])
        console.log(media1.length)
        id_ini = 0
        id_end = media1.length - 1
        index = aleatorio(id_ini, id_end)
        nom_img = media1[index]["video"]
        url_img  = "/static/imgs/" + nom_img
        document.getElementById("img_product").src= url_img 
    })
}

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}


var contador=0;



window.addEventListener('load', () => {
    cadena = window.location.href
    console.log(cadena)
    var arrayDeCadenas = cadena.split("/");
    console.log(arrayDeCadenas[4]);
    console.log(typeof(arrayDeCadenas[4]))
    background_media();
    setInterval(rotarImagenes,40000); 
    file_static(arrayDeCadenas[4]);
});

function background_media (){
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

function rotarImagenes(){
    cadena = window.location.href
    console.log(cadena)
    var arrayDeCadenas = cadena.split("/");
    console.log(arrayDeCadenas[4]);
    console.log(typeof(arrayDeCadenas[4]))
    background_media();
    file_static(arrayDeCadenas[4]);
} 

