import React, { useState, useEffect, useRef } from 'react';
import { Section, Reveal, Icon } from './primitives';
import { PROJECTS } from './data';

/* ============================================================
   projects.jsx — featured projects, 3 layout variants
   ============================================================ */

// -------- Accent color map --------
const ACCENT_HEX = {
  indigo: '#6366f1',
  amber:  '#f59e0b',
  emerald:'#10b981',
  violet: '#8b5cf6',
  cyan:   '#06b6d4',
};

// -------- Generic placeholder for projects without live demo --------
function GenericThumb({ project }) {
  const color = ACCENT_HEX[project.accent] || '#a1a1aa';
  const cols = 4;
  const rows = 3;
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden" style={{ background: '#08080f' }}>
      <div className="absolute inset-0" style={{ background: `radial-gradient(ellipse 80% 60% at 50% 40%, ${color}18, transparent 70%)` }} />
      <div className="relative grid gap-2.5 p-8" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {Array.from({ length: cols * rows }).map((_, i) => {
          const highlight = i === 1 || i === 6;
          return (
            <div key={i} className="rounded-lg" style={{
              height: 36 + (i % 3) * 12,
              background: highlight ? `${color}30` : 'rgba(255,255,255,0.04)',
              border: `1px solid ${highlight ? color + '55' : 'rgba(255,255,255,0.06)'}`,
            }} />
          );
        })}
      </div>
      <div className="relative mt-1 flex items-center gap-2">
        <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: color }} />
        <span className="font-mono text-[10px] uppercase tracking-widest" style={{ color: color + 'aa' }}>
          {project.stack[0]}
        </span>
      </div>
    </div>
  );
}

// -------- Screenshot thumbnail from local file --------
function ScreenshotThumb({ project }) {
  const [errored, setErrored] = useState(false);
  const color = ACCENT_HEX[project.accent] || '#a1a1aa';
  const src = `/thumbnails/${project.id}.png`;

  if (errored) return <GenericThumb project={project} />;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ background: '#08080f' }}>
      <img
        src={src}
        alt={project.name}
        onError={() => setErrored(true)}
        className="w-full h-full object-cover object-top"
        style={{ opacity: 0.92 }}
      />
      <div
        className="absolute inset-0"
        style={{ background: `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.55) 100%), linear-gradient(to right, ${color}10, transparent 40%)` }}
      />
    </div>
  );
}

// -------- Project thumbnails --------
function ProjectThumb({ project }) {
  const hasLiveDemo = project.links.demo && project.links.demo !== '#';
  if (hasLiveDemo) return <ScreenshotThumb project={project} />;
  return <GenericThumb project={project} />;
}

function projectHref(p) {
  if (p.id === 'elitmetrics') return p.links.demo;
  return p.links.code;
}

// ---------- Project Card (grid) ----------
function ProjectCard({ p, t, lang, featured = false }) {
  return (
    <a href={projectHref(p)} className="proj-card group block" target="_blank" rel="noreferrer">
      <div className="proj-thumb">
        <ProjectThumb project={p} />
        {p.featured && (
          <div className="absolute top-3 left-3 pill pill-accent">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            {t.projects.featured}
          </div>
        )}
        <div className="absolute top-3 right-3 pill">{p.year}</div>
      </div>
      <div className="px-6 py-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="eyebrow mb-1">{p.tag[lang]}</div>
            <h3 className="text-[22px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>{p.name}</h3>
          </div>
          <span className="btn-icon flex-shrink-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" style={{ height: 36, width: 36 }}>
            <Icon name="arrow-up-right" size={14} />
          </span>
        </div>
        <p className="mt-3 text-[14px]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{p.description[lang]}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
        </div>
      </div>
    </a>
  );
}

