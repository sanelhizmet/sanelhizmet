from PIL import Image
from pathlib import Path

src_dir = Path(r"C:\Users\ERDIN\Desktop\Tuncay website\yeni part")
out_dir = Path(__file__).resolve().parents[1] / "public" / "musteri" / "dusakabin" / "vitrin"
out_dir.mkdir(parents=True, exist_ok=True)

for p in out_dir.glob("*"):
    p.unlink()

files = []
seen = set()
for pattern in ("*.jpeg", "*.jpg", "*.png", "*.webp"):
    for f in sorted(src_dir.glob(pattern)):
        key = f.resolve()
        if key not in seen:
            seen.add(key)
            files.append(f)

print("source count", len(files))
paths = []
for i, f in enumerate(files, 1):
    img = Image.open(f).convert("RGB")
    img.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
    name = f"{i:02d}.webp"
    dest = out_dir / name
    img.save(dest, "WEBP", quality=82, method=6)
    paths.append(f"/musteri/dusakabin/vitrin/{name}")
    print(i, f.name, "->", name, img.size, dest.stat().st_size)

print("PATHS=")
for p in paths:
    print(p)
