# Generics: Creating Flexible, Typed State Containers

When working with **LangGraph.js**, you will often see code containing angle brackets `<...>` (e.g., `new StateGraph<AgentState>(...)` or `Runnable<State>`). 

This syntax represents **Generics**. In this guide, you will learn how generics act as type placeholders to create flexible, reusable structures for AI agent state channels.

---

## 🔍 What is a Generic?

A **Generic** is simply a **type variable** (or a placeholder). It allows you to write interfaces, classes, or functions that work with multiple types, but with the specific type defined *only when you instantiate it*.

### 📦 The Container Analogy
Imagine you own a shipping company. You have a standardized **Shipping Box** design.
- The box layout, shipping labels, and barcode scanning systems are identical.
- However, one box might contain **Books**, another might contain **Electronics**, and another might contain **Apples**.

Instead of designing a `BookBox`, an `ElectronicsBox`, and an `AppleBox` separately, you design a single generic `Box<T>`, where **`T`** represents the type of cargo inside.
- `Box<Book>` holds books.
- `Box<Electronic>` holds electronics.

---

## 💻 Code Example: Reusable Graph Wrappers

In agent networks, we often wrap node execution results in a standard container. Here is how we write it using Generics:

```typescript
// 1. We create a generic interface. 'State' is a placeholder variable.
interface NodeExecutionResult<State> {
  success: boolean;
  nodeName: string;
  updatedState: State; // This property's type is determined dynamically!
}

// 2. We define two completely different state shapes
interface CodingState {
  code: string;
  testsPassed: boolean;
}

interface WritingState {
  draft: string;
  wordCount: number;
}

// 3. We reuse our container to declare variables with different state shapes
const coderResult: NodeExecutionResult<CodingState> = {
  success: true,
  nodeName: "CodeEvaluator",
  updatedState: {
    code: "const add = (a, b) => a + b;",
    testsPassed: true
  }
};

const writerResult: NodeExecutionResult<WritingState> = {
  success: false,
  nodeName: "DraftGenerator",
  updatedState: {
    draft: "Once upon a time...",
    wordCount: 4
  }
};
```
By using `<CodingState>` and `<WritingState>`, we configured the same `NodeExecutionResult` interface to expect different object shapes for `updatedState`.

---

## 🤖 Application in LangGraph.js

When initializing a LangGraph state graph, you supply your custom state interface as a generic type parameter:

```typescript
// Supposing you import StateGraph from LangGraph.js:
// import { StateGraph } from "@langchain/langgraph";

interface MyAgentState {
  messages: string[];
  currentNode: string;
}

// You tell StateGraph exactly what state shape to enforce inside the graph
// by passing MyAgentState as the generic parameter:
const graph = new StateGraph<MyAgentState>({
  channels: {
    messages: {
      value: (x, y) => x.concat(y),
      default: () => []
    }
  }
});
```

---

## ⚠️ Common Mistake: Supplying the Wrong Generic Data Type

A common error is passing a state object that does not match the generic parameter specified:

```typescript
interface TextState {
  text: string;
}

// Declaring we are wrapping a 'TextState'
const execution: NodeExecutionResult<TextState> = {
  success: true,
  nodeName: "summarizer",
  updatedState: {
    // INCORRECT: Omitted 'text' and added 'invalidKey'
    invalidKey: "This does not match TextState"
  }
};
```
*   **What happens:** The code crashes during compilation.
*   **The Error Message:** `Type '{ invalidKey: string; }' is not assignable to type 'TextState'. Object literal may only specify known properties, and 'invalidKey' does not exist in type 'TextState'.`
*   **The Fix:** Make sure the object assigned to `updatedState` has exactly the keys defined by `TextState` (`{ text: "your string" }`).

---

## 🧠 Self-Check Recall

1.  What do the angle brackets `<T>` represent in a TypeScript interface or function?
2.  If you declare an interface `Wrapper<T>`, how would you use it to wrap a `string` variable?
3.  Why are Generics useful when writing state machines like LangGraph.js? (Think: does it prevent code duplication?).
4.  Write a generic interface named `ResponseContainer<Data>` that has a `status` (number) and a `data` property of type `Data`.
5.  What is the default letter standardly used to represent a generic type variable in documentation?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **A Generic type parameter placeholder.** It represents a dynamic type that will be filled in when the interface or function is used.
2.  **`Wrapper<string>`**
3.  **They allow you to write reusable code.** You can write single classes (like `StateGraph`) or handlers that work safely with any custom state shape without duplicating code for every new state object.
4.  
    ```typescript
    interface ResponseContainer<Data> {
      status: number;
      data: Data;
    }
    ```
5.  **`T`** (short for Type).
</details>
