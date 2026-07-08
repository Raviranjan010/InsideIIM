# HTML & CSS Interview Q&A: 10 Core Layout Questions

This guide contains 10 key interview questions and answers covering HTML structure, semantics, the CSS box model, positioning, Flexbox, Grid, and responsive web design.

---

### Q1. What is semantic HTML, and why is it important for accessibility and SEO?
**Answer:**
Semantic HTML uses tags that carry meaning about their content (like `<nav>`, `<main>`, `<article>`, and `<footer>`) rather than generic containers like `<div>` or `<span>`. 

It is important for **accessibility** because screen readers read these tags aloud, letting visually impaired users know when they are entering navigation menus or reading primary content. It is important for **SEO** because search engines use these tags to identify the core topics on your page, helping your site rank higher for relevant search terms.

---

### Q2. Explain the CSS Box Model. How does `box-sizing: border-box` modify it?
**Answer:**
The Box Model views every HTML element as a rectangular box consisting of four layers from the inside out: **Content**, **Padding**, **Border**, and **Margin**. 

By default (`box-sizing: content-box`), when you set an element's width, the padding and border are added to the outside, increasing its total footprint. Setting `box-sizing: border-box` forces the browser to incorporate the padding and border **inside** the declared width, preventing elements from expanding unexpectedly and breaking grid alignments.

---

### Q3. What is the difference between block, inline, and inline-block display modes?
**Answer:**
*   **Block elements** (like `<div>` and `<p>`) start on a new line, take up 100% of the parent width by default, and accept height and width settings.
*   **Inline elements** (like `<span>` and `<a>`) stay on the same line, take up only their content width, and ignore custom height and width settings.
*   **Inline-block elements** stay on the same line alongside text but allow custom height, width, padding, and margins.

---

### Q4. Explain the difference between static, relative, absolute, and fixed positioning.
**Answer:**
*   **`static`** is the default positioning where elements follow the normal document layout flow.
*   **`relative`** keeps the element in the normal flow but allows offsets relative to its default location; it also serves as an anchor for absolute children.
*   **`absolute`** removes the element from the normal layout flow, positioning it relative to the nearest positioned parent container.
*   **`fixed`** removes the element from the layout flow and anchors it relative to the screen viewport, keeping it visible in the same spot during scrolling.

---

### Q5. Contrast Flexbox and Grid. When would you use one over the other?
**Answer:**
Flexbox is a **one-dimensional** layout engine designed to align elements in a single row or column. It is ideal for small component layouts like a navbar list or card header items. 

CSS Grid is a **two-dimensional** layout engine that aligns items across both rows and columns simultaneously. It is ideal for complete page layouts, product image galleries, or card dashboards.

---

### Q6. What is the difference between `justify-content` and `align-items` in Flexbox?
**Answer:**
*   **`justify-content`** aligns flex items along the **main axis** (e.g. horizontal spacing for default row direction).
*   **`align-items`** aligns flex items along the **cross axis** (e.g. vertical alignment for row direction).

Changing `flex-direction: column` swaps these axes, making `justify-content` manage vertical alignment and `align-items` manage horizontal alignment.

---

### Q7. Explain Mobile-First design. How do you implement it using media queries?
**Answer:**
Mobile-First design is a development strategy where you write CSS styles for mobile devices by default, and then layer on layouts for larger screens as the viewport expands. 

It is implemented using **`min-width` media queries**, which only apply their enclosed styling blocks if the screen is wider than the specified breakpoint:
```css
/* Mobile styles first */
.grid { grid-template-columns: 1fr; }

/* Desktop expansion */
@media (min-width: 768px) {
  .grid { grid-template-columns: repeat(3, 1fr); }
}
```

---

### Q8. What is the difference between `px`, `em`, and `rem` units?
**Answer:**
*   **`px` (Pixels)** is a static, fixed unit that does not scale.
*   **`rem`** is a relative unit calculated based on the font size of the **root `<html>` element** (usually `16px`).
*   **`em`** is a relative unit calculated based on the font size of the **immediate parent container**.

`rem` is preferred for accessibility because it scales automatically if a user increases their browser's default font size.

---

### Q9. Why is the viewport meta tag necessary for responsive design?
**Answer:**
Mobile devices have high pixel densities. Without the viewport meta tag (`<meta name="viewport" content="width=device-width, initial-scale=1.0">`), mobile browsers render web pages at a virtual desktop width (usually 980px) and scale it down to fit. 

This causes fonts to appear tiny and renders media queries useless. The viewport tag instructs the browser to set the page width to match the physical width of the device, enabling media queries to function correctly.

---

### Q10. What is a "div soup" and how do you resolve it?
**Answer:**
"Div soup" describes a poorly structured HTML document that uses generic `<div>` tags for every structural container (menus, articles, sidebars, footers). 

It is resolved by replacing these generic division tags with semantic HTML5 elements:
*   Use `<nav>` for menus.
*   Use `<header>` for branding.
*   Use `<main>` for primary unique content.
*   Use `<article>` or `<section>` for content blocks.
*   Use `<footer>` for footer notes.
