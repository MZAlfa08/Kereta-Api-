/* Audio realistis: semua suara dibuat langsung oleh browser (WebAudio), tanpa file eksternal */
let TUN=0,BRG=0; /* kedalaman di terowongan / jembatan (0..1) untuk suara */
let AC,M,NZ,RV,E={},HR=null,HD=0;
function au(){if(AC){AC.resume();return}
 try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 const cp=AC.createDynamicsCompressor();M=AC.createGain();M.gain.value=.9;M.connect(cp);cp.connect(AC.destination);
 const n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;NZ=b;
 const rl=Math.floor(AC.sampleRate*1.6),ib=AC.createBuffer(2,rl,AC.sampleRate);
 for(let c=0;c<2;c++){const q=ib.getChannelData(c);for(let i=0;i<rl;i++)q[i]=(Math.random()*2-1)*Math.pow(1-i/rl,3)}
 RV=AC.createConvolver();RV.buffer=ib;const rg=AC.createGain();rg.gain.value=.4;RV.connect(rg);rg.connect(M);
 const ns=(ty,f,q)=>{const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NZ;s.loop=true;fl.type=ty;fl.frequency.value=f;fl.Q.value=q||1;g.gain.value=0;s.connect(fl);fl.connect(g);g.connect(M);s.start();return{f:fl,n:g}},
 os=(ty,f,lp)=>{const o=AC.createOscillator(),fl=AC.createBiquadFilter(),g=AC.createGain();o.type=ty;o.frequency.value=f;fl.type='lowpass';fl.frequency.value=lp;g.gain.value=0;o.connect(fl);fl.connect(g);g.connect(M);o.start();return{o,n:g}};
 E={rb:ns('lowpass',120),wd:ns('bandpass',900,.6),sq:ns('bandpass',3300,14),ds:os('sawtooth',40,300),wh:os('triangle',300,2500),rn:ns('highpass',2200,.5),fr:ns('bandpass',1800,.7),tn:ns('lowpass',220,.7),br:ns('bandpass',420,1.8),cr:ns('bandpass',700,.7)}}
/* suara mesin & roda berjalan (dipanggil tiap frame) */
function eng(on,sp,N,b,k,es){es=es==null?1:es;if(!AC||!E.rb)return;const t=AC.currentTime,o=on&&S.snd,s=(e,v)=>e.n.gain.setTargetAtTime(o?v:0,t,.15),el=k=='krl'||k=='mrt'||k=='bullet';
 s(E.rn,WXV()==1?.09:0);s(E.fr,es>1.3?.07+.06*Math.random():0);s(E.rb,.06+.55*sp);E.rb.f.frequency.setTargetAtTime(80+sp*240,t,.2);
 s(E.wd,(.01+.22*sp*sp)*(1+TUN*.9));E.wd.f.frequency.setTargetAtTime(500+sp*1500,t,.2);
 /* terowongan: gemuruh dalam & menggema; jembatan: gemuruh baja berongga */
 s(E.tn,TUN*(.12+.5*sp));E.tn.f.frequency.setTargetAtTime(150+sp*260,t,.2);s(E.br,BRG*(.03+.22*sp));E.br.f.frequency.setTargetAtTime(300+sp*420,t,.2);
 s(E.sq,b>0&&sp>.06?.05*Math.min(1,b)*Math.min(1,sp*4):0);
 s(E.ds,k=='loco'?(.1+.16*N)*es:0);E.ds.o.frequency.setTargetAtTime(36+N*13,t,.4);
 s(E.wh,el?.012+.04*Math.min(1,sp*2.2)*(.4+.6*Math.max(N,sp))*es:0);E.wh.o.frequency.setTargetAtTime(160+sp*1200,t,.15)}
/* "tak-tak" roda melewati sambungan rel (2 bogie) */
function clack(sp){if(!AC||!S.snd)return;[0,.11].forEach(d=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),t=AC.currentTime+d;
 s.buffer=NZ;s.playbackRate.value=.6+Math.random()*.3;f.type='bandpass';f.frequency.value=900+sp*600;f.Q.value=1.4;
 g.gain.setValueAtTime(.25+.45*sp,t);g.gain.exponentialRampToValueAtTime(.001,t+.07);s.connect(f);f.connect(g);g.connect(M);s.start(t,Math.random(),.1)})}
