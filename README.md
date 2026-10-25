# ZENVIX AUTOMATION — Marketing Website

A complete, responsive marketing website for **ZENVIX AUTOMATION** built with vanilla HTML, CSS, and JavaScript featuring a restrained 1990s retro visual aesthetic with square corners, 2px beveled borders, retro panel title bars, and an interactive top runner animation strip.

---

## 1. Local Preview Instructions

This project requires **no build step** or external dependencies. It runs directly as standard static HTML files.

### Option A: Using Python's built-in HTTP server
Run the following command from the project root:
```bash
# Python 3
python -m http.server 8000
```
Open your browser and navigate to: `http://localhost:8000/`

### Option B: Using Node.js `npx serve` or `http-server`
```bash
npx serve .
# or
npx http-server -p 8000
```

### Option C: VS Code Live Server
Open the repository in VS Code, right-click `index.html`, and select **Open with Live Server**.

---

## 2. Static-Host Deployment Instructions

The website can be deployed to any static web host or CDN (e.g., Cloudflare Pages, GitHub Pages, Netlify, Vercel, AWS S3 / CloudFront).

### Clean URLs / Route Configuration
Every page is organized as a dedicated directory containing an `index.html` file (e.g., `/services/index.html`, `/demo/index.html`, `/services/whatsapp-ai-chatbots/index.html`).

- **Cloudflare Pages / Netlify / Vercel**: Directories and URLs ending with trailing slashes (e.g. `/services/`) are resolved automatically without extra configuration.
- **Apache**: By default, `DirectoryIndex index.html` will serve each folder.
- **Nginx**: Ensure your `try_files` directive supports directories:
  ```nginx
  try_files $uri $uri/ =404;
  ```

---

## 3. Where to Change Business & Contact Details

All business and contact details are centralized in **`assets/js/config.js`**:
```javascript
const CONFIG = {
  businessName: "ZENVIX AUTOMATION",
  tagline: "Innovation in Motion",
  founder: "Kunal Jha",
  coFounder: "Ashish Chettri",
  location: "Siliguri, West Bengal, India",
  whatsappNumber: "918509352128",
  phones: [
    { display: "+91 85093 52128", raw: "+918509352128" },
    { display: "+91 89063 67958", raw: "+918906367958" }
  ],
  email: "zenvixautomation@gmail.com",
  defaultWhatsAppMessage: "Hi Zenvix, I’d like to know more about your automation services.",
  ...
};
```
To update details, edit `assets/js/config.js` and verify static fallbacks in HTML headers/footers.

---

## 4. Where to Add Logo & Screenshots

### Logo
- Currently, "Zenvix" renders as a dark navy wordmark in **DM Serif Display** with system-font fallbacks.
- When an official vector or raster logo is supplied:
  1. Place the logo file into `assets/icons/logo.svg` (or `logo.png`).
  2. In the header and footer of each HTML file, replace `<span class="logo-wordmark">Zenvix</span>` with `<img src="/assets/icons/logo.svg" alt="Zenvix Automation" class="site-logo-img">`.

