from pathlib import Path
import shutil

M = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\public\musteri")
TS = Path(r"c:\Users\ERDIN\Desktop\Tuncay website\tuncay-website\lib\musteri-images.ts")


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
        "kart",
        (M / svc / "kart.webp").exists(),
    )
print("hero", len(list((M / "hero").glob("*.webp"))))
TS.write_text(ts, encoding="utf-8")

if not (M / "musluk" / "kart.webp").exists():
    src = sorted((M / "musluk" / "ust").glob("*.webp"))[0]
    shutil.copy2(src, M / "musluk" / "kart.webp")
    print("musluk kart from", src.name)

print("WROTE", TS)
