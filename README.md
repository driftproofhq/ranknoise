# RankNoise

Leaderboard scores come with sampling noise. RankNoise shows which published gaps are larger than that noise, using only the numbers each source itself published.

It covers nine leaderboard snapshots and six frontier launch posts. Each entry gets a card with the published score, an uncertainty interval where one can be computed or was published, and a verdict on whether the entry is distinguishable from the first entry in its benchmark table. The write-up built on this data is at https://driftproofhq.com/leaderboard-noise/ and the method is credited to the Driftproof paper (https://driftproofhq.com/paper/).

## What is in this repo

- `index.html`: the static overlay page. Self-contained HTML, CSS and JavaScript, with no framework, build requirement, analytics or network calls. Open it directly.
- `bookmarklet/`: the same checks on live leaderboards. Self-contained (about 51 KB of URL text), no loader or remote script; it reads the page DOM, draws an isolated overlay, and sends nothing.
- `method/`: the frozen protocol. `METHOD.md` is unchanged since it was hashed (`METHOD.sha256`), and `method/SCORE_TYPES.md` is the dated pre-publication audit of score types, interval rules and limitations. Frozen results are not silently replaced; corrections arrive as dated files.
- `data/`: one JSON file per card, with the model, score, sample size, source URL, snapshot timestamp and a hash of the archived source HTML. No third-party HTML or PDFs are committed.
- `results.csv`: the per-comparison results behind the write-up, one row per quoted gap.
- `src/`, `tests/`, `scripts/`: the interval code, offline tests (Node.js, no network) and an optional build script that repacks local data into the page and bookmarklet.

## Install the bookmarklet

1. Open `bookmarklet/install.html` locally.
2. Drag RankNoise to the browser's bookmarks bar, or create a bookmark and paste the complete URL from `bookmarklet/bookmarklet.txt`, including `javascript:`.
3. Open a supported leaderboard, wait for its table, and click the bookmark. Supported: Aider polyglot, the six SWE-bench views, Terminal-Bench 4.0 and SWE-bench Pro V2 Full.
4. Click Close RankNoise, or click the bookmark again, to remove the overlay.

If a site has changed its page structure, the overlay says it can't read the page rather than guessing.

## How to read a card

- "Separated" means the gap is larger than the applicable interval.
- "No" means separation is not established by the published data. That is not a finding that two entries are equal; it means the data cannot tell them apart.
- "No*" marks insufficient data, not a measured null result.
- Missing intervals are drawn as unfilled dots.
- Ranks are positions in the saved selection; source ties keep their order. Scores from different benchmarks are never ranked against each other.

## Which interval gets used

In priority order: paired or per-item evidence where the source provides it; an interval the source itself published for repeated runs; a Wilson or Newcombe interval where the score is an interpretable binary rate over a known item count; otherwise the comparison is marked as not calculable from published data. Multiplying item counts by attempt counts to manufacture precision is prohibited. Source-bar nonoverlap and reconstructed SE envelopes are sensitivity checks, not a joint 95% pairwise test. The full rules are in `method/SCORE_TYPES.md`.

## Verifying

- The offline tests run with Node.js and no network; the fixtures reproduce the saved results.
- `shasum -a 256 -c method/METHOD.sha256` checks that the frozen method file is unchanged.
- Every data file carries its source URL and the hash of the page as it was archived, so any card can be traced back and rechecked.

Built by Driftproof (https://driftproofhq.com). Issues and corrections welcome; a correction that changes a verdict gets a dated note rather than a silent edit.
