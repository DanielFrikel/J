
//Regresa 'hidden' si no la vemos y 'visible' si si
document.addEventListener('visibilitychange', ()=>{
    if(document.visibilityState === 'visible'){
        console.log('Ejecutar la función para reproducir el video');
    }else{
        console.log('Pausar el video');
    }
});