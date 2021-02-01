function file_static(id) {
    const url = window.origin + "/media/" + id
    // console.log( url)
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
        let media1 = data.filter((productos, index)=>{
            // console.log(productos["id"]) 
            return productos;  
        }) 
        //console.log(media1[0]["video"])
        //console.log(media1.length)
        let id_ini = 0
        let id_end = media1.length - 1
        let index = aleatorio(id_ini, id_end)
        let nom_img = media1[index]["video"]
        let url_img  = "/static/imgs/" + nom_img
        document.getElementById("img_product").src= url_img 
    })
}

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}


var contador=0;
window.addEventListener('load', () => {
    background_media();
    setInterval(rotarImagenes,40000); 
    file_static("1");
});

function background_media (){
    const url = window.origin + "/images" 
    //let select = document.getElementById("images");
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
        console.log(data);
        let b = data.length - 1
        let a = 1
        let num_imagen1 = Math.round(Math.random()*(b-a)+parseInt(a))
        let num_imagen2 = Math.round(Math.random()*(b-a)+parseInt(a))
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
        let nom_imagen_a = media1[0].media;
        product_a.innerHTML = media1[0].name;
        console.log(nom_imagen_a)
        price_a.textContent = media1[0].precio + "$";
        let url_img_a = window.origin +"/" + "ver_product" + "/" + media1[0].id_product
        url_product_a.setAttribute("href", url_img_a);
        let ruta_img_a = "/static/imgs/" + nom_imagen_a
        document.getElementById("img_product_a").src= ruta_img_a
        //boxa.classList.add("box");
        //boxa.style.backgroundImage = "url("+ruta_img_a+")"; 
        //boxa.style.backgroundPosition="center";
   
        
        let nom_imagen_b = media2[0].media;
        product_b.textContent = media2[0].name;
        price_b.textContent = media2[0].precio + "$";
        let url_img_b = window.origin + "/" + "ver_product" + "/" + media2[0].id_product
        url_product_b.setAttribute("href", url_img_b);
        let ruta_img_b = "/static/imgs/" + nom_imagen_b
        document.getElementById("img_product_b").src= ruta_img_b
        //boxb.classList.add("box");
        //boxb.style.backgroundImage = "url("+ruta_img_b+")"; 
        //boxb.style.backgroundPosition="center";
    })
}


function rotarImagenes(){
    background_media();
    file_static("1");
}  





