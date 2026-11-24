import os
import shutil
from PIL import Image, ImageDraw, ImageFont

SRC_DIR = "scratch/portrait_treatments"
BRAIN_DIR = "C:/Users/User/.gemini/antigravity/brain/e67c482b-ff75-486a-8ffb-eed161035831"

treatments = [
    ("clean", "(a) Clean Color"),
    ("mono", "(b) Editorial Mono"),
    ("duotone", "(c) Warm Duotone")
]

configs = [
    ("1440x900", "light"),
    ("1440x900", "dark"),
    ("390x844", "light"),
    ("390x844", "dark")
]

for vp, theme in configs:
    imgs = []
    for t_id, label in treatments:
        p = os.path.join(SRC_DIR, f"{t_id}-{theme}-{vp}.png")
        if os.path.exists(p):
            im = Image.open(p)
            imgs.append((im, label))

    if not imgs:
        continue

    # Crop or tile
    # For 1440x900, crop width to center around portrait if wide, or take full hero height
    w, h = imgs[0][0].size
    header_h = 48
    comp_w = w * len(imgs)
    comp_h = h + header_h

    # Create composite
    bg_color = (13, 13, 13) if theme == "dark" else (244, 243, 241)
    text_color = (244, 243, 241) if theme == "dark" else (11, 11, 11)

    comp = Image.new("RGB", (comp_w, comp_h), color=bg_color)
    draw = ImageDraw.Draw(comp)

    # Use default font or truetype
    try:
        font = ImageFont.truetype("arial.ttf", 20)
    except:
        font = ImageFont.load_default()

    for idx, (img, label) in enumerate(imgs):
        x = idx * w
        comp.paste(img, (x, header_h))
        # Draw label
        title_text = f"{label} [{theme.upper()} {vp}]"
        draw.text((x + 24, 14), title_text, fill=text_color, font=font)
        if idx > 0:
            line_color = (40, 40, 40) if theme == "dark" else (210, 210, 210)
            draw.line([(x, 0), (x, comp_h)], fill=line_color, width=2)

    out_name = f"comparison-{vp}-{theme}.png"
    out_path = os.path.join(SRC_DIR, out_name)
    comp.save(out_path, quality=92)
    print(f"Saved {out_path}")

    # Copy to brain dir
    brain_out = os.path.join(BRAIN_DIR, out_name)
    shutil.copy2(out_path, brain_out)
    print(f"Copied to {brain_out}")

# Generate focused portrait crops
for vp, theme in [("1440x900", "light"), ("1440x900", "dark")]:
    imgs = []
    for t_id, label in treatments:
        p = os.path.join(SRC_DIR, f"{t_id}-{theme}-{vp}.png")
        if os.path.exists(p):
            im = Image.open(p)
            # Crop center 640px
            w, h = im.size
            cx = w // 2
            cropped = im.crop((cx - 320, 40, cx + 320, h - 40))
            imgs.append((cropped, label))

    if imgs:
        cw, ch = imgs[0][0].size
        header_h = 44
        comp = Image.new("RGB", (cw * len(imgs), ch + header_h), color=bg_color)
        draw = ImageDraw.Draw(comp)
        for idx, (img, label) in enumerate(imgs):
            x = idx * cw
            comp.paste(img, (x, header_h))
            title_text = f"{label} (Focused)"
            draw.text((x + 20, 12), title_text, fill=text_color, font=font)
            if idx > 0:
                line_color = (40, 40, 40) if theme == "dark" else (210, 210, 210)
                draw.line([(x, 0), (x, ch + header_h)], fill=line_color, width=2)
        
        out_name = f"focused-{vp}-{theme}.png"
        out_path = os.path.join(SRC_DIR, out_name)
        comp.save(out_path, quality=92)
        shutil.copy2(out_path, os.path.join(BRAIN_DIR, out_name))
        print(f"Saved focused: {out_name}")
