# Node.js Backend: 20 Multiple Choice Questions (MCQs)

These questions test your understanding of backend concepts, request/response lifecycles, outbound fetch requests, timeouts, retries, secure configurations, and error routing.

---

### Q1. What is the role of a Next.js Route Handler inside a search-and-LLM application?
- [ ] A) To compile React components into client browser bundles.
- [ ] B) To act as a secure intermediary, receiving query parameters, calling external search/LLM APIs, and returning the results to the browser.
- [ ] C) To host a database engine locally in the client tab.
- [ ] D) To manage CSS transitions inside browser views.

**Correct Answer:** B
*   **Why it's correct:** Next.js Route Handlers act as backend API endpoints. They securely query external resources (like Tavily or OpenAI) using server-side keys without exposing those keys to the public client.
*   **Why other options are wrong:** A describes build bundling. C is incorrect since databases don't run inside client tabs. D describes frontend styling, which is unrelated to backend route handlers.

---

### Q2. What happens if a Next.js Route Handler completes its calculations but fails to execute a `return NextResponse.json(...)` statement?
- [ ] A) Next.js returns a `200 OK` status with empty content automatically.
- [ ] B) The client browser crashes.
- [ ] C) The request remains open and the client hangs indefinitely waiting for a response.
- [ ] D) The server restarts.

**Correct Answer:** C
*   **Why it's correct:** HTTP connections require the server to explicitly return a response to close the request stream. If you omit the return statement, the connection remains open, causing the browser or caller to hang until it times out.
*   **Why other options are wrong:** A is incorrect because Next.js does not auto-return dummy responses. B and D describe crashes and restarts which are not triggered by an unreturned request handler.

---

### Q3. Why must we call `JSON.stringify(payload)` when sending data inside a fetch request body?
- [ ] A) To encrypt the payload data for security.
- [ ] B) To convert a JavaScript object into a flat string format that can be transmitted over HTTP.
- [ ] C) To make the request execute faster.
- [ ] D) To compression-encode the data.

**Correct Answer:** B
*   **Why it's correct:** HTTP body payloads cannot carry complex, active JavaScript objects. They must be flattened into text strings (like JSON strings) before sending.
*   **Why other options are wrong:** A is wrong because stringification does not encrypt data. C is wrong since stringification does not affect network speed. D is wrong because stringification is a format serialization, not gzip/deflate compression.

---

### Q4. If your Next.js server receives a request but the payload lacks the required `query` parameter, what is the most appropriate HTTP status code to return?
- [ ] A) `200 OK`
- [ ] B) `400 Bad Request`
- [ ] C) `404 Not Found`
- [ ] D) `500 Internal Server Error`

**Correct Answer:** B
*   **Why it's correct:** Status code `400 Bad Request` is the standard status code used to inform the client that the payload they sent is invalid or missing required parameters.
*   **Why other options are wrong:** A is for success. C is for missing endpoints or file URLs. D is for server-side code crashes, not bad client inputs.

---

### Q5. What does the `response.ok` property represent in a fetch promise resolution?
- [ ] A) The promise completed without throwing a network error.
- [ ] B) The server responded with an HTTP status code in the successful range (200-299).
- [ ] C) The returned data is in JSON format.
- [ ] D) The request bypassed the CORS policy.

**Correct Answer:** B
*   **Why it's correct:** The `.ok` property is a boolean flag indicating if the status code returned from the server was successful (specifically, between `200` and `299` inclusive).
*   **Why other options are wrong:** A is wrong because `fetch` resolves on 4xx/5xx responses as well. C is wrong since `.ok` does not verify payload content types. D is unrelated to CORS checks.

---

### Q6. If an external LLM API returns a `500 Internal Server Error` due to high load, what status code should your route handler return to its client?
- [ ] A) `200 OK`
- [ ] B) `400 Bad Request`
- [ ] C) `502 Bad Gateway`
- [ ] D) `404 Not Found`

**Correct Answer:** C
*   **Why it's correct:** `502 Bad Gateway` is the standard HTTP response indicating that our server, acting as a proxy or coordinator, received a failure or invalid response from an upstream server (the external LLM API).
*   **Why other options are wrong:** A is for success. B is for client input errors. D indicates a missing route.

---

