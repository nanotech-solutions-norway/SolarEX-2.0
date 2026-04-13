#!/usr/bin/env python3
"""Basic HTML quality audit for SolarEX static pages."""

from __future__ import annotations

import os
import sys
from dataclasses import dataclass
from html.parser import HTMLParser
from pathlib import Path


@dataclass
class Issue:
    file: str
    message: str


class HtmlProbe(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.lang: str | None = None
        self.has_title = False
        self.in_title = False
        self.title_text = ""
        self.has_meta_description = False
        self.h1_count = 0
        self.links: list[str] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attrs_dict = dict(attrs)

        if tag == "html":
            self.lang = attrs_dict.get("lang")
        elif tag == "title":
            self.in_title = True
            self.has_title = True
        elif tag == "meta":
            if (attrs_dict.get("name") or "").lower() == "description" and (attrs_dict.get("content") or "").strip():
                self.has_meta_description = True
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "a":
            href = attrs_dict.get("href")
            if href:
                self.links.append(href)

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self.in_title = False

    def handle_data(self, data: str) -> None:
        if self.in_title:
            self.title_text += data


def find_html_files(root: Path) -> list[Path]:
    files: list[Path] = []
    for path in root.rglob("*.html"):
        if ".git" in path.parts:
            continue
        files.append(path)
    return sorted(files)


def normalize_repo_path(path: Path, root: Path) -> str:
    return path.relative_to(root).as_posix()


def check_relative_link(link: str, source: Path, root: Path, known_files: set[str]) -> bool:
    if link.startswith(("http://", "https://", "mailto:", "tel:", "#", "javascript:")):
        return True

    clean = link.split("#", 1)[0].split("?", 1)[0]
    if not clean:
        return True

    # Absolute directory or file path from site root.
    if clean.startswith("/"):
        normalized = clean.lstrip("/")
    else:
        normalized = Path(normalize_repo_path(source.parent, root), clean).as_posix()

    normalized = os.path.normpath(normalized).replace("\\", "/")
    normalized = "" if normalized == "." else normalized

    if normalized in known_files:
        return True

    # Permit directory links that resolve to index.html
    candidate_index = f"{normalized.rstrip('/')}/index.html" if normalized else "index.html"
    return candidate_index in known_files


def main() -> int:
    repo_root = Path(__file__).resolve().parents[1]
    html_files = find_html_files(repo_root)
    known_files = {normalize_repo_path(path, repo_root) for path in html_files}

    issues: list[Issue] = []

    for file_path in html_files:
        rel = normalize_repo_path(file_path, repo_root)
        parser = HtmlProbe()
        parser.feed(file_path.read_text(encoding="utf-8"))

        if not parser.lang:
            issues.append(Issue(rel, "missing html[lang]"))
        if not parser.has_title or not parser.title_text.strip():
            issues.append(Issue(rel, "missing non-empty <title>"))
        if not parser.has_meta_description:
            issues.append(Issue(rel, "missing meta description"))
        if parser.h1_count == 0:
            issues.append(Issue(rel, "missing <h1>"))
        if parser.h1_count > 1:
            issues.append(Issue(rel, f"multiple <h1> elements ({parser.h1_count})"))

        for link in parser.links:
            if not check_relative_link(link, file_path, repo_root, known_files):
                issues.append(Issue(rel, f"broken internal link: {link}"))

    print(f"Scanned {len(html_files)} HTML files.")

    if issues:
        print("Found issues:")
        for issue in issues:
            print(f"- {issue.file}: {issue.message}")
        return 1

    print("No structural issues found.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
