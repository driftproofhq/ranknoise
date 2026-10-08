const assert=require('node:assert/strict'),{paired,rng}=require('../src/paired'),cache=require('../data/paired-cache.json');
const r=rng();[0.19892245082646276,0.9743259827903488,0.5030276543524769,0.9089552251488006,0.3299100664875282].forEach(x=>assert.equal(r(),x));
for(const [key,expected] of Object.entries(cache)){const actual=paired(key.split(',').map(Number));for(const field of ['paired_lower','paired_upper','mcnemar_p'])assert.ok(Math.abs(actual[field]-expected[field])<=1e-12,`${key}: ${field}: ${actual[field]} != ${expected[field]}`);assert.equal(actual.paired_verdict,expected.paired_verdict,key);}
console.log('PASS: browser PCG64 bootstrap reproduces all '+Object.keys(cache).length+' NumPy paired patterns to 1e-12 with exact verdicts');
