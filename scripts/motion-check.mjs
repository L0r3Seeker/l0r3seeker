import assert from 'node:assert/strict';
import {globePose,damp,journeyState} from '../dist/animations/motionMath.js';
import {projects} from '../dist/data/projects.js';
// Simulate sudden End/Home jumps. The footer never expands the sphere and
// its photographic horizon can move at most eight CSS pixels.
for(const mobile of [false,true]){
  let current=globePose(0,0,mobile);const target=globePose(1,1,mobile);
  for(let i=0;i<180;i++){for(const key of Object.keys(current)){const before=current[key];current[key]=damp(before,target[key],1/60,.75);assert(current[key]>=Math.min(before,target[key])-1e-9&&current[key]<=Math.max(before,target[key])+1e-9,'No overshoot');}assert(current.scale<=1.45);assert(current.horizonOffset>=-8&&current.horizonOffset<=0);}
  assert(Math.abs(current.scale-target.scale)<.002);assert.equal(globePose(1,0,mobile).scale,globePose(1,1,mobile).scale,'Footer does not zoom globe');
}
for(const p of [-100,0,.2,.5,.8,1,100]){const state=journeyState(p,projects);assert.equal(state.project,0);assert(state.frame>=0&&state.frame<=3);}
const sample=[projects[0],{...projects[0],id:'future'}];assert.equal(journeyState(.75,sample).project,1);assert.equal(journeyState(1,sample).frame,3);
console.log('PASS: abrupt scroll jumps, bounded horizon, no camera overshoot, one-project journey and gallery boundaries.');
