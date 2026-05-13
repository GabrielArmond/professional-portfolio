import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Reveal, GlowOrb, Icon } from './primitives';

/* ============================================================
   hero.jsx — full-bleed hero w/ terminal + particle grid
   ============================================================ */

// ----- Particles background canvas -----
function ParticleGrid() {
  const canvasRef = useRef(null);
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0, H = 0;
    const particles = [];
    const N = 60;

    function resize() {
      const rect = c.getBoundingClientRect();
      W = rect.width; H = rect.height;
      c.width = W * dpr; c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function init() {
      particles.length = 0;
      for (let i = 0; i < N; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.12,
          vy: (Math.random() - 0.5) * 0.12,
          r: Math.random() * 1.4 + 0.4,
        });
      }
    }

    let mx = -1000, my = -1000;
    function onMove(e) {
      const r = c.getBoundingClientRect();
      mx = e.clientX - r.left;
      my = e.clientY - r.top;
    }
    function onLeave() { mx = -1000; my = -1000; }

    const accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#6366f1';

    let raf;
    function draw() {
      ctx.clearRect(0, 0, W, H);
      // particles
      for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.45)';
        ctx.fill();
      }
      // links between near particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i], b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 130 * 130) {
            const alpha = 1 - Math.sqrt(d2) / 130;
            ctx.strokeStyle = `rgba(255,255,255,${alpha * 0.10})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
        // mouse link
        const a = particles[i];
        const dxm = a.x - mx, dym = a.y - my;
        const dm2 = dxm * dxm + dym * dym;
        if (dm2 < 180 * 180) {
          const alpha = 1 - Math.sqrt(dm2) / 180;
          ctx.strokeStyle = `${accent}${Math.floor(alpha * 200).toString(16).padStart(2, '0')}`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y); ctx.lineTo(mx, my);
          ctx.stroke();
        }
      }
      raf = requestAnimationFrame(draw);
    }

    resize();
    init();
    draw();
    window.addEventListener('resize', () => { resize(); init(); });
    c.parentElement.addEventListener('mousemove', onMove);
    c.parentElement.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
    };
  }, []);
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" aria-hidden="true" />;
}

// ----- Terminal animated typing -----
function HeroTerminal({ lang }) {
  const lines = useMemo(() => (
    lang === 'pt'
      ? [
        { p: '~/portfolio', cmd: 'whoami' },
        { o: (<><span className="t-ok">●</span> <span>Gabriel Armond — Full Stack · Frontend</span></>) },
        { p: '~/portfolio', cmd: 'cat profile.ts' },
        { o: 'const ' },
        { tab: 1, o: (<><span className="t-key">name</span>: <span className="t-str">'Gabriel Armond'</span>,</>) },
        { tab: 1, o: (<><span className="t-key">role</span>: <span className="t-str">'Full Stack Dev'</span>,</>) },
        { tab: 1, o: (<><span className="t-key">focus</span>: [<span className="t-str">'React'</span>, <span className="t-str">'Next.js'</span>, <span className="t-str">'TS'</span>],</>) },
        { tab: 1, o: (<><span className="t-key">location</span>: <span className="t-str">'Belo Horizonte, BR'</span>,</>) },
        { tab: 1, o: (<><span className="t-key">available</span>: <span className="t-fn">true</span></>) },
        { o: '};' },
        { p: '~/portfolio', cmd: 'npm run build' },
        { o: (<><span className="t-cmt">// otimizando bundle...</span></>) },
        { o: (<><span className="t-ok">✓</span> compiled in 1.42s</>) },
      ]
      : [
        { p: '~/portfolio', cmd: 'whoami' },
        { o: (<><span className="t-ok">●</span> <span>Gabriel Armond — Full Stack · Frontend</span></>) },
        { p: '~/portfolio', cmd: 'cat profile.ts' },
        { o: 'const ' },
        { tab: 1, o: (<><span className="t-key">name</span>: <span className="t-str">'Gabriel Armond'</span>,</>) },
        { tab: 1, o: (<><span className="t-key">role</span>: <span className="t-str">'Full Stack Dev'</span>,</>) },
        { tab: 1, o: (<><span className="t-key">focus</span>: [<span className="t-str">'React'</span>, <span className="t-str">'Next.js'</span>, <span className="t-str">'TS'</span>],</>) },
        { tab: 1, o: (<><span className="t-key">location</span>: <span className="t-str">'Belo Horizonte, BR'</span>,</>) },
        { tab: 1, o: (<><span className="t-key">available</span>: <span className="t-fn">true</span></>) },
        { o: '};' },
        { p: '~/portfolio', cmd: 'npm run build' },
        { o: (<><span className="t-cmt">// optimizing bundle...</span></>) },
        { o: (<><span className="t-ok">✓</span> compiled in 1.42s</>) },
      ]
  ), [lang]);

  // animate one line per tick
  const [shown, setShown] = useState(0);
  const [typedCmd, setTypedCmd] = useState('');
  useEffect(() => {
    setShown(0); setTypedCmd('');
    let cancel = false;
    let i = 0;
    function next() {
      if (cancel) return;
      if (i >= lines.length) {
        setTimeout(() => { if (!cancel) { i = 0; setShown(0); setTypedCmd(''); next(); } }, 3500);
        return;
      }
      const line = lines[i];
      if (line.cmd) {
        // type cmd char-by-char
        let j = 0;
        function tick() {
          if (cancel) return;
          j++;
          setTypedCmd(line.cmd.slice(0, j));
          if (j < line.cmd.length) setTimeout(tick, 50 + Math.random() * 40);
          else {
            setTimeout(() => {
              setShown((s) => s + 1);
              setTypedCmd('');
              i++; next();
            }, 320);
          }
        }
        tick();
      } else {
        setTimeout(() => { setShown((s) => s + 1); i++; next(); }, 120);
      }
    }
    next();
    return () => { cancel = true; };
  }, [lines]);

  return (
    <div className="terminal w-full">
      <div className="terminal-bar">
        <div className="terminal-dot" style={{ background: '#ff5f57' }} />
        <div className="terminal-dot" style={{ background: '#febc2e' }} />
        <div className="terminal-dot" style={{ background: '#28c840' }} />
        <span className="ml-3 t-cmt text-[11px]">~/portfolio · zsh</span>
      </div>
      <div className="terminal-body">
        {lines.slice(0, shown).map((l, idx) => (
          <div key={idx}>
            {l.p ? (
              <>
                <span className="t-prompt">{l.p} </span>
                <span className="t-fn">$</span>{' '}
                <span className="t-cmd">{l.cmd}</span>
              </>
            ) : (
              <span style={{ paddingLeft: (l.tab || 0) * 16 }}>{l.o}</span>
            )}
          </div>
        ))}
        {/* current typing */}
        {typedCmd ? (
          <div>
            <span className="t-prompt">{lines[shown]?.p} </span>
            <span className="t-fn">$</span>{' '}
            <span className="t-cmd">{typedCmd}</span>
            <span className="caret" />
          </div>
        ) : null}
        {!typedCmd && shown < lines.length ? (
          <div><span className="t-prompt">{lines[shown]?.p || '~/portfolio'} </span><span className="t-fn">$</span> <span className="caret" /></div>
        ) : null}
      </div>
    </div>
  );
}

// ----- HERO -----
function Hero({ t, lang }) {
  return (
    <section id="top" className="relative overflow-hidden" style={{ paddingTop: 'clamp(7rem, 14vh, 11rem)', paddingBottom: 'clamp(4rem, 10vh, 8rem)' }}>
      {/* background layers */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <ParticleGrid />
      <GlowOrb x="-10%" y="-10%" size={520} color="var(--glow)" />
      <GlowOrb x="80%" y="40%" size={460} color="var(--accent-soft)" />
      <div className="noise" />
      {/* bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(180deg, transparent, var(--bg))' }} />

      <div className="container-x relative z-10 px-5 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* LEFT — copy */}
          <div className="lg:col-span-7">
            <Reveal>
              <div className="pill mb-6" style={{ width: 'fit-content' }}>
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: '#22c55e' }}>
                  <span className="absolute inset-0 rounded-full animate-ping" style={{ background: '#22c55e', opacity: 0.6 }} />
                </span>
                {t.hero.status}
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="h-display" style={{ fontSize: 'clamp(2.6rem, 6.4vw, 5.2rem)' }}>
                {t.hero.title_a}{' '}
                <em>{t.hero.title_b}</em>{' '}
                {t.hero.title_c}{' '}
                <span className="block opacity-60" style={{ fontWeight: 300 }}>{t.hero.title_d}</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-7 text-base sm:text-lg max-w-[36rem]" style={{ color: 'var(--text-muted)', lineHeight: 1.65 }}>
                {t.hero.sub}
              </p>
            </Reveal>

            <Reveal delay={220}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#projects" className="btn btn-primary">
                  {t.hero.cta_projects}
                  <Icon name="arrow-right" size={14} />
                </a>
                <a href="#contact" className="btn btn-ghost">
                  {t.hero.cta_contact}
                </a>
                <div className="flex items-center gap-1.5 ml-1">
                  <a href="https://github.com/GabrielArmond" target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
                    <Icon name="github" size={16} />
                  </a>
                  <a href="https://br.linkedin.com/in/gabriel-armond-lopes-guerra-265227186" target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn">
                    <Icon name="linkedin" size={16} />
                  </a>
                </div>
              </div>
            </Reveal>

            <Reveal delay={280}>
              <div className="mt-12 grid grid-cols-3 gap-4 max-w-[34rem]" style={{ borderTop: '1px solid var(--border)', paddingTop: '1.4rem' }}>
                <div>
                  <div className="font-mono text-[28px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>6+</div>
                  <div className="eyebrow mt-1">{t.hero.meta_yoe}</div>
                </div>
                <div>
                  <div className="font-mono text-[28px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>30+</div>
                  <div className="eyebrow mt-1">{t.hero.meta_proj}</div>
                </div>
                <div>
                  <div className="font-mono text-[28px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>React.JS</div>
                  <div className="eyebrow mt-1">{t.hero.meta_stack}</div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* RIGHT — avatar + terminal stack */}
          <div className="lg:col-span-5">
            <Reveal delay={120}>
              <div className="relative">
                {/* Avatar card */}
                <div className="glass-strong p-4 flex items-center gap-4" style={{ borderRadius: 18 }}>
                  <div style={{ width: 64, height: 64, borderRadius: 16, overflow: 'hidden', flex: '0 0 auto', border: '1px solid var(--border)' }}>
                    {React.createElement('image-slot', {
                      id: 'avatar',
                      shape: 'rounded',
                      radius: '16',
                      src: '/avatar.jpeg',
                      style: { width: '64px', height: '64px', display: 'block' },
                    })}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>Gabriel Armond</div>
                    <div className="text-[12.5px]" style={{ color: 'var(--text-muted)' }}>{t.hero.role}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[12px]" style={{ color: 'var(--text-dim)' }}>
                      <Icon name="map-pin" size={12} />
                      {t.hero.location}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <div className="pill pill-accent">v2026.1</div>
                  </div>
                </div>

                {/* Terminal */}
                <div className="mt-4">
                  <HeroTerminal lang={lang} />
                </div>

                {/* tiny floating chip */}
                <div
                  className="hidden lg:flex absolute -left-8 -bottom-6 items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    background: 'var(--bg-elev)',
                    border: '1px solid var(--border)',
                    boxShadow: '0 20px 40px -20px rgba(0,0,0,0.6)',
                  }}
                >
                  <span className="inline-flex h-7 w-7 items-center justify-center rounded-md" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Icon name="lightning" size={14} />
                  </span>
                  <div>
                    <div className="text-[12px] font-medium" style={{ color: 'var(--text)' }}>Core Web Vitals</div>
                    <div className="text-[11px]" style={{ color: 'var(--text-dim)' }}>LCP 1.2s · CLS 0.01</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Marquee of tech */}
        <div className="mt-20 lg:mt-28 overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)' }}>
          <div className="marquee text-[14px] font-mono uppercase tracking-widest" style={{ color: 'var(--text-dim)' }}>
            {[...Array(2)].map((_, k) => (
              <div key={k} className="flex items-center gap-12 pr-12">
                {['React', 'Next.js', 'TypeScript', 'TailwindCSS', 'Vue.js', 'Nuxt', 'Node.js', 'Supabase', 'Vite', 'PostgreSQL', 'Prisma', 'Storybook'].map((tech) => (
                  <span key={tech} className="flex items-center gap-2">
                    <span className="inline-block w-1.5 h-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                    {tech}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export { Hero };
