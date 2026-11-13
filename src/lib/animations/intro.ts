import gsap from 'gsap';

// Aproximadamente cinco segundos: cada número tiene un segundo para respirar.
export function animateIntro(onComplete: () => void) {
  const intro = document.querySelector<HTMLElement>('.intro');
  let previouslySeen = false;
  try {
    previouslySeen = sessionStorage.getItem('ryp:intro-v2-seen') === 'true';
  } catch {
    /* Storage is optional. */
  }
  if (!intro || previouslySeen || window.location.hash || window.scrollY > 20) {
    onComplete();
    return () => {};
  }

  let finished = false;
  let fallback = 0;
  const timeline = gsap.timeline({ defaults: { ease: 'power2.out' } });
  const events = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
  const detach = () => {
    window.clearTimeout(fallback);
    events.forEach((event) => window.removeEventListener(event, skip));
  };
  const finish = (reveal = true) => {
    if (finished) return;
    finished = true;
    intro.hidden = true;
    detach();
    if (reveal) onComplete();
  };
  const skip = () => {
    timeline.kill();
    finish();
  };
  intro.hidden = false;
  timeline.fromTo(
    '.intro-symbol',
    { autoAlpha: 0, scale: 0.9 },
    { autoAlpha: 1, scale: 1, duration: 0.7 },
    0,
  );
  timeline.fromTo(
    '.intro-brand',
    { autoAlpha: 0, y: 12 },
    { autoAlpha: 1, y: 0, duration: 0.65 },
    0.15,
  );
  intro.querySelectorAll('.intro-count span').forEach((number, index) => {
    const start = 0.5 + index * 1.05;
    timeline.fromTo(number, { y: 24, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 0.28 }, start);
    timeline.to(number, { y: -22, autoAlpha: 0, duration: 0.25 }, start + 0.7);
  });
  timeline.to('.intro-symbol', { scale: 1.08, duration: 0.6, ease: 'sine.inOut' }, 3.55);
  timeline.to(
    intro,
    { yPercent: -100, duration: 0.85, ease: 'power3.inOut', onComplete: () => finish() },
    4.05,
  );
  fallback = window.setTimeout(skip, 6500);

  // Una interacción permite pasar de inmediato; nunca se bloquean scroll ni foco.
  events.forEach((event) => window.addEventListener(event, skip, { passive: true, once: true }));
  try {
    sessionStorage.setItem('ryp:intro-v2-seen', 'true');
  } catch {
    /* No personal data. */
  }
  return () => {
    timeline.kill();
    finish(false);
  };
}
