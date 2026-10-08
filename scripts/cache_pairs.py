"""Reproduce the frozen sufficient-statistic bootstrap cache; no network/model calls.
Requires numpy and scipy. Never edits METHOD.md or results.csv.
"""
from pathlib import Path
import json
import numpy as np
from scipy.stats import binomtest
P=Path(__file__).resolve().parents[1];old=json.loads((P/'data/paired-cache.json').read_text());out={}
for key in old:
 counts=np.array([int(x) for x in key.split(',')]);n=int(counts.sum());b,c=int(counts[2]),int(counts[1]);p=float(binomtest(b,b+c,.5).pvalue) if b+c else 1.
 draws=np.random.Generator(np.random.PCG64(20261007)).multinomial(n,counts/n,100000);lo,hi=np.quantile((draws[:,2]-draws[:,1])/n,[.025,.975]);sep=bool(p<.05 and (lo>0 or hi<0))
 out[key]=dict(paired_N=n,b=b,c=c,mcnemar_p=p,paired_gap=(b-c)/n,paired_lower=float(lo),paired_upper=float(hi),paired_verdict='separated' if sep else 'no separation detected at this sample size',paired_tests_agree=bool((p<.05)==(lo>0 or hi<0)))
assert old==out,'Cache differs from frozen algorithm'
print('Verified',len(out),'frozen bootstrap patterns')
