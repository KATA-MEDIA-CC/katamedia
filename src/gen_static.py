"""Regenerates src/static/: favicon.svg, favicon.png, apple-touch-icon.png and og.jpg
   (the 1200x630 share card), all drawn from the vector mark in src/assets.
   Only needed when the mark or the share card changes; build.py just copies the results.
   Needs Playwright with Chromium:  pip install playwright && playwright install chromium
   Run:  python3 src/gen_static.py"""
import re, os, pathlib
from playwright.sync_api import sync_playwright
HERE=os.path.dirname(os.path.abspath(__file__)); OUT=f'{HERE}/static'
FONT=pathlib.Path(f'{HERE}/fonts/ieVn2YZDLWuGJpnzaiwFXS9tYtpd59A.woff2').as_uri()   # Hanken Grotesk, latin
mark=open(f'{HERE}/assets/mark.svg',encoding='utf-8').read()
tag=open(f'{HERE}/assets/tagline.svg',encoding='utf-8').read()
paths=re.findall(r'<path[^>]*/>',mark)
k=paths[0]                                   # first path in the file is the k
with sync_playwright() as pw:
    br=pw.chromium.launch(); pg=br.new_page()
    # measure the k on its own to frame it in a square
    pg.set_content(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2172 724">{k}</svg>')
    b=pg.evaluate("(()=>{const s=document.querySelector('svg').getBBox();return[s.x,s.y,s.width,s.height]})()")
    x,y,w,h=b; side=max(w,h)*1.26; cx,cy=x+w/2,y+h/2
    vb=f"{cx-side/2:.1f} {cy-side/2:.1f} {side:.1f} {side:.1f}"
    kpath=k.replace('fill="currentColor"','')
    fav=(f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}">'
         '<style>path{fill:#0B0B0F}@media (prefers-color-scheme:dark){path{fill:#FFFFFF}}</style>'
         f'{kpath}</svg>')
    open(f'{OUT}/favicon.svg','w').write(fav)
    # raster fallbacks: k on white, for browsers and iOS that won't take SVG
    def icon(px,name,pad):
        pg.set_viewport_size({'width':px,'height':px})
        inner=int(px*(1-pad*2))
        pg.set_content(f'''<style>html,body{{margin:0;background:#fff}}
          div{{width:{px}px;height:{px}px;display:grid;place-items:center}}
          svg{{width:{inner}px;height:{inner}px}}</style>
          <div><svg xmlns="http://www.w3.org/2000/svg" viewBox="{vb}"><g fill="#0B0B0F">{kpath}</g></svg></div>''')
        pg.screenshot(path=f'{OUT}/{name}',omit_background=False)
    icon(32,'favicon.png',0.02); icon(180,'apple-touch-icon.png',0.14)
    # the share card: the lockup as the curtain has it, 1200x630
    pg.set_viewport_size({'width':1200,'height':630})
    pg.set_content(f'''<style>
      @font-face{{font-family:H;src:url({FONT})}}
      html,body{{margin:0;background:#fff}}
      .c{{width:1200px;height:630px;position:relative}}
      .l{{position:absolute;left:96px;top:50%;transform:translateY(-58%);width:560px;color:#0B0B0F}}
      .l svg{{display:block;width:100%;height:auto;fill:currentColor}} .l .t{{margin-top:22px}}
      .d{{position:absolute;left:96px;bottom:64px;font:500 15px H,Arial,sans-serif;
          letter-spacing:.24em;text-transform:uppercase;color:#6B6F76}}
      .u{{position:absolute;right:96px;bottom:64px;font:400 15px H,Arial,sans-serif;
          letter-spacing:.16em;color:#2E5A7D}}
    </style><div class="c"><div class="l">{mark}<div class="t">{tag}</div></div>
      <div class="d">Independent Production Architects</div><div class="u">bureau-kata.com</div></div>''')
    pg.wait_for_timeout(500)
    pg.screenshot(path=f'{OUT}/og.jpg',type='jpeg',quality=88)
    br.close()
for f in sorted(os.listdir(OUT)): print(f"  {f:<22} {os.path.getsize(f'{OUT}/{f}'):>7} B")
