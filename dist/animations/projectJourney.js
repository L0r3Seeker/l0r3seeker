import {projects} from '../data/projects.js';
import {clamp,damp,journeyState} from './motionMath.js';
export function mountProjectJourney(){
  const section=document.querySelector('.project-journey'),stage=document.querySelector('.journey-stage'),plane=section.querySelector('.journey-curve-plane');
  const path=section.querySelector('.curve-main'),traveler=section.querySelector('.curve-traveler'),running=section.querySelector('.curve-running'),count=section.querySelector('.project-count');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  const data=[...section.querySelectorAll('.journey-project')].map((article,index)=>({article,frames:[...article.querySelectorAll('.gallery-frame')],buttons:[...article.querySelectorAll('[data-gallery-index]')],caption:article.querySelector('.gallery-caption-title'),counter:article.querySelector('.gallery-scene b'),project:projects[index]}));
  let start=0,travel=1,target=0,current=0,frame=0,last=0,manual=null,displayed=0,currentProject=0;
  const pathLength=path.getTotalLength();
  function measure(){start=section.getBoundingClientRect().top+scrollY;travel=Math.max(1,section.offsetHeight-stage.offsetHeight);onScroll();}
  function draw(now){frame=0;const dt=last?(now-last)/1000:1/60;last=now;current=reduced.matches?target:damp(current,target,dt,.24);if(Math.abs(current-target)<.00005)current=target;
    const state=journeyState(current,projects);currentProject=state.project;count.textContent=`${String(currentProject+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')} PROJECT`;
    data.forEach((d,index)=>{const active=index===currentProject;d.article.classList.toggle('is-current',active);d.article.inert=!active;d.article.setAttribute('aria-hidden',String(!active));if(!active)return;const position=manual??state.frame;displayed=Math.round(position);
      d.frames.forEach((image,i)=>{const distance=i-position;image.style.opacity=String(clamp(1-Math.abs(distance)));image.style.transform=reduced.matches?'none':`translate3d(${distance*3}%,0,0) scale(${1+Math.abs(distance)*.012})`;image.setAttribute('aria-hidden',String(i!==displayed));});
      d.buttons.forEach((button,i)=>button.setAttribute('aria-pressed',String(i===displayed)));d.caption.textContent=d.project.images[displayed].caption;d.counter.textContent=String(displayed+1).padStart(2,'0');
    });
    const p=reduced.matches?.5:current;plane.style.transform=`perspective(1100px) rotateX(24deg) rotateZ(${-1.8+p*3.6}deg) translate3d(${75-p*150}px,0,0)`;
    const point=path.getPointAtLength(pathLength*(.32+p*.33));traveler.setAttribute('cx',point.x);traveler.setAttribute('cy',point.y);running.style.strokeDashoffset=String(-p*420);
    if(current!==target)frame=requestAnimationFrame(draw);
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(draw);}
  function onScroll(){target=clamp((scrollY-start)/travel);schedule();}
  // Only genuine scrolling input resumes the scroll-driven gallery. Browser
  // focus scrolling and dialog layout changes must preserve explicit selection.
  const resumeScroll=()=>{manual=null;schedule();};
  const scrollKey=e=>{if(['PageDown','PageUp','Home','End','ArrowDown','ArrowUp',' '].includes(e.key)&&!document.querySelector('dialog[open]'))resumeScroll();};
  const openGallery=()=>{location.hash=`/projects/${projects[currentProject].id}/image/${Math.round(manual??displayed)+1}`;};const cleanups=[];
  data.forEach(d=>{d.buttons.forEach((button,i)=>{const click=()=>{manual=i;displayed=i;schedule();};button.addEventListener('click',click);cleanups.push(()=>button.removeEventListener('click',click));});const button=d.article.querySelector('.expand-gallery');button.addEventListener('click',openGallery);cleanups.push(()=>button.removeEventListener('click',openGallery));});
  const resize=new ResizeObserver(measure);resize.observe(section);resize.observe(stage);window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('wheel',resumeScroll,{passive:true});window.addEventListener('touchmove',resumeScroll,{passive:true});window.addEventListener('keydown',scrollKey);window.addEventListener('resize',measure);reduced.addEventListener('change',measure);measure();
  return()=>{cancelAnimationFrame(frame);resize.disconnect();window.removeEventListener('scroll',onScroll);window.removeEventListener('wheel',resumeScroll);window.removeEventListener('touchmove',resumeScroll);window.removeEventListener('keydown',scrollKey);window.removeEventListener('resize',measure);reduced.removeEventListener('change',measure);cleanups.forEach(fn=>fn());};
}
