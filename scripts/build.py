"""Optional maintainer packer. The distributed HTML needs no build or server."""
from pathlib import Path
import json
P=Path(__file__).resolve().parents[1]
manifest=json.loads((P/'data/manifest.json').read_text());cards=[json.loads((P/'data'/r['file']).read_text()) for r in manifest]
cache=json.loads((P/'data/paired-cache.json').read_text())
style=(P/'src/style.css').read_text();core=(P/'src/paired.js').read_text()+'\n'+(P/'src/core.js').read_text();render=(P/'src/render.js').read_text()
payload=json.dumps({'cards':cards,'cache':cache},ensure_ascii=False,separators=(',',':')).replace('</','<\\/')
html='''<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"><title>RankNoise — benchmark snapshots</title><style>'''+style+'''</style><body><header class="intro"><div class="eyebrow">RANKNOISE · SNAPSHOT EDITION · DRAFT</div><h1>A rank is not a resolution.</h1><p>Fifteen archived leaderboard and launch-post views. Compare the published gaps with the uncertainty the source can support. “No” means separation is not established; it does not mean equal performance.</p><nav aria-label="Jump to a card" id="nav"></nav></header><main id="cards"></main><footer class="page-foot" id="method-placeholder">Method link placeholder — Maverick will add the piece URL before launch. These are pointwise checks, not a simultaneous ranking guarantee. Scores retain their source’s harness, effort and evaluator differences.</footer><script>'''+core+'\n'+render+'\nconst DATA='+payload+''';for(const c of DATA.cards){document.querySelector('#cards').append(RankNoiseRender.renderCard(c,DATA.cache));const a=document.createElement('a');a.href='#'+c.id;a.textContent=c.title;document.querySelector('#nav').append(a);}if(location.hash){document.getElementById(location.hash.slice(1))?.scrollIntoView();}</script></body></html>'''
(P/'index.html').write_text(html)
print('Static page',len(cards),'cards',len(html.encode()),'bytes')
# Bookmarklet is packed only after the static page exists.
if (P/'bookmarklet/readers.js').exists():
 metadata=[{**{k:c[k] for k in ['id','title','kind','source_url','snapshot_date','note']},'N':c['sections'][0]['N']} for c in cards if c['kind']=='leaderboard']
 bundle='(()=>{'+core+'\n'+render+'\n'+(P/'bookmarklet/readers.js').read_text()+'\nconst RN_METADATA='+json.dumps(metadata)+';const RN_CACHE='+json.dumps({k:[v['paired_lower'],v['paired_upper'],v['paired_verdict']=='separated'] for k,v in cache.items()},separators=(',',':'))+';const RN_STYLE='+json.dumps(style)+';'+(P/'bookmarklet/run.js').read_text()+'})();'
 (P/'bookmarklet/ranknoise.js').write_text(bundle)
 import urllib.parse,html
 url='javascript:'+urllib.parse.quote(bundle,safe="!'()*-._~")
 (P/'bookmarklet/bookmarklet.txt').write_text(url+'\n')
 (P/'bookmarklet/install.html').write_text('<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Install RankNoise</title><style>body{font:17px/1.6 system-ui;max-width:680px;margin:60px auto;padding:20px}a{display:inline-block;padding:12px 20px;background:#174b39;color:white;border-radius:5px}textarea{width:100%;height:150px}</style><h1>Install RankNoise</h1><p>Drag this link to your bookmarks bar:</p><a href="'+html.escape(url,quote=True)+'">RankNoise</a><p>Open a supported leaderboard, wait for its table, then click your RankNoise bookmark. Click again or choose Close RankNoise to remove the overlay. The bookmarklet is self-contained; no data leaves the page.</p><p>If dragging is unavailable, create a bookmark and replace its URL with the full text below. Some browsers remove the javascript: prefix when pasting; restore it if necessary.</p><textarea readonly aria-label="Bookmark URL">'+html.escape(url)+'</textarea></html>')
 print('Self-contained bookmark URL',len(url),'characters')
