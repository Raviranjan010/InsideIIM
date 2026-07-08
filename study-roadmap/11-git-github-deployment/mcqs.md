# Git, GitHub & Vercel Practice: 15 MCQs

These questions test your understanding of Git version control, GitHub repository management, and hosting Next.js applications on Vercel.

---

### Q1. What does the command `git init` do?
- [ ] A) It downloads a repository from GitHub.
- [ ] B) It initializes a brand new, empty local Git repository in the current directory.
- [ ] C) It deletes all files in the directory to reset it.
- [ ] D) It uploads your local files to Vercel.

**Correct Answer:** B
*   **Why it's correct:** `git init` sets up the hidden `.git` folder, marking the directory as a local repository ready to track files and commit changes.
*   **Why other options are wrong:** A describes `git clone`. C and D describe destructive or hosting actions unrelated to initializing local tracking.

---

### Q2. Which area in Git serves as the draft sandbox before changes are committed?
- [ ] A) The Working Directory
- [ ] B) The Staging Area
- [ ] C) The Remote Repository
- [ ] D) The Vercel Dashboard

**Correct Answer:** B
*   **Why it's correct:** The Staging Area acts as a draft board. Running `git add` copies changes here, letting you review exactly what will be saved in your next commit.
*   **Why other options are wrong:** A is where you edit live files. C is the cloud host (GitHub). D is the deployment hosting interface.

---

### Q3. What is the effect of running `git add .`?
- [ ] A) It commits all changes directly to GitHub.
- [ ] B) It stages all modifications, additions, and deletions in the current directory and subdirectories.
- [ ] C) It deletes all files from the local directory.
- [ ] D) It creates a new branch.

**Correct Answer:** B
*   **Why it's correct:** The dot `.` represents the current directory, instructing Git to scan and stage all local file modifications and new files.
*   **Why other options are wrong:** A is incorrect since staging does not commit or upload files. C and D describe destructive or branch tasks.

---

### Q4. How do you create and switch to a branch named `feature/db` in one line?
- [ ] A) `git branch feature/db`
- [ ] B) `git checkout -b feature/db`
- [ ] C) `git merge feature/db`
- [ ] D) `git checkout feature/db`

**Correct Answer:** B
*   **Why it's correct:** The `-b` flag combined with `checkout` instructs Git to create the branch first, and then immediately switch your working directory to it.
*   **Why other options are wrong:** A only creates the branch without switching. D switches to a branch only if it already exists. C merges branches.

---

### Q5. Why should `.env.local` be listed inside the `.gitignore` file?
- [ ] A) To make Vercel compile the files faster.
- [ ] B) To prevent private API keys and credentials from being committed to your Git history and exposed on public repositories.
- [ ] C) Because Next.js cannot read `.env.local` if it is tracked by Git.
- [ ] D) To upload it directly to Vercel.

**Correct Answer:** B
*   **Why it's correct:** `.env.local` contains sensitive secrets. Excluding it via `.gitignore` protects your accounts from hackers who scan public code repos for credentials.
*   **Why other options are wrong:** A is incorrect. C is incorrect because Next.js reads `.env.local` regardless of tracking. D is incorrect since gitignore prevents uploads.

---

### Q6. What does `git status` output?
- [ ] A) The current internet download speed.
- [ ] B) A summary of modified, staged, and untracked files in the working directory.
- [ ] C) The credit balance of your OpenAI account.
- [ ] D) The deployment logs on Vercel.

**Correct Answer:** B
*   **Why it's correct:** `git status` displays the state of your working directory and staging area, showing which changes are staged, unstaged, or untracked.
*   **Why other options are wrong:** A, C, and D describe network, billing, or hosting metrics that Git does not manage.

---

### Q7. What is the purpose of the `-u` flag in `git push -u origin main`?
- [ ] A) It decrypts the repository key.
- [ ] B) It sets the default upstream branch, linking your local branch to the remote branch so you can just type `git push` in the future.
- [ ] C) It deletes the remote branch before uploading.
- [ ] D) It marks the commit as urgent.

**Correct Answer:** B
*   **Why it's correct:** `-u` (or `--set-upstream`) creates a tracking link between local `main` and remote `origin/main`. Once linked, running `git push` or `git pull` without arguments defaults to this branch.
*   **Why other options are wrong:** A, C, and D are incorrect.

---

### Q8. What happens if you try to switch branches using `git checkout` but have uncommitted changes that conflict with the destination branch?
- [ ] A) Git deletes your local changes and switches.
- [ ] B) Git blocks the checkout and prompts you to commit, stash, or discard your changes first to prevent overwriting them.
- [ ] C) Git automatically force-pushes your changes to GitHub.
- [ ] D) The local repository is corrupted.

