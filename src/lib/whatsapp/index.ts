import { site } from '../../data/site';

export const messages = {
  general: 'Hola, me gustaría recibir información sobre Reveal Your Power.',
  tool: 'Hola, quisiera conocer más sobre el kit físico de Reveal Your Power.',
  practitioner:
    'Hola, me gustaría recibir información sobre el módulo Practitioner de Reveal Your Power.',
  training: 'Hola, quisiera recibir información sobre la ruta de formación de Reveal Your Power.',
} as const;

export type ContactInterest = keyof typeof messages;

export function getWhatsAppUrl(interest: ContactInterest, number: string = site.whatsappNumber) {
  // E.164: código de país + número, sin +, espacios ni separadores.
  if (!/^[1-9]\d{6,14}$/.test(number)) return null;
  return `https://wa.me/${number}?text=${encodeURIComponent(messages[interest])}`;
}
