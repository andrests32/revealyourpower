export const site = {
  name: 'Reveal Your Power',
  title: 'Reveal Your Power — Nuevas perspectivas para acompañar',
  description:
    'Una metodología basada en cartas para profesionales que trabajan con personas. Descubre la herramienta física y la formación Reveal Your Power, comenzando por Practitioner.',
  // Ecuador: 0967588441 → +593 96 758 8441. Se puede cambiar desde .env.
  whatsappNumber: import.meta.env.PUBLIC_WHATSAPP_NUMBER?.trim() || '593967588441',
  url: import.meta.env.PUBLIC_SITE_URL?.trim() ?? '',
} as const;

export const navigation = [
  { label: 'Metodología', href: '#metodologia' },
  { label: 'Herramienta', href: '#herramienta' },
  { label: 'Formación', href: '#formacion' },
  { label: 'Contacto', href: '#contacto' },
] as const;
