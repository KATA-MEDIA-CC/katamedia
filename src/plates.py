#!/usr/bin/env python3
"""Re-grade the site's background plates: deblock, upscale, re-encode.

The plates arrived as 1672-2000 px JPEGs with visible 8x8 compression blocks,
and the WebP copies were squeezed harder still (11-16 KB). A tall section
scales a plate about 1.4x, a retina screen doubles that, and at 2.8x the
blocks read as pixels (Jankel, Sept 2026: "der Hintergrund sieht pixelig aus").

For each original in src/plates-src/ this:
  1. smooths the flat areas with two edge-preserving bilateral passes, so the
     codec's steps go and the light's own edges and rainbow lines stay;
  2. upscales to 2560 px wide with Lanczos, so the browser stretches less;
  3. writes AVIF (4:4:4, first choice), WebP and JPEG into src/assets/.

The page-wide grain (body::after) still sits on top and keeps the long fades
from banding.

  python3 src/plates.py              # every plate in src/plates-src
  python3 src/plates.py sky-beams    # one plate
"""
import os, sys
import cv2
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC, OUT = f'{HERE}/plates-src', f'{HERE}/assets'
WIDTH = 2560

def regrade(name):
    img = cv2.imread(f'{SRC}/{name}.jpg')
    for _ in range(2):
        img = cv2.bilateralFilter(img, d=9, sigmaColor=10, sigmaSpace=7)
    h = round(img.shape[0] * WIDTH / img.shape[1])
    img = cv2.resize(img, (WIDTH, h), interpolation=cv2.INTER_LANCZOS4)
    im = Image.fromarray(cv2.cvtColor(img, cv2.COLOR_BGR2RGB))
    im.save(f'{OUT}/{name}.avif', 'AVIF', quality=74, subsampling='4:4:4', speed=4)
    im.save(f'{OUT}/{name}.webp', 'WEBP', quality=90, method=6)
    im.save(f'{OUT}/{name}.jpg', 'JPEG', quality=88, subsampling=0, progressive=True, optimize=True)
    kb = lambda e: os.path.getsize(f'{OUT}/{name}.{e}') // 1024
    print(f'{name:20s} {WIDTH}x{h}  avif {kb("avif"):4d} KB  webp {kb("webp"):4d} KB  jpg {kb("jpg"):4d} KB')

if __name__ == '__main__':
    names = sys.argv[1:] or sorted(f[:-4] for f in os.listdir(SRC) if f.endswith('.jpg'))
    for n in names:
        regrade(n)
