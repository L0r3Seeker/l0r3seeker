import {projects} from '../data/projects.js';
import {localize,t} from '../i18n.js';
export function mountProjectRoutes(){
  const dialog=document.createElement('dialog');dialog.className='project-dialog variable-dialog';dialog.setAttribute('aria-labelledby','project-detail-title');document.body.append(dialog);
  let restoreFocus=null,project=null,index=0;
  function updateImage(){
    const image=project.images[index],view=dialog.querySelector('.lightbox-image');view.src=image.src;view.alt=t(image.alt);
    dialog.querySelector('.lightbox-caption').textContent=`${String(index+1).padStart(2,'0')} / ${String(project.images.length).padStart(2,'0')} — ${t(image.caption)}`;
    dialog.querySelectorAll('[data-detail-image]').forEach((b,i)=>b.setAttribute('aria-pressed',String(i===index)));
  }
  function clear(){dialog.close();document.body.classList.remove('dialog-open');if(restoreFocus?.isConnected)restoreFocus.focus({preventScroll:true});}
  function leave(){history.replaceState(null,'','#projects');clear();}
  function route(){
    const match=location.hash.match(/^#\/projects\/([^/]+)(?:\/image\/(\d+))?$/);
    if(!match){if(dialog.open)clear();return;}
    project=projects.find(p=>p.id===match[1]);restoreFocus=document.activeElement;
    dialog.innerHTML=`<div class="dialog-header"><span>${t('PROJECT')} / ${project?.englishTitle||t('UNKNOWN')}</span><button class="dialog-close" aria-label="Close project details"><span class="close-text">CLOSE</span> <span aria-hidden="true">×</span></button></div>`+(project?`<div class="lightbox"><img class="lightbox-image" alt=""><button class="lightbox-prev" aria-label="Previous image">←</button><button class="lightbox-next" aria-label="Next image">→</button><span class="lightbox-caption" aria-live="polite"></span></div><div class="detail-thumbnails" aria-label="Choose an image">${project.images.map((image,i)=>`<button data-detail-image="${i}" aria-label="${t(image.caption)}"><img src="${image.src}" width="110" height="62" alt="" loading="lazy"></button>`).join('')}</div><div class="dialog-project-notes"><div><h2 id="project-detail-title">${project.englishTitle}</h2><p class="eyebrow">${project.engine} · ${t(project.status)}</p><p class="detail-date">${t(project.dateLabel)}</p>${project.clientNames?`<p>${project.clientNames}</p>`:''}${project.serverAddress?`<button class="copy-server" data-copy-server="${project.serverAddress}"><code>${project.serverAddress}</code><span>Copy IP ↗</span></button>`:''}</div><p>${t(project.description)}</p></div>`:`<div class="route-error"><h2 id="project-detail-title">Beyond this horizon.</h2><p>This project could not be found.</p></div>`);
    dialog.querySelector('.dialog-close').addEventListener('click',leave);
    if(project){index=Math.min(Math.max(Number(match[2]||1)-1,0),project.images.length-1);updateImage();dialog.querySelector('.lightbox-prev').addEventListener('click',()=>{index=(index+project.images.length-1)%project.images.length;updateImage();});dialog.querySelector('.lightbox-next').addEventListener('click',()=>{index=(index+1)%project.images.length;updateImage();});dialog.querySelectorAll('[data-detail-image]').forEach(b=>b.addEventListener('click',()=>{index=Number(b.dataset.detailImage);updateImage();}));}
    localize(dialog);document.body.classList.add('dialog-open');if(!dialog.open)dialog.showModal();
  }
  const cancel=e=>{e.preventDefault();leave();},key=e=>{if(project&&(e.key==='ArrowRight'||e.key==='ArrowLeft')){e.preventDefault();index=(index+(e.key==='ArrowRight'?1:-1)+project.images.length)%project.images.length;updateImage();}};
  dialog.addEventListener('cancel',cancel);dialog.addEventListener('keydown',key);window.addEventListener('hashchange',route);route();return()=>{window.removeEventListener('hashchange',route);dialog.removeEventListener('cancel',cancel);dialog.removeEventListener('keydown',key);clear();dialog.remove();};
}