// ---------- Project list row ----------
function ProjectRow({ p, t, lang, idx }) {
  const [hover, setHover] = useState(false);
  return (
    <a
      href={projectHref(p)}
      target="_blank"
      rel="noreferrer"
      className="relative grid grid-cols-[40px_1fr_auto] sm:grid-cols-[60px_minmax(0,1.4fr)_minmax(0,1fr)_auto] gap-5 items-center py-7 group"
      style={{ borderTop: idx === 0 ? '1px solid var(--border)' : '1px solid var(--border)' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* hover bg */}
      <div
        className="absolute inset-x-[-1.5rem] inset-y-0 -z-10 transition-opacity"
        style={{ background: 'var(--surface)', borderRadius: 14, opacity: hover ? 1 : 0 }}
      />
      <div className="font-mono text-[12px]" style={{ color: 'var(--text-dim)' }}>
        {String(idx + 1).padStart(2, '0')}
      </div>
      <div>
        <div className="flex items-baseline gap-3 flex-wrap">
          <h3 className="text-[22px] sm:text-[26px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>
            {p.name}
          </h3>
          {p.featured && (
              <span className="pill pill-accent shrink-0">
                <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                <span className="hidden sm:inline">{t.projects.featured}</span>
              </span>
            )}
        </div>
        <div className="mt-1 text-[13px]" style={{ color: 'var(--text-muted)' }}>{p.tag[lang]}</div>
      </div>
      <div className="hidden sm:flex flex-wrap gap-1.5">
        {p.stack.slice(0, 4).map((s) => <span key={s} className="pill">{s}</span>)}
      </div>
      <div className="flex items-center gap-3">
        <span className="eyebrow hidden sm:inline">{p.year}</span>
        <span
          className="btn-icon transition-transform"
          style={{
            height: 38, width: 38,
            background: hover ? 'var(--text)' : 'var(--surface)',
            color: hover ? 'var(--bg)' : 'var(--text)',
            borderColor: hover ? 'var(--text)' : 'var(--border)',
            transform: hover ? 'rotate(-45deg)' : 'rotate(0)',
          }}
        >
          <Icon name="arrow-right" size={16} />
        </span>
      </div>
    </a>
  );
}

// ---------- 3D card ----------
function Project3D({ p, t, lang }) {
  const wrap = useRef(null);
  const card = useRef(null);
  useEffect(() => {
    const w = wrap.current; const c = card.current;
    if (!w || !c) return;
    function move(e) {
      const r = w.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      c.style.transform = `rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateZ(0)`;
    }
    function leave() { c.style.transform = ''; }
    w.addEventListener('mousemove', move);
    w.addEventListener('mouseleave', leave);
    return () => { w.removeEventListener('mousemove', move); w.removeEventListener('mouseleave', leave); };
  }, []);
  return (
    <div ref={wrap} className="card3d-wrap">
      <a href={projectHref(p)} ref={card} className="card3d proj-card block" target="_blank" rel="noreferrer">
        <div className="proj-thumb">
          <ProjectThumb project={p} />
        </div>
        <div className="px-6 py-5">
          <div className="flex items-baseline justify-between gap-3">
            <h3 className="text-[18px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>{p.name}</h3>
            <span className="eyebrow">{p.year}</span>
          </div>
          <div className="mt-1 text-[12.5px]" style={{ color: 'var(--text-muted)' }}>{p.tag[lang]}</div>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {p.stack.slice(0, 3).map((s) => <span key={s} className="pill">{s}</span>)}
          </div>
        </div>
      </a>
    </div>
  );
}

// ---------- MAIN section ----------
function Projects({ t, lang, layout, setLayout }) {
  const featured = PROJECTS.find((p) => p.featured);
  const rest = PROJECTS.filter((p) => !p.featured);
  return (
    <Section id="projects" kicker={t.projects.eyebrow}>
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
        <div>
          <Reveal>
            <h2 className="section-title">
              <span className="gradient-text">{t.projects.title_a}</span>{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.projects.title_b}</em>
            </h2>
          </Reveal>
          <Reveal delay={80}><p className="mt-4 section-kicker">{t.projects.sub}</p></Reveal>
        </div>
        {/* Layout switcher */}
        <Reveal delay={100}>
          <div className="inline-flex items-center p-1 rounded-full" style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}>
            {[
              { key: 'grid', label: t.projects.layout_grid, icon: 'grid' },
              { key: 'list', label: t.projects.layout_list, icon: 'list' },
              { key: '3d', label: t.projects.layout_3d, icon: 'cube' },
            ].map((opt) => (
              <button
                key={opt.key}
                onClick={() => setLayout(opt.key)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[12.5px] font-medium transition-colors"
                style={{
                  background: layout === opt.key ? 'var(--text)' : 'transparent',
                  color: layout === opt.key ? 'var(--bg)' : 'var(--text-muted)',
                }}
              >
                <Icon name={opt.icon} size={13} />
                {opt.label}
              </button>
            ))}
          </div>
        </Reveal>
      </div>

      {/* === GRID === */}
      {layout === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Featured BIG */}
          <Reveal className="lg:col-span-12">
            <ProjectCardBig p={featured} t={t} lang={lang} />
          </Reveal>
          {rest.map((p, i) => (
            <Reveal key={p.id} delay={i * 60} className="lg:col-span-6">
              <ProjectCard p={p} t={t} lang={lang} />
            </Reveal>
          ))}
        </div>
      )}

      {/* === LIST === */}
      {layout === 'list' && (
        <div>
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 40}>
              <ProjectRow p={p} t={t} lang={lang} idx={i} />
            </Reveal>
          ))}
          <div style={{ borderTop: '1px solid var(--border)' }} />
        </div>
      )}

      {/* === 3D === */}
      {layout === '3d' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 60}>
              <Project3D p={p} t={t} lang={lang} />
            </Reveal>
          ))}
        </div>
      )}
    </Section>
  );
}

// ---------- Big featured card (grid layout only) ----------
function ProjectCardBig({ p, t, lang }) {
  return (
    <a href={p.links.demo} className="proj-card group block">
      <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="proj-thumb lg:aspect-auto" style={{ minHeight: 360 }}>
          <ProjectThumb project={p} />
          <div className="absolute top-4 left-4 z-10 pill pill-accent whitespace-nowrap">
            <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
            {t.projects.featured}
          </div>
        </div>
        <div className="px-7 py-6 sm:p-10 flex flex-col">
          <div className="eyebrow">{p.tag[lang]}</div>
          <h3 className="mt-2 text-[32px] sm:text-[40px] font-medium tracking-tight leading-tight" style={{ color: 'var(--text)' }}>{p.name}</h3>
          <p className="mt-4 text-[15.5px]" style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>{p.description[lang]}</p>
          <div className="mt-5 flex flex-wrap gap-1.5">
            {p.stack.map((s) => <span key={s} className="pill">{s}</span>)}
          </div>
          <div className="mt-auto pt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
            <div className="flex items-center gap-3">
              <span className="btn btn-primary">
                {t.projects.view_demo} <Icon name="arrow-up-right" size={14} />
              </span>
              <span className="btn btn-ghost">
                <Icon name="github" size={14} /> {t.projects.view_code}
              </span>
            </div>
            <div className="sm:ml-auto">
              <div className="font-mono text-[24px] font-medium" style={{ color: 'var(--accent)' }}>{p.metric.value}</div>
              <div className="eyebrow">{p.metric.label[lang]}</div>
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}

export { Projects };
