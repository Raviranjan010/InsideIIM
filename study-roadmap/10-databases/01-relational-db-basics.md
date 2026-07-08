# Relational Databases: Tables, Keys, & Choices

A **Relational Database Management System (RDBMS)** is a tool designed to store structured data in tables and manage relationships between those tables.

In this guide, you will learn the core concepts of tables, rows, keys, and how to choose the right database technology for your project.

---

## 1. Rows, Tables, Primary & Foreign Keys

Relational databases organize data into rigid, grid-like structures called **Tables** (analogous to spreadsheets):

*   **Table:** A collection of related data (e.g. a `Users` table or an `AgentLogs` table).
*   **Row (Record):** A single entry inside a table (e.g., one specific user profile).
*   **Column (Field):** A specific attribute of the data (e.g., `email` or `createdAt`).

### The Keys to Relationships
To connect tables together, we use **Keys**:

*   **Primary Key (PK):** A column that holds a unique identifier for every row in that specific table (typically an auto-incrementing integer or a UUID). No two rows can have the same Primary Key.
*   **Foreign Key (FK):** A column in one table that links to the Primary Key of *another* table. This creates the relationship between the records.

```text
  [ Users Table ]                     [ AgentLogs Table ]
  ┌────────────┬──────────┐           ┌──────────┬─────────────┬──────────┐
  │ id (PK)    │ name     │           │ id (PK)  │ query       │ user_id  │
  ├────────────┼──────────┤           ├──────────┼─────────────┼──────────┤
  │ 1          │ Alice    │ ◄─────────┼──────────┼─────────────┼─ 1 (FK)  │
  └────────────┴──────────┘           └──────────┴─────────────┴──────────┘
```

---

## 2. Postgres vs. SQLite vs. No Database

When building an application, you must decide what type of storage architecture you need:

| Option | What It Is | Best Use Case |
| :--- | :--- | :--- |
| **No Database** | Keeping state in server memory or static JSON files. | Prototyping, static websites, or simple stateless APIs (like our current agent mockup). |
| **SQLite** | A lightweight, file-based database that runs directly inside your application process. | Local testing, mobile apps, or small low-traffic websites. Requires no server configuration. |
| **PostgreSQL** | A powerful, separate relational database server designed to handle high concurrency and large data volumes. | Production web applications, enterprise products, and multi-user environments. |

---

## 💼 Why It Matters in a Real Product

If you build a multi-user dashboard, keeping user logs in server memory (No Database) will fail. Every time your Next.js application redeploys or restarts on Vercel, the server memory is wiped, deleting all logs. 

For production, you need a persistent database like **PostgreSQL** to guarantee that user data and transaction logs are saved securely across server lifecycles.

---

## ⚠️ Common Beginner Mistake: Storing Foreign Keys Without Constraints

Beginners often create a column like `user_id` to link logs to users, but forget to declare it as a formal **Foreign Key Constraint** in the database schema.

```sql
-- INCORRECT: Missing constraint
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  user_id INT -- Just a regular integer column
);
```
*   **Why it's bad:** The database will not enforce referential integrity. You can insert a log with a `user_id` of `999` even if no user with ID `999` exists, resulting in corrupted, orphaned data.
*   **The Fix:** Always declare the foreign key relationship:
```sql
-- CORRECT: Declared constraint
CREATE TABLE logs (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id) ON DELETE CASCADE
);
```

---

## 🧠 Self-Check Recall

1.  What is the difference between a Primary Key and a Foreign Key?
2.  Why is SQLite not recommended for high-traffic websites that run multiple concurrent servers?
3.  What happens to data stored in server memory when a Next.js server restarts?
4.  Write the SQL fragment to declare an ID column as a unique Primary Key.
5.  What does the constraint `ON DELETE CASCADE` do when a parent row is deleted?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **A Primary Key** uniquely identifies a row in its own table. **A Foreign Key** points to a Primary Key in another table to link the records.
2.  **It is file-based.** It locks the database file during writes, which causes latency and write blockages when multiple server processes attempt to write data concurrently.
3.  **It is wiped completely.** Server memory is volatile.
4.  **`id SERIAL PRIMARY KEY`** (or `id UUID PRIMARY KEY`).
5.  **It automatically deletes all child rows** that reference the parent row, preventing orphaned records.
</details>
