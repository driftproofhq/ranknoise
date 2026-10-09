# Score types — pre-publication note, 8 October 2026

This is a dated audit and sensitivity check. METHOD.md and METHOD.sha256 are unchanged, and so is every frozen column of results.csv; on 9 October 2026 two columns were appended to it, `audited_verdict` and `audit_basis`, copied from SCORE_TYPE_SENSITIVITY.csv. The original result columns remain reproducible, including the expressly working-binomial approximation for averages; they must not be presented as correct repeated-run intervals.

Priority: valid paired/per-item evidence; matching published repeated-run interval; Wilson for interpretable binary item rates; otherwise **can’t calculate from published data**. Match evaluator, task version, harness, effort and score. A benchmark name alone is not a match. Never multiply N by attempts to create independent questions.

| Benchmark | N | Published score type | Source publishes interval? | Applicable interval / limitation |
|---|---:|---|---|---|
| [Aider polyglot](https://aider.chat/docs/leaderboards/) | 225 (one entry 224) | One evaluation per item, success after up to two sequential repair attempts; not independent pass@2 samples | No | Wilson / Newcombe; omit question count unless integer success counts can be recovered unambiguously |
| [SWE-bench Full](https://www.swebench.com/) | 2294 | Submitted binary resolved fraction; harness/budget varies | No | Wilson / Newcombe |
| [SWE-bench Lite](https://www.swebench.com/) | 300 | Submitted binary resolved fraction | No | Wilson / Newcombe |
| [SWE-bench Multilingual](https://www.swebench.com/) | 300 | Submitted binary resolved fraction; submitted per-item outcomes for some configurations | No | Matched McNemar + paired bootstrap where full IDs/protocol/headline agree; otherwise Wilson / Newcombe |
| [SWE-bench Multimodal](https://www.swebench.com/) | 517 | Original split, submitted binary resolved fraction; not v2 | No | Wilson / Newcombe |
| [SWE-bench Verified all agents](https://www.swebench.com/) | 500 | Submitted binary resolved fraction, differing agents | No | Matched McNemar + paired bootstrap when valid; otherwise Wilson / Newcombe |
| [SWE-bench Verified bash-only](https://www.swebench.com/) | 500 | Submitted binary resolved fraction, mini-SWE-agent configurations | No | Matched McNemar + paired bootstrap when valid; otherwise Wilson / Newcombe |
| [SWE-bench Pro V2 Full](https://labs.scale.com/leaderboard/swe_bench_pro_public_v2?tab=full) | 642 | Binary task resolution under locked protocol; number of repeated evaluations not stated in recovered V2 documentation | Yes: ± field; confidence level and construction not established | Wilson / Newcombe only as working item sensitivity. Do not relabel the source ± values as repeated-run 95% intervals. No question-count wording |
| [Terminal-Bench 4.0](https://www.tbench.ai/) | 66 | Official board: mean pass@1 over 5 trials/task (330 trials). Launch protocols differ: Claude 5/10/15; AA 3/task | Yes: numeric 95% half-widths on official board; Claude launch reports SE | Official matching 95% intervals first; source-SE reconstruction separately labeled. Never transfer board intervals to private AA or different efforts. Otherwise cannot calculate |
| [Terminal-Bench-Science 0.1](https://www.anthropic.com/claude-opus-5-5-system-card) | 70 | Official 3 trials/task; Opus launch 10 (Opus 5.5/Fable 5.1), 12 (Opus 5). Other launch protocols vary | Claude reports task-clustered SE 3.5–4.8pp; exact each-model values incomplete | Conservative source-SE envelope sensitivity where both arms known; otherwise cannot calculate |
| [Chartography](https://github.com/surge-ai/chartography) | 100 | Pass@1 averaged: official harness 10 epochs; Claude launch 5 runs; tool/no-tool protocols differ | Claude system-card graphs show 95% CI; public launch tables omit numeric limits | Matching source graph CI first (approximate, outward reading); otherwise cannot calculate from aggregates |
| [DeepSWE v1.1](https://artificialanalysis.ai/methodology/coding-agents-benchmarking/) | 113 | Per-task pass@1 averaged over trials: Claude 5; AA 3; native mini-swe and vendor harnesses differ | Native board shows ±; not interchangeable with AA/vendor configurations | No matching usable paired outcomes or complete source intervals for both launch arms recovered; cannot calculate |
| [Humanity's Last Exam](https://www.anthropic.com/claude-opus-5-5-system-card) | 2500 | Binary answer accuracy with model grading; launch runs with tools; repeat count not disclosed | Original benchmark has uncertainty; no matching launch interval recovered | Wilson / Newcombe working item interval; do not claim known single-run counts |
| [RiemannBench](https://arxiv.org/html/2604.06802v1) | 25 | Estimated pass@1 from 100 attempts/problem in benchmark paper; not a single run or pass@100 | No matching numeric interval recovered | Cannot calculate a repeat-aware interval from aggregate pass@1 alone |
| [GDP.pdf](https://arxiv.org/html/2607.11192v1) | 100 | Strict binary all-rubric task pass; paper single-run table differs from launch effort curves; curve repeat count unreported | Paper publishes Wilson 95% for its historical table, not the launch configurations | Launch curves: cannot calculate a repeat-aware interval from published aggregates; frozen working Wilson retained only as sensitivity |

## How this sensitivity is computed

Frozen Wilson/Newcombe and valid paired verdicts are retained for submitted binary item rates. For published marginal intervals, the conservative check is strict nonoverlap: difference range [LA−UB, UA−LB]. This range is **not a published 95% pairwise interval** and does not measure the same uncertainty as Wilson. A normal 1.959963984540054 × SE envelope is separately marked as reconstructed; use the largest stated SE when only a range is available. Do not call it source-published. Chartography graphical intervals are read outward by about 0.2 percentage points; exact numeric endpoints were not published. Near-boundary decisions are unresolved. These are sensitivity rules, not edits to the frozen method.

Terminal-Bench board rows expose accuracy_ci95_half_width; all selected rows contain 330 trials. No full matched single-binary-outcome matrix reproducing these averages was recovered. The archived Harbor row gives trial counts, not a usable frozen paired comparison.

## Verdict changes

All 617 original comparisons are listed in SCORE_TYPE_SENSITIVITY.csv, including every change to unavailable. The original results are not overwritten.

- **C0119** (Terminal-Bench 4.0, Opus 5.5 vs Fable 5.1): no separation detected at this sample size → separated. Conservative difference envelope [1.58, 19.62] pp.
- **C0120** (Terminal-Bench 4.0, Opus 5.5 vs Opus 5): no separation detected at this sample size → separated. Conservative difference envelope [5.08, 23.12] pp.
- **C0121** (Terminal-Bench 4.0, Opus 5.5 vs GPT-6 Astra): no separation detected at this sample size → separated. Conservative difference envelope [0.43, 16.57] pp.
- **C0131** (Chartography, Opus 5.5 vs Opus 5): no separation detected at this sample size → separated. Conservative difference envelope [1.30, 9.90] pp.

483 comparisons cannot support a repeat-aware verdict from the recovered published data; 175 had frozen “separated” verdicts. This is a withdrawal of an inferential claim, not evidence of equality. Exact IDs, models and reasons are in the sensitivity CSV.

**Terminal-Bench top cluster:** all 14 adjacent pairs remain unresolved. Rank 1 against saved positions 3–15 changes from unresolved to separated using the official 95% bars; position 2 remains unresolved. Saved positions differ from published tied ranks. Every changed pair is listed in TOP_CLUSTER_SENSITIVITY.csv.

## Mistral chart provenance

Artificial Analysis results quoted in Mistral’s launch post, run privately before the test sets were public. All eleven chart numbers were checked against both charts on 8 October 2026 and match (user-confirmed). C0158: Beam’s 44 is self-reported; the other bars are Artificial Analysis runs. The frozen separated verdict compares two kinds of score. The exact values stay frozen; COMPARISON_NOTES.json is the sidecar for C0154–C0162 because results.csv's frozen columns are not edited. C0154 and C0158 become unavailable under the repeat-aware audit. Neither imports Terminal-Bench’s unrelated official-board error bars.

## Source evidence

R-9 sources.csv identifies the original archived bytes. AUDIT_SOURCES.json identifies additional 8 October public methodology retrievals (HTML and system-card PDFs), including hashes. Opus system card: pp. 175, 178, 184, 199–202. Sonnet system card: pp. 110, 113, 118, 125–127. The launch system cards show why tool use and effort must be matched. Graph-readable intervals are not exact numeric fixtures. Remaining unknown run counts and undefined error-bar levels are disclosed above, not guessed.


Additional top-versus-first paired sensitivity flips: SWE-bench Multilingual positions 7 (Kimi K2.5), 8 (Claude 4.5 Sonnet), 9 (GPT 5.2 high); SWE-bench Verified bash-only positions 7 (GLM 5 high), 8 (GPT 5.2 high), 11 (Claude 4.5 Sonnet high). Each changes from independent unresolved to paired separated. Together with the thirteen Terminal-Bench flips there are nineteen top-versus-first changes. The complete top comparison audit is in TOP_CLUSTER_SENSITIVITY.csv.
