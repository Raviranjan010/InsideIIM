# Project Deep-Dive Questions: Proving Authorship

This bank contains 15 questions specifically designed to test whether you actually built and understand the architecture of your search-grounded agent, rather than copying a template.

---

### Q1. Explain the exact state shape of your LangGraph agent. Why did you choose this schema and not a simple array of messages?
**Answer:**
My graph state is defined using `Annotation.Root` with four key fields: `query` (a string), `rawResearch` (a string containing stringified JSON), `analysisMetrics` (a string), and `finalDecision` (a structured object). 

I chose this specific schema over a simple message array because it creates a clear separation of concerns. While a message list is useful for conversational history, having dedicated channels for structured outputs (like calculations and final decisions) allows my Next.js API handler to extract the final report directly from the state without having to parse through historical message lists.

---

### Q2. If your Tavily Search API returns zero search results for a query, what happens to the state? How does your graph handle it?
**Answer:**
If the search API returns nothing, the `researchNode` captures the empty response and returns `{ rawResearch: JSON.stringify({ error: "No stock data found for query." }) }` to update the state. 

When the execution moves to the `analyzeNode`, it parses this string; detecting the `error` key, it halts further analysis calculations and sets `analysisMetrics` to a warning state. Finally, the `decideNode` reads this warning and outputs a structured hold recommendation explaining that no financial data was available, avoiding a hallucination.

---

### Q3. How did you structure your system prompt to ensure the LLM never returns direct buy or sell recommendations?
**Answer:**
I injected strict compliance instructions into the System Prompt on the server. The prompt commands: *"You are a financial research analyst. You are forbidden from giving direct financial advice, including buy, sell, or hold recommendations to the user. Instead, outline objective risks and opportunities based ONLY on the provided context."* 

Because this is a system-level constraint set at temperature `0`, it cannot be overridden by user inputs.

---

### Q4. What happens in your Route Handler if `JSON.parse` fails when reading the LLM's final response?
**Answer:**
If `JSON.parse` fails because of a parsing exception, it triggers the `catch` block of my handler. Instead of letting the server crash, the catch block logs the error stack trace internally and returns a `502 Bad Gateway` response containing a clean JSON error payload (e.g. `{ error: "Failed to parse structured decision" }`). This ensures the API fails gracefully.

---

### Q5. Why did you choose to put your API keys on the server instead of calling OpenAI directly from the React frontend?
**Answer:**
Calling OpenAI from the React frontend requires exposing my private API keys in client-side JavaScript. A user could easily open the browser dev tools, view the network requests, and extract my keys to use on their own projects, draining my API budget. Keeping keys in server-side environment variables ensures they remain in secure server memory, and the client only interacts with my proxy API `/api/research`.

---

### Q6. In your 3-node graph, how does the `analyze` node read the output of the `research` node? Walk me through the variables.
**Answer:**
Both nodes share the state memory. The `research` node runs its fetch request and returns `{ rawResearch: toolResult }`. The LangGraph engine merges this update into the state object. 

When the `analyzeNode` is invoked, the engine passes the updated state object as an argument. The node accesses the data via `state.rawResearch`, parses it using `JSON.parse`, performs its calculations, and returns `analysisMetrics` to the state.

---

### Q7. How does your Next.js Route Handler handle a client disconnect mid-request?
**Answer:**
When a browser client disconnects (e.g., the user closes the tab), the incoming Request connection closes. In my Route Handler, I can listen for this event using the request signal: `req.signal.addEventListener("abort", () => { ... })`. If triggered, I call `.abort()` on my outbound `AbortController` instance, canceling any active fetch calls to Tavily or OpenAI to save credits and release server threads.

---

### Q8. Explain the exact file structure you used for your API routes in Next.js. Why this specific layout?
**Answer:**
I used the Next.js App Router file-system routing structure. The route handler is located at `app/api/research/route.ts` (with `route.ts` containing the `POST` function). 

I used this layout because Next.js expects Route Handlers to be placed in `route.ts` files inside the `api/` directory. Placing a `page.tsx` and a `route.ts` in the same directory causes a build-time routing conflict, so the API logic must be completely isolated from page rendering routes.

---

### Q9. What is the difference between a `NEXT_PUBLIC_` environment variable and a private one? Which ones did you use and why?
**Answer:**
Variables prefixed with `NEXT_PUBLIC_` are bundled into the JavaScript code sent to the browser, making them visible to anyone who visits the site. Private environment variables (without the prefix) are only accessible in Node.js server environments. 

I used private variables for `OPENAI_API_KEY` and `TAVILY_API_KEY` to keep them hidden on the server, and public variables only for non-sensitive configurations like base URLs (`NEXT_PUBLIC_API_URL`).

---

### Q10. If the user sends a message that is 10,000 words long, how does your backend prevent token limit overflows?
**Answer:**
To prevent token limit overflows, my Next.js Route Handler checks the character length of the incoming user query before calling the graph. If it exceeds a set threshold (e.g. 2,000 characters), the API rejects the request immediately with a `400 Bad Request` status and returns a message: `"Query exceeds maximum character limit"`. This protects our token budget and prevents slow down.

---

### Q11. How do you verify that your LangGraph compiles correctly before deploying it to production?
**Answer:**
I verify compilation by writing a local runner script (`agent.ts`) that builds the `StateGraph` and calls `workflow.compile()`. Running this script via `tsx` or `node` executes the compile check. If there are any orphan nodes, missing edges, or type discrepancies in the annotation keys, the compiler throws validation errors on startup, allowing me to resolve issues before pushing code to GitHub.

---

### Q12. Why did you choose to use `temperature: 0` for the decision node? What would happen if you used `temperature: 1.5`?
**Answer:**
I set the temperature to `0` to enforce determinism. This forces the model to select words with the highest probability, guaranteeing it extracts financial figures literally. 

If I used a high temperature like `1.5`, the model would select lower-probability words to be creative, which increases the risk of it distorting calculations, fabricating numbers, or outputting invalid JSON formats that crash our parser.

---

### Q13. If your search tool takes more than 10 seconds to respond, how does your system handle it?
**Answer:**
I integrated an `AbortController` timeout inside the search tool. When calling `fetch` to Tavily, I link it to the abort signal and run a `setTimeout` timer for 5 seconds. If the API fails to respond within 5 seconds, the timer calls `controller.abort()`, throwing an `AbortError`. The catch block handles this failure gracefully by returning a placeholder error string, preventing the graph execution from freezing.

---

### Q14. What are the advantages of using `withStructuredOutput` in LangGraph compared to standard text prompting?
**Answer:**
`withStructuredOutput` enforces JSON schema conformity at the API communication layer using OpenAI's structured parameters. This ensures that the model validates its output against our Zod schema before returning it. 

Using standard text prompts requires post-parsing with regex or `JSON.parse`, which is prone to failing if the model outputs conversational text or markdown code blocks.

---

### Q15. How do you distinguish between a network failure (OpenAI down) and a code bug (SyntaxError) in your client responses?
**Answer:**
I distinguish them by wrapping operations in specific `try...catch` blocks and returning distinct HTTP status codes. 

If an external API call fails, I catch the network error and return a `502 Bad Gateway` containing an error message. If my internal code throws a parser or database error, I catch it and return a `500 Internal Server Error`. This allows frontend developers and logs to isolate the failure source immediately.
