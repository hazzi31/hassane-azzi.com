'use client';

import Link from 'next/link';
import {useEffect, useId, useRef, useState} from 'react';
import {Menu, X} from 'lucide-react';

export type MenuLink = {href: string; label: string; current?: boolean};

// Compact navigation for small screens (the main nav is hidden below 900px).
// Closes on link selection, Escape and outside click.
export default function MobileMenu({
  links,
  buttonLabel,
  navLabel,
}: {
  links: MenuLink[];
  buttonLabel: string;
  navLabel: string;
}) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    const onPointer = (e: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('pointerdown', onPointer);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('pointerdown', onPointer);
    };
  }, [open]);

  return (
    <div className="mobile-menu" ref={rootRef}>
      <button
        ref={buttonRef}
        type="button"
        className="mobile-menu-toggle"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X size={16} aria-hidden="true"/> : <Menu size={16} aria-hidden="true"/>}
        <span>{buttonLabel}</span>
      </button>
      <nav id={panelId} className="mobile-menu-panel" aria-label={navLabel} hidden={!open}>
        <ul>
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                aria-current={link.current ? 'page' : undefined}
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