**Correct Answer:** B
*   **Why it's correct:** Git prioritizes file safety. If switching branches would overwrite your uncommitted changes, Git halts the checkout to protect your work.
*   **Why other options are wrong:** A describes destructive behavior Git avoids by default. C and D are incorrect.

---

### Q9. What does the command `git pull` do under the hood?
- [ ] A) It runs `git push` followed by `git commit`.
- [ ] B) It runs `git fetch` (downloading remote updates) followed by `git merge` (integrating those updates into your current branch).
- [ ] C) It downloads and installs Node.js packages.
- [ ] D) It triggers a build on Vercel.

**Correct Answer:** B
*   **Why it's correct:** `git pull` is a shortcut command that performs a fetch to download remote repository history, followed by a merge to apply those changes to your active branch.
*   **Why other options are wrong:** A is the opposite direction. C is handled by npm. D is triggered by pushes, not pulls.

---

### Q10. What is an atomic commit in Git?
- [ ] A) A single commit containing a complete working project.
- [ ] B) A small, self-contained commit that implements exactly one logical feature or fix, keeping history readable and easy to roll back.
- [ ] C) A commit that cannot be deleted.
- [ ] D) An automated commit made by an AI tool.

**Correct Answer:** B
*   **Why it's correct:** Atomic commits contain changes for one specific task. This keeps history clean and allows developers to revert single features without affecting other work.
*   **Why other options are wrong:** A describes a giant monolithic commit. C and D are incorrect.

---

### Q11. If you commit a secret API key to your local Git history, and then delete the file in your next commit, is the key safe if you push to GitHub?
- [ ] A) Yes, because the file is deleted in the latest snapshot.
- [ ] B) No, because the key remains in the historical commit database, allowing anyone to inspect past commits and read it.
- [ ] C) Yes, because Git automatically encrypts historical files.
- [ ] D) No, because GitHub does not support deleted files.

**Correct Answer:** B
*   **Why it's correct:** Deleting a file in a new commit only hides it in the latest snapshot. The file and its keys are still saved inside the history database of previous commits.
*   **Why other options are wrong:** A is incorrect since Git history is persistent. C is wrong because Git does not encrypt files. D is incorrect.

---

### Q12. Why is force-pushing (`git push -f`) considered dangerous?
- [ ] A) It consumes double the network bandwidth.
- [ ] B) It overwrites the remote repository history with your local history, potentially deleting commits made by other collaborators.
- [ ] C) It deletes all files in your local directory.
- [ ] D) It invalidates your Vercel deployment credentials.

**Correct Answer:** B
*   **Why it's correct:** Force pushing bypasses history validation checks. It tells GitHub to replace the remote branch with your local version, destroying any remote commits that you didn't have locally.
*   **Why other options are wrong:** A is wrong because data size is similar. C is wrong since it affects remote history, not local working directories. D is incorrect.

---

### Q13. How does Vercel know when to deploy a new version of your Next.js application?
- [ ] A) You must email Vercel support.
- [ ] B) Vercel monitors your GitHub repository via webhooks and automatically triggers a build when you push new commits to your linked branch.
- [ ] C) You must run `npm run deploy` on your terminal.
- [ ] D) It deploys every day at midnight.

**Correct Answer:** B
*   **Why it's correct:** Vercel integrates directly with GitHub. When you push to your tracked branch (typically `main`), a webhook notifies Vercel, which pulls the fresh code and rebuilds.
*   **Why other options are wrong:** A, C, and D describe manual or scheduled tasks that Vercel's automated git-integration renders obsolete.

---

### Q14. Why must you redeploy your app on Vercel after editing an environment variable in the Vercel settings dashboard?
- [ ] A) To verify your email address.
- [ ] B) Because environment variables are only injected into your Next.js application during the compilation/build phase.
- [ ] C) To download the keys to your local computer.
- [ ] D) To clear browser cache.

**Correct Answer:** B
*   **Why it's correct:** Next.js compiles variables (especially client-exposed ones) into the static build during compilation. Changing dashboard variables does not update already compiled builds until a redeploy rebuilds the code.
*   **Why other options are wrong:** A, C, and D describe unrelated tasks.

---

### Q15. What prefix must be added to a Next.js environment variable key to expose its value to the browser?
- [ ] A) `PUBLIC_`
- [ ] B) `NEXT_PUBLIC_`
- [ ] C) `BROWSER_`
- [ ] D) `process.env.`

**Correct Answer:** B
*   **Why it's correct:** Next.js blocks variables from being bundled into client code for safety. Prefixing a variable with `NEXT_PUBLIC_` tells Next.js it is safe to expose to the client-side JavaScript bundle.
*   **Why other options are wrong:** A and C are incorrect naming prefixes. D is the runtime code accessor, not the prefix key itself.
