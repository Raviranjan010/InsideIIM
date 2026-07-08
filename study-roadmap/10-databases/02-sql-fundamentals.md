# SQL Fundamentals: Querying the Database

SQL (Structured Query Language) is the standard language used to interact with relational databases.

In this guide, you will learn the 4 core SQL commands: `SELECT`, `WHERE`, `INSERT`, and `JOIN`, complete with concrete query examples.

---

## 1. Core SQL Commands Reference

Suppose we have two database tables, `users` and `logs`:

### `users` Table
| id | name |
| :--- | :--- |
| 1 | Alice |
| 2 | Bob |

### `logs` Table
| id | query | user_id |
| :--- | :--- | :--- |
| 101 | Tesla analysis | 1 |
| 102 | Apple financials | 1 |

---

## 2. SELECT & WHERE: Reading Data

*   **`SELECT`:** Specifies which columns to retrieve. Use `*` to retrieve all columns.
*   **`WHERE`:** Filters the results based on specific conditions.

### Example Query:
Get all query logs made by User 1 (Alice):
```sql
SELECT id, query 
FROM logs 
WHERE user_id = 1;
```
**Output:**
| id | query |
| :--- | :--- |
| 101 | Tesla analysis |
| 102 | Apple financials |

---

## 3. INSERT: Creating New Records

*   **`INSERT INTO`:** Adds new rows to a table.

### Example Query:
Add a new log record:
```sql
INSERT INTO logs (query, user_id) 
VALUES ('Google valuation', 2);
```

---

## 4. JOIN: Combining Tables

*   **`JOIN` (Inner Join):** Combines rows from two or more tables based on a related column (the Foreign Key).

### Example Query:
Retrieve all logs, matching each query with the user's name:
```sql
SELECT logs.query, users.name
FROM logs
INNER JOIN users ON logs.user_id = users.id;
```
**Output:**
| query | name |
| :--- | :--- |
| Tesla analysis | Alice |
| Apple financials | Alice |
| Google valuation | Bob |

---

## ⚠️ Common Beginner Mistake: Forgetting Table Prefixes in Joins

When joining tables, if both tables share a column name (such as `id`), writing the column name directly in the `SELECT` clause throws an "ambiguous column" database error.

```sql
-- INCORRECT: Ambiguous column name
SELECT id, query, name 
FROM logs
JOIN users ON user_id = users.id;
```
*   **Why it fails:** The database doesn't know whether `id` refers to `logs.id` or `users.id`.
*   **The Fix:** Always prefix shared columns with their respective table name:
```sql
-- CORRECT: Explicit prefixes
SELECT logs.id AS log_id, users.id AS user_id, query, name
FROM logs
JOIN users ON logs.user_id = users.id;
```

---

## 🧠 Self-Check Recall

1.  What SQL keyword is used to specify filter conditions?
2.  Write the SQL command to retrieve only the `name` column for all records in the `users` table.
3.  What does the `INNER JOIN` keyword do?
4.  Write the SQL query to insert a user named "Charlie" into the `users` table.
5.  What error is thrown if you request the column `id` in a JOIN query without a table prefix?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`WHERE`**
2.  **`SELECT name FROM users;`**
3.  **It merges rows** from two tables where the join condition matches.
4.  **`INSERT INTO users (name) VALUES ('Charlie');`**
5.  **An "ambiguous column" error**, because the database cannot determine which table's `id` column you want.
</details>
