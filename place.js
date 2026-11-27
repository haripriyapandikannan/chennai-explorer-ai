// Place detail page: shows ONLY one place
const id=new URLSearchParams(location.search).get("id"),p=P.find(x=>x.id==id)||P[0];
function render(){document.title=p.n+" | Chennai Explorer";$("back").href="category.html?c="+p.c;$("back").textContent="← "+cname(p.c);$("bt").textContent=p.n;
const nr=P.filter(x=>x.id!=p.id).map(x=>({x,d:km(p,x)})).sort((a,b)=>a.d-b.d);
const row=o=>`<a class="near" href="place.html?id=${o.x.id}"><div><b>${o.x.n}</b><br><small>${cname(o.x.c)} · ${o.x.a}</small></div><span>${o.d.toFixed(1)} km</span></a>`;
$("dt").innerHTML=`<div class="pi"><img src="images/places/${p.id}.jpg" alt="${p.n}" onerror="imgErr(this)"><button class="hb" onclick="toggleFav('${p.id}',this)">${isFav(p.id)?"♥":"♡"}</button></div><span class="pill">${cname(p.c)}</span><h1 style="margin:0">${p.n}</h1><div class="mt">${p.a}, Chennai · ${IN.has(p.c)||IN.has(p.id)?tr("inn"):tr("outt")}</div><p>${p.about}</p>
<div class="facts"><div class="fact"><b>${tr("fee")}</b>${p.fee}</div><div class="fact"><b>${tr("tm")}</b>${p.tm}</div><div class="fact"><b>${tr("best")}</b>${p.best}</div><div class="fact"><b>${tr("tip")}</b>${p.tip}</div></div>
<h4>${tr("todo")}</h4><ul>${p.do.map(d=>`<li>${d}</li>`).join("")}</ul><h4>${tr("reach")}</h4><div>${p.reach}</div>
<h4>${tr("nb")}</h4>${nr.filter(o=>o.x.c!="food").slice(0,4).map(row).join("")}<h4>${tr("nf")}</h4>${nr.filter(o=>o.x.c=="food").slice(0,2).map(row).join("")}
<a class="btn" style="margin-top:18px" target="_blank" rel="noopener" href="https://www.google.com/maps/search/?api=1&query=${p.la},${p.lo}">${tr("gm")}</a><p class="mt" style="margin-top:14px">${tr("appr")}</p>`}
window.onLang=render;applyLang();
