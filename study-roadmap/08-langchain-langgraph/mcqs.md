# LangGraph Practice: 25 Design-Defense MCQs

These questions test whether you understand the architectural reasons behind LangGraph design choices (such as state management, reducer functions, structured outputs, node separation, and recursion control).

---

### Q1. Why does our agent use a customized reducer function for the `messages` array in the `Annotation.Root` state?
- [ ] A) To encrypt the conversation history.
- [ ] B) To prevent updates from completely overwriting the existing array of messages, ensuring new messages are appended instead.
- [ ] C) To speed up database transactions.
- [ ] D) To compile the graph faster.

**Correct Answer:** B
*   **Why it's correct:** By default, state updates in LangGraph overwrite old values. To preserve message history across multiple node turns, we define a reducer function `(left, right) => left.concat(right)` to append new messages instead.
*   **Why other options are wrong:** A is wrong because reducers do not handle security or encryption. C and D are unrelated to runtime graph compiling or database write speeds.

---

### Q2. Why did we choose to execute the search tool directly inside the `researchNode` instead of using a standard `ToolNode` in a separate node?
- [ ] A) Because `ToolNode` is not supported in LangGraph.js.
- [ ] B) To maintain strict, linear control over our 3-node sequence, preventing the LLM from entering a loop where it repeatedly calls tools when we only want one search pass.
- [ ] C) To bypass Zod schema checking.
- [ ] D) To reduce the memory usage of the server.

**Correct Answer:** B
*   **Why it's correct:** While `ToolNode` is great for open-ended agents, invoking tools directly inside a node gives the developer strict control. This ensures that the research phase runs exactly once before routing to the analysis phase.
*   **Why other options are wrong:** A is incorrect because `ToolNode` is fully supported. C is wrong because Zod validation still runs. D is incorrect.

---

### Q3. Why is the P/E ratio valuation logic (checking if P/E > 30) calculated in the raw Javascript code of `analyzeNode` rather than letting the LLM evaluate it in the `decideNode`?
- [ ] A) Because LLMs cannot read numbers.
- [ ] B) To keep numerical calculations 100% deterministic in code, using the LLM only to synthesize a human-readable rationale based on those pre-calculated metrics.
- [ ] C) Because OpenAI charges more for math queries.
- [ ] D) To bypass the recursion limit.

**Correct Answer:** B
*   **Why it's correct:** LLMs are linguistic probability engines and can make simple math errors. Offloading numerical calculations (like ratio boundaries) to raw code ensures accuracy, allowing the LLM to focus on what it does best: synthesis.
*   **Why other options are wrong:** A is wrong because LLMs can read numbers. C is wrong since token costs are based on character count, not the type of logic. D is unrelated to recursion.

---

### Q4. Why do we wrap the OpenAI model with `.withStructuredOutput(schema)` inside the `decideNode` instead of just writing a text prompt asking for JSON?
- [ ] A) To disable the safety guardrails on OpenAI.
- [ ] B) To guarantee at the API level that the response matches our Zod structure, preventing `JSON.parse` from throwing format exceptions in our Node.js code.
- [ ] C) To automatically translate the output into multiple languages.
- [ ] D) To compile the TS interfaces.

**Correct Answer:** B
*   **Why it's correct:** Text prompts requesting JSON can return markdown blocks (like ` ```json `) or conversational prefixes. Using the native SDK helper `withStructuredOutput` enforces schema compliance at the API layer, guaranteeing parseability.
*   **Why other options are wrong:** A is wrong because structured output maintains safety filters. C and D describe translation and compilation features that Zod/Structured outputs do not handle.

---

### Q5. In your 3-node graph, why do we compile the graph into an exportable variable (`app = workflow.compile()`)?
- [ ] A) To bundle the code into a browser-executable script.
- [ ] B) To convert the graph nodes into WebAssembly.
- [ ] C) To create an executable graph instance that can be imported and invoked inside server-side Route Handlers.
- [ ] D) To delete the original typescript files.

**Correct Answer:** C
*   **Why it's correct:** Compiling the graph validates the edge linkages and returns an executable runtime instance (`CompiledStateGraph`). We export this so our Next.js API routes can import it and call `await app.invoke(...)`.
*   **Why other options are wrong:** A is wrong because compile does not build frontend assets. B is wrong since it compiles to standard JS, not WebAssembly. D is incorrect.

---

