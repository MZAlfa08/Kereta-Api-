/* Audio: efek suara via WebAudio (tanpa file eksternal) */
let AC;
function au(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();AC.resume()}catch(e){}}
function tone(f,d,ty,v,f2){if(!S.snd||!AC)return;const o=AC.createOscillator(),g=AC.createGain(),t=AC.currentTime;o.type=ty;o.frequency.value=f;if(f2)o.frequency.linearRampToValueAtTime(f2,t+d);g.gain.setValueAtTime(v,t);g.gain.exponentialRampToValueAtTime(.001,t+d);o.connect(g);g.connect(AC.destination);o.start();o.stop(t+d)}
const horn=()=>{tone(311,1,'sawtooth',.1);tone(392,1,'sawtooth',.1)},ding=()=>tone(880,.35,'sine',.2,1320),bad=()=>tone(160,.5,'square',.12,70);
