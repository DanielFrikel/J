const cargarAPIbtn = document.querySelector('#cargarAPI');
cargarAPIbtn.addEventListener('click', obtenerDatos);

// Fetch API - Consumir API de terceros
function obtenerDatos(){
    // const url = 'https://jsonplaceholder.typicode.com/users';
    const url = 'https://picsum.photos/list';
    
    //fetch es una promesa por lo que se puede usar .then y .catch
    fetch(url)
        // respuesta es el valor que se obtiene de la promesa anterior
        .then( respuesta => respuesta.json() )
        // resultado es el valor que se obtiene de la promesa anterior
        .then( resultado => mostrarHTML(resultado) )
}

// Muestra los datos en el HTML
function mostrarHTML(datos){
    //conteniddo es el div que se encuentra en el HTML
    const contenido = document.querySelector('.contenido');

    //html es el string que se va a mostrar en el HTML
    let html = '';
    //Se recorre el arreglo de datos
    datos.forEach( dato => {
        //Se extraen los datos que se quieren mostrar
        const { author, post_url } = dato;
        //Se crea el string que se va a mostrar en el HTML
        html += `
            <p>Autor: </p>
            <p>${author}</p>
            <a href="${post_url}" target="_blank">Ver Imagen</a>
            <br>
        `;
    });

    //Se muestra el string en el HTML
    contenido.innerHTML = html;
}

