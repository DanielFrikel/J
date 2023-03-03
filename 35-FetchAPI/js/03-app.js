const cargarJSONArrayBtn = document.querySelector('#cargarJSONArray');
cargarJSONArrayBtn.addEventListener('click', obtenerDatos);

//funcion para obtener los datos del archivo json
function obtenerDatos() {
    //url del archivo json
    const url = 'data/empleados.json';

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
function mostrarHTML(empleados){
    //seleccionar el contenido
    const contenido = document.querySelector('.contenido');

    //crear el HTML 
    let html = '';
    //recorrer el array de objetos
    empleados.forEach(empleado => {
        //destructuring empleado
        const {empresa, id, nombre, trabajo} = empleado;
        //insertar el contenido
        html += `
            <p>Empresa: ${empresa}</p>
            <p>ID: ${id}</p>
            <p>Nombre: ${nombre}</p>
            <p>Trabajo: ${trabajo}</p>
        `;
    });
    //insertar el contenido
    contenido.innerHTML = html;
}


