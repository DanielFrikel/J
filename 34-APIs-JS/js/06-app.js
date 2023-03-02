//Speech API
const salida = document.querySelector('#salida');
const microfono = document.querySelector('#microfono');

microfono.addEventListener('click', ejecutarSpeechAPI);

function ejecutarSpeechAPI(){
    //speechRecognition es la API que se va a utilizar
    const SpeechRecognition = webkitSpeechRecognition;

    //recognition es la instancia de la API
    const recognition = new SpeechRecognition();

    //start es para iniciar la grabación
    recognition.start();

    //onstart se ejecuta cuando empieza a grabar
    recognition.onstart = function(){
        salida.classList.add('mostrar');
        salida.textContent = 'Escuchando...';
    };

    //onspeechend se ejecuta cuando dejamos de hablar
    recognition.onspeechend = function(){
        salida.textContent = 'Se dejó de grabar';
        recognition.stop();
    };

    recognition.onresult = function(e){
        //e.result es lo que hablamos
        console.log(e.results[0][0]);
        //confidence es la seguridad de lo que hablamos
        //transcript es lo que hablamos
        //e.results[0][0] es el primer resultado
        const {confidence, transcript} = e.results[0][0];

        //speech es el parrafo que se va a mostrar
        const speech = document.createElement('p');
        speech.innerHTML = `Grabado: ${transcript}`;
        speech.classList.add('mostrar');

        //seguridad es el parrafo que se va a mostrar
        const seguridad = document.createElement('p');
        seguridad.innerHTML = `Seguridad: ${parseInt(confidence * 100)} %`;
        seguridad.classList.add('mostrar');

        //se agregan los parrafos a la salida
        salida.appendChild(speech);
        salida.appendChild(seguridad);

    };


}