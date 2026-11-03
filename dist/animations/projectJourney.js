import { projects } from '../data/projects.js';
import { clamp, damp, timelineWheel } from './motionMath.js';

export function mountProjectJourney() {
  const section = document.querySelector('.project-showcase');
  const navigator = section.querySelector('.project-navigator');
  const path = navigator.querySelector('.curve-main');
  const traveler = navigator.querySelector('.curve-traveler');
  const running = navigator.querySelector('.curve-running');
  const count = section.querySelector('.project-count');
  const picker = [...section.querySelectorAll('[data-select-project]')];
  const originLabel = navigator.querySelector('.timeline-start > span');
  const origin = navigator.querySelector('.timeline-origin');
  const terminus = navigator.querySelector('.timeline-now');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const fine = matchMedia('(hover: hover) and (pointer: fine)');
  const data = [...section.querySelectorAll('.showcase-project')].map((article, index) => ({
    article, project: projects[index], frames: [...article.querySelectorAll('.gallery-frame')],
    buttons: [...article.querySelectorAll('[data-gallery-index]')],
    caption: article.querySelector('.gallery-caption-title'), counter: article.querySelector('.gallery-scene b'),
    previous: article.querySelector('.gallery-prev'), next: article.querySelector('.gallery-next'),
    target: 0, current: 0,
  }));
  const length = path.getTotalLength();
  let frame = 0, last = 0, activeProject = 0;
  const cleanups = [];

  function draw(now) {
    frame = 0;
    const dt = last ? (now - last) / 1000 : 1 / 60; last = now;
    const entry = data[activeProject];
    entry.current = reduced.matches ? entry.target : damp(entry.current, entry.target, dt, .16);
    if (Math.abs(entry.current - entry.target) < .00005) entry.current = entry.target;
    const localFrame = entry.current * (entry.frames.length - 1), displayed = Math.round(localFrame);
    entry.frames.forEach((image, i) => {
      const distance = i - localFrame;
      image.style.opacity = String(clamp(1 - Math.abs(distance)));
      image.style.transform = reduced.matches ? 'none' : `translate3d(${distance * 2}%,0,0)`;
      image.setAttribute('aria-hidden', String(i !== displayed));
    });
    entry.buttons.forEach((button, i) => button.setAttribute('aria-pressed', String(i === displayed)));
    entry.caption.textContent = entry.project.images[displayed].caption;
    entry.counter.textContent = String(displayed + 1).padStart(2, '0');
    entry.previous.disabled = entry.target <= 0;
    entry.next.disabled = entry.target >= 1;
    const point = path.getPointAtLength(length * (.08 + entry.current * .84));
    traveler.setAttribute('cx', point.x); traveler.setAttribute('cy', point.y);
    running.style.strokeDashoffset = String(-entry.current * 180);
    navigator.setAttribute('aria-valuemax', String(entry.frames.length));
    navigator.setAttribute('aria-valuenow', String(displayed + 1));
    navigator.setAttribute('aria-valuetext', `${entry.project.englishTitle}, frame ${displayed + 1} of ${entry.frames.length}`);
    if (entry.current !== entry.target) request();
  }
  function request() { if (!frame) frame = requestAnimationFrame(draw); }
  function choose(projectIndex) {
    activeProject = projectIndex;
    const project = projects[projectIndex];
    count.textContent = `${String(projectIndex + 1).padStart(2, '0')} / ${String(projects.length).padStart(2, '0')}`;
    data.forEach((entry, i) => {
      const active = i === projectIndex;
      entry.article.classList.toggle('is-current', active); entry.article.inert = !active;
      entry.article.setAttribute('aria-hidden', String(!active));
      picker[i].setAttribute('aria-pressed', String(active));
    });
    section.classList.toggle('has-code-backdrop', !!project.codeBackdrop);
    originLabel.textContent = project.startDate ? 'STARTED' : 'CLIENT PROJECTS';
    origin.textContent = project.startDate ? project.startDate.replaceAll('-', '.') : 'MYTHOS';
    terminus.textContent = project.startDate ? 'PRESENT' : 'SOREIN';
    request();
  }
  function select(project, image) {
    if (activeProject !== project) choose(project);
    data[project].target = clamp(image / Math.max(projects[project].images.length - 1, 1));
    request();
  }
  function step(direction) {
    const entry = data[activeProject];
    const image = Math.round(entry.target * (entry.frames.length - 1));
    const next = clamp((image + direction) / Math.max(entry.frames.length - 1, 1));
    const changed = Math.abs(next - entry.target) > .00001;
    entry.target = next; request(); return changed;
  }
  function wheel(event) {
    if (!fine.matches || innerWidth <= 700 || event.ctrlKey || event.deltaY === 0) return;
    const entry = data[activeProject], result = timelineWheel(entry.target, event.deltaY, event.deltaMode);
    if (!result.consume) return;
    event.preventDefault(); entry.target = result.next; request();
  }
  function key(event) {
    const direction = ['ArrowDown', 'ArrowRight'].includes(event.key) ? 1 : ['ArrowUp', 'ArrowLeft'].includes(event.key) ? -1 : 0;
    if (direction && step(direction)) event.preventDefault();
  }
  picker.forEach((button, index) => {
    const click = () => choose(index);
    button.addEventListener('click', click); cleanups.push(() => button.removeEventListener('click', click));
  });
  data.forEach((entry, project) => {
    entry.buttons.forEach((button, index) => {
      const click = () => select(project, index);
      button.addEventListener('click', click); cleanups.push(() => button.removeEventListener('click', click));
    });
    const expand = entry.article.querySelector('.expand-gallery');
    const open = () => { location.hash = `/projects/${entry.project.id}/image/${Math.round(entry.target * (entry.frames.length - 1)) + 1}`; };
    expand.addEventListener('click', open); cleanups.push(() => expand.removeEventListener('click', open));
    for (const [selector, direction] of [['.gallery-prev', -1], ['.gallery-next', 1]]) {
      const button = entry.article.querySelector(selector), click = () => step(direction);
      button.addEventListener('click', click); cleanups.push(() => button.removeEventListener('click', click));
    }
  });
  navigator.addEventListener('wheel', wheel, { passive: false });
  navigator.addEventListener('keydown', key);
  reduced.addEventListener('change', request);
  choose(0);
  return () => {
    cancelAnimationFrame(frame); navigator.removeEventListener('wheel', wheel); navigator.removeEventListener('keydown', key);
    reduced.removeEventListener('change', request); cleanups.forEach(fn => fn());
  };
}
