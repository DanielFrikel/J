//Un currying es dividir una funcion que toma mas de un parametro
//en argumentos de forma parcial

//Forma normal
const suma = (a,b,c) => a+b+c;
console.log(suma(5,4,3));


//Currying y Partials en 2 partes.
const parcial = a => (b,c) => suma(a,b,c);
const primerNumero = parcial(5);
const resultado = primerNumero(4,3);
console.log(resultado);


//3 partes.
const parcialABC = a => b => c => suma(a,b,c);
const primerNumero1 = parcialABC(5);
const segundoNumero1 = primerNumero1(4);
const resultado1 = segundoNumero1(3);
console.log(resultado1);


//Resumido quedaria:
const resultadoParcial1 = parcialABC(5)(4)(3);
console.log(resultadoParcial1);