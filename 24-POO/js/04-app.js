//Class Declaration
class Cliente{

    //Variable privada
    #nombre;
    // constructor(nombre, saldo){
    //     this.#nombre = nombre;
    //     this.saldo = saldo;
    // }


    // mostrarInformacion(){
    //     return `Cliente: ${this.#nombre}, tu saldo es de ${this.saldo}`;
    // }

    // static bienvenida(){
    //     return `Bienvenido al cajero`;
    // }
    setNombre(nombre){
        this.#nombre = nombre;
    }
    getNombre(){
        return this.#nombre;
    }
}

//el # hace las variables privadas, para que solo sepuedan acceder
//desde un metodo

//const daniel = new Cliente('Daniel',200);
const daniel = new Cliente();
//console.log(daniel.mostrarInformacion());

daniel.setNombre('Daniel');

console.log(daniel.getNombre());
console.log(daniel);