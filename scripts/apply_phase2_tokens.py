"""
Phase 2 Design Tokens Transformer
Systematically updates src/globals.css to use design tokens.
"""

import re

def update_globals_css():
    with open("src/globals.css", "r", encoding="utf-8") as f:
        content = f.read()

    # 1. Update :root with complete design token scales
    token_block = """  /* Typography Scales */
  --fs-micro: 0.75rem;          /* 12px: tags, uppercase badges */
  --fs-small: 0.875rem;         /* 14px: metadata, secondary text */
  --fs-body: 1rem;              /* 16px: standard body prose */
  --fs-lead: 1.25rem;           /* 20px: lead text, statements */
  --fs-h4: 1.35rem;             /* 21.6px: card subheads */
  --fs-h3: clamp(1.4rem, 2.2vw, 1.75rem); /* card headlines, modal heads */
  --fs-h2: clamp(2rem, 3.8vw, 3.25rem);   /* section headings */
  --fs-display: clamp(2.75rem, 6vw, 5.5rem); /* major section display */
  --fs-mega: clamp(4rem, 16vw, 14rem);    /* hero & works wordmarks */

  /* Tracking Scale */
  --track-tight: -0.035em;
  --track-normal: 0em;
  --track-label: 0.08em;

  /* Radius Scale */
  --r-sm: 6px;
  --r-md: 10px;
  --r-lg: 18px;
  --r-pill: 9999px;
  --round: var(--r-lg);

  /* Section Rhythm */
  --section-y: clamp(4rem, 9vh, 8rem);
  --section-y-tight: clamp(2.5rem, 6vh, 4.5rem);
  --stack-gap-sm: 1.5rem;
  --stack-gap-md: 2.5rem;
  --stack-gap-lg: 4rem;

  /* Motion Scale */
  --dur-fast: 150ms;
  --dur-base: 300ms;
  --dur-slow: 600ms;
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);

  /* Contrast & Editorial Palette */
  --flame-ink: #c7350a;          /* >=4.5:1 flame text on light paper/card */
  --on-flame: #ffffff;           /* button text on flame */
  --on-dark: rgba(255, 255, 255, 0.92);
  --on-dark-soft: rgba(255, 255, 255, 0.65);
  --on-dark-mute: rgba(255, 255, 255, 0.38);"""

    # Insert token block into :root
    content = content.replace("  --round: 18px;\n\n  --ease: cubic-bezier(0.22, 1, 0.36, 1);",
                              f"{token_block}\n\n  --ease: cubic-bezier(0.22, 1, 0.36, 1);")

    # Add dark overrides for flame-ink and on-dark in [data-theme="dark"]
    dark_tokens = """  --flame-ink: #ff6a3d;
  --on-dark: rgba(255, 255, 255, 0.92);
  --on-dark-soft: rgba(255, 255, 255, 0.65);
  --on-dark-mute: rgba(255, 255, 255, 0.38);"""
    content = content.replace("  --shadow-lg: 0 30px 80px rgba(0, 0, 0, 0.65);",
                              f"  --shadow-lg: 0 30px 80px rgba(0, 0, 0, 0.65);\n{dark_tokens}")

    # 2. Section paddings
    content = re.sub(r'\.about\s*\{[^}]*padding:[^;]+;',
                     '.about {\n  position: relative;\n  padding: var(--section-y) 0 var(--section-y-tight);', content)
    content = re.sub(r'\.works\s*\{[^}]*padding:[^;]+;',
                     '.works {\n  position: relative;\n  padding: var(--section-y-tight) 0 var(--section-y);', content)
    content = re.sub(r'\.services\s*\{[^}]*padding:[^;]+;',
                     '.services {\n  position: relative;\n  padding: var(--section-y) 0;', content)
    content = re.sub(r'\.stack\s*\{[^}]*padding-bottom:[^;]+;',
                     '.stack {\n  position: relative;\n  padding: var(--section-y) 0;', content)
    content = re.sub(r'\.voices\s*\{[^}]*padding:[^;]+;',
                     '.voices {\n  position: relative;\n  padding: var(--section-y) 0;', content)
    content = re.sub(r'\.awards\s*\{[^}]*padding:[^;]+;',
                     '.awards {\n  position: relative;\n  padding: var(--section-y) 0;', content)
    content = re.sub(r'\.contact\s*\{[^}]*padding:[^;]+;',
                     '.contact {\n  position: relative;\n  padding: var(--section-y) 0 var(--section-y-tight);', content)

    # 3. Move readable text from smoke to slate
    content = re.sub(r'(\.stack-group__label\s*\{[^}]*color:\s*)var\(--smoke\)', r'\1var(--slate)', content)
    content = re.sub(r'(\.voice__period\s*\{[^}]*color:\s*)var\(--smoke\)', r'\1var(--slate)', content)
    content = re.sub(r'(\.field\s+label\s*\{[^}]*color:\s*)var\(--smoke\)', r'\1var(--slate)', content)
    content = re.sub(r'(\.footer__meta\s*\{[^}]*color:\s*)var\(--smoke\)', r'\1var(--slate)', content)

    # 4. Replace hardcoded colors
    content = content.replace("color: #0b0b0b;", "color: var(--on-lime);")
    content = content.replace("rgba(148, 163, 184, 0.05)", "color-mix(in srgb, var(--ink) 5%, transparent)")

    # 5. Radius replacements
    content = re.sub(r'border-radius:\s*999px;', 'border-radius: var(--r-pill);', content)
    content = re.sub(r'border-radius:\s*50%;', 'border-radius: 50%;', content) # keep circle 50%
    content = re.sub(r'border-radius:\s*(?:5px|6px);', 'border-radius: var(--r-sm);', content)
    content = re.sub(r'border-radius:\s*(?:10px|12px|13px|14px|16px);', 'border-radius: var(--r-md);', content)
    content = re.sub(r'border-radius:\s*(?:18px|26px);', 'border-radius: var(--r-lg);', content)

    # 6. Letter spacing replacements
    # Uppercase label trackings
    content = re.sub(r'letter-spacing:\s*(?:0\.02|0\.04|0\.06|0\.08|0\.1|0\.12|0\.14|0\.16)em;',
                     'letter-spacing: var(--track-label);', content)
    # Tight display trackings
    content = re.sub(r'letter-spacing:\s*-(?:0\.03|0\.035|0\.04|0\.045|0\.05)em;',
                     'letter-spacing: var(--track-tight);', content)

    # 7. Font size replacements
    content = re.sub(r'font-size:\s*(?:0\.74|0\.77|0\.78|0\.8|0\.83|0\.85)rem;',
                     'font-size: var(--fs-micro);', content)
    content = re.sub(r'font-size:\s*(?:0\.89|0\.92|0\.94|0\.97)rem;',
                     'font-size: var(--fs-small);', content)
    content = re.sub(r'font-size:\s*(?:1\.0|1\.04|1\.06|1\.08|1\.09|1\.12|1\.18)rem;',
                     'font-size: var(--fs-body);', content)
    content = re.sub(r'font-size:\s*(?:1\.2|1\.4|1\.5|1\.55|1\.6)rem;',
                     'font-size: var(--fs-lead);', content)

    # 8. Transition duration normalization
    content = re.sub(r'\b0\.15s\b', 'var(--dur-fast)', content)
    content = re.sub(r'\b0\.2s\b', 'var(--dur-fast)', content)
    content = re.sub(r'\b0\.25s\b', 'var(--dur-base)', content)
    content = re.sub(r'\b0\.3s\b', 'var(--dur-base)', content)
    content = re.sub(r'\b0\.35s\b', 'var(--dur-base)', content)
    content = re.sub(r'\b0\.4s\b', 'var(--dur-base)', content)
    content = re.sub(r'\b0\.45s\b', 'var(--dur-slow)', content)
    content = re.sub(r'\b0\.5s\b', 'var(--dur-slow)', content)
    content = re.sub(r'\b0\.6s\b', 'var(--dur-slow)', content)
    content = re.sub(r'\b0\.7s\b', 'var(--dur-slow)', content)
    content = re.sub(r'\b0\.8s\b', 'var(--dur-slow)', content)

    with open("src/globals.css", "w", encoding="utf-8") as f:
        f.write(content)

    print("Phase 2 tokens applied successfully to src/globals.css!")

if __name__ == "__main__":
    update_globals_css()
