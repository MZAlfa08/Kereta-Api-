const $=id=>document.getElementById(id),cv=$('c'),x=cv.getContext('2d');
const SP=130,hs=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const NM=['Jakarta Kota','Manggarai','Gambir','Jatinegara','Bekasi','Cikarang','Karawang','Cikampek','Purwakarta','Padalarang','Bandung','Cirebon','Semarang Tawang','Yogyakarta','Solo Balapan','Madiun','Surabaya Gubeng'];
const TR=[
{n:'KRL Commuter Line',s:'JR 205',p:0,v:100,a:1.2,b:2.2,m:1,c:6,k:'krl',c1:'#cfd8dc',c2:'#e53935',c3:'#ff9800'},
{n:'KA Lokal Bandung Raya',s:'CC 206',p:1200,v:90,a:1,b:2,m:1.3,c:5,k:'loco',c1:'#1565c0',cb:'#eceff1',c2:'#ffb300'},
{n:'Kereta Uap Jaladara',s:'Wisata Solo',p:2000,v:60,a:.8,b:1.6,m:2,c:4,k:'steam',c1:'#212121',cb:'#2e7d32',c2:'#fdd835'},
{n:'MRT Jakarta',s:'Nippon Sharyo',p:3000,v:80,a:1.5,b:2.6,m:1.5,c:6,k:'mrt',c1:'#eceff1',c2:'#e53935',c3:'#1e88e5'},
{n:'LRT Jabodebek',s:'Inka-Bombardier',p:4500,v:80,a:1.4,b:2.5,m:1.7,c:4,k:'mrt',c1:'#fafafa',c2:'#29b6f6',c3:'#ff7043'},
{n:'KA Argo Bromo Anggrek',s:'CC 206 + Eksekutif',p:7000,v:120,a:1.3,b:2.4,m:2.2,c:6,k:'loco',c1:'#f5f5f5',cb:'#cfd8dc',c2:'#c62828'},
{n:'Kereta Cepat Whoosh',s:'KCIC400AF',p:12000,v:200,a:1.8,b:3,m:3,c:5,k:'bullet',c1:'#fafafa',c2:'#d32f2f',c3:'#ffc107'}];
let S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:0};
try{Object.assign(S,JSON.parse(localStorage.getItem('kn1')||'{}'))}catch(e){}
const sv=()=>{try{localStorage.setItem('kn1',JSON.stringify(S))}catch(e){}};
const DF=[.6,1,1.6],DN=['MUDAH','NORMAL','SULIT'],TN=['☀ SIANG','🌇 SORE','🌙 MALAM'];
let W,H,u,G={m:'menu',pos:0,v:10,r:{st:[],sg:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0},tm=0,K={},gB=0,bB=0;
function rs(){const d=Math.min(devicePixelRatio||1,2);W=innerWidth;H=innerHeight;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);u=Math.max(.5,Math.min(H/600,W/760))}
addEventListener('resize',rs);rs();
function toast(m){const e=$('toast');e.textContent=m;e.classList.remove('sh');void e.offsetWidth;e.classList.add('sh')}
/* screens */
function show(id){document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id==id))}
function hud(on){$('hud').classList.toggle('on',on);$('ctl').classList.toggle('on',on)}
function toMenu(){G={m:'menu',pos:0,v:10,r:{st:[],sg:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0};hud(0);$('mi').textContent='🪙 '+S.coin+'  •  🏆 Skor Tertinggi '+S.hi;show('menu')}
/* level */
function gen(l){const st=[{x:0,nm:NM[((l-1)*3)%NM.length],done:1}],sg=[],n=Math.min(2+l,7),mx=Math.min(1+Math.floor(l/2),4),L=[60,80,100,120,160];let xx=0;
 for(let i=1;i<=n;i++){xx+=900+hs(l*9+i)*500+l*60;st.push({x:xx,nm:NM[(((l-1)*3)+i)%NM.length],done:0})}
 for(let i=0;i<n;i++){const a=st[i].x+SP+40,b=st[i+1].x;sg.push({x:a,l:L[Math.floor(Math.random()*(mx+1))]},{x:a+(b-a)*.45,l:L[Math.floor(Math.random()*(mx+1))]},{x:b-420,l:40})}
 return{st,sg}}
function newLevel(){G.r=gen(G.lv);G.pos=SP;G.v=0;G.ni=1;G.dw=0;G.ts=0;G.fin=0;G.m='play';G.pf=[];show(null);hud(1);toast('Level '+G.lv+' → '+G.r.st[1].nm)}
function startGame(){G={m:'play',pos:0,v:0,lv:1,sc:0,sf:100,cg:0,pf:[],lp:0};newLevel()}
const limAt=p=>{let l=60;for(const s of G.r.sg)if(s.x<=p)l=s.l;return l};
function lvlDone(){G.m='lvl';const t=TR[S.sel],c=Math.round(100*G.lv*t.m);G.sc+=500*G.lv;S.coin+=c;G.cg+=c;S.hi=Math.max(S.hi,Math.floor(G.sc));sv();$('lt').innerHTML='Skor: '+Math.floor(G.sc)+'<br>Bonus level: +'+500*G.lv+'<br>Koin: +'+c+' 🪙';hud(0);show('lvl');ding()}
function gameOver(){G.m='over';S.hi=Math.max(S.hi,Math.floor(G.sc));sv();$('ot').innerHTML='Skor: '+Math.floor(G.sc)+' • Level '+G.lv+'<br>Koin didapat: '+G.cg+' 🪙<br>🏆 Skor Tertinggi: '+S.hi;hud(0);show('over');bad()}
function pz(){if(G.m=='play'){G.m='pause';show('pause')}else if(G.m=='pause'){G.m='play';show(null)}}
/* update */
function upd(dt){
 const t=TR[S.sel];
 if(t.k=='steam'&&(G.m=='play'||G.m=='menu')&&tm-G.lp>.09&&(G.v>0||G.m=='menu')){G.lp=tm;G.pf.push({x:G.pos-2.3,a:0})}
 G.pf.forEach(p=>p.a+=dt);G.pf=G.pf.filter(p=>p.a<2);
 if(G.m=='menu'){G.pos+=10*dt;return}
 if(G.m!='play')return;
 const mv=t.v/3.6,gas=K.ArrowUp||K.KeyW||gB,brk=K.ArrowDown||K.KeyS||K.Space||bB;
 if(G.dw>0){G.v=0;G.dw-=dt;if(G.dw<=0){G.dw=0;if(G.fin)return lvlDone();toast('Berangkat! 🚆');G.ts=0}}
 else{
  if(gas&&!brk)G.v+=t.a*(1-.7*G.v/mv)*dt;
  if(brk)G.v-=t.b*dt;else if(!gas)G.v-=(.12+.0006*G.v*G.v)*dt;
  G.v=Math.max(0,Math.min(mv,G.v));G.pos+=G.v*dt;G.ts+=dt}
 const kmh=G.v*3.6,L=limAt(G.pos);G.ov=kmh>L+3;
 if(G.ov)G.sf-=dt*(5+(kmh-L)*.3)*DF[S.df];
 G.sc+=G.v*dt*.1*G.lv;
 const s=G.r.st[G.ni];
 if(s&&G.dw<=0){
  if(G.v<.4&&G.pos>=s.x+t.c*18&&G.pos<=s.x+SP+5){
   const err=Math.abs(G.pos-(s.x+SP-5)),pts=err<4*(2-DF[S.df]/1.6)?300:err<12?200:100,pr=G.r.st[G.ni-1],
   par=(s.x-pr.x-SP)/(Math.min(t.v,90)*.62/3.6),tb=Math.max(0,Math.round((par-G.ts)*3)),cc=Math.round(pts*t.m/5);
   G.sc+=(pts+tb)*G.lv;S.coin+=cc;G.cg+=cc;G.sf=Math.min(100,G.sf+(pts==300?15:7));s.done=1;G.ni++;G.v=0;G.dw=3;G.fin=G.ni>=G.r.st.length;
   toast((pts==300?'SEMPURNA! ':pts==200?'BAGUS! ':'OKE! ')+'+'+(pts+tb)*G.lv);ding();sv()}
  else if(G.pos>s.x+SP+5){G.sf-=25*DF[S.df];s.done=1;G.ni++;toast('KELEWATAN! -25 ⚠');bad();if(G.ni>=G.r.st.length&&G.sf>0)return lvlDone()}}
 if(G.sf<=0)gameOver()}
/* drawing */
function steamL(c,xl,xr,gy,k){
 c.fillStyle='#252525';c.fillRect(xl+4*k,gy-36*k,17*k,28*k);c.fillStyle='#c62828';c.fillRect(xl+1*k,gy-40*k,23*k,5*k);
 c.fillStyle='#546e7a';c.fillRect(xl+8*k,gy-31*k,9*k,10*k);
 c.fillStyle='#1c1c1c';c.beginPath();c.roundRect(xl+21*k,gy-31*k,41*k,22*k,9*k);c.fill();
 c.fillRect(xr-13*k,gy-45*k,7*k,16*k);c.fillRect(xr-15*k,gy-47*k,11*k,3*k);c.beginPath();c.arc(xl+36*k,gy-31*k,6*k,Math.PI,0);c.fill();
 c.fillStyle='#ffb300';c.fillRect(xl+44*k,gy-31*k,3*k,22*k);
 c.fillStyle='#c62828';c.beginPath();c.moveTo(xr-3*k,gy-14*k);c.lineTo(xr+8*k,gy-4*k);c.lineTo(xr-3*k,gy-4*k);c.fill();
 c.fillStyle='#fff59d';c.beginPath();c.arc(xr-2*k,gy-24*k,3*k,0,7);c.fill();
 [[xl+30*k,9],[xl+49*k,9],[xl+11*k,5]].forEach(w=>{c.fillStyle='#b71c1c';c.beginPath();c.arc(w[0],gy-w[1]*k,w[1]*k,0,7);c.fill();c.strokeStyle='#111';c.lineWidth=k;c.stroke()});
 c.strokeStyle='#bbb';c.lineWidth=2*k;c.beginPath();c.moveTo(xl+30*k,gy-9*k);c.lineTo(xl+49*k,gy-9*k);c.stroke()}
function drawTrain(c,t,hx,gy,k,ng){
 const L=66*k,h=34*k,g=3*k,y0=gy-h-5*k;
 for(let i=t.c-1;i>=0;i--){
  const xr=hx-i*(L+g),xl=xr-L,f=i==0,lo=f&&(t.k=='loco'||t.k=='steam'),bu=f&&t.k=='bullet';
  c.fillStyle='#222';c.fillRect(xl-g,gy-14*k,g+1,4*k);
  if(lo&&t.k=='steam'){steamL(c,xl,xr,gy,k);continue}
  c.fillStyle=lo?t.c1:(t.cb||t.c1);c.beginPath();
  if(bu){c.moveTo(xl,gy-5*k);c.lineTo(xl,y0);c.lineTo(xr-30*k,y0);c.quadraticCurveTo(xr+4*k,y0+3*k,xr+30*k,gy-16*k);c.lineTo(xr+30*k,gy-5*k);c.closePath()}
  else c.roundRect(xl,y0,L,h,4*k);
  c.fill();
  c.fillStyle='rgba(255,255,255,.2)';c.fillRect(xl,y0,bu?L-30*k:L,h*.28);
  c.fillStyle=t.c2;c.fillRect(xl,y0+h*.62,L+(bu?28*k:0),6*k);
  if(t.c3){c.fillStyle=t.c3;c.fillRect(xl,y0+h*.62+6*k,L+(bu?27*k:0),3*k)}
  c.fillStyle='#37474f';c.fillRect(xl,gy-10*k,L,5*k);
  c.fillStyle='#78909c';c.fillRect(xl+12*k,y0-3*k,L-24*k,3*k);
  c.fillStyle=ng?'#ffe9a0':'#2b4a63';
  if(lo){c.fillRect(xl+6*k,y0+6*k,9*k,10*k);c.fillRect(xr-16*k,y0+6*k,10*k,10*k);c.fillStyle='#fff';c.font='bold '+10*k+'px sans-serif';c.textAlign='center';c.fillText('CC 206',xl+L*.5,y0+25*k)}
  else for(let j=0;j<5;j++)c.fillRect(xl+6*k+j*12*k,y0+6*k,8*k,11*k);
  if(f&&!lo){c.fillStyle='#1b2b38';if(bu){c.beginPath();c.moveTo(xr-18*k,y0+5*k);c.lineTo(xr-2*k,y0+5*k);c.quadraticCurveTo(xr+12*k,y0+8*k,xr+20*k,y0+18*k);c.lineTo(xr-18*k,y0+18*k);c.fill()}else c.fillRect(xr-12*k,y0+5*k,9*k,13*k)}
  if(f){c.fillStyle='#fff59d';c.beginPath();c.arc(bu?xr+26*k:xr-2*k,gy-15*k,3*k,0,7);c.fill()}
  [xl+12*k,xr-12*k].forEach(wx=>{c.fillStyle='#212121';c.beginPath();c.arc(wx,gy-5*k,5*k,0,7);c.fill();c.fillStyle='#9e9e9e';c.beginPath();c.arc(wx,gy-5*k,2*k,0,7);c.fill()})}}
function ly(par,base,amp,f,col,tri,gy,cam){x.fillStyle=col;x.beginPath();x.moveTo(0,H);
 for(let X=0;X<=W+12;X+=12){const w=(X+cam*par)*f;let h=tri?1-Math.abs(((w%2)+2)%2-1):.5+.3*Math.sin(w*3)+.2*Math.sin(w*7.1);if(tri)h*=.65+.35*Math.sin(w*.9);x.lineTo(X,gy-base*u-amp*u*h)}
 x.lineTo(W,H);x.fill()}
function palm(X,by,s,d){x.strokeStyle='#6d4c41';x.lineWidth=4*u*s;x.beginPath();x.moveTo(X,by);x.quadraticCurveTo(X+10*u*s*d,by-45*u*s,X+5*u*s*d,by-85*u*s);x.stroke();
 const tx=X+5*u*s*d,ty=by-85*u*s;x.strokeStyle='#2e7d32';x.lineWidth=3*u*s;
 for(const a of[-2.9,-2.3,-1.7,-1.2,-.6,-.2]){x.beginPath();x.moveTo(tx,ty);x.quadraticCurveTo(tx+Math.cos(a)*20*u*s,ty+Math.sin(a)*26*u*s-8*u*s,tx+Math.cos(a)*38*u*s,ty+Math.sin(a)*14*u*s+16*u*s);x.stroke()}}
function house(X,by,r){x.fillStyle=['#fff3e0','#ffe0b2','#c8e6c9','#bbdefb'][Math.floor(r*4)%4];x.fillRect(X,by-26*u,46*u,26*u);x.fillStyle='#c0392b';x.beginPath();x.moveTo(X-5*u,by-26*u);x.lineTo(X+23*u,by-46*u);x.lineTo(X+51*u,by-26*u);x.fill();x.fillStyle='#5d4037';x.fillRect(X+18*u,by-16*u,10*u,16*u)}
function stBack(s,px,gy,P){const w=SP*P;if(px>W||px+w<-50)return;
 x.fillStyle='#ffe0b2';x.fillRect(px+w*.2,gy-100*u,w*.6,90*u);x.fillStyle='#c0392b';x.beginPath();x.moveTo(px+w*.17,gy-100*u);x.lineTo(px+w*.5,gy-145*u);x.lineTo(px+w*.83,gy-100*u);x.fill();
 x.fillStyle='#78909c';for(let i=0;i<4;i++)x.fillRect(px+w*.25+i*w*.14,gy-60*u,18*u,26*u);
 x.fillStyle='#1565c0';x.fillRect(px-6*u,gy-84*u,w+12*u,7*u);x.fillStyle='#455a64';[.08,.5,.92].forEach(q=>x.fillRect(px+w*q,gy-80*u,4*u,70*u));
 x.fillStyle='#0d47a1';x.fillRect(px+w*.5-80*u,gy-74*u,160*u,22*u);x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(px+w*.5-80*u,gy-74*u,160*u,22*u);
 x.fillStyle='#fff';x.font='bold '+13*u+'px sans-serif';x.textAlign='center';x.fillText(s.nm.toUpperCase(),px+w*.5,gy-58*u)}
function stFront(s,px,gy,P,cam){const w=SP*P;if(px>W||px+w<-50)return;
 x.fillStyle='#b0bec5';x.fillRect(px,gy+4*u,w,17*u);x.fillStyle='#ffd600';x.fillRect(px,gy+4*u,w,3*u);
 const cur=s===G.r.st[G.ni-1]&&G.dw>0,n=cur?Math.round(8*G.dw/3):s.done?0:7;
 for(let i=0;i<n;i++){const fx=px+w*(.08+.84*hs(i+s.x)),by=gy+21*u,bb=Math.sin(tm*4+i)*u;x.fillStyle=['#e53935','#fdd835','#1e88e5','#43a047'][i%4];x.fillRect(fx-3*u,by-19*u+bb,7*u,13*u);x.fillStyle='#ffcc9c';x.beginPath();x.arc(fx,by-23*u+bb,4*u,0,7);x.fill();x.fillStyle='#333';x.fillRect(fx-3*u,by-6*u+bb,3*u,6*u);x.fillRect(fx+1*u,by-6*u+bb,3*u,6*u)}
 if(!s.done){const mx=(s.x+SP-5)*P-cam;x.fillStyle='#ff6f00';x.fillRect(mx-2*u,gy-26*u,4*u,48*u);x.fillStyle='#d32f2f';x.fillRect(mx-24*u,gy-40*u,48*u,16*u);x.fillStyle='#fff';x.font='bold '+11*u+'px sans-serif';x.textAlign='center';x.fillText('STOP',mx,gy-28*u)}}
const SK=[['#2e9bff','#bfe9ff','#fff3cf'],['#4a2a7a','#ff6f61','#ffd58a'],['#040a22','#16286b','#3a58a8']];
function draw(){
 const t=TR[S.sel],gy=H*.72,P=3.67*u,cam=G.pos*P-W*.62,hx=W*.62,td=S.tod;
 let g=x.createLinearGradient(0,0,0,gy);SK[td].forEach((c,i)=>g.addColorStop(i/2,c));x.fillStyle=g;x.fillRect(0,0,W,H);
 if(td==2){x.fillStyle='#fff';for(let i=0;i<50;i++){x.globalAlpha=.4+.6*Math.abs(Math.sin(tm*2+i));x.fillRect(hs(i)*W,hs(i+50)*gy*.8,2,2)}x.globalAlpha=1}
 x.fillStyle=td==2?'#f5f5dc':td==1?'#ffb74d':'#fff59d';x.beginPath();x.arc(W*.78,gy*(td==1?.62:.27),(td==2?24:36)*u,0,7);x.fill();
 x.fillStyle='rgba(255,255,255,'+(td==2?.15:.85)+')';
 for(let i=0;i<6;i++){const cx=(((hs(i)*1500+tm*(6+i*2)-cam*.03)%(W+300))+W+300)%(W+300)-150,cy=gy*(.1+hs(i+9)*.3);[[0,0,26],[24,-6,22],[-24,4,18],[48,4,16]].forEach(a=>{x.beginPath();x.arc(cx+a[0]*u,cy+a[1]*u,a[2]*u,0,7);x.fill()})}
 ly(.05,150,120,.004,'#86b9de',1,gy,cam);ly(.12,95,70,.006,'#5aa585',1,gy,cam);ly(.3,50,40,.007,'#3f9560',0,gy,cam);
 x.fillStyle='#7cb342';x.fillRect(0,gy-24*u,W,26*u);x.fillStyle='#9ccc65';
 const sw=45*u;for(let X=-((cam*.9)%(2*sw))-2*sw;X<W;X+=2*sw)x.fillRect(X,gy-24*u,sw,26*u);
 for(let i=Math.floor((cam*.7-100)/170);i<=Math.floor((cam*.7+W)/170);i++){const r=hs(i+3),X=i*170+r*60-cam*.7;if(r>.55)palm(X,gy-22*u,.9,r>.78?-1:1);else if(r<.18)house(X,gy-22*u,r*5)}
 G.r.st.forEach(s=>stBack(s,s.x*P-cam,gy,P));
 G.r.sg.forEach(s=>{const px=s.x*P-cam;if(px<-40||px>W+40)return;x.fillStyle='#555';x.fillRect(px-2*u,gy-62*u,4*u,62*u);x.fillStyle='#fff';x.beginPath();x.arc(px,gy-72*u,16*u,0,7);x.fill();x.strokeStyle='#e53935';x.lineWidth=4*u;x.stroke();x.fillStyle='#111';x.font='bold '+14*u+'px sans-serif';x.textAlign='center';x.fillText(s.l,px,gy-67*u)});
 g=x.createLinearGradient(0,gy,0,H);g.addColorStop(0,'#7a6a55');g.addColorStop(1,'#33271c');x.fillStyle=g;x.fillRect(0,gy,W,H-gy);
 x.fillStyle='#4e342e';for(let X=-(cam%(14*u));X<W;X+=14*u)x.fillRect(X,gy,8*u,5*u);x.fillStyle='#cfd8dc';x.fillRect(0,gy,W,3*u);
 const bob=G.m=='play'||G.m=='menu'?Math.abs(Math.sin(tm*13))*Math.min(G.v/5,2)*u*.6:0;
 drawTrain(x,t,hx,gy-bob,u,td==2);
 G.pf.forEach(p=>{x.fillStyle='rgba(235,235,235,'+(.7-p.a*.35)+')';x.beginPath();x.arc(p.x*P-cam,gy-52*u-p.a*40*u,(5+p.a*9)*u,0,7);x.fill()});
 G.r.st.forEach(s=>stFront(s,s.x*P-cam,gy,P,cam));
 if(td){x.fillStyle=td==1?'rgba(255,110,30,.14)':'rgba(5,10,60,.5)';x.fillRect(0,0,W,H)}
 if(td==2){const q=x.createLinearGradient(hx,0,hx+450*u,0);q.addColorStop(0,'rgba(255,245,160,.35)');q.addColorStop(1,'rgba(255,245,160,0)');x.fillStyle=q;x.beginPath();x.moveTo(hx+(t.k=='bullet'?28:0)*u,gy-18*u);x.lineTo(hx+450*u,gy-60*u);x.lineTo(hx+450*u,gy+10*u);x.fill()}
 if(G.m=='play'||G.m=='pause'){
  $('sc').textContent=Math.floor(G.sc);$('lv').textContent=G.lv;$('cn').textContent=S.coin;$('sp').textContent=Math.round(G.v*3.6);
  const l=$('lim');l.textContent=limAt(G.pos);l.classList.toggle('ov',!!G.ov);$('sf').style.width=Math.max(0,G.sf)+'%';
  const s=G.r.st[G.ni];$('nx').textContent=s?'🚉 '+s.nm+' — '+Math.max(0,Math.round(s.x+SP-5-G.pos))+' m':'🚉 Selesai!'}}
/* shop & settings */
const bar=(l,f)=>`<div class="st"><span>${l}</span><i><u style="width:${Math.round(Math.min(1,f)*100)}%"></u></i></div>`;
function shop(){$('sc2').textContent=S.coin;const g=$('grid');g.innerHTML='';
 TR.forEach((t,i)=>{const d=document.createElement('div');d.className='cd';
  d.innerHTML='<canvas width="270" height="76"></canvas><b>'+t.n+'</b><small>'+t.s+'</small>'+bar('Kecepatan',t.v/200)+bar('Akselerasi',t.a/1.8)+bar('Rem',t.b/3)+bar('Pendapatan',t.m/3)+'<button class="b sm"></button>';
  const c=d.querySelector('canvas').getContext('2d');c.fillStyle='#8d7b68';c.fillRect(0,68,270,8);c.fillStyle='#cfd8dc';c.fillRect(0,66,270,2);drawTrain(c,t,236,66,.55,0);
  const bt=d.querySelector('button'),o=S.own.includes(i);
  bt.textContent=o?(S.sel==i?'✔ DIPAKAI':'PILIH'):(S.coin>=t.p?'BELI 🪙'+t.p:'🔒 🪙'+t.p);bt.className='b sm '+(o?(S.sel==i?'g':'bl'):(S.coin>=t.p?'y':''));bt.disabled=!o&&S.coin<t.p;
  bt.onclick=()=>{au();if(!o){S.coin-=t.p;S.own.push(i);ding()}S.sel=i;sv();shop()};g.appendChild(d)})}
function sets(){$('s1').textContent='🔊 Suara: '+(S.snd?'NYALA':'MATI');$('s2').textContent='🎯 Kesulitan: '+DN[S.df];$('s3').textContent='🕒 Waktu: '+TN[S.tod]}
const on=(id,f)=>$(id).onclick=()=>{au();f()};
on('bm',startGame);on('bt',()=>{shop();show('shop')});on('bs',()=>{sets();show('set')});on('sb1',toMenu);on('s5',toMenu);
on('s1',()=>{S.snd^=1;sv();sets();ding()});on('s2',()=>{S.df=(S.df+1)%3;sv();sets()});on('s3',()=>{S.tod=(S.tod+1)%3;sv();sets()});
on('s4',()=>{if(confirm('Hapus semua koin, kereta, dan skor tertinggi?')){S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:0};sv();sets()}});
on('bp',pz);on('br',pz);on('bq',toMenu);on('bq2',toMenu);on('ba',startGame);on('bn',()=>{G.lv++;G.sf=Math.min(100,G.sf+20);newLevel()});
/* kontrol */
function hold(id,fn){const e=$(id);e.addEventListener('pointerdown',ev=>{ev.preventDefault();au();fn(1)});['pointerup','pointerleave','pointercancel'].forEach(n=>e.addEventListener(n,()=>fn(0)))}
hold('gas',v=>gB=v);hold('brk',v=>bB=v);$('hrn').addEventListener('pointerdown',e=>{e.preventDefault();au();horn()});
addEventListener('keydown',e=>{K[e.code]=1;if(['Space','ArrowUp','ArrowDown'].includes(e.code))e.preventDefault();if(e.repeat)return;
 if(e.code=='KeyH'&&G.m=='play'){au();horn()}if(e.code=='KeyP'||e.code=='Escape')pz()});
addEventListener('keyup',e=>K[e.code]=0);addEventListener('blur',()=>{K={};gB=bB=0;if(G.m=='play')pz()});
/* loop */
let last=0;function loop(ts){const dt=Math.min(.05,(ts-last)/1000||0);last=ts;if(G.m!='pause')tm+=dt;upd(dt);draw();requestAnimationFrame(loop)}
toMenu();requestAnimationFrame(loop);
