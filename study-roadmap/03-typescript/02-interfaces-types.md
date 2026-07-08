# Interfaces & Type Aliases: Structuring Agent State

When building AI workflows in **LangGraph.js**, you aren't just dealing with single numbers or strings. You are passing complex objects around—specifically, the **Graph State** (an object containing arrays of messages, user info, and configuration parameters).

To define the structure of these objects, TypeScript provides two powerful tools: **Interfaces** and **Type Aliases**.

---

## 1. Interfaces: Defining Object Shapes

An **interface** is a contract that defines the exact properties and types that an object must have. 

Think of an interface as a **blueprint** for a house. If a house is built using that blueprint, it must have exactly the rooms specified, and each room must be of the correct type (e.g., bathroom, bedroom).

### 💻 Code Example: A LangGraph State Blueprint
Here is how we define a standard state object for a LangGraph agent:

```typescript
// 1. First, we define a blueprint for a single message
interface Message {
  role: "user" | "assistant" | "system"; // Literal types: can only be one of these three strings
  content: string;
}

// 2. Next, we define the overall state structure of our graph
interface AgentState {
  messages: Message[];         // Array of Message objects
  currentTurn: number;         // Current loop count
  sender: string;              // Current active agent name
  error?: string;              // Optional property! (Notice the '?')
}

// 3. We create an object that implements this interface
const state: AgentState = {
  messages: [
    { role: "user", content: "Tell me a joke" },
    { role: "assistant", content: "Why did the programmer quit? No arrays!" }
  ],
  currentTurn: 1,
  sender: "JokeAgent"
  // 'error' is omitted here, which is fine because we marked it with '?'
};
```

---

## 2. Type Aliases: Alternative Names for Types

A **Type Alias** (using the `type` keyword) assigns a new name to any type. While it can define object shapes just like interfaces, it is also used for advanced shapes like **Union Types** (where a variable can be one of several types).

### 💻 Code Example: Using Type Aliases
```typescript
// 1. Defining a Union Type
type AgentRole = "researcher" | "writer" | "editor";

// 2. Defining an object shape using Type
type Config = {
  temperature: number;
  maxTokens: number;
  model: string;
};

// Combining them
interface Agent {
  name: string;
  role: AgentRole; // Must be one of the three strings defined in the type alias
  config: Config;
}
```

---

## ⚖️ Interface vs. Type: Which one should I use?

For someone building LangGraph agents, follow this simple rule of thumb:
*   Use **`interface`** when defining the shape of your `State` objects, messages, or database records (anything that is standard object shapes).
*   Use **`type`** when you need **unions** (e.g., `role: "user" | "assistant"`) or alias combinations.

---

## ⚠️ Common Mistake: Missing or Mismatched Object Properties

If you define a variable using an interface, but omit a required property (or spell it wrong), TypeScript will immediately reject it:

```typescript
interface ToolInput {
  query: string;
  limit: number;
}

// INCORRECT: Omitted 'limit' which is required!
const input: ToolInput = {
  query: "Search for LangGraph tutorials"
};
```
*   **What happens:** Compilation fails.
*   **The Error Message:** `Property 'limit' is missing in type '{ query: string; }' but required in type 'ToolInput'.`
*   **The Fix:** Either supply the missing property `limit` or add a `?` to the property declaration in the interface to mark it as optional (`limit?: number;`).

---

## 🧠 Self-Check Recall

1.  How do you mark a property in an interface as optional (meaning it doesn't *have* to be provided)?
2.  Which keyword (`interface` or `type`) is best suited for defining a union of specific strings, like `type ModelSize = "small" | "medium" | "large"`?
3.  Will TypeScript throw an error if you add a property to an object that was *not* defined in its interface?
4.  Write an interface named `AgentState` that has a `messages` property (an array of strings) and a `isFinished` property (a boolean).
5.  What is the difference between an interface and a type alias regarding extending their properties? (Think: which one is designed to be easily merged/extended using `extends`?).

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **By placing a question mark `?` after the property name** (e.g., `propertyName?: string;`).
2.  **`type`** (Type Alias).
3.  **Yes.** TypeScript enforces strict shapes; adding extra undeclared properties to an object initialized with a specific interface type throws a compilation error.
4.  
    ```typescript
    interface AgentState {
      messages: string[];
      isFinished: boolean;
    }
    ```
5.  **`interface` supports inheritance natively** using the `extends` keyword (e.g., `interface SubState extends ParentState { ... }`). Type aliases use intersection operators (`&`) to combine shapes.
</details>
