const $=id=>document.getElementById(id),cv=$('c'),x=cv.getContext('2d',{alpha:false});
const SP=200,hs=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const NM=['Jakarta Kota','Manggarai','Gambir','Jatinegara','Bekasi','Cikarang','Karawang','Cikampek','Purwakarta','Padalarang','Bandung','Cirebon','Semarang Tawang','Yogyakarta','Solo Balapan','Madiun','Surabaya Gubeng'];
const TR=[
{n:'KA Lokal Bandung Raya',s:'Lokomotif CC 201 + gerbong ekonomi',p:0,v:170,a:2.2,b:3,m:1,k:'loco',lv:{u:'#e8eef0',bd:'#0d47a1',st:'#43a047',st2:'#ffa000',r:'#c62828',no:'CC 201'},c1:'#0d47a1',cb:'#e8eef0',c2:'#43a047',c3:'#ffa000',cars:['cc','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Bima',s:'Lokomotif CC 203 + gerbong eksekutif',p:1500,v:180,a:2.3,b:3.1,m:1.4,k:'loco',lv:{u:'#eceff1',bd:'#546e7a',st:'#fb8c00',st2:'#546e7a',r:'#c62828',no:'CC 203'},c1:'#eceff1',cb:'#eceff1',c2:'#fb8c00',c3:'#546e7a',cars:['cc','eks','eks','eks','res','eks','eks','bag']},
{n:'Kereta Uap Jaladara',s:'Lokomotif uap + gerbong kayu',p:2500,v:120,a:1.6,b:2.5,m:2,k:'steam',c1:'#212121',cb:'#2e7d32',c2:'#fdd835',cars:['uap','tdr','kay','kay','kay','kay','kay','kay']},
{n:'KA Taksaka',s:'Lokomotif CC 204 + gerbong eksekutif',p:4000,v:190,a:2.4,b:3.3,m:1.8,k:'loco',lv:{u:'#e3f2fd',bd:'#1565c0',st:'#1565c0',st2:'#0d47a1',r:'#c62828',no:'CC 204'},c1:'#e3f2fd',cb:'#e3f2fd',c2:'#1565c0',c3:'#0d47a1',cars:['cc','eks','eks','eks','eks','res','eks','bag']},
{n:'LRT Jabodebek',s:'Inka-Bombardier',p:6000,v:160,a:2.7,b:3.4,m:1.7,k:'mrt',nz:3,c1:'#fafafa',c2:'#29b6f6',c3:'#ff7043',cars:['ec','em','em','em','em','em','em','ec']},
{n:'KA Argo Bromo Anggrek',s:'Lokomotif CC 206 + gerbong eksekutif',p:8000,v:220,a:2.6,b:3.5,m:2.2,k:'loco',lv:{u:'#f5f5f5',bd:'#1a237e',st:'#ff9800',st2:'#1a237e',r:'#c62828',no:'CC 206'},c1:'#f5f5f5',cb:'#f5f5f5',c2:'#ff9800',c3:'#1a237e',cars:['cc','eks','eks','eks','res','eks','eks','bag']},
{n:'Kereta Cepat Whoosh',s:'KCIC400AF',p:12000,v:400,a:3.6,b:4.6,m:3,k:'bullet',c1:'#fafafa',c2:'#d32f2f',c3:'#ffc107',cars:['bh','bm','bm','bm','bm','bm','bm','bh']}];
let S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:0};
try{Object.assign(S,JSON.parse(localStorage.getItem('kn1')||'{}'))}catch(e){}
S.own=S.own.filter(i=>i<TR.length);if(!S.own.includes(0))S.own.push(0);if(!TR[S.sel]||!S.own.includes(S.sel))S.sel=0;
const sv=()=>{try{localStorage.setItem('kn1',JSON.stringify(S))}catch(e){}};
const DF=[.6,1,1.6],DN=['MUDAH','NORMAL','SULIT'],TN=['☀ SIANG','🌇 SORE','🌙 MALAM'];
let W,H,u,G={m:'menu',pos:0,v:10,r:{st:[],sg:[],cx:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0},tm=0,K={},th=0,bk=0,em=0,DPRv=1,ck="",REC=null,MIR=0,PPL=false,WPH=null,GK="",dtS=.016,SPR={};
function rs(){const d=Math.max(1,Math.min(Math.max(devicePixelRatio||1,1.5),2.5,Math.sqrt(8e6/(innerWidth*innerHeight))));W=innerWidth;H=innerHeight;DPRv=d;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);x.imageSmoothingEnabled=true;x.imageSmoothingQuality="high";u=Math.max(.5,Math.min(H/600,W/760))}
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
function newLevel(){G.r=gen();G.pos=SP;G.v=0;G.ni=1;G.dw=0;G.ts=0;th=bk=em=0;G.dg=0;G.m='play';G.pf=[];show(null);hud(1);toast('Menuju '+G.r.st[1].nm)}
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
function phys(dt,t,mv,N){
 if(G.dw>0){G.v=0;G.dw-=dt;if(G.dw<=0){G.dw=0;toast('Berangkat! 🚆');G.ts=0}}
 else{
  let a=N>0?t.a*(N/8-G.v/mv):-(.05+.25*t.a*G.v/mv);if(N>0&&a<0)a*=.3;
  a-=em?t.b*1.7:t.b*bk/5;
  G.v=Math.max(0,Math.min(mv,G.v+a*dt));G.pos+=G.v*dt;G.ts+=dt;G.ac=a}
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
function upd(dt){
 const t=TR[S.sel],mv=t.v/3.6,pl=G.m=='play',N=bk>0||em?0:th;
 if(t.k=='steam'&&(pl||G.m=='menu')&&tm-G.lp>.09&&(G.v>0||G.m=='menu')){G.lp=tm;G.pf.push({x:G.pos-2.3,a:0})}
 G.pf.forEach(p=>p.a+=dt);G.pf=G.pf.filter(p=>p.a<2);
 if(G.m=='menu'||G.m=='play'){ai(dt);traf2(dt)}
 if(G.m=='menu'){G.pos+=25*dt;G.v=25}else if(pl&&!phys(dt,t,mv,N))return;
 if(G.m=='menu'||pl){G.cd=(G.cd||0)+G.v*dt;if(G.cd>=12){G.cd-=12;clack(G.v/mv)}if(t.k=='steam'){G.cs=(G.cs||0)+G.v*dt;if(G.cs>=4){G.cs-=4;chuff(G.v/mv)}}}
 eng(G.m=='menu'||pl,G.v/mv,N/8,em?1.4:bk/5,t.k)}
/* drawing */
const LEN={cc:60,uap:66,tdr:40,kay:58,ec:66,em:66,bh:70,bm:66,eko:64,eks:66,res:66,bag:58};
const trLen=t=>t.cars.reduce((s,c)=>s+LEN[c]+3,0);
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
function bogie(c,cx,gy,k,n){c.fillStyle='#263238';c.beginPath();c.roundRect(cx-(n*4.5+1)*k,gy-10*k,(n*9+2)*k,5*k,2*k);c.fill();c.fillStyle='#455a64';c.fillRect(cx-n*4.5*k,gy-10*k,n*9*k,1.2*k);c.strokeStyle='#90a4ae';c.lineWidth=.7*k;[-1,1].forEach(d=>{c.beginPath();c.moveTo(cx+d*n*3*k,gy-13*k);c.lineTo(cx+d*n*3*k,gy-10*k);c.stroke()});if(REC){REC.push([MIR?MIR-cx:cx,n]);return}wheels(c,cx,gy,k,n)}
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
 c.fillStyle='#111';c.fillRect(xr-14*k,gy-52*k,8*k,20*k);c.fillRect(xr-16.5*k,gy-54*k,13*k,3.5*k);
 c.fillStyle='#c9a227';c.beginPath();c.arc(xl+36*k,gy-35*k,6*k,Math.PI,0);c.fill();c.fillRect(xl+31*k,gy-36*k,10*k,2*k);
 c.fillStyle='#b71c1c';c.beginPath();c.moveTo(xr-2*k,gy-16*k);c.lineTo(xr+9*k,gy-5*k);c.lineTo(xr-2*k,gy-5*k);c.fill();
 c.fillStyle='#fff59d';c.beginPath();c.arc(xr-1.5*k,gy-26*k,3.4*k,0,7);c.fill();
 [[xl+31*k,9.5],[xl+50*k,9.5],[xl+11*k,5.5]].forEach(w=>{const r=w[1]*k;c.fillStyle='#b71c1c';c.beginPath();c.arc(w[0],gy-r,r,0,7);c.fill();c.strokeStyle='#111';c.lineWidth=k;c.stroke();c.beginPath();for(let s=0;s<4;s++){const a=G.pos*.55+s*Math.PI/4;c.moveTo(w[0]+Math.cos(a)*r*.85,gy-r+Math.sin(a)*r*.85);c.lineTo(w[0]-Math.cos(a)*r*.85,gy-r-Math.sin(a)*r*.85)}c.lineWidth=.8*k;c.stroke()});
 const a=G.pos*.55;c.strokeStyle='#cfd8dc';c.lineWidth=2*k;c.beginPath();c.moveTo(xl+31*k+Math.cos(a)*5*k,gy-9.5*k+Math.sin(a)*5*k);c.lineTo(xl+50*k+Math.cos(a)*5*k,gy-9.5*k+Math.sin(a)*5*k);c.stroke();STE(c,xl,xr,gy,k)}
