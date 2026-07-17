# HTML & CSS Practice: 20 Layout MCQs with answer

These questions test your understanding of HTML structure, semantic tags, the CSS box model, Flexbox, Grid, and responsive layout configurations.

---

### Q1. Which of the following is a semantic HTML element?
- [ ] A) `<div>`
- [ ] B) `<span>`
- [ ] C) `<header>`
- [ ] D) `<section-box>`

**Correct Answer:** C
*   **Why it's correct:** `<header>` clearly describes its purpose (containing introductory content or navigation links) to the developer and browser.
*   **Why other options are wrong:** A and B are generic containers without semantic meaning. D is not a standard HTML element.

---

### Q2. If an element has `width: 200px`, `padding: 10px`, `border: 5px solid black`, and `box-sizing: content-box`, what is the total layout width of the box?
- [ ] A) `200px`
- [ ] B) `215px`
- [ ] C) `230px`
- [ ] D) `220px`

**Correct Answer:** C
*   **Why it's correct:** Under `content-box` (the default box model), the padding and border are added to the outside of the width: `200px (width) + 10px * 2 (padding left/right) + 5px * 2 (border left/right) = 230px`.
*   **Why other options are wrong:** A is the width under `border-box`. B and D calculations miss doubling the values for left and right sides.

---

### Q3. How do block-level elements behave differently from inline-level elements?
- [ ] A) Inline elements start on a new line and take up full width.
- [ ] B) Block elements stay on the same line and take only necessary width.
- [ ] C) Block elements start on a new line and take up 100% of the parent width, whereas inline elements remain on the same line.
- [ ] D) Inline elements support width and height properties, block elements do not.

**Correct Answer:** C
*   **Why it's correct:** Block elements (like `<div>`, `<p>`) default to full parent width and force line breaks. Inline elements (like `<span>`, `<a>`) only wrap content.
*   **Why other options are wrong:** A, B, and D reverse the definitions or falsely claim that inline elements support width/height.

---

### Q4. What is the time or scroll behavior of an element styled with `position: fixed`?
- [ ] A) It moves dynamically as you scroll.
- [ ] B) It remains anchored at a fixed position relative to the screen viewport, not moving when the page is scrolled.
- [ ] C) It is positioned relative to its parent container.
- [ ] D) It is hidden from screen readers.

**Correct Answer:** B
*   **Why it's correct:** `fixed` positioning locks the element relative to the screen. It is removed from normal flow, so scrolling the document does not move it.
*   **Why other options are wrong:** A describes relative or static flow. C describes absolute positioning relative to a parent. D is incorrect.

---

### Q5. To position a child element absolutely (`position: absolute`) within its parent, what position value must the parent element have?
- [ ] A) `position: static`
- [ ] B) `position: relative` (or any non-static value)
- [ ] C) `position: absolute` only
- [ ] D) No position value is required.

**Correct Answer:** B
*   **Why it's correct:** Absolute elements locate their coordinates relative to the nearest positioned parent. Setting `position: relative` (or absolute/fixed) on the parent acts as this anchor.
*   **Why other options are wrong:** A is static (default), which does not anchor absolute children. C is not the only option. D causes the child to align with the body viewport.

---

### Q6. Which CSS Flexbox property controls alignment perpendicular to the main layout axis?
- [ ] A) `justify-content`
- [ ] B) `flex-direction`
- [ ] C) `align-items`
- [ ] D) `gap`

**Correct Answer:** C
*   **Why it's correct:** For a row direction, the main axis is horizontal. `align-items` manages vertical centering and alignment.
*   **Why other options are wrong:** A aligns along the main axis. B sets the axis direction. D adds space between elements.

---

### Q7. What does the property `flex-direction: column` do to flex items?
- [ ] A) It aligns them into columns side-by-side.
- [ ] B) It rotates the items 90 degrees.
- [ ] C) It stacks the items vertically, making the main axis vertical instead of horizontal.
- [ ] D) It hides the items.

**Correct Answer:** C
*   **Why it's correct:** `column` changes the main layout flow axis to vertical. Items stack from top to bottom.
*   **Why other options are wrong:** A describes the default `row` flow. B and D are incorrect.

---

### Q8. What does `grid-template-columns: repeat(3, 1fr)` do?
- [ ] A) It creates 3 rows of equal height.
- [ ] B) It repeats 3 items on a loop.
- [ ] C) It creates 3 equal-width columns, each taking one fraction of the remaining grid width.
- [ ] D) It creates 3 columns of 1 pixel width.

**Correct Answer:** C
*   **Why it's correct:** `repeat(3, 1fr)` is a shorthand to define three columns of `1fr` fraction width each.
*   **Why other options are wrong:** A defines rows. B and D are incorrect interpretations of fractions and templates.

---

### Q9. If the root HTML font size is `20px`, what is the pixel equivalent of `1.5rem`?
- [ ] A) `15px`
- [ ] B) `20px`
- [ ] C) `30px`
- [ ] D) `40px`

**Correct Answer:** C
*   **Why it's correct:** `rem` values are direct multipliers of the root HTML element's font size: `20px * 1.5 = 30px`.
*   **Why other options are wrong:** A, B, and D calculations are incorrect.

---

### Q10. What is the main principle behind Mobile-First responsive design?
- [ ] A) You write styles for desktops first, then shrink them for phones.
- [ ] B) You write base CSS styles for mobile viewports, and use `min-width` media queries to add layouts for larger screens.
- [ ] C) You disable desktop views entirely.
- [ ] D) You build the site using only JavaScript.

