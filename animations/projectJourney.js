import { clamp, damp, projectIndex } from './motionMath.js';
import { projects } from '../data/projects.js';

export function mountProjectJourney() {
  const section=document.querySelector('.work-journey'), stage=section.querySelector('.journey-sticky');
  const cards=[...section.querySelectorAll('.journey-card')], themes=[...section.querySelectorAll('.project-theme')];
  const buttons=[...section.querySelectorAll('[data-select-project]')], count=section.querySelector('.project-count');
  const path=section.querySelector('.work-track'), traveler=section.querySelector('.work-traveler'), lit=section.querySelector('.work-track-lit');
  const reduced=matchMedia('(prefers-reduced-motion: reduce)');
  let top=0,range=1,target=0,current=0,frame=0,last=0,active=-1,lockedUntil=0;
  function choose(index) {
    if(index===active)return;active=index;
    cards.forEach((card,i)=>{const on=i===index;card.classList.toggle('is-current',on);card.inert=reduced.matches?false:!on;card.setAttribute('aria-hidden',String(reduced.matches?false:!on));themes[i].classList.toggle('is-current',on);buttons[i].setAttribute('aria-pressed',String(on));});
    count.textContent=`${String(index+1).padStart(2,'0')} / ${String(projects.length).padStart(2,'0')}`;
  }
  function draw(now) {
    frame=0;const dt=last?(now-last)/1000:1/60;last=now;
    current=reduced.matches?target:damp(current,target,dt,.12);
    if(Math.abs(current-target)<.0001)current=target;
    choose(projectIndex(current,projects.length));
    const pt=path.getPointAtLength(path.getTotalLength()*current);traveler.setAttribute('cx',pt.x);traveler.setAttribute('cy',pt.y);
    lit.style.strokeDashoffset=String(-current*200);
    if(current!==target)request();
  }
  function request(){if(!frame)frame=requestAnimationFrame(draw);}
  function scroll(){if(performance.now()<lockedUntil)return;target=clamp((scrollY-top)/range);request();}
  function measure(){lockedUntil=0;active=-1;top=section.getBoundingClientRect().top+scrollY;range=Math.max(section.offsetHeight-stage.offsetHeight,1);scroll();}
  function go(index){lockedUntil=performance.now()+950;target=index/(projects.length-1);request();window.scrollTo({top:top+range*target,behavior:'smooth'});}
  function wheel(event){
    if(reduced.matches||document.querySelector('.site-header.menu-open')||document.body.classList.contains('dialog-open')||document.body.classList.contains('orbit-active')||event.ctrlKey||event.deltaY===0)return;
    const pixels=event.deltaY*(event.deltaMode===1?16:event.deltaMode===2?innerHeight:1),direction=Math.sign(pixels),y=scrollY;
    const entering=direction>0&&y<top&&y+pixels>=top;
    const inside=y>=top-2&&y<=top+range+2;
    if(!entering&&!inside)return;
    if(performance.now()<lockedUntil){event.preventDefault();return;}
    if(entering){event.preventDefault();go(0);return;}
    const next=active+direction;
    if(next>=0&&next<projects.length){event.preventDefault();go(next);}
  }
  const clicks=buttons.map((button,i)=>{const click=()=>{
    if(reduced.matches){choose(i);target=current=i/(projects.length-1);request();return;}
    go(i);
  };button.addEventListener('click',click);return()=>button.removeEventListener('click',click);});
  window.addEventListener('scroll',scroll,{passive:true});window.addEventListener('resize',measure,{passive:true});
  window.addEventListener('wheel',wheel,{passive:false});
  reduced.addEventListener('change',measure);window.addEventListener('viewchange',measure);measure();
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',scroll);window.removeEventListener('wheel',wheel);window.removeEventListener('resize',measure);window.removeEventListener('viewchange',measure);reduced.removeEventListener('change',measure);clicks.forEach(f=>f());};
}
