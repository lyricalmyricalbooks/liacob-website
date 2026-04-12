#!/usr/bin/env python3
"""Import already-saved image files into images/shopify/ using manifest mappings.

Usage:
  python scripts/import_local_images.py /path/to/your/exported/images
"""

from __future__ import annotations

from pathlib import Path
import json
import shutil
import sys
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parents[1]
MANIFEST_PATH = ROOT / "images/shopify/manifest.json"
SUPPORTED_EXTS = {".jpg", ".jpeg", ".png", ".webp", ".gif", ".avif", ".jfif"}


def usage() -> int:
    print("Usage: python scripts/import_local_images.py /absolute/or/relative/path/to/local/images")
    return 1


def build_source_index(source_root: Path) -> dict[str, list[Path]]:
    index: dict[str, list[Path]] = {}
    for path in source_root.rglob("*"):
        if not path.is_file():
            continue
        if path.suffix.lower() not in SUPPORTED_EXTS:
            continue
        index.setdefault(path.name.lower(), []).append(path)
    return index


def source_filename_from_url(url: str) -> str:
    parsed = urlparse(url)
    return Path(parsed.path).name


def main(argv: list[str]) -> int:
    if len(argv) != 2:
        return usage()

    source_root = Path(argv[1]).expanduser().resolve()
    if not source_root.exists() or not source_root.is_dir():
        print(f"Source folder not found: {source_root}")
        return 1

    if not MANIFEST_PATH.exists():
        print(f"Manifest not found: {MANIFEST_PATH}")
        return 1

    entries = json.loads(MANIFEST_PATH.read_text())
    source_index = build_source_index(source_root)

    copied = 0
    missing = 0

    for entry in entries:
        local_rel = entry["local_path"]
        source_url = entry["source_url"]
        expected_name = source_filename_from_url(source_url).lower()

        candidates = source_index.get(expected_name, [])
        if not candidates:
            missing += 1
            continue

        src = candidates[0]
        dst = ROOT / local_rel
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied += 1

    print(f"Imported {copied} file mappings.")
    if missing:
        print(f"Missing {missing} mappings. Ensure the source folder contains the original Shopify filenames.")
        return 2

    print("Done. All mapped images were imported.")
    return 0


if __name__ == "__main__":
    raise SystemExit(main(sys.argv))