### Work Screenshots
The repository expects screenshots at these exact paths:
- `assets/work/star-gym.png` (Star Gym & Fitness)
- `assets/work/dannys.png` (Danny's Fitness Studio)

When these images are not yet provided, an accessible retro placeholder displaying **"Screenshot coming soon"** is shown automatically using an `onerror` fallback. Once the actual PNGs are added to `assets/work/`, they will appear instantly in the beveled picture frames.

---

## 5. Where to Add Production Domain & Social Preview

Before production launch:
1. **Canonical URLs & Open Graph:** In all `<head>` sections, add your final production domain:
   ```html
   <link rel="canonical" href="https://yourdomain.com/">
   <meta property="og:url" content="https://yourdomain.com/">
   <meta property="og:image" content="https://yourdomain.com/assets/images/og-preview.png">
   ```
2. **LocalBusiness JSON-LD:** Update the `@id` or `url` property in `index.html` schema once your domain is live.

---

## 6. Interactive Features & Aria AI Chat Simulator

The website includes three custom vanilla JavaScript interactive experiences:

### A. Aria AI Chat Simulator (`assets/js/retro-chat.js`, `assets/css/retro-chat.css`)
- **Location:** Featured on `/demo/` and `/work/star-gym/`.
- **Aesthetic:** Windows 95 / retro messenger window chrome (`ZENVIX_CHAT_95.EXE`) with high-contrast accessible messaging cards.
- **Voice Synthesis:** Real-time speech synthesis using the browser's native **Web Speech API (`speechSynthesis`)**, complete with animated pixel mouth movement and audio VU frequency bars. Includes `[ 🔊 Voice: ON / OFF ]` toggle.
- **Gym Automation Flow:** Simulates Star Gym & Fitness (9 branches) WhatsApp member intake:
  - Transparent pricing breakdown cards (Monthly ₹1,499, Quarterly ₹3,999, Annual VIP ₹11,999).
  - Free 1-Day Trial Demo Session inquiry and booking intake.
  - Dynamic generation of a verified **VIP Demo Pass ticket** (`#SG-DEMO-8842`) with barcode and WhatsApp confirmation.
- **Interactivity:** Visitors can type questions directly in the text input, tap quick prompt chips (`💰 Pricing Plans`, `🏋️ Book Free Demo`, `📍 Gym Branches`, `🎟️ Get VIP Pass`), or click `[ ▶ Auto-Play Demo ]` to watch the automated flow.

### B. 3-Step Demo Request Installer Wizard (`assets/js/wizard.js`)
- Step-by-step Windows-installer-style form to configure services, time preferences, and meeting mode with zero external dependencies, directly generating formatted WhatsApp dispatches.

### C. Retro 8-Bit Runner Animation Strip (`assets/js/main.js`)
- Synchronized canvas/CSS top strip featuring pixel character jumping over obstacles, with pause/play controls and `prefers-reduced-motion` accessibility support.

---

## 7. Architecture & Directory Structure

```
Zenvix/
├── index.html                           # Homepage (7 full sections)
├── favicon.svg                          # Original pixel 'Z' favicon
├── README.md                            # Documentation
├── assets/
│   ├── css/
│   │   ├── style.css                    # 1990s retro design system & responsive layout
│   │   └── retro-chat.css               # Retro WhatsApp / AI chat simulator styling
│   ├── js/
│   │   ├── config.js                    # Business details & WhatsApp link helper
│   │   ├── main.js                      # Mobile nav, top runner controls, link binder
│   │   ├── wizard.js                    # 3-step installer demo wizard
│   │   └── retro-chat.js                # Interactive AI chat simulator with Web Speech voice
│   ├── icons/                           # Handcrafted pixel-style SVG icons
│   │   ├── chat.svg
│   │   ├── coexistence.svg
│   │   ├── language.svg
│   │   ├── workflow.svg
│   │   ├── crm.svg
│   │   ├── website.svg
│   │   ├── seo.svg
│   │   ├── marketing.svg
│   │   ├── whatsapp.svg
│   │   ├── phone.svg
│   │   ├── mail.svg
│   │   ├── location.svg
│   │   ├── runner.svg
│   │   ├── obstacle.svg
│   │   └── hero-diagram.svg
│   └── work/                            # Portfolio screenshots directory
│       ├── star-gym.png                 # (Owner-supplied)
│       └── dannys.png                   # (Owner-supplied)
├── services/
│   ├── index.html                       # Services directory
│   ├── whatsapp-ai-chatbots/index.html  # Dedicated service page 1
│   ├── whatsapp-coexistence/index.html  # Dedicated service page 2
│   ├── multilingual-bots/index.html     # Dedicated service page 3
│   ├── n8n-workflow-automation/index.html # Dedicated service page 4
│   ├── custom-crm/index.html            # Dedicated service page 5
│   ├── website-building/index.html      # Dedicated service page 6
│   ├── seo/index.html                   # Dedicated service page 7
│   └── digital-marketing/index.html     # Dedicated service page 8
├── work/
│   ├── index.html                       # Portfolio directory
│   ├── star-gym/index.html              # Star Gym & Fitness project page
│   └── dannys-fitness-studio/index.html # Danny's Fitness Studio project page
├── languages/
│   └── index.html                       # Languages & regional greeting samples
├── about/
│   └── index.html                       # About Zenvix, founders & philosophy
├── demo/
│   └── index.html                       # 3-step retro installer demo wizard
└── contact/
    └── index.html                       # Contact directory & WhatsApp dispatch
```

---

## 8. Missing Assets and Pending Client Inputs

The following assets must be supplied by the business owner:
- [ ] Official ZENVIX AUTOMATION graphic logo (if a custom emblem is desired instead of the current Serif wordmark).
- [ ] High-resolution screenshot of Aria AI WhatsApp bot for Star Gym & Fitness (`assets/work/star-gym.png`).
- [ ] High-resolution screenshot of Danny's Fitness Studio website (`assets/work/dannys.png`).
- [ ] Production web domain configuration for canonical tags and social preview cards.
