import { siteConfig } from '../data/siteConfig.js';
import { down } from './shared.js';
export function HeroEarth() {
  return `<section id="horizon" class="hero-scroll" aria-labelledby="hero-title"><div class="hero-stage"><div class="hero-content"><div class="hero-eyebrow entrance"><span class="tiny-cross">+</span>${siteConfig.role}<span class="tiny-cross">+</span></div><h1 id="hero-title" class="entrance">Beyond the <span>Horizon.</span></h1><p class="hero-tagline entrance">${siteConfig.tagline}</p></div><div class="hero-bottom"><div class="hero-index"><span class="status-dot"></span><span>01 <span class="muted">/</span> THE HORIZON</span></div><a class="scroll-prompt" href="#about"><span>SCROLL TO EXPLORE</span><span class="scroll-arrow">${down}</span></a><span class="hero-bottom-note">A LITTLE CURIOSITY. AN INFINITE HORIZON.</span></div></div></section>`;
}
