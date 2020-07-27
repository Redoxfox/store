//Array imagenes 

let content_static = ['/static/video/DWPierna.mp4',
'/static/video/DWBrazo.mp4',
'/static/video/DWTodos.mp4',
'/static/imgs/DWKits1.jpg',
'/static/imgs/DWPecho.jpeg',
'/static/imgs/DWDorzo.jpeg'
];

function file_static(id) {
    const url = window.origin + "/media/" + id
    console.log( url)
    fetch(url)
    .then(res => res.json())
    .then(data =>{ 
        let media1 = data.filter((productos, index)=>{
            console.log(productos["id"])
            return productos;  
        })  
        console.log(media1)
    })


}

function aleatorio(a,b) {
    return Math.round(Math.random()*(b-a)+parseInt(a));
}


var contador=0;

/**

 * Funcion para cambiar la imagen y link

 */

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
    file_static("1");
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
        
        nom_imagen_b = media2[0].media;
        product_b.textContent = media2[0].name;
        price_b.textContent = media2[0].precio + "$";
        url_img_b = window.origin + "/" + "ver_product" + "/" + media2[0].id_product
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
/* function rotarImagenes()

{

    // cambiamos la imagen y la url

    contador++
    id = "item_multimedia"
    let  multimedia = document.getElementById("linkmultimedia");
    let listItem = document.createElement('video');
    listItem.setAttribute("id", id); 
    listItem.classList.add("item-multimedia");
    multimedia.appendChild(listItem);

    document.getElementById(id).src= '/static/video/DWPierna.mp4';

    /* document.getElementById("link").href=imagenes[contador%imagenes.length][1]; 

} */



/**

 * Función que se ejecuta una vez cargada la página

 */

/* onload=function()

{

    // Cargamos una imagen aleatoria

    rotarImagenes();



    // Indicamos que cada 5 segundos cambie la imagen

    setInterval(rotarImagenes,5000);

} */

/* //Elemento para cargar el slider

let slider = document.getElementById("sliderJs");

//Elemento general del slider

let sliderContainer = document.getElementById('slider-container');



slider.style.width = images.length * 100 + "%";



//Elemento carga navegacion

let sliderNav = document.getElementById("sliderNavigation");
sliderNav.style.background = "rgb(27, 27, 27)";

//Variable para saber si el slider esta activo
let active = true;

//Eventos 
sliderNav.addEventListener("click",(e)=>slideImage(e.target.id.slice(-1)));


//Eventos de rato
sliderContainer.addEventListener("mouseover",()=>{
    if(active){
        active = false
    }
});

//Eventos saber si el raton no esta dentro
sliderContainer.addEventListener("mouseout",()=>{
    if(!active ){
        active = true
    }
});

//Dibujar slider navegacion
for (let img in images){
    //console.log(img)
    slider.innerHTML += `<img src="${images[img]}" class="sliderImages" style="width:${100/images.length}%">`;
    sliderNav.innerHTML += `<span class="slider-nav" id="slider-nav-${img}">`;
}

//Variable contador de imagenes
let cont = 0;

//intervalos de tiempo

const startInterval = () => setInterval(counter,2000);

startInterval();

function counter() {
    if(active){
        cont++;
        if(cont>=images.length) cont=0;
        setInterval(slideImage(cont),2000);
        setInterval(setActivate(cont),2000);
        //console.log(cont);
    }
}

function slideImage(id) {
    if (!active && !isNaN(id)) {
        cont=id;
        setActivate(id)
    }
    slider.style.left= '-'+ id + '00%';
}

let navIcons = [...document.getElementsByClassName("slider-nav")];
//console.log(navIcons)
 function setActivate(id) {
   for (let icons in navIcons) {
       if (icons<navIcons.length) {
           if (navIcons[icons].id==="slider-nav-" + id) {
               document.getElementById(navIcons[icons].id).classList.add("slider-nav-active")
           } else {
               document.getElementById(navIcons[icons].id).classList.remove("slider-nav-active")
           }
           
       }
       
       
   }
} 
 */


