import React, { useState, useEffect } from 'react';
import { Icon } from './primitives';

/* ============================================================
   nav.jsx — top navigation, theme & lang toggle
   ============================================================ */

function Nav({ lang, setLang, theme, setTheme, t }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    function onScroll() { setScrolled(window.scrollY > 24); }
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items = [
    { id: 'about',      label: t.nav.about },
    { id: 'stack',      label: t.nav.stack },
    { id: 'experience', label: t.nav.experience },
    { id: 'projects',   label: t.nav.projects },
    { id: 'github',     label: t.nav.github },
    { id: 'contact',    label: t.nav.contact },
  ];

  return (
    <header
      className="fixed top-3 left-0 right-0 z-40 px-4 transition-all"
      style={{ opacity: 1 }}
    >
      <div
        className="mx-auto flex items-center justify-between gap-3 px-3 py-2"
        style={{
          maxWidth: scrolled ? 880 : 1100,
          transition: 'max-width .35s cubic-bezier(.2,.7,.2,1)',
          background: scrolled ? 'color-mix(in oklch, var(--bg) 70%, transparent)' : 'transparent',
          backdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(18px) saturate(140%)' : 'none',
          border: scrolled ? '1px solid var(--border)' : '1px solid transparent',
          borderRadius: 999,
        }}
      >
        <a href="#top" className="flex items-center gap-2 pl-2" style={{ color: 'var(--text)' }}>
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full font-mono text-[12px] font-semibold"
            style={{
              background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
              color: 'white',
              boxShadow: '0 6px 20px -8px var(--accent-ring)',
            }}
          >GA</span>
          <span className="font-medium tracking-tight hidden sm:inline">Gabriel Armond</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {items.map((it) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              className="px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.background = 'var(--surface-2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {it.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <button
            className="btn-icon"
            style={{ height: 34, width: 34 }}
            onClick={() => setLang(lang === 'pt' ? 'en' : 'pt')}
            aria-label="Toggle language"
            title={lang === 'pt' ? 'Switch to English' : 'Mudar para Português'}
          >
            <span className="font-mono text-[11px] font-semibold uppercase">{lang === 'pt' ? 'PT' : 'EN'}</span>
          </button>
          <button
            className="btn-icon"
            style={{ height: 34, width: 34 }}
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            <Icon name={theme === 'dark' ? 'sun' : 'moon'} size={14} />
          </button>
          <a
            href="#contact"
            className="btn btn-primary hidden sm:inline-flex"
            style={{ height: 34, padding: '0 14px', fontSize: 13 }}
          >
            {t.nav.contact}
            <Icon name="arrow-up-right" size={14} />
          </a>
          <div className="md:hidden">
          <button
            className="btn-icon"
            style={{ height: 34, width: 34 }}
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Icon name="menu" size={16} />
          </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div
          className="fixed inset-0 z-50 md:hidden"
          style={{ background: 'color-mix(in oklch, var(--bg) 90%, transparent)', backdropFilter: 'blur(20px)' }}
          onClick={() => setOpen(false)}
        >
          <div className="absolute top-4 right-4">
            <button className="btn-icon" onClick={() => setOpen(false)} aria-label="Close">
              <Icon name="x" size={18} />
            </button>
          </div>
          <nav className="flex flex-col gap-2 px-8 pt-24">
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                onClick={() => setOpen(false)}
                className="text-3xl font-medium tracking-tight"
                style={{ color: 'var(--text)' }}
              >
                {it.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

export { Nav };
