const cargarTxtBtn = document.querySelector('#cargarTxt');
cargarTxtBtn.addEventListener('click', obtenerDatos);

function obtenerDatos(){
    //fetch es una función que se encarga de hacer peticiones a un servidor
    //fetch recibe como parámetro la dirección del archivo que se va a descargar
    //fetch retorna una promesa
    fetch('data/datos.txt')
        .then(respuesta=>{
            //res es la respuesta del servidor
            //res.text() retorna otra promesa
            return respuesta.text();
        })
        .then(datos=>{
            //datos es lo que retorna res.text()
            console.log(datos);
        })
        .catch(error=>{
            //error es el error que se genere
            console.log(error);
        });
}

//Definicion de Fetch API:
//Fetch API es una interfaz de JavaScript que provee una 
//forma fácil y lógica de obtener recursos de forma asíncrona 
//por la red y manejar respuestas de forma sencilla.


