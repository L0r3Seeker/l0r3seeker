import {clamp} from './motionMath.js';

export function heroTransition() {
  const hero = document.querySelector('.hero-content');
  const bottom = document.querySelector('.hero-bottom');
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let frame = 0, page = 1, height = innerHeight;
  function paint() {
    frame = 0;
    header.classList.toggle('scrolled', scrollY > 55);
    progress.style.transform = `scaleX(${clamp(scrollY / page)})`;
    const p = reduced.matches ? 0 : clamp(scrollY / (height * .62));
    hero.style.opacity = String(1 - p);
    hero.style.transform = `translate3d(0,${-p * 30}px,0)`;
    bottom.style.opacity = String(1 - clamp(p * 2));
  }
  const schedule = () => { if (!frame) frame = requestAnimationFrame(paint); };
  const measure = () => { height = innerHeight; page = Math.max(1, document.documentElement.scrollHeight - height); schedule(); };
  const resize = new ResizeObserver(measure); resize.observe(document.body);
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', measure); reduced.addEventListener('change', measure); measure();
  return () => { cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll', schedule); window.removeEventListener('resize', measure); reduced.removeEventListener('change', measure); };
}
