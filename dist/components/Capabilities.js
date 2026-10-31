import { siteConfig } from '../data/siteConfig.js';
import { sectionLabel, placeholder } from './shared.js';
const icons = [
  '<path d="m9 7-5 5 5 5m6-10 5 5-5 5M13 4l-2 16"/>',
  '<rect x="4" y="4" width="16" height="16" rx="2"/><path d="m7 9 3 3-3 3m6 0h4"/>',
  '<path d="M5 3v18m-2-4h18M9 3v10h12M17 3v18"/>',
  '<path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5L12 3Z"/>',
  '<rect x="3" y="4" width="18" height="6" rx="1"/><rect x="3" y="14" width="18" height="6" rx="1"/><path d="M6 7h1m-1 10h1m5-10h6m-6 10h6"/>',
];
export function Capabilities() { return `<section id="capabilities" class="section capabilities container" aria-labelledby="capabilities-title">${sectionLabel('05','CAPABILITIES')}<div class="section-heading reveal"><h2 id="capabilities-title">Ways to <span class="soft-text">create.</span></h2><div class="heading-aside"><p>Different disciplines. Open possibilities.</p>${placeholder('CATEGORIES · PLACEHOLDER')}</div></div><div class="capability-list">${siteConfig.capabilities.map((c,i)=>`<div class="capability-row reveal"><span class="capability-number">0${i+1}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true">${icons[i]}</svg><h3>${c}</h3><span class="capability-state">DETAILS TO COME</span><span class="capability-end">+</span></div>`).join('')}</div><p class="small-note">能力分类预留，具体技术与经历将在后续补充。</p></section>`; }
