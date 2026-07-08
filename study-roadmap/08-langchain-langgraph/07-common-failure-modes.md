# Common Failure Modes: Debugging Agentic Loops

Because agents execute code dynamically and cyclic loops are common, debugging a LangGraph.js application is significantly different from debugging standard sequential code.

In this guide, you will learn how to identify, detect, and resolve the 5 most common failure modes in agentic architectures.

---

## 🚨 Failure Mode 1: The Infinite Loop

### 🔍 Description
A node routes to another node, which routes back to the first node (e.g., `research` → `analyze` → `research`), creating an infinite loop that continues until your server crashes or your API bill runs out of credits.

### 🛠️ How to Detect
- The server console shows the same node names executing repeatedly in a rapid sequence.
- The API response hangs, or the server throws a `Maximum call stack size exceeded` error.

### 💡 The Fix: Recursion Limits
Configure a strict **`recursionLimit`** when invoking your graph. This tells LangGraph to automatically abort and throw an error if the graph traverses more than a set number of nodes:

```typescript
// Set recursionLimit in your execution config options:
try {
  const result = await app.invoke(
    { query: "Tesla stock" },
    { recursionLimit: 10 } // Throw error if graph takes more than 10 steps
  );
} catch (error) {
  console.error("Graph execution aborted: Exceeded maximum steps.");
}
```

---

## 🚨 Failure Mode 2: Malformed Tool Call Arguments

### 🔍 Description
The LLM decides to call a tool (like search), but generates arguments that do not match the expected Zod schema (e.g., passing a string instead of an object, or misspelling keys).

### 🛠️ How to Detect
Your tool code crashes with errors like `TypeError: Cannot read properties of undefined` or Zod parsing errors when extracting arguments.

### 💡 The Fix: Schema Validation and Error Catching
In your tool definitions, use Zod to validate inputs, and catch parsing errors inside the tool to return a correction request back to the LLM:

```typescript
const searchTool = tool(
  async (args) => {
    try {
      // Validate schema manually or rely on framework
      const { query } = args;
      return `Results for ${query}`;
    } catch (err) {
      // Send the error message back to the LLM so it can correct its parameters!
      return `Error: Arguments did not match schema. Expected { query: string }. Got ${JSON.stringify(args)}`;
    }
  },
  {
    name: "search",
    schema: z.object({ query: z.string() })
  }
);
```

---

## 🚨 Failure Mode 3: State Not Merging as Expected (Overwrites)

### 🔍 Description
A node outputs an update for an array (like messages), but instead of appending to the list, the array is replaced completely, wiping out conversation history.

### 🛠️ How to Detect
Log the state between nodes. You will notice the `messages` list never grows beyond 1 or 2 messages, even after multiple agent turns.

### 💡 The Fix: Configure Reducers
Ensure that all array properties inside your `Annotation.Root` declaration are configured with an explicit **reducer function**:

```typescript
// CORRECT: Specifying how updates must merge
const StateAnnotation = Annotation.Root({
  messages: Annotation<string[]>({
    reducer: (left, right) => left.concat(right), // Appends new messages
    default: () => []
  })
});
```

---

## 🚨 Failure Mode 4: Tool Timeout (Hanging Requests)

### 🔍 Description
An external tool (like a web search API) hangs or responds slowly, stalling the entire graph execution.

### 🛠️ How to Detect
The graph hangs at a specific node (e.g., `tools`) for 30+ seconds without outputting any logs or errors.

### 💡 The Fix: AbortController Integration
Force all network requests inside your tool functions to use a strict timeout signal:

```typescript
const searchTool = tool(
  async ({ query }) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), 4000); // 4 seconds timeout

    try {
      const res = await fetch(`https://api.tavily.com/search`, {
        signal: controller.signal,
        // ... headers and body ...
      });
      return await res.text();
    } catch (err: any) {
      return `Search failed: ${err.message}`;
    } finally {
      clearTimeout(id);
    }
  },
  {
    name: "search",
    schema: z.object({ query: z.string() })
  }
);
```

---

## 🚨 Failure Mode 5: LLM Ignoring the Output Schema

### 🔍 Description
Despite requesting structured outputs (JSON), the LLM returns standard text, missing keys, or markdown formatting blocks (like ` ```json `), causing `JSON.parse()` to throw a crash exception.

### 🛠️ How to Detect
Your parser node crashes with `SyntaxError: Unexpected token 'U' in JSON at position 0`.

### 💡 The Fix: Strict Output Formatting or Native SDK Helpers
Always use the LLM SDK's native **`withStructuredOutput`** parser wrapper instead of asking for JSON inside a standard text prompt. This forces the model to use the API-level tool schema for response formatting:

```typescript
const model = new ChatOpenAI({ model: "gpt-4o-mini" });
const structuredModel = model.withStructuredOutput(
  z.object({
    recommendation: z.string(),
    confidence: z.number()
  })
);

// This ensures the return type is guaranteed to match the Zod schema object!
const result = await structuredModel.invoke("Evaluate Apple stock.");
console.log(result.recommendation); 
```

---

## 🧠 Self-Check Recall

1.  How do you prevent a cyclic graph from running in an infinite loop?
2.  If you want an array property in your graph state to append new elements instead of overwriting, what must you define?
3.  Why is using `withStructuredOutput` safer than parsing raw LLM text with `JSON.parse`?
4.  If an external search API called inside a tool hangs, how do you prevent the graph from freezing?
5.  What error is thrown if a conditional router directs the graph to a node that has not been added using `.addNode()`?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **By setting a `recursionLimit`** in the invocation configuration options.
2.  **A Reducer Function** (such as `(left, right) => left.concat(right)`).
3.  **It forces schema formatting at the API level.** The LLM provider validates and enforces the JSON structure before returning it, eliminating markdown wrapper or parsing crash risks.
4.  **By implementing an `AbortController` timeout** inside the tool's fetch request.
5.  **A runtime error** stating that the node name was not found or is unregistered.
</details>
