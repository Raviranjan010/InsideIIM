# Python Functions, Lists, & Imports

Writing reusable logic in Python involves defining functions, leveraging built-in collection modifiers, and importing libraries. 

This guide explains functions, introduces **List Comprehensions**, and compares them to JavaScript's map/filter methods.

---

## 1. Defining Functions

In Python, you define a function using the **`def`** keyword.

```python
# JavaScript:
# function calculate(a, b) { return a + b; }

# Python:
def calculate(a, b):
    return a + b
```

---

## 2. List Comprehensions: Python's Map & Filter

In JavaScript, you modify arrays using `.map()` and `.filter()`. Python developers use **List Comprehensions**—a concise syntax to construct new lists from existing ones.

```python
# JavaScript Map:
# const doubles = nums.map(x => x * 2);

# Python List Comprehension Map:
nums = [1, 2, 3]
doubles = [x * 2 for x in nums]  # [2, 4, 6]

# Python List Comprehension Filter (e.g. keep values > 1):
filtered = [x for x in nums if x > 1]  # [2, 3]
```

---

## 3. Importing Modules

Python handles imports similarly to ES6 modules, but with a different syntax:

```python
# Import entire library
import math
print(math.sqrt(16)) # 4.0

# Import specific function
from datetime import datetime
print(datetime.now())
```

---

## 📝 Code Example: Processing a List of Tickers
Save this as `process.py` and run it:
```python
# 1. Define lists and a filter function
tickers = ["AAPL", "TSLA", "MSFT", "GOOG"]

def clean_ticker(t):
    return t.strip().upper()

# 2. List comprehension combining cleaning and filtering
# Map: clean_ticker(t) | Filter: if t starts with 'A' or 'T'
filtered_tickers = [clean_ticker(t) for t in tickers if t.startswith("A") or t.startswith("T")]

print(filtered_tickers) # Output: ['AAPL', 'TSLA']
```

---

## ⚠️ Common Beginner Mistake: Forgetting the Colon `:`
In Python, writing a function definition, an `if` statement, or a `for` loop without a colon at the end of the line throws a `SyntaxError`.

```python
# INCORRECT: Missing colon
def calculate_yield(pe)
    return 1 / pe
```
*   **The Fix:** Always append a colon `:` to mark the start of an indented block:
```python
# CORRECT: Colon present
def calculate_yield(pe):
    return 1 / pe
```

---

## 🧠 Self-Check Recall
1.  What keyword is used to declare a function in Python?
2.  Write a list comprehension that takes the list `[1, 2, 3]` and adds 10 to each number.
3.  Write the Python import statement to import the `json` library.
4.  How does a list comprehension filter elements?
5.  What syntax is used to define default parameters in a Python function?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **`def`**.
2.  `[x + 10 for x in [1, 2, 3]]`.
3.  **`import json`**.
4.  **By appending an `if` condition** at the end of the brackets (e.g. `[x for x in list if x > 5]`).
5.  **Assigning the default directly in the parameter list** (e.g. `def greet(name="User"):`).
</details>