### Q7. How do you implement a request timeout with native `fetch` in Node.js?
- [ ] A) By calling `fetch(url, { timeout: 5000 })`.
- [ ] B) Using `AbortController` and passing its `signal` parameter inside the fetch options.
- [ ] C) By wrapping the fetch in a `setInterval` loop.
- [ ] D) Native fetch does not support timeouts.

**Correct Answer:** B
*   **Why it's correct:** Node.js native fetch implements abort signals. By passing `controller.signal` into fetch, calling `controller.abort()` cancels the request.
*   **Why other options are wrong:** A describes a non-standard option structure. C describes intervals, which are not timeouts. D is wrong because fetch supports abort controls.

---

### Q8. What is the danger of failing to clean up an `AbortController` timeout timer using `clearTimeout()`?
- [ ] A) The request will execute twice.
- [ ] B) The server will crash instantly with a SyntaxError.
- [ ] C) The timer remains active in memory, creating a memory leak on high-traffic servers.
- [ ] D) The API keys will leak to the client.

**Correct Answer:** C
*   **Why it's correct:** Timers created by `setTimeout` remain active in the Node.js event loop until they expire. If you don't clear them, they consume memory, leading to memory leaks.
*   **Why other options are wrong:** A is incorrect. B is incorrect because it's a runtime resource issue, not a syntax error. D is wrong since timers do not affect variable visibility scopes.

---

### Q9. When implementing a retry mechanism, what is the purpose of adding a delay between attempts?
- [ ] A) To allow the browser time to render.
- [ ] B) To avoid overwhelming the upstream API (rate limits) and give temporary network blips time to resolve.
- [ ] C) To encrypt the request payload.
- [ ] D) To reduce server processor temperatures.

**Correct Answer:** B
*   **Why it's correct:** Retrying instantly after a failure increases load on the failing API and doesn't give short network failures time to recover. Adding a delay (e.g. 1 second) increases the chance of success.
*   **Why other options are wrong:** A is wrong because backend retries are independent of browser rendering. C and D are completely unrelated to network retry flows.

---

### Q10. Where does Node.js locate environment variables during runtime?
- [ ] A) In the client's `localStorage` memory.
- [ ] B) In the system memory, accessible via the `process.env` global object.
- [ ] C) In a public JSON file hosted at `/public/env.json`.
- [ ] D) Inside the database schema.

**Correct Answer:** B
*   **Why it's correct:** Next.js loads variables from `.env.local` into the server process memory, making them accessible via `process.env` in backend code.
*   **Why other options are wrong:** A is client-side browser storage. C would expose all private keys to the public web. D is wrong.

---

### Q11. Why is `.env.local` added to the `.gitignore` file by default?
- [ ] A) To speed up git commit execution.
- [ ] B) To prevent private API keys and database credentials from being pushed to public GitHub repositories.
- [ ] C) To compress the file size.
- [ ] D) Because Git cannot track files that end with `.local`.

**Correct Answer:** B
*   **Why it's correct:** `.env.local` contains sensitive passwords and keys. Excluding it via `.gitignore` ensures it remains safely on local development machines.
*   **Why other options are wrong:** A and C are unrelated to Git tracking filters. D is wrong because Git can track any file extension.

---

### Q12. What error is thrown if you attempt to read properties from an `undefined` search result object in Node.js?
- [ ] A) `ReferenceError`
- [ ] B) `TypeError`
- [ ] C) `SyntaxError`
- [ ] D) `RangeError`

**Correct Answer:** B
*   **Why it's correct:** Attempting to read a property from `undefined` (e.g., `undefined.results`) throws a `TypeError: Cannot read properties of undefined`.
*   **Why other options are wrong:** A is for undeclared variable names. C is for spelling/parsing structural errors. D is for invalid numeric array lengths or values.

---

### Q13. Why should you write config validation code at the start of your route handlers?
- [ ] A) To speed up execution times.
- [ ] B) To fail-fast and alert the development team immediately if required API keys are missing on deployment.
- [ ] C) To automatically purchase more API credits.
- [ ] D) To compile TypeScript into JavaScript.

**Correct Answer:** B
*   **Why it's correct:** Validation checks ensure that if keys are missing (e.g. forgot to set them in production env), the server alerts the logs immediately on request, facilitating easier debugging.
*   **Why other options are wrong:** A is incorrect because validations add a tiny lookup step. C and D are not related to environment variable checks.

