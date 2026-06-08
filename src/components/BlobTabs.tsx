import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { navigate } from 'astro:transitions/client';

const triggerGlyphs = ['Ú', 'Ŭ', 'Û', 'Ü', 'Ù', 'Ű', 'Ū', 'Ų', 'Ů', 'Ũ'];
const triggerScrambleGlyphs = '!@#$%^&*_+-=|;:<>?~01'.split('');

export function BlobTabs() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCollapsing, setIsCollapsing] = useState(false);
  const [activeTab, setActiveTab] = useState('home');
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [triggerGlyphIndex, setTriggerGlyphIndex] = useState(0);
  const [triggerDisplayGlyph, setTriggerDisplayGlyph] = useState(triggerGlyphs[0]);
  const [showActiveHighlight, setShowActiveHighlight] = useState(false);
  const [showThemeItem, setShowThemeItem] = useState(false);
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light');
  const [isHighlightMoving, setIsHighlightMoving] = useState(false);
  const [previousHighlightTab, setPreviousHighlightTab] = useState<string | null>(null);
  const highlightTimer = useRef<number | undefined>(undefined);
  const collapseTimer = useRef<number | undefined>(undefined);
  const highlightMoveTimer = useRef<number | undefined>(undefined);
  const triggerTimer = useRef<number | undefined>(undefined);
  const previousHighlightTarget = useRef('home');
  const labelRefs = useRef<Record<string, HTMLSpanElement | null>>({});
  const [measuredLabelWidths, setMeasuredLabelWidths] = useState<Record<string, number>>({});

  // Spring physics config - soft spring for raw gooey feel
  const springConfig = { type: 'spring', stiffness: 220, damping: 22, mass: 1 };
  
  // Stagger delays for sequential mitosis effect
  const mergeDelay = 0.12;
  
  const delayHome = isExpanded ? 0 : mergeDelay * 3;
  const delayManifesto = isExpanded ? mergeDelay : mergeDelay * 2;
  const delayProjects = isExpanded ? mergeDelay * 2 : mergeDelay;
  const delayBlog = isExpanded ? mergeDelay * 3 : 0;
  
  // Sizing & Spacing
  const TRIGGER_SIZE = 38;
  const FIRST_TAB_GAP = 0;
  const TAB_GAP = -5;
  const THEME_ITEM_GAP = 18;
  const TAB_BODY_PADDING_X = 18;
  const ACTIVE_PADDING_X = 9;

  const tabs = [
    { id: 'home', href: '/', label: 'Home', fallbackLabelWidth: 34 },
    { id: 'manifesto', href: '/manifesto', label: 'Manifesto', fallbackLabelWidth: 78 },
    { id: 'projects', href: '/projects', label: 'Projects', fallbackLabelWidth: 66 },
    { id: 'blog', href: '/blog', label: 'Blog', fallbackLabelWidth: 30 },
  ];
  let nextTabLeft = TRIGGER_SIZE / 2 + FIRST_TAB_GAP;
  const tabMetrics = tabs.map((tab) => {
    const labelWidth = Math.ceil(measuredLabelWidths[tab.id] ?? tab.fallbackLabelWidth);
    const bodyWidth = labelWidth + TAB_BODY_PADDING_X * 2;
    const highlightWidth = labelWidth + ACTIVE_PADDING_X * 2;
    const center = nextTabLeft + bodyWidth / 2;
    nextTabLeft += bodyWidth + TAB_GAP;

    return { ...tab, labelWidth, bodyWidth, highlightWidth, center };
  });
  const [homeMetric, manifestoMetric, projectsMetric, blogMetric] = tabMetrics;
  const themeItemCenter = -(TRIGGER_SIZE + THEME_ITEM_GAP);
  const highlightTab = hoveredTab ?? activeTab;
  const activeIndex = Math.max(0, tabMetrics.findIndex((tab) => tab.id === highlightTab));
  const activeHighlightWidth = tabMetrics[activeIndex]?.highlightWidth ?? 64;
  const activeHighlightCenter = tabMetrics[activeIndex]?.center ?? homeMetric.center;
  const activeHighlightLeft = activeHighlightCenter - activeHighlightWidth / 2;
  const previousHighlightIndex = previousHighlightTab
    ? Math.max(0, tabMetrics.findIndex((tab) => tab.id === previousHighlightTab))
    : activeIndex;
  const previousHighlightWidth = tabMetrics[previousHighlightIndex]?.highlightWidth ?? activeHighlightWidth;
  const previousHighlightCenter = tabMetrics[previousHighlightIndex]?.center ?? activeHighlightCenter;
  const previousHighlightLeft = previousHighlightCenter - previousHighlightWidth / 2;
  const connectorLeft = Math.min(previousHighlightCenter, activeHighlightCenter) - 4;
  const connectorWidth = Math.abs(activeHighlightCenter - previousHighlightCenter) + 8;
  const surfaceShellClass = "absolute h-[calc(1lh+1.5em)] -translate-x-1/2 -translate-y-1/2 p-px bg-gradient-to-b from-surface-border/95 via-surface-border/45 to-surface-border/10 dark:from-surface-border/70 dark:via-surface-border/28 dark:to-surface-border/8";
  const surfaceInnerClass = "block h-full w-full bg-surface-elevated backdrop-blur-sm";
  const tabRadiusClass = (index: number) => {
    if (!isExpanded && !isCollapsing) return 'rounded-full';
    if (index === 0) return 'rounded-l-full rounded-r-[0.45rem]';
    if (index === tabs.length - 1) return 'rounded-r-full rounded-l-[0.45rem]';
    return 'rounded-[0.45rem]';
  };
  const themeRadiusClass = () => {
    if (!isExpanded && !isCollapsing) return 'rounded-full';
    return 'rounded-l-full rounded-r-[0.45rem]';
  };

  useLayoutEffect(() => {
    let cancelled = false;

    const measureLabels = () => {
      const nextWidths: Record<string, number> = {};

      tabs.forEach((tab) => {
        const width = labelRefs.current[tab.id]?.offsetWidth;
        if (width) nextWidths[tab.id] = width;
      });

      if (cancelled || !Object.keys(nextWidths).length) return;

      setMeasuredLabelWidths((current) => {
        const changed = tabs.some((tab) => current[tab.id] !== nextWidths[tab.id]);
        return changed ? nextWidths : current;
      });
    };

    measureLabels();
    document.fonts?.ready.then(measureLabels);
    window.addEventListener('resize', measureLabels);

    return () => {
      cancelled = true;
      window.removeEventListener('resize', measureLabels);
    };
  }, []);

  useEffect(() => {
    let cancelled = false;
    let nextGlyphIndex = 1;
    const scrambleFrames = 8;
    const scrambleInterval = 55;
    const pauseDuration = 2000;

    const clearTriggerTimer = () => {
      if (triggerTimer.current) window.clearTimeout(triggerTimer.current);
      triggerTimer.current = undefined;
    };

    const scheduleNext = () => {
      clearTriggerTimer();
      triggerTimer.current = window.setTimeout(runScramble, pauseDuration);
    };

    const runScramble = () => {
      let frame = 0;

      const tick = () => {
        if (cancelled) return;

        if (frame < scrambleFrames) {
          setTriggerDisplayGlyph(
            triggerScrambleGlyphs[
              Math.floor(Math.random() * triggerScrambleGlyphs.length)
            ],
          );
          frame += 1;
          clearTriggerTimer();
          triggerTimer.current = window.setTimeout(tick, scrambleInterval);
          return;
        }

        const resolvedIndex = nextGlyphIndex;
        setTriggerGlyphIndex(resolvedIndex);
        setTriggerDisplayGlyph(triggerGlyphs[resolvedIndex]);
        nextGlyphIndex = (resolvedIndex + 1) % triggerGlyphs.length;
        scheduleNext();
      };

      tick();
    };

    scheduleNext();

    return () => {
      cancelled = true;
      clearTriggerTimer();
    };
  }, []);

  useEffect(() => {
    const syncActiveTab = () => {
      const pathname = window.location.pathname;
      const next = tabs.find((tab) =>
        tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href)
      )?.id ?? 'home';
      setActiveTab(next);
    };

    syncActiveTab();
    document.addEventListener('astro:after-swap', syncActiveTab);
    window.addEventListener('popstate', syncActiveTab);

    return () => {
      if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
      if (collapseTimer.current) window.clearTimeout(collapseTimer.current);
      if (highlightMoveTimer.current) window.clearTimeout(highlightMoveTimer.current);
      document.removeEventListener('astro:after-swap', syncActiveTab);
      window.removeEventListener('popstate', syncActiveTab);
    };
  }, []);

  useEffect(() => {
    const syncTheme = (event?: Event) => {
      const eventTheme = (event as CustomEvent<{ resolvedTheme?: 'light' | 'dark' }> | undefined)
        ?.detail?.resolvedTheme;
      const nextTheme = eventTheme ?? (document.documentElement.classList.contains('dark') ? 'dark' : 'light');
      setResolvedTheme(nextTheme);
    };

    syncTheme();
    window.addEventListener('unbody:theme-change', syncTheme);

    return () => {
      window.removeEventListener('unbody:theme-change', syncTheme);
    };
  }, []);

  useEffect(() => {
    const previousTab = previousHighlightTarget.current;
    if (previousTab === highlightTab) return;

    previousHighlightTarget.current = highlightTab;
    if (!showActiveHighlight) return;

    if (highlightMoveTimer.current) window.clearTimeout(highlightMoveTimer.current);
    setPreviousHighlightTab(previousTab);
    setIsHighlightMoving(true);
    highlightMoveTimer.current = window.setTimeout(() => {
      setIsHighlightMoving(false);
      setPreviousHighlightTab(null);
    }, 360);
  }, [highlightTab, showActiveHighlight]);

  const toggleExpanded = () => {
    if (highlightTimer.current) window.clearTimeout(highlightTimer.current);
    if (collapseTimer.current) window.clearTimeout(collapseTimer.current);

    if (isExpanded) {
      setIsCollapsing(true);
      setHoveredTab(null);
      setShowActiveHighlight(false);
      setShowThemeItem(false);
      collapseTimer.current = window.setTimeout(() => {
        setIsExpanded(false);
        collapseTimer.current = window.setTimeout(() => {
          setIsCollapsing(false);
        }, 520);
      }, 90);
      return;
    }

    setIsCollapsing(false);
    setIsExpanded(true);
    setShowThemeItem(true);
    highlightTimer.current = window.setTimeout(() => {
      setShowActiveHighlight(true);
    }, 680);
  };

  const activeTextClass = (tab: string) =>
    highlightTab === tab
      ? showActiveHighlight
        ? ''
        : 'text-foreground'
      : activeTab === tab
      ? 'text-foreground'
      : 'text-foreground/50';

  const activeTextStyle = (tab: string) => ({
    color:
      highlightTab === tab && showActiveHighlight
        ? 'var(--background)'
        : activeTab === tab
        ? 'var(--foreground)'
        : 'color-mix(in srgb, var(--foreground) 50%, transparent)',
  });

  const navigateTo = (tab: string, href: string) => {
    setActiveTab(tab);
    void navigate(href);
  };

  const toggleTheme = () => {
    const controller = (window as Window & {
      __unbodyThemeSync?: { setTheme?: (theme: 'light' | 'dark') => void };
    }).__unbodyThemeSync;
    const isDark = document.documentElement.classList.contains('dark');
    controller?.setTheme?.(isDark ? 'light' : 'dark');
  };

  return (
    <div
      className="relative flex items-center justify-center w-[38px] h-[38px] isolate type-ui-md"
      data-type="nav"
      onPointerLeave={() => setHoveredTab(null)}
    >
      {/* SVG Filter for Mitosis/Gooey effect */}
      <svg className="absolute w-0 h-0" xmlns="http://www.w3.org/2000/svg" version="1.1">
        <defs>
          <filter id="gooey" x="-400%" y="-200%" width="900%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="8" result="blur" />
            <feColorMatrix 
              in="blur" 
              mode="matrix" 
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 20 -9" 
              result="goo" 
            />
          </filter>
          <filter id="active-gooey" x="-400%" y="-200%" width="900%" height="500%">
            <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 18 -7"
              result="goo"
            />
            <feComposite in="SourceGraphic" in2="goo" operator="atop" />
          </filter>
        </defs>
      </svg>

      {/* Coordinate system stays in place, elements expand to the right */}
      <motion.div 
        className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none"
      >
        {/* Gooey Blob Layer (The melting glue body) */}
        <div 
          className="absolute w-[600px] h-[200px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" 
          style={{ filter: 'url(#gooey) drop-shadow(0px 10px 15px rgba(0,0,0,0.10)) drop-shadow(0px 4px 6px rgba(0,0,0,0.06))' }}
        >
          <div className="absolute top-1/2 left-1/2 w-0 h-0">
            {/* Trigger Gooey Body */}
            <div className="absolute w-[38px] h-[38px] -translate-x-1/2 -translate-y-1/2 rounded-full p-px bg-gradient-to-b from-surface-border/95 via-surface-border/45 to-surface-border/10 dark:from-surface-border/70 dark:via-surface-border/28 dark:to-surface-border/8">
              <span className={`${surfaceInnerClass} rounded-full`} />
            </div>

            {/* Theme Gooey Body */}
            <motion.div
              initial={false}
              animate={{
                x: showThemeItem ? themeItemCenter : 0,
                opacity: isExpanded || isCollapsing ? 1 : 0,
              }}
              transition={springConfig}
              className="absolute left-0 top-0 w-0 h-0"
            >
              <motion.div
                initial={false}
                animate={{ width: TRIGGER_SIZE }}
                transition={springConfig}
                className={`${surfaceShellClass} ${themeRadiusClass()}`}
              >
                <span className={`${surfaceInnerClass} ${themeRadiusClass()}`} />
              </motion.div>
            </motion.div>

            {/* Home Gooey Body */}
            <motion.div
              initial={false}
              animate={{ x: isExpanded ? homeMetric.center : 0 }}
              transition={{ ...springConfig, delay: delayHome }}
              className="absolute left-0 top-0 w-0 h-0"
            >
              <motion.div
                initial={false}
                animate={{ width: isExpanded ? homeMetric.bodyWidth : TRIGGER_SIZE }}
                transition={{ ...springConfig, delay: delayHome }}
                className={`${surfaceShellClass} ${tabRadiusClass(0)}`}
              >
                <span className={`${surfaceInnerClass} ${tabRadiusClass(0)}`} />
              </motion.div>

              {/* Manifesto Gooey Body */}
              <motion.div
                initial={false}
                animate={{ x: isExpanded ? manifestoMetric.center - homeMetric.center : 0 }}
                transition={{ ...springConfig, delay: delayManifesto }}
                className="absolute left-0 top-0 w-0 h-0"
              >
                <motion.div
                  initial={false}
                  animate={{ width: isExpanded ? manifestoMetric.bodyWidth : TRIGGER_SIZE }}
                  transition={{ ...springConfig, delay: delayManifesto }}
                  className={`${surfaceShellClass} ${tabRadiusClass(1)}`}
                >
                  <span className={`${surfaceInnerClass} ${tabRadiusClass(1)}`} />
                </motion.div>

                {/* Projects Gooey Body */}
                <motion.div
                  initial={false}
                  animate={{ x: isExpanded ? projectsMetric.center - manifestoMetric.center : 0 }}
                  transition={{ ...springConfig, delay: delayProjects }}
                  className="absolute left-0 top-0 w-0 h-0"
                >
                  <motion.div
                    initial={false}
                    animate={{ width: isExpanded ? projectsMetric.bodyWidth : TRIGGER_SIZE }}
                    transition={{ ...springConfig, delay: delayProjects }}
                    className={`${surfaceShellClass} ${tabRadiusClass(2)}`}
                  >
                    <span className={`${surfaceInnerClass} ${tabRadiusClass(2)}`} />
                  </motion.div>

                  {/* Blog Gooey Body */}
                  <motion.div
                    initial={false}
                    animate={{ x: isExpanded ? blogMetric.center - projectsMetric.center : 0 }}
                    transition={{ ...springConfig, delay: delayBlog }}
                    className="absolute left-0 top-0 w-0 h-0"
                  >
                    <motion.div
                      initial={false}
                      animate={{ width: isExpanded ? blogMetric.bodyWidth : TRIGGER_SIZE }}
                      transition={{ ...springConfig, delay: delayBlog }}
                      className={`${surfaceShellClass} ${tabRadiusClass(3)}`}
                    >
                      <span className={`${surfaceInnerClass} ${tabRadiusClass(3)}`} />
                    </motion.div>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Crisp Layer (Icons and Text perfectly centered without blur) */}
        <div className="absolute top-0 left-0 w-0 h-0 z-10">
          <div
            aria-hidden="true"
            className="absolute top-0 left-0 pointer-events-none z-0"
            style={{ filter: 'url(#active-gooey)' }}
          >
            <motion.span
              className="absolute top-[calc((1lh+0.75em)/-2)] h-[calc(1lh+0.75em)] rounded-full bg-foreground"
              initial={false}
              animate={{
                x: previousHighlightLeft,
                width: previousHighlightWidth,
                opacity: isExpanded && showActiveHighlight && isHighlightMoving ? 1 : 0,
                scaleX: isHighlightMoving ? 0.82 : 1,
              }}
              transition={{
                ...springConfig,
                stiffness: 180,
                damping: 20,
              }}
              style={{ transformOrigin: 'center' }}
            />
            <motion.span
              className="absolute top-[calc((1lh+0.75em)/-2)] h-[calc(1lh+0.75em)] rounded-full bg-foreground"
              initial={false}
              animate={{
                x: activeHighlightLeft,
                width: activeHighlightWidth,
                opacity: isExpanded && showActiveHighlight ? 1 : 0,
                scaleX: isHighlightMoving ? 1.08 : 1,
              }}
              transition={{
                ...springConfig,
                stiffness: isHighlightMoving ? 170 : 220,
                damping: isHighlightMoving ? 17 : 22,
              }}
              style={{ transformOrigin: 'center' }}
            />
            <motion.span
              className="absolute top-[-7px] h-[14px] rounded-full bg-foreground"
              initial={false}
              animate={{
                x: connectorLeft,
                width: connectorWidth,
                opacity:
                  isExpanded &&
                  showActiveHighlight &&
                  isHighlightMoving &&
                  previousHighlightTab !== highlightTab
                    ? 1
                    : 0,
                scaleY: isHighlightMoving ? 0.86 : 0.65,
              }}
              transition={{
                ...springConfig,
                stiffness: 150,
                damping: 18,
              }}
              style={{ transformOrigin: 'center' }}
            />
          </div>
          
          {/* Theme Foreground */}
          <motion.div
            initial={false}
            animate={{
              x: showThemeItem ? themeItemCenter : 0,
              opacity: showThemeItem ? 1 : 0,
            }}
            transition={springConfig}
            className="absolute left-0 top-0 w-0 h-0 pointer-events-none"
          >
            <motion.button
              type="button"
              aria-label={resolvedTheme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
              onPointerEnter={() => setHoveredTab(null)}
              onClick={toggleTheme}
              initial={false}
              animate={{ width: TRIGGER_SIZE, opacity: showThemeItem ? 1 : 0 }}
              transition={springConfig}
              className={`absolute z-[2] flex items-center justify-center h-[calc(1lh+1.5em)] -translate-x-1/2 -translate-y-1/2 rounded-full outline-none select-none cursor-pointer overflow-hidden text-foreground/80 hover:text-foreground focus-visible:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors ${
                showThemeItem ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
            >
              {resolvedTheme === 'dark' ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-[1em] w-[1em]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 1 0 9.8 9.8z" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  className="h-[1em] w-[1em]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 2v2.5M12 19.5V22M4.93 4.93l1.77 1.77M17.3 17.3l1.77 1.77M2 12h2.5M19.5 12H22M4.93 19.07l1.77-1.77M17.3 6.7l1.77-1.77" />
                </svg>
              )}
            </motion.button>
          </motion.div>

          {/* Trigger Icon */}
          <motion.button
            onClick={toggleExpanded}
            aria-label={isExpanded ? 'Close navigation' : 'Open navigation'}
            className="absolute z-[20] flex items-center justify-center w-[38px] h-[38px] -translate-x-1/2 -translate-y-1/2 outline-none select-none pointer-events-auto cursor-pointer text-foreground"
          >
            <motion.span
              key={triggerDisplayGlyph}
              initial={{ opacity: 0.35 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.08 }}
              className="text-[18px] leading-none"
              style={{ fontFamily: 'var(--type-heading-family)' }}
            >
              {triggerDisplayGlyph}
            </motion.span>
          </motion.button>

          {/* Home Foreground */}
          <motion.div
             initial={false}
             animate={{ x: isExpanded ? homeMetric.center : 0 }}
             transition={{ ...springConfig, delay: delayHome }}
             className="absolute left-0 top-0 w-0 h-0 pointer-events-none"
          >
             <motion.button
                onPointerEnter={() => setHoveredTab('home')}
                onClick={() => {
                  navigateTo('home', '/');
                }}
                initial={false}
                animate={{ width: isExpanded ? homeMetric.bodyWidth : TRIGGER_SIZE, opacity: isExpanded ? 1 : 0 }}
                transition={{ ...springConfig, delay: delayHome }}
                className={`absolute z-[2] flex items-center justify-center h-[calc(1lh+1.5em)] -translate-x-1/2 -translate-y-1/2 outline-none select-none cursor-pointer overflow-hidden ${!isExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`}
             >
                <div className="relative z-10 flex items-center justify-center shrink-0 gap-1.5 whitespace-nowrap" style={{ width: homeMetric.bodyWidth }}>
                   <span ref={(node) => { labelRefs.current.home = node; }} style={activeTextStyle('home')} className={`relative z-[30] text-[length:var(--type-ui-md-size)] font-medium tracking-[var(--type-ui-md-tracking)] uppercase transition-colors duration-200 ${activeTextClass('home')}`}>Home</span>
                </div>
             </motion.button>

             {/* Manifesto Foreground */}
             <motion.div
                initial={false}
                animate={{ x: isExpanded ? manifestoMetric.center - homeMetric.center : 0 }}
                transition={{ ...springConfig, delay: delayManifesto }}
                className="absolute left-0 top-0 w-0 h-0 pointer-events-none"
             >
                <motion.button
                   onPointerEnter={() => setHoveredTab('manifesto')}
                   onClick={() => {
                     navigateTo('manifesto', '/manifesto');
                   }}
                   initial={false}
                   animate={{ width: isExpanded ? manifestoMetric.bodyWidth : TRIGGER_SIZE, opacity: isExpanded ? 1 : 0 }}
                   transition={{ ...springConfig, delay: delayManifesto }}
                   className={`absolute z-[2] flex items-center justify-center h-[calc(1lh+1.5em)] -translate-x-1/2 -translate-y-1/2 outline-none select-none cursor-pointer overflow-hidden ${!isExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`}
                >
                   <div className="relative z-10 flex items-center justify-center shrink-0 gap-1.5 whitespace-nowrap" style={{ width: manifestoMetric.bodyWidth }}>
                     <span ref={(node) => { labelRefs.current.manifesto = node; }} style={activeTextStyle('manifesto')} className={`relative z-[30] text-[length:var(--type-ui-md-size)] font-medium tracking-[var(--type-ui-md-tracking)] uppercase transition-colors duration-200 ${activeTextClass('manifesto')}`}>Manifesto</span>
                   </div>
                </motion.button>

                {/* Projects Foreground */}
                <motion.div
                   initial={false}
                   animate={{ x: isExpanded ? projectsMetric.center - manifestoMetric.center : 0 }}
                   transition={{ ...springConfig, delay: delayProjects }}
                   className="absolute left-0 top-0 w-0 h-0 pointer-events-none"
                >
                   <motion.button
                      onPointerEnter={() => setHoveredTab('projects')}
                      onClick={() => {
                        navigateTo('projects', '/projects');
                      }}
                      initial={false}
                      animate={{ width: isExpanded ? projectsMetric.bodyWidth : TRIGGER_SIZE, opacity: isExpanded ? 1 : 0 }}
                      transition={{ ...springConfig, delay: delayProjects }}
                      className={`absolute z-[2] flex items-center justify-center h-[calc(1lh+1.5em)] -translate-x-1/2 -translate-y-1/2 outline-none select-none cursor-pointer overflow-hidden ${!isExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`}
                   >
                      <div className="relative z-10 flex items-center justify-center shrink-0 gap-1.5 whitespace-nowrap" style={{ width: projectsMetric.bodyWidth }}>
                         <span ref={(node) => { labelRefs.current.projects = node; }} style={activeTextStyle('projects')} className={`relative z-[30] text-[length:var(--type-ui-md-size)] font-medium tracking-[var(--type-ui-md-tracking)] uppercase transition-colors duration-200 ${activeTextClass('projects')}`}>Projects</span>
                      </div>
                   </motion.button>

                   {/* Blog Foreground */}
                   <motion.div
                      initial={false}
                      animate={{ x: isExpanded ? blogMetric.center - projectsMetric.center : 0 }}
                      transition={{ ...springConfig, delay: delayBlog }}
                      className="absolute left-0 top-0 w-0 h-0 pointer-events-none"
                   >
                      <motion.button
                         onPointerEnter={() => setHoveredTab('blog')}
                         onClick={() => {
                           navigateTo('blog', '/blog');
                         }}
                         initial={false}
                         animate={{ width: isExpanded ? blogMetric.bodyWidth : TRIGGER_SIZE, opacity: isExpanded ? 1 : 0 }}
                         transition={{ ...springConfig, delay: delayBlog }}
                         className={`absolute z-[2] flex items-center justify-center h-[calc(1lh+1.5em)] -translate-x-1/2 -translate-y-1/2 outline-none select-none cursor-pointer overflow-hidden ${!isExpanded ? 'pointer-events-none' : 'pointer-events-auto'}`}
                      >
                         <div className="relative z-10 flex items-center justify-center shrink-0 gap-1.5 whitespace-nowrap" style={{ width: blogMetric.bodyWidth }}>
                           <span ref={(node) => { labelRefs.current.blog = node; }} style={activeTextStyle('blog')} className={`relative z-[30] text-[length:var(--type-ui-md-size)] font-medium tracking-[var(--type-ui-md-tracking)] uppercase transition-colors duration-200 ${activeTextClass('blog')}`}>Blog</span>
                         </div>
                      </motion.button>
                   </motion.div>
                </motion.div>
             </motion.div>
          </motion.div>

        </div>
      </motion.div>
    </div>
  );
}
