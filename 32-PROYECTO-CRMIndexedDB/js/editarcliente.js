(function(){
    let DB;
    let idCliente;

    const nombreInput = document.querySelector('#nombre');
    const emailInput = document.querySelector('#email');
    const telefonoInput = document.querySelector('#telefono');
    const empresaInput = document.querySelector('#empresa');

    const formulario = document.querySelector('#formulario');

    document.addEventListener('DOMContentLoaded',()=>{
        conectarDB();

        //Actualiza el registro
        formulario.addEventListener('submit',actualizarCliente);

        //Verificar el ID de la URL
        const parametrosURL = new URLSearchParams(window.location.search);
        idCliente = parametrosURL.get('id');
        if(idCliente){
            setTimeout(()=>{
                obtenerCliente(idCliente);
            }, 100);            
        }
        
    });

    function actualizarCliente(e){
        e.preventDefault();

        if(nombreInput.value === '' || emailInput.value === '' || empresaInput.value === '' || telefonoInput === ''){
            imprimirAlerta('Todos los Campos son Obligatorios', 'error');
            return;
        }

        //Actualizar cliente
        const clienteActualizado = {
            nombre: nombreInput.value,
            email: emailInput.value,
            empresa: empresaInput.value,
            telefono: telefonoInput.value,
            id: Number(idCliente),
        };

        const transaction = DB.transaction(['crm'], 'readwrite');
        const objectStore = transaction.objectStore('crm');

        //Mediante el KeyPath que se creo en la creacion de la BD
        //encontrara las coincidencias y actualizara
        objectStore.put(clienteActualizado);

        transaction.oncomplete = function(){
            imprimirAlerta('Editado correctamente');
            setTimeout(()=>{
                window.location.href = 'index.html';
            }, 1300);
        };

        transaction.onerror = function(){
            imprimirAlerta('Hubo un error','error');
        };

    }

    function obtenerCliente(id){
        const transaction = DB.transaction(['crm'],'readonly');

        const objectStore = transaction.objectStore('crm');

        const cliente = objectStore.openCursor();
        cliente.onsuccess = function(e){
            const cursor = e.target.result;

            if(cursor){                
                if(cursor.value.id===Number(id)){
                    llenarFormulario(cursor.value);
                }
                cursor.continue();
            }
        }
    }

    function conectarDB(){
        const abrirConexion = window.indexedDB.open('crm',2);

        abrirConexion.onerror = function(){
            console.log('Hubo un error');
        };

        abrirConexion.onsuccess = function(){
            DB = abrirConexion.result;
        };
    }

    function llenarFormulario(datosCliente){
        const { nombre, email, telefono, empresa } = datosCliente;


        nombreInput.value = nombre;
        emailInput.value = email;
        telefonoInput.value = telefono;
        empresaInput.value = empresa;
        
    }

})();