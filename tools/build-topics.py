#!/usr/bin/env python3
"""
從「JoVE 全主題_含網址.xlsx」產生 data/topics.js（主題代碼 → 名稱與網址）

用法：
  python3 tools/build-topics.py "/Users/飛資得醫學/01_產品相關資料/2026JoVE全主題_含網址.xlsx"

需要 openpyxl（pip3 install openpyxl）。
Excel 格式：第 2 列為標題（模組／Product／Title／網址），模組與 Product 欄可合併儲存格（空白沿用上一列）。
主題代碼 = 產品代碼 + Title，例如 journal-biology、se-basic-biology、core-calculus。
"""
import json
import re
import sys
from pathlib import Path

import openpyxl

# Product 名稱 → 產品代碼與顯示名稱
PRODUCTS = [
    ("journal", "journal", "Journal"),
    ("encyclopedia", "eoe", "Encyclopedia of Experiments"),
    ("science education", "se", "Science Education"),
    ("core", "core", "Core"),
    ("lab manual", "lab", "Lab Manual"),
    ("business", "business", "Business"),
]


def product_of(raw):
    text = re.sub(r"\s+", " ", raw or "").strip().lower()
    for key, code, label in PRODUCTS:
        if text.startswith(key) or key in text:
            return code, label
    raise ValueError(f"無法辨識的 Product：{raw!r}，請在 PRODUCTS 中新增")


def slug(text):
    return re.sub(r"[^a-z0-9]+", "-", text.lower().replace("&", "and")).strip("-")


def main():
    if len(sys.argv) < 2:
        sys.exit(__doc__)
    ws = openpyxl.load_workbook(sys.argv[1], read_only=True).active
    topics, order = {}, []
    module = product = None
    for row in ws.iter_rows(min_row=3, values_only=True):
        mod, prod, title, url = (list(row) + [None] * 4)[:4]
        if mod:
            module = str(mod).strip()
        if prod:
            product = str(prod)
        if not title or not url:
            continue
        code, label = product_of(product)
        title = str(title).strip()
        key = f"{code}-{slug(title)}"
        if key in topics:
            raise ValueError(f"重複的主題代碼：{key}")
        topics[key] = {"module": module, "product": label, "title": title, "url": str(url).strip()}
        order.append(key)

    out = Path(__file__).resolve().parent.parent / "data" / "topics.js"
    lines = [
        "/**",
        " * JoVE 全主題清單（由 tools/build-topics.py 從 Excel 自動產生，請勿手動修改）",
        " * schools.js 的 topics 只要填主題代碼，例如 \"journal-biology\"、\"core-calculus\"",
        " */",
        "const TOPICS = {",
    ]
    for i, key in enumerate(order):
        comma = "," if i < len(order) - 1 else ""
        lines.append(f"  {json.dumps(key)}: {json.dumps(topics[key], ensure_ascii=False)}{comma}")
    lines.append("};")
    out.write_text("\n".join(lines) + "\n", encoding="utf-8")
    print(f"已產生 {out}（{len(order)} 個主題）")


if __name__ == "__main__":
    main()