function STE(c,xl,xr,gy,k){c.fillStyle='rgba(255,255,255,.2)';c.beginPath();c.roundRect(xl+24*k,gy-33*k,38*k,3.5*k,2*k);c.fill();c.fillStyle='#d4af37';for(let i=0;i<9;i++){c.beginPath();c.arc(xl+27*k+i*4.3*k,gy-18*k,.7*k,0,7);c.fill()}c.fillRect(xr-33*k,gy-26*k,10*k,5*k);c.fillStyle='#111';c.font='bold '+4*k+'px sans-serif';c.textAlign='center';c.fillText('12',xr-28*k,gy-22*k);c.fillStyle='#d4af37';c.fillRect(xl+14*k,gy-47*k,2*k,5*k);c.beginPath();c.arc(xl+15*k,gy-48*k,2*k,0,7);c.fill();c.strokeStyle='#cfd8dc';c.lineWidth=.9*k;c.beginPath();c.moveTo(xl+22*k,gy-29*k);c.lineTo(xr-6*k,gy-29*k);c.stroke()}
function loco(c,xl,xr,gy,k,t,ng){const v=t.lv;
 c.fillStyle='#2b3338';c.fillRect(xl+3*k,gy-12*k,xr-xl-6*k,4*k);c.fillStyle='#37474f';c.beginPath();c.roundRect(xl+16*k,gy-15*k,28*k,7*k,2*k);c.fill();
 c.beginPath();c.roundRect(xl,gy-38*k,31*k,30*k,2*k);fg(c,gy-38*k,30*k,v.u);
 c.fillStyle=v.bd;c.fillRect(xl,gy-38*k,31*k,7*k);c.fillStyle=v.st;c.fillRect(xl,gy-24*k,31*k,9*k);c.fillStyle=v.st2;c.fillRect(xl,gy-15*k,31*k,2*k);
 c.fillStyle='#455a64';c.beginPath();c.roundRect(xl+1*k,gy-43*k,14*k,6*k,1.5*k);c.fill();
 [xl+4*k,xl+11*k].forEach(fx=>{c.fillStyle='#1c262b';c.beginPath();c.ellipse(fx,gy-43*k,3.2*k,1.2*k,0,0,7);c.fill()});
 c.fillStyle='rgba(0,0,0,.26)';for(let j=0;j<5;j++)c.fillRect(xl+17*k+j*2.8*k,gy-36*k,1.4*k,9*k);
 c.beginPath();c.moveTo(xl+31*k,gy-8*k);c.lineTo(xl+31*k,gy-50*k);c.lineTo(xl+45*k,gy-50*k);c.quadraticCurveTo(xl+47*k,gy-50*k,xl+48*k,gy-46*k);c.lineTo(xl+48*k,gy-8*k);c.closePath();fg(c,gy-50*k,42*k,v.u);
 c.fillStyle=v.bd;c.fillRect(xl+31*k,gy-50*k,17*k,4*k);c.fillStyle=v.st;c.fillRect(xl+31*k,gy-22*k,17*k,8*k);c.fillStyle='#37474f';c.fillRect(xl+30*k,gy-52*k,19*k,2.2*k);
 win(c,xl+33*k,gy-44*k,5.5*k,13*k,ng,k);win(c,xl+40*k,gy-44*k,5.5*k,13*k,ng,k);
 c.beginPath();c.moveTo(xl+48*k,gy-8*k);c.lineTo(xl+48*k,gy-34*k);c.lineTo(xr-2*k,gy-34*k);c.lineTo(xr,gy-28*k);c.lineTo(xr,gy-8*k);c.closePath();fg(c,gy-34*k,26*k,v.u);
 c.fillStyle=v.r;c.beginPath();c.moveTo(xl+48*k,gy-24*k);c.lineTo(xr-1*k,gy-24*k);c.lineTo(xr,gy-8*k);c.lineTo(xl+48*k,gy-8*k);c.closePath();c.fill();c.fillStyle='rgba(0,0,0,.25)';c.fillRect(xl+48*k,gy-24*k,xr-xl-48*k,1*k);
 c.fillStyle='#10202e';c.beginPath();c.moveTo(xr-11*k,gy-33*k);c.lineTo(xr-2*k,gy-33*k);c.lineTo(xr-1*k,gy-27*k);c.lineTo(xr-11*k,gy-27*k);c.fill();
 c.fillStyle='#fff';c.beginPath();c.roundRect(xr-17*k,gy-33*k,5.5*k,4.5*k,1*k);c.fill();c.fillStyle='#1565c0';c.fillRect(xr-16.4*k,gy-32.4*k,3.2*k,3.2*k);c.fillStyle='#ff6f00';c.fillRect(xr-13.4*k,gy-31.5*k,1.4*k,2*k);
 c.fillStyle='#fff59d';c.beginPath();c.arc(xr-4*k,gy-20*k,2.3*k,0,7);c.fill();c.fillStyle='#ffd600';for(let i=0;i<3;i++)c.fillRect(xr-12*k+i*4*k,gy-12*k,2*k,3*k);
 c.fillStyle='#fff';c.font='bold '+4.6*k+'px sans-serif';c.textAlign='center';c.fillText(v.no,xl+15*k,gy-17.5*k);
 c.strokeStyle='#cfd8dc';c.lineWidth=.8*k;c.beginPath();c.moveTo(xl+1*k,gy-40*k);c.lineTo(xl+30*k,gy-40*k);c.stroke();c.fillStyle='#263238';c.fillRect(xl+24*k,gy-41.5*k,2.6*k,3.5*k);
 bogie(c,xl+14*k,gy,k,3);bogie(c,xr-14*k,gy,k,3)}
