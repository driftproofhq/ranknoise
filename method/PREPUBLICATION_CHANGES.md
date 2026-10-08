# Pre-publication changes — 8 October 2026

## 1a

See SCORE_TYPES.md, all 617 rows in SCORE_TYPE_SENSITIVITY.csv, and TOP_CLUSTER_SENSITIVITY.csv. Four source-envelope flips: C0119, C0120, C0121, C0131. Terminal-Bench top-versus-positions 3–15: thirteen additional flips.

## 1b — every affected FINDINGS.md location

- Five separated examples: C0132 (39.80 questions), C0136 (46.00), C0129 (25.41), C0127 (20.79), C0122 (19.21): removed count wording; kept percentage-point gaps.
- Five unresolved examples: C0120 (9.31 questions), C0157 (−7.92), C0155 (7.26), C0159 (12.43), C0119 (7.00): removed count wording; kept percentage-point gaps.
- Examples introduction: removed promise of question equivalents.
- Item-resolution table / explanatory paragraph and appendix threshold table: theoretical binomial gap thresholds remain, explicitly not observed “won by N questions” claims.
- Limits paragraph: the frozen working-binomial treatment remains historical sensitivity only, superseded for publication by SCORE_TYPES.md.
- No literal “won by N questions” phrase was present; the ten bold question equivalents had the same interpretive problem.

## 1c

Artificial Analysis results quoted in Mistral’s launch post, run privately before the test sets were public. All eleven chart numbers were checked against both charts on 8 October 2026 and match (user-confirmed).

C0158: Beam’s 44 is self-reported; the other bars are Artificial Analysis runs. The frozen separated verdict compares two kinds of score.

Added to FINDINGS.md, SCORE_TYPES.md, METHOD_NOTES.md, COMPARISON_NOTES.json and the chart companion note. results.csv is unchanged, so its notes are supplied via comparison-ID sidecar.


Additional top-versus-first paired sensitivity flips: SWE-bench Multilingual positions 7 (Kimi K2.5), 8 (Claude 4.5 Sonnet), 9 (GPT 5.2 high); SWE-bench Verified bash-only positions 7 (GLM 5 high), 8 (GPT 5.2 high), 11 (Claude 4.5 Sonnet high). Each changes from independent unresolved to paired separated. Together with the thirteen Terminal-Bench flips there are nineteen top-versus-first changes. The complete top comparison audit is in TOP_CLUSTER_SENSITIVITY.csv.
