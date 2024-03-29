let cliente = {
    mesa: '',
    hora: '',
    pedido: [],
};

const categorias = {
    1: 'Comidas',
    2: 'Bebidas',
    3: 'Postres',
};

const btnGuardarCliente = document.querySelector('#guardar-cliente')
// const primerboton = document.querySelector('#primerboton')

// primerboton.addEventListener('click', mostrarModal);
btnGuardarCliente.addEventListener('click', guardarCliente);

// function mostrarModal(){
//     modal.show();
// }

function guardarCliente() {
    const mesa = document.querySelector('#mesa').value;
    const hora = document.querySelector('#hora').value;

    //Revisar si hay campos vacios.
    const camposVacios = [mesa,hora].some(campo=>campo==='');

    if(camposVacios){
        const existeAlerta = document.querySelector('.invalid-feedback');

        if(!existeAlerta){
        const alerta = document.createElement('DIV');
        alerta.classList.add('invalid-feedback','d-block','text-center');
        alerta.textContent = 'Todos los campos son obligatorios';
        
            document.querySelector('.modal-body form').appendChild(alerta);        
            setTimeout(() => {
                alerta.remove();
            }, 2000);
        }      

        return; 
    }

    //Asignar datos del formulario al objeto cliente.
    cliente = {...cliente,mesa,hora};
    
    //Ocultar el modal.
    const modalFormulario = document.querySelector('#modal-formulario');
    if(modalFormulario){
        const modalBootstrap = bootstrap.Modal.getInstance(modalFormulario);
        modalBootstrap.hide();
    }

    //Mostrar las secciones
    mostrarSecciones();

    //Obtener platillos de la API de JSON Server
    obtenerPlatillos();

}

function mostrarSecciones(){
    //Mostrar seccion de productos, les quita
    //la clase display none
    const seccionesOcultas = document.querySelectorAll('.d-none');
    seccionesOcultas.forEach(seccion=>seccion.classList.remove('d-none'));
}
function obtenerPlatillos(){
    const url = 'http://localhost:4000/platillos';

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => mostrarPlatillos(resultado))
        .catch(error => console.log(error));
}

function mostrarPlatillos(platillos){
    const contenido = document.querySelector('#platillos .contenido');        

    platillos.forEach(platillo=>{
        const row = document.createElement('DIV');
        row.classList.add('row','py-3','border-top');

        const nombre = document.createElement('DIV');
        nombre.classList.add('col-md-4');
        nombre.textContent = platillo.nombre;

        const precio = document.createElement('DIV');
        precio.classList.add('col-md-3','fw-bold');
        precio.textContent = `
            $${platillo.precio}
        `;

        const categoria = document.createElement('DIV');
        //las columnas de bootstrap son de 12, con este
        //llevariamos 10 columnas
        categoria.classList.add('col-md-3');
        categoria.textContent = categorias[platillo.categoria];

        const inputCantidad = document.createElement('INPUT');        
        inputCantidad.type = 'number';
        inputCantidad.min = 0;        
        inputCantidad.value = 0;        
        inputCantidad.id = `producto-${platillo.id}`;        
        inputCantidad.classList.add('form-control');

        //Funcion que detecta la cantidad y el platillo que se esta agregando
        //Se le puso .onchange porque no se puede poner .addEventListener
        //porque fue creado despues de que se cargo el DOM.
        inputCantidad.onchange = function(){
            const cantidad = parseInt(inputCantidad.value);

            //Si no metes esta funcion en una funcion lineal
            //va a llamar al onchange en cuanto se carge
            //en cambio asi espera a que se haga el cambio
            agregarPlatillo({...platillo,cantidad});
            //con el spread operator anterior
            // crea un objeto con los dos parametros al mismo nivel
        };

        const agregar = document.createElement('DIV');
        agregar.classList.add('col-md-2');
        agregar.appendChild(inputCantidad);

                        
        row.appendChild(nombre);
        row.appendChild(precio);
        row.appendChild(categoria);
        row.appendChild(agregar);
        

        contenido.appendChild(row);

    })
}

function agregarPlatillo(producto){
    //Extraer el pedido actual
    let {pedido} = cliente;

    //Revisar que la cantidad sea mayor a 0
    if(producto.cantidad > 0){
        //Comprueba si el elemento ya existe en el array
        if(pedido.some(articulo=>articulo.id === producto.id)){
            //El articulo ya existe
            const pedidoActualizado = pedido.map(articulo=>{
                if(articulo.id === producto.id){
                    articulo.cantidad = producto.cantidad;                    
                }
                return articulo;                
            });
            //Se asigna el nuevo array a cliente.pedido
            cliente.pedido = [...pedidoActualizado];                        
        }else{
            //El articuilo no existe, lo agregamos al array de pedido
            cliente.pedido = [...pedido, producto];
        }
    }else{
        const resultado = pedido.filter(articulo=>articulo.id !== producto.id);
        cliente.pedido = [...resultado];
    }
    
    //Limpiar el HTML previo
    limpiarHTML();

    if(cliente.pedido.length){
        //Mostrar el resumen
        actualizarResumen();
    }else{
        mensajePedidoVacio();  
    }    
}

