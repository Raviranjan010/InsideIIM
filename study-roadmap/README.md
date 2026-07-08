# 📚 Full-Stack & GenAI Study Roadmap

Welcome to your study roadmap! This repository acts as a progress tracker, index, and workspace for mastering web development, backend architectures, and LLM/GenAI applications.

---

## 🎯 Master Progress Tracker

Use the checkboxes below to track which modules are scheduled for **This Week** (based on 🔴 markers) vs. **Later** (based on 🔵 markers), and your execution progress.

| Module | Description | This Week | Later | Progress |
| :--- | :--- | :---: | :---: | :---: |
| **[00-computer-and-web-fundamentals](./00-computer-and-web-fundamentals/)** | Essential internet architectures, client-server models, HTTP, and shell tools. | `[x]` | `[ ]` | `[x] Completed` |
| **[01-html-css-fundamentals](./01-html-css-fundamentals/)** | Semantics, Box Model, Flexbox/Grid, and responsive layout foundations. | `[ ]` | `[x]` | `[ ] Not Started` |
| **[02-javascript](./02-javascript/)** | Core syntax, scope, closures, array methods, async event loop, and classes. | `[x]` (Core) | `[x]` (Deep) | `[ ] In Progress` |
| **[03-typescript](./03-typescript/)** | Typing essentials, interfaces, generics, and utility types. | `[x]` (Basics) | `[x]` (Full) | `[ ] In Progress` |
| **[04-react](./04-react/)** | Components, hooks, state patterns, controlled forms, and rendering cycles. | `[ ]` | `[x]` | `[ ] Not Started` |
| **[05-nextjs](./05-nextjs/)** | App Router, Route Handlers, Server/Client components, and Data Fetching. | `[x]` (Routing/API) | `[x]` (Rest) | `[ ] In Progress` |
| **[06-nodejs-backend](./06-nodejs-backend/)** | Request-response cycle, calling external APIs, error handling, and environment config. | `[x]` | `[ ]` | `[x] Completed` |
| **[07-llm-genai-fundamentals](./07-llm-genai-fundamentals/)** | Basic LLM concepts, structured outputs, prompt styles, tool calling, and RAG. | `[x]` | `[ ]` | `[x] Completed` |
| **[08-langchain-langgraph](./08-langchain-langgraph/)** | Chains vs Agents, StateGraph, edges, conditional routing, and tool binding. | `[x]` | `[ ]` | `[x] Completed` |
| **[09-dsa](./09-dsa/)** | Lightweight ongoing practice: arrays, strings, maps, recursion, and complexity. | `[x]` | `[ ]` | `[x] Completed` |
| **[10-databases](./10-databases/)** | Relational database basics, SQL fundamentals, and architectural decisions. | `[ ]` | `[x]` | `[ ] Not Started` |
| **[11-git-github-deployment](./11-git-github-deployment/)** | Workflows, committing, branching, PRs, and deploying to Vercel. | `[x]` | `[ ]` | `[ ] Not Started` |
| **[12-system-design-thinking](./12-system-design-thinking/)** | Rate limits, cost control, caching, and evaluating agent system quality. | `[ ]` | `[x]` | `[ ] Not Started` |
| **[13-ai-product-thinking](./13-ai-product-thinking/)** | Understanding AI product cycles and thinking through user-facing AI features. | `[ ]` | `[x]` | `[ ] Not Started` |
| **[14-resume-and-behavioral-prep](./14-resume-and-behavioral-prep/)** | Crafting project walk-throughs, behaviorals, and STAR structure drafts. | `[x]` | `[ ]` | `[ ] Not Started` |
| **[15-mock-interview-bank](./15-mock-interview-bank/)** | Common technical questions, deep dives, and curveballs for live practice. | `[x]` | `[ ]` | `[ ] Not Started` |
| **[16-project-defense](./16-project-defense/)** | Self-written assignment defense and technical choice explanations. | `[x]` | `[ ]` | `[ ] Not Started` |

---

