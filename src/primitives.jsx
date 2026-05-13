import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

/* ============================================================
   primitives.jsx — shared primitives + cursor + reveal
   ============================================================ */

// ---------- Reveal on scroll ----------
function Reveal({ children, className = '', delay = 0, as: As = 'div' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    function reveal() {
      if (cancelled || !el) return;
      el.classList.add('in');
    }
    // IO fires when scrolling, but also fire a safety fallback so first-paint
    // content reveals even if IO is sluggish in this environment.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setTimeout(reveal, delay);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.05, rootMargin: '0px 0px -2% 0px' }
    );
    io.observe(el);
    // Fallback: reveal anything in initial viewport after a short delay.
    const fallback = setTimeout(() => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) reveal();
    }, 120 + delay);
    return () => { cancelled = true; clearTimeout(fallback); io.disconnect(); };
  }, [delay]);
  return <As ref={ref} className={`reveal ${className}`}>{children}</As>;
}

// ---------- Custom cursor ----------
function CustomCursor() {
  const dotRef = useRef(null);
  const haloRef = useRef(null);
  const targetX = useRef(0), targetY = useRef(0);
  const haloX = useRef(0), haloY = useRef(0);
  useEffect(() => {
    if (window.matchMedia('(max-width: 768px)').matches) return;
    function move(e) {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    }
    function enter(e) {
      const t = e.target;
      if (t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea, label')) {
        document.body.classList.add('cursor-hover');
      }
    }
    function leave(e) {
      const t = e.target;
      if (t.closest && t.closest('a, button, [data-cursor="hover"], input, textarea, label')) {
        document.body.classList.remove('cursor-hover');
      }
    }
    let raf;
    function loop() {
      haloX.current += (targetX.current - haloX.current) * 0.18;
      haloY.current += (targetY.current - haloY.current) * 0.18;
      if (haloRef.current) {
        haloRef.current.style.transform = `translate(${haloX.current}px, ${haloY.current}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(loop);
    }
    loop();
    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', enter);
    document.addEventListener('mouseout', leave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', enter);
      document.removeEventListener('mouseout', leave);
    };
  }, []);
  return (
    <React.Fragment>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={haloRef} className="cursor-halo" />
    </React.Fragment>
  );
}

// ---------- Icons (inline, hairline stroke) ----------
function Icon({ name, size = 16, className = '' }) {
  const s = size;
  const props = { width: s, height: s, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.6, strokeLinecap: 'round', strokeLinejoin: 'round', className };
  switch (name) {
    case 'github': return (<svg {...props}><path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.9c.1-1-.2-2-1-2.7 2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18 4.8 4.3 4.3 0 0 0 17.9 1S16.7.7 14 2.5a13 13 0 0 0-7 0C4.3.7 3.1 1 3.1 1A4.3 4.3 0 0 0 3 4.8a4.7 4.7 0 0 0-1.5 3.6c0 4.6 2.8 5.7 5.5 6a3.6 3.6 0 0 0-1 2.7V21"/></svg>);
    case 'linkedin': return (<svg {...props}><rect x="2" y="2" width="20" height="20" rx="2"/><path d="M8 11v5M8 8v0M12 16v-3a2 2 0 1 1 4 0v3M12 11v5"/></svg>);
    case 'arrow-up-right': return (<svg {...props}><path d="M7 17 17 7M9 7h8v8"/></svg>);
    case 'arrow-right': return (<svg {...props}><path d="M5 12h14M13 6l6 6-6 6"/></svg>);
    case 'arrow-down': return (<svg {...props}><path d="M12 5v14M6 13l6 6 6-6"/></svg>);
    case 'external': return (<svg {...props}><path d="M14 4h6v6M20 4 10 14M10 4H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/></svg>);
    case 'copy': return (<svg {...props}><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>);
    case 'check': return (<svg {...props}><path d="M20 6 9 17l-5-5"/></svg>);
    case 'mail': return (<svg {...props}><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>);
    case 'map-pin': return (<svg {...props}><path d="M12 22s-7-7.5-7-12a7 7 0 1 1 14 0c0 4.5-7 12-7 12Z"/><circle cx="12" cy="10" r="2.5"/></svg>);
    case 'sun': return (<svg {...props}><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>);
    case 'moon': return (<svg {...props}><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"/></svg>);
    case 'globe': return (<svg {...props}><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18"/></svg>);
    case 'sparkle': return (<svg {...props}><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/></svg>);
    case 'star': return (<svg {...props}><path d="m12 3 2.6 5.6L20 9.5l-4 4 1 5.7L12 16.6l-5 2.6 1-5.7-4-4 5.4-.9Z"/></svg>);
    case 'fork': return (<svg {...props}><circle cx="6" cy="6" r="2.5"/><circle cx="6" cy="18" r="2.5"/><circle cx="18" cy="6" r="2.5"/><path d="M6 8.5v7M18 8.5c0 4-6 3-6 9.5"/></svg>);
    case 'code': return (<svg {...props}><path d="m8 6-6 6 6 6M16 6l6 6-6 6"/></svg>);
    case 'box': return (<svg {...props}><path d="M21 8 12 3 3 8v8l9 5 9-5Z"/><path d="m3 8 9 5 9-5M12 13v9"/></svg>);
    case 'play': return (<svg {...props}><path d="m7 5 12 7-12 7Z" fill="currentColor"/></svg>);
    case 'menu': return (<svg {...props}><path d="M3 6h18M3 12h18M3 18h18"/></svg>);
    case 'x': return (<svg {...props}><path d="M18 6 6 18M6 6l12 12"/></svg>);
    case 'discord': return (<svg {...props}><path d="M19 5a16 16 0 0 0-4-1l-.4 1A13 13 0 0 0 9 5l-.4-1A16 16 0 0 0 5 5C2.5 9 2 13 2.4 17a17 17 0 0 0 5 2.5l1-1.5a10 10 0 0 1-3-1.4l.4-.3a12 12 0 0 0 10.4 0l.4.3a10 10 0 0 1-3 1.4l1 1.5a17 17 0 0 0 5-2.5C22 13 21.5 9 19 5Z"/><circle cx="9" cy="13" r="1"/><circle cx="15" cy="13" r="1"/></svg>);
    case 'chart': return (<svg {...props}><path d="M3 3v18h18"/><path d="m7 14 3-3 4 4 7-7"/></svg>);
    case 'layers': return (<svg {...props}><path d="m12 2 10 6-10 6L2 8Z"/><path d="m2 16 10 6 10-6M2 12l10 6 10-6"/></svg>);
    case 'list': return (<svg {...props}><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>);
    case 'grid': return (<svg {...props}><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>);
    case 'cube': return (<svg {...props}><path d="m12 2 10 6-10 6L2 8Z"/><path d="M2 8v8l10 6 10-6V8"/></svg>);
    case 'lightning': return (<svg {...props}><path d="M13 2 3 14h8l-1 8 10-12h-8Z"/></svg>);
    default: return null;
  }
}

// ---------- Section wrapper ----------
function Section({ id, kicker, children, className = '' }) {
  return (
    <section id={id} className={`section ${className}`}>
      <div className="container-x">
        {kicker ? <div className="eyebrow mb-3">{kicker}</div> : null}
        {children}
      </div>
    </section>
  );
}

// ---------- Glow orb decoration ----------
function GlowOrb({ x = '20%', y = '20%', size = 480, color = 'var(--glow)' }) {
  return <div className="glow-orb" style={{ left: x, top: y, width: size, height: size, background: color }} />;
}

// ---------- Magnetic hover (subtle) ----------
function magneticBind(el, strength = 0.18) {
  if (!el) return () => {};
  function onMove(e) {
    const r = el.getBoundingClientRect();
    const x = e.clientX - (r.left + r.width / 2);
    const y = e.clientY - (r.top + r.height / 2);
    el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  }
  function onLeave() { el.style.transform = ''; }
  el.addEventListener('mousemove', onMove);
  el.addEventListener('mouseleave', onLeave);
  return () => {
    el.removeEventListener('mousemove', onMove);
    el.removeEventListener('mouseleave', onLeave);
  };
}

export { Reveal, CustomCursor, Icon, Section, GlowOrb, magneticBind };
