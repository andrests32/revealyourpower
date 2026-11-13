import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function animateCards(desktop: boolean, finePointer: boolean) {
  const hero = document.querySelector<HTMLElement>('.hero');
  if (!hero) return () => {};
  const floats = gsap.utils.toArray<HTMLElement>('.card-float').filter((el) => el.offsetWidth > 0);
  const animations = floats.map((card, index) => {
    const amplitude = desktop ? 14 : 7;
    const direction = index % 2 === 0 ? 1 : -1;
    return gsap.to(card, {
      keyframes: [
        { x: amplitude * direction, y: -amplitude, rotationX: 4, rotationY: -5, rotation: 2 },
        { x: amplitude * 1.5 * direction, y: 0, rotationX: -3, rotationY: 5, rotation: 0 },
        { x: 0, y: amplitude, rotationX: 3, rotationY: 3, rotation: -2 },
        { x: -amplitude * direction, y: 0, rotationX: -3, rotationY: -4, rotation: 0 },
        { x: 0, y: 0, rotationX: 0, rotationY: 0, rotation: 0 },
      ],
      duration: 20 + index * 2,
      ease: 'none',
      defaults: { ease: 'sine.inOut' },
      repeat: -1,
      paused: document.hidden,
    });
  });

  const syncVisibility = () => {
    const bounds = hero.getBoundingClientRect();
    const active = !document.hidden && bounds.bottom > 0 && bounds.top < window.innerHeight;
    animations.forEach((animation) => animation.paused(!active));
  };
  ScrollTrigger.create({
    trigger: hero,
    start: 'top bottom',
    end: 'bottom top',
    onToggle: syncVisibility,
  });
  document.addEventListener('visibilitychange', syncVisibility);

  if (desktop) {
    gsap.to('.card-position', {
      y: (index) => (index % 2 === 0 ? 70 : -50),
      rotation: (index) => (index % 2 === 0 ? -7 : 7),
      ease: 'none',
      scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: 1 },
    });
  }

  const parallax = finePointer
    ? gsap.utils.toArray<HTMLElement>('.card-parallax').map((card, index) => ({
        x: gsap.quickTo(card, 'x', { duration: 1.3, ease: 'power2.out' }),
        y: gsap.quickTo(card, 'y', { duration: 1.3, ease: 'power2.out' }),
        strength: (index % 2 === 0 ? 1 : -1) * (6 + index),
      }))
    : [];
  const pointerMove = (event: PointerEvent) => {
    const bounds = hero.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width - 0.5;
    const y = (event.clientY - bounds.top) / bounds.height - 0.5;
    parallax.forEach((card) => {
      card.x(x * card.strength);
      card.y(y * card.strength);
    });
  };
  const pointerLeave = () =>
    parallax.forEach((card) => {
      card.x(0);
      card.y(0);
    });
  if (finePointer) {
    hero.addEventListener('pointermove', pointerMove, { passive: true });
    hero.addEventListener('pointerleave', pointerLeave);
  }
  syncVisibility();

  return () => {
    animations.forEach((animation) => animation.kill());
    parallax.forEach((card) => {
      card.x.tween.kill();
      card.y.tween.kill();
    });
    hero.removeEventListener('pointermove', pointerMove);
    hero.removeEventListener('pointerleave', pointerLeave);
    document.removeEventListener('visibilitychange', syncVisibility);
  };
}
