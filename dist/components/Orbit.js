import {everydayApps,favoriteGames} from '../data/orbit.js';
import {arrow,horizonMark} from './shared.js';
import {localize} from '../i18n.js';
export function Orbit() {
  return `<main id="orbit-view" class="orbit-page" hidden><div class="container"><div class="orbit-topline"><a href="#horizon">← <span>Back to the horizon</span></a><span>THE PERSONAL SIDE</span></div>
    <header class="orbit-header"><span class="eyebrow">DAILY ORBIT</span><h1>A few things<br><span>in my orbit.</span></h1><p>Apps I reach for. Worlds I return to. And more.</p><span class="orbit-coordinate">L0R3SEEKER / EVERYDAY</span></header>
    <section class="orbit-software" aria-labelledby="software-title"><div class="orbit-section-heading"><div><span class="eyebrow">01 / THE EVERYDAY TOOLKIT</span><h2 id="software-title">Software & platforms<span class="orbit-more">and more.</span></h2></div><span class="orbit-small-cross">+</span></div>
      <div class="apps-grid">${everydayApps.map(a=>{const tag=a.url?'a':'div';return `<${tag} class="app-tile" ${a.url?`href="${a.url}" target="_blank" rel="noopener noreferrer"`:''}><img class="app-icon${a.icon.endsWith('.png')?' app-icon-color':''}" src="${a.icon}" alt="" width="32" height="32" loading="lazy"><span>${a.name}</span>${a.url?'<span class="app-external" aria-hidden="true">↗</span>':''}</${tag}>`;}).join('')}<div class="app-tile app-more"><span aria-hidden="true">+</span><span>and more.</span></div></div>
    </section>
    <section class="orbit-games" aria-labelledby="games-title"><div class="orbit-section-heading"><div><span class="eyebrow">02 / AFTER HOURS</span><h2 id="games-title">Worlds worth returning to.<span class="orbit-more">and more.</span></h2></div></div>
      <div class="gaming-identity"><div><img src="/assets/icons/steam.svg" alt="Steam" width="25" height="25"><span><small>IN-GAME ALIAS</small><strong>L0r3Seeker</strong></span></div><span class="friend-private"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>Friend code</span><b>Hidden</b></span></div>
      <div class="games-grid">${favoriteGames.map((g,i)=>`<a class="game-card" href="${g.href}" target="_blank" rel="noopener noreferrer"><div class="game-art"><img src="${g.image}" width="600" height="900" alt="${g.title} official promotional artwork" loading="lazy"><span class="game-number">0${i+1}</span><span class="game-open">${arrow}</span></div><div class="game-caption"><span>${g.subtitle}</span><h3>${g.title}</h3></div></a>`).join('')}</div>
    </section><div class="orbit-end">${horizonMark}<span>Different worlds. The same curiosity.</span><a href="#projects">Explore the work ${arrow}</a></div>
  </div></main>`;
}
export function mountOrbit() {
  const home=document.querySelector('#home-view'),orbit=document.querySelector('#orbit-view'),footer=document.querySelector('.site-footer');
  let active=false,homeScroll=0;
  function route(){
    const next=location.hash==='#/orbit';
    if(next===active)return;
    if(next)homeScroll=scrollY;
    active=next;home.hidden=next;orbit.hidden=!next;footer.hidden=next;document.body.classList.toggle('orbit-active',next);
    document.title=next?'Daily Orbit — L0r3Seeker':'Beyond the Horizon — L0r3Seeker';
    document.querySelector('[data-orbit-link]')?.toggleAttribute('aria-current',next);
    if(next)window.scrollTo({top:0,behavior:'instant'});
    else {const anchor=location.hash.slice(1);const element=anchor&&!anchor.startsWith('/')?document.getElementById(anchor):null;if(element)element.scrollIntoView({behavior:'instant'});else window.scrollTo({top:homeScroll,behavior:'instant'});}
    window.dispatchEvent(new Event('viewchange'));localize(document.querySelector('#app'));
  }
  window.addEventListener('hashchange',route);route();return()=>window.removeEventListener('hashchange',route);
}
