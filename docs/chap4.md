## Problem
In this chapter, we will make a small project for studying purpose to explore the NodeJS asynchorous features.

We are making a console application for users to manage their personal information. The work flows are:
1. Login: users login in the system by using their username and password
2. View info: when logged in successfully, user's info will be shown to them
3. Update info: user can choose to update his/her information
4. Change password: user can change his/her password

Other information:
* Data is stored in a file call `data.txt` which is a multiple-lines plain text file. Each line contains 1 user information with the format: `<username>,<password>,<name>,<age>,<job>` (Ex: `longlt201203,123456,Le Thanh Long,20,Developer`)
* Every 30 seconds, the program will fetch the notification from a server (use MockAPI) and notify user if there is any new notification.
## Analyzing
Before start coding, we need to take our time to analyze and understand the promblem as well as come up with some ideas to solve it.

> [!IMPORTANT]
> We will use IPO Model and using Flow Diagram for the most part in all of the chapters and I recommend praticing them because these are some of the most basic ways of thinking in programming for any developer.
### `What` and `How`
Before we continue, I will explain to you my concept of "What" and "How":
* `What` - are the set of actions which are define by the programmer
* `How` - are the set of actions which are define by the programming language/library/packge/framework (not yours)
* `What` has the priority over `How`. That means we will consider `What` first and then `How`.

For example:
```js
function thisFunctionIWrote() {
    // What
    doSomethingWith(require("node:os").constants);
    
    // What
    console.log(myFunction());
}

function main() {
    // What
    thisFunctionIWrote();

    // How
    console.log("Hello from main");
}
```
We should prioritise the `What` because after all you are the one who solves the problem. And keep in mind that in many real world situations analyzing a problem might lead to many "big" `What` and "smaller" `What` nesting in them. But no matter how big the `What`, we will eventually reach the `How`, that is where your process of thought end.
### Input-Process-Output Model (IPO Model)
Input-Process-Output Model (IPO Model) is a way of thinking that can be apply not only for programming but other major as well or even in some real-life problems.
> In IPO model, `Input` is what the _environment_ (end-users, I/O devices, etc.) provides for the _program_ in order to execute the `Process`, which involves the _activities_ (the `What` and `How`) that transforms the `Input` into the `Output`, which is the result that the program return back to enviroment.

![](../docs-assets/IPO%20Model.png)

It is a good practice to define the `Input` and `Output` first and then use `What` and `How` to define the `Process`.
### Back to our problem
So now we got all the things we need, let's jump in to solve this problem!

We begin with the IPO Model. We first consider what is the `Input`? For the program we are making there are 1 input from the environment (end-users) and that is the user action choice (because it's a console application so the UI is basic).

And then the `Output`: base on the user's choice, we will have different chain of actions in `Process`, thus the result for each choice is difference from each other. But in IPO we don't need to be specific, just put in what make you feel comfortable and understandable (you are the coder of this program).
```
userChoice  =>  process()   =>  loginProcess()  =>  loginResult
                                otherProcess()  =>  otherOutput
                                ...           
```
