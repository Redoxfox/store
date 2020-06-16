//Array imagenes 

let content_static = ['/static/video/DWPierna.mp4',
'/static/video/DWBrazo.mp4',
'/static/video/DWTodos.mp4',
'/static/video/DWBrazo.mp4'];

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
    contador++
    id = "item_multimedia"
    let  multimedia = document.getElementById("multimedia");
    let listItem = document.createElement('video');
    listItem.setAttribute("id", id); 
    listItem.setAttribute("loop", "");
    listItem.setAttribute("autoplay", ""); 
    listItem.classList.add("item-multimedia");
    multimedia.appendChild(listItem);
    document.getElementById(id).src= content_static[3];
});

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


