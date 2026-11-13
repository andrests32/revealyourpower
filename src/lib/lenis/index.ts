import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function createSmoothScroll() {
  const lenis = new Lenis({
    autoRaf: false,
    smoothWheel: true,
    syncTouch: false,
    lerp: 0.085,
    anchors: { offset: -28 },
  });
  const tick = (seconds: number) => lenis.raf(seconds * 1000);
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  return () => {
    gsap.ticker.remove(tick);
    lenis.off('scroll', ScrollTrigger.update);
    lenis.destroy();
  };
}
