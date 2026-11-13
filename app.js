(()=>{
  const doc=document.documentElement;
  const overlay=document.getElementById('intro');
  const skip=document.getElementById('skip-intro');
  const replay=document.querySelectorAll('.replay-intro');
  const toggle=document.querySelector('.menu-toggle');
  const mobile=document.getElementById('nav-mobile');
  const reduce=window.matchMedia('(prefers-reduced-motion: reduce)');
  let introTimeout=0,cleanupTimeout=0;
  function lock(on){doc.classList.toggle('intro-active',on);document.body.classList.toggle('intro-active',on)}
  function finish(){window.clearTimeout(introTimeout);if(!overlay||!doc.classList.contains('intro-active'))return;overlay.classList.add('closing');window.clearTimeout(cleanupTimeout);cleanupTimeout=window.setTimeout(()=>{lock(false);overlay.setAttribute('aria-hidden','true');overlay.classList.remove('active','closing');},740)}
  function play(){if(!overlay||reduce.matches)return;window.clearTimeout(introTimeout);window.clearTimeout(cleanupTimeout);overlay.classList.remove('closing','active');overlay.setAttribute('aria-hidden','false');lock(true);void overlay.offsetHeight;overlay.classList.add('active');introTimeout=window.setTimeout(finish,3300)}
  skip?.addEventListener('click',finish);
  replay.forEach(btn=>btn.addEventListener('click',()=>{if(mobile){mobile.hidden=true;toggle?.setAttribute('aria-expanded','false')}window.scrollTo({top:0,behavior:'instant'});play()}));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&doc.classList.contains('intro-active'))finish();});
  reduce.addEventListener?.('change',e=>{if(e.matches)finish()});
  if(!reduce.matches)play();
  if(toggle&&mobile){const closeMenu=()=>{mobile.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Abrir menu')};toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fechar menu':'Abrir menu');mobile.hidden=!open});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()})}
  if('IntersectionObserver'in window&&!reduce.matches){const ob=new IntersectionObserver((entries)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('in-view');ob.unobserve(entry.target)}})},{threshold:.09});document.querySelectorAll('.reveal').forEach(el=>ob.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('in-view'));
  const hero=document.querySelector('.hero-scene');if(hero&&!reduce.matches&&window.matchMedia('(pointer:fine)').matches){hero.addEventListener('pointermove',ev=>{const rect=hero.getBoundingClientRect();const x=(ev.clientX-rect.left)/rect.width-.5;const y=(ev.clientY-rect.top)/rect.height-.5;hero.style.setProperty('--mx',(x*8).toFixed(2)+'px');hero.style.setProperty('--my',(y*6).toFixed(2)+'px')},{passive:true});hero.addEventListener('pointerleave',()=>{hero.style.setProperty('--mx','0px');hero.style.setProperty('--my','0px')})}
})();