function car(c,ty,xl,xr,gy,k,t,ng){
 const L=xr-xl,h=36*k,y0=gy-8*k-h,c1=t.c1,cb=t.cb||c1,c2=t.c2,c3=t.c3,cx=(xl+xr)/2,bg=(a,b)=>{bogie(c,xl+a*k,gy,k,2);bogie(c,xr-b*k,gy,k,2)};
 if(ty=='uap')return steamL(c,xl,xr,gy,k);
 if(ty=='tdr'){body(c,xl+2*k,gy-34*k,L-4*k,26*k,3*k,'#1a1a1a');c.fillStyle='#0b0b0b';c.beginPath();c.moveTo(xl+5*k,gy-34*k);c.quadraticCurveTo(cx,gy-52*k,xr-5*k,gy-34*k);c.fill();c.fillStyle='#5d4037';for(let i=0;i<14;i++)c.fillRect(xl+8*k+hs(i)*(L-18*k),gy-36*k-hs(i+5)*9*k,2*k,2*k);bogie(c,cx,gy,k,2);return}
 if(ty=='cc')return loco(c,xl,xr,gy,k,t,ng);
 if(ty=='kay'){body(c,xl,y0+2*k,L,h-2*k,2*k,cb);c.strokeStyle='rgba(0,0,0,.2)';c.lineWidth=.7*k;c.beginPath();for(let i=1;i<L/(4*k);i++){c.moveTo(xl+i*4*k,y0+4*k);c.lineTo(xl+i*4*k,y0+h-4*k)}c.stroke();
  c.fillStyle=sh(cb,-.45);c.beginPath();c.roundRect(xl-1*k,y0-3*k,L+2*k,8*k,[8*k,8*k,0,0]);c.fill();
  for(let j=0;j<4;j++){c.fillStyle=ng?'#ffd180':'#2a1c10';c.beginPath();c.roundRect(xl+7*k+j*12*k,y0+10*k,8*k,14*k,[4*k,4*k,0,0]);c.fill()}
  c.fillStyle=c2;c.fillRect(xl,y0+h-9*k,L,2*k);c.strokeStyle='#3e2723';c.lineWidth=k;c.strokeRect(xl-1*k,y0+8*k,3*k,h-14*k);c.strokeRect(xr-2*k,y0+8*k,3*k,h-14*k);bg(13,13);return}
 if(ty=='bag'){body(c,xl,y0,L,h,2*k,'#607d8b');c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=k;c.beginPath();for(let i=1;i<L/(5*k);i++){c.moveTo(xl+i*5*k,y0+3*k);c.lineTo(xl+i*5*k,y0+h-3*k)}c.stroke();
  c.fillStyle='#455a64';c.fillRect(cx-9*k,y0+6*k,18*k,26*k);c.fillStyle='#cfd8dc';c.fillRect(cx-1*k,y0+16*k,2*k,6*k);[8,44].forEach(q=>win(c,xl+q*k,y0+5*k,6*k,6*k,ng,k));
  c.fillStyle=c2;c.fillRect(xl,y0+h*.7,L,3*k);c.fillStyle='#fff';c.font='bold '+5*k+'px sans-serif';c.textAlign='center';c.fillText('BAGASI',cx,y0+h*.7+9*k);bg(12,12);return}
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
 if(ty=='eko'){body(c,xl,y0,L,h,2*k,cb);c.fillStyle=c1;c.fillRect(xl,y0+h*.58,L,h*.42);c.fillStyle=c2;c.fillRect(xl,y0+h*.58,L,3*k);
  for(let j=0;j<7;j++){win(c,xl+5*k+j*8.6*k,y0+7*k,6*k,9*k,ng,k);c.strokeStyle='rgba(0,0,0,.35)';c.lineWidth=.6*k;c.beginPath();c.moveTo(xl+8*k+j*8.6*k,y0+7*k);c.lineTo(xl+8*k+j*8.6*k,y0+16*k);c.stroke()}
  c.fillStyle='#78909c';for(let j=0;j<5;j++)c.fillRect(xl+8*k+j*11*k,y0-3*k,6*k,3*k);c.fillStyle='rgba(0,0,0,.4)';c.fillRect(xl,y0+6*k,4*k,24*k);c.fillRect(xr-4*k,y0+6*k,4*k,24*k);bg(12,12);return}
 body(c,xl,y0,L,h,7*k,cb);c.fillStyle=c2;c.fillRect(xl,y0+h*.64,L,5*k);if(c3){c.fillStyle=c3;c.fillRect(xl,y0+h*.64+5*k,L,2*k)}
 c.fillStyle='#8a979e';c.fillRect(xl+14*k,y0-2.5*k,14*k,3*k);c.fillRect(xl+38*k,y0-2.5*k,14*k,3*k);
 if(ty=='eks')for(let j=0;j<5;j++)win(c,xl+8*k+j*11.5*k,y0+7*k,9.5*k,14*k,ng,2*k);
 else{win(c,xl+8*k,y0+7*k,15*k,14*k,ng,2*k);win(c,xl+43*k,y0+7*k,15*k,14*k,ng,2*k);c.fillStyle=c2;c.beginPath();c.arc(cx,y0+13*k,7*k,0,7);c.fill();c.fillStyle='#fff';c.font='bold '+9*k+'px sans-serif';c.textAlign='center';c.fillText('R',cx,y0+16.5*k)}
 c.fillStyle='rgba(0,0,0,.35)';c.fillRect(xl+1*k,y0+6*k,4*k,22*k);c.fillRect(xr-5*k,y0+6*k,4*k,22*k);bg(13,13)}
