cargarJSONbtn = document.querySelector('#cargarJSON');

cargarJSONbtn.addEventListener('click', obtenerDatos);

//funcion para obtener los datos del archivo json
function obtenerDatos() {
    const url = 'data/empleado.json';

    //fetch api para obtener los datos de un archivo json externo y mostrarlos en el HTML

    fetch(url)
    //convertir la respuesta a json para poder leerla 
        .then(respuesta => respuesta.json())
    //mostrar los datos en el HTML 
        .then(resultado => mostrarHTML(resultado))
    //si hay un error, mostrarlo en la consola 
        .catch(error => console.log(error));
}

//mostrar el resultado en el HTML
function mostrarHTML(resultado) {
    //destructuring resultado
    const { empresa, id, nombre, trabajo } = resultado;
    console.log(resultado);

    //seleccionar el contenido
    const contenido = document.querySelector('.contenido');

    //insertar el contenido
    contenido.innerHTML = `
        <p>Empresa: ${empresa}</p>
        <p>ID: ${id}</p>
        <p>Nombre: ${nombre}</p>
        <p>Trabajo: ${trabajo}</p>
    `;
}