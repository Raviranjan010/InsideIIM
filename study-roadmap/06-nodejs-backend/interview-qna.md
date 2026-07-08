# Node.js Backend Interview Q&A: 12 Questions

Here are 12 interview questions and answers focused on Node.js backend concepts, HTTP cycles, API resilience, and secret management inside Next.js Route Handlers.

---

### Q1. Explain the request-response cycle in a Next.js API Route Handler that calls an LLM.
**Answer:**
The cycle begins when the client sends an HTTP request carrying input parameters to the Next.js server. The server parses the request body stream inside Node.js, validates the parameters, and initiates an outbound `fetch` call to the LLM API using secure server-side environment credentials. Once the LLM processes the prompt and returns the generated text response, our server compiles the results into a clean JSON structure and sends it back to the client as an HTTP response with a `200 OK` status, closing the connection.

---

### Q2. Why shouldn't a React client query the OpenAI API directly, and what is the standard backend solution?
**Answer:**
Querying OpenAI directly from the React client requires hardcoding the API key or storing it in the browser bundle, exposing it to anyone inspect the site's code. To prevent this security breach, we use a backend server or a Next.js Route Handler as a secure middleman. The React client calls our server endpoint, and the server fetches the OpenAI API using private system environment keys that never leave the server's memory, protecting our credentials from being leaked.

---

### Q3. How do you parse the incoming request body inside a Next.js route handler, and what is a common pitfall?
**Answer:**
We parse the body by awaiting `request.json()`, which reads and compiles the incoming stream as a JavaScript object. The main pitfall is attempting to call `request.json()` more than once inside the same handler execution. Because the request body is a single-use readable stream, reading it twice throws a `TypeError: body stream already read` and crashes the route. To avoid this, we read it once at request entry and save the object to a local variable.

---

### Q4. What is the difference between `response.json()` and `NextResponse.json()`?
**Answer:**
`response.json()` is an asynchronous method called on an active fetch response object to parse the incoming JSON text stream into a JavaScript object. `NextResponse.json()` is a static method provided by Next.js to construct a new outbound HTTP response carrying JSON data to be sent back to the client. Essentially, the former is used for reading incoming JSON data from external APIs, while the latter is used to write outgoing JSON responses from our server.

---

### Q5. How do you implement a request timeout for an outbound `fetch` request in Node.js?
**Answer:**
We implement timeouts using `AbortController` by creating an instance and passing its `controller.signal` into the fetch options object. We then set a `setTimeout` timer for our duration (e.g. 5 seconds) that triggers `controller.abort()`. If the fetch request fails to complete within that time frame, the controller cancels the connection and throws an `"AbortError"` which we catch in our try/catch block.

---

### Q6. Why is it critical to call `clearTimeout()` inside the `finally` block of a timeout-wrapped `fetch` request?
**Answer:**
If the outbound fetch request succeeds quickly (e.g., in 200ms), the timeout timer set by `setTimeout` remains active in Node.js memory until its scheduled duration expires. If you forget to clear it, these active timers pile up in system memory on high-traffic servers. This creates a memory leak that gradually degrades performance and will eventually crash the Node.js process. Wrapping `clearTimeout` in a `finally` block guarantees cleanup immediately after execution.

---

### Q7. Describe how you would write a basic retry mechanism for an external API call.
**Answer:**
I would write a loop (such as a `for` loop) up to a maximum number of retries, wrapping the `fetch` call in a `try/catch` block. If the fetch succeeds and `response.ok` is true, the function returns the response immediately. If it fails or catches a network error, the loop logs a warning, pauses execution for a short delay using a Promise-wrapped `setTimeout`, and iterates to try again. If all attempts fail, the function throws a final error.

---

### Q8. What is the difference between private environment variables and those with the `NEXT_PUBLIC_` prefix?
**Answer:**
Private environment variables are accessible only inside Node.js code running on the server, such as Route Handlers or Server Components. Variables prefixed with `NEXT_PUBLIC_` instruct Next.js to compile and bundle their values directly into the public JavaScript files sent to the client browser. This allows browser-rendered React components to read them, but means they are visible to anyone inspect the code and should never be used for secret API keys.

---

### Q9. Why is it bad practice to commit `.env.local` to git, and how do you prevent it?
**Answer:**
`.env.local` contains private keys, passwords, and database credentials that must remain secure. Committing it to Git uploads these credentials to version control, making them permanently visible in the repository history, where malicious bots scan and steal them. To prevent this, we list `.env.local` inside our `.gitignore` file, instructing Git to completely ignore the file and keep it residing only on local machines.

---

### Q10. What HTTP status code should you return if an external API (like Tavily) fails to respond, and why?
**Answer:**
We should return a `502 Bad Gateway` status code. This informs the client that our server's internal code is running correctly, but an upstream server (Tavily) that we depend on to fulfill the request failed or returned an invalid response. Returning `502` distinguishes third-party service downtime from errors caused by bugs in our own server code (which would trigger a `500` error).

---

### Q11. How do you validate that necessary environment variables are loaded on your server before making external API requests?
**Answer:**
At the entry point of the route handler, we write a validation function that checks if the required variables (like `process.env.OPENAI_API_KEY`) exist. If any variables are missing, the function throws an explicit error listing the missing variables. Our handler catches this error and returns a clear `500 Server Configuration Error` response, preventing the code from failing later with cryptic null-pointer or authorization errors.

---

### Q12. What is the difference between a `400 Bad Request` and a `500 Internal Server Error` in the context of API validation?
**Answer:**
A `400 Bad Request` indicates that the client made a mistake, such as sending malformed JSON or omitting a required parameter like `query`. A `500 Internal Server Error` indicates that the server made a mistake or encountered an configuration error, such as a code crash or missing system environment variables. This distinction helps developers immediately locate whether a bug lies in the frontend request formatting or the backend configuration.
