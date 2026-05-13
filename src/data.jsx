/* ============================================================
   data.jsx — projects, experience, stack, testimonials
   ============================================================ */

const STACK = {
  Frontend: [
    { name: 'React', level: 'Expert', years: 5 },
    { name: 'Next.js', level: 'Expert', years: 4 },
    { name: 'TypeScript', level: 'Expert', years: 4 },
    { name: 'Vue.js', level: 'Advanced', years: 3 },
    { name: 'Nuxt.js', level: 'Advanced', years: 2 },
    { name: 'TailwindCSS', level: 'Expert', years: 4 },
    { name: 'JavaScript', level: 'Expert', years: 6 },
    { name: 'Bootstrap', level: 'Advanced', years: 4 },
  ],
  Backend: [
    { name: 'Node.js', level: 'Advanced', years: 4 },
    { name: 'Express', level: 'Advanced', years: 3 },
    { name: 'REST APIs', level: 'Expert', years: 5 },
    { name: 'NestJS', level: 'Intermediate', years: 2 },
  ],
  Data: [
    { name: 'Supabase', level: 'Advanced', years: 2 },
    { name: 'PostgreSQL', level: 'Advanced', years: 3 },
    { name: 'Prisma', level: 'Advanced', years: 2 },
    { name: 'Redis', level: 'Intermediate', years: 1 },
  ],
  Tools: [
    { name: 'Vite', level: 'Expert', years: 3 },
    { name: 'Git / GitHub', level: 'Expert', years: 6 },
    { name: 'Figma', level: 'Advanced', years: 4 },
    { name: 'Vercel', level: 'Expert', years: 3 },
    { name: 'Docker', level: 'Intermediate', years: 2 },
    { name: 'Storybook', level: 'Advanced', years: 2 },
  ],
};

const PROJECTS = [
  {
    id: 'elitmetrics',
    name: 'ELITMETRICS',
    tag: { pt: 'Plataforma SaaS · Analytics esportivo', en: 'SaaS · Sports analytics' },
    description: {
      pt: 'Plataforma de métricas e analytics para atletas de alto rendimento. Dashboard em tempo real, comparativos entre temporadas, relatórios PDF e visualizações interativas com mais de 40 KPIs.',
      en: 'High-performance athlete analytics platform. Real-time dashboard, season comparisons, PDF reports and interactive visualizations across 40+ KPIs.',
    },
    stack: ['Next.js', 'TypeScript', 'TailwindCSS', 'Supabase', 'PostgreSQL', 'Recharts'],
    featured: true,
    role: { pt: 'Full Stack · Lead Frontend', en: 'Full Stack · Frontend lead' },
    year: '2024 — 2026',
    links: { demo: 'https://elitmetrics.com', code: 'https://github.com/GabrielArmond' },
    metric: { value: '40+', label: { pt: 'KPIs rastreados', en: 'KPIs tracked' } },
    accent: 'indigo',
  },
  {
    id: 'cubos-movies',
    name: 'Cubos Movies',
    tag: { pt: 'Catálogo de filmes', en: 'Movie catalog' },
    description: {
      pt: 'Aplicação de catálogo de filmes com busca, filtros por gênero e exibição de detalhes via API TMDB. Interface responsiva com foco em performance e UX.',
      en: 'Movie catalog app with search, genre filters and detail pages powered by the TMDB API. Responsive UI with performance and UX focus.',
    },
    stack: ['TypeScript', 'React', 'CSS', 'TMDB API'],
    role: { pt: 'Frontend', en: 'Frontend' },
    year: '2024',
    links: { demo: '#', code: 'https://github.com/GabrielArmond/cubos-movies' },
    metric: { value: 'TMDB', label: { pt: 'integração API', en: 'API integration' } },
    accent: 'amber',
  },
  {
    id: 'voll',
    name: 'Voll',
    tag: { pt: 'Área administrativa · Saúde', en: 'Admin area · Healthcare' },
    description: {
      pt: 'Sistema de área administrativa com React e TypeScript. Gerenciamento de pacientes, agendamentos e relatórios com interface limpa e tipagem robusta.',
      en: 'Administrative area built with React and TypeScript. Patient management, scheduling and reports with a clean interface and strong typing.',
    },
    stack: ['React', 'TypeScript', 'Vite'],
    role: { pt: 'Frontend', en: 'Frontend' },
    year: '2024',
    links: { demo: '#', code: 'https://github.com/GabrielArmond/voll' },
    metric: { value: 'TS', label: { pt: 'tipagem completa', en: 'fully typed' } },
    accent: 'emerald',
  },
  {
    id: 'florest-log',
    name: 'Florest Log',
    tag: { pt: 'Rastreamento ambiental', en: 'Environmental tracking' },
    description: {
      pt: 'Aplicação Vue para registro e monitoramento de dados ambientais florestais. Visualização de logs com gráficos e exportação de relatórios.',
      en: 'Vue application for recording and monitoring forest environmental data. Log visualization with charts and report export.',
    },
    stack: ['Vue', 'JavaScript', 'CSS'],
    role: { pt: 'Frontend', en: 'Frontend' },
    year: '2024',
    links: { demo: 'https://florest-log.vercel.app/', code: 'https://github.com/GabrielArmond/florest-log' },
    metric: { value: 'Vue', label: { pt: 'composição reativa', en: 'reactive composition' } },
    accent: 'violet',
  },
  {
    id: 'onfly-travels',
    name: 'Onfly Travels',
    tag: { pt: 'Gestão de viagens corporativas', en: 'Corporate travel management' },
    description: {
      pt: 'Plataforma de gestão de viagens corporativas com TypeScript. Solicitações, aprovações e rastreamento de despesas em interface moderna.',
      en: 'Corporate travel management platform in TypeScript. Requests, approvals and expense tracking in a modern interface.',
    },
    stack: ['TypeScript', 'React', 'Vite'],
    role: { pt: 'Frontend', en: 'Frontend' },
    year: '2024',
    links: { demo: '#', code: 'https://github.com/GabrielArmond/onfly-travels' },
    metric: { value: 'Corp', label: { pt: 'viagens gerenciadas', en: 'travel managed' } },
    accent: 'cyan',
  },
];

