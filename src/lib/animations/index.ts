import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { createSmoothScroll } from '../lenis';
import { animateIntro } from './intro';
import { animateCards } from './cards';

gsap.registerPlugin(ScrollTrigger);

export function initExperience() {
  const media = gsap.matchMedia();
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const button = document.querySelector<HTMLButtonElement>('.motion-control');
  let userPaused = false;
  let firstRun = true;
  let disposeIntro = () => {};
  let destroyed = false;
  const refresh = () => {
    if (!destroyed) ScrollTrigger.refresh();
  };

  const configure = () => {
    disposeIntro();
    media.revert();
    if (button) button.hidden = reducedMotion.matches;
    if (reducedMotion.matches || userPaused) return;

    media.add(
      { desktop: '(min-width: 1280px)', mobile: '(max-width: 1279px)', fine: '(pointer: fine)' },
      (context) => {
        const desktop = Boolean(context.conditions?.desktop);
        const fine = Boolean(context.conditions?.fine);
        const disposeScroll = desktop && fine ? createSmoothScroll() : () => {};
        const disposeCards = animateCards(desktop, fine);
        const listeners: Array<() => void> = [];

        if (firstRun) {
          const entering = gsap.timeline({ paused: true, defaults: { ease: 'power3.out' } });
          entering.from('.hero-type', { yPercent: 105, duration: 1.1, stagger: 0.13 }, 0);
          entering.from('.hero-reveal', { y: 16, autoAlpha: 0, duration: 0.85, stagger: 0.1 }, 0.2);
          entering.from(
            '.card-entry',
            { scale: 0.8, y: 35, autoAlpha: 0, duration: 1.25, stagger: 0.13 },
            0.3,
          );
          disposeIntro = animateIntro(() => {
            entering.play();
            refresh();
          });
          firstRun = false;
        }

        // Cada sección permanece legible al restaurar la posición de scroll.
        gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((element) => {
          if (element.getBoundingClientRect().top < window.innerHeight * 0.9) return;
          gsap.from(element, {
            autoAlpha: 0,
            y: 30,
            duration: 0.9,
            ease: 'power2.out',
            scrollTrigger: { trigger: element, start: 'top 94%', once: true },
          });
        });
        const staggered = gsap.utils
          .toArray<HTMLElement>('[data-stagger-item]')
          .filter((element) => element.getBoundingClientRect().top >= window.innerHeight * 0.9);
        gsap.set(staggered, { autoAlpha: 0, y: 28 });
        ScrollTrigger.batch(staggered, {
          start: 'top 94%',
          once: true,
          interval: 0.12,
          batchMax: 3,
          onEnter: (batch) =>
            context.add(() => {
              gsap.to(batch, {
                autoAlpha: 1,
                y: 0,
                duration: 0.85,
                stagger: 0.13,
                ease: 'power2.out',
                overwrite: 'auto',
              });
            }),
        });
        gsap.from('.route-line', {
          scaleX: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: '.training-route', start: 'top 90%', once: true },
        });
        if (desktop) {
          gsap.fromTo(
            '.product-image',
            { scale: 1.04 },
            {
              scale: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: '.product-figure',
                start: 'top bottom',
                end: 'bottom center',
                scrub: 1,
              },
            },
          );
          gsap.fromTo(
            '.book',
            { y: 20, rotationY: -8 },
            {
              y: -15,
              rotationY: 5,
              ease: 'none',
              scrollTrigger: {
                trigger: '.practitioner',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            },
          );
          gsap.to('.contact-orbit', {
            scale: 1.15,
            ease: 'none',
            scrollTrigger: {
              trigger: '.contact',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.2,
            },
          });
        }

        // Interacciones controladas por el mismo contexto: Pausar restaura todo.
        if (fine) {
          document.querySelectorAll<HTMLElement>('a.button').forEach((link) => {
            const move = gsap.quickTo(link, 'y', { duration: 0.3, ease: 'power2.out' });
            const enter = () => move(-3);
            const leave = () => move(0);
            link.addEventListener('pointerenter', enter);
            link.addEventListener('pointerleave', leave);
            link.addEventListener('focus', enter);
            link.addEventListener('blur', leave);
            listeners.push(() => {
              link.removeEventListener('pointerenter', enter);
              link.removeEventListener('pointerleave', leave);
              link.removeEventListener('focus', enter);
              link.removeEventListener('blur', leave);
            });
          });
        }
        document.querySelectorAll<HTMLDetailsElement>('.faq-item').forEach((detail) => {
          const icon = detail.querySelector('.faq-toggle');
          const answer = detail.querySelector('.faq-answer');
          const toggle = () =>
            context.add(() => {
              gsap.to(icon, { rotation: detail.open ? 45 : 0, duration: 0.25, overwrite: true });
              if (detail.open)
                gsap.fromTo(
                  answer,
                  { autoAlpha: 0, y: -6 },
                  { autoAlpha: 1, y: 0, duration: 0.3, overwrite: true, onComplete: refresh },
                );
            });
          if (detail.open) gsap.set(icon, { rotation: 45 });
          detail.addEventListener('toggle', toggle);
          listeners.push(() => detail.removeEventListener('toggle', toggle));
        });
        return () => {
          listeners.forEach((remove) => remove());
          disposeCards();
          disposeScroll();
        };
      },
    );
  };

  const toggleMotion = () => {
    userPaused = !userPaused;
    button?.setAttribute('aria-pressed', String(userPaused));
    const label = button?.querySelector('[data-motion-label]');
    const pause = button?.querySelector<HTMLElement>('[data-motion-pause]');
    const play = button?.querySelector<HTMLElement>('[data-motion-play]');
    if (label) label.textContent = userPaused ? 'Activar movimiento' : 'Pausar movimiento';
    if (pause) pause.hidden = userPaused;
    if (play) play.hidden = !userPaused;
    configure();
  };
  const details = document.querySelectorAll<HTMLDetailsElement>('.faq-item');
  button?.addEventListener('click', toggleMotion);
  reducedMotion.addEventListener('change', configure);
  details.forEach((detail) => detail.addEventListener('toggle', refresh));
  window.addEventListener('load', refresh, { once: true });

  try {
    configure();
  } catch (error) {
    disposeIntro();
    media.revert();
    if (button) button.hidden = true;
    console.error('No se pudo iniciar el movimiento; se conserva la versión estática.', error);
  }
  void document.fonts.ready.then(refresh);
  const cleanup = () => {
    destroyed = true;
    disposeIntro();
    media.revert();
    button?.removeEventListener('click', toggleMotion);
    reducedMotion.removeEventListener('change', configure);
    details.forEach((detail) => detail.removeEventListener('toggle', refresh));
    window.removeEventListener('load', refresh);
  };
  window.addEventListener(
    'pagehide',
    (event) => {
      if (!event.persisted) cleanup();
    },
    { once: true },
  );
  if (import.meta.hot) import.meta.hot.dispose(cleanup);
}
