//Module Pattern

const modulo1 = (function(){
    const nombre = 'Juan';

    function hola(){
        console.log('HOLA');
    }

    return{
        nombre,
        hola
    }
})();