function detail(c,ty,xl,xr,gy,k,t,ng,fr){
 if(ty=='uap'||ty=='tdr')return;const L=xr-xl,h=36*k,y0=gy-8*k-h,cx=(xl+xr)/2;
 if(ty!='cc'){const g=c.createLinearGradient(xl,0,xr,0);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(.5,'rgba(255,255,255,.22)');g.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=g;c.fillRect(xl+2*k,y0+3*k,L-4*k,2.2*k);
  c.fillStyle='rgba(0,0,0,.22)';c.fillRect(xl,y0+2*k,.8*k,h-3*k);c.fillRect(xr-.8*k,y0+2*k,.8*k,h-3*k);c.fillRect(xl+6*k,y0,L-12*k,1.4*k);
  c.fillStyle='#2b3338';c.fillRect(cx-16*k,gy-9*k,11*k,4*k);c.fillRect(cx+3*k,gy-9*k,14*k,4*k)}
 const nm=t.nz==2?'MRT JAKARTA':'LRT JABODEBEK',lb={ec:[nm,.68],em:[nm,.68],eks:['EKSEKUTIF',.64],res:['RESTORASI',.64],bm:['WHOOSH',.62]}[ty];
 c.fillStyle='#fff';c.textAlign='center';c.font='bold '+4.2*k+'px sans-serif';
 if(lb&&(ty!='ec'||fr))c.fillText(lb[0],cx,y0+h*lb[1]+4*k);if(ty=='eko'){c.font='bold '+4.6*k+'px sans-serif';c.fillText('EKONOMI',cx,y0+h*.58+11*k)}
 if(fr){const p={ec:[xr-3*k,gy-14*k],cc:[xr-4*k,gy-20*k],bh:[xr+27*k,gy-17*k]}[ty];if(p){const g=c.createRadialGradient(p[0],p[1],0,p[0],p[1],9*k);g.addColorStop(0,'rgba(255,245,170,.6)');g.addColorStop(1,'rgba(255,245,170,0)');c.fillStyle=g;c.beginPath();c.arc(p[0],p[1],9*k,0,7);c.fill()}}}
function mkc(w,h,s){s=s||DPRv;const c=document.createElement('canvas');c.width=Math.ceil(w*s);c.height=Math.ceil(h*s);const q=c.getContext('2d');q.scale(s,s);return[c,q]}
/* kereta digambar sekali ke sprite, lalu ditempel tiap frame (roda tetap berputar) */
function drawTrain(c,t,hx,gy,k,ng){
 if(c!==x||t.k=='steam'){drawTrain0(c,t,hx,gy,k,ng);return}
 const key=TR.indexOf(t)+'|'+k.toFixed(3)+'|'+ng+'|'+DPRv,tl=trLen(t)*k,pad=40*k,w=tl+pad+8*k,h=70*k;let s=SPR[key];
 if(!s){const[cv2,q]=mkc(w,h,DPRv*2);REC=[];MIR=0;drawTrain0(q,t,w-pad,h-4*k,k,ng);s=SPR[key]={cv:cv2,wl:REC};REC=null;MIR=0}
 c.drawImage(s.cv,hx-(w-pad),gy-(h-4*k),w,h);s.wl.forEach(p=>wheels(c,hx+p[0]-(w-pad),gy,k,p[1]))}
