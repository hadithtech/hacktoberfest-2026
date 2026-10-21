"""
Turns the original logo screenshots in scripts/source-logos/ into clean,
transparent, tightly-cropped PNGs in public/images/.

    pip install pillow numpy
    python3 scripts/prepare-logos.py

Why: the originals have white / light-grey backgrounds and loose padding. As
transparent PNGs they sit on any background (no blend-mode tricks) and always
have a predictable aspect ratio, so the CSS can size them cleanly.
"""
import numpy as np
from PIL import Image, ImageFilter

SRC, OUT = "scripts/source-logos/", "public/images/"


def to_transparent(img, bg, ink=None, floor=0.05):
    """Background -> alpha. `bg` is the background grey level (255 = white).
    ink=None keeps the original colours (colour logos); ink=(r,g,b) repaints the
    logo in one solid colour (single-colour logos)."""
    a = np.asarray(img.convert("RGB")).astype(np.float32)
    a = np.clip(a * (255.0 / bg), 0, 255)              # push the background to pure white
    alpha = 1.0 - a.min(axis=2) / 255.0                # darker / more saturated = more opaque
    alpha = np.clip((alpha - floor) / (1.0 - floor), 0, 1)  # kill JPEG haze near the background
    if ink is None:
        a_safe = np.maximum(alpha, 1e-3)[..., None]
        rgb = np.clip((a - (1 - a_safe) * 255.0) / a_safe, 0, 255)   # un-mix the white
    else:
        rgb = np.broadcast_to(np.array(ink, np.float32), a.shape)
    out = np.dstack([rgb, alpha * 255.0]).astype(np.uint8)
    return Image.fromarray(out, "RGBA")


def crop_tight(img, pad_ratio=0.0):
    box = img.getchannel("A").point(lambda v: 255 if v > 12 else 0).getbbox()
    img = img.crop(box)
    p = int(max(img.size) * pad_ratio)
    if p:
        canvas = Image.new("RGBA", (img.width + 2 * p, img.height + 2 * p), (0, 0, 0, 0))
        canvas.paste(img, (p, p))
        img = canvas
    return img


# ---- Partners (colour logos) ----
for name in ("fsmvu", "replit"):
    logo = crop_tight(to_transparent(Image.open(f"{SRC}{name}.png"), 255))
    logo.save(f"{OUT}logo-{name}.png", optimize=True)
    print(name, logo.size)

# ---- HadithTech emblem ----
# The source is only ~47x80px, so: cut the emblem out, upscale it 10x, then
# re-sharpen the soft edges by steepening the alpha curve. The calligraphy is a
# single black shape, so this stays crisp instead of looking blurry.
src = Image.open(f"{SRC}hadithtech.png").convert("RGB")
emblem = src.crop((12, 6, 70, 96))                       # emblem only; wordmark is cut away
big = emblem.resize((emblem.width * 10, emblem.height * 10), Image.LANCZOS)
rgba = to_transparent(big, 242, ink=(26, 26, 26), floor=0.0)
alpha = rgba.getchannel("A").filter(ImageFilter.GaussianBlur(2.2))
a = np.asarray(alpha).astype(np.float32) / 255.0
a = np.clip((a - 0.32) / 0.36, 0, 1)                       # steep curve = crisp edge
a = a * a * (3 - 2 * a)                                    # smoothstep for a clean anti-aliased edge
rgba.putalpha(Image.fromarray((a * 255).astype(np.uint8)))
mark = crop_tight(rgba, pad_ratio=0.02)
mark.save(f"{OUT}logo-hadithtech.png", optimize=True)
print("hadithtech", mark.size)
