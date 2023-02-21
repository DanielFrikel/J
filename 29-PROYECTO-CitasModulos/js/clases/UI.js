import { eliminarCita,cargarEdicion } from '../funciones.js';
import { contenedorCitas, heading } from '../selectores.js';

class UI{
    imprimirAlerta(mensaje,tipo){
        //Crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center','alert','d-block','col-12');

        //Agregar clase en base al tipo de error
        if(tipo==='error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        //Mensaje de erro
        divMensaje.textContent = mensaje;

        //Agregar al DOM
        document.querySelector('#contenido').insertBefore(divMensaje,document.querySelector('.agregar-cita'));

        setTimeout(()=>{
            divMensaje.remove();
        },1500);
    }

    //Haciendo el mismo destructuring que el comentado abajo
    //pero desde los parametros
    imprimirCitas( {citas} ){
        //const {citas} = citas;
        this.limpiarHTML();

        citas.forEach(cita=>{
            const {mascota,propietario,telefono,fecha,hora,sintomas,id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita','p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title','font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');            
            propietarioParrafo.innerHTML=`
                <span class="font-weight-bolder">Propietario: </span>${propietario}
            `;

            const telefonoParrafo = document.createElement('p');            
            telefonoParrafo.innerHTML=`
                <span class="font-weight-bolder">Telefono: </span>${telefono}
            `;

            const fechaParrafo = document.createElement('p');            
            fechaParrafo.innerHTML=`
                <span class="font-weight-bolder">Fecha: </span>${fecha}
            `;

            const horaParrafo = document.createElement('p');            
            horaParrafo.innerHTML=`
                <span class="font-weight-bolder">Hora: </span>${hora}
            `;

            const sintomasParrafo = document.createElement('p');            
            sintomasParrafo.innerHTML=`
                <span class="font-weight-bolder">Sintomas: </span>${sintomas}
            `;
            
            //Boton para eliminar esta cita
            const btnEliminar = document.createElement('button');
            btnEliminar.classList.add('btn','btn-danger','mr-2');
            btnEliminar.innerHTML=`Eliminar <svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>`;

            btnEliminar.onclick=()=>eliminarCita(id);

            //Boton para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn','btn-info');
            btnEditar.innerHTML=`<svg aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" stroke-linecap="round" stroke-linejoin="round"></path>
            </svg>`;
            btnEditar.onclick=()=>cargarEdicion(cita);


            //Agregar los parrafos al divCita
            divCita.appendChild(mascotaParrafo);
            divCita.appendChild(propietarioParrafo);
            divCita.appendChild(telefonoParrafo);
            divCita.appendChild(fechaParrafo);
            divCita.appendChild(horaParrafo);
            divCita.appendChild(sintomasParrafo);
            divCita.appendChild(btnEliminar);
            divCita.appendChild(btnEditar);

            //Agregar las citas al HTML
            contenedorCitas.appendChild(divCita);

        })

    }

    textoHeading(citas){
        if(citas.length>0){
            heading.textContent = 'Administra tus Citas';
        }else{
            heading.textContent = 'No hay citas, comienza creando una';
        }
    }

    limpiarHTML(){
        while(contenedorCitas.firstChild){
            contenedorCitas.removeChild(contenedorCitas.firstChild);
        }
    }
}

export default UI;