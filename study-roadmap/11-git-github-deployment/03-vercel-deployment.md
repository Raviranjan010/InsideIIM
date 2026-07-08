# Vercel Deployment & Environment Variables

Once your Next.js application is versioned and pushed to GitHub, you can deploy it to production. **Vercel** is the cloud platform designed by the creators of Next.js, making it the industry standard for hosting Next.js applications.

In this guide, you will learn how to deploy your app and securely configure environment variables in Vercel.

---

## 1. Deploying to Vercel: Step-by-Step

Vercel connects directly to your GitHub repository and automatically deploys your code every time you push to the `main` branch.

### Step 1: Create a Vercel Account
Go to [vercel.com](https://vercel.com) and log in using your **GitHub account**. This automatically links your repositories.

### Step 2: Import Your Repository
1.  Click **"Add New"** → **"Project"** in the Vercel dashboard.
2.  Find your public repository in the import list and click **"Import"**.

### Step 3: Configure Build Settings
For standard Next.js apps, Vercel automatically detects the framework and configures the build command (`next build`) and output directory (`.next`). You do not need to modify these default settings.

---

## 2. Setting Environment Variables in Vercel

Your investment agent requires secret keys (like `OPENAI_API_KEY` and `TAVILY_API_KEY`) to run. Because we did not commit our `.env.local` file (it is in `.gitignore`), the build will fail or the APIs will crash if we don't supply these keys to Vercel.

### How to Add Keys in the Dashboard:
1.  During the project import screen (or under **Project Settings** → **Environment Variables** after import):
2.  Add the key-value pairs:
    *   **Key:** `OPENAI_API_KEY` | **Value:** `sk-...`
    *   **Key:** `TAVILY_API_KEY` | **Value:** `tvly-...`
3.  Click **"Add"**.
4.  Click **"Deploy"**.

```text
                  [ Git Push to GitHub ]
                            │
                            ▼
                  [ Vercel Auto-Trigger ]
                            │
                            ▼
    (Injects OPENAI_API_KEY from Dashboard settings)
                            │
                            ▼
               [ Build & Host Application ]
```

Vercel encrypts these keys and securely injects them into the Node.js server environment at runtime, ensuring your secrets are safe.

---

## ⚠️ Common Mistake: Forgetting to Re-Deploy After Adding Environment Variables

A very common issue is deploying a Next.js app, getting API errors, adding the missing `OPENAI_API_KEY` to the Vercel settings page, and finding the app *still* crashes with the same error.

*   **Why this happens:** Vercel only injects environment variables during the **Build Phase**. If you add or modify a variable in the settings dashboard, it will not take effect on the already running site.
*   **The Fix:** Every time you add or update an environment variable in Vercel, you must trigger a new deployment. Go to the **"Deployments"** tab, click the three dots next to the latest build, and select **"Redeploy"** to rebuild the application with the new keys.

---

## 🧠 Self-Check Recall

1.  Why does Vercel require you to add your API keys manually in the dashboard instead of reading them from your repository files?
2.  How does Vercel handle deployments when you run `git push origin main`?
3.  Where in the Vercel dashboard do you configure secret credentials?
4.  What must you do after adding a new environment variable to Vercel to make sure the app uses it?
5.  If you want an environment variable to be readable in a client-side React component on Vercel, what prefix must it have?

<details>
<summary>🔑 Click to reveal answers</summary>

1.  **Because secrets are ignored by Git.** The `.env.local` file is excluded via `.gitignore` to prevent key leakage, so Vercel must get them from a secure dashboard setting.
2.  **It triggers an automatic build and deployment.** Vercel pulls the latest code and updates the live site.
3.  **Project Settings ──> Environment Variables.**
4.  **Trigger a Redeploy.** The environment variables are only injected into the code during compilation.
5.  **`NEXT_PUBLIC_`** (e.g. `NEXT_PUBLIC_API_URL`).
</details>