function drawTrain0(c,t,hx,gy,k,ng){
 const n=t.cars.length,tl=trLen(t)*k;let xr=hx;
 c.fillStyle='rgba(0,0,0,.3)';c.beginPath();c.ellipse(hx-tl/2,gy+k,tl/2,3.5*k,0,0,7);c.fill();
 t.cars.forEach((ty,i)=>{const L=LEN[ty]*k,xl=xr-L,mir=i>0&&(ty=='ec'||ty=='bh');
  MIR=mir?xl+xr:0;c.save();if(mir){c.translate(xl+xr,0);c.scale(-1,1)}PPL=!(ty=="cc"||ty=="bag"||ty=="uap"||ty=="tdr");car(c,ty,xl,xr,gy,k,t,ng);detail(c,ty,xl,xr,gy,k,t,ng,i==0);c.restore();if(ty!="cc"&&ty!="uap"&&ty!="tdr"){c.fillStyle="rgba(255,255,255,.12)";c.fillRect(xl+4*k,gy-43*k,xr-xl-8*k,2*k)}
  if(i<n-1){c.fillStyle='#1b1b1b';c.fillRect(xl-3*k,gy-16*k,3*k,3*k);if(ty!='cc'&&ty!='uap'&&ty!='tdr'){c.fillStyle='#151515';c.fillRect(xl-3*k,gy-40*k,3*k,28*k)}}
  xr=xl-3*k})}
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
 x.fillStyle=cn;x.fillRect(px-6*u,gy-84*u,w+12*u,7*u);x.fillStyle='rgba(0,0,0,.25)';x.fillRect(px-6*u,gy-77*u,w+12*u,2*u);x.fillStyle='#455a64';[.06,.3,.5,.7,.94].forEach(q=>x.fillRect(px+w*q,gy-80*u,4*u,70*u));
 for(let i=0;i<4;i++){const lx=px+w*(.12+i*.25);x.fillStyle='#37474f';x.fillRect(lx,gy-58*u,2*u,48*u);x.fillStyle=S.tod==2?'#fff59d':'#cfd8dc';x.beginPath();x.arc(lx+1*u,gy-60*u,3*u,0,7);x.fill()}
 x.fillStyle=BD[pl];x.fillRect(cx-80*u,gy-74*u,160*u,22*u);x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(cx-80*u,gy-74*u,160*u,22*u);x.fillStyle='#fff';x.font='bold '+13*u+'px sans-serif';x.textAlign='center';x.fillText(s.nm.toUpperCase(),cx,gy-58*u)}
function stFront(s,px,gy,P,cam){const w=SP*P;if(px>W||px+w<-50)return;
 x.fillStyle='#b0bec5';x.fillRect(px,gy+4*u,w,17*u);x.fillStyle='#ffd600';x.fillRect(px,gy+4*u,w,3*u);
 const cur=s===G.r.st[G.ni-1]&&G.dw>0,n=cur?Math.round(8*G.dw/3):s.done?0:7;
 for(let i=0;i<n;i++){const fx=px+w*(.08+.84*hs(i+s.x)),by=gy+21*u,bb=Math.sin(tm*4+i)*u;x.fillStyle=['#e53935','#fdd835','#1e88e5','#43a047'][i%4];x.fillRect(fx-3*u,by-19*u+bb,7*u,13*u);x.fillStyle='#ffcc9c';x.beginPath();x.arc(fx,by-23*u+bb,4*u,0,7);x.fill();x.fillStyle='#333';x.fillRect(fx-3*u,by-6*u+bb,3*u,6*u);x.fillRect(fx+1*u,by-6*u+bb,3*u,6*u)}
 if(!s.done){const mx=(s.x+SP-5)*P-cam;x.fillStyle='#ff6f00';x.fillRect(mx-2*u,gy-26*u,4*u,48*u);x.fillStyle='#d32f2f';x.fillRect(mx-24*u,gy-40*u,48*u,16*u);x.fillStyle='#fff';x.font='bold '+11*u+'px sans-serif';x.textAlign='center';x.fillText('STOP',mx,gy-28*u)}}
