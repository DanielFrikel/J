//Funcion que retorna una funcion
const obtenerCliente = () => () => console.log('Daniel');

const fn = obtenerCliente();

fn();