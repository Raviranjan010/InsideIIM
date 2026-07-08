# Database Practice: 15 Conceptual MCQs

These questions test your understanding of relational database design, basic SQL operations, and architectural decisions (PostgreSQL vs. SQLite vs. No-DB).

---

### Q1. What is the primary purpose of a Foreign Key in a relational database?
- [ ] A) To encrypt the database file.
- [ ] B) To uniquely identify a row in its own table.
- [ ] C) To create a relationship link between two tables by pointing to the Primary Key of another table.
- [ ] D) To speed up string lookups.

**Correct Answer:** C
*   **Why it's correct:** A Foreign Key is a constraint that establishes and enforces a link between the data in two tables, ensuring referential integrity.
*   **Why other options are wrong:** A describes security encryption. B describes a Primary Key. D describes index creation.

---

### Q2. Under what condition is SQLite an appropriate choice for a web application database?
- [ ] A) High write traffic with thousands of concurrent users.
- [ ] B) Multi-server deployments where instances scale horizontally.
- [ ] C) Lightweight, single-process apps or local development setups where simple file storage is sufficient.
- [ ] D) High-security enterprise transactions.

**Correct Answer:** C
*   **Why it's correct:** SQLite is a self-contained, file-based database that requires zero configuration, making it excellent for local testing and small single-server tools.
*   **Why other options are wrong:** A and B are poor use cases because SQLite locks the database file during writes, stalling concurrent access. D is handled better by enterprise engines like PostgreSQL.

---

### Q3. What is the time complexity of looking up a row in a table using an indexed Primary Key?
- [ ] A) $O(n)$
- [ ] B) $O(1)$ on average, or $O(\log n)$ for tree indexes
- [ ] C) $O(n^2)$
- [ ] D) $O(2^n)$

**Correct Answer:** B
*   **Why it's correct:** Relational databases index Primary Keys (typically using B-Trees or Hash indexes), allowing searches to skip scanning and jump straight to the data in $O(1)$ or $O(\log n)$ steps.
*   **Why other options are wrong:** A describes an unindexed full table scan. C and D are polynomial or exponential operations.

---

### Q4. Which SQL keyword is used to filter results returned by a `SELECT` statement?
- [ ] A) `ORDER BY`
- [ ] B) `JOIN`
- [ ] C) `WHERE`
- [ ] D) `GROUP BY`

**Correct Answer:** C
*   **Why it's correct:** The `WHERE` clause defines logical conditions (like `user_id = 1`) that rows must satisfy to be included in the query results.
*   **Why other options are wrong:** A sorts results. B merges tables. D aggregates rows.

---

### Q5. What does an `INNER JOIN` query accomplish?
- [ ] A) It deletes matching rows from both tables.
- [ ] B) It combines and returns rows from both tables only where the join condition matches.
- [ ] C) It merges all rows regardless of whether they have a matching key.
- [ ] D) It copies the schema structure to another database.

**Correct Answer:** B
*   **Why it's correct:** An `INNER JOIN` evaluates the join condition (e.g. `logs.user_id = users.id`) and returns rows where a match exists in both tables.
*   **Why other options are wrong:** A is a delete operation. C describes an Outer Join. D describes schema replication.

---

### Q6. If you omit the join condition (e.g. `ON logs.user_id = users.id`) in a SQL `JOIN` query, what is the result?
- [ ] A) The query fails with a syntax error.
- [ ] B) The database returns a Cartesian Product (combining every row of Table A with every row of Table B).
- [ ] C) It only returns the first row.
- [ ] D) It returns an empty list.

**Correct Answer:** B
*   **Why it's correct:** Omitting the join condition causes a Cross Join (Cartesian Product), where the database multiplies every row of the first table by the second table, resulting in $m \times n$ records.
*   **Why other options are wrong:** A is incorrect because the query is still valid syntax. C and D do not represent default multiplier behavior.

---

### Q7. What database design constraint prevents child rows from pointing to a non-existent parent ID?
- [ ] A) Primary Key Constraint
- [ ] B) Unique Constraint
- [ ] C) Foreign Key Constraint
- [ ] D) Null Check Constraint

**Correct Answer:** C
*   **Why it's correct:** A Foreign Key constraint enforces referential integrity, blocking insertions if the referenced parent record does not exist.
*   **Why other options are wrong:** A enforces unique identification inside the table. B prevents duplicate values. D enforces presence checks.

---

