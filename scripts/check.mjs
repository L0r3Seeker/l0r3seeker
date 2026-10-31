import { readdir, readFile, stat } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { execFileSync } from 'node:child_process';
import assert from 'node:assert/strict';
const root=resolve('dist');
let count=0;
async function walk(path){for(const entry of await readdir(path,{withFileTypes:true})){const full=resolve(path,entry.name);if(entry.isDirectory())await walk(full);else if(entry.name.endsWith('.js')){execFileSync(process.execPath,['--check',full]);const text=await readFile(full,'utf8');for(const match of text.matchAll(/from\s+['"]([^'"]+)['"]/g)){if(match[1].startsWith('.'))assert((await stat(resolve(dirname(full),match[1]))).isFile(),`Missing import ${match[1]}`);}count++;}}}
await walk(root);
const {siteConfig}=await import('../dist/data/siteConfig.js');const {projects}=await import('../dist/data/projects.js');
assert.equal(new Set(siteConfig.sections).size,6);assert.equal(projects.length,1);assert.equal(new Set(projects.map(p=>p.id)).size,projects.length);
assert.equal(projects[0].id,'variable');assert.equal(projects[0].startDate,'2026-07-21');assert.equal(projects[0].images.length,4);
for(const project of projects)for(const image of project.images)assert((await stat(resolve(root,'.'+image.src))).size>0,`Missing project screenshot ${image.src}`);
assert.equal(siteConfig.contact.length,4);assert.equal(siteConfig.contact.find(c=>c.label==='Email').href,'mailto:L0r3Seekerx@gmail.com');
for(const asset of ['assets/images/earth-horizon.webp','assets/images/earth-horizon-mobile.webp','assets/fonts/manrope-latin.woff2','assets/favicon.svg','styles/globals.css'])assert((await stat(resolve(root,asset))).size>0,`Missing asset ${asset}`);
const hosting=JSON.parse(await readFile('.openai/hosting.json','utf8'));assert(hosting.project_id);assert.equal(hosting.static.directory,'dist');
console.log(`PASS: ${count} JavaScript modules, imports, six sections, project route keys, assets, and hosting manifest.`);
await import('./motion-check.mjs');
