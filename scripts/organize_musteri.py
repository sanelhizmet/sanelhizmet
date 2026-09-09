from pathlib import Path
from PIL import Image
import hashlib

MUSTERI = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\public\musteri")
PART2 = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\part2")
TS_OUT = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\lib\musteri-images.ts")

by_idx = {
    i: p
    for i, p in enumerate(
        sorted(
            PART2.glob("*.jpeg"),
            key=lambda p: (0 if not p.name.startswith("WhatsApp") else 1, p.name.lower()),
        ),
        1,
    )
}


def to_webp(src: Path, dst: Path, max_side=1600, quality=82):
    im = Image.open(src).convert("RGB")
    w, h = im.size
    scale = min(1.0, max_side / max(w, h))
    if scale < 1:
        im = im.resize((int(w * scale), int(h * scale)), Image.Resampling.LANCZOS)
    dst.parent.mkdir(parents=True, exist_ok=True)
    im.save(dst, "WEBP", quality=quality, method=6)


# Ensure hero copies from part2
for idx in [7, 12, 26, 38]:
    dst = MUSTERI / "hero" / f"p2-{idx:02d}.webp"
    if not dst.exists():
        to_webp(by_idx[idx], dst)
        print("HERO", dst.name)

# Within-folder exact dups
removed = 0
for folder in sorted({p.parent for p in MUSTERI.rglob("*.webp")}):
    seen = {}
    for p in sorted(folder.glob("*.webp")):
        h = hashlib.md5(p.read_bytes()).hexdigest()
        if h in seen:
            print("DUP", p.relative_to(MUSTERI), "<-", seen[h])
            p.unlink()
            removed += 1
        else:
            seen[h] = p.name
print("within dups removed", removed)

# Cross musluk/mutfak identical product shots: keep musluk, drop mutfak copy
# Cross fayans/hero: keep both if in different roles? Prefer keep hero + fayans only one each path
hash_map = {}
for p in MUSTERI.rglob("*.webp"):
    hash_map.setdefault(hashlib.md5(p.read_bytes()).hexdigest(), []).append(p)

cross = 0
for paths in hash_map.values():
    if len(paths) < 2:
        continue
    services = set()
    for x in paths:
        for s in ("musluk", "mutfak", "fayans", "hero", "dusakabin", "tesisat", "klozet"):
            if s in x.parts:
                services.add(s)
    # musluk+mutfak shared: keep musluk
    if services == {"musluk", "mutfak"}:
        for x in paths:
            if "mutfak" in x.parts:
                print("CROSS", x.relative_to(MUSTERI))
                x.unlink()
                cross += 1
    # fayans+hero shared: keep both folders' purpose — keep hero, delete fayans copy only if identical filename role
    elif services == {"fayans", "hero"}:
        for x in paths:
            if "fayans" in x.parts:
                print("CROSS", x.relative_to(MUSTERI))
                x.unlink()
                cross += 1
print("cross removed", cross)


def renumber(dirpath: Path):
    if not dirpath.exists():
        return []
    files = sorted(
        [p for p in dirpath.glob("*.webp") if p.name != "kart.webp"],
        key=lambda p: p.name,
    )
    tmps = []
    for i, p in enumerate(files, 1):
        tmp = dirpath / f"__tmp_{i:03d}.webp"
        p.rename(tmp)
        tmps.append(tmp)
    outs = []
    for i, tmp in enumerate(tmps, 1):
        final = dirpath / f"{i:02d}.webp"
        tmp.rename(final)
        outs.append(final)
    return outs


lists = {}
for svc in ["dusakabin", "tesisat", "klozet", "musluk", "fayans", "mutfak"]:
    ust = renumber(MUSTERI / svc / "ust")
    alt = renumber(MUSTERI / svc / "alt")
    lists[f"{svc}Ust"] = [f"/musteri/{svc}/ust/{p.name}" for p in ust]
    lists[f"{svc}Alt"] = [f"/musteri/{svc}/alt/{p.name}" for p in alt]
    print(svc, "ust", len(ust), "alt", len(alt), "kart", (MUSTERI / svc / "kart.webp").exists())

hero = renumber(MUSTERI / "hero")
lists["heroSliderImages"] = [f"/musteri/hero/{p.name}" for p in hero]
print("hero", len(hero))


def fmt(name, arr):
    body = ",\n".join(f'  "{x}"' for x in arr)
    return f"export const {name} = [\n{body},\n];\n"


ts = "/** Müşteri görselleri — düzenli listeler */\n\n"
ts += fmt("heroSliderImages", lists["heroSliderImages"]) + "\n"
for svc in ["dusakabin", "tesisat", "klozet", "musluk", "fayans", "mutfak"]:
    ts += fmt(f"{svc}Ust", lists[f"{svc}Ust"]) + "\n"
    ts += fmt(f"{svc}Alt", lists[f"{svc}Alt"]) + "\n"

TS_OUT.write_text(ts, encoding="utf-8")
print("WROTE", TS_OUT)
