import { siteConfig } from '../data/siteConfig.js';
import { horizonMark } from './shared.js';
export function Navbar() {
  return `<header class="site-header"><div class="nav-inner"><a href="#horizon" class="brand" aria-label="L0r3Seeker — back to horizon">${horizonMark}<span>${siteConfig.name}</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav"><span class="menu-label">MENU</span><span class="menu-lines"><i></i><i></i></span></button><nav id="main-nav" aria-label="Main navigation">${siteConfig.nav.map(n => `<a href="#${n.id}" data-nav="${n.id}"><span class="mobile-nav-number">0${siteConfig.sections.indexOf(n.id)+1}</span> ${n.label}<span class="nav-dot"></span></a>`).join('')}<span class="nav-divider"></span><span class="nav-edition">PERSONAL UNIVERSE <span>↗</span></span></nav></div><div class="reading-progress"></div></header>`;
}
export function mountNavbar() {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('#main-nav');
  const close = () => { toggle.setAttribute('aria-expanded','false'); header.classList.remove('menu-open'); };
  const onToggle = () => { const open = toggle.getAttribute('aria-expanded') !== 'true'; toggle.setAttribute('aria-expanded',String(open)); header.classList.toggle('menu-open',open); };
  const onKey = e => { if(e.key === 'Escape') { close(); toggle.focus(); } };
  const onNavigate = e => { if(e.target.closest('a')) close(); };
  toggle.addEventListener('click',onToggle); nav.addEventListener('click',onNavigate); nav.addEventListener('keydown',onKey);
  const desktop = matchMedia('(min-width: 801px)'); desktop.addEventListener('change',close);
  return () => { toggle.removeEventListener('click',onToggle); nav.removeEventListener('click',onNavigate); nav.removeEventListener('keydown',onKey); desktop.removeEventListener('change',close); };
}
