#!/usr/bin/env python3
"""
Scrape YouTube video IDs from copticorthodoxanswers.org for posts
with empty videoId fields, matching by wp_id.
"""

import glob
import json
import os
import re
import time
from concurrent.futures import ThreadPoolExecutor, as_completed
from urllib.request import urlopen, Request
from urllib.error import HTTPError, URLError

BASE_DIR = os.path.join(os.path.dirname(__file__), "..", "src", "posts")
WP_API = "https://copticorthodoxanswers.org/wp-json/wp/v2/posts"
HEADERS = {"User-Agent": "Mozilla/5.0 (compatible; COA-Scraper/1.0)"}
MAX_WORKERS = 15


def fetch_url(url):
    req = Request(url, headers=HEADERS)
    with urlopen(req, timeout=30) as resp:
        return resp.read().decode("utf-8")


def scan_local_files():
    """Find all .md files with empty videoId, return dict of wp_id -> filepath."""
    empty_files = {}
    md_files = glob.glob(os.path.join(BASE_DIR, "**", "*.md"), recursive=True)
    for path in md_files:
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()
        wp_match = re.search(r'^wp_id:\s*(\d+)', content, re.MULTILINE)
        vid_match = re.search(r'^videoId:\s*""\s*$', content, re.MULTILINE)
        if wp_match and vid_match:
            wp_id = int(wp_match.group(1))
            empty_files[wp_id] = path
    return empty_files


def fetch_wp_post_links():
    """Fetch all post links from WP REST API, return dict of wp_id -> post_url."""
    wp_map = {}
    page = 1
    while True:
        url = f"{WP_API}?per_page=100&page={page}&_fields=id,link"
        print(f"  Fetching WP API page {page}...")
        try:
            data = json.loads(fetch_url(url))
        except HTTPError as e:
            if e.code == 400:
                break
            raise
        if not data:
            break
        for post in data:
            wp_map[post["id"]] = post["link"]
        if len(data) < 100:
            break
        page += 1
    return wp_map


def extract_video_id_from_page(html):
    """Extract the first YouTube video ID from a WordPress post page."""
    match = re.search(r'youtube\.com/embed/([a-zA-Z0-9_-]{11})', html)
    if match:
        return match.group(1)
    match = re.search(r'youtu\.be/([a-zA-Z0-9_-]{11})', html)
    if match:
        return match.group(1)
    match = re.search(r'youtube\.com/watch\?v=([a-zA-Z0-9_-]{11})', html)
    if match:
        return match.group(1)
    return None


def scrape_video_id(wp_id, page_url):
    """Fetch a WordPress post page and extract the YouTube video ID."""
    try:
        html = fetch_url(page_url)
        video_id = extract_video_id_from_page(html)
        return wp_id, video_id, None
    except Exception as e:
        return wp_id, None, str(e)


def update_file(filepath, video_id):
    """Replace videoId: "" with the found video ID in the markdown file."""
    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()
    updated = re.sub(
        r'^(videoId:\s*)""\s*$',
        f'\\1"{video_id}"',
        content,
        count=1,
        flags=re.MULTILINE,
    )
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(updated)


def main():
    print("Step 1: Scanning local files for empty videoIds...")
    empty_files = scan_local_files()
    print(f"  Found {len(empty_files)} files with empty videoId\n")

    if not empty_files:
        print("Nothing to do!")
        return

    print("Step 2: Fetching post URLs from WordPress REST API...")
    wp_links = fetch_wp_post_links()
    print(f"  Fetched {len(wp_links)} posts from API\n")

    to_scrape = {}
    not_found_in_api = []
    for wp_id, filepath in empty_files.items():
        if wp_id in wp_links:
            to_scrape[wp_id] = (filepath, wp_links[wp_id])
        else:
            not_found_in_api.append((wp_id, filepath))

    print(f"Step 3: Scraping {len(to_scrape)} post pages for YouTube video IDs...")
    updated = 0
    failed = []
    no_video = []

    start = time.time()
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        futures = {
            executor.submit(scrape_video_id, wp_id, url): (wp_id, filepath)
            for wp_id, (filepath, url) in to_scrape.items()
        }
        for i, future in enumerate(as_completed(futures), 1):
            wp_id, filepath = futures[future]
            scraped_wp_id, video_id, error = future.result()
            if error:
                failed.append((wp_id, filepath, error))
            elif video_id:
                update_file(filepath, video_id)
                updated += 1
            else:
                no_video.append((wp_id, filepath))
            if i % 50 == 0:
                print(f"  Processed {i}/{len(to_scrape)}...")

    elapsed = time.time() - start
    print(f"  Done in {elapsed:.1f}s\n")

    print("=" * 60)
    print(f"RESULTS:")
    print(f"  Updated:              {updated}")
    print(f"  No video found:       {len(no_video)}")
    print(f"  Fetch errors:         {len(failed)}")
    print(f"  Not in WP API:        {len(not_found_in_api)}")
    print(f"  Total empty files:    {len(empty_files)}")
    print("=" * 60)

    if no_video:
        print(f"\nPosts with no YouTube embed found ({len(no_video)}):")
        for wp_id, filepath in no_video:
            print(f"  wp_id={wp_id}  {os.path.basename(filepath)}")

    if failed:
        print(f"\nFailed to fetch ({len(failed)}):")
        for wp_id, filepath, error in failed:
            print(f"  wp_id={wp_id}  {os.path.basename(filepath)}  Error: {error}")

    if not_found_in_api:
        print(f"\nNot found in WP API ({len(not_found_in_api)}):")
        for wp_id, filepath in not_found_in_api:
            print(f"  wp_id={wp_id}  {os.path.basename(filepath)}")


if __name__ == "__main__":
    main()