## 🗂️ Detailed Syllabus & Checklists

### 🔴 [Module 00: Computer & Web Fundamentals](./00-computer-and-web-fundamentals/) (This Week)
- [x] [01-how-the-internet-works.md](./00-computer-and-web-fundamentals/01-how-the-internet-works.md)
- [x] [02-client-server-http.md](./00-computer-and-web-fundamentals/02-client-server-http.md)
- [x] [03-terminal-basics.md](./00-computer-and-web-fundamentals/03-terminal-basics.md)
- [x] [04-git-github-basics.md](./00-computer-and-web-fundamentals/04-git-github-basics.md)
- [x] [mcqs.md](./00-computer-and-web-fundamentals/mcqs.md)
- [x] [interview-qna.md](./00-computer-and-web-fundamentals/interview-qna.md)

### 🔵 [Module 01: HTML & CSS Fundamentals](./01-html-css-fundamentals/) (Later)
- [ ] [01-html-structure-semantics.md](./01-html-css-fundamentals/01-html-structure-semantics.md)
- [ ] [02-css-box-model-layout.md](./01-html-css-fundamentals/02-css-box-model-layout.md)
- [ ] [03-flexbox-grid.md](./01-html-css-fundamentals/03-flexbox-grid.md)
- [ ] [04-responsive-design.md](./01-html-css-fundamentals/04-responsive-design.md)
- [ ] [mcqs.md](./01-html-css-fundamentals/mcqs.md)
- [ ] [interview-qna.md](./01-html-css-fundamentals/interview-qna.md)

### 🔴🔵 [Module 02: JavaScript](./02-javascript/) (Mixed)
- **🔴 Core (This Week)**
  - [x] [01-syntax-variables-scope.md](./02-javascript/01-syntax-variables-scope.md)
  - [ ] [02-functions-this-closures.md](./02-javascript/02-functions-this-closures.md)
  - [ ] [03-objects-arrays-destructuring.md](./02-javascript/03-objects-arrays-destructuring.md)
  - [ ] [04-array-methods.md](./02-javascript/04-array-methods.md)
  - [ ] [05-async-promises-event-loop.md](./02-javascript/05-async-promises-event-loop.md)
  - [ ] [06-error-handling.md](./02-javascript/06-error-handling.md)
  - [ ] [07-modules-import-export.md](./02-javascript/07-modules-import-export.md)
  - [ ] [09-json-and-apis.md](./02-javascript/09-json-and-apis.md)
- **🔵 Deep (Later)**
  - [ ] [08-prototypes-classes.md](./02-javascript/08-prototypes-classes.md)
- **Assessments & Practice**
  - [x] [mcqs.md](./02-javascript/mcqs.md) (40 questions, evenly spread)
  - [x] [interview-qna.md](./02-javascript/interview-qna.md) (20 questions)
  - [ ] [examples/](./02-javascript/examples/) (Code examples folder)

### 🔴🔵 [Module 03: TypeScript](./03-typescript/) (Mixed)
- **🔴 Basics (This Week)**
  - [x] [01-why-typescript-basic-types.md](./03-typescript/01-why-typescript-basic-types.md)
  - [x] [02-interfaces-types.md](./03-typescript/02-interfaces-types.md)
  - [x] [03-generics.md](./03-typescript/03-generics.md)
- **🔵 Full (Later)**
  - [ ] [04-utility-types-advanced.md](./03-typescript/04-utility-types-advanced.md)
- **Assessments**
  - [ ] [mcqs.md](./03-typescript/mcqs.md)
  - [ ] [interview-qna.md](./03-typescript/interview-qna.md)

