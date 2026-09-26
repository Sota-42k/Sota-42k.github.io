/**
 * Single source of truth for identity and contact details.
 * Pages and layouts import from here rather than repeating strings.
 */
export const SITE = {
  name: 'Sota Fujii',
  tagline: 'Undergraduate researcher in machine learning',
  description:
    'Undergraduate researcher working on the identifiability of score-based generative models, representation learning, and interpretable machine learning.',
  url: 'https://sota-42k.github.io',
  email: 'sotafujii_2027@depauw.edu',
  github: 'https://github.com/Sota-42k',
  linkedin: 'https://www.linkedin.com/in/sota-fujii-7b4177295/',
  orcid: 'https://orcid.org/0009-0003-6658-1207',
  researchGate: 'https://www.researchgate.net/profile/Sota-Fujii-3',
  cv: '/cv/Sota_Fujii_CV.pdf',
  affiliation: 'DePauw University',
} as const;

/**
 * How this site's owner appears in an author list. `PublicationEntry` bolds any
 * matching author so the CV and the site agree without per-entry markup.
 */
export const AUTHOR_SELF = 'Fujii, S.';

export const RESEARCH_INTERESTS = [
  'Identifiability (nonlinear ICA)',
  'Representation learning (identifiable representations)',
  'Generative models (score-based diffusion models)',
  'Explainable AI (identifiable machine learning and optimization)',
] as const;

export const NAV_LINKS = [
  { href: '/', label: 'About' },
  { href: '/research', label: 'Research' },
  { href: '/publications', label: 'Publications' },
] as const;
