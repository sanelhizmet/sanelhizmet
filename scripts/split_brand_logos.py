from pathlib import Path
from PIL import Image
import re

M = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\public\musteri")
OUT = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\public\brands")
OUT.mkdir(parents=True, exist_ok=True)


def slugify(name: str) -> str:
    n = name.lower().strip()
    tr = str.maketrans("çğıöşüâîû", "cgiosuaiu")
    n = n.translate(tr)
    n = re.sub(r"[^a-z0-9]+", "-", n).strip("-")
    return n


def save_cell(cell: Image.Image, folder: str, name: str):
    bid = slugify(name)
    d = OUT / folder
    d.mkdir(exist_ok=True)
    # upscale small logos for sharper marquee
    w, h = cell.size
    if max(w, h) < 280:
        scale = 280 / max(w, h)
        cell = cell.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    path = d / f"{bid}.png"
    cell.convert("RGB").save(path, "PNG", optimize=True)
    return bid, name, f"/brands/{folder}/{bid}.png"


def crop_grid(im, rows, cols, names, folder, pad=0.04):
    w, h = im.size
    cw, ch = w / cols, h / rows
    saved = []
    for i, name in enumerate(names):
        r, c = divmod(i, cols)
        x0 = int(c * cw + cw * pad)
        y0 = int(r * ch + ch * pad)
        x1 = int((c + 1) * cw - cw * pad)
        y1 = int((r + 1) * ch - ch * pad)
        cell = im.crop((x0, y0, x1, y1))
        saved.append(save_cell(cell, folder, name))
    return saved


# FAYANS
im = Image.open(M / "fayans" / "markalar.webp").convert("RGB")
fayans_names = [
    "Etili Seramik",
    "Seramiksan",
    "NG Kutahya Seramik",
    "Canakkale Seramik",
    "Kale",
    "Ege Seramik",
    "Duratiles",
    "Yurtbay Seramik",
    "Bien",
]
fayans = crop_grid(
    im.crop((0, 0, im.width, int(im.height * 0.78))), 3, 3, fayans_names, "fayans"
)
vitra = im.crop(
    (int(im.width * 0.35), int(im.height * 0.78), int(im.width * 0.65), int(im.height * 0.98))
)
fayans.append(save_cell(vitra, "fayans", "VitrA"))

# KLOZET
im = Image.open(M / "klozet" / "markalar.webp").convert("RGB")
klozet_rows = [
    (0.00, 0.20, ["Geberit", "VitrA", "NKP"]),
    (0.20, 0.40, ["E.C.A.", "SEREL", "creavit"]),
    (0.40, 0.58, ["Kale", "GROHE", "SIAMP"]),
    (0.58, 0.76, ["VISAM", "SANICA", "Japar"]),
    (0.76, 1.00, ["valsir", "SCHWAB", "TECE", "BOCCHI"]),
]
klozet = []
w, h = im.size
for y0r, y1r, names in klozet_rows:
    band = im.crop((0, int(h * y0r), w, int(h * y1r)))
    cols = len(names)
    bw, bh = band.size
    for i, name in enumerate(names):
        x0 = int(i * bw / cols + bw * 0.02)
        x1 = int((i + 1) * bw / cols - bw * 0.02)
        cell = band.crop((x0, int(bh * 0.08), x1, int(bh * 0.92)))
        klozet.append(save_cell(cell, "klozet", name))

# MUTFAK
im = Image.open(M / "mutfak" / "markalar.webp").convert("RGB")
mutfak = crop_grid(
    im,
    2,
    5,
    [
        "Koctas",
        "IKEA",
        "Tekzen",
        "Bauhaus",
        "Pratikler",
        "Evidea",
        "Hepsiburada",
        "Trendyol",
        "n11",
        "Amazon",
    ],
    "mutfak",
    pad=0.05,
)

# TESISAT
im = Image.open(M / "tesisat" / "markalar.webp").convert("RGB")
tesisat = crop_grid(
    im,
    2,
    5,
    [
        "Turkoglu",
        "TDS Tekneciler",
        "VESBO",
        "Wavin Pilsa",
        "Hakan Plastik",
        "KAS",
        "E.C.A.",
        "Dizayn Grup",
        "kalde",
        "Firatboru",
    ],
    "tesisat",
    pad=0.04,
)


def fmt(items):
    return "\n".join(
        f'  {{ id: "{bid}", name: "{name}", logo: "{logo}" }},'
        for bid, name, logo in items
    )


ts = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\lib\brands.ts")
ts.write_text(
    f'''export type Brand = {{
  id: string;
  name: string;
  logo?: string;
}};

export const klozetBrands: Brand[] = [
{fmt(klozet)}
];

export const fayansBrands: Brand[] = [
{fmt(fayans)}
];

export const mutfakBrands: Brand[] = [
{fmt(mutfak)}
];

export const tesisatBrands: Brand[] = [
{fmt(tesisat)}
];

/** Hizmet slug -> kayar marka listesi */
export const brandsByServiceSlug: Record<string, Brand[]> = {{
  "rezervuar-klozet": klozetBrands,
  fayans: fayansBrands,
  mutfak: mutfakBrands,
  "sihhi-tesisat": tesisatBrands,
}};
''',
    encoding="utf-8",
)
print("ok", len(klozet), len(fayans), len(mutfak), len(tesisat))
