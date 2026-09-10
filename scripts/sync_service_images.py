"""
public/musteri/<hizmet>/{ust-slayt,oncesi-sonrasi} klasörlerini tarar
ve lib/musteri-images.ts dosyasını yeniden üretir.

Kullanım:
  python scripts/sync_service_images.py

veya: npm run sync-images
"""
from __future__ import annotations

from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
M = ROOT / "public" / "musteri"
OUT = ROOT / "lib" / "musteri-images.ts"

SERVICES = [
    ("dusakabin", "Duşakabin Tamir ve Yenileme"),
    ("tesisat", "Sıhhi Tesisat"),
    ("klozet", "Rezervuar ve Klozet"),
    ("musluk", "Musluk ve Batarya"),
    ("fayans", "Fayans / Seramik"),
    ("mutfak", "Mutfak ve Dolap"),
]

SLOTS = ("ust-slayt", "oncesi-sonrasi")
IMG_EXTS = {".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"}


def list_public_paths(folder: Path) -> list[str]:
    if not folder.is_dir():
        return []
    files = [
        p
        for p in folder.iterdir()
        if p.is_file()
        and p.suffix.lower() in IMG_EXTS
        and not p.name.startswith(".")
        and p.name.lower() not in {"kart.webp", "kart.jpg", "kategori.webp", "kategori.jpg"}
    ]
    files.sort(key=lambda p: p.name.lower())
    rel = folder.relative_to(M).as_posix()
    return [f"/musteri/{rel}/{p.name}" for p in files]


def fmt_export(name: str, paths: list[str]) -> str:
    if not paths:
        return f"export const {name}: string[] = [];\n"
    body = ",\n".join(f'  "{p}"' for p in paths)
    return f"export const {name}: string[] = [\n{body},\n];\n"


def main() -> None:
    lines: list[str] = [
        "/**",
        " * Otomatik üretildi — elle düzenleme.",
        " * Görsel eklemek için ilgili klasöre koyup `npm run sync-images` çalıştır.",
        " *",
        " * Klasör yapısı:",
        " *   public/musteri/<hizmet>/kategori.webp",
        " *   public/musteri/<hizmet>/ust-slayt/        → yazı altı slayt",
        " *   public/musteri/<hizmet>/oncesi-sonrasi/  → alt slayt",
        " */",
        "",
    ]

    hero = list_public_paths(M / "hero")
    lines.append(fmt_export("heroSliderImages", hero))
    print("hero", len(hero))

    for key, title in SERVICES:
        ust = list_public_paths(M / key / "ust-slayt")
        after = list_public_paths(M / key / "oncesi-sonrasi")
        lines.append(f"\n/** {title} */")
        lines.append(fmt_export(f"{key}UstSlayt", ust))
        lines.append(fmt_export(f"{key}OncesiSonrasi", after))
        print(f"{key:10} ust-slayt={len(ust):3}  oncesi-sonrasi={len(after):3}  ({title})")

    # Geriye dönük kısa alias'lar (eski importlar)
    lines.append("\n/** Alias — content.ts */")
    for key, _ in SERVICES:
        lines.append(f"export const {key}Ust = {key}UstSlayt;")
        lines.append(f"export const {key}Alt = {key}OncesiSonrasi;")
    lines.append("export const dusakabinVitrin = dusakabinUstSlayt;")

    OUT.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print("WROTE", OUT)


if __name__ == "__main__":
    main()
