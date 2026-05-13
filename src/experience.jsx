import React from 'react';
import { Section, Reveal } from './primitives';
import { EXPERIENCE } from './data';

/* ============================================================
   experience.jsx
   ============================================================ */

function Experience({ t, lang }) {
  return (
    <Section id="experience" kicker={t.exp.eyebrow}>
      <Reveal>
        <h2 className="section-title">
          <span className="gradient-text">{t.exp.title_a}</span>{' '}
          <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.exp.title_b}</em>
        </h2>
      </Reveal>

      <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-3">
          <Reveal>
            <div className="sticky top-28">
              <div className="eyebrow">{t.exp.present}</div>
              <div className="mt-2 text-[15px]" style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>
                {lang === 'pt'
                  ? 'Trabalhando full-time em produto SaaS de analytics e disponível para colaborações pontuais.'
                  : 'Full-time on a SaaS analytics product and open to occasional collaborations.'}
              </div>
            </div>
          </Reveal>
        </div>
        <div className="lg:col-span-9">
          <div className="relative">
            <div className="tl-rail" />
            <ul className="flex flex-col gap-10">
              {EXPERIENCE.map((exp, idx) => (
                <Reveal key={exp.company + idx} delay={idx * 80}>
                  <li className="relative pl-9">
                    <span className="tl-dot" style={{ top: 8 }} />
                    <div className="flex flex-wrap items-baseline gap-3">
                      <h3 className="text-[20px] font-medium tracking-tight" style={{ color: 'var(--text)' }}>
                        {exp.company}
                      </h3>
                      <span className="eyebrow">{exp.period[lang]}</span>
                    </div>
                    <div className="mt-1 text-[14px]" style={{ color: 'var(--accent)' }}>{exp.role[lang]}</div>
                    <p className="mt-3 text-[15px]" style={{ color: 'var(--text-muted)', lineHeight: 1.65, maxWidth: '46rem' }}>
                      {exp.desc[lang]}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {exp.tags.map((tag) => (
                        <span key={tag} className="pill">{tag}</span>
                      ))}
                    </div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Section>
  );
}

export { Experience };
