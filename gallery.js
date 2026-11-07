'use strict';
// 博主穿搭图库：按八种风格展示博主的真实穿搭，每张图下方标出处，点图打开小红书原帖。
(function(){
 if(typeof GALLERY_BLOGGERS==='undefined')return;
 const NAMES={girl:'少女型',boy:'少年型',elegant:'优雅型',classic:'古典型',natural:'自然型',avant:'前卫型',romantic:'浪漫型',dramatic:'戏剧型'};
 const ORDER=['girl','boy','elegant','classic','natural','avant','romantic','dramatic'];
 const FIRST=8;
 const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
 const total=GALLERY_BLOGGERS.reduce((t,b)=>t+b.photos.length,0);
 let current='all';

 function look(b,p,hidden){
  const href=p.note||b.profile;
  return `<figure class="look"${hidden?' hidden':''}><a href="${href}" target="_blank" rel="noopener" title="${esc(p.title||'打开小红书原帖')}"><img src="${p.src}" loading="lazy" decoding="async" width="${p.w}" height="${p.h}" alt="${esc(NAMES[b.style])}穿搭参考，出自博主 ${esc(b.name)}${p.title?'：'+esc(p.title):''}"></a><figcaption>穿搭出自 <a href="${b.profile}" target="_blank" rel="noopener">@${esc(b.name)}</a></figcaption></figure>`;
 }
 function bloggerHead(b){
  const meta=[b.fans?`${b.fans} 粉丝`:'',b.redId?`小红书号 ${esc(b.redId)}`:''].filter(Boolean).join(' · ');
  return `<div class="blogger-head"><div><h4>@${esc(b.name)}</h4><p class="quiet">${meta?meta+' · ':''}${b.sub?esc(b.sub)+' · ':''}${b.recommendedBy==='本项目选材'?'本项目对本套服装的解读：'+NAMES[b.style]:'由形象分析师「'+esc(b.recommendedBy)+'」推荐为'+NAMES[b.style]}</p></div><a class="button small" href="${b.profile}" target="_blank" rel="noopener">去小红书看这位博主的穿搭</a></div>`;
 }
 function bloggerBlock(b){
  const more=b.photos.length-FIRST;
  return `<article class="blogger" data-blogger="${b.id}">${bloggerHead(b)}<div class="look-grid">${b.photos.map((p,i)=>look(b,p,i>=FIRST)).join('')}</div>${more>0?`<button type="button" class="outline more-looks" data-more="${b.id}">再看 ${more} 套</button>`:''}</article>`;
 }
 function styleBlock(style){
  const list=GALLERY_BLOGGERS.filter(b=>b.style===style);
  if(!list.length)return '';
  const n=list.reduce((t,b)=>t+b.photos.length,0);
  return `<section class="style-shelf" data-style="${style}"><div class="shelf-head"><h3>${NAMES[style]}</h3><p>${list.length} 位博主 · ${n} 套穿搭 · 常见说法：${esc(GALLERY_STYLE_WORDS[style]||'')}</p></div>${list.map(bloggerBlock).join('')}</section>`;
 }
 function render(){
  const box=document.getElementById('blogger-gallery');
  if(!box)return;
  const styles=current==='all'?ORDER:[current];
  box.innerHTML=styles.map(styleBlock).join('');
  document.querySelectorAll('#blogger-filters button').forEach(btn=>btn.setAttribute('aria-pressed',String(btn.dataset.style===current)));
 }
 function filters(){
  const box=document.getElementById('blogger-filters');
  if(!box)return;
  box.innerHTML=`<button type="button" data-style="all" aria-pressed="true">全部风格</button>`+ORDER.filter(s=>GALLERY_BLOGGERS.some(b=>b.style===s)).map(s=>`<button type="button" data-style="${s}" aria-pressed="false">${NAMES[s]}</button>`).join('');
 }
 function showStyle(style,scroll){
  current=style;render();
  if(scroll){const sec=document.getElementById('bloggers');if(sec)sec.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
 }
 // 测试报告里调用：先给同风格的明星参考，排在博主前面。还没录入明星的风格不显示这一块。
 window.celebrityStrip=function(style){
  const list=(typeof CELEBRITIES!=='undefined'&&CELEBRITIES[style])||[];
  if(!list.length)return '';
  const cards=list.map(c=>`<div class="strip-blogger"><p><strong>${esc(c.name)}</strong></p>${(c.looks||[]).length?`<div class="strip-looks">${c.looks.map(l=>`<figure class="look"><a href="${esc(l.page)}" target="_blank" rel="noopener"><img src="${esc(l.image)}" loading="lazy" referrerpolicy="no-referrer" alt="${esc(c.name)}的${esc(l.type)}造型照片"></a><figcaption>${esc(l.type)} · ${esc(l.credit)}</figcaption></figure>`).join('')}</div>`:''}<p>${esc(c.why)}</p><p class="quiet">归类出处：<a href="${esc(c.sourceUrl)}" target="_blank" rel="noopener">${esc(c.source)}</a></p></div>`).join('');
  return `<div class="detail-block blogger-strip"><h4>先看明星：可以参考的${NAMES[style]}造型</h4><p class="quiet">这是对公开造型的风格参考，属于编辑或原作者的观点，不是对明星本人的诊断。</p>${cards}</div>`;
 };
 // 测试报告里调用：列出主风格的博主和几张缩略图，再提一句次风格。
 window.bloggerStrip=function(style,second){
  const list=GALLERY_BLOGGERS.filter(b=>b.style===style);
  if(!list.length)return '';
  const alt=GALLERY_BLOGGERS.filter(b=>b.style===second);
  const cards=list.map(b=>`<div class="strip-blogger"><p><strong>@${esc(b.name)}</strong>${b.fans?` <span class="quiet">${b.fans} 粉丝</span>`:''}</p><div class="strip-looks">${b.photos.slice(0,4).map(p=>look(b,p,false)).join('')}</div><p class="strip-links"><a href="${b.profile}" target="_blank" rel="noopener">去小红书关注博主、看穿搭视频</a><a href="#bloggers" data-go-style="${style}">在本站看这位博主全部 ${b.photos.length} 套</a></p></div>`).join('');
  return `<div class="detail-block blogger-strip"><h4>跟着学：和你同为${NAMES[style]}的博主</h4><p class="quiet">先挑一位最像你的博主关注，参考这位博主的单品和搭配试一周。点图可打开原帖；新增选材用于项目演示，署名与来源逐图保留。</p>${cards}${alt.length?`<p class="quiet">你也兼有${NAMES[second]}的特点，可以看看：${alt.map(b=>`<a href="#bloggers" data-go-style="${second}">@${esc(b.name)}</a>`).join('、')}</p>`:''}</div>`;
 };
 document.addEventListener('click',e=>{
  const f=e.target.closest('#blogger-filters button');
  if(f){showStyle(f.dataset.style,false);return;}
  const m=e.target.closest('.more-looks');
  if(m){const art=m.closest('.blogger');art.querySelectorAll('.look[hidden]').forEach(x=>x.hidden=false);m.remove();return;}
  const g=e.target.closest('[data-go-style]');
  if(g){e.preventDefault();showStyle(g.dataset.goStyle,true);}
 });
 const count=document.getElementById('blogger-count');
 if(count)count.textContent=`${GALLERY_BLOGGERS.length} 位博主 / ${total} 套真实穿搭`;
 filters();render();
})();
