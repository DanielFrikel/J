const carrito = new Set();

carrito.add('Camisa');
carrito.add('Disco 1');
carrito.add('Disco 2');
carrito.add('Disco 3');

carrito.delete('Disco 3');
//carrito.clear();

console.log(carrito.has('Camisa'));

console.log(carrito.size);
console.log(carrito);

carrito.forEach(dato=>console.log(dato));