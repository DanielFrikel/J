//TryCatch
//Si hacemos lo siguiente sin el TryCatch, el programa se detiene y no se ejecuta lo que sigue
//Pero con el TryCatch, el programa se ejecuta y nos muestra el error en consola
console.log(1+1);
try{
    hola();
}catch(error){
    console.log(error);
}

console.log(2+2);
