import assert from 'node:assert/strict';
import {universeState,damp,journeyState,timelineWheel,projectIndex} from '../dist/animations/motionMath.js';
import {projects} from '../dist/data/projects.js';
const first=universeState(0,1000,5000),digital=universeState(900,1000,5000),end=universeState(6000,1000,5000);
assert.equal(first.photoOpacity,1);assert.equal(first.digitalOpacity,0);
assert.equal(digital.photoOpacity,0);assert(digital.digitalOpacity>.8);
let previousPhoto=1;
for(let y=0;y<=1500;y+=10){const pose=universeState(y,1000,5000);assert(pose.photoOpacity<=previousPhoto+1e-9);previousPhoto=pose.photoOpacity;assert(pose.photoScale<=1.025);assert(pose.horizonOffset>=-8);}
for(const target of [end,first,end]){let current={...first};for(let i=0;i<240;i++){for(const key of Object.keys(current)){const before=current[key];current[key]=damp(before,target[key],1/60);assert(current[key]>=Math.min(before,target[key])-1e-9&&current[key]<=Math.max(before,target[key])+1e-9,'No overshoot');}assert(current.horizonOffset>=-8&&current.horizonOffset<=0);}assert(Math.abs(current.photoOpacity-target.photoOpacity)<.001);}
assert.equal(timelineWheel(0,-120).consume,false,'Timeline start releases the page');
assert.equal(timelineWheel(1,120).consume,false,'Timeline end releases the page');
assert.equal(timelineWheel(.5,120).consume,true);assert(timelineWheel(.5,120).next>.5);
assert.equal(timelineWheel(0,-5,1).consume,false);assert(timelineWheel(.5,2,1).next>.5);
assert(timelineWheel(.5,1,2).next<=.68);
for(const p of [-100,0,.2,.5,.8,1,100]){const state=journeyState(p,projects);assert(state.project>=0&&state.project<projects.length);assert(state.frame>=0&&state.frame<=projects[state.project].images.length-1);}
const sample=[projects[0],{...projects[0],id:'future'}];assert.equal(journeyState(.75,sample).project,1);assert.equal(journeyState(1,sample).frame,sample[1].images.length-1);
console.log('PASS: photo-to-digital transition, bounded motion, timeline edge release and gallery boundaries.');

assert.equal(projectIndex(0,4),0);assert.equal(projectIndex(1/3,4),1);assert.equal(projectIndex(2/3,4),2);assert.equal(projectIndex(1,4),3);
for(const [p,i] of [[.16,0],[.17,1],[.49,1],[.51,2],[.83,2],[.84,3]])assert.equal(projectIndex(p,4),i);
console.log('PASS: four separate project stops; no image sequence in overview.');
