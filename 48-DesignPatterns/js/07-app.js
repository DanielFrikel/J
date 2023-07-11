//Namespaces
//Evita chocar con nombres de variables o funciones globales.
const restaurantApp = {};

restaurantApp.platillos = [
    {
        platillo: 'Pizza',
        precio: 25
    },
    {
        platillo: 'Hamburguesa',
        precio: 20
    },
    {
        platillo: 'Pizza',
        precio: 20
    },
];


restaurantApp.funciones = {
    mostrarMenu: platillos => {
        console.log(`Bienvenidos a nuestro menu`);

        platillos.forEach((platillo,index) => {
            console.log(`${index} : ${platillo.platillo} $${platillo.precio}`);
        });
    },

    ordenar: id=>{
        console.log(`Tu platillo: ${restaurantApp.platillos[id].platillo} se esta preparando`);
    },
    
    agregarPlatillo: (platillo,precio)=>{
        const nuevo = {
            platillo,
            precio
        };

        restaurantApp.platillos.push(nuevo);
    }
}

restaurantApp.funciones.ordenar(1);
restaurantApp.funciones.agregarPlatillo('Taco',20);
const { platillos } = restaurantApp;
restaurantApp.funciones.mostrarMenu(platillos);

