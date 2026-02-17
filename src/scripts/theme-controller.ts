type StoredTheme = "light" | "dark" | null;
type ResolvedTheme = "light" | "dark";

interface ThemeController {
  applyTheme: (animate?: boolean) => void;
  setTheme: (theme: "light" | "dark" | "system") => void;
  getTheme: () => "light" | "dark" | "system";
}

declare global {
  interface Window {
    __unbodyThemeSync?: ThemeController;
  }
}

const STATE_KEY = "__unbodyThemeSync";

function readStoredTheme(): StoredTheme {
  const value = localStorage.getItem("theme");
  return value === "dark" || value === "light" ? value : null;
}

function resolveTheme(mediaQuery: MediaQueryList): {
  storedTheme: StoredTheme;
  isDark: boolean;
  resolvedTheme: ResolvedTheme;
} {
  const storedTheme = readStoredTheme();
  const isDark = storedTheme ? storedTheme === "dark" : mediaQuery.matches;
  return { storedTheme, isDark, resolvedTheme: isDark ? "dark" : "light" };
}

function applyResolvedThemeToDocument(doc: Document, isDark: boolean): void {
  doc.documentElement.classList.toggle("dark", isDark);
  doc.documentElement.dataset.theme = isDark ? "dark" : "light";
}

function getNewDocument(event: Event): Document | null {
  const maybeDoc = (event as Event & { newDocument?: Document }).newDocument;
  return maybeDoc ?? null;
}

export function initThemeController(): ThemeController {
  const existing = window[STATE_KEY];
  if (existing) {
    existing.applyTheme(false);
    return existing;
  }

  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  const prefersMotion = window.matchMedia("(prefers-reduced-motion: no-preference)");
  let transitionTimer = 0;

  const applyTheme = (animate = false): void => {
    if (animate && prefersMotion.matches) {
      document.documentElement.classList.add("theme-transition");
      window.clearTimeout(transitionTimer);
      transitionTimer = window.setTimeout(() => {
        document.documentElement.classList.remove("theme-transition");
      }, 220);
    }

    const { storedTheme, isDark, resolvedTheme } = resolveTheme(mediaQuery);
    applyResolvedThemeToDocument(document, isDark);

    window.dispatchEvent(
      new CustomEvent("unbody:theme-change", {
        detail: { storedTheme: storedTheme ?? "system", resolvedTheme },
      })
    );
  };

  const setTheme = (theme: "light" | "dark" | "system"): void => {
    if (theme === "dark" || theme === "light") {
      localStorage.setItem("theme", theme);
    } else {
      localStorage.removeItem("theme");
    }
    applyTheme(true);
  };

  const getTheme = (): "light" | "dark" | "system" => readStoredTheme() ?? "system";

  const controller: ThemeController = { applyTheme, setTheme, getTheme };
  window[STATE_KEY] = controller;

  applyTheme(false);

  mediaQuery.addEventListener("change", () => applyTheme(true));

  window.addEventListener("storage", (event) => {
    if (event.key === "theme") applyTheme(true);
  });

  document.addEventListener("astro:before-swap", (event) => {
    const newDocument = getNewDocument(event);
    if (!newDocument) return;
    const { isDark } = resolveTheme(mediaQuery);
    applyResolvedThemeToDocument(newDocument, isDark);
  });

  document.addEventListener("astro:after-swap", () => applyTheme(false));
  document.addEventListener("astro:page-load", () => applyTheme(false));

  return controller;
}
