/* Raw source JSON remains unmodified. All derived fields are in-memory. */
export const clean = v => String(v ?? '').trim();
export const label = (a,lang='he') => clean(lang==='en'?a?.title_en||a?.title_he:a?.title_he||a?.title_en)||clean(a?.id);
export const esc = v => clean(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
export const year = a => {const y=Number(a?.year);return y>1800&&y<2100?y:null};
export const imageSrc = img => clean(img?.uri).split('?')[0];
export function parseMeta(caption){const m={};for(const p of clean(caption).split(/\s+\|\s+/)){const idx=p.indexOf(':');if(idx<0)continue;const k=p.slice(0,idx).trim(),v=p.slice(idx+1).trim();if(['Caption','Description','Scene','Objects','Vibe','People','Text','Actions'].includes(k))m[k]=v}return m;}
export function imageMeta(img){return img._meta||(img._meta=parseMeta(img.caption))}
export const tags=s=>clean(s).split(',').map(x=>x.trim().toLowerCase()).filter(Boolean);
export const primary=s=>clean(s).split(',')[0].replace(/\([^)]*\)/g,'').trim().toLowerCase()||'unknown';
export const place=s=>/\(indoor\)/i.test(clean(s))?'indoor':/\(outdoor\)/i.test(clean(s))?'outdoor':'unknown';
export const people=s=>{if(clean(s).includes('5+'))return 5;let m=clean(s).match(/\d+/);return m?Math.min(5,Number(m[0])):0};
export const wordCount=s=>clean(s).split(/\s+/).filter(Boolean).length;
export const searchText=img=>[img.caption,img.short_caption,img.ocr_text,img.ocr_translation].map(clean).join(' ').toLowerCase();
export function stats(docs){const ims=docs.flatMap(d=>d.images||[]);const n=ims.length,ocr=ims.filter(i=>clean(i.ocr_text)).length,words=ims.reduce((sum,i)=>sum+wordCount(i.short_caption||imageMeta(i).Caption),0);return {n,albums:docs.length,ocr,avg:n?words/n:0,metadata:ims.filter(i=>imageMeta(i).Scene).length}}
const STOP=new Set('the and with from this that there were which have their into among near over under above below photo photograph image shows showing depicts description caption scene object objects people person a an of is are in on at by for to it its or as be was he she they them his her one two three many some more also view background foreground left right center central appears visible including along across next several very black white color coloured picture photography israeli israel'.split(' '));
export function frequencies(ims,field='Objects',max=18){const counts=new Map();for(const i of ims){const m=imageMeta(i);const values=field==='words'?(clean(i.short_caption||m.Caption).toLowerCase().match(/[a-z]{4,}|[\u0590-\u05ff]{3,}/g)||[]).filter(x=>!STOP.has(x)):field==='Scene'?[primary(m.Scene)]:field==='Vibe'?[primary(m.Vibe)]:tags(m[field]);for(const t of values)counts.set(t,(counts.get(t)||0)+1)}return [...counts].sort((a,b)=>b[1]-a[1]).slice(0,max)}
export function imageOrder(docs){return docs.flatMap(d=>[...d.images].sort((a,b)=>(+a.image_num||0)-(+b.image_num||0)).map((image,j)=>({image,meta:imageMeta(image),album:d.album,albumId:d.album.id,page:+image.image_num||j+1,ordinal:j})));}
export async function loadAlbums(progress){let entries;
 if(Array.isArray(globalThis.__ALBUM_DATA__)){entries=globalThis.__ALBUM_DATA__}else{const r=await fetch('./data/albums_list.json');if(!r.ok)throw Error('Cannot load album manifest');const names=await r.json();entries=[];for(let s=0;s<names.length;s+=6){const d=await Promise.all(names.slice(s,s+6).map(async n=>{try{const r=await fetch('./data/'+encodeURIComponent(n));return r.ok?await r.json():null}catch{return null}}));entries.push(...d.filter(Boolean));progress?.(entries.length,names.length)}}
 return entries.map(d=>({...d,album:{...d.album,id:clean(d.album?.id)},images:(d.images||[]).sort((a,b)=>(+a.image_num||0)-(+b.image_num||0))})).sort((a,b)=>(year(a.album)||9999)-(year(b.album)||9999)||label(a.album).localeCompare(label(b.album),'he'));
}
export function csvDownload(rows,name){let s='\uFEFF'+rows.map(row=>row.map(v=>'"'+clean(v).replace(/"/g,'""')+'"').join(',')).join('\r\n');let u=URL.createObjectURL(new Blob([s],{type:'text/csv;charset=utf-8'}));let a=document.createElement('a');a.href=u;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(u),1200)}
export const fmt=(n,lang='he')=>Number(n||0).toLocaleString(lang==='he'?'he-IL':'en-US');
