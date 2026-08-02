<p align="center">
  <img src="https://avatars.githubusercontent.com/u/62233773?s=500&v=4" width="120" alt="Justin J Daniel Avatar"/>
</p>

<h1 align="center">Justin J Daniel</h1>

<p align="center">
  <b>Fullstack Developer & Responsible AI Advocate</b><br/>
  <a href="https://justinjdaniel.com">Website</a> •
  <a href="https://github.com/justinjdaniel">GitHub</a> •
  <a href="https://www.linkedin.com/in/justin-j-daniel">LinkedIn</a>
</p>

<p align="center">
  <a href="LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-0070f3.svg?style=flat-square" alt="License" />
  </a>
  <a href="https://nextjs.org/">
    <img src="https://img.shields.io/github/package-json/dependency-version/justinjdaniel/justinjdaniel.com/next/main?color=black&label=next.js&logo=nextdotjs&logoColor=white&style=flat-square" alt="Next.js version" />
  </a>
  <a href="https://github.com/justinjdaniel/justinjdaniel.com/actions/workflows/build.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/justinjdaniel/justinjdaniel.com/build.yml?branch=main&label=build&logo=github&style=flat-square" alt="Build status" />
  </a>
  <a href="https://github.com/justinjdaniel/justinjdaniel.com/actions/workflows/playwright.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/justinjdaniel/justinjdaniel.com/playwright.yml?branch=main&label=e2e%20tests&logo=playwright&logoColor=white&style=flat-square" alt="Playwright E2E Tests status" />
  </a>
  <a href="https://github.com/justinjdaniel/justinjdaniel.com/actions/workflows/lighthouse.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/justinjdaniel/justinjdaniel.com/lighthouse.yml?branch=main&label=lighthouse&logo=lighthouse&logoColor=white&style=flat-square" alt="Lighthouse status" />
  </a>
  <a href="https://justinjdaniel.com/">
    <img src="https://img.shields.io/website?url=https%3A%2F%2Fjustinjdaniel.com%2F&up_message=online&down_message=offline&label=website&logo=vercel&logoColor=white&style=flat-square&color=success" alt="Website status" />
  </a>
</p>

---

## 👋 About Me

I am a **Software Engineer and Full-Stack Developer** specializing in building high-performance web applications, integrating modern **Generative AI workflows**, and architecting scalable digital platforms.

With a strong foundation in **distributed systems, Next.js, React, and Web3 architectures**, I bridge the gap between complex backend infrastructure and intuitive, user-centric interfaces. My recent work focuses on leveraging modern AI frameworks—such as Google Cloud Vertex AI and Azure AI—to build smart, data-driven applications that solve real-world problems.

I combine engineering rigor with design thinking, rapid prototyping, and product analytics to deliver software that scales effortlessly and drives measurable user engagement. Always eager to explore emergent AI technologies, collaborate on innovative systems, and push the boundaries of full-stack engineering.

Always building, learning, and open to collaboration on high-impact software projects!

---

## 🚀 Technologies

This portfolio is built using a modern, high-performance web stack. Here is a breakdown of the core technologies:

> [!NOTE]
> ### 💻 Core Frontend & Frameworks
> - **[Next.js 16](https://nextjs.org/):** Leveraging App Router, React Server Components (RSC), and dynamic rendering.
> - **[React 19](https://react.dev/):** Powering modern rendering patterns, concurrent features, and state hooks.
> - **[GSAP](https://greensock.com/gsap/):** Professional-grade JS animation library driving sleek, high-fidelity UI animations.

> [!TIP]
> ### 🎨 Styling & Design
> - **[Tailwind CSS 4](https://tailwindcss.com/):** Utility-first CSS using a modern, high-performance CSS-first setup via `@import "tailwindcss"`.
> - **PostCSS:** Pre-configured modular styles and vendor prefix handling.

> [!IMPORTANT]
> ### 🗄️ Database & Dynamic Features
> - **PostgreSQL / [Neon](https://neon.tech/):** High-performance serverless database for blog features and persistence.
> - **[next-mdx-remote](https://github.com/hashicorp/next-mdx-remote):** Content parsing and syntax-highlighted markdown files with `rehype-pretty-code`.

> [!WARNING]
> ### 🛡️ Tooling, Linting & E2E Testing
> - **[Biome](https://biomejs.dev/):** Lightning-fast toolchain to format, lint, and verify code quality.
> - **[Playwright](https://playwright.dev/):** Bulletproof end-to-end framework for integration and user-journey tests.

---

## 💻 Local Development

Follow these steps to get your local development environment up and running.

### 📋 Prerequisites

> [!IMPORTANT]
> Ensure you have the following installed on your machine:
> - **Git**: Version control to clone the repository.
> - **Node.js**: Version `20.x` or higher (Node.js `22` is recommended).
> - **pnpm**: Version `10.x` or higher for package management.

### 🚀 Setup & Run

1. **Clone the Repository**
   ```bash
   git clone https://github.com/justinjdaniel/justinjdaniel.com.git
   cd justinjdaniel.com
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Database Configuration**
> [!TIP]
> You can completely bypass Neon/PostgreSQL database requirements for local builds and development!
> Simply set the environment variable `DATABASE_URL=mock` in your local environment.

   Create a `.env` file in the root directory:
   ```bash
   DATABASE_URL=mock
   ```

4. **Run the Development Server**
   ```bash
   pnpm dev
   ```

5. **Open in Browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see your local instance.

---

### ⚙️ Developer Tooling & Commands

<details>
<summary><b>🔍 Code Quality & Formatting (Biome)</b></summary>

This project uses [Biome](https://biomejs.dev/) to format and lint code instantly.

```bash
# Check code quality, linting, and formatting
pnpm run check

# Format all files in-place
pnpm run format
```
</details>

<details>
<summary><b>🧪 Running End-to-End Tests (Playwright)</b></summary>

We use Playwright to verify application behavior, layout responsiveness, and full-system correctness.

```bash
# Install Playwright browser binaries
pnpm run test:e2e:install

# Execute end-to-end test suite
pnpm run test:e2e
```
</details>

---

## 📸 Preview

<p align="center">
  <img src=".github/images/landing.png" width="700" alt="Landing page screenshot"/>
</p>

<!-- ---

## 🌐 Connect

<p align="center">
  <a href="https://justinjdaniel.com">
    <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/MyPortfolio/myportfolio3.svg" alt="Website" />
  </a>
  <a href="https://linkedin.com/in/justin-j-daniel">
    <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/LinkedIn/linkedin1.svg" alt="LinkedIn" />
  </a>
  <a href="https://dev.to/justinjdaniel">
    <img src="https://ziadoua.github.io/m3-Markdown-Badges/badges/Devto/devto3.svg" alt="Dev.to" />
  </a>
</p> -->

---

> [!NOTE]
> **Source Code & Live Demo**
> This repository contains the source code and content for my personal portfolio website. You can view the live site at [justinjdaniel.com](https://justinjdaniel.com/).
>
> **License**
> This project is open source and licensed under the [MIT License](LICENSE).
