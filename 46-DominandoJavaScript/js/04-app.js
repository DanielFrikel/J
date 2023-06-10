//Implicit Binding

const usuario = {
    nombre: 'Daniel',
    edad: '25',
    informacion(){
        console.log(`Mi nombre es ${this.nombre} mi edad es ${this.edad}`);
    },
    mascota: {
        nombre: 'Hook',
        edad: 1,
        informacion(){
            console.log(`Mi mascota es ${this.nombre} su edad es ${this.edad}`);
        }
    }
}

usuario.informacion();
usuario.mascota.informacion();