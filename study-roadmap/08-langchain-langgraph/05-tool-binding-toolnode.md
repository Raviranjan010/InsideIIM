# Tool Binding & ToolNode: Automating Tool Execution

In Module 07, we learned that "Tool Calling" is a two-step coordination game: the LLM requests a tool call, and our server executes the code.

In **LangGraph.js**, you don't have to write custom code to catch and execute these tool requests manually. Instead, you use the **`ToolNode`** class to automate it.

---

## 🔍 1. Plain-English Explanation (Zero ML Required)

Imagine a manager working with a secretary and a filing cabinet:
*   **The LLM (The Secretary):** The secretary reads a letter and realizes they need the tax file of Company X. They cannot leave their desk, so they write a sticky note: *"Please fetch tax file for Company X."*
*   **The ToolNode (The Filing Cabinet Clerk):** The clerk stands by the cabinet. They catch the sticky note, search the files, extract the tax document, and place it back on the secretary's desk.

The **`ToolNode`** is a specialized graph node that reads the LLM's tool call requests from the state, executes the correct tool function automatically, and appends the results to the state history.

---

## 🔧 2. Tool Binding and ToolNode Syntax

To set up tool calling in LangGraph.js:
1.  **Define the Tool:** Write a structured tool using LangChain's helper schemas.
2.  **Bind to LLM:** Connect the tools to the model instance using `.bindTools()`.
3.  **Add ToolNode:** Add the `ToolNode` to your graph structure.

```typescript
import { StateGraph, Annotation } from "@langchain/langgraph";
import { ToolNode } from "@langchain/langgraph/prebuilt";
import { tool } from "@langchain/core/tools";
import { ChatOpenAI } from "@langchain/openai";
import { z } from "zod";

// 1. Define the tool with a schema using Zod
const searchTool = tool(
  async ({ query }) => {
    return `Mock search results for: ${query}`;
  },
  {
    name: "google_search",
    description: "Search the web for current financial news and data.",
    schema: z.object({
      query: z.string().describe("The topic to search for.")
    })
  }
);

const tools = [searchTool];

// 2. Bind the tools to the LLM model instance
const model = new ChatOpenAI({ model: "gpt-4o-mini" }).bindTools(tools);

// 3. Create the ToolNode
const toolNode = new ToolNode(tools);

// 4. Register inside your graph
const StateAnnotation = Annotation.Root({
  messages: Annotation<any[]>({
    reducer: (x, y) => x.concat(y),
    default: () => []
  })
});

const workflow = new StateGraph(StateAnnotation)
  .addNode("agent", async (state) => {
    // Calling the model with tools bound
    const response = await model.invoke(state.messages);
    return { messages: [response] };
  })
  // Register the pre-built ToolNode directly as a graph node
  .addNode("tools", toolNode);
```

---

## 💼 3. Why It Matters for an Investment Agent

By using `ToolNode`, your agent becomes autonomous. 

When you bind multiple tools (e.g. `googleSearch`, `fetchStockPrice`, `calcDiscountRate`), you do not need to write complex `if/else` chains in your server code to determine which tool to execute. The `ToolNode` reads the model's intent, calls the correct function, and updates the state. 

This lets you build clean, scalable graph architectures where the model selects and executes its own research tools dynamically.

---

## ⚠️ Common Mistake: Forgetting to Connect the ToolNode with Edges

Beginners often define the `ToolNode` in `.addNode("tools", toolNode)` but forget to add edges connecting it to the agent node:

```text
[agent Node] ──(LLM requests tool)──> [No Edge!] ──> (Graph stops prematurely)
```
*   **What happens:** The graph runs the agent node, the LLM outputs a tool call request, and the graph stops running without actually executing the search.
*   **The Fix:** You must draw an edge from the agent node to the tools node, and a return edge back to the agent:
```typescript
// Connect agent to tools conditionally when a tool call is requested
workflow.addConditionalEdges("agent", (state) => {
  const lastMessage = state.messages[state.messages.length - 1];
  if (lastMessage?.tool_calls?.length > 0) return "tools"; // Go to tools node
  return "__end__";
});

// Always route back to the agent after tools execute
workflow.addEdge("tools", "agent");
```

---

## 🧠 Self-Check Recall

1.  What does the `ToolNode` do in a LangGraph workflow?
2.  Which function do you call on a ChatModel instance to tell it which tools are available?
3.  What validation library is standardly used to define the schema (arguments) of a tool?
4.  Why must there be a return edge from the `tools` node back to the `agent` node?
5.  What parameter does the `ToolNode` constructor expect?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **It automates tool execution.** It reads tool call requests from the state, runs the corresponding functions, and appends the results back to the state.
2.  **`.bindTools(tools)`**
3.  **Zod** (using `z.object(...)` schemas).
4.  **So the LLM can read the tool's output.** The agent must run again to evaluate the retrieved data and generate the final summary or request more tools.
5.  **An array of the tool objects** (e.g. `new ToolNode(toolsArray)`).
</details>