const SK=[['#2e9bff','#bfe9ff','#fff3cf'],['#4a2a7a','#ff6f61','#ffd58a'],['#040a22','#16286b','#3a58a8']];
const puff=(px,py,r,a)=>{const g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(255,255,255,'+a+')');g.addColorStop(1,'rgba(255,255,255,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill()};
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
function ai(dt){const a=G.ai=G.ai||[];a.forEach(q=>q.x+=q.v*dt);G.ai=a.filter(q=>Math.abs(q.x-G.pos)<1100);G.at=(G.at||2)-dt;
 if(G.at<=0&&G.ai.length<2){const d=Math.random()<.65?-1:1,sp=20+Math.random()*40;G.ai.push({x:d<0?G.pos+700:G.pos+(Math.random()<.5?-600:320),v:d*sp,d,i:Math.random()*TR.length|0});G.at=5+Math.random()*9}}
function traf2(dt){const a=G.tf=G.tf||[];a.forEach(v=>v.x+=v.v*dt);G.tf=a.filter(v=>v.x>G.pos-260&&v.x<G.pos+520);G.ts2=(G.ts2||0)-dt;
 if(G.ts2<=0&&G.tf.length<16){const l=Math.random()<.5?1:-1;G.tf.push({x:G.pos+140+Math.random()*300,v:l*(8+Math.random()*12),l,ty:['mtr','mtr','car','car','ang','trk','bus'][Math.random()*7|0],col:PAL[Math.random()*7|0]});G.ts2=Math.max(.25,1.2-G.v/80)*(.6+Math.random()*.8)}}
function farTrack(gy,P,cam){const y=gy-30*u,td=S.tod;x.fillStyle='#6b5d4a';x.fillRect(0,y,W,5*u);x.fillStyle='#4e342e';for(let X=-(cam%(10*u));X<W;X+=10*u)x.fillRect(X,y+1*u,5*u,3*u);x.fillStyle='#d5dde1';x.fillRect(0,y,W,1.6*u);
 (G.ai||[]).forEach(q=>{const t=TR[q.i],px=q.x*P-cam,tl=trLen(t)*u*.62;if(q.d>0&&(px<-60||px-tl>W)||q.d<0&&(px>W+60||px+tl<0))return;
  x.save();if(q.d<0){x.translate(px,0);x.scale(-1,1);x.translate(-px,0)}WPH=q.x;drawTrain(x,t,px,y+1*u,u*.62,td==2);WPH=null;x.restore()});
 const sp=60*P;for(let i=Math.floor((cam-40)/sp);i<=Math.floor((cam+W)/sp)+1;i++){const px=i*sp-cam;x.fillStyle='#5d4037';x.fillRect(px-1.3*u,gy-92*u,2.6*u,62*u);x.fillRect(px-9*u,gy-90*u,18*u,2*u);x.strokeStyle='rgba(20,20,20,.7)';x.lineWidth=.9*u;[-7,0,7].forEach(d=>{x.beginPath();x.moveTo(px+d*u,gy-90*u);x.quadraticCurveTo(px+sp/2+d*u,gy-80*u,px+sp+d*u,gy-90*u);x.stroke()})}}
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
function fgGrass(gy,cam){const g=x.createLinearGradient(0,H-60*u,0,H);g.addColorStop(0,'rgba(20,70,25,0)');g.addColorStop(1,'rgba(20,70,25,.85)');x.fillStyle=g;x.fillRect(0,H-60*u,W,60*u);
 for(let i=0;i<80;i++){const X=(((hs(i)*W*3-cam*1.3)%W)+W)%W,h=(12+hs(i+4)*24)*u,l=(hs(i+8)-.5)*10*u;x.strokeStyle=i%2?'#2e7d32':'#4caf50';x.lineWidth=1.6*u;x.beginPath();x.moveTo(X,H+2);x.quadraticCurveTo(X+l*.4,H-h*.6,X+l,H-h);x.stroke()}}
let BG,GR,VG,CL;
function buildCaches(){ck=W+'|'+H+'|'+S.tod;SPR={};const gy=H*.72,td=S.tod,sk=SK[td];let q,g;
 [BG,q]=mkc(W,gy+2);g=q.createLinearGradient(0,0,0,gy);g.addColorStop(0,sk[0]);g.addColorStop(.55,sk[1]);g.addColorStop(1,sk[2]);q.fillStyle=g;q.fillRect(0,0,W,gy+2);
 const sx=W*.78,sy=gy*(td==1?.62:.27);g=q.createRadialGradient(sx,sy,0,sx,sy,170*u);g.addColorStop(0,td==2?'rgba(200,210,255,.35)':'rgba(255,240,170,.8)');g.addColorStop(1,'rgba(255,240,170,0)');q.fillStyle=g;q.fillRect(sx-180*u,sy-180*u,360*u,360*u);
 if(td<2){q.save();q.translate(sx,sy);for(let i=0;i<7;i++){q.rotate(.9);const rr=q.createLinearGradient(0,0,330*u,0);rr.addColorStop(0,'rgba(255,245,190,.16)');rr.addColorStop(1,'rgba(255,245,190,0)');q.fillStyle=rr;q.beginPath();q.moveTo(0,0);q.lineTo(330*u,-26*u);q.lineTo(330*u,26*u);q.fill()}q.restore()}
 q.fillStyle=td==2?'#f5f5dc':td==1?'#ffb74d':'#fffde7';q.beginPath();q.arc(sx,sy,(td==2?24:34)*u,0,7);q.fill();
 [GR,q]=mkc(W,H-gy+2);g=q.createLinearGradient(0,0,0,H-gy);g.addColorStop(0,'#8a7a64');g.addColorStop(.15,'#5f5040');g.addColorStop(1,'#2a2017');q.fillStyle=g;q.fillRect(0,0,W,H-gy+2);
 [VG,q]=mkc(W,H);g=q.createRadialGradient(W/2,H/2,H*.45,W/2,H/2,Math.max(W,H)*.75);g.addColorStop(0,'rgba(0,0,0,0)');g.addColorStop(1,'rgba(0,0,0,.35)');q.fillStyle=g;q.fillRect(0,0,W,H);
 [CL,q]=mkc(200*u,96*u);[[0,0,34],[28,-6,28],[-28,4,24],[54,5,20],[-52,6,18]].forEach(p=>{const cx=100*u+p[0]*u,cy=48*u+p[1]*u,r=p[2]*u,gg=q.createRadialGradient(cx,cy,0,cx,cy,r);gg.addColorStop(0,'rgba(255,255,255,.95)');gg.addColorStop(1,'rgba(255,255,255,0)');q.fillStyle=gg;q.beginPath();q.arc(cx,cy,r,0,7);q.fill()})}
function draw(){
 const t=TR[S.sel],gy=H*.72,P=3.67*u,cam=G.pos*P-W*.62,hx=W*.62,td=S.tod,el=t.k=='krl'||t.k=='mrt'||t.k=='bullet';
 if(ck!=W+'|'+H+'|'+S.tod)buildCaches();x.drawImage(BG,0,0,W,gy+2);let g;
 if(td==2){x.fillStyle='#fff';for(let i=0;i<60;i++){x.globalAlpha=.3+.7*Math.abs(Math.sin(tm*2+i));x.fillRect(hs(i)*W,hs(i+50)*gy*.8,1.6,1.6)}x.globalAlpha=1}
 if(td<2){x.strokeStyle='rgba(30,40,50,.6)';x.lineWidth=1.6*u;for(let i=0;i<5;i++){const bx=((hs(i+20)*W+tm*(26+i*6))%(W+120))-60,by=gy*(.12+.22*hs(i+30))+Math.sin(tm*2+i)*5*u,fl=Math.sin(tm*9+i*2)*4*u;x.beginPath();x.moveTo(bx-7*u,by-fl);x.quadraticCurveTo(bx-3*u,by-4*u,bx,by);x.quadraticCurveTo(bx+3*u,by-4*u,bx+7*u,by-fl);x.stroke()}}
 x.globalAlpha=td==2?.25:.95;for(let i=0;i<6;i++){const cx=(((hs(i)*1500+tm*(6+i*2)-cam*.03)%(W+300))+W+300)%(W+300)-150,cy=gy*(.1+hs(i+9)*.3);x.drawImage(CL,cx-100*u,cy-48*u,200*u,96*u)}x.globalAlpha=1;
 ly(.05,150,120,.004,'#86b9de',1,gy,cam);ly(.12,95,70,.006,'#5aa585',1,gy,cam);ly(.3,50,40,.007,'#3f9560',0,gy,cam);village(gy,cam);
 g=x.createLinearGradient(0,gy-150*u,0,gy);g.addColorStop(0,'rgba(255,255,255,0)');g.addColorStop(1,'rgba(255,255,255,.22)');x.fillStyle=g;x.fillRect(0,gy-150*u,W,150*u);
 g=x.createLinearGradient(0,gy-26*u,0,gy);g.addColorStop(0,'#8bc34a');g.addColorStop(1,'#5f9a2c');x.fillStyle=g;x.fillRect(0,gy-26*u,W,28*u);x.fillStyle='rgba(255,255,255,.12)';
 const sw=45*u;for(let X=-((cam*.9)%(2*sw))-2*sw;X<W;X+=2*sw)x.fillRect(X,gy-26*u,sw,28*u);
 farTrack(gy,P,cam);
 for(let i=Math.floor((cam*.85-60)/90);i<=Math.floor((cam*.85+W)/90);i++){const r=hs(i+77),X=i*90+r*40-cam*.85,b=(14+r*14)*u;if(r>.35){const bg=x.createRadialGradient(X,gy-24*u-b*.4,b*.2,X,gy-22*u-b*.4,b*1.4);bg.addColorStop(0,"#5aa83a");bg.addColorStop(1,"#2b6a24");x.fillStyle=bg;x.beginPath();x.ellipse(X,gy-23*u,b*1.5,b,0,Math.PI,0);x.fill()}}
 for(let i=Math.floor((cam*.7-100)/170);i<=Math.floor((cam*.7+W)/170);i++){const r=hs(i+3),X=i*170+r*60-cam*.7;if(r>.55)palm(X,gy-22*u,.9,r>.78?-1:1);else if(r<.18)house(X,gy-22*u,r*5)}
 if(el){const sp=50*P;for(let i=Math.floor(cam/sp);i<=Math.floor((cam+W)/sp)+1;i++){const px=i*sp-cam;x.fillStyle='#607d8b';x.fillRect(px-2*u,gy-110*u,4*u,110*u);x.fillRect(px-2*u,gy-110*u,22*u,3*u);x.strokeStyle='#37474f';x.lineWidth=1.3*u;x.beginPath();x.moveTo(px+20*u,gy-107*u);x.quadraticCurveTo(px+sp/2,gy-80*u,px+sp+20*u,gy-107*u);x.stroke()}x.strokeStyle='#263238';x.lineWidth=1.5*u;x.beginPath();x.moveTo(0,gy-60*u);x.lineTo(W,gy-60*u);x.stroke()}
 crBack(gy,P,cam);G.r.st.forEach(s=>stBack(s,s.x*P-cam,gy,P));
 G.r.sg.forEach(s=>{const px=s.x*P-cam;if(px<-40||px>W+40)return;x.fillStyle='#555';x.fillRect(px-2*u,gy-62*u,4*u,62*u);x.fillStyle='#fff';x.beginPath();x.arc(px,gy-72*u,16*u,0,7);x.fill();x.strokeStyle='#e53935';x.lineWidth=4*u;x.stroke();x.fillStyle='#111';x.font='bold '+14*u+'px sans-serif';x.textAlign='center';x.fillText(s.l,px,gy-67*u)});
 x.drawImage(GR,0,gy,W,H-gy+2);
 x.fillStyle='rgba(255,255,255,.1)';for(let i=0;i<40;i++)x.fillRect((((hs(i)*W*1.6-cam)%W)+W)%W,gy+8*u+hs(i+7)*(H-gy-10*u),2*u,1.5*u);
 hwyRoad(gy,cam);crRoad(gy,P,cam);x.fillStyle='#3e2a20';for(let X=-(cam%(14*u));X<W;X+=14*u)x.fillRect(X,gy,9*u,6*u);x.fillStyle='#455a64';x.fillRect(0,gy+2*u,W,3*u);x.fillStyle='#e3e8eb';x.fillRect(0,gy,W,2.5*u);x.fillStyle='rgba(255,255,255,.18)';x.fillRect(0,gy+.4*u,W,.7*u);x.fillStyle='rgba(180,180,180,.45)';for(let i=0;i<70;i++)x.fillRect((((hs(i+11)*W*2-cam)%W)+W)%W,gy+6*u+hs(i+3)*12*u,1.8*u,1.2*u);
 const bob=G.m=='play'||G.m=='menu'?(Math.sin(tm*11)*.5+.5)*Math.min(G.v/12,1.6)*u*.45:0;G.pit=(G.pit||0)+((G.m=='play'?Math.max(-.025,Math.min(.025,-(G.ac||0)*.0035)):0)-(G.pit||0))*.08;
 {const pv=hx-trLen(t)*u*.5;x.save();x.translate(pv,gy);x.rotate(G.pit||0);x.translate(-pv,-gy);drawTrain(x,t,hx,gy-bob,u,td==2);x.restore()}
 G.fx=(G.fx||[]).filter(f=>tm-f.t<1.2);G.fx.forEach(f=>{const ag=tm-f.t;x.globalAlpha=1-ag/1.2;x.fillStyle="#ffd23f";x.strokeStyle="#000";x.lineWidth=3*u;x.font="bold "+17*u+"px sans-serif";x.textAlign="center";x.strokeText("+50 🪙",hx-60*u,gy-100*u-ag*45*u);x.fillText("+50 🪙",hx-60*u,gy-100*u-ag*45*u);x.globalAlpha=1});
 G.pf.forEach(p=>puff(p.x*P-cam,gy-52*u-p.a*40*u,(6+p.a*10)*u,.6-p.a*.3));
 crFront(gy,P,cam);G.r.st.forEach(s=>stFront(s,s.x*P-cam,gy,P,cam));
 hwyVeh(gy,P,cam);fgGrass(gy,cam);if(td){x.fillStyle=td==1?'rgba(255,110,30,.14)':'rgba(5,10,60,.5)';x.fillRect(0,0,W,H);
  x.globalCompositeOperation='lighter';const nx=hx+(t.k=='bullet'?30:2)*u;g=x.createRadialGradient(nx,gy-18*u,0,nx,gy-18*u,90*u);g.addColorStop(0,'rgba(255,240,170,'+(td==2?.55:.2)+')');g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.fillRect(nx-100*u,gy-110*u,200*u,200*u);x.globalCompositeOperation='source-over'}
 if(td==2){const q=x.createLinearGradient(hx,0,hx+450*u,0);q.addColorStop(0,'rgba(255,245,160,.3)');q.addColorStop(1,'rgba(255,245,160,0)');x.fillStyle=q;x.beginPath();x.moveTo(hx+(t.k=='bullet'?28:0)*u,gy-18*u);x.lineTo(hx+450*u,gy-60*u);x.lineTo(hx+450*u,gy+10*u);x.fill()}
 if(G.v>8){x.strokeStyle='rgba(255,255,255,.14)';x.lineWidth=1.5*u;for(let i=0;i<12;i++){const X=(((hs(i+3)*W*2-cam*1.6)%(W+300))+W+300)%(W+300)-150,Y=gy+14*u+hs(i)*(H-gy-24*u);x.beginPath();x.moveTo(X,Y);x.lineTo(X+G.v*u*(.5+hs(i+9)),Y);x.stroke()}}
 x.drawImage(VG,0,0,W,H);
 if(G.m=='play'||G.m=='pause'){sm+=(G.v*3.6-sm)*.2;$('sc').textContent=Math.floor(G.sc);$('cn').textContent=S.coin;
  const l=$('lim');l.textContent=limAt(G.pos);l.classList.toggle('ov',!!G.ov);const tl=Math.floor(G.ts||0);$('tl').textContent='⏱ '+Math.floor(tl/60)+':'+String(tl%60).padStart(2,'0');
  const s=G.r.st[G.ni];{const cw=nextCx(),ss=s?'🚉 '+s.nm+' — '+Math.max(0,Math.round(s.x+SP-5-G.pos))+' m':'🚉 Selesai!';$('nx').textContent=cw?'🚧 Perlintasan '+Math.round(cw.x-G.pos)+' m'+(cw.hn?' ✔':' — tahan KLAKSON!'):ss}
  $('tt').textContent='GAS N'+th;$('tb').textContent=em?'DARURAT':'REM B'+bk;$('kt').style.bottom=th/8*100+'%';$('kb').style.bottom=(em?1:bk/5)*100+'%';gauge(t)}}
/* shop & settings */
const bar=(l,f)=>`<div class="st"><span>${l}</span><i><u style="width:${Math.round(Math.min(1,f)*100)}%"></u></i></div>`;
function shop(){$('sc2').textContent=S.coin;const g=$('grid');g.innerHTML='';
 TR.forEach((t,i)=>{const d=document.createElement('div');d.className='cd';
  d.innerHTML='<canvas width="270" height="76"></canvas><b>'+t.n+'</b><small>'+t.s+'</small>'+bar('Kecepatan',t.v/400)+bar('Akselerasi',t.a/3.6)+bar('Rem',t.b/4.6)+bar('Pendapatan',t.m/3)+'<button class="b sm"></button>';
  const c=d.querySelector('canvas').getContext('2d');c.fillStyle='#8d7b68';c.fillRect(0,68,270,8);c.fillStyle='#cfd8dc';c.fillRect(0,66,270,2);const ss=Math.min(.55,235/trLen(t));drawTrain(c,t,236,66,ss,0);
  const bt=d.querySelector('button'),o=S.own.includes(i);
  bt.textContent=o?(S.sel==i?'✔ DIPAKAI':'PILIH'):(S.coin>=t.p?'BELI 🪙'+t.p:'🔒 🪙'+t.p);bt.className='b sm '+(o?(S.sel==i?'g':'bl'):(S.coin>=t.p?'y':''));bt.disabled=!o&&S.coin<t.p;
  bt.onclick=()=>{au();if(!o){S.coin-=t.p;S.own.push(i);ding()}S.sel=i;sv();shop()};g.appendChild(d)})}
function sets(){$('s1').textContent='🔊 Suara: '+(S.snd?'NYALA':'MATI');$('s2').textContent='🎯 Kesulitan: '+DN[S.df];$('s3').textContent='🕒 Waktu: '+TN[S.tod]}
const on=(id,f)=>$(id).onclick=()=>{au();f()};
on('bm',startGame);on('bt',()=>{shop();show('shop')});on('bs',()=>{sets();show('set')});on('sb1',toMenu);on('s5',toMenu);
on('s1',()=>{S.snd^=1;sv();sets();ding()});on('s2',()=>{S.df=(S.df+1)%3;sv();sets()});on('s3',()=>{S.tod=(S.tod+1)%3;sv();sets()});
on('s4',()=>{if(confirm('Hapus semua koin, kereta, dan skor tertinggi?')){S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:0};sv();sets()}});
on('bp',pz);on('br',pz);on('bq',toMenu);
/* kontrol: tuas gas (notch 0-8) dan tuas rem (0-5) seperti kereta asli */
function setTh(v){v=Math.max(0,Math.min(8,v));if(v!=th)tk();th=v;if(v>0){bk=0;em=0}}
function setBk(v){v=Math.max(0,Math.min(5,v));if(v!=bk)tk();bk=v;if(v>0)th=0}
function lever(id,mx,fn){const e=$(id);let d=0;const f=ev=>{const r=e.getBoundingClientRect();fn(Math.round(Math.max(0,Math.min(1,1-(ev.clientY-r.top)/r.height))*mx))};
 e.addEventListener('pointerdown',ev=>{ev.preventDefault();au();d=1;e.setPointerCapture(ev.pointerId);f(ev)});e.addEventListener('pointermove',ev=>{if(d)f(ev)});['pointerup','pointercancel'].forEach(n=>e.addEventListener(n,()=>d=0))}
