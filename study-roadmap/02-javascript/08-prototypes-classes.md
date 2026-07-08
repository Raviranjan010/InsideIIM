# JS Core: Prototypes & ES6 Classes

In JavaScript, objects have a special link to other objects called **Prototypes**. This is the foundation of inheritance in JavaScript. 

In this guide, you will learn what the prototype chain is, how modern `class` syntax is actually syntactic sugar over prototypes, and when to use classes in modern JavaScript.

---

## 1. The Prototype Chain vs. Classical Inheritance

*   **Classical Inheritance (like Java or C++):** Think of a **blueprinted factory**. The Class is a blueprint (a drawing of a house) that does not exist in memory. When you call `new House()`, the factory instantiates a real physical house copy in memory.
*   **Prototypal Inheritance (JavaScript):** Think of a **working clone**. In JavaScript, there are no blueprints. Everything is a live object in memory. If you want a new object, you create it and link it to an existing "prototype" object.

### The Prototype Chain
When you try to read a property on an object (e.g., `user.sayHello`):
1.  JavaScript first checks the object itself for that property.
2.  If it doesn't find it, it follows a hidden link (`__proto__`) to the object's **Prototype** and checks there.
3.  It climbs this chain until it finds the property or reaches the end (`null`).

```text
user (Object) ──[no sayHello]──> user.__proto__ (Prototype Object) ──[found sayHello]──> Run function!
```

---

## 2. ES6 Class Syntax: Syntactic Sugar

In 2015, JavaScript introduced the `class` keyword. It is **not** a real class like Java; it is **syntactic sugar**—a friendlier syntax wrapping the same underlying prototypal system.

```javascript
// The modern ES6 Class syntax:
class Agent {
  constructor(name) {
    this.name = name;
  }
  
  research() {
    return `${this.name} is searching...`;
  }
}

// What the browser actually compiles it to under the hood:
function AgentConstructor(name) {
  this.name = name;
}
AgentConstructor.prototype.research = function() {
  return `${this.name} is searching...`;
};
```
Both syntaxes result in the exact same memory layout: instances point to a shared prototype object containing the `research` method.

---

## 3. Subclasses: `extends` and `super`

To inherit behaviors in ES6, you use **`extends`** to create a subclass, and **`super()`** inside the constructor to call the parent class's constructor.

### Commented Code Example:
```javascript
// Parent Class
class FinancialAnalyst {
  constructor(name) {
    this.name = name;
    this.role = "Analyst";
  }

  calculateValuation(pe) {
    return pe > 30 ? "Premium" : "Value";
  }
}

// Child Class extending parent
class SeniorAnalyst extends FinancialAnalyst {
  constructor(name, specialty) {
    // 1. super() MUST be called before accessing 'this'
    super(name); 
    this.specialty = specialty;
  }

  // Overriding parent method
  calculateValuation(pe) {
    // Call parent method logic if needed, then customize
    const valuation = super.calculateValuation(pe);
    return `Senior Valuation: ${valuation} (${this.specialty})`;
  }
}

const analyst = new SeniorAnalyst("Alice", "Tech Stocks");
console.log(analyst.calculateValuation(35)); // "Senior Valuation: Premium (Tech Stocks)"
```

---

## 💼 4. When to Use Classes vs. Plain Objects & Functions

In modern React and Next.js development, we rarely write classes because React has moved completely to Functional Components and Hooks. 

However, in interviews and specific backend scenarios, you must know when to use them:

*   **Use Plain Objects / Functions (Default):** For simple data structures, configurations, or processing pipelines. E.g. `{ riskScore: 8, name: "Tesla" }`.
*   **Use Classes:** When you need to create **multiple instances of objects that manage their own internal state and share common behaviors (methods)**. E.g., inside LangGraph, the `StateGraph` or custom class checkpointers store state values, open connections, and manage transaction methods, making a class the clean design choice.

---

## ⚠️ Common Beginner Mistake: Accessing `this` Before Calling `super()`

When writing a subclass constructor, accessing `this` before calling the parent constructor (`super()`) throws a runtime ReferenceError.

```javascript
class Child extends Parent {
  constructor(name) {
    this.name = name; // OOPS: ReferenceError!
    super(); 
  }
}
```
*   **Why it fails:** JavaScript requires the parent class constructor to initialize the base object before the child class can modify or add properties to it.
*   **The Fix:** Always run `super()` as the very first line of your child constructor.

---

## 🧠 Self-Check Recall

1.  What is the main difference between prototypal inheritance and classical inheritance?
2.  What does the phrase "syntactic sugar" mean when describing ES6 classes?
3.  Why must you call `super()` inside a child class constructor?
4.  Write the class declaration showing a class named `Dog` inheriting from a class named `Animal`.
5.  Why does calling methods on an ES6 class save server memory compared to recreating functions inside plain objects?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Classical inheritance** instantiates objects from static class blueprints. **Prototypal inheritance** links live objects together in memory, cloning or delegation of properties.
2.  **It is a friendlier, cleaner syntax** that wraps around the same underlying prototypal mechanics without introducing a new inheritance engine.
3.  **To run the parent constructor** and initialize the base object variables before the child class accesses `this`.
4.  `class Dog extends Animal { ... }`
5.  **Methods are stored once on the prototype object** and shared by all instances, whereas declaring functions inside plain objects duplicates the function code in memory for every instance created.
</details>
