# HTML Structure & Semantics: Building the Skeleton

HTML (HyperText Markup Language) is the standard language used to create the structure of web pages. Think of it as the bones of a house; it defines where the walls, doors, and windows go, but doesn't paint them.

---

## 1. Tags, Attributes, & Basic Structure

HTML uses **tags** to label different types of content. A tag is wrapped in angle brackets (`<tagname>`). Most elements have an opening tag and a closing tag with a forward slash (`</tagname>`).

### Attributes
Tags can have **attributes** that provide extra information about the element. Attributes are written as key-value pairs inside the opening tag (e.g. `href` for links or `src` for images).

### Runnable Basic Example:
Save this code in a file called `index.html` and open it in your browser:
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>My First Web Page</title>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p>This is a paragraph of text explaining my project.</p>
  <a href="https://github.com" target="_blank">Visit GitHub</a>
</body>
</html>
```

---

## 2. Semantic Elements: header, nav, main, footer, section

Historically, developers built websites using generic `<div>` tags (short for division) for everything. This is called "div soup" and makes code hard to read for both humans and computers.

Modern HTML uses **Semantic Elements**. Semantic means "relating to meaning". A semantic tag clearly describes its purpose to both the browser and the developer.

*   `<header>`: The introductory section of a page (usually contains the logo and site title).
*   `<nav>`: Defines a block of navigation links.
*   `<main>`: Specifies the unique, primary content of the document (only one per page).
*   `<footer>`: The bottom section of a page (usually contains copyright info and contact links).
*   `<section>`: Groups related content together under a shared heading.

---

## 💼 Why Semantics Matter in a Real Product

Using semantic elements instead of generic `<div>`s matters for two critical reasons:

### A. Accessibility (A11y)
Screen readers (software used by visually impaired users) read web pages aloud. When you use `<nav>`, the screen reader tells the user, *"Entering navigation menu."* If you use a `<div>`, the user has no idea those links form the main menu, rendering the site hard to navigate.

### B. SEO (Search Engine Optimization)
Google's search bots crawl websites to index them. Semantic tags tell Google what parts of your page are important. Text inside `<main>` is indexed as the core content, while headers and footers are deprioritized, helping your page rank higher for relevant search terms.

---

## ⚠️ Common Beginner Mistake: Using `<div>` for Interactive Elements

Beginners often make non-interactive tags like `<div>` clickable using JavaScript, instead of using the native `<button>` or `<a>` tags.

```html
<!-- INCORRECT: Clickable div -->
<div onclick="submitForm()">Submit</div>
```
*   **Why it's bad:** Users who navigate using only a keyboard cannot focus on a `<div>` using the `Tab` key, and screen readers will not declare it as a button, making your form completely inaccessible to disabled users.
*   **The Fix:** Always use the native `<button>` element for actions:
```html
<!-- CORRECT: Accessible button -->
<button onclick="submitForm()">Submit</button>
```

---

## 🧠 Self-Check Recall

1.  What is the difference between an opening tag and a closing tag?
2.  What is the purpose of an attribute in an HTML tag?
3.  Name three semantic elements and explain what content they should contain.
4.  Why is using semantic HTML important for SEO?
5.  What is the accessibility problem with making a `<div>` clickable instead of using a `<button>`?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Opening tags** start an element (e.g. `<p>`), while **closing tags** end the element and include a forward slash (e.g. `</p>`).
2.  **Attributes provide additional configuration** or parameters to the tag, such as target destinations for links (`href`) or source files for images (`src`).
3.  `header` (site branding/logo), `nav` (navigation menus), and `main` (the primary unique content of the page).
4.  **It helps search engine index bots** identify the primary content of the page (`<main>`), helping the page rank higher.
5.  **Keyboard users cannot focus on it** using the Tab key, and screen readers will not declare it as interactive.
</details>