const EXPERIENCE = [
  {
    company: 'AEVO Solar',
    role: { pt: 'Desenvolvedor Front End', en: 'Front End Developer' },
    period: { pt: '06/2025 — Atualmente', en: 'Jun 2025 — Present' },
    desc: {
      pt: 'Desenvolvimento de interfaces modernas e responsivas com React JS. Criação de componentes reutilizáveis, otimização de performance e participação ativa em ritos ágeis.',
      en: 'Building modern responsive interfaces with React JS. Reusable component library, performance optimization and active involvement in agile ceremonies.',
    },
    tags: ['React', 'JavaScript', 'Performance', 'Agile'],
  },
  {
    company: 'ELITMETRICS',
    role: { pt: 'Full Stack · Lead Frontend', en: 'Full Stack · Frontend Lead' },
    period: { pt: '2026 — Atualmente', en: '2026 — Present' },
    desc: {
      pt: 'Plataforma SaaS de analytics esportivo. Arquitetura Next.js + Supabase, design system próprio e integrações com APIs de dados em tempo real.',
      en: 'Sports analytics SaaS platform. Next.js + Supabase architecture, in-house design system and real-time data integrations.',
    },
    tags: ['Next.js', 'TypeScript', 'Supabase', 'Design System'],
  },
  {
    company: 'Far.me Farmacoterapia Otimizada',
    role: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    period: { pt: '01/2023 — 02/2025', en: 'Jan 2023 — Feb 2025' },
    desc: {
      pt: 'Desenvolvimento frontend com Vue.js, TypeScript e JavaScript e backend com Node.js. Resolução de incidentes em produção, implementação de testes automatizados e apoio técnico a devs júnior.',
      en: 'Frontend with Vue.js, TypeScript and JavaScript; backend with Node.js. Production incident resolution, automated testing and technical mentoring of junior developers.',
    },
    tags: ['Vue.js', 'TypeScript', 'Node.js', 'JavaScript'],
  },
  {
    company: 'Freelancer / Consultor',
    role: { pt: 'Desenvolvedor Full Stack', en: 'Full Stack Developer' },
    period: { pt: '2023 — Atualmente', en: '2023 — Present' },
    desc: {
      pt: 'Construção de dashboards, sistemas administrativos e plataformas digitais para clientes. Foco em performance, UI sofisticada e arquitetura escalável.',
      en: 'Built dashboards, admin systems and digital platforms for clients. Focus on performance, sophisticated UI and scalable architecture.',
    },
    tags: ['React', 'Vue.js', 'Node.js', 'TailwindCSS'],
  },
];

