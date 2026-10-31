export const clamp=(n,min=0,max=1)=>Math.max(min,Math.min(max,n));
export function damp(current,target,dt,tau=.65){return current+(target-current)*(1-Math.exp(-Math.min(dt,.05)/tau));}
// Footer has its own fixed horizon: no full-globe fly-through or zoom.
export function globePose(enter,contact,mobile=false){const p=clamp(enter),c=clamp(contact);return {x:mobile?0:1.55+.16*p,y:mobile?-1.7:-.1-.08*p,scale:mobile?1.15:1.38+.06*p,opacity:(1-.79*p)*(1-.86*c),horizonOpacity:.2+.65*c,horizonOffset:-8*c};}
export function journeyState(progress,projects){const position=clamp(progress)*Math.max(projects.length,1),project=Math.min(Math.floor(position),projects.length-1),local=clamp(position-project);return {project,frame:local*((projects[project]?.images.length||1)-1),local};}
