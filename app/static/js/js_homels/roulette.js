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

/**

 * Array con las imagenes y enlaces que se iran mostrando en la web

 */

/* var imagenes=new Array(

    ['img/1.jpg','http://www.lawebdelprogramador.com/cursos/'],

    ['img/2.jpg','http://www.lawebdelprogramador.com/foros/'],

    ['img/3.jpg','http://www.lawebdelprogramador.com/pdf/'],

    ['img/4.jpg','http://www.lawebdelprogramador.com/utilidades/']

); */

var contador=0;

/**

 * Funcion para cambiar la imagen y link

 */

window.addEventListener('load', () => {
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
        let media1 = data.filter((productos,index)=>{
            if (index == num_imagen1){
                return productos; 
            }     
        })
        let boxa = document.getElementById("box_a");
        let product = document.getElementById("product");
        let price = document.getElementById("price");
        let url_product = document.getElementById("url_product");
        nom_imagen = media1[0].media;
        product.textContent = media1[0].name;
        price.textContent = media1[0].precio + "$";
        url_img = window.location + "products" + "/" + media1[0].id_product
        url_product.setAttribute("href", url_img);
        ruta_img = "/static/imgs/" + nom_imagen
        boxa.style.backgroundImage = "url("+ruta_img+")"; 
        boxa.style.backgroundSize= "cover";
        boxa.style.backgroundPosition="center";
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


