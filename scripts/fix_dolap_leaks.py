from pathlib import Path
import hashlib

M = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\public\musteri")
TS = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\lib\musteri-images.ts")


def md5(p: Path) -> str:
    return hashlib.md5(p.read_bytes()).hexdigest()


def renumber(dirpath: Path):
    files = sorted(
        [p for p in dirpath.glob("*.webp") if p.name != "kart.webp"],
        key=lambda p: p.name,
    )
    tmps = []
    for i, p in enumerate(files, 1):
        t = dirpath / f"__t{i:03d}.webp"
        p.rename(t)
        tmps.append(t)
    outs = []
    for i, t in enumerate(tmps, 1):
        f = dirpath / f"{i:02d}.webp"
        t.rename(f)
        outs.append(f)
    return outs


def list_paths(folder: Path):
    rel = folder.relative_to(M).as_posix()
    return [
        f"/musteri/{rel}/{p.name}"
        for p in sorted(folder.glob("*.webp"))
        if p.name != "kart.webp"
    ]


def fmt(name, arr):
    body = ",\n".join(f'  "{x}"' for x in arr)
    return f"export const {name} = [\n{body},\n];\n"


# 1) Remove musluk dups from mutfak/ust 01-09
musluk_hashes = {md5(p): p for p in (M / "musluk").rglob("*.webp")}
mutfak_ust = M / "mutfak" / "ust"
for i in range(1, 10):
    p = mutfak_ust / f"{i:02d}.webp"
    if not p.exists():
        continue
    h = md5(p)
    if h in musluk_hashes:
        print("DEL mutfak/ust", p.name, "dup of", musluk_hashes[h].relative_to(M))
        p.unlink()
    else:
        dst = M / "musluk" / "ust" / f"from-dolap-{i:02d}.webp"
        p.rename(dst)
        print("MOVE", p.name, "->", dst.relative_to(M))

# 2) Fayans alt 01-09 look like musluk dims — remove if dup of musluk
fayans_alt = M / "fayans" / "alt"
for i in range(1, 10):
    p = fayans_alt / f"{i:02d}.webp"
    if not p.exists():
        continue
    h = md5(p)
    # refresh musluk hashes
    musluk_hashes = {md5(x): x for x in (M / "musluk").rglob("*.webp")}
    if h in musluk_hashes:
        print("DEL fayans/alt", p.name, "dup of", musluk_hashes[h].relative_to(M))
        p.unlink()
    else:
        # still likely musluk product if size matches known pattern — move to musluk
        im_size_hint = p.stat().st_size
        # move unique musluk-like into musluk ust
        dst = M / "musluk" / "ust" / f"from-fayans-{i:02d}.webp"
        p.rename(dst)
        print("MOVE fayans/alt", p.name, "->", dst.relative_to(M))

# 3) renumber affected dirs
for svc, sub in [
    ("mutfak", "ust"),
    ("mutfak", "alt"),
    ("musluk", "ust"),
    ("musluk", "alt"),
    ("fayans", "ust"),
    ("fayans", "alt"),
]:
    n = renumber(M / svc / sub)
    print(f"renumber {svc}/{sub}: {len(n)}")

# 4) regenerate lists
ts = "/** Musteri gorselleri - duzenli listeler */\n\n"
ts += fmt("heroSliderImages", list_paths(M / "hero")) + "\n"
for svc in ["dusakabin", "tesisat", "klozet", "musluk", "fayans", "mutfak"]:
    ts += fmt(f"{svc}Ust", list_paths(M / svc / "ust")) + "\n"
    ts += fmt(f"{svc}Alt", list_paths(M / svc / "alt")) + "\n"
    print(
        svc,
        "ust",
        len(list((M / svc / "ust").glob("*.webp"))),
        "alt",
        len(list((M / svc / "alt").glob("*.webp"))),
    )

TS.write_text(ts, encoding="utf-8")
print("WROTE", TS)
