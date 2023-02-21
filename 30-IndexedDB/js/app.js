 let DB;
 
 document.addEventListener('DOMContentLoaded',()=>{
    crmDB();

    setTimeout(()=>{
        crearCliente();
    },4000);
});

function crmDB(){
    //Crear base de datos version 1.0
    let crmDB = window.indexedDB.open('crm',1);

    //Si hay un error
    crmDB.onerror = function(){
        console.log('Hubo un error en la BD');
    }

    //Si se creo bien
    crmDB.onsuccess = function(){
        console.log('Base de datos creada');

        DB = crmDB.result;
    }

    //Configuracion de la base de datos
    //Se ejecuta 1 vez cuando se crea la BD
    crmDB.onupgradeneeded = function(e){
        const db = e.target.result;

        const objectStore = db.createObjectStore('crm',{
            keyPath: 'crm',
            autoIncrement: true            
        });

        //Definir las columnas
        objectStore.createIndex('nombre', 'nombre',{unique:false});
        objectStore.createIndex('email', 'email',{unique:true});
        objectStore.createIndex('telefono', 'telefono',{unique:false});

        console.log('Columnas creadas')
    }

}

function crearCliente(){
    //'readonly'
    let transaction = DB.transaction(['crm'],'readwrite');

    transaction.oncomplete = function(){
        console.log('Transaccion completada');
    }

    transaction.onerror = function(){
        console.log('Hubo un error en la transaccion');
    }

    const objectStore = transaction.objectStore('crm');

    const nuevoCliente = {
        telefono: 66421343123,
        nombre: 'Daniel',
        email: 'a@a.com',
    }

    //Agregar
    const peticion = objectStore.add(nuevoCliente);
    //Actualizar
    const peticiona = objectStore.put(nuevoCliente);
    //Eliminar
    const peticionb = objectStore.delete(nuevoCliente);

    console.log(peticion);
}
