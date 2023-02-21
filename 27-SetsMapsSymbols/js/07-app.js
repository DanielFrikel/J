//Generador, funcion que retorna un iterador
//Siempre lleva un asterisco antes del nombre

function *crearGenerador(){
    //yield son los valores iterables
    yield 1;
    yield 'Daniel';
    yield 3+3;
    yield true;
}

// const iterador = crearGenerador();
// console.log(iterador);
// //console.log(iterador.next());
// console.log(iterador.next().value);
// console.log(iterador.next().done);
// console.log(iterador);

//Cada vez que termina una actividad se duerme
//Al final de recorrer todo, se cierra
//Una vez terminado el valor done se pone en True
//Y el value en undefined

// Generador para carrito de compras

function *generadorCarrito(carrito){
    for(let i = 0; i<carrito.length;i++){
        yield carrito[i];
    }
}

const carrito = ['Producto 1','Producto 2','Producto 3'];

const iterador = generadorCarrito(carrito);

console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());
console.log(iterador.next());