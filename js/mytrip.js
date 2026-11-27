// My Trip page: saved places (browser storage), route order, print / PDF
function render(){const it=getFav().map(id=>P.find(p=>p.id==id)).filter(Boolean);
$("list").innerHTML=it.length?it.map(p=>`<div class="box stop"><a href="place.html?id=${p.id}" style="flex:1"><b>${p.n}</b><div class="mt">${p.a} · ${cname(p.c)} · ${p.fee}</div></a><button class="chip noprint" onclick="rm('${p.id}')">${tr("remove")}</button></div>`).join("")+`<div class="box"><b>${tr("tot")}:</b> ₹${it.reduce((s,p)=>s+p.cost,0).toLocaleString("en-IN")} ${tr("perperson")}</div><div class="noprint" style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px"><button class="btn" onclick="route()">${tr("route")}</button><button class="btn" onclick="window.print()">${tr("pdf")}</button><button class="chip" onclick="clr()">${tr("clear")}</button></div>`:`<div class="box">${tr("mtempty")}</div>`}
function rm(id){setFav(getFav().filter(x=>x!=id));render()}
function clr(){setFav([]);render()}
function route(){let left=getFav().map(id=>P.find(p=>p.id==id)).filter(Boolean);if(!left.length)return;
let cur=left.shift();const out=[cur];while(left.length){left.sort((a,b)=>km(cur,a)-km(cur,b));cur=left.shift();out.push(cur)}
setFav(out.map(p=>p.id));render()}
window.onLang=render;applyLang();
