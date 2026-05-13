import React from 'react';
import { TweaksPanel, TweakSection, TweakRadio } from './tweaks-panel';

/* ============================================================
   tweaks.jsx — Tweaks panel content
   ============================================================ */

function PortfolioTweaks({ tweaks, setTweak }) {
  return (
    <TweaksPanel title="Tweaks">
      <TweakSection label="Aparência">
        <TweakRadio
          label="Tema"
          value={tweaks.theme}
          onChange={(v) => setTweak('theme', v)}
          options={[
            { value: 'dark', label: 'Dark' },
            { value: 'light', label: 'Light' },
          ]}
        />
        <TweakColor
          label="Cor de acento"
          value={tweaks.accent}
          onChange={(v) => setTweak('accent', v)}
          options={[
            { value: 'indigo', color: '#6366f1', label: 'Indigo' },
            { value: 'blue', color: '#3b82f6', label: 'Blue' },
            { value: 'violet', color: '#a855f7', label: 'Violet' },
            { value: 'emerald', color: '#10b981', label: 'Emerald' },
          ]}
        />
      </TweakSection>

      <TweakSection label="Layout de projetos">
        <TweakRadio
          label="Estilo"
          value={tweaks.projectsLayout}
          onChange={(v) => setTweak('projectsLayout', v)}
          options={[
            { value: 'grid', label: 'Grid' },
            { value: 'list', label: 'Lista' },
            { value: '3d', label: '3D' },
          ]}
        />
      </TweakSection>

      <TweakSection label="Idioma">
        <TweakRadio
          label="Lang"
          value={tweaks.lang}
          onChange={(v) => setTweak('lang', v)}
          options={[
            { value: 'pt', label: 'PT' },
            { value: 'en', label: 'EN' },
          ]}
        />
      </TweakSection>
    </TweaksPanel>
  );
}

// TweakColor wrapper: the starter's TweakColor uses { options: [color] | [['c1','c2']] }
// Our panel needs swatches w/ named values. Provide a custom-friendly wrapper.
function TweakColor({ label, value, onChange, options }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</div>
      <div style={{ display: 'flex', gap: 8 }}>
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            title={opt.label}
            style={{
              width: 32, height: 32, borderRadius: 10,
              background: opt.color,
              border: value === opt.value ? '2px solid white' : '2px solid rgba(255,255,255,0.15)',
              boxShadow: value === opt.value ? `0 0 0 3px ${opt.color}55` : 'none',
              cursor: 'pointer',
              transition: 'all .15s ease',
            }}
          />
        ))}
      </div>
    </div>
  );
}

export { PortfolioTweaks };
