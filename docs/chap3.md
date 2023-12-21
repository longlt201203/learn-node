# Chapter 3: Asynchronous Programming with NodeJS
As you've already known, Javascript execute code from the top to the bottom by a sequence. Sometimes, there are some pieces of code that unneccessary block the program, which leads to a bad performance. Consider this function:
```js
function getUserInfo() {
    logAction("getUserInfo");   // 0.1s
    const userInfo = getUserInfoFromDatabase(); // 0.5s
    setCache("userInfo", userInfo); // 0.1s
    return userInfo;
}

// Total time: 0.7s
// We saw that if we can somehow execute the logAction() and setCache() function somewhere else, we can reduce total time by 0.2s because those 2 functions does not affect how the function behave.
// Note: the time is given for the sake of example
```
Or this:
```js
function test() {
    veryTimeComsumingFunction();    // unknow when it's done
    // your code...
}
```
Or even this:
```js
// This is call "callback hell", which is the problem that you have so many callbacks and they are depends on each other.
a(() => b(() => c(() => d(() => e()))));
```
Facing with problems like that, NodeJS provide us some mechanisms to handle them with ease.
## Promise
```js
const p = new Promise((resolve, reject) => {
    // do something
    if (ok) {
        resolve(data);
    } else {
        reject(error);
    }
});

p.then(data => {
    // data processing
}).catch(err => {
    // error catching
})
```
Remember:
1. `resolve` - when success
2. `reject` - when error
3. Must call `resolve()` or `reject()` or your program will be blocked
4. Promise **DOESN'T** make your program run in multiple-threads. ("JavaScript is synchronous by default and is single threaded. This means that code cannot create new threads and run in parallel." - [NodeJS Doc](https://nodejs.org/en/learn/asynchronous-work/javascript-asynchronous-programming-and-callbacks)).

## Conclusion
I'm lazy. Read these:
* [NodeJS - Asynchronous flow control](https://nodejs.org/en/learn/asynchronous-work/asynchronous-flow-control)
* [Libuv - Design overview](https://docs.libuv.org/en/v1.x/design.html)
* [Node JS Architecture - Single Threaded Event Loop](https://www.digitalocean.com/community/tutorials/node-js-architecture-single-threaded-event-loop)