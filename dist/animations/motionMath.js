export const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value));
export const smoothstep = value => { const p = clamp(value); return p * p * (3 - 2 * p); };
export function damp(current, target, dt, tau = .42) {
  return current + (target - current) * (1 - Math.exp(-Math.min(dt, .05) / tau));
}

export function universeState(scroll, height, contactTop) {
  const transition = smoothstep((scroll - height * .08) / (height * .82));
  const reading = smoothstep((scroll - height * .75) / (height * .65));
  const contact = smoothstep((scroll - (contactTop - height * .65)) / (height * .9));
  return {
    photoOpacity: 1 - transition,
    photoOffset: -10 * transition,
    photoScale: 1 + transition * .025,
    digitalOpacity: transition * (1 - reading * .78) * (1 - contact * .9),
    digitalScale: .985 + transition * .025,
    horizonOpacity: .18 + contact * .62,
    horizonOffset: -8 * contact,
  };
}

export function journeyState(progress, projects) {
  const position = clamp(progress) * Math.max(projects.length, 1);
  const project = Math.min(Math.floor(position), projects.length - 1);
  const local = clamp(position - project);
  return { project, frame: local * ((projects[project]?.images.length || 1) - 1), local };
}

// Consume a wheel event only when the optional timeline can advance. At either
// boundary the browser receives the event and can continue scrolling the page.
export function timelineWheel(current, delta, deltaMode = 0) {
  const pixels = delta * (deltaMode === 1 ? 16 : deltaMode === 2 ? 600 : 1);
  const next = clamp(current + clamp(pixels / 850, -.18, .18));
  return { next, consume: Math.abs(next - current) > .00001 };
}
