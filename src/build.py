#!/usr/bin/env python3
"""Kata — production build.  src/ -> site/ + vercel.json, which is what Vercel serves.

   Run from anywhere:  python3 src/build.py            (stops if the legal pages have [[gaps]])
                       python3 src/build.py --preview  (builds anyway, for review)
   Then preview:       python3 src/serve.py 8000       -> http://localhost:8000

   Everything in site/ and vercel.json is regenerated on every run. Never edit
   them by hand: change src/, rebuild, commit src/ and the output together.
   Standard library only, so any Python 3.8+ runs it."""
import re, os, sys, shutil, json, html
HERE=os.path.dirname(os.path.abspath(__file__))   # src/
ROOT=os.path.dirname(HERE)                         # the repo
SRC=f'{HERE}/kata.html'                            # the design source: every page, style and script
ASSETS=f'{HERE}/assets'; STATIC=f'{HERE}/static'
DIST=f'{ROOT}/site'                                # the only folder Vercel serves
FONTS=f'{HERE}/fonts'   # Google's current files (Newsreader v26, Hanken Grotesk v12), localised
SERIF_LATIN='cY9AfjOCX1hbuyalUrK4397yjA.woff2'      # Newsreader normal, latin
SANS_LATIN='ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2'  # Hanken Grotesk, latin, every weight
LEGAL=json.load(open(f'{HERE}/legal.json',encoding='utf-8'))
SITE='https://bureau-kata.com'
DESC=("We help brands and agencies turn production knowledge into action: commissioning "
      "smarter, shaping the right production setup, and knowing what it should cost.")
LINKEDIN='https://www.linkedin.com/company/bureau-kata/about/'
PREVIEW='--preview' in sys.argv

assert os.path.basename(DIST)=='site' and os.path.dirname(DIST)==ROOT, "refusing to clear anything but site/"
shutil.rmtree(DIST,ignore_errors=True); os.makedirs(DIST)
s=open(SRC,encoding='utf-8').read()

# ---------- 1. a real document -------------------------------------------
cut=s.index('</style>')+len('</style>')
head,body=s[:cut],s[cut:]
# fonts: Google CDN out, the supplied files in
head=re.sub(r'<link rel="preconnect" href="https://fonts\.googleapis\.com">\s*','',head)
head=re.sub(r'<link rel="preconnect" href="https://fonts\.gstatic\.com" crossorigin>\s*','',head)
head=re.sub(r'<link rel="stylesheet" href="https://fonts\.googleapis\.com[^"]*">',
  f'<link rel="preload" href="/fonts/{SERIF_LATIN}" as="font" type="font/woff2" crossorigin>\n'
  f'<link rel="preload" href="/fonts/{SANS_LATIN}" as="font" type="font/woff2" crossorigin>\n'
  '<link rel="stylesheet" href="/fonts/fonts.css">',head)
assert 'googleapis' not in head and 'gstatic' not in head, "Google Fonts still referenced"
meta=f'''<meta name="description" content="{html.escape(DESC)}">
<link rel="canonical" href="{SITE}/">
<meta name="theme-color" content="#FFFFFF">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/favicon.png" type="image/png" sizes="32x32">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Kata">
<meta property="og:title" content="Kata — Independent Production Architects">
<meta property="og:description" content="{html.escape(DESC)}">
<meta property="og:url" content="{SITE}/">
<meta property="og:image" content="{SITE}/og.jpg">
<meta property="og:image:width" content="1200"><meta property="og:image:height" content="630">
<meta property="og:locale" content="en_GB">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">{json.dumps({
  "@context":"https://schema.org","@type":"ProfessionalService","name":"Kata",
  "description":DESC,"url":SITE+"/","logo":SITE+"/apple-touch-icon.png",
  "email":"hello@bureau-kata.com","areaServed":"DE","sameAs":[LINKEDIN],
  "founder":[{"@type":"Person","name":n} for n in ("Cornelius Roenz","Justin Stiebel","Jankel Huppertz")]
},ensure_ascii=False)}</script>'''
head=head.replace('<title>',meta+'\n<title>',1)

# ---------- 2. absolute asset paths: the page is also served at /services/... ---
def absolutise(t):
    t=re.sub(r'(["\'(])assets/',r'\1/assets/',t)
    return t
head,body=absolutise(head),absolutise(body)

# ---------- 3. the approved experiment becomes the design -----------------
head=head.replace('EXPERIMENT — NO LINES','NO LINES')
head=head.replace('Every rule, hairline, divider and underline on the site, turned\n   off in one block. Delete this block to restore V54 exactly.',
                  'Every rule, hairline, divider and underline on the site is off.\n   Adopted from the Sept 2026 experiment.')

