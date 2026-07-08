# LangGraph Interview Q&A: 15 Design-Defense Questions

This guide contains 15 interview questions and answers focused on explaining the **architectural "why"** behind the design choices of your LangGraph.js agent.

---

### Q1. What was the architectural reason for choosing LangGraph.js over a standard sequential chain for this investment assistant?
**Answer:**
A standard sequential chain is rigid and linear; if an intermediate search API fails or retrieves incomplete data, the pipeline cannot adapt and passes empty info to the LLM, leading to hallucinations. LangGraph.js supports cyclic graphs, which allows the agent to execute loops. If the analysis node detects that critical financial metrics are missing from the state, it can dynamically route execution back to the research node to search again, enabling self-correction before rendering the final decision.

---

### Q2. Explain how the state schema and channel update system works in LangGraph.js. Why did you use a custom reducer?
**Answer:**
The state schema acts as a shared whiteboard in memory that all nodes can read from and write to. By default, when a node returns a state update, it completely overwrites the previous value of that key. However, for properties like `messages` which accumulate conversation history, we must define a custom reducer function (such as `(left, right) => left.concat(right)`) to append new messages instead of wiping out the history.

---

### Q3. In your runnable agent code, why did you choose to call the `searchFinanceTool` directly inside the `researchNode` instead of using a standard `ToolNode`?
**Answer:**
A standard `ToolNode` is designed for autonomous agents where the LLM decides *if* and *when* to call tools in an open-ended loop, which can be unpredictable. By calling the tool directly inside the `research` node, I enforced a strict, predictable execution boundary. This ensures that the search operation runs exactly once at the beginning of the workflow, saving on token costs and ensuring the analysis phase always has fresh data.

---

### Q4. How do you protect your agent from getting stuck in an infinite routing loop?
**Answer:**
In cyclic graphs, a logical bug or a confusing user prompt can cause nodes to repeatedly call each other, draining API credits and hanging the server. To protect against this, I set a strict `recursionLimit` in the options object when calling `app.invoke(inputs, { recursionLimit: 10 })`. If the graph execution takes more than 10 steps, LangGraph automatically halts execution and throws an error, letting our Node.js handler catch it and fail safely.

---

### Q5. Why did you perform numerical P/E ratio checks in JavaScript code (`analyzeNode`) instead of delegating the evaluation to the LLM?
**Answer:**
LLMs are language models trained on word probabilities; they do not possess built-in mathematical reasoning and frequently make arithmetic errors. Hardcoding numerical evaluations—like checking if a P/E ratio is greater than 30—inside raw JavaScript ensures 100% deterministic accuracy. The LLM is then used inside the `decide` node solely to synthesize the qualitative rationale behind that pre-calculated valuation, leveraging its strengths in language synthesis.

---

### Q6. Explain the role of the `.compile()` method in LangGraph.js. What does it return and why is it necessary?
**Answer:**
The `.compile()` method is called after adding all nodes and edges. It validates the graph's connections (e.g. checking for orphan nodes or missing edges) and returns a `CompiledStateGraph` instance. This compiled instance is the actual executable object that handles state tracking, reducer execution, and checkpointing, which we import and invoke inside our Next.js Route Handlers.

---

### Q7. How does the model guarantee that its final decision matches the structured JSON format expected by your frontend?
**Answer:**
Instead of relying on a standard text prompt and hoping the model outputs JSON, I used the OpenAI SDK's native `.withStructuredOutput(schema)` wrapper, passing it a Zod validation schema. This forces the model to use API-level tool configurations to return a structured JSON response. If the model fails to conform, the API validates it internally and retries, guaranteeing that our backend can safely run `JSON.parse` on the output without crashing.

---

### Q8. What is the difference between `START`, `END`, and standard nodes when constructing a graph workflow?
**Answer:**
Standard nodes represent the custom JavaScript functions where the actual data processing, tools execution, or LLM calls occur. `START` and `END` are special virtual nodes provided by the framework to define graph entry and exit boundaries. `START` specifies which node runs first when `app.invoke()` is called, and routing an edge to `END` immediately terminates the graph execution and returns the final state to the caller.

---

### Q9. If your search node executes successfully but the analysis node throws an error, how does your graph's modular design help with error recovery?
**Answer:**
Because nodes are isolated processing units bounded by the graph state, a failure in the `analyze` node does not wipe out the data already stored in the `rawResearch` state key. In a production environment with a checkpointer, we can inspect the exact state where the failure occurred, debug the analysis code, and resume the graph execution directly from the `analyze` node using the same session thread, without needing to re-run the expensive search API call.

---

### Q10. Why is it important to use Zod schemas when defining tools for your agent?
**Answer:**
TypeScript interfaces only exist during development and are stripped away once compiled to JavaScript. Zod schemas exist at runtime, allowing the LangGraph framework to inspect the exact properties and types generated by the LLM during a tool call. If the LLM generates incorrect arguments, Zod catches the validation error immediately, allowing our server to handle the mismatch safely rather than passing bad data to our fetch functions.

---

### Q11. How do you implement human-in-the-loop approvals in LangGraph.js, and why would this be important for a financial agent?
**Answer:**
I implement human-in-the-loop by passing the `interruptBefore` option during graph compilation, e.g., `workflow.compile({ checkpointer, interruptBefore: ["decide"] })`. This causes the graph to pause execution and save its state to the checkpointer right before making the final decision. In financial applications, this is critical because it allows a human analyst to verify the retrieved search results and calculation metrics before approving the LLM to output a buy or sell recommendation.

---

### Q12. Why did you separate the research, analysis, and decision processes into three distinct nodes?
**Answer:**
Separating these steps maintains a clean separation of concerns. The `research` node handles network IO and external data fetching; the `analyze` node handles deterministic mathematical logic and validation; and the `decide` node handles generative LLM synthesis. This modular design makes the application easier to test, debug, and trace (using tools like LangSmith), and allows us to isolate network errors from reasoning errors.

---

### Q13. What is a checkpointer, and how does it enable thread persistence in a multi-turn chat agent?
**Answer:**
A checkpointer is a persistence layer (like `MemorySaver` or `PostgresSaver`) that automatically saves a snapshot of the graph state after every node execution. It organizes these snapshots by a unique `thread_id`. When a user sends a new message in a chat session, we pass their `thread_id` in the config, and the checkpointer automatically loads the previous message history, allowing the LLM to maintain conversational memory across separate HTTP requests.

---

### Q14. Explain why you should never mutate the `state` object properties directly inside a node function.
**Answer:**
LangGraph is built on the principle of immutable state transitions. If you mutate the `state` object directly (e.g. `state.query = "new"`), you bypass the framework's internal channel tracking and reducer logic, which can lead to state synchronization bugs, broken history traces, and race conditions. Instead, nodes must always return a new, partial object containing only the keys they want to update, which the engine then merges using the defined reducers.

---

### Q15. If your Next.js API route handler needs to invoke the graph, how do you pass initial parameters and read the final output?
**Answer:**
The handler imports the compiled `app` instance and calls `await app.invoke(initialState)`, passing an object containing the entry variables (like `query`). The invoke function returns a promise that resolves to the final state object of the graph. The handler then extracts the final variables from this object (e.g. `finalState.finalDecision`) and returns them as a JSON response using `NextResponse.json()`.
