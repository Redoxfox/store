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
        if (item.id_product <= 12) {
            let box = `
            <img class=img_product src="/static/imgs/${item.media}">
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
    })
}


