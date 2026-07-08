# Comparative Interview Q&A: Python vs. JavaScript

This guide contains 10 comparative interview questions designed for a developer whose primary stack is JavaScript/TypeScript, showing how to discuss Python trade-offs in interviews.

---

### Q1. Since you primarily build in JS/TS, why would you reach for Python in an AI project?
**Answer:**
While JavaScript is excellent for building web interfaces, Route Handlers, and agent routing logic, Python has a much stronger ecosystem for heavy data processing and machine learning. If the project requires loading large financial CSV files, scraping data structures, or running matrix computations, Python libraries like Pandas and NumPy offer superior performance and simpler APIs. I would use Python as a background data processor that saves structured outputs to a shared database.

---

### Q2. How do variable declarations in Python differ from JavaScript?
**Answer:**
JavaScript requires variable declaration keywords (`let`, `const`, `var`) and enforces block scope or lexical scope rules. Python has no variable declaration keywords; variables are created automatically when they are assigned a value (e.g. `total = 5`). Additionally, Python variables are function-scoped or global, and do not support block scoping (variables created inside an `if` block are visible outside of it).

---

### Q3. Explain the difference between JavaScript's `null` and Python's `None`.
**Answer:**
Both represent the absence of a value. In JavaScript, `null` is an object type representing an intentional empty reference, whereas `undefined` is used for unassigned variables. Python has no `undefined` type; variables must be explicitly assigned a value before use. Python uses `None` as a singleton object representing empty states. Accessing an unassigned variable in Python throws a `NameError`.

---

### Q4. Compare list comprehensions in Python with `.map()` and `.filter()` in JavaScript.
**Answer:**
In JavaScript, we transform arrays using chaining: `nums.filter(x => x > 5).map(x => x * 2)`. 

In Python, list comprehensions provide a concise alternative: `[x * 2 for x in nums if x > 5]`. List comprehensions are highly optimized in Python and execute faster than standard loops, making them the preferred way to filter and map data.

---

### Q5. How does Python enforce code blocks compared to JavaScript?
**Answer:**
JavaScript uses curly braces `{}` to define code blocks, and semicolons `;` to terminate lines, ignoring whitespace. Python uses **indentation** to define blocks and line breaks to terminate expressions. Indentation (usually 4 spaces) is syntactically enforced; mixing tabs and spaces or using incorrect indentations throws an `IndentationError` at compile-time.

---

### Q6. How does truthiness evaluation differ between Python and JavaScript?
**Answer:**
Both languages evaluate non-zero numbers and non-empty strings as truthy. However, empty collections behave differently:
*   In JavaScript, empty arrays `[]` and objects `{}` are **truthy** references.
*   In Python, empty lists `[]`, dictionaries `{}`, and tuples `()` are evaluated as **falsy** values.

---

### Q7. What are the key differences between dictionaries in Python and objects in JavaScript?
**Answer:**
JavaScript objects are native structures whose keys are automatically converted to strings (e.g. `obj.key` or `obj["key"]`). Python dictionaries (`dict`) are hash maps. Dictionary keys must be hashable types (strings, numbers, or tuples) and must be explicitly quoted when declared or accessed: `my_dict["key"]`. Accessing a non-existent key in JavaScript returns `undefined`, whereas in Python it throws a `KeyError` unless accessed using the `.get()` method.

---

### Q8. Explain how asynchronous execution is handled in Python vs. JavaScript.
**Answer:**
JavaScript is single-threaded and built around an Event Loop by default, managing asynchronous tasks natively via Promises and `async/await`. Python is synchronous by default. To run asynchronous code, Python requires importing the `asyncio` module and using an event loop explicitly. Additionally, Python's multi-threading is constrained by the **Global Interpreter Lock (GIL)**, meaning Python cannot run multiple threads of CPU-heavy calculations concurrently on multiple cores in a single process.

---

### Q9. What is the Global Interpreter Lock (GIL) in Python, and how does it affect CPU-heavy tasks?
**Answer:**
The GIL is a mutex lock in the standard Python interpreter (CPython) that ensures only one thread executes Python bytecode at a time, protecting memory states. This means Python cannot run multiple threads of CPU-heavy calculations concurrently on multiple cores. To achieve true multi-core parallel processing for heavy tasks, Python developers must use multi-processing (running separate OS processes) rather than multi-threading.

---

### Q10. If you needed to integrate a Python data script into a Next.js API Route Handler, how would you design the communication layer?
**Answer:**
I would use a database-centric or process-centric communication layer. For simple scripts, I can spawn a child process from Next.js using Node's `child_process.spawn("python", ["script.py"])`, passing inputs via CLI arguments and receiving outputs via `stdout`. For a production system, I would use a shared database: Next.js writes a request log to PostgreSQL, a background Python worker processes the request, and saves the final result back to the database, where Next.js retrieves it.