const LANG_BARS = [
  { name: 'TypeScript', pct: 38, color: '#3178c6' },
  { name: 'JavaScript', pct: 26, color: '#f1e05a' },
  { name: 'Vue', pct: 14, color: '#41b883' },
  { name: 'CSS', pct: 11, color: '#563d7c' },
  { name: 'HTML', pct: 7, color: '#e34c26' },
  { name: 'Other', pct: 4, color: '#a1a1aa' },
];

const PINNED_REPOS = [
  { name: 'elitmetrics-web', desc: { pt: 'App principal — Next 14 + Supabase + RSC', en: 'Main app — Next 14 + Supabase + RSC' }, lang: 'TypeScript', stars: 142, forks: 24 },
  { name: 'lumen-ui', desc: { pt: 'Lib de componentes React acessíveis', en: 'Accessible React component lib' }, lang: 'TypeScript', stars: 318, forks: 41 },
  { name: 'fluxo-finance', desc: { pt: 'Dashboard financeiro para PMEs', en: 'SMB finance dashboard' }, lang: 'TypeScript', stars: 87, forks: 11 },
  { name: 'orbita-cms', desc: { pt: 'CMS headless em Nuxt + GraphQL', en: 'Headless CMS in Nuxt + GraphQL' }, lang: 'Vue', stars: 64, forks: 9 },
];

const TESTIMONIALS = [
  {
    name: 'Mariana Costa',
    role: { pt: 'Product Manager — SaaS B2B', en: 'Product Manager — B2B SaaS' },
    quote: {
      pt: 'O Gabriel é raro: domina o frontend como especialista, mas pensa como produto. Entrega rápido, com qualidade, e levanta as perguntas certas antes do código.',
      en: 'Gabriel is rare: a true frontend specialist who thinks like a PM. Ships fast, with quality, and asks the right questions before any line of code.',
    },
  },
  {
    name: 'Lucas Andrade',
    role: { pt: 'Tech Lead', en: 'Tech Lead' },
    quote: {
      pt: 'Refatorou o nosso design system inteiro em duas sprints. Componentes consistentes, documentação impecável e zero regressão em produção.',
      en: 'Refactored our entire design system in two sprints. Consistent components, immaculate docs and zero regressions in production.',
    },
  },
  {
    name: 'Renata Oliveira',
    role: { pt: 'UX Lead', en: 'UX Lead' },
    quote: {
      pt: 'A melhor parceria de dev/design que tive. Ele entende espaçamento, hierarquia e microinterações — e ainda discute trade-offs de implementação como adulto.',
      en: 'The best dev/design pairing I\'ve had. He gets spacing, hierarchy and microinteractions — and discusses implementation trade-offs like an adult.',
    },
  },
  {
    name: 'Pedro Henrique',
    role: { pt: 'Engenheiro de Software', en: 'Software Engineer' },
    quote: {
      pt: 'Aprendizado contínuo é a marca dele. Em três meses estava ensinando o time arquitetura de RSC e shipping pattern de Next 14.',
      en: 'Constant learning is his signature. Within three months he was teaching the team RSC architecture and Next 14 shipping patterns.',
    },
  },
];

export { STACK, PROJECTS, EXPERIENCE, TESTIMONIALS };
