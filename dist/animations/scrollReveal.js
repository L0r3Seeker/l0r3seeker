export function scrollReveal() {
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  if (reduced.matches || !('IntersectionObserver' in window)) return () => {};
  document.documentElement.classList.add('motion-ready');
  const reveal = new IntersectionObserver(entries => {
    entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); reveal.unobserve(entry.target); } });
  }, { threshold: .08, rootMargin: '0px 0px -25px 0px' });
  document.querySelectorAll('.reveal').forEach(el => reveal.observe(el));
  return () => { reveal.disconnect(); document.documentElement.classList.remove('motion-ready'); };
}
export function sectionTracking() {
  const links = [...document.querySelectorAll('[data-nav]')];
  const positions = new Map();
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => positions.set(entry.target.id,entry.isIntersecting));
    const active = [...positions].find(([,visible])=>visible)?.[0];
    links.forEach(link => {
      if (link.dataset.nav === active) link.setAttribute('aria-current','location');
      else link.removeAttribute('aria-current');
    });
  }, {rootMargin:'-15% 0px -55% 0px',threshold:0});
  document.querySelectorAll('main>section').forEach(section=>observer.observe(section));
  return ()=>observer.disconnect();
}
