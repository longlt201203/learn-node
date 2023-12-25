# Practice: Profile Management Console Application
## Problem
In this chapter, we will make a small project for studying purpose to explore NodeJS.

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

> [!NOTE]
> We will use IPO Model and using Flow Diagram for the most part in all of the chapters and I recommend praticing them because these are some of the most basic ways of thinking in programming for any developer.

![](../docs-assets/IPO%20Model.png)

Below is the common pattern that is used by many console program:

![](../docs-assets/Console%20Common%20Flow.png)

Explaination:
1. When start, a program is created.
2. The program is initialized with the `startUp()` function.
3. Program will schedule tasks (if any).
4. Start the program.
    1. When started, the program emit the "start" event, which execute `main()` function.
    2. The `main()` function constantly receives user's input and response with a corresponding `action()`.
    3. When user want to terminate, we call `program.exit()` which emit the "exit" event that call `clean()` function.

> [!IMPORTANT]
> In IPO Model we prioritise `What` over `How`, which means we care about `Input` (What the program needs/takes) and `Output` (What the program results in) more than the `Process`. Even when we analyze the `Process`, we should focus on "What does it do?" rather than "How do it do that?": **Answer `How` question using `What`**.
