//Class Declaration
class Cliente{
    constructor(nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }


    mostrarInformacion(){
        return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
    }

    static bienvenida(){
        return `Bienvenido al cajero`;
    }
}

const daniel = new Cliente('Daniel',400);
console.log(daniel.mostrarInformacion());
console.log(daniel);

//Funciona sin instanciar por ser estatica.
console.log(Cliente.bienvenida());

//Class Expretion
const Cliente2 = class {
    constructor(nombre, saldo){
        this.nombre = nombre;
        this.saldo = saldo;
    }
    
    mostrarInformacion(){
        return `Cliente: ${this.nombre}, tu saldo es de ${this.saldo}`;
    }
}


const daniel2 = new Cliente2('Daniel',400);
console.log(daniel2.mostrarInformacion());
console.log(daniel2);