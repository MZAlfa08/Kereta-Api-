/* Audio realistis: semua suara dibuat langsung oleh browser (WebAudio), tanpa file eksternal */
let AC,M,NZ,RV,E={},HR=null;
function au(){if(AC){AC.resume();return}
 try{AC=new(window.AudioContext||window.webkitAudioContext)()}catch(e){return}
 const cp=AC.createDynamicsCompressor();M=AC.createGain();M.gain.value=.9;M.connect(cp);cp.connect(AC.destination);
 const n=AC.sampleRate*2,b=AC.createBuffer(1,n,AC.sampleRate),d=b.getChannelData(0);for(let i=0;i<n;i++)d[i]=Math.random()*2-1;NZ=b;
 const rl=Math.floor(AC.sampleRate*1.6),ib=AC.createBuffer(2,rl,AC.sampleRate);
 for(let c=0;c<2;c++){const q=ib.getChannelData(c);for(let i=0;i<rl;i++)q[i]=(Math.random()*2-1)*Math.pow(1-i/rl,3)}
 RV=AC.createConvolver();RV.buffer=ib;const rg=AC.createGain();rg.gain.value=.4;RV.connect(rg);rg.connect(M);
 const ns=(ty,f,q)=>{const s=AC.createBufferSource(),fl=AC.createBiquadFilter(),g=AC.createGain();s.buffer=NZ;s.loop=true;fl.type=ty;fl.frequency.value=f;fl.Q.value=q||1;g.gain.value=0;s.connect(fl);fl.connect(g);g.connect(M);s.start();return{f:fl,n:g}},
 os=(ty,f,lp)=>{const o=AC.createOscillator(),fl=AC.createBiquadFilter(),g=AC.createGain();o.type=ty;o.frequency.value=f;fl.type='lowpass';fl.frequency.value=lp;g.gain.value=0;o.connect(fl);fl.connect(g);g.connect(M);o.start();return{o,n:g}};
 E={rb:ns('lowpass',120),wd:ns('bandpass',900,.6),sq:ns('bandpass',3300,14),ds:os('sawtooth',40,300),wh:os('triangle',300,2500)}}
/* suara mesin & roda berjalan (dipanggil tiap frame) */
function eng(on,sp,N,b,k){if(!AC||!E.rb)return;const t=AC.currentTime,o=on&&S.snd,s=(e,v)=>e.n.gain.setTargetAtTime(o?v:0,t,.15),el=k=='krl'||k=='mrt'||k=='bullet';
 s(E.rb,.06+.55*sp);E.rb.f.frequency.setTargetAtTime(80+sp*240,t,.2);
 s(E.wd,.01+.22*sp*sp);E.wd.f.frequency.setTargetAtTime(500+sp*1500,t,.2);
 s(E.sq,b>0&&sp>.06?.05*Math.min(1,b)*Math.min(1,sp*4):0);
 s(E.ds,k=='loco'?.1+.16*N:0);E.ds.o.frequency.setTargetAtTime(36+N*13,t,.4);
 s(E.wh,el?.012+.04*Math.min(1,sp*2.2)*(.4+.6*Math.max(N,sp)):0);E.wh.o.frequency.setTargetAtTime(160+sp*1200,t,.15)}
/* "tak-tak" roda melewati sambungan rel (2 bogie) */
function clack(sp){if(!AC||!S.snd)return;[0,.11].forEach(d=>{const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),t=AC.currentTime+d;
 s.buffer=NZ;s.playbackRate.value=.6+Math.random()*.3;f.type='bandpass';f.frequency.value=900+sp*600;f.Q.value=1.4;
 g.gain.setValueAtTime(.25+.45*sp,t);g.gain.exponentialRampToValueAtTime(.001,t+.07);s.connect(f);f.connect(g);g.connect(M);s.start(t,Math.random(),.1)})}
/* hembusan uap lokomotif uap */
function chuff(sp){if(!AC||!S.snd)return;const s=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain(),t=AC.currentTime;
 s.buffer=NZ;f.type='lowpass';f.frequency.value=420;g.gain.setValueAtTime(.001,t);g.gain.linearRampToValueAtTime(.5,t+.015);g.gain.exponentialRampToValueAtTime(.001,t+.16);
 s.connect(f);f.connect(g);g.connect(M);s.start(t,Math.random(),.2)}
/* klakson angin (air horn) akor 3 nada + sedikit getaran + gema, tahan untuk membunyikan */
const HN={krl:[466,587,698],mrt:[523,659,784],loco:[196,247,294],steam:[262,330,392],bullet:[622,784,932]};
function hornOn(k){if(!AC||HR||!S.snd)return;const t=AC.currentTime,g=AC.createGain(),lp=AC.createBiquadFilter(),rv=AC.createGain(),os=[];
 lp.type='lowpass';lp.frequency.value=2400;g.gain.setValueAtTime(0,t);g.gain.linearRampToValueAtTime(.085,t+.06);g.connect(lp);lp.connect(M);rv.gain.value=.7;lp.connect(rv);rv.connect(RV);
 (HN[k]||HN.loco).forEach(f=>[0,1].forEach(j=>{const o=AC.createOscillator(),lf=AC.createOscillator(),lg=AC.createGain();
  o.type=j?'square':'sawtooth';o.frequency.value=f*(j?1.004:.997);lf.frequency.value=5.5;lg.gain.value=f*.004;lf.connect(lg);lg.connect(o.frequency);o.connect(g);o.start();lf.start();os.push(o,lf)}));
 const s=AC.createBufferSource(),nf=AC.createBiquadFilter(),ng=AC.createGain();s.buffer=NZ;s.loop=true;nf.type='bandpass';nf.frequency.value=1400;nf.Q.value=.8;ng.gain.value=.5;s.connect(nf);nf.connect(ng);ng.connect(g);s.start();os.push(s);
 HR={g,os}}
function hornOff(){if(!HR||!AC)return;const{g,os}=HR,t=AC.currentTime;g.gain.cancelScheduledValues(t);g.gain.setValueAtTime(g.gain.value,t);g.gain.linearRampToValueAtTime(0,t+.35);os.forEach(o=>{try{o.stop(t+.4)}catch(e){}});HR=null}
function tone(f,d,ty,v,f2,dl){if(!S.snd||!AC)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime+(dl||0);o.type=ty;o.frequency.setValueAtTime(f,t);if(f2)o.frequency.linearRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(M);o.start(t);o.stop(t+d)}
const ding=()=>{tone(988,.5,'sine',.18);tone(1319,.7,'sine',.18,0,.14)},bad=()=>tone(160,.6,'sawtooth',.14,60),tk=()=>tone(260,.05,'square',.05);