lever('lt2',8,setTh);lever('lb',5,setBk);
const hb=$('hrn'),eb=$('emg');hb.addEventListener('pointerdown',e=>{e.preventDefault();au();hornOn(TR[S.sel].k)});['pointerup','pointerleave','pointercancel'].forEach(n=>{hb.addEventListener(n,hornOff);eb.addEventListener(n,()=>em=0)});
eb.addEventListener('pointerdown',e=>{e.preventDefault();au();em=1;th=0});
addEventListener('keydown',e=>{au();K[e.code]=1;if(['Space','ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.code))e.preventDefault();if(e.repeat)return;
 if(G.m=='play'){if(e.code=='ArrowUp'||e.code=='KeyW')setTh(th+1);if(e.code=='ArrowDown'||e.code=='KeyS')setTh(th-1);if(e.code=='ArrowRight'||e.code=='KeyD')setBk(bk+1);if(e.code=='ArrowLeft'||e.code=='KeyA')setBk(bk-1);if(e.code=='Space'){em=1;th=0}if(e.code=='KeyH')hornOn(TR[S.sel].k)}
 if(e.code=='KeyP'||e.code=='Escape')pz()});
addEventListener('keyup',e=>{K[e.code]=0;if(e.code=='Space')em=0;if(e.code=='KeyH')hornOff()});
addEventListener('blur',()=>{K={};em=0;hornOff();if(G.m=='play')pz()});
/* loop */
let last=0;function loop(ts){const raw=Math.min(.05,(ts-last)/1000||0);last=ts;dtS+=(raw-dtS)*.2;const dt=raw>.04?raw:dtS;if(G.m!='pause')tm+=dt;upd(dt);draw();requestAnimationFrame(loop)}
toMenu();requestAnimationFrame(loop);
