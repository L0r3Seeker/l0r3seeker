import { projects } from '../data/projects.js';
import { sectionLabel, arrow } from './shared.js';
import { CodeBackdrop } from './CodeBackdrop.js';

export function projectArtwork(project) {
  const image = project.images[0];
  return `<img class="detail-cover" src="${image.src}" width="${image.width}" height="${image.height}" alt="${image.alt}">`;
}

function sideTimeline() {
  return `<aside class="project-navigator" tabindex="0" role="slider" aria-label="Project gallery timeline" aria-describedby="timeline-hint" aria-orientation="vertical" aria-valuemin="1" aria-valuemax="4" aria-valuenow="1" aria-valuetext="Frame 1 of 4">
    <div class="timeline-start"><span>STARTED</span><span class="timeline-origin">2026.07.21</span></div>
    <svg viewBox="0 0 120 460" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="journey-light" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#78b7ff" stop-opacity=".12"/><stop offset=".5" stop-color="#b5d5fa" stop-opacity=".7"/><stop offset="1" stop-color="#78b7ff" stop-opacity=".12"/></linearGradient></defs>
      ${['curve-shadow', 'curve-main', 'curve-running'].map(name => `<path class="${name}" d="M42 -10 C-30 70 139 115 65 210 S-16 350 54 470"/>`).join('')}
      <path class="curve-branch" d="M42 18 Q65 30 100 30 M60 414 Q85 428 110 428"/>
      <circle class="curve-node" cx="42" cy="18" r="3"/><circle class="curve-node" cx="60" cy="414" r="3"/><circle class="curve-traveler" r="4"/>
    </svg>
    <span class="timeline-now">PRESENT</span>
    <span id="timeline-hint" class="timeline-hint"><span class="timeline-hint-icon">↕</span>Hover & scroll<span>to explore frames</span></span>
  </aside>`;
}

export function Projects() {
  return `<section id="projects" class="section project-showcase container" aria-labelledby="projects-title">
    ${sectionLabel('03', 'SELECTED WORK')}
    <div class="showcase-heading"><h2 id="projects-title">Selected <span class="soft-text">work.</span></h2><span class="project-count">01 / ${String(projects.length).padStart(2, '0')}</span></div>
    <div class="project-picker" role="group" aria-label="Choose a project">${projects.map((project, index) => `<button data-select-project="${index}" aria-pressed="${index === 0}"><span>${project.number}</span>${project.englishTitle}<i></i></button>`).join('')}</div>
    <div class="showcase-layout">${sideTimeline()}<div class="project-viewer">
    ${projects.map((project, number) => `<article class="showcase-project${number === 0 ? ' is-current' : ''}${project.codeBackdrop ? ' minecraft-project' : ''}" data-project="${number}" ${number ? 'inert aria-hidden="true"' : ''}>
      ${project.codeBackdrop ? CodeBackdrop() : ''}
      <div class="project-visual"><div class="project-gallery" aria-label="${project.englishTitle} gallery">
        ${project.images.map((image, index) => `<img class="gallery-frame" src="${image.src}" width="${image.width}" height="${image.height}" alt="${image.alt}" loading="lazy" data-frame="${index}" style="opacity:${index === 0 ? 1 : 0}" ${index ? 'aria-hidden="true"' : ''}>`).join('')}
        <button class="expand-gallery" aria-label="Expand current image">${arrow}<span>EXPAND</span></button>
        <div class="gallery-caption"><span class="gallery-caption-title">${project.images[0].caption}</span><span class="gallery-scene"><b>01</b> / ${String(project.images.length).padStart(2, '0')}</span></div>
      </div><div class="gallery-controls" aria-label="Choose a project image">
        ${project.images.map((image, index) => `<button data-gallery-index="${index}" aria-label="View image ${index + 1}: ${image.caption}" aria-pressed="${index === 0}"><span>0${index + 1}</span><i></i></button>`).join('')}
        <div class="gallery-arrows"><button class="gallery-prev" aria-label="Previous image">←</button><button class="gallery-next" aria-label="Next image">→</button></div>
      </div></div>
      <aside class="project-narration"><span class="project-category">${project.category}</span><h3>${project.englishTitle}</h3>
        <div class="project-facts"><span>${project.engine}</span><span class="project-status"><i></i>${project.status}</span></div>${project.startDate ? `<time datetime="${project.startDate}">${project.dateLabel}</time>` : `<div class="project-client-names">${project.dateLabel}</div>`}
        <div class="narration-rule"><span>ABOUT THE PROJECT</span><i></i></div><p lang="zh-CN">${project.description}</p>
        <a class="project-story-link project-link" href="#/projects/${project.id}">Explore the project ${arrow}</a>
      </aside>
    </article>`).join('')}
    </div></div>
  </section>`;
}
