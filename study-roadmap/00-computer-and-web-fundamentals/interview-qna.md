# Interview Questions & Answers: Fundamentals

Here are 8 common interview questions covering web fundamentals, HTTP, terminal usage, and Git version control, along with sample answers designed to sound natural and technical.

---

### Q1. Can you explain what happens when you type a URL (like `https://google.com`) into your browser and press Enter?
**Answer:**
When you type a URL and hit Enter, the following steps occur:
1.  **DNS Lookup:** The browser needs to find where the website is located. It contacts a Domain Name System (DNS) server to translate the human-readable domain name (`google.com`) into a numerical IP address (like `172.217.7.14`).
2.  **Establish Connection:** The browser opens a network connection to that IP address.
3.  **Send Request:** The browser sends an HTTP `GET` request to the server, asking for the webpage's files.
4.  **Server Response:** The server processes the request and sends back a response, which includes headers (metadata) and a body containing the website's HTML, CSS, and JavaScript files.
5.  **Page Rendering:** The browser reassembles the received packets, parses the code, and draws the visual website on your screen.

---

### Q2. What is the difference between a Client and a Server?
**Answer:**
*   **Client:** The client is the consumer of information. It is the device or application—such as a laptop, smartphone, or web browser like Chrome—that sends requests to get data or perform actions.
*   **Server:** The server is the provider of information. It is a computer (usually running 24/7 in a data center) that listens for requests from clients, processes those requests, and returns the requested data (like webpages or databases).

---

### Q3. What are the main HTTP methods and what do they represent?
**Answer:**
HTTP methods represent the type of action you want to perform on a server, mapping directly to **CRUD** (Create, Read, Update, Delete) operations:
*   **`GET` (Read):** Requests data from the server. (Has no request body).
*   **`POST` (Create):** Sends new data to the server to create a resource (e.g. creating a user account). Data goes inside the request body.
*   **`PUT` / `PATCH` (Update):** Updates an existing resource with new data.
*   **`DELETE` (Delete):** Removes a resource from the server.

---

### Q4. What is the difference between HTTP status code `401 Unauthorized` and `403 Forbidden`?
**Answer:**
*   **`401 Unauthorized`** means the server does not know who you are. You have not logged in or provided valid credentials, so access is denied. Think of this as not having a ticket to get into a concert.
*   **`403 Forbidden`** means the server *does* know who you are, but you do not have permission to view that resource. Think of this as having a general admission ticket to the concert, but trying to walk into the VIP dressing room.

---

### Q5. What is the difference between Git and GitHub?
**Answer:**
*   **Git** is a local software tool installed on your computer. It tracks version history and changes in your files locally without needing the internet.
*   **GitHub** is an online, cloud-based platform that hosts Git repositories. It allows you to upload your local Git history to the cloud so you can back up your work, share it with others, and collaborate on team projects.

---

### Q6. Explain the difference between `git add` and `git commit`.
**Answer:**
*   `git add` moves your modified files into the **Staging Area**. This is like selecting which changes you want to include in your next save state. You are preparing them.
*   `git commit` takes all those staged changes and saves them permanently as a snapshot in your repository's history. It is the actual "save" button, and it requires a message describing what was done.

---

### Q7. Why does Git have a Staging Area? Why not just commit files directly?
**Answer:**
The Staging Area gives developers fine-grained control over their commits. 

If you are working on a feature and edit three different files, but one file is a half-finished experiment, you don't want to save everything together. Using `git add`, you can select only the two working files to commit first, leaving the third file untracked or staged later. It keeps your repository history clean and focused on one logical change at a time.

---

### Q8. How do you perform these actions in the terminal: navigate to the parent folder, view its contents, and create a new directory named `assets`?
**Answer:**
You would run the following commands sequentially:
1.  Navigate to the parent folder: `cd ..`
2.  List the contents: `ls` (or `dir` on Windows Command Prompt)
3.  Create the directory: `mkdir assets`
