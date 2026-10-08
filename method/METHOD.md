Frozen 2026-10-07 Asia/Singapore — SHA-256 of body bytes after this first line: 484ab55714e4364e3a8e66ae3ce6fe67a45d18294b7cf2b4c336aa97950f925c
# Preregistered analysis protocol

Frozen before downloading or inspecting leaderboard/release benchmark scores. Analysis cutoff: 2026-10-07, Asia/Singapore. Public, read-only research; no model calls, account credits, contact or publication. Retrieval timestamps will be UTC and the analysis date will use Asia/Singapore.

## Integrity convention

The first line records the SHA-256 of all bytes after that line, including the following newline. A file cannot generally contain its own whole-file hash; METHOD.sha256 separately records the whole-file hash. Neither frozen file will be edited. Dated corrections go in METHOD_NOTES.md and must explain any effect on selection or analysis. No score-dependent method changes.

## Population and selection

Inventory every requested source: SWE-bench Verified and newer official variants, Aider polyglot, Terminal-Bench/Harbor, ARC-AGI, LiveBench, HELM, Hugging Face Open LLM Leaderboard/successor, Artificial Analysis, plus benchmarks in the release cohort. LMArena is inventoried separately and excluded because it already publishes confidence intervals and its preference ratings are not N-question binomial scores.

For each available official leaderboard with an identifiable fixed question set and interpretable question-level pass proportion, select every adjacent pair among its first 15 published ranked entries at retrieval (14 pairs when 15 entries exist). Retain ties and distinct published configurations; do not collapse vendor/model variants. If fewer entries exist, use all adjacent pairs. Preserve the published default ranking/filter, not a custom selection. Separate official benchmark versions and tracks; do not pool them. A leaderboard's default displayed track is mandatory; add the explicitly requested Verified/newer, polyglot, Terminal-Bench and ARC tracks when each has an official distinct table. Record the exact track and date. Do not reorder a table by a secondary metric. Missing eligible data are recorded, not replaced with handpicked models.

Release cohort: the six most recent distinct public frontier general-purpose model-family announcements on or before the cutoff, across vendors. Search official announcement/news pages and corroborating discovery searches across the major frontier vendors; record the candidate chronology and inclusion/exclusion reasons. A same-day multi-model family launch is one announcement. Exclude pricing-only, availability-only, fine-tunes, specialist-only releases and silent leaderboard additions. Date ties are ordered by full published timestamp, then canonical URL. For each selected announcement, take every benchmark row in its main headline comparison table and every explicit comparator model column against the announced model(s). Do not select only favorable cells. If several tables are equally prominent, include all general capability headline tables, preserving protocol/effort labels. Record missing, image-only, inaccessible and non-binomial rows separately. No claim that a missing comparison is zero.

Question counts must come from the benchmark's own paper, repository or official dataset documentation, with the exact version/split. Unknown or ambiguous N excludes a row from results.csv. Weighted composite indexes, Elo, latency, cost, percentile ranks, continuous judge scales and incompatible protocols are inventoried but excluded from binomial inference. A bounded average is not automatically a Bernoulli success rate. Scores averaged over published runs may get explicitly labeled working-binomial intervals using the number of distinct questions, never N multiplied by runs; these are sensitivity summaries, not exact binomial confidence claims. Record rounding precision and never imply fractional 'gap in questions' is an observed integer count.

## Item noise

Use fractions p in [0,1], N distinct questions and z=1.959963984540054. Wilson 95% interval:

D=1+z²/N; C=(p+z²/(2N))/D; H=z*sqrt(p(1-p)/N+z²/(4N²))/D; interval=[C-H,C+H].

For independent two-model comparison, use the Newcombe hybrid Wilson interval (no continuity correction). Let d=pA-pB and Wilson bounds LA,UA,LB,UB. Difference interval:

[d-sqrt((pA-LA)²+(UB-pB)²), d+sqrt((UA-pA)²+(pB-LB)²)].

Report gap d, percentage points 100d and gap in questions Nd. 'separated' iff the difference interval excludes zero strictly; otherwise 'no separation detected at this sample size'. Independence is a working assumption even when questions coincide; unknown within-question dependence prevents pretending this is a paired result. Intervals describe sampling of benchmark questions under an iid working model, not uncertainty in the arithmetic on a fixed published test set, representativeness, contamination, or run-to-run stochasticity.

## Paired data

Match both models on exact benchmark version, question identifier, protocol and run/attempt definition. No silent intersection-only comparison: record missing IDs and restrict a separately labeled paired result to common valid items, stating Npaired. One binary outcome per question per model is required. Prefer the full matched set to headline approximation.

