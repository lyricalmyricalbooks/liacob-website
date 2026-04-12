#!/usr/bin/env python3
"""Download locally-mapped Shopify images from images/shopify/manifest.json."""
from pathlib import Path
import json
import urllib.request
import urllib.error

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / "images/shopify/manifest.json"
TIMEOUT = 30


def main() -> int:
    if not MANIFEST.exists():
        print(f"Manifest not found: {MANIFEST}")
        return 1

    items = json.loads(MANIFEST.read_text())
    ok = 0
    fail = 0

    for item in items:
        local = ROOT / item["local_path"]
        source = item["source_url"]
        local.parent.mkdir(parents=True, exist_ok=True)
        if local.exists() and local.stat().st_size > 0:
            continue

        try:
            with urllib.request.urlopen(source, timeout=TIMEOUT) as response:
                data = response.read()
                if not data:
                    raise ValueError("empty response")
                local.write_bytes(data)
                ok += 1
        except (urllib.error.URLError, urllib.error.HTTPError, TimeoutError, ValueError) as exc:
            fail += 1
            print(f"FAILED: {source} -> {local} ({exc})")

    print(f"Downloaded: {ok}, Failed: {fail}, Total: {len(items)}")
    return 0 if fail == 0 else 2


if __name__ == "__main__":
    raise SystemExit(main())
