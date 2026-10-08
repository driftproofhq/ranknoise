DRAFT

RankNoise shows nine leaderboard snapshots and six launch-post cards from the R-9 audit. It displays published scores, applicable uncertainty intervals, and whether each entry is distinguishable from the first entry in its benchmark table. Two launch posts have effort curves but no eligible headline table; their cards say so.

Open `index.html` directly. It is self-contained HTML, CSS and JavaScript, with no framework, build requirement, analytics or network calls. Each card has an anchor. “No” means separation is not established. “No*” marks insufficient data, not a measured null result. Missing intervals are drawn as unfilled dots. Ranks are positions in the saved selection; source ties are retained in order. Scores from different benchmarks are not ranked together.

Method: **[piece URL — placeholder](#method-placeholder)**. `method/METHOD.md` is an unchanged copy of the frozen protocol, verified by `METHOD.sha256`. `method/SCORE_TYPES.md` is the dated pre-publication audit, including source-matched interval rules and limitations. Source-bar nonoverlap and reconstructed SE envelopes are sensitivity checks, not a joint 95% pairwise test. Frozen binomial results are not silently replaced.

## Install the bookmarklet

1. Open `bookmarklet/install.html` locally.
2. Drag **RankNoise** to the browser’s bookmarks bar. Alternatively create a bookmark and paste the complete URL from `bookmarklet/bookmarklet.txt`, including `javascript:`.
3. Open a supported leaderboard and wait for its table. Click the bookmark.
4. Click **Close RankNoise**, or click the bookmark again, to remove the overlay.

The bookmarklet is self-contained (about 39 KB URL text); no loader or remote script is used. It reads page DOM and embedded table data, draws an isolated overlay, and sends nothing. Nine readers cover four hosts: Aider, six SWE-bench views, Terminal-Bench 4.0 and Scale Pro V2 Full. Different benchmark versions/tracks, unavailable page data and changed schemas fail with “can't read this page”. On SWE-bench it shows all six supported views from the page’s embedded data, independent of the visible tab.

For valid paired item data, the bundle contains frozen-seed bootstrap results keyed by the complete four-cell outcome counts for the saved configurations. These are sufficient statistics for that bootstrap. A live comparison with a new valid paired count pattern is explicitly unavailable until the cache is regenerated; it does not silently fall back to an independent test. This is a live-coverage limitation. `scripts/cache_pairs.py` regenerates the cache offline using NumPy PCG64 seed 20261007 and 100,000 draws.

See `bookmarklet/COMPATIBILITY.md` and `tests/live-browser-results.json` for live test details and CSP limitations.

## Data and verification

`data/` contains one JSON file per card: model, score, N, source URL, original UTC snapshot timestamp, and SHA-256 of archived source HTML. Available binary outcome maps contain identifiers and booleans only. Numeric chart-source provenance is retained separately. No third-party HTML or PDF is committed. Scores use percentage units; interval endpoints use fractions.

Run formula tests with Node.js 18+:

```sh
node tests/formula.cjs
```

Run the nine original-HTML reader tests with Playwright installed and Chrome available:

```sh
R9_ARCHIVE=/path/to/original/work/leaderboard-noise/raw node tests/readers.cjs
```

Set `CHROME_PATH` if needed. The test verifies archived HTML SHA-256 values before comparing every extracted numeric/identifier row, interval and outcome map exactly. The original archive is intentionally external; a fresh clone alone cannot run these nine provenance tests. Offline tests do not call models.

The ten fixture IDs requested from driftproof-source issue #39 are present as **R-9-derived fixtures**. All Wilson/Newcombe endpoints match within 1e-12, with exact verdicts; available paired fixtures also match. **Acceptance is pending a direct comparison with issue #39**, which this session’s GitHub access could not read. Do not claim the issue fixtures were verified until that check is completed.

For maintainers, `python3 scripts/build.py` optionally repacks already-extracted local data into the ready-to-open page and bookmarklet. Users do not need to run it. The method link remains a placeholder. Maverick rewrites this draft before launch.
