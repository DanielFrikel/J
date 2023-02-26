////////// NOTIFICATION API //////////
//////////////////////////////////////
const notificarBtn = document.querySelector('#notificar');

notificarBtn.addEventListener('click', ()=>{
   Notification
        .requestPermission()
        .then(resultado => {
            //granted = aceptado, default = rechazado
            console.log('El resultado es ' + resultado);
        })
});

const verNotificacion = document.querySelector('#verNotificacion');

verNotificacion.addEventListener('click',()=>{
    if(Notification.permission == 'granted'){
        //new Notification('Esta es la notificacion');
        
        // new Notification('Titulo de la Notificacion', { 
        //     icon: 'img/deer.png',
        //     body: 'Daniel Aguilar'
        // });

        const notificacion = new Notification('Titulo de la Notificacion', { 
            icon: 'img/deer.png',
            body: 'Daniel Aguilar'
        });

        notificacion.onclick = function(){
            window.open('https://www.google.com.mx/');
        }
    }
})