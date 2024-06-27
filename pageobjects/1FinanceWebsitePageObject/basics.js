// const a = 14
// const b = 16

// // User-defined function
// function add(a, b) {
//     return a + b;
// }

// // Named function
// function greet(name) {
//     return `Hello, ${name}!`;
// }

let person = {
    name: "Neshma",
    profession: "cs",
    phoneNo: 45,
    bool: 34.54,
    greet: function () {
        console.log("good morning")
        return 5
    }
}

// console.log(person.name)
// const resp = person.greet()

// console.log(person.greet())
// console.log(resp)

// console.log(typeof (person.bool))


const array = ["apple", "Mango"]

for (let i = 0; i < array.length; i++) {
    console.log(array[i])
}



// var greet = function () {
//     console.log("good morning")
//     return 5
// }
// greet()


// console.log("Playwright Session 2")





// var greet = function () {
//     console.log("Welcome to GeeksforGeeks!");
// };

// greet();




// Function that takes two numbers and a callback function
function calculate(num1, num2, callback) {
    const result = num1 + num2;
    // Invoke the callback function with the result
    callback(result);
}

// Callback function that simply logs the result
function logResult(result) {
    console.log('The result is:', result);
}

// Call the calculate function with two numbers and the callback function
calculate(10, 20, logResult);



// Higher-order function: takes another function as an argument
function doOperation(operation, x, y) {
    return operation(x, y);
}

function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

// Using the higher-order function with different operations
console.log(doOperation(add, 5, 3));       // Output: 8
console.log(doOperation(subtract, 10, 4)); // Output: 6
console.log(doOperation(multiply, 2, 6));  // Output: 12























