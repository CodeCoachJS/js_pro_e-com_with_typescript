# React With TypeScript Intro

### Getting Started

---

`npm install` 🏁

`npm start` 🚀

`npm test` to run tests 😉

---

### What is Typescript

---

> TypeScript checks a program for errors before execution, and does so based on the kinds of values, it’s a static type checker.

Javascript with types! Javascript, being a dynamically typed language does not have a method to explicity enforce types. This can lead to problems where you have a function that may expect a number but instead receives a string!

```
const add = (num1, num2) => num1 + num2

add(2,"3") // 23 oops!!!
```

Typescript enforces type declaration so your function might be re-written like this:

```
const add = (num1: number, num2: number):number => num1 + num2

add(2, "3") // this would trigger a warning letting you know you are using the incorrect types for this function
```

While this is a contrived example, it illustrates one of the issues that can arise in Javascript applications when you depend on certain types.

---

### Typescript with React

---

Cheat Sheet: https://github.com/typescript-cheatsheets/react

Throughout this broken app you will notice some familiar concepts using React such as functional components and props.

If you know Javsascript, you mostly know Typescript!

This is the time to dig in and explore some of the most common concepts such as `Interfaces` and `Enums` as well as how to write basic functions.

**TODO**: All tests should pass!