### Q6. Why is it important to set a `recursionLimit` (like `recursionLimit: 10`) when invoking a cyclic graph?
- [ ] A) To compress the memory size of the state.
- [ ] B) To detect and break infinite loops (e.g. Node A and Node B calling each other endlessly) before they drain API credits.
- [ ] C) To force the model to respond faster.
- [ ] D) To limit the number of users on the website.

**Correct Answer:** B
*   **Why it's correct:** In cyclic graphs, a bug in routing logic can cause nodes to execute in an infinite loop. Setting a recursion limit ensures LangGraph halts and throws an error if execution exceeds a set number of steps.
*   **Why other options are wrong:** A is wrong since recursion limits do not affect state size. C is wrong because limits do not affect model processing speeds. D is unrelated.

---

### Q7. If you want to support long-term session memory where users can continue chat threads tomorrow, what must you pass to `workflow.compile()`?
- [ ] A) A higher temperature setting.
- [ ] B) An API key for Tavily.
- [ ] C) A Checkpointer instance (like `MemorySaver` or `PostgresSaver`).
- [ ] D) An array of Zod schemas.

**Correct Answer:** C
*   **Why it's correct:** Checkpointers save the state of the graph after every node execution. By passing a checkpointer to compile, you can re-hydrate and resume conversations using a `thread_id` session key.
*   **Why other options are wrong:** A, B, and D describe parameters for randomness, search, and validation, none of which manage graph state persistence.

---

### Q8. Why does the `analyzeNode` parse `state.rawResearch` inside a `try...catch` block?
- [ ] A) To speed up JSON parsing.
- [ ] B) To handle malformed or empty tool outputs gracefully without crashing the active Node.js server process.
- [ ] C) Because TypeScript requires all JSON parsing to be in a try-catch.
- [ ] D) To reset the graph state.

**Correct Answer:** B
*   **Why it's correct:** If an external search API returns an error message or invalid JSON text, running `JSON.parse` directly would crash the thread. Catching the exception allows the node to record the error in the state and fail safely.
*   **Why other options are wrong:** A is wrong because try-catch adds a tiny execution overhead. C is wrong since TypeScript does not enforce try-catch syntax at build time. D is incorrect.

---

### Q9. Why are tool parameters defined using Zod schemas rather than standard TypeScript interfaces?
- [ ] A) Because TypeScript interfaces make the LLM execution slower.
- [ ] B) Zod schemas exist at runtime, allowing the framework to validate LLM arguments, whereas TypeScript interfaces are stripped during compilation and do not exist at runtime.
- [ ] C) Zod schemas automatically translate JSON into XML.
- [ ] D) Zod is required to connect to GitHub.

**Correct Answer:** B
*   **Why it's correct:** TypeScript types vanish after compiling to JavaScript. Zod schemas are runtime objects, allowing LangGraph to inspect parameters and validate them before passing them to tool functions.
*   **Why other options are wrong:** A is incorrect. C and D describe translation and version control tasks that Zod does not perform.

---

### Q10. In your graph construction, why do we connect the final node (`decide`) to the `END` constant?
- [ ] A) To close the database connection.
- [ ] B) To signal to the LangGraph execution engine that the workflow is complete, returning the final state to the caller.
- [ ] C) To clear the environment variables.
- [ ] D) To restart the server.

**Correct Answer:** B
*   **Why it's correct:** The `END` constant represents a terminal state. Routing an edge to `END` tells the engine to stop executing nodes and return the compiled state.
*   **Why other options are wrong:** A, C, and D describe database, config, and system tasks that are not triggered by graph termination.

---

### Q11. Why do we model `finalDecision` as a separate key in the State Annotation instead of just appending it as a chat message?
- [ ] A) To reduce token usage.
- [ ] B) To allow the Next.js API handler to extract the structured JSON object directly from the state without parsing message lists.
- [ ] C) Because LangGraph does not support message arrays.
- [ ] D) To prevent prompt injection.

**Correct Answer:** B
*   **Why it's correct:** Storing the final JSON recommendation in a dedicated state key makes it trivial for our API route handler to access and return (e.g. `res.json(state.finalDecision)`), keeping the code clean.
*   **Why other options are wrong:** A is incorrect. C is incorrect since messages are fully supported. D is wrong because state layout does not affect prompt security.

---

