# Google Extension Pro Toolkit

A clean, lightweight Manifest V3 Chrome extension toolkit that injects promotional offer tokens into Google One acquisition flows and provides real-time price safety verification during Google Play checkout.

---

## Key Features

- **Promotional Offer Token Injection:** Injects verified promotional campaign offer tokens (`g1.2tb.ai.subs_variant`) into Google Play acquisition RPC requests (`/eacquire/multiline` & `Ngbm` RPC payload) to activate promotional subscription terms.
- **Multi-Tier Offer Profiles:**
  - **Tier 1:** 12 Months (1 Year) Promotional Trial ($0.00 initial period)
  - **Tier 2:** 6 Months Promotional Offer (Stack variant)
  - **Tier 3:** 6 Months Promotional Offer (Standard variant)
  - **Tier 4 / Backup:** 6 Months Fallback variant
- **Real-Time Checkout Price Guard:** Live DOM inspector embedded in the `tokenized.play.google.com` checkout modal:
  - 🟢 **Green Banner:** Confirms verified free trial terms ($0.00 charged today).
  - 🟡 **Yellow Banner:** Detects mixed or pending terms — prompts manual verification.
  - 🔴 **Red Banner:** Warns immediately if unexpected recurring paid terms appear.
- **Strict CSP & Trusted Types Compliance:** Written using native DOM manipulation and attribute-safe methods to satisfy Google One's strict TrustedHTML and script-execution policies.
- **100% Client-Side Privacy:** Operates entirely within your local browser. Zero analytics, zero telemetry, and zero outbound network calls outside of Google's own endpoints.

---

## Prerequisites

1. **Chromium-based Browser:** Google Chrome, Brave, Chromium, or Microsoft Edge.
2. **US Egress IP:** Google Play promotional SKUs require a United States IP address (e.g. via VPN, WireGuard exit node, or proxy).
3. **Google Account with US Billing Profile:** A payment card attached to a US tax-free billing address (e.g. Portland, Oregon ZIP **97201**).

---

## Installation

1. Clone or download this repository:
   ```bash
   git clone https://github.com/trefeon/google-extension-pro-toolkit.git
   ```
2. Open your browser and navigate to:
   ```text
   chrome://extensions/
   ```
3. Enable **Developer mode** toggle in the top-right corner.
4. Click **Load unpacked** in the top-left corner.
5. Select the repository root folder (`google-extension-pro-toolkit`).
6. Pin **Google Extension Pro Toolkit** to your browser toolbar for quick access.

---

## Step-by-Step Usage Walkthrough

1. **Connect to US Egress:** Verify your browser IP egress resolves to the United States before loading Google One.
2. **Navigate to Plans:** Open `https://one.google.com/plans`. Ensure the billing toggle at the top is set to **Monthly**.
3. **Select Promotional Tier:**
   - Click the extension icon in your toolbar.
   - Select **Tier 1 · 12 Months (1 Year)**.
   - Refresh the page. Confirm the bottom-right badge displays: `Injection active · 12 Months (1 Year)`.
4. **Trigger Checkout Flow:** Click **Get discount** on the **Google AI Pro (2 TB)** card (the rightmost plan card).
5. **Inspect the Checkout Price Guard:**
   - When the Play checkout modal opens, check the top sticky banner.
   - Confirm it shows green: `✅ Free trial detected — Safe to subscribe (please verify total is $0.00)`.
6. **Confirm Subscription:** Select your payment card with US billing address and confirm today's total is **$0.00** before clicking **Subscribe**.
7. **Manage Renewal:** To prevent unwanted recurring billing after your promotional period ends, manage your subscription at [Google Play Subscriptions](https://play.google.com/store/account/subscriptions) and cancel auto-renewal.

---

## Extension Architecture

```text
google-extension-pro-toolkit/
├── manifest.json            # Manifest V3 configuration & permission declarations
├── popup.html               # Extension action popup interface
├── popup.js                 # Tier selection controller & storage sync
├── content.js               # Isolated-world content script (relays config & state)
├── inject.js                # Main-world script (XHR & URL rewrite interceptor)
├── play_guard.js            # Main-world script in checkout frame (price safety inspector)
├── icons/                   # High-DPI extension icons (16px, 48px, 128px)
├── .github/workflows/       # GitHub Actions CI & packaging workflows
├── .gitignore               # Clean repository gitignore rules
├── LICENSE                  # MIT License
└── README.md                # Project documentation
```

### Security & Permission Breakdown

| Permission / Host | Purpose |
| :--- | :--- |
| `storage` | Stores your selected tier preference locally (`chrome.storage.local`). |
| `https://one.google.com/*` | Intercepts acquisition requests to apply promotional offer tokens. |
| `https://tokenized.play.google.com/*` | Inspects checkout iframe DOM to verify free trial pricing terms. |
| `https://play.google.com/*` | Ensures seamless checkout redirection and fallback handling. |

---

## Disclaimer

This toolkit is provided for research, testing, and educational purposes regarding web acquisition flows, Trusted Types compliance, and client-side request interception in Chromium Manifest V3 extensions. Users are responsible for complying with Google's Terms of Service and applicable policies.

---

## License

Released under the [MIT License](LICENSE).
