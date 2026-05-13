import React, { useRef } from 'react';
import { Section, Reveal, Icon } from './primitives';
import { STACK } from './data';

/* ============================================================
   stack.jsx — Stack/Technologies section
   ============================================================ */

function techGlyph(name) {
  // Minimal monogram glyph
  return name
    .replace('TailwindCSS', 'TW')
    .replace('PostgreSQL', 'PG')
    .replace(/^(.{2}).*/, '$1')
    .toUpperCase();
}

function TechCard({ tech }) {
  const ref = useRef(null);
  function onMove(e) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }
  return (
    <div ref={ref} onMouseMove={onMove} className="tech-card">
      <div
        className="flex items-center justify-center font-mono text-[12px] font-semibold"
        style={{
          width: 40, height: 40, borderRadius: 10,
          background: 'linear-gradient(135deg, var(--accent-soft), transparent)',
          border: '1px solid var(--border)',
          color: 'var(--accent)',
          letterSpacing: '0.04em',
        }}
      >
        {techGlyph(tech.name)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[14.5px] font-medium" style={{ color: 'var(--text)' }}>{tech.name}</div>
        <div className="text-[11.5px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
          {tech.level} · {tech.years}y
        </div>
      </div>
    </div>
  );
}

function Stack({ t, lang }) {
  const groups = ['Frontend', 'Backend', 'Data', 'Tools'];
  return (
    <Section id="stack" kicker={t.stack.eyebrow} className="relative">
      <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(90deg, transparent, var(--border-strong), transparent)' }} />

      <Reveal>
        <h2 className="section-title">
          <span className="gradient-text">{t.stack.title_a}</span>{' '}
          <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.stack.title_b}</em>
        </h2>
      </Reveal>
      <Reveal delay={80}>
        <p className="mt-4 section-kicker">{t.stack.sub}</p>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
        {groups.map((g, idx) => (
          <Reveal key={g} delay={120 + idx * 80}>
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center justify-center" style={{ width: 28, height: 28, borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--accent)' }}>
                    <Icon name={g === 'Frontend' ? 'layers' : g === 'Backend' ? 'box' : g === 'Data' ? 'cube' : 'sparkle'} size={14} />
                  </span>
                  <h3 className="text-[15px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>
                    {t.stack.groups[g]}
                  </h3>
                </div>
                <span className="eyebrow">{String(STACK[g].length).padStart(2, '0')}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {STACK[g].map((tech) => (
                  <TechCard key={tech.name} tech={tech} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { Stack };
