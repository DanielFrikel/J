function contact(name,number){
    this.name = name;
    this.number = number;
    this.print = ()=>{
        console.log(this.name + ": " + this.number);
    };
}


var a = new contact("David",1234567890);
var b = new contact("Amy",0987654321);

a.print();
b.print();