Let b=count(A pass,B fail), c=count(A fail,B pass). Exact two-sided McNemar p=min(1,2*P[Binomial(b+c,0.5)<=min(b,c)]); if b+c=0, p=1. Paired bootstrap: resample question pairs with replacement, 100,000 replicates, numpy PCG64 seed 20261007, percentile 2.5% and 97.5% interval on mean(A-B). Use multinomial sampling of the four outcome counts, which is equivalent to resampling pairs for this statistic. 'separated' only if p<0.05 and the paired interval excludes zero; otherwise 'no separation detected at this sample size'. Report disagreement between tests. Paired inference takes precedence over independent inference where valid paired data exist; retain both columns for audit.

If fewer than two distinct candidate sources expose usable public per-question data for comparisons, state this and complete item-noise analysis only, per the requested stop rule. Merely publishing questions without model outcomes does not qualify. Different tracks of one provider do not by themselves constitute two sources.

## Run noise

Repeated runs must be the same model/configuration on the same questions under the same protocol. Different models, prompts, temperatures, best-of budgets or question samples are not repeat draws. For at least two runs in EACH arm, calculate model mean and sample SD (ddof=1), or use a source's explicitly reported mean and SD with its definition and run count. Do not infer SD from an unspecified error bar or standard error. Bands are mean ± one SD, untruncated. 'separated' iff bands do not overlap (strict inequality); otherwise 'no separation detected at this sample size'. With insufficient repeated runs in either arm: 'not enough draws to tell'. This band rule is descriptive, not a 95% significance test. No repeats never means 'no difference'.

## Minimum detectable gap

There is no single baseline-independent smallest gap: precision depends on p, pairing and repetition. To provide a reproducible benchmark-level threshold, report a conservative item-noise resolution at N: the smallest integer gap k/N for which the independent Newcombe interval excludes zero at the most uncertain, midpoint-centered pair of integer success counts (B=floor((N-k)/2), A=B+k). Search k=1..N by binary search; inspect the boundary. Report k questions and 100k/N percentage points. This is a conservative 95% interval-exclusion threshold near 50%, not an 80%-power minimum detectable effect and not a paired or run-noise threshold. Also retain each pair's actual interval verdict; a gap below the benchmark's conservative threshold can still separate near 0% or 100%.

## Sanity check computed by hand

Textbook binomial example: 50 successes in 100 trials. z²=3.841458820694124; D=1.0384145882069412; C=0.5; H=(1.959963984540054*sqrt(0.0025+0.0000960364705173531))/1.0384145882069412=0.0961684696340044. Wilson interval=[0.4038315303659956,0.5961684696340044]. The script must assert each endpoint matches within 1e-12. For two identical such proportions, the independent interval is ±sqrt(2)*H, containing zero. These are synthetic validation values, not inspected study outcomes. Log the code-versus-hand check in the results artifacts.

## Provenance and outputs

Download every raw numeric/identifier artifact used and preserve original bytes. sources.csv records source_id, URL, UTC retrieval datetime, SHA-256, local filename and contents description. Prefer numeric JSON/CSV/result matrices without prompts or answers. Do not copy question text, model answers, article prose or images into deliverables. For tables only available embedded in pages, keep original response bytes locally as raw evidence, extract only numbers/identifiers into analysis, and record this necessary distinction in inventory; do not claim an extraction is the original response. Limit any redistributable source text; link primary documentation for N and release identity. Record dynamic snapshot limitations and inaccessible files honestly.

Scripts regenerate results.csv from raw evidence and explicit extraction specifications. Rows include source/date/track/N/models/scores/gap/questions/Wilson intervals/independent difference interval and verdict/paired N,b,c,p,interval,verdict/run counts,means,SDs,bands,verdict/minimum detectable gap/provenance IDs/rounding and protocol notes. Missing statistics are blank, never zero.

FINDINGS.md counts pairs, item verdicts, paired coverage and sources publishing repetitions; separates source-level availability from usable paired draws. It includes a benchmark threshold table, five examples chosen deterministically (largest positive lower-bound margin among separated pairs, then largest absolute unresolved gaps; ties by source/benchmark/model identifiers), primary URLs, one SVG and PNG interval chart per included leaderboard and a release-gap-in-questions chart. Headings do not name vendors. Tone is neutral: absence of detected separation is not equality or misconduct. No unqualified claim that all uncertainty is explained by question sampling. No multiplicity correction in the requested pointwise analysis; explicitly say 95% per-pair intervals do not give 95% simultaneous coverage over all comparisons. Include a Holm correction sensitivity for available paired p-values, without changing preregistered verdicts.

Credit exactly: "Method per the Driftproof paper (driftproofhq.com/paper; Zenodo DOI on that page): the band rule and the verdict words." The page identifies version DOI 10.5281/zenodo.23050796. Wilson/Newcombe/McNemar/bootstrap choices here are the prespecified statistical implementation, not claims that all were introduced in that paper.

## Resource boundary

Use available plan capacity only. Check account usage periodically. Do not use reset credits or model APIs. If the remaining plan allowance is exhausted or too close to exhaustion to continue safely, stop with a checkpoint and prompt the user to resume after reset. Do not silently use paid overage. A budget checkpoint is incomplete work, not a final scientific result.
