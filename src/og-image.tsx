import React from "react";
import type { RenderFunctionInput } from "astro-opengraph-images";

function normalize(pathname: string): string {
  return pathname.startsWith("/") ? pathname : `/${pathname}`;
}

function getCategory(pathname: string): string {
  const p = normalize(pathname);
  if (p.startsWith("/blog")) return "blog";
  if (p.startsWith("/lab")) return "lab";
  return "about";
}

function getDisplayUrl(): string {
  return "unbody.io";
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash * 31 + str.charCodeAt(i)) | 0;
  }
  return Math.abs(hash);
}

function generateGrayGradient(pathname: string): string {
  const h = hashString(pathname);
  const light1 = 82 + (h % 8);
  const light2 = 86 + (h % 6);
  const angle = 120 + (h % 60);
  return `linear-gradient(${angle}deg, hsl(0, 0%, ${light1}%) 0%, hsl(0, 0%, ${light2}%) 100%)`;
}

const GLYPHS = "!@#$%^&*_+-=|;:<>?~01".split("");

function generateAsciiGrid(title: string, cols: number, rows: number): string {
  let seed = hashString(title);
  const lines: string[] = [];
  for (let r = 0; r < rows; r++) {
    let line = "";
    for (let c = 0; c < cols; c++) {
      seed = (seed * 16807 + 1) & 0x7fffffff;
      line += GLYPHS[seed % GLYPHS.length];
    }
    lines.push(line);
  }
  return lines.join("\n");
}

function generateNoiseGradient(title: string): string {
  let seed = hashString(title);
  function next() {
    seed = (seed * 16807 + 1) & 0x7fffffff;
    return (seed & 0xffff) / 0xffff;
  }
  const spots = Array.from({ length: 5 }, () => ({
    x: Math.round(next() * 100),
    y: Math.round(next() * 100),
    opacity: (0.15 + next() * 0.25).toFixed(2),
    size: Math.round(30 + next() * 35),
  }));
  return spots
    .map(
      (s) =>
        `radial-gradient(ellipse at ${s.x}% ${s.y}%, rgba(0,0,0,${s.opacity}) 0%, transparent ${s.size}%)`,
    )
    .join(", ");
}

function isExternalImage(image: string): boolean {
  if (!image) return false;
  try {
    const url = new URL(image);
    return !url.pathname.endsWith("/index.png") && !url.pathname.endsWith(".png");
  } catch {
    return false;
  }
}


export default async function renderOgImage({
  title,
  pathname,
  image,
}: RenderFunctionInput) {
  const category = getCategory(pathname);
  const displayUrl = getDisplayUrl();
  const displayTitle = title.replace(" | Unbody Blog", "");
  const hasRealImage = isExternalImage(image);
  const titleFontSize = Math.min(140, Math.max(48, Math.round(4200 / displayTitle.length)));

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "row",
        gap: "60px",
        padding: "80px",
        background:
          "linear-gradient(20deg, #d9d5d2 0%, #e0e0e0 57%, #d9d5d2 100%)",
      }}
    >
      {/* Left: Category + Title + URL */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
        }}
      >
        {/* Category */}
        <div
          style={{
            fontSize: "30px",
            color: "#6b7280",
            fontFamily: "PX Grotesk Mono",
            textTransform: "uppercase",
            letterSpacing: "0.12em",
          }}
        >
          {category}
        </div>

        {/* Title */}
        <div
          style={{
            marginTop: "40px",
            fontSize: `${titleFontSize}px`,
            lineHeight: 1.12,
            color: "#1e293b",
            fontFamily: "Instrument Serif",
          }}
        >
          {displayTitle}
        </div>

        {/* URL */}
        <div
          style={{
            marginTop: "auto",
            fontSize: "28px",
            color: "#6b7280",
            fontFamily: "PX Grotesk Mono",
            letterSpacing: "0.05em",
          }}
        >
          {displayUrl}
        </div>
      </div>

      {/* Portrait placeholder */}
      <div
        style={{
          display: "flex",
          width: "50%",
          flexShrink: 0,
          borderRadius: "24px",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1), 0 2px 8px rgba(0, 0, 0, 0.06)",
          background: hasRealImage ? "transparent" : generateGrayGradient(pathname),
        }}
      >
        {hasRealImage ? (
          <img
            src={image}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "flex-start",
              fontSize: "14px",
              lineHeight: 1.3,
              fontFamily: "MD System Mono",
              color: "transparent",
              whiteSpace: "pre",
              overflow: "hidden",
              letterSpacing: "0em",
              backgroundImage: generateNoiseGradient(displayTitle),
              backgroundClip: "text",
            }}
          >
            {generateAsciiGrid(displayTitle, 80, 60)}
          </div>
        )}
      </div>
    </div>
  );
}
