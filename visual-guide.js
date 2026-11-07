'use strict';
// 图鉴框架：显示风格、脸型、发型、妆容、身材图片，点图放大，并可在报告里调用。
//
// 新增图片时不用改这个文件，只在对应的数据文件里加一条：
//   风格 → visual-style.js；脸型和五官 → visual-face.js；发型、妆容、身材 → visual-looks.js
//
// VISUAL_ITEMS.push({
//   group: 'hair',            // style / face / hair / makeup / body
//   type: 'blunt',            // 类型编号，见下面的 GUIDE_GROUPS
//   image: 'images/visual/looks/blunt-01.webp',  // 本地路径或网址；示意图可改用 svg
//   caption: '轻薄透额的齐刘海',  // 一句话说明这张图看什么
//   page: 'https://...',      // 来源链接
//   credit: '作者或署名'
// });
const VISUAL_ITEMS=[];
const GUIDE_STYLE_TYPES=[['girl','少女型'],['boy','少年型'],['elegant','优雅型'],['classic','古典型'],['natural','自然型'],['avant','前卫型'],['romantic','浪漫型'],['dramatic','戏剧型']];
const GUIDE_GROUPS=[
 {id:'style',name:'风格',types:GUIDE_STYLE_TYPES,desc:k=>`${STYLES[k].axis}。常见感觉：${STYLES[k].words.join('、')}。`},
 {id:'face',name:'脸型',types:[['oval','椭圆脸'],['round','圆脸'],['square','方脸'],['heart','心形脸'],['long','长脸']],desc:k=>GUIDE_FACE_TEXT[k]||''},
 {id:'hair',name:'发型',types:[['blunt','齐刘海'],['air','空气刘海'],['eight','八字刘海'],['nobang','无刘海'],['straight','直发'],['curly','卷发'],['black','黑发'],['brown','棕发']],desc:()=>''},
 {id:'makeup',name:'妆容',types:GUIDE_STYLE_TYPES,desc:k=>`重点：${STYLES[k].makeup.focus}`},
 {id:'body',name:'身材',types:[['pear','梨形'],['hourglass','曲线型'],['h','H 型'],['inverted','倒三角'],['apple','O 型']],desc:k=>`${BODY_SHAPES[k].desc}。`}
];
const GUIDE_FACE_TEXT={};
const GUIDE_OVERVIEW=4;
const guideEsc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// 风格图优先用精选图，再用现有博主图。每位博主轮流取一张，避免前几张都来自同一个人。
function guideBloggerItems(type){
 if(typeof GALLERY_BLOGGERS==='undefined')return [];
 const lists=GALLERY_BLOGGERS.filter(b=>b.style===type).map(b=>b.photos.map(p=>({group:'style',type,image:p.src,caption:p.title||'',page:p.note||b.profile,credit:`穿搭出自 @${b.name}`})));
 const out=[];
 for(let i=0;lists.some(l=>i<l.length);i++)lists.forEach(l=>{if(l[i])out.push(l[i]);});
 return out;
}
function guideItems(group,type){
 const own=VISUAL_ITEMS.filter(x=>x.group===group&&x.type===type);
 return group==='style'?own.concat(guideBloggerItems(type)):own;
}
function guideCard(x,i){
 const body=x.svg?`<span class="guide-svg">${x.svg}</span>`:`<img src="${guideEsc(x.image)}" loading="lazy" decoding="async" referrerpolicy="no-referrer" alt="${guideEsc(x.caption||x.credit||'图鉴图片')}">`;
 const key=`${guideEsc(x.group)}|${guideEsc(x.type)}|${i}`;
 return `<figure class="guide-card"><button type="button" class="guide-open" data-guide-item="${key}" aria-label="放大查看：${guideEsc(x.caption||x.credit||'图鉴图片')}">${body}</button><figcaption>${guideEsc(x.credit||x.caption)}</figcaption></figure>`;
}
function guideRow(group,type,name,limit){
 const items=guideItems(group.id,type),text=group.desc(type);
 const more=limit<items.length;
 const missing=items.some(x=>!x.svg)?'':`<p class="guide-empty">真实例图待补</p>`;
 return `<section class="guide-row"><div class="guide-row-head"><h3>${guideEsc(name)}</h3>${text?`<p>${guideEsc(text)}</p>`:''}</div><div class="guide-grid">${items.slice(0,limit).map(guideCard).join('')}</div>${missing}${more?`<button type="button" class="outline guide-more" data-guide-type="${type}">看全部 ${items.length} 张</button>`:''}</section>`;
}
let guideGroup='style',guideType='all';
function renderGuide(){
 const tabs=document.getElementById('guide-tabs'),types=document.getElementById('guide-types'),box=document.getElementById('guide-body');
 if(!tabs||!types||!box)return;
 const g=GUIDE_GROUPS.find(x=>x.id===guideGroup);
 tabs.innerHTML=GUIDE_GROUPS.map(x=>`<button type="button" data-guide-group="${x.id}" aria-pressed="${x.id===guideGroup}">${x.name}</button>`).join('');
 types.innerHTML=`<button type="button" data-guide-type="all" aria-pressed="${guideType==='all'}">全部对比</button>`+g.types.map(([k,n])=>`<button type="button" data-guide-type="${k}" aria-pressed="${k===guideType}">${n}</button>`).join('');
 const show=guideType==='all'?g.types:g.types.filter(([k])=>k===guideType);
 box.innerHTML=show.map(([k,n])=>guideRow(g,k,n,guideType==='all'?GUIDE_OVERVIEW:Infinity)).join('');
}
// 给报告调用：显示某一类的几张图；这一类还没有图时什么都不显示。
window.guideStrip=function(group,type,title){
 const g=GUIDE_GROUPS.find(x=>x.id===group);
 if(!g||!type)return '';
 const items=guideItems(group,type).slice(0,GUIDE_OVERVIEW);
 if(!items.length)return '';
 const name=(g.types.find(([k])=>k===type)||[])[1]||'';
 return `<div class="detail-block guide-strip"><h4>${guideEsc(title||`${g.name}图鉴：${name}`)}</h4><div class="guide-grid">${items.map(guideCard).join('')}</div></div>`;
};
function openGuideItem(key){
 const [group,type,i]=key.split('|');
 const x=guideItems(group,type)[Number(i)],d=document.getElementById('guide-viewer');
 if(!x||!d)return;
 const source=x.page?`<a class="text-link" href="${guideEsc(x.page)}" target="_blank" rel="noopener">打开来源</a>`:'';
 document.getElementById('guide-viewer-body').innerHTML=`${x.svg?`<span class="guide-svg">${x.svg}</span>`:`<img src="${guideEsc(x.image)}" referrerpolicy="no-referrer" alt="${guideEsc(x.caption||x.credit||'图鉴图片')}">`}<div class="guide-viewer-text">${x.caption?`<p>${guideEsc(x.caption)}</p>`:''}${x.credit?`<p class="quiet">${guideEsc(x.credit)}</p>`:''}${source}</div>`;
 if(d.showModal)d.showModal();else d.setAttribute('open','');
}
document.addEventListener('click',e=>{
 const open=e.target.closest('[data-guide-item]');
 if(open){openGuideItem(open.dataset.guideItem);return;}
 const tab=e.target.closest('[data-guide-group]');
 if(tab){guideGroup=tab.dataset.guideGroup;guideType='all';renderGuide();return;}
 const type=e.target.closest('[data-guide-type]');
 if(type){guideType=type.dataset.guideType;renderGuide();document.getElementById('guide-types')?.scrollIntoView({block:'nearest'});return;}
 if(e.target.closest('#guide-viewer-close')||e.target.id==='guide-viewer')document.getElementById('guide-viewer')?.close();
});
document.addEventListener('DOMContentLoaded',renderGuide);