function actualizarResumen(){
    const contenido = document.querySelector('#resumen .contenido');

    const resumen = document.createElement('DIV');
    resumen.classList.add('col-md-6','card','py-2','px-3','shadow');

    //Informacion de la mesa
    const mesa = document.createElement('P');
    mesa.textContent = 'Mesa: ';
    mesa.classList.add('fw-bold');
    
    const mesaSpan = document.createElement('SPAN');
    mesaSpan.textContent = cliente.mesa;
    mesaSpan.classList.add('fw-normal');


    //Informacion de la hora
    const hora = document.createElement('P');
    hora.textContent = 'Hora: ';
    hora.classList.add('fw-bold');
    
    const horaSpan = document.createElement('SPAN');
    horaSpan.textContent = cliente.hora;
    horaSpan.classList.add('fw-normal');

    mesa.appendChild(mesaSpan);
    hora.appendChild(horaSpan);

    //Titulo de la seccion
    const heading = document.createElement('H3');
    heading.textContent = 'Platillos Consumidos';
    heading.classList.add('my-4','text-center');
    
    //Iterar sobre el array de pedidos
    const grupo = document.createElement('UL');
    grupo.classList.add('list-group');

    const { pedido } = cliente;
    pedido.forEach(articulo=> {
        const {nombre,cantidad,precio,id} = articulo;

        const lista = document.createElement('LI');
        lista.classList.add('list-group-item');

        const nombreEl = document.createElement('H4');
        nombreEl.classList.add('my-4');
        nombreEl.textContent = nombre;

        //Cantidad del articulo
        const cantidadEl = document.createElement('P');
        cantidadEl.classList.add('fw-bold');
        cantidadEl.textContent = 'Cantidad: ';

        const cantidadValor = document.createElement('SPAN');
        cantidadValor.classList.add('fw-normal');
        cantidadValor.textContent = cantidad;

        //Precio del articulo
        const precioEl = document.createElement('P');
        precioEl.classList.add('fw-bold');
        precioEl.textContent = 'Precio: ';

        const precioValor = document.createElement('SPAN');
        precioValor.classList.add('fw-normal');
        precioValor.textContent =  `$${precio}`;

        //Subtotal del articulo
        const subtotalEl = document.createElement('P');
        subtotalEl.classList.add('fw-bold');
        subtotalEl.textContent = 'Subtotal: ';

        const subtotalValor = document.createElement('SPAN');
        subtotalValor.classList.add('fw-normal');
        subtotalValor.textContent = calcularSubtotal(precio,cantidad);
        
        //Boton para eliminar
        const btnEliminar = document.createElement('BUTTON');
        btnEliminar.classList.add('btn','btn-danger','float-end');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.onclick = function(){
            eliminarProducto(id);
        }


        //Agregar valores a sus contenedores
        cantidadEl.appendChild(cantidadValor);        
        precioEl.appendChild(precioValor);        
        subtotalEl.appendChild(subtotalValor);        

        //Agregar elementos al LI
        lista.appendChild(nombreEl);
        lista.appendChild(cantidadEl);
        lista.appendChild(precioEl);
        lista.appendChild(subtotalEl);
        lista.appendChild(btnEliminar);

        //Agregar lista al grupo principal
        grupo.appendChild(lista);
    });

    //Agregar al contenido
    resumen.appendChild(heading);
    resumen.appendChild(mesa);
    resumen.appendChild(hora);
    resumen.appendChild(grupo);

    contenido.appendChild(resumen);

    //Mostrar el formulario de propinas
    formularioPropinas();
}

function limpiarHTML(){
    const contenido = document.querySelector('#resumen .contenido');

    while(contenido.firstChild){
        contenido.removeChild(contenido.firstChild);
    }
}

function calcularSubtotal(precio, cantidad){
    return `$${precio*cantidad}`;
}

function eliminarProducto(id){
    const {pedido} = cliente;

    const resultado = pedido.filter(articulo=>articulo.id !== id);
    cliente.pedido = [...resultado];

    limpiarHTML();

    if(cliente.pedido.length){
        //Mostrar el resumen
        actualizarResumen();
    }else{
        mensajePedidoVacio();  
    }   
    
    //El producto se elimino por lo tanto regresamos la cantidad a 0 en el formulario    
    const productoEliminado = `#producto-${id}`;    
    const inputEliminado = document.querySelector(`${productoEliminado}`);        
    inputEliminado.value = 0;
}

function mensajePedidoVacio(){
    const contenido = document.querySelector('#resumen .contenido');

    const texto = document.createElement('P');
    texto.classList.add('text-center')
    texto.textContent = 'Anade los elementos del pedido';

    contenido.appendChild(texto);
}

