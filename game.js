/* ============================================================
   GAME KERETA INDONESIA - game.js
   - MRT Jakarta dihapus
   - Lokomotif diganti gaya CC 201 / CC 203 / CC 204 / CC 206
   - Mandiri: UI dibuat lewat JS, tidak butuh ID khusus di index.html
   Kontrol: GAS = Spasi / Panah Kanan / D | REM = Panah Bawah / Kiri / S
   ============================================================ */
(() => {
'use strict';

/* ---------- DATA ---------- */
const SAVE_KEY = 'kereta_save_v2';
const TRAINS = [
  { id:'krl',      name:'KRL Commuter Line',      sub:'JR 205 • kepala + gerbong KRL',        price:0,     st:[5,7,7,3],  units:['krlh','krl','krl','krl','krl'] },
  { id:'bandung',  name:'KA Lokal Bandung Raya',  sub:'Lokomotif CC 204 + gerbong ekonomi',   price:0,     st:[4,6,6,4],  units:['cc204','eko','eko','eko','eko'] },
  { id:'cc201',    name:'KA Matarmaja',           sub:'Lokomotif CC 201 + gerbong ekonomi',   price:1500,  st:[4,5,6,5],  units:['cc201','eko','eko','eko'] },
  { id:'jaladara', name:'Kereta Uap Jaladara',    sub:'Lokomotif uap + gerbong kayu',         price:2000,  st:[3,4,5,7],  units:['steam','kayu','kayu','kayu'] },
  { id:'cc203',    name:'KA Sri Tanjung',         sub:'Lokomotif CC 203 + gerbong ekonomi',   price:3000,  st:[5,6,6,6],  units:['cc203','eko','eko','eko','eko'] },
  { id:'lrt',      name:'LRT Jabodebek',          sub:'Inka-Bombardier',                      price:4500,  st:[4,8,8,6],  units:['lrth','lrt','lrt'] },
  { id:'argo',     name:'KA Argo Bromo Anggrek',  sub:'Lokomotif CC 206 + gerbong eksekutif', price:7000,  st:[6,7,8,8],  units:['cc206','exe','exe','exe','exe'] },
  { id:'whoosh',   name:'Kereta Cepat',           sub:'Kereta cepat Jakarta-Bandung',         price:15000, st:[10,9,8,10],units:['whooshh','whoosh','whoosh','whoosh'] }
];
const STATIONS = ['Jakarta Kota','Manggarai','Jatinegara','Bekasi','Cikarang'];
const PPM = 5;          // piksel per meter
const PLAT = 60;        // panjang peron (m)
const SPACING = 900;    // jarak antar stasiun (m)
const FIRST = 600;      // posisi stasiun pertama (m)

let save = { coins: 1000, owned: ['krl', 'bandung'], sel: 'krl' };
try { const s = JSON.parse(localStorage.getItem(SAVE_KEY)); if (s && s.owned) save = s; } catch (e) {}
const persist = () => { try { localStorage.setItem(SAVE_KEY, JSON.stringify(save)); } catch (e) {} };

/* ---------- SUARA SEDERHANA ---------- */
let actx = null;
function beep(f = 600, d = 0.12, type = 'square', vol = 0.05) {
  try {
    actx = actx || new (window.AudioContext || window.webkitAudioContext)();
    const o = actx.createOscillator(), g = actx.createGain();
    o.type = type; o.frequency.value = f; g.gain.value = vol;
    o.connect(g); g.connect(actx.destination);
    o.start(); g.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + d);
    o.stop(actx.currentTime + d);
  } catch (e) {}
}

/* ---------- GAMBAR KERETA ---------- */
function rr(c, x, y, w, h, r) {
  c.beginPath();
  if (c.roundRect) c.roundRect(x, y, w, h, r); else c.rect(x, y, w, h);
  c.fill();
}
function bogie(c, bx, n, wr = 5) {
  c.fillStyle = '#23272b'; c.fillRect(bx - 8, -12, 16 * n + 4, 5);
  for (let i = 0; i < n; i++) {
    c.fillStyle = '#111'; c.beginPath(); c.arc(bx + i * 16, -6, wr, 0, 7); c.fill();
    c.fillStyle = '#777'; c.beginPath(); c.arc(bx + i * 16, -6, 1.8, 0, 7); c.fill();
  }
}

/* Palet lokomotif CC (sesuai gambar referensi) */
const CC = {
  cc201: { body:'#e6e6e6', s1:'#2e7d32', s2:'#f08a24', nose:'#b71c1c', roof:'#7d868d' },
  cc203: { body:'#f2f2f2', s1:'#f08a24', s2:'#7b8691', nose:'#c62828', roof:'#8b949b' },
  cc204: { body:'#f2f2f2', s1:'#1e5aa8', s2:'#8cbde8', nose:'#c62828', roof:'#8b949b' },
  cc206: { body:'#f6f6f6', s1:'#f08a24', s2:'#1f5fa8', nose:'#c62828', roof:'#9aa3ab' }
};
function drawLoco(c, p) {
  c.fillStyle = '#2b2f33'; c.fillRect(6, -13, 110, 5);              // rangka bawah
  c.fillStyle = p.body; rr(c, 0, -44, 74, 32, 3);                   // kap mesin
  rr(c, 70, -55, 36, 43, 4);                                        // kabin
  c.fillStyle = p.roof; c.fillRect(6, -48, 58, 5);                  // grill atap
  c.fillStyle = '#3a4046';
  for (let i = 0; i < 6; i++) c.fillRect(10 + i * 9, -40, 4, 10);   // kisi-kisi
  c.fillStyle = p.s1; c.fillRect(0, -26, 106, 6);                   // strip utama
  c.fillStyle = p.s2; c.fillRect(0, -19, 106, 2);                   // strip tipis
  c.fillStyle = p.nose;                                             // hidung merah
  c.beginPath(); c.moveTo(104, -12); c.lineTo(104, -52); c.lineTo(119, -34); c.lineTo(122, -12); c.closePath(); c.fill();
  c.fillStyle = '#26384f'; rr(c, 76, -50, 25, 19, 2);               // kaca kabin
  c.fillStyle = 'rgba(255,255,255,.35)'; c.fillRect(79, -48, 6, 15);
  c.fillStyle = '#ffe36e'; c.beginPath(); c.arc(116, -24, 3, 0, 7); c.fill(); // lampu
  c.fillStyle = '#fff'; c.font = 'bold 7px sans-serif'; c.fillText('KAI', 30, -31);
  bogie(c, 12, 3); bogie(c, 74, 3);
}
function drawCar(c, p, len = 100, head = false) {
  c.fillStyle = '#23272b'; c.fillRect(4, -13, len - 8, 4);
  c.fillStyle = p.body; rr(c, 0, -48, len, 36, 4);
  c.fillStyle = p.roof || '#8b949b'; c.fillRect(2, -50, len - 4, 4);
  c.fillStyle = p.win;
  for (let x = 8; x < len - 14; x += 15) c.fillRect(x, -41, 10, 11);
  c.fillStyle = p.s1; c.fillRect(0, -26, len, 5);
  c.fillStyle = p.s2; c.fillRect(0, -20, len, 2);
  if (head) {
    c.fillStyle = '#1d2a3a'; c.fillRect(len - 13, -43, 10, 17);
    c.fillStyle = '#ffe36e'; c.beginPath(); c.arc(len - 5, -17, 2.5, 0, 7); c.fill();
  }
  bogie(c, 10, 2); bogie(c, len - 28, 2);
}
function drawSteam(c) {
  c.fillStyle = '#1c1e21'; rr(c, 34, -44, 74, 28, 12);              // boiler
  c.fillRect(88, -62, 9, 20); c.fillRect(85, -66, 15, 5);           // cerobong
  rr(c, 60, -54, 12, 11, 4);                                        // kubah
  c.fillStyle = '#7a1f1f'; c.fillRect(0, -58, 36, 46);              // kabin
  c.fillRect(-3, -62, 42, 5);
  c.fillStyle = '#f5dd8a'; c.fillRect(8, -48, 18, 14);
  c.fillStyle = '#c9a227'; c.fillRect(34, -28, 74, 3);              // strip emas
  c.fillStyle = '#23272b'; c.fillRect(0, -14, 110, 5);
  c.fillStyle = '#ffe36e'; c.beginPath(); c.arc(106, -30, 3, 0, 7); c.fill();
  [48, 70, 92].forEach(x => {
    c.fillStyle = '#7a1f1f'; c.beginPath(); c.arc(x, -10, 10, 0, 7); c.fill();
    c.fillStyle = '#111'; c.beginPath(); c.arc(x, -10, 3, 0, 7); c.fill();
  });
  c.fillStyle = '#888'; c.fillRect(48, -12, 44, 3);
}
function drawNoseFast(c) {
  c.fillStyle = '#f6f8fb';
  c.beginPath(); c.moveTo(100, -48); c.lineTo(132, -22); c.lineTo(132, -12); c.lineTo(100, -12); c.closePath(); c.fill();
  c.fillStyle = '#c62828'; c.beginPath(); c.moveTo(112, -30); c.lineTo(132, -22); c.lineTo(132, -12); c.lineTo(112, -12); c.closePath(); c.fill();
  c.fillStyle = '#1d2a3a'; c.beginPath(); c.moveTo(102, -44); c.lineTo(118, -30); c.lineTo(102, -30); c.closePath(); c.fill();
}
const CARP = {
  eko: { body:'#e8eaee', s1:'#1e5aa8', s2:'#f08a24', win:'#3b5675' },
  exe: { body:'#f4f4f4', s1:'#c62828', s2:'#8a8f94', win:'#27384d' },
  kayu:{ body:'#2e7d4f', s1:'#c9a227', s2:'#1b4d30', win:'#f5dd8a', roof:'#1b4d30' },
  krl: { body:'#cfd5da', s1:'#d32f2f', s2:'#f5a623', win:'#35506b' },
  lrt: { body:'#f5f7fa', s1:'#1e88e5', s2:'#0d47a1', win:'#25405c' },
  fast:{ body:'#f6f8fb', s1:'#c62828', s2:'#9aa6b2', win:'#25405c' }
};
const UNIT = {
  cc201: { len:122, draw: c => drawLoco(c, CC.cc201) },
  cc203: { len:122, draw: c => drawLoco(c, CC.cc203) },
  cc204: { len:122, draw: c => drawLoco(c, CC.cc204) },
  cc206: { len:122, draw: c => drawLoco(c, CC.cc206) },
  steam: { len:112, draw: drawSteam },
  eko:   { len:100, draw: c => drawCar(c, CARP.eko) },
  exe:   { len:100, draw: c => drawCar(c, CARP.exe) },
  kayu:  { len:96,  draw: c => drawCar(c, CARP.kayu, 96) },
  krl:   { len:100, draw: c => drawCar(c, CARP.krl) },
  krlh:  { len:100, draw: c => drawCar(c, CARP.krl, 100, true) },
  lrt:   { len:90,  draw: c => drawCar(c, CARP.lrt, 90) },
  lrth:  { len:90,  draw: c => drawCar(c, CARP.lrt, 90, true) },
  whoosh:{ len:100, draw: c => drawCar(c, CARP.fast) },
  whooshh:{len:132, draw: c => { drawCar(c, CARP.fast); drawNoseFast(c); } }
};
function trainLength(t) { return t.units.reduce((a, u) => a + UNIT[u].len + 4, -4); }
function drawTrain(c, t, frontX, gy, s) {
  let x = frontX;
  for (const u of t.units) {
    const U = UNIT[u]; x -= U.len * s;
    c.save(); c.translate(x, gy); c.scale(s, s); U.draw(c); c.restore();
    x -= 4 * s;
  }
}

/* ---------- STYLE (disuntik lewat JS) ---------- */
const css = document.createElement('style');
css.textContent = `
#kr-root{position:fixed;inset:0;z-index:9999;font-family:'Trebuchet MS',Verdana,sans-serif;color:#fff;overflow:hidden;
 background:linear-gradient(#3f9be0 0%,#9fd8f5 45%,#5f8f5a 46%,#2d3b2d 62%,#2a2c30 63%,#1b1c1f 100%)}
#kr-root *{box-sizing:border-box;-webkit-tap-highlight-color:transparent;user-select:none}
.kr-top{position:absolute;left:0;right:0;top:0;padding:10px 14px;display:flex;gap:10px;align-items:center;justify-content:space-between;
 background:rgba(10,20,35,.55);backdrop-filter:blur(4px);z-index:3}
.kr-title{font-size:20px;font-weight:bold}
.kr-coin{font-weight:bold;color:#ffd54a}
.kr-scroll{position:absolute;inset:56px 0 0 0;overflow:auto;padding:14px}
.kr-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:14px;max-width:1040px;margin:0 auto}
.kr-card{background:rgba(255,255,255,.16);border:2px solid rgba(255,255,255,.35);border-radius:18px;padding:10px 12px 14px;text-align:center;backdrop-filter:blur(3px)}
.kr-card.sel{border-color:#ffd54a;box-shadow:0 0 14px rgba(255,213,74,.6)}
.kr-card canvas{width:100%;height:auto;border-radius:10px;background:linear-gradient(#5ec0f5,#bfe9ff);display:block;margin-bottom:6px}
.kr-card h3{margin:2px 0;font-size:16px}.kr-card p{margin:0 0 6px;font-size:12px;color:#d7e8ff}
.kr-row{display:flex;align-items:center;gap:8px;font-size:12px;margin:3px 0}.kr-row span{width:74px;text-align:left}
.kr-bar{flex:1;height:7px;background:rgba(255,255,255,.25);border-radius:6px;overflow:hidden}
.kr-bar i{display:block;height:100%;background:linear-gradient(90deg,#ffd54a,#ff5252)}
.kr-btn{border:0;border-radius:22px;padding:9px 22px;font-weight:bold;font-size:15px;cursor:pointer;color:#fff;background:#1e6fd6;box-shadow:0 4px 0 #0e4590;margin-top:8px}
.kr-btn.buy{background:#ffb81f;color:#4a3000;box-shadow:0 4px 0 #b57a00}
.kr-btn.go{background:#2eb85c;box-shadow:0 4px 0 #1b7a3a;font-size:17px;padding:10px 26px;margin:0}
.kr-btn:disabled{opacity:.55}.kr-btn:active{transform:translateY(3px);box-shadow:none}
#kr-cv{position:absolute;inset:0;width:100%;height:100%}
.kr-hud{position:absolute;left:0;right:0;top:0;padding:8px 12px;display:flex;justify-content:space-between;align-items:center;gap:8px;
 background:rgba(10,20,35,.5);font-weight:bold;z-index:3;font-size:15px}
.kr-ctrl{position:absolute;left:0;right:0;bottom:0;display:flex;justify-content:space-between;padding:14px 18px;z-index:3}
.kr-big{width:130px;height:84px;border-radius:20px;border:0;font-size:22px;font-weight:bold;color:#fff;touch-action:none}
.kr-big.gas{background:#2eb85c;box-shadow:0 5px 0 #1b7a3a}.kr-big.brk{background:#d33;box-shadow:0 5px 0 #8c1c1c}
.kr-big.on{transform:translateY(4px);box-shadow:none;filter:brightness(1.2)}
.kr-toast{position:absolute;left:50%;top:22%;transform:translateX(-50%);background:rgba(0,0,0,.7);padding:12px 24px;border-radius:16px;
 font-size:22px;font-weight:bold;z-index:4;text-align:center;pointer-events:none;transition:opacity .3s}
.kr-modal{position:absolute;inset:0;background:rgba(0,0,0,.65);display:flex;align-items:center;justify-content:center;z-index:5}
.kr-box{background:#17304f;border:2px solid #5fa8ff;border-radius:20px;padding:24px 30px;text-align:center;min-width:260px}
.kr-box h2{margin:0 0 10px}.kr-box p{margin:6px 0}
`;
document.head.appendChild(css);

/* ---------- ROOT ---------- */
document.getElementById('kr-root')?.remove();
const root = document.createElement('div'); root.id = 'kr-root'; document.body.appendChild(root);

/* ---------- MENU ---------- */
let raf = 0;
function showMenu() {
  cancelAnimationFrame(raf); raf = 0;
  root.innerHTML = `
   <div class="kr-top"><div class="kr-title">🚆 Pilih Kereta</div>
     <div class="kr-coin">🪙 ${save.coins}</div>
     <button class="kr-btn go" id="kr-start">▶ MULAI</button></div>
   <div class="kr-scroll"><div class="kr-grid" id="kr-grid"></div></div>`;
  const grid = root.querySelector('#kr-grid');
  const labels = ['Kecepatan', 'Akselerasi', 'Rem', 'Pendapatan'];
  TRAINS.forEach(t => {
    const owned = save.owned.includes(t.id);
    const card = document.createElement('div');
    card.className = 'kr-card' + (save.sel === t.id ? ' sel' : '');
    card.innerHTML = `<canvas width="270" height="80"></canvas><h3>${t.name}</h3><p>${t.sub}</p>` +
      t.st.map((v, i) => `<div class="kr-row"><span>${labels[i]}</span><div class="kr-bar"><i style="width:${v * 10}%"></i></div></div>`).join('') +
      `<button class="kr-btn ${owned ? '' : 'buy'}">${owned ? (save.sel === t.id ? 'DIPILIH' : 'PILIH') : 'BELI 🪙' + t.price}</button>`;
    const cv = card.querySelector('canvas'), c = cv.getContext('2d');
    const s = Math.min(0.62, 250 / trainLength(t));
    c.fillStyle = '#8a7a66'; c.fillRect(0, 70, 270, 10);
    drawTrain(c, t, 135 + trainLength(t) * s / 2, 69, s);
    card.querySelector('button').onclick = () => {
      if (!owned) {
        if (save.coins < t.price) { beep(200, .25, 'sawtooth'); return alert('Koin tidak cukup!'); }
        save.coins -= t.price; save.owned.push(t.id); beep(900, .15);
      }
      save.sel = t.id; persist(); showMenu();
    };
    grid.appendChild(card);
  });
  root.querySelector('#kr-start').onclick = startGame;
}

/* ---------- GAME ---------- */
function startGame() {
  const T = TRAINS.find(t => t.id === save.sel) || TRAINS[0];
  const [sSpd, sAcc, sBrk, sInc] = T.st;
  const vmax = 60 + sSpd * 8, accel = 5 + sAcc * 2, brake = 8 + sBrk * 2.5;
  const incMul = 0.6 + sInc * 0.1;
  const trainLen = trainLength(T);

  root.innerHTML = `
   <canvas id="kr-cv"></canvas>
   <div class="kr-hud"><span id="h-coin">🪙 0</span><span id="h-next"></span><span id="h-spd">0 km/j</span>
     <button class="kr-btn" id="h-menu" style="margin:0;padding:6px 14px">☰</button></div>
   <div class="kr-toast" id="kr-toast" style="opacity:0"></div>
   <div class="kr-ctrl"><button class="kr-big brk" id="b-brk">REM</button><button class="kr-big gas" id="b-gas">GAS</button></div>`;
  const cv = root.querySelector('#kr-cv'), c = cv.getContext('2d');
  let W = 0, H = 0;
  const resize = () => {
    const d = window.devicePixelRatio || 1; W = innerWidth; H = innerHeight;
    cv.width = W * d; cv.height = H * d; c.setTransform(d, 0, 0, d, 0, 0);
  };
  resize(); window.onresize = resize;

  const st = { pos: 0, v: 0, idx: 0, mode: 'run', dwell: 0, earned: 0, ok: 0, gas: false, brk: false, warned: false, last: performance.now() };
  const el = { coin: root.querySelector('#h-coin'), next: root.querySelector('#h-next'), spd: root.querySelector('#h-spd'), toast: root.querySelector('#kr-toast') };
  let toastT = 0;
  const toast = (m, ms = 1800) => { el.toast.innerHTML = m; el.toast.style.opacity = 1; toastT = ms / 1000; };

  const hold = (id, key) => {
    const b = root.querySelector(id);
    const on = e => { e.preventDefault(); st[key] = true; b.classList.add('on'); };
    const off = e => { e.preventDefault(); st[key] = false; b.classList.remove('on'); };
    b.addEventListener('pointerdown', on); b.addEventListener('pointerup', off);
    b.addEventListener('pointerleave', off); b.addEventListener('pointercancel', off);
  };
  hold('#b-gas', 'gas'); hold('#b-brk', 'brk');
  root.querySelector('#h-menu').onclick = () => { cleanup(); showMenu(); };

  const kd = e => { if (['Space', 'ArrowRight', 'KeyD'].includes(e.code)) { st.gas = true; e.preventDefault(); }
                    if (['ArrowDown', 'ArrowLeft', 'KeyS'].includes(e.code)) { st.brk = true; e.preventDefault(); } };
  const ku = e => { if (['Space', 'ArrowRight', 'KeyD'].includes(e.code)) st.gas = false;
                    if (['ArrowDown', 'ArrowLeft', 'KeyS'].includes(e.code)) st.brk = false; };
  addEventListener('keydown', kd); addEventListener('keyup', ku);
  function cleanup() { cancelAnimationFrame(raf); raf = 0; removeEventListener('keydown', kd); removeEventListener('keyup', ku); window.onresize = null; }

  const stationX = i => FIRST + i * SPACING;
  const stopMark = i => stationX(i) + PLAT - 12;

  function finish() {
    cleanup(); persist();
    const m = document.createElement('div'); m.className = 'kr-modal';
    m.innerHTML = `<div class="kr-box"><h2>🏁 Perjalanan Selesai</h2><p>Berhenti tepat: ${st.ok}/${STATIONS.length} stasiun</p>
      <p style="color:#ffd54a;font-size:20px">Pendapatan: 🪙 ${st.earned}</p><p>Total koin: 🪙 ${save.coins}</p>
      <button class="kr-btn go" id="m-again">Main Lagi</button> <button class="kr-btn" id="m-menu">Menu</button></div>`;
    root.appendChild(m);
    m.querySelector('#m-again').onclick = startGame; m.querySelector('#m-menu').onclick = showMenu;
  }
  function nextStation() { st.idx++; st.warned = false; if (st.idx >= STATIONS.length) finish(); }

  function update(dt) {
    const front = st.pos;
    if (st.mode === 'dwell') {
      st.v = 0; st.dwell -= dt;
      if (st.dwell <= 0) { st.mode = 'run'; nextStation(); }
    } else {
      if (st.brk) st.v -= brake * dt;
      else if (st.gas) st.v += accel * dt;
      else st.v -= 3 * dt;
      st.v = Math.max(0, Math.min(vmax, st.v));
      st.pos += st.v / 3.6 * dt;
      const i = st.idx, sx = stationX(i);
      // batas kecepatan 50 km/j mendekati peron
      if (!st.warned && front > sx - 200 && front < sx && st.v > 55) {
        st.warned = true; const fine = Math.min(50, save.coins); save.coins -= fine; beep(180, .3, 'sawtooth');
        toast('⚠ Terlalu cepat! -🪙' + fine);
      }
      // berhenti di zona peron
      if (st.v < 0.4 && st.pos >= sx + PLAT - 25 && st.pos <= sx + PLAT) {
        const d = Math.abs(st.pos - stopMark(i));
        const bonus = Math.max(0, Math.round((1 - d / 13) * 100));
        const gain = Math.round((100 + bonus) * incMul);
        save.coins += gain; st.earned += gain; st.ok++; persist();
        st.mode = 'dwell'; st.dwell = 2.2; st.v = 0; beep(880, .18, 'triangle');
        toast((bonus > 85 ? '⭐ Sempurna!' : '✔ Berhenti!') + '<br>+🪙' + gain, 2000);
      } else if (st.pos > sx + PLAT + 3) {
        toast('✖ Kelewatan! Tidak ada pendapatan', 1800); beep(150, .35, 'sawtooth'); nextStation();
      }
    }
    if (toastT > 0) { toastT -= dt; if (toastT <= 0) el.toast.style.opacity = 0; }
    el.coin.textContent = '🪙 ' + save.coins;
    el.spd.textContent = Math.round(st.v) + ' km/j';
    if (st.idx < STATIONS.length) {
      const dist = Math.max(0, Math.round(stationX(st.idx) + PLAT - st.pos));
      el.next.textContent = '→ ' + STATIONS[st.idx] + ' (' + dist + ' m) • ' + (st.idx + 1) + '/' + STATIONS.length;
    }
  }

  /* --- render --- */
  function render() {
    const gy = H * 0.7, S = Math.max(0.55, Math.min(1.1, H / 620));
    const frontX = W * 0.72, camX = st.pos * PPM - frontX;
    const g = c.createLinearGradient(0, 0, 0, gy); g.addColorStop(0, '#3f9be0'); g.addColorStop(1, '#bfe9ff');
    c.fillStyle = g; c.fillRect(0, 0, W, H);
    // gunung (parallax)
    [[0.1, '#7b9bb5', 0.38, 220], [0.25, '#5f8a62', 0.24, 160]].forEach(([k, col, h, wv]) => {
      c.fillStyle = col; c.beginPath(); c.moveTo(0, gy);
      for (let x = 0; x <= W; x += 10) {
        const wx = x + camX * k;
        c.lineTo(x, gy - H * h * 0.5 - Math.sin(wx / wv) * 40 - Math.sin(wx / (wv * 0.37)) * 14);
      }
      c.lineTo(W, gy); c.fill();
    });
    // tanah
    c.fillStyle = '#3c5a35'; c.fillRect(0, gy - 4, W, 10);
    c.fillStyle = '#6b6258'; c.fillRect(0, gy, W, 12);                 // balas rel
    c.fillStyle = '#2a2c30'; c.fillRect(0, gy + 12, W, H - gy);
    // bantalan rel
    c.fillStyle = '#4a3a2a';
    for (let x = -((camX % 26) + 26) % 26; x < W; x += 26) c.fillRect(x, gy + 1, 14, 6);
    c.fillStyle = '#c9ced3'; c.fillRect(0, gy - 1, W, 3);
    // pohon kelapa
    for (let i = Math.floor(camX / 380) - 1; i < Math.floor((camX + W) / 380) + 2; i++) {
      const x = i * 380 + (i * 97 % 120) - camX; const h = 70 + (i * 53 % 40);
      c.strokeStyle = '#6b4a2a'; c.lineWidth = 4; c.beginPath(); c.moveTo(x, gy - 6); c.quadraticCurveTo(x + 6, gy - h / 2, x + 2, gy - h); c.stroke();
      c.fillStyle = '#2e7d32';
      for (let k = 0; k < 5; k++) { c.beginPath(); c.ellipse(x + 2 + (k - 2) * 12, gy - h + Math.abs(k - 2) * 4, 16, 4, (k - 2) * 0.4, 0, 7); c.fill(); }
    }
    // stasiun
    STATIONS.forEach((name, i) => {
      const x0 = stationX(i) * PPM - camX, w = PLAT * PPM;
      if (x0 > W + 50 || x0 + w < -50) return;
      c.fillStyle = '#8d9aa5'; for (let p = 0; p < 6; p++) c.fillRect(x0 + 10 + p * (w - 24) / 5, gy - 96, 5, 90);
      c.fillStyle = '#c0392b'; c.fillRect(x0 - 6, gy - 104, w + 12, 10);
      c.fillStyle = '#fff'; c.fillRect(x0 + w / 2 - 70, gy - 140, 140, 28);
      c.fillStyle = '#17304f'; c.font = 'bold 15px sans-serif'; c.textAlign = 'center'; c.fillText(name, x0 + w / 2, gy - 121);
      // tanda batas kecepatan
      const lx = (stationX(i) - 200) * PPM - camX;
      c.fillStyle = '#fff'; c.beginPath(); c.arc(lx, gy - 48, 15, 0, 7); c.fill();
      c.strokeStyle = '#d32f2f'; c.lineWidth = 4; c.stroke();
      c.fillStyle = '#000'; c.font = 'bold 13px sans-serif'; c.fillText('50', lx, gy - 43);
      c.fillStyle = '#555'; c.fillRect(lx - 1, gy - 33, 3, 30);
    });
    // kereta
    drawTrain(c, T, frontX, gy, S);
    // peron depan + zona berhenti
    STATIONS.forEach((n, i) => {
      const x0 = stationX(i) * PPM - camX, w = PLAT * PPM;
      if (x0 > W + 50 || x0 + w < -50) return;
      c.fillStyle = '#b9bec4'; c.fillRect(x0, gy + 14, w, 20);
      c.fillStyle = '#f2c230'; c.fillRect(x0, gy + 14, w, 4);
      const zx = (stationX(i) + PLAT - 25) * PPM - camX;
      c.fillStyle = 'rgba(46,184,92,.85)'; c.fillRect(zx, gy + 20, 25 * PPM, 12);
      c.fillStyle = '#fff'; c.fillRect(stopMark(i) * PPM - camX - 2, gy + 18, 4, 16);
      c.font = 'bold 11px sans-serif'; c.textAlign = 'center'; c.fillText('BERHENTI DI SINI', zx + 12.5 * PPM, gy + 30);
    });
    c.textAlign = 'left';
  }

  function loop(now) {
    const dt = Math.min(0.05, (now - st.last) / 1000); st.last = now;
    update(dt); render();
    if (raf) raf = requestAnimationFrame(loop);
  }
  raf = requestAnimationFrame(loop);
  toast('Tahan GAS untuk jalan, REM untuk berhenti<br>di zona hijau peron', 3500);
}

showMenu();
})();
