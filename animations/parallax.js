export function microInteractions() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches || matchMedia('(prefers-reduced-motion: reduce)').matches) return () => {};
  const cleanups = [];
  document.querySelectorAll('.project-art').forEach(art => {
    const onMove = e => { const box = art.getBoundingClientRect(); art.style.setProperty('--mouse-x',`${e.clientX-box.left}px`); art.style.setProperty('--mouse-y',`${e.clientY-box.top}px`); };
    art.addEventListener('pointermove',onMove); cleanups.push(()=>art.removeEventListener('pointermove',onMove));
  });
  const image = document.querySelector('.intro-image img');
  const observer = new IntersectionObserver(entries=> { entries.forEach(e => { if(e.isIntersecting) image.animate([{transform:'scale(1.08) translateY(7px)'},{transform:'scale(1.08) translateY(-7px)'}],{duration:1800,easing:'ease-out',fill:'forwards'}); }); },{threshold:.2});
  observer.observe(image);
  return () => {cleanups.forEach(fn=>fn());observer.disconnect();image.getAnimations().forEach(a=>a.cancel());};
}
