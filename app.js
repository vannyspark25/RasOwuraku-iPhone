
const NUM='233241719370';
const wa=t=>'https://wa.me/'+NUM+'?text='+encodeURIComponent(t);
/* returns a harmless stand-in when an element is not on the current page */
const $=s=>document.querySelector(s)||{addEventListener(){},style:{},selectedOptions:[],files:[]};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const COL={Black:'#2b2b2e','Space Black':'#2b2b2e',Blue:'#4a6b8c',White:'#e8e6e1',Gold:'#d4a937',Green:'#6c8f78',Purple:'#a99bc7',Red:'#d62d2d',Titanium:'#8a857c','Natural Titanium':'#8a857c'};
const hex=c=>{for(const k in COL)if(String(c).toLowerCase().includes(k.toLowerCase()))return COL[k];return '#6b6b6b'};

/* ---------- storage ---------- */
const KEY='rasowuraku_v1';
const DEF={products:[
{id:1,name:'iPhone 11',storage:'64GB',color:'Black',price:4200,stock:true},
{id:2,name:'iPhone 12',storage:'128GB',color:'Blue',price:5600,stock:true},
{id:3,name:'iPhone 13',storage:'128GB',color:'White',price:7200,stock:true},
{id:4,name:'iPhone 14 Pro',storage:'256GB',color:'Purple',price:11800,stock:true},
{id:5,name:'iPhone 15 Pro Max',storage:'256GB',color:'Natural Titanium',price:16500,stock:true},
{id:6,name:'iPhone 16 Pro',storage:'256GB',color:'Gold',price:17900,stock:false}],enq:[]};
let st;
try{st=JSON.parse(localStorage.getItem(KEY))}catch(e){}
if(!st||!Array.isArray(st.products))st=JSON.parse(JSON.stringify(DEF));
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(st))}catch(e){toast('Could not save: photo may be too large')}};
function toast(m){const t=document.createElement('div');t.className='toast';t.textContent=m;document.body.appendChild(t);setTimeout(()=>t.remove(),2600)}
function log(type,details){st.enq.unshift({t:new Date().toLocaleString(),type,details});st.enq=st.enq.slice(0,100);save();renderAdmin()}

