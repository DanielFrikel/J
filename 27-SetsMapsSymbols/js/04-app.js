const producto = {
     idProducto: 10
}

const weakmap = new WeakMap();

weakmap.set(producto,'Monitor');

console.log(weakmap.has(producto));
console.log(weakmap.get(producto));