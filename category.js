// Category page: shows ONLY this category's places (or search results), with favourites.
const qs=new URLSearchParams(location.search),cat=qs.get("c"),sq=(qs.get("q")||"").toLowerCase();
const norm=s=>s.toLowerCase().replace(/[^a-z0-9]/g,"");
// Search: place / area / category text. If the text is an area (T. Nagar, Tambaram...), show places near it, nearest first.
function searchItems(){const nq=norm(qs.get("q")||"");if(!nq)return{list:[]};
const ar=AREAS.find(a=>[a.n,...a.k].some(x=>{x=norm(x);return x==nq||(nq.length>=4&&x.startsWith(nq))}));
if(ar){const all=P.map(p=>({...p,d:km(ar,p)})).sort((a,b)=>a.d-b.d);let r=all.filter(p=>p.d<=10);if(r.length<6)r=all.filter(p=>p.d<=18);if(r.length<3)r=all.slice(0,6);return{list:r.slice(0,20),area:ar.n}}
return{list:P.filter(p=>norm(p.n+p.a+cname(p.c)).includes(nq))}}
function render(){const sr=cat?null:searchItems(),it=cat?P.filter(p=>p.c==cat):sr.list;
const title=cat?cname(cat):tr("res")+": "+(qs.get("q")||"");
$("bt").textContent=title;document.title=title+" | Chennai Explorer";$("ttl").textContent=title+" ("+it.length+")";
$("pg").innerHTML=(sr&&sr.area?`<p class="mt" style="grid-column:1/-1;margin:0">${tr("srcnear")} <b>${sr.area}</b></p>`:"")+(it.length?it.map(p=>`<a class="pc" href="place.html?id=${p.id}"><div class="pi"><img src="images/places/${p.id}.jpg" alt="${p.n}" loading="lazy" onerror="imgErr(this)"><button class="hb" onclick="event.preventDefault();event.stopPropagation();toggleFav('${p.id}',this)">${isFav(p.id)?"♥":"♡"}</button></div><div class="pb"><span class="pill">${cname(p.c)}</span><h3>${p.n}</h3><div class="mt">${p.a} · ${p.fee}</div>${p.d!=null?`<div class="mt" style="color:var(--ac);font-weight:600">${p.d.toFixed(1)} km</div>`:""}<p>${p.about.slice(0,95)}...</p></div></a>`).join(""):`<p>${tr("none")}</p>`)}
window.onLang=render;applyLang();
