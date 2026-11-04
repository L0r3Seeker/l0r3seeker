import {everydayApps,favoriteGames} from '../data/orbit.js';
import {arrow,horizonMark} from './shared.js';
import {sectionLabel} from './shared.js';
export function Orbit() {
  return `<section id="orbit" class="orbit-page section" aria-labelledby="orbit-title"><div class="container">${sectionLabel('06','DAILY ORBIT')}
    <header class="orbit-header"><h2 class="orbit-title" id="orbit-title">A few things <span>in my orbit.</span></h2><p>Apps I reach for. Worlds I return to. And more.</p><span class="orbit-coordinate">L0R3SEEKER / EVERYDAY</span></header>
    <section class="orbit-software" aria-labelledby="software-title"><div class="orbit-section-heading"><div><span class="eyebrow">01 / THE EVERYDAY TOOLKIT</span><h3 id="software-title">Software & platforms<span class="orbit-more">and more.</span></h3></div><span class="orbit-small-cross">+</span></div>
      <div class="apps-grid">${everydayApps.map(a=>{const tag=a.url?'a':'div';return `<${tag} class="app-tile" ${a.url?`href="${a.url}" target="_blank" rel="noopener noreferrer"`:''}><img class="app-icon${a.icon.endsWith('.png')?' app-icon-color':''}" src="${a.icon}" alt="" width="32" height="32" loading="lazy"><span>${a.name}</span>${a.url?'<span class="app-external" aria-hidden="true">↗</span>':''}</${tag}>`;}).join('')}<div class="app-tile app-more"><span aria-hidden="true">+</span><span>and more.</span></div></div>
    </section>
    <section class="orbit-games" aria-labelledby="games-title"><div class="orbit-section-heading"><div><span class="eyebrow">02 / AFTER HOURS</span><h3 id="games-title">Worlds worth returning to.<span class="orbit-more">and more.</span></h3></div></div>
      <div class="gaming-identity"><div><img src="/l0r3seeker/assets/icons/steam.svg" alt="Steam" width="25" height="25"><span><small>IN-GAME ALIAS</small><strong>L0r3Seeker</strong></span></div><span class="friend-private"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></svg><span>Friend code</span><b>Hidden</b></span></div>
      <div class="game-panorama">${favoriteGames.map((g,i)=>`<article class="game-panel" aria-labelledby="game-${i}-title"><img class="game-panel-background" src="${g.image}" width="600" height="900" alt="${g.title} official promotional artwork" loading="lazy"><div class="game-panel-shade"></div><span class="game-panel-index">0${i+1}</span><div class="game-panel-copy"><span>${g.subtitle}</span><h4 id="game-${i}-title">${g.title}</h4><p>${g.description}</p><a href="${g.href}" target="_blank" rel="noopener noreferrer"><span>View on Steam</span>${arrow}</a></div></article>`).join('')}</div>
    </section><div class="orbit-end">${horizonMark}<span>Different worlds. The same curiosity.</span><a href="#projects">Explore the work ${arrow}</a></div>
  </div></section>`;
}
