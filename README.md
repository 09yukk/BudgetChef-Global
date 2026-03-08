# 🍳 Budget Chef · 月底救星

> *What can I afford to cook tonight?*  
> A hyper-localised, AI-powered meal planner that works backwards from your remaining budget.

![Languages](https://img.shields.io/badge/languages-EN%20%7C%20中文%20%7C%20BM%20%7C%20日本語-blue)
![Regions](https://img.shields.io/badge/regions-15%2B%20cities-green)
![Deployment](https://img.shields.io/badge/deploy-GitHub%20Pages%20%7C%20local-orange)

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🌍 **15+ City Profiles** | Shanghai, Chengdu, KL, Penang, Bangi, Tokyo, Osaka, Singapore, London… each with local cuisine, staple condiments, seasonal produce |
| 🎛️ **Taste Sliders** | 4-axis preference: Spice · Sweet↔Savoury · Salt · Sour — injected directly into the AI prompt |
| ❄️ **Smart Pantry** | Mark items as Fresh / ½ Used / ⚡ Expiring — expiring items are *required* in at least one recipe |
| 🍳 **3 Meal Strategies** | 💸 Max Savings · ✨ Good Life · ⚖️ Balanced Nutrition |
| ⚗️ **Black-Box Fusion** | Odd ingredient combos? AI invents a creative dish with a fun name |
| 📊 **Nutrition Tracker** | Log meals, track daily calories / protein / carbs / fat vs targets |
| 🛒 **Shopping List** | One-click copy or `.txt` download of items to buy |
| 📅 **14-Day History** | Heatmap of past plans with streak counter |
| 🌱 **ESG Scoring** | CO₂ saved + food waste diverted from landfill |
| 🌐 **4 Languages** | English · 中文 · Bahasa Malaysia · 日本語 |

---

## 🚀 Quick Start

### Option A — Run Locally (simplest)

1. Download `budget_chef_v4.html`
2. Open in any browser
3. Enter your [Anthropic API key](https://console.anthropic.com/keys) in the key bar at the top
4. Your key is saved in `localStorage` — never sent anywhere except directly to Anthropic

```
No server needed. No install. Just open the file.
```

---

### Option B — GitHub Pages (public, key protected)

Use this if you want to share the app with others without exposing your API key.

#### Step 1: Deploy the Cloudflare Worker

1. Go to [dash.cloudflare.com](https://dash.cloudflare.com) → Workers → Create Worker
2. Paste the contents of `worker.js`
3. Go to **Settings → Variables → Add Secret**:
   - Name: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...your key...`
4. (Optional) Create a **KV namespace** called `KV` and bind it to enable rate limiting
5. Deploy — note your worker URL: `https://budget-chef.YOUR-NAME.workers.dev`

#### Step 2: Configure the HTML

Open `budget_chef_v4.html`, find the `<script>` tag and add one line at the very top:

```javascript
window.CLAUDE_PROXY_URL = 'https://budget-chef.YOUR-NAME.workers.dev';
```

When `CLAUDE_PROXY_URL` is set, the app routes all AI calls through your worker — **the API key is never in the HTML file**.

#### Step 3: Push to GitHub Pages

```bash
git init
git add budget_chef_v4.html
git commit -m "initial"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/budget-chef.git
git push -u origin main
```

Then in your repo: **Settings → Pages → Source: main branch → / (root)**

Your app will be live at: `https://YOUR-USERNAME.github.io/budget-chef/budget_chef_v4.html`

---

### Option C — Self-hosted Server

If you have a VPS (nginx / Node / etc.), set the API key as an environment variable and modify `worker.js` into a simple Express proxy:

```js
// server.js (Node + Express)
app.post('/api/chat', async (req, res) => {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: { 'x-api-key': process.env.ANTHROPIC_API_KEY, 'Content-Type': 'application/json', 'anthropic-version': '2023-06-01' },
    body: JSON.stringify(req.body)
  });
  res.json(await response.json());
});
```

Set `window.CLAUDE_PROXY_URL = 'https://your-domain.com/api/chat'` in the HTML.

---

## 📁 File Structure

```
budget-chef/
├── budget_chef_v4.html   # The entire app (single file)
├── worker.js             # Cloudflare Worker proxy (Option B)
└── README.md
```

---

## 🔑 API Key Safety

| Scenario | Key location | Risk |
|---|---|---|
| Local use (Option A) | Browser `localStorage` | Low — your machine only |
| GitHub Pages + Worker (Option B) | Cloudflare secret | Very low — never in HTML |
| Key hardcoded in HTML | Source code | ❌ **Don't do this** |

---

## 🛠 Tech Stack

- **Pure HTML/CSS/JS** — zero dependencies, zero build step
- **Claude claude-sonnet-4** via Anthropic API
- **Cloudflare Workers** (optional proxy)
- **localStorage / sessionStorage** for key + history persistence

---

## 🌏 Supported Regions

| Country | Cities |
|---|---|
| 🇲🇾 Malaysia | Kuala Lumpur, Petaling Jaya, Penang, Johor Bahru, Bangi, Kota Kinabalu |
| 🇨🇳 China | Shanghai, Chengdu, Beijing, Guangzhou, Shenzhen, Xi'an |
| 🇯🇵 Japan | Tokyo, Osaka, Kyoto |
| 🇸🇬 Singapore | Singapore |
| 🇬🇧 UK | London, Manchester |

Don't see your city? Type it anyway — the app fuzzy-matches to the nearest regional profile.

---

## 📝 License

MIT — do whatever you want with it.

---

*Built with Claude · Anthropic API · No frameworks harmed in the making of this app*
