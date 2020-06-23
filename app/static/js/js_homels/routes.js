//Array imagenes 

let content_static = ['/static/video/DWPierna.mp4',
'/static/video/DWBrazo.mp4',
'/static/video/DWTodos.mp4',
'/static/imgs/DWKits1.jpg',
'/static/imgs/DWPecho.jpeg',
'/static/imgs/DWDorzo.jpeg'
];

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}

var contador=0;

window.addEventListener('load', () => {
    background_media();
    let  idvideo = document.getElementById("item_multimedia");
    padre = idvideo.parentNode;
    padre.removeChild(idvideo);
    num_items = 2;
    num_diapositiva = aleatorio(0,num_items);
    id = "item_multimedia"
    let  multimedia = document.getElementById("multimedia");
    let listItem = document.createElement('video');
    listItem.setAttribute("id", id); 
    listItem.setAttribute("loop", "");
    listItem.setAttribute("autoplay", ""); 
    listItem.style.width = '90%';
    listItem.classList.add("item-multimedia");
    multimedia.appendChild(listItem);
    document.getElementById(id).src= content_static[num_diapositiva];
    setInterval(rotarImagenes,40000);
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
            if (index == num_imagen1){
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
        url_img_t1 = window.location
        let url_img_s1 = url_img_t1.substring(0, url_img_t1.length - 1);
        //url_img_s1 = url_img_t1.substring(0,url_img_t1.string-1);  
        url_img_a = url_img_s1  + "/" + media1[0].id_product
        url_product_a.setAttribute("href", url_img_a);
        ruta_img_a = "/static/imgs/" + nom_imagen_a
        boxa.style.backgroundImage = "url("+ruta_img_a+")"; 
        boxa.style.backgroundSize= "cover";
        boxa.style.backgroundPosition="center";
        
        nom_imagen_b = media2[0].media;
        product_b.textContent = media2[0].name;
        price_b.textContent = media2[0].precio + "$";
        let url_img_t2 = window.location
        url_img_s2 = url_img_t2.substring(0,url_img_t2.string-1);    
        url_img_b = url_img_s2 +  "/" + media2[0].id_product

        url_product_b.setAttribute("href", url_img_b);
        ruta_img_b = "/static/imgs/" + nom_imagen_b
        boxb.style.backgroundImage = "url("+ruta_img_b+")"; 
        boxb.style.backgroundSize= "cover";
        boxb.style.backgroundPosition="center";
    })
}


function rotarImagenes(){
    let  idvideo = document.getElementById("item_multimedia");
    padre = idvideo.parentNode;
    padre.removeChild(idvideo);
    num_items = 5;
    num_diapositiva = aleatorio(3,num_items);
    id = "item_multimedia"
    let  multimedia = document.getElementById("multimedia");
    let listItem = document.createElement('img');
    listItem.setAttribute("id", id); 
    listItem.style.width = '90%';
    listItem.classList.add("item-multimedia");
    multimedia.appendChild(listItem);
    document.getElementById(id).src= content_static[num_diapositiva];
    background_media();
} 
