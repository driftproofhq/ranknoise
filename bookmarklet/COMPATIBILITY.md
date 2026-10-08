# Bookmarklet compatibility — 8 October 2026

The self-contained URL is approximately 51 KB. No remote loader is used. It was tested with installed headless Chrome using CDP `Page.navigate` to its `javascript:` URL; this is not a manual bookmark click and does not establish compatibility with every browser/version.

| Site | Supported views | Live result | CSP observed |
|---|---|---|---|
| aider.chat | Polyglot | Overlay opened | No CSP header; no block observed |
| www.swebench.com | Full, Lite, Multilingual, Multimodal, Verified bash-only, Verified all agents | Overlay opened | No CSP header; no block observed |
| www.tbench.ai | Terminal-Bench 4.0 | Overlay opened | No CSP header; no block observed |
| labs.scale.com | SWE-bench Pro V2 Full | Overlay opened | No CSP header; no block observed |

**Known CSP-blocked sites in this test: none.** Future CSP changes, enterprise policies, browser URL limits and pages without accessible table data can prevent operation. A browser blocking JavaScript before it runs cannot display the script’s error message. When the reader runs but cannot parse its supported table, it alerts exactly “can't read this page”.

Only the documented versions and paths are supported. Pro HARD and other Terminal-Bench versions fail closed. On SWE-bench, all six supported embedded views are shown, regardless of the tab currently displayed. No launch-post reader is provided.

All nine readers also passed against hash-verified original archived HTML offline: 129 exact numeric/identifier rows, interval endpoints and available binary outcome maps. See `tests/live-browser-results.json` for timestamped live results. Valid new paired-outcome patterns are computed locally using the frozen PCG64 bootstrap; see the README.
