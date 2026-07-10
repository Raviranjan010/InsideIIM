# TypeScript Interview Questions & Answers

This document contains 12 realistic technical interview questions and comprehensive model answers. These questions cover TypeScript essentials, object shapes, generics, advanced utility types, and specific integrations with orchestrators like LangGraph.js.

---

## Part 1: TypeScript in LangGraph.js & Agentic Systems

### Question 1
**How do we type a LangGraph.js `StateGraph` state object in TypeScript, and why is this critical for graph nodes?**

**Answer:**
In LangGraph.js, the state of the graph is represented by a central object that stores variables passed between execution nodes. We type this by defining a custom TypeScript `interface` (such as `interface AgentState`) containing all the channel properties, and we then supply it as a generic type parameter when instantiating the graph, e.g., `new StateGraph<AgentState>({ channels })`. 
This is critical because it acts as an API contract that the compiler enforces across all graph nodes; every node function is type-checked to ensure it only accesses defined state channels and returns values that match the `AgentState` schema. By utilizing this static validation, we prevent common runtime bugs like reading misspelled properties (e.g., `currentstep` vs. `currentStep`) or pushing the wrong data types into state channels, which would crash long-running agent loops.

---

### Question 2
**How does typing a tool's input schema in TypeScript help validate parameters in an agentic system?**

**Answer:**
When an AI agent decides to call a tool, it must pass arguments that exactly match what the tool expects. In TypeScript-based frameworks, we define this expected shape using a typed input schema (often using a library like Zod, which integrates with TypeScript to output compile-time interfaces). 
This tool-specific interface defines required fields, optional parameters, and data types (such as `string[]` for queries or `number` for search limits). By statically typing the tool's input, the compiler prevents developers from passing mismatched parameters when invoking the tool programmatically. At the same time, this type definition is shared with the LLM as a structured JSON schema, ensuring that the runtime validation logic has a single, reliable source of truth.

---

### Question 3
**Why does type safety matter when an LLM's tool-call output needs to match your application's schema exactly, and how do we handle this in TypeScript?**

**Answer:**
LLMs are probabilistic models and return tool-call arguments as raw text strings, which may contain errors such as missing properties, incorrect data types, or invalid JSON. If your backend application expects this data to conform to a specific type to execute database queries or API requests, parsing an invalid response directly without type safety will lead to runtime crashes. 
In TypeScript, we address this by passing the raw parsed JSON through a validation layer (like a Zod schema or type guard) to cast it into a strictly typed interface. If the validation succeeds, TypeScript guarantees that downstream functions can safely access the object's properties. If it fails, the type guard catches the mismatch early, allowing the agent to catch the error and automatically prompt the LLM to correct its tool call.

---

### Question 4
**In LangGraph.js, how do we use TypeScript to define and validate channel reducers, and what problems does this solve?**

**Answer:**
Channel reducers in LangGraph.js dictate how new updates are merged into the existing state, such as appending messages to a message history array. To declare a reducer safely, we define it as a function that takes the current channel state and the incoming update, returning the newly merged state, which TypeScript validates against the graph's overall state interface. 
For instance, if the state property `messages` is typed as `Message[]`, TypeScript ensures the reducer function only accepts and returns `Message[]`. This prevents type regression bugs where a node might accidentally return a raw string instead of a structured array, which would otherwise corrupt the graph's memory channel and cause subsequent nodes to fail when calling array methods like `.concat()` or `.map()`.

---

## Part 2: Core TypeScript Concepts

### Question 5
**What is the difference between a type alias and an interface in TypeScript, and when should you prefer one over the other?**

**Answer:**
Interfaces and type aliases are both used to define object shapes in TypeScript, but they differ in capabilities and intent. Interfaces are designed to represent open object structures; they support inheritance natively using the `extends` keyword and allow "declaration merging," where declaring the same interface multiple times combines their properties. 
Type aliases (declared using `type`) are more flexible and cannot be reopened for declaration merging; they can represent primitive types, union types (e.g., `string | number`), intersection types, and tuples. In professional codebases, you should prefer `interface` for defining standard object shapes, database records, and API states, while reserving `type` for unions, complex mapped configurations, or when designing utility transformations.

---

### Question 6
**Why is the `any` type dangerous in a TypeScript project, and what is the difference between `any` and `unknown`?**

