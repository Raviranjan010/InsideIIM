# Conditional Edges & Routing: Dynamic Graph Logic

In the previous guide, we connected nodes using static edges—meaning execution always followed the same path. But real intelligence requires making decisions. 

**Conditional Edges** allow your graph to choose its next path dynamically based on variables in the current state.

---

## 🔍 1. Plain-English Explanation (Zero ML Required)

Think of a conditional edge as a **manager at a sorting belt**. 
*   Instead of a conveyor belt that automatically drops all items into Box B, the manager inspects the folder (the State).
*   If the manager sees that the paperwork has missing fields, they stamp it "REJECTED" and route the folder back to the research desk.
*   If the paperwork is complete, they route it to the shipping desk.

In code, a conditional edge is a **router function** that reads the state and returns a string representing the name of the next node to execute.

---

## 🔧 2. Coding Conditional Edges in LangGraph.js

To implement conditional routing, you write:
1.  **A Router Function:** A function that receives the state and returns the next node name.
2.  **The Binding:** Register this router in the graph using `.addConditionalEdges()`.

Here is an example where our `analyze` node determines if we have enough search data. If not, it routes back to `research`; otherwise, it routes to `decide`.

```typescript
import { StateGraph, Annotation, START, END } from "@langchain/langgraph";

const StateAnnotation = Annotation.Root({
  researchData: Annotation<string>,
  isDataSufficient: Annotation<boolean>
});

// Router Function
const routeNext = (state: typeof StateAnnotation.State): string => {
  if (state.isDataSufficient === false) {
    console.log("--> Data insufficient. Routing back to RESEARCH.");
    return "research"; // Name of the node to jump to
  }
  console.log("--> Data complete. Routing to DECIDE.");
  return "decide";
};

// Constructing the graph
const workflow = new StateGraph(StateAnnotation)
  .addNode("research", async () => ({ isDataSufficient: true }))
  .addNode("analyze", async () => ({ isDataSufficient: false })) // Mock output
  .addNode("decide", async () => ({}))

  .addEdge(START, "research")
  .addEdge("research", "analyze")
  
  // Connect conditional router from 'analyze' node
  .addConditionalEdges("analyze", routeNext);
```

---

## 💼 3. Why It Matters for an Investment Agent

If a user asks our agent to evaluate a complex company, the initial web search might return generic corporate PR articles containing no financial ratios. 

A static RAG pipeline would analyze this useless text and return a generic summary. 

Our LangGraph agent can use conditional routing:
1.  The `analyze` node checks the search context.
2.  It detects that the net debt ratio is missing.
3.  It sets `isDataSufficient: false` in the state.
4.  The conditional edge routes the agent back to the `research` node.
5.  The research node runs a new search query targeting *"Company X Net Debt"* specifically, resolving the information gap before proceeding.

---

## ⚠️ Common Mistake: Returning a Node Name Not Registered in the Graph

If your router function returns a string that does not match any registered node name in your graph, the program will crash at runtime.

```typescript
const routeNext = (state: any) => {
  return "analysisNode"; // OOPS: Typo in the name
};

// Graph setup has: .addNode("analyze", ...)
```
*   **What happens:** The execution halts with an error explaining that the graph cannot find the node "analysisNode".
*   **The Fix:** Double-check your spelling and ensure that the string returned by your routing function matches exactly the label passed to `.addNode()` (e.g. return `"analyze"`).

---

## 🧠 Self-Check Recall

1.  What is the difference between a static edge and a conditional edge?
2.  What parameter does a conditional router function receive?
3.  What must a conditional router function return to tell the graph where to go next?
4.  Why are conditional edges crucial for preventing information gaps in RAG pipelines?
5.  If a router function returns the constant `END`, what does the graph do?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Static edges are fixed** pathways (A always goes to B). **Conditional edges are dynamic** pathways determined by code logic at runtime.
2.  **The current state object.**
3.  **A string** matching the name of the next destination node (or the `END` constant).
4.  **They allow self-correction.** If the analysis node detects missing metrics, it can route execution back to the research node to search again.
5.  **It terminates execution** and returns the final state to the caller.
</details>
