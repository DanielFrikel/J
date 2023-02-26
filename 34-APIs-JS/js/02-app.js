/////////// Intersection Observer - API //////////////////
//////////////////////////////////////////////////////////
//Muestra algo cuando esa parte del HTML esta visible

document.addEventListener('DOMContentLoaded', ()=>{
    const observer = new IntersectionObserver(entries=>{       
        if(entries[0]){
            console.log('Ya esta visible');
        }
    });

    //Muestra algo cuando esa parte del HTML esta visible
    observer.observe(document.querySelector('.premium'));    
    
});