**Answer:**
The `any` type acts as an escape hatch that instructs the compiler to completely disable type-checking for that variable, making it behave like dynamic JavaScript. This is dangerous because it re-introduces the risk of silent runtime crashes and disables editor features like auto-completion and renaming refactors. 
In contrast, `unknown` is a type-safe counterpart to `any` that represents any value but does not allow you to perform operations on it without proving its type first. While a variable of type `any` lets you call arbitrary methods on it directly, a variable of type `unknown` requires you to use type narrowing (such as checking `typeof value === "string"`) before you can invoke methods, ensuring compile-time safety.

---

### Question 7
**What are generics in TypeScript, and how do they help developers write reusable, type-safe code?**

**Answer:**
Generics allow developers to write interfaces, classes, and functions that parameterize their types, acting as placeholders that are filled in when the component is instantiated. For example, instead of creating separate classes for `StringList` and `NumberList`, you can create a generic `List<T>` where `T` represents the item type. 
When you declare `const myList = new List<string>()`, the compiler dynamically ensures that only strings can be added to that list. This prevents code duplication, removes the need to use unsafe type casting or the `any` type, and preserves full type-checking throughout the lifetime of the object.

---

### Question 8
**How does type narrowing work in TypeScript, and what operators are commonly used to achieve it at runtime?**

**Answer:**
Type narrowing is the process by which TypeScript's compiler analyzes conditional blocks of code to refine a broad type into a more specific one. It relies on runtime checks (type guards) to ensure that the code is executing safely based on the actual value's type. 
We commonly use the `typeof` operator for primitive values (like checking if a value is a `"string"` or `"number"`) and the `instanceof` operator to verify if an object is an instance of a specific class. Additionally, the `in` operator helps narrow types by checking for the existence of unique properties on an object, allowing the compiler to safely resolve union types.

---

### Question 9
**What are utility types in TypeScript, and how do `Partial<T>` and `Omit<T, Keys>` help manage state changes?**

**Answer:**
Utility types are built-in generic functions in TypeScript that take an existing object type and modify its properties to create a new type. The `Partial<T>` utility type takes an interface and makes all of its properties optional, which is extremely useful when writing update operations where only a few fields are being modified at a time. 
Conversely, the `Omit<T, Keys>` utility type constructs a new type by removing specific keys from an existing interface. This is highly beneficial when you want to take a database model type and create a subset for form submissions or API requests that excludes auto-generated fields like `id` or `createdAt`.

---

### Question 10
**Explain the concept of Union and Intersection types, and provide a quick example of when each is useful.**

**Answer:**
A Union type (using the `|` operator) represents a logical "OR" relationship, indicating that a variable can hold one of several distinct types. For example, a function parameter typed as `string | string[]` can accept either a single string or an array of strings, which is useful for flexible APIs. 
An Intersection type (using the `&` operator) represents a logical "AND" relationship, combining multiple interfaces into a single type containing all their properties. This is useful when you want to combine configurations, such as extending a base HTTP configuration with authentication credentials, resulting in a single type that satisfies both structures.

---

### Question 11
**What is the difference between `null` and `undefined` in TypeScript, and how does strict null checking help prevent runtime errors?**

**Answer:**
In JavaScript and TypeScript, `undefined` signifies that a variable has been declared but has not yet been assigned a value, whereas `null` represents an intentional, developer-assigned empty value or non-existence of an object. 
When the `strictNullChecks` flag is enabled in the compiler options, TypeScript treats `null` and `undefined` as distinct types rather than values that can be assigned to any variable. This forces developers to explicitly declare when a value can be nullish (e.g., `status: string | null`) and checks that they handle these cases with checks or optional chaining, preventing common "Cannot read property of undefined" runtime errors.

---

### Question 12
**What are literal types in TypeScript, and how can they be combined with union types to replace traditional enums?**

**Answer:**
Literal types allow you to specify exact values—such as a specific string (e.g., `"success"`), number (e.g., `200`), or boolean (e.g., `true`)—as types themselves. By combining these literal types into a union (for example, `type LogLevel = "debug" | "info" | "warn" | "error"`), you restrict a variable to only accept those specific values. 
This pattern is widely preferred over TypeScript's traditional `enum` keyword because it compiles down to clean, standard JavaScript strings. Unlike enums, which generate complex lookup objects in the compiled code, literal unions are completely erased by the compiler, resulting in better performance and cleaner output while maintaining absolute type safety.
