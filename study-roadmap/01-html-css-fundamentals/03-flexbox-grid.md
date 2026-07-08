# Flexbox & Grid: Modern Layout Engines

CSS Flexbox and CSS Grid are the two layout engines used to align elements on modern web pages. 

*   **Flexbox (One-Dimensional):** Designed to align elements in a single row or single column. Ideal for navbars, toolbars, or small component spacing.
*   **Grid (Two-Dimensional):** Designed to build complete layouts with rows *and* columns. Ideal for page layouts, galleries, or product card grids.

---

## 1. Flexbox Basics: Aligning in One Direction

To turn a container into a Flexbox, we set `display: flex`. The elements inside become flex items.

### Key Properties:
*   **`flex-direction`:** Chooses the direction. `row` (default) places items side-by-side; `column` stacks them vertically.
*   **`justify-content`:** Aligns items along the main direction (e.g. `space-between` pushes elements to the edges, `center` groups them in the middle).
*   **`align-items`:** Aligns items perpendicular to the main direction (e.g. centering them vertically in a row).

### Runnable Navbar Example (Flexbox):
Save this as `navbar.html` and open it:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .navbar {
      display: flex;
      justify-content: space-between; /* Space out branding and links */
      align-items: center; /* Center items vertically */
      padding: 15px 30px;
      background-color: #333;
      color: white;
    }
    .nav-links {
      display: flex;
      gap: 15px; /* Adds space between flex items */
      list-style: none;
      margin: 0;
      padding: 0;
    }
    .nav-links a { color: white; text-decoration: none; }
  </style>
</head>
<body>
  <nav class="navbar">
    <div class="logo">Investment Agent</div>
    <ul class="nav-links">
      <li><a href="#">Dashboard</a></li>
      <li><a href="#">Search</a></li>
      <li><a href="#">Logout</a></li>
    </ul>
  </nav>
</body>
</html>
```

---

## 2. Grid Basics: Rows and Columns

To create a Grid, we set `display: grid`. We define columns using `grid-template-columns`.

*   **`grid-template-columns: repeat(3, 1fr);`** Creates three columns of equal width (`1fr` stands for 1 fraction of the available space).
*   **`gap`:** Adds grid gutters (gutters between cards).

### Runnable Card Grid Example (Grid):
Save this as `grid.html` and open it:
```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .grid-container {
      display: grid;
      grid-template-columns: repeat(3, 1fr); /* 3 equal columns */
      gap: 20px;
      padding: 20px;
    }
    .card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background-color: #fafafa;
    }
  </style>
</head>
<body>
  <div class="grid-container">
    <div class="card">Stock A: $200</div>
    <div class="card">Stock B: $450</div>
    <div class="card">Stock C: $120</div>
  </div>
</body>
</html>
```

---

## 💼 Why It Matters in a Real Product

Using Flexbox and Grid makes your app responsive and clean. If you use older positioning hacks (like float-based layouts or absolute offsets), minor changes to card sizes will break layout structures, pushing elements out of place. Flexbox and Grid calculate sizing automatically.

---

## ⚠️ Common Beginner Mistake: Using Absolute Positions for Grid Items

Beginners often use `position: absolute` on cards inside a Grid container to space them out.

```css
/* INCORRECT: Positioning grid items manually */
.grid-container { display: grid; }
.card {
  position: absolute;
  left: 20px; /* OOPS: Bypasses the Grid engine! */
}
```
*   **Why it's bad:** Setting absolute position removes the item from the normal layout flow, rendering it on top of other elements and breaking the Grid column layout.
*   **The Fix:** Trust the Grid engine. Do not set absolute positions on grid children. Use `gap` on the container to space them out.

---

## 🧠 Self-Check Recall

1.  When should you choose Flexbox over Grid?
2.  What property alignment controls vertical centering of items inside a horizontal Flexbox?
3.  What does `1fr` mean in CSS Grid?
4.  Write the CSS rule to create a grid with 4 equal-width columns.
5.  What is the purpose of the `gap` property?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Flexbox** is best for one-dimensional layouts (a single row or column, like a navbar). **Grid** is best for two-dimensional layouts (rows and columns, like a card grid).
2.  **`align-items: center;`**
3.  **One fraction** of the remaining free space in the grid container.
4.  **`grid-template-columns: repeat(4, 1fr);`**
5.  **It defines the space (gutter)** between items in a Flexbox or Grid layout.
</details>
