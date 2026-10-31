export const arrow = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 19 19 5M5 5h14v14" stroke="currentColor" stroke-width="1.4"/></svg>';
export const down = '<svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 3v17m-6-6 6 6 6-6" stroke="currentColor" stroke-width="1.3"/></svg>';
export const horizonMark = '<svg class="horizon-mark" viewBox="0 0 36 24" fill="none" aria-hidden="true"><path d="M2 17Q18 1 34 17M2 21h32" stroke="currentColor" stroke-width="1.2"/></svg>';
export function sectionLabel(number, text) { return `<div class="section-label"><span>${number}</span><span class="label-line"></span>${text}</div>`; }
export function placeholder(text = 'CONTENT TO COME') { return `<span class="placeholder"><span></span>${text}</span>`; }
