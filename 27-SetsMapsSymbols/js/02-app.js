//WeakSet

const weakset = new WeakSet();

const cliente = {
    nombre: 'Juan',
    saldo: 100
}

weakset.add(cliente);
weakset.has(cliente);
//weakset.delete(cliente);


console.log(weakset)