function descargarClientes(){

    //Un Promise es un objeto que tiene 2 callbacks internos
    //resolve: se ejecuta cuando se cumple el Promise
    //reject: se ejecuta cuando no se cumple el Promise    
    return new Promise((resolve,reject)=>{
        const error = true;

        setTimeout(() => {
            if(!error){
                resolve('El listado de clientes se descargo correctamente');
            }else{
                reject('Error en la conexión');
            }
        }, 2000);
    })
}

//Async await
async function ejecutar(){
    try{
        //IMPORTANTE:
        //await detiene la ejecución del código hasta que se cumpla el Promise
        //await solo puede usarse dentro de una función async
        const respuesta = await descargarClientes();

        //Si el try detecta un reject, se ejecuta el catch.
        console.log(2+2);
        console.log(respuesta);
    }catch(error){
        console.log(error);
    }
}

ejecutar();