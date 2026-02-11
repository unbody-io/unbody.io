# iOS Chrome Load Debug - Work Log

## Scope
- Track two separate iOS Chrome performance incidents:
  1. poor initial loading performance
  2. poor perceived loading performance on navigation
- Keep app runtime clean after debugging and preserve findings for future work.

## Incident 1: Poor Initial Loading Performance

### Symptoms
- On iOS Chrome, full-page load showed a multi-second delay before usable render.
- Observed in both local LAN dev-server and production deployment.

### Initial Test Matrix (Directional)
| Case | LCP (ms) | load (ms) | Direction vs baseline |
|---|---:|---:|---|
| Baseline | 272 | 8490 | baseline |
| No ambient | 224 | 427 | strong improvement |
| No effects | 163 | 450 | strong improvement |
| System font | 532 | 8995 | worse/no improvement |
| Combined | 149 | 390 | best improvement |
| Router OFF | 148 | 12009 | mixed/worse on load |

### Root Cause
- Dominant bottleneck was heavy render/compositing work on iOS WebKit, not network transfer size.
- Highest-risk elements were ambient treatment choices:
  - fullscreen base64 image in CSS
  - heavy blur filter on large fixed layer
  - stacked fullscreen compositing layers

### Fix Applied
- Replaced ambient image + heavy blur pipeline with layered gradient background.
- File primarily involved: `src/styles/globals.css`.

### Validation
- Follow-up iOS sample: `ttfbMs ~32`, `LCP ~123ms`, `load ~293ms`.
- Startup delay no longer reproduced in the validation path.

### Status
- Fixed.

## Incident 2: Poor Perceived Loading Performance on Navigation

### Symptoms
- Tap on header nav sometimes felt delayed before page transition appeared.

### What Was Investigated
- Header visual tuning (mobile blur strength / opacity).
- Transition lifecycle timings (`before-preparation`, `after-preparation`, `before-swap`, `page-load`).
- Loader split (`loaderTotalMs`, `loaderFetchMs`, `loaderPostFetchMs`).
- Variants with reduced blog runtime/content.
- `astro dev` vs `astro preview` environment comparison.

### Findings
- `afterPreparationToBeforeSwapMs` stayed very small in stable runs (~1-3ms).
- `loaderPostFetchMs` (post-fetch parse/preload segment) remained small.
- Large spikes aligned with `loaderFetchMs` variability.
- Preview runs were consistently smoother than dev/LAN runs.

### Conclusion
- Perceived nav sluggishness was mostly environment-sensitive fetch variability (dev/LAN path), not Astro transition orchestration.
- No persistent production blocker identified from latest preview-based runs.

### Status
- Investigated and bounded; not currently treated as an unresolved production issue.

## Image Inspection Notes (from Incident 1)
- Decoded embedded ambient image from CSS for inspection.
- Output asset: `docs/research/2026-02-11__ios-chrome-load-debug-assets/ambient-original.jpg`.
- Asset properties: ~3.5 KB JPEG, `32x48`.
- Interpretation: bytes were small; render/compositing cost dominated.

## Current Runtime State
- Runtime instrumentation has been removed.
- Existing app behavior is back to normal operation.
- Incident 1 fixed; Incident 2 currently non-blocking based on preview measurements.

## Related Documentation
- Instrumentation reinstatement guide:
  - `docs/work-logs/2026-02-11__ios-chrome-load-debug__instrumentation-playbook.md`