function formularioPropinas(){
    const contenido = document.querySelector('#resumen .contenido');
    const formulario = document.createElement('DIV');
    formulario.classList.add('col-md-6','formulario');

    const divFormulario = document.createElement('DIV');
    divFormulario.classList.add('card','py-2','px-3','shadow');

    const heading = document.createElement('H3');
    heading.classList.add('my-4','text-center');
    heading.textContent = 'Propinas';

    //Radio Button 10%
    const radio10 = document.createElement('INPUT');
    radio10.type = 'radio';
    radio10.name = 'propina';
    radio10.value = '10';
    //radio10.id = 'propina10';
    radio10.classList.add('form-check-input');
    radio10.onclick = calcularPropina;

    const radio10Label = document.createElement('LABEL');
    radio10Label.textContent = '10%';
    radio10Label.classList.add('form-check-label');

    const radio10Div = document.createElement('DIV');
    radio10Div.classList.add('form-check');

    //Agregar al div principal
    radio10Div.appendChild(radio10);
    radio10Div.appendChild(radio10Label);

    //Radio Button 25%
    const radio25 = document.createElement('INPUT');
    radio25.type = 'radio';
    radio25.name = 'propina';
    radio25.value = '25';
    //radio10.id = 'propina10';
    radio25.classList.add('form-check-input');
    radio25.onclick = calcularPropina;


    const radio25Label = document.createElement('LABEL');
    radio25Label.textContent = '25%';
    radio25Label.classList.add('form-check-label');

    const radio25Div = document.createElement('DIV');
    radio25Div.classList.add('form-check');


    
    //Radio Button 50%
    const radio50 = document.createElement('INPUT');
    radio50.type = 'radio';
    radio50.name = 'propina';
    radio50.value = '50';
    //radio10.id = 'propina10';
    radio50.classList.add('form-check-input');
    radio50.onclick = calcularPropina;

    const radio50Label = document.createElement('LABEL');
    radio50Label.textContent = '50%';
    radio50Label.classList.add('form-check-label');

    const radio50Div = document.createElement('DIV');
    radio50Div.classList.add('form-check');
    

    //Agregar al div principal
    radio10Div.appendChild(radio10);
    radio10Div.appendChild(radio10Label);
    radio25Div.appendChild(radio25);
    radio25Div.appendChild(radio25Label);
    radio50Div.appendChild(radio50);
    radio50Div.appendChild(radio50Label);

    //Agregar al formulario
    divFormulario.appendChild(heading);
    divFormulario.appendChild(radio10Div);  
    divFormulario.appendChild(radio25Div);  
    divFormulario.appendChild(radio50Div);  

    formulario.appendChild(divFormulario);    

    contenido.appendChild(formulario);
}

function calcularPropina(){
    const {pedido} = cliente;
    let subtotal = 0;

    pedido.forEach(articulo=>{
        subtotal += articulo.precio * articulo.cantidad;        
    });

    const propinaSeleccionada = document.querySelector('[name="propina"]:checked').value;
    
    //Calcular la propina
    const propina = ((subtotal * parseInt(propinaSeleccionada))/100);

    //Calcular el total a pagar
    const total = subtotal + propina;
    
    
    mostrarTotalHTML(subtotal,total,propina);

    // //Enviar al servidor
    // btnEnviar.onclick = function(){
    //     const xhr = new XMLHttpRequest();

    //     xhr.open('POST','http://localhost:3000/pedidos',true);
    //     xhr.setRequestHeader('Content-Type','application/json');

    //     xhr.onload = function(){
    //         if(this.status === 201){
    //             const respuesta = JSON.parse(xhr.responseText);
    //             console.log(respuesta);
    //         }
    //     }

    //     xhr.send(JSON.stringify(cliente));
    // }    
        
}

function mostrarTotalHTML(subtotal,total,propina){

    const divTotales = document.createElement('DIV');
    divTotales.classList.add('total-pagar','my-5');


    //Subtotal
    const subtotalParrafo = document.createElement('P');
    subtotalParrafo.classList.add('fs-4','fw-bold','mt-2');
    subtotalParrafo.textContent = `Subtotal Consumo: `;

    const subtotalSpan = document.createElement('SPAN');
    subtotalSpan.classList.add('fw-normal');
    subtotalSpan.textContent = `$${subtotal}`;

    subtotalParrafo.appendChild(subtotalSpan);


    //Propina
    const propinaParrafo = document.createElement('P');
    propinaParrafo.classList.add('fs-4','fw-bold','mt-2');
    propinaParrafo.textContent = `Propina: `;

    const propinaSpan = document.createElement('SPAN');
    propinaSpan.classList.add('fw-normal');
    propinaSpan.textContent = `$${propina}`;

    propinaParrafo.appendChild(propinaSpan);

    //Total
    const totalParrafo = document.createElement('P');
    totalParrafo.classList.add('fs-4','fw-bold','mt-2');
    totalParrafo.textContent = `Total: `;

    const totalSpan = document.createElement('SPAN');
    totalSpan.classList.add('fw-normal');
    totalSpan.textContent = `$${total}`;

    totalParrafo.appendChild(totalSpan);

    //Eliminar el ultimo resultado
    const totalpagarDiv = document.querySelector('.total-pagar');
    if(totalpagarDiv){
        totalpagarDiv.remove();
    }    

    divTotales.appendChild(subtotalParrafo);
    divTotales.appendChild(propinaParrafo);
    divTotales.appendChild(totalParrafo);

    const formulario = document.querySelector('.formulario > div');
    formulario.appendChild(divTotales);
}


