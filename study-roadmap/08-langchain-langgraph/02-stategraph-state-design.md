# StateGraph & State Design: The Shared Memory

In a cyclic agent, multiple nodes (like research, analysis, and decision) execute in turn. To coordinate, they must share a common memory. In LangGraph.js, this shared memory is called the **State**.

In this guide, you will learn how to design type-safe State schemas using the modern **`Annotation.Root`** API and how state keys merge updates.

---

## 🔍 1. Plain-English Explanation (Zero ML Required)

Think of a LangGraph workflow as a group of analysts working on a project in a conference room. 
*   In the center of the room is a **shared whiteboard**. This is the **State**.
*   When the Research Analyst finishes their task, they write their findings on the whiteboard.
*   The Financial Analyst walks in, reads the whiteboard, performs calculations, and writes their analysis on a new section of the whiteboard.
*   The Decision Analyst reads the compiled notes and writes the final investment decision.

Every time a node executes, it reads the current state (the whiteboard) and outputs an update (writing new info to the board). 

---

## 🔧 2. State Design with `Annotation.Root`

In LangGraph.js (2026 syntax), we define the shape and behavior of this whiteboard using the **`Annotation`** utility. This defines the keys, their types, and how new updates are merged with existing values.

### Reducer Functions: How Keys Merge
By default, when a node returns a state update, it replaces the old value completely. E.g. if `currentTurn` is `1`, returning `{ currentTurn: 2 }` overwrites it.

However, for lists like **messages**, we don't want to overwrite previous messages; we want to **append** (concat) new messages to the list. We define this behavior using a **Reducer Function**:

```typescript
import { Annotation } from "@langchain/langgraph";

// Helper function to append new items to an existing array
const messageReducer = (left: string[], right: string[]): string[] => {
  return left.concat(right);
};

// Define the root state schema
export const StateAnnotation = Annotation.Root({
  // 'messages' will use our reducer to append updates instead of overwriting
  messages: Annotation<string[]>({
    reducer: messageReducer,
    default: () => []
  }),
  // 'ticker' will overwrite the old value (default behavior)
  ticker: Annotation<string>,
  isFinished: Annotation<boolean>
});
```

---

## 💼 3. Why It Matters for an Investment Agent

If your state structure does not support message history, your agent cannot remember what it did in previous steps. 

When the `analyze` node runs and finds that data is missing, it returns a message asking the `research` node to search again. If the `messages` array overwrote itself, the historical context is lost, and the research node won't know *what* new query to search for, leading to infinite loops or flat errors.

By configuring a message reducer, we maintain a complete historical chat transcript that the LLM reads to adapt its behavior.

---

## ⚠️ Common Mistake: Overwriting Arrays Instead of Appending

If you declare an array without defining a reducer, returning an update will overwrite the existing list:

```typescript
// INCORRECT: Declaring an array key without a reducer
const BadState = Annotation.Root({
  history: Annotation<string[]> // Default behavior is overwrite!
});

// If Node A returns { history: ["Item 1"] }
// and Node B returns { history: ["Item 2"] }
// The state of 'history' becomes just ["Item 2"]. "Item 1" is lost!
```
*   **The Fix:** Always specify a reducer function (like `(left, right) => left.concat(right)`) when defining array channels in your annotations.

---

## 🧠 Self-Check Recall

1.  What is the purpose of the "State" in a LangGraph.js application?
2.  What is the name of the API function used to define the root state schema in modern LangGraph.js?
3.  If you return a state update for a key that does *not* have a reducer function, what happens to the old value?
4.  Write a reducer function that concatenates two arrays of objects.
5.  Why is a reducer function mandatory for the `messages` array in an LLM agent chat state?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **It acts as shared memory.** It stores the variables and logs accessible by all nodes during the graph's execution lifecycle.
2.  **`Annotation.Root`**
3.  **It is overwritten completely** by the new value.
4.  
    ```typescript
    const myReducer = (left: any[], right: any[]) => [...left, ...right];
    ```
5.  **To preserve conversation history.** Without a reducer, every new LLM message would overwrite the previous messages, destroying the chat context.
</details>
