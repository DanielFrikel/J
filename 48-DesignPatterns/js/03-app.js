//Singleton
//Evita crear multiples instancias
//solo puede haber creada 1 instancia.
let instancia = null;

class Persona{
    constructor(nombre,email){
        if(!instancia){
            this.nombre = nombre;
            this.email = email;

            instancia = this;
        }else{
            return instancia;
        }
    }
}


const persona = new Persona('Daniel','a@a.com');
console.log(persona);

const persona2 = new Persona('karen','karen@karen.com');
console.log(persona2);