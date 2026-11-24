"""
High-Precision Portrait Extraction & Harmonization Pipeline
Lead Systems Architect Engineering Spec
Uses U2-Net Salient Human Segmentation (single-threaded CPU) + PyMatting Defringing + Studio Grading
"""

import os
os.environ['OMP_NUM_THREADS'] = '1'
os.environ['OPENBLAS_NUM_THREADS'] = '1'
os.environ['MKL_NUM_THREADS'] = '1'

import cv2
import numpy as np
from PIL import Image
import onnxruntime as ort
import rembg
from pymatting import estimate_foreground_ml

def extract_and_refine_portrait():
    print("Step 1: Loading raw original portrait...")
    orig_path = "public/portrait-original.jpg"
    if not os.path.exists(orig_path):
        raise FileNotFoundError(f"Missing required source file: {orig_path}")

    orig_pil = Image.open(orig_path)
    orig_cv = cv2.imread(orig_path)

    print("Step 2: Initializing single-threaded U2-Net segmentation session...")
    opts = ort.SessionOptions()
    opts.intra_op_num_threads = 1
    opts.inter_op_num_threads = 1
    opts.execution_mode = ort.ExecutionMode.ORT_SEQUENTIAL

    session = rembg.new_session('u2net', providers=['CPUExecutionProvider'], sess_opts=opts)

    print("Step 3: Generating salient human segmentation matte...")
    segmented_pil = rembg.remove(orig_pil, session=session)
    seg_arr = np.array(segmented_pil)

    # Dimensional alignment:
    # Full image is 682x1024. The subject is horizontally centered at x in [281, 880] (center ~580.5).
    # Crop to exact 620 width x 676 height:
    # y: 0 to 676 (captures crown of hair down to torso baseline)
    # x: 267 to 887 (width 620, leaving symmetric ~14px left margin and ~7px right margin)
    crop_rgba = seg_arr[0:676, 267:887]
    crop_bgr = orig_cv[0:676, 267:887]
    crop_rgb = cv2.cvtColor(crop_bgr, cv2.COLOR_BGR2RGB).astype(np.float64) / 255.0

    raw_alpha = crop_rgba[:, :, 3].astype(np.float64) / 255.0

    print("Step 4: Edge smoothing & baseline grounding...")
    # Ensure baseline at bottom remains solidly anchored to section floor
    raw_alpha[670:676, :] = np.maximum(raw_alpha[670:676, :], (raw_alpha[670:676, :] > 0.3).astype(float))

    print("Step 5: Color decontamination (defringing) via PyMatting ML foreground estimation...")
    fg = estimate_foreground_ml(crop_rgb, raw_alpha)
    fg = np.clip(fg, 0.0, 1.0)

    print("Step 6: Photographic studio tonal harmonization in LAB color space...")
    fg_u8 = (fg * 255.0).astype(np.uint8)
    fg_lab = cv2.cvtColor(fg_u8, cv2.COLOR_RGB2LAB).astype(np.float64)

    L = fg_lab[:, :, 0]
    A = fg_lab[:, :, 1]
    B = fg_lab[:, :, 2]

    # A. Highlight Rolloff: Soften direct solar specular glints on glasses and forehead
    high_mask = L > 185.0
    L[high_mask] = 185.0 + (L[high_mask] - 185.0) * 0.70

    # B. Suit Shadow Grounding: Deepen lifted foggy blacks in suit (y > 280)
    suit_shadow_mask = (L < 60.0) & (np.arange(676)[:, None] > 280)
    L[suit_shadow_mask] = np.maximum(L[suit_shadow_mask] * 0.90, 10.0)

    # C. Sunlit Shoulder Highlight Balancing:
    # Viewer's right shoulder has direct sun glare; gently balance luminance
    sh_mask = (np.arange(676)[:, None] >= 280) & (np.arange(676)[:, None] <= 440) & \
              (np.arange(620)[None, :] >= 450) & (np.arange(620)[None, :] <= 600)
    L[sh_mask] = np.where(L[sh_mask] > 85.0, 85.0 + (L[sh_mask] - 85.0) * 0.75, L[sh_mask])

    # D. Foliage Green Despill: Neutralize ambient leaf reflection on left shoulder
    green_spill_mask = (A < 125.0) & (np.arange(676)[:, None] > 260)
    A[green_spill_mask] = A[green_spill_mask] + (128.0 - A[green_spill_mask]) * 0.50

    # E. Warm Studio Skin Tone Balance: Face region (120 < y < 280, 240 < x < 380)
    face_mask = (np.arange(676)[:, None] >= 120) & (np.arange(676)[:, None] <= 280) & \
                (np.arange(620)[None, :] >= 240) & (np.arange(620)[None, :] <= 380)
    A[face_mask] = np.clip(A[face_mask] + 1.0, 0, 255)
    B[face_mask] = np.clip(B[face_mask] + 1.5, 0, 255)

    # Reconstruct LAB and convert to RGB
    fg_lab[:, :, 0] = np.clip(L, 0, 255)
    fg_lab[:, :, 1] = np.clip(A, 0, 255)
    fg_lab[:, :, 2] = np.clip(B, 0, 255)
    graded_u8 = cv2.cvtColor(fg_lab.astype(np.uint8), cv2.COLOR_LAB2RGB)

    # F. Micro-contrast detail enhancement
    blur = cv2.GaussianBlur(graded_u8, (0, 0), sigmaX=1.5)
    detail = cv2.addWeighted(graded_u8, 1.08, blur, -0.08, 0)
    graded_u8 = np.clip(detail, 0, 255).astype(np.uint8)

    print("Step 7: Compiling final RGBA asset...")
    alpha_u8 = (raw_alpha * 255.0).astype(np.uint8)
    final_rgba = np.dstack([graded_u8, alpha_u8])

    target_paths = [
        "public/portrait.png",
        "src/assets/portrait.png",
        "dist/portrait.png"
    ]

    for p in target_paths:
        os.makedirs(os.path.dirname(p), exist_ok=True)
        Image.fromarray(final_rgba).save(p, format="PNG", optimize=True)
        print(f"Saved: {p} ({os.path.getsize(p)} bytes)")

    print("Extraction and refinement successfully completed!")

if __name__ == "__main__":
    extract_and_refine_portrait()
