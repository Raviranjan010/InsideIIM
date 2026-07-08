# Nodes & Edges: The Building Blocks of Flow

A graph consists of two primary elements: **Nodes** (the workers) and **Edges** (the roads connecting them).

In this guide, you will learn how to write nodes as simple TypeScript functions that read and update the State, and how to link them together using static edges in **LangGraph.js**.

---

## 🔍 1. Plain-English Explanation (Zero ML Required)

*   **Nodes (The Workers):** Think of a node as a workstation in a company. Each workstation has a specific worker (e.g., the researcher or the accountant). The worker takes the file folder (the State), performs their job, adds their notes, and passes the folder to the next desk.
*   **Edges (The Conveyor Belts):** Edges are the predefined paths that dictate which workstation the folder goes to next. A static edge simply says: *"When the researcher is done, always pass the folder to the accountant."*

---

## 🔧 2. Writing Nodes and Edges in LangGraph.js

In LangGraph.js, a **Node** is simply a JavaScript function (regular or async). It receives the current `State` as an argument and returns an object containing the keys it wants to update.

Here is how we implement the 3-node sequence (`research` → `analyze` → `decide`):

```typescript
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";

// 1. Define State
const StateAnnotation = Annotation.Root({
  researchData: Annotation<string>,
  analysisMetrics: Annotation<string>,
  decision: Annotation<string>
});

// 2. Define Nodes
const researchNode = async (state: typeof StateAnnotation.State) => {
  console.log("Researching stock data...");
  return { researchData: "Verified balance sheet data: Debt=$10M, Cash=$50M." };
};

const analyzeNode = async (state: typeof StateAnnotation.State) => {
  console.log("Analyzing metrics...");
  // Read from state, calculate, and return update
  const metrics = `Cash-to-Debt ratio is high based on: ${state.researchData}`;
  return { analysisMetrics: metrics };
};

const decideNode = async (state: typeof StateAnnotation.State) => {
  console.log("Making final decision...");
  return { decision: `Recommendation: BUY. Reason: ${state.analysisMetrics}` };
};

// 3. Construct the Workflow
const workflow = new StateGraph(StateAnnotation)
  // Add workers to workstations
  .addNode("research", researchNode)
  .addNode("analyze", analyzeNode)
  .addNode("decide", decideNode)
  
  // Connect the conveyor belts
  .addEdge(START, "research")       // Entry point: START -> research
  .addEdge("research", "analyze")   // research -> analyze
  .addEdge("analyze", "decide")     // analyze -> decide
  .addEdge("decide", END);          // Exit point: decide -> END

// 4. Compile the Graph
const app = workflow.compile();
```

---

## 💼 3. Why It Matters for an Investment Agent

By dividing your code into distinct nodes instead of one large function, you create modular boundaries:
- If your research node fails because the internet search API is down, you can catch the error and retry only the `research` node, without restarting the LLM or losing intermediate calculations.
- You can write unit tests for each node independently.
- You can inspect the state *between* nodes (debugging) to see exactly where the analysis went wrong.

---

## ⚠️ Common Mistake: Returning the Entire State from a Node

Beginners often copy the incoming state, modify it, and return the entire object, which can cause issues with state merging:

```typescript
// INCORRECT: Modifying and returning the entire state
const myNode = async (state: typeof StateAnnotation.State) => {
  state.researchData = "new data"; 
  return state; // OOPS: Returning the entire state object
};
```
*   **What happens:** This bypasses the reducer logic and can lead to unexpected state states or mutations.
*   **The Fix:** Nodes should only return a **partial** object containing the specific keys they want to update:
```typescript
// CORRECT: Return only the change
const myNode = async (state: typeof StateAnnotation.State) => {
  return { researchData: "new data" }; 
};
```

---

## 🧠 Self-Check Recall

1.  What arguments does a LangGraph node function receive?
2.  Should a node return the entire state object, or only the changes it wants to make?
3.  What are the two special constants imported from `@langchain/langgraph` that mark the beginning and end of a graph?
4.  Write the command used to connect a node named `"fetch"` to a node named `"format"`.
5.  What method must you run on your `StateGraph` object before you can execute it?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **The current state object** (defined by your State Annotation).
2.  **Only the changes** (a partial state object).
3.  **`START`** and **`END`**.
4.  **`graph.addEdge("fetch", "format")`**
5.  **`.compile()`** (e.g. `const app = workflow.compile()`).
</details>
