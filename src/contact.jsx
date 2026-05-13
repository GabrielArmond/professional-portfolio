import React, { useState } from 'react';
import { Section, Reveal, Icon } from './primitives';
import { Mail } from 'lucide-react';

/* ============================================================
   contact.jsx — contact form + footer
   ============================================================ */

function Contact({ t, lang }) {
  const [form, setForm] = useState({ name: '', email: '', company: '', message: '' });
  const [sent, setSent] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState({});

  function update(k, v) { setForm((f) => ({ ...f, [k]: v })); setErrors((e) => ({ ...e, [k]: null })); }

  function onSubmit(e) {
    e.preventDefault();
    const err = {};
    if (!form.name.trim()) err.name = true;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = true;
    if (!form.message.trim() || form.message.length < 10) err.message = true;
    setErrors(err);
    if (Object.keys(err).length === 0) {
      setSent(true);
      setTimeout(() => setSent(false), 6000);
      setForm({ name: '', email: '', company: '', message: '' });
    }
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText('gabriel.armond77@gmail.com');
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch { }
  }

  return (
    <Section id="contact" kicker={t.contact.eyebrow}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        <div className="lg:col-span-5">
          <Reveal>
            <h2 className="section-title">
              <span className="gradient-text">{t.contact.title_a}</span>{' '}
              <em style={{ fontFamily: 'Instrument Serif, serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent-2)' }}>{t.contact.title_b}</em>
            </h2>
          </Reveal>
          <Reveal delay={80}><p className="mt-4 section-kicker">{t.contact.sub}</p></Reveal>

          <Reveal delay={140}>
            <div className="mt-10 flex flex-col gap-3">
              <button
                onClick={copyEmail}
                className="group flex items-center justify-between p-4 rounded-2xl transition-all w-full text-left"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-ring)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Icon name='mail' size={16} />
                  </span>
                  <div>
                    <div className="eyebrow">Email</div>
                    <div className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>gabriel.armond77@gmail.com</div>
                  </div>
                </div>
                <span className="btn-icon" style={{ height: 34, width: 34 }}>
                  <Icon name={copied ? 'check' : 'copy'} size={14} />
                </span>
              </button>

              <a
                href="https://br.linkedin.com/in/gabriel-armond-lopes-guerra-265227186"
                target="_blank" rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl transition-all"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-ring)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Icon name="linkedin" size={16} />
                  </span>
                  <div>
                    <div className="eyebrow">LinkedIn</div>
                    <div className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>gabriel-armond-lopes-guerra</div>
                  </div>
                </div>
                <span className="btn-icon" style={{ height: 34, width: 34 }}>
                  <Icon name="arrow-up-right" size={14} />
                </span>
              </a>

              <a
                href="https://github.com/GabrielArmond"
                target="_blank" rel="noreferrer"
                className="group flex items-center justify-between p-4 rounded-2xl transition-all"
                style={{ background: 'var(--surface)', border: '1px solid var(--border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--accent-ring)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
              >
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center justify-center h-10 w-10 rounded-xl" style={{ background: 'var(--accent-soft)', color: 'var(--accent)' }}>
                    <Icon name="github" size={16} />
                  </span>
                  <div>
                    <div className="eyebrow">GitHub</div>
                    <div className="text-[15px] font-medium" style={{ color: 'var(--text)' }}>@GabrielArmond</div>
                  </div>
                </div>
                <span className="btn-icon" style={{ height: 34, width: 34 }}>
                  <Icon name="arrow-up-right" size={14} />
                </span>
              </a>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-7">
          <Reveal delay={120}>
            <form onSubmit={onSubmit} className="glass-strong p-6 sm:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label={t.contact.name}
                  value={form.name}
                  onChange={(v) => update('name', v)}
                  error={errors.name}
                />
                <Field
                  label={t.contact.email}
                  type="email"
                  value={form.email}
                  onChange={(v) => update('email', v)}
                  error={errors.email}
                />
                <div className="sm:col-span-2">
                  <Field
                    label={t.contact.company}
                    value={form.company}
                    onChange={(v) => update('company', v)}
                  />
                </div>
                <div className="sm:col-span-2">
                  <Field
                    label={t.contact.message}
                    value={form.message}
                    onChange={(v) => update('message', v)}
                    error={errors.message}
                    textarea
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
                <div className="text-[12.5px]" style={{ color: 'var(--text-dim)' }}>
                  {lang === 'pt' ? 'Resposta em até 24h · Sem spam, nunca.' : 'Reply within 24h · No spam, ever.'}
                </div>
                <button type="submit" className="btn btn-primary">
                  {sent ? <><Icon name="check" size={14} /> {t.contact.sent}</> : <>{t.contact.send} <Icon name="arrow-right" size={14} /></>}
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <Footer t={t} lang={lang} />
    </Section>
  );
}

function Field({ label, value, onChange, type = 'text', error, textarea }) {
  const Tag = textarea ? 'textarea' : 'input';
  const id = `f-${label.replace(/\s/g, '-').toLowerCase()}`;
  return (
    <label htmlFor={id} className="block">
      <div className="eyebrow mb-2">{label}</div>
      <Tag
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={textarea ? 5 : undefined}
        className="w-full bg-transparent outline-none text-[14.5px] resize-none transition-colors"
        style={{
          background: 'var(--bg-soft)',
          border: `1px solid ${error ? 'rgb(239, 68, 68)' : 'var(--border)'}`,
          borderRadius: 10,
          padding: textarea ? '12px 14px' : '11px 14px',
          color: 'var(--text)',
          fontFamily: 'inherit',
        }}
        onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent)'; e.currentTarget.style.boxShadow = '0 0 0 4px var(--accent-soft)'; }}
        onBlur={(e) => { e.currentTarget.style.borderColor = error ? 'rgb(239, 68, 68)' : 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
      />
    </label>
  );
}

function Footer({ t, lang }) {
  return (
    <footer className="mt-24 sm:mt-32 pt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="flex items-center gap-3">
        <span
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl font-mono text-[12px] font-semibold"
          style={{ background: 'linear-gradient(135deg, var(--accent), var(--accent-2))', color: 'white' }}
        >GA</span>
        <div>
          <div className="text-[14px] font-medium" style={{ color: 'var(--text)' }}>Gabriel Armond Lopes Guerra</div>
          <div className="text-[12px]" style={{ color: 'var(--text-muted)' }}>{t.footer.built}</div>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span className="text-[12px] font-mono" style={{ color: 'var(--text-dim)' }}>© 2026 · {t.footer.rights}</span>
        <a href="https://github.com/GabrielArmond" target="_blank" rel="noreferrer" className="btn-icon" style={{ height: 34, width: 34 }} aria-label="GitHub"><Icon name="github" size={14} /></a>
        <a href="https://br.linkedin.com/in/gabriel-armond-lopes-guerra-265227186" target="_blank" rel="noreferrer" className="btn-icon" style={{ height: 34, width: 34 }} aria-label="LinkedIn"><Icon name="linkedin" size={14} /></a>
      </div>
    </footer>
  );
}

export { Contact };
