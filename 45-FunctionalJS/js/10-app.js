//Composition
//Se suele utilizar en lugar de clases, son puras funciones

const obtenerNombre = info => ({
    mostrarNombre(){
        console.log(`Nombre: ${info.nombre}`);

    }

});

const guardarEmail = info => ({
    agregarEmail(email){
        console.log(`Guardando el email en: ${info.nombre}`);
        info.email = email;
    }
});

const obtenerEmail = info => ({
    mostrarEmail(){
        console.log(`Correo: ${info.email}`);
    }
});

const obtenerEmpresa = info => ({
    mostrarEmpresa(){
        console.log(`Empresa: ${info.empresa}`);
    }
});

const obtenerPuesto = info => ({
    mostrarPuesto(){
        console.log(`Puesto: ${info.puesto}`);
    }
});

function Cliente(nombre, email, empresa){
    let info = {
        nombre,
        email,
        empresa
    }

    //Copia la funcion y la copia a dentro del objeto de la funcion padre(cliente)
    return Object.assign(
        info,
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmail(info),
        obtenerEmpresa(info)
    )
}

function Empleado(nombre, email, puesto){
    let info = {
        nombre,
        email,
        puesto
    }

    return Object.assign(
        info,
        obtenerNombre(info),
        guardarEmail(info),
        obtenerEmail(info),
        obtenerPuesto(info)
    )
}

const cliente = Cliente('Daniel',null,'ITT');
cliente.mostrarNombre();
cliente.agregarEmail('cliente@cliente.com');
cliente.mostrarEmail();
cliente.mostrarEmpresa();

console.log('=================================');

const empleado = Empleado('Frikel',null,'Developer');
empleado.mostrarNombre();
empleado.agregarEmail('empleado@empleado.com');
empleado.mostrarEmail();
empleado.mostrarPuesto();



//Primero crear una arrow function en una variable const con un 
//parametro que sea un objeto, el  cuerpo de la arrow function debe
//estar entre parentesis, y se crea una funcion dentro de el arrow.
//El objeto debe estar en la otra funcion como si fuera una funcion
//dentro de una clase.
//Al final se manda a llamar la instancia.el nombre de la funcion
//dentro del arrow.
//En la funcion que parece dentro de una clase se pone
//    return Object.assign(
//    nombredelObjeto,
//    nombre de la funcion de antes del arrow(nombredelObjeto),
//)