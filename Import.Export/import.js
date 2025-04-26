import { sum, mul } from "./export.js"
import { generate, count } from "random-words";


console.log(sum(5, 9));
console.log(mul(5, 9));
console.log(generate(5));
console.log(generate({ minLength: 5 }));

