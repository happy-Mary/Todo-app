const Rx = require('rxjs');

// // An array
// var numbers = [1,2,3,4,5,6]

// var result = numbers
//    .filter(n => n > 3)
//    .reduce((a,x) => a+x, 0)
  
// console.log(numbers) // => 1,2,3,4,5,6
// console.log(result)  // => 15

// // A stream
// var numbers$ = Rx.Observable
//   .interval(500)
//   .take(6)
//   .map(i => numbers[i]);
  
// var result$ = numbers$
//   .filter(n => n > 3)
//   .reduce((a,x) => a+x, 0);
  
// numbers$.subscribe(n => console.log(n));
// // => 1
// // => 2
// // => 3... etc
// result$.subscribe(n => console.log(n));
// =. 15

// example 2
//emit array as a sequence of values
const arraySource = Rx.Observable.from([1, 2, 3, 4, 5])
.map((x) => x*2);
//output: 1,2,3,4,5
const subscribe = arraySource.subscribe(val => console.log(val));
// /////////////

console.log('rxjs test');