export const quotes = [
  {id:'huang-2023',author:'Jensen Huang',authorZh:'黄仁勋',text:'Run. Don’t walk.',zh:'奔跑吧，不要慢行。',source:'https://blogs.nvidia.com/blog/huang-ntu-commencement/',context:'National Taiwan University commencement, 2023'},
  {id:'musk-2014',author:'Elon Musk',authorZh:'埃隆·马斯克',text:"If something’s important enough you should try.",zh:'如果一件事足够重要，就应该去尝试。',source:'https://www.cbsnews.com/news/tesla-and-spacex-elon-musks-industrial-empire/',context:'CBS / 60 Minutes interview, 2014'},
  {id:'trump-2017',author:'Donald Trump',authorZh:'唐纳德·特朗普',text:'Nothing worth doing ever, ever, ever came easy.',zh:'任何值得做的事，都从来不会轻而易举。',source:'https://trumpwhitehouse.archives.gov/briefings-statements/remarks-president-trump-united-states-coast-guard-academy-commencement-ceremony/',context:'US Coast Guard Academy commencement, 2017'},
  {id:'buffett-2006',author:'Warren Buffett',authorZh:'沃伦·巴菲特',text:'Be fearful when others are greedy, and be greedy when others are fearful.',zh:'别人贪婪时恐惧，别人恐惧时贪婪。',source:'https://www.berkshirehathaway.com/letters/2006ltr.pdf',context:'Berkshire Hathaway shareholder letter, 2006'},
  {id:'jobs-2005',author:'Steve Jobs',authorZh:'史蒂夫·乔布斯',text:'Your time is limited, so don’t waste it living someone else’s life.',zh:'你的时间有限，不要把它浪费在过别人的生活上。',source:'https://news.stanford.edu/stories/2005/06/steve-jobs-2005-graduates-stay-hungry-stay-foolish',context:'Stanford commencement, 2005'},
  {id:'bezos-2010',author:'Jeff Bezos',authorZh:'杰夫·贝索斯',text:'Cleverness is a gift, kindness is a choice.',zh:'聪明是一种天赋，善良是一种选择。',source:'https://www.princeton.edu/news/2010/05/30/2010-baccalaureate-remarks',context:'Princeton Baccalaureate remarks, 2010'},
];
export function nextQuoteIndex(current, count=quotes.length, random=Math.random) {
  if(count<=1)return 0;
  const value=Math.max(0,Math.min(.999999999,random()));
  if(current<0||current>=count)return Math.floor(value*count);
  const candidate=Math.floor(value*(count-1));
  return candidate>=current?candidate+1:candidate;
}
