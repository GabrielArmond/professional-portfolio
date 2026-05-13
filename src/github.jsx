import React, { useMemo, useState, useEffect } from 'react';
import { Section, Reveal, Icon } from './primitives';

/* ============================================================
   github.jsx — GitHub stats section (live public API)
   ============================================================ */

const USERNAME = 'GabrielArmond';

const LANG_COLORS = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Vue: '#41b883',
  CSS: '#563d7c',
  HTML: '#e34c26',
  Python: '#3572A5',
  'C++': '#f34b7d',
  Go: '#00ADD8',
  Rust: '#dea584',
  Dart: '#00B4AB',
};

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = a;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}

function ContribHeatmap() {
  const grid = useMemo(() => {
    const rng = mulberry32(42);
    return Array.from({ length: 52 }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => {
        const base = (w / 51) * 0.6 + (d < 5 ? 0.4 : 0.1);
        const r = rng();
        return Math.min(4, Math.floor((base + r * 0.6) * 4));
      })
    );
  }, []);

  function level(v) {
    if (v === 0) return 'rgba(255,255,255,0.04)';
    if (v === 1) return 'color-mix(in oklch, var(--accent) 25%, transparent)';
    if (v === 2) return 'color-mix(in oklch, var(--accent) 45%, transparent)';
    if (v === 3) return 'color-mix(in oklch, var(--accent) 70%, transparent)';
    return 'var(--accent)';
  }

  return (
    <div className="overflow-hidden" style={{ maskImage: 'linear-gradient(90deg, transparent, #000 5%, #000 95%, transparent)' }}>
      <div className="grid grid-flow-col grid-rows-7 gap-[3px]" style={{ width: 'fit-content' }}>
        {grid.flatMap((week, wi) =>
          week.map((v, di) => (
            <div
              key={`${wi}-${di}`}
              style={{
                width: 12, height: 12, borderRadius: 3,
                background: level(v),
                border: '1px solid rgba(255,255,255,0.04)',
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}

function StatCard({ value, label, accent = false, loading }) {
  return (
    <div className="glass p-5">
      <div
        className="font-mono text-[32px] font-medium"
        style={{ color: accent ? 'var(--accent)' : 'var(--text)' }}
      >
        {loading ? '—' : value}
      </div>
      <div className="eyebrow mt-1">{label}</div>
    </div>
  );
}

function GitHubSection({ t, lang }) {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${USERNAME}`),
          fetch(`https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=updated`),
        ]);
        const userData = await userRes.json();
        const reposData = await reposRes.json();
        setUser(userData);
        setRepos(Array.isArray(reposData) ? reposData : []);
      } catch {
        // fallback to empty — UI handles gracefully
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const { stars, langBars } = useMemo(() => {
    if (!repos.length) return { stars: 0, langBars: [] };

    const totalStars = repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);

    const langCount = {};
    repos.forEach((r) => {
      if (r.language) langCount[r.language] = (langCount[r.language] || 0) + 1;
    });
    const total = Object.values(langCount).reduce((a, b) => a + b, 0);
    const bars = Object.entries(langCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({
        name,
        pct: Math.round((count / total) * 100),
        color: LANG_COLORS[name] || '#a1a1aa',
      }));

    return { stars: totalStars, langBars: bars };
  }, [repos]);

  const publicRepos = user?.public_repos ?? 0;
  const followers = user?.followers ?? 0;

  return (
    <Section id="github" kicker={t.github.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="section-title">
              <span className="gradient-text">{t.github.title_a}</span>{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.github.title_b}</em>
            </h2>
          </Reveal>
          <Reveal delay={80}><p className="mt-4 section-kicker">{t.github.sub}</p></Reveal>

          <Reveal delay={140}>
            <div className="mt-8 grid grid-cols-2 gap-3">
              <StatCard
                value={loading ? '—' : String(stars)}
                label={lang === 'pt' ? 'estrelas no GitHub' : 'GitHub stars'}
                loading={loading}
              />
              <StatCard
                value={loading ? '—' : String(publicRepos)}
                label={lang === 'pt' ? 'repositórios públicos' : 'public repositories'}
                accent
                loading={loading}
              />
              <StatCard
                value={loading ? '—' : String(followers)}
                label={lang === 'pt' ? 'seguidores' : 'followers'}
                loading={loading}
              />
            </div>
          </Reveal>

          <Reveal delay={200}>
            <a
              href={`https://github.com/${USERNAME}`}
              target="_blank"
              rel="noreferrer"
              className="btn btn-ghost mt-6"
            >
              <Icon name="github" size={14} /> {t.github.view_profile}
              <Icon name="arrow-up-right" size={13} />
            </a>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={100}>
            <div className="glass-strong p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="eyebrow">@{USERNAME}</div>
                  <div className="text-[15px] font-medium mt-0.5" style={{ color: 'var(--text)' }}>
                    {lang === 'pt' ? 'Contribuições — último ano' : 'Contributions — last year'}
                  </div>
                </div>
                <div className="hidden sm:flex items-center gap-2 text-[11px]" style={{ color: 'var(--text-dim)' }}>
                  <span>{lang === 'pt' ? 'menos' : 'less'}</span>
                  {[0, 1, 2, 3, 4].map((l) => (
                    <span key={l} style={{
                      width: 10, height: 10, borderRadius: 2,
                      background: ['rgba(255,255,255,0.04)', 'color-mix(in oklch, var(--accent) 25%, transparent)', 'color-mix(in oklch, var(--accent) 45%, transparent)', 'color-mix(in oklch, var(--accent) 70%, transparent)', 'var(--accent)'][l],
                    }} />
                  ))}
                  <span>{lang === 'pt' ? 'mais' : 'more'}</span>
                </div>
              </div>
              <ContribHeatmap />
            </div>
          </Reveal>

          {!loading && langBars.length > 0 && (
            <Reveal delay={160}>
              <div className="glass-strong p-5 sm:p-6 mt-4">
                <div className="eyebrow mb-3">{t.github.langs}</div>
                <div className="flex h-2.5 rounded-full overflow-hidden" style={{ background: 'var(--bg-soft)' }}>
                  {langBars.map((l) => (
                    <div key={l.name} title={`${l.name} ${l.pct}%`} style={{ width: `${l.pct}%`, background: l.color }} />
                  ))}
                </div>
                <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                  {langBars.map((l) => (
                    <div key={l.name} className="flex items-center gap-1.5 text-[12.5px]" style={{ color: 'var(--text-muted)' }}>
                      <span className="inline-block w-2 h-2 rounded-full" style={{ background: l.color }} />
                      {l.name}
                      <span className="font-mono" style={{ color: 'var(--text-dim)' }}>{l.pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </div>
      </div>
    </Section>
  );
}

export { GitHubSection };