# ---------- 4. footer and form point at real things ------------------------
body=body.replace('<li><a href="#/contact">LinkedIn</a></li><li><a href="#/contact">Impressum</a></li>\n        <li><a href="#/contact">Datenschutz</a></li>',
  f'<li><a href="{LINKEDIN}" rel="noopener" target="_blank">LinkedIn</a></li><li><a href="/imprint">Impressum</a></li>\n        <li><a href="/privacy">Datenschutz</a></li>')
assert '/imprint' in body and '/privacy' in body and LINKEDIN in body, "footer links not rewritten"
body=body.replace("How we handle data.</a>","How we handle data.</a>").replace(
  '<a href="#/contact">How we handle data.</a>','<a href="/privacy">How we handle data.</a>')
assert 'href="/privacy">How we handle data' in body, "form privacy link not rewritten"

# ---------- 5. old real URLs land on the right page ------------------------
# /services, /team, /services/strategic-advisory ... are served this same file
# (see vercel.json rewrites). Turn the path into the hash the router reads, before
# anything reads it. No redirect: a cached 308 would fight the Next.js port later.
shim=("(function(){var p=location.pathname.replace(/\\/index\\.html$/,'').replace(/\\/+$/,'');"
      "if(p&&!location.hash){history.replaceState(null,'','/#'+p);}})();\n")
body=body.replace('(function(){\n  "use strict";','(function(){\n  "use strict";\n  '+shim,1)
assert "history.replaceState(null,'','/#'+p)" in body, "path shim not injected"

# ---------- 5b. the form reaches Attio, as the old site's did -------------
# honeypot: a field no human sees; the endpoint discards anything that fills it
body=body.replace(
  """<textarea id="'+p+'-msg" """,
  """<textarea id="'+p+'-msg" """,1)
hp=("'<div class=\"hp\" aria-hidden=\"true\"><label for=\"'+p+'-website\">Website</label>"
    "<input id=\"'+p+'-website\" type=\"text\" tabindex=\"-1\" autocomplete=\"off\"></div>'\n    +")
anchor="+'<div class=\"f-full\" style=\"display:flex;justify-content:space-between"
assert body.count(anchor)==1, "form footer anchor not found"
body=body.replace(anchor, hp+anchor[1:] if False else anchor.replace("+'<div class","+"+hp[:-1].rstrip()+"\n    +'<div class",1),1)
old_submit="""    if(note) note.textContent="The form isn't connected yet. Please email us directly at hello@bureau-kata.com.";
  });"""
new_submit="""    if(!note) return;
    var f=e.target, p=f.id.split("-")[0], btn=f.querySelector('button[type="submit"]');
    var v=function(k){ var el=document.getElementById(p+"-"+k); return el?el.value.trim():""; };
    var d={name:v("name"),email:v("email"),company:v("company"),role:v("role"),side:v("type"),
           need:v("need"),timing:v("timing"),message:v("msg"),website:v("website")};
    var direct=" Email us directly at hello@bureau-kata.com.";
    if(!d.name||d.email.indexOf("@")<1||!d.message){
      note.textContent="Add your name, an email we can reply to, and what you are trying to figure out."; return; }
    if(f.dataset.busy) return;
    f.dataset.busy="1"; btn.disabled=true; btn.textContent="Sending"; note.textContent="";
    fetch("/api/enquiry",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})
      .then(function(r){
        if(r.ok){ f.reset(); note.textContent="Thanks, it\u2019s arrived. You\u2019ll hear from us within 24 hours."; }
        else if(r.status===503){ note.textContent="The form isn\u2019t connected right now."+direct; }
        else { note.textContent="That didn\u2019t go through."+direct; }
      })
      .catch(function(){ note.textContent="That didn\u2019t go through."+direct; })
      .then(function(){ delete f.dataset.busy; btn.disabled=false; btn.textContent="Send"; });
  });"""
assert body.count(old_submit)==1, "submit handler not found"
body=body.replace(old_submit,new_submit)
head=head.replace('</style>','.hp{position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden}\n</style>',1)

doc=('<!doctype html>\n<html lang="en">\n<head>\n'+head.strip()+'\n</head>\n<body>\n'
     +body.strip()+'\n</body>\n</html>\n')
open(f'{DIST}/index.html','w',encoding='utf-8').write(doc)

