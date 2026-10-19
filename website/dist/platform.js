// Interactive cards for the platform section and /product.
(function(){
var d=document,R=window.matchMedia&&matchMedia('(prefers-reduced-motion: reduce)').matches;
d.documentElement.classList.add('js');
function $(r,s){return r.querySelector(s)}function $$(r,s){return Array.prototype.slice.call(r.querySelectorAll(s))}
function timer(){var ids=[];return{at:function(ms,f){ids.push(setTimeout(f,R?0:ms))},clear:function(){ids.forEach(clearTimeout);ids=[]}}}
function typeText(t,el,text,speed,at,done){if(R){el.textContent=text;done&&done();return}el.textContent='';var i=0;(function step(){i++;el.textContent=text.slice(0,i);if(i<text.length)t.at(speed,step);else done&&done()})()}
var K={};
K.find=function(el){var t=timer(),tag=$(el,'[data-count]'),rows=$$(el,'.row'),n=+tag.getAttribute('data-count');
 function end(){tag.classList.remove('sync');tag.textContent=n+' found';rows.forEach(function(r){r.classList.remove('ix-off')})}
 return{reset:function(){t.clear();tag.classList.add('sync');tag.textContent='Syncing QuickBooks…';rows.forEach(function(r){r.classList.add('ix-off')})},
 play:function(){if(R)return end();rows.forEach(function(r,i){t.at(500+i*450,function(){r.classList.remove('ix-off')})});
  for(var c=1;c<=n;c++)(function(c){t.at(300+c*150,function(){tag.textContent='Syncing QuickBooks… '+c})})(c);t.at(2500,end)},end:end}};
K.source=function(el){var t=timer(),ok=$(el,'.ix-ok');
 function run(){t.clear();el.classList.remove('drawing','pulse');void el.offsetWidth;el.classList.remove('pre');ok.style.opacity='0';
  if(R){ok.style.opacity='';return}el.classList.add('drawing');t.at(800,function(){el.classList.add('pulse')});t.at(1150,function(){ok.style.opacity=''})}
 $$(el,'.ix-amt,.ix-mk').forEach(function(b){b.addEventListener('click',run);b.addEventListener('mouseenter',function(){if(!el.classList.contains('drawing')||!t.busy)run()})});
 return{reset:function(){t.clear();el.classList.remove('drawing','pulse');el.classList.add('pre');ok.style.opacity=''},play:run}};
K.proof=function(el){var t=timer(),vs=$$(el,'.ix-v'),tag=$(el,'.ix-signed'),box=$(el,'.ix-att'),msg=$(el,'.ix-msg');
 vs.forEach(function(v){v.setAttribute('data-v',v.textContent)});
 function end(){vs.forEach(function(v){v.textContent=v.getAttribute('data-v');v.classList.remove('pending')});tag.classList.remove('off');box.classList.remove('busy');msg.textContent='Attached to case WM-22-4471'}
 return{reset:function(){t.clear();vs.forEach(function(v){v.textContent='—';v.classList.add('pending')});tag.classList.add('off');box.classList.add('busy');msg.textContent='Signing in to fedex.com…'},
 play:function(){if(R)return end();t.at(1100,function(){tag.classList.remove('off');msg.textContent='Looking up 7714 2290 3318…'});
  vs.forEach(function(v,i){t.at(2000+i*220,function(){v.textContent=v.getAttribute('data-v');v.classList.remove('pending')})});
  t.at(3000,function(){box.classList.remove('busy');msg.textContent='Attached to case WM-22-4471'})},end:end}};
K.file=function(el){var t=timer(),st=$(el,'.ix-st'),ap=$(el,'.ix-approve'),rv=$(el,'.ix-review'),pk=$(el,'.ix-pk'),pr=$(el,'.ix-prog'),chip=$(el,'.ix-filed');
 ap.addEventListener('click',function(){if(ap.disabled)return;ap.disabled=true;st.textContent='Filing';pr.hidden=false;pr.classList.add('run');
  t.at(1500,function(){pr.hidden=true;pr.classList.remove('run');st.textContent='Filed';chip.classList.remove('off')})});
 rv.addEventListener('click',function(){pk.hidden=!pk.hidden;rv.setAttribute('aria-expanded',String(!pk.hidden))});
 return{reset:function(){t.clear();ap.disabled=false;st.textContent='Ready for approval';pr.hidden=true;pr.classList.remove('run');chip.classList.add('off')},play:function(){}}};
var QA=[
 {q:'Why is Sysco short-paying invoice 120324?',html:'Sysco paid $968.75 less, coded <b style="font-weight:600">pricing</b>. Their remittance bills at the old $41.20 case price; your Aug 1 price letter set $44.95.',src:['Sysco remittance · p.1','Price letter Aug 1']},
 {q:'What does Walmart code 22 mean?',html:'Code 22 is a <b style="font-weight:600">shortage</b>: Walmart says fewer cases arrived than you billed. On invoice 118842 they took $4,812.40, but the FedEx proof of delivery shows 48 of 48 pieces signed for at DC 6094.',src:['Walmart remittance · p.2','FedEx POD 7714 2290 3318']},
 {q:'How much did UNFI deduct last month?',html:'UNFI deducted $2,140.00 last month, all of it one <b style="font-weight:600">MCB promo</b> chargeback on invoice 119207. The packet is built and waiting for your approval.',src:['UNFI remittance · Sep','Promo agreement']}];
K.ask=function(el){var t=timer(),qb=$(el,'.ix-q'),body=$(el,'.ix-body'),chips=$$(el,'.ix-qc'),cur=0;
 function src(a){return '<div class="ix-srcs">'+a.src.map(function(s){return '<span class="src">▤ '+s+'</span>'}).join('')+'</div>'}
 function ask(i){t.clear();cur=i;var a=QA[i];chips.forEach(function(c,j){c.setAttribute('aria-pressed',String(j===i))});
  if(R){qb.textContent=a.q;body.innerHTML=a.html+src(a);return}
  body.innerHTML='<span class="ix-typing" aria-label="Mozart is typing"><i></i><i></i><i></i></span>';
  typeText(t,qb,a.q,22,0,function(){t.at(800,function(){var p=d.createElement('span');body.innerHTML='';body.appendChild(p);
   var plain=a.html.replace(/<[^>]+>/g,'');typeText(t,p,plain,12,0,function(){body.innerHTML=a.html+src(a);var s=$(body,'.ix-srcs');s.classList.add('off');t.at(30,function(){s.classList.remove('off')})})})})}
 chips.forEach(function(c,i){c.addEventListener('click',function(){ask(i)})});
 return{reset:function(){t.clear()},play:function(){ask(cur)}}};
K.filter=function(el){var bs=$$(el,'.ix-seg button'),rows=$$(el,'[data-k]'),badge=$(el,'.ix-badge'),all=badge.textContent;
 function set(f){bs.forEach(function(b){b.setAttribute('aria-pressed',String(b.getAttribute('data-f')===f))});var n=0;
  rows.forEach(function(r){var on=f==='all'||r.getAttribute('data-k')===f;r.classList.toggle('ix-hide',!on);r.setAttribute('aria-hidden',String(!on));if(on)n++});
  badge.textContent=f==='all'?all:n+' of '+rows.length+' shown'}
 bs.forEach(function(b){b.addEventListener('click',function(){set(b.getAttribute('data-f'))})});
 return{reset:function(){set('all')},play:function(){}}};
var cards=$$(d,'[data-ix]').map(function(el){var c=K[el.getAttribute('data-ix')](el);c.el=el;c.reset();
 var b=d.createElement('button');b.type='button';b.className='ix-replay';b.textContent='Replay ↻';b.setAttribute('aria-label','Replay animation');
 b.addEventListener('click',function(){c.reset();c.play()});el.appendChild(b);return c});
var feats=$$(d,'.feat');
if(!('IntersectionObserver' in window)){cards.forEach(function(c){c.play()});feats.forEach(function(f){f.classList.add('in')});return}
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;io.unobserve(e.target);
 if(e.target.classList.contains('feat'))e.target.classList.add('in');else cards.forEach(function(c){if(c.el===e.target)c.play()})})},{threshold:.35});
cards.forEach(function(c){io.observe(c.el)});feats.forEach(function(f){io.observe(f)});
})();
(function(){var y=document.querySelector('#year');if(y)y.textContent=new Date().getFullYear()})();
