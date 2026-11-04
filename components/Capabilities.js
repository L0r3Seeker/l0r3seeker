import {sectionLabel,arrow} from './shared.js';
const services=[
  {title:'Websites & interfaces',tag:'WEB / UI / MOTION',description:'Portfolios, landing pages, and useful web interfaces. Responsive layouts with motion that serves the content.',icon:'<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/>'},
  {title:'Game prototypes',tag:'GODOT / PHYSICS / INTERACTION',description:'From a mechanic to a playable prototype. First-person interaction, physics puzzles, and iterative level development.',icon:'<path d="M7 8h10l4 9-2 3-5-4h-4l-5 4-2-3 4-9Z"/><path d="M7 11v5m-2-2.5h4m6-1h.1m2 2h.1"/>'},
  {title:'Minecraft development',tag:'JAVA / CLIENTS / SERVERS',description:'Client modules, game interfaces, and server-related tooling. Built around a clear feature and a practical workflow.',icon:'<path d="m12 3 9 5-9 5-9-5 9-5ZM3 8v9l9 5 9-5V8M12 13v9"/>'},
  {title:'Tools & automation',tag:'SCRIPTS / INTEGRATIONS / WORKFLOWS',description:'Small tools that remove repetitive steps. Focused scripts and integrations shaped around the problem you need to solve.',icon:'<path d="m8 6-5 6 5 6m8-12 5 6-5 6M14 4l-4 16"/>'},
];
export function Capabilities(){
  return `<section id="capabilities" class="section capabilities conviction container" aria-labelledby="capabilities-title">${sectionLabel('05','BEYOND THE FRAME')}
    <div class="conviction-manifesto"><h2 id="capabilities-title" class="reveal">Don't let the walls<br><span>become your horizon.</span></h2><div class="conviction-note reveal"><span class="eyebrow">THINK BEYOND THE GIVEN</span><p>Some places teach you to fit the frame. We would rather build a wider one.</p><span>Curiosity needs room. Good work travels.</span></div></div>
    <div class="services-heading reveal"><div><span class="eyebrow">TURN ABILITY INTO SOMETHING REAL</span><h3>Technical services.</h3></div><span>From a rough idea to something that works.</span></div>
    <div class="services-grid">${services.map((s,i)=>`<a class="service-card reveal" href="mailto:L0r3Seekerx@gmail.com?subject=${encodeURIComponent('Project enquiry: '+s.title)}"><div class="service-top"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.1" aria-hidden="true">${s.icon}</svg><span>0${i+1}</span></div><span class="service-tag">${s.tag}</span><h4>${s.title}</h4><p>${s.description}</p><span class="service-discuss"><span>Discuss a project</span>${arrow}</span></a>`).join('')}</div>
    <div class="services-footnote"><span>Scope first. Build carefully. Ship clearly.</span><a href="#contact">Let's talk ${arrow}</a></div>
  </section>`;
}