# ---------- 6. assets actually referenced, plus fonts -----------------------
refs=set(re.findall(r'/assets/([A-Za-z0-9_\-./]+?\.(?:jpg|webp|avif|png|svg))',doc))
refs|={f'people/{n}.{e}' for n in ('cornelius','justin','jankel') for e in ('jpg','webp')}
for r in sorted(refs):
    src=f'{ASSETS}/{r}'; dst=f'{DIST}/assets/{r}'
    assert os.path.exists(src), f"missing asset: {r}"
    os.makedirs(os.path.dirname(dst),exist_ok=True); shutil.copy2(src,dst)
os.makedirs(f'{DIST}/fonts')
for f in os.listdir(FONTS):
    if f.endswith('.woff2'): shutil.copy2(f'{FONTS}/{f}',f'{DIST}/fonts/{f}')
shutil.copy2(f'{FONTS}/fonts.css',f'{DIST}/fonts/fonts.css')

# The enquiry function is not built: api/enquiry.js at the repo root is its
# source, and Vercel runs it from there.

# ---------- 6b. icons and share card (generated once by gen_static.py) -----
for f in sorted(os.listdir(STATIC)): shutil.copy2(f'{STATIC}/{f}',f'{DIST}/{f}')

# ---------- 7. legal pages --------------------------------------------------
exec(open(f'{HERE}/legal_pages.py',encoding='utf-8').read())

# ---------- 8. crawl + host config -----------------------------------------
open(f'{DIST}/robots.txt','w',encoding='utf-8').write(f"User-agent: *\nAllow: /\n\nSitemap: {SITE}/sitemap.xml\n")
open(f'{DIST}/sitemap.xml','w',encoding='utf-8').write(
 '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
 +''.join(f'  <url><loc>{SITE}{p}</loc></url>\n' for p in ('/','/imprint','/privacy'))+'</urlset>\n')
# cleanUrls strips ".html" from the deployed files, so "/index.html" does not
# exist on Vercel and a rewrite to it 404s. The destination must be the clean "/".
spa=[{"source":p,"destination":"/"} for p in
     ("/services","/services/:path*","/approach","/approach/:path*","/team","/team/:path*","/contact")]
long=[{"key":"Cache-Control","value":"public, max-age=31536000, immutable"}]
json.dump({"$schema":"https://openapi.vercel.sh/vercel.json",
  # the project is still configured as Next.js in the dashboard; this overrides it
  # per deployment: no framework, nothing to install or build, serve the root as-is
  "framework":None,"installCommand":"","buildCommand":"","outputDirectory":"site",
  "cleanUrls":True,"trailingSlash":False,"rewrites":spa,"headers":[
   {"source":"/fonts/(.*)","headers":long+[{"key":"Access-Control-Allow-Origin","value":"*"}]},
   {"source":"/assets/(.*)","headers":long},
   {"source":"/(.*)","headers":[
     {"key":"X-Content-Type-Options","value":"nosniff"},
     {"key":"Referrer-Policy","value":"strict-origin-when-cross-origin"},
     {"key":"Permissions-Policy","value":"camera=(), microphone=(), geolocation=(), interest-cohort=()"},
     {"key":"X-Frame-Options","value":"SAMEORIGIN"}]}]},
  open(f'{ROOT}/vercel.json','w',encoding='utf-8'),indent=2)

# ---------- 9. the gate -----------------------------------------------------
gaps=[]
LOREM=[k for k,v in LEGAL.items() if not k.startswith('_') and 'lorem' in json.dumps(v).lower()
       or (isinstance(v,str) and re.search(r'\b0{5,}\b|DE0{9}',v))]
for page in ('imprint','privacy'):
    t=open(f'{DIST}/{page}/index.html',encoding='utf-8').read()
    gaps+= [f'{page}: {m}' for m in sorted(set(re.findall(r'\[\[([^\]]+)\]\]',t)))]
total=sum(os.path.getsize(os.path.join(d,f)) for d,_,fs in os.walk(DIST) for f in fs)
print(f"site/ built — {sum(len(fs) for _,_,fs in os.walk(DIST))} files, {total//1024} KB, plus vercel.json")
if gaps:
    print("\nNOT READY TO GO LIVE — the legal pages still have gaps:")
    for g in gaps: print("   -",g)
    if not PREVIEW: sys.exit(2)
elif LOREM and LEGAL.get('placeholder_ok'):
    print("WARNING: every Impressum field is placeholder text, by decision (placeholder_ok in legal.json).")
    print("         It is not a valid Impressum until real details replace it.")
else:
    print("legal pages complete — ready to deploy")