**Correct Answer:** B
*   **Why it's correct:** Mobile-First builds the lightest layout first (single-column mobile views) and adds columns and complexities as screen real estate increases (`min-width`).
*   **Why other options are wrong:** A describes desktop-first design. C and D are incorrect.

---

### Q11. Why is the viewport meta tag `<meta name="viewport" content="width=device-width, initial-scale=1.0">` required in HTML?
- [ ] A) To connect the page to Vercel.
- [ ] B) To tell mobile browsers to render the page at its actual width instead of shrinking a desktop-sized page to fit the screen.
- [ ] C) To load the CSS stylesheets faster.
- [ ] D) To check if the page has search results.

**Correct Answer:** B
*   **Why it's correct:** Without it, mobile browsers render pages at a virtual desktop size (~980px) and scale it down, rendering elements tiny and ignoring media queries.
*   **Why other options are wrong:** A, C, and D describe deployment, caching, or data tasks that meta viewport does not manage.

---

### Q12. What is the semantic HTML element used to wrap a website's primary navigation menu?
- [ ] A) `<navigation>`
- [ ] B) `<menu-links>`
- [ ] C) `<nav>`
- [ ] D) `<link-wrapper>`

**Correct Answer:** C
*   **Why it's correct:** `<nav>` is the official HTML5 semantic element designed to hold site navigation menus and blocks of links.
*   **Why other options are wrong:** A, B, and D are non-standard tags.

---

### Q13. What is the difference between `margin` and `padding`?
- [ ] A) Margin is inside the border; padding is outside.
- [ ] B) Padding is inside the border; margin is outside the border.
- [ ] C) They do the same thing and can be used interchangeably.
- [ ] D) Margin is only for text elements; padding is only for boxes.

**Correct Answer:** B
*   **Why it's correct:** Padding creates spacing between the content and the border (inside). Margin creates spacing between the border and adjacent elements (outside).
*   **Why other options are wrong:** A is the opposite layout. C is incorrect since they affect different layers. D is incorrect.

---

### Q14. What does the viewport unit `50vw` represent?
- [ ] A) 50% of the parent container's width.
- [ ] B) 50% of the screen's viewport width.
- [ ] C) 50 pixels.
- [ ] D) 50% of the parent font size.

**Correct Answer:** B
*   **Why it's correct:** `vw` stands for viewport width. `50vw` translates to exactly 50% of the screen's width, scaling as the window is resized.
*   **Why other options are wrong:** A describes `%`. C describes `px`. D describes `em`.

---

### Q15. Which CSS selector has the highest styling precedence?
- [ ] A) Class selector (`.card`)
- [ ] B) Element selector (`div`)
- [ ] C) ID selector (`#header`)
- [ ] D) Wildcard selector (`*`)

**Correct Answer:** C
*   **Why it's correct:** Precedence (specificity) rules rank: Inline styles > ID selectors > Class selectors > Element selectors.
*   **Why other options are wrong:** Wildcard, elements, and class selectors have lower specificity scores than ID selectors.

---

### Q16. What is the semantic HTML element meant to group related content under a shared heading?
- [ ] A) `<aside>`
- [ ] B) `<section>`
- [ ] C) `<div>`
- [ ] D) `<article>`

**Correct Answer:** B
*   **Why it's correct:** `<section>` groups related thematic content, typically containing a heading, while `<article>` is for self-contained syndicatable items (like blog posts).
*   **Why other options are wrong:** A is for secondary sidebar content. C is non-semantic. D is for self-contained independent items.

---

### Q17. If you apply `display: inline-block` to an element, how does it behave?
- [ ] A) It is hidden from layout view.
- [ ] B) It flows inline with text, but allows setting custom width, height, margins, and padding.
- [ ] C) It takes up full parent width and starts on a new line.
- [ ] D) It behaves like a flex container.

**Correct Answer:** B
*   **Why it's correct:** `inline-block` combines behaviors: it sits on the same line alongside text (inline) but accepts box model sizing parameters (block).
*   **Why other options are wrong:** A describes `display: none`. C describes block display. D describes `display: flex`.

---

### Q18. Why is it recommended to use `rem` instead of `px` for font-sizes on production websites?
- [ ] A) It makes the browser load font files faster.
- [ ] B) It allows font-sizes to scale dynamically relative to user browser preference settings, improving accessibility.
- [ ] C) It is required to render non-standard fonts.
- [ ] D) It automatically centers the text.

**Correct Answer:** B
*   **Why it's correct:** If a visually impaired user increases their default browser font size, relative units like `rem` scale up accordingly. Hardcoded `px` sizes ignore user preferences.
*   **Why other options are wrong:** A, C, and D are incorrect.

---

### Q19. What is the role of the `alt` attribute on an `<img>` tag?
- [ ] A) It adds a border to the image.
- [ ] B) It provides alternative text that screen readers read aloud to visually impaired users, and displays if the image fails to load.
- [ ] C) It links the image to a URL.
- [ ] D) It changes the image color.

**Correct Answer:** B
*   **Why it's correct:** `alt` is a critical accessibility attribute providing descriptive text of the image content for screen readers or broken links.
*   **Why other options are wrong:** A, C, and D describe borders, links (`<a>`), and styling tasks that `alt` does not handle.

---

### Q20. What is the time complexity of looking up an element using `document.getElementById()` in the browser DOM?
- [ ] A) $O(1)$
- [ ] B) $O(n)$
- [ ] C) $O(n^2)$
- [ ] D) $O(\log n)$

**Correct Answer:** A
*   **Why it's correct:** Browsers maintain an internal hash map registry of element IDs, allowing `document.getElementById` to fetch the element reference in $O(1)$ constant time.
*   **Why other options are wrong:** B and C are wrong because the browser does not need to perform a full linear scan of the entire page tree.
