//Explicit Binding....

function persona(el1, el2){
    console.log(`Mi nombre es: ${this.nombre} y Escucho: ${el1} y ${el2}`);
}

const informacion = {
    nombre: 'Daniel',
}

const musicaFavorita = ['Rap', 'Hip Hop'];

//Call: Se deben mandar los miembros del arreglo individualmente
persona.call(informacion, musicaFavorita[0], musicaFavorita[1]);

//Apply: Este acepta el arreglocompleto
persona.apply(informacion, musicaFavorita);

//Bind: regresa una nueva funcion
const nuevaFn = persona.bind(informacion, musicaFavorita[0], musicaFavorita[1]);
nuevaFn();