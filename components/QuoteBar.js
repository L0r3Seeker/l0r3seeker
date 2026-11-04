import {quotes,nextQuoteIndex} from '../data/quotes.js';
import {getLanguage,t} from '../i18n.js';
const refreshIcon='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true"><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.1 7a7 7 0 0 1 11.5-1L20 9M4 15l2.4 3A7 7 0 0 0 17.9 17"/></svg>';
export function QuoteBar(){
  const first=quotes[0];
  return `<div class="quote-bar" data-quote-index="0"><span class="quote-label">RANDOM QUOTE</span><p class="quote-line" aria-live="polite" aria-atomic="true"><q class="quote-text">${first.text}</q><a class="quote-source" href="${first.source}" target="_blank" rel="noopener noreferrer" title="Read the original source">— <span>${first.author}</span></a></p><button class="quote-refresh" aria-label="Show another quote" title="Show another quote">${refreshIcon}</button></div>`;
}
export function mountQuotes(){
  const bar=document.querySelector('.quote-bar'),button=bar.querySelector('.quote-refresh');let index=-1;
  function refresh(){index=nextQuoteIndex(index);const quote=quotes[index],zh=getLanguage()==='zh';bar.dataset.quoteIndex=String(index);bar.querySelector('.quote-text').textContent=zh?quote.zh:quote.text;const source=bar.querySelector('.quote-source');source.href=quote.source;source.title=t('Read the original source');source.querySelector('span').textContent=zh?quote.authorZh:quote.author;}
  button.addEventListener('click',refresh);refresh();return()=>button.removeEventListener('click',refresh);
}
