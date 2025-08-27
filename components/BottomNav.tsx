"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  Calendar,
  Utensils,
  BookOpen,
  MoreHorizontal,
} from "lucide-react";
import React from "react";

type NavItem = {
  href: string; // rotas como string (typedRoutes desativado no next.config)
  icon: React.ComponentType<any>;
  label: string;
};

const ITEMS: ReadonlyArray<NavItem> = [
  { href: "/",         icon: Home,          label: "Home" },
  { href: "/eventos",  icon: Calendar,      label: "Eventos" },
  { href: "/almoco",   icon: Utensils,      label: "Almoço" },
  { href: "/capacitar",icon: BookOpen,      label: "Capacitar" },
  { href: "/mais",     icon: MoreHorizontal,label: "Mais" }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-white/10 bg-[color:var(--card)]/90 backdrop-blur">
      {/* 5 colunas fixas para os 5 itens */}
      <div className="mx-auto max-w-[480px] grid grid-cols-5 gap-1 px-2 py-2">
        {ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className="flex flex-col items-center justify-center py-2 text-xs rounded-md transition active:scale-95"
              aria-label={label}
            >
              <Icon
                size={22}
                className={active ? "text-[color:var(--accent2)]" : "text-[color:var(--muted)]"}
              />
              <span className={active ? "text-[color:var(--text)]" : "text-[color:var(--muted)]"}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
