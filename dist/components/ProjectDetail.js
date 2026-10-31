import { projects } from '../data/projects.js';
import { projectArtwork } from './Projects.js';
import { placeholder } from './shared.js';
// Hash routes are refresh-safe on static hosting. Replace this view with a full
// project page without changing the stable #/projects/:id URLs.
export function mountProjectRoutes() {
  const dialog = document.createElement('dialog'); dialog.className='project-dialog'; dialog.setAttribute('aria-labelledby','project-detail-title'); document.body.append(dialog);
  let restoreFocus = null;
  let restoreHash = '#projects';
  function clear() { dialog.close(); document.body.classList.remove('dialog-open'); if(restoreFocus?.isConnected) restoreFocus.focus({preventScroll:true}); }
  function leave() { history.replaceState(null,'',restoreHash); clear(); }
  function route() {
    const match = location.hash.match(/^#\/projects\/([^/]+)$/);
    if(!match) { if(dialog.open) clear(); return; }
    const project = projects.find(p=>p.id===match[1]);
    restoreFocus = document.activeElement;
    dialog.innerHTML = `<div class="dialog-header"><span>PROJECT PREVIEW / PHASE 01</span><button class="dialog-close" aria-label="Close project preview">CLOSE <span aria-hidden="true">×</span></button></div>`+(project ? `<div class="dialog-content">${projectArtwork(project)}<h2 id="project-detail-title">${project.title}</h2><span class="eyebrow">${project.category}</span><p>${project.description}</p><p>${project.note} 此区域预留给未来的项目故事、图片、技术说明与访问链接。</p>${placeholder('PLACEHOLDER · NOT A REAL PROJECT')}<div><button class="dialog-return">← BACK TO SELECTED WORK</button></div></div>` : `<div class="route-error"><h2 id="project-detail-title">Beyond this horizon.</h2><p>This project has not been added yet.</p><button class="dialog-return">← BACK TO SELECTED WORK</button></div>`);
    dialog.querySelectorAll('button').forEach(button=>button.addEventListener('click',leave));
    document.body.classList.add('dialog-open'); if(!dialog.open) dialog.showModal();
  }
  const onClick = e => { const link=e.target.closest('.project-link'); if(link) restoreHash = '#projects'; };
  const onCancel = e => { e.preventDefault(); leave(); };
  const onBackdrop = e => {if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)leave();}};
  window.addEventListener('hashchange',route); document.addEventListener('click',onClick); dialog.addEventListener('cancel',onCancel);dialog.addEventListener('click',onBackdrop); route();
  return () => {window.removeEventListener('hashchange',route);document.removeEventListener('click',onClick);dialog.removeEventListener('cancel',onCancel);dialog.removeEventListener('click',onBackdrop);clear();dialog.remove();};
}
