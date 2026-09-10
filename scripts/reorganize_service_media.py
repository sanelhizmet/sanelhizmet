"""
Hizmet görsellerini net klasör yapısına taşır:

public/musteri/<hizmet>/
  kategori.webp          → ana sayfa kartı + sayfa üst görseli
  ust-slayt/             → yazının altındaki ürün / vitrin slaytı
  oncesi-sonrasi/        → sayfa altındaki öncesi-sonrası slaytı

Mevcut sitede gösterilen doğru eşleşmeye göre taşır (musluk swap dahil).
"""
from __future__ import annotations

import shutil
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
M = ROOT / "public" / "musteri"

# folder_key: (ust_slayt_source_dirs, oncesi_sonrasi_source_dirs)
# Sources relative to M / folder_key
MOVES = {
    "dusakabin": {
        "ust-slayt": ["vitrin"],  # sitede kullanılan vitrin
        "oncesi-sonrasi": ["alt"],
        "arsiv": ["ust"],  # eskiden yanlış yerde kalanlar
    },
    "tesisat": {
        "ust-slayt": ["ust"],
        "oncesi-sonrasi": ["alt"],
        "arsiv": [],
    },
    "klozet": {
        "ust-slayt": ["ust"],
        "oncesi-sonrasi": ["alt"],
        "arsiv": [],
    },
    # Sitede swap edilmişti: alt → üst slayt, ust → öncesi/sonrası
    "musluk": {
        "ust-slayt": ["alt"],
        "oncesi-sonrasi": ["ust"],
        "arsiv": [],
    },
    "fayans": {
        "ust-slayt": ["ust"],
        "oncesi-sonrasi": ["alt"],
        "arsiv": [],
    },
    "mutfak": {
        "ust-slayt": ["ust"],
        "oncesi-sonrasi": ["alt"],
        "arsiv": [],
    },
}

IMG_EXTS = {".webp", ".jpg", ".jpeg", ".png", ".gif", ".avif"}


def list_images(folder: Path) -> list[Path]:
    if not folder.is_dir():
        return []
    return sorted(
        [p for p in folder.iterdir() if p.is_file() and p.suffix.lower() in IMG_EXTS],
        key=lambda p: p.name.lower(),
    )


def copy_into(dest: Path, sources: list[Path], start: int = 1) -> int:
    dest.mkdir(parents=True, exist_ok=True)
    n = start
    for src in sources:
        ext = src.suffix.lower()
        if ext == ".jpeg":
            ext = ".jpg"
        out = dest / f"{n:02d}{ext}"
        shutil.copy2(src, out)
        print(f"  {src.parent.name}/{src.name} -> {dest.parent.name}/{dest.name}/{out.name}")
        n += 1
    return n


def main() -> None:
    for svc, plan in MOVES.items():
        base = M / svc
        if not base.is_dir():
            print("SKIP missing", svc)
            continue

        print("\n===", svc, "===")
        staging = M / f"_tmp_{svc}"
        if staging.exists():
            shutil.rmtree(staging)
        staging.mkdir()

        for slot in ("ust-slayt", "oncesi-sonrasi", "arsiv"):
            files: list[Path] = []
            for src_name in plan.get(slot, []):
                files.extend(list_images(base / src_name))
            if not files and slot == "arsiv":
                continue
            target_name = "_arsiv-eski" if slot == "arsiv" else slot
            if files:
                copy_into(staging / target_name, files)

        # keep kategori / kart at root
        for name in ("kategori.webp", "kart.webp", "kategori.jpg", "kart.jpg"):
            src = base / name
            if src.exists():
                shutil.copy2(src, staging / name)

        # replace service folder
        backup = M / f"_backup_{svc}"
        if backup.exists():
            shutil.rmtree(backup)
        base.rename(backup)
        staging.rename(base)
        shutil.rmtree(backup)
        print("OK", svc)

    # cleanup leftover tmp if any
    for p in M.glob("_tmp_*"):
        shutil.rmtree(p, ignore_errors=True)

    print("\nDONE. Run: python scripts/sync_service_images.py")


if __name__ == "__main__":
    main()
