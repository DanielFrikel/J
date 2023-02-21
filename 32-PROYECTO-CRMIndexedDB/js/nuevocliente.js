(function () {

    let DB;
    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{

        conectarDB();
        function conectarDB(){    
            const abrirConexion = window.indexedDB.open('crm',2);
        
            abrirConexion.onerror = function(){
                console.log('Hubo un error');
            };
        
            abrirConexion.onsuccess = function(){
                DB = abrirConexion.result;
            };                
        }
        
        formulario.addEventListener('submit',validarCliente);
        
    });


    function validarCliente(e){
        e.preventDefault();
        
        //Leer todos los inputs
        const nombre = document.querySelector('#nombre').value;
        const email = document.querySelector('#email').value;
        const telefono = document.querySelector('#telefono').value;
        const empresa = document.querySelector('#empresa').value;

        if(nombre === '' || email === '' || telefono === '' || empresa === ''){
            imprimirAlerta('Todos los campos son obligatorios','error');

            return;
        }

        //crear un objeto con la informacion
        //Esto es lo mismo que lo de abajo
        // nombre: nombre,
        // email: email,
        // telefono: telefono,
        // empresa, empresa,
        const cliente = {
            nombre,
            email,
            telefono,
            empresa,                        
        }
        cliente.id = Date.now();
        
        crearNuevoCliente(cliente);
    }

    function crearNuevoCliente(cliente){      
        
        const transaction = DB.transaction(['crm'],'readwrite');              
        
        const objectStore = transaction.objectStore('crm');

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error','error');
        }
        transaction.oncomplete = function(){
            console.log('Cliente agregado');

            imprimirAlerta('El cliente se agrego correctamente');
            setTimeout(()=>{
                window.location.href = 'index.html';
            },2000)
        }

        objectStore.add(cliente);
    }

})();