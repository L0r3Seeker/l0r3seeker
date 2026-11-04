import { clamp, damp, universeState } from '../animations/motionMath.js';
import { t } from '../i18n.js';

export function GlobalUniverse() {
  return `<div class="global-universe" aria-hidden="true">
    <div class="horizon-photo"><picture><source media="(max-width:700px)" srcset="/l0r3seeker/assets/images/horizon-sunrise-mobile.webp"><img src="/l0r3seeker/assets/images/horizon-sunrise.webp" width="2000" height="1000" fetchpriority="high" alt=""></picture><div class="photo-shade"></div></div>
    <div class="digital-stars"></div><canvas class="dot-canvas"></canvas>
    <div class="universe-vignette"></div><div class="global-cursor-light"></div>
  </div><button class="universe-pause" aria-label="Pause motion" aria-pressed="false" title="Pause motion"><span aria-hidden="true">Ⅱ</span></button>`;
}

export function mountGlobalUniverse() {
  const root = document.querySelector('.global-universe');
  const photo = root.querySelector('.horizon-photo');
  const dots = root.querySelector('.dot-canvas');
  const stars = root.querySelector('.digital-stars');
  const cursor = root.querySelector('.global-cursor-light');
  const horizon = document.querySelector('.contact-earth');
  const pause = document.querySelector('.universe-pause');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  let width = innerWidth, height = innerHeight, contactTop = Infinity;
  let target = universeState(0, height, Infinity), current = { ...target };
  let globe, loading, disposed = false, paused = reduced.matches;
  let frame = 0, last = 0, lastRender = 0, angle = 1.9;
  let mx = 0, my = 0, targetX = 0, targetY = 0;

  function request() { if (!frame && !disposed) frame = requestAnimationFrame(draw); }

  function resizeGlobe() {
    const size = width < 700 ? width * 1.2 : Math.min(height * .82, width * .58);
    const ratio = Math.min(devicePixelRatio, width < 700 ? 1.25 : 1.5);
    dots.style.width = `${size}px`;
    dots.style.height = `${size}px`;
    dots.style.left = `${width < 700 ? (width - size) / 2 : width * .73 - size / 2}px`;
    dots.style.top = `${height * (width < 700 ? .77 : .53) - size / 2}px`;
    globe?.update({ width: size * ratio, height: size * ratio, devicePixelRatio: ratio });
  }

  function updateTarget() {
    target = universeState(scrollY, height, contactTop);
    if (reduced.matches) {
      const early = scrollY < height * .7;
      target.photoOpacity = early ? 1 : 0;
      target.digitalOpacity = early ? 0 : Math.max(target.digitalOpacity, .15);
      target.photoOffset = target.horizonOffset = 0;
      target.photoScale = target.digitalScale = 1;
    }
    request();
  }

  function measure() {
    width = document.documentElement.clientWidth || innerWidth;
    height = innerHeight;
    contactTop = document.querySelector('#contact').offsetTop;
    resizeGlobe();
    updateTarget();
  }

  async function setup() {
    if (loading || globe || disposed) return;
    loading = true;
    try {
      const { default: createGlobe } = await import('../assets/vendor/cobe/dist/index.esm.js');
      if (disposed) return;
      globe = createGlobe(dots, {
        width: 600, height: 600, devicePixelRatio: 1, phi: angle, theta: .15,
        dark: 1, diffuse: 1.8, scale: 1, mapSamples: 16000,
        mapBrightness: 3, mapBaseBrightness: .025,
        baseColor: [.28, .43, .63], markerColor: [.5, .7, 1],
        glowColor: [.08, .17, .3], markers: [], arcs: [], opacity: 1,
      });
      root.classList.add('digital-ready');
      resizeGlobe();
      request();
    } catch {
      root.classList.add('digital-unavailable');
    }
  }

  function draw(now) {
    frame = 0;
    if (disposed || document.hidden) return;
    const dt = last ? Math.min((now - last) / 1000, .05) : 1 / 60;
    last = now;
    let unsettled = false;
    for (const key of Object.keys(current)) {
      const value = reduced.matches ? target[key] : damp(current[key], target[key], dt);
      current[key] = Math.abs(value - target[key]) < .0001 ? target[key] : value;
      if (current[key] !== target[key]) unsettled = true;
    }
    mx = damp(mx, targetX, dt, .45); my = damp(my, targetY, dt, .45);
    const moving = !paused && !reduced.matches;
    if (moving) angle += dt * .025;
    const photoAlpha = root.classList.contains('digital-unavailable') ? Math.max(current.photoOpacity, .12) : current.photoOpacity;
    photo.style.opacity = String(photoAlpha);
    photo.style.transform = `translate3d(0,${current.photoOffset}px,0) scale(${current.photoScale})`;
    dots.style.opacity = String(current.digitalOpacity);
    dots.style.transform = `translate3d(${moving ? mx * 4 : 0}px,${moving ? my * 3 : 0}px,0) scale(${current.digitalScale})`;
    stars.style.opacity = String(current.digitalOpacity * .8);
    horizon.style.opacity = String(current.horizonOpacity);
    horizon.style.transform = `translate3d(0,${current.horizonOffset}px,0)`;
    if (globe && (now - lastRender >= 32 || paused || reduced.matches)) {
      globe.update({ phi: angle + (moving ? mx * .035 : 0), theta: .15 + (moving ? my * .02 : 0) });
      lastRender = now;
    }
    if (moving || unsettled) request();
  }

  function syncPause() {
    pause.setAttribute('aria-pressed', String(paused));
    pause.setAttribute('aria-label', t(paused ? 'Resume motion' : 'Pause motion'));
    pause.title = t(paused ? 'Resume motion' : 'Pause motion');
    pause.innerHTML = `<span aria-hidden="true">${paused ? '▷' : 'Ⅱ'}</span>`;
    request();
  }
  const toggle = () => { paused = !paused; syncPause(); };
  const pointer = event => {
    if (!fine.matches || reduced.matches || paused) return;
    targetX = clamp(event.clientX / width * 2 - 1, -1, 1);
    targetY = clamp(event.clientY / height * 2 - 1, -1, 1);
    cursor.style.transform = `translate(${event.clientX - 350}px,${event.clientY - 350}px)`;
    request();
  };
  const visibility = () => {
    last = 0;
    if (document.hidden) { cancelAnimationFrame(frame); frame = 0; }
    else request();
  };
  const preference = () => { paused = reduced.matches; syncPause(); updateTarget(); };
  pause.addEventListener('click', toggle);
  window.addEventListener('pointermove', pointer, { passive: true });
  window.addEventListener('scroll', updateTarget, { passive: true });
  window.addEventListener('viewchange', measure);
  window.addEventListener('resize', measure);
  document.addEventListener('visibilitychange', visibility);
  reduced.addEventListener('change', preference);
  const resize = new ResizeObserver(measure); resize.observe(document.body);
  measure(); syncPause(); requestAnimationFrame(setup);
  return () => {
    disposed = true; cancelAnimationFrame(frame); resize.disconnect(); globe?.destroy();
    pause.removeEventListener('click', toggle);
    window.removeEventListener('pointermove', pointer); window.removeEventListener('scroll', updateTarget);
    window.removeEventListener('resize', measure); document.removeEventListener('visibilitychange', visibility);
    window.removeEventListener('viewchange', measure);
    reduced.removeEventListener('change', preference);
  };
}
