var a = 12; // Global Scope 

let b = 3;
console.log(b);
b = 4;
console.log(b);

const c = 43;

//function
function add(x, y) {
    return x + y;
}
const addResponse = add(a, b); 
console.log(addResponse);

//Object
let person = {
    name : "Runali", 
    surname : "Painaik",
    greet : function(){
        console.log("Hi my dear friends !")
    }
}

console.log(person.name)
person.greet()


//class
class Language {
    constructor(language){
        this.language = language;
    }

    lang(){
        console.log("We are learning " + this.language)
    }
}

let learning = new Language("JavaScript");

console.log(learning.language)
learning.lang()


// constructor

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }
}

const person1 = new Person('Nasha', 25);

console.log(person1.name); 
console.log(person1.age);
