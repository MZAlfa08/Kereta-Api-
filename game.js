const $=id=>document.getElementById(id),cv=$('c'),XM=cv.getContext('2d',{alpha:false});let x=XM,OFFC=null,OFX=null;
const SP=200,hs=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const NM=['Jakarta Kota','Manggarai','Gambir','Jatinegara','Bekasi','Cikarang','Karawang','Cikampek','Purwakarta','Padalarang','Bandung','Cirebon','Semarang Tawang','Yogyakarta','Solo Balapan','Madiun','Surabaya Gubeng'];
const TR=[
{n:'KA Lokal Bandung Raya',s:'Lokomotif CC 201 (GE U18C) + gerbong ekonomi',p:0,v:170,a:2.2,b:3,m:1,k:'loco',lv:{pat:'cg',u:'#efe3c4',bd:'#1f4d2a',st:'#2e6b3a',st2:'#d4af37',r:'#c62828',no:'CC 201 89 16',ty:-20},c1:'#2e6b3a',cb:'#efe3c4',c2:'#d4af37',c3:'#1f4d2a',cars:['cc','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Bima',s:'Lokomotif CC 203 + gerbong eksekutif',p:1500,v:180,a:2.3,b:3.1,m:1.4,k:'loco',lv:{pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#f57c00',st2:'#1b4f9c',r:'#c62828',no:'CC 203 04 25',ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#f57c00',c3:'#1b4f9c',cars:['cc','eks','eks','eks','res','eks','eks','bag']},
{n:'Kereta Uap Jaladara',s:'Lokomotif uap + gerbong kayu',p:2500,v:120,a:1.6,b:2.5,m:2,k:'steam',c1:'#212121',cb:'#2e7d32',c2:'#fdd835',cars:['uap','tdr','kay','kay','kay','kay','kay','kay']},
{n:'KA Taksaka',s:'Lokomotif CC 204 + gerbong eksekutif',p:4000,v:190,a:2.4,b:3.3,m:1.8,k:'loco',lv:{pat:'bw',u:'#f3f6f8',bd:'#1b4f9c',st:'#1b4f9c',st2:'#0d2f66',r:'#c62828',no:'CC 204 13 12',ty:-25},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#1b4f9c',c3:'#0d2f66',cars:['cc','eks','eks','eks','eks','res','eks','bag']},
{n:'LRT Jabodebek',s:'Inka-Bombardier',p:6000,v:160,a:2.7,b:3.4,m:1.7,k:'mrt',nz:3,c1:'#fafafa',c2:'#29b6f6',c3:'#ff7043',cars:['ec','em','em','em','em','em','em','ec']},
{n:'KA Argo Bromo Anggrek',s:'Lokomotif CC 206 + gerbong eksekutif',p:8000,v:220,a:2.6,b:3.5,m:2.2,k:'loco',lv:{pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#e64a19',st2:'#9e9e9e',r:'#c62828',no:'CC 206 13 41',ty:-24},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#e64a19',c3:'#9e9e9e',cars:['cc','eks','eks','eks','res','eks','eks','bag']},
{n:'Kereta Cepat Whoosh',s:'KCIC400AF',p:12000,v:400,a:3.6,b:4.6,m:3,k:'bullet',c1:'#fafafa',c2:'#d32f2f',c3:'#ffc107',cars:['bh','bm','bm','bm','bm','bm','bm','bh']},
{n:'KA Barang Peti Kemas',s:'Lokomotif CC 206 + gerbong barang',p:3500,v:130,a:1.8,b:2.4,m:2.6,k:'loco',lv:{pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#e64a19',st2:'#9e9e9e',r:'#c62828',no:'CC 206 13 77',ty:-24},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#e64a19',c3:'#9e9e9e',cars:['cc','ctn','ctn','tgk','tgk','bk','bk','brg']}];
let S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:0};
try{Object.assign(S,JSON.parse(localStorage.getItem('kn1')||'{}'))}catch(e){}
S.cons=S.cons||{};S.own=S.own.filter(i=>i<TR.length);if(!S.own.includes(0))S.own.push(0);if(!TR[S.sel]||!S.own.includes(S.sel))S.sel=0;
const sv=()=>{try{localStorage.setItem('kn1',JSON.stringify(S))}catch(e){}};
const DF=[.6,1,1.6],DN=['MUDAH','NORMAL','SULIT'],TN=['☀ SIANG','🌇 SORE','🌙 MALAM'];
let W,H,u,G={m:'menu',pos:0,v:10,r:{st:[],sg:[],cx:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0},tm=0,K={},th=0,bk=0,em=0,DPRv=1,ck="",REC=null,MIR=0,PPL=false,WPH=null,GK="",dtS=.016,SPR={};
function rs(){const d=Math.max(1,Math.min(Math.max(devicePixelRatio||1,1.5),2.5,Math.sqrt(8e6/(innerWidth*innerHeight))));W=innerWidth;H=innerHeight;DPRv=d;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);x.imageSmoothingEnabled=true;x.imageSmoothingQuality="high";u=Math.max(.5,Math.min(H/600,W/760));OFFC=null}
addEventListener('resize',rs);rs();
function toast(m){const e=$('toast');e.textContent=m;e.classList.remove('sh');void e.offsetWidth;e.classList.add('sh')}
/* screens */
function show(id){document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id==id))}
function hud(on){$('hud').classList.toggle('on',on);$('ctl').classList.toggle('on',on)}
function toMenu(){hornOff();S.hi=Math.max(S.hi,Math.floor(G.sc||0));sv();G={m:'menu',pos:0,v:10,r:{st:[],sg:[],cx:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0};hud(0);$('mi').textContent='🪙 '+S.coin+'  •  🏆 Skor Tertinggi '+S.hi;show('menu')}
/* level */
function more(r,n){const t=TR[S.sel],f=.8+t.v/400,sc=Math.max(1,t.v/200),L=[90,120,160,200,250,300,350];
 for(let k=0;k<n;k++){const i=r.st.length,p=r.st[i-1],mx=Math.min(1+Math.floor(i/3),6),pk=()=>L[Math.floor(Math.random()*(mx+1))],b=p.x+(2800+hs(i*9)*800+Math.min(i,20)*60)*f,a=p.x+SP+40;
  r.st.push({x:b,nm:NM[i%NM.length],done:0,sty:Math.random()*5|0,pal:Math.random()*5|0});
  r.sg.push({x:a,l:pk()},{x:a+(b-a)*.35,l:pk()},{x:b-1000*sc,l:120},{x:b-550,l:100},{x:b-300,l:90});
  const x1=Math.min(a+(b-a)*.5,b-1000*sc-300);if(x1>a+500&&Math.random()<.8)r.cx.push({x:x1,ck:Math.random()<.55,a:0,veh:[],sp:0,hn:0,hh:0,w:0,pass:0})}}
function gen(){const r={st:[{x:0,nm:NM[0],done:1,sty:0,pal:0}],sg:[],cx:[]};more(r,3);return r}
function newLevel(){G.r=gen();G.pos=SP;G.v=0;G.ni=1;G.dw=0;G.ts=0;th=bk=em=0;G.dg=0;G.es=0;G.et=0;G.kb=0;G.sq=[];G.lt=0;G.lh=0;G.m='play';G.pf=[];show(null);hud(1);toast('Tekan MULAI MESIN (E) → '+G.r.st[1].nm)}
function startGame(){G={m:'play',pos:0,v:0,lv:1,sc:0,cg:0,pf:[],lp:0};newLevel()}
const limAt=p=>{let l=90;for(const s of G.r.sg)if(s.x<=p)l=s.l;return l};
function pz(){if(G.m=='play'){G.m='pause';hornOff();sv();show('pause')}else if(G.m=='pause'){G.m='play';show(null)}}
/* perlintasan kereta api: palang, lampu, lonceng, dan kendaraan */
const PAL=['#e53935','#1e88e5','#fdd835','#43a047','#8e24aa','#fb8c00','#eceff1'];
function cxT(){const gy=H*.72,sp=(H-gy)+76*u;return{sp,tt:26*u/sp,tb:12*u/sp,tf:60*u/sp,y0:gy-26*u,gy}}
const hw=(y,gy)=>20*u+(y-gy+26*u)*.3;
const nextCx=()=>G.r.cx&&G.r.cx.find(c=>!c.pass&&c.x>G.pos&&c.x-G.pos<Math.max(700,G.v*12));
function traf(c,dt,T){
 if(Math.abs(c.x-G.pos)>600){c.veh=c.veh.filter(v=>v.hz);return}
 c.sp-=dt;if(c.sp<=0&&c.veh.length<8){const l=Math.random()<.5?0:1;if(!c.veh.some(v=>v.l==l&&(l?v.t>.9:v.t<.1)))c.veh.push({l,t:l?1.05:-.04,ty:['mtr','mtr','car','ang','trk','bus'][Math.random()*6|0],col:PAL[Math.random()*7|0],v:.16+Math.random()*.1});c.sp=.4+Math.random()*1.2}
 c.veh.forEach(v=>{
  if(v.hz){if(v.st=='go'){v.t-=v.v*dt;if(v.t<=T.tt){v.t=T.tt;v.st='stall'}}else if(v.st=='flee')v.t+=v.v*1.6*dt;return}
  let nt=v.t+(v.l?-1:1)*v.v*dt;
  if(c.a>.4){if(!v.l&&v.t<=T.tb-.03)nt=Math.min(nt,T.tb-.03);if(v.l&&v.t>=T.tf+.03)nt=Math.max(nt,T.tf+.03)}
  c.veh.forEach(o=>{if(o!==v&&o.l==v.l){if(!v.l&&o.t>v.t)nt=Math.min(nt,o.t-.1);if(v.l&&o.t<v.t)nt=Math.max(nt,o.t+.1)}});
  v.t=nt});
 c.veh=c.veh.filter(v=>v.t>-.1&&v.t<1.12)}
function xing(dt,len){const T=cxT();
 for(const c of G.r.cx){const d=c.x-G.pos,warn=Math.max(700,G.v*12),act=d<warn&&!(G.pos-len>c.x+8);
  if(G.pos-len>c.x+8)c.pass=1;c.a+=((act?1:0)-c.a)*Math.min(1,dt*2.5);
  if(d>0&&d<warn){if(!c.w){c.w=1;toast('🚧 PERLINTASAN! Tahan KLAKSON')}c.hh=HD?c.hh+dt:0;if(c.hh>.8&&!c.hn){c.hn=1;G.sc+=150*G.lv;toast('Klakson perlintasan! +'+150*G.lv)}}
  if(act&&Math.abs(d)<450){G.bt=(G.bt||0)-dt;if(G.bt<=0){bell();G.bt=.45}}
  traf(c,dt,T);
  if(c.ck&&!c.hz&&!c.hn&&d>0&&d<Math.max(220,G.v*9+60)){c.hz={l:1,t:T.tf+.03,ty:'car',col:'#fdd835',st:'go',hz:1,v:.3};c.veh.push(c.hz)}
  if(c.hn&&c.hz&&c.hz.st!='flee')c.hz.st='flee';
  if(c.hz&&c.hz.st!='flee'&&c.hz.t<=T.tt+.08&&G.pos>=c.x-1&&G.pos-len<=c.x){G.sc=Math.max(0,G.sc-500);G.v*=.4;c.hz.st='flee';toast('💥 Menabrak kendaraan! -500');bad()}}}
/* update */
const segT=i=>{const t=TR[S.sel],r=G.r.st,par=(r[i].x-r[i-1].x-SP)/(Math.min(t.v,200)*.6/3.6);return(par*1.5+20)/Math.sqrt(DF[S.df])};
function phys(dt,t,mv,N){const kb=G.kb>0,mve=mv*(kb?1.25:1);
 if(G.dw>0){G.v=0;G.dw-=dt;if(G.dw<=0){G.dw=0;toast('Berangkat! 🚆');G.ts=0}}
 else{
  let a=N>0?t.a*(kb?2:1)*(N/8-G.v/mve):-(.05+.25*t.a*G.v/mv);if(N>0&&a<0)a*=.3;a-=GRAV*hillSlope(G.pos-30);
  a-=em?t.b*1.7:t.b*bk/5;
  G.v=Math.max(0,Math.min(mve,G.v+a*dt));G.pos+=G.v*dt;G.ts+=dt;G.ac=a}
 const kmh=G.v*3.6,L=limAt(G.pos);G.ov=kmh>L+3;
 if(G.ov)G.sc=Math.max(0,G.sc-dt*15*G.lv*DF[S.df]);
 if(kmh>L+25){if(!G.dg)toast('⚠ TERLALU CEPAT!');G.dg+=dt;G.sc=Math.max(0,G.sc-dt*60*DF[S.df])}else G.dg=Math.max(0,G.dg-dt*2);
 G.sc+=G.v*dt*.1*G.lv;G.dk=(G.dk||0)+G.v*dt;if(G.dk>=100){G.dk-=100;G.sc+=50;S.coin+=50;G.cg+=50;(G.fx=G.fx||[]).push({t:tm});tone(1300,.09,'sine',.06);sv()}
 const s=G.r.st[G.ni],len=trLen(t)/3.67;
 if(G.ni>=G.r.st.length-1)more(G.r,3);
 if(xing(dt,len))return;
 if(s&&G.dw<=0){
  if(G.v<.4&&G.pos>=s.x+len&&G.pos<=s.x+SP+5){
   const err=Math.abs(G.pos-(s.x+SP-5)),pts=err<4*(2-DF[S.df]/1.6)?300:err<12?200:100,pr=G.r.st[G.ni-1],
   par=(s.x-pr.x-SP)/(Math.min(t.v,200)*.6/3.6),tb=Math.max(0,Math.round((par*1.2-G.ts)*3)),cc=900;
   G.sc+=(pts+tb)*G.lv;S.coin+=cc;G.cg+=cc;s.done=1;G.ni++;G.v=0;G.dw=3;
   toast((pts==300?'SEMPURNA! ':pts==200?'BAGUS! ':'OKE! ')+'+'+(pts+tb)*G.lv+' • +900 🪙');ding();sv()}
  else if(G.pos>s.x+SP+5){G.sc=Math.max(0,G.sc-200*G.lv);s.done=1;G.ni++;toast('KELEWATAN! -'+200*G.lv);bad()}}
 return 1}
function startEng(){if(G.m!='play'||G.es)return;G.es=1;G.et=2.2;crank();toast('Menyalakan mesin…');for(let i=0;i<4;i++)G.pf.push({x:G.pos-(TR[S.sel].k=='steam'?2.3:10.4)+i*.4,a:-i*.15,cl:'70,70,70',by:TR[S.sel].k=='steam'?50:47})}
function stopEng(){if(G.m!='play'||G.es!=2)return;if(G.v>1.5){toast('Hentikan kereta dulu!');return}th=0;G.es=0;G.kb=0;engStop();toast('Mesin dimatikan')}
function upd(dt){
 const t=TR[S.sel],mv=t.v/3.6,pl=G.m=='play',run=G.es==2,N=(run&&!(bk>0||em))?th:0;
 if(pl&&G.es==1){G.et-=dt;if(G.et<=0){G.es=2;toast('Mesin hidup ✔')}}
 if(G.kb>0){G.kb-=dt;if(G.kb<=0){G.kb=0;toast('Kobong padam')}}
 if(pl&&run){if(th!==G.lt){G.lt=th;G.lh=0}else{G.lh+=dt;if(G.lh>.3&&G.sq[G.sq.length-1]!==th){G.sq.push(th);G.sqt=tm}}
  if(G.sq.length&&tm-G.sqt>10)G.sq=[];if(G.sq.slice(-4).join('')=='2418'){G.sq=[];G.kb=10;boom();toast('🔥 KOBONG!')}}
 const sy=t.k=='steam',dz=t.k=='loco';
 if((sy||dz)&&(G.m=='menu'||(pl&&run))&&tm-G.lp>(sy?.09:.13)&&(sy?(G.v>0||G.m=='menu'):(N>0||G.m=='menu'))){G.lp=tm;G.pf.push(sy?{x:G.pos-2.3,a:0}:{x:G.pos-10.4,a:0,cl:'60,60,60',by:47})}
 G.pf.forEach(p=>p.a+=dt);G.pf=G.pf.filter(p=>p.a<2);
 if(G.m=='menu'||G.m=='play'){ai(dt);traf2(dt)}
 if(G.m=='menu'){G.pos+=25*dt;G.v=25}else if(pl&&!phys(dt,t,mv,N))return;
 if(G.m=='menu'||pl){G.cd=(G.cd||0)+G.v*dt;if(G.cd>=12){G.cd-=12;clack(G.v/mv)}if(sy&&(run||G.m=='menu')){G.cs=(G.cs||0)+G.v*dt;if(G.cs>=4){G.cs-=4;chuff(G.v/mv)}}}
 const esv=G.m=='menu'?1:G.es==2?(G.kb>0?1.7:1):G.es==1?Math.min(1,Math.max(0,(2.2-G.et)/2.2)):0;
 eng(G.m=='menu'||pl,G.v/mv,N/8,em?1.4:bk/5,t.k,esv)}

/* drawing */
const LEN={cc:60,uap:66,tdr:40,kay:58,ec:66,em:66,bh:70,bm:66,eko:64,eks:66,res:66,bag:58,brg:60,tgk:60,ctn:64,bk:58},FR=["brg","tgk","ctn","bk"];
const CONS={eko:['eko','eko','eko','eko','eko','eko','bag'],eks:['eks','eks','eks','res','eks','eks','bag'],mix:['eks','eks','res','eko','eko','eko','bag'],kay:['kay','kay','kay','kay','kay','kay','kay'],ctn:['ctn','ctn','ctn','ctn','ctn','ctn','ctn'],tgk:['tgk','tgk','tgk','tgk','tgk','tgk','tgk'],btb:['bk','bk','bk','bk','bk','bk','bk'],brg:['brg','ctn','tgk','bk','brg','ctn','tgk']},CN={eko:'Ekonomi',eks:'Eksekutif',mix:'Campuran',kay:'Wisata Kayu',ctn:'Barang: Peti Kemas',tgk:'Barang: Tangki BBM',btb:'Barang: Batu Bara',brg:'Barang: Campuran'};
function carsOf(t){if(t.pv)return t.cars;const i=TR.indexOf(t),c=S.cons&&S.cons[i];if(!c||!CONS[c]||!(t.k=='loco'||t.k=='steam'))return t.cars;return t.k=='steam'?['uap','tdr',...CONS[c].slice(1)]:['cc',...CONS[c]]}
/* pelebaran badan lokomotif & gerbong (1 = ukuran asli); lokomotif uap tidak dilebarkan */
const STRF=1.3,fo=ty=>ty=='uap'||ty=='tdr'?1:STRF;let STX=0,STF=1;
const trLen=t=>carsOf(t).reduce((s,c)=>s+LEN[c]*fo(c)+3,0);
function atSt(){return G.r.st.some(s=>G.pos>=s.x+5&&G.pos<=s.x+SP+20)}
function canSwap(){const t=TR[S.sel];return G.m=='play'&&(t.k=='loco'||t.k=='steam')&&G.v<.5&&atSt()}
function openSwap(){if(!canSwap()){toast('Berhenti di stasiun dulu (hanya lokomotif berasap)');return}G.m='swap';hornOff();const t=TR[S.sel],gg=$('gg');gg.innerHTML='';
 Object.keys(CONS).forEach(id=>{const d=document.createElement('div');d.className='cd';d.innerHTML='<canvas width="270" height="76"></canvas><b>'+CN[id]+'</b><small>'+(S.cons[S.sel]==id?'Sedang dipakai':(t.k=='steam'?6:7)+' gerbong')+'</small><button class="b sm bl">PILIH</button>';
  const c=d.querySelector('canvas').getContext('2d'),t2=Object.assign({},t,{pv:1,cars:t.k=='steam'?['uap','tdr',...CONS[id].slice(1)]:['cc',...CONS[id]]});
  c.fillStyle='#8d7b68';c.fillRect(0,68,270,8);c.fillStyle='#cfd8dc';c.fillRect(0,66,270,2);drawTrain(c,t2,236,66,Math.min(.55,235/trLen(t2)),0);
  d.querySelector('button').onclick=()=>{S.cons[S.sel]=id;sv();G.m='play';G.dw=Math.max(G.dw,2);show(null);toast('Gerbong diganti: '+CN[id])};gg.appendChild(d)});show('swap')}
function sh(h,a){const n=parseInt(h.slice(1),16),f=a<0?0:255,p=Math.abs(a),m=v=>Math.round(v+(f-v)*p);return`rgb(${m(n>>16)},${m(n>>8&255)},${m(n&255)})`}
function fg(c,y0,h,col){const g=c.createLinearGradient(0,y0,0,y0+h);g.addColorStop(0,sh(col,.45));g.addColorStop(.35,col);g.addColorStop(1,sh(col,-.3));c.fillStyle=g;c.fill()}
function body(c,xl,y0,L,h,r,col){c.beginPath();c.roundRect(xl,y0,L,h,r);fg(c,y0,h,col)}
function win(c,x0,y,w,h,ng,r){r=r||1.5*u;const g=c.createLinearGradient(0,y,0,y+h);
 if(ng){g.addColorStop(0,'#fff3b0');g.addColorStop(1,'#ffb74d')}else{g.addColorStop(0,'#78a6c9');g.addColorStop(.5,'#2f536f');g.addColorStop(1,'#10202e')}
 c.fillStyle='rgba(10,16,22,.85)';c.beginPath();c.roundRect(x0-.6*r,y-.6*r,w+1.2*r,h+1.2*r,r*1.3);c.fill();
 c.fillStyle=g;c.beginPath();c.roundRect(x0,y,w,h,r);c.fill();
 c.save();c.beginPath();c.roundRect(x0,y,w,h,r);c.clip();
 if(PPL&&w>h*.62){c.fillStyle=ng?'rgba(60,35,10,.65)':'rgba(8,14,20,.55)';[.3,.68].forEach((q,i)=>{if(hs(x0*.173+i)>.35){const px=x0+w*q,pr=h*.15;c.beginPath();c.arc(px,y+h*.5,pr,0,7);c.fill();c.beginPath();c.roundRect(px-pr*1.5,y+h*.5+pr*.7,pr*3,h*.5,pr);c.fill()}})}
 if(!ng){c.fillStyle='rgba(255,255,255,.22)';c.beginPath();c.moveTo(x0,y+h);c.lineTo(x0+w*.45,y);c.lineTo(x0+w*.72,y);c.lineTo(x0+w*.27,y+h);c.fill()}
 c.restore()}
function bogie(c,cx,gy,k,n){c.save();c.translate(cx,0);c.scale(1/STF,1);c.translate(-cx,0);bogie0(c,cx,gy,k,n);c.restore()}
function bogie0(c,cx,gy,k,n){c.fillStyle='#263238';c.beginPath();c.roundRect(cx-(n*4.5+1)*k,gy-10*k,(n*9+2)*k,5*k,2*k);c.fill();c.fillStyle='#455a64';c.fillRect(cx-n*4.5*k,gy-10*k,n*9*k,1.2*k);c.strokeStyle='#90a4ae';c.lineWidth=.7*k;[-1,1].forEach(d=>{c.beginPath();c.moveTo(cx+d*n*3*k,gy-13*k);c.lineTo(cx+d*n*3*k,gy-10*k);c.stroke()});if(REC){{const rx=STX+(cx-STX)*STF;REC.push([MIR?MIR-rx:rx,n])}return}wheels(c,cx,gy,k,n)}
function wheels(c,cx,gy,k,n){for(let i=0;i<n;i++){const wx=cx+(i-(n-1)/2)*9*k,r=4.6*k,a=(WPH==null?G.pos:WPH)*.9,wy=gy-r;
 c.fillStyle='#0d0d0d';c.beginPath();c.arc(wx,wy,r,0,7);c.fill();c.strokeStyle='#5a666d';c.lineWidth=.9*k;c.beginPath();c.arc(wx,wy,r*.9,0,7);c.stroke();
 const gg=c.createRadialGradient(wx-r*.2,wy-r*.2,0,wx,wy,r*.62);gg.addColorStop(0,'#b0bec5');gg.addColorStop(1,'#546e7a');c.fillStyle=gg;c.beginPath();c.arc(wx,wy,r*.62,0,7);c.fill();
 c.fillStyle='#37474f';c.beginPath();c.arc(wx,wy,r*.42,0,7);c.fill();
 c.globalAlpha=Math.max(0,1-G.v/22);c.strokeStyle='#cfd8dc';c.lineWidth=k*.7;c.beginPath();for(let s=0;s<3;s++){const b=a+s*Math.PI/3;c.moveTo(wx+Math.cos(b)*r*.55,wy+Math.sin(b)*r*.55);c.lineTo(wx-Math.cos(b)*r*.55,wy-Math.sin(b)*r*.55)}c.stroke();c.globalAlpha=1;
 c.fillStyle='#eceff1';c.beginPath();c.arc(wx,wy,r*.16,0,7);c.fill()}}
function steamL(c,xl,xr,gy,k){
 const bg=c.createLinearGradient(0,gy-35*k,0,gy-9*k);bg.addColorStop(0,'#555');bg.addColorStop(.3,'#1d1d1d');bg.addColorStop(1,'#050505');
 c.fillStyle='#2a2a2a';c.fillRect(xl+3*k,gy-40*k,19*k,32*k);c.fillStyle='#b71c1c';c.beginPath();c.roundRect(xl,gy-46*k,25*k,7*k,2*k);c.fill();win(c,xl+8*k,gy-34*k,9*k,11*k,0,k);
 c.fillStyle=bg;c.beginPath();c.roundRect(xl+21*k,gy-35*k,43*k,26*k,10*k);c.fill();
 c.fillStyle='#ffb300';c.fillRect(xl+26*k,gy-35*k,2*k,26*k);c.fillRect(xl+44*k,gy-35*k,2*k,26*k);
 c.fillStyle='#111';c.fillRect(xr-13*k,gy-46*k,6*k,14*k);c.fillRect(xr-14.5*k,gy-47.5*k,9*k,2.5*k);
 c.fillStyle='#c9a227';c.beginPath();c.arc(xl+36*k,gy-35*k,6*k,Math.PI,0);c.fill();c.fillRect(xl+31*k,gy-36*k,10*k,2*k);
 c.fillStyle='#b71c1c';c.beginPath();c.moveTo(xr-2*k,gy-16*k);c.lineTo(xr+9*k,gy-5*k);c.lineTo(xr-2*k,gy-5*k);c.fill();
 c.fillStyle='#fff59d';c.beginPath();c.arc(xr-1.5*k,gy-26*k,3.4*k,0,7);c.fill();
 [[xl+31*k,9.5],[xl+50*k,9.5],[xl+11*k,5.5]].forEach(w=>{const r=w[1]*k;c.fillStyle='#b71c1c';c.beginPath();c.arc(w[0],gy-r,r,0,7);c.fill();c.strokeStyle='#111';c.lineWidth=k;c.stroke();c.beginPath();for(let s=0;s<4;s++){const a=G.pos*.55+s*Math.PI/4;c.moveTo(w[0]+Math.cos(a)*r*.85,gy-r+Math.sin(a)*r*.85);c.lineTo(w[0]-Math.cos(a)*r*.85,gy-r-Math.sin(a)*r*.85)}c.lineWidth=.8*k;c.stroke()});
 const a=G.pos*.55;c.strokeStyle='#cfd8dc';c.lineWidth=2*k;c.beginPath();c.moveTo(xl+31*k+Math.cos(a)*5*k,gy-9.5*k+Math.sin(a)*5*k);c.lineTo(xl+50*k+Math.cos(a)*5*k,gy-9.5*k+Math.sin(a)*5*k);c.stroke();STE(c,xl,xr,gy,k)}
function STE(c,xl,xr,gy,k){c.fillStyle='rgba(255,255,255,.2)';c.beginPath();c.roundRect(xl+24*k,gy-33*k,38*k,3.5*k,2*k);c.fill();c.fillStyle='#d4af37';for(let i=0;i<9;i++){c.beginPath();c.arc(xl+27*k+i*4.3*k,gy-18*k,.7*k,0,7);c.fill()}c.fillRect(xr-33*k,gy-26*k,10*k,5*k);c.fillStyle='#111';c.font='bold '+4*k+'px sans-serif';c.textAlign='center';c.fillText('12',xr-28*k,gy-22*k);c.fillStyle='#d4af37';c.fillRect(xl+14*k,gy-47*k,2*k,5*k);c.beginPath();c.arc(xl+15*k,gy-48*k,2*k,0,7);c.fill();c.strokeStyle='#cfd8dc';c.lineWidth=.9*k;c.beginPath();c.moveTo(xl+22*k,gy-29*k);c.lineTo(xr-6*k,gy-29*k);c.stroke()}
/* Lokomotif CC 201/203/204/206: atap rata dengan bodi gerbong (y=-44), ujung depan melengkung ke kaca miring & hidung merah */
function locoPath(c,xl,gy,k,xr){const X=a=>xl+a*k,Y=a=>gy+a*k;c.beginPath();c.moveTo(X(0),Y(-10));c.lineTo(X(0),Y(-39));c.quadraticCurveTo(X(0),Y(-44),X(5),Y(-44));c.lineTo(X(45),Y(-44));c.bezierCurveTo(X(50.5),Y(-44),X(53.6),Y(-41.2),X(55.2),Y(-35));c.lineTo(X(57.4),Y(-27));c.quadraticCurveTo(X(58.4),Y(-24),X(60),Y(-23.4));c.lineTo(X(60),Y(-10));c.quadraticCurveTo(X(60),Y(-8),X(58),Y(-8));c.lineTo(X(2),Y(-8));c.quadraticCurveTo(X(0),Y(-8),X(0),Y(-10));c.closePath()}
function loco(c,xl,xr,gy,k,t,ng){const v=t.lv,X=a=>xl+a*k,Y=a=>gy+a*k,Pg=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.closePath();c.fill()};
 locoPath(c,xl,gy,k,xr);fg(c,Y(-44),36*k,v.u);
 c.save();locoPath(c,xl,gy,k,xr);c.clip();
 c.fillStyle=v.bd;c.fillRect(xl,Y(-44),xr-xl,3.2*k);
 if(v.pat=='cg'){Pg([[0,-23.1],[60,-23.1],[60,-8],[0,-8]],v.st);Pg([[0,-23.1],[60,-23.1],[60,-20.1],[0,-20.1]],v.st2);Pg([[0,-20.1],[60,-20.1],[60,-18.7],[0,-18.7]],v.bd)}
 else if(v.pat=='bw'){Pg([[0,-30],[36,-30],[36,-27.6],[0,-27.6]],v.st);Pg([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],v.st);Pg([[0,-15.7],[60,-15.7],[60,-13.7],[0,-13.7]],v.st2)}
 else if(v.pat=='ow'){Pg([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],v.st);Pg([[0,-15.7],[60,-15.7],[60,-13.7],[0,-13.7]],v.st2);Pg([[0,-33],[30,-33],[26,-21.7],[0,-21.7]],v.st);Pg([[30,-33],[32.2,-33],[28.2,-21.7],[26,-21.7]],v.st2)}
 else{Pg([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],v.st);Pg([[0,-15.7],[60,-15.7],[60,-13.7],[0,-13.7]],v.st2);Pg([[0,-29],[44,-29],[44,-27.2],[0,-27.2]],v.st)}
 Pg([[48.5,-29.4],[57.8,-29.4],[60,-23.4],[60,-8],[48.5,-8]],v.r);c.fillStyle='rgba(0,0,0,.16)';c.fillRect(X(48.5),Y(-29.4),.7*k,21.4*k);
 c.fillStyle='rgba(255,255,255,.65)';c.fillRect(X(49.2),Y(-19),xr-X(49.2),1.2*k);c.fillRect(X(49.2),Y(-15.5),xr-X(49.2),1.2*k);
 c.fillStyle='#232a2e';c.fillRect(xl,Y(-12),xr-xl,4*k);c.fillRect(X(12),Y(-13.5),30*k,2*k);c.fillStyle='rgba(255,255,255,.22)';c.fillRect(xl+4*k,Y(-42.6),xr-xl-12*k,.9*k);
 c.fillStyle='rgba(0,0,0,.2)';[10.5,19.5,31,33.6,49.2].forEach(a=>c.fillRect(X(a),Y(-42),.7*k,30*k));c.fillStyle='rgba(0,0,0,.1)';c.fillRect(X(34.3),Y(-42),14.9*k,30*k);
 c.fillStyle='#1c262b';c.fillRect(X(1.2),Y(-40.5),8.6*k,10*k);c.fillStyle='rgba(255,255,255,.14)';for(let j=1;j<6;j++)c.fillRect(X(1.2),Y(-40.5+j*1.7),8.6*k,.5*k);
 c.fillStyle='rgba(0,0,0,.28)';for(let j=0;j<5;j++)c.fillRect(X(21+j*1.9),Y(-39.5),1*k,9*k);
 c.restore();locoPath(c,xl,gy,k,xr);c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=.9*k;c.stroke();
 win(c,X(34.8),Y(-40.5),8.4*k,10.5*k,ng,2.2*k);win(c,X(44.2),Y(-40.5),4.2*k,10.5*k,ng,1.6*k);
 c.beginPath();c.moveTo(X(49.8),Y(-40.6));c.bezierCurveTo(X(52.2),Y(-40.6),X(53.3),Y(-38.2),X(54.1),Y(-35));c.lineTo(X(55.7),Y(-29.4));c.lineTo(X(49.8),Y(-29.4));c.closePath();
 {const gl=c.createLinearGradient(0,Y(-40.6),0,Y(-29.4));if(ng){gl.addColorStop(0,'#fff3b0');gl.addColorStop(1,'#ffb74d')}else{gl.addColorStop(0,'#78a6c9');gl.addColorStop(.55,'#2f536f');gl.addColorStop(1,'#10202e')}c.fillStyle=gl;c.fill();c.strokeStyle='rgba(10,16,22,.9)';c.lineWidth=.8*k;c.stroke()}
 c.fillStyle='#fff';c.beginPath();c.roundRect(X(12.2),Y(-39.5),7.4*k,5.2*k,1*k);c.fill();c.fillStyle='#1565c0';c.font='bold '+3.4*k+'px sans-serif';c.textAlign='center';c.fillText('KAI',X(15.9),Y(-35.6));c.fillStyle='#ff6f00';c.fillRect(X(12.8),Y(-34.4),6.2*k,.9*k);
 c.fillStyle='#fff';c.font='bold '+3.4*k+'px sans-serif';c.fillText(v.no,X(22),Y(-17.2));
 c.fillStyle='#fff59d';c.beginPath();c.roundRect(X(57.4),Y(-22.4),2.2*k,2.6*k,.8*k);c.fill();c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=.5*k;c.stroke();c.fillStyle='#ffb300';c.fillRect(X(56.2),Y(-27.8),1.6*k,1.3*k);
 c.fillStyle='#ffd600';for(let i=0;i<3;i++)c.fillRect(xr-11*k+i*3.5*k,Y(-11),2*k,3*k);
 bogie(c,X(14),gy,k,3);bogie(c,xr-14*k,gy,k,3)}
function freight(c,ty,xl,xr,gy,k,t,ng){const L=xr-xl,cx=(xl+xr)/2,fl=gy-8*k;
 c.fillStyle='#232a2e';c.fillRect(xl+2*k,fl-3*k,L-4*k,3.5*k);
 if(ty=='brg'){const y0=fl-30*k;c.beginPath();c.rect(xl+3*k,y0,L-6*k,27*k);fg(c,y0,27*k,'#8d4a3a');c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=.8*k;c.beginPath();for(let i=1;i<(L-6*k)/(4*k);i++){c.moveTo(xl+3*k+i*4*k,y0+2*k);c.lineTo(xl+3*k+i*4*k,y0+25*k)}c.stroke();
  c.fillStyle='rgba(0,0,0,.22)';c.fillRect(cx-9*k,y0+3*k,18*k,22*k);c.strokeStyle='#cfd8dc';c.lineWidth=.9*k;c.strokeRect(cx-9*k,y0+3*k,18*k,22*k);c.beginPath();c.moveTo(cx,y0+3*k);c.lineTo(cx,y0+25*k);c.stroke();
  c.fillStyle='#6d3a2d';c.fillRect(xl+2*k,y0-2*k,L-4*k,3*k);c.fillStyle='#fff';c.font='bold '+4*k+'px sans-serif';c.textAlign='center';c.fillText('KKBW',cx,y0+24.5*k)}
 else if(ty=='tgk'){const y0=fl-31*k,P=()=>{c.beginPath();c.roundRect(xl+4*k,y0,L-8*k,26*k,13*k)};P();fg(c,y0,26*k,'#2b2f33');c.save();P();c.clip();c.fillStyle='#e53935';c.fillRect(xl,y0+11*k,L,4*k);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(xl,y0+3*k,L,2.6*k);c.restore();
  c.fillStyle='#fff';c.font='bold '+3.8*k+'px sans-serif';c.textAlign='center';c.fillText('BBM',cx,y0+22*k);c.fillStyle='#3a4147';c.fillRect(cx-6*k,y0-2.5*k,12*k,3*k);c.strokeStyle='#90a4ae';c.lineWidth=.7*k;c.beginPath();c.moveTo(xl+8*k,y0-1*k);c.lineTo(xr-8*k,y0-1*k);c.stroke();c.fillStyle='#232a2e';c.fillRect(xl+8*k,fl-6*k,7*k,3*k);c.fillRect(xr-15*k,fl-6*k,7*k,3*k)}
 else if(ty=='ctn'){c.fillStyle='#37474f';c.fillRect(xl+2*k,fl-6*k,L-4*k,3.2*k);const cols=['#1e88e5','#c62828','#fb8c00','#2e7d32','#6d4c41','#00838f'],h0=Math.round(xl/k);
  [xl+3*k,xr-31*k].forEach((x0,j)=>{const col=cols[Math.floor(hs(h0+j*7)*6)],y0=fl-31*k;c.beginPath();c.rect(x0,y0,28*k,25*k);fg(c,y0,25*k,col);c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=.7*k;c.beginPath();for(let i=1;i<14;i++){c.moveTo(x0+i*2*k,y0+2*k);c.lineTo(x0+i*2*k,y0+23*k)}c.stroke();c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x0,y0,2*k,25*k);c.fillRect(x0+26*k,y0,2*k,25*k);c.fillStyle='#fff';c.fillRect(x0+6*k,y0+9*k,16*k,3.6*k);c.fillStyle='#37474f';c.font='bold '+3*k+'px sans-serif';c.textAlign='center';c.fillText('KAI LOG',x0+14*k,y0+12*k)})}
 else{const y0=fl-28*k;c.beginPath();c.moveTo(xl+3*k,y0);c.lineTo(xr-3*k,y0);c.lineTo(xr-6*k,fl-6*k);c.lineTo(xl+6*k,fl-6*k);c.closePath();fg(c,y0,22*k,'#4b565e');c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=.8*k;c.beginPath();for(let i=1;i<10;i++){const px=xl+3*k+i*(L-6*k)/10;c.moveTo(px,y0+1*k);c.lineTo(px,fl-7*k)}c.stroke();c.fillStyle='#37424a';c.fillRect(xl+2*k,y0-1.5*k,L-4*k,2.5*k);
  c.fillStyle='#14171a';c.beginPath();c.moveTo(xl+4*k,y0-1*k);c.quadraticCurveTo(xl+10*k,y0-10*k,cx-6*k,y0-7*k);c.quadraticCurveTo(cx+4*k,y0-12*k,cx+14*k,y0-7*k);c.quadraticCurveTo(xr-8*k,y0-9*k,xr-4*k,y0-1*k);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<8;i++)c.fillRect(xl+8*k+hs(i)*(L-16*k),y0-4*k-hs(i+9)*5*k,1.2*k,1.2*k);c.fillStyle='#fff';c.font='bold '+3.8*k+'px sans-serif';c.textAlign='center';c.fillText('BATU BARA',cx,fl-12*k)}
 bogie(c,xl+11*k,gy,k,2);bogie(c,xr-11*k,gy,k,2)}
function coach(c,ty,xl,xr,gy,k,t,ng){const L=xr-xl,h=36*k,y0=gy-8*k-h,cx=(xl+xr)/2,cb=t.cb||t.c1,c1=t.c1,c2=t.c2,c3=t.c3,bd=ty=='bag'?'#607d8b':cb,P=()=>{c.beginPath();c.roundRect(xl,y0,L,h,[5*k,5*k,2*k,2*k])};
 P();fg(c,y0,h,bd);c.save();P();c.clip();
 if(ty=='eko'){c.fillStyle=c1;c.fillRect(xl,y0+h*.58,L,h);c.fillStyle=c2;c.fillRect(xl,y0+h*.58,L,3*k);c.fillStyle=c3||c2;c.fillRect(xl,y0+h*.58+3*k,L,1.4*k)}
 else if(ty=='bag'){c.fillStyle=c2;c.fillRect(xl,y0+h*.66,L,3*k)}
 else{c.fillStyle=c2;c.fillRect(xl,y0+h*.62,L,6*k);if(c3){c.fillStyle=c3;c.fillRect(xl,y0+h*.62+6*k,L,2*k)}
  c.fillStyle=bd;[[xl,1],[xr,-1]].forEach(e=>{c.beginPath();c.moveTo(e[0],y0+h*.62-1*k);c.lineTo(e[0]+e[1]*9*k,y0+h*.62-1*k);c.lineTo(e[0],y0+h*.62+9*k);c.fill()})}
 c.fillStyle='#2f3a40';c.fillRect(xl,y0+h-4.5*k,L,5*k);c.restore();P();c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=.8*k;c.stroke();
 if(ty!='bag'){c.fillStyle='#18222b';c.beginPath();c.roundRect(xl+3.5*k,y0+6*k,L-7*k,15*k,3.5*k);c.fill();
  if(ty=='res'){win(c,xl+7*k,y0+7*k,16*k,13*k,ng,2*k);win(c,xl+43*k,y0+7*k,16*k,13*k,ng,2*k);c.fillStyle=c2;c.beginPath();c.arc(cx,y0+13.5*k,6*k,0,7);c.fill();c.fillStyle='#fff';c.font='bold '+8*k+'px sans-serif';c.textAlign='center';c.fillText('R',cx,y0+16.5*k)}
  else{const n=ty=='eko'?7:5,w=(L-14*k)/n;for(let j=0;j<n;j++)win(c,xl+7*k+j*w+.6*k,y0+7*k,w-1.2*k,13*k,ng,2*k)}}
 else{c.fillStyle='#455a64';c.fillRect(cx-9*k,y0+6*k,18*k,24*k);c.fillStyle='#cfd8dc';c.fillRect(cx-1*k,y0+16*k,2*k,6*k);[8,44].forEach(q=>win(c,xl+q*k,y0+5*k,6*k,6*k,ng,k));c.fillStyle='#fff';c.font='bold '+5*k+'px sans-serif';c.textAlign='center';c.fillText('BAGASI',cx,y0+h*.66+9*k)}
 c.fillStyle='rgba(0,0,0,.30)';c.fillRect(xl+1.2*k,y0+8*k,4.5*k,h-15*k);c.fillRect(xr-5.7*k,y0+8*k,4.5*k,h-15*k);
 c.fillStyle='#9aa7ae';c.beginPath();c.roundRect(xl+4*k,y0-3.5*k,L-8*k,5.5*k,[4*k,4*k,1*k,1*k]);c.fill();c.fillStyle='rgba(255,255,255,.25)';c.fillRect(xl+10*k,y0-2.5*k,L-20*k,1*k);
 c.fillStyle='#6f7d85';[.28,.55,.78].forEach(q=>{c.beginPath();c.roundRect(xl+L*q-4*k,y0-5.5*k,8*k,3*k,1.4*k);c.fill()});
 const lx=xl+L*.16,ly2=y0+h*.77;c.fillStyle='#fff';c.beginPath();c.roundRect(lx,ly2,6*k,4*k,1*k);c.fill();c.fillStyle='#1565c0';c.fillRect(lx+.5*k,ly2+.5*k,2.8*k,3*k);c.fillStyle='#ff6f00';c.fillRect(lx+3.6*k,ly2+1*k,1.6*k,2*k);
 bogie(c,xl+13*k,gy,k,2);bogie(c,xr-13*k,gy,k,2)}
function car(c,ty,xl,xr,gy,k,t,ng){
 const L=xr-xl,h=36*k,y0=gy-8*k-h,c1=t.c1,cb=t.cb||c1,c2=t.c2,c3=t.c3,cx=(xl+xr)/2,bg=(a,b)=>{bogie(c,xl+a*k,gy,k,2);bogie(c,xr-b*k,gy,k,2)};
 if(ty=='uap')return steamL(c,xl,xr,gy,k);if(FR.includes(ty))return freight(c,ty,xl,xr,gy,k,t,ng);
 if(ty=='tdr'){body(c,xl+2*k,gy-34*k,L-4*k,26*k,3*k,'#1a1a1a');c.fillStyle='#0b0b0b';c.beginPath();c.moveTo(xl+5*k,gy-34*k);c.quadraticCurveTo(cx,gy-52*k,xr-5*k,gy-34*k);c.fill();c.fillStyle='#5d4037';for(let i=0;i<14;i++)c.fillRect(xl+8*k+hs(i)*(L-18*k),gy-36*k-hs(i+5)*9*k,2*k,2*k);bogie(c,cx,gy,k,2);return}
 if(ty=='cc')return loco(c,xl,xr,gy,k,t,ng);
 if(ty=='kay'){body(c,xl,y0+2*k,L,h-2*k,2*k,cb);c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=.7*k;c.beginPath();for(let i=1;i<L/(4*k);i++){c.moveTo(xl+i*4*k,y0+4*k);c.lineTo(xl+i*4*k,y0+h-4*k)}c.stroke();
  c.fillStyle=sh(cb,-.45);c.beginPath();c.roundRect(xl-1*k,y0-3*k,L+2*k,8*k,[8*k,8*k,0,0]);c.fill();
  for(let j=0;j<4;j++){c.fillStyle=ng?'#ffd180':'#2a1c10';c.beginPath();c.roundRect(xl+7*k+j*12*k,y0+10*k,8*k,14*k,[4*k,4*k,0,0]);c.fill()}
  c.fillStyle=c2;c.fillRect(xl,y0+h-9*k,L,2*k);c.strokeStyle='#3e2723';c.lineWidth=k;c.strokeRect(xl-1*k,y0+8*k,3*k,h-14*k);c.strokeRect(xr-2*k,y0+8*k,3*k,h-14*k);bg(13,13);return}
 if(ty=='bag')return coach(c,ty,xl,xr,gy,k,t,ng);
 if(ty=='bh'){c.beginPath();c.moveTo(xl,gy-8*k);c.lineTo(xl,y0+3*k);c.quadraticCurveTo(xl+2*k,y0,xl+8*k,y0);c.lineTo(xr-36*k,y0);c.bezierCurveTo(xr-12*k,y0,xr+14*k,y0+8*k,xr+30*k,gy-22*k);c.quadraticCurveTo(xr+33*k,gy-14*k,xr+30*k,gy-8*k);c.closePath();fg(c,y0,h,c1);
  c.fillStyle=c2;c.fillRect(xl,y0+h*.62,xr+28*k-xl,5*k);c.fillStyle=c3;c.fillRect(xl,y0+h*.62+5*k,xr+27*k-xl,2*k);
  for(let j=0;j<3;j++)win(c,xl+8*k+j*13*k,y0+7*k,10*k,11*k,ng,3*k);
  c.fillStyle='#10202e';c.beginPath();c.moveTo(xr-24*k,y0+4*k);c.bezierCurveTo(xr-10*k,y0+4*k,xr+4*k,y0+9*k,xr+14*k,y0+19*k);c.lineTo(xr-24*k,y0+19*k);c.fill();
  c.fillStyle='#fffde7';c.beginPath();c.ellipse(xr+27*k,gy-17*k,3*k,2*k,0,0,7);c.fill();bogie(c,xl+14*k,gy,k,2);bogie(c,xr-10*k,gy,k,2);return}
 if(ty=='bm'){body(c,xl,y0,L,h,10*k,c1);c.fillStyle=c2;c.fillRect(xl,y0+h*.62,L,5*k);c.fillStyle=c3;c.fillRect(xl,y0+h*.62+5*k,L,2*k);
  for(let j=0;j<4;j++)win(c,xl+7*k+j*14*k,y0+7*k,10*k,11*k,ng,4*k);c.fillStyle='#455a64';c.fillRect(cx-10*k,y0-3*k,20*k,3*k);bg(13,13);return}
 if(ty=='ec'||ty=='em'){const nz=t.nz||1;c.beginPath();
  if(ty=='ec'){const q=nz==2?4:0;c.moveTo(xl,gy-8*k);c.lineTo(xl,y0+4*k);c.quadraticCurveTo(xl,y0,xl+4*k,y0);c.lineTo(xr-(nz==1?6:nz==2?16:12)*k,y0);
   if(nz==3)c.quadraticCurveTo(xr+2*k,y0+2*k,xr+3*k,y0+18*k);else c.lineTo(xr+q*k,y0+(nz==2?16:10)*k);c.lineTo(xr+q*k,gy-8*k);c.closePath()}
  else c.roundRect(xl,y0,L,h,4*k);
  fg(c,y0,h,c1);c.fillStyle=c2;c.fillRect(xl,y0+h*.68,L,5*k);if(c3){c.fillStyle=c3;c.fillRect(xl,y0+h*.68+5*k,L,2*k)}
  c.fillStyle='#8a979e';c.fillRect(xl+14*k,y0-2.5*k,12*k,3*k);c.fillRect(xl+38*k,y0-2.5*k,12*k,3*k);
  if(ty=='em'){[5,29,53].forEach(q=>{c.fillStyle='#37474f';c.fillRect(xl+q*k,y0+5*k,8*k,26*k);win(c,xl+(q+1.5)*k,y0+7*k,5*k,12*k,ng,k)});[15,39].forEach(q=>win(c,xl+q*k,y0+7*k,12*k,12*k,ng,2*k));
   if(t.k=='krl'){c.strokeStyle='#222';c.lineWidth=1.4*k;c.beginPath();c.moveTo(cx-8*k,y0-1*k);c.lineTo(cx,y0-10*k);c.lineTo(cx+8*k,y0-1*k);c.moveTo(cx-6*k,y0-10*k);c.lineTo(cx+6*k,y0-10*k);c.stroke()}}
  else{[4,26].forEach(q=>{c.fillStyle='#37474f';c.fillRect(xl+q*k,y0+5*k,8*k,26*k);win(c,xl+(q+1.5)*k,y0+7*k,5*k,12*k,ng,k)});[13,35].forEach(q=>win(c,xl+q*k,y0+7*k,10*k,12*k,ng,2*k));
   c.fillStyle='#10202e';c.beginPath();c.moveTo(xr-16*k,y0+5*k);c.lineTo(xr-(nz==3?1:3)*k,y0+(nz==3?9:12)*k);c.lineTo(xr-3*k,y0+26*k);c.lineTo(xr-16*k,y0+26*k);c.fill();
   c.fillStyle='#ffca28';c.fillRect(xr-15*k,y0+1.5*k,10*k,3*k);c.fillStyle='#fffde7';[14,22].forEach(q=>{c.beginPath();c.arc(xr-3*k,gy-q*k,2*k,0,7);c.fill()})}
  bg(13,13);return}
 return coach(c,ty,xl,xr,gy,k,t,ng)}
function detail(c,ty,xl,xr,gy,k,t,ng,fr){
 if(ty=='uap'||ty=='tdr'||FR.includes(ty))return;const L=xr-xl,h=36*k,y0=gy-8*k-h,cx=(xl+xr)/2;
 if(ty!='cc'){const g=c.createLinearGradient(xl,0,xr,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(xl+2*k,y0+3*k,L-4*k,2.2*k);
  c.fillStyle='rgba(0,0,0,.22)';c.fillRect(xl,y0+2*k,.8*k,h-3*k);c.fillRect(xr-.8*k,y0+2*k,.8*k,h-3*k);c.fillRect(xl+6*k,y0,L-12*k,1.4*k);
  c.fillStyle='#2b3338';c.fillRect(cx-16*k,gy-9*k,11*k,4*k);c.fillRect(cx+3*k,gy-9*k,14*k,4*k)}
 const nm=t.nz==2?'MRT JAKARTA':'LRT JABODEBEK',lb={ec:[nm,.68],em:[nm,.68],eks:['EKSEKUTIF',.64],res:['RESTORASI',.64],bm:['WHOOSH',.62]}[ty];
 c.fillStyle='#fff';c.textAlign='center';c.font='bold '+4.2*k+'px sans-serif';
 if(lb&&(ty!='ec'||fr))c.fillText(lb[0],cx,y0+h*lb[1]+4*k);if(ty=='eko'){c.font='bold '+4.6*k+'px sans-serif';c.fillText('EKONOMI',cx,y0+h*.58+11*k)}
 if(fr){const p={ec:[xr-3*k,gy-14*k],cc:[xr-1.5*k,gy-21*k],bh:[xr+27*k,gy-17*k]}[ty];if(p){const g=c.createRadialGradient(p[0],p[1],0,p[0],p[1],9*k);g.addColorStop(0,'rgba(255,245,170,.6)');g.addColorStop(1,'rgba(255,245,170,0)');c.fillStyle=g;c.beginPath();c.arc(p[0],p[1],9*k,0,7);c.fill()}}}
function mkc(w,h,s){s=s||DPRv;const c=document.createElement('canvas');c.width=Math.ceil(w*s);c.height=Math.ceil(h*s);const q=c.getContext('2d');q.scale(s,s);return[c,q]}
/* kereta digambar sekali ke sprite, lalu ditempel tiap frame (roda tetap berputar) */
function drawTrain(c,t,hx,gy,k,ng){
 if(c!==x||t.k=='steam'){drawTrain0(c,t,hx,gy,k,ng);return}
 const key=TR.indexOf(t)+(S.cons&&S.cons[TR.indexOf(t)]||'')+'|'+k.toFixed(3)+'|'+ng+'|'+DPRv,tl=trLen(t)*k,pad=40*k,w=tl+pad+8*k,h=70*k;let s=SPR[key];
 if(!s){if(Object.keys(SPR).length>9)SPR={};const[cv2,q]=mkc(w,h,DPRv*2.5);REC=[];MIR=0;drawTrain0(q,t,w-pad,h-4*k,k,ng);s=SPR[key]={cv:cv2,wl:REC};REC=null;MIR=0}
 c.drawImage(s.cv,hx-(w-pad),gy-(h-4*k),w,h);s.wl.forEach(p=>wheels(c,hx+p[0]-(w-pad),gy,k,p[1]))}
function drawTrain0(c,t,hx,gy,k,ng){
 const cr=carsOf(t),n=cr.length,tl=trLen(t)*k;let xr=hx;
 c.save();c.translate(hx-tl/2,gy+1.5*k);c.scale(1,.022);{const sg=c.createRadialGradient(0,0,0,0,0,tl/2);sg.addColorStop(0,'rgba(0,0,0,.5)');sg.addColorStop(.7,'rgba(0,0,0,.3)');sg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=sg;c.fillRect(-tl/2,-tl/2,tl,tl)}c.restore();
 cr.forEach((ty,i)=>{const L=LEN[ty]*k,xl=xr-L,mir=i>0&&(ty=='ec'||ty=='bh'),F=fo(ty),pv=mir?xl:xr,xl2=xr-L*F;STX=pv;STF=F;
  MIR=mir?xl+xr:0;c.save();if(mir){c.translate(xl+xr,0);c.scale(-1,1)}c.translate(pv,0);c.scale(F,1);c.translate(-pv,0);PPL=!(ty=="cc"||ty=="bag"||ty=="uap"||ty=="tdr"||FR.includes(ty));car(c,ty,xl,xr,gy,k,t,ng);detail(c,ty,xl,xr,gy,k,t,ng,i==0);c.restore();STF=1;if(ty!="cc"&&ty!="uap"&&ty!="tdr"&&!FR.includes(ty)){c.fillStyle="rgba(255,255,255,.12)";c.fillRect(xl2+4*k,gy-43*k,xr-xl2-8*k,2*k)}
  if(i<n-1){c.fillStyle='#1b1b1b';c.fillRect(xl2-3*k,gy-16*k,3*k,3*k);if(ty!='cc'&&ty!='uap'&&ty!='tdr'&&!FR.includes(ty)){c.fillStyle='#151515';c.fillRect(xl2-3*k,gy-40*k,3*k,28*k)}}
  xr=xl2-3*k})}
function ly(par,base,amp,f,col,tri,gy,cam){const lg=x.createLinearGradient(0,gy-(base+amp)*u,0,gy);lg.addColorStop(0,sh(col,.28));lg.addColorStop(1,sh(col,-.08));x.fillStyle=lg;x.beginPath();x.moveTo(0,H);
 for(let X=0;X<=W+6;X+=6){const w=(X+cam*par)*f;let h=tri?Math.pow(.5+.5*Math.cos(w*Math.PI),2.2):.5+.3*Math.sin(w*3)+.2*Math.sin(w*7.1);if(tri)h*=.65+.35*Math.sin(w*.9);x.lineTo(X,gy-base*u-amp*u*h)}
 x.lineTo(W,H);x.fill();x.strokeStyle="rgba(255,255,255,.18)";x.lineWidth=1.5;x.stroke()}
function palm(X,by,s,d){x.strokeStyle='#6d4c41';x.lineWidth=4*u*s;x.beginPath();x.moveTo(X,by);x.quadraticCurveTo(X+10*u*s*d,by-45*u*s,X+5*u*s*d,by-85*u*s);x.stroke();
 const tx=X+5*u*s*d,ty=by-85*u*s;x.strokeStyle='#2e7d32';x.lineWidth=3*u*s;
 for(const a of[-2.9,-2.3,-1.7,-1.2,-.6,-.2]){x.beginPath();x.moveTo(tx,ty);x.quadraticCurveTo(tx+Math.cos(a)*20*u*s,ty+Math.sin(a)*26*u*s-8*u*s,tx+Math.cos(a)*38*u*s,ty+Math.sin(a)*14*u*s+16*u*s);x.stroke()}}
function house(X,by,r){x.fillStyle=['#fff3e0','#ffe0b2','#c8e6c9','#bbdefb'][Math.floor(r*4)%4];x.fillRect(X,by-26*u,46*u,26*u);x.fillStyle='#c0392b';x.beginPath();x.moveTo(X-5*u,by-26*u);x.lineTo(X+23*u,by-46*u);x.lineTo(X+51*u,by-26*u);x.fill();x.fillStyle='#5d4037';x.fillRect(X+18*u,by-16*u,10*u,16*u)}
const PL=[['#c0392b','#ffe0b2','#1565c0'],['#6d4c41','#f5e6c8','#2e7d32'],['#37474f','#cfd8dc','#e53935'],['#8e24aa','#f3e5f5','#fb8c00'],['#00796b','#e0f2f1','#fdd835']],BD=['#0d47a1','#1b5e20','#b71c1c','#4a148c','#004d40'];
function stBack(s,px,gy,P){const w=SP*P;if(px>W||px+w<-50)return;const pl=s.pal||0,[rf,wl,cn]=PL[pl],st=s.sty||0,cx=px+w*.5;
 const wall=(x0,y0,ww,hh)=>{x.beginPath();x.rect(x0,y0,ww,hh);fg(x,y0,hh,wl)};
 if(st==0){wall(px+w*.2,gy-100*u,w*.6,90*u);x.fillStyle=rf;x.beginPath();x.moveTo(px+w*.17,gy-100*u);x.lineTo(cx,gy-135*u);x.lineTo(px+w*.83,gy-100*u);x.fill();wall(cx-20*u,gy-145*u,40*u,60*u);x.fillStyle=sh(rf,-.2);x.beginPath();x.moveTo(cx-24*u,gy-145*u);x.lineTo(cx,gy-175*u);x.lineTo(cx+24*u,gy-145*u);x.fill();
  x.fillStyle='#fff';x.beginPath();x.arc(cx,gy-128*u,9*u,0,7);x.fill();x.strokeStyle='#333';x.lineWidth=1.2*u;x.beginPath();x.moveTo(cx,gy-128*u);x.lineTo(cx,gy-134*u);x.moveTo(cx,gy-128*u);x.lineTo(cx+5*u,gy-128*u);x.stroke();
  x.fillStyle='#37474f';for(let i=0;i<7;i++){x.beginPath();x.roundRect(px+w*.23+i*w*.075,gy-70*u,12*u,28*u,[6*u,6*u,0,0]);x.fill()}}
 else if(st==1){const g=x.createLinearGradient(0,gy-100*u,0,gy-10*u);g.addColorStop(0,'#81d4fa');g.addColorStop(1,'#0277bd');x.fillStyle=g;x.fillRect(px+w*.12,gy-100*u,w*.76,90*u);x.fillStyle='rgba(255,255,255,.35)';for(let i=1;i<16;i++)x.fillRect(px+w*.12+i*w*.76/16,gy-100*u,1.2*u,90*u);x.fillStyle=rf;x.fillRect(px+w*.1,gy-106*u,w*.8,8*u)}
 else if(st==2){wall(cx-70*u,gy-62*u,140*u,52*u);x.fillStyle=rf;x.beginPath();x.moveTo(cx-84*u,gy-62*u);x.lineTo(cx-56*u,gy-86*u);x.lineTo(cx+56*u,gy-86*u);x.lineTo(cx+84*u,gy-62*u);x.fill();x.fillStyle='#5d4037';x.fillRect(cx-9*u,gy-44*u,18*u,34*u);x.fillStyle='#78909c';x.fillRect(cx-56*u,gy-50*u,22*u,16*u);x.fillRect(cx+34*u,gy-50*u,22*u,16*u)}
 else if(st==3){wall(px+w*.22,gy-62*u,w*.56,52*u);[[.18,.82,-62,-92],[.26,.74,-92,-116]].forEach(r=>{x.fillStyle=r[3]==-116?sh(rf,-.15):rf;x.beginPath();x.moveTo(px+w*r[0],gy+r[2]*u);x.lineTo(px+w*(r[0]+.06),gy+r[3]*u);x.lineTo(px+w*(r[1]-.06),gy+r[3]*u);x.lineTo(px+w*r[1],gy+r[2]*u);x.fill()});x.fillStyle='#5d4037';for(let i=0;i<6;i++)x.fillRect(px+w*.25+i*w*.1,gy-62*u,4*u,52*u)}
 else{wall(px+w*.15,gy-92*u,w*.7,82*u);wall(cx-50*u,gy-125*u,100*u,34*u);x.fillStyle=cn;x.fillRect(cx-54*u,gy-130*u,108*u,6*u);x.fillStyle='rgba(0,0,0,.15)';for(let i=0;i<14;i++)x.fillRect(px+w*.17+i*w*.046,gy-92*u,2*u,82*u);x.fillStyle='#455a64';x.fillRect(cx+60*u,gy-170*u,2*u,48*u);x.fillStyle='#e53935';x.fillRect(cx+62*u,gy-170*u,14*u,8*u);x.fillStyle='#fff';x.fillRect(cx+62*u,gy-162*u,14*u,4*u)}
 x.fillStyle=cn;x.fillRect(px-6*u,gy-84*u,w+12*u,7*u);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(px-6*u,gy-77*u,w+12*u,2*u);x.fillStyle='#fff';x.font='bold '+7*u+'px sans-serif';x.textAlign='left';x.fillText('JALUR 1',px+w*.02,gy-78.5*u);x.textAlign='right';x.fillText('JALUR 2',px+w*.98,gy-78.5*u);x.fillStyle='#455a64';x.fillStyle='#455a64';[.06,.3,.5,.7,.94].forEach(q=>x.fillRect(px+w*q,gy-80*u,4*u,70*u));
 for(let i=0;i<4;i++){const lx=px+w*(.12+i*.25);x.fillStyle='#37474f';x.fillRect(lx,gy-58*u,2*u,48*u);x.fillStyle=S.tod==2?'#fff59d':'#cfd8dc';x.beginPath();x.arc(lx+1*u,gy-60*u,3*u,0,7);x.fill()}
 x.fillStyle=BD[pl];x.fillRect(cx-80*u,gy-74*u,160*u,22*u);x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(cx-80*u,gy-74*u,160*u,22*u);x.fillStyle='#fff';x.font='bold '+13*u+'px sans-serif';x.textAlign='center';x.fillText(s.nm.toUpperCase(),cx,gy-58*u)}
function stFront(s,px,gy,P,cam){const w=SP*P;if(px>W||px+w<-50)return;
 x.fillStyle='#b0bec5';x.fillRect(px,gy+4*u,w,17*u);x.fillStyle='#ffd600';x.fillRect(px,gy+4*u,w,3*u);
 const cur=s===G.r.st[G.ni-1]&&G.dw>0,n=cur?Math.round(8*G.dw/3):s.done?0:7;
 for(let i=0;i<n;i++){const fx=px+w*(.08+.84*hs(i+s.x)),by=gy+21*u,bb=Math.sin(tm*4+i)*u;x.fillStyle=['#e53935','#fdd835','#1e88e5','#43a047'][i%4];x.fillRect(fx-3*u,by-19*u+bb,7*u,13*u);x.fillStyle='#ffcc9c';x.beginPath();x.arc(fx,by-23*u+bb,4*u,0,7);x.fill();x.fillStyle='#333';x.fillRect(fx-3*u,by-6*u+bb,3*u,6*u);x.fillRect(fx+1*u,by-6*u+bb,3*u,6*u)}
 if(!s.done){const mx=(s.x+SP-5)*P-cam;x.fillStyle='#ff6f00';x.fillRect(mx-2*u,gy-26*u,4*u,48*u);x.fillStyle='#d32f2f';x.fillRect(mx-24*u,gy-40*u,48*u,16*u);x.fillStyle='#fff';x.font='bold '+11*u+'px sans-serif';x.textAlign='center';x.fillText('STOP',mx,gy-28*u)}}
const SK=[['#2e9bff','#bfe9ff','#fff3cf'],['#4a2a7a','#ff6f61','#ffd58a'],['#040a22','#16286b','#3a58a8']];
const puff=(px,py,r,a,cl)=>{const g=x.createRadialGradient(px,py,0,px,py,r);const q2=cl||'255,255,255';g.addColorStop(0,'rgba('+q2+','+a+')');g.addColorStop(1,'rgba('+q2+',0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill()};
let sm=0;
function gauge(t){const kk=Math.round(sm*2)+"|"+Math.round(G.v*3.6)+"|"+limAt(G.pos)+"|"+S.sel;if(kk==GK)return;GK=kk;const c=$('gauge').getContext('2d'),mx=Math.ceil(t.v/50)*50,L=Math.min(limAt(G.pos),mx),a0=Math.PI*.75,ang=v=>a0+Math.PI*1.5*Math.min(1,v/mx),P=(a,r)=>[130+Math.cos(a)*r,130+Math.sin(a)*r];
 c.clearRect(0,0,260,260);let g=c.createRadialGradient(130,120,10,130,130,125);g.addColorStop(0,'#2b3d5a');g.addColorStop(1,'#0a1222');c.fillStyle=g;c.beginPath();c.arc(130,130,122,0,7);c.fill();c.lineWidth=5;c.strokeStyle='#b0bec5';c.stroke();
 c.lineWidth=9;c.strokeStyle='#43d66f';c.beginPath();c.arc(130,130,100,ang(0),ang(L));c.stroke();c.strokeStyle='#ff5252';c.beginPath();c.arc(130,130,100,ang(L),ang(mx));c.stroke();
 c.textAlign='center';c.textBaseline='middle';
 for(let v=0;v<=mx;v+=10){const big=v%(mx>100?50:20)==0,a=ang(v);c.lineWidth=big?3:1.5;c.strokeStyle='#fff';c.beginPath();c.moveTo(...P(a,big?82:89));c.lineTo(...P(a,94));c.stroke();if(big){c.fillStyle='#fff';c.font='bold 15px sans-serif';c.fillText(v,...P(a,66))}}
 const a=ang(sm);c.strokeStyle='#ff1744';c.lineWidth=4;c.lineCap='round';c.beginPath();c.moveTo(...P(a+Math.PI,14));c.lineTo(...P(a,80));c.stroke();c.fillStyle='#eee';c.beginPath();c.arc(130,130,9,0,7);c.fill();
 c.textBaseline='alphabetic';c.fillStyle='#ffd23f';c.font='bold 40px sans-serif';c.fillText(Math.round(G.v*3.6),130,190);c.font='bold 13px sans-serif';c.fillStyle='#cfd8dc';c.fillText('km/jam',130,210)}
function veh(X,Y,s,ty,col,fr){
 x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(X,Y,(ty=='mtr'?7:ty=='trk'||ty=='bus'?22:18)*s,3.5*s,0,0,7);x.fill();
 const tl=fr?'#fff59d':'#ff1744';
 if(ty=='mtr'){x.fillStyle='#111';x.fillRect(X-1.6*s,Y-14*s,3.2*s,14*s);x.fillStyle=col;x.beginPath();x.roundRect(X-4.5*s,Y-24*s,9*s,12*s,3*s);x.fill();x.fillStyle=PAL[(PAL.indexOf(col)+3)%7];x.beginPath();x.roundRect(X-4.5*s,Y-35*s,9*s,12*s,3*s);x.fill();x.fillStyle='#ffcc9c';x.beginPath();x.arc(X,Y-39*s,4*s,0,7);x.fill();x.fillStyle='#ff6f00';x.beginPath();x.arc(X,Y-40*s,4.4*s,Math.PI,0);x.fill();x.fillStyle=tl;x.beginPath();x.arc(X,Y-20*s,2*s,0,7);x.fill();return}
 const w=ty=='trk'||ty=='bus'?44:36,h=ty=='trk'?38:ty=='bus'?36:ty=='ang'?24:18;
 x.fillStyle='#111';[-1,1].forEach(d=>x.fillRect(X+d*(w/2-5)*s-2.5*s,Y-6*s,5*s,6*s));
 const g=x.createLinearGradient(0,Y-(h+16)*s,0,Y-4*s);g.addColorStop(0,sh(col,.35));g.addColorStop(1,sh(col,-.25));x.fillStyle=g;
 if(ty=='car'||ty=='ang'){x.beginPath();x.roundRect(X-13*s,Y-(h+16)*s,26*s,16*s,5*s);x.fill();x.fillStyle='#1b2b38';x.fillRect(X-10*s,Y-(h+13)*s,20*s,9*s);x.fillStyle=g}
 x.beginPath();x.roundRect(X-w/2*s,Y-(h+4)*s,w*s,h*s,4*s);x.fill();
 x.fillStyle='#1b2b38';if(ty=='trk')x.fillRect(X-15*s,Y-h*s,30*s,12*s);if(ty=='bus')for(let j=0;j<3;j++)x.fillRect(X-19*s+j*13*s,Y-h*s,11*s,12*s);
 [-1,1].forEach(d=>{x.fillStyle=tl;x.beginPath();x.arc(X+d*(w/2-6)*s,Y-9*s,2.4*s,0,7);x.fill()})}
function barrier(bx,py,side,c,len){
 x.fillStyle='#fff';x.fillRect(bx-1.6*u,py-26*u,3.2*u,26*u);x.fillStyle='#e53935';for(let i=0;i<3;i++)x.fillRect(bx-1.6*u,py-22*u+i*9*u,3.2*u,4.5*u);
 [-1,1].forEach((d,i)=>{const on=c.a>.3&&((tm*4|0)%2==i);x.fillStyle=on?'#ff1744':'#5a1a1a';x.beginPath();x.arc(bx+d*3.5*u,py-28*u,2.6*u,0,7);x.fill();if(on){x.fillStyle='rgba(255,60,60,.35)';x.beginPath();x.arc(bx+d*3.5*u,py-28*u,7*u,0,7);x.fill()}});
 const an=-(1-c.a)*1.45,px0=bx,py0=py-18*u,ex=px0+side*Math.cos(an)*len,ey=py0+Math.sin(an)*len;x.lineWidth=3.4*u;
 for(let i=0;i<8;i++){x.strokeStyle=i%2?'#fff':'#e53935';x.beginPath();x.moveTo(px0+(ex-px0)*i/8,py0+(ey-py0)*i/8);x.lineTo(px0+(ex-px0)*(i+1)/8,py0+(ey-py0)*(i+1)/8);x.stroke()}}
function mast(bx,py){x.fillStyle='#78909c';x.fillRect(bx-1*u,py-40*u,2*u,40*u);[['#c62828',6],['#fff',3.2]].forEach(q=>{x.strokeStyle=q[0];x.lineWidth=q[1]*u;x.beginPath();x.moveTo(bx-11*u,py-48*u);x.lineTo(bx+11*u,py-32*u);x.moveTo(bx+11*u,py-48*u);x.lineTo(bx-11*u,py-32*u);x.stroke()})}
function drawV(c,v,px,T){const y=T.y0+v.t*T.sp,X=px+(v.l?-1:1)*hw(y,T.gy)*.5;veh(X,y,(.55+1.3*Math.max(0,v.t))*u,v.ty,v.col,!v.l)}
function crBack(gy,P,cam){const T=cxT();for(const c of G.r.cx){const px=c.x*P-cam;if(px<-250||px>W+250)continue;
 x.fillStyle='#3d4349';x.beginPath();x.moveTo(px-hw(T.y0,gy),T.y0);x.lineTo(px+hw(T.y0,gy),T.y0);x.lineTo(px+hw(gy,gy),gy+1);x.lineTo(px-hw(gy,gy),gy+1);x.fill();
 c.veh.forEach(v=>{if(v.t<=T.tt)drawV(c,v,px,T)});
 const y=gy-14*u;barrier(px+hw(y,gy)+4*u,y,-1,c,hw(y,gy)*1.05);mast(px-hw(y,gy)-12*u,y)}}
function crRoad(gy,P,cam){for(const c of G.r.cx){const px=c.x*P-cam;if(px<-250||px>W+250)continue;const a=hw(gy,gy),b=hw(H,gy);
 const g=x.createLinearGradient(0,gy,0,H);g.addColorStop(0,'#4a5057');g.addColorStop(1,'#2b3036');x.fillStyle=g;x.beginPath();x.moveTo(px-a,gy);x.lineTo(px+a,gy);x.lineTo(px+b,H);x.lineTo(px-b,H);x.fill();
 x.fillStyle='rgba(255,255,255,.75)';let y=gy-26*u,k=.6;while(y<H){const h=7*u*k;if(y>=gy)x.fillRect(px-1.2*u*k,y,2.4*u*k,h);y+=h*2.2;k=(y-gy+26*u)/(60*u)+.6}
 x.fillStyle='#6d5a45';x.fillRect(px-a,gy+1*u,2*a,5*u)}}
function crFront(gy,P,cam){const T=cxT();for(const c of G.r.cx){const px=c.x*P-cam;if(px<-250||px>W+250)continue;
 c.veh.forEach(v=>{if(v.t>T.tt)drawV(c,v,px,T)});const y=gy+34*u;barrier(px-hw(y,gy)-4*u,y,1,c,hw(y,gy)*1.05)}}
function zoneF(xm){let f=0;for(const s of G.r.st){const d=Math.abs(xm-(s.x+SP/2)),z=d<650?1:d>850?0:(850-d)/200;if(z>f)f=z}return f}
function ai(dt){const a=G.ai=G.ai||[];a.forEach(q=>q.x+=q.v*dt*(1-.55*zoneF(q.x)));G.ai=a.filter(q=>Math.abs(q.x-G.pos)<1100);G.at=(G.at||2)-dt;
 if(G.at<=0&&G.ai.length<2){const d=Math.random()<.65?-1:1,sp=20+Math.random()*40;G.ai.push({x:d<0?G.pos+700:G.pos+(Math.random()<.5?-600:320),v:d*sp,d,i:Math.random()*TR.length|0});G.at=5+Math.random()*9}}
function traf2(dt){const a=G.tf=G.tf||[];a.forEach(v=>v.x+=v.v*dt);G.tf=a.filter(v=>v.x>G.pos-260&&v.x<G.pos+520);G.ts2=(G.ts2||0)-dt;
 if(G.ts2<=0&&G.tf.length<16){const l=Math.random()<.5?1:-1;G.tf.push({x:G.pos+140+Math.random()*300,v:l*(8+Math.random()*12),l,ty:['mtr','mtr','car','car','ang','trk','bus'][Math.random()*7|0],col:PAL[Math.random()*7|0]});G.ts2=Math.max(.25,1.2-G.v/80)*(.6+Math.random()*.8)}}
function farTrack(gy,P,cam){const y2=gy-30*u,y3=gy-48*u,ra=(y,xa,xb,s)=>{x.fillStyle='#6b5d4a';x.fillRect(xa,y,xb-xa,4.5*u*s);x.fillStyle='#4e342e';for(let X=xa-((cam+xa)%(10*u));X<xb;X+=10*u)x.fillRect(X,y+1*u*s,5*u,2.6*u*s);x.fillStyle='#d5dde1';x.fillRect(xa,y,xb-xa,1.4*u)};
 x.fillStyle='rgba(60,50,38,.55)';x.fillRect(0,y2+3.5*u,W,3.2*u);ra(y2,0,W,1);
 const sp=60*P;for(let i=Math.floor((cam-40)/sp);i<=Math.floor((cam+W)/sp)+1;i++){const px=i*sp-cam;x.fillStyle='#5d4037';x.fillRect(px-1.3*u,gy-92*u,2.6*u,62*u);x.fillRect(px-9*u,gy-90*u,18*u,2*u);x.strokeStyle='rgba(20,20,20,.7)';x.lineWidth=.9*u;[-7,0,7].forEach(d=>{x.beginPath();x.moveTo(px+d*u,gy-90*u);x.quadraticCurveTo(px+sp/2+d*u,gy-80*u,px+sp+d*u,gy-90*u);x.stroke()})}}
function aiTrains(gy,P,cam){const y2=gy-30*u,y3=gy-48*u,td=S.tod;(G.ai||[]).forEach(q=>{const t=TR[q.i],px=q.x*P-cam,tl=trLen(t)*u*.55,y=y2;if(q.d>0&&(px<-60||px-tl>W)||q.d<0&&(px>W+60||px+tl<0))return;
 x.save();x.globalAlpha=.93;if(q.d<0){x.translate(px,0);x.scale(-1,1);x.translate(-px,0)}WPH=q.x;drawTrain(x,t,px,y+1*u,u*.55,td==2);WPH=null;x.restore()})}
function village(gy,cam){const par=.3;for(let i=Math.floor((cam*par-40)/230);i<=Math.floor((cam*par+W)/230);i++){const r=hs(i+130);if(r<.3)continue;const X=i*230+r*80-cam*par,w2=(X+cam*par)*.007,y=gy-50*u-40*u*(.5+.3*Math.sin(w2*3)+.2*Math.sin(w2*7.1));
 x.fillStyle=S.tod==2?'#0f2a33':'#2d6a4f';
 if(r>.75){x.fillRect(X-4*u,y-14*u,8*u,14*u);x.beginPath();x.arc(X,y-14*u,7*u,Math.PI,0);x.fill();x.fillRect(X+10*u,y-30*u,3*u,30*u);x.beginPath();x.moveTo(X+8.5*u,y-30*u);x.lineTo(X+11.5*u,y-38*u);x.lineTo(X+14.5*u,y-30*u);x.fill()}
 else for(let j=0;j<3;j++){const o=j%2*3*u;x.fillRect(X+j*13*u,y-8*u-o,10*u,8*u+o);x.beginPath();x.moveTo(X+j*13*u-2*u,y-8*u-o);x.lineTo(X+j*13*u+5*u,y-15*u-o);x.lineTo(X+j*13*u+12*u,y-8*u-o);x.fill()}}}
function sveh(X,Y,s,ty,col,dir){x.save();x.translate(X,Y);x.scale(dir*s,s);x.fillStyle='rgba(0,0,0,.3)';x.beginPath();x.ellipse(0,0,24,3,0,0,7);x.fill();const wh=(a,r)=>{x.fillStyle='#111';x.beginPath();x.arc(a,-r,r,0,7);x.fill();x.fillStyle='#9e9e9e';x.beginPath();x.arc(a,-r,r*.4,0,7);x.fill()};
 if(ty=='mtr'){wh(-8,5);wh(8,5);x.strokeStyle=col;x.lineWidth=2.4;x.beginPath();x.moveTo(-8,-5);x.lineTo(-1,-12);x.lineTo(7,-12);x.lineTo(8,-5);x.stroke();x.fillStyle=col;x.fillRect(-3,-14,10,4);x.fillStyle=PAL[(PAL.indexOf(col)+3)%7];x.fillRect(-3,-23,6,10);x.fillStyle='#ffcc9c';x.beginPath();x.arc(1,-27,3.2,0,7);x.fill();x.fillStyle='#ff6f00';x.beginPath();x.arc(1,-28,3.5,Math.PI,0);x.fill()}
 else if(ty=='trk'){x.fillStyle=col;x.fillRect(-26,-30,30,24);x.fillStyle=sh(col,-.25);x.fillRect(5,-24,18,18);x.fillStyle='#1b2b38';x.fillRect(14,-22,7,8);wh(-18,5);wh(-8,5);wh(14,5);x.fillStyle='#fff59d';x.fillRect(22,-10,2,3)}
 else if(ty=='bus'){x.fillStyle=col;x.beginPath();x.roundRect(-28,-30,56,24,3);x.fill();x.fillStyle='#1b2b38';for(let j=0;j<5;j++)x.fillRect(-24+j*10,-27,8,9);x.fillRect(22,-27,5,12);wh(-18,5);wh(18,5);x.fillStyle='#fff59d';x.fillRect(27,-10,2,3)}
 else{const h=ty=='ang'?10:7;x.fillStyle=col;x.beginPath();x.roundRect(-20,-14,40,10,3);x.fill();x.fillStyle=sh(col,-.15);x.beginPath();x.moveTo(-12,-14);x.lineTo(-9,-14-h-3);x.lineTo(8,-14-h-3);x.lineTo(13,-14);x.fill();x.fillStyle='#1b2b38';x.beginPath();x.moveTo(-9,-15);x.lineTo(-7,-14-h-1);x.lineTo(7,-14-h-1);x.lineTo(10,-15);x.fill();wh(-12,4.5);wh(12,4.5);x.fillStyle='#fff59d';x.fillRect(19,-11,2,3);x.fillStyle='#ff1744';x.fillRect(-20,-11,2,3)}
 x.restore()}
function hwyRoad(gy,cam){const y1=gy+80*u,hh=34*u;x.fillStyle='#3a4046';x.fillRect(0,y1,W,hh);x.fillStyle='#e0e0e0';x.fillRect(0,y1,W,1.5*u);x.fillRect(0,y1+hh-1.5*u,W,1.5*u);x.fillStyle='#ffd54f';for(let X=-(cam%(40*u));X<W;X+=40*u)x.fillRect(X,y1+hh/2-.7*u,18*u,1.4*u)}
function hwyVeh(gy,P,cam){const y1=gy+80*u,hh=34*u;(G.tf||[]).forEach(v=>{const X=v.x*P-cam;if(X<-80||X>W+80)return;sveh(X,y1+hh*(v.l>0?.5:.92),u*.8,v.ty,v.col,v.l>0?1:-1)})}
function kobong(hx,gy,t){const e=10-G.kb,sm=Math.min(1,e/1.2),fi=e<3?0:Math.min(1,(e-3)/1.2)*Math.min(1,G.kb/1.2),
 cf={loco:{x0:-54,x1:-24,y:-46,s:[-38,-46]},steam:{x0:-56,x1:-20,y:-36,s:[-10,-48]}}[t.k]||{x0:-62,x1:-10,y:-44,s:[-30,-46]};
 for(let i=0;i<26;i++){const st=i%3==0,ph=(tm*.8+i/26)%1,src=st?cf.s[0]:cf.x0+(cf.x1-cf.x0)*hs(i),px=hx+src*u-ph*(36+G.v*1.3)*u,py=gy+(st?cf.s[1]:cf.y)*u-ph*(75+hs(i+3)*30)*u,r=(9+ph*28)*u*(.55+.45*sm),a=Math.min(1,ph*14)*(1-ph)*.72*sm,tn=Math.round(30+ph*70),g=x.createRadialGradient(px,py,0,px,py,r);
  g.addColorStop(0,'rgba('+tn+','+tn+','+(tn+4)+','+a+')');g.addColorStop(1,'rgba('+tn+','+tn+','+tn+',0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill()}
 if(fi>0){x.save();x.globalCompositeOperation='lighter';
  for(let i=0;i<34;i++){const st=i%4==0,ph=(tm*2.8+i*.29)%1,bx=hx+(st?cf.s[0]:cf.x0+(cf.x1-cf.x0)*hs(i+7))*u+Math.sin(tm*9+i)*2*u,by=gy+(st?cf.s[1]:cf.y)*u,px=bx-ph*(14+G.v*.5)*u,py=by-ph*(st?60:34)*fi*u,r=(8*(1-ph)+3)*u*(.6+.4*fi),g=x.createRadialGradient(px,py,0,px,py,r);
   g.addColorStop(0,'rgba(255,245,170,'+.95*(1-ph)*fi+')');g.addColorStop(.45,'rgba(255,130,25,'+.7*(1-ph)*fi+')');g.addColorStop(1,'rgba(190,25,0,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill()}
  for(let i=0;i<16;i++){const ph=(tm*1.6+i*.37)%1;x.fillStyle='rgba(255,'+(150+Math.floor(80*hs(i)))+',40,'+(1-ph)*fi+')';x.fillRect(hx+(cf.s[0]-hs(i+40)*18)*u-ph*(40+G.v)*u,gy+cf.s[1]*u-ph*(70*hs(i+50)+20)*u,2*u,2*u)}
  const hg=x.createLinearGradient(0,gy+cf.y*u-10*u,0,gy-10*u);hg.addColorStop(0,'rgba(255,140,40,'+.28*fi*(.8+.2*Math.sin(tm*14))+')');hg.addColorStop(1,'rgba(255,140,40,0)');x.fillStyle=hg;x.fillRect(hx+cf.x0*u,gy+cf.y*u-10*u,(cf.x1-cf.x0)*u,32*u);x.restore()}}
function banana(X,by,r){x.strokeStyle='#7cb342';x.lineWidth=5*u;x.beginPath();x.moveTo(X,by);x.lineTo(X+2*u,by-34*u);x.stroke();x.strokeStyle='#33691e';x.lineWidth=3.2*u;for(const a of[-2.7,-2.1,-1.5,-.9,-.4]){x.beginPath();x.moveTo(X+2*u,by-34*u);x.quadraticCurveTo(X+2*u+Math.cos(a)*16*u,by-34*u+Math.sin(a)*16*u-4*u,X+2*u+Math.cos(a)*30*u,by-20*u+Math.sin(a)*8*u);x.stroke()}x.fillStyle='#d4e157';x.beginPath();x.ellipse(X+5*u,by-26*u,3*u,6*u,.3,0,7);x.fill()}
function bamboo(X,by,r){x.lineWidth=2.2*u;for(let j=0;j<5;j++){const bx=X+j*5*u,h=(60+hs(j+r*50)*30)*u,sw=Math.sin(tm*1.2+j)*2*u;x.strokeStyle=j%2?'#8bc34a':'#689f38';x.beginPath();x.moveTo(bx,by);x.quadraticCurveTo(bx+sw,by-h*.5,bx+sw*2,by-h);x.stroke();x.fillStyle='#7cb342';for(let l=0;l<4;l++){x.beginPath();x.ellipse(bx+sw*2+(l%2?5:-5)*u,by-h+l*7*u,6*u,1.6*u,l%2?.4:-.4,0,7);x.fill()}}}
function paddyLife(gy,cam){for(let i=Math.floor((cam*.8-60)/140);i<=Math.floor((cam*.8+W)/140);i++){const r=hs(i+200),X=i*140+r*70-cam*.8,by=gy-8*u-r*8*u;
 if(r<.2){const bn=Math.sin(tm*1.4+i)*.35+.55;x.save();x.translate(X,by);x.strokeStyle='#3e2723';x.lineWidth=2.4*u;x.beginPath();x.moveTo(-2*u,0);x.lineTo(-3*u,-12*u);x.moveTo(2*u,0);x.lineTo(3*u,-12*u);x.stroke();x.translate(0,-12*u);x.rotate(bn);x.fillStyle=['#e53935','#1e88e5','#43a047','#fb8c00'][i&3];x.fillRect(-4*u,-14*u,8*u,14*u);x.fillStyle='#ffcc9c';x.beginPath();x.arc(0,-17*u,3.4*u,0,7);x.fill();x.fillStyle='#d7b56d';x.beginPath();x.moveTo(-9*u,-18*u);x.lineTo(0,-28*u);x.lineTo(9*u,-18*u);x.fill();x.restore()}
 else if(r<.28){x.save();x.translate(X,by);x.fillStyle='#4a4038';x.beginPath();x.ellipse(0,-14*u,15*u,8*u,0,0,7);x.fill();x.beginPath();x.ellipse(15*u,-18*u,6*u,4.5*u,.3,0,7);x.fill();x.strokeStyle='#cfc7b8';x.lineWidth=1.8*u;x.beginPath();x.arc(15*u,-22*u,6*u,Math.PI*1.1,Math.PI*1.9);x.stroke();x.fillStyle='#3a322b';[-10,-4,6,12].forEach(a=>x.fillRect(a*u,-9*u,2.4*u,9*u));x.restore()}}}
function flare(gy){const sx=W*.78,sy=gy*(S.tod==1?.62:.27),dx=W/2-sx,dy=H/2-sy;x.save();x.globalCompositeOperation='lighter';[[.25,14,.1],[.5,24,.07],[.8,10,.12],[1.15,32,.06],[1.45,18,.08]].forEach(f=>{const px=sx+dx*f[0],py=sy+dy*f[0],r=f[1]*u,g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(255,230,170,'+f[2]+')');g.addColorStop(1,'rgba(255,230,170,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill()});x.restore()}
function rain(gy){x.fillStyle='rgba(190,210,235,.22)';x.fillRect(0,gy+.5*u,W,2.2*u);x.fillStyle='rgba(30,45,65,.28)';x.fillRect(0,0,W,H);x.strokeStyle='rgba(205,220,235,.55)';x.lineWidth=1.1*u;x.beginPath();
 for(let i=0;i<150;i++){const sp=(700+hs(i)*300)*u,y=((hs(i+300)*H+tm*sp)%(H+40*u))-20*u,X=((hs(i)*(W+300)-y*.2)%(W+300)+W+300)%(W+300)-30,l=(10+hs(i+5)*10)*u;x.moveTo(X,y);x.lineTo(X-l*.2,y+l)}x.stroke();
 x.strokeStyle='rgba(220,230,240,.45)';x.lineWidth=u;for(let i=0;i<14;i++){const ph=(tm*2+hs(i+90))%1;x.globalAlpha=1-ph;x.beginPath();x.ellipse(hs(i+60)*W,gy+8*u+hs(i+70)*(H-gy-20*u),(2+ph*9)*u,(1+ph*2.5)*u,0,0,7);x.stroke()}x.globalAlpha=1}
function night(gy,cam){const hx=W*.62,tl=trLen(TR[S.sel])*u;let g=x.createLinearGradient(0,gy,0,gy+18*u);g.addColorStop(0,'rgba(255,225,150,.22)');g.addColorStop(1,'rgba(255,225,150,0)');x.fillStyle=g;x.fillRect(hx-tl,gy,tl,18*u);
 x.save();x.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const fx=(((hs(i)*W*1.5-cam*.9+Math.sin(tm*.7+i)*20*u)%W)+W)%W,fy=gy-24*u-hs(i+9)*70*u+Math.sin(tm*1.3+i*2)*8*u,a=.35+.65*Math.abs(Math.sin(tm*2+i)),r=7*u,q=x.createRadialGradient(fx,fy,0,fx,fy,r);q.addColorStop(0,'rgba(210,255,120,'+a+')');q.addColorStop(1,'rgba(210,255,120,0)');x.fillStyle=q;x.beginPath();x.arc(fx,fy,r,0,7);x.fill()}x.restore()}
function fgGrass(gy,cam){const g=x.createLinearGradient(0,H-60*u,0,H);g.addColorStop(0,'rgba(20,70,25,0)');g.addColorStop(1,'rgba(20,70,25,.85)');x.fillStyle=g;x.fillRect(0,H-60*u,W,60*u);
 for(let i=0;i<80;i++){const X=(((hs(i)*W*3-cam*1.3)%W)+W)%W,h=(12+hs(i+4)*24)*u,l=(hs(i+8)-.5)*10*u;x.strokeStyle=i%2?'#2e7d32':'#4caf50';x.lineWidth=1.6*u;x.beginPath();x.moveTo(X,H+2);x.quadraticCurveTo(X+l*.4,H-h*.6,X+l,H-h);x.stroke()}}
let BG,GR,VG,CL,BP,BPAT;
function buildCaches(){ck=W+'|'+H+'|'+S.tod;SPR={};const gy=H*.72,td=S.tod,sk=SK[td];let q,g;
 [BG,q]=mkc(W,gy+2);g=q.createLinearGradient(0,0,0,gy);g.addColorStop(0,sk[0]);g.addColorStop(.55,sk[1]);g.addColorStop(1,sk[2]);q.fillStyle=g;q.fillRect(0,0,W,gy+2);
 const sx=W*.78,sy=gy*(td==1?.62:.27);g=q.createRadialGradient(sx,sy,0,sx,sy,170*u);g.addColorStop(0,td==2?'rgba(200,210,255,.35)':'rgba(255,240,170,.8)');g.addColorStop(1,'rgba(255,240,170,0)');q.fillStyle=g;q.fillRect(sx-180*u,sy-180*u,360*u,360*u);
 if(td<2){q.save();q.translate(sx,sy);for(let i=0;i<7;i++){q.rotate(.9);const rr=q.createLinearGradient(0,0,330*u,0);rr.addColorStop(0,'rgba(255,245,190,.16)');rr.addColorStop(1,'rgba(255,245,190,0)');q.fillStyle=rr;q.beginPath();q.moveTo(0,0);q.lineTo(330*u,-26*u);q.lineTo(330*u,26*u);q.fill()}q.restore()}
 q.fillStyle=td==2?'#f5f5dc':td==1?'#ffb74d':'#fffde7';q.beginPath();q.arc(sx,sy,(td==2?24:34)*u,0,7);q.fill();if(td==2){q.fillStyle='rgba(0,0,0,.08)';[[-7,-5,6],[8,4,5],[-2,9,4],[9,-8,3]].forEach(c2=>{q.beginPath();q.arc(sx+c2[0]*u,sy+c2[1]*u,c2[2]*u,0,7);q.fill()});q.save();q.translate(W*.35,gy*.35);q.rotate(-.45);const mg=q.createLinearGradient(0,-40*u,0,40*u);mg.addColorStop(0,'rgba(170,185,255,0)');mg.addColorStop(.5,'rgba(190,200,255,.14)');mg.addColorStop(1,'rgba(170,185,255,0)');q.fillStyle=mg;q.fillRect(-W,-40*u,W*2,80*u);q.restore()}
 [GR,q]=mkc(W,H-gy+2);g=q.createLinearGradient(0,0,0,H-gy);g.addColorStop(0,'#8a7a64');g.addColorStop(.15,'#5f5040');g.addColorStop(1,'#2a2017');q.fillStyle=g;q.fillRect(0,0,W,H-gy+2);
 [BP,q]=mkc(64,16);q.fillStyle='#6a5c4a';q.fillRect(0,0,64,16);for(let i=0;i<110;i++){q.fillStyle=['#8d7f6c','#a0927e','#5b4e3e','#b3a590'][i&3];q.beginPath();q.ellipse(hs(i)*64,hs(i+60)*16,1.2+hs(i+9)*1.8,.9+hs(i+4)*1.1,hs(i)*3,0,7);q.fill()}
 BPAT=x.createPattern(BP,'repeat');if(typeof DOMMatrix!='undefined'&&BPAT&&BPAT.setTransform)BPAT.setTransform(new DOMMatrix().scale(1/DPRv));
 [VG,q]=mkc(W,H);g=q.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.35)');q.fillStyle=g;q.fillRect(0,0,W,H);
 [CL,q]=mkc(200*u,96*u);[[0,0,34],[28,-6,28],[-28,4,24],[54,5,20],[-52,6,18]].forEach(p=>{const cx=100*u+p[0]*u,cy=48*u+p[1]*u,r=p[2]*u,gg=q.createRadialGradient(cx,cy,0,cx,cy,r);gg.addColorStop(0,'rgba(255,255,255,.95)');gg.addColorStop(1,'rgba(255,255,255,0)');q.fillStyle=gg;q.beginPath();q.arc(cx,cy,r,0,7);q.fill()})}
/* ===== TANJAKAN & TURUNAN: kontur halus (gabungan 2 gelombang sinus), datar di stasiun & perlintasan ===== */
const HILL=34,GRAV=7;let HZ=[];
function hillZones(){const a=G.pos-1400,b=G.pos+2600;HZ=[];for(const s of G.r.st)if(s.x+SP+560>a&&s.x-560<b)HZ.push([s.x-140,s.x+SP+140]);for(const c of(G.r.cx||[]))if(c.x+560>a&&c.x-560<b)HZ.push([c.x-110,c.x+110])}
const sst=t=>t*t*(3-2*t);
function hillH(p){let f=1;for(let i=0;i<HZ.length;i++){const z=HZ[i],q=p<z[0]?z[0]-p:p>z[1]?p-z[1]:0;if(q<420)f*=sst(q/420)}return f*HILL*(.62*Math.sin(p*.0049+.6)+.38*Math.sin(p*.0127+2.1))}
const hillSlope=p=>(hillH(p+2)-hillH(p-2))/(4*3.67);
function beginShear(){if(!OFFC||OFFC.width!=cv.width||OFFC.height!=cv.height){OFFC=document.createElement('canvas');OFFC.width=cv.width;OFFC.height=cv.height;OFX=OFFC.getContext('2d')}
 OFX.setTransform(1,0,0,1,0,0);OFX.clearRect(0,Math.max(0,Math.floor((H*.72-240*u)*DPRv)),OFFC.width,OFFC.height);OFX.setTransform(DPRv,0,0,DPRv,0,0);OFX.imageSmoothingEnabled=true;OFX.imageSmoothingQuality='high';x=OFX}
function endShear(cam,P){x=XM;const d=DPRv,cw=cv.width,ch=cv.height;
 x.setTransform(d,0,0,d,0,0);x.fillStyle='#2a2017';x.fillRect(0,H-46*u,W,46*u+2);
 const y0=Math.max(0,Math.floor((H*.72-240*u)*d)),hh=ch-y0,N=Math.max(12,Math.ceil(W/22));
 /* kontur = rangkaian segmen miring yang saling menyambung (tanpa anak tangga, tanpa pembulatan) */
 const off=px=>-hillH((px/d+cam)/P)*u*d;let sx0=0,o0=off(0);
 for(let i=1;i<=N;i++){const sx1=i==N?cw:Math.round(i*cw/N),w=sx1-sx0;if(w<=0)continue;const o1=off(sx1),m=(o1-o0)/w;
  x.setTransform(1,m,0,1,0,o0-m*sx0);x.drawImage(OFFC,sx0,y0,w,hh,sx0,y0,w,hh);sx0=sx1;o0=o1}
 x.setTransform(d,0,0,d,0,0)}
function draw(){
 const t=TR[S.sel],gy=H*.72,P=3.67*u,cam=G.pos*P-W*.62,hx=W*.62,td=S.tod,el=t.k=='krl'||t.k=='mrt'||t.k=='bullet';
 hillZones();if(ck!=W+'|'+H+'|'+S.tod)buildCaches();x.drawImage(BG,0,0,W,gy+2);let g;
 if(td==2){x.fillStyle='#fff';for(let i=0;i<60;i++){x.globalAlpha=.3+.7*Math.abs(Math.sin(tm*2+i));x.fillRect(hs(i)*W,hs(i+50)*gy*.8,1.6,1.6)}x.globalAlpha=1}
 if(td<2){x.strokeStyle='rgba(30,40,50,.6)';x.lineWidth=1.6*u;for(let i=0;i<5;i++){const bx=((hs(i+20)*W+tm*(26+i*6))%(W+120))-60,by=gy*(.12+.22*hs(i+30))+Math.sin(tm*2+i)*5*u,fl=Math.sin(tm*9+i*2)*4*u;x.beginPath();x.moveTo(bx-7*u,by-fl);x.quadraticCurveTo(bx-3*u,by-4*u,bx,by);x.quadraticCurveTo(bx+3*u,by-4*u,bx+7*u,by-fl);x.stroke()}}
 x.globalAlpha=td==2?.25:.95;for(let i=0;i<6;i++){const cx=(((hs(i)*1500+tm*(6+i*2)-cam*.03)%(W+300))+W+300)%(W+300)-150,cy=gy*(.1+hs(i+9)*.3);x.drawImage(CL,cx-100*u,cy-48*u,200*u,96*u)}x.globalAlpha=1;
 ly(.05,150,120,.004,'#86b9de',1,gy,cam);ly(.12,95,70,.006,'#5aa585',1,gy,cam);ly(.3,50,40,.007,'#3f9560',0,gy,cam);village(gy,cam);
 g=x.createLinearGradient(0,gy-150*u,0,gy);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.22)');x.fillStyle=g;x.fillRect(0,gy-150*u,W,150*u);
 beginShear();g=x.createLinearGradient(0,gy-26*u,0,gy);g.addColorStop(0,'#8bc34a');g.addColorStop(1,'#5f9a2c');x.fillStyle=g;x.fillRect(0,gy-26*u,W,28*u);x.fillStyle='rgba(255,255,255,.12)';
 const sw=45*u;for(let X=-((cam*.9)%(2*sw))-2*sw;X<W;X+=2*sw)x.fillRect(X,gy-26*u,sw,28*u);
 farTrack(gy,P,cam);
 for(let i=Math.floor((cam*.85-60)/90);i<=Math.floor((cam*.85+W)/90);i++){const r=hs(i+77),X=i*90+r*40-cam*.85,b=(14+r*14)*u;if(r>.35){const bg=x.createRadialGradient(X,gy-24*u-b*.4,b*.2,X,gy-22*u-b*.4,b*1.4);bg.addColorStop(0,"#5aa83a");bg.addColorStop(1,"#2b6a24");x.fillStyle=bg;x.beginPath();x.ellipse(X,gy-23*u,b*1.5,b,0,Math.PI,0);x.fill()}}
 paddyLife(gy,cam);
 for(let i=Math.floor((cam*.7-100)/170);i<=Math.floor((cam*.7+W)/170);i++){const r=hs(i+3),X=i*170+r*60-cam*.7;if(r>.55)palm(X,gy-22*u,.9,r>.78?-1:1);else if(r<.18)house(X,gy-22*u,r*5);else if(r>.3&&r<.42)banana(X,gy-22*u,r);else if(r>.42&&r<.5)bamboo(X,gy-22*u,r)}
 if(el){const sp=50*P;for(let i=Math.floor(cam/sp);i<=Math.floor((cam+W)/sp)+1;i++){const px=i*sp-cam;x.fillStyle='#607d8b';x.fillRect(px-2*u,gy-110*u,4*u,110*u);x.fillRect(px-2*u,gy-110*u,22*u,3*u);x.strokeStyle='#37474f';x.lineWidth=1.3*u;x.beginPath();x.moveTo(px+20*u,gy-107*u);x.quadraticCurveTo(px+sp/2,gy-80*u,px+sp+20*u,gy-107*u);x.stroke()}x.strokeStyle='#263238';x.lineWidth=1.5*u;x.beginPath();x.moveTo(0,gy-60*u);x.lineTo(W,gy-60*u);x.stroke()}
 crBack(gy,P,cam);G.r.st.forEach(s=>stBack(s,s.x*P-cam,gy,P));aiTrains(gy,P,cam);
 G.r.sg.forEach(s=>{const px=s.x*P-cam;if(px<-40||px>W+40)return;x.fillStyle='#555';x.fillRect(px-2*u,gy-62*u,4*u,62*u);x.fillStyle='#fff';x.beginPath();x.arc(px,gy-72*u,16*u,0,7);x.fill();x.strokeStyle='#e53935';x.lineWidth=4*u;x.stroke();x.fillStyle='#111';x.font='bold '+14*u+'px sans-serif';x.textAlign='center';x.fillText(s.l,px,gy-67*u)});
 x.drawImage(GR,0,gy,W,H-gy+2);x.save();x.translate(-(cam%64),gy+4*u);x.fillStyle=BPAT;x.fillRect(0,0,W+64,17*u);x.restore();
 x.fillStyle='rgba(255,255,255,.1)';for(let i=0;i<40;i++)x.fillRect((((hs(i)*W*1.6-cam)%W)+W)%W,gy+8*u+hs(i+7)*(H-gy-10*u),2*u,1.5*u);
 hwyRoad(gy,cam);crRoad(gy,P,cam);x.fillStyle='#3e2a20';for(let X=-(cam%(14*u));X<W;X+=14*u)x.fillRect(X,gy,9*u,6*u);x.fillStyle='#455a64';x.fillRect(0,gy+2*u,W,3*u);x.fillStyle='#e3e8eb';x.fillRect(0,gy,W,2.5*u);x.fillStyle='rgba(255,255,255,.18)';x.fillRect(0,gy+.4*u,W,.7*u);x.fillStyle='rgba(180,180,180,.45)';for(let i=0;i<70;i++)x.fillRect((((hs(i+11)*W*2-cam)%W)+W)%W,gy+6*u+hs(i+3)*12*u,1.8*u,1.2*u);
 if(S.wx==2){const f2=x.createLinearGradient(0,gy-220*u,0,gy+30*u);f2.addColorStop(0,'rgba(225,230,235,.75)');f2.addColorStop(1,'rgba(225,230,235,.25)');x.fillStyle=f2;x.fillRect(0,0,W,gy+30*u)}
 const bob=G.m=='play'||G.m=='menu'?(Math.sin(tm*11)*.5+.5)*Math.min(G.v/12,1.6)*u*.45:0;G.pit=(G.pit||0)+((G.m=='play'?Math.max(-.025,Math.min(.025,-(G.ac||0)*.0035)):0)-(G.pit||0))*.08;
 {const pv=hx-trLen(t)*u*.5;x.save();x.translate(pv,gy);x.rotate(G.pit||0);x.translate(-pv,-gy);drawTrain(x,t,hx,gy-bob,u,td==2);x.restore()}if(G.kb>0)kobong(hx,gy-bob,t);
 G.fx=(G.fx||[]).filter(f=>tm-f.t<1.2);G.fx.forEach(f=>{const ag=tm-f.t;x.globalAlpha=1-ag/1.2;x.fillStyle="#ffd23f";x.strokeStyle="#000";x.lineWidth=3*u;x.font="bold "+17*u+"px sans-serif";x.textAlign="center";x.strokeText("+50 🪙",hx-60*u,gy-100*u-ag*45*u);x.fillText("+50 🪙",hx-60*u,gy-100*u-ag*45*u);x.globalAlpha=1});
 G.pf.forEach(p=>{if(p.a>=0)puff(p.x*P-cam,gy-(p.by||52)*u-p.a*40*u,(6+p.a*10)*u,.6-p.a*.3,p.cl)});
 crFront(gy,P,cam);G.r.st.forEach(s=>stFront(s,s.x*P-cam,gy,P,cam));
 hwyVeh(gy,P,cam);endShear(cam,P);const gyT=gy-hillH((hx+cam)/P)*u;fgGrass(gy,cam);if(S.wx==1)rain(gy);if(td==2)night(gyT,cam);if(td<2&&!S.wx)flare(gy);if(td){x.fillStyle=td==1?'rgba(255,110,30,.14)':'rgba(5,10,60,.5)';x.fillRect(0,0,W,H);
  x.globalCompositeOperation='lighter';const nx=hx+(t.k=='bullet'?30:2)*u;g=x.createRadialGradient(nx,gyT-18*u,0,nx,gyT-18*u,90*u);g.addColorStop(0,'rgba(255,240,170,'+(td==2?.55:.2)+')');g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.fillRect(nx-100*u,gyT-110*u,200*u,200*u);x.globalCompositeOperation='source-over'}
 if(td==2){const q=x.createLinearGradient(hx,0,hx+450*u,0);q.addColorStop(0,'rgba(255,245,160,.3)');q.addColorStop(1,'rgba(255,245,160,0)');x.fillStyle=q;x.beginPath();x.moveTo(hx+(t.k=='bullet'?28:0)*u,gyT-18*u);x.lineTo(hx+450*u,gyT-60*u);x.lineTo(hx+450*u,gyT+10*u);x.fill()}
 if(G.v>8){x.strokeStyle='rgba(255,255,255,.14)';x.lineWidth=1.5*u;for(let i=0;i<12;i++){const X=(((hs(i+3)*W*2-cam*1.6)%(W+300))+W+300)%(W+300)-150,Y=gy+14*u+hs(i)*(H-gy-24*u);x.beginPath();x.moveTo(X,Y);x.lineTo(X+G.v*u*(.5+hs(i+9)),Y);x.stroke()}}
 x.drawImage(VG,0,0,W,H);
 if(G.m=='play'||G.m=='pause'){sm+=(G.v*3.6-sm)*.2;$('sc').textContent=Math.floor(G.sc);$('cn').textContent=S.coin;
  const l=$('lim');l.textContent=limAt(G.pos);l.classList.toggle('ov',!!G.ov);const tl=Math.floor(G.ts||0);$('tl').textContent='⏱ '+Math.floor(tl/60)+':'+String(tl%60).padStart(2,'0');
  const s=G.r.st[G.ni];{const cw=nextCx(),ss=s?'🚉 '+s.nm+' — '+Math.max(0,Math.round(s.x+SP-5-G.pos))+' m':'🚉 Selesai!';$('nx').textContent=cw?'🚧 Perlintasan '+Math.round(cw.x-G.pos)+' m'+(cw.hn?' ✔':' — tahan KLAKSON!'):ss}
  $('tt').textContent='GAS N'+th+(G.es==2?'':G.es==1?' (starter…)':' (mesin mati)');$('eg').disabled=G.es!=0;$('gb').disabled=!canSwap();$('gb').style.display=(t.k=='loco'||t.k=='steam')?'':'none';$('ek').disabled=G.es!=2;$('lt2').style.opacity=G.es==2?1:.4;const ko=$('kobong');ko.classList.toggle('on',G.kb>0);if(G.kb>0)ko.textContent='🔥 KOBONG '+Math.ceil(G.kb)+' dtk';$('tb').textContent=em?'DARURAT':'REM B'+bk;$('kt').style.bottom=th/8*100+'%';$('kb').style.bottom=(em?1:bk/5)*100+'%';gauge(t)}}
/* shop & settings */
const bar=(l,f)=>`<div class="st"><span>${l}</span><i><u style="width:${Math.round(Math.min(1,f)*100)}%"></u></i></div>`;
function shop(){$('sc2').textContent=S.coin;const g=$('grid');g.innerHTML='';
 TR.forEach((t,i)=>{const d=document.createElement('div');d.className='cd';
  d.innerHTML='<canvas width="270" height="76"></canvas><b>'+t.n+'</b><small>'+t.s+'</small>'+bar('Kecepatan',t.v/400)+bar('Akselerasi',t.a/3.6)+bar('Rem',t.b/4.6)+bar('Pendapatan',t.m/3)+'<button class="b sm"></button>';
  const c=d.querySelector('canvas').getContext('2d');c.fillStyle='#8d7b68';c.fillRect(0,68,270,8);c.fillStyle='#cfd8dc';c.fillRect(0,66,270,2);const ss=Math.min(.55,235/trLen(t));drawTrain(c,t,236,66,ss,0);
  const bt=d.querySelector('button'),o=S.own.includes(i);
  bt.textContent=o?(S.sel==i?'✔ DIPAKAI':'PILIH'):(S.coin>=t.p?'BELI 🪙'+t.p:'🔒 🪙'+t.p);bt.className='b sm '+(o?(S.sel==i?'g':'bl'):(S.coin>=t.p?'y':''));bt.disabled=!o&&S.coin<t.p;
  bt.onclick=()=>{au();if(!o){S.coin-=t.p;S.own.push(i);ding()}S.sel=i;sv();shop()};g.appendChild(d)})}
function sets(){$('s1').textContent='🔊 Suara: '+(S.snd?'NYALA':'MATI');$('s2').textContent='🎯 Kesulitan: '+DN[S.df];$('s3').textContent='🕒 Waktu: '+TN[S.tod];$('s6').textContent='🌦 Cuaca: '+['CERAH','HUJAN','BERKABUT'][S.wx||0]}
const on=(id,f)=>$(id).onclick=()=>{au();f()};
on('bm',startGame);on('bt',()=>{shop();show('shop')});on('bs',()=>{sets();show('set')});on('sb1',toMenu);on('s5',toMenu);
on('s1',()=>{S.snd^=1;sv();sets();ding()});on('s2',()=>{S.df=(S.df+1)%3;sv();sets()});on('s3',()=>{S.tod=(S.tod+1)%3;sv();sets()});on('s6',()=>{S.wx=((S.wx||0)+1)%3;sv();sets()});
on('s4',()=>{if(confirm('Hapus semua koin, kereta, dan skor tertinggi?')){S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:0};sv();sets()}});
on('bp',pz);on('br',pz);on('bq',toMenu);
/* kontrol: tuas gas (notch 0-8) dan tuas rem (0-5) seperti kereta asli */
function setTh(v){v=Math.max(0,Math.min(8,v));if(G.m=='play'&&G.es!=2&&v>0){if(tm-(G.nt||0)>1.5){G.nt=tm;toast('Nyalakan mesin dulu! (tombol E)')}return}if(v!=th)tk();th=v;if(v>0){bk=0;em=0}}
function setBk(v){v=Math.max(0,Math.min(5,v));if(v!=bk)tk();bk=v;if(v>0)th=0}
function lever(id,mx,fn){const e=$(id);let d=0;const f=ev=>{const r=e.getBoundingClientRect();fn(Math.round(Math.max(0,Math.min(1,1-(ev.clientY-r.top)/r.height))*mx))};
 e.addEventListener('pointerdown',ev=>{ev.preventDefault();au();d=1;e.setPointerCapture(ev.pointerId);f(ev)});e.addEventListener('pointermove',ev=>{if(d)f(ev)});['pointerup','pointercancel'].forEach(n=>e.addEventListener(n,()=>d=0))}
on('eg',startEng);on('gb',openSwap);on('gx',()=>{G.m='play';show(null)});on('ek',stopEng);lever('lt2',8,setTh);lever('lb',5,setBk);
const hb=$('hrn'),eb=$('emg');hb.addEventListener('pointerdown',e=>{e.preventDefault();au();hornOn(TR[S.sel].k)});['pointerup','pointerleave','pointercancel'].forEach(n=>{hb.addEventListener(n,hornOff);eb.addEventListener(n,()=>em=0)});
eb.addEventListener('pointerdown',e=>{e.preventDefault();au();em=1;th=0});
addEventListener('keydown',e=>{au();K[e.code]=1;if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();if(e.repeat)return;
 if(G.m=='play'){if(e.code=='ArrowUp'||e.code=='KeyW')setTh(th+1);if(e.code=='ArrowDown'||e.code=='KeyS')setTh(th-1);if(e.code=='ArrowRight'||e.code=='KeyD')setBk(bk+1);if(e.code=='ArrowLeft'||e.code=='KeyA')setBk(bk-1);if(e.code=='Space'){em=1;th=0}if(e.code=='KeyH')hornOn(TR[S.sel].k);if(e.code=='KeyE'){G.es?stopEng():startEng()}}
 if(e.code=='KeyP'||e.code=='Escape')pz()});
addEventListener('keyup',e=>{K[e.code]=0;if(e.code=='Space')em=0;if(e.code=='KeyH')hornOff()});
addEventListener('blur',()=>{K={};em=0;hornOff();if(G.m=='play')pz()});
/* loop */
let last=0;function loop(ts){const raw=Math.min(.05,(ts-last)/1000||0);last=ts;dtS+=(raw-dtS)*.2;const dt=raw>.04?raw:dtS;if(G.m!='pause')tm+=dt;upd(dt);draw();requestAnimationFrame(loop)}
toMenu();requestAnimationFrame(loop);
