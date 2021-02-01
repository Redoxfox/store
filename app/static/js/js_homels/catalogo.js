window.addEventListener('load', () => {
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
        // if (item.id_product <= 12) {
        // }
            let url_b = window.origin 
            let show_p = "ver_product"    
            let box = `
            <img class=img_product src="/static/imgs/${item.media}">
            <h3>${item.name}</h3>
            <p>$ ${item.precio}</p>
            <p>${item.descripcion}</p>
            <a href="${url_b}/${show_p}/${item.id_product}" class="btn">Ver Producto</a> `;
            return box
        
        
    }
    for (let index = 0; index < newarray.length; index++) {
        let box_root = document.getElementById("box");
        let listItem = document.createElement('div');
        listItem.innerHTML = newarray[index];
        listItem.classList.add("box");
        box_root.appendChild(listItem);
    }
    })
}


