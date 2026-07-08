# Python Basics: A JavaScript Developer's Guide

Python is one of the most widely used languages in modern software engineering, especially in data science and machine learning. 

This guide is a fast-paced introduction to Python syntax and control flows, comparing and contrasting them directly with JavaScript.

---

## 1. Syntax & Variable Declarations

In JavaScript, you declare variables using `let`, `const`, or `var`, and group blocks of code using curly braces `{}`. In Python, there are no declaration keywords, and code blocks are defined strictly by **indentation** (usually 4 spaces).

```python
# JavaScript:
# const score = 100;
# if (score > 90) { console.log("A"); }

# Python equivalent:
score = 100
if score > 90:
    print("A")  # Indentation defines the block
```

---

## 2. Basic Data Types Comparison

| JavaScript Type | Python Equivalent | Key Difference |
| :--- | :--- | :--- |
| `null` | `None` | Represents the absence of value. |
| `undefined` | *(None)* | Python has no `undefined` type; accessing a non-existent variable throws a `NameError`. |
| `Array` (`[1, 2]`) | `List` (`[1, 2]`) | Python lists are mutable sequences. |
| `Object` (`{ a: 1 }`) | `Dictionary` / `Dict` (`{"a": 1}`) | Keys in a Python dictionary must be quoted (e.g. `{"key": "value"}`). |
| `boolean` (`true` / `false`) | `bool` (`True` / `False`) | Python boolean values must be capitalized. |

---

## 3. Control Flow: If, Elif, Loops

Python replaces `else if` with **`elif`** and uses `in` for loop iterations.

### JS vs. Python Loop:
```python
# JavaScript:
# const items = ["search", "analyze"];
# for (const item of items) { console.log(item); }

# Python equivalent:
items = ["search", "analyze"]
for item in items:
    print(item)
```

---

## 📝 Code Example: Dynamic Dictionary Checks
Save this as `basics.py` and run it:
```python
# 1. Declare a dictionary
company_metrics = {
    "ticker": "TSLA",
    "pe_ratio": 35.5,
    "is_profitable": True
}

# 2. Check conditions (Elif block)
if company_metrics["pe_ratio"] < 15:
    print("Value Stock")
elif company_metrics["pe_ratio"] < 30:
    print("Fair Price")
else:
    print("Premium Stock") # Output: Premium Stock
```

---

## ⚠️ Common Beginner Mistake: Mixing Tabs and Spaces
In JavaScript, mixing spaces and tabs in your styling only affects readability. In Python, it throws an `IndentationError` at runtime.
*   **The Fix:** Configure your editor to automatically convert tabs to 4 spaces, and maintain consistent indentation boundaries across all blocks.

---

## 🧠 Self-Check Recall
1.  How do you declare a variable in Python?
2.  What is the Python equivalent of JavaScript's `null` value?
3.  How does Python define blocks of code instead of using curly braces `{}`?
4.  Write the dictionary entry for a key named `"pe"` holding a value of `20`.
5.  What error is thrown in Python if you attempt to read a variable that has not been declared?

<details>
<summary>🔑 Click to reveal answers</summary>
1.  **By writing the variable name directly** and assigning a value (e.g., `x = 5`). No keyword is used.
2.  **`None`**.
3.  **Strict indentation** (usually 4 spaces).
4.  `"pe": 20` (keys must be wrapped in quotes).
5.  **`NameError`**.
</details>