### Q12. Why does the search tool return a stringified JSON object instead of a raw JavaScript object?
- [ ] A) To secure the data.
- [ ] B) Because the LangChain Tool interface standard mandates that tool executions return a string value.
- [ ] C) To bypass Zod validation.
- [ ] D) To speed up execution.

**Correct Answer:** B
*   **Why it's correct:** In LangChain/LangGraph, tool outputs must be strings so they can be wrapped inside a `ToolMessage` content field and sent directly in LLM conversation histories.
*   **Why other options are wrong:** A is wrong because stringification is not encryption. C is wrong since Zod validates arguments, not return types. D is incorrect.

---

### Q13. If your node returns `{ rawResearch: "new data" }` but the state has 4 other keys, what happens to those other keys?
- [ ] A) They are deleted.
- [ ] B) They remain unchanged because LangGraph merges updates partially.
- [ ] C) They are reset to their default values.
- [ ] D) The execution crashes.

**Correct Answer:** B
*   **Why it's correct:** LangGraph state updates are additive/merging. When a node returns a partial object, the engine updates only the specified keys, preserving the values of all other keys.
*   **Why other options are wrong:** A, C, and D describe destructive or error states that do not occur during standard partial updates.

---

### Q14. Why is a conditional edge used to branch flows instead of putting the routing logic inside the node function itself?
- [ ] A) Because node functions cannot contain if/else statements.
- [ ] B) To maintain architectural separation of concerns: nodes should only process data, while edges should control the routing path.
- [ ] C) To reduce token costs.
- [ ] D) To bypass Zod validation.

**Correct Answer:** B
*   **Why it's correct:** Separating processing (nodes) from routing (edges) makes the graph structure clear and modular, allowing developers to visualize and test the flow independently of execution logic.
*   **Why other options are wrong:** A is wrong because nodes can contain any code. C and D are unrelated.

---

### Q15. What design pattern does LangGraph use to manage state updates concurrently?
- [ ] A) Multi-threading lock mechanisms.
- [ ] B) Immutable state channels, where updates are merged using defined reducers rather than direct object mutations.
- [ ] C) Global variable overwrites.
- [ ] D) Synchronous polling loops.

**Correct Answer:** B
*   **Why it's correct:** LangGraph avoids concurrent mutations by enforcing immutability. Nodes return updates, and the engine merges them using channel reducers, preventing race conditions.
*   **Why other options are wrong:** A is wrong because Node.js is single-threaded. C describes mutable patterns we avoid. D is incorrect.

---

### Q16. Why do we configure our OpenAI model client with `temperature: 0` inside the `decide` node?
- [ ] A) To enable faster responses.
- [ ] B) To eliminate randomness, ensuring the model evaluates the pre-calculated financial metrics literally and consistently.
- [ ] C) To allow the model to make speculative guesses.
- [ ] D) To bypass rate limits.

**Correct Answer:** B
*   **Why it's correct:** Low temperature ensures consistency and precision, which are required when synthesizing financial decisions where creative interpretation is a risk.
*   **Why other options are wrong:** A and D are wrong since temperature does not affect network speed or rate limits. C describes high temperature behavior.

---

### Q17. In an agentic graph, what is a `ToolMessage`?
- [ ] A) An email notification sent to the developer.
- [ ] B) A specific message object used to pass the output of a tool execution back to the LLM's conversation history.
- [ ] C) A compiler error.
- [ ] D) A configuration setting inside `.env.local`.

**Correct Answer:** B
*   **Why it's correct:** In chat histories, `ToolMessage` (or `ToolMessage` class) represents the response of a tool, linked to the preceding `AIMessage` containing the `tool_calls` request.
*   **Why other options are wrong:** A, C, and D describe logging, build, and environment assets.

---

### Q18. How does `ToolNode` automate tool execution inside a LangGraph loop?
- [ ] A) It automatically runs all tools on a set timer.
- [ ] B) It reads the last message in the state; if it contains `tool_calls` requested by the LLM, it executes the matching tool functions and appends the outputs to the state.
- [ ] C) It translates JS code into Python.
- [ ] D) It bypasses OpenAI and queries Google directly.

**Correct Answer:** B
*   **Why it's correct:** `ToolNode` acts as a pre-built router-and-executor node. It checks if the LLM requested any tool calls in its last message, runs them, and outputs the results as messages.
*   **Why other options are wrong:** A describes cron jobs. C is a translator. D is incorrect.

---

