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
// const arraySource = Rx.Observable.from([1, 2, 3, 4, 5])
// .map((x) => x*2);
// //output: 1,2,3,4,5
// const subscribe = arraySource.subscribe(val => console.log(val));
// // /////////////

// example 3



// const source = Rx.Observable.from([1, 2, 3, 4, 5]);

// //mergeMap also emits result of promise
// const myPromise = val =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//         let value = val +3;
//         resolve(value);
//     }, 2000);
// }).then((item) => {
//     console.log('first req');
//     return item+2;
// });

// const  myPromise2 = val =>
//   new Promise((resolve) => {
//     setTimeout(() => {
//         let value = val * 3;
//         console.log('second req');
//         resolve(value);
//     }, 2000);
// });

// // const myPromise2 = val =>
// // new Promise(resolve => resolve(val*3));
// //map to promise and emit result
// const example = source.take(3).concatMap(val => myPromise(val)).concatMap(val => myPromise2(val));
// //output: 'Hello World From Promise'
// const subscribe = example.subscribe(val => console.log(val));

console.log('rxjs test');

let t = new Promise((resolve) => {
    setTimeout(() => {
        let items = [
            {name: 'jjj', age: 25},
            {name: 'rrr', age: 4},
            {name: 'sss', age: 12}
        ];
        resolve(items);
    }, 2000)
})
.then((items)=> items);


const source = Rx.Observable.fromPromise(t).flatMap(Rx.Observable.from);

//mergeMap also emits result of promise
const myPromise = val =>
  new Promise((resolve) => {
    setTimeout(() => {
        console.log('first');
        console.log(val.name);
        resolve(val);
    }, 2000);
});

const  myPromise2 = val =>
  new Promise((resolve) => {
    setTimeout(() => {
        console.log('second req');
        console.log(val);
        resolve(val);
    }, 2000);
});



// const myPromise2 = val =>
// new Promise(resolve => resolve(val*3));
//map to promise and emit result
const example = source
.map((val) => {
    val.name = 'AAA';
    return val;
})
.concatMap(val => myPromise(val))
.concatMap(val => myPromise2(val));
//output: 'Hello World From Promise'
const subscribe = example.subscribe(val => console.log(`finish ${val.name}`));