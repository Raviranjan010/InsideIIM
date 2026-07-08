# Terminal Basics: Navigating Your Computer with Text

When you use your computer, you are likely used to a **GUI** (Graphical User Interface)—clicking on icons, opening folders, and dragging files around. 

The **Terminal** (also called the Command Line, Console, or Shell) is simply another way to talk to your computer, but using **text commands** instead of clicks. Developers use the terminal because it is much faster, more powerful, and allows us to automate repetitive tasks.

---

## 🧭 The Core Commands

Think of the terminal as a text-based version of your File Explorer (on Windows) or Finder (on Mac). Here are the 4 fundamental commands you must know:

### 1. `ls` (List Files)
*   **What it does:** Shows you a list of all files and folders in your current directory (folder).
*   **GUI Equivalent:** Double-clicking a folder to see what is inside.
*   **Example:** Typing `ls` and hitting Enter might print:
    ```bash
    README.md    index.js    images/
    ```

### 2. `cd` (Change Directory)
*   **What it does:** Moves you from your current folder into another folder.
*   **GUI Equivalent:** Clicking on a folder to open it, or clicking the "Back" button.
*   **Examples:**
    *   `cd projects` (Move *forward* into a folder named "projects")
    *   `cd ..` (Move *backward* up to the parent folder. The double dots `..` always mean "the folder above this one")
    *   `cd ~` (Go directly to your user's home folder)

### 3. `mkdir` (Make Directory)
*   **What it does:** Creates a brand-new, empty folder.
*   **GUI Equivalent:** Right-clicking and selecting *New > Folder*.
*   **Example:** `mkdir new-project` (Creates a folder named `new-project` inside your current folder).

### 4. Running a Script (Running Code)
*   **What it does:** Executes a code file you've written, using an interpreter program like Node (for JavaScript) or Python.
*   **GUI Equivalent:** Double-clicking an application icon to run it.
*   **Examples:**
    *   `node index.js` (Runs a JavaScript file named `index.js` using Node)
    *   `python app.py` (Runs a Python file named `app.py` using Python)

---

## 📝 A Live Terminal Example Walkthrough

Let's walk through a real-world scenario where we create a folder, navigate into it, create a script, and run it.

Suppose your terminal starts in your home directory:

```bash
# 1. Look at what is inside the current directory
$ ls
Desktop/    Documents/    Downloads/

# 2. Navigate into the Documents directory
$ cd Documents

# 3. Create a new folder for our project
$ mkdir code-academy

# 4. Navigate into our new project folder
$ cd code-academy

# 5. (Optional) Check where we are right now
# pwd stands for "Print Working Directory"
$ pwd
/Users/raviranjan/Documents/code-academy

# 6. Let's assume you have written a JavaScript file named 'hello.js' inside this folder.
# We run the script using the 'node' command:
$ node hello.js
Hello, world! Welcome to the terminal!
```

---

## 💡 Pro Tips for Beginners

*   **Tab Autocomplete:** Don't type out long folder names! Start typing the first few letters (e.g., `cd Doc`) and press the **Tab** key. The terminal will complete the name (`cd Documents/`) automatically.
*   **Command History (Up & Down Arrow Keys):** Press the **Up Arrow** key to cycle through commands you previously typed. This saves a lot of typing if you want to rerun a command.
*   **Clear the Screen:** If your terminal gets too cluttered with text, type `clear` (on Mac/Linux) or `cls` (on Windows PowerShell) and hit Enter to clean the screen.
