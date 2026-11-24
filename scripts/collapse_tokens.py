"""
Collapse remaining ad-hoc clamp() and rem font-sizes to design tokens.
"""

import re

def collapse_all_font_sizes():
    with open("src/globals.css", "r", encoding="utf-8") as f:
        content = f.read()

    # Fixed rems and px
    content = re.sub(r'font-size:\s*17px;', 'font-size: var(--fs-body);', content)
    content = re.sub(r'font-size:\s*2\.6rem;', 'font-size: var(--fs-h2);', content)

    # Minor clamps to h4 / lead
    content = re.sub(r'font-size:\s*clamp\(1\.05rem,\s*1\.7vw,\s*1\.35rem\);', 'font-size: var(--fs-h4);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.08rem,\s*1\.8vw,\s*1\.4rem\);', 'font-size: var(--fs-h4);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.1rem,\s*2\.6vw,\s*2rem\);', 'font-size: var(--fs-h4);', content)

    # Subhead clamps to h3
    content = re.sub(r'font-size:\s*clamp\(1\.4rem,\s*3\.4vw,\s*2\.6rem\);', 'font-size: var(--fs-h3);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.5rem,\s*3\.4vw,\s*2\.5rem\);', 'font-size: var(--fs-h3);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.5rem,\s*4vw,\s*3rem\);', 'font-size: var(--fs-h3);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.6rem,\s*2\.4vw,\s*2\.2rem\);', 'font-size: var(--fs-h3);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.7rem,\s*4\.4vw,\s*3\.4rem\);', 'font-size: var(--fs-h3);', content)

    # Heading clamps to h2
    content = re.sub(r'font-size:\s*clamp\(1\.9rem,\s*4\.6vw,\s*3\.6rem\);', 'font-size: var(--fs-h2);', content)
    content = re.sub(r'font-size:\s*clamp\(1\.9rem,\s*5\.2vw,\s*4\.4rem\);', 'font-size: var(--fs-h2);', content)
    content = re.sub(r'font-size:\s*clamp\(2rem,\s*7vw,\s*5rem\);', 'font-size: var(--fs-h2);', content)

    # Display clamps
    content = re.sub(r'font-size:\s*clamp\(2\.5rem,\s*8vw,\s*6\.5rem\);', 'font-size: var(--fs-display);', content)
    content = re.sub(r'font-size:\s*clamp\(100px,\s*14vw,\s*220px\);', 'font-size: var(--fs-display);', content)

    # Mega wordmark clamps
    content = re.sub(r'font-size:\s*clamp\(3\.5rem,\s*17vw,\s*16rem\);', 'font-size: var(--fs-mega);', content)
    content = re.sub(r'font-size:\s*clamp\(5rem,\s*24vw,\s*26rem\);', 'font-size: var(--fs-mega);', content)

    # Remaining letter-spacing:
    content = re.sub(r'letter-spacing:\s*-0\.01em;', 'letter-spacing: var(--track-normal);', content)
    content = re.sub(r'letter-spacing:\s*-0\.02em;', 'letter-spacing: var(--track-tight);', content)

    # Remaining border-radius:
    content = re.sub(r'border-radius:\s*12px\s+0\s+0\s+12px;', 'border-radius: var(--r-md) 0 0 var(--r-md);', content)

    with open("src/globals.css", "w", encoding="utf-8") as f:
        f.write(content)

    print("Collapsed remaining ad-hoc sizes and radii to tokens!")

if __name__ == "__main__":
    collapse_all_font_sizes()
