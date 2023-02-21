const cliente = new Map();

cliente.set('nombre','Karen');
cliente.set('tipo','Premium');
cliente.set('saldo',3000);

console.log(cliente);
console.log(cliente.size);

console.log(cliente.has('Premium'));
console.log(cliente.get('nombre'));
//cliente.delete('saldo');

const paciente = new Map([['nombre','paciente'],['cuarto','no definido']]);
console.log(paciente);

cliente.forEach((datos,index)=>{
    console.log(index,datos);
})