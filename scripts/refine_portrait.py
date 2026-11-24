"""
Portrait Refinement Pipeline: Sub-pixel Alpha Matting, Defringing & Studio Harmonization
Lead Systems Architect Engineering Spec
"""

import os
import cv2
import numpy as np
from PIL import Image
from pymatting import estimate_alpha_cf, estimate_foreground_ml, jacobi

def refine_portrait():
    print("Step 1: Loading source image and existing cutout...")
    orig_path = "public/portrait-original.jpg"
    cut_path = "public/portrait.png"

    if not os.path.exists(orig_path) or not os.path.exists(cut_path):
        raise FileNotFoundError(f"Missing required source files: {orig_path} or {cut_path}")

    orig_bgr = cv2.imread(orig_path)
    # The crop mapping is orig[6:682, 264:884] (height 676, width 620)
    crop_bgr = orig_bgr[6:682, 264:884]
    crop_rgb = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2RGB).astype(np.float64) / 255.0

    cut_bgra = cv2.imread(cut_path, cv2.IMREAD_UNCHANGED)
    raw_alpha = (cut_bgra[:, :, 3] > 128).astype(np.uint8)

    print("Step 2: Cleaning base mask geometry...")
    # Find connected components to isolate foreground person and valid arm negative space
    num_labels, labels, stats, _ = cv2.connectedComponentsWithStats(raw_alpha)
    largest_fg = 1 + np.argmax(stats[1:, cv2.CC_STAT_AREA])
    person_mask = (labels == largest_fg).astype(np.uint8)

    # Invert to check holes inside person
    num_bg, bg_labels, bg_stats, _ = cv2.connectedComponentsWithStats((person_mask == 0).astype(np.uint8))
    bg_outer = bg_labels[0, 0]

    clean_mask = person_mask.copy()
    for i in range(1, num_bg):
        # Keep large negative space between arm and torso (area ~4500px), fill internal pinholes
        if i != bg_outer and bg_stats[i, cv2.CC_STAT_AREA] < 2000:
            clean_mask[bg_labels == i] = 1

    # Remove microscopic single-pixel edge notches with mild morphological smoothing
    smooth_kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (3, 3))
    clean_mask = cv2.morphologyEx(clean_mask, cv2.MORPH_CLOSE, smooth_kernel)
    clean_mask = cv2.morphologyEx(clean_mask, cv2.MORPH_OPEN, smooth_kernel)

    print("Step 3: Generating trimap for Closed-Form Matting...")
    k_erode = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
    k_dilate = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))

    fg_definite = cv2.erode(clean_mask, k_erode)
    bg_definite = 1 - cv2.dilate(clean_mask, k_dilate)

    trimap = np.full(clean_mask.shape, 0.5, dtype=np.float64)
    trimap[fg_definite == 1] = 1.0
    trimap[bg_definite == 1] = 0.0

    print(f"Trimap distribution: FG={np.sum(trimap==1.0)}, BG={np.sum(trimap==0.0)}, Unknown={np.sum(trimap==0.5)}")

    print("Step 4: Executing Closed-Form Alpha Matting (Jacobi Preconditioner)...")
    alpha = estimate_alpha_cf(crop_rgb, trimap, preconditioner=jacobi)
    alpha = np.clip(alpha, 0.0, 1.0)

    # Ensure baseline at bottom remains solid
    alpha[670:676, :] = np.maximum(alpha[670:676, :], clean_mask[670:676, :])

    print("Step 5: Estimating Decontaminated Foreground (Defringing)...")
    foreground = estimate_foreground_ml(crop_rgb, alpha)
    foreground = np.clip(foreground, 0.0, 1.0)

    print("Step 6: Photographic Tone Grading & Lighting Harmonization...")
    # Convert foreground to LAB for accurate luminance and chroma manipulation
    fg_u8 = (foreground * 255.0).astype(np.uint8)
    fg_lab = cv2.cvtColor(fg_u8, cv2.COLOR_RGB2LAB).astype(np.float64)

    L = fg_lab[:, :, 0] # 0 to 255
    A = fg_lab[:, :, 1] # Green to Magenta
    B = fg_lab[:, :, 2] # Blue to Yellow

    # A. Highlight Rolloff: Compress specular harsh sunlight (glasses, forehead, sun glare)
    # Target values > 180 (L > 0.7) and soft-compress towards 220 max
    high_mask = L > 175.0
    L[high_mask] = 175.0 + (L[high_mask] - 175.0) * 0.65

    # B. Suit Shadow Grounding:
    # Deepen lifted foggy blacks in suit (y > 300) without clipping fabric textures
    suit_shadow_mask = (L < 65.0) & (np.arange(676)[:, None] > 280)
    # Smooth compression pulling darkest shadows toward rich charcoal
    L[suit_shadow_mask] = np.maximum(L[suit_shadow_mask] * 0.88, 12.0)

    # C. Sunlit Shoulder Highlight Balancing:
    # Viewer's right shoulder (x in 450:600, y in 300:460) has harsh midday solar glare
    # Gently balance its luminance closer to the suit average
    sh_mask = (np.arange(676)[:, None] >= 300) & (np.arange(676)[:, None] <= 460) & \
              (np.arange(620)[None, :] >= 450) & (np.arange(620)[None, :] <= 600)
    L[sh_mask] = np.where(L[sh_mask] > 80.0, 80.0 + (L[sh_mask] - 80.0) * 0.72, L[sh_mask])

    # D. Color Spill Neutralization (Banana plant green bounce on left shoulder):
    # Where A is overly green (A < 124) on the fabric, gently neutralize toward 128
    green_spill_mask = (A < 125.0) & (np.arange(676)[:, None] > 260)
    A[green_spill_mask] = A[green_spill_mask] + (128.0 - A[green_spill_mask]) * 0.55

    # E. Warm Studio Skin Tone Balance:
    # Face region (120 < y < 280, 240 < x < 380)
    face_mask = (np.arange(676)[:, None] >= 120) & (np.arange(676)[:, None] <= 280) & \
                (np.arange(620)[None, :] >= 240) & (np.arange(620)[None, :] <= 380)
    # Gentle warmth: slight boost to red (+1.5 in A) and yellow (+2.0 in B) to counter cold outdoor sky fill
    A[face_mask] = np.clip(A[face_mask] + 1.2, 0, 255)
    B[face_mask] = np.clip(B[face_mask] + 1.8, 0, 255)

    # Reconstruct LAB and convert back to RGB
    fg_lab[:, :, 0] = np.clip(L, 0, 255)
    fg_lab[:, :, 1] = np.clip(A, 0, 255)
    fg_lab[:, :, 2] = np.clip(B, 0, 255)
    graded_u8 = cv2.cvtColor(fg_lab.astype(np.uint8), cv2.COLOR_LAB2RGB)

    # F. Micro-contrast / Detail enhancement (subtle unsharp mask on luminance)
    blur = cv2.GaussianBlur(graded_u8, (0, 0), sigmaX=1.5)
    detail = cv2.addWeighted(graded_u8, 1.10, blur, -0.10, 0)
    graded_u8 = np.clip(detail, 0, 255).astype(np.uint8)

    print("Step 7: Compiling Final RGBA Asset...")
    alpha_u8 = (alpha * 255.0).astype(np.uint8)
    final_rgba = np.dstack([graded_u8, alpha_u8])

    # Save to all target paths
    target_paths = [
        "public/portrait.png",
        "src/assets/portrait.png",
        "dist/portrait.png"
    ]

    for p in target_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        Image.fromarray(final_rgba).save(p, format="PNG", optimize=True)
        print(f"Saved: {p} ({os.path.getsize(p)} bytes)")

    print("Portrait refinement successfully completed!")

if __name__ == "__main__":
    refine_portrait()
