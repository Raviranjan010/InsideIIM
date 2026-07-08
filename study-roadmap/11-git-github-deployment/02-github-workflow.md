# GitHub Workflow & Writing Defensible Commit Histories

While Git runs locally on your machine, **GitHub** hosts your repository in the cloud, allowing others to view, run, and review your code.

In an academic or professional coding assessment, **your Git commit history is your signature**. A clean, logical, and incremental commit history is the single best proof that you wrote the code yourself, rather than copying a giant folder or using AI to generate it in one click.

---

## 1. Syncing with GitHub: Push & Pull

Once you have a local Git repository, you connect it to a remote GitHub repository.

### Connecting to a Remote Repo:
```bash
# 1. Add the GitHub remote URL
git remote add origin https://github.com/yourusername/investment-agent.git

# 2. Rename the default branch to main
git branch -M main

# 3. Push your local history to GitHub (-u sets the upstream link)
git push -u origin main
```

### Syncing Updates:
*   **`git push`:** Uploads your new local commits to GitHub.
*   **`git pull`:** Fetches and integrates updates from the remote GitHub repository into your local working directory.

---

## 2. Writing a Clean, Defensible Commit History

An evaluator can tell you copied code if your commit history consists of only one giant commit saying *"initial commit"* or *"project finished"*, containing 50 completely finished files.

To prove **solo, defensible authorship**, you must commit **atomically** (small, logical steps) as you write the code:

### The Defensible Workflow:
1.  **Initialize:** Commit your basic directory structures first (`feat: scaffold project folders`).
2.  **Increment:** When you write the TS interfaces, commit them (`feat: define typescript interfaces for graph state`).
3.  **Validate:** Once you write the Next.js API route, write a commit explaining it (`feat: add api route handler for research proxy`).
4.  **Refine:** When you fix a bug in your AbortController timeout, commit the change (`fix: add AbortController timeout to search fetch`).

### Good vs. Bad Commits:
*   ❌ **Bad Message:** `"updates"` or `"fixed stuff"` (tells the reviewer nothing, looks disorganized).
*   ✅ **Good Message (Conventional Commits style):** `"feat: add Tavily search integration to agent nodes"` (clearly describes the scope and intent).

---

## ⚠️ Common Mistake: Force Pushing (`git push -f`)

If you run into merge conflicts or history mismatches when pushing to GitHub, a common beginner reaction is to force the push:

```bash
# OOPS: Overwriting the remote repository history!
git push -f origin main
```
*   **Why it's dangerous:** Force pushing overwrites the remote repository with your local history. If you are collaborating with others, or if your evaluator has already cloned your repo, you will break their local versions and delete commits permanently.
*   **The Fix:** Never use `-f`. Resolve conflicts locally by pulling first (`git pull origin main`), fixing the conflict markers in your files, committing the resolution, and then pushing.

---

## 🧠 Self-Check Recall

1.  What command links your local Git repository to a remote repository hosted on GitHub?
2.  What is the difference between `git push` and `git pull`?
3.  Why is committing 5,000 lines of code in a single commit labeled "Finished App" a bad practice for interviews?
4.  What commit message style format uses prefixes like `feat:` and `fix:`?
5.  Why should you avoid using the `-f` (force) flag when pushing commits?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`git remote add origin <url>`**
2.  **`git push` uploads** your local commits to GitHub. **`git pull` downloads** and integrates remote commits into your local machine.
3.  **It suggests the code was copied in bulk.** A structured history of small, logical commits proves you built the project incrementally and understand the codebase.
4.  **Conventional Commits.**
5.  **It overwrites history.** It can permanently delete commits on the remote server and break code synchronization for other users or systems tracking the repository.
</details>
