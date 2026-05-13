import React from 'react';
import { Section, Reveal } from './primitives';
import { TESTIMONIALS } from './data';

/* ============================================================
   testimonials.jsx
   ============================================================ */

function Testimonials({ t, lang }) {
  return (
    <Section id="testimonials" kicker={t.test.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-10">
        <div className="lg:col-span-7">
          <Reveal>
            <h2 className="section-title">
              <span className="gradient-text">{t.test.title_a}</span>{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.test.title_b}</em>
            </h2>
          </Reveal>
        </div>
        <div className="lg:col-span-5 flex items-end">
          <Reveal delay={80}><p className="section-kicker">{t.test.sub}</p></Reveal>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {TESTIMONIALS.map((quote, i) => (
          <Reveal key={i} delay={i * 70}>
            <figure
              className="glass-strong p-7 h-full relative"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div className="text-[36px] leading-none font-serif italic" style={{ color: 'var(--accent)', fontFamily: 'Instrument Serif, serif' }}>“</div>
              <blockquote className="text-[16px]" style={{ color: 'var(--text)', lineHeight: 1.65, marginTop: -10 }}>
                {quote.quote[lang]}
              </blockquote>
              <figcaption className="mt-5 pt-5 flex items-center gap-3" style={{ borderTop: '1px solid var(--border)' }}>
                <div
                  className="flex items-center justify-center font-mono text-[12px] font-semibold"
                  style={{
                    width: 36, height: 36, borderRadius: 10,
                    background: 'linear-gradient(135deg, var(--accent), var(--accent-2))',
                    color: 'white',
                  }}
                >
                  {quote.name.split(' ').map((n) => n[0]).slice(0, 2).join('')}
                </div>
                <div>
                  <div className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>{quote.name}</div>
                  <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{quote.role[lang]}</div>
                </div>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}

export { Testimonials };
