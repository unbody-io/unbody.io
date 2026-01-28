"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "home" },
  { href: "/lab", label: "lab" },
  { href: "/blog", label: "blog" },
  { href: "/about", label: "about" },
];

export function Header() {
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="fixed top-8 w-full z-[100] pointer-events-none animate-in fade-in slide-in-from-top-4 duration-1000">
      <div className="max-w-2xl mx-auto w-full flex justify-start px-4">
        <nav className="flex items-center gap-1 p-1 bg-white/10 backdrop-blur-3xl rounded-full border border-white/30 shadow-[0_10px_40px_rgba(0,0,0,0.05)] pointer-events-auto">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "px-5 py-2 rounded-full text-[10px] uppercase tracking-[0.2em] transition-all duration-300",
                isActive(item.href)
                  ? "bg-black text-white font-bold shadow-xl scale-105 z-10"
                  : "bg-transparent text-black/50 hover:text-black hover:bg-black/5"
              )}
            >
              {item.label}
            </Link>
          ))}
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 mx-3 animate-pulse shadow-[0_0_12px_rgba(6,182,212,0.8)]" />
        </nav>
      </div>
    </header>
  );
}
