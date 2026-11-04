import {QuoteBar} from './QuoteBar.js';
import { siteConfig } from '../data/siteConfig.js';
import { horizonMark, down } from './shared.js';
export function Footer() { return `<footer class="site-footer container"><div class="footer-top"><a class="brand" href="#horizon">${horizonMark}<span>${siteConfig.name}</span></a><button class="back-top">BACK TO THE HORIZON <span>${down}</span></button></div><div class="footer-bottom"><span>© 2026 ${siteConfig.displayName}. All rights reserved.</span><span>BEYOND THE HORIZON.</span></div>${QuoteBar()}</footer>`; }
