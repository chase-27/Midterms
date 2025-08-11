import person from './helloworld.js'

const man = person("John", "Doe", 18);

console.log(man.fullName(), man.isAdult() ? " is an adult" : "is not an adult")

/* man.isAdult() ? " is an adult" : "is not an adult"
Called a conditional expression, useful for keeping things one line and neat
Same as

if ( man.isAdult() ) {
    " is an adult"
}   else {
    "is not an adult"
}

*/