//Funciones Puras o Pure Functions
//Funciones que retornan un dato sin modificar el dato de las variables
//debe retornar la misma cantidad de datos que recibe en los parametros.
const numero1 = 20;
const duplicar = numero => numero * 2;

const resultado = duplicar(numero1);
console.log(numero1);
console.log(resultado);