/* hembusan uap lokomotif uap */
function chuff(sp){if(!AC||!S.snd)return;const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),t=AC.currentTime;
 s.buffer=NZ;f.type='lowpass';f.frequency.value=420;g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.5,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.16);
 s.connect(f);f.connect(g);g.connect(M);s.start(t,Math.random(),.2)}
/* klakson angin lokomotif diesel (tipe Nathan/Wabco): beberapa corong dengan nada berbeda, letupan udara di awal,
   nada naik cepat lalu stabil, resonansi corong, gema; saat dilepas sedikit turun nadanya */
const HN={krl:[440,554,659],mrt:[523,659,784],loco:[233,294,349,440],steam:[262,330,392],bullet:[622,784,932]};
/* ===== KLAKSON TIAP KERETA BERBEDA =====
   Setiap kereta punya "sidik jari" klakson sendiri: susunan nada corong (akor), bentuk gelombang, getar (tremolo),
   letupan udara di awal, kecepatan naik nada, dan pola tut-tut otomatis. Lokomotif diesel dibuat dari 11 akor x 7 transposisi
   sehingga tidak ada dua kereta yang sama; uap, kereta cepat, dan LRT punya suara khas sendiri. */
const HCH=[[233,294,349,440],[220,277,330,415],[196,247,294,370],[262,311,392,466],[247,311,370,494],[208,261,311,392],[277,349,415,523],[185,233,277,349],[294,370,440,554],[175,220,262,330],[311,392,466,587]];
function hornSpec(t,i){const k=t.k;
 if(k=='steam')return{ns:[262,330,392],ty:'triangle',st:1,tr:7,at:.14,bk:.9,pt:1};
 if(k=='bullet')return{ns:[622,784,932],ty:'sawtooth',tr:9.5,bk:1.2,lp:4200,at:.05,pt:2};
 if(k=='mrt'||k=='krl')return{ns:[523,659,784],ty:'square',ga:.7,tr:6,bk:.8,lp:3000,at:.05,pt:0};
 const f=Math.pow(2,(((i*3)%7)-3)/12),ch=HCH[i%HCH.length],ty=['sawtooth','sawtooth','square'][i%3];
 return{ns:ch.map(v=>Math.round(v*f*10)/10),ty,ga:ty=='square'?.75:1,tr:6+(i%5)*1.2,bk:1+(i%4)*.3,lp:[3600,3000,4200,3300][i%4],dt:.002+(i%3)*.0016,at:.05+(i%3)*.03,bg:7+(i%4)*1.5,pt:i%3}}
const HSP={};
function hornFor(i){const t=TR[i];if(!t)return hornSpec({k:'loco'},0);return HSP[t.n]||(HSP[t.n]=hornSpec(t,i))}
/* klakson acak (kereta lain / lalu lintas AI) agar suaranya beragam */
function hornRand(){return hornFor(Math.random()*TR.length|0)}
function hornOn(h){HD=1;if(!AC||HR||!S.snd)return;h=typeof h=='string'?hornSpec({k:h},0):(h||hornSpec({k:'loco'},0));const t=AC.currentTime,st=!!h.st,ns=h.ns,ty=h.ty||(st?'triangle':'sawtooth'),g=AC.createGain(),bl=AC.createBiquadFilter(),lp=AC.createBiquadFilter(),rv=AC.createGain(),os=[];
 lp.type='lowpass';lp.Q.value=.7;lp.frequency.setValueAtTime(1300,t);lp.frequency.linearRampToValueAtTime(h.lp||(st?2600:3600),t+.22);bl.type='peaking';bl.frequency.value=st?1100:900;bl.Q.value=1.1;bl.gain.value=h.bg||(st?4:9);
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.11,t+(h.at||(st?.14:.07)));g.gain.linearRampToValueAtTime(.095,t+.35);
 g.connect(bl);bl.connect(lp);lp.connect(M);rv.gain.value=.7;lp.connect(rv);rv.connect(RV);{const lf=AC.createOscillator(),lg=AC.createGain();lf.frequency.value=h.tr||8.3;lg.gain.value=.012;lf.connect(lg);lg.connect(g.gain);lf.start(t);os.push(lf)}
 ns.forEach(f=>[0,1].forEach(j=>{const o=AC.createOscillator(),og=AC.createGain(),fr=f*(j?1+(h.dt||.0035):1-(h.dt||.0035));o.type=ty;
  o.frequency.setValueAtTime(fr*.9,t);o.frequency.exponentialRampToValueAtTime(fr,t+.12);og.gain.value=2.1*(h.ga||1)/ns.length;o.connect(og);og.connect(g);o.start(t);os.push(o);
  if(!j){[[2,.22,'sine'],[.5,.2,'sine']].forEach(h=>{if(st&&h[0]<1)return;const o2=AC.createOscillator(),g2=AC.createGain();o2.type=h[2];o2.frequency.setValueAtTime(fr*h[0]*.9,t);o2.frequency.exponentialRampToValueAtTime(fr*h[0],t+.12);g2.gain.value=h[1]*2.1*(h.ga||1)/ns.length;o2.connect(g2);g2.connect(g);o2.start(t);os.push(o2)})}}));
 const s=AC.createBufferSource(),nf=AC.createBiquadFilter(),ng=AC.createGain();s.buffer=NZ;s.loop=true;nf.type='bandpass';nf.frequency.value=2200;nf.Q.value=.7;
 ng.gain.setValueAtTime(h.bk||(st?.9:1.6),t);ng.gain.exponentialRampToValueAtTime(st?.5:.12,t+.25);s.connect(nf);nf.connect(ng);ng.connect(g);s.start();os.push(s);
 HR={g,os}}
