import React, { useEffect } from 'react';
import { useTweaks } from './tweaks-panel';
import { useT } from './i18n';
import { CustomCursor } from './primitives';
import { Nav } from './nav';
import { Hero } from './hero';
import { About } from './about';
import { Stack } from './stack';
import { Experience } from './experience';
import { Projects } from './projects';
import { GitHubSection } from './github';
import { Contact } from './contact';
import { PortfolioTweaks } from './tweaks';

/* ============================================================
   app.jsx — root component & boot
   ============================================================ */

function App() {
  const [tweaks, setTweak] = useTweaks(window.__TWEAK_DEFAULTS);
  const t = useT(tweaks.lang);

  // sync attributes to <html>
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', tweaks.theme);
    document.documentElement.setAttribute('data-accent', tweaks.accent);
    document.documentElement.setAttribute('lang', tweaks.lang === 'pt' ? 'pt-BR' : 'en');
  }, [tweaks.theme, tweaks.accent, tweaks.lang]);

  return (
    <React.Fragment>
      <CustomCursor />
      <Nav
        lang={tweaks.lang}
        setLang={(v) => setTweak('lang', v)}
        theme={tweaks.theme}
        setTheme={(v) => setTweak('theme', v)}
        t={t}
      />
      <main>
        <Hero t={t} lang={tweaks.lang} />
        <About t={t} lang={tweaks.lang} />
        <Stack t={t} lang={tweaks.lang} />
        <Experience t={t} lang={tweaks.lang} />
        <Projects
          t={t} lang={tweaks.lang}
          layout={tweaks.projectsLayout}
          setLayout={(v) => setTweak('projectsLayout', v)}
        />
        <GitHubSection t={t} lang={tweaks.lang} />
        <Contact t={t} lang={tweaks.lang} />
      </main>
      <PortfolioTweaks tweaks={tweaks} setTweak={setTweak} />
    </React.Fragment>
  );
}

export default App;
