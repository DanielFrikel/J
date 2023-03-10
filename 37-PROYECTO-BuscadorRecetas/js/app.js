//API TheMealDB - https://www.themealdb.com/api.php
//themealdb.com/api/json/v1/1/lookup.php?i=52772
//themealdb.com/api/json/v1/1/filter.php?c=Seafood
//themealdb.com/api/json/v1/1/categories.php

function iniciarApp(){

    const resultado = document.querySelector('#resultado');

    //El evento change funciona porque primero se corrio el DOMContentLoaded
    //y corrio IniciarApp(), permitiendo cargar el DOM y luego ejecutar el evento
    //change en el selectCategorias
    const selectCategorias = document.querySelector('#categorias');

    if(selectCategorias){
        selectCategorias.addEventListener('change', seleccionarCategoria);

        // Eventos
        obtenerCategorias();
    }
    const favoritosDiv = document.querySelector('.favoritos');
    if(favoritosDiv){
        obtenerFavoritos();
    }
    
    // const formulario = document.querySelector('#formulario');    
    // const btnBuscar = document.querySelector('#buscar');
    // const btnLimpiar = document.querySelector('#limpiar');    
    const modal = new bootstrap.Modal('#modal', {});



    // Funciones y Eventos de la API TheMealDB
    function obtenerCategorias(){
        // Obtener las categorias de la API
        url = 'https://themealdb.com/api/json/v1/1/categories.php';
            
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarCategorias(resultado.categories))
            .catch(error => console.log(error));

    }

    // Muestra las categorias en el select
    function mostrarCategorias(categorias = []){
        //forEach para recorrer el arreglo de categorias        
        categorias.forEach(categoria => {     
            const option = document.createElement('OPTION');            
            //Destructuring a la categoria
            const { strCategory, strCategoryThumb, strCategoryDescription } = categoria;
            //Asignar valores al option
            option.value = strCategory;            
            option.textContent = strCategory;

            //Agregar el option al select
            selectCategorias.appendChild(option);
        });
    }
    
    //Selecciona la categoria y muestra las recetas
    function seleccionarCategoria(e){
        const categoria = e.target.value;
        url = `https://themealdb.com/api/json/v1/1/filter.php?c=${categoria}`;
        
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetas(resultado.meals))
            .catch(error => console.log(error));
        
    }

    function mostrarRecetas(recetas=[]){
        limpiarHTML(resultado);

        //Mostrar el heading de la seccion
        const heading = document.createElement('H2');
        heading.classList.add('text-center', 'my-5', 'text-black');
        //Ternario para mostrar el mensaje de no hay resultados
        heading.textContent = recetas.length ? 'Resultados' : 'No hay Resultados';        
        resultado.appendChild(heading);

        //Recorrer el arreglo de recetas
        recetas.forEach(receta => {            
            const { strMeal, strMealThumb, idMeal } = receta;

            const recetaContenedor = document.createElement('DIV');
            recetaContenedor.classList.add('col-md-4');
            
            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card','mb-4','shadow-sm');

            const recetaImagen = document.createElement('IMG');
            recetaImagen.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta ${strMeal ?? receta.titulo}`;
            //el ?? coalescencia nula es un operador que permite asignar
            //un valor por defecto si el valor de la izquierda es nulo            
            recetaImagen.src = strMealThumb ?? receta.img;
            
            const recetaCardBody = document.createElement('DIV');
            recetaCardBody.classList.add('card-body');

            const recetaHeading = document.createElement('H3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = strMeal ?? receta.titulo;

            const recetaButton = document.createElement('BUTTON');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver Receta';
            // recetaButton.dataset.bsTarget = '#modal';

            //bsToggle es un atributo de data-bs-toggle
            //que se agrega al boton para que se muestre el modal            
            //de bootstrap al hacer click en el boton
            // recetaButton.dataset.bsToggle = 'modal';
            recetaButton.setAttribute('data-id', idMeal);
            recetaButton.onclick =()=>seleccionarReceta(idMeal ?? receta.id);
            

            //Inyectar en el codigo HTML
            recetaCardBody.appendChild(recetaHeading);
            recetaCardBody.appendChild(recetaButton);

            recetaCard.appendChild(recetaImagen);
            recetaCard.appendChild(recetaCardBody);

            recetaContenedor.appendChild(recetaCard);

            resultado.appendChild(recetaContenedor);
            

        });
    }

    function seleccionarReceta(id){
        const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
        fetch(url)
            .then(respuesta => respuesta.json())
            .then(resultado => mostrarRecetaModal(resultado.meals[0]))
            .catch(error => console.log(error));                
    }

    function mostrarRecetaModal(receta){
        const { idMeal, strInstructions, strMeal, strMealThumb } = receta;        
        
        //Anadir contenido al modal
        const modalTitle = document.querySelector('.modal .modal-title');
        const modalBody = document.querySelector('.modal .modal-body');
        
        modalTitle.textContent = strMeal;
        modalBody.innerHTML = `
            <img class="img-fluid" src="${strMealThumb}" alt="receta ${strMeal}" />
            <h3 class="mt-3">Instrucciones</h3>
            <p class="mt-3 text-justify">${strInstructions}</p> 
            <h3 class="my-3">Ingredientes y Cantidades</h3>

        `;        

        const listGroup = document.createElement('UL');
        listGroup.classList.add('list-group');
        //Mostrar cantidades e ingredientes
        for(let i = 1; i <= 20; i++){

            //IMPORTANTE
            //Si el ingrediente existe, entonces se agrega al modal
            //IMPORTANTE
            //verifica si esta vacio o no
            if(receta[`strIngredient${i}`]){
                const ingredienteLi = document.createElement('LI');
                ingredienteLi.classList.add('list-group-item');
                ingredienteLi.textContent = `
                    ${receta[`strIngredient${i}`]} - ${receta[`strMeasure${i}`]}
                    `;
                listGroup.appendChild(ingredienteLi);
            }
        }        

        modalBody.appendChild(listGroup);

        const modalFooter = document.querySelector('.modal .modal-footer');
        limpiarHTML(modalFooter);

        //Botones de cerrar y favorito
        const btnFavorito = document.createElement('BUTTON');
        btnFavorito.classList.add('btn', 'btn-danger', 'col');
        btnFavorito.textContent = existeStorage(idMeal) ? 'Eliminar Favorito' : 'Guardar Favorito';


        //LocalStorage
        btnFavorito.onclick = function(){
            if(existeStorage(idMeal)){
                eliminarFavorito(idMeal); 
                btnFavorito.textContent = 'Guardar Favorito';  
                mostrarToast('Eliminado Correctamente');

                return;
            }
            
            agregarFavorito({
                id: idMeal,
                titulo: strMeal,
                img: strMealThumb                
            }); 
            btnFavorito.textContent = 'Eliminar Favorito';
            mostrarToast('Agregado Correctamente');
        }                   
            // console.log(JSON.stringify(recetaFavorita));            

            
        

        //la clase col es para que se divida el espacio entre las partes
        const btnCerrarModal = document.createElement('BUTTON');
        btnCerrarModal.classList.add('btn', 'btn-secondary', 'col');
        btnCerrarModal.textContent = 'Cerrar';
        btnCerrarModal.onclick= ()=>modal.hide();

        modalFooter.appendChild(btnFavorito);
        modalFooter.appendChild(btnCerrarModal);
        
       

        //Muestra el modal
        modal.show();        
    }
    
    function agregarFavorito(receta){        
        //Si no hay nada en el localStorage, entonces se crea un arreglo vacio
        //Si lo de la izquierda marca null, entonces se realiza lo de la derecha
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];

        localStorage.setItem('favoritos', JSON.stringify([...favoritos, receta]));
    }

    function eliminarFavorito(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        const nuevosFavoritos = favoritos.filter(favorito => favorito.id!==id);
        localStorage.setItem('favoritos', JSON.stringify(nuevosFavoritos));                
        limpiarHTML(favoritosDiv);
        obtenerFavoritos(id);
    }

    function existeStorage(id){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        return favoritos.some(favorito => favorito.id === id);
    }

    //IMPORTANTE IMPORTANTE IMPORTANTE IMPORTANTE IMPORTANTE IMPORTANTE IMPORTANTE
    function mostrarToast(mensaje){
        const toastDiv = document.querySelector('#toast');
        const toastBody = document.querySelector('.toast-body');

        //Se pasa como parametro el elemento que se quiere mostrar
        const toast = new bootstrap.Toast(toastDiv);
        toastBody.textContent = mensaje;
        toast.show();

    }

    function obtenerFavoritos(){
        const favoritos = JSON.parse(localStorage.getItem('favoritos')) ?? [];
        if(favoritos.length){
            mostrarRecetas(favoritos);

            return;
        }
        
        const noFavoritos = document.createElement('P');
        noFavoritos.textContent = 'No hay favoritos';
        noFavoritos.classList.add('text-center', 'fs-4','font-bold','mt-5');
        
        favoritosDiv.appendChild(noFavoritos);
    }


    function limpiarHTML(selector){
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
}

// Evento DOMContentLoaded para que se ejecute la funcion iniciarApp()
document.addEventListener('DOMContentLoaded', iniciarApp);
