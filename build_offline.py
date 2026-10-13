from pathlib import Path
import json,re
p=Path(__file__).parent
js=''
for f in ('data.js','viz.js','app.js'):
 s=(p/'assets'/f).read_text(encoding='utf-8')
 s=re.sub(r'^import\s+.*?;\s*$', '',s,flags=re.MULTILINE)
 s=re.sub(r'\bexport\s+(?=(?:const|let|function)\b)', '',s)
 js+='\n\n// MODULE: '+f+'\n'+s
names=json.loads((p/'data/albums_list.json').read_text(encoding='utf-8'))
docs=[json.loads((p/'data'/name).read_text(encoding='utf-8')) for name in names]
jsons=json.dumps(docs,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('>','\\u003e').replace('&','\\u0026')
css=(p/'assets/style.css').read_text(encoding='utf-8')
html=(p/'index.html').read_text(encoding='utf-8')
html=re.sub(r'<link rel="stylesheet" href="\./assets/style\.css">', lambda m:'<style>\n'+css+'\n</style>',html)
html=re.sub(r'<script type="module" src="\./assets/app\.js"></script>',lambda m:'<script>window.__ALBUM_DATA__='+jsons+'</script>\n<script type="module">\n'+js+'\n</script>',html)
(p/'offline.html').write_text(html,encoding='utf-8')
print('Offline size',round((p/'offline.html').stat().st_size/1024/1024,2),'MB; albums',len(docs),'images',sum(len(d['images']) for d in docs))
