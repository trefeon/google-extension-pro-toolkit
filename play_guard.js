/* Google Extension Pro Toolkit — Checkout dialog price guard
 * Reads terms in Play checkout iframe: green bar = free trial / safe to proceed, red bar = charged / do not proceed.
 */
(() => {
  if (window.__GAPT_GUARD || window.top === window) return; // Only execute within subframe
  window.__GAPT_GUARD = true;

  const FREE_WORDS = ["free trial", "start your free trial", "us$0.00", "us$0,00", "$0.00", "$0,00", "0.00", "0,00", "€0.00", "won't be charged", "no charge", "free of charge", "free"];
  const PAID_WORDS = ["/mo after", "/month after", "per month after", "pay now", "charged today", "due today", "billed today"];

  let bar = null;
  function paint(kind, text) {
    if (!document.body) return;
    if (!bar) {
      bar = document.createElement("div");
      bar.style.cssText = "position:fixed;left:0;right:0;top:0;z-index:2147483647;padding:10px 14px;" +
        "font:13px/1.5 -apple-system,Segoe UI,Roboto,sans-serif;text-align:center;font-weight:600;";
      document.body.appendChild(bar);
    }
    bar.style.background = kind === "ok" ? "#1a7f37" : (kind === "bad" ? "#c62828" : "#616161");
    bar.style.color = "#fff";
    bar.textContent = text;
  }

  function judge() {
    let t = "";
    try {
      t = (document.body && document.body.innerText || "").toLowerCase();
    } catch (e) {
      return;
    }
    if (!t || t.length < 5) return;
    const free = FREE_WORDS.some((w) => t.includes(w.toLowerCase()));
    const paid = PAID_WORDS.some((w) => t.includes(w.toLowerCase()));

    if (free && !paid) {
      paint("ok", "✅ Free trial detected — Safe to subscribe (please verify total is $0.00)");
    } else if (paid && !free) {
      paint("bad", "❌ Free trial not detected (potential charge) — Do not subscribe, switch tier and retry");
    } else if (free && paid) {
      paint("warn", "⚠️ Terms contain both free and paid text — Please manually verify amount before subscribing");
    } else {
      paint("warn", "… Price terms not identified (loading checkout details...)");
    }
  }

  setTimeout(judge, 1200);
  setTimeout(judge, 3000);
  setTimeout(judge, 6000);
  try {
    const mo = new MutationObserver(() => judge());
    document.addEventListener("DOMContentLoaded", () => mo.observe(document.body, { childList: true, subtree: true, characterData: true }));
  } catch (e) {}
})();