/* ---------- illustrations (inline SVG) ---------- */
function ph(x,y,s,c,inner=''){return `<g transform="translate(${x} ${y}) scale(${s})"><rect width="60" height="120" rx="12" fill="${c}"/><rect x="3" y="3" width="54" height="114" rx="10" fill="#050505"/><rect x="5" y="5" width="50" height="110" rx="8" fill="url(#wp)" opacity=".85"/><rect x="21" y="8" width="18" height="5" rx="2.5" fill="#000"/>${inner}</g>`}
function cam(x,y,s,c){return `<g transform="translate(${x} ${y}) scale(${s})"><rect width="60" height="120" rx="12" fill="${c}"/><rect x="7" y="7" width="26" height="26" rx="7" fill="#111"/><circle cx="15" cy="15" r="5" fill="#333"/><circle cx="25" cy="25" r="5" fill="#333"/><circle cx="24" cy="12" r="2" fill="#d4a937"/></g>`}
const svg=(vb,b)=>`<svg viewBox="${vb}" xmlns="http://www.w3.org/2000/svg">${b}</svg>`;
const art={
hero:svg('0 0 400 420',`<circle cx="210" cy="215" r="170" fill="#d4a937" opacity=".07"/>${cam(40,110,1.7,'#8a857c')}${ph(150,40,2.1,'#2b2b2e')}${ph(262,130,1.5,'#d4a937')}`),
swap:svg('0 0 300 200',`${ph(30,40,1.05,'#4a6b8c')}${ph(210,40,1.05,'#8a857c')}<g fill="none" stroke-width="7" stroke-linecap="round"><path d="M110 85h70" stroke="#0a9a4a"/><path d="M165 70l16 15-16 15" stroke="#0a9a4a"/><path d="M190 120h-70" stroke="#d4a937"/><path d="M135 105l-16 15 16 15" stroke="#d4a937"/></g>`),
repair:svg('0 0 300 200',`${ph(100,25,1.3,'#2b2b2e','<path d="M12 10l14 30-10 12 18 26M26 40l18-8M16 52l-8 14" stroke="#fff" stroke-width="1.4" fill="none"/>')}<g transform="rotate(35 235 110)"><rect x="228" y="50" width="14" height="120" rx="7" fill="#d4a937"/><circle cx="235" cy="48" r="20" fill="#d4a937"/><rect x="229" y="22" width="12" height="28" fill="#000"/></g><circle cx="70" cy="60" r="16" fill="#d62d2d"/><path d="M63 60l5 6 9-11" stroke="#fff" stroke-width="3" fill="none"/>`),
pay:svg('0 0 300 200',`${ph(40,35,1.2,'#d4a937')}<g><rect x="140" y="40" width="130" height="110" rx="12" fill="#141414" stroke="#333"/><rect x="140" y="40" width="130" height="28" rx="12" fill="#0a9a4a"/><g fill="#555">${[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<rect x="${152+(i%4)*28}" y="${80+Math.floor(i/4)*22}" width="18" height="14" rx="3" fill="${i<4?'#d4a937':'#2a2a2a'}"/>`).join('')}</g></g><circle cx="255" cy="150" r="22" fill="#d4a937"/><text x="255" y="158" text-anchor="middle" font-size="22" font-weight="800" fill="#000">₵</text>`),
chat:svg('0 0 300 200',`${ph(120,12,1.3,'#2b2b2e',`<rect x="9" y="22" width="30" height="12" rx="5" fill="#fff" opacity=".9"/><rect x="21" y="40" width="30" height="12" rx="5" fill="#0a9a4a"/><rect x="9" y="58" width="24" height="12" rx="5" fill="#fff" opacity=".9"/>`)}<circle cx="250" cy="60" r="28" fill="#0a9a4a"/><path d="M240 52c0 10 8 18 18 18l4-4-6-3-3 2c-4-1-7-4-8-8l2-3-3-6z" fill="#fff"/><circle cx="50" cy="150" r="18" fill="#d4a937"/><path d="M42 150h16M50 142v16" stroke="#000" stroke-width="3"/>`),
admin:svg('0 0 300 200',`<rect x="10" y="10" width="280" height="180" rx="12" fill="#141414" stroke="#333"/><rect x="10" y="10" width="280" height="26" rx="12" fill="#d62d2d"/><g fill="url(#gr)">${[60,95,50,120,85,105].map((h,i)=>`<rect x="${30+i*30}" y="${170-h}" width="20" height="${h}" rx="4"/>`).join('')}</g><rect x="215" y="52" width="62" height="12" rx="6" fill="#d4a937"/><rect x="215" y="72" width="44" height="8" rx="4" fill="#333"/><rect x="215" y="88" width="52" height="8" rx="4" fill="#333"/>`)
};
$('#heroArt').innerHTML=art.hero;
['swap','repair','pay','chat','admin'].forEach(k=>$('#art-'+k).innerHTML=art[k]);

/* ---------- shop ---------- */
const money=n=>'GH₵ '+Number(n).toLocaleString('en-US');
function productImg(p){return p.img?`<img src="${p.img}" alt="${esc(p.name)} ${esc(p.color)}">`:svg('0 0 60 120',`${cam(0,0,1,hex(p.color)).replace('<g ','<g ')}`)}
function renderShop(){
 $('#products').innerHTML=st.products.map(p=>`<article class="card"><div class="img">${productImg(p)}</div><div class="body"><h3>${esc(p.name)}</h3><div class="meta">${esc(p.storage)} · ${esc(p.color)}</div><div class="price">${money(p.price)}</div>${p.stock?`<button class="btn" data-o="${p.id}">Order on WhatsApp</button>`:`<div class="out">Out of stock</div><button class="btn line" data-o="${p.id}">Ask when it’s back</button>`}</div></article>`).join('')||'<p class="sub">No iPhones listed yet. Check back soon or message us on WhatsApp.</p>';
 $('#cPhone').innerHTML=st.products.map(p=>`<option value="${p.id}">${esc(p.name)} ${esc(p.storage)} – ${money(p.price)}</option>`).join('');
 calc();
}
$('#products').addEventListener('click',e=>{const b=e.target.closest('[data-o]');if(!b)return;const p=st.products.find(x=>x.id==b.dataset.o);
 const m=`Hello RasOwuraku iPhones, I am interested in the ${p.name} ${p.storage} (${p.color}) at ${money(p.price)}.`;log('Order',`${p.name} ${p.storage} ${p.color}`);window.open(wa(m),'_blank','noopener')});

/* ---------- forms ---------- */
function fd(f){return Object.fromEntries(new FormData(f))}
$('#swapForm').addEventListener('submit',e=>{e.preventDefault();const d=fd(e.target);
 const m=`Hello RasOwuraku iPhones, I want a swap/valuation.\nName: ${d.name}\nPhone: ${d.phone}\nMy iPhone: ${d.old}\nBattery: ${d.bat||'n/a'}%\nCondition: ${d.cond}\nUpgrade to: ${d.want||'not sure yet'}`;
 log('Swap / valuation',`${d.name} (${d.phone}): ${d.old}`+(d.want?` → ${d.want}`:''));window.open(wa(m),'_blank','noopener');e.target.reset();toast('Valuation request ready on WhatsApp')});
$('#repForm').addEventListener('submit',e=>{e.preventDefault();const d=fd(e.target);
 const m=`Hello RasOwuraku iPhones, I want to book a repair.\nName: ${d.name}\nPhone: ${d.phone}\nModel: ${d.model}\nRepair: ${d.fix}\nDetails: ${d.msg||'-'}`;
 log('Repair',`${d.name} (${d.phone}): ${d.model}, ${d.fix}`);window.open(wa(m),'_blank','noopener');e.target.reset();toast('Repair booking ready on WhatsApp')});

/* ---------- installments ---------- */
function calc(){const p=st.products.find(x=>x.id==$('#cPhone').value);if(!p){return}
 const dep=+$('#cDep').value,mo=+$('#cMon').value;$('#dv').textContent=dep;
 const d=Math.round(p.price*dep/100);$('#oDep').textContent=money(d);$('#oMon').textContent=money(Math.ceil((p.price-d)/mo));
 $('#payWa').href=wa(`Hello RasOwuraku iPhones, I want to pay for the ${p.name} ${p.storage} in installments: ${dep}% deposit over ${mo} months.`)}
['cPhone','cDep','cMon'].forEach(i=>$('#'+i).addEventListener('input',calc));
$('#payWa').addEventListener('click',()=>log('Installment enquiry',`${$('#cPhone').selectedOptions[0]?.textContent}, ${$('#cDep').value}% deposit, ${$('#cMon').value} months`));
['heroWa','chatWa','fab'].forEach(i=>{const a=$('#'+i);a.href=wa('Hello RasOwuraku iPhones, I have an enquiry.');a.addEventListener('click',()=>log('WhatsApp chat','General enquiry'))});

/* ---------- admin ---------- */
let unlocked=false;const PIN='1234';
$('#pinForm').addEventListener('submit',e=>{e.preventDefault();if($('#pin').value===PIN){unlocked=true;$('#pin').value='';renderAdmin()}else toast('Wrong PIN')});
$('#lockBtn').onclick=()=>{unlocked=false;renderAdmin()};
$('#clearE').onclick=()=>{st.enq=[];save();renderAdmin()};
function renderAdmin(){
 $('#lock').hidden=unlocked;$('#panel').hidden=!unlocked;if(!unlocked)return;
 $('#aRows').innerHTML=st.products.map(p=>`<tr><td>${esc(p.name)}</td><td>${esc(p.storage)}</td><td>${esc(p.color)}</td><td><input type="number" min="0" value="${p.price}" data-p="${p.id}" aria-label="Price for ${esc(p.name)}"></td><td><input type="checkbox" ${p.stock?'checked':''} data-s="${p.id}" aria-label="In stock: ${esc(p.name)}"></td><td><input type="file" accept="image/*" data-f="${p.id}" aria-label="Photo for ${esc(p.name)}"></td><td><button class="btn line" data-d="${p.id}">Delete</button></td></tr>`).join('');
 $('#eCount').textContent=st.enq.length;
 $('#eRows').innerHTML=st.enq.map(x=>`<tr><td>${esc(x.t)}</td><td>${esc(x.type)}</td><td>${esc(x.details)}</td></tr>`).join('')||'<tr><td colspan="3" class="note">No enquiries yet. They appear here when customers use the forms or order buttons.</td></tr>';
}
$('#aRows').addEventListener('change',e=>{const t=e.target,id=t.dataset.p||t.dataset.s||t.dataset.f;const p=st.products.find(x=>x.id==id);if(!p)return;
 if(t.dataset.p){p.price=Math.max(0,+t.value||0)}else if(t.dataset.s){p.stock=t.checked}else if(t.dataset.f&&t.files[0]){shrink(t.files[0],u=>{p.img=u;save();renderShop();toast('Photo updated')});return}
 save();renderShop();toast('Saved')});
$('#aRows').addEventListener('click',e=>{const b=e.target.closest('[data-d]');if(!b||!confirm('Delete this iPhone?'))return;st.products=st.products.filter(x=>x.id!=b.dataset.d);save();renderShop();renderAdmin()});
function shrink(file,cb){const r=new FileReader();r.onload=()=>{const im=new Image();im.onload=()=>{const s=Math.min(1,500/Math.max(im.width,im.height)),c=document.createElement('canvas');c.width=im.width*s;c.height=im.height*s;c.getContext('2d').drawImage(im,0,0,c.width,c.height);cb(c.toDataURL('image/jpeg',.8))};im.src=r.result};r.readAsDataURL(file)}
$('#addForm').addEventListener('submit',e=>{e.preventDefault();const d=fd(e.target),f=e.target.photo.files[0];
 const add=img=>{st.products.push({id:Date.now(),name:d.name,storage:d.storage,color:d.color,price:+d.price,stock:true,img});save();renderShop();renderAdmin();e.target.reset();toast('iPhone added')};
 f?shrink(f,add):add()});

renderShop();renderAdmin();

/* ---------- home page cards ---------- */
const CARDS=[['shop.html','iPhone shop','Models, storage, colours and prices.',art.hero],['swap.html','Buy & swap','Get a valuation or upgrade your iPhone.',art.swap],['repair.html','Repairs','Book a screen, battery or other repair.',art.repair],['installments.html','Installments','Pay a deposit and spread the rest.',art.pay],['whatsapp.html','WhatsApp','Order and get support in one chat.',art.chat],['admin.html','Admin','Manage stock, prices and enquiries.',art.admin]];
$('#homeCards').innerHTML=CARDS.map(c=>`<article class="card"><div class="img">${c[3]}</div><div class="body"><h3>${c[1]}</h3><div class="meta">${c[2]}</div><a class="btn gold" href="${c[0]}">Open ${c[1]}</a></div></article>`).join('');
