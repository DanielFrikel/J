

//Estos dos son lo mismo
// window.onload = () => {
//     console.log('Ventana Lista');
// }
self.onload = () => {
    console.log('Ventana Lista');
}

window.nombre = 'Monitor 20 pulgadas';

const producto = {
    precio: 30,
    disponible: true,
    mostrarInfo: function(){
        //const self = this;
        //return `El producto: ${this.nombre} tiene un precio de ${this.precio}`;
        //return `El producto: ${self.nombre} tiene un precio de ${self.precio}`;
        return `El producto: ${self.nombre}`;
    }
}

console.log(producto.mostrarInfo());