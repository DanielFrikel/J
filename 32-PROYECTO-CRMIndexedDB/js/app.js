(function () {

    let DB;
    const listadoClientes = document.querySelector('#listado-clientes');

    //En este IFI las variables se quedan aqui de manera local
    document.addEventListener('DOMContentLoaded',()=>{
        crearDB();
        
        if(window.indexedDB.open("crm",2)){
            obtenerClientes();
        }

        listadoClientes.addEventListener('click',eliminarRegistro);
        
    });

    function eliminarRegistro(e){
        if(e.target.classList.contains('eliminar')){
            const idEliminar = Number(e.target.dataset.cliente);
            
            //Regresa true o false, es una ventana pop-up nativa del 
            //navegador
            const confirmar = confirm('Deseas eliminar este cliente?');
            if(confirmar){
                const transaction = DB.transaction(['crm'],'readwrite');
                const objectStore = transaction.objectStore('crm');

                //Busca el registro con la coincidencia del keypath
                //y se elimina.
                objectStore.delete(idEliminar);


                transaction.oncomplete = function(){
                    e.target.parentElement.parentElement.remove();
                }

                transaction.onerror = function(){
                    console.log('Hubo un error');
                }
            }
        }
    }

    //Crea la Base de Datos de IndexedDB
    function crearDB(){
        const crearDB1 = window.indexedDB.open("crm",2);

        crearDB1.onerror = function(){
            console.log('Hubo un error');        
        };

        crearDB1.onsuccess = function(e){
            if(e.crearDB1){DB = e.crearDB1.result;}
        };

        crearDB1.onupgradeneeded = function(e){
            console.log('HOLA');
            const db2 = e.target.result;
            
            const objectStore = db2.createObjectStore("crm",{
                keyPath: 'id',
                autoIncrement: true
            });

            objectStore.createIndex('nombre','nombre',{unique:false});            
            objectStore.createIndex('email','email',{unique:true});
            objectStore.createIndex('telefono','telefono',{unique:false});
            objectStore.createIndex('empresa','empresa',{unique:false});
            objectStore.createIndex('id','id',{unique:true});

            console.log('DB lista y creada');            
        }
    }

    function obtenerClientes(){        
        const abrirConexion = window.indexedDB.open("crm",2);

        abrirConexion.onerror = function(){
            console.log('Hubo un errorrrr');
        }

        abrirConexion.onsuccess = function(e){
            DB = abrirConexion.result;
            
            const objectStore = DB.transaction("crm").objectStore("crm");

            objectStore.openCursor().onsuccess = function(e){
                const cursor = e.target.result;
                
                if(cursor){
                    const { nombre, empresa, email, telefono, id} = cursor.value;
                    
                    
                    listadoClientes.innerHTML+= ` <tr>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200">
                                <p class="text-sm leading-5 font-medium text-gray-700 text-lg  font-bold"> ${nombre} </p>
                                <p class="text-sm leading-10 text-gray-700"> ${email} </p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 ">
                                <p class="text-gray-700">${telefono}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200  leading-5 text-gray-700">    
                                <p class="text-gray-600">${empresa}</p>
                            </td>
                            <td class="px-6 py-4 whitespace-no-wrap border-b border-gray-200 text-sm leading-5">
                                <a href="editar-cliente.html?id=${id}" class="text-teal-600 hover:text-teal-900 mr-5">Editar</a>
                                <a href="#" data-cliente="${id}" class="text-red-600 hover:text-red-900 eliminar">Eliminar</a>
                            </td>
                        </tr>
                    `;

                    cursor.continue();                    
                }else{
                    console.log('No hay mas registros');
                }
            }
        }

    }
})();