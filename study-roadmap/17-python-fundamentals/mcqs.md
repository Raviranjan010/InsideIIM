# Python Practice: 15 Conceptual MCQs

These questions test your understanding of Python basics, data structures, and comparisons with JavaScript.

---

### Q1. What will be the output of this Python code?
```python
x = 5
if x > 2:
    x = x * 2
print(x)
```
- [ ] A) `5`
- [ ] B) `10`
- [ ] C) `x`
- [ ] D) SyntaxError

**Correct Answer:** B
*   **Why it's correct:** Since `5 > 2` is True, the code inside the indented block runs, updating `x` to `10`.
*   **Why other options are wrong:** A assumes the block was skipped. C prints the variable's value, not its name. D is incorrect since the indentation is correct.

---

### Q2. How is a block of code defined in Python?
- [ ] A) Wrapped in curly braces `{}`.
- [ ] B) Wrapped in parentheses `()`.
- [ ] C) Enforced strictly by matching indentation.
- [ ] D) Terminated by a semicolon `;`.

**Correct Answer:** C
*   **Why it's correct:** Python uses indentation to define code blocks.
*   **Why other options are wrong:** A and B are used in JavaScript and other languages. Semicolons are not required in Python.

---

### Q3. What is the value of `result` after running this list comprehension?
```python
nums = [1, 2, 3, 4]
result = [x * 2 for x in nums if x > 2]
```
- [ ] A) `[2, 4, 6, 8]`
- [ ] B) `[6, 8]`
- [ ] C) `[3, 4]`
- [ ] D) `[2, 4]`

**Correct Answer:** B
*   **Why it's correct:** The comprehension filters for items greater than 2 (`3` and `4`), and then doubles them, producing `[6, 8]`.
*   **Why other options are wrong:** A skips the filter check. C is the filtered list before doubling. D is the double of the filtered out values.

---

### Q4. What happens if you try to read a key that does not exist in a Python dictionary?
```python
user = {"name": "Alice"}
print(user["email"])
```
- [ ] A) It prints `None`.
- [ ] B) It prints `undefined`.
- [ ] C) It throws a `KeyError`.
- [ ] D) It returns `null`.

**Correct Answer:** C
*   **Why it's correct:** Python dictionary lookups throw a `KeyError` if the key is not found. To avoid this, you can use `user.get("email")`.
*   **Why other options are wrong:** A and B describe JavaScript object behavior. D is incorrect.

---

### Q5. What is the output of the following boolean evaluation in Python?
```python
items = []
if items:
    print("Full")
else:
    print("Empty")
```
- [ ] A) `Full`
- [ ] B) `Empty`
- [ ] C) `None`
- [ ] D) NameError

**Correct Answer:** B
*   **Why it's correct:** Unlike JavaScript (where empty arrays are truthy), empty lists, dictionaries, and tuples in Python evaluate to **falsy**.
*   **Why other options are wrong:** A is incorrect because the empty list is falsy. C and D are incorrect.

---

### Q6. Which keyword is used to declare functions in Python?
- [ ] A) `function`
- [ ] B) `func`
- [ ] C) `def`
- [ ] D) `arrow`

**Correct Answer:** C
*   **Why it's correct:** `def` (short for define) is the official keyword used to define functions in Python.
*   **Why other options are wrong:** A is JavaScript. B is used in Go. D is not a keyword.

---

### Q7. How do you import a specific function `sqrt` from the `math` library in Python?
- [ ] A) `import sqrt from math`
- [ ] B) `from math import sqrt`
- [ ] C) `const { sqrt } = require('math')`
- [ ] D) `import math.sqrt`

**Correct Answer:** B
*   **Why it's correct:** `from module import function` is the standard Python syntax for selective module imports.
*   **Why other options are wrong:** A reverses the keyword order. C is JavaScript. D is invalid import syntax.

---

### Q8. Which Python library is standard for tabular data manipulation, introducing DataFrames?
- [ ] A) NumPy
- [ ] B) Scikit-Learn
- [ ] C) Pandas
- [ ] D) Matplotlib

**Correct Answer:** C
*   **Why it's correct:** Pandas is designed for tabular data manipulation, providing the `DataFrame` structure.
*   **Why other options are wrong:** A handles matrices. B is for machine learning models. D is for charting.

---

### Q9. What does the Global Interpreter Lock (GIL) prevent in CPython?
- [ ] A) Accessing database keys.
- [ ] B) Running multiple threads of CPU-heavy Python code concurrently in a single process.
- [ ] C) Writing files to the disk.
- [ ] D) Running on Vercel servers.

**Correct Answer:** B
*   **Why it's correct:** The GIL limits thread execution to one thread at a time in CPython, restricting multi-threaded CPU processing.
*   **Why other options are wrong:** A, C, and D are unaffected by the GIL.

---

### Q10. What is the output of this Python script?
```python
x = "10"
y = 5
print(x + y)
```
- [ ] A) `"105"`
- [ ] B) `15`
- [ ] C) It throws a `TypeError`.
- [ ] D) `None`

**Correct Answer:** C
*   **Why it's correct:** JavaScript performs type coercion, converting numbers to strings. Python is strongly typed and throws a `TypeError` if you try to add a string and an integer.
*   **Why other options are wrong:** A is JavaScript behavior. B assumes string-to-number coercion. D is incorrect.

---

### Q11. Which data structure in Python is immutable (cannot be modified after creation)?
- [ ] A) List (`[1, 2]`)
- [ ] B) Dictionary (`{"a": 1}`)
- [ ] C) Tuple (`(1, 2)`)
- [ ] D) Set (`{1, 2}`)

**Correct Answer:** C
*   **Why it's correct:** Tuples are declared using parentheses `()` and are immutable.
*   **Why other options are wrong:** Lists, dictionaries, and sets are mutable.

---

### Q12. What is the output of this dictionary check?
```python
data = {"a": 1}
print(data.get("b", 10))
```
- [ ] A) `None`
- [ ] B) `KeyError`
- [ ] C) `10`
- [ ] D) `undefined`

**Correct Answer:** C
*   **Why it's correct:** The `.get()` method takes a default fallback value (`10`) as its second argument, returning it if the key is not found.
*   **Why other options are wrong:** A and B describe standard bracket lookup outcomes. D is JavaScript.

---

### Q13. In Python, what is the output of `bool(0)`?
- [ ] A) `True`
- [ ] B) `False`
- [ ] C) `None`
- [ ] D) SyntaxError

**Correct Answer:** B
*   **Why it's correct:** The number `0` is evaluated as falsy in both Python and JavaScript.
*   **Why other options are wrong:** A, C, and D are incorrect.

---

### Q14. How do you append an item to a list in Python?
- [ ] A) `list.push(item)`
- [ ] B) `list.append(item)`
- [ ] C) `list += item`
- [ ] D) `list.insert(item)`

**Correct Answer:** B
*   **Why it's correct:** The `.append()` method is the standard way to add an element to the end of a list in Python.
*   **Why other options are wrong:** A is JavaScript. C and D are incorrect methods.

---

### Q15. If a function is defined as `def run(a, b=5):`, what is the result of calling `run(10)`?
- [ ] A) It throws a TypeError.
- [ ] B) It executes with `a = 10` and `b = 5`.
- [ ] C) It executes with `a = 10` and `b = None`.
- [ ] D) It returns `15`.

**Correct Answer:** B
*   **Why it's correct:** The parameter `b` has a default value of `5`, which is used if the second argument is omitted.
*   **Why other options are wrong:** A assumes the second argument is required. C ignores the default value. D assumes a return calculation that wasn't declared.