function hornOff(){HD=0;if(!HR||!AC)return;const{g,os}=HR,t=AC.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+.28);
 os.forEach(o=>{try{if(o.frequency){o.frequency.cancelScheduledValues(t);o.frequency.setValueAtTime(o.frequency.value,t);o.frequency.exponentialRampToValueAtTime(Math.max(20,o.frequency.value*.96),t+.28)}o.stop(t+.32)}catch(e){}});HR=null}
function tone(f,d,ty,v,f2,dl){if(!S.snd||!AC)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+(dl||0);o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.linearRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(M);o.start(t);o.stop(t+d)}
const ding=()=>{tone(988,.5,'sine',.18);tone(1319,.7,'sine',.18,0,.14)},bad=()=>tone(160,.6,'sawtooth',.14,60),tk=()=>tone(260,.05,'square',.05);
const bell=()=>{tone(1650,.2,'triangle',.07);tone(1760,.2,'triangle',.05)};
const crank=()=>{for(let i=0;i<9;i++)tone(60+i*5,.13,'sawtooth',.13,0,i*.22);tone(90,.5,'sawtooth',.12,170,2)},engStop=()=>tone(140,.7,'sawtooth',.1,40),boom=()=>{tone(70,1,'sawtooth',.2,30);tone(400,.5,'square',.05,100)};

/* ===== SUARA STASIUN: keramaian, pengumuman, lonceng, klakson masuk, desis rem angin, bunyi pintu, peluit ===== */
/* desis udara (rem angin / pintu): noise high-pass dengan envelope */
function hiss(d,v,f){if(!AC||!S.snd)return;const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain(),t=AC.currentTime;
 s.buffer=NZ;s.loop=true;fl.type='highpass';fl.frequency.value=f||2000;g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(v,t+.05);g.gain.exponentialRampToValueAtTime(.001,t+d);
 s.connect(fl);fl.connect(g);g.connect(M);s.start(t);s.stop(t+d+.1)}
/* dengung keramaian peron: makin dekat stasiun makin ramai (dipanggil tiap frame, dibatasi) */
function crowd(nr,wt){if(!AC||!E.cr)return;const t=AC.currentTime;if(t-(crowd.l||0)<.12)return;crowd.l=t;
 E.cr.n.gain.setTargetAtTime(S.snd?nr*(.03+.03*wt)*(.65+.35*Math.random()):0,t,.35);E.cr.f.frequency.setTargetAtTime(450+Math.random()*550,t,.25)}
