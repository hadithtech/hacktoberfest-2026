"""
Builds public/og-image.png (link preview, 1200x630) and public/favicon.png
from public/images/logo-hadithtech.png (transparent emblem).

Run it again whenever you replace the logo or change the title/date:
    pip install pillow
    python3 scripts/prepare-logos.py   # only if the source logos changed
    python3 scripts/make-assets.py
(Run `npm install` first: the fonts are read from node_modules.)
"""
import math
from PIL import Image, ImageDraw, ImageFilter, ImageFont

CREAM, CHARCOAL, GOLD = (243, 242, 233), (59, 59, 59), (201, 178, 107)
FONTS = "node_modules/@fontsource/"
W, H, S = 1200, 630, 2                       # final size; everything is drawn at 2x then downsampled
X = lambda v: int(v * S)


def font(path, size):
    return ImageFont.truetype(FONTS + path, X(size))


light = lambda size: font("manrope/files/manrope-latin-300-normal.woff", size)
medium = lambda size: font("manrope/files/manrope-latin-500-normal.woff", size)
serif = lambda size: font("instrument-serif/files/instrument-serif-latin-400-italic.woff", size)

logo = Image.open("public/images/logo-hadithtech.png").convert("RGBA")


def fit(img, box):
    r = min(box[0] / img.width, box[1] / img.height)
    return img.resize((max(1, round(img.width * r)), max(1, round(img.height * r))), Image.LANCZOS)


def spaced(draw, xy, text, fnt, fill, tracking):
    """Text with letter-spacing (PIL has none built in)."""
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=fnt, fill=fill)
        x += draw.textlength(ch, font=fnt) + tracking
    return x


# =============================== og-image.png ===============================
og = Image.new("RGB", (X(W), X(H)), CREAM)

# soft gold glow behind the medallion
CX, CY, R = 925, 315, 190                    # medallion centre and radius
glow = Image.new("RGBA", og.size, GOLD + (0,))
ImageDraw.Draw(glow).ellipse([X(CX - 230), X(CY - 230), X(CX + 230), X(CY + 230)], fill=GOLD + (95,))
glow = glow.filter(ImageFilter.GaussianBlur(X(55)))
og.paste(glow, (0, 0), glow)

d = ImageDraw.Draw(og)

# double hairline frame
d.rectangle([X(28), X(28), X(W - 29), X(H - 29)], outline=GOLD, width=X(1))
d.rectangle([X(38), X(38), X(W - 39), X(H - 39)], outline=GOLD, width=X(0.6))

# medallion: dashed outer ring, solid rings, pale disc, emblem
for i in range(120):                          # dashed ring
    a0, a1 = math.radians(i * 3), math.radians(i * 3 + 1.1)
    r = R + 26
    d.line([(X(CX + r * math.cos(a0)), X(CY + r * math.sin(a0))),
            (X(CX + r * math.cos(a1)), X(CY + r * math.sin(a1)))], fill=GOLD, width=X(1.4))
d.ellipse([X(CX - R - 8), X(CY - R - 8), X(CX + R + 8), X(CY + R + 8)], outline=GOLD, width=X(1))
d.ellipse([X(CX - R), X(CY - R), X(CX + R), X(CY + R)], fill=(252, 251, 246), outline=GOLD, width=X(1.5))
d.ellipse([X(CX - R + 16), X(CY - R + 16), X(CX + R - 16), X(CY + R - 16)], outline=GOLD, width=X(0.6))
d.ellipse([X(CX - 4), X(CY - R - 30), X(CX + 4), X(CY - R - 22)], fill=GOLD)   # accent dot on the ring

mark = fit(logo, (X(R * 2 * 0.58), X(R * 2 * 0.76)))                          # tall emblem, optically centred
og.paste(mark, (X(CX) - mark.width // 2, X(CY) - mark.height // 2), mark)

# text column (left)
LEFT = 92
spaced(d, (X(LEFT), X(96)), "HADITHTECH  ·  ISTANBUL", medium(17), GOLD, X(2.6))
d.text((X(LEFT), X(138)), "Hacktoberfest", font=light(78), fill=CHARCOAL)
d.text((X(LEFT), X(226)), "Mini Hackathon", font=light(78), fill=CHARCOAL)
d.text((X(LEFT), X(314)), "2026", font=serif(86), fill=CHARCOAL)
d.line([(X(LEFT), X(432)), (X(LEFT + 150), X(432))], fill=GOLD, width=X(1.5))
d.text((X(LEFT), X(458)), "Saturday, 24 October 2026  ·  10:00", font=medium(27), fill=CHARCOAL)
d.text((X(LEFT), X(508)), "A one-day open-source coding competition", font=light(23), fill=(59, 59, 59))

og = og.resize((W, H), Image.LANCZOS)
og.save("public/og-image.png", optimize=True)

# =============================== favicon.png ================================
fav = Image.new("RGBA", (256, 256), CREAM + (255,))
m = fit(logo, (150, 214))
fav.alpha_composite(m, ((256 - m.width) // 2, (256 - m.height) // 2))
fav.convert("RGB").save("public/favicon.png", optimize=True)
print("Created public/og-image.png and public/favicon.png")
