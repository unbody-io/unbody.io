/**
 * Run Lighthouse and print an actionable summary.
 *
 * Usage:
 *   npm run lighthouse                  # use cached report, or generate if missing
 *   npm run lighthouse -- --update      # force a fresh audit
 *   npm run lighthouse -- <url>         # audit a custom URL
 */

import { readFileSync, writeFileSync, existsSync } from "fs";

const REPORT_PATH = "lighthouse-report.json";
const DEFAULT_URL = "http://localhost:4321";

const args = process.argv.slice(2);
const forceUpdate = args.includes("--update");
const urlArg = args.find((a) => !a.startsWith("--"));
const url = urlArg ?? DEFAULT_URL;

let report: any;

if (!forceUpdate && !urlArg && existsSync(REPORT_PATH)) {
  report = JSON.parse(readFileSync(REPORT_PATH, "utf-8"));
  console.error(`Using cached ${REPORT_PATH}\n`);
} else {
  report = await runLighthouse(url);
}

printSummary(report);

// --- Lighthouse runner ---

async function runLighthouse(targetUrl: string) {
  let lighthouse: any;
  let chromeLauncher: any;

  try {
    lighthouse = (await import("lighthouse")).default;
    chromeLauncher = await import("chrome-launcher");
  } catch {
    console.error("Missing dependencies. Install them with:\n");
    console.error("  npm i -D lighthouse chrome-launcher\n");
    process.exit(1);
  }

  console.error(`Running Lighthouse against ${targetUrl} ...\n`);

  const chrome = await chromeLauncher.launch({ chromeFlags: ["--headless"] });

  try {
    const result = await lighthouse(targetUrl, {
      port: chrome.port,
      output: "json",
    });

    writeFileSync(REPORT_PATH, JSON.stringify(result.lhr, null, 2));
    console.error(`Report saved to ${REPORT_PATH}\n`);

    return result.lhr;
  } finally {
    await chrome.kill();
  }
}

// --- Summary printer ---

function printSummary(report: any) {
  const audits = report.audits ?? {};
  const categories = report.categories ?? {};

  // Category scores
  console.log("## Scores\n");
  for (const [_id, cat] of Object.entries<any>(categories)) {
    const pct = Math.round((cat.score ?? 0) * 100);
    const flag = pct >= 90 ? "✓" : pct >= 50 ? "~" : "✗";
    console.log(`  ${flag} ${cat.title}: ${pct}`);
  }

  // Core metrics
  const metrics = [
    "first-contentful-paint",
    "largest-contentful-paint",
    "speed-index",
    "total-blocking-time",
    "cumulative-layout-shift",
    "max-potential-fid",
    "interactive",
  ];

  console.log("\n## Metrics\n");
  for (const id of metrics) {
    const a = audits[id];
    if (!a) continue;
    const score = a.score ?? 0;
    const flag = score >= 0.9 ? "✓" : score >= 0.5 ? "~" : "✗";
    console.log(
      `  ${flag} ${a.title}: ${a.displayValue ?? a.numericValue ?? "n/a"} (score: ${Math.round(score * 100)})`
    );
  }

  // Failed audits
  console.log("\n## Issues\n");

  const skip = new Set([
    "screenshot-thumbnails",
    "final-screenshot",
    "full-page-screenshot",
    "script-treemap-data",
    "metrics",
    "network-requests",
    "main-thread-tasks",
    "diagnostics",
    "resource-summary",
    ...metrics,
  ]);

  type AuditEntry = {
    id: string;
    title: string;
    score: number;
    displayValue?: string;
    details?: {
      type?: string;
      items?: Array<Record<string, any>>;
      overallSavingsMs?: number;
      overallSavingsBytes?: number;
    };
  };

  const failed: AuditEntry[] = [];

  for (const [id, audit] of Object.entries<any>(audits)) {
    if (skip.has(id)) continue;
    if (audit.score === null || audit.score === undefined) continue;
    if (
      audit.scoreDisplayMode === "notApplicable" ||
      audit.scoreDisplayMode === "informative"
    )
      continue;
    if (audit.score >= 1) continue;
    failed.push(audit);
  }

  failed.sort((a, b) => (a.score ?? 0) - (b.score ?? 0));

  for (const audit of failed) {
    const score = Math.round((audit.score ?? 0) * 100);
    const flag = score === 0 ? "✗" : "~";
    let line = `  ${flag} [${score}] ${audit.title}`;
    if (audit.displayValue) line += ` — ${audit.displayValue}`;
    console.log(line);

    const details = audit.details;
    if (!details?.items?.length) continue;

    if (details.overallSavingsMs) {
      console.log(
        `    Potential savings: ${Math.round(details.overallSavingsMs)} ms`
      );
    }
    if (details.overallSavingsBytes) {
      console.log(
        `    Potential savings: ${Math.round(details.overallSavingsBytes / 1024)} KiB`
      );
    }

    const items = details.items.slice(0, 5);
    for (const item of items) {
      const parts: string[] = [];
      if (item.url) parts.push(shorten(item.url));
      if (item.node?.snippet) parts.push(truncate(item.node.snippet, 80));
      if (item.source?.url) parts.push(shorten(item.source.url));
      if (item.groupLabel) parts.push(item.groupLabel);
      if (item.duration != null)
        parts.push(`${Math.round(item.duration)} ms`);
      if (item.wastedMs != null)
        parts.push(`wasted: ${Math.round(item.wastedMs)} ms`);
      if (item.wastedBytes != null)
        parts.push(`wasted: ${Math.round(item.wastedBytes / 1024)} KiB`);
      if (item.subItems?.items) {
        for (const sub of item.subItems.items.slice(0, 3)) {
          if (sub.failureReason) parts.push(sub.failureReason);
        }
      }
      if (parts.length) console.log(`    - ${parts.join(" | ")}`);
    }
  }

  if (!failed.length) {
    console.log("  All audits passed.");
  }
}

function shorten(url: string): string {
  try {
    const u = new URL(url);
    const path = u.pathname + u.search;
    if (u.protocol === "chrome-extension:")
      return `[extension] ${u.pathname.split("/").pop()}`;
    return u.host + (path.length > 60 ? path.slice(0, 57) + "..." : path);
  } catch {
    return url.length > 80 ? url.slice(0, 77) + "..." : url;
  }
}

function truncate(s: string, max: number): string {
  return s.length > max ? s.slice(0, max - 3) + "..." : s;
}