### Q8. In PostgreSQL, what is the advantage of using the `JSONB` data type instead of a standard `TEXT` column to store JSON payloads?
- [ ] A) It automatically compresses the text.
- [ ] B) It converts JSON to SQL tables.
- [ ] C) It parses the JSON, supports indexing on keys, and allows querying nested properties directly inside SQL.
- [ ] D) It makes the API call cheaper.

**Correct Answer:** C
*   **Why it's correct:** `JSONB` stores JSON in a decomposed binary format, allowing PostgreSQL to index and search nested keys (e.g. `data->>'peRatio'`) without full table parsing.
*   **Why other options are wrong:** A is incorrect. B describes table parsing. D is wrong since database column types do not affect external API billing.

---

### Q9. What does the term "Referential Integrity" mean?
- [ ] A) Encrypting references.
- [ ] B) Ensuring that relationships between tables remain consistent and that foreign keys always point to valid, existing primary keys.
- [ ] C) Referencing the code files in Git.
- [ ] D) Speeding up database caching.

**Correct Answer:** B
*   **Why it's correct:** Referential integrity is the relational constraint that prevents orphan records and broken links, ensuring every foreign key references a real parent.
*   **Why other options are wrong:** A, C, and D describe security, version control, or caching processes.

---

### Q10. What does the instruction `ON DELETE CASCADE` do to linked child rows?
- [ ] A) It blocks the deletion of the parent row.
- [ ] B) It automatically deletes any child rows that reference a parent row when that parent row is deleted.
- [ ] C) It sets the child foreign key values to NULL.
- [ ] D) It throws a warning.

**Correct Answer:** B
*   **Why it's correct:** `CASCADE` tells the database to automatically propagate deletions downward, clean-deleting child rows to prevent orphaned rows.
*   **Why other options are wrong:** A describes `RESTRICT` behavior. C describes `SET NULL` behavior. D is incorrect.

---

### Q11. Why is database-level caching (like a `research_cache` table) useful in RAG pipelines?
- [ ] A) It makes the database run faster.
- [ ] B) It stores user emails.
- [ ] C) It prevents redundant, expensive calls to external web search and LLM APIs by serving recently fetched data locally.
- [ ] D) It encrypts the user's queries.

**Correct Answer:** C
*   **Why it's correct:** Caching stores search results locally. Checking the database first saves API token costs and returns data to the user instantly.
*   **Why other options are wrong:** A, B, and D are incorrect descriptions of caching purposes.

---

### Q12. In database normalization, what does "one-to-many" represent?
- [ ] A) One column having many data types.
- [ ] B) One record in Table A being associated with multiple records in Table B (e.g. one user having many search logs).
- [ ] C) One database having many users.
- [ ] D) Replicating one table on many servers.

**Correct Answer:** B
*   **Why it's correct:** One-to-many is a standard relationship cardinality where a single row in the parent table connects to multiple child rows (e.g. one chat thread having many messages).
*   **Why other options are wrong:** A, C, and D are incorrect interpretations.

---

### Q13. If you run a query using `SELECT * FROM logs` on a table with 10 million rows, what is the main performance risk?
- [ ] A) The database will delete the records.
- [ ] B) High memory and network overhead caused by loading and transferring 10 million records into application memory at once.
- [ ] C) The query will throw a SyntaxError.
- [ ] D) It will change the primary keys.

**Correct Answer:** B
*   **Why it's correct:** Fetching millions of records without limits will swamp server memory, spike network bandwidth, and likely cause the server to crash.
*   **Why other options are wrong:** A, C, and D are incorrect database actions.

---

### Q14. What SQL clause is used to prevent the memory risk of retrieving too many rows?
- [ ] A) `WHERE`
- [ ] B) `JOIN`
- [ ] C) `LIMIT`
- [ ] D) `ORDER BY`

**Correct Answer:** C
*   **Why it's correct:** `LIMIT` caps the maximum number of rows returned by the query (e.g., `LIMIT 50`), protecting memory.
*   **Why other options are wrong:** A filters. B joins. D sorts.

---

### Q15. Why should database connection credentials (like connection URLs) never be committed to your repository?
- [ ] A) Because they exceed character limits.
- [ ] B) Because committing them exposes your database to the public, allowing anyone to modify, steal, or delete your entire database.
- [ ] C) Because Git cannot track database connection strings.
- [ ] D) Because Vercel forbids committing them.

**Correct Answer:** B
*   **Why it's correct:** Connection URLs contain master passwords. Committing them allows attackers to access and erase your production databases.
*   **Why other options are wrong:** A and C are false claims. D is wrong since Vercel does not block commits directly; it expects you to use dashboard environment variables instead.
