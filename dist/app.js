import { Navbar, mountNavbar } from './components/Navbar.js';
import { HeroEarth } from './components/HeroEarth.js';
import { Introduction } from './components/Introduction.js';
import { Projects } from './components/Projects.js';
import { Exploration } from './components/Exploration.js';
import { Capabilities } from './components/Capabilities.js';
import { Contact } from './components/Contact.js';
import { Footer } from './components/Footer.js';
import { mountProjectRoutes } from './components/ProjectDetail.js';
import { heroTransition } from './animations/heroTransition.js';
import { scrollReveal, sectionTracking } from './animations/scrollReveal.js';
import { microInteractions } from './animations/parallax.js';
import { GlobalUniverse, mountGlobalUniverse } from './components/GlobalUniverse.js';
import { mountProjectJourney } from './animations/projectJourney.js';

document.querySelector('#app').innerHTML = `${GlobalUniverse()}${Navbar()}<main>${HeroEarth()}${Introduction()}${Projects()}${Exploration()}${Capabilities()}${Contact()}</main>${Footer()}`;
document.querySelector('.back-top').addEventListener('click',()=>{history.replaceState(null,'',location.pathname);window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});});
document.querySelectorAll('img').forEach(img => img.addEventListener('error',()=>{img.style.visibility='hidden';}));
const cleanup = [mountNavbar(),heroTransition(),scrollReveal(),sectionTracking(),microInteractions(),mountProjectRoutes(),mountProjectJourney(),mountGlobalUniverse()];
// Normal anchors remain native, including keyboard and browser history behavior.
if(location.hash==='#works')history.replaceState(null,'','#projects');
if(location.hash && !location.hash.startsWith('#/')) requestAnimationFrame(()=>document.getElementById(location.hash.slice(1))?.scrollIntoView({behavior:'instant'}));
window.addEventListener('pagehide',()=>cleanup.forEach(dispose=>dispose()),{once:true});
// Reinitialize after the browser restores a page from its back/forward cache.
window.addEventListener('pageshow',event=>{if(event.persisted)location.reload();});
