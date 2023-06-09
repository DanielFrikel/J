// //La funcion de abajo no sabe que esta funcion existe
// const cliente = 'Juan';

// function mostrarCliente(){
//     const cliente = 'Pablo';
//     console.log(cliente);
// }

// console.log(cliente);

// mostrarCliente();


//Closures ('Sacar variables del scope de una funcion')
const obtenerCliente = () => {
    const nombre = "Juan";

    function muestraNombre(){
        console.log(nombre);
    }

    return muestraNombre;
}

const cliente = obtenerCliente();

cliente();