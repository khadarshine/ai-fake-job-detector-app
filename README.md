# JobShield - AI Fake Job Detector

JobShield is a completely original, premium-quality SaaS web application designed to help job seekers detect employment scams, phishing recruitment channels, check cashing fraud, and identity harvesting. 

The application is built with a **100% frontend-only, local-first architecture**. It stores your scanning history and API keys in your browser's private storage, ensuring absolute confidentiality.

---

## 🌟 Key Features

* **Safety Verification Sandbox**: Paste job descriptions, emails, chat screenshots, or drag-and-drop document files (PDF/TXT) client-side.
* **Dual-Scanning Pipeline**:
  * **Pattern Heuristics**: Analyzes text local-first for high-risk flags (Gmail domains, WhatsApp/Telegram interview rooms, check reimbursement requests).
  * **Semantic AI Audit**: Integrates with OpenRouter using your custom API Key to run deep LLM security checks (Gemini, Llama, Qwen, DeepSeek).
* **Granular Threat Scorecard**: Itemizes security risks across 8 threat parameters (Salary realism, grammar, domains, personal info, financial demands, etc.).
* **Cybersecurity Dashboard**: Visualizes your safety trends using custom, animated SVG chart widgets (Trend-lines, Donut distributions, category progress bars).
* **Data Privacy Controls**: Complete backing database backup (Import/Export JSON archives) and one-click database purges.
* **Premium Design Language**: Dark/Light mode theme switching, glassmorphic layout structures, and screen-reader accessibility controls.

---

## 🛠️ Technology Stack

* **Framework**: React 19, TypeScript
* **Build System**: Vite, Oxlint
* **Styling**: Modern CSS3 (Vanilla Custom Properties & Grid Layouts)
* **Icons**: Lucide React
* **Hosting Targets**: Static Exports (Netlify, Vercel, Cloudflare Pages, GitHub Pages)

---

## 📦 Installation & Setup

### Prerequisites
Make sure you have [Node.js](https://nodejs.org) (v18 or higher) and `npm` installed.

### 1. Clone & Navigate
```bash
git clone https://github.com/your-username/ai-fake-job-detector.git
cd ai-fake-job-detector
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser to test.

### 4. Build Production Bundle
To compile a minimized, optimized static bundle in the `dist/` directory:
```bash
npm run build
```

---

## ⚙️ OpenRouter API Configuration

To enable semantic AI checks:
1. Visit [OpenRouter](https://openrouter.ai) and sign up for a free account.
2. Navigate to the **API Keys** settings and generate a secure token.
3. Open the **Settings** panel inside the JobShield app.
4. Paste your key into the API configuration field and select your preferred model (e.g. Gemini 2.5 Flash Free or Llama 3 8B Free).
5. All queries are conducted directly from your browser to OpenRouter endpoints.

---

## 🚀 Deployment Guide

Since JobShield has no custom server or Node.js APIs, it can be hosted on any free static cloud provider:

### Vercel (Static)
1. Install Vercel CLI: `npm install -g vercel`
2. Run `vercel` in the project root and follow prompts.
3. Configure build settings:
   * **Build Command**: `tsc -b && vite build`
   * **Output Directory**: `dist`

### Netlify Free
1. Install Netlify CLI: `npm install -g netlify-cli`
2. Run `netlify deploy --prod`
3. Specify `dist` as the publish directory.

### GitHub Pages
1. Install gh-pages: `npm install gh-pages --save-dev`
2. Add deploy script to `package.json`:
   * `"predeploy": "npm run build"`
   * `"deploy": "gh-pages -d dist"`
3. Run: `npm run deploy`

---

## 🔒 Security Blueprint

JobShield adheres to the following security principles:
* **Inputs Escaping**: All user pastes, files, and URL parses are escaped to prevent Cross-Site Scripting (XSS).
* **LocalStorage Protection**: Sensitive variables like OpenRouter keys are isolated from public scopes.
* **No Telemetry**: No third-party marketing tags, Google Analytics, or remote tracking scripts.

---

## 🎨 Accessibility & SEO Compliance

* **SEO Meta Tags**: Features descriptive open-graph records, robots metadata, and structured WebApplication schema in `index.html`.
* **Sitemap Registry**: Crawl pathways registered inside `public/robots.txt` and `public/sitemap.xml`.
* **Keyboard Navigation**: Buttons, selectors, and panels support standard focus rings and tab orders.
* **Reduced Motion**: Respects `prefers-reduced-motion` media queries and provides a manual setting to disable interface transitions.