/* nada "neng-nong neng-nong" khas pengumuman (dibunyikan SEBELUM pramugari bicara): nada tinggi lalu rendah, diulang 2x, timbre lonceng */
function chime(){[[880,0],[659,.5],[880,1.1],[659,1.6]].forEach(q=>{const f=q[0],d=q[1];tone(f,.75,'sine',.2,0,d);tone(f*2,.45,'sine',.07,0,d);tone(f*3.01,.25,'sine',.025,0,d);tone(f*.5,.6,'sine',.06,0,d)})}
chime.ms=2500;
/* lonceng stasiun: pukulan logam berulang "teng-teng-teng" */
function bellSt(){if(!AC||!S.snd)return;for(let i=0;i<9;i++){const d=i*.32;[[1,.1],[2.76,.05],[5.4,.03],[8.9,.015]].forEach(p=>tone(1040*p[0],.55,'sine',p[1],0,d))}}
/* klakson otomatis (tidak dihitung sebagai klakson pemain di perlintasan) */
function autoHorn(k,ms){if(!AC||!S.snd)return;const pt=(k&&k.pt)||0,sq=ms>1000?(pt==1?[[0,900],[1100,Math.max(400,ms-1100)]]:pt==2?[[0,300],[460,300],[920,300],[1380,Math.max(400,ms-1380)]]:[[0,380],[560,380],[1120,Math.max(400,ms-1120)]]):[[0,ms]]; /* pola: tut-tut-tuuuut / tuuut-tuut / tut-tut-tut-tuuut */
 sq.forEach(p=>{setTimeout(()=>{const h=HD;hornOn(k);HD=h},p[0]);setTimeout(()=>{if(!HD)hornOff()},p[0]+p[1])})}
/* rem angin dilepas saat kereta berhenti: "pssshhh" + hentakan rendah */
function airRel(){hiss(1.8,.2,2400);hiss(1.2,.08,900);tone(70,.25,'sine',.14,40)}
/* pintu: bunyi peringatan pintu terbuka/tertutup */
function doorBeep(n){for(let i=0;i<n;i++){tone(1850,.13,'square',.035,0,i*.23);tone(1850,.13,'triangle',.05,0,i*.23)}}
/* peluit petugas (PPKA): tiupan PANJANG (semboyan 40) ±2,6 detik: tarikan napas, nada naik, getar kelereng peluit, gema, lalu mereda */
const WHD=2.6;
function whistle(){if(!AC||!S.snd)return;hiss(.14,.03,2800);const t=AC.currentTime,d=WHD,g=AC.createGain(),tg=AC.createGain(),lf=AC.createOscillator(),lg=AC.createGain(),vb=AC.createOscillator(),vg=AC.createGain(),rv=AC.createGain();
 g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.05,t+.05);g.gain.linearRampToValueAtTime(.17,t+.16);g.gain.linearRampToValueAtTime(.19,t+d*.6);g.gain.linearRampToValueAtTime(.12,t+d-.3);g.gain.linearRampToValueAtTime(0,t+d);
 tg.gain.value=.72;lf.frequency.value=27;lg.gain.value=.28;lf.connect(lg);lg.connect(tg.gain);vb.frequency.value=5.2;vg.gain.value=22;vb.connect(vg);
 [[2650,1],[5300,.18],[2662,.5]].forEach(p=>{const o=AC.createOscillator(),pg=AC.createGain();o.type='sine';o.frequency.setValueAtTime(p[0]*.93,t);o.frequency.linearRampToValueAtTime(p[0],t+.14);o.frequency.setValueAtTime(p[0],t+d-.35);o.frequency.linearRampToValueAtTime(p[0]*.97,t+d);
  vg.connect(o.frequency);pg.gain.value=p[1];o.connect(pg);pg.connect(tg);o.start(t);o.stop(t+d+.1)});
 const s=AC.createBufferSource(),nf=AC.createBiquadFilter(),ng=AC.createGain();s.buffer=NZ;s.loop=true;nf.type='bandpass';nf.frequency.value=3300;nf.Q.value=2.2;ng.gain.value=.55;s.connect(nf);nf.connect(ng);ng.connect(tg);s.start(t,Math.random(),d+.1);
 tg.connect(g);g.connect(M);rv.gain.value=.6;g.connect(rv);rv.connect(RV);lf.start(t);vb.start(t);lf.stop(t+d+.1);vb.stop(t+d+.1)}
/* ---------- SUARA PENGUMUMAN (Bahasa Indonesia) ----------
   - memilih suara Indonesia TERBAIK yang ada di perangkat (utamakan suara 'natural/online/Google'; perempuan untuk pramugari, laki-laki untuk PPKA)
   - kalimat dipecah per kalimat supaya jeda alami dan tidak terpotong, singkatan dibaca benar (KA -> kereta api)
   - didahului bunyi "neng-nong" (panjang untuk kereta datang, pendek untuk pengumuman lanjutan) */