---

### Q14. What occurs if you run `process.env.OPENAI_API_KEY` inside a Next.js file marked with `"use client"`?
- [ ] A) The application crashes with a compile error.
- [ ] B) It exposes the key to the browser console.
- [ ] C) It returns `undefined` to protect the secret from being bundled into the client browser code.
- [ ] D) It downloads the key from the server.

**Correct Answer:** C
*   **Why it's correct:** Next.js explicitly prevents server-only keys from leaking to the client browser bundle. If a key lacks the `NEXT_PUBLIC_` prefix, it resolves to `undefined` in client files.
*   **Why other options are wrong:** A is wrong because it compiles fine. B is wrong since it returns `undefined`. D is wrong.

---

### Q15. Which of the following represents the correct way to parse a JSON body stream from a Next.js `Request` object?
- [ ] A) `const data = JSON.parse(request);`
- [ ] B) `const data = await request.json();`
- [ ] C) `const data = request.getBody();`
- [ ] D) `const data = request.body.toJSON();`

**Correct Answer:** B
*   **Why it's correct:** Next.js uses modern Web Request APIs, where `request.json()` returns a Promise resolving to the parsed request body object.
*   **Why other options are wrong:** A throws a syntax error. C and D do not exist on the Web Request API interface.

---

### Q16. If your route handler catches an error with message "fetch failed" due to no internet connection on the server, what status code category should be returned?
- [ ] A) `4xx` (Client Error)
- [ ] B) `2xx` (Success)
- [ ] C) `5xx` (Server/Gateway Error)
- [ ] D) `3xx` (Redirection)

**Correct Answer:** C
*   **Why it's correct:** Network failures or server offline issues are infrastructure failures, which fall under the `5xx` category (such as `500` or `503`).
*   **Why other options are wrong:** A is wrong because the client's request was valid. B and D are for successful completions or redirections.

---

### Q17. When calling `controller.abort()` on an `AbortController`, what event does the fetch request trigger?
- [ ] A) It triggers the `.then()` chain with null value.
- [ ] B) It rejects the fetch promise, throwing an error with name `"AbortError"`.
- [ ] C) It restarts the computer.
- [ ] D) It changes the HTTP method to GET.

**Correct Answer:** B
*   **Why it's correct:** Aborting a request forces the fetch promise to reject instantly, throwing a DOMException with the name `"AbortError"` which you must catch.
*   **Why other options are wrong:** A is wrong because aborts reject, they don't resolve. C is a joke. D is wrong.

---

### Q18. What is the default HTTP method used by the native `fetch` function if you do not specify a method in options?
- [ ] A) `POST`
- [ ] B) `DELETE`
- [ ] C) `GET`
- [ ] D) `PUT`

**Correct Answer:** C
*   **Why it's correct:** Native `fetch` assumes a read operation (`GET`) by default if no configuration options object is passed as the second argument.
*   **Why other options are wrong:** A, B, and D are explicit modifications that require passing `{ method: "POST" }` etc.

---

### Q19. In a try-catch-finally block, when is the code inside `finally` executed?
- [ ] A) Only if an error occurs.
- [ ] B) Only if no error occurs.
- [ ] C) Always, regardless of whether an error was thrown or caught.
- [ ] D) Only if the catch block contains a return statement.

**Correct Answer:** C
*   **Why it's correct:** The `finally` block is guaranteed to execute after the try and catch blocks finish, making it the ideal place to clean up resources like timers.
*   **Why other options are wrong:** A and B describe conditional code blocks (like catch or try). D is wrong because finally runs regardless of return structures.

---

### Q20. If you prefix a secret key with `NEXT_PUBLIC_TAVILY_API_KEY` in `.env.local`, what is the security implication?
- [ ] A) The key is encrypted automatically.
- [ ] B) The key becomes accessible to the client browser, meaning anyone inspecting your site can steal it.
- [ ] C) The key is ignored by Next.js.
- [ ] D) The key can only be used on localhost.

**Correct Answer:** B
*   **Why it's correct:** Prefixing variables with `NEXT_PUBLIC_` instructs Next.js to bundle them into the public client JavaScript files, exposing them to anyone visiting the site.
*   **Why other options are wrong:** A is wrong because variables are transmitted as plain text. C is wrong because it is loaded. D is wrong because it applies to production deployments as well.
