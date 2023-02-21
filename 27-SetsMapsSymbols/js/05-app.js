const sym = Symbol('1');
const sym2 = Symbol('1');

if(sym===sym2){
    console.log('Son iguales');
}else{
    console.log('Son distintos');
}

const nombre = Symbol();
const apellido = Symbol();

const persona = {};

//Agregar nombre y apellido como llaves del objeto
persona[nombre]='Daniel';
persona[apellido]='Aguilar';
persona.tipoCliente = 'Premium';
persona.saldo = 500;

console.log(persona);
console.log(persona[nombre]);