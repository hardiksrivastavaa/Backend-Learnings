// ---------------------------------------------------------
// Object Prototpye
// ------------------

// let arr = [3, 5, , 7, 6, 6];
// let arr1 = [3, 5, , 7, 6, 6];


// arr.__proto__.push = (n) => {
//     console.log("pushing number : ", n);
// }

// console.log(arr1.push(10));
// console.log(arr.push(10));

// arr.__proto__.sayhello = () => {
//     console.log("hello");
// }

// console.log(arr.sayhello());
// console.log(arr1.sayhello());

// ------------------
// Object Prototpye
// ---------------------------------------------------------

// ------------------
// Factory Function
// ---------------------------------------------------------

// function personMaker(name, age) {
//     let person = {
//         name: name,
//         age: age,
//         talk() {
//             console.log(`Hi I am ${name}`);
//         }
//     }
//     return person;
// }

// let p1 = personMaker("hardik", 19); // copy
// let p2 = personMaker("Nikhil", 18); // copy

// console.log(p1);
// console.log(p2);

// console.log(p1 === p2 ); // return false

// ------------------
// New Keyword
// ---------------------------------------------------------

// Constructor - doesn't return anything & start with captial letter by convention

// function Person(name, age) {
//     this.name = name;
//     this.age = age;
// }

// Person.prototype.talk = function() {
//     console.log(`Hi I am ${this.name}`);
// }

// let p1 = new Person("hardik", 19);
// let p2 = new Person("Nikhil", 18);

// console.log(p1);
// console.log(p2);

// console.log(p1.talk == p2.talk); // return true

// ------------------
// factory function aur contructor function se bhi better tarika class hai vo niche diya gya h kaise
// ---------------------------------------------------------

// class Person {
//     constructor(name, age) {
//         this.name = name;
//         this.age = age;
//     }
//     talk() {
//         console.log("Hi My Name is : ", this.name);
//     }
// }

// p1 = new Person("hardik", 28);
// p2 = new Person("nikhil", 39);

// console.log(p1);
// console.log(p2);


//_____________________________________________________________________________________________________


// Class and Interitance Example


class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
    }

    talk() {
        console.log("Hi I my name is : ", this.name);
    }
}

class Student extends Person {
    constructor(name, age, marks) {
        super(name, age);
        this.marks = marks;
    }
}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }
}

s1 = new Student("Hardik", 35, 312);
t1 = new Teacher("Shweta", 83, "DSUC");

console.log(s1);
console.log(t1);

// Second Example

class Mammal {
    constructor(name) {
        this.name = name;
        this.type = "Warm-Blooded";
    }

    eat() {
        console.log("Eating.......");
    }
}

class Dog extends Mammal {
    constructor(name) {
        super(name);
    }

    bark() {
        console.log("Barking....");
    }
}

class Cat extends Mammal {
    constructor(name) {
        super(name);
    }

    meow() {
        console.log("Meowing.....");
    }
}

b1 = new Dog("tuffy");
c1 = new Cat("Billi");

console.log(c1);
console.log(b1);