### 🔵 [Module 04: React](./04-react/) (Later)
- [ ] [01-components-jsx.md](./04-react/01-components-jsx.md)
- [ ] [02-props-state.md](./04-react/02-props-state.md)
- [ ] [03-useEffect-lifecycle.md](./04-react/03-useEffect-lifecycle.md)
- [ ] [04-hooks-deep-dive.md](./04-react/04-hooks-deep-dive.md)
- [ ] [05-forms-controlled-inputs.md](./04-react/05-forms-controlled-inputs.md)
- [ ] [06-state-management-patterns.md](./04-react/06-state-management-patterns.md)
- [ ] [07-performance-rerenders.md](./04-react/07-performance-rerenders.md)
- [ ] [mcqs.md](./04-react/mcqs.md)
- [ ] [interview-qna.md](./04-react/interview-qna.md)
- [ ] [examples/](./04-react/examples/) (Code examples folder)

### 🔴🔵 [Module 05: Next.js](./05-nextjs/) (Mixed)
- **🔴 Routing & API (This Week)**
  - [x] [01-app-router-basics.md](./05-nextjs/01-app-router-basics.md)
  - [x] [02-api-route-handlers.md](./05-nextjs/02-api-route-handlers.md)
  - [x] [05-env-variables-config.md](./05-nextjs/05-env-variables-config.md)
- **🔵 Rest (Later)**
  - [ ] [03-server-vs-client-components.md](./05-nextjs/03-server-vs-client-components.md)
  - [ ] [04-data-fetching-patterns.md](./05-nextjs/04-data-fetching-patterns.md)
- **Assessments**
  - [ ] [mcqs.md](./05-nextjs/mcqs.md)
  - [ ] [interview-qna.md](./05-nextjs/interview-qna.md)

### 🔴 [Module 06: Node.js Backend](./06-nodejs-backend/) (This Week)
- [x] [01-request-response-cycle.md](./06-nodejs-backend/01-request-response-cycle.md)
- [x] [02-calling-external-apis.md](./06-nodejs-backend/02-calling-external-apis.md)
- [x] [03-error-handling-timeouts.md](./06-nodejs-backend/03-error-handling-timeouts.md)
- [x] [04-security-api-keys-env.md](./06-nodejs-backend/04-security-api-keys-env.md)
- [x] [mcqs.md](./06-nodejs-backend/mcqs.md)
- [x] [interview-qna.md](./06-nodejs-backend/interview-qna.md)
- [ ] [examples/](./06-nodejs-backend/examples/) (Code examples folder)

### 🔴 [Module 07: LLM & GenAI Fundamentals](./07-llm-genai-fundamentals/) (This Week)
- [x] [01-how-llms-work-basics.md](./07-llm-genai-fundamentals/01-how-llms-work-basics.md)
- [x] [02-prompting-system-vs-user.md](./07-llm-genai-fundamentals/02-prompting-system-vs-user.md)
- [x] [03-structured-output-json-mode.md](./07-llm-genai-fundamentals/03-structured-output-json-mode.md)
- [x] [04-function-tool-calling.md](./07-llm-genai-fundamentals/04-function-tool-calling.md)
- [x] [05-temperature-sampling.md](./07-llm-genai-fundamentals/05-temperature-sampling.md)
- [x] [06-hallucination-grounding-rag.md](./07-llm-genai-fundamentals/06-hallucination-grounding-rag.md)
- [x] [mcqs.md](./07-llm-genai-fundamentals/mcqs.md)
- [x] [interview-qna.md](./07-llm-genai-fundamentals/interview-qna.md)

### 🔴 [Module 08: LangChain & LangGraph](./08-langchain-langgraph/) (This Week)
- [x] [01-agents-vs-chains.md](./08-langchain-langgraph/01-agents-vs-chains.md)
- [x] [02-stategraph-state-design.md](./08-langchain-langgraph/02-stategraph-state-design.md)
- [x] [03-nodes-and-edges.md](./08-langchain-langgraph/03-nodes-and-edges.md)
- [x] [04-conditional-edges-routing.md](./08-langchain-langgraph/04-conditional-edges-routing.md)
- [x] [05-tool-binding-toolnode.md](./08-langchain-langgraph/05-tool-binding-toolnode.md)
- [x] [06-full-agent-loop-example.md](./08-langchain-langgraph/06-full-agent-loop-example.md)
- [x] [07-common-failure-modes.md](./08-langchain-langgraph/07-common-failure-modes.md)
- [x] [mcqs.md](./08-langchain-langgraph/mcqs.md)
- [x] [interview-qna.md](./08-langchain-langgraph/interview-qna.md)
- [x] [examples/](./08-langchain-langgraph/examples/) (Code examples folder)