let SAYT=0,VPK={};
try{if(window.speechSynthesis)speechSynthesis.onvoiceschanged=()=>{VPK={}}}catch(e){}
function pickVoice(male){const k=male?'m':'f';if(VPK[k])return VPK[k];let vs=[];try{vs=speechSynthesis.getVoices()||[]}catch(e){}
 const id=vs.filter(q=>/^id([-_]|$)/i.test(q.lang)||/indonesia/i.test(q.name));if(!id.length)return null;
 const sc=q=>{const n=q.name;let s=0;if(/natural|neural|online|enhanced|premium|wavenet/i.test(n))s+=5;if(/google/i.test(n))s+=3;if(q.localService===false)s+=1;
  const m=/andika|ardi|male|pria|rizki|jaya|bagus|budi|laki/i.test(n),f=/gadis|damayanti|female|wanita|perempuan|indah|ayu|sari|putri/i.test(n);
  if(male){if(m)s+=6;if(f)s-=6}else{if(f)s+=6;if(m)s-=6}return s};
 const v=id.slice().sort((x,y)=>sc(y)-sc(x))[0];if(vs.length)VPK[k]=v;return v}
const isNat=v=>!!v&&/natural|neural|online|enhanced|premium|wavenet|google/i.test(v.name);
function sayNorm(t){return t.replace(/\bPPKA\b/g,'P P K A').replace(/\bKRL\b/g,'K R L').replace(/\bKAI\b/g,'K A I').replace(/\bKA\b/g,'Kereta Api').replace(/\bCC\b/g,'C C').replace(/\s+/g,' ').trim()}
function chimeShort(){[[784,0],[988,.42]].forEach(q=>{const f=q[0],d=q[1];tone(f,.7,'sine',.2,0,d);tone(f*2,.4,'sine',.06,0,d);tone(f*3.01,.2,'sine',.02,0,d);tone(f*.5,.5,'sine',.05,0,d)})}
chimeShort.ms=1300;
function sayStop(){clearTimeout(SAYT);try{window.speechSynthesis&&speechSynthesis.cancel()}catch(e){}}
function say(txt,short){if(!S.snd)return;clearTimeout(SAYT);short?chimeShort():chime();if(!window.speechSynthesis||typeof SpeechSynthesisUtterance=='undefined')return;
 try{speechSynthesis.cancel();const v=pickVoice(false),nat=isNat(v),parts=sayNorm(txt).match(/[^.!?]+[.!?]*/g)||[txt];
  SAYT=setTimeout(()=>{try{parts.forEach((p,i)=>{p=p.trim();if(!p)return;const ut=new SpeechSynthesisUtterance(p);ut.lang='id-ID';if(v)ut.voice=v;ut.rate=nat?.95:.88;ut.pitch=nat?1:1.12;ut.volume=1;speechSynthesis.speak(ut)})}catch(e){}},short?chimeShort.ms:chime.ms)}catch(e){}}

/* ---------- PETUGAS PPKA: suara radio memberangkatkan kereta ---------- */
/* bunyi "kreek" tombol radio (HT) ditekan / dilepas */
function radioKey(on){tone(on?1500:950,.05,'square',.035);hiss(on?.14:.09,.09,on?2600:2000)}
/* suara petugas (nada rendah, lewat speechSynthesis) diapit bunyi radio; tanpa suara bicara hanya bunyi radio */
function sayPPKA(txt,cb){let dn=0;const fin=()=>{if(dn)return;dn=1;radioKey(0);cb&&cb()};
 if(!S.snd){if(cb)setTimeout(()=>{if(!dn){dn=1;cb()}},500);return}
 radioKey(1);
 if(!window.speechSynthesis||typeof SpeechSynthesisUtterance=='undefined'){setTimeout(fin,900);return}
 try{speechSynthesis.cancel();const ut=new SpeechSynthesisUtterance(sayNorm(txt)),v=pickVoice(true);ut.lang='id-ID';ut.rate=.92;ut.pitch=isNat(v)?.95:.55;ut.volume=1;
  if(v)ut.voice=v;
  ut.onend=fin;ut.onerror=fin;setTimeout(()=>{try{speechSynthesis.speak(ut)}catch(e){fin()}},380);setTimeout(fin,9000)}catch(e){fin()}}
