//Promises, resolve se ejecuta cuando se ejecuta bien el promise
//o cuando se cumple y reject cuando hay un error.
const aplicarDescuento = new Promise((resolve,reject)=>{
    const descuento = true;
    if(descuento){
        resolve('Descuento aplicado');
    }else{
        reject('No se pudo aplicar el descuento');
    }
})

aplicarDescuento
    .then(resultado =>descuento(resultado))
    //En caso de que el promise se ejecute correctamente se hara
    //lo siguiente:
    //.then(arrowfunction)
    .catch(error => console.log(error))
    //En caso de que el promise de error se hara lo siguiente
    //.catch(arrowfunction)

// console.log(aplicarDescuento);

//Hay 3 valores posibles
//fullfilled = El promise se cumplio correctamente
//rejected = El promise NO se cumplio.
//pending = El promise aun no se cumple ni se rechazo.

function descuento(mensaje){
    console.log(mensaje);
}