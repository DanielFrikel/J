function descargarNuevosClientes(){
    return new Promise(resolve=>{
        console.log('Descargando clientes...');

        setTimeout(()=>{
            resolve('Los clientes fueron descargados');
        },4000);
    })
}

function descargarNuevosPedidos(){
    return new Promise(resolve=>{
        console.log('Descargando pedidos...');

        setTimeout(()=>{
            resolve('Los pedidos fueron descargados');
        },4000);
    })
}

const app = async () =>{
    try{
        //El codigo comentado espera a que se carge uno
        //y luego carga el otro (tarda mucho 8 segundos)
        // const clientes = await descargarNuevosClientes();
        // console.log(clientes);
        // const pedidos = await descargarNuevosPedidos();
        // console.log(pedidos);

        //Promise.all ejecuta las dos promesas al mismo tiempo
        const respuesta = await Promise.all([descargarNuevosClientes(), descargarNuevosPedidos()])
        console.log(respuesta);
    }catch(error){
        console.log(error);
    }
}

app();