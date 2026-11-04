import { projects } from '../data/projects.js';
import { sectionLabel, arrow } from './shared.js';
import { CodeBackdrop } from './CodeBackdrop.js';

export function Projects() {
  return `<section id="projects" class="work-journey" style="--work-run:${(projects.length-1)*90}svh" aria-labelledby="projects-title"><div class="journey-sticky">
    <div class="project-themes" aria-hidden="true">${projects.map((p,i)=>`<div class="project-theme theme-${p.theme}${i===0?' is-current':''}" data-theme="${i}">${p.codeBackdrop?CodeBackdrop():`<img src="${p.images[0].src}" alt="" loading="lazy">`}<div class="theme-shade"></div></div>`).join('')}</div>
    <div class="journey-inner container"><div class="journey-heading">${sectionLabel('03','SELECTED WORK')}<span class="project-count">01 / ${String(projects.length).padStart(2,'0')}</span></div>
      <div class="journey-title"><h2 id="projects-title">Selected <span class="soft-text">work.</span></h2><span class="journey-scroll-hint">SCROLL TO CONTINUE ↓</span></div>
      <div class="journey-cards">${projects.map((p,i)=>`<article class="journey-card${i===0?' is-current':''}" data-project="${i}" ${i?'inert aria-hidden="true"':''}>
        <a href="#/projects/${p.id}" class="journey-cover project-link" aria-label="View ${p.englishTitle} project"><img src="${p.images[0].src}" width="${p.images[0].width}" height="${p.images[0].height}" alt="${p.images[0].alt}" loading="lazy"><span class="cover-label"><b>${String(p.images.length).padStart(2,'0')}</b><span>IMAGES</span>${arrow}</span></a>
        <div class="journey-summary"><span class="project-category">${p.category}</span><h3>${p.englishTitle}</h3>${p.clientNames?`<div class="client-names">${p.clientNames}</div>`:''}<div class="journey-facts"><span>${p.engine}</span><span>${p.status}</span></div>${p.startDate?`<time datetime="${p.startDate}">${p.dateLabel}</time>`:`<div class="project-context">${p.dateLabel}</div>`}<p>${p.overview}</p>${p.serverAddress?`<button class="copy-server" data-copy-server="${p.serverAddress}" aria-label="Copy server address"><code>${p.serverAddress}</code><span>Copy IP ↗</span></button>`:''}${p.website?`<a class="project-website" href="${p.website}" target="_blank" rel="noopener noreferrer">Visit website ${arrow}</a>`:''}<a class="journey-details project-link" href="#/projects/${p.id}"><span>View project details</span>${arrow}</a></div>
      </article>`).join('')}</div>
      <div class="work-timeline" role="group" aria-label="Project timeline"><svg viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden="true"><path class="work-track" d="M0 38 C170 38 200 3 330 22 S510 64 665 29 S860 5 1000 30"/><path class="work-track-lit" d="M0 38 C170 38 200 3 330 22 S510 64 665 29 S860 5 1000 30"/><circle class="work-traveler" r="4"/></svg><div class="timeline-projects">${projects.map((p,i)=>`<button data-select-project="${i}" aria-pressed="${i===0}"><span class="timeline-date">${p.timelineDate}</span><span class="timeline-branch"></span><span class="timeline-name">${p.englishTitle}</span></button>`).join('')}</div><span class="timeline-present">PRESENT</span></div>
    </div></div></section>`;
}
