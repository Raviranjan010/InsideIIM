# Cloud & AWS Interview Q&A: 8 Core Questions

This bank contains 8 questions and answers to help you navigate cloud infrastructure conversations in technical interviews.

---

### Q1. Why do modern companies choose cloud hosting over buying their own physical servers?
**Answer:**
Companies choose cloud hosting because it shifts infrastructure costs from capital expenses (CapEx) to operating expenses (OpEx), avoiding large upfront hardware costs. Additionally, the cloud provides elasticity, enabling systems to scale resources automatically to match user traffic. It also offers higher reliability, leveraging redundant power, cooling, and hardware systems in global data centers.

---

### Q2. What is the difference between Amazon EC2 and AWS Lambda, and how do you decide which to use?
**Answer:**
EC2 is a virtual server that runs continuously and is billed by the hour, giving you full control over the OS and runtime environment. Lambda is a serverless compute service that runs code only when triggered by an event, billing only for the milliseconds of execution. 
*   Use **EC2** for long-running, stateful processes (like 24/7 web sockets or complex agent loops).
*   Use **Lambda** for short, event-driven tasks (like daily backups, file conversions, or API handlers).

---

### Q3. Explain what Amazon S3 is and provide a scenario where it is used in an AI project.
**Answer:**
Amazon S3 (Simple Storage Service) is a managed file storage service designed to store static files, assets, and backups with high durability. In our investment assistant project, we use S3 to store generated financial PDF reports. The backend uploads the PDF to S3, retrieves a unique file URL, and saves that URL in our relational database to serve as a download link for the user.

---

### Q4. Why is Amazon RDS preferred over installing PostgreSQL manually on an EC2 instance?
**Answer:**
RDS is a managed service that handles time-consuming administrative tasks automatically, including database patches, daily backups, storage scaling, and Multi-AZ replication. Installing database engines manually on an EC2 instance requires managing the OS, configuring backups, and setting up replication manually, which increases maintenance overhead and risk.

---

### Q5. What does the term "Serverless" mean, and does it mean there are no servers involved?
**Answer:**
"Serverless" is a developer-experience term. It does not mean there are no servers; it means that the developer does not manage or configure the servers. The cloud provider handles all server provisioning, scaling, patching, and resource allocation. You upload only your application code, and pay strictly for execution time.

---

### Q6. How would you design a backup and recovery system for your relational database on AWS?
**Answer:**
I would leverage Amazon RDS's built-in backup features. I would enable automatic daily snapshots with a 7-day retention period. For production data, I would enable Multi-AZ replication to maintain a synchronous replica in a secondary data center, enabling automated failover if the primary data center experiences a outage.

---

### Q7. How does the concept of "Elasticity" help save hosting costs?
**Answer:**
Elasticity matches resource allocation to active user demand. If traffic spikes during the day, the system spins up extra servers to handle the load. At night when traffic drops, the system shuts down idle servers automatically. This ensures you only pay for the compute resources you need, preventing over-provisioning costs.

---

### Q8. How would you secure sensitive API keys (like your OpenAI key) when deploying your app to a cloud platform?
**Answer:**
I would never hardcode keys in my codebase. Instead, I would inject them as **Environment Variables** using the hosting platform's dashboard (such as Vercel's env management panel or AWS Secrets Manager). The backend reads these values from memory at runtime (`process.env.OPENAI_API_KEY`), keeping the secrets secure and out of the version control history.