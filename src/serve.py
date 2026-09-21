"""Local preview that behaves like Vercel: serves site/ with the cleanUrls,
trailingSlash:false and rewrites in vercel.json.

   python3 src/serve.py 8000   ->  http://localhost:8000

With cleanUrls Vercel strips ".html" from the deployed files. A request for
x.html or /index gets a 308 to the clean path, and a rewrite whose destination
still ends in ".html" finds no file and 404s, here exactly as it does live.
The contact form's /api/enquiry is a Vercel function and does not run here,
so a test submission shows "That didn't go through".
"""
import http.server, json, os, re, sys
ROOT=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST=f'{ROOT}/site'
cfg=json.load(open(f'{ROOT}/vercel.json',encoding='utf-8'))
CLEAN=cfg.get('cleanUrls',False)
NOSLASH=cfg.get('trailingSlash') is False
pats=[(re.compile('^'+r['source'].replace('/:path*','(/.*)?')+'$'),r['destination']) for r in cfg.get('rewrites',[])]

class H(http.server.SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def send_head(self):
        p=self.path.split('?')[0].split('#')[0]
        loc=None
        if CLEAN and (p.endswith('.html') or re.search(r'(^|/)index$',p)):
            loc=re.sub(r'\.html$','',p)
            loc=re.sub(r'(^|/)index$',r'\1',loc)
        elif NOSLASH and p!='/' and p.endswith('/'):
            loc=p
        if loc is not None:
            loc=loc.rstrip('/') or '/'
            self.send_response(308); self.send_header('Location',loc); self.end_headers()
            return None
        return super().send_head()
    def translate_path(self,path):
        p=path.split('?')[0].split('#')[0]
        for rx,dst in pats:
            if rx.match(p):
                if CLEAN and dst.endswith('.html'):
                    return os.path.join(DIST,'__no_such_file__')
                p=dst; break
        f=os.path.join(DIST,p.lstrip('/'))
        if os.path.isdir(f): f=os.path.join(f,'index.html')
        elif not os.path.exists(f) and os.path.exists(f+'.html'): f+='.html'
        return f

port=int(sys.argv[1]) if len(sys.argv)>1 else 8000
print(f"serving site/ at http://localhost:{port}  (Ctrl+C to stop)")
http.server.ThreadingHTTPServer(('127.0.0.1',port),H).serve_forever()
