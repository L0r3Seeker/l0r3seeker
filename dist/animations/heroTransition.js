// One passive listener schedules one paint. DOM size reads happen only on resize.
export function heroTransition() {
  const hero = document.querySelector('.hero-scroll');
  const stage = document.querySelector('.hero-stage');
  const earth = document.querySelector('.earth-layer');
  const stars = document.querySelector('.star-field');
  const content = document.querySelector('.hero-content');
  const bottom = document.querySelector('.hero-bottom');
  const light = document.querySelector('.atmosphere-line');
  const header = document.querySelector('.site-header');
  const progress = document.querySelector('.reading-progress');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const mobile = matchMedia('(max-width: 700px)');
  let travel = 1, page = 1, frame = 0;
  const clamp = x => Math.max(0, Math.min(1, x));
  function paint() {
    frame = 0;
    const y = window.scrollY;
    const p = clamp(y / travel);
    header.classList.toggle('scrolled', y > 55);
    progress.style.transform = `scaleX(${clamp(y / page)})`;
    if (reduced.matches) {
      earth.style.transform = ''; earth.style.opacity = ''; content.style.opacity = ''; content.style.transform = '';
      stars.style.opacity = ''; bottom.style.opacity = ''; stage.style.opacity = ''; light.style.opacity = '0';
      return;
    }
    const strength = mobile.matches ? .12 : .24;
    earth.style.transform = `translate3d(0,${-p * (mobile.matches ? 50 : 130)}px,0) scale(${1 + p * strength})`;
    stars.style.opacity = String(.46 * (1 - clamp(p * 1.7)));
    content.style.opacity = String(1 - clamp(p * 1.8));
    content.style.transform = `translate3d(0,${-p * 75}px,0)`;
    bottom.style.opacity = String(1 - clamp(p * 3));
    light.style.opacity = String(Math.sin(p * Math.PI) * .7);
    light.style.transform = `translateY(${-p * 20}px) scaleX(${.5 + p * .5})`;
    // Keep the orbital scene present until the next section enters. Fading the
    // entire sticky stage to zero would create an empty viewport at its end.
    earth.style.opacity = String(1 - p * .48);
    stage.style.opacity = '1';
  }
  function schedule() { if (!frame) frame = requestAnimationFrame(paint); }
  function measure() { travel = Math.max(1, hero.offsetHeight - stage.offsetHeight); page = Math.max(1, document.documentElement.scrollHeight - innerHeight); schedule(); }
  const resize = new ResizeObserver(measure); resize.observe(document.body);
  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', measure); reduced.addEventListener('change',measure); mobile.addEventListener('change',measure);
  measure();
  return () => { if(frame) cancelAnimationFrame(frame); resize.disconnect(); window.removeEventListener('scroll',schedule); window.removeEventListener('resize',measure); reduced.removeEventListener('change',measure); mobile.removeEventListener('change',measure); };
}
