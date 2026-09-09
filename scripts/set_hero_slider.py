from pathlib import Path
from PIL import Image
import re

ASSETS = Path(
    r"C:\Users\ERDIN\.cursor\projects\c-Users-ERDIN-Desktop-Tuncay-website\assets"
)
HERO = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\public\musteri\hero")
TS = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\lib\musteri-images.ts")

# Prefer the exact WhatsApp batch from this message
srcs = sorted(
    [
        p
        for p in ASSETS.glob("*.jpg")
        if "WhatsApp_Image_2026-09-08_at_00.01." in p.name
        or "WhatsApp_Image_2026-09-08_at_00.01." in p.name.replace("__", "_")
    ],
    key=lambda p: p.name,
)

# Fallback: any matching 00.01
if len(srcs) < 12:
    srcs = sorted(
        [p for p in ASSETS.glob("*.jpg") if "00.01.2" in p.name],
        key=lambda p: p.name,
    )

print(f"found {len(srcs)} sources")
for s in srcs:
    print(" -", s.name[-80:])

HERO.mkdir(parents=True, exist_ok=True)

# Clear old hero numbered files? Keep backup by renaming to old- then write s- prefix
# Customer wants these ON the homepage slider — use them as the slider set.
for old in HERO.glob("*.webp"):
    old.unlink()

out_paths = []
for i, src in enumerate(srcs, 1):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = min(1.0, 1600 / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    name = f"s{i:02d}.webp"
    dst = HERO / name
    im.save(dst, "WEBP", quality=85, method=6)
    out_paths.append(f"/musteri/hero/{name}")
    print(f"{name} {im.size} {dst.stat().st_size // 1024}KB <- {src.name[-60:]}")

# Update only heroSliderImages in musteri-images.ts — regenerate full file from folders
M = HERO.parent


def list_paths(folder: Path):
    rel = folder.relative_to(M).as_posix()
    return [
        f"/musteri/{rel}/{p.name}"
        for p in sorted(folder.glob("*.webp"))
        if p.name != "kart.webp" and p.name != "kategori.webp"
    ]


def fmt(name, arr):
    body = ",\n".join(f'  "{x}"' for x in arr)
    return f"export const {name} = [\n{body},\n];\n"


ts = "/** Musteri gorselleri - duzenli listeler */\n\n"
ts += fmt("heroSliderImages", out_paths) + "\n"
for svc in ["dusakabin", "tesisat", "klozet", "musluk", "fayans", "mutfak"]:
    ts += fmt(f"{svc}Ust", list_paths(M / svc / "ust")) + "\n"
    ts += fmt(f"{svc}Alt", list_paths(M / svc / "alt")) + "\n"

TS.write_text(ts, encoding="utf-8")
print("WROTE", TS)
print("HERO COUNT", len(out_paths))