### Q19. Why should you avoid mutating `state` properties directly (e.g. `state.query = "new"`) inside nodes?
- [ ] A) Because Node.js will throw a SyntaxError.
- [ ] B) Because LangGraph state is immutable; updates must be returned as partial objects for the engine to process them through reducers correctly.
- [ ] C) Because it deletes the API keys.
- [ ] D) Because it halts the recursion limit.

**Correct Answer:** B
*   **Why it's correct:** Mutating the state argument directly bypasses LangGraph's update channels and reducers, leading to silent state sync bugs and breaking tracing.
*   **Why other options are wrong:** A is wrong because JS doesn't block mutations at the syntax level. C and D are unrelated to object mutation side-effects.

---

### Q20. Why do we include `require.main === module` at the bottom of the example file `agent.ts`?
- [ ] A) To compile the file.
- [ ] B) To allow the file to run directly as a script (via node/tsx), while still allowing its CompiledStateGraph to be imported by other files (like API routes).
- [ ] C) To require authentication.
- [ ] D) To check if the internet is online.

**Correct Answer:** B
*   **Why it's correct:** This check verifies if the file was executed directly. If true, it runs the demo `run()` function. If imported, it skips execution, letting other files import the graph.
*   **Why other options are wrong:** A, C, and D describe compiler, security, or network tasks.

---

### Q21. If Node A and Node B both return `{ query: "updated" }` in sequence, and `query` has no reducer, what is the final state of `query`?
- [ ] A) An array containing both strings.
- [ ] B) The value returned by Node B (the last writer), because the default behavior is overwrite.
- [ ] C) The value returned by Node A.
- [ ] D) It is set to undefined.

**Correct Answer:** B
*   **Why it's correct:** Without a custom reducer function, state channels default to overwriting the value with the latest update.
*   **Why other options are wrong:** A describes array reducer behavior. C describes a write-once channel. D is incorrect.

---

### Q22. Which tool is standard for logging, tracking, and debugging node execution inputs/outputs in LangGraph?
- [ ] A) Git
- [ ] B) LangSmith
- [ ] C) Chrome DevTools
- [ ] D) Postman

**Correct Answer:** B
*   **Why it's correct:** LangSmith is LangChain's tracing platform. It integrates natively to log exact inputs, outputs, and execution times for every node in your graph.
*   **Why other options are wrong:** A is version control. C is browser devtools. D is for manual API testing.

---

### Q23. Why is Zod preferred over standard TypeScript interfaces for defining tool inputs?
- [ ] A) Zod compiles faster.
- [ ] B) Zod schemas survive compilation and validate JSON parameters at runtime, whereas TypeScript interfaces do not exist in compiled JavaScript.
- [ ] C) Zod is built into Node.js.
- [ ] D) TypeScript interfaces cannot define string properties.

**Correct Answer:** B
*   **Why it's correct:** TypeScript types are static checks that disappear after compilation. Zod provides runtime validation, allowing the server to verify the shape of data generated by the LLM.
*   **Why other options are wrong:** A is incorrect. C is incorrect since Zod is an external package. D is wrong.

---

### Q24. How do you configure a LangGraph to pause execution for human review before entering a specific node?
- [ ] A) By calling `await sleep(5000)` inside the node.
- [ ] B) By using the `interruptBefore` parameter when compiling the graph.
- [ ] C) By disabling the internet connection.
- [ ] D) By setting the recursion limit to 0.

**Correct Answer:** B
*   **Why it's correct:** Compiling with an interrupt (`workflow.compile({ checkpointer, interruptBefore: ["decide"] })`) forces the graph to halt and save state, resuming only when triggered.
*   **Why other options are wrong:** A is a sleep timer. C is a network crash. D aborts execution immediately.

---

### Q25. Why do we separate the research phase into `research` and `analyze` nodes instead of doing both in a single node?
- [ ] A) Because a node can only run one fetch request.
- [ ] B) To separate network IO tasks (fetching web data) from computational/reasoning tasks (evaluating metrics), allowing for granular retries and testing.
- [ ] C) To reduce token usage.
- [ ] D) Because LangGraph restricts nodes to 10 lines of code.

**Correct Answer:** B
*   **Why it's correct:** Separating nodes makes the graph modular. If the search tool fails, we can retry the `research` node without re-running the `analyze` calculations, preserving logical boundaries.
*   **Why other options are wrong:** A and D are fictitious limits. C is incorrect since the data processed remains the same.
