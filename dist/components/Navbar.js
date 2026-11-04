import { siteConfig } from '../data/siteConfig.js';
import { horizonMark } from './shared.js';
import { getLanguage,setLanguage } from '../i18n.js';
export function Navbar() {
  return `<header class="site-header"><div class="nav-inner"><a href="#horizon" class="brand" aria-label="L0r3Seeker — back to horizon">${horizonMark}<span>${siteConfig.name}</span></a><button class="menu-toggle" aria-expanded="false" aria-controls="main-nav"><span class="menu-label">MENU</span><span class="menu-lines"><i></i><i></i></span></button><nav id="main-nav" aria-label="Main navigation">${siteConfig.nav.map((n,i)=>`<a href="${n.href||'#'+n.id}" ${n.href?'data-orbit-link':'data-nav="'+n.id+'"'}><span class="mobile-nav-number">0${i+1}</span> ${n.label}<span class="nav-dot"></span></a>`).join('')}<details class="language-menu"><summary><span>Menu</span><span aria-hidden="true">⌄</span></summary><div class="language-options" data-no-translate><span>LANGUAGE / 语言</span><button data-language="en" aria-pressed="${getLanguage()==='en'}">English <span>EN</span></button><button data-language="zh" aria-pressed="${getLanguage()==='zh'}">简体中文 <span>中</span></button></div></details></nav></div><div class="reading-progress"></div></header>`;
}
export function mountNavbar() {
  const header=document.querySelector('.site-header'),toggle=document.querySelector('.menu-toggle'),nav=document.querySelector('#main-nav');
  const close=()=>{toggle.setAttribute('aria-expanded','false');header.classList.remove('menu-open');};
  const onToggle=()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));header.classList.toggle('menu-open',open);};
  const onKey=e=>{if(e.key==='Escape'){close();nav.querySelector('.language-menu').open=false;toggle.focus();}};
  const onNavigate=e=>{const language=e.target.closest('[data-language]');if(language){setLanguage(language.dataset.language);window.dispatchEvent(new Event('languagechange'));return;}if(e.target.closest('a'))close();};
  toggle.addEventListener('click',onToggle);nav.addEventListener('click',onNavigate);nav.addEventListener('keydown',onKey);
  const desktop=matchMedia('(min-width:801px)');desktop.addEventListener('change',close);
  return()=>{toggle.removeEventListener('click',onToggle);nav.removeEventListener('click',onNavigate);nav.removeEventListener('keydown',onKey);desktop.removeEventListener('change',close);};
}
