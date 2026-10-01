#!/bin/sh
# Rebuild src/fonts/NotoSerifTC-subset.woff2 so it covers every character used
# on the page. Run this after editing any Chinese text in index.html or the
# glyph pool in src/main.js.
#
# Needs: pip install fonttools brotli
# Source font (SIL OFL): https://github.com/google/fonts/tree/main/ofl/notoseriftc
set -e
cd "$(dirname "$0")/.."
SRC="${1:-tools/NotoSerifTC[wght].ttf}"
if [ ! -f "$SRC" ]; then
  curl -L -o "$SRC" "https://github.com/google/fonts/raw/main/ofl/notoseriftc/NotoSerifTC%5Bwght%5D.ttf"
fi
python3 - <<'PY' > /tmp/font-chars.txt
import re
text = open("index.html", encoding="utf-8").read() + open("src/main.js", encoding="utf-8").read()
chars = sorted(set(text) | set(chr(c) for c in range(0x20, 0x7f)))
print("".join(chars), end="")
PY
pyftsubset "$SRC" --text-file=/tmp/font-chars.txt --flavor=woff2 \
  --layout-features='*' --output-file=src/fonts/NotoSerifTC-subset.woff2
ls -l src/fonts/NotoSerifTC-subset.woff2
