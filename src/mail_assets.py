#!/usr/bin/env python3
"""Artwork for the enquiry emails (api/enquiry.js).

Written to src/static/, which the build copies to the site root, so the mails
load it from https://bureau-kata.com/<name>.

  mail-lockup.png        the lockup in Ink: the word, the line 7px under it,
                         justified to the word. 3x its 112px width in the mail.
  mail-lockup-white.png  the same in white, swapped in by clients in dark mode.
  mail-light.png         a band of plate-crossing inside an oval that feathers
                         out to nothing, so a plate never shows an edge. The
                         fade is alpha, not white.
  mail-light-dark.png    the same cut from deep-beam, for clients in dark mode:
                         a streak of light on black instead of a pale haze.

The lockup is cut from the same vector artwork the site draws (#marks in
kata.html), so the mail and the site can never disagree about the mark.

  python3 src/mail_assets.py
"""
import os, re
import numpy as np
from PIL import Image
from playwright.sync_api import sync_playwright

HERE = os.path.dirname(os.path.abspath(__file__))
OUT = f'{HERE}/static'
INK = '#0B0B0F'
LOCKUP_W = 336            # 3 x 112
BAND_W, BAND_H = 840, 216 # 1.5 x 560 by 144: the plate is soft, 1.5x holds it


def svg(art):
    src = open(f'{HERE}/kata.html', encoding='utf-8').read()
    m = re.search(r'<svg data-art="%s".*?</svg>' % art, src, re.S)
    assert m, f'artwork {art} not found in kata.html'
    return m.group(0)


def lockups():
    word, line = svg('word'), svg('line')
    gap = round(LOCKUP_W * 7 / 112)
    with sync_playwright() as p:
        b = p.chromium.launch()
        pg = b.new_page(device_scale_factor=1)
        for name, colour in (('mail-lockup.png', INK), ('mail-lockup-white.png', '#FFFFFF')):
            pg.set_content(f'''<style>html,body{{margin:0;background:transparent}}
              #lk{{width:{LOCKUP_W}px;color:{colour};padding:2px 0}}
              #lk svg{{display:block;width:100%;height:auto;fill:currentColor}}</style>
              <div id="lk"><div>{word}</div><div style="margin-top:{gap}px">{line}</div></div>''')
            pg.locator('#lk').screenshot(path=f'{OUT}/{name}', omit_background=True)
            im = Image.open(f'{OUT}/{name}')
            print(f'{name:22s} {im.size[0]}x{im.size[1]}  {os.path.getsize(f"{OUT}/{name}")//1024} KB')
        b.close()


def band(src, cy, out, flip=False):
    """A band of one plate inside an oval that feathers out to nothing."""
    im = Image.open(f'{HERE}/plates-src/{src}.jpg').convert('RGB')
    if flip:
        im = im.transpose(Image.FLIP_LEFT_RIGHT)
    w, h = im.size
    im = im.resize((BAND_W, round(h * BAND_W / w)), Image.LANCZOS)
    top = round(im.size[1] * cy - BAND_H / 2)
    im = im.crop((0, top, BAND_W, top + BAND_H))
    y = np.linspace(-1, 1, BAND_H)[:, None]
    x = np.linspace(-1, 1, BAND_W)[None, :]
    r = np.sqrt(x * x + y * y)                          # the oval inscribed in the band
    ss = lambda t: t * t * (3 - 2 * t)                  # smoothstep: no visible start to the fade
    a = ss(np.clip((1 - r) / 0.62, 0, 1))               # a long feather: most of the oval is fade
    Image.fromarray(np.dstack([np.asarray(im), (a * 255).astype(np.uint8)]), 'RGBA').save(f'{OUT}/{out}', optimize=True)
    print(f'{out:22s} {BAND_W}x{BAND_H}  {os.path.getsize(f"{OUT}/{out}")//1024} KB  ({src})')


if __name__ == '__main__':
    lockups()
    band('plate-crossing', .45, 'mail-light.png')        # paper: soft light, a thread of rainbow
    band('deep-beam', .47, 'mail-light-dark.png')        # dark clients: one streak of light
