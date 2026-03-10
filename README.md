# 🍳 Budget Chef · 月底救星

> *What can I afford to cook tonight?*  
> A hyper-localised, AI-powered meal planner that works backwards from your remaining budget.

![Languages](https://img.shields.io/badge/languages-EN%20%7C%20中文%20%7C%20BM%20%7C%20日本語-blue)
![Regions](https://img.shields.io/badge/regions-15%2B%20cities-green)
![Free](https://img.shields.io/badge/free-100%25-brightgreen)

## 🌐 Live Demo

**👉 [Try it here](https://09yukk.github.io/BudgetChef-Global/budget_chef_v4.html)**

Bring your own [Anthropic API key](https://console.anthropic.com/keys) — it's stored only in your browser, never on any server.

---

## ✨ Features

| Feature | Detail |
|---|---|
| 🌍 **15+ City Profiles** | Shanghai, Chengdu, KL, Penang, Bangi, Tokyo, Osaka, Singapore, London… each with local cuisine, staple condiments & seasonal produce |
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

## 🚀 How to Use

1. Open the **[live demo](https://09yukk.github.io/BudgetChef-Global/budget_chef_v4.html)**
2. Click **🔑 Add API Key** in the top right
3. Paste your Anthropic API key (`sk-ant-...`) → [Get one free here](https://console.anthropic.com/keys)
4. Fill in your budget, location, what's in your fridge
5. Click **✦ Generate My Meal Plan**

Your API key is saved in your browser's `localStorage` — it never leaves your device except to go directly to Anthropic.

---

## 🌏 Supported Regions

| Country | Cities |
|---|---|
| 🇲🇾 Malaysia | Kuala Lumpur, Petaling Jaya, Penang, Johor Bahru, Bangi |
| 🇨🇳 China | Shanghai, Chengdu, Beijing, Guangzhou, Xi'an |
| 🇯🇵 Japan | Tokyo, Osaka, Kyoto |
| 🇸🇬 Singapore | Singapore |
| 🇬🇧 UK | London, Manchester |

Don't see your city? Type it anyway — the app fuzzy-matches to the nearest regional profile.

---

## 🛠 Run Locally

No install needed. Just download `budget_chef_v4.html` and open it in any browser.

```bash
git clone https://github.com/09yukk/BudgetChef-Global.git
cd BudgetChef-Global
open budget_chef_v4.html   # or double-click the file
```

---

## 📁 Files

| File | Purpose |
|---|---|
| `budget_chef_v4.html` | The entire app — single file, zero dependencies |
| `worker.js` | Optional Cloudflare Worker proxy (for self-hosted deployments) |

---

## 📝 License

MIT — do whatever you want with it.

---

*Built with Claude · Anthropic API · No frameworks harmed in the making of this app* 🍳
