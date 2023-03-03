//https://openweathermap.org/
//API KEY 5d155529c344cd983c95b99c0fd70ceb - ProyectoFetchAPI

const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

// En resumen, el código agrega un EventListener a la ventana del navegador para esperar a que se cargue todo el contenido de la página antes de ejecutar una función específica. Esto asegura que todos los recursos se hayan cargado antes de que se ejecute el código de la función, lo que puede evitar errores o problemas relacionados con la carga de recursos.
window.addEventListener('load', () => {
    formulario.addEventListener('submit', buscarClima);
})

//Funcion para Validar y consultar la API de clima
function buscarClima(e){
    e.preventDefault();

    //Validar
    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;

    //Validar que no esten vacios
    if(ciudad === '' || pais === ''){
        //Hubo un error
        mostrarError('Ambos campos son obligatorios');
        
        return;
    }        
    
    //Consultar API
    consultarAPI(ciudad, pais);    
}

//Funcion para consultar la API de clima de OpenWeather API
function consultarAPI(ciudad, pais){
    const appId = '5d155529c344cd983c95b99c0fd70ceb';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;

    Spinner(); //Mostrar el spinner de carga

    //Fetch API de clima de OpenWeather API 
    fetch(url)
        .then( respuesta => respuesta.json() )
        .then( datos => {
            limpiarHTML(); //Elimina el spinner                        
            if(datos.cod === "404"){
                mostrarError('Ciudad no encontrada');
                return;
            }

            //Imprime la respuesta en el HTML
            mostrarClima(datos);
        })
}

//Muestra una alerta en caso de error
function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    //Si no existe la alerta, la crea
    if(!alerta){
        //Crear alerta
        const alerta = document.createElement('div');

        //Agregar clases
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-md', 'mx-auto', 'mt-6', 'text-center');

        //Agregar mensaje
        alerta.innerHTML = `
            <strong class="font-bold">Error!</strong>
            <span class="block">${mensaje}</span>
        `;

        //Agregar al HTML
        container.appendChild(alerta);

        //Eliminar alerta
        setTimeout(() => {
            alerta.remove();
        }, 3000);
    }
}

//Imprime el resultado de la consulta
function mostrarClima(datos){
    //Destructuring de datos 
    const { name, main: { temp, temp_max, temp_min } } = datos;

    //Convertir de Kelvin a Centigrados
    const centigrados = kelvinACentigrados(temp);
    const max = kelvinACentigrados(temp_max);
    const min = kelvinACentigrados(temp_min);

    //Asignar los valores a los elementos del HTML
    const nombreCiudad = document.createElement('p');
    nombreCiudad.textContent = `Clima en ${name}`;
    nombreCiudad.classList.add('font-bold', 'text-2xl');

    //Para agregar el simbolo de grados centigrados
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold', 'text-6xl');

    //Para agregar el simbolo de grados centigrados
    const tempMaxima = document.createElement('p');
    tempMaxima.innerHTML = `Max: ${max} &#8451;`;
    tempMaxima.classList.add('text-xl');

    //Para agregar el simbolo de grados centigrados
    const tempMinima = document.createElement('p');
    tempMinima.innerHTML = `Min: ${min} &#8451;`;
    tempMinima.classList.add('text-xl');

    //Para agregar el simbolo de grados centigrados
    const resultadoDiv = document.createElement('div');
    resultadoDiv.classList.add('text-center', 'text-white');    
    //Agregar al HTML
    resultadoDiv.appendChild(nombreCiudad);
    resultadoDiv.appendChild(actual);
    resultadoDiv.appendChild(tempMaxima);
    resultadoDiv.appendChild(tempMinima);
    
    resultado.appendChild(resultadoDiv);
}

//Funcion para convertir de Kelvin a Centigrados
const kelvinACentigrados = grados => parseInt(grados - 273.15);

//Funcion para eliminar el spinner de carga
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

//Funcion para mostrar el spinner de carga
function Spinner(){
    //Para eliminar el spinner de carga
    limpiarHTML();

    //Crear el spinner
    const divSpinner = document.createElement('div');
    divSpinner.classList.add('sk-fading-circle');

    //Agregar el spinner
    divSpinner.innerHTML = `
        <div class="sk-circle1 sk-circle"></div>
        <div class="sk-circle2 sk-circle"></div>
        <div class="sk-circle3 sk-circle"></div>
        <div class="sk-circle4 sk-circle"></div>
        <div class="sk-circle5 sk-circle"></div>
        <div class="sk-circle6 sk-circle"></div>
        <div class="sk-circle7 sk-circle"></div>
        <div class="sk-circle8 sk-circle"></div>
        <div class="sk-circle9 sk-circle"></div>
        <div class="sk-circle10 sk-circle"></div>
        <div class="sk-circle11 sk-circle"></div>
        <div class="sk-circle12 sk-circle"></div>
    `;

    //Agregar al HTML
    resultado.appendChild(divSpinner);
}



