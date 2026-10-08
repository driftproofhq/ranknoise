/* NumPy 2.2.6 binomial sampler port. See NUMPY_LICENSE.txt.
PCG64 initial state is NumPy PCG64(20261007), recorded for this frozen seed. */
(function(root){'use strict';
function rng(){let s=1416835391538841792917410800590245520n;const inc=87408120995932972403329037743644218171n,mask=(1n<<128n)-1n,mask64=(1n<<64n)-1n;return ()=>{s=(s*47026247687942121848144207491837523525n+inc)&mask;const x=((s>>64n)^s)&mask64,r=s>>122n;return Number((((x>>r)|(x<<((-r)&63n)))&mask64)>>11n)/9007199254740992;};}
function btpe(random,n,p,binomial){
  let r, q, fm, p1, xm, xl, xr, c, laml, lamr, p2, p3, p4;
  let a, u, v, s, F, rho, t, A, nrq, x1, x2, f1, f2, z, z2, w, w2, x;
  let m, y, k, i;

  if (!(binomial.has_binomial) || (binomial.nsave != n) ||
      (binomial.psave != p)) {

    binomial.nsave = n;
    binomial.psave = p;
    binomial.has_binomial = 1;
    binomial.r = r = Math.min(p, 1.0 - p);
    binomial.q = q = 1.0 - r;
    binomial.fm = fm = n * r + r;
    binomial.m = m = Math.floor(binomial.fm);
    binomial.p1 = p1 = Math.floor(2.195 * Math.sqrt(n * r * q) - 4.6 * q) + 0.5;
    binomial.xm = xm = m + 0.5;
    binomial.xl = xl = xm - p1;
    binomial.xr = xr = xm + p1;
    binomial.c = c = 0.134 + 20.5 / (15.3 + m);
    a = (fm - xl) / (fm - xl * r);
    binomial.laml = laml = a * (1.0 + a / 2.0);
    a = (xr - fm) / (xr * q);
    binomial.lamr = lamr = a * (1.0 + a / 2.0);
    binomial.p2 = p2 = p1 * (1.0 + 2.0 * c);
    binomial.p3 = p3 = p2 + c / laml;
    binomial.p4 = p4 = p3 + c / lamr;
  } else {
    r = binomial.r;
    q = binomial.q;
    fm = binomial.fm;
    m = binomial.m;
    p1 = binomial.p1;
    xm = binomial.xm;
    xl = binomial.xl;
    xr = binomial.xr;
    c = binomial.c;
    laml = binomial.laml;
    lamr = binomial.lamr;
    p2 = binomial.p2;
    p3 = binomial.p3;
    p4 = binomial.p4;
  }


let step=10; sampling: for(;;){switch(step){case 10:
  nrq = n * r * q;
  u = random() * p4;
  v = random();
  if (u > p1)
    {step=20;continue sampling;}
  y = Math.floor(xm - p1 * v + u);
  {step=60;continue sampling;}

case 20:
  if (u > p2)
    {step=30;continue sampling;}
  x = xl + (u - p1) / c;
  v = v * c + 1.0 - Math.abs(m - x + 0.5) / p1;
  if (v > 1.0)
    {step=10;continue sampling;}
  y = Math.floor(x);
  {step=50;continue sampling;}

case 30:
  if (u > p3)
    {step=40;continue sampling;}
  y = Math.floor(xl + Math.log(v) / laml);

  if ((y < 0) || (v == 0.0))
    {step=10;continue sampling;}
  v = v * (u - p2) * laml;
  {step=50;continue sampling;}

case 40:
  y = Math.floor(xr - Math.log(v) / lamr);

  if ((y > n) || (v == 0.0))
    {step=10;continue sampling;}
  v = v * (u - p3) * lamr;

case 50:
  k = Math.abs(y - m);
  if ((k > 20) && (k < ((nrq) / 2.0 - 1)))
    {step=52;continue sampling;}

  s = r / q;
  a = s * (n + 1);
  F = 1.0;
  if (m < y) {
    for (i = m + 1; i <= y; i++) {
      F *= (a / i - s);
    }
  } else if (m > y) {
    for (i = y + 1; i <= m; i++) {
      F /= (a / i - s);
    }
  }
  if (v > F)
    {step=10;continue sampling;}
  {step=60;continue sampling;}

case 52:
  rho =
      (k / (nrq)) * ((k * (k / 3.0 + 0.625) + 0.16666666666666666) / nrq + 0.5);
  t = -k * k / (2 * nrq);

  A = Math.log(v);
  if (A < (t - rho))
    {step=60;continue sampling;}
  if (A > (t + rho))
    {step=10;continue sampling;}

  x1 = y + 1;
  f1 = m + 1;
  z = n + 1 - m;
  w = n - y + 1;
  x2 = x1 * x1;
  f2 = f1 * f1;
  z2 = z * z;
  w2 = w * w;
  if (A > (xm * Math.log(f1 / x1) + (n - m + 0.5) * Math.log(z / w) +
           (y - m) * Math.log(w * r / (x1 * q)) +
           (13680. - (462. - (132. - (99. - 140. / f2) / f2) / f2) / f2) / f1 /
               166320. +
           (13680. - (462. - (132. - (99. - 140. / z2) / z2) / z2) / z2) / z /
               166320. +
           (13680. - (462. - (132. - (99. - 140. / x2) / x2) / x2) / x2) / x1 /
               166320. +
           (13680. - (462. - (132. - (99. - 140. / w2) / w2) / w2) / w2) / w /
               166320.)) {
    {step=10;continue sampling;}
  }

case 60:
  if (p > 0.5) {
    y = n - y;
  }

  return y;
}}}
function inversion(random,n,p,binomial){
  let q, qn, np, px, U;
  let X, bound;

  if (!(binomial.has_binomial) || (binomial.nsave != n) ||
      (binomial.psave != p)) {
    binomial.nsave = n;
    binomial.psave = p;
    binomial.has_binomial = 1;
    binomial.q = q = 1.0 - p;
    binomial.r = qn = Math.exp(n * Math.log(q));
    binomial.c = np = n * p;
    binomial.m = bound = Math.floor(Math.min(n, np + 10.0 * Math.sqrt(np * q + 1)));
  } else {
    q = binomial.q;
    qn = binomial.r;
    np = binomial.c;
    bound = binomial.m;
  }
  X = 0;
  px = qn;
  U = random();
  while (U > px) {
    X++;
    if (X > bound) {
      X = 0;
      px = qn;
      U = random();
    } else {
      U -= px;
      px = ((n - X + 1) * p * px) / (X * q);
    }
  }
  return X;
}
function binomial(random,n,p,cache){if(n===0||p===0)return 0;const q=p<=.5?p:1-p;const x=q*n<=30?inversion(random,n,q,cache):btpe(random,n,q,cache);return p<=.5?x:n-x;}
function paired(counts){const n=counts.reduce((a,b)=>a+b,0);if(counts.length!==4||!n||counts.some(x=>!Number.isInteger(x)||x<0))throw Error('Invalid paired counts');const random=rng(),cache={},probs=counts.map(x=>x/n),draws=new Float64Array(100000);for(let i=0;i<draws.length;i++){let remaining=1,dn=n;const v=[0,0,0,0];for(let j=0;j<3;j++){v[j]=binomial(random,dn,probs[j]/remaining,cache);dn-=v[j];if(dn<=0)break;remaining-=probs[j];}if(dn>0)v[3]=dn;draws[i]=(v[2]-v[1])/n;}draws.sort();const quantile=p=>{const h=(draws.length-1)*p,k=Math.floor(h);return draws[k]+(draws[k+1]-draws[k])*(h-k);};const lo=quantile(.025),hi=quantile(.975),b=counts[2],c=counts[1],d=b+c,k=Math.min(b,c);let logp=-d*Math.LN2,logs=[logp];for(let j=1;j<=k;j++){logp+=Math.log(d-j+1)-Math.log(j);logs.push(logp);}const mx=Math.max(...logs),pv=d?Math.min(1,2*Math.exp(mx)*logs.reduce((a,x)=>a+Math.exp(x-mx),0)):1;return {paired_N:n,b,c,mcnemar_p:pv,paired_gap:(b-c)/n,paired_lower:lo,paired_upper:hi,paired_verdict:pv<.05&&(lo>0||hi<0)?'separated':'no separation detected at this sample size'};}
root.RankNoisePaired=paired;if(typeof module!=='undefined')module.exports={paired,rng};
})(typeof globalThis==='undefined'?this:globalThis);
