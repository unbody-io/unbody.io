# iOS Chrome Load Debug - Instrumentation Playbook

## Purpose
Re-enable the temporary browser instrumentation that was removed from runtime, using query-gated scripts and reproducible measurement steps.

## Placement
- File: `src/layouts/Base.astro`
- Location: inline `<script>` blocks near end of `<body>`.
- Principle: instrumentation must be no-op unless query flags are present.

## Flags
- `?perf=1`: page/network/render metrics.
- `?navPerf=1`: tap-to-navigation timing and export helper.

## Script A: Page Perf (`?perf=1`)

### Metrics to collect
- Navigation entry:
  - `ttfbMs`, `dnsMs`, `connectMs`, `tlsMs`, `requestMs`, `responseMs`
  - `transferSize`, `encodedBodySize`, `decodedBodySize`
  - `domInteractiveMs`, `domContentLoadedMs`, `loadEventMs`
- Paint/observers:
  - `first-paint`, `first-contentful-paint`
  - `largest-contentful-paint` (LCP)
  - `layout-shift` (CLS)
  - `longtask` count and total duration

### Minimal snippet
```html
<script>
(() => {
  const params = new URLSearchParams(location.search);
  if (!params.has("perf")) return;

  const nav = performance.getEntriesByType("navigation")[0];
  const out = {
    ttfbMs: nav ? nav.responseStart : null,
    domContentLoadedMs: nav ? nav.domContentLoadedEventEnd : null,
    loadEventMs: nav ? nav.loadEventEnd : null,
  };

  window.__UNBODY_PERF__ = out;
  console.table(out);
})();
</script>
```

## Script B: Nav Perf (`?navPerf=1`)

### Event model
- Input:
  - `pointerdown` (capture)
  - `click` (capture)
- Astro lifecycle:
  - `astro:before-preparation`
  - `astro:after-preparation`
  - `astro:before-swap`
  - `astro:page-load`

### Derived timings
- `pointerToClickMs`
- `triggerToBeforePreparationMs`
- `beforePreparationToBeforeSwapMs`
- `afterPreparationToBeforeSwapMs`
- `beforeSwapToPageLoadMs`
- `triggerToPageLoadMs`

### Loader split (inside preparation)
- Wrap `event.loader` in `astro:before-preparation`.
- Record:
  - `loaderTotalMs`
  - first-fetch `loaderFetchMs`
  - `loaderPostFetchMs = loaderTotalMs - loaderFetchMs`
  - `loaderFetchUrl`

### Core snippet (shape only)
```html
<script>
(() => {
  const params = new URLSearchParams(location.search);
  if (!params.has("navPerf")) return;
  if (window.__UNBODY_NAV_PERF_INIT__) return;
  window.__UNBODY_NAV_PERF_INIT__ = true;

  const nowAbs = () => performance.timeOrigin + performance.now();
  const state = { pending: null, runs: [] };
  window.__UNBODY_NAV_PERF__ = state;

  document.addEventListener("pointerdown", (e) => {/* start pending */}, { capture: true });
  document.addEventListener("click", (e) => {/* update pending */}, { capture: true });
  document.addEventListener("astro:before-preparation", (event) => {
    // timestamp + wrap event.loader for loader split
  });
  document.addEventListener("astro:after-preparation", () => {/* timestamp */});
  document.addEventListener("astro:before-swap", () => {/* timestamp */});
  document.addEventListener("astro:page-load", () => {/* finalize pending -> runs */});
})();
</script>
```

## Export Helper
- Add global `window.exportNavPerf()` that:
  - summarizes each metric (`min`, `p50`, `p90`, `p95`, `max`, `mean`)
  - includes full `runs`
  - returns/copies a marked payload

### Output markers
- `=== NAV_PERF_BEGIN ===`
- `=== NAV_PERF_END ===`

### Example payload wrapper
```js
const text = [
  "=== NAV_PERF_BEGIN ===",
  JSON.stringify(summary, null, 2),
  "=== NAV_PERF_END ===",
].join("\n");
```

## Noise Control
- Do not print per-navigation `console.table` during runs.
- Log/export once at the end (`exportNavPerf()`).
- Keep query-gating strict so baseline runtime is unaffected.

## Test Protocol
1. Use iPhone + Web Inspector.
2. Prefer `astro preview` for user-facing conclusions.
3. Warm-up: 2 taps (discard).
4. Measure: 10-20 taps, fixed route alternation (`/ -> /lab -> /blog`).
5. Run `exportNavPerf()`.
6. Analyze p50/p90/p95 and worst outliers.

## Removal Protocol (after debugging)
1. Delete both inline instrumentation scripts from `src/layouts/Base.astro`.
2. Verify no references remain:
   - `__UNBODY_PERF__`
   - `__UNBODY_NAV_PERF__`
   - `exportNavPerf`
   - `?perf=1`
   - `?navPerf=1`
3. Build check: `npm run build --silent`.
