# TS Basics: Utility Types & Advanced Patterns

Once you understand basic types, interfaces, and generics, you can use TypeScript's advanced type systems to transform types dynamically and handle complex data flows.

In this guide, you will learn how to use Utility Types, Union & Intersection structures, Type Narrowing, and how to type API responses.

---

## 1. Common Utility Types (`Partial`, `Pick`, `Omit`, `Record`)

Utility types are built-in generic functions in TypeScript that take an existing type and modify its properties.

### A. `Partial<T>`
Makes all properties of an interface optional.
*   **Use Case:** Updating a state object where you only send the fields that changed.
*   **Example:**
    ```typescript
    interface State { query: string; riskScore: number; }
    type StateUpdate = Partial<State>; // { query?: string; riskScore?: number; }
    ```
*   **Common Mistake:** Attempting to read properties of a partial object directly without checking if they are `undefined`.

### B. `Pick<T, Keys>`
Creates a new type by choosing a specific set of keys from an existing interface.
*   **Use Case:** Extracting a small subset of properties from a large database model to return in a clean API response.
*   **Example:**
    ```typescript
    interface User { id: string; name: string; passwordHash: string; }
    type PublicUser = Pick<User, "id" | "name">; // { id: string; name: string; }
    ```
*   **Common Mistake:** Trying to pick keys that do not exist on the source type, which throws a compiler error.

### C. `Omit<T, Keys>`
The opposite of Pick: creates a new type by removing a specific set of keys.
*   **Use Case:** Creating a type for a form submission that excludes database-generated fields like `id` or `createdAt`.
*   **Example:**
    ```typescript
    interface Post { id: string; title: string; content: string; }
    type NewPostInput = Omit<Post, "id">; // { title: string; content: string; }
    ```
*   **Common Mistake:** Over-omitting fields and breaking downstream consumers that expect them.

### D. `Record<Keys, Type>`
Constructs an object type whose property keys are of one type and whose values are of another.
*   **Use Case:** Setting up dictionaries, lookup maps, or config options.
*   **Example:**
    ```typescript
    type StockTickers = "AAPL" | "TSLA";
    const marketPrices: Record<StockTickers, number> = {
      AAPL: 175.5,
      TSLA: 210.2
    };
    ```
*   **Common Mistake:** Forgetting to satisfy all key types specified in the Record definition, causing compilation errors.

---

## 2. Union & Intersection Types

*   **Union Types (`|`):** The value can be one of several types (an **"OR"** logic).
*   **Intersection Types (`&`):** Combines multiple types into one (an **"AND"** logic).

```typescript
interface SearchQuery { query: string; }
interface AuthorDetails { author: string; }

// Union: Can be one or the other
type UserAction = SearchQuery | AuthorDetails;

// Intersection: Must have properties from both
type AuthoredSearch = SearchQuery & AuthorDetails; // { query: string; author: string; }
```

### Common Mistake: Accessing Union-Specific Keys Directly
If a variable is a union type `SearchQuery | AuthorDetails`, you cannot access `author` directly because the compiler doesn't know if the variable holds a `SearchQuery` instead. You must narrow it first.

---

## 3. Type Narrowing (`typeof`, `instanceof`)

Because JavaScript is dynamically typed, a variable can change its type at runtime. **Type Narrowing** is the practice of using runtime checks to verify a variable's type, allowing TypeScript to safely infer its type.

*   **`typeof`:** Used for checking primitives (string, number, boolean).
*   **`instanceof`:** Used for checking object instances created by classes.

```typescript
function processInput(input: string | string[]) {
  if (typeof input === "string") {
    // TypeScript knows 'input' is a string in this block
    console.log(input.toUpperCase());
  } else {
    // TypeScript knows 'input' is an array of strings in this block
    console.log(input.join(", "));
  }
}
```

### Common Mistake: Using `typeof` for Arrays
Using `typeof myArr === "object"` succeeds for arrays, but it does not narrow the type to an array, since `null` and objects also return `"object"`. Use `Array.isArray(myArr)` instead.

---

## 4. Typed API Response Shape

In production, API responses should always follow a consistent structure. We can write a generic `ApiResponse` type to handle success and failure shapes cleanly:

```typescript
interface SuccessResponse<T> {
  status: "success";
  data: T;
}

interface ErrorResponse {
  status: "error";
  message: string;
}

// Union type enforcing status check
export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Real usage example:
interface StockPrice { ticker: string; price: number; }

function handleResponse(response: ApiResponse<StockPrice>) {
  if (response.status === "success") {
    // Narrowed: TypeScript knows 'data' exists here
    console.log(`Price of ${response.data.ticker}: $${response.data.price}`);
  } else {
    // Narrowed: TypeScript knows 'message' exists here
    console.error(`API Error: ${response.message}`);
  }
}
```

---

## 🧠 Self-Check Recall

1.  What does the `Partial<T>` utility type do to an interface?
2.  How does `Pick` differ from `Omit`?
3.  If a type is declared as `string | number`, what operator should you use to check if the value is a string at runtime?
4.  Write an intersection type combining interfaces `A { x: number }` and `B { y: string }`.
5.  Why is `typeof arr === "object"` a bad way to narrow a string array?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **It makes all properties of the interface optional** (appends `?`).
2.  **`Pick` selects specified keys** to keep in the new type; **`Omit` removes specified keys** from the new type.
3.  **The `typeof` operator** (e.g. `if (typeof val === "string")`).
4.  `type C = A & B;` (resulting in `{ x: number; y: string; }`).
5.  **Because arrays are classified as objects** in JavaScript. The check will succeed for arrays, but also for plain objects and `null`, leading to runtime crash risks when calling array methods like `.map()` or `.join()`.
</details>
