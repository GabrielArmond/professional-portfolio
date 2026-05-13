import React from 'react';
import { Section, Reveal } from './primitives';

/* ============================================================
   about.jsx
   ============================================================ */

function About({ t, lang }) {
  return (
    <Section id="about" kicker={t.about.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="section-title">
              <span className="gradient-text">{t.about.title_a}</span>{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.about.title_b}</em>
            </h2>
          </Reveal>

          <Reveal delay={80}>
            <p className="mt-6 text-[17px]" style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '40rem' }}>
              {t.about.p1}
            </p>
          </Reveal>
          <Reveal delay={140}>
            <p className="mt-4 text-[17px]" style={{ color: 'var(--text-muted)', lineHeight: 1.7, maxWidth: '40rem' }}>
              {t.about.p2}
            </p>
          </Reveal>
        </div>

        <div className="lg:col-span-5 mt-4 lg:mt-0">
          <Reveal delay={120}>
            <div className="glass-strong p-6 sm:p-7">
              <div className="eyebrow mb-4">{t.about.values_title}</div>
              <ul className="flex flex-col">
                {t.about.values.map((v, i) => (
                  <li
                    key={v.k}
                    className="grid grid-cols-[110px_1fr] gap-6 items-start py-4"
                    style={{ borderTop: i === 0 ? 'none' : '1px solid var(--border)' }}
                  >
                    <span className="font-mono text-[12px] uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                      {v.k}
                    </span>
                    <span className="text-[14.5px]" style={{ color: 'var(--text)' , lineHeight: 1.55 }}>{v.v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}

export { About };
