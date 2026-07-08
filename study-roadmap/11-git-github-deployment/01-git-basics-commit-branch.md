# Git Basics: Commits & Branching

For any professional coding project, using version control is mandatory. Git allows you to track modifications, revert to previous code checkpoints, and organize your work using branches.

In this guide, you will learn the fundamental Git workflow commands and how branching operates.

---

## 1. The Git Lifecycle: Track, Stage, Commit

Git coordinates code changes through three primary areas:
1.  **Working Directory:** The actual files you are currently editing.
2.  **Staging Area:** A draft table where you select which changes are ready to be saved.
3.  **Local Repository:** The database of finalized code snapshots (commits) saved on your computer.

```text
[ Working Directory ] ──(git add)──> [ Staging Area ] ──(git commit)──> [ Local Repo ]
```

### Core Commands Reference:
*   **Initialize Git:** Start tracking a new project.
    ```bash
    git init
    ```
*   **Check Status:** See which files are modified, staged, or untracked.
    ```bash
    git status
    ```
*   **Stage Changes:** Add modified files to the draft staging area.
    ```bash
    # Stage a single file
    git add app/page.tsx
    
    # Stage all changes in the directory
    git add .
    ```
*   **Commit Changes:** Save a permanent snapshot of the staged files to your history with a description.
    ```bash
    git commit -m "feat: implement search API fetch route"
    ```

---

## 2. Branching Basics: Isolated Development

A **Branch** is a parallel version of your repository. It allows you to build a new feature (like integrating LangGraph) without breaking the main working code.

```text
main   ───●───────────●───────────●─── (Stable Production)
           \         /
feature     └──●───●┘ (Isolated Development)
```

### Core Branching Commands:
*   **Create a Branch:** Create a new branch named `feature/langgraph`.
    ```bash
    git branch feature/langgraph
    ```
*   **Switch Branches:** Jump to your new branch.
    ```bash
    git checkout feature/langgraph
    
    # Shortcut to create AND switch in one command:
    git checkout -b feature/langgraph
    ```
*   **Merge Branches:** Integrate changes from your feature branch back into your `main` branch.
    ```bash
    # 1. Switch to main
    git checkout main
    
    # 2. Merge the feature changes
    git merge feature/langgraph
    ```
*   **Delete a Branch:** Clean up after merging.
    ```bash
    git branch -d feature/langgraph
    ```

---

## ⚠️ Common Mistake: Committing Secrets (API Keys)

A disastrous mistake in project deployment is committing private keys (like `OPENAI_API_KEY`) to your repository.

```bash
# OOPS! Staging everything, including your .env file
git add .env.local
git commit -m "add api keys"
```
*   **Why it's dangerous:** Once a file is committed, it remains in the Git history database even if you delete the file in a subsequent commit. If you upload the repository to GitHub, anyone can scrape your history and steal your keys.
*   **The Fix:** Always add `.env` and `.env.local` to a **`.gitignore`** file *before* running `git add .`:
```text
# Inside .gitignore
.env
.env.local
node_modules/
.next/
```
*   **If you already committed it:** You must use tools like `git filter-repo` or `bfg` to purge the file completely from your historical commits database.

---

## 🧠 Self-Check Recall

1.  What command registers modifications into the staging area?
2.  What is the difference between `git add` and `git commit`?
3.  How do you create and switch to a new branch named `feat/rag` in a single command?
4.  Why is it dangerous to simply delete a secret key file in a new commit if it was already committed previously?
5.  What file tells Git which directories or files (like `node_modules`) to ignore?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **`git add <filename>`** (or `git add .`).
2.  **`git add` stages changes** (adds them to the draft table). **`git commit` saves the snapshot** permanently to the local repository history.
3.  **`git checkout -b feat/rag`**
4.  **Because Git maintains a full historical database.** The file will still be visible in the history logs of the previous commits, allowing others to inspect and steal it.
5.  **`.gitignore`**
</details>
