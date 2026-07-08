# HTTP Basics: Methods, Status Codes, Headers & Body

In the previous guide, we learned that the internet is built on **requests** and **responses**. But how do computers write these requests? They use a language called **HTTP** (Hypertext Transfer Protocol).

Think of HTTP as a formal template for ordering items. Just like a business invoice has standard fields (Date, To, Description, Total), HTTP requests and responses have standard parts so any computer in the world can understand them.

---

## 📬 The Anatomy of HTTP Requests & Responses

Every HTTP message (both requests from the client and responses from the server) is split into two main sections: **Headers** and the **Body**.

Imagine you are mailing a package:
*   **The Headers (The Box Exterior):** This contains metadata (information *about* the message). It includes the shipping address, the sender's return address, the weight of the box, and the type of contents.
*   **The Body (Inside the Box):** This is the actual content you are sending. If you are mailing a book, the book itself is the body. If you are sending a letter, the text of the letter is the body.

### In web development:
*   **Request Headers** tell the server what browser you are using, what kind of files you can receive, and passwords/tokens if you are logged in.
*   **Request Body** contains data you want to send to the server (like typing your username and password into a login form).
*   **Response Headers** tell the browser what type of file is being returned (e.g., an image or HTML page), how large it is, and security rules.
*   **Response Body** is the actual webpage content, file, or image that gets displayed on your screen.

---

## 🛠️ HTTP Methods (What do you want to do?)

When you make a request, you must specify an **HTTP Method** (also called a "Verb") to tell the server what action you want to take. The four most common methods are:

1.  **`GET` (Read):** *"Hey server, please get this information for me."* (e.g., loading a webpage, searching for a product). `GET` requests never have a body because you aren't sending data to be saved; you're just requesting data.
2.  **`POST` (Create):** *"Hey server, take this new data and save it."* (e.g., signing up for a new account, posting a tweet). The data you want to save goes inside the **Request Body**.
3.  **`PUT` / `PATCH` (Update):** *"Hey server, update this existing info with this new data."* (e.g., editing your profile picture or changing your password).
4.  **`DELETE` (Remove):** *"Hey server, delete this item."* (e.g., deleting a post or canceling an order).

---

## 🚦 HTTP Status Codes (How did it go?)

When a server sends a response, it includes a three-digit number called a **Status Code**. This code tells the client immediately if the request was successful, if there was an error, or if something else happened.

Status codes are grouped by their first digit:

*   **`2xx` - Success (Everything is fine):**
    *   `200 OK`: The request was successful, and the server returned what you asked for.
    *   `201 Created`: The server successfully saved new data (usually after a `POST` request).
*   **`3xx` - Redirection (Go somewhere else):**
    *   `301 Moved Permanently`: The webpage has moved to a new address, and your browser is sent there automatically.
*   **`4xx` - Client Error (You did something wrong):**
    *   `400 Bad Request`: The server didn't understand your request because it was malformed.
    *   `401 Unauthorized`: You need to log in first.
    *   `403 Forbidden`: You are logged in, but you don't have permission to view this page.
    *   `404 Not Found`: The webpage or file does not exist.
*   **`5xx` - Server Error (The server crashed):**
    *   `500 Internal Server Error`: The server encountered a bug in its code and crashed.
    *   `503 Service Unavailable`: The server is overloaded or down for maintenance.

---

## 📝 A Real-World Example

Here is a raw look at an HTTP exchange when you log in to an app:

### 1. The Client's Request (`POST`)
```http
POST /login HTTP/1.1
Host: example.com
Content-Type: application/json             <-- Header telling the server we are sending JSON text
Content-Length: 45                         <-- Header showing how big the body is

{
  "email": "user@email.com",               <-- Body containing the user login details
  "password": "secretpassword123"
}
```

### 2. The Server's Response (`200 OK`)
```http
HTTP/1.1 200 OK                            <-- Status code: Success!
Content-Type: text/html; charset=UTF-8     <-- Header telling the client we are returning HTML code
Content-Length: 125                        <-- Header showing how big the response body is

<!DOCTYPE html>                            <-- Body containing the actual webpage to draw
<html>
  <body>Welcome back, User!</body>
</html>
```
