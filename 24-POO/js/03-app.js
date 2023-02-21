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

//Herencia
class Empresa extends Cliente{
    constructor(nombre,saldo,telefono,categoria){
        super(nombre,saldo);
        this.telefono = telefono;
        this.categoria = categoria;
    }
    static bienvenida(){
        return `Bienvenido al cajero de empresas`;
    }
}


const daniel = new Cliente('Daniel',400);
const empresa = new Empresa('Codigo Danielin',500,6646434634,'En Linea');
console.log(empresa);
console.log(empresa.mostrarInformacion());
console.log(Empresa.bienvenida());