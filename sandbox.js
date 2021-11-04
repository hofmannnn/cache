let x = new Set();

let date = Date.now();

x.add({});
x.add(2);
//get iterator:
let it = x.values();
let first = it.next();

console.log('first**', first);

x.delete(1);
console.log('x.has(1);**', x.has(1));


console.log('first**', x.values().next());