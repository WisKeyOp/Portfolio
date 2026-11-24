"""
Phase 0 Baseline Metrics Collector
Grep counts:
- Hex colours outside :root / [data-theme] blocks in src/
- Tailwind palette classes in src/
- animate-ping | animate-pulse in src/
- Distinct font-size, border-radius, letter-spacing, transition/animation durations in src/globals.css
"""

import os
import re

def parse_globals_css():
    css_path = "src/globals.css"
    with open(css_path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find distinct font-size
    fs_matches = re.findall(r'font-size:\s*([^;]+);', content)
    fs_set = set(m.strip() for m in fs_matches)

    # Find distinct border-radius
    br_matches = re.findall(r'border-radius:\s*([^;]+);', content)
    br_set = set(m.strip() for m in br_matches)

    # Find distinct letter-spacing
    ls_matches = re.findall(r'letter-spacing:\s*([^;]+);', content)
    ls_set = set(m.strip() for m in ls_matches)

    # Find distinct transition and animation durations
    # e.g., 0.2s, 150ms, etc.
    trans_lines = re.findall(r'(?:transition|animation|transition-duration|animation-duration):\s*([^;]+);', content)
    durations = set()
    for l in trans_lines:
        found = re.findall(r'(\d*\.?\d+(?:ms|s))\b', l)
        durations.update(found)

    return len(fs_set), len(br_set), len(ls_set), len(durations), fs_set, br_set, ls_set, durations

def count_tailwind_palettes():
    palettes = r'\b(?:zinc|slate|gray|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose)-(?:50|100|200|300|400|500|600|700|800|900|950)\b'
    count = 0
    matches = []
    for root, _, files in os.walk("src"):
        for file in files:
            if file.endswith((".tsx", ".ts", ".html", ".css")):
                p = os.path.join(root, file)
                with open(p, "r", encoding="utf-8") as f:
                    text = f.read()
                    m = re.findall(palettes, text)
                    if m:
                        count += len(m)
                        matches.append((p, m))
    return count, matches

def count_pings_pulses():
    pattern = r'\b(?:animate-ping|animate-pulse)\b'
    count = 0
    matches = []
    for root, _, files in os.walk("src"):
        for file in files:
            if file.endswith((".tsx", ".ts", ".html", ".css")):
                p = os.path.join(root, file)
                with open(p, "r", encoding="utf-8") as f:
                    text = f.read()
                    m = re.findall(pattern, text)
                    if m:
                        count += len(m)
                        matches.append((p, m))
    return count, matches

def count_hex_colors_outside_theme():
    # In globals.css, skip lines inside :root { ... } and [data-theme=...] { ... }
    # In other src/ files, count all #hex
    hex_pattern = r'#(?:[0-9a-fA-F]{8}|[0-9a-fA-F]{6}|[0-9a-fA-F]{4}|[0-9a-fA-F]{3})\b'
    
    total_hex = 0
    hex_locations = []

    # 1. Inspect globals.css with state machine to skip :root and [data-theme] blocks
    with open("src/globals.css", "r", encoding="utf-8") as f:
        lines = f.readlines()

    in_theme_block = False
    brace_depth = 0
    for idx, line in enumerate(lines):
        clean = line.strip()
        if re.search(r'(:root|\[data-theme)', clean):
            in_theme_block = True

        if in_theme_block:
            brace_depth += clean.count('{') - clean.count('}')
            if brace_depth <= 0:
                in_theme_block = False
                brace_depth = 0
            continue
        
        # We are outside theme block
        matches = re.findall(hex_pattern, line)
        if matches:
            total_hex += len(matches)
            hex_locations.append((f"src/globals.css:{idx+1}", matches))

    # 2. Inspect all other src/ files
    for root, _, files in os.walk("src"):
        for file in files:
            if file == "globals.css":
                continue
            if file.endswith((".tsx", ".ts", ".css")):
                p = os.path.join(root, file)
                with open(p, "r", encoding="utf-8") as f:
                    for idx, line in enumerate(f):
                        matches = re.findall(hex_pattern, line)
                        if matches:
                            total_hex += len(matches)
                            hex_locations.append((f"{p}:{idx+1}", matches))

    return total_hex, hex_locations

if __name__ == "__main__":
    fs_len, br_len, ls_len, dur_len, fs_set, br_set, ls_set, durations = parse_globals_css()
    tw_count, tw_matches = count_tailwind_palettes()
    ping_pulse_count, pp_matches = count_pings_pulses()
    hex_count, hex_locs = count_hex_colors_outside_theme()

    print("=== PHASE 0 BASELINE COUNTS ===")
    print(f"1. Hex colours outside :root/[data-theme]: {hex_count}")
    print(f"2. Tailwind palette classes: {tw_count}")
    print(f"3. animate-ping | animate-pulse: {ping_pulse_count}")
    print(f"4. Distinct font-size in globals.css: {fs_len}")
    print(f"5. Distinct border-radius in globals.css: {br_len}")
    print(f"6. Distinct letter-spacing in globals.css: {ls_len}")
    print(f"7. Distinct transition/animation durations in globals.css: {dur_len}")
    print("\nSample hex locations:")
    for loc, hx in hex_locs[:10]:
        print(f"  {loc}: {hx}")
    print(f"\nSample Tailwind palette files ({len(tw_matches)} files with {tw_count} occurrences):")
    for p, m in tw_matches[:5]:
        print(f"  {p}: {m[:4]}")