### 🔴 [Module 09: DSA](./09-dsa/) (This Week)
- [x] [01-arrays-strings.md](./09-dsa/01-arrays-strings.md)
- [x] [02-hashmaps-objects.md](./09-dsa/02-hashmaps-objects.md)
- [x] [03-recursion-basics.md](./09-dsa/03-recursion-basics.md)
- [x] [04-big-o-complexity.md](./09-dsa/04-big-o-complexity.md)
- [x] [mcqs.md](./09-dsa/mcqs.md)
- [x] [problems/](./09-dsa/problems/) (Folder for individual problem files)

### 🔵 [Module 10: Databases](./10-databases/) (Later)
- [ ] [01-relational-db-basics.md](./10-databases/01-relational-db-basics.md)
- [ ] [02-sql-fundamentals.md](./10-databases/02-sql-fundamentals.md)
- [ ] [03-when-to-use-db-in-this-project.md](./10-databases/03-when-to-use-db-in-this-project.md)
- [ ] [mcqs.md](./10-databases/mcqs.md)

### 🔴 [Module 11: Git, GitHub & Deployment](./11-git-github-deployment/) (This Week)
- [ ] [01-git-basics-commit-branch.md](./11-git-github-deployment/01-git-basics-commit-branch.md)
- [ ] [02-github-workflow.md](./11-git-github-deployment/02-github-workflow.md)
- [ ] [03-vercel-deployment.md](./11-git-github-deployment/03-vercel-deployment.md)
- [ ] [mcqs.md](./11-git-github-deployment/mcqs.md)

### 🔵 [Module 12: System Design Thinking](./12-system-design-thinking/) (Later)
- [ ] [01-cost-and-rate-limits.md](./12-system-design-thinking/01-cost-and-rate-limits.md)
- [ ] [02-caching-strategies.md](./12-system-design-thinking/02-caching-strategies.md)
- [ ] [03-evaluating-agent-quality.md](./12-system-design-thinking/03-evaluating-agent-quality.md)
- [ ] [interview-qna.md](./12-system-design-thinking/interview-qna.md)

### 🔵 [Module 13: AI Product Thinking](./13-ai-product-thinking/) (Later)
- [ ] [01-what-is-an-ai-product.md](./13-ai-product-thinking/01-what-is-an-ai-product.md)
- [ ] [02-product-thinking-for-ai-features.md](./13-ai-product-thinking/02-product-thinking-for-ai-features.md)
- [ ] [interview-qna.md](./13-ai-product-thinking/interview-qna.md)

### 🔴 [Module 14: Resume & Behavioral Prep](./14-resume-and-behavioral-prep/) (This Week)
- [ ] [01-explaining-your-projects.md](./14-resume-and-behavioral-prep/01-explaining-your-projects.md)
- [ ] [02-common-behavioral-questions.md](./14-resume-and-behavioral-prep/02-common-behavioral-questions.md)
- [ ] [star-method-answers.md](./14-resume-and-behavioral-prep/star-method-answers.md)

### 🔴 [Module 15: Mock Interview Bank](./15-mock-interview-bank/) (This Week)
- [ ] [technical-round-questions.md](./15-mock-interview-bank/technical-round-questions.md)
- [ ] [project-deep-dive-questions.md](./15-mock-interview-bank/project-deep-dive-questions.md)
- [ ] [curveball-questions.md](./15-mock-interview-bank/curveball-questions.md)

### 🔴 [Module 16: Project Defense](./16-project-defense/) (This Week)
- [ ] [my-assignment-explained.md](./16-project-defense/my-assignment-explained.md)
