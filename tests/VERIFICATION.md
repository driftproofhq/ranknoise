# Verification record — 8 October 2026

- Ten specified R-9 comparison IDs: all Wilson endpoints, Newcombe difference endpoints and gap quantities agree within 1e-12; verdict strings agree exactly.
- Available paired fixture endpoints, McNemar p and precedence agree with frozen results.
- Nine readers: 129 rows equal archived data exactly, including numeric scores, N, configuration IDs, interval fields and item outcomes. Source HTML hashes verified first. Invalid and unsupported inputs fail closed.
- Fifteen static cards fit individually at 1440×1100 desktop viewport; maximum observed card height is 834 pixels. At 390px phone width no horizontal document overflow occurs.
- Static page: zero network requests.
- Live bookmarklet: overlay opened on all four hosts; no CSP blocking observed with the tested Chrome navigation mechanism.
- Frozen METHOD.md whole-file SHA-256 matches METHOD.sha256. Original results.csv remains b7316a1784f639fac4d32a22d30bca517dd643742cbea773e4e0462c5a5c8be5.

The ten issue #39 CSV rows were verified directly in the signed-in browser; all 20 published fields match R-9 exactly. Minimum-gap thresholds and below-threshold flags are also tested. See FIXTURE_PROVENANCE.md.

- Dynamic local bootstrap: JavaScript PCG64/multinomial implementation checked against all 197 original NumPy patterns, endpoints and McNemar probabilities within 1e-12, verdicts exact.
