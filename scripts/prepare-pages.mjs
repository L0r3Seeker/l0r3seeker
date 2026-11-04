import {cp,mkdir,readdir,readFile,writeFile} from 'node:fs/promises';
import {resolve,extname} from 'node:path';

// Keep dist usable at localhost or a custom-domain root. Prefix only the copy.
const base=process.argv[2]??'/';
if(!/^\/(?:[A-Za-z0-9._-]+\/)*$/.test(base))throw new Error('Use a slash-delimited Pages base path');
const siteUrl=process.argv[3]??`https://l0r3seeker.vip${base}`;
const url=new URL(siteUrl);if(url.protocol!=='https:'||url.pathname!==base)throw new Error('URL must use HTTPS and match the base path');
const output=resolve('_site');await mkdir(output,{recursive:true});await cp('dist',output,{recursive:true});
async function rewrite(dir){for(const item of await readdir(dir,{withFileTypes:true})){if(item.name==='.git')continue;const path=resolve(dir,item.name);if(item.isDirectory()){await rewrite(path);continue;}if(!['.html','.css','.js','.json'].includes(extname(path)))continue;
  let text=await readFile(path,'utf8');
  text=text.replace(/(["'`(])\/(assets\/|styles\/|app\.js)/g,(_,quote,asset)=>`${quote}${base}${asset}`);
  text=text.replaceAll('https://l0r3seeker-beyond-horizon.l0r3seeker.chatgpt.site/assets/',`${siteUrl}assets/`).replaceAll('https://l0r3seeker-beyond-horizon.l0r3seeker.chatgpt.site',siteUrl);
  if(extname(path)==='.html')text=text.replace(/(<meta property="og:url" content=")[^"]*"/,`$1${siteUrl}"`).replace(/(<meta property="og:image" content=")[^"]*"/,`$1${siteUrl}assets/images/horizon-sunrise.webp"`);
  await writeFile(path,text);
}}
await rewrite(output);await writeFile(resolve(output,'.nojekyll'),'');
console.log(`Pages prepared in _site for ${siteUrl}`);
