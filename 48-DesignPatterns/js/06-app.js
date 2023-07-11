//Mixin Pattern
class Persona{
    constructor(nombre,email){
        this.nombre = nombre;
        this.email = email;
    }
}

class Cliente{
    constructor(nombre,email){
        this.nombre = nombre;
        this.email = email;
    }
}

const funcionesPersona = {
    mostrarInformacion(){
        console.log(`Nombre Persona: ${this.nombre}   -   Email: ${this.email}`);
    },
    mostrarNombre(){
        console.log(`Mi nombre es: ${this.nombre}`);
    }
}

//Anadir funcionesPersona  a la clase de Persona
Object.assign(Persona.prototype, funcionesPersona);
Object.assign(Cliente.prototype, funcionesPersona);

const cliente = new Persona('Daniel','a@a.com');
console.log(cliente);
cliente.mostrarInformacion();
cliente.mostrarNombre();

const cliente2 = new Cliente('Cliente','Cliente@Cliente.com');
console.log(cliente2);
cliente2.mostrarInformacion();
cliente2.mostrarNombre();
