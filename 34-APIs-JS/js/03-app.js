//Verificar si tenemos internet wifi o no

window.addEventListener('online', updateStatus);
window.addEventListener('offline', updateStatus);

function updateStatus(){
    if(navigator.onLine){
        console.log('Si hay internet');
    }else{
        console.log('No hay internet');
    }
}
