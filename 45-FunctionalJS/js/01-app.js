//First Class Functions significa
//que una variable se puede igualar a una funcion.

const suma = function(a,b){
    return a + b;
}


const resultado = suma;

console.log(resultado(10,20));