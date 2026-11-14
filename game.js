const $=id=>document.getElementById(id),cv=$('c'),XM=cv.getContext('2d',{alpha:false});let x=XM,OFFC=null,OFX=null,LIMX=null,QCAP=2,slowN=0;
const HXF=.8,SP=440,LANEY=24,WLEN=90,hs=n=>{const v=Math.sin(n*127.1+311.7)*43758.5453;return v-Math.floor(v)};
const NM=['Jakarta Kota','Manggarai','Gambir','Jatinegara','Bekasi','Cikarang','Karawang','Cikampek','Purwakarta','Padalarang','Bandung','Cirebon','Semarang Tawang','Yogyakarta','Solo Balapan','Madiun','Surabaya Gubeng'];
const TR=[
{n:'KA Lokal Bandung Raya',s:'Lokomotif CC 201 (GE U18C) krem-hijau + gerbong ekonomi',p:0,v:170,a:2.2,b:3,m:1,k:'loco',lv:{lg:'hc',pat:'cg',u:'#efe3c4',bd:'#1f4d2a',st:'#2e6b3a',st2:'#d4af37',r:'#c62828',no:'CC 201 45',img:'cc201',cl:{sty:'cream',body:'#f1e8cf',gr:'#3b5b47',pl:1},ty:-20},c1:'#2e6b3a',cb:'#efe3c4',c2:'#d4af37',c3:'#1f4d2a',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Bima',s:'Lokomotif CC 203 + gerbong eksekutif',p:1500,v:180,a:2.3,b:3.1,m:1.4,k:'loco',lv:{lg:'oh',pat:'ow',u:'#ee6a33',bd:'#9aa7ae',st:'#f57c00',st2:'#1b4f9c',r:'#c62828',no:'CC 203 95 06',img:'cc203',ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#f57c00',c3:'#1b4f9c',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'Kereta Uap Jaladara',s:'Lokomotif uap + gerbong kayu',p:2500,v:120,a:1.6,b:2.5,m:2,k:'steam',c1:'#212121',cb:'#2e7d32',c2:'#fdd835',cars:['uap','tdr','kay','kay','kay','kay','kay','kay','kay','kay']},
{n:'KA Taksaka',s:'Lokomotif CC 204 + gerbong eksekutif',p:4000,v:190,a:2.4,b:3.3,m:1.8,k:'loco',lv:{lg:'bi',pat:'bw',u:'#f3f6f8',bd:'#1b4f9c',st:'#1b4f9c',st2:'#0d2f66',r:'#c62828',no:'CC 204 13 12',ty:-25},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#1b4f9c',c3:'#0d2f66',cars:['cc','eks','eks','eks','eks','res','eks','eks','eks','bag']},
{n:'LRT Jabodebek',s:'Inka-Bombardier',p:6000,v:160,a:2.7,b:3.4,m:1.7,k:'mrt',nz:3,c1:'#fafafa',c2:'#29b6f6',c3:'#ff7043',cars:['ec','em','em','em','em','em','em','em','em','ec']},
{n:'KA Argo Bromo Anggrek',s:'Lokomotif CC 206 + gerbong eksekutif',p:8000,v:220,a:2.6,b:3.5,m:2.2,k:'loco',lv:{lg:'po',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#e64a19',st2:'#9e9e9e',r:'#c62828',no:'CC 206 13 21',img:'cc206',ty:-24},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#e64a19',c3:'#9e9e9e',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'Kereta Cepat Whoosh',s:'KCIC400AF',p:12000,v:400,a:3.6,b:4.6,m:3,k:'bullet',c1:'#fafafa',c2:'#d32f2f',c3:'#ffc107',cars:['bh','bm','bm','bm','bm','bm','bm','bm','bm','bh']},
{n:'KA Barang Peti Kemas',s:'Lokomotif CC 206 + gerbong barang',p:3500,v:130,a:1.8,b:2.4,m:2.6,k:'loco',lv:{lg:'pb',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#e64a19',st2:'#9e9e9e',r:'#c62828',no:'CC 206 13 77',img:'cc206',cl:{red:'#1c2f6b',navy:'#7aa6d8',roof:'#4a5560'},ty:-24},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#e64a19',c3:'#9e9e9e',cars:['cc','ctn','ctn','ctn','tgk','tgk','tgk','bk','bk','brg']},
{n:'KA Merah Perkasa',s:'Lokomotif CC 300 + gerbong ekonomi',p:5500,v:185,a:2.4,b:3.2,m:1.6,k:'loco',lv:{lg:'mr',nl:1,pat:'bw',u:'#e53935',bd:'#b71c1c',st:'#e53935',st2:'#b71c1c',r:'#e53935',no:'CC 300 12 05',ty:-22},c1:'#e53935',cb:'#efe3c4',c2:'#b71c1c',c3:'#7f1414',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Hijau Khatulistiwa',s:'Lokomotif CC 206 hijau + gerbong eksekutif',p:7000,v:200,a:2.5,b:3.4,m:2,k:'loco',lv:{lg:'hk',pat:'rw',u:'#2f6a35',bd:'#1f3d24',st:'#2f6a35',st2:'#f2c315',r:'#2f6a35',no:'CC 206 09 03',img:'cc206',cl:{red:'#2f6a35',navy:'#f2c315',roof:'#1f3d24',body:'#eef2ea'},ty:-24},c1:'#2f6a35',cb:'#efe3c4',c2:'#f2c315',c3:'#1f3d24',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KA Vintage Oranye-Biru',s:'Lokomotif CC 201 oranye-biru + gerbong ekonomi',p:4500,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#f06a1e',st2:'#0c3b8c',r:'#c62828',no:'CC 201 45',img:'cc201',cl:{sty:'ob',body:'#f3f4f4',lgo:'twoS',lc:'#fff'},ty:-20},c1:'#0c3b8c',cb:'#f3f4f4',c2:'#f06a1e',c3:'#0c3b8c',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Vintage Putih-Biru',s:'Lokomotif CC 201 putih-biru + gerbong ekonomi',p:5000,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#7ca3d6',st2:'#0d1b4d',r:'#c62828',no:'CC 201 94',img:'cc201',cl:{sty:'wb',body:'#f7f8f8',lgo:'two'},ty:-20},c1:'#1b4f9c',cb:'#f1f3f5',c2:'#7ca3d6',c3:'#0d1b4d',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Vintage Putih-Oranye',s:'Lokomotif CC 201 putih-oranye KAI + gerbong ekonomi',p:5000,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#f27e14',st2:'#102a66',r:'#c62828',no:'CC 201 83 07',img:'cc201',cl:{sty:'wo',body:'#f7f8f8',lgo:'kai',lc:'#1c3f8a'},ty:-20},c1:'#e8720c',cb:'#f1f3f5',c2:'#f27e14',c3:'#102a66',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
 /* kereta berlokomotif CC 203 */
{n:'KA Gajayana',s:'Lokomotif CC 203 putih-merah + gerbong eksekutif',p:3000,v:185,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#c01212',st2:'#1b1a78',r:'#c01212',no:'CC 203 98 22',img:'cc203',cl:{},ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#c01212',c3:'#1b1a78',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KA Argo Lawu',s:'Lokomotif CC 203 biru + gerbong eksekutif',p:5200,v:195,a:2.4,b:3.3,m:1.8,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#1c4fa0',st2:'#0d2f66',r:'#1c4fa0',no:'CC 203 97 11',img:'cc203',cl:{red:'#1c4fa0',blue:'#0d2f66'},ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#1c4fa0',c3:'#0d2f66',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KA Sancaka',s:'Lokomotif CC 203 kuning + gerbong bisnis',p:3800,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#2e7d32',st2:'#1b5e20',r:'#f2b600',no:'CC 203 99 03',img:'cc203',cl:{red:'#f2b600',blue:'#1b1a78'},ty:-20},c1:'#eef3f1',cb:'#eef3f1',c2:'#2e7d32',c3:'#1b5e20',cars:['cc','bis','bis','bis','bis','bis','bis','bis','bis','bag']},
{n:'KA Lokal Cikuray',s:'Lokomotif CC 203 + gerbong ekonomi',p:1800,v:170,a:2.2,b:3,m:1.2,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#c01212',st2:'#1b1a78',r:'#c01212',no:'CC 203 96 17',img:'cc203',cl:{},ty:-20},c1:'#f3f6f8',cb:'#efe3c4',c2:'#c01212',c3:'#1b1a78',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Wisata Sultan',s:'Lokomotif CC 203 ungu + panoramic, tidur & restorasi',p:6500,v:190,a:2.5,b:3.3,m:2,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#6a1b9a',st2:'#fdd835',r:'#6a1b9a',no:'CC 203 94 08',img:'cc203',cl:{red:'#6a1b9a',blue:'#fdd835',roof:'#3a1a4a'},ty:-20},c1:'#f7f4ee',cb:'#f7f4ee',c2:'#6a1b9a',c3:'#fdd835',cars:['cc','pan','pan','res','tdu','tdu','tdu','res','pan','bag']},
{n:'KA Barang Semen',s:'Lokomotif CC 203 oranye + gerbong semen',p:2600,v:130,a:1.8,b:2.4,m:2.4,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#e65100',st2:'#263238',r:'#e65100',no:'CC 203 93 15',img:'cc203',cl:{red:'#e65100',blue:'#263238'},ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#e65100',c3:'#263238',cars:['cc','smn','smn','smn','smn','smn','smn','smn','smn','smn']},
{n:'KA Barang Kayu',s:'Lokomotif CC 203 hijau + gerbong kayu gelondongan',p:2600,v:130,a:1.8,b:2.4,m:2.4,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#2f6a35',st2:'#1f3d24',r:'#2f6a35',no:'CC 203 92 07',img:'cc203',cl:{red:'#2f6a35',blue:'#1f3d24',roof:'#1f3d24'},ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#2f6a35',c3:'#1f3d24',cars:['cc','kyu','kyu','kyu','kyu','kyu','kyu','kyu','kyu','kyu']},
{n:'KA Paket Kilat',s:'Lokomotif CC 203 + gerbong paket & pos',p:2900,v:150,a:2,b:2.8,m:2.2,k:'loco',lv:{lg:'oh',pat:'ow',u:'#f3f6f8',bd:'#9aa7ae',st:'#c62828',st2:'#263238',r:'#c62828',no:'CC 203 95 21',img:'cc203',cl:{red:'#c62828',blue:'#263238'},ty:-20},c1:'#f3f6f8',cb:'#f3f6f8',c2:'#c62828',c3:'#263238',cars:['cc','pkt','pkt','pkt','pkt','pkt','pkt','pkt','pkt','pkt']},
{n:'KA Argo Garis Biru',s:'Lokomotif CC 201 putih garis biru + gerbong ekonomi',p:4800,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#7ca3d6',st2:'#0d1b4d',r:'#c62828',no:'CC 201 90',img:'cc201',cl:{sty:'wb',body:'#f7f8f8',lgo:'twoS',lc:'#f07a1b'},ty:-20},c1:'#7ca3d6',cb:'#f1f3f5',c2:'#7ca3d6',c3:'#0d1b4d',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Oranye-Biru KAI',s:'Lokomotif CC 201 oranye-biru logo KAI + gerbong ekonomi',p:5200,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#0c3b8c',st2:'#f06a1e',r:'#c62828',no:'CC 201 04 02',img:'cc201',cl:{sty:'ob',body:'#f3f4f4',lgo:'kai',lc:'#fff'},ty:-20},c1:'#0c3b8c',cb:'#f1f3f5',c2:'#0c3b8c',c3:'#f06a1e',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Putih Diagonal',s:'Lokomotif CC 201 putih strip diagonal + gerbong ekonomi',p:5000,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#17306f',st2:'#f07a1b',r:'#c62828',no:'CC 201 96',img:'cc201',cl:{sty:'diag',body:'#f7f8f8',lgo:'twoD'},ty:-20},c1:'#17306f',cb:'#f1f3f5',c2:'#17306f',c3:'#f07a1b',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Putih-Oranye Swoosh',s:'Lokomotif CC 201 putih-oranye swoosh + gerbong ekonomi',p:5400,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#e8720c',st2:'#102a66',r:'#c62828',no:'CC 201 83 07',img:'cc201',cl:{sty:'wos',body:'#f7f8f8',lgo:'swoosh'},ty:-20},c1:'#e8720c',cb:'#f1f3f5',c2:'#e8720c',c3:'#102a66',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Lokal Krem-Hijau KAI',s:'Lokomotif CC 201 krem-hijau logo KAI + gerbong ekonomi',p:4200,v:180,a:2.3,b:3.1,m:1.5,k:'loco',lv:{lg:'oh',pat:'cg',u:'#f3f6f8',bd:'#9aa7ae',st:'#3b5b47',st2:'#d4af37',r:'#c62828',no:'CC 201 83 31',img:'cc201',cl:{sty:'cream',body:'#f1e8cf',gr:'#3b5b47',lgo:'kai',lc:'#2f5a3a',pl:1},ty:-20},c1:'#3b5b47',cb:'#f1f3f5',c2:'#3b5b47',c3:'#d4af37',cars:['cc','eko','eko','eko','eko','eko','eko','eko','eko','bag']},
{n:'KA Argo Parahyangan',s:'Lokomotif CC 206 biru-oranye + gerbong eksekutif',p:6200,v:210,a:2.5,b:3.4,m:2.1,k:'loco',lv:{lg:'po',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#1565c0',st2:'#f57c00',r:'#1565c0',no:'CC 206 13 45',img:'cc206',cl:{red:'#1565c0',navy:'#f57c00',roof:'#37474f',body:'#f4f7fa'},ty:-24},c1:'#f4f7fa',cb:'#f4f7fa',c2:'#1565c0',c3:'#f57c00',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KA Mutiara Selatan',s:'Lokomotif CC 206 hitam-oranye + gerbong eksekutif',p:5800,v:200,a:2.5,b:3.4,m:2.0,k:'loco',lv:{lg:'po',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#ef6c00',st2:'#1b1b1f',r:'#ef6c00',no:'CC 206 14 08',img:'cc206',cl:{red:'#ef6c00',navy:'#1b1b1f',roof:'#2b2f33',body:'#e9ebec'},ty:-24},c1:'#e9ebec',cb:'#e9ebec',c2:'#ef6c00',c3:'#1b1b1f',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KA Argo Dwipangga',s:'Lokomotif CC 206 merah-putih + gerbong eksekutif',p:7500,v:215,a:2.6,b:3.5,m:2.2,k:'loco',lv:{lg:'po',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#c62828',st2:'#7f1d1d',r:'#c62828',no:'CC 206 13 62',img:'cc206',cl:{red:'#c62828',navy:'#7f1d1d',roof:'#5a2a2a',body:'#fafafa'},ty:-24},c1:'#fafafa',cb:'#fafafa',c2:'#c62828',c3:'#7f1d1d',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KA Serayu Kuning',s:'Lokomotif CC 206 kuning-biru + gerbong eksekutif',p:4800,v:190,a:2.4,b:3.3,m:1.9,k:'loco',lv:{lg:'po',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#f2c315',st2:'#1c2b6e',r:'#f2c315',no:'CC 206 12 31',img:'cc206',cl:{red:'#f2c315',navy:'#1c2b6e',roof:'#4a4a2a',body:'#fbfaf0'},ty:-24},c1:'#fbfaf0',cb:'#fbfaf0',c2:'#f2c315',c3:'#1c2b6e',cars:['cc','eks','eks','eks','res','eks','eks','eks','eks','bag']},
{n:'KAI Logistik CC 206',s:'Lokomotif CC 206 biru logistik + gerbong barang',p:3200,v:140,a:1.8,b:2.4,m:2.5,k:'loco',lv:{lg:'po',pat:'rw',u:'#f3f6f8',bd:'#9aa7ae',st:'#1c4fa0',st2:'#e65100',r:'#1c4fa0',no:'CC 206 13 90',img:'cc206',cl:{red:'#1c4fa0',navy:'#e65100',roof:'#37474f',body:'#eef2f6'},ty:-24},c1:'#eef2f6',cb:'#eef2f6',c2:'#1c4fa0',c3:'#e65100',cars:['cc','ctn','ctn','ctn','tgk','tgk','tgk','bk','bk','brg']}
];
const SPD=2,lq=v=>Math.round(v*SPD/5)*5;TR.forEach(t=>{t.v=Math.min(650,Math.round(t.v*SPD));t.a*=SPD;t.b*=SPD});
let S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:3,wx:3,au2:1,pa:1};
try{Object.assign(S,JSON.parse(localStorage.getItem('kn1')||'{}'))}catch(e){}
if(S.pa==null)S.pa=1;if(!S.au2){S.au2=1;S.tod=3;S.wx=3}S.cons=S.cons||{};S.cw=S.cw||['eko',...Object.values(S.cons)];S.own=S.own.filter(i=>i<TR.length);if(!S.own.includes(0))S.own.push(0);if(!TR[S.sel]||!S.own.includes(S.sel))S.sel=0;
const sv=()=>{try{localStorage.setItem('kn1',JSON.stringify(S))}catch(e){}};

/* ===== SIKLUS OTOMATIS WAKTU & CUACA =====
   Siang 5 menit lalu malam 5 menit (20 detik senja di tiap pergantian).
   Cuaca (siklus 8 menit): cerah 2 mnt -> hujan 2 mnt -> cerah 2 mnt -> berkabut 2 mnt. */
const DAY_S=300,WX_S=120,DUSK_S=20;let ENVT=0,ATOD=0,AWX=0;
const TD=()=>S.tod==3?ATOD:S.tod,WXV=()=>S.wx==3?AWX:(S.wx||0);
function envClock(dt){ENVT+=dt;const c=ENVT%(DAY_S*2),n=c<DAY_S-DUSK_S?0:c<DAY_S?1:c<DAY_S*2-DUSK_S?2:1,w=Math.floor(ENVT/WX_S)%4,nw=w==1?1:w==3?2:0;
 if(n!==ATOD){const pr=ATOD;ATOD=n;if(S.tod==3&&G.m=='play')toast(n==2?'🌙 Malam tiba':n==1?(pr==0?'🌇 Senja':'🌅 Fajar'):'☀ Hari siang')}
 if(nw!==AWX){AWX=nw;if(S.wx==3&&G.m=='play')toast(nw==1?'🌧 Hujan turun (2 menit)':nw==2?'🌫 Kabut tebal (2 menit)':'🌤 Cuaca cerah')}}
const DF=[.6,1,1.6],DN=['MUDAH','NORMAL','SULIT'],TN=['☀ SIANG','🌇 SORE','🌙 MALAM','🔄 OTOMATIS'],WN=['CERAH','HUJAN','BERKABUT','🔄 OTOMATIS'];
let W,H,u,G={m:'menu',pos:0,v:10,r:{st:[],sg:[],cx:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0},tm=0,K={},th=0,bk=0,em=0,DPRv=1,ck="",REC=null,MIR=0,PPL=false,WPH=null,GK="",dtS=.016,SPR={};
function rs(){const d=Math.max(1,Math.min(Math.max(devicePixelRatio||1,1.5),QCAP,Math.sqrt(5e6/(innerWidth*innerHeight))));W=innerWidth;H=innerHeight;DPRv=d;cv.width=W*d;cv.height=H*d;x.setTransform(d,0,0,d,0,0);x.imageSmoothingEnabled=true;x.imageSmoothingQuality="low";u=Math.max(.5,Math.min(H/600,W/760));OFFC=null;LIMX=null}
addEventListener('resize',rs);rs();
function toast(m){const e=$('toast');e.textContent=m;e.classList.remove('sh');void e.offsetWidth;e.classList.add('sh')}
/* screens */
function show(id){document.querySelectorAll('.scr').forEach(e=>e.classList.toggle('on',e.id==id))}
function hud(on){$('hud').classList.toggle('on',on);$('ctl').classList.toggle('on',on)}
function toMenu(){hornOff();sayStop();S.hi=Math.max(S.hi,Math.floor(G.sc||0));sv();G={m:'menu',pos:0,v:10,r:{st:[],sg:[],cx:[]},pf:[],lp:0,lv:1,sc:0,sf:100,cg:0};hud(0);$('mi').textContent='🪙 '+S.coin+'  •  🏆 Skor Tertinggi '+S.hi;show('menu')}
/* level */
const STD=8000; /* jarak antar stasiun (meter) */
function more(r,n){const t=TR[S.sel],sc=Math.max(1,t.v/200),L=[90,120,160,200,250,300,350].map(lq);
 for(let k=0;k<n;k++){const i=r.st.length,p=r.st[i-1],mx=Math.min(1+Math.floor(i/3),6),pk=()=>L[Math.floor(Math.random()*(mx+1))],b=p.x+STD,a=p.x+SP+40;
  r.st.push({x:b,nm:NM[i%NM.length],done:0,sty:Math.random()*5|0,pal:Math.random()*5|0,ln:Math.random()<.5?1:0,wx:b-450,ex:b+SP+350});
  /* rambu batas kecepatan: diurutkan menurut posisi (limAt memakai yang terakhir di array) */
  const sg=[{x:a,l:pk()},{x:a+(b-a)*.35,l:pk()},{x:b-1000*sc,l:lq(120)},{x:b-550,l:lq(100)},{x:b-300,l:lq(90)}];
  for(const fr of[.15,.5,.65,.8]){const xx=a+(b-a)*fr;if(xx<b-1000*sc-250)sg.push({x:xx,l:pk()})}
  sg.sort((q1,q2)=>q1.x-q2.x);r.sg.push(...sg);
  /* perlintasan kereta api: sampai 3 per segmen */
  for(const fr of[.2,.45,.7]){const x1=a+(b-a)*fr+(Math.random()-.5)*500;if(x1>a+500&&x1<b-1000*sc-300&&Math.random()<.8)r.cx.push({x:x1,ck:Math.random()<.55,a:0,veh:[],sp:0,hn:0,hh:0,w:0,pass:0})}
  strucs(r,a,b)}}
function gen(){const r={st:[{x:0,nm:NM[0],done:1,sty:0,pal:0,ln:0,wx:-1e9,ex:-1e9}],sg:[],cx:[]};more(r,3);return r}
function newLevel(){G.r=gen();G.pos=SP;G.v=0;G.ni=1;G.dw=0;G.ts=0;th=bk=em=0;G.dg=0;G.es=0;G.et=0;G.kb=0;G.sq=[];G.lt=0;G.lh=0;G.m='play';G.ln=0;G.wl=0;G.lb=0;G.lx=null;G.wp=null;G.pf=[];show(null);hud(1);toast('Tekan MULAI MESIN (E) → '+G.r.st[1].nm+' (JALUR '+(G.r.st[1].ln+1)+')')}
function startGame(){G={m:'play',pos:0,v:0,lv:1,sc:0,cg:0,pf:[],lp:0};newLevel()}
const limAt=p=>{let l=lq(90);for(const s of G.r.sg)if(s.x<=p)l=s.l;return l};
function pz(){if(G.m=='play'){G.m='pause';hornOff();sayStop();sv();show('pause')}else if(G.m=='pause'){G.m='play';show(null)}}
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
const segT=i=>{const t=TR[S.sel],r=G.r.st,par=(r[i].x-r[i-1].x-SP)/(Math.min(t.v,200*SPD)*.6/3.6);return(par*1.5+20)/Math.sqrt(DF[S.df])};
function phys(dt,t,mv,N){const kb=G.kb>0,mve=mv*(kb?1.25:1);
 if(G.dw>0){G.v=0;G.dw-=dt;{const s0=G.r.st[G.ni-1];if(s0){if(!s0.dp&&G.dw0>=8&&G.dw<=4.6&&G.dw>0){s0.dp=1;ppkaCue(s0)}
  /* urutan berangkat: pengumuman suara PPKA selesai -> peluit PANJANG -> kereta berangkat */
  if(!s0.wst&&(s0.wr||(G.dw<=0&&(!s0.dp||(s0.hd=(s0.hd||0)+dt)>7)))){s0.wst=1;s0.wt=0;s0.wd=S.snd?WHD:.4;whistle();toast('📯 PPKA: peluit panjang, siap berangkat!')}
  if(s0.wst){s0.wt+=dt;if(s0.wt<s0.wd+.3)G.dw=Math.max(G.dw,.001);else G.dw=0}else if(G.dw<=0)G.dw=.001}}
 if(G.dw<=0){G.dw=0;toast('Berangkat! 🚆');G.ts=0;departCue();setTimeout(goHorn,900)}}
 else{
  let a=N>0?t.a*(kb?2:1)*(N/8-G.v/mve):-(.05+.25*t.a*G.v/mv);if(N>0&&a<0)a*=.3;a-=GRAV*hillSlope(G.pos-30);
  a-=em?t.b*1.7:t.b*bk/5;
  G.v=Math.max(0,Math.min(mve,G.v+a*dt));G.pos+=G.v*dt;G.ts+=dt;G.ac=a}
 const kmh=G.v*3.6,L=limAt(G.pos);G.ov=kmh>L+3;
 if(G.ov)G.sc=Math.max(0,G.sc-dt*15*G.lv*DF[S.df]);
 if(kmh>L+25){if(!G.dg)toast('⚠ TERLALU CEPAT!');G.dg+=dt;G.sc=Math.max(0,G.sc-dt*60*DF[S.df])}else G.dg=Math.max(0,G.dg-dt*2);
 G.sc+=G.v*dt*.1*G.lv;G.dk=(G.dk||0)+G.v*dt;if(G.dk>=100){G.dk-=100;G.sc+=50;S.coin+=50;G.cg+=50;(G.fx=G.fx||[]).push({t:tm});tone(1300,.09,'sine',.06);sv()}
 weselStep();const s=G.r.st[G.ni],len=trLen(t)/3.67;
 if(G.ni>=G.r.st.length-1)more(G.r,3);
 if(xing(dt,len))return;
 if(s&&G.dw<=0){
  if(G.v<.4&&G.pos>=s.x+len&&G.pos<=s.x+SP+5){
   const err=Math.abs(G.pos-(s.x+SP-5)),pts=err<4*(2-DF[S.df]/1.6)?300:err<12?200:100,pr=G.r.st[G.ni-1],
   par=(s.x-pr.x-SP)/(Math.min(t.v,200*SPD)*.6/3.6),tb=Math.max(0,Math.round((par*1.2-G.ts)*3)),cc=900;
   G.sc+=(pts+tb)*G.lv;S.coin+=cc;G.cg+=cc;s.done=1;G.ni++;G.v=0;G.dw=G.dw0=dwellT();arriveCue(s);
   toast('JALUR '+(s.ln+1)+' • '+(pts==300?'SEMPURNA! ':pts==200?'BAGUS! ':'OKE! ')+'+'+(pts+tb)*G.lv+' • +900 🪙');ding();sv()}
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
 if(pl)envState(trLen(t)/3.67);else{TUN*=.9;BRG*=.9}
 envClock(dt);stnAudio();
 if(G.m=='menu'){G.pos+=25*dt;G.v=25}else if(pl&&!phys(dt,t,mv,N))return;
 if(G.m=='menu'||pl){G.cd=(G.cd||0)+G.v*dt;if(G.cd>=12){G.cd-=12;clack(G.v/mv)}if(sy&&(run||G.m=='menu')){G.cs=(G.cs||0)+G.v*dt;if(G.cs>=4){G.cs-=4;chuff(G.v/mv)}}}
 const esv=G.m=='menu'?1:G.es==2?(G.kb>0?1.7:1):G.es==1?Math.min(1,Math.max(0,(2.2-G.et)/2.2)):0;
 eng(G.m=='menu'||pl,G.v/mv,N/8,em?1.4:bk/5,t.k,esv)}

/* drawing */
const LEN={cc:60,uap:66,tdr:40,kay:58,ec:66,em:66,bh:70,bm:66,eko:64,eks:66,res:66,bag:58,brg:60,tgk:60,ctn:64,bk:58,bis:66,pan:66,tdu:66,pkt:60,smn:62,kyu:62},FR=["brg","tgk","ctn","bk","pkt","smn","kyu"];
const CONS={eko:['eko','eko','eko','eko','eko','eko','eko','eko','bag'],eks:['eks','eks','eks','res','eks','eks','eks','eks','bag'],mix:['eks','eks','eks','res','eko','eko','eko','eko','bag'],kay:['kay','kay','kay','kay','kay','kay','kay','kay','kay'],ctn:['ctn','ctn','ctn','ctn','ctn','ctn','ctn','ctn','ctn'],tgk:['tgk','tgk','tgk','tgk','tgk','tgk','tgk','tgk','tgk'],btb:['bk','bk','bk','bk','bk','bk','bk','bk','bk'],brg:['brg','ctn','tgk','bk','brg','ctn','tgk','bk','brg'],
 /* jenis gerbong baru yang dijual di toko */
 bis:['bis','bis','bis','bis','bis','bis','bis','bis','bag'],pan:['pan','pan','pan','pan','pan','pan','pan','pan','bag'],tdu:['tdu','tdu','tdu','tdu','tdu','tdu','tdu','tdu','bag'],
 sul:['pan','pan','res','tdu','tdu','tdu','res','pan','bag'],pkt:['pkt','pkt','pkt','pkt','pkt','pkt','pkt','pkt','pkt'],smn:['smn','smn','smn','smn','smn','smn','smn','smn','smn'],kyu:['kyu','kyu','kyu','kyu','kyu','kyu','kyu','kyu','kyu']},
 CP={eko:0,eks:1500,mix:1800,kay:2500,ctn:1000,tgk:1200,btb:1200,brg:1500,bis:1000,pan:2200,tdu:2800,sul:3500,pkt:1100,smn:1300,kyu:1300},cw=id=>S.cw.includes(id),
 CN={eko:'Ekonomi',eks:'Eksekutif',mix:'Campuran',kay:'Wisata Kayu',ctn:'Barang: Peti Kemas',tgk:'Barang: Tangki BBM',btb:'Barang: Batu Bara',brg:'Barang: Campuran',bis:'Bisnis',pan:'Panoramic',tdu:'Kereta Tidur',sul:'Sultan (Panoramic+Tidur+Resto)',pkt:'Barang: Paket & Pos',smn:'Barang: Semen',kyu:'Barang: Kayu Gelondongan'},
 CD={eko:'Kursi tegak ekonomi',eks:'Kelas eksekutif',mix:'Eksekutif + ekonomi',kay:'Gerbong kayu klasik',ctn:'Kontainer KAI Log',tgk:'Tangki BBM merah',btb:'Hopper batu bara',brg:'Campur 4 jenis barang',bis:'Kelas bisnis hijau-putih',pan:'Jendela atap kaca lebar',tdu:'Kabin tidur malam hari',sul:'Rangkaian mewah: panoramic, tidur & restorasi',pkt:'Gerbong paket tertutup',smn:'Hopper semen curah',kyu:'Platform kayu gelondongan'};
/* ===== GERBONG BARU (toko & ganti gerbong) ===== */
const TGX={tgk:['#2b2f33','#e53935','BBM'],cpo:['#f9a825','#2e7d32','CPO'],lpg:['#c62828','#fafafa','LPG']},
PV={ekp:['eko','#f3f6f8','#1565c0','#1565c0','#ff6f00'],pre:['eks','#f4efe6','#0f4c5c','#0f4c5c','#e0a82e'],ekh:['eko','#e8f5e9','#2e7d32','#a5d6a7','#fff'],klh:['eko','#f1e8cf','#d97a1f','#8a4b0f','#fff'],mer:['eks','#fafafa','#c62828','#c62828','#7f1414'],rsm:['res','#f7f4ee','#e64a19','#e64a19','#ffd54f'],ins:['eks','#fdd835','#f9a825','#37474f','#fff']};
Object.assign(LEN,{ekp:66,pre:66,ekh:66,klh:66,mer:66,rsm:66,ins:66,kyh:58,kym:58,cpo:60,lpg:60,ct2:64,bx2:60,pos:60,rel:62,pup:62});
FR.push('cpo','lpg','ct2','bx2','pos','rel','pup');
Object.assign(CONS,{
 ekp:['ekp','ekp','ekp','ekp','ekp','ekp','ekp','ekp','bag'],
 pre:['pre','pre','pre','rsm','pre','pre','pre','pre','bag'],
 ekh:['ekh','ekh','ekh','ekh','ekh','ekh','ekh','ekh','bag'],
 klh:['klh','klh','klh','klh','klh','klh','klh','klh','bag'],
 mer:['mer','mer','mer','rsm','mer','mer','mer','mer','bag'],
 ins:['ins','ins','ins','ins','ins','ins','ins','ins','ins'],
 kyh:['kyh','kyh','kyh','kyh','kyh','kyh','kyh','kyh','kyh'],
 kym:['kym','kym','kym','kym','kym','kym','kym','kym','kym'],
 pel:['pan','pre','rsm','tdu','mer','ekp','klh','ekh','bag'],
 cpo:['cpo','cpo','cpo','cpo','cpo','cpo','cpo','cpo','cpo'],
 lpg:['lpg','lpg','lpg','lpg','lpg','lpg','lpg','lpg','lpg'],
 ct2:['ct2','ct2','ct2','ct2','ct2','ct2','ct2','ct2','ct2'],
 bx2:['bx2','bx2','bx2','bx2','bx2','bx2','bx2','bx2','bx2'],
 pos:['pos','pos','pos','pos','pos','pos','pos','pos','pos'],
 rel:['rel','rel','rel','rel','rel','rel','rel','rel','rel'],
 pup:['pup','pup','pup','pup','pup','pup','pup','pup','pup'],
 cmb:['cpo','ct2','bx2','rel','lpg','pos','pup','tgk','ctn']});
Object.assign(CP,{ekp:1600,pre:2600,ekh:900,klh:1100,mer:3200,ins:2000,kyh:2800,kym:2800,pel:4200,cpo:1300,lpg:1400,ct2:1100,bx2:1200,pos:1200,rel:1500,pup:1300,cmb:2000});
Object.assign(CN,{ekp:'Ekonomi Premium',pre:'Premium Eksekutif',ekh:'Ekonomi Hijau Klasik',klh:'Klasik Oranye-Krem',mer:'Luxury Merah',ins:'Kereta Inspeksi Kuning',kyh:'Wisata Kayu Hijau',kym:'Wisata Kayu Marun',pel:'Rangkaian Pelangi',cpo:'Barang: Tangki CPO',lpg:'Barang: Tangki LPG',ct2:'Barang: Peti Kemas Warna-warni',bx2:'Barang: Tertutup Hijau',pos:'Barang: Pos Indonesia',rel:'Barang: Rel Baja',pup:'Barang: Pupuk',cmb:'Barang: Campuran Lengkap'});
Object.assign(CD,{ekp:'Kursi ekonomi premium biru-putih',pre:'Eksekutif premium krem-teal + restorasi',ekh:'Ekonomi hijau gaya klasik',klh:'Gerbong klasik oranye-krem',mer:'Eksekutif luxury merah + restorasi',ins:'Gerbong dinas inspeksi',kyh:'Gerbong kayu klasik hijau',kym:'Gerbong kayu klasik marun',pel:'Campuran panoramic, tidur, luxury, premium',cpo:'Tangki minyak sawit kuning',lpg:'Tangki gas LPG merah',ct2:'Kontainer aneka warna',bx2:'Gerbong barang tertutup hijau',pos:'Gerbong pos biru-oranye',rel:'Platform pengangkut rel baja',pup:'Hopper pupuk kuning',cmb:'Campuran 9 jenis gerbong barang'});
/* setiap rangkaian dibuat 12 unit (lokomotif + 11 gerbong): jenis gerbong pertama diperbanyak */
const NCARS=12,P12={};
function pad12(a){const r=a.slice();if(r.length>=NCARS)return r;const sk=['cc','uap','tdr','bh','ec','bag'],i=r.findIndex(q=>!sk.includes(q));if(i<0)return r;const ty=r[i];while(r.length<NCARS)r.splice(i,0,ty);return r}
function carsOf(t){if(t.pv)return t.cars;const i=TR.indexOf(t),c=S.cons&&S.cons[i],ok=c&&CONS[c]&&(t.k=='loco'||t.k=='steam'),key=i+'|'+(ok?c:'');
 return P12[key]||(P12[key]=pad12(ok?(t.k=='steam'?['uap','tdr',...CONS[c].slice(1)]:['cc',...CONS[c]]):t.cars))}
/* pelebaran badan lokomotif & gerbong (1 = ukuran asli); lokomotif uap tidak dilebarkan */
const STRF=1.7,fo=ty=>ty=='uap'||ty=='tdr'?1:ty=='cc'?1.9:STRF;let STX=0,STF=1,BDK=0; /* BDK=1: bogie gelap (CC 203 / CC 206 sesuai gambar) */
const trLen=t=>carsOf(t).reduce((s,c)=>s+LEN[c]*fo(c)+3,0);
function atSt(){return G.r.st.some(s=>G.pos>=s.x+5&&G.pos<=s.x+SP+20)}
function canSwap(){const t=TR[S.sel];return G.m=='play'&&(t.k=='loco'||t.k=='steam')&&G.v<.5&&atSt()}
function openSwap(){if(!canSwap()){toast('Berhenti di stasiun dulu (hanya lokomotif berasap)');return}G.m='swap';hornOff();const t=TR[S.sel],gg=$('gg');gg.innerHTML='';
 Object.keys(CONS).filter(cw).forEach(id=>{const d=document.createElement('div');d.className='cd';d.innerHTML='<canvas width="270" height="76"></canvas><b>'+CN[id]+'</b><small>'+(S.cons[S.sel]==id?'Sedang dipakai':CD[id])+'</small><button class="b sm bl">PILIH</button>';
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
function bogie(c,cx,gy,k,n,sp){c.save();c.translate(cx,0);c.scale(1/STF,1);c.translate(-cx,0);bogie0(c,cx,gy,k,n,sp);c.restore()}
function bogie0(c,cx,gy,k,n,sp){const q=n*(sp||9);c.fillStyle=BDK?'#0f1113':'#263238';c.beginPath();c.roundRect(cx-(q/2+1)*k,gy-10*k,(q+2)*k,5*k,2*k);c.fill();c.fillStyle=BDK?'#2b2f33':'#455a64';c.fillRect(cx-q/2*k,gy-10*k,q*k,1.2*k);c.strokeStyle=BDK?'#4a5258':'#90a4ae';c.lineWidth=.7*k;[-1,1].forEach(d=>{c.beginPath();c.moveTo(cx+d*q/3*k,gy-13*k);c.lineTo(cx+d*q/3*k,gy-10*k);c.stroke()});if(REC){{const rx=STX+(cx-STX)*STF;REC.push([MIR?MIR-rx:rx,n,sp,BDK])}return}wheels(c,cx,gy,k,n,sp,BDK)}
function wheels(c,cx,gy,k,n,sp,dk){for(let i=0;i<n;i++){const wx=cx+(i-(n-1)/2)*(sp||9)*k,r=4.6*k,a=(WPH==null?G.pos:WPH)*.9,wy=gy-r;
 c.fillStyle='#0d0d0d';c.beginPath();c.arc(wx,wy,r,0,7);c.fill();c.strokeStyle=dk?'#30363a':'#5a666d';c.lineWidth=.9*k;c.beginPath();c.arc(wx,wy,r*.9,0,7);c.stroke();
 const gg=c.createRadialGradient(wx-r*.2,wy-r*.2,0,wx,wy,r*.62);gg.addColorStop(0,dk?'#6a7378':'#b0bec5');gg.addColorStop(1,dk?'#23272a':'#546e7a');c.fillStyle=gg;c.beginPath();c.arc(wx,wy,r*.62,0,7);c.fill();
 c.fillStyle=dk?'#1a1d1f':'#37474f';c.beginPath();c.arc(wx,wy,r*.42,0,7);c.fill();
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
/* Lokomotif: tiap seri punya siluet sendiri (CC 201 kotak, CC 203 miring panjang, CC 204 bersudut, CC 206 membulat) */
const LP=(rear,front)=>(c,X,Y)=>{c.moveTo(X(0),Y(-10));rear(c,X,Y);front(c,X,Y);c.lineTo(X(60),Y(-10));c.lineTo(X(60),Y(-8));c.lineTo(X(0),Y(-8));c.closePath()};
const VGL=(base,band,line)=>(P,c,X,Y,k)=>{P([[0,-44],[62,-44],[62,-8],[0,-8]],base);P([[0,-24.5],[44,-24.5],[55.2,-17.5],[62,-17.5],[62,-8],[0,-8]],band);P([[0,-27.2],[44,-27.2],[56.4,-19.4],[55.8,-18.6],[44,-26.2],[0,-26.2]],line)};
const LIV={
 /* vintage kuning-biru (seperti gambar CC 201) */vy:VGL('#f0cf2d','#0d6b8d','#0b4a62'),
 /* vintage putih-biru (WNB) */vw:(P,c,X,Y,k)=>{VGL('#f1f3f5','#1b4f9c','#0d2f66')(P,c,X,Y,k);P([[0,-25.9],[44,-25.9],[55.4,-18.4],[55.4,-17.5],[44,-24.5],[0,-24.5]],'#d4b24c')},
 /* vintage merah-biru (RNB) */vr:(P,c,X,Y,k)=>{VGL('#b3322b','#1f3d7a','#0f2350')(P,c,X,Y,k);P([[0,-25.9],[44,-25.9],[55.4,-18.4],[55.4,-17.5],[44,-24.5],[0,-24.5]],'#efe3c4')},
 /* oranye-hitam KAI lama */oh:(P,c,X,Y,k)=>{P([[0,-44],[60,-44],[60,-8],[0,-8]],'#ee6a33');P([[12,-43],[44,-43],[38,-22],[8,-22]],'#111c38');P([[0,-22],[60,-22],[60,-20.6],[0,-20.6]],'#fff');P([[0,-15],[60,-15],[60,-8],[0,-8]],'#c9501f')},
 /* putih-oranye KAI */po:(P,c,X,Y,k)=>{P([[0,-25],[40,-25],[60,-18],[60,-8],[0,-8]],'#ee6a2f');P([[0,-18],[24,-18],[30,-15],[30,-8],[0,-8]],'#14161a');P([[0,-25.8],[38,-25.8],[44,-24.2],[0,-24.2]],'#14161a')},
 /* putih-biru KAI */pb:(P,c,X,Y,k)=>{P([[0,-28],[60,-28],[60,-26.8],[0,-26.8]],'#7aa6d8');P([[0,-26],[60,-26],[60,-24.6],[0,-24.6]],'#1c2f6b');P([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],'#1c2f6b');P([[0,-15.7],[60,-15.7],[60,-8],[0,-8]],'#14161a')},
 /* putih-biru logo "2" */bi:(P,c,X,Y,k)=>{LIV.pb(P,c,X,Y,k);c.fillStyle='#ff6f00';c.beginPath();c.roundRect(X(3),Y(-33),5.4*k,5.4*k,1*k);c.fill();c.fillStyle='#fff';c.font='bold '+4.4*k+'px sans-serif';c.textAlign='center';c.fillText('2',X(5.7),Y(-28.6))},
 /* krem-hijau tua */hc:(P,c,X,Y,k)=>{P([[0,-23],[60,-23],[60,-8],[0,-8]],'#24432c');P([[0,-23],[60,-23],[60,-21.6],[0,-21.6]],'#111')},
 /* merah polos */mr:(P,c,X,Y,k)=>{P([[0,-14],[60,-14],[60,-8],[0,-8]],'#a52019');c.fillStyle='rgba(70,0,0,.38)';[8,22,36].forEach(a=>{for(let j=0;j<7;j++)c.fillRect(X(a+j*1.7),Y(-38),.9*k,13*k)})},
 /* hijau-kuning-merah */hk:(P,c,X,Y,k)=>{P([[0,-24],[60,-24],[60,-21],[0,-21]],'#f2c315');P([[0,-21],[60,-21],[60,-19.4],[0,-19.4]],'#c62828');P([[0,-19.4],[60,-19.4],[60,-8],[0,-8]],'#1f3d24')}};
const LV={
 /* CC 201 (GE U18C) mirip gambar: kap mesin panjang lebih rendah, kabin lebih tinggi bertutup atap putih, hidung kotak pendek di depan kabin, pilot merah */
 cg:{p:LP((c,X,Y)=>{c.lineTo(X(0),Y(-40.2));c.lineTo(X(1.3),Y(-41.5))},(c,X,Y)=>{c.lineTo(X(34.2),Y(-41.5));c.lineTo(X(35.6),Y(-44));c.lineTo(X(51.6),Y(-44));c.lineTo(X(53.8),Y(-42.8));c.lineTo(X(54.4),Y(-32.6));c.lineTo(X(59.2),Y(-31));c.lineTo(X(60.2),Y(-30));c.lineTo(X(60.2),Y(-19));c.lineTo(X(61.4),Y(-18.2));c.lineTo(X(61.4),Y(-10.6))}),
  g:(c,X,Y)=>{c.moveTo(X(51.8),Y(-40.8));c.lineTo(X(53.4),Y(-40.8));c.lineTo(X(53.9),Y(-33.8));c.lineTo(X(51.8),Y(-33.8))},
  sw:[[37.8,3.2],[41.6,3.2],[45.4,3.2],[49.2,2.6]],ra:56.4,gb:-33.8,wb:[54.4,-33],ey:-19,lamp:[57.6,-27],pl:[10,19,27.4,34.6,54.2],lv:[23.5,4,1.9],ng:1,nw:1,ns:1,
  ex:(c,X,Y,k,v)=>{const P=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach((q,i)=>i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1])));c.closePath();c.fill()};
   P([[34.8,-41.6],[35.9,-44.7],[51.9,-44.7],[54.4,-43.1],[54.4,-42],[51.6,-43.3],[36.2,-43.3],[35.4,-41.6]],'#e6e9ec');P([[1.3,-41.7],[34.2,-41.7],[34.2,-42.7],[1.3,-42.7]],'#cfd4d8');
   P([[56.4,-19.2],[61.4,-18.4],[61.4,-10.6],[60,-10],[60,-8],[56.4,-8]],v.r||'#d6204a');
   c.fillStyle='#8d949a';c.fillRect(X(-.4),Y(-13.8),62*k,2.2*k);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(X(-.4),Y(-11.8),62*k,.5*k);
   c.fillStyle='#2a3438';c.fillRect(X(17.4),Y(-39),4.6*k,7*k);c.fillStyle='rgba(255,255,255,.16)';for(let j=1;j<7;j++)c.fillRect(X(17.4),Y(-39+j),4.6*k,.4*k);
   c.fillStyle='#1c262b';c.fillRect(X(1.6),Y(-31.4),6.6*k,4.6*k);c.fillStyle='rgba(255,255,255,.18)';for(let j=1;j<5;j++)c.fillRect(X(1.6),Y(-31.4+j),6.6*k,.35*k);
   c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=.6*k;c.strokeRect(X(3),Y(-38),8.4*k,24*k);c.fillStyle='#2a3438';c.fillRect(X(6.1),Y(-34),2.6*k,3*k);c.fillStyle='#cfd8dc';c.fillRect(X(10),Y(-26),.8*k,2.8*k);
   c.fillStyle='#2b2f33';c.fillRect(X(-.7),Y(-28),.9*k,14.4*k);c.fillRect(X(1.3),Y(-28),.9*k,14.4*k);c.fillRect(X(-.7),Y(-28),2.9*k,.8*k);c.fillRect(X(58.2),Y(-27.6),.9*k,13.8*k);c.fillRect(X(60.2),Y(-27.6),.9*k,13.8*k);c.fillRect(X(58.2),Y(-27.6),2.9*k,.8*k);
   c.fillStyle='#1b1b1b';c.fillRect(X(58.4),Y(-15),2.6*k,2.6*k);[['#43a047',55.6],['#ffb300',57.2],['#e53935',58.8]].forEach(q=>{c.fillStyle=q[0];c.beginPath();c.arc(X(q[1]),Y(-14.7),.65*k,0,7);c.fill()})}},
 /* CC 203 — KOTAK MIRING: badan persegi, kaca depan & belakang miring lurus (tanpa lengkung) */
 ow:{p:LP((c,X,Y)=>{c.lineTo(X(0),Y(-31));c.lineTo(X(5),Y(-44))},(c,X,Y)=>{c.lineTo(X(42),Y(-44));c.lineTo(X(58.4),Y(-30));c.lineTo(X(60),Y(-28.4));c.lineTo(X(60),Y(-22))}),
  g:(c,X,Y)=>{c.moveTo(X(44.4),Y(-40.6));c.lineTo(X(52.2),Y(-33.9));c.lineTo(X(55.4),Y(-29.6));c.lineTo(X(44.4),Y(-29.6))},
  sw:[[31.4,8],[40.4,3]],ra:45,gb:-29.6,wb:[55.4,-29.6],ey:-22,lamp:[57.8,-25.4],pl:[8,16,25,30.6,43.8],lv:[10,6,1.8],
  rp:[[45,-29.6],[58.4,-29.6],[60,-28.4],[60,-8],[45,-8]],
  ex:(c,X,Y,k)=>{c.fillStyle='#9aa7ae';c.beginPath();c.roundRect(X(8),Y(-46.8),18*k,3*k,[.8*k,.8*k,0,0]);c.fill();c.fillStyle='#6f7d85';[11,16,21].forEach(a=>c.fillRect(X(a),Y(-46.2),2.4*k,1.8*k));c.fillStyle='#455a64';c.fillRect(X(30),Y(-47.4),2.4*k,3.4*k)}},
 /* CC 204 — HIDUNG KOTAK MENONJOL: kabin berkaca miring lurus, di depannya hidung berbentuk kotak yang lebih rendah */
 bw:{p:LP((c,X,Y)=>{c.lineTo(X(0),Y(-42));c.lineTo(X(2),Y(-44))},(c,X,Y)=>{c.lineTo(X(47),Y(-44));c.lineTo(X(51.4),Y(-31.6));c.lineTo(X(59),Y(-31.6));c.lineTo(X(60),Y(-31.6));c.lineTo(X(60),Y(-30.4));c.lineTo(X(60),Y(-24))}),
  g:(c,X,Y)=>{c.moveTo(X(43.6),Y(-40.6));c.lineTo(X(47),Y(-40.6));c.lineTo(X(49.6),Y(-33.2));c.lineTo(X(43.6),Y(-33.2))},
  sw:[[32,8.2],[41,2.4]],ra:45.4,gb:-33.2,wb:[50.4,-32],ey:-24,lamp:[57.6,-26.4],pl:[9,17,26,31.4,43.4],lv:[18,5,2],
  rp:[[45.4,-31.6],[59,-31.6],[60,-30.4],[60,-8],[45.4,-8]],
  ex:(c,X,Y,k)=>{c.fillStyle='#8a979e';c.beginPath();c.roundRect(X(6),Y(-46.4),22*k,2.6*k,[1.4*k,1.4*k,0,0]);c.fill();c.fillStyle='rgba(0,0,0,.28)';for(let j=0;j<10;j++)c.fillRect(X(7+j*2.1),Y(-46),.7*k,1.8*k)}},
 /* CC 206 — DATAR, KABIN GANDA: atap rata sepanjang badan, kabin di kedua ujung (depan & belakang) */
 rw:{p:LP((c,X,Y)=>{c.lineTo(X(0),Y(-42.4));c.lineTo(X(0),Y(-44));c.lineTo(X(1.8),Y(-44))},(c,X,Y)=>{c.lineTo(X(58.2),Y(-44));c.lineTo(X(60),Y(-44));c.lineTo(X(60),Y(-42.2));c.lineTo(X(60),Y(-24))}),
  g:(c,X,Y)=>{c.moveTo(X(52.4),Y(-40.6));c.lineTo(X(58.6),Y(-40.6));c.lineTo(X(58.6),Y(-29));c.lineTo(X(52.4),Y(-29))},
  rg:(c,X,Y)=>{c.moveTo(X(1.4),Y(-40.6));c.lineTo(X(7.6),Y(-40.6));c.lineTo(X(7.6),Y(-29));c.lineTo(X(1.4),Y(-29))},
  sw:[[44.2,7.4],[39.2,3.4]],sw2:[[8.4,7.4],[17.4,3.4]],ra:50.6,gb:-29,wb:[60,-29],ey:-29,lamp:[57.7,-26.6],pl:[21.6,38.4,52],lv:[30.6,3,2.4],lx:22.8,nx:30,
  ex:(c,X,Y,k)=>{c.fillStyle='#9aa7ae';c.beginPath();c.roundRect(X(23),Y(-46.6),13*k,2.8*k,[.8*k,.8*k,0,0]);c.fill();c.fillStyle='#6f7d85';[25.6,29.6,33].forEach(a=>c.fillRect(X(a),Y(-46.2),2.2*k,1.8*k));c.fillStyle='#cfd8dc';c.beginPath();c.roundRect(X(53.6),Y(-46.6),4.4*k,2.6*k,.8*k);c.fill();c.beginPath();c.roundRect(X(2),Y(-46.6),4.4*k,2.6*k,.8*k);c.fill()}}};
function locoPolish(c,X,Y,k,vr,xr,v){const n=vr.pl.length,ca=vr.pl[n-2],cb=vr.pl[n-1];
 c.strokeStyle='rgba(255,255,255,.7)';c.lineWidth=.55*k;c.beginPath();c.moveTo(X(ca+1),Y(-28.6));c.lineTo(X(cb-.8),Y(-28.6));c.moveTo(X(ca+1),Y(-29.4));c.lineTo(X(ca+1),Y(-27.4));c.moveTo(X(cb-.8),Y(-29.4));c.lineTo(X(cb-.8),Y(-27.4));c.stroke();
 c.fillStyle='#cfd8dc';c.fillRect(X(ca+1.6),Y(-26),.9*k,3.4*k);
 c.fillStyle='#37474f';c.fillRect(X(ca+3.8),Y(-8),7*k,.9*k);c.fillRect(X(ca+4.2),Y(-8),.8*k,3.6*k);c.fillRect(X(ca+9.6),Y(-8),.8*k,3.6*k);c.fillRect(X(ca+4.2),Y(-5.9),6.2*k,.8*k);c.fillRect(X(ca+4.2),Y(-4.3),6.2*k,.8*k);
 const wx=vr.wb[0],gb=vr.gb;if(!vr.nw){c.strokeStyle='#0d1317';c.lineWidth=.5*k;c.beginPath();c.moveTo(X(wx-3.4),Y(gb-.4));c.lineTo(X(wx-6.6),Y(gb-6.4));c.moveTo(X(wx-5.6),Y(gb-.4));c.lineTo(X(wx-8.6),Y(gb-5.6));c.stroke();
 c.fillStyle='#fff';c.beginPath();c.roundRect(X(vr.ra+3.6),Y(gb+1.4),4.2*k,2.2*k,.5*k);c.fill();c.fillStyle='#1c262b';c.font='bold '+1.5*k+'px sans-serif';c.textAlign='center';c.fillText(v.no.slice(-5),X(vr.ra+5.7),Y(gb+3.1))}
 c.fillStyle='#1b1b1b';c.fillRect(xr-.4*k,Y(-13.8),2.4*k,2.4*k);c.fillStyle='#37474f';c.fillRect(xr+1*k,Y(-14.4),.8*k,3.6*k);c.fillStyle='#455a64';c.beginPath();c.moveTo(X(57),Y(-10));c.lineTo(X(60.4),Y(-10));c.lineTo(X(60),Y(-8.2));c.lineTo(X(58),Y(-8.2));c.closePath();c.fill();
 c.fillStyle='#78909c';c.fillRect(X(ca-2.4),Y(-46.2),2.2*k,2.2*k);c.fillRect(X(ca-1.6),Y(-47.2),.7*k,1.1*k)}
function locoPath(c,xl,gy,k,xr,vr){const X=a=>xl+a*k,Y=a=>gy+a*k;c.beginPath();vr.p(c,X,Y)}
/* ===== CC 203 & CC 206: digambar mengikuti gambar referensi (koordinat piksel gambar -> ruang gambar lokomotif) ===== */
/* logo sayap KAI (panah merah + garis krem + garis biru), bentuk diambil dari gambar referensi, dipetakan ke (ox,oy) dengan skala s */
function kaiWing(P,ox,oy,s){const F=pts=>pts.map(q=>[ox+(q[0]-362)*s,oy+(q[1]-288.5)*s]);
 P(F([[362,288.5],[378.8,285],[400,282.8],[415.6,282.3],[415.6,286.3],[400,286.3],[381.3,287.3]]),'#27457f');
 P(F([[378.8,282.3],[400,280.4],[416.5,280.4],[416.5,282.2],[400,282.4]]),'#f1dccb');
 P(F([[378.1,281.9],[393.1,275],[406.9,270.6],[422.5,268.1],[420.6,272.5],[418.1,278.8],[412.5,279.4],[398.8,280.3]]),'#b8352b');
 P(F([[412.6,277.4],[419.8,270.6],[418.4,274.4],[416.4,277]]),'#fbeee6')}
const LIMG={
 /* CC 203: kabin di kanan, kap mesin panjang, pita merah, logo sayap KAI, bogie 3 as */
 cc203:{x0:148,sx:60/545,y0:252,yb:330,yr:372,bg:[11.8,44],sp:14,cl:{red:'#c01212',blue:'#1b1a78',roof:'#596765',frame:'#3d4540',body:'#ecedee'},
  d:({c,X,Y,P,R,L,W,lv,cl,v,ng,k,M})=>{
   P([[148,254],[160,252],[572,252],[580,249],[604,249],[618,250],[646,264],[672,276],[692,286],[694,300],[693,320],[148,320]],[sh(cl.body,.5),sh(cl.body,-.08)]);
   P([[148,252],[572,252],[572,258],[148,258]],cl.roof);P([[572,249],[604,249],[618,250],[623,254],[572,258]],'#8a8d86');
   c.fillStyle='rgba(0,0,0,.13)';[212,262,300,332,366,408,447,468,520,552].forEach(a=>R(a,259,.8,33,'rgba(0,0,0,.14)'));
   P([[148,300],[190,292],[557,292],[557,318],[148,318]],[sh(cl.red,.18),cl.red]);P([[148,306],[184,318],[148,318]],cl.blue);
   R(152,297,62,17,'#2b1f25');for(let i=0;i<20;i++)R(154+i*3,298,1,15,'rgba(255,255,255,.12)');R(232,296,17,15,'#1c1718');
   R(271,271,21,18,'#cfd1d1');R(273,273,17,14,'#14110f');
   /* logo sayap */
   kaiWing(P,362,288.5,1);
   lv(448,266,17,24,'#e6e7e7','rgba(0,0,0,.35)');lv(530,266,20,24,'#e6e7e7','rgba(0,0,0,.35)');lv(448,293,15,23,'#a01010','rgba(0,0,0,.4)');lv(530,293,18,23,'#a01010','rgba(0,0,0,.4)');
   R(483,255,26,23,'#d5d6d6');R(485,257,22,19,'#3a3733');for(let i=0;i<6;i++)R(485,259+i*3.2,22,.7,'rgba(255,255,255,.18)');
   /* kabin */
   R(561,252,2,66,'rgba(0,0,0,.18)');W([[581,259],[599,259],[599,275],[581,275]]);W([[601,259],[617,259],[617,275],[601,275]]);W([[619,259],[628,259],[657,273],[619,273]]);
   L([[618,250],[646,264],[672,276],[692,286]],'rgba(0,0,0,.3)',.6);L([[622,257.5],[655,273.5]],'rgba(255,255,255,.55)',.5);
   R(600,293,40,9,'#f3f3f3');R(600,293,40,.8,'#222');R(600,301.2,40,.8,'#222');c.fillStyle='#111';c.textAlign='center';c.font='bold '+2.5*k+'px sans-serif';c.fillText(v.no,X(620),Y(300.4),40*M.sx*k*.92);
   c.fillStyle='#555';c.font=1.7*k+'px sans-serif';c.fillText('DIPO INDUK BD',X(620),Y(309.5),38*M.sx*k*.9);
   /* rangka bawah, tangga, tangki, pilot */
   R(148,318,545,12,cl.frame);R(148,318,545,1.4,'rgba(255,255,255,.25)');R(148,326,545,4,'rgba(0,0,0,.35)');
   R(365,337,86,24,'#6f7a80');R(365,337,86,3,'rgba(255,255,255,.25)');
   [[146,330,18,32],[455,322,14,40],[532,322,16,34]].forEach(q=>{R(q[0],q[1],q[2],q[3],'#2d3330');for(let y=q[1]+5;y<q[1]+q[3]-2;y+=6)R(q[0]+1,y,q[2]-2,.9,'rgba(255,255,255,.2)')});
   P([[683,332],[697,330],[698,372],[684,372]],'#b3201f');L([[686,342],[697,337]],'#eee',1);L([[686,352],[697,347]],'#eee',1);R(692,336,10,8,'#1a1a1a');
   P([[138,332],[149,332],[149,372],[140,372]],'#b3201f');R(130,336,10,8,'#1a1a1a');
   /* pegangan */
   L([[133,320],[133,288]],'#8f9598',.7);L([[150,300],[150,282],[154,276],[160,282],[160,300]],'#cfd3d4',.55);
   L([[515,317],[515,290],[519,283],[523,290],[523,317]],'#cfd3d4',.55);L([[550,317],[550,290],[554,283],[558,290],[558,317]],'#cfd3d4',.55)}},
 /* CC 206: kabin di kedua ujung, atap hijau-teal, pita merah-oranye, pita biru tua, logo sayap di kedua kabin */
 cc206:{x0:135,sx:60/542,y0:793,yb:880,yr:913,bg:[12.2,47.6],sp:14,cl:{red:'#d7300f',navy:'#1c2b6e',roof:'#3f6563',frame:'#0c1116',body:'#eeefec'},
  d:({c,X,Y,P,R,L,W,lv,cl,v,ng,k,M})=>{
   P([[139,794],[192,794],[195,797],[340,797],[343,794],[530,794],[535,797],[617,797],[620,793],[672,793],[676,796],[677,815],[686,823],[689,834],[687,862],[124,862],[122,834],[125,823],[139,815]],[sh(cl.body,.5),sh(cl.body,-.1)]);
   P([[192,797],[617,797],[617,806],[192,806]],cl.roof);R(340,794,190,3,cl.roof);R(192,797,425,1.2,'rgba(255,255,255,.3)');R(139,793,53,4,'#d7dadb');R(620,793,57,4,'#d7dadb');
   [340,372,405,440,468,505,535,590].forEach(a=>R(a,807,.8,27,'rgba(0,0,0,.12)'));
   P([[192,834],[620,834],[620,862],[192,862]],[sh(cl.red,.18),cl.red]);P([[193,851],[300,851],[338,862],[193,862]],cl.navy);P([[283,842],[300,843],[328,852],[318,852],[290,847]],'#f3f3ef');
   /* pintu mesin terbuka + jendela */
   R(215,817,29,41,'#1c1a19');R(247,817,30,41,'#1c1a19');R(201,820,6,26,'#262423');R(282,825,14,24,'#232425');R(282,817,9,8,'#0c0c0c');R(308,813,21,17,'#e9eaea');R(311,816,15,11,'#090909');
   lv(470,808,17,24,'#e8e8e4','rgba(0,0,0,.3)');lv(512,808,18,24,'#e8e8e4','rgba(0,0,0,.3)');lv(470,835,17,26,'#e3d3cb','rgba(120,30,10,.55)');lv(512,835,18,26,'#e3d3cb','rgba(120,30,10,.55)');
   R(545,798,34,26,'#d8d8d4');R(548,801,28,20,'#2a2815');for(let i=0;i<6;i++)R(548,803+i*3,28,.7,'rgba(255,255,255,.16)');
   /* kabin kiri & kanan */
   [[143,122],[628,689]].forEach((q,i)=>{const a=q[0];R(a,805,41,17,'#e9eaea');W([[a+2,807],[a+20,807],[a+20,820],[a+2,820]]);W([[a+22,807],[a+39,807],[a+39,820],[a+22,820]]);
    const px=i?632:148,dx=i?489:0;R(px,826,i?32:33,7,'#f5f5f5');R(px,826,i?32:33,.8,'#222');R(px,832.2,i?32:33,.8,'#222');c.fillStyle='#111';c.textAlign='center';c.font='bold '+2.4*k+'px sans-serif';c.fillText(v.no,X(px+16),Y(831.6),30*M.sx*k*.92);
    kaiWing(P,137+dx,852.5,.84);
    c.fillStyle='#555';c.font=1.6*k+'px sans-serif';c.fillText('DIPO INDUK BD',X(160+dx),Y(859),34*M.sx*k*.9)});
   R(122,823,7,12,'#c9c9c4');R(682,823,7,12,'#c9c9c4');R(128,788,7,6,'#444');R(676,788,7,6,'#444');
   /* pegangan putih */
   L([[202,862],[202,836],[206,832],[210,836],[210,862]],'#f4f4f2',.7);L([[230,862],[230,836],[232,833],[255,833],[257,836],[257,862]],'#f4f4f2',.7);L([[257,838],[275,838]],'#f4f4f2',.65);
   L([[552,862],[552,838],[555,835],[577,835],[580,838],[580,862]],'#f4f4f2',.7);L([[598,862],[598,838],[602,835],[605,838],[605,862]],'#f4f4f2',.7);
   /* rangka hitam, tangki, pilot */
   R(124,862,565,18,cl.frame);R(124,862,565,1.2,'rgba(255,255,255,.18)');R(124,880,70,26,'#10151a');R(600,880,85,26,'#10151a');R(365,884,80,21,'#2d2f36');R(365,884,80,2,'rgba(255,255,255,.18)');
   P([[119,875],[134,872],[135,912],[121,912]],'#b3201f');R(112,880,10,8,'#1a1a1a');P([[683,872],[696,875],[696,910],[684,912]],'#b3201f');R(692,880,12,8,'#1a1a1a')}}};
/* CC 201 (GE U18C) — digambar mengikuti gambar referensi: kabin di depan (3 jendela, atap abu-abu), hidung pendek, kap mesin panjang rata, kisi radiator di belakang, bogie 3 as gelap + tangki. Koordinat = piksel potongan gambar (590x155), dicerminkan agar menghadap ke kanan. */
LIMG.cc201={x0:590,sx:-60/590,y0:7,yb:108,yr:150,bg:[13.5,46],sp:12,cl:{body:'#f4f5f5',roof:'#7b817d',frame:'#1b2023',sty:'wb'},
 d:({c,X,Y,P,R,L,W,lv,cl,v,ng,k,M})=>{
  const sty=cl.sty,bd=cl.body,sx=Math.abs(M.sx),
  clip=()=>{c.beginPath();[[22,100],[22,50],[27,44],[57,44],[57,12],[61,9],[134,9],[137,7],[566,7],[574,12],[576,100]].forEach((q,i)=>i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1])));c.closePath()},
  txt=(t,cx,cy,w,h,col,fw)=>{c.save();c.translate(X(cx),Y(cy));c.fillStyle=col;const fs=h*36/101*k/.72;c.font=(fw||'bold')+' '+fs+'px sans-serif';c.textAlign='center';c.textBaseline='middle';const w0=c.measureText(t).width||1;c.scale(w*sx*k/w0,1);c.fillText(t,0,0);c.restore()},
  two=(cx,cy,w,h,col)=>{const a=w/2,b=h/2,t=h*.27,q=w*.24;R(cx-a,cy-b,w,t,col);R(cx-a,cy-t/2,w,t,col);R(cx-a,cy+b-t,w,t,col);R(cx-a,cy-b,q,b+t/2,col);R(cx+a-q,cy-t/2,q,b+t/2,col)},
  kai=(cx,cy,w,h,col)=>{txt('KAI',cx-w*.02,cy-h*.1,w*.9,h*.66,col,'italic 900');L([[cx+w*.46,cy+h*.46],[cx-w*.46,cy+h*.4]],'#d3342a',.45)},
  plate=(cx,cy,bg,fg)=>{R(cx-21,cy-6,42,12,bg);L([[cx-21,cy-6],[cx+21,cy-6],[cx+21,cy+6],[cx-21,cy+6],[cx-21,cy-6]],'rgba(0,0,0,.55)',.2);txt(v.no,cx,cy,37,7.5,fg)};
  /* ---- badan (dipotong mengikuti siluet) ---- */
  c.save();clip();c.clip();
  P([[0,0],[600,0],[600,112],[0,112]],[sh(bd,.45),sh(bd,-.07)]);
  if(sty=='cream'){const g=cl.gr||'#3b5b47';P([[22,78],[58,78],[100,64],[135,62],[458,62],[472,80],[580,80],[580,112],[22,112]],[sh(g,.12),sh(g,-.2)]);L([[22,69],[58,69],[100,55],[135,54],[456,54],[471,72],[580,72]],g,.75);L([[22,73.5],[58,73.5],[100,60],[135,59],[456,59]],sh(g,.6),.3)}
  else if(sty=='wb'){P([[22,74],[125,74],[190,66],[580,66],[580,77],[190,77],[125,85],[22,85]],'#7ca3d6');P([[22,86],[125,86],[190,78],[580,78],[580,91],[190,91],[125,99],[22,99]],'#0d1b4d')}
  else if(sty=='ob'){P([[0,0],[600,0],[600,112],[0,112]],[sh('#0c3b8c',.15),'#0a2f70']);P([[444,0],[600,0],[600,112],[408,112]],['#f57a2c','#e25a10']);P([[0,0],[160,0],[130,112],[0,112]],['#f57a2c','#e25a10']);R(0,82,600,4,'#fff')}
  else if(sty=='wo'||sty=='wos'){P([[150,50],[455,50],[580,80],[580,112],[150,112]],['#f58a1b','#dc6a08']);P([[468,112],[580,72],[580,112]],'#102a66');P([[474,106],[576,78],[580,84],[482,110]],'#fff')}
  else if(sty=='diag'){const nv='#17306f';P([[296,0],[311,0],[283,112],[268,112]],nv);P([[318,0],[326,0],[298,112],[290,112]],nv);P([[372,0],[388,0],[360,112],[344,112]],nv)}
  /* atap kabin & kap mesin */
  P([[57,0],[135,0],[135,34],[57,34]],['#909793','#6e7571']);
  R(135,7,445,8,cl.roof);R(135,14.5,445,.9,'rgba(0,0,0,.28)');R(135,7,445,1,'rgba(255,255,255,.35)');
  [297,331,372,405,441,474].forEach(a=>R(a,15,.7,85,'rgba(0,0,0,.17)'));R(135,15,1.3,85,'rgba(0,0,0,.32)');
  [[163,190],[248,272]].forEach(q=>{for(let a=q[0];a<q[1];a+=3.1)R(a,28,1.2,56,'rgba(0,0,0,.5)')});
  R(200,13,46,40,'rgba(0,0,0,.13)');lv(204,17,38,30,'#62686a','rgba(0,0,0,.6)');L([[200,53],[200,98],[246,98],[246,53]],'rgba(0,0,0,.22)',.3);
  R(402,28,42,34,'rgba(0,0,0,.14)');lv(405,31,36,28,'#62686a','rgba(0,0,0,.6)');
  L([[405,64],[441,64],[441,98]],'rgba(0,0,0,.28)',.3);L([[405,64],[405,98]],'rgba(0,0,0,.28)',.3);
  R(486,77,84,22,'rgba(0,0,0,.2)');for(let a=489;a<568;a+=3.1)R(a,79,1.7,18,'#24282a');
  L([[40,46],[40,100]],'rgba(0,0,0,.25)',.3);
  c.restore();
  /* kabin: kaca depan 3 panel */
  R(59,33,74,32,'#14181a');
  W([[62,36],[84,36],[84,62],[62,62]]);W([[87,36],[108,36],[108,62],[87,62]]);W([[111,36],[130,36],[130,62],[111,62]]);
  /* lampu depan di hidung */
  R(22,53,5,10,ng?'#fff7b0':'#e2e5e5');L([[22,53],[27,53],[27,63],[22,63],[22,53]],'rgba(0,0,0,.5)',.2);
  /* plat nomor & logo */
  if(sty=='cream')plate(96,81,'#d0381b','#f4d56a');else plate(96,81,'#f6f7f7','#14181a');
  const lg=cl.lgo;
  if(lg=='kai')kai(342,45,56,26,cl.lc||'#1c3f8a');
  else if(lg=='two')two(303,73,28,24,'#f07a1b');
  else if(lg=='twoS')two(96,65,13,11,cl.lc||'#f07a1b');
  else if(lg=='twoD')two(322,56,34,30,'#f07a1b');
  else if(lg=='swoosh'){L([[303,54],[330,48],[366,36]],'#1c3f8a',.45);L([[306,49],[334,43],[366,34]],'#ef7d19',.45);L([[311,45],[338,39],[366,32]],'#d3342a',.4)}
  /* rangka bawah, tangki, pilot, pegangan */
  R(8,100,578,10,cl.frame);R(8,100,578,1.3,'rgba(255,255,255,.22)');R(30,108,520,3,'rgba(0,0,0,.35)');
  R(262,108,72,24,'#4d5356');R(262,108,72,2.5,'rgba(255,255,255,.2)');
  P([[8,100],[24,100],[24,138],[10,138]],'#2b3135');P([[560,100],[584,100],[584,140],[566,140]],'#2b3135');
  P([[570,102],[580,102],[583,136],[572,136]],'#b9262c');P([[3,102],[9,102],[11,136],[5,136]],'#b9262c');
  L([[13,100],[13,53],[17,47],[23,53],[23,100]],'#848c8e',.55);
  L([[546,100],[546,52],[550,46],[554,52],[554,100]],'#848c8e',.55);L([[558,100],[558,52],[562,46],[566,52],[566,100]],'#848c8e',.55);
  R(228,2,46,6,cl.roof);R(150,3,9,5,'#9aa0a0');R(300,3,20,4,'#9aa0a0')}};

function locoImg(c,xl,gy,k,t,ng){const v=t.lv,M=LIMG[v.img],cl=Object.assign({},M.cl,v.cl||{}),
 X=a=>xl+(a-M.x0)*M.sx*k,Y=a=>gy+k*(a<=M.yb?-44+(a-M.y0)*36/(M.yb-M.y0):-8+(a-M.yb)*8/(M.yr-M.yb)),
 P=(pts,col)=>{if(Array.isArray(col)){let a=1e9,b=-1e9;pts.forEach(q=>{a=Math.min(a,q[1]);b=Math.max(b,q[1])});const g=c.createLinearGradient(0,Y(a),0,Y(b));g.addColorStop(0,col[0]);g.addColorStop(1,col[1]);c.fillStyle=g}else c.fillStyle=col;
  c.beginPath();pts.forEach((q,i)=>i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1])));c.closePath();c.fill()},
 R=(a,b,w,h,col)=>P([[a,b],[a+w,b],[a+w,b+h],[a,b+h]],col),
 L=(pts,col,w)=>{c.strokeStyle=col;c.lineWidth=w*k;c.lineCap='round';c.lineJoin='round';c.beginPath();pts.forEach((q,i)=>i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1])));c.stroke()},
 W=pts=>{if(ng){P(pts,['#fff3b0','#ffb74d'])}else{P(pts,['#1d2b36','#020405']);c.save();c.beginPath();pts.forEach((q,i)=>i?c.lineTo(X(q[0]),Y(q[1])):c.moveTo(X(q[0]),Y(q[1])));c.closePath();c.clip();
   const x0=Math.min(...pts.map(q=>q[0])),x1=Math.max(...pts.map(q=>q[0])),y0=Math.min(...pts.map(q=>q[1])),y1=Math.max(...pts.map(q=>q[1]));
   c.fillStyle='rgba(255,255,255,.2)';c.beginPath();c.moveTo(X(x0),Y(y1));c.lineTo(X(x0+(x1-x0)*.5),Y(y0));c.lineTo(X(x0+(x1-x0)*.72),Y(y0));c.lineTo(X(x0+(x1-x0)*.22),Y(y1));c.fill();c.restore()}},
 lv=(a,b,w,h,col,ln)=>{R(a,b,w,h,col);for(let y=b+2;y<b+h-1;y+=3)R(a+1,y,w-2,1,ln)};
 c.save();M.d({c,X,Y,P,R,L,W,lv,cl,v,ng,k,M});c.restore();
 BDK=1;M.bg.forEach(a=>bogie(c,xl+a*k,gy,k,3,M.sp));BDK=0}

function loco(c,xl,xr,gy,k,t,ng){if(t.lv.img)return locoImg(c,xl,gy,k,t,ng);const v=t.lv,vr=LV[v.pat]||LV.cg,X=a=>xl+a*k,Y=a=>gy+a*k,Pg=(pts,col)=>{c.fillStyle=col;c.beginPath();pts.forEach((p,i)=>i?c.lineTo(X(p[0]),Y(p[1])):c.moveTo(X(p[0]),Y(p[1])));c.closePath();c.fill()};
 locoPath(c,xl,gy,k,xr,vr);fg(c,Y(-44),36*k,v.u);
 c.save();locoPath(c,xl,gy,k,xr,vr);c.clip();
 c.fillStyle=v.bd;c.fillRect(xl,Y(-44),xr-xl,3.2*k);
 if(v.lg)LIV[v.lg](Pg,c,X,Y,k);else if(v.pat=='cg'){Pg([[0,-23.1],[60,-23.1],[60,-8],[0,-8]],v.st);Pg([[0,-23.1],[60,-23.1],[60,-20.1],[0,-20.1]],v.st2);Pg([[0,-20.1],[60,-20.1],[60,-18.7],[0,-18.7]],v.bd)}
 else if(v.pat=='bw'){Pg([[0,-30],[36,-30],[36,-27.6],[0,-27.6]],v.st);Pg([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],v.st);Pg([[0,-15.7],[60,-15.7],[60,-13.7],[0,-13.7]],v.st2)}
 else if(v.pat=='ow'){Pg([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],v.st);Pg([[0,-15.7],[60,-15.7],[60,-13.7],[0,-13.7]],v.st2);Pg([[0,-33],[30,-33],[26,-21.7],[0,-21.7]],v.st);Pg([[30,-33],[32.2,-33],[28.2,-21.7],[26,-21.7]],v.st2)}
 else{Pg([[0,-21.7],[60,-21.7],[60,-15.7],[0,-15.7]],v.st);Pg([[0,-15.7],[60,-15.7],[60,-13.7],[0,-13.7]],v.st2);Pg([[0,-29],[44,-29],[44,-27.2],[0,-27.2]],v.st)}
 v.lg||Pg(vr.rp||[[vr.ra,vr.gb],[vr.wb[0],vr.wb[1]],[60,vr.ey],[60,-8],[vr.ra,-8]],v.r);c.fillStyle='rgba(0,0,0,.16)';c.fillRect(X(vr.ra),Y(vr.gb),.7*k,(-8-vr.gb)*k);
 if(!vr.ns){c.fillStyle='rgba(255,255,255,.65)';c.fillRect(X(vr.ra+.7),Y(-19),xr-X(vr.ra+.7),1.2*k);c.fillRect(X(vr.ra+.7),Y(-15.5),xr-X(vr.ra+.7),1.2*k)}if(vr.rg){v.lg||Pg([[0,-29],[9.4,-29],[9.4,-8],[0,-8]],v.r);c.fillStyle='rgba(255,255,255,.65)';c.fillRect(X(0),Y(-19),9.4*k,1.2*k);c.fillRect(X(0),Y(-15.5),9.4*k,1.2*k)}
 c.fillStyle='#232a2e';c.fillRect(xl,Y(-12),xr-xl,4*k);c.fillRect(X(12),Y(-13.5),30*k,2*k);c.fillStyle='rgba(255,255,255,.22)';c.fillRect(xl+4*k,Y(-42.6),xr-xl-12*k,.9*k);
 c.fillStyle='rgba(0,0,0,.2)';vr.pl.forEach(a=>c.fillRect(X(a),Y(-42),.7*k,30*k));{const n=vr.pl.length;c.fillStyle='rgba(0,0,0,.1)';c.fillRect(X(vr.pl[n-2]+.7),Y(-42),(vr.pl[n-1]-vr.pl[n-2]-.7)*k,30*k)}
 if(!vr.rg&&!vr.ng){c.fillStyle='#1c262b';c.fillRect(X(1.2),Y(-40.5),8.6*k,10*k);c.fillStyle='rgba(255,255,255,.14)';for(let j=1;j<6;j++)c.fillRect(X(1.2),Y(-40.5+j*1.7),8.6*k,.5*k)}
 c.fillStyle='rgba(0,0,0,.28)';for(let j=0;j<vr.lv[1];j++)c.fillRect(X(vr.lv[0]+j*vr.lv[2]),Y(-39.5),1*k,9*k);
 c.restore();locoPath(c,xl,gy,k,xr,vr);c.strokeStyle='rgba(0,0,0,.4)';c.lineWidth=.9*k;c.stroke();
 vr.ex(c,X,Y,k,v);
 vr.sw.forEach((q,i)=>win(c,X(q[0]),Y(-40.5),q[1]*k,10.5*k,ng,(i?1.6:2.2)*k));
 c.beginPath();vr.g(c,X,Y);c.closePath();
 {const gl=c.createLinearGradient(0,Y(-40.6),0,Y(vr.gb));if(ng){gl.addColorStop(0,'#fff3b0');gl.addColorStop(1,'#ffb74d')}else{gl.addColorStop(0,'#78a6c9');gl.addColorStop(.55,'#2f536f');gl.addColorStop(1,'#10202e')}c.fillStyle=gl;c.fill();c.strokeStyle='rgba(10,16,22,.9)';c.lineWidth=.8*k;c.stroke()}
 if(vr.rg){vr.sw2.forEach((q,i)=>win(c,X(q[0]),Y(-40.5),q[1]*k,10.5*k,ng,(i?1.6:2.2)*k));c.beginPath();vr.rg(c,X,Y);c.closePath();
  {const gl=c.createLinearGradient(0,Y(-40.6),0,Y(vr.gb));if(ng){gl.addColorStop(0,'#fff3b0');gl.addColorStop(1,'#ffb74d')}else{gl.addColorStop(0,'#78a6c9');gl.addColorStop(.55,'#2f536f');gl.addColorStop(1,'#10202e')}c.fillStyle=gl;c.fill();c.strokeStyle='rgba(10,16,22,.9)';c.lineWidth=.8*k;c.stroke()}
  c.fillStyle='#fff59d';c.beginPath();c.roundRect(X(60-vr.lamp[0]-2.2),Y(vr.lamp[1]),2.2*k,2.6*k,.8*k);c.fill();c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=.5*k;c.stroke()}
 if(!v.nl){const lx=vr.lx||12.2;c.fillStyle='#fff';c.beginPath();c.roundRect(X(lx),Y(-39.5),7.4*k,5.2*k,1*k);c.fill();c.fillStyle='#1565c0';c.font='bold '+3.4*k+'px sans-serif';c.textAlign='center';c.fillText('KAI',X(lx+3.7),Y(-35.6));c.fillStyle='#ff6f00';c.fillRect(X(lx+.6),Y(-34.4),6.2*k,.9*k)}
 c.fillStyle='#fff';c.font='bold '+3.4*k+'px sans-serif';c.fillText(v.no,X(vr.nx||22),Y(-17.2));
 c.fillStyle='#fff59d';c.beginPath();c.roundRect(X(vr.lamp[0]),Y(vr.lamp[1]),2.2*k,2.6*k,.8*k);c.fill();c.strokeStyle='rgba(0,0,0,.45)';c.lineWidth=.5*k;c.stroke();
 c.fillStyle='#ffd600';for(let i=0;i<3;i++)c.fillRect(xr-11*k+i*3.5*k,Y(-11),2*k,3*k);
 locoPolish(c,X,Y,k,vr,xr,v);
 bogie(c,X(14),gy,k,3);bogie(c,xr-14*k,gy,k,3)}
function freight(c,ty,xl,xr,gy,k,t,ng){const L=xr-xl,cx=(xl+xr)/2,fl=gy-8*k;
 c.fillStyle='#232a2e';c.fillRect(xl+2*k,fl-3*k,L-4*k,3.5*k);
 if(ty=='brg'||ty=='bx2'){const y0=fl-30*k;c.beginPath();c.rect(xl+3*k,y0,L-6*k,27*k);fg(c,y0,27*k,ty=='bx2'?'#2e5e3a':'#8d4a3a');c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=.8*k;c.beginPath();for(let i=1;i<(L-6*k)/(4*k);i++){c.moveTo(xl+3*k+i*4*k,y0+2*k);c.lineTo(xl+3*k+i*4*k,y0+25*k)}c.stroke();
  c.fillStyle='rgba(0,0,0,.22)';c.fillRect(cx-9*k,y0+3*k,18*k,22*k);c.strokeStyle='#cfd8dc';c.lineWidth=.9*k;c.strokeRect(cx-9*k,y0+3*k,18*k,22*k);c.beginPath();c.moveTo(cx,y0+3*k);c.lineTo(cx,y0+25*k);c.stroke();
  c.fillStyle=ty=='bx2'?'#1f4228':'#6d3a2d';c.fillRect(xl+2*k,y0-2*k,L-4*k,3*k);c.fillStyle='#fff';c.font='bold '+4*k+'px sans-serif';c.textAlign='center';c.fillText(ty=='bx2'?'GBW':'KKBW',cx,y0+24.5*k)}
 else if(TGX[ty]){const y0=fl-31*k,P=()=>{c.beginPath();c.roundRect(xl+4*k,y0,L-8*k,26*k,13*k)};P();fg(c,y0,26*k,TGX[ty][0]);c.save();P();c.clip();c.fillStyle=TGX[ty][1];c.fillRect(xl,y0+11*k,L,4*k);c.fillStyle='rgba(255,255,255,.2)';c.fillRect(xl,y0+3*k,L,2.6*k);c.restore();
  c.fillStyle='#fff';c.font='bold '+3.8*k+'px sans-serif';c.textAlign='center';c.fillText(TGX[ty][2],cx,y0+22*k);c.fillStyle='#3a4147';c.fillRect(cx-6*k,y0-2.5*k,12*k,3*k);c.strokeStyle='#90a4ae';c.lineWidth=.7*k;c.beginPath();c.moveTo(xl+8*k,y0-1*k);c.lineTo(xr-8*k,y0-1*k);c.stroke();c.fillStyle='#232a2e';c.fillRect(xl+8*k,fl-6*k,7*k,3*k);c.fillRect(xr-15*k,fl-6*k,7*k,3*k)}
 else if(ty=='ctn'||ty=='ct2'){c.fillStyle='#37474f';c.fillRect(xl+2*k,fl-6*k,L-4*k,3.2*k);const cols=ty=='ct2'?['#fdd835','#8e24aa','#00acc1','#d81b60','#455a64','#7cb342']:['#1e88e5','#c62828','#fb8c00','#2e7d32','#6d4c41','#00838f'],h0=Math.round(xl/k);
  [xl+3*k,xr-31*k].forEach((x0,j)=>{const col=cols[Math.floor(hs(h0+j*7)*6)],y0=fl-31*k;c.beginPath();c.rect(x0,y0,28*k,25*k);fg(c,y0,25*k,col);c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=.7*k;c.beginPath();for(let i=1;i<14;i++){c.moveTo(x0+i*2*k,y0+2*k);c.lineTo(x0+i*2*k,y0+23*k)}c.stroke();c.fillStyle='rgba(0,0,0,.35)';c.fillRect(x0,y0,2*k,25*k);c.fillRect(x0+26*k,y0,2*k,25*k);c.fillStyle='#fff';c.fillRect(x0+6*k,y0+9*k,16*k,3.6*k);c.fillStyle='#37474f';c.font='bold '+3*k+'px sans-serif';c.textAlign='center';c.fillText('KAI LOG',x0+14*k,y0+12*k)})}
 else if(ty=='pkt'||ty=='pos'){const y0=fl-32*k;c.beginPath();c.rect(xl+3*k,y0,L-6*k,29*k);fg(c,y0,29*k,ty=='pos'?'#1565c0':'#c62828');c.strokeStyle='rgba(0,0,0,.25)';c.lineWidth=.7*k;c.beginPath();for(let i=1;i<(L-6*k)/(4*k);i++){c.moveTo(xl+3*k+i*4*k,y0+2*k);c.lineTo(xl+3*k+i*4*k,y0+27*k)}c.stroke();
  c.fillStyle=ty=='pos'?'#ff6f00':'#fff';c.fillRect(xl+3*k,y0+8*k,L-6*k,2.4*k);c.fillStyle='rgba(0,0,0,.28)';c.fillRect(cx-9*k,y0+11*k,18*k,17*k);c.strokeStyle='#cfd8dc';c.lineWidth=.9*k;c.strokeRect(cx-9*k,y0+11*k,18*k,17*k);c.beginPath();c.moveTo(cx,y0+11*k);c.lineTo(cx,y0+28*k);c.stroke();
  c.fillStyle=ty=='pos'?'#0d47a1':'#8e1b1b';c.fillRect(xl+2*k,y0-2*k,L-4*k,3*k);c.fillStyle='#fff';c.font='bold '+3.6*k+'px sans-serif';c.textAlign='center';c.fillText(ty=='pos'?'POS':'PAKET',xl+14*k,y0+6.4*k);c.fillText(ty=='pos'?'INDONESIA':'KAI LOG',xr-14*k,y0+6.4*k)}
 else if(ty=='smn'||ty=='pup'){const y0=fl-30*k,hw2=(L-8*k)/2;[xl+3*k,cx+1*k].forEach((x0,j)=>{c.beginPath();c.moveTo(x0,y0);c.lineTo(x0+hw2-1*k,y0);c.lineTo(x0+hw2-5*k,fl-5*k);c.lineTo(x0+4*k,fl-5*k);c.closePath();fg(c,y0,25*k,ty=='pup'?'#fdd835':'#b0bec5');c.strokeStyle='rgba(0,0,0,.3)';c.lineWidth=.8*k;c.stroke();c.fillStyle='#78909c';c.fillRect(x0+hw2/2-3*k,y0-2.6*k,6*k,3*k);c.fillStyle='#455a64';c.fillRect(x0+hw2/2-2*k,fl-6.4*k,4*k,1.6*k)});
  c.fillStyle=ty=='pup'?'#2e7d32':'#1565c0';c.font='bold '+4*k+'px sans-serif';c.textAlign='center';c.fillText(ty=='pup'?'PUPUK':'SEMEN',cx,y0+13*k)}
 else if(ty=='kyu'){const cols=['#8d6e63','#795548','#6d4c41','#a1887f'],lw0=(L-8*k)/3;for(let r2=0;r2<3;r2++)for(let j=0;j<3;j++){const lx=xl+4*k+j*lw0+(r2%2)*2*k;c.fillStyle=cols[(r2+j)%4];c.beginPath();c.rect(lx,fl-3*k-(r2+1)*7*k,lw0-1*k,6.4*k);c.fill();c.strokeStyle='rgba(0,0,0,.3)';c.lineWidth=.5*k;c.stroke();c.fillStyle='rgba(60,30,10,.35)';c.fillRect(lx+1*k,fl-3*k-(r2+1)*7*k+2.4*k,lw0-3*k,.6*k)}
  c.fillStyle='#37474f';[xl+3*k,xr-4.4*k].forEach(px=>c.fillRect(px,fl-28*k,1.4*k,25*k));c.strokeStyle='#90a4ae';c.lineWidth=.8*k;c.beginPath();c.moveTo(xl+3.7*k,fl-25*k);c.lineTo(xr-3.7*k,fl-25*k);c.stroke()}
 else if(ty=='rel'){c.fillStyle='#37474f';[xl+4*k,cx,xr-5.4*k].forEach(px=>c.fillRect(px,fl-24*k,1.4*k,21*k));
  for(let r2=0;r2<3;r2++){const yy=fl-3*k-(r2+1)*6*k;c.fillStyle=r2%2?'#8d949a':'#a5acb2';c.fillRect(xl+2*k,yy,L-4*k,5*k);c.fillStyle='rgba(0,0,0,.25)';c.fillRect(xl+2*k,yy+4*k,L-4*k,1*k);c.fillStyle='rgba(255,255,255,.35)';c.fillRect(xl+2*k,yy+.6*k,L-4*k,.8*k)}
  c.fillStyle='#ffd600';c.fillRect(xl+3*k,fl-26*k,3*k,3*k);c.fillRect(xr-6*k,fl-26*k,3*k,3*k)}
 else{const y0=fl-28*k;c.beginPath();c.moveTo(xl+3*k,y0);c.lineTo(xr-3*k,y0);c.lineTo(xr-6*k,fl-6*k);c.lineTo(xl+6*k,fl-6*k);c.closePath();fg(c,y0,22*k,'#4b565e');c.strokeStyle='rgba(0,0,0,.28)';c.lineWidth=.8*k;c.beginPath();for(let i=1;i<10;i++){const px=xl+3*k+i*(L-6*k)/10;c.moveTo(px,y0+1*k);c.lineTo(px,fl-7*k)}c.stroke();c.fillStyle='#37424a';c.fillRect(xl+2*k,y0-1.5*k,L-4*k,2.5*k);
  c.fillStyle='#14171a';c.beginPath();c.moveTo(xl+4*k,y0-1*k);c.quadraticCurveTo(xl+10*k,y0-10*k,cx-6*k,y0-7*k);c.quadraticCurveTo(cx+4*k,y0-12*k,cx+14*k,y0-7*k);c.quadraticCurveTo(xr-8*k,y0-9*k,xr-4*k,y0-1*k);c.closePath();c.fill();c.fillStyle='rgba(255,255,255,.18)';for(let i=0;i<8;i++)c.fillRect(xl+8*k+hs(i)*(L-16*k),y0-4*k-hs(i+9)*5*k,1.2*k,1.2*k);c.fillStyle='#fff';c.font='bold '+3.8*k+'px sans-serif';c.textAlign='center';c.fillText('BATU BARA',cx,fl-12*k)}
 bogie(c,xl+11*k,gy,k,2);bogie(c,xr-11*k,gy,k,2)}
function coachPolish(c,ty,xl,xr,gy,k){const L=xr-xl,h=36*k,y0=gy-8*k-h;
 if(ty!='bag'){c.fillStyle='rgba(255,255,255,.38)';c.fillRect(xl+3.5*k,y0+21.4*k,L-7*k,.9*k);c.fillStyle='rgba(0,0,0,.2)';c.fillRect(xl+3.5*k,y0+22.4*k,L-7*k,.7*k)}
 [xl+1.6*k,xr-6.6*k].forEach((x0,i)=>{c.fillStyle='rgba(20,28,34,.5)';c.beginPath();c.roundRect(x0,y0+7*k,5*k,26.5*k,1*k);c.fill();c.strokeStyle='rgba(255,255,255,.4)';c.lineWidth=.6*k;c.stroke();
  c.fillStyle='rgba(130,180,210,.6)';c.beginPath();c.roundRect(x0+1*k,y0+9*k,3*k,6*k,.8*k);c.fill();c.fillStyle='#cfd8dc';c.fillRect(x0+(i?.8:3.3)*k,y0+19*k,.9*k,3.4*k);
  c.fillStyle='#455a64';c.fillRect(x0+.4*k,y0+33.6*k,4.2*k,.9*k);c.fillRect(x0+.4*k,y0+36.2*k,4.2*k,.9*k)});
 c.fillStyle='#1d262b';[[.3,9],[.45,6.5],[.56,10]].forEach(q=>{c.beginPath();c.roundRect(xl+L*q[0],gy-8*k,q[1]*k,3.6*k,.8*k);c.fill();c.fillStyle='rgba(255,255,255,.14)';c.fillRect(xl+L*q[0]+.5*k,gy-7.6*k,q[1]*k-1*k,.5*k);c.fillStyle='#1d262b'});
 c.fillStyle='#37474f';c.fillRect(xl+6*k,gy-8.2*k,L-12*k,.8*k)}
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
  coachPolish(c,ty,xl,xr,gy,k);
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
 if(ty=='bis')return coach(c,'eks',xl,xr,gy,k,Object.assign({},t,{cb:'#eef3f1',c1:'#2e7d32',c2:'#2e7d32',c3:'#1b5e20'}),ng);
 if(ty=='tdu')return coach(c,'eko',xl,xr,gy,k,Object.assign({},t,{cb:'#283593',c1:'#1a237e',c2:'#ffd54f',c3:'#fff'}),ng);
 if(PV[ty]){const q=PV[ty];return coach(c,q[0],xl,xr,gy,k,Object.assign({},t,{cb:q[1],c1:q[2],c2:q[3],c3:q[4]}),ng)}
 if(ty=='kyh'||ty=='kym')return car(c,'kay',xl,xr,gy,k,Object.assign({},t,{cb:ty=='kyh'?'#2e5e3a':'#7b1f2a',c2:'#ffd54f'}),ng);
 if(ty=='pan'){coach(c,'eks',xl,xr,gy,k,Object.assign({},t,{cb:'#f7f4ee',c1:'#6a1b9a',c2:'#6a1b9a',c3:'#fdd835'}),ng);
  /* jendela panoramik lebar + kaca atap */
  c.fillStyle='#18222b';c.beginPath();c.roundRect(xl+3.5*k,y0+4*k,L-7*k,18*k,3.5*k);c.fill();const nw=3,w3=(L-14*k)/nw;for(let j=0;j<nw;j++)win(c,xl+7*k+j*w3+.8*k,y0+4.8*k,w3-1.6*k,16.4*k,ng,3*k);
  const sg=c.createLinearGradient(0,y0-2*k,0,y0+2*k);sg.addColorStop(0,'#a5d6f7');sg.addColorStop(1,'#3b6f93');c.fillStyle=sg;c.beginPath();c.roundRect(xl+9*k,y0-1.6*k,L-18*k,3.6*k,2*k);c.fill();return}
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
 const nm=t.nz==2?'MRT JAKARTA':'LRT JABODEBEK',lb={ec:[nm,.68],em:[nm,.68],eks:['EKSEKUTIF',.64],res:['RESTORASI',.64],bm:['WHOOSH',.62],bis:['BISNIS',.64],pan:['PANORAMIC',.64],tdu:['KERETA TIDUR',.64],ekp:['EKONOMI PREMIUM',.64],pre:['PREMIUM',.64],ekh:['EKONOMI',.64],klh:['KLASIK',.64],mer:['LUXURY',.64],rsm:['RESTORASI',.64],ins:['INSPEKSI',.64]}[ty];
 c.fillStyle='#fff';c.textAlign='center';c.font='bold '+4.2*k+'px sans-serif';
 if(lb&&(ty!='ec'||fr))c.fillText(lb[0],cx,y0+h*lb[1]+4*k);if(ty=='eko'){c.font='bold '+4.6*k+'px sans-serif';c.fillText('EKONOMI',cx,y0+h*.58+11*k)}
 if(fr){const p={ec:[xr-3*k,gy-14*k],cc:[xr-1.5*k,gy-21*k],bh:[xr+27*k,gy-17*k]}[ty];if(p){const g=c.createRadialGradient(p[0],p[1],0,p[0],p[1],9*k);g.addColorStop(0,'rgba(255,245,170,.6)');g.addColorStop(1,'rgba(255,245,170,0)');c.fillStyle=g;c.beginPath();c.arc(p[0],p[1],9*k,0,7);c.fill()}}}
function mkc(w,h,s){s=s||DPRv;const c=document.createElement('canvas');c.width=Math.ceil(w*s);c.height=Math.ceil(h*s);const q=c.getContext('2d');q.scale(s,s);return[c,q]}
/* kereta digambar sekali ke sprite, lalu ditempel tiap frame (roda tetap berputar) */
function drawTrain(c,t,hx,gy,k,ng){
 if(c!==x||t.k=='steam'){drawTrain0(c,t,hx,gy,k,ng);return}
 const key=TR.indexOf(t)+(S.cons&&S.cons[TR.indexOf(t)]||'')+'|'+k.toFixed(3)+'|'+ng+'|'+DPRv,tl=trLen(t)*k,pad=40*k,w=tl+pad+8*k,h=70*k;let s=SPR[key];
 if(!s){if(Object.keys(SPR).length>9)SPR={};const[cv2,q]=mkc(w,h,DPRv*1.5);REC=[];MIR=0;drawTrain0(q,t,w-pad,h-4*k,k,ng);s=SPR[key]={cv:cv2,wl:REC};REC=null;MIR=0}
 c.drawImage(s.cv,hx-(w-pad),gy-(h-4*k),w,h);s.wl.forEach(p=>wheels(c,hx+p[0]-(w-pad),gy,k,p[1],p[2],p[3]))}
const RRf=CanvasRenderingContext2D.prototype.roundRect;
function drawTrain0(...a){CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h){this.rect(x,y,w,h)};try{drawTrain1(...a)}finally{CanvasRenderingContext2D.prototype.roundRect=RRf}}
function drawTrain1(c,t,hx,gy,k,ng){
 const cr=carsOf(t),n=cr.length,tl=trLen(t)*k;let xr=hx;
 c.save();c.translate(hx-tl/2,gy+1.5*k);c.scale(1,.022);{const sg=c.createRadialGradient(0,0,0,0,0,tl/2);sg.addColorStop(0,'rgba(0,0,0,.5)');sg.addColorStop(.7,'rgba(0,0,0,.3)');sg.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=sg;c.fillRect(-tl/2,-tl/2,tl,tl)}c.restore();
 cr.forEach((ty,i)=>{const L=LEN[ty]*k,xl=xr-L,mir=i>0&&(ty=='ec'||ty=='bh'),F=fo(ty),pv=mir?xl:xr,xl2=xr-L*F;STX=pv;STF=F;
  MIR=mir?xl+xr:0;c.save();if(mir){c.translate(xl+xr,0);c.scale(-1,1)}c.translate(pv,0);c.scale(F,1);c.translate(-pv,0);PPL=!(ty=="cc"||ty=="bag"||ty=="uap"||ty=="tdr"||FR.includes(ty));car(c,ty,xl,xr,gy,k,t,ng);detail(c,ty,xl,xr,gy,k,t,ng,i==0);c.restore();STF=1;if(ty!="cc"&&ty!="uap"&&ty!="tdr"&&!FR.includes(ty)){c.fillStyle="rgba(255,255,255,.12)";c.fillRect(xl2+4*k,gy-43*k,xr-xl2-8*k,2*k)}
  if(i<n-1){c.fillStyle='#1b1b1b';c.fillRect(xl2-3*k,gy-16*k,3*k,3*k);if(ty!='cc'&&ty!='uap'&&ty!='tdr'&&!FR.includes(ty)){c.fillStyle='#151515';c.fillRect(xl2-3*k,gy-40*k,3*k,28*k);c.fillStyle='rgba(255,255,255,.12)';c.fillRect(xl2-2*k,gy-39*k,.5*k,26*k);c.fillRect(xl2-1*k,gy-39*k,.5*k,26*k)}}
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
  for(let i=0;i<7;i++){const wx=px+w*.23+i*w*.075,wg=x.createLinearGradient(0,gy-70*u,0,gy-42*u);if(TD()==2){wg.addColorStop(0,'#fff3c4');wg.addColorStop(1,'#ffb74d')}else{wg.addColorStop(0,'#78909c');wg.addColorStop(1,'#263238')}x.fillStyle=wg;x.beginPath();x.roundRect(wx,gy-70*u,12*u,28*u,[6*u,6*u,0,0]);x.fill();x.fillStyle='rgba(255,255,255,.25)';x.fillRect(wx+5.5*u,gy-68*u,1*u,26*u);x.fillStyle=sh(wl,-.25);x.fillRect(wx-1.5*u,gy-42*u,15*u,2.4*u)}}
 else if(st==1){const g=x.createLinearGradient(0,gy-100*u,0,gy-10*u);g.addColorStop(0,'#81d4fa');g.addColorStop(1,'#0277bd');x.fillStyle=g;x.fillRect(px+w*.12,gy-100*u,w*.76,90*u);x.fillStyle='rgba(255,255,255,.35)';for(let i=1;i<16;i++)x.fillRect(px+w*.12+i*w*.76/16,gy-100*u,1.2*u,90*u);x.fillStyle=rf;x.fillRect(px+w*.1,gy-106*u,w*.8,8*u)}
 else if(st==2){wall(cx-70*u,gy-62*u,140*u,52*u);x.fillStyle=rf;x.beginPath();x.moveTo(cx-84*u,gy-62*u);x.lineTo(cx-56*u,gy-86*u);x.lineTo(cx+56*u,gy-86*u);x.lineTo(cx+84*u,gy-62*u);x.fill();x.fillStyle='#5d4037';x.fillRect(cx-9*u,gy-44*u,18*u,34*u);x.fillStyle='#78909c';x.fillRect(cx-56*u,gy-50*u,22*u,16*u);x.fillRect(cx+34*u,gy-50*u,22*u,16*u)}
 else if(st==3){wall(px+w*.22,gy-62*u,w*.56,52*u);[[.18,.82,-62,-92],[.26,.74,-92,-116]].forEach(r=>{x.fillStyle=r[3]==-116?sh(rf,-.15):rf;x.beginPath();x.moveTo(px+w*r[0],gy+r[2]*u);x.lineTo(px+w*(r[0]+.06),gy+r[3]*u);x.lineTo(px+w*(r[1]-.06),gy+r[3]*u);x.lineTo(px+w*r[1],gy+r[2]*u);x.fill()});x.fillStyle='#5d4037';for(let i=0;i<6;i++)x.fillRect(px+w*.25+i*w*.1,gy-62*u,4*u,52*u)}
 else{wall(px+w*.15,gy-92*u,w*.7,82*u);wall(cx-50*u,gy-125*u,100*u,34*u);x.fillStyle=cn;x.fillRect(cx-54*u,gy-130*u,108*u,6*u);x.fillStyle='rgba(0,0,0,.15)';for(let i=0;i<14;i++)x.fillRect(px+w*.17+i*w*.046,gy-92*u,2*u,82*u);x.fillStyle='#455a64';x.fillRect(cx+60*u,gy-170*u,2*u,48*u);x.fillStyle='#e53935';x.fillRect(cx+62*u,gy-170*u,14*u,8*u);x.fillStyle='#fff';x.fillRect(cx+62*u,gy-162*u,14*u,4*u)}
 stCanopy(px,gy,w,cn);x.fillStyle='#fff';x.font='bold '+7*u+'px sans-serif';x.textAlign='left';x.fillText('JALUR 1',px+w*.02,gy-78.5*u);x.fillStyle='#455a64';x.fillStyle='#455a64';[.06,.3,.5,.7,.94].forEach(q=>x.fillRect(px+w*q,gy-80*u,4*u,70*u));
 for(let i=0;i<4;i++){const lx=px+w*(.12+i*.25);x.fillStyle='#37474f';x.fillRect(lx,gy-58*u,2*u,48*u);x.fillStyle=TD()==2?'#fff59d':'#cfd8dc';x.beginPath();x.arc(lx+1*u,gy-60*u,3*u,0,7);x.fill()}
 x.fillStyle=BD[pl];x.fillRect(cx-80*u,gy-74*u,160*u,22*u);x.strokeStyle='#fff';x.lineWidth=2;x.strokeRect(cx-80*u,gy-74*u,160*u,22*u);x.fillStyle='#fff';x.font='bold '+13*u+'px sans-serif';x.textAlign='center';x.fillText(s.nm.toUpperCase(),cx,gy-58*u);stExtra(s,px,gy,P,w,cx,pl,st)}
function stFront(s,px,gy,P,cam){const w=SP*P;if(px>W||px+w<-50)return;
 stPlat(s,px,gy,P,cam);
 stDeco(s,px,gy,P,cam);
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
function ai(dt){if(G.m=='play'&&(G.ln||laneF()>.001)){G.ai=[];G.at=8;return}const a=G.ai=G.ai||[];a.forEach(q=>q.x+=q.d*q.v*dt*(1-.55*zoneF(q.x)));
 G.ai=a.filter(q=>q.x-G.pos<1800&&q.x-G.pos>-1800);G.at=(G.at||2)-dt;
 if(G.m!='play'){G.ai=[];return}
 /* kereta komputer di jalur 2 (sisi yang sama): 'o' berpapasan, 'a' searah di depan (kita menyalip), 'b' menyalip kita dari belakang */
 if(G.at<=0&&G.ai.length<3){const i=Math.random()*TR.length|0,L=trLen(TR[i])/3.67,r=Math.random(),pv=G.v,kd=r<.5?'o':(r<.8||pv<8)?'a':'b';let x0,v,d=1;
  if(kd=='o'){d=-1;x0=G.pos+900+Math.random()*300;v=28+Math.random()*22}
  else if(kd=='a'){x0=G.pos+800+L+Math.random()*300;v=Math.max(16,pv*.45+Math.random()*10)}
  else{x0=G.pos-380;v=Math.min(92,pv+14+Math.random()*14)}
  if(!G.ai.some(q=>Math.abs(q.x-x0)<500)){G.ai.push({x:x0,v,d,i});G.at=9+Math.random()*9}else G.at=1}}
function traf2(dt){const a=G.tf=G.tf||[];a.forEach(v=>v.x+=v.v*dt);G.tf=a.filter(v=>v.x>G.pos-260&&v.x<G.pos+520);G.ts2=(G.ts2||0)-dt;
 if(G.ts2<=0&&G.tf.length<16){const l=Math.random()<.5?1:-1;G.tf.push({x:G.pos+140+Math.random()*300,v:l*(8+Math.random()*12),l,ty:['mtr','mtr','car','car','ang','trk','bus'][Math.random()*7|0],col:PAL[Math.random()*7|0]});G.ts2=Math.max(.25,1.2-G.v/80)*(.6+Math.random()*.8)}}
function farTrack(gy,P,cam){const y2=gy-24*u,y3=gy-48*u,ra=(y,xa,xb,s)=>{x.fillStyle='#6b5d4a';x.fillRect(xa,y,xb-xa,4.5*u*s);x.fillStyle='#4e342e';for(let X=xa-((cam+xa)%(10*u));X<xb;X+=10*u)x.fillRect(X,y+1*u*s,5*u,2.6*u*s);x.fillStyle='#d5dde1';x.fillRect(xa,y,xb-xa,1.4*u)};
 x.fillStyle='rgba(60,50,38,.5)';x.fillRect(0,y2+3.5*u,W,3.2*u);ra(y2,0,W,1);

 const sp=60*P;for(let i=Math.floor((cam-40)/sp);i<=Math.floor((cam+W)/sp)+1;i++){const px=i*sp-cam;x.fillStyle='#5d4037';x.fillRect(px-1.3*u,gy-92*u,2.6*u,62*u);x.fillRect(px-9*u,gy-90*u,18*u,2*u);x.strokeStyle='rgba(20,20,20,.7)';x.lineWidth=.9*u;[-7,0,7].forEach(d=>{x.beginPath();x.moveTo(px+d*u,gy-90*u);x.quadraticCurveTo(px+sp/2+d*u,gy-80*u,px+sp+d*u,gy-90*u);x.stroke()})}}
function aiTrains(gy,P,cam){const td=TD(),k=u*.92,y=gy-24*u;(G.ai||[]).forEach(q=>{const t=TR[q.i],px=q.x*P-cam,tl=trLen(t)*k;if(q.d>0?(px<-60||px-tl>W):(px+tl<-60||px>W+60))return;x.save();WPH=q.x;if(q.d<0){x.translate(px,0);x.scale(-1,1);drawTrain(x,t,0,y,k,td==2)}else drawTrain(x,t,px,y,k,td==2);WPH=null;x.restore()})}
function village(gy,cam){const par=.3;for(let i=Math.floor((cam*par-40)/230);i<=Math.floor((cam*par+W)/230);i++){const r=hs(i+130);if(r<.3)continue;const X=i*230+r*80-cam*par,w2=(X+cam*par)*.007,y=gy-50*u-40*u*(.5+.3*Math.sin(w2*3)+.2*Math.sin(w2*7.1));
 x.fillStyle=TD()==2?'#0f2a33':'#2d6a4f';
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
function flare(gy){const sx=W*.78,sy=gy*(TD()==1?.62:.27),dx=W/2-sx,dy=H/2-sy;x.save();x.globalCompositeOperation='lighter';[[.25,14,.1],[.5,24,.07],[.8,10,.12],[1.15,32,.06],[1.45,18,.08]].forEach(f=>{const px=sx+dx*f[0],py=sy+dy*f[0],r=f[1]*u,g=x.createRadialGradient(px,py,0,px,py,r);g.addColorStop(0,'rgba(255,230,170,'+f[2]+')');g.addColorStop(1,'rgba(255,230,170,0)');x.fillStyle=g;x.beginPath();x.arc(px,py,r,0,7);x.fill()});x.restore()}
function rain(gy){x.fillStyle='rgba(190,210,235,.22)';x.fillRect(0,gy+.5*u,W,2.2*u);x.fillStyle='rgba(30,45,65,.28)';x.fillRect(0,0,W,H);x.strokeStyle='rgba(205,220,235,.55)';x.lineWidth=1.1*u;x.beginPath();
 for(let i=0;i<150;i++){const sp=(700+hs(i)*300)*u,y=((hs(i+300)*H+tm*sp)%(H+40*u))-20*u,X=((hs(i)*(W+300)-y*.2)%(W+300)+W+300)%(W+300)-30,l=(10+hs(i+5)*10)*u;x.moveTo(X,y);x.lineTo(X-l*.2,y+l)}x.stroke();
 x.strokeStyle='rgba(220,230,240,.45)';x.lineWidth=u;for(let i=0;i<14;i++){const ph=(tm*2+hs(i+90))%1;x.globalAlpha=1-ph;x.beginPath();x.ellipse(hs(i+60)*W,gy+8*u+hs(i+70)*(H-gy-20*u),(2+ph*9)*u,(1+ph*2.5)*u,0,0,7);x.stroke()}x.globalAlpha=1}
function night(gy,cam){const hx=W*HXF,tl=trLen(TR[S.sel])*u;let g=x.createLinearGradient(0,gy,0,gy+18*u);g.addColorStop(0,'rgba(255,225,150,.22)');g.addColorStop(1,'rgba(255,225,150,0)');x.fillStyle=g;x.fillRect(hx-tl,gy,tl,18*u);
 x.save();x.globalCompositeOperation='lighter';for(let i=0;i<26;i++){const fx=(((hs(i)*W*1.5-cam*.9+Math.sin(tm*.7+i)*20*u)%W)+W)%W,fy=gy-24*u-hs(i+9)*70*u+Math.sin(tm*1.3+i*2)*8*u,a=.35+.65*Math.abs(Math.sin(tm*2+i)),r=7*u,q=x.createRadialGradient(fx,fy,0,fx,fy,r);q.addColorStop(0,'rgba(210,255,120,'+a+')');q.addColorStop(1,'rgba(210,255,120,0)');x.fillStyle=q;x.beginPath();x.arc(fx,fy,r,0,7);x.fill()}x.restore()}
function fgGrass(gy,cam){const g=x.createLinearGradient(0,H-60*u,0,H);g.addColorStop(0,'rgba(20,70,25,0)');g.addColorStop(1,'rgba(20,70,25,.85)');x.fillStyle=g;x.fillRect(0,H-60*u,W,60*u);
 for(let i=0;i<80;i++){const X=(((hs(i)*W*3-cam*1.3)%W)+W)%W,h=(12+hs(i+4)*24)*u,l=(hs(i+8)-.5)*10*u;x.strokeStyle=i%2?'#2e7d32':'#4caf50';x.lineWidth=1.6*u;x.beginPath();x.moveTo(X,H+2);x.quadraticCurveTo(X+l*.4,H-h*.6,X+l,H-h);x.stroke()}}
let BG,GR,VG,CL,BP,BPAT;
function buildCaches(){ck=W+'|'+H+'|'+TD();SPR={};const gy=H*.72,td=TD(),sk=SK[td];let q,g;
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
/* lapisan dunia digambar di resolusi lebih rendah (OSC) lalu ditempel melengkung ke layar: jauh lebih ringan */
let OSC=1;
function beginShear(){OSC=Math.min(DPRv,1.25);const ow=Math.ceil(cv.width*OSC/DPRv),oh=Math.ceil(cv.height*OSC/DPRv);
 if(!OFFC||OFFC.width!=ow||OFFC.height!=oh){OFFC=document.createElement('canvas');OFFC.width=ow;OFFC.height=oh;OFX=OFFC.getContext('2d')}
 OFX.setTransform(1,0,0,1,0,0);OFX.clearRect(0,Math.max(0,Math.floor((H*.72-240*u)*OSC)),OFFC.width,OFFC.height);OFX.setTransform(OSC,0,0,OSC,0,0);OFX.imageSmoothingEnabled=true;OFX.imageSmoothingQuality='low';x=OFX}
function endShear(cam,P,Ec){Ec=Ec||0;x=XM;const d=DPRv,cw=cv.width,ch=cv.height,r=OSC/d;
 x.setTransform(d,0,0,d,0,0);x.fillStyle='#2a2017';x.fillRect(0,H-110*u,W,110*u+2);
 const y0=Math.max(0,Math.floor((H*.72-240*u)*d)),hh=ch-y0,N=Math.max(8,Math.ceil(W/64));
 /* kontur = rangkaian segmen miring yang saling menyambung (tanpa anak tangga, tanpa pembulatan) */
 const off=px=>-(hillH((px/d+cam)/P)-Ec)*u*d;let sx0=0,o0=off(0);
 for(let i=1;i<=N;i++){const sx1=i==N?cw:Math.round(i*cw/N),w=sx1-sx0;if(w<=0)continue;const o1=off(sx1),m=(o1-o0)/w;
  x.setTransform(1,m,0,1,0,o0-m*sx0);x.drawImage(OFFC,sx0*r,y0*r,w*r,hh*r,sx0,y0,w,hh);sx0=sx1;o0=o1}
 x.setTransform(d,0,0,d,0,0)}
/* kamera menyesuaikan panjang kereta: ekor kereta berhenti tepat di sisi kanan tuas REM (tidak lewat) */
function camScale(){const hx=W*HXF,tl=trLen(TR[S.sel])*u;if(LIMX==null){const e=document.getElementById('lb');if(e){const r=e.getBoundingClientRect();if(r.width>0)LIMX=r.right+28}}
 const lim=LIMX==null?120:LIMX;return Math.max(.2,Math.min(1,(hx-lim)/tl))}
function draw(){const u0=u;if(ck!=W+'|'+H+'|'+TD())buildCaches();u=u0*camScale();try{draw0()}finally{u=u0}}
function draw0(){
 const t=TR[S.sel],gy=H*.72,P=3.67*u,cam=G.pos*P-W*HXF,hx=W*HXF,LF=laneF(),td=TD(),el=t.k=='krl'||t.k=='mrt'||t.k=='bullet';
 hillZones();if(ck!=W+'|'+H+'|'+TD())buildCaches();x.drawImage(BG,0,0,W,gy+2);let g;
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
 crBack(gy,P,cam);G.r.st.forEach(s=>stBack(s,s.x*P-cam,gy,P));
 G.r.sg.forEach(s=>{const px=s.x*P-cam;if(px<-40||px>W+40)return;x.fillStyle='#555';x.fillRect(px-2*u,gy-62*u,4*u,62*u);x.fillStyle='#fff';x.beginPath();x.arc(px,gy-72*u,16*u,0,7);x.fill();x.strokeStyle='#e53935';x.lineWidth=4*u;x.stroke();x.fillStyle='#111';x.font='bold '+14*u+'px sans-serif';x.textAlign='center';x.fillText(s.l,px,gy-67*u)});
 strBack(gy,P,cam);
 x.drawImage(GR,0,gy,W,H-gy+2);x.save();x.translate(-(cam%64),gy+4*u);x.fillStyle=BPAT;x.fillRect(0,0,W+64,17*u);x.restore();
 x.fillStyle='rgba(255,255,255,.1)';for(let i=0;i<40;i++)x.fillRect((((hs(i)*W*1.6-cam)%W)+W)%W,gy+8*u+hs(i+7)*(H-gy-10*u),2*u,1.5*u);
 brgWater(gy,P,cam);hwyRoad(gy,cam);brgHwy(gy,P,cam);crRoad(gy,P,cam);brgDeck(gy,P,cam);x.fillStyle='#3e2a20';for(let X=-(cam%(14*u));X<W;X+=14*u)x.fillRect(X,gy,9*u,6*u);x.fillStyle='#455a64';x.fillRect(0,gy+2*u,W,3*u);x.fillStyle='#e3e8eb';x.fillRect(0,gy,W,2.5*u);x.fillStyle='rgba(255,255,255,.18)';x.fillRect(0,gy+.4*u,W,.7*u);x.fillStyle='rgba(180,180,180,.45)';for(let i=0;i<70;i++)x.fillRect((((hs(i+11)*W*2-cam)%W)+W)%W,gy+6*u+hs(i+3)*12*u,1.8*u,1.2*u);
 if(WXV()==2){const f2=x.createLinearGradient(0,gy-220*u,0,gy+30*u);f2.addColorStop(0,'rgba(225,230,235,.75)');f2.addColorStop(1,'rgba(225,230,235,.25)');x.fillStyle=f2;x.fillRect(0,0,W,gy+30*u)}
 const bob=G.m=='play'||G.m=='menu'?(Math.sin(tm*11)*.5+.5)*Math.min(G.v/12,1.6)*u*.45:0;G.pit=(G.pit||0)+((G.m=='play'?Math.max(-.025,Math.min(.025,-(G.ac||0)*.0035)):0)-(G.pit||0))*.08;
 weselDraw(gy,P,cam);aiTrains(gy,P,cam);{const pv=hx-trLen(t)*u*.5,gl=gy-LF*LANEY*u;x.save();x.translate(pv,gl);x.rotate(G.pit||0);x.translate(-pv,-gl);drawTrain(x,t,hx,gl-bob,u*(1-.08*LF),td==2);x.restore()}if(G.kb>0)kobong(hx,gy-bob-LF*LANEY*u,t);
 G.fx=(G.fx||[]).filter(f=>tm-f.t<1.2);G.fx.forEach(f=>{const ag=tm-f.t;x.globalAlpha=1-ag/1.2;x.fillStyle="#ffd23f";x.strokeStyle="#000";x.lineWidth=3*u;x.font="bold "+17*u+"px sans-serif";x.textAlign="center";x.strokeText("+50 🪙",hx-60*u,gy-100*u-ag*45*u);x.fillText("+50 🪙",hx-60*u,gy-100*u-ag*45*u);x.globalAlpha=1});
 G.pf.forEach(p=>{if(p.a>=0)puff(p.x*P-cam,gy-LF*LANEY*u-(p.by||52)*u-p.a*40*u,(6+p.a*10)*u,.6-p.a*.3,p.cl)});
 strFront(gy,P,cam);crFront(gy,P,cam);G.r.st.forEach(s=>stFront(s,s.x*P-cam,gy,P,cam));
 hwyVeh(gy,P,cam);const Ec=hillH((hx-trLen(t)*u*.22+cam)/P);endShear(cam,P,Ec);const gyT=gy-(hillH((hx+cam)/P)-Ec)*u,gyH=gyT-LF*LANEY*u;fgGrass(gy,cam);if(WXV()==1)rain(gy);if(td==2)night(gyT,cam);if(td<2&&!WXV())flare(gy);if(td){x.fillStyle=td==1?'rgba(255,110,30,.14)':'rgba(5,10,60,.5)';x.fillRect(0,0,W,H);
  x.globalCompositeOperation='lighter';const nx=hx+(t.k=='bullet'?30:2)*u;g=x.createRadialGradient(nx,gyH-18*u,0,nx,gyH-18*u,90*u);g.addColorStop(0,'rgba(255,240,170,'+(td==2?.55:.2)+')');g.addColorStop(1,'rgba(255,240,170,0)');x.fillStyle=g;x.fillRect(nx-100*u,gyH-110*u,200*u,200*u);x.globalCompositeOperation='source-over'}
 if(td==2){const q=x.createLinearGradient(hx,0,hx+450*u,0);q.addColorStop(0,'rgba(255,245,160,.3)');q.addColorStop(1,'rgba(255,245,160,0)');x.fillStyle=q;x.beginPath();x.moveTo(hx+(t.k=='bullet'?28:0)*u,gyH-18*u);x.lineTo(hx+450*u,gyH-60*u);x.lineTo(hx+450*u,gyH+10*u);x.fill()}
 if(G.v>8){x.strokeStyle='rgba(255,255,255,.14)';x.lineWidth=1.5*u;for(let i=0;i<12;i++){const X=(((hs(i+3)*W*2-cam*1.6)%(W+300))+W+300)%(W+300)-150,Y=gy+14*u+hs(i)*(H-gy-24*u);x.beginPath();x.moveTo(X,Y);x.lineTo(X+G.v*u*(.5+hs(i+9)),Y);x.stroke()}}
 x.drawImage(VG,0,0,W,H);
 if(G.m=='play'||G.m=='pause'){sm+=(G.v*3.6-sm)*.2;$('sc').textContent=Math.floor(G.sc);$('cn').textContent=S.coin;
  const l=$('lim');l.textContent=limAt(G.pos);l.classList.toggle('ov',!!G.ov);const tl=Math.floor(G.ts||0);$('tl').textContent='⏱ '+Math.floor(tl/60)+':'+String(tl%60).padStart(2,'0');
  const s=G.r.st[G.ni];{const cw=nextCx(),ss=s?'🚉 '+s.nm+' (JALUR '+((s.ln|0)+1)+') — '+Math.max(0,Math.round(s.x+SP-5-G.pos))+' m':'🚉 Selesai!';$('nx').textContent=cw?'🚧 Perlintasan '+Math.round(cw.x-G.pos)+' m'+(cw.hn?' ✔':' — tahan KLAKSON!'):ss}
  $('tt').textContent='GAS N'+th+(G.es==2?'':G.es==1?' (starter…)':' (mesin mati)');$('eg').disabled=G.es!=0;$('gb').disabled=!canSwap();$('gb').style.display=(t.k=='loco'||t.k=='steam')?'':'none';$('ek').disabled=G.es!=2;$('lt2').style.opacity=G.es==2?1:.4;const ko=$('kobong');ko.classList.toggle('on',G.kb>0);if(G.kb>0)ko.textContent='🔥 KOBONG '+Math.ceil(G.kb)+' dtk';$('tb').textContent=em?'DARURAT':'REM B'+bk;$('kt').style.bottom=th/8*100+'%';$('kb').style.bottom=(em?1:bk/5)*100+'%';gauge(t)}}
/* shop & settings */
const bar=(l,f)=>`<div class="st"><span>${l}</span><i><u style="width:${Math.round(Math.min(1,f)*100)}%"></u></i></div>`;
let ST=0;
function shop(){$('sc2').textContent=S.coin;$('tb1').className='b sm '+(ST?'bl':'g');$('tb2').className='b sm '+(ST?'g':'bl');const g=$('grid');g.innerHTML='';
 const card=(t2,nm,sub,extra,bt0)=>{const d=document.createElement('div');d.className='cd';d.innerHTML='<canvas width="270" height="76"></canvas><b>'+nm+'</b><small>'+sub+'</small>'+extra+'<button class="b sm"></button>';
  const c=d.querySelector('canvas').getContext('2d');c.fillStyle='#8d7b68';c.fillRect(0,68,270,8);c.fillStyle='#cfd8dc';c.fillRect(0,66,270,2);drawTrain(c,t2,262,66,Math.min(1.1,245/trLen(t2)),0);g.appendChild(d);return d.querySelector('button')};
 if(ST==0)TR.forEach((t,i)=>{const lo=t.k=='loco'||t.k=='steam',t2=lo?Object.assign({},t,{pv:1,cars:t.k=='steam'?['uap','tdr']:['cc']}):t,
   bt=card(t2,t.n,lo?(t.k=='steam'?'Lokomotif uap (dijual sendiri)':'Lokomotif '+t.lv.no.slice(0,6)+' (dijual sendiri)'):t.s,bar('Kecepatan',t.v/400)+bar('Akselerasi',t.a/3.6)+bar('Rem',t.b/4.6)+bar('Pendapatan',t.m/3)),o=S.own.includes(i);
  bt.textContent=o?(S.sel==i?'✔ DIPAKAI':'PILIH'):(S.coin>=t.p?'BELI 🪙'+t.p:'🔒 🪙'+t.p);bt.className='b sm '+(o?(S.sel==i?'g':'bl'):(S.coin>=t.p?'y':''));bt.disabled=!o&&S.coin<t.p;
  bt.onclick=()=>{au();if(!o){S.coin-=t.p;S.own.push(i);ding()}S.sel=i;sv();shop()}});
 else{const lk=TR[S.sel],can=lk.k=='loco'||lk.k=='steam',lt=can?lk:TR[0];
  Object.keys(CONS).forEach(id=>{const o=cw(id),pr=CP[id],st=lt.k=='steam',t2=Object.assign({},lt,{pv:1,cars:st?['uap','tdr',...CONS[id].slice(1)]:['cc',...CONS[id]]}),use=o&&can&&S.cons[S.sel]==id,
   bt=card(t2,CN[id],CD[id]+(o?' • dimiliki':''),'');
   bt.textContent=o?(can?(use?'✔ DIPAKAI':'PAKAI'):'DIMILIKI'):(S.coin>=pr?'BELI 🪙'+pr:'🔒 🪙'+pr);bt.className='b sm '+(use?'g':o?'bl':S.coin>=pr?'y':'');bt.disabled=(!o&&S.coin<pr)||(o&&!can);
   bt.onclick=()=>{au();if(!o){S.coin-=pr;S.cw.push(id);ding()}if(can)S.cons[S.sel]=id;sv();shop()}})}}
function sets(){$('s1').textContent='🔊 Suara: '+(S.snd?'NYALA':'MATI');$('s2').textContent='🎯 Kesulitan: '+DN[S.df];$('s3').textContent='🕒 Waktu: '+TN[S.tod];$('s6').textContent='🌦 Cuaca: '+WN[S.wx||0];$('s7').textContent='📢 Pengumuman stasiun: '+(S.pa?'NYALA':'MATI')}
const on=(id,f)=>$(id).onclick=()=>{au();f()};
$('tb1').onclick=()=>{au();ST=0;shop()};$('tb2').onclick=()=>{au();ST=1;shop()};
on('bm',startGame);on('bt',()=>{shop();show('shop')});on('bs',()=>{sets();show('set')});on('sb1',toMenu);on('s5',toMenu);
on('s1',()=>{S.snd^=1;sv();sets();ding()});on('s2',()=>{S.df=(S.df+1)%3;sv();sets()});on('s3',()=>{S.tod=(S.tod+1)%4;sv();sets()});on('s6',()=>{S.wx=((S.wx||0)+1)%4;sv();sets()});on('s7',()=>{S.pa^=1;if(!S.pa)sayStop();sv();sets();ding()});
on('s4',()=>{if(confirm('Hapus semua koin, kereta, dan skor tertinggi?')){S={coin:0,own:[0],sel:0,hi:0,snd:1,df:1,tod:3,wx:3,au2:1,pa:1,cons:{},cw:['eko']};sv();sets()}});
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
/* ===== DUNIA: terowongan, jembatan, orang di stasiun, parkiran truk/mobil, dan suara stasiun ===== */

/* ---------- penempatan terowongan & jembatan di antara dua stasiun ---------- */
const TNM=['Sasaksaat','Lampegan','Notog','Wonokerto','Cipularang','Ciliwung','Bumiayu','Kebasen'],
      BNM=['Cirahong','Cisomang','Kali Progo','Bengawan','Kalibodri','Citarum','Kali Serayu','Cikubang'];
function strucs(r,a,b){r.sc=r.sc||[];const tk=[];
 r.sg.forEach(s=>{if(s.x>=a-80&&s.x<=b+80)tk.push([s.x-60,s.x+60])});
 r.cx.forEach(c=>{if(c.x>=a&&c.x<=b)tk.push([c.x-200,c.x+200])});
 tk.push([a-100,a+350],[b-1100,b+100]);
 const n=3+(Math.random()*3|0);
 for(let i=0;i<n;i++)for(let k=0;k<14;k++){
  const ty=Math.random()<.5?'tun':'brg',w=ty=='tun'?380+Math.random()*220:240+Math.random()*200,
        x0=a+350+Math.random()*Math.max(1,b-a-1450-w);
  if(x0+w>b-1100)continue;if(tk.some(q=>x0-40<q[1]&&x0+w+40>q[0]))continue;
  tk.push([x0,x0+w]);r.sc.push({k:ty,x:x0,w:Math.round(w),nm:(ty=='tun'?TNM:BNM)[Math.random()*8|0]});break}}

/* ---------- status untuk suara (di dalam terowongan / di atas jembatan) + info layar ---------- */
function envState(len){let tn=0,br=0;
 for(const q of(G.r.sc||[])){
  if(!q.t1&&q.x>G.pos&&q.x-G.pos<220){q.t1=1;toast(q.k=='tun'?'🚇 Terowongan '+q.nm+' — '+q.w+' m':'🌉 Jembatan '+q.nm+' — '+q.w+' m')}
  if(q.x>G.pos+50||q.x+q.w<G.pos-len-50)continue;
  const ov=Math.min(G.pos,q.x+q.w)-Math.max(G.pos-len,q.x);
  if(ov>0){const f=Math.min(1,ov/Math.min(len*.6,q.w*.6));if(q.k=='tun')tn=Math.max(tn,f);else br=Math.max(br,f)}}
 TUN+=(tn-TUN)*.08;BRG+=(br-BRG)*.2}

/* ---------- TEROWONGAN ---------- */
const TIH=84;
function domeH(X,m0,m1,mH,sd){const t=Math.max(0,Math.min(1,(X-m0)/(m1-m0)));return Math.pow(Math.sin(Math.PI*t),.5)*mH*(.9+.1*Math.sin(t*11+sd))}
function domeP(m0,m1,gy,mH,sd){x.beginPath();x.moveTo(m0,gy+4*u);for(let X=m0;X<m1;X+=14*u)x.lineTo(X,gy+4*u-domeH(X,m0,m1,mH,sd));x.lineTo(m1,gy+4*u);x.closePath()}
function domeFill(m0,m1,gy,mH,sd){const g=x.createLinearGradient(0,gy-mH,0,gy+4*u);g.addColorStop(0,'#8fb56c');g.addColorStop(.4,'#5f8c49');g.addColorStop(1,'#3a5834');domeP(m0,m1,gy,mH,sd);x.fillStyle=g;x.fill()}
function tunBack(q,gy,P,cam){const px0=q.x*P-cam,px1=(q.x+q.w)*P-cam;if(px1<-150*u||px0>W+150*u)return;
 const m0=px0-90*u,m1=px1+90*u,mH=160*u,ih=TIH*u;
 domeFill(m0,m1,gy,mH,q.x);x.strokeStyle='rgba(255,255,255,.18)';x.lineWidth=1.5;x.stroke();
 for(const row of[1,.62]){for(let X=m0+20*u,i=0;X<m1-10*u;X+=32*u,i++){if(X<-40||X>W+40)continue;
  const by=gy+4*u-domeH(X,m0,m1,mH,q.x)*row;if(by>gy-ih-10*u)continue;const r2=(9+hs(i+q.x+row*9)*8)*u;
  x.fillStyle=hs(i+q.x*2+row)<.5?'#2e7d32':'#3f9a3f';x.beginPath();x.ellipse(X,by+2*u,r2*1.2,r2,0,Math.PI,0);x.fill()}}
 /* bagian dalam terowongan */
 const g=x.createLinearGradient(0,gy-ih,0,gy+4*u);g.addColorStop(0,'#04060a');g.addColorStop(1,'#222a31');x.fillStyle=g;x.fillRect(px0,gy-ih,px1-px0,ih+6*u);
 x.fillStyle='rgba(255,255,255,.045)';for(let X=px0+30*u;X<px1;X+=64*u)x.fillRect(X,gy-ih,3*u,ih);
 x.fillStyle='#5a4b3c';x.fillRect(px0,gy-24*u,px1-px0,4.5*u);x.fillStyle='#aab4ba';x.fillRect(px0,gy-24*u,px1-px0,1.4*u)}
function tunFront(q,gy,P,cam){const px0=q.x*P-cam,px1=(q.x+q.w)*P-cam;if(px1<-150*u||px0>W+150*u)return;
 const m0=px0-90*u,m1=px1+90*u,mH=160*u,ih=TIH*u,tw=px1-px0+50*u,f=Math.min(.45,70*u/tw);
 /* kereta jadi gelap saat masuk terowongan */
 let g=x.createLinearGradient(px0-25*u,0,px1+25*u,0);g.addColorStop(0,'rgba(0,0,14,0)');g.addColorStop(f,'rgba(0,0,14,.55)');g.addColorStop(1-f,'rgba(0,0,14,.55)');g.addColorStop(1,'rgba(0,0,14,0)');
 x.fillStyle=g;x.fillRect(px0-25*u,gy-ih,tw,ih+10*u);
 /* lampu terowongan */
 for(let X=px0+40*u;X<px1-20*u;X+=80*u){if(X<-60||X>W+60)continue;x.fillStyle='#ffe9a8';x.fillRect(X-6*u,gy-ih+2*u,12*u,2.6*u);
  x.save();x.globalCompositeOperation='lighter';const rg=x.createRadialGradient(X,gy-ih+4*u,0,X,gy-ih+4*u,46*u);rg.addColorStop(0,'rgba(255,225,150,.32)');rg.addColorStop(1,'rgba(255,225,150,0)');x.fillStyle=rg;x.fillRect(X-50*u,gy-ih,100*u,70*u);x.restore()}
 /* atap batu menutup asap & pantograf */
 x.save();x.beginPath();x.rect(px0,gy-400*u,px1-px0,400*u-ih);x.clip();domeFill(m0,m1,gy,mH,q.x);x.restore();
 x.fillStyle='#8a8f93';x.fillRect(px0-9*u,gy-ih-5*u,px1-px0+18*u,5*u);x.fillStyle='rgba(255,255,255,.25)';x.fillRect(px0-9*u,gy-ih-5*u,px1-px0+18*u,1.4*u);
 /* gerbang batu di kedua ujung */
 [px0-10*u,px1].forEach((X,i)=>{const sg=x.createLinearGradient(X,0,X+10*u,0);sg.addColorStop(0,'#c1b8a8');sg.addColorStop(1,'#8c8374');x.fillStyle=sg;x.fillRect(X,gy-ih-5*u,10*u,ih+9*u);
  x.fillStyle='rgba(0,0,0,.22)';for(let j=0;j<8;j++)x.fillRect(X,gy-ih+j*11*u,10*u,1.2*u);
  x.fillStyle='#a49a89';x.fillRect(X-3*u,gy-ih-9*u,16*u,5*u)});
 /* papan nama */
 if(px0>-300*u&&px0<W+60*u){const bw=150*u;x.fillStyle='#0d47a1';x.fillRect(px0+8*u,gy-ih-34*u,bw,22*u);x.strokeStyle='#fff';x.lineWidth=1.5*u;x.strokeRect(px0+8*u,gy-ih-34*u,bw,22*u);
  x.fillStyle='#fff';x.textAlign='center';x.font='bold '+6.5*u+'px sans-serif';x.fillText('TEROWONGAN '+q.nm.toUpperCase(),px0+8*u+bw/2,gy-ih-24*u);x.font=6*u+'px sans-serif';x.fillText(q.w+' meter',px0+8*u+bw/2,gy-ih-16*u)}}

/* ---------- JEMBATAN ---------- */
function brgBack(q,gy,P,cam){const bx0=q.x*P-cam,bx1=(q.x+q.w)*P-cam;if(bx1<-60*u||bx0>W+60*u)return;
 /* sungai di belakang rel */
 let g=x.createLinearGradient(0,gy-12*u,0,gy);g.addColorStop(0,'#6ab7d6');g.addColorStop(1,'#3d9bc2');x.fillStyle=g;x.fillRect(bx0,gy-12*u,bx1-bx0,12*u+1);
 x.fillStyle='rgba(255,255,255,.3)';for(let i=0;i<8;i++){const X=bx0+(((hs(i+q.x)*(bx1-bx0)+tm*14)%(bx1-bx0)+(bx1-bx0))%(bx1-bx0));x.fillRect(X,gy-10*u+hs(i+4)*8*u,Math.min(18*u,bx1-X),1.2*u)}
 /* rangka busur baja di belakang kereta */
 const A=104*u,yb=gy-4*u,L=bx1-bx0,ar=t=>yb-A*Math.sin(Math.PI*t);
 x.strokeStyle='#465a64';x.lineWidth=1.8*u;for(let X=bx0+30*u;X<bx1-10*u;X+=30*u){if(X<-20||X>W+20)continue;const t=(X-bx0)/L;x.beginPath();x.moveTo(X,ar(t));x.lineTo(X,yb);x.stroke()}
 x.lineCap='round';x.strokeStyle='#37474f';x.lineWidth=7*u;x.beginPath();for(let i=0;i<=40;i++){const X=bx0+L*i/40;i?x.lineTo(X,ar(i/40)):x.moveTo(X,ar(0))}x.stroke();
 x.strokeStyle='#90a4ae';x.lineWidth=4*u;x.stroke();x.lineCap='butt'}
function brgWater(gy,P,cam){for(const q of G.r.sc||[]){if(q.k!='brg')continue;const bx0=q.x*P-cam,bx1=(q.x+q.w)*P-cam;if(bx1<-60*u||bx0>W+60*u)continue;
  const L=bx1-bx0,g=x.createLinearGradient(0,gy,0,H);g.addColorStop(0,'#3d9bc2');g.addColorStop(.5,'#1f6f98');g.addColorStop(1,'#144a6a');x.fillStyle=g;x.fillRect(bx0,gy,L,H-gy+2);
  x.fillStyle='rgba(255,255,255,.24)';for(let i=0;i<16;i++){const yy=gy+8*u+hs(i+q.x)*(H-gy-16*u),X=bx0+(((hs(i+3+q.x)*L+tm*(16+i*2))%L)+L)%L;x.fillRect(X,yy,Math.min((16+hs(i)*28)*u,bx1-X),1.4*u)}
  /* tepi sungai */
  x.fillStyle='#8a8070';x.fillRect(bx0-9*u,gy,9*u,H-gy+2);x.fillRect(bx1,gy,9*u,H-gy+2);x.fillStyle='#b3a994';x.fillRect(bx0-9*u,gy,2*u,H-gy+2);x.fillRect(bx1,gy,2*u,H-gy+2);
  /* pilar jembatan */
  const n=Math.max(1,Math.round(L/(150*u)));for(let i=1;i<=n;i++){const X=bx0+L*i/(n+1);if(X<-30||X>W+30)continue;
   const pg=x.createLinearGradient(X-7*u,0,X+7*u,0);pg.addColorStop(0,'#cfd3d6');pg.addColorStop(1,'#7d8387');x.fillStyle=pg;x.fillRect(X-7*u,gy+14*u,14*u,70*u);
   x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.ellipse(X,gy+72*u,16*u,3*u,0,0,7);x.fill();x.fillStyle='rgba(0,0,0,.18)';x.fillRect(X-7*u,gy+60*u,14*u,2*u)}}}
function brgHwy(gy,P,cam){const y1=gy+80*u,hh=34*u;for(const q of G.r.sc||[]){if(q.k!='brg')continue;const bx0=q.x*P-cam-9*u,bx1=(q.x+q.w)*P-cam+9*u;if(bx1<-60||bx0>W+60)continue;
  x.fillStyle='#bdbdbd';x.fillRect(bx0,y1-4*u,bx1-bx0,4*u);x.fillRect(bx0,y1+hh,bx1-bx0,4*u);x.fillStyle='#9e9e9e';for(let X=bx0;X<bx1;X+=24*u)x.fillRect(X,y1-4*u,2*u,4*u)}}
function brgDeck(gy,P,cam){for(const q of G.r.sc||[]){if(q.k!='brg')continue;const bx0=q.x*P-cam-6*u,bx1=(q.x+q.w)*P-cam+6*u;if(bx1<-60||bx0>W+60)continue;
  const g=x.createLinearGradient(0,gy+3*u,0,gy+16*u);g.addColorStop(0,'#78909c');g.addColorStop(1,'#37474f');x.fillStyle=g;x.fillRect(bx0,gy+3*u,bx1-bx0,13*u);
  x.strokeStyle='rgba(15,25,30,.75)';x.lineWidth=1.3*u;x.beginPath();for(let X=bx0;X<bx1;X+=16*u){if(X<-20||X>W+20)continue;x.moveTo(X,gy+5*u);x.lineTo(X+16*u,gy+15*u);x.moveTo(X+16*u,gy+5*u);x.lineTo(X,gy+15*u)}x.stroke();
  x.fillStyle='#b0bec5';x.fillRect(bx0,gy+3*u,bx1-bx0,1.6*u);x.fillStyle='#1c262b';x.fillRect(bx0,gy+14.5*u,bx1-bx0,2*u)}}
/* hook dari draw0 */
function strBack(gy,P,cam){for(const q of G.r.sc||[]){if(q.k=='tun')tunBack(q,gy,P,cam);else brgBack(q,gy,P,cam)}}
function strFront(gy,P,cam){for(const q of G.r.sc||[])if(q.k=='tun')tunFront(q,gy,P,cam)}

/* ---------- ORANG ---------- */
const SKC=['#f6d2b0','#e0ac80','#c08a5e','#8d5b3d'],TOP=['#e53935','#1e88e5','#43a047','#fdd835','#8e24aa','#fb8c00','#eceff1','#00897b','#6d4c41'],
      BOT=['#263238','#37474f','#1a237e','#3e2723','#455a64'],HJB=['#f8bbd0','#ffffff','#b39ddb','#80cbc4','#ffcc80','#37474f'];
/* satu orang, tampak samping. by = kaki; s = skala; o = {d:arah, wk:fase jalan, sit, ch(anak), off(petugas), fl(bendera), vd(pedagang), sc(koper), bp(ransel)} */
function pers(X,by,s,sd,o){o=o||{};if(X<-40||X>W+40)return;
 const r=n=>hs(sd*91.7+n*7.3),ch=!!o.ch,k=ch?.68:1,sk=SKC[r(1)*4|0],tp=o.tp||TOP[r(2)*9|0],bt=o.bt||BOT[r(3)*5|0],
  hj=o.hj!=null?o.hj:r(4)<.4,pc=!hj&&!ch&&!o.off&&r(8)<.2,sw=o.wk?Math.sin(o.wk*6.28):0,sit=!!o.sit;
 x.save();x.translate(X,by);x.scale((o.d||1)*s*k,s*k);x.lineCap='round';
 x.fillStyle='rgba(0,0,0,.26)';x.beginPath();x.ellipse(0,0,7,1.8,0,0,7);x.fill();
 if(!sit&&!o.off&&(o.bp||r(5)<.28)){x.fillStyle=sh(TOP[r(9)*9|0],-.15);x.fillRect(-8,-23,5,11)}
 if(sit){x.fillStyle=bt;x.fillRect(-3,-11,10,3.4);x.fillRect(5,-11,3.2,11);x.fillStyle='#212121';x.fillRect(5,-1.6,5,1.6)}
 else if(hj&&!ch){x.fillStyle=bt;x.beginPath();x.moveTo(-4.2,-12);x.lineTo(4.2,-12);x.lineTo(5.4,-1.2);x.lineTo(-5.4,-1.2);x.fill();x.fillStyle='#212121';x.fillRect(-4+sw*2,-1.4,3.4,1.4);x.fillRect(.6-sw*2,-1.4,3.4,1.4)}
 else{x.fillStyle=bt;x.fillRect(-3.4+sw*2.4,-12,3.2,11);x.fillRect(.2-sw*2.4,-12,3.2,11);x.fillStyle='#212121';x.fillRect(-3.8+sw*2.4,-1.6,4.4,1.6);x.fillRect(-.2-sw*2.4,-1.6,4.4,1.6)}
 if(sit)x.translate(0,2);
 /* koper / kotak dagangan */
 if(o.sc||(!sit&&!o.off&&!o.vd&&r(6)<.3)){x.fillStyle=['#37474f','#b71c1c','#1565c0','#6d4c41'][r(7)*4|0];x.fillRect(3.2,-12,9,8);x.fillStyle='#212121';x.fillRect(5.5,-13.4,4,1.4)}
 if(o.vd){x.fillStyle='#8d6e63';x.fillRect(4,-17,12,8);x.fillStyle='#ffeb3b';x.fillRect(5,-19,3,2);x.fillStyle='#e53935';x.fillRect(9,-19.4,3,2.4);x.fillStyle='#43a047';x.fillRect(13,-19,2.4,2)}
 /* badan */
 x.fillStyle=tp;x.fillRect(-4.6,-23.5,9.2,13);
 if(o.off&&!o.ppka){x.fillStyle='#ff8f00';x.fillRect(-4.6,-22,9.2,2.6);x.fillRect(-4.6,-17,9.2,2.2)}
 if(o.vest){x.fillStyle=o.vest;x.fillRect(-4.6,-23.5,9.2,13);x.fillStyle='#fff59d';x.fillRect(-4.6,-20.2,9.2,1.2);x.fillRect(-4.6,-15.6,9.2,1.2);x.fillStyle='#263238';x.fillRect(-.6,-23.5,1.2,13)}
 if(o.ppka){x.fillStyle='#ffd54f';x.fillRect(-4.6,-23.5,3,1.3);x.fillRect(1.6,-23.5,3,1.3);x.fillStyle='#b71c1c';x.fillRect(-4.6,-18,9.2,1.6);x.fillStyle='#263238';x.fillRect(-.5,-22.5,1,5.5)}
 if(o.rad){x.fillStyle='#111';x.fillRect(1.6,-21,2.2,3.4);x.fillStyle='#78909c';x.fillRect(2.4,-22.4,.6,1.4)}
 /* lengan */
 x.strokeStyle=tp;x.lineWidth=2.8;
 x.beginPath();x.moveTo(-3.8,-21.5);if(o.wh)x.lineTo(1.2,-26.2);else x.lineTo(-4.4+sw*3,-13.5);x.stroke();
 if(o.fl){x.beginPath();x.moveTo(3.8,-21.5);x.lineTo(7.4,-29);x.stroke();x.strokeStyle='#78909c';x.lineWidth=1;x.beginPath();x.moveTo(7.4,-29);x.lineTo(7.4,-41);x.stroke();x.fillStyle=typeof o.fl=='string'?o.fl:'#43a047';const fw=Math.sin(tm*7)*1.3;x.beginPath();x.moveTo(7.4,-41);x.lineTo(15.4,-41+fw);x.lineTo(15.4,-35.5+fw);x.lineTo(7.4,-35.5);x.fill()}
 else if(o.up){x.beginPath();x.moveTo(3.8,-21.5);x.lineTo(6.8,-30.5+Math.sin(tm*5)*1.2);x.stroke()}
 else{x.beginPath();x.moveTo(3.8,-21.5);x.lineTo(4.4-sw*3,-13.5);x.stroke()}
 x.fillStyle=sk;x.beginPath();x.arc(o.wh?1.2:-4.4+sw*3,o.wh?-26.2:-13,1.5,0,7);x.fill();if(o.up){x.beginPath();x.arc(6.8,-31.4+Math.sin(tm*5)*1.2,1.8,0,7);x.fill()}else if(!o.fl){x.beginPath();x.arc(4.4-sw*3,-13,1.5,0,7);x.fill()}
 if(o.broom){x.strokeStyle='#8d6e63';x.lineWidth=1.2;const bs=Math.sin(tm*4)*3;x.beginPath();x.moveTo(5+bs,-24);x.lineTo(7+bs*.3,-1);x.stroke();x.fillStyle='#fbc02d';x.fillRect(4+bs*.4,-3.2,6,3.2)}
 /* kepala */
 x.fillStyle=sk;x.beginPath();x.arc(0,-28,4.1,0,7);x.fill();
 if(hj){x.fillStyle=HJB[r(10)*6|0];x.beginPath();x.arc(0,-28.2,4.9,Math.PI*.95,Math.PI*2.05);x.lineTo(5.2,-21.8);x.lineTo(-5.2,-21.8);x.closePath();x.fill();x.fillStyle=sk;x.beginPath();x.ellipse(.9,-27.4,2.7,3.1,0,0,7);x.fill()}
 else{x.fillStyle=o.hair||'#1c1410';x.beginPath();x.arc(0,-28.4,4.3,Math.PI,0);x.fill();x.fillRect(-4.3,-28.6,2.2,2.6)}
 if(pc){x.fillStyle='#111';x.fillRect(-3.9,-33.4,7.8,2.8)}
 if(o.cap){x.fillStyle=o.cap;x.fillRect(-4.6,-33.6,9.2,3.4);x.fillRect(-1,-31,7,1.4);if(o.band){x.fillStyle=o.band;x.fillRect(-4.6,-31.6,9.2,.9);x.fillRect(-1,-32.4,2,1.1)}}
 if(o.wh){x.fillStyle='#cfd8dc';x.fillRect(1.6,-27.6,3.4,1.9);x.fillStyle='#78909c';x.fillRect(1.6,-26.2,3.4,.6);x.strokeStyle='rgba(255,255,255,.85)';x.lineWidth=.7;for(let i=0;i<3;i++){const q=(tm*2.2+i/3)%1;x.globalAlpha=1-q;x.beginPath();x.arc(5,-26.7,2+q*7,-.9,.9);x.stroke()}x.globalAlpha=1}
 if(o.tag){x.save();x.scale(o.d||1,1);x.font='bold 6.4px sans-serif';x.textAlign='center';const tw=x.measureText(o.tag).width+5;x.fillStyle='rgba(15,25,40,.82)';x.fillRect(-tw/2,-45.5,tw,8.4);x.fillStyle=o.tc||'#ffd54f';x.fillText(o.tag,0,-39);x.restore()}
 x.restore()}
function bench(X,by,s){if(X<-60||X>W+60)return;x.save();x.translate(X,by);x.scale(s,s);x.fillStyle='#37474f';x.fillRect(-14,-9,2,9);x.fillRect(12,-9,2,9);x.fillStyle='#8d6e63';x.fillRect(-16,-10.6,32,3);
 x.fillStyle='#6d4c41';x.fillRect(-16,-21,32,2.4);x.fillRect(-16,-16,32,2.4);x.fillRect(-14,-21,1.8,10.4);x.fillRect(12,-21,1.8,10.4);x.restore()}
function kiosk(X,by,s,col,txt){if(X<-90||X>W+90)return;x.save();x.translate(X,by);x.scale(s,s);
 x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(0,0,26,3,0,0,7);x.fill();
 x.fillStyle=col;x.fillRect(-22,-27,44,27);x.fillStyle='rgba(0,0,0,.2)';x.fillRect(-22,-8,44,8);x.fillStyle='#ffe0b2';x.fillRect(-18,-21,24,10);x.fillStyle='#37474f';x.fillRect(-18,-12,24,2.4);
 [['#ffeb3b',-16],['#e53935',-11],['#43a047',-6],['#1e88e5',-1]].forEach(q=>{x.fillStyle=q[0];x.fillRect(q[1],-19,3.6,6)});
 for(let i=0;i<8;i++){x.fillStyle=i%2?'#fff':'#c62828';x.beginPath();x.moveTo(-26+i*6.5,-27);x.lineTo(-19.5+i*6.5,-27);x.lineTo(-21+i*6.5,-21);x.lineTo(-27.5+i*6.5,-21);x.fill()}
 x.fillStyle='#fff';x.font='bold 6px sans-serif';x.textAlign='center';x.fillText(txt,12,-14);x.restore()}
function troli(X,by,s,sd){if(X<-60||X>W+60)return;x.save();x.translate(X,by);x.scale(s,s);x.fillStyle='#455a64';x.fillRect(-14,-9,28,2.6);x.fillRect(-14,-24,2,16);x.fillStyle='#212121';x.beginPath();x.arc(-9,-3.4,3,0,7);x.arc(9,-3.4,3,0,7);x.fill();
 [['#b71c1c',-12,-18,12,9],['#1565c0',1,-16,11,7],['#6d4c41',-9,-25,13,7]].forEach(q=>{x.fillStyle=q[0];x.fillRect(q[1],q[2],q[3],q[4])});x.restore()}
function lampP(X,by){if(X<-30||X>W+30)return;x.fillStyle='#455a64';x.fillRect(X-1*u,by-52*u,2*u,52*u);x.fillRect(X-1*u,by-52*u,9*u,2*u);x.fillStyle=TD()==2?'#fff59d':'#cfd8dc';x.beginPath();x.arc(X+8*u,by-49*u,2.8*u,0,7);x.fill();if(TD()==2)puff(X+8*u,by-48*u,26*u,.4,'255,235,150')}

/* ---------- PARKIRAN: mobil, angkot, truk, bus, motor ---------- */
function stLot(s,px,gy,P){const w=SP*P,y0=gy+27*u,y1=gy+76*u,r=n=>hs(s.x*.137+n*5.3);
 x.fillStyle='#cfc8ba';x.fillRect(px,gy+21*u,w,6*u);x.fillStyle='#a39a8b';x.fillRect(px,gy+26*u,w,1.5*u);
 const g=x.createLinearGradient(0,y0,0,y1);g.addColorStop(0,'#5b6167');g.addColorStop(1,'#3b4046');x.fillStyle=g;x.fillRect(px+w*.03,y0+1.5*u,w*.94,y1-y0);x.fillStyle='#e0e0e0';x.fillRect(px+w*.03,y1-1.5*u,w*.94,1.5*u);
 [[gy+48*u,.78,74],[gy+71*u,.95,88]].forEach((row,ri)=>{const pitch=row[2]*u,n=Math.floor(w*.94/pitch);
  for(let i=0;i<n;i++){const X0=px+w*.03+i*pitch,cx=X0+pitch/2;if(cx<-90||cx>W+90)continue;
   x.fillStyle='rgba(255,255,255,.55)';x.fillRect(X0,row[0]-15*u,1.3*u,15*u);
   const q=r(ri*100+i);if(q<.3)continue;
   const ty=q<.46?'car':q<.58?'ang':q<.7?'mtr':q<.82?'trk':q<.92?'bus':'car';
   sveh(cx,row[0]-2*u,row[1]*u,ty,PAL[(r(ri*100+i+50)*7)|0],r(ri*100+i+70)<.5?1:-1)}});
 for(let j=0;j<4;j++)lampP(px+w*(.1+.27*j),gy+27*u);
 /* rambu parkir */
 const sx=px+w*.035;if(sx>-40&&sx<W+40){x.fillStyle='#78909c';x.fillRect(sx-1*u,gy-4*u,2*u,31*u);x.fillStyle='#1565c0';x.fillRect(sx-9*u,gy-22*u,18*u,18*u);x.fillStyle='#fff';x.font='bold '+14*u+'px sans-serif';x.textAlign='center';x.fillText('P',sx,gy-8*u)}}

/* ---------- ORANG DI PERON ---------- */
const tri=t=>{const p=((t%2)+2)%2;return p<1?p:2-p};
function stPeople(s,px,gy,P){const w=SP*P,r=n=>hs(s.x*.173+n*3.7),sc=u*.95,cur=s===G.r.st[G.ni-1]&&G.dw>0,wb=cur&&s.wst&&(s.wt||0)<(s.wd||2.6),mx=px+w*.9886,tlp=trLen(TR[S.sel])*u;
 /* bangku + penumpang duduk, warung, troli kuli */
 for(let i=0;i<3;i++){const X=px+w*(.13+i*.3+r(i+50)*.05);bench(X,gy+17*u,sc);
  if(r(i+60)<.7)pers(X-7*u,gy+17.5*u,sc,r(i+70),{sit:1,d:1});if(r(i+80)<.55)pers(X+7*u,gy+17.5*u,sc,r(i+90),{sit:1,d:-1})}
 kiosk(px+w*.5,gy+19*u,sc,'#c62828','WARUNG');
 troli(px+w*.7,gy+19*u,sc);pers(px+w*.7+22*u,gy+19*u,sc,.58,{tp:'#ff6f00',d:-1,wk:0,bp:0,hj:false});
 /* penumpang menunggu (dua baris supaya ada kesan kedalaman) */
 const nW=12;
 for(let pass=0;pass<2;pass++)for(let i=0;i<nW;i++){const ps=r(i+2)<.5?0:1;if(ps!=pass)continue;
  const grp=i>0&&i%2==1&&r(i+30)<.7;let X=px+w*(.05+.9*r(i*2+1));if(grp)X=px+w*(.05+.9*r((i-1)*2+1))+(i%4<2?15:-15)*u;
  let by=gy+(ps?19.5:14.5)*u,al=1;const d=grp?(i%4<2?-1:1):(r(i+9)<.5?1:-1);
  if(s.done){if(i<3&&!cur){/* sisa orang yang tidak naik */}
   else if(!cur)continue;else if(i>=3){const q=(3-G.dw)-(i-3)/9*2.3;if(q>.5)continue;if(q>0){al=1-q/.5;by-=q/.5*8*u}}}
  if(X<-40||X>W+40)continue;x.globalAlpha=al;pers(X,by+Math.sin(tm*1.6+i)*.3*u,sc*(ps?1.04:.94),r(i+11),{d,ch:r(i+13)<.16,bp:r(i+15)<.3,sc:r(i+17)<.35});x.globalAlpha=1}
 /* penumpang yang turun berjalan menuju pintu keluar */
 if(s.arr!=null){const t=tm-s.arr;if(t<16)for(let i=0;i<9;i++){const t0=.6+i*.28;if(t<t0)continue;const X=mx-(.08+.84*r(i+40))*tlp-(t-t0)*32*u;if(X<px+w*.03)continue;
  pers(X,gy+(i%2?18.5:15)*u,sc,r(i+41),{d:-1,wk:tm*1.5+i,ch:r(i+42)<.15,sc:r(i+43)<.5,bp:r(i+44)<.3})}}
 /* petugas dengan bendera, pedagang asongan, satpam */
 /* petugas PPKA, pengawas peron (Polsuska), petugas naik-turun penumpang, kebersihan & satpam */
 const dd=s.x+SP-5-G.pos,appr=!s.done&&dd<1600&&dd>-40;
 /* PPKA di tiang STOP: semboyan merah saat kereta berhenti, hijau saat boleh berangkat */
 pers(px+w*.972,gy+19.5*u,sc,.31,{off:1,ppka:1,tp:'#f4f6f7',bt:'#1a2a4a',cap:'#d32f2f',band:'#ffd54f',fl:wb?'#43a047':(cur&&G.dw>0)?'#e53935':'#43a047',wh:wb,d:-1,hj:false,hair:'#222',tag:'PPKA',rad:1});
 /* PPKA kedua di depan ruang PPKA */
 pers(px+w*.3+34*u,gy+19.5*u,sc,.67,{off:1,ppka:1,tp:'#f4f6f7',bt:'#1a2a4a',cap:'#d32f2f',band:'#ffd54f',d:-1,hj:false,hair:'#222',rad:1});
 /* satpam */
 pers(px+w*.06,gy+19.5*u,sc,.44,{off:1,tp:'#33691e',bt:'#2e3b24',cap:'#2e3b24',d:1,hj:false,tag:'SATPAM',tc:'#c5e1a5',rad:1});
 /* pengawas peron / Polsuska: berpatroli di garis kuning; saat kereta mendekat berdiri sambil memberi isyarat "mundur" */
 [[.04,.42,.011,'POLSUSKA'],[.40,.78,.009,'PENGAWAS'],[.58,.96,.013,null]].forEach((q,n)=>{const ph=tm*q[2]+r(150+n)*2,tt=tri(ph),dr=(((ph%2)+2)%2)<1?1:-1,
  X=appr?px+w*(q[0]+(q[1]-q[0])*(.3+.4*n/2)):px+w*(q[0]+(q[1]-q[0])*tt);
  pers(X,gy+11.5*u,sc,.2+n*.17,{off:1,vest:'#ff8f00',tp:'#1a2a4a',bt:'#1a2a4a',cap:'#1a2a4a',hj:false,hair:'#222',d:appr?(n%2?-1:1):dr,up:appr,wk:appr?0:tm*1.4+n,tag:q[3],rad:1,tc:'#ffcc80'})});
 /* petugas yang membantu penumpang naik/turun saat kereta berhenti */
 if(cur){for(let i=0;i<4;i++)pers(mx-(.1+.23*i)*tlp,gy+12.5*u,sc,.3+i*.11,{off:1,vest:'#1565c0',tp:'#0d2f66',bt:'#0d2f66',cap:'#0d2f66',hj:false,d:i%2?1:-1,up:i!=2,tag:i==0?'PETUGAS':null,rad:i==1})}
 /* petugas kebersihan menyapu peron */
 {const ph=tm*.006+r(160);pers(px+w*(.16+.22*tri(ph)),gy+15*u,sc,.91,{off:1,tp:'#ff6f00',bt:'#37474f',cap:'#ff6f00',broom:1,hj:false,d:(((ph%2)+2)%2)<1?1:-1,wk:tm*.9})}

 {const ph=tm*.018+r(120),X=px+w*(.2+.55*tri(ph)),d=(((ph%2)+2)%2)<1?1:-1;pers(X,gy+16.5*u,sc,.77,{vd:1,tp:'#ffeb3b',d,wk:tm*1.3,hj:false,cap:'#e53935'})}
 /* pejalan kaki di trotoar */
 for(let i=0;i<4;i++){const ph=tm*(.02+.02*r(i+130))+r(i+121),X=px+w*(.06+.88*tri(ph)),d=(((ph%2)+2)%2)<1?1:-1;
  pers(X,gy+25*u,sc,r(i+122),{wk:tm*1.2+i,d,sc:i%2==0,bp:i==1,ch:i==3})}}
function stDeco(s,px,gy,P,cam){stLot(s,px,gy,P);stGarden(s,px,gy,P);stPeople(s,px,gy,P);stProps(s,px,gy,P);stGlow(s,px,gy,P)}
/* ---------- PERCANTIK STASIUN ---------- */
/* lapisan belakang: motif batik kawung di fasia kanopi, rumbai hias, tanaman gantung, pengeras suara, plat KM stasiun */
function stBeauty(s,px,gy,P,w,cx,pl){const x0=px-6*u,ww=w+12*u,a0=Math.max(x0,-30),a1=Math.min(x0+ww,W+30),kw=7*u,cn=PL[pl][2];
 x.fillStyle='rgba(255,213,79,.6)';for(let X=x0+Math.ceil((a0-x0)/kw)*kw;X<a1;X+=kw){x.beginPath();x.moveTo(X,gy-83.2*u);x.lineTo(X+kw*.3,gy-80.5*u);x.lineTo(X,gy-77.8*u);x.lineTo(X-kw*.3,gy-80.5*u);x.fill()}
 x.fillStyle=sh(cn,-.1);for(let X=x0+Math.ceil((a0-x0)/(6*u))*6*u;X<a1;X+=6*u){x.beginPath();x.moveTo(X,gy-77*u);x.lineTo(X+6*u,gy-77*u);x.lineTo(X+3*u,gy-73.6*u);x.fill()}
 [.1,.44,.56,.9].forEach((q,i)=>{const X=px+w*q;if(X<-30||X>W+30)return;const sw=Math.sin(tm*1.1+i*1.7)*.8*u;x.strokeStyle='#455a64';x.lineWidth=.6*u;x.beginPath();x.moveTo(X-2.4*u,gy-75*u);x.lineTo(X+sw-2*u,gy-68*u);x.moveTo(X+2.4*u,gy-75*u);x.lineTo(X+sw+2*u,gy-68*u);x.stroke();
  x.fillStyle='#bf6b3a';x.beginPath();x.arc(X+sw,gy-68*u,3*u,0,Math.PI);x.fill();x.strokeStyle='#388e3c';x.lineWidth=1*u;
  for(let k=-2;k<=2;k++){x.beginPath();x.moveTo(X+sw+k*1.3*u,gy-69*u);x.quadraticCurveTo(X+sw+k*2.6*u,gy-66*u,X+sw+k*3*u,gy-62.5*u-Math.abs(k)*.6*u);x.stroke()}
  x.fillStyle=i%2?'#ec407a':'#ffb300';[-2.5,0,2.5].forEach(k=>{x.beginPath();x.arc(X+sw+k*u,gy-70*u,.9*u,0,7);x.fill()})});
 const sp=window.speechSynthesis&&speechSynthesis.speaking;
 [.3,.7].forEach(q=>{const X=px+w*q+4*u;if(X<-30||X>W+30)return;x.fillStyle='#263238';x.beginPath();x.moveTo(X,gy-76*u);x.lineTo(X+5*u,gy-78.6*u);x.lineTo(X+5*u,gy-73.4*u);x.fill();x.fillRect(X-2.4*u,gy-77.2*u,2.4*u,2.4*u);
  if(sp){x.strokeStyle='#fff59d';x.lineWidth=.8*u;for(let i=0;i<3;i++){const p=(tm*1.8+i/3)%1;x.globalAlpha=(1-p)*.7;x.beginPath();x.arc(X+5*u,gy-76*u,(1.5+p*7)*u,-.9,.9);x.stroke()}x.globalAlpha=1}});
 const km=Math.floor(hs(s.x*.11)*180)+10,mt=String(Math.floor(hs(s.x*.29)*9)*100).padStart(3,'0'),tx='KM '+km+'+'+mt+'  •  +'+(Math.floor(hs(s.x*.37)*80)+2)+' m';
 x.fillStyle='#fafafa';x.beginPath();x.roundRect(cx-44*u,gy-50.5*u,88*u,7*u,1.6*u);x.fill();x.strokeStyle=BD[pl];x.lineWidth=.8*u;x.stroke();x.fillStyle=BD[pl];x.font='bold '+4.2*u+'px monospace';x.textAlign='center';x.fillText(tx,cx,gy-45.6*u)}
/* lapisan depan: pagar tanaman & semak berbunga di tepi peron */
function stGarden(s,px,gy,P){const w=SP*P,r=n=>hs(s.x*.211+n*4.7),st=15*u,FC=['#ec407a','#ffb300','#ef5350','#fff176'];
 for(let X=px+w*.06,i=0;X<px+w*.965;X+=st,i++){if(X<-30||X>W+30)continue;const by=gy+25.4*u,h=(4.2+r(i)*2.2)*u;
  x.fillStyle='#1b5e20';x.beginPath();x.arc(X,by,h*1.1,Math.PI,0);x.fill();x.fillStyle='#2e7d32';x.beginPath();x.arc(X-1.6*u,by-.6*u,h*.85,Math.PI,0);x.fill();x.fillStyle='#43a047';x.beginPath();x.arc(X+1.8*u,by-1*u,h*.55,Math.PI,0);x.fill();
  x.fillStyle=FC[(r(i+9)*4)|0];for(let k=0;k<4;k++){x.beginPath();x.arc(X+(r(i*4+k+20)-.5)*h*1.6,by-(.25+r(i*4+k+30)*.55)*h,.8*u,0,7);x.fill()}}}
/* cahaya lampu peron saat senja & malam */
function stGlow(s,px,gy,P){const n=TD();if(n==0)return;const w=SP*P,a=n==2?.3:.14;x.save();x.globalCompositeOperation='lighter';
 for(let i=0;i<4;i++){const lx=px+w*(.12+i*.25)+1*u;if(lx<-90||lx>W+90)continue;const g=x.createRadialGradient(lx,gy+9*u,0,lx,gy+9*u,64*u);g.addColorStop(0,'rgba(255,224,130,'+a+')');g.addColorStop(1,'rgba(255,224,130,0)');x.fillStyle=g;x.beginPath();x.ellipse(lx,gy+11*u,64*u,18*u,0,0,7);x.fill()}x.restore()}

/* ---------- PERBAIKAN TAMPILAN STASIUN ---------- */
function flagID(X,Y,s){if(X<-40||X>W+40)return;const h=46*s,wv=Math.sin(tm*3+X*.01)*1.8*s,fw=24*s,fh=14*s;
 x.fillStyle='#546e7a';x.fillRect(X-1*s,Y-h,2*s,h);x.fillStyle='#ffd54f';x.beginPath();x.arc(X,Y-h-1*s,2*s,0,7);x.fill();
 const tp=Y-h+1*s;x.fillStyle='#e53935';x.beginPath();x.moveTo(X+1*s,tp);x.quadraticCurveTo(X+fw*.5,tp+wv,X+fw,tp+wv*.5);x.lineTo(X+fw,tp+fh/2+wv*.5);x.quadraticCurveTo(X+fw*.5,tp+fh/2+wv,X+1*s,tp+fh/2);x.fill();
 x.fillStyle='#fafafa';x.beginPath();x.moveTo(X+1*s,tp+fh/2);x.quadraticCurveTo(X+fw*.5,tp+fh/2+wv,X+fw,tp+fh/2+wv*.5);x.lineTo(X+fw,tp+fh+wv*.5);x.quadraticCurveTo(X+fw*.5,tp+fh+wv,X+1*s,tp+fh);x.fill()}
function stPlat(s,px,gy,P,cam){const w=SP*P,y0=gy+4*u,x0=Math.max(px,-20),x1=Math.min(px+w,W+20);
 const g=x.createLinearGradient(0,y0,0,gy+21*u);g.addColorStop(0,'#dfe5e8');g.addColorStop(.75,'#bcc7cd');g.addColorStop(1,'#8e9ba3');x.fillStyle=g;x.fillRect(px,y0,w,17*u);
 x.fillStyle='rgba(0,0,0,.07)';const tw=24*u;for(let X=px+Math.ceil((x0-px)/tw)*tw;X<x1;X+=tw)x.fillRect(X,y0+4*u,1*u,15.5*u);x.fillRect(x0,gy+13*u,x1-x0,.8*u);
 x.fillStyle='#ffd600';x.fillRect(px,y0,w,3.2*u);x.fillStyle='rgba(0,0,0,.35)';x.fillRect(px,y0+3.2*u,w,.8*u);
 x.fillStyle='#b89600';const st=5*u;for(let X=px+Math.ceil((x0-px)/st)*st;X<x1;X+=st){x.beginPath();x.arc(X,y0+1.6*u,.9*u,0,7);x.fill()}
 x.fillStyle='rgba(60,70,75,.5)';x.font='bold '+3.8*u+'px sans-serif';x.textAlign='center';const sp=330*u;for(let X=px+sp*.5;X<px+w;X+=sp){if(X>-80&&X<W+80)x.fillText('AWAS! JANGAN MELEWATI GARIS KUNING',X,y0+9.2*u)}
 x.fillStyle='#78909c';x.fillRect(px,gy+19.6*u,w,1.4*u);x.fillStyle='rgba(0,0,0,.2)';x.fillRect(px,gy+21*u,w,1.2*u)}
function stCanopy(px,gy,w,cn){const x0=px-6*u,ww=w+12*u,g=x.createLinearGradient(0,gy-94*u,0,gy-84*u);g.addColorStop(0,'#eceff1');g.addColorStop(1,'#b0bec5');x.fillStyle=g;x.beginPath();x.moveTo(x0-4*u,gy-84*u);x.lineTo(x0+4*u,gy-94*u);x.lineTo(x0+ww-4*u,gy-94*u);x.lineTo(x0+ww+4*u,gy-84*u);x.closePath();x.fill();
 x.fillStyle='rgba(0,0,0,.12)';const a0=Math.max(x0,-20),a1=Math.min(x0+ww,W+20),st=9*u;for(let X=x0+Math.ceil((a0-x0)/st)*st;X<a1;X+=st)x.fillRect(X,gy-94*u,1.2*u,10*u);
 const f2=x.createLinearGradient(0,gy-84*u,0,gy-77*u);f2.addColorStop(0,sh(cn,.15));f2.addColorStop(1,sh(cn,-.15));x.fillStyle=f2;x.fillRect(x0,gy-84*u,ww,7*u);x.fillStyle='rgba(255,255,255,.55)';x.fillRect(x0,gy-84*u,ww,.9*u);x.fillStyle='rgba(0,0,0,.28)';x.fillRect(x0,gy-77*u,ww,2.2*u)}
/* jam peron gantung (menunjukkan waktu sebenarnya) */
function stClock(X,gy){if(X<-30||X>W+30)return;const cy=gy-57*u,d=new Date(),m=d.getMinutes()+d.getSeconds()/60,h=(d.getHours()%12)+m/60,ln=(a,l)=>{x.moveTo(X,cy);x.lineTo(X+Math.sin(a)*l,cy-Math.cos(a)*l)};
 x.fillStyle='#455a64';x.fillRect(X-.6*u,gy-77*u,1.2*u,13*u);x.fillStyle='#263238';x.beginPath();x.arc(X,cy,7.6*u,0,7);x.fill();x.fillStyle='#fff';x.beginPath();x.arc(X,cy,6.4*u,0,7);x.fill();
 x.strokeStyle='#90a4ae';x.lineWidth=.6*u;for(let i=0;i<12;i++){const a=i/12*6.283;x.beginPath();x.moveTo(X+Math.sin(a)*5.2*u,cy-Math.cos(a)*5.2*u);x.lineTo(X+Math.sin(a)*6*u,cy-Math.cos(a)*6*u);x.stroke()}
 x.strokeStyle='#111';x.lineWidth=1*u;x.lineCap='round';x.beginPath();ln(h/12*6.283,3.4*u);ln(m/60*6.283,5*u);x.stroke()}
/* merpati di atap kanopi: terbang saat kereta tiba */
function stPigeons(s,px,gy,w){const cur=s===G.r.st[G.ni-1]&&s.arr,fl0=cur?tm-s.arr:0;
 for(let i=0;i<7;i++){const X0=px+w*(.07+hs(s.x*.31+i*5.1)*.86);if(X0<-40||X0>W+40)continue;const ph=hs(s.x*.7+i*3.3)*6.28,fl=Math.max(0,fl0-.3-i*.12),al=Math.max(0,1-fl/3);if(al<=0)continue;
  const dir=i%2?1:-1,X=X0+dir*fl*fl*26*u,Y=gy-94*u-fl*34*u-(fl>0?Math.abs(Math.sin(fl*14+ph))*3*u:0),peck=fl<=0&&Math.sin(tm*2.4+ph)>.82;
  x.save();x.globalAlpha=al;x.translate(X,Y);x.scale(dir*u*.8,u*.8);
  x.fillStyle='#8f9aa3';x.beginPath();x.ellipse(0,-3.2,4.6,2.8,-.1,0,7);x.fill();x.fillStyle='#6d7a84';x.beginPath();x.moveTo(-3.6,-3);x.lineTo(-8,-1.6);x.lineTo(-3.6,-1.2);x.fill();
  x.fillStyle='#78909c';x.beginPath();x.arc(4.4,peck?-3.2:-6.2,1.9,0,7);x.fill();x.fillStyle='#ffb74d';x.fillRect(6,peck?-3.2:-6.4,1.8,.8);x.fillStyle='#4a148c';x.fillRect(2.8,-5,2,1);
  if(fl>0){x.strokeStyle='#b0bec5';x.lineWidth=1.6;x.beginPath();x.moveTo(-1,-4);x.lineTo(-4,-9+Math.sin(fl*30)*3);x.moveTo(1,-4);x.lineTo(-1,-10+Math.sin(fl*30)*3);x.stroke()}
  else{x.fillStyle='#37474f';x.fillRect(-1.4,-.7,.9,1.1);x.fillRect(1,-.7,.9,1.1)}
  x.restore()}}
function stExtra(s,px,gy,P,w,cx,pl,st){stPigeons(s,px,gy,w);stBeauty(s,px,gy,P,w,cx,pl);[.22,.78].forEach(q=>stClock(px+w*q,gy));
 /* penyangga kanopi */
 x.strokeStyle='#546e7a';x.lineWidth=1.8*u;[.06,.3,.5,.7,.94].forEach(q=>{const X=px+w*q;if(X<-40||X>W+40)return;x.beginPath();x.moveTo(X+2*u,gy-64*u);x.lineTo(X+15*u,gy-77*u);x.moveTo(X+2*u,gy-64*u);x.lineTo(X-11*u,gy-77*u);x.stroke()});
 /* papan informasi digital (LED) */
 const d=new Date(),hh=String(d.getHours()).padStart(2,'0')+(Math.floor(tm*2)%2?':':' ')+String(d.getMinutes()).padStart(2,'0');
 [[.36,0],[.64,1]].forEach(q=>{const bx=px+w*q[0];if(bx<-80||bx>W+80)return;x.strokeStyle='#37474f';x.lineWidth=1.2*u;x.beginPath();x.moveTo(bx-18*u,gy-77*u);x.lineTo(bx-18*u,gy-72*u);x.moveTo(bx+18*u,gy-77*u);x.lineTo(bx+18*u,gy-72*u);x.stroke();
  x.fillStyle='#10171b';x.fillRect(bx-23*u,gy-72*u,46*u,13*u);x.strokeStyle='#546e7a';x.lineWidth=1.4*u;x.strokeRect(bx-23*u,gy-72*u,46*u,13*u);
  x.fillStyle='#ffb300';x.font='bold '+5.4*u+'px monospace';x.textAlign='center';
  if(q[1]==0){x.fillText('JALUR '+((s.ln|0)+1),bx,gy-65.6*u);x.fillText(TR[S.sel].n.toUpperCase().slice(0,15),bx,gy-60.6*u)}else{x.fillText(hh,bx,gy-65.6*u);x.fillText('TEPAT WAKTU',bx,gy-60.6*u)}});
 /* bendera merah putih di atap bangunan */
 if(st==0)flagID(cx,gy-174*u,u*.9);else if(st==1)flagID(px+w*.88,gy-106*u,u);else if(st==2)flagID(cx+60*u,gy-86*u,u);else if(st==3)flagID(cx,gy-116*u,u);
 /* pohon kelapa di sisi bangunan */
 palm(px+w*.1,gy-10*u,.8,1);palm(px+w*.91,gy-10*u,.8,-1);
 /* papan penunjuk di tiang */
 [.18,.82].forEach(q=>{const X=px+w*q;if(X<-60||X>W+60)return;x.fillStyle='#455a64';x.fillRect(X-1*u,gy-58*u,2*u,48*u);x.fillStyle='#1565c0';x.fillRect(X-16*u,gy-58*u,32*u,9*u);x.fillStyle='#fff';x.font='bold '+5*u+'px sans-serif';x.textAlign='center';x.fillText(q<.5?'← LOKET':'EXIT →',X,gy-51.4*u)})}
function pot(X,by,s){if(X<-40||X>W+40)return;x.save();x.translate(X,by);x.scale(s,s);x.fillStyle='#bf6b3a';x.beginPath();x.moveTo(-6,-9);x.lineTo(6,-9);x.lineTo(4.4,0);x.lineTo(-4.4,0);x.fill();x.fillStyle='#8d4a24';x.fillRect(-6.6,-10.6,13.2,2.2);
 x.fillStyle='#2e7d32';[[-5,-14,5.5],[0,-18,6.5],[5,-14,5.5],[-2,-12,5]].forEach(q=>{x.beginPath();x.arc(q[0],q[1],q[2],0,7);x.fill()});x.fillStyle='#e53935';[[-3,-17],[3,-13],[1,-21]].forEach(q=>{x.beginPath();x.arc(q[0],q[1],1.6,0,7);x.fill()});x.restore()}
function bin(X,by,s){if(X<-40||X>W+40)return;x.save();x.translate(X,by);x.scale(s,s);[['#1565c0',-10],['#2e7d32',0]].forEach(q=>{x.fillStyle=q[0];x.fillRect(q[1],-15,9,15);x.fillStyle='rgba(0,0,0,.28)';x.fillRect(q[1]-.6,-16.6,10.2,2.4);x.fillStyle='rgba(255,255,255,.7)';x.fillRect(q[1]+2.5,-10,4,4)});x.restore()}
function booth(X,by,s){if(X<-90||X>W+90)return;x.save();x.translate(X,by);x.scale(s,s);
 x.fillStyle='rgba(0,0,0,.25)';x.beginPath();x.ellipse(0,0,32,3,0,0,7);x.fill();
 const g=x.createLinearGradient(0,-38,0,0);g.addColorStop(0,'#eceff1');g.addColorStop(1,'#b0bec5');x.fillStyle=g;x.fillRect(-26,-38,52,38);x.fillStyle='#c62828';x.fillRect(-26,-7,52,3.2);
 x.fillStyle='#37474f';x.beginPath();x.moveTo(-31,-38);x.lineTo(-24,-47);x.lineTo(24,-47);x.lineTo(31,-38);x.fill();x.fillStyle='#1a237e';x.fillRect(-21,-45,42,7.4);x.fillStyle='#fff';x.font='bold 5.6px sans-serif';x.textAlign='center';x.fillText('RUANG PPKA',0,-39.4);
 x.fillStyle=TD()==2?'#ffe9a8':'#263238';x.fillRect(-21,-33,26,19);x.save();x.beginPath();x.rect(-21,-33,26,19);x.clip();
 x.fillStyle='#4e5a60';x.fillRect(-21,-18,26,5);x.fillStyle='#f4f6f7';x.fillRect(-12.5,-23,9,8);x.fillStyle='#d32f2f';x.fillRect(-12.5,-19.6,9,1.4);x.fillStyle='#e0ac80';x.beginPath();x.arc(-8,-26,3.6,0,7);x.fill();x.fillStyle='#d32f2f';x.fillRect(-12,-31,8,2.8);x.fillStyle='#ffd54f';x.fillRect(-12,-29.2,8,.8);
 x.fillStyle='#1b2a33';x.fillRect(-1,-27,10,9);['#e53935','#43a047','#ffb300','#e53935'].forEach((c2,i)=>{x.fillStyle=Math.sin(tm*3+i*1.7)>-.2?c2:'#263238';x.beginPath();x.arc(1.4+i*2.3,-24,.8,0,7);x.fill()});x.restore();
 x.strokeStyle='#eceff1';x.lineWidth=1.6;x.strokeRect(-21,-33,26,19);x.fillStyle='rgba(255,255,255,.22)';x.beginPath();x.moveTo(-21,-14);x.lineTo(-12,-33);x.lineTo(-7,-33);x.lineTo(-16,-14);x.fill();
 x.fillStyle='#5d4037';x.fillRect(11,-27,11,27);x.fillStyle='#d7ccc8';x.fillRect(12.5,-24.5,8,8);x.fillStyle='#ffd54f';x.beginPath();x.arc(13,-12,.9,0,7);x.fill();x.restore()}
function signal(X,by,s,st){if(X<-60||X>W+60)return;const go=!st.done&&G.pos<st.x+SP-5,h=66*s;x.fillStyle='#455a64';x.fillRect(X-1.2*s,by-h,2.4*s,h);x.fillStyle='#fafafa';x.fillRect(X-1.2*s,by-h+26*s,2.4*s,5*s);x.fillStyle='#212121';x.beginPath();x.roundRect(X-4.4*s,by-h-2*s,8.8*s,22*s,2*s);x.fill();
 [['#e53935',!go],['#43a047',go]].forEach((q,i)=>{const cy=by-h+3.6*s+i*9*s;x.fillStyle=q[1]?q[0]:'#2f2f2f';x.beginPath();x.arc(X,cy,3*s,0,7);x.fill();if(q[1]){x.save();x.globalCompositeOperation='lighter';const gl=x.createRadialGradient(X,cy,0,X,cy,13*s);gl.addColorStop(0,q[0]+'aa');gl.addColorStop(1,q[0]+'00');x.fillStyle=gl;x.beginPath();x.arc(X,cy,13*s,0,7);x.fill();x.restore()}})}
/* gerbang tiket (tap kartu) */
function stGates(px,by,w,sc){const X0=px+w*.052;if(X0<-70||X0>W+70)return;x.save();x.translate(X0,by);x.scale(sc,sc);
 x.fillStyle='rgba(0,0,0,.22)';x.fillRect(-4,-1.4,48,2.6);
 [0,14,28].forEach((q,i)=>{x.fillStyle='#455a64';x.fillRect(q,-14,6,14);x.fillStyle='#78909c';x.fillRect(q,-14,6,2.4);x.fillStyle=Math.sin(tm*2+i)>-.3?'#43a047':'#e53935';x.fillRect(q+1.6,-11.2,2.8,1.8);x.fillStyle='#eceff1';x.fillRect(q+1,-7.6,4,2.4);
  if(i<2){x.fillStyle='rgba(255,255,255,.7)';x.fillRect(q+6,-9.6,8,1.1)}});
 x.fillStyle='#1565c0';x.fillRect(-2,-24,48,7);x.fillStyle='#fff';x.font='bold 5px sans-serif';x.textAlign='center';x.fillText('TAP KARTU',22,-19);x.fillStyle='#455a64';x.fillRect(-1,-17,1.4,17);x.fillRect(43,-17,1.4,17);x.restore()}
/* kucing peron */
function stCat(X,by,s){if(X<-30||X>W+30)return;const t=tm*1.6;x.save();x.translate(X,by);x.scale(s,s);x.fillStyle='#ef6c00';x.beginPath();x.ellipse(0,-4,5.2,3.8,0,0,7);x.fill();x.beginPath();x.arc(4.6,-8.2,3,0,7);x.fill();x.beginPath();x.moveTo(3,-10.2);x.lineTo(3.4,-13);x.lineTo(5,-10.6);x.fill();x.beginPath();x.moveTo(5.4,-10.4);x.lineTo(7,-12.8);x.lineTo(7.2,-9.6);x.fill();
 x.strokeStyle='#ef6c00';x.lineWidth=1.8;x.lineCap='round';x.beginPath();x.moveTo(-5,-3);x.quadraticCurveTo(-10,-4+Math.sin(t)*3,-9,-10+Math.sin(t)*2);x.stroke();x.fillStyle='#fff3e0';x.fillRect(2,-1.6,2.4,1.6);x.fillStyle='#212121';x.fillRect(5.2,-8.8,.9,1.1);x.restore()}
function stProps(s,px,gy,P){const w=SP*P,sc=u*.95,by=gy+19.6*u;stGates(px,by,w,sc);stCat(px+w*(.5+hs(s.x*.9)*.06),gy+19.8*u,sc);
 [.205,.395,.62,.86].forEach(q=>pot(px+w*q,by,sc));bin(px+w*.34,by,sc);bin(px+w*.8,by,sc);booth(px+w*.3,by,sc);signal(px+w*.012,by,u,s)}

/* ---------- SUARA & PENGUMUMAN STASIUN ---------- */
function stnAudio(){const near=(G.m=='play'||G.m=='menu')?zoneF(G.pos):0;crowd(near,G.dw>0?1:0);
 if(G.m!='play')return;const s=G.r.st[G.ni];if(!s||s.done)return;
 if(!s.a0&&G.pos<s.wx&&s.wx-G.pos<2200){s.a0=1;if(s.ln!=G.ln)toast('🔀 Wesel otomatis → JALUR '+(s.ln+1))}
 const d=s.x+SP-5-G.pos;if(d<0)return;const lead=Math.max(1000,G.v*10),tn=TR[S.sel].n;
 if(!s.a1&&d<lead){s.a1=1;chime();if(S.pa)say('Perhatian, perhatian. '+tn+' akan segera masuk di stasiun '+s.nm+', jalur '+(s.ln?'dua':'satu')+'. Mohon penumpang menunggu di belakang garis aman peron.')}
 if(!s.a2&&d<lead*.6){s.a2=1;bellSt();autoHorn(TR[S.sel].k,1500)}}
function arriveCue(s){s.arr=tm;airRel();
 setTimeout(()=>{doorBeep(3);hiss(.5,.1,1800)},900);
 if(S.pa)setTimeout(()=>say(TR[S.sel].n+' tiba di stasiun '+s.nm+'. Periksa kembali barang bawaan Anda.'),700)}
const dwellT=()=>S.pa&&S.snd&&window.speechSynthesis?11:3;
/* aba-aba PPKA lewat radio ke masinis menjelang berangkat, lalu peluit & "berangkat" */
function ppkaCue(s){const tn=TR[S.sel].n,nx=G.r.st[G.ni]&&G.r.st[G.ni].nm||'stasiun berikutnya',k=Math.random()*3|0;
 sayPPKA(k==0?'Sinyal keluar aman. '+tn+', berangkat!':k==1?'PPKA '+s.nm+' ke masinis. Sinyal keluar aman. Silakan berangkat.':'Kereta api tujuan '+nx+' diberangkatkan. Hati-hati.',()=>{s.wr=1})}
function departCue(){doorBeep(5)}
function goHorn(){autoHorn(TR[S.sel].k,700)}

/* loop */
let last=0;function loop(ts){const raw=Math.min(.05,(ts-last)/1000||0);last=ts;dtS+=(raw-dtS)*.2;const dt=raw>.04?raw:dtS;if(G.m!='pause')tm+=dt;upd(dt);draw();if(G.m!='pause'){if(raw>.029)slowN++;else slowN=Math.max(0,slowN-2);if(slowN>36&&QCAP>1){QCAP=Math.max(1,QCAP-.3);slowN=0;ck='';rs()}}requestAnimationFrame(loop)}
toMenu();requestAnimationFrame(loop);

/* ---------- 2 JALUR PER STASIUN + WESEL (PINDAH JALUR) ----------
   Jalur 1 = rel dekat peron (lintas utama), Jalur 2 = rel kedua di belakangnya.
   Tiap stasiun menentukan jalur tujuan (s.ln). Perpindahan jalur OTOMATIS di wesel masuk (450 m sebelum stasiun);
   setelah lewat wesel keluar, kereta otomatis kembali ke Jalur 1. */
const swClick=()=>{tone(520,.05,'square',.05);tone(300,.09,'square',.05,0,.06)};
function laneF(){if(G.lx==null)return G.ln|0;const q=Math.min(1,Math.max(0,(G.pos-G.lx)/WLEN)),s=q*q*(3-2*q);return(G.lb|0)+((G.ln|0)-(G.lb|0))*s}
function swLane(n,x0){G.lb=laneF();G.ln=n;G.lx=x0;clack(1);setTimeout(()=>clack(1),160);toast('🔀 Pindah ke JALUR '+(n+1))}
function weselStep(){const p0=G.wp==null?G.pos:G.wp;G.wp=G.pos;
 for(const s of G.r.st){if(s.wx<-1e8)continue;
  if(p0<s.wx&&G.pos>=s.wx&&G.ln!=s.ln)swLane(s.ln,s.wx);
  if(p0<s.ex&&G.pos>=s.ex&&G.ln!=0){G.wl=0;swLane(0,s.ex)}}}
function weselDraw(gy,P,cam){const y2=gy-LANEY*u,
 ra=(xa,xb)=>{xa=Math.max(xa,-30);xb=Math.min(xb,W+30);if(xb<=xa)return;x.fillStyle='rgba(60,50,38,.5)';x.fillRect(xa,y2+3.5*u,xb-xa,3.2*u);x.fillStyle='#6b5d4a';x.fillRect(xa,y2,xb-xa,4.5*u);x.fillStyle='#4e342e';for(let X=xa-((cam+xa)%(10*u));X<xb;X+=10*u)x.fillRect(X,y2+1*u,5*u,2.6*u);x.fillStyle='#d5dde1';x.fillRect(xa,y2,xb-xa,1.4*u)},
 dg=(xa,ya,xb,yb)=>{x.save();x.lineCap='butt';x.strokeStyle='#6b5d4a';x.lineWidth=5*u;x.beginPath();x.moveTo(xa,ya+1.5*u);x.lineTo(xb,yb+1.5*u);x.stroke();
  x.strokeStyle='#4e342e';x.lineWidth=3*u;x.setLineDash([2.6*u,7.4*u]);x.beginPath();x.moveTo(xa,ya+1.5*u);x.lineTo(xb,yb+1.5*u);x.stroke();x.setLineDash([]);
  x.strokeStyle='#d5dde1';x.lineWidth=1.5*u;x.beginPath();x.moveTo(xa,ya);x.lineTo(xb,yb);x.stroke();x.restore()};
 for(const s of G.r.st){if(s.wx<-1e8)continue;const X0=s.wx*P-cam,X1=X0+WLEN*P,X2=s.ex*P-cam,X3=X2+WLEN*P;if(X3<-60||X0>W+60)continue;
  ra(X1,X2);dg(X0,gy+1.2*u,X1,y2+.7*u);dg(X2,y2+.7*u,X3,gy+1.2*u);
  const lx=X0-9*u;if(lx>-40&&lx<W+40){const c=s.ln?'255,179,0':'67,160,71';x.fillStyle='#455a64';x.fillRect(lx-.8*u,gy+3*u,1.6*u,8*u);x.fillStyle='#212121';x.fillRect(lx-3*u,gy-1.5*u,6*u,5*u);
   x.fillStyle='rgb('+c+')';x.beginPath();x.arc(lx,gy+1*u,1.8*u,0,7);x.fill();if(TD())puff(lx,gy+1*u,12*u,.5,c);
   x.fillStyle='#fff';x.font='bold '+3.6*u+'px sans-serif';x.textAlign='center';x.fillText('WESEL',lx,gy-3*u)}}}
