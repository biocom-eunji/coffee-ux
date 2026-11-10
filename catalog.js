/* ── 기능 플래그 ─────────────────────────────────────────────
   gift: false  → 선물하기를 이번 리뉴얼 범위에서 제외 (화면에서만 숨김, 코드·데이터는 그대로)
   npay: false  → 네이버페이 제외 (아래 TB_NPAY_ON)
   gift: true   → 선물하기 복원 (선물 모음 · 선물 받기 화면, 세트 상세의 선물하기 버튼, 마이페이지 「보낸 선물」, 알림 분류)
   확인용: 주소 끝에 ?gift=on 을 붙이면 플래그와 상관없이 그 화면만 선물하기가 보입니다. */
window.TB_FLAGS = window.TB_FLAGS || { gift: false, npay: false, b2bFloat: false };
/* b2bFloat: false → 사업자 구매 플로팅 버튼을 없애고 PC 헤더 글자 링크 · 상품 상세 안내 링크로 대신함. true 로 바꾸거나 주소 끝에 ?b2bfloat=on 을 붙이면 플로팅 복원 */
/* npay: false → 네이버페이를 이번 리뉴얼 범위에서 제외 (구매 버튼 · 하단 바 · 장바구니의 네이버페이, 결제 수단의 네이버페이를 숨김). true 로 바꾸거나 주소 끝에 ?npay=on 을 붙이면 복원 */
window.TB_NPAY_ON = !(window.TB_FLAGS.npay === false) || /[?&]npay=on\b/.test(location.search);
window.TB_GIFT_ON = !(window.TB_FLAGS.gift === false) || /[?&]gift=on\b/.test(location.search);
/* ============================================================
   더클린커피 · 신제품 카테고리 설정 (MD 관리)
   ------------------------------------------------------------
   enabled 를 true 로 바꾸면 사이트 세 곳에 "신제품"이 가장 먼저 나타납니다.
     1) 홈 화면 COLLECTION — 첫 번째 칸 (홈은 4칸 유지, 기존 4번째 칸은 컬렉션 페이지에서만 보임)
     2) 컬렉션 페이지 — "전체" 바로 다음 첫 번째 탭
     3) 상단 메뉴 COLLECTION 펼침 — 첫 줄

   [ 수정 방법 ]
   · items 에 신제품으로 묶을 상품 페이지 파일명을 적습니다. 예: 'product-velvet.html'
     적힌 상품은 컬렉션 카드에 NEW 표시가 붙고 신제품 탭에 모입니다.
   · items 가 비어 있으면 enabled 가 true 여도 표시되지 않습니다 (빈 카테고리 방지).
   · 신제품 기간이 끝나면 enabled 를 false 로 바꾸면 됩니다.

   ※ 프로토타입용 파일 — 실개발 시 MD가 관리자 화면에서 직접 설정 (기능 사양서 §5-C)
   ============================================================ */

/* 행사 페이지 — 관리자 B2C-20(일반) · B2B-04(사업자)에서 고른 상품. 행사 소개 글 · 이미지는 디자인에서 만듦.
   b2c.open: 메인 배너(B2C-12) 연결을 「행사 페이지」로 둔 배너가 노출 중이면 true — 실개발은 서버가 배너 상태로 판정.
   닫혀 있으면 event.html로 들어와도 홈으로 보냄. 판매 중지 · 품절 상품은 자동으로 빠짐 */
window.TCC_EVENT = {
  b2c: { open: false, title: '행사 상품', items: ['first-note.html', 'gift-dripbag.html', 'product-ethiopia.html'] },
  b2b: { title: '사업자 행사 상품', items: ['business-p-velvet.html'] }
};


/* 이벤트 게시판 — 관리자 PRD-08(MD)에서 행사 글 · 기간 · 상품을 정함. 상태(진행 중 · 예정 · 종료)는 날짜로 자동.
   제품 구매 상단 배너 등 MD 배너가 행사 글로 연결됨 (홈 대배너는 그대로) */
window.TCC_EVENTS = [
  { id:'xmas', title:'크리스마스 에디션', sub:'한 해의 끝, 마음을 담아 건네는 커피', img:'images/design/coll-xmas-banner.jpg', start:'2026-10-20', end:'2026-12-25',
    intro:'연말에 마음을 전할 분이 있다면, 원두와 드립백으로 고른 세 가지 세트를 준비했습니다. 시즌 쿠폰 3종은 12월 13일 아침 8시에 전 회원에게 발급됩니다.',
    items:['first-note.html','gift-dripbag.html','gift-tasting.html','product-velvet.html'] },
  { id:'first-note-season', title:'FIRST NOTE 선물 시즌', sub:'원두 네 가지를 한 상자에', start:'2026-10-01', end:'2026-10-19',
    intro:'싱글 오리진 네 가지를 200g씩 담고, 커피 노트와 펜을 함께 넣었습니다. 받는 분이 어떤 원두를 좋아하는지 몰라도 괜찮은 세트입니다.',
    items:['first-note.html','product-colombia.html','product-ethiopia.html','product-guatemala.html','product-kenya.html'] },
  { id:'chuseok', title:'추석, 마음을 담은 원두 선물', sub:'시즌 쿠폰 3종과 함께', start:'2026-09-14', end:'2026-09-28',
    intro:'명절 선물로 고른 두 가지 세트와 시즌 쿠폰 3종을 함께 드렸던 행사입니다.',
    items:['first-note.html','gift-dripbag.html'] }
];
/* 제품 구매 「전체」 탭 배너 — 관리자 PRD-08에서 MD가 자리 · 문구 · 연결을 정함. 연결은 목록에서 고른 값이고 주소는 여기서 풀어 씀 */
window.TCC_SHOP_BANNERS = { top:{ link:'event:xmas' }, mid:{ link:'product:product-velvet.html' } };
window.TCC_resolveLink = function(link){
  var m=String(link||'').split(':'); var k=m[0], v=m.slice(1).join(':');
  if(k==='event') return 'event.html?id='+v; if(k==='events') return 'events.html'; if(k==='product') return v;
  if(k==='collection') return 'collection.html#'+v; if(k==='subscribe') return 'subscribe.html'; if(k==='reserve') return 'reserve-club.html';
  if(k==='gift') return 'gift.html'; if(k==='signup') return 'signup.html'; return 'collection.html';
};
try{ if(localStorage.getItem('tcc_member')) localStorage.removeItem('tcc_guest'); }catch(e){}
window.TCC_eventStatus = function(ev){ var t=new Date(); var d=t.getFullYear()+'-'+String(t.getMonth()+1).padStart(2,'0')+'-'+String(t.getDate()).padStart(2,'0'); if(ev.end&&ev.end<d) return '종료'; if(ev.start&&ev.start>d) return '예정'; return '진행 중'; };
window.TCC_eventPeriod = function(ev){ function f(s){ return s? (s.slice(5,7).replace(/^0/,'')+'.'+s.slice(8,10)) : ''; } return (f(ev.start)||'—')+' – '+(f(ev.end)||'—'); };

window.TCC_CATALOG = {
  newCategory: {
    enabled : false,
    title   : '신제품',
    desc    : '새로 들어온 원두를<br>가장 먼저 만나보세요',
    image   : null,          // 홈 카드 이미지 경로 예: 'images/new-arrival.jpg' — 없으면 촬영 자리표시
    items   : []             // 예: ['product-velvet.html', 'product-aurora.html']
  }
};

/* ------------------------------------------------------------
   아래는 손대지 않으셔도 됩니다.
   ------------------------------------------------------------ */
(function(){
  var cfg = window.TCC_CATALOG && window.TCC_CATALOG.newCategory;
  function on(){ return cfg && cfg.enabled && cfg.items && cfg.items.length > 0; }
  window.TCC_newOn = on;

  /* 컬렉션 페이지: 탭·카드 표시 — 탭 스크립트보다 먼저 호출됨 */
  window.TCC_applyNewCategory = function(){
    if(!on()) return;
    var tabs = document.getElementById('catTabs');
    if(tabs && !tabs.querySelector('[data-tab="new"]')){
      var b = document.createElement('button');
      b.className = 'cat-tab'; b.type = 'button'; b.setAttribute('role','tab');
      b.setAttribute('aria-selected','false'); b.dataset.tab = 'new';
      b.textContent = cfg.title;
      var all = tabs.querySelector('[data-tab="all"]');
      tabs.insertBefore(b, all ? all.nextSibling : tabs.firstChild);
    }
    var cards = document.querySelectorAll('#collGrid .item');
    for(var i=0;i<cards.length;i++){
      var href = (cards[i].getAttribute('href')||'').split('#')[0];
      if(cfg.items.indexOf(href) > -1){
        if((' '+cards[i].dataset.cats+' ').indexOf(' new ') < 0) cards[i].dataset.cats += ' new';
        if(!cards[i].querySelector('.new-badge')){
          var bd = document.createElement('span'); bd.className = 'new-badge'; bd.textContent = 'NEW';
          var box = cards[i].querySelector('.imgbox'); if(box){ box.style.position='relative'; box.appendChild(bd); }
        }
      }
    }
  };

  /* 홈: COLLECTION 첫 칸 */
  window.TCC_applyNewHome = function(){
    if(!on()) return;
    var grid = document.querySelector('#collection .coll-grid-4');
    if(!grid || grid.querySelector('.item-new')) return;
    var a = document.createElement('a');
    a.className = 'item item-new reveal on'; a.href = 'collection.html#new';
    var img = cfg.image
      ? '<img src="'+cfg.image+'" alt="'+cfg.title+'" style="width:100%;height:100%;object-fit:cover;display:block">'
      : '<div class="tag"><span class="icon"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="1.5"/><circle cx="9" cy="10.5" r="2"/><path d="M3 16l5-4 4 3 4-3.5L21 16"/></svg></span><b>NEW ARRIVAL</b><span>신제품 대표 컷</span></div>';
    a.innerHTML = '<div class="imgbox" style="position:relative">'+img+'<span class="new-badge">NEW</span></div>'
                + '<div class="cap"><h4>'+cfg.title+'</h4><p>'+cfg.desc+'</p></div>';
    grid.insertBefore(a, grid.firstChild);
    var items = grid.querySelectorAll('.item');
    if(items.length > 4) items[items.length-1].style.display = 'none';   // 홈은 4칸 유지
  };

  /* 상단 메뉴: COLLECTION 펼침 첫 줄 (전 페이지) */
  function applyNav(){
    if(!on()) return;
    var drops = document.querySelectorAll('.simple-drop[aria-label="컬렉션 하위 카테고리"]');
    for(var i=0;i<drops.length;i++){
      if(drops[i].querySelector('.nav-new')) continue;
      var l = document.createElement('a');
      l.className = 'nav-new'; l.href = 'collection.html#new'; l.textContent = 'NEW';
      drops[i].insertBefore(l, drops[i].firstChild);
    }
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', applyNav);
  else applyNav();

  /* NEW 배지 공통 스타일 */
  var st = document.createElement('style');
  st.textContent = '.new-badge{position:absolute;top:12px;left:12px;z-index:2;font-size:10px;font-weight:700;letter-spacing:.12em;'
    + 'background:#231715;color:#F2EFEA;padding:4px 9px;line-height:1}';
  (document.head || document.documentElement).appendChild(st);
})();

/* ───────── 상품 표시(BEST · HOT · MD추천) · 관심 상품(하트) ─────────
   표시: 관리자 PRD-09 「상품 표시 · 관심 상품」에서 MD가 상품마다 최대 2개까지 고름(실개발: 상품 API의 badges)
   관심 상품: 회원만 · 하트를 누르면 담기고 다시 누르면 빠짐 · 마이페이지 「관심 상품」에서 모아 봄
   (프로토타입 저장: localStorage tcc_wish — 실개발: 회원별 관심 상품 API) */
/* 인기순 — 최근 7일 구매 확정 판매량(실개발: 홈 「이번주 인기 원두」와 같은 집계, 원두 외 상품 포함). 프로토타입 표본값 */
window.TCC_POP = window.TCC_POP || { 'product-velvet.html':412,'product-colombia.html':388,'product-ethiopia.html':351,'product-aurora.html':327,'gift-dripbag.html':301,'product-dripbag-single.html':276,'product-kenya.html':244,'product-bulletproof.html':231,'first-note.html':198,'product-guatemala.html':176,'product-png.html':154,'product-siesta.html':133,'product-png-decaf.html':121,'gift-tasting.html':96,'product-note.html':41 };
window.TCC_BADGES = window.TCC_BADGES || {
  'product-velvet.html'  : ['BEST'],
  'product-colombia.html': ['HOT'],
  'gift-dripbag.html'    : ['BEST','HOT'],
  'first-note.html'      : ['MD추천'],
  'product-png.html'     : ['MD추천']
};
(function(){
  var NAME={ 'product-colombia.html':'콜롬비아','product-ethiopia.html':'에티오피아','product-kenya.html':'케냐','product-guatemala.html':'과테말라','product-png.html':'파푸아뉴기니','product-png-decaf.html':'파푸아뉴기니 디카페인','product-velvet.html':'벨벳 블렌드','product-aurora.html':'오로라 블렌드','product-siesta.html':'시에스타 · 하프카페인 블렌드','product-vinchaud.html':'벨지안 뱅쇼','product-dripbag-single.html':'드립백 단품','gift-dripbag.html':'드립백 세트','product-bulletproof.html':'더클린 방탄커피','first-note.html':'FIRST NOTE 4종 세트','gift-tasting.html':'디스커버리 세트','product-note.html':'더클린 테이스팅 노트' };
  var PK={ 'product-colombia.html':['beans','colombia'],'product-ethiopia.html':['beans','ethiopia'],'product-kenya.html':['beans','kenya'],'product-guatemala.html':['beans','guatemala'],'product-png.html':['beans','png'],'product-png-decaf.html':['beans','png-decaf'],'product-velvet.html':['beans','velvet'],'product-aurora.html':['beans','aurora'],'product-siesta.html':['beans','siesta'],'product-vinchaud.html':['beans','vinchaud'],'product-dripbag-single.html':['items','dripbag-single'],'gift-dripbag.html':['items','dripbag-set'],'product-bulletproof.html':['items','bulletproof'],'first-note.html':['gift','first-note'],'gift-tasting.html':['gift','discovery'],'product-note.html':['goods','tasting-note'] };
  function clean(h){ return (h||'').split('#')[0].split('?')[0].split('/').pop(); }
  function read(){ try{ return JSON.parse(localStorage.getItem('tcc_wish')||'[]'); }catch(e){ return []; } }
  function write(a){ try{ localStorage.setItem('tcc_wish', JSON.stringify(a)); }catch(e){} }
  function member(){ try{ return JSON.parse(localStorage.getItem('tcc_member')||'null'); }catch(e){ return null; } }
  var W = window.TCC_WISH = {
    list: read,
    has: function(h){ h=clean(h); return read().some(function(x){ return x.href===h; }); },
    toggle: function(h){ h=clean(h); var a=read(), i=-1; a.forEach(function(x,k){ if(x.href===h) i=k; });
      if(i>=0){ a.splice(i,1); write(a); return false; } a.unshift({href:h, name:NAME[h]||'', at:new Date().toISOString().slice(0,10)}); write(a); return true; },
    name: function(h){ return NAME[clean(h)]||''; },
    price: function(h){ var P=window.TCC_PRICES, k=PK[clean(h)]; if(!P||!k) return null; try{ var v=P[k[0]][k[1]]; return k[0]==='beans'?{sale:v['200g'],list:v.list&&v.list['200g']}:{sale:v.price,list:v.listPrice||null}; }catch(e){ return null; } }
  };
  var css='.tcc-badges{display:flex;gap:5px;flex-wrap:wrap;margin-top:10px}'
    +'.item .tcc-badges{justify-content:center}'
    +'.tcc-badge{display:inline-block;padding:3px 8px;font-size:10.5px;font-weight:600;letter-spacing:.06em;line-height:1.3;border:1px solid var(--hair,#E6E4DE);color:var(--ink,#111921);background:#fff}'
    +'.tcc-badge.b-best{background:var(--ink,#111921);border-color:var(--ink,#111921);color:#fff}'
    +'.tcc-badge.b-hot{border-color:var(--ink,#111921)}'
    +'.tcc-badge.b-md{color:var(--slate,#4A5562)}'
    +'.tcc-heart{display:inline-flex;align-items:center;justify-content:center;width:42px;height:42px;padding:0;border:1px solid var(--hair,#E6E4DE);background:#fff;color:var(--ink,#111921);cursor:pointer;flex:none;transition:border-color .2s}'
    +'.tcc-heart svg{width:18px;height:18px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round}'
    +'.tcc-heart:hover{border-color:var(--ink,#111921)}'
    +'.tcc-heart.on svg{fill:var(--ink,#111921)}'
    +'.tcc-heart-img{position:absolute;right:10px;top:10px;z-index:3;width:34px;height:34px;border:0;background:rgba(255,255,255,.86);border-radius:50%}'
    +'.tcc-heart-img svg{width:16px;height:16px}'
    +'.ch-acts{display:flex;gap:8px;margin:10px 16px 16px}.ch-acts .ch-add{flex:1;margin:0}'
    +'.pd-buy-btns .tcc-heart{width:52px;height:auto;align-self:stretch}'
    +'.pd-badges-top .tcc-badges{margin:0 0 12px}'+'.tcc-toast{position:fixed;left:50%;bottom:36px;transform:translateX(-50%);z-index:999;background:var(--ink,#111921);color:#F2EFEA;font-size:13px;padding:12px 18px;display:flex;gap:14px;align-items:center;box-shadow:0 10px 30px rgba(0,0,0,.18)}'
    +'.tcc-toast a{color:#F2EFEA;text-decoration:underline;text-underline-offset:3px}';
  var st=document.createElement('style'); st.id='tcc-wish-css'; st.textContent=css; (document.head||document.documentElement).appendChild(st);
  var HEART='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20s-7-4.4-7-10a4 4 0 017-2.6A4 4 0 0119 10c0 5.6-7 10-7 10z"/></svg>';
  function toast(msg, link){ var t=document.querySelector('.tcc-toast'); if(t) t.remove(); t=document.createElement('div'); t.className='tcc-toast'; t.innerHTML='<span>'+msg+'</span>'+(link||''); document.body.appendChild(t); clearTimeout(window.__tccToast); window.__tccToast=setTimeout(function(){ t.remove(); },2600); }
  function heart(h, cls){ var on=W.has(h); return '<button type="button" class="tcc-heart '+(cls||'')+(on?' on':'')+'" data-wish="'+clean(h)+'" aria-pressed="'+on+'" aria-label="관심 상품 '+(on?'빼기':'담기')+'">'+HEART+'</button>'; }
  function badges(h){ var b=(window.TCC_BADGES||{})[clean(h)]; if(!b||!b.length) return ''; return '<div class="tcc-badges">'+b.slice(0,2).map(function(x){ return '<span class="tcc-badge '+(x==='BEST'?'b-best':x==='HOT'?'b-hot':'b-md')+'">'+x+'</span>'; }).join('')+'</div>'; }
  window.TCC_WISH.heart=heart; window.TCC_WISH.badges=badges;
  function decorate(root){
    root=root||document;
    /* 랭킹 · MD 추천 카드: 담기 옆 하트, 가격 아래 표시 */
    root.querySelectorAll('.ch-card').forEach(function(c){
      if(c.dataset.wish) return; var a=c.querySelector('a.ch-img'); if(!a) return; var h=a.getAttribute('href'); c.dataset.wish='1';
      var add=c.querySelector('.ch-add'); var wrap=document.createElement('div'); wrap.className='ch-acts';
      if(add){ add.parentNode.insertBefore(wrap, add); wrap.appendChild(add); } else c.appendChild(wrap);
      wrap.insertAdjacentHTML('beforeend', heart(h));
      var pr=c.querySelector('.ch-price'); if(pr) pr.insertAdjacentHTML('afterend', badges(h));
    });
    /* 제품 구매 그리드 · 함께 보면 좋은 원두: 사진 오른쪽 위 하트, 가격 아래 표시 */
    root.querySelectorAll('a.item[href], a.pd-related-card[href]').forEach(function(a){
      if(a.dataset.wish) return; var h=a.getAttribute('href'); if(!NAME[clean(h)]) return; a.dataset.wish='1';
      var box=a.querySelector('.imgbox'); if(box){ if(getComputedStyle(box).position==='static') box.style.position='relative'; box.insertAdjacentHTML('beforeend', heart(h,'tcc-heart-img')); }
      if(a.classList.contains('item') && box){ var bh=badges(h); if(bh) box.insertAdjacentHTML('beforeend', bh.replace('class="tcc-badges"','class="tcc-badges tcc-badges-top"')); }
      else { var body=a.querySelector('.cap, .pd-related-body'); if(body) body.insertAdjacentHTML('beforeend', badges(h)); }
    });
  }
  function sync(h){ document.querySelectorAll('.tcc-heart[data-wish="'+h+'"]').forEach(function(b){ var on=W.has(h); b.classList.toggle('on',on); b.setAttribute('aria-pressed',on); b.setAttribute('aria-label','관심 상품 '+(on?'빼기':'담기')); }); }
  document.addEventListener('click', function(e){
    var b=e.target.closest('.tcc-heart'); if(!b) return; e.preventDefault(); e.stopPropagation();
    var h=b.dataset.wish;
    if(!member()){ var next=encodeURIComponent(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')+location.search+location.hash); toast('로그인하시면 관심 상품을 모아 두실 수 있어요.', '<a href="login.html?next='+next+'">로그인</a>'); return; }
    var on=W.toggle(h); sync(h);
    toast(on?'관심 상품에 담았습니다.':'관심 상품에서 뺐습니다.', on?'<a href="mypage.html#wish">마이페이지에서 보기</a>':'');
    document.dispatchEvent(new CustomEvent('tcc:wish'));
  }, true);
  function init(){
    decorate();
    /* 상품 상세: 구매 버튼 줄 끝에 하트, 상품명 아래 표시 */
    var page=clean(location.pathname); var btns=document.querySelector('.pd-buy-btns');
    if(btns && NAME[page] && !btns.querySelector('.tcc-heart')) btns.insertAdjacentHTML('beforeend', heart(page));
    if(NAME[page]){ var t=document.querySelector('.pd-buy-title'); if(t && !document.querySelector('.pd-badges-top')){ var bh=badges(page); if(bh){ var d=document.createElement('div'); d.className='pd-badges-top'; d.innerHTML=bh; t.parentNode.insertBefore(d, t); } } }
    if(window.MutationObserver) new MutationObserver(function(ms){ ms.forEach(function(m){ m.addedNodes.forEach(function(n){ if(n.nodeType===1 && !n.closest('.tcc-toast')) decorate(n.parentNode||document); }); }); }).observe(document.body,{childList:true,subtree:true});
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 원두 상세: 중량 · 분쇄도를 버튼으로 (정기배송 주기 버튼과 같은 모양) · 정기배송 버튼 ─────────
   처음 들어오면 아무것도 고르지 않아도 200g · 홀빈이 선택된 상태. 버튼은 숨긴 선택 상자(#pdWeight · #pdGrind)의 값을 바꿔 기존 구매 · 가격 · 정기배송 동작을 그대로 씀 */
(function(){
  var GR={ whole:['분쇄 안 함(홀빈)'], drip:['일반 분쇄(핸드드립)'], espresso:['고운 분쇄(에스프레소)'], coldbrew:['거친 분쇄(프렌치프레스)'] };
  var css='.pd-optbtns{display:grid;gap:8px;flex:1}'
    +'.pd-optbtns.w{grid-template-columns:repeat(2,1fr)}.pd-optbtns.g{grid-template-columns:repeat(2,1fr)}'
    +'.pd-optbtns button{padding:12px 6px;border:1px solid #E7E1D8;background:#fff;font-family:inherit;font-size:13.5px;color:#5E5750;cursor:pointer;line-height:1.35;transition:border-color .2s}'
    +'.pd-optbtns button small{display:block;margin-top:3px;font-size:11px;color:#9A948C;font-weight:400}'
    +'.pd-optbtns button:hover{border-color:#B9B2A8}'
    +'.pd-optbtns button.on{border-color:#231715;color:#231715;font-weight:700;box-shadow:inset 0 0 0 1px #231715}'
    +'.pd-optbtns button[disabled]{opacity:.4;cursor:not-allowed;text-decoration:line-through}'
    +'select.pd-select.pd-hide{display:none!important}'
    +'.pd-spec.pd-spec-hero{grid-template-columns:1fr!important;gap:6px 0!important}.pd-spec-hero .pd-spec-row{display:flex;justify-content:space-between;align-items:center;max-width:260px}'
    +'.pd-spec-hero .pd-spec-row b{white-space:nowrap}'
    +'@media(max-width:600px){.pd-spec.pd-spec-hero{grid-template-columns:1fr!important;gap:6px 0!important}.pd-spec-hero .pd-spec-row{display:flex;justify-content:space-between;align-items:center;max-width:240px}}'
    +'@media(max-width:560px){.pd-optbtns.g{grid-template-columns:1fr 1fr}.pd-optbtns.g button{font-size:12.5px}}'
    +'.pd-sub-link{margin-top:10px}'
    +'.pd-sub-link a{display:inline-flex!important;align-items:center;gap:6px;width:auto;box-sizing:border-box;padding:11px 18px;border:1px solid #CFCAC1!important;border-radius:2px;background:#fff;color:var(--ink,#111921)!important;text-decoration:none!important;font-size:14px;font-weight:500;letter-spacing:.01em;transition:border-color .2s,color .2s}'
    +'.pd-sub-link a span{display:flex;align-items:center;gap:8px}'
    +'.pd-sub-link a svg{width:16px;height:16px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round;flex:none}'
    +'.pd-sub-link a:hover{border-color:var(--ink,#111921)!important;color:var(--ink,#111921)!important}';
  var st=document.createElement('style'); st.id='tcc-optbtns'; st.textContent=css; (document.head||document.documentElement).appendChild(st);
  function group(sel, kind){
    if(!sel || sel.dataset.btns) return; sel.dataset.btns='1';
    var box=document.createElement('div'); box.className='pd-optbtns '+kind; box.setAttribute('role','radiogroup');
    Array.prototype.forEach.call(sel.options,function(o){ if(!o.value) return;
      var b=document.createElement('button'); b.type='button'; b.dataset.v=o.value; b.setAttribute('role','radio');
      var g=kind==='g'&&GR[o.value]; b.innerHTML=g?g[0]:o.textContent; if(o.disabled) b.disabled=true; box.appendChild(b); });
    function paint(){ box.querySelectorAll('button').forEach(function(b){ var on=b.dataset.v===sel.value; b.classList.toggle('on',on); b.setAttribute('aria-checked',on); }); }
    box.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b||b.disabled) return; sel.value=b.dataset.v; sel.dispatchEvent(new Event('change',{bubbles:true})); paint(); });
    sel.addEventListener('change',paint);
    sel.classList.add('pd-hide'); sel.parentNode.insertBefore(box, sel.nextSibling);
    return paint;
  }
  function init(){
    var w=document.getElementById('pdWeight'), g=document.getElementById('pdGrind');
    if(w && g && g.querySelector('option[value="whole"]')){
      if(!w.value || w.selectedOptions[0].disabled){ var o=w.querySelector('option[value="200g"]'); if(o) w.value='200g'; }
      if(!g.value){ g.value='whole'; }
      w.dispatchEvent(new Event('change',{bubbles:true})); g.dispatchEvent(new Event('change',{bubbles:true}));
      var p1=group(w,'w'), p2=group(g,'g'); p1&&p1(); p2&&p2();
      var note=document.querySelector('.pd-note-inline'); if(note && /선택하셔야/.test(note.textContent)) note.style.display='none';
    }
    document.querySelectorAll('.pd-sub-link a[href^="subscribe"]').forEach(function(a){
      if(a.dataset.big) return; a.dataset.big='1';
      a.innerHTML='<span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11a8 8 0 0 0-14.5-4.6M4 5v4h4M4 13a8 8 0 0 0 14.5 4.6M20 19v-4h-4"/></svg>정기배송으로 받기 →</span>';
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 모바일 메뉴 (햄버거) — 로그인 상자 · 제품 구매(원두 칩 · 드립백/스틱 · 선물세트 · 커피용품) · 이벤트 · 정기구독 · 더클린 스토리 · 가이드 · 리저브 클럽 · 하단 글자 링크 ───────── */
(function(){
  var css='.mnav{padding:20px 22px 36px!important}'
    +'.mnav .mnav-close{font-size:30px!important}'
    +'.mnav .mnav-acc{display:grid!important;grid-template-columns:1fr auto;align-items:center;gap:4px 10px;margin:10px 0 6px!important;padding:16px 14px!important;background:#fff!important;border:1px solid var(--hair)!important}'
    +'.mnav .mnav-acc-t{grid-column:1;margin:0!important;white-space:nowrap;font-size:15.5px!important;font-weight:700!important;color:var(--ink)}'
    +'.mnav .mnav-acc-s{grid-column:1;margin:0!important;font-size:12px!important;line-height:1.5!important;color:var(--slate)}'
    +'.mnav .mnav-acc-b{grid-column:2;grid-row:1/3;display:flex!important;gap:8px}'
    +'.mnav .mnav-acc-b a{flex:none!important;padding:11px 12px!important;font-size:13.5px!important;font-weight:600;white-space:nowrap}'
    +'.mnav .mnav-acc-b a:not(.f){border-color:var(--hair)!important}'
    +'.mm-list{display:flex;flex-direction:column;margin-top:8px}'
    +'.mm-row{display:flex;align-items:center;justify-content:space-between;width:100%;padding:12px 2px;border:0;border-bottom:1px solid var(--hair);background:none;font-family:inherit;font-size:18px;color:var(--ink);text-decoration:none;text-align:left;cursor:pointer}'
    +'.mm-row.big{font-size:20px;font-weight:700}'
    +'.mm-row .car{width:0;height:0;border-left:4.5px solid transparent;border-right:4.5px solid transparent;border-top:6px solid var(--mist);transition:transform .2s;margin-right:8px}'
    +'.mm-grp.open>.mm-row .car{transform:rotate(180deg)}'
    +'.mm-body{display:block}.mm-row .car{display:none!important}.mm-acc>.mm-body{display:none}.mm-acc.open>.mm-body{display:block}.mm-acc>.mm-row .car{display:block!important}.mm-acc>.mm-row{cursor:pointer}'
    +'.mm-row.l2{padding-left:16px;font-size:16px;font-weight:400}'
    +'.mm-beans{display:flex;align-items:center;gap:8px;border-bottom:1px solid var(--hair)}.mm-beans>.mm-row{flex:none;width:auto;border:0;padding-right:0}.mm-beans>.mm-body{flex:1;min-width:0}.mm-beans .mm-chips{border:0!important;padding:0!important;flex-wrap:nowrap!important;gap:4px!important;justify-content:flex-start}.mm-beans .mm-chips a{padding:4px 8px!important;font-size:12px!important;white-space:nowrap}.mm-beans>.mm-row.l2{padding-left:14px!important}.mm-beans .mm-chips{overflow-x:auto;scrollbar-width:none}.mm-beans .mm-chips::-webkit-scrollbar{display:none}@media(max-width:400px){.mm-beans .mm-chips a{padding:4px 6px!important;font-size:11.5px!important}.mm-beans .mm-chips{gap:3px!important}}'+'.mm-chips{display:flex;flex-wrap:wrap;gap:5px;padding:10px 0 12px 16px;border-bottom:1px solid var(--hair)}'
    +'.mm-chips a{padding:5px 10px;border:1px solid var(--hair);border-radius:999px;font-size:12.5px;color:var(--slate);text-decoration:none;background:var(--paper)}.mm-chips a[data-palate]{background:var(--ink,#111921)!important;border-color:var(--ink,#111921)!important;color:#fff!important;font-weight:600}'
    +'.mnav .mnav-quick{display:none!important}'
    +'.mm-gd>.mm-row.l2{font-size:14.5px}'
    +'.mm-head{display:flex;align-items:center;justify-content:space-between;gap:10px;border-bottom:1px solid var(--hair)}.mm-head>.mm-row{border:0!important;width:auto;flex:none}'
    +'.mm-pq{flex:none;display:inline-flex;align-items:center;gap:4px;padding:7px 14px;border:1px solid var(--ink,#111921);border-radius:999px;background:var(--ink,#111921);color:#fff;font-family:inherit;font-size:12.5px;font-weight:600;white-space:nowrap;cursor:pointer}.mm-pq span{font-weight:400}.mm-pq:active{background:#232d38;color:#fff}'
    +'.mm-palate{display:flex;justify-content:space-between;align-items:center;gap:12px;width:100%;box-sizing:border-box;margin:0 0 14px;padding:14px 16px;border:1px solid var(--ink);background:none;font-family:inherit;text-align:left;color:var(--ink);cursor:pointer}'
    +'.mm-palate span{font-size:12px;color:var(--slate);line-height:1.5}.mm-palate span b{display:block;font-size:15px;color:var(--ink);font-weight:700;margin-bottom:2px}.mm-palate i{font-style:normal;font-size:16px}'
    +'.mm-foot{margin-top:auto;padding-top:24px;display:flex;gap:20px}'
    +'.mm-foot a{font-size:14px;color:var(--slate);text-decoration:underline;text-underline-offset:4px}';
  var st=document.createElement('style'); st.textContent=css; (document.head||document.documentElement).appendChild(st);
  var CAR='<i class="car" aria-hidden="true"></i>';
  function build(){
    var nav=document.querySelector('.mnav'); if(!nav) return false;
    var list=nav.querySelector('.mnav-list'); if(!list) return false; if(nav.dataset.v2) return true; nav.dataset.v2='1';
    var BZ=/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''));
    var s=nav.querySelector('.mnav-acc-s');
    if(BZ){ var bm=null; try{ bm=JSON.parse(localStorage.getItem('tcc_biz_member')||'null'); }catch(e){}
      var ac=nav.querySelector('.mnav-acc'); if(ac&&!bm){ ac.innerHTML='<p class="mnav-acc-t">사업자 로그인</p><p class="mnav-acc-s">로그인하시면 전용 단가로 주문하실 수 있습니다.</p><div class="mnav-acc-b"><a class="f" href="business-login.html">로그인</a><a href="business-signup.html">사업자 등록</a></div>'; } }
    else if(s) s.textContent='가입하면 웰컴 쿠폰 5종을 드립니다.';
    var mem=false; try{ mem=!!localStorage.getItem('tcc_member'); }catch(e){}
    var box=document.createElement('div'); box.className='mm-list';
    box.innerHTML=''
      +(false?'<button type="button" class="mm-palate" data-palate><span><b>취향 찾기</b>몇 가지 질문으로 잘 맞는 원두를 추천해 드려요</span><i>→</i></button>':'')
      +'<div class="mm-grp open"><div class="mm-head"><a class="mm-row big" href="collection.html">제품 구매</a>'+(document.getElementById('palateModal')?'<button type="button" class="mm-pq" data-palate>커피 취향 찾기</button>':'')+'</div><div class="mm-body">'
        +'<div class="mm-grp open mm-beans"><a class="mm-row l2" href="collection.html#beans">원두</a><div class="mm-body"><div class="mm-chips">'
          +'<a href="collection.html#beans">전체</a><a href="collection.html#beans-origin">싱글 오리진</a><a href="collection.html#beans-blend">블렌드</a><a href="collection.html#beans-decaf">디카페인</a>'
        +'</div></div></div>'
        +'<div class="mm-grp open mm-beans"><a class="mm-row l2" href="collection.html#dripbag">드립백/스틱</a><div class="mm-body"><div class="mm-chips"><a href="collection.html#dripbag-db">드립백</a><a href="collection.html#dripbag-stick">스틱</a></div></div></div>'
        +'<div class="mm-grp open mm-beans"><a class="mm-row l2" href="collection.html#giftset">선물세트</a><div class="mm-body"><div class="mm-chips"><a href="collection.html#giftset-bean">원두 세트</a><a href="collection.html#giftset-drip">드립백 세트</a></div></div></div>'
        +'<a class="mm-row l2" href="collection.html#goods">커피용품</a>'
      +'</div></div>'
      +'<div class="mm-grp mm-acc"><button type="button" class="mm-row" aria-expanded="false">정기구독'+CAR+'</button><div class="mm-body"><div class="mm-chips"><a href="subscribe.html#sub-all">전체</a><a href="subscribe.html#sub-single">싱글 오리진</a><a href="subscribe.html#sub-blend">블렌드</a><a href="subscribe.html#sub-decaf">디카페인</a><a href="subscribe.html#sub-bp">드립백/스틱</a></div></div></div>'
      +'<a class="mm-row" href="events.html">이벤트</a>'
      +'<a class="mm-row" href="story.html">더클린 스토리</a>'
      +'<div class="mm-grp mm-acc"><button type="button" class="mm-row" aria-expanded="false">더클린 기준'+CAR+'</button><div class="mm-body"><div class="mm-chips"><a href="standard.html">전체</a><a href="standard.html#handpick">결점두와 핸드픽</a><a href="standard.html#labtest">곰팡이독소 검사</a><a href="standard.html#roasting">로스팅 기준</a></div></div></div>'
      +'<div class="mm-grp mm-acc"><button type="button" class="mm-row" aria-expanded="false">커피 가이드'+CAR+'</button><div class="mm-body"><div class="mm-chips"><a href="guide.html#choosing">원두 고르는 법</a><a href="guide.html#brewing">추출 가이드</a><a href="guide.html#storage">보관 · 신선도</a>'+(document.getElementById('palateModal')?'<a href="#palate" data-palate>커피 취향 찾기</a>':'')+'</div></div></div>'
      +'<a class="mm-row" href="reserve-club.html">리저브 클럽</a>';
    if(/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))){ var CH=function(h,t){ return '<a href="business-mypage.html#catalog-'+h+'">'+t+'</a>'; };
      box.innerHTML='<div class="mm-grp open"><a class="mm-row big" href="business-mypage.html#catalog">납품 품목</a><div class="mm-body">'
        +'<div class="mm-grp open mm-beans"><a class="mm-row l2" href="business-mypage.html#catalog-beans">원두</a><div class="mm-body"><div class="mm-chips">'+CH('all','전체')+CH('decaf','디카페인')+'</div></div></div>'
        +'<a class="mm-row l2" href="business-mypage.html#catalog-dripbag">드립백</a><a class="mm-row l2" href="business-mypage.html#catalog-giftset">기업 선물</a><a class="mm-row l2" href="business-mypage.html#catalog-bulletproof">방탄커피</a>'
        +'</div></div>'
        +'<a class="mm-row" href="business-event.html">사업자 행사 상품</a>'
        +'<a class="mm-row" href="business-sample.html">테이스팅 샘플 신청</a>'
        +'<div class="mm-grp mm-acc"><button type="button" class="mm-row" aria-expanded="false">주문 · 정산'+CAR+'</button><div class="mm-body">'
          +'<a class="mm-row l2" href="business-mypage.html#quotes">주문 내역</a><a class="mm-row l2" href="business-mypage.html#orders">납품 · 정산 내역</a><a class="mm-row l2" href="business-mypage.html#terms">거래 조건</a><a class="mm-row l2" href="business-mypage.html#account">사업자 정보</a>'
        +'</div></div>'
        +'<a class="mm-row" href="guide.html">커피 가이드</a>';
    }
    list.replaceWith(box);
    var foot=nav.querySelector('.mnav-foot'); var f=document.createElement('div'); f.className='mm-foot';
    if(/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))){ f.innerHTML='<a href="business-cart.html">사업자 장바구니</a><a href="support.html">고객센터</a><a href="home.html">일반 쇼핑몰</a>'; } else
    f.innerHTML='<a href="cart.html">장바구니</a>'+(mem?'<a href="mypage.html#orders">주문 · 배송 조회</a>':'')+'<a href="support.html">고객센터</a>';
    if(foot) foot.replaceWith(f); else nav.appendChild(f);
    var q=nav.querySelector('.mnav-quick'); if(q) q.remove();
    box.addEventListener('click',function(e){ var b=e.target.closest('button.mm-row'); if(!b) return; e.preventDefault(); e.stopPropagation(); var g=b.parentNode; if(g.classList.contains('mm-acc')){ var o=g.classList.toggle('open'); b.setAttribute('aria-expanded',o?'true':'false'); } });
    return true;
  }
  function init(){ if(build()) return; if(window.MutationObserver){ var mo=new MutationObserver(function(){ if(build()) mo.disconnect(); }); mo.observe(document.body,{childList:true,subtree:true}); } }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 상세 제목 줄 — [정기배송] 상품명 [HOT · BEST · MD추천] 한 줄 정렬 ───────── */
(function(){
  var css='.pd-title-row{display:flex;align-items:center;flex-wrap:wrap;gap:8px 10px}'
    +'.pd-title-row .pd-buy-title{margin:0}'
    +'.pd-title-row .sub-badge{margin:0!important;background:var(--ink,#111921);color:#fff!important;border-color:var(--ink,#111921)!important;padding:5px 10px!important;font-size:11px!important;letter-spacing:.08em!important;line-height:1}'
    +'.pd-title-row .tcc-badges{margin:0!important;flex-wrap:nowrap}'+'.pd-title-row .sub-badge{display:inline-flex!important;align-items:center;gap:5px}.pd-title-row .sub-badge::before{content:"";width:11px;height:11px;background:no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27white%27 stroke-width=%272.2%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M20 11a8 8 0 0 0-14.5-4.6M4 5v4h4M4 13a8 8 0 0 0 14.5 4.6M20 19v-4h-4%27/%3E%3C/svg%3E")}'
    +'.pd-title-row+.pd-buy-sub,.pd-title-row~.pd-buy-sub{margin-top:6px}';
  var st=document.createElement('style'); st.id='pd-title-row-css'; st.textContent=css; document.head.appendChild(st);
  function fix(){
    var t=document.querySelector('.pd-buy-title'); if(!t) return;
    var row=t.parentNode.classList.contains('pd-title-row')?t.parentNode:null;
    if(!row){ row=document.createElement('div'); row.className='pd-title-row'; t.parentNode.insertBefore(row,t); row.appendChild(t); }
    var sb=document.querySelector('.sub-badge'); if(sb && sb.parentNode!==row) row.insertBefore(sb,t);
    var top=document.querySelector('.pd-badges-top'); if(top){ var b=top.querySelector('.tcc-badges'); if(b) row.appendChild(b); top.remove(); }
  }
  function run(){ fix(); setTimeout(fix,50); setTimeout(fix,400); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',run); else run();
  window.addEventListener('load',fix);
})();

/* ───────── 원두 상세 OUR PROCESS — 모바일에서 한 단계씩 크게 보이는 슬라이드(자동 넘김 · 손으로 넘김) ───────── */
(function(){
  var css='@media(max-width:760px){'
    +'#process .pd-moment-grid{display:flex!important;grid-template-columns:none!important;gap:14px!important;overflow-x:auto;scroll-snap-type:x mandatory;scroll-padding-left:20px;padding:0 20px 4px!important;margin-left:-20px!important;margin-right:-20px!important;max-width:none!important;scrollbar-width:none;-webkit-overflow-scrolling:touch}'
    +'#process .pd-moment-grid::-webkit-scrollbar{display:none}'
    +'#process .pd-moment-card{flex:0 0 84%;scroll-snap-align:start;border-top:0!important;padding:0!important;background:var(--white,#fff);text-align:left!important}'
    +'#process .pd-moment-card .imgbox{aspect-ratio:4/3}'
    +'#process .pd-moment-card-body{padding:18px 18px 22px}'
    +'#process .pd-moment-card .ps-n{display:block;font-size:11px;letter-spacing:.18em;color:var(--mist,#8A9099);font-weight:600;margin-bottom:8px}'
    +'#process .pd-moment-card b{font-size:17px!important;margin-bottom:8px!important}'
    +'#process .pd-moment-card span:not(.ps-n){font-size:14px!important;line-height:1.75!important;color:var(--slate,#454C55)!important}'
    +'#process .ps-dots{display:flex;justify-content:center;gap:6px;margin-top:16px}'
    +'#process .ps-dots i{width:6px;height:6px;border-radius:50%;background:#D5D1C9;transition:width .25s,background .25s}'
    +'#process .ps-dots i.on{width:18px;border-radius:3px;background:var(--ink,#111921)}'
    +'}'
    +'@media(min-width:761px){#process .ps-n,#process .ps-dots{display:none}}';
  function init(){
    var sec=document.getElementById('process'); if(!sec) return;
    var grid=sec.querySelector('.pd-moment-grid'); if(!grid||grid.dataset.ps) return; grid.dataset.ps='1';
    var st=document.createElement('style'); st.id='proc-slide-css'; st.textContent=css; document.head.appendChild(st);
    var cards=[].slice.call(grid.querySelectorAll('.pd-moment-card')); var N=cards.length; if(N<2) return;
    cards.forEach(function(c,i){ var b=c.querySelector('.pd-moment-card-body'); if(false && b && !b.querySelector('.ps-n')){ var s=document.createElement('span'); s.className='ps-n'; s.textContent=('0'+(i+1)).slice(-2)+' / '+('0'+N).slice(-2); b.insertBefore(s,b.firstChild); } });
    var dots=document.createElement('div'); dots.className='ps-dots'; dots.setAttribute('aria-hidden','true');
    cards.forEach(function(_,i){ var d=document.createElement('i'); if(!i) d.className='on'; dots.appendChild(d); });
    grid.parentNode.insertBefore(dots, grid.nextSibling);
    function cur(){ var w=cards[0].getBoundingClientRect().width+14; return Math.min(N-1,Math.round(grid.scrollLeft/w)); }
    function paint(){ var k=cur(); [].forEach.call(dots.children,function(d,i){ d.classList.toggle('on',i===k); }); }
    grid.addEventListener('scroll',function(){ window.requestAnimationFrame(paint); },{passive:true});
    var mq=window.matchMedia('(max-width:760px)'), timer=null, hold=0, seen=false;
    function go(){ if(!mq.matches||!seen||Date.now()<hold) return; var k=cur(), nx=(k+1)%N; grid.scrollTo({left:cards[nx].offsetLeft-cards[0].offsetLeft,behavior:'smooth'}); }
    function start(){ if(!timer) timer=setInterval(go,3800); }
    ['touchstart','pointerdown','wheel'].forEach(function(ev){ grid.addEventListener(ev,function(){ hold=Date.now()+7000; },{passive:true}); });
    if('IntersectionObserver' in window){ new IntersectionObserver(function(es){ seen=es[0].isIntersecting; },{threshold:.4}).observe(grid); } else seen=true;
    start();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── 상세 페이지 모바일 하단 고정 구매 바 + 옵션 시트 — 장바구니 아이콘 · 구매하기 → 옵션(타일) · 수량 · 총 금액 → 장바구니 / 바로구매 ───────── */
(function(){
  function won(n){ return n.toLocaleString('ko-KR')+'원'; }
  function init(){
    var box=document.querySelector('.pd-buy-btns'); if(!box||document.querySelector('.m-buybar')) return;
    var SUB=/[?&]sub=1\b/.test(location.search)&&!!document.getElementById('subApply');
    var buy=SUB?document.getElementById('subApply'):(box.querySelector('#pdBuy')||box.querySelector('.btn-ink')); var cart=SUB?null:(box.querySelector('#pdCart')||box.querySelector('.btn-line')); if(!buy||(!SUB&&!cart)) return;
    var panel=box.parentNode;
    var sels=Array.prototype.slice.call(panel.querySelectorAll('select.pd-select')).filter(function(s){ return !s.closest('[hidden]'); });
    var st=document.createElement('style');
    st.textContent='.m-buybar,.m-sheet,.m-sheet-bg{display:none}'
      +'@media(max-width:760px){.m-buybar{position:fixed;left:0;right:0;bottom:0;z-index:90;display:flex;align-items:stretch;background:#fff;border-top:1px solid var(--hair,#E6E4DE);padding-bottom:env(safe-area-inset-bottom,0px)}'
      +'.m-buybar .mb-ic{flex:0 0 64px;height:60px;display:flex;align-items:center;justify-content:center;background:#fff;border:0;border-right:1px solid var(--hair,#E6E4DE);cursor:pointer;color:var(--ink,#111921)}'
      +'.m-buybar .mb-ic svg{width:26px;height:26px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}'
      +'.m-buybar .mb-buy{flex:1;height:60px;border:0;background:var(--ink,#111921);color:#fff;font-family:inherit;font-size:17px;font-weight:600;letter-spacing:.04em;cursor:pointer}'
      +'body.has-mbar{padding-bottom:calc(60px + env(safe-area-inset-bottom,0px))}body.has-mbar .b2b-quick{display:none!important}'
      +'.m-sheet-bg{position:fixed;inset:0;z-index:95;background:rgba(17,25,33,.42);opacity:0;pointer-events:none;transition:opacity .25s;display:block}'
      +'.m-sheet-bg.on{opacity:1;pointer-events:auto}'
      +'.m-sheet{position:fixed;left:0;right:0;bottom:0;z-index:96;display:flex;flex-direction:column;max-height:82vh;background:#fff;border-radius:18px 18px 0 0;transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1)}'
      +'.m-sheet.on{transform:none}'
      +'.ms-grip{width:44px;height:5px;border-radius:3px;background:#D9D7D2;margin:10px auto 4px;flex:none}'
      +'.ms-body{overflow:auto;padding:12px 20px 18px}'
      +'.ms-g-sel{display:grid;grid-template-columns:auto 1fr;align-items:center;gap:12px}.ms-g-sel h4{margin:0!important;min-width:48px}.ms-g-sel+.ms-g-sel{margin-top:8px!important}.ms-sel{width:100%;height:46px;padding:0 40px 0 14px;border:1px solid var(--hair,#E6E4DE);border-radius:6px;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23111921%27 stroke-width=%271.8%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E") no-repeat right 14px center/18px;-webkit-appearance:none;appearance:none;font-family:inherit;font-size:15px;color:var(--ink,#111921)}'
      +'.ms-g+.ms-g{margin-top:22px}.ms-g h4{margin:0 0 10px;font-size:14px;font-weight:700;color:var(--ink,#111921)}'
      +'.ms-tiles{display:grid;grid-template-columns:1fr 1fr;gap:8px}'
      +'.ms-tiles button{min-height:52px;padding:10px 8px;background:#fff;border:1px solid var(--hair,#E6E4DE);font-family:inherit;font-size:14px;color:var(--slate,#454C55);cursor:pointer;word-break:keep-all}'
      +'.ms-tiles button.on{border:2px solid var(--ink,#111921);color:var(--ink,#111921);font-weight:700}'
      +'.ms-pick{margin-top:20px;padding:16px;border:1.5px solid var(--ink,#111921);border-radius:10px;display:grid;grid-template-columns:1fr auto;gap:12px 10px;align-items:center}'
      +'.ms-pick p{grid-column:1/-1;margin:0;font-size:14px;color:var(--ink,#111921)}'
      +'.ms-pick[hidden],.ms-total[hidden],.ms-hint[hidden]{display:none!important}.ms-qty[hidden]{display:none!important}.ms-qty{display:flex;align-items:center;background:#F4F3F0;border-radius:6px}.ms-qty button{width:42px;height:40px;border:0;background:none;font-size:20px;cursor:pointer;color:var(--ink,#111921)}.ms-qty span{min-width:40px;text-align:center;font-size:16px;font-weight:600}'
      +'.ms-pick b{font-size:18px;font-weight:800;color:var(--ink,#111921)}'
      +'.ms-total{display:flex;justify-content:space-between;align-items:baseline;margin-top:18px}.ms-total span{font-size:16px;font-weight:700}.ms-total b{font-size:24px;font-weight:800}'
      +'.ms-hint{margin-top:16px;font-size:13px;color:var(--mist,#8A9099);text-align:center}'
      +'.ms-foot{display:grid;grid-template-columns:1fr 1fr;flex:none;padding-bottom:env(safe-area-inset-bottom,0px)}.ms-foot .s{grid-column:1/-1;height:50px!important;background:#EAF5FA!important;color:var(--ink,#111921)!important;border-top:1px solid #CFE8F2!important;font-size:15px!important}.ms-foot button{flex:1;height:60px;border:0;font-family:inherit;font-size:17px;font-weight:600;cursor:pointer}'
      +'.ms-foot .c{background:#fff;color:var(--ink,#111921);border-top:1px solid var(--hair,#E6E4DE)}.ms-foot .b{background:var(--ink,#111921);color:#fff}'
      +'.ms-foot button:disabled{opacity:.35;cursor:default}'
      +'.ms-foot.has-g{grid-template-columns:1fr 1fr 1.25fr}.ms-foot .g{order:2;background:#fff!important;color:var(--ink,#111921)!important;border-top:1px solid var(--hair,#E6E4DE)!important;border-left:1px solid var(--hair,#E6E4DE)!important;font-weight:600}.ms-foot.has-g .c{order:1}.ms-foot.has-g .b{order:3}.ms-foot.has-g .s{order:0}'
      +'.m-buybar .tcc-heart.mb-wish{position:static!important;flex:0 0 64px!important;width:64px!important;height:60px!important;border-radius:0!important;border:0!important;border-right:1px solid var(--hair,#E6E4DE)!important;box-shadow:none!important;background:#fff!important;transform:none!important}.m-buybar .tcc-heart.mb-wish svg{width:25px!important;height:25px!important;fill:none;stroke:var(--ink,#111921);stroke-width:1.5}.m-buybar .tcc-heart.mb-wish.on svg{fill:#3BC1E4!important;stroke:#3BC1E4!important}'
      +'.m-buybar .mb-gift{flex:0 0 108px;height:60px;border:0;border-right:1px solid var(--hair,#E6E4DE);background:#fff;color:var(--ink,#111921);font-family:inherit;font-size:16px;font-weight:600;cursor:pointer}}';
    document.head.appendChild(st);
    var IC='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>';
    var bar=document.createElement('div'); bar.className='m-buybar'; bar.setAttribute('role','group'); bar.setAttribute('aria-label','구매');
    var WH=(window.TCC_WISH&&TCC_WISH.heart)?TCC_WISH.heart(location.pathname,'mb-ic mb-wish'):'';
    bar.innerHTML=WH+(document.getElementById('giftBtn')&&!SUB&&window.TB_GIFT_ON?'<button type="button" class="mb-gift">선물하기</button>':'')+'<button type="button" class="mb-buy">'+(SUB?'정기배송 신청하기':'구매하기')+'</button>';
    document.body.appendChild(bar); document.body.classList.add('has-mbar');
    /* 옵션 시트 */
    var bg=document.createElement('div'); bg.className='m-sheet-bg';
    var sh=document.createElement('div'); sh.className='m-sheet'; sh.setAttribute('role','dialog'); sh.setAttribute('aria-label','옵션 선택');
    var beans=!!(document.getElementById('pdWeight')&&document.getElementById('pdGrind')&&window.PD_PRICE);
    var qty=1;
    var subA=SUB?null:document.querySelector('.pd-sub-link a[href]');
    var giftB=(SUB||!window.TB_GIFT_ON)?null:document.getElementById('giftBtn');  /* 선물세트 — 「선물하기」 */
    var cyc=SUB?document.getElementById('subCycle'):null;
    function labelOf(s){ var row=s.closest('.pd-select-row'); var l=row&&row.querySelector('label'); return l?l.textContent.trim():(s.getAttribute('aria-label')||'옵션'); }
    var html='<div class="ms-grip"></div><div class="ms-body">';
    sels.forEach(function(s,i){
      /* 원두 고르기처럼 보기가 많은 옵션(5개 이상)은 드롭다운으로 — 타일은 면적을 많이 차지함 */
      if(/원두|박스/.test(labelOf(s))||Array.prototype.filter.call(s.options,function(o){ return o.value; }).length>4){
        html+='<div class="ms-g ms-g-sel"><h4>'+labelOf(s)+'</h4><select class="ms-sel" data-si="'+i+'">'+Array.prototype.map.call(s.options,function(o){ return '<option value="'+o.value+'"'+(s.value===o.value?' selected':'')+'>'+o.text+'</option>'; }).join('')+'</select></div>';
        return;
      }
      html+='<div class="ms-g"><h4>'+labelOf(s)+'</h4><div class="ms-tiles" data-i="'+i+'">';
      Array.prototype.slice.call(s.options).forEach(function(o){ if(!o.value) return; html+='<button type="button" data-v="'+o.value+'"'+(s.value===o.value?' class="on"':'')+'>'+o.text+'</button>'; });
      html+='</div></div>';
    });
    if(cyc){ html+='<div class="ms-g"><h4>배송 주기</h4><div class="ms-tiles ms-cyc" style="grid-template-columns:repeat(3,1fr)">'; Array.prototype.slice.call(cyc.querySelectorAll('button')).forEach(function(b){ html+='<button type="button" data-c="'+b.dataset.c+'"'+(b.classList.contains('on')?' class="on"':'')+'>'+b.textContent+'</button>'; }); html+='</div></div>'; }
    html+='<div class="ms-pick" hidden><p></p><div class="ms-qty"'+(beans&&!SUB?'':' hidden')+'><button type="button" data-d="-1" aria-label="수량 빼기">−</button><span>1</span><button type="button" data-d="1" aria-label="수량 더하기">+</button></div><b></b></div>'
      +'<div class="ms-total" hidden><span>총 금액</span><b></b></div><p class="ms-hint">옵션을 선택해 주세요</p></div>'
      +'<div class="ms-foot'+(giftB?' has-g':'')+'">'+(giftB?'<button type="button" class="g" disabled>선물하기</button>':'')+(subA?'<button type="button" class="s">정기배송으로 받기</button>':'')+'<button type="button" class="c" disabled>장바구니</button><button type="button" class="b" disabled>'+(SUB?'정기배송 신청하기':'바로구매')+'</button></div>';
    sh.innerHTML=html; document.body.appendChild(bg); document.body.appendChild(sh);
    var pick=sh.querySelector('.ms-pick'), tot=sh.querySelector('.ms-total'), hint=sh.querySelector('.ms-hint'), fc=sh.querySelector('.ms-foot .c'), fb=sh.querySelector('.ms-foot .b');
    function ready(){ return sels.every(function(s){ return !!s.value; }); }
    function unit(){ if(!beans) return null; var w=document.getElementById('pdWeight').value; var p=window.PD_PRICE[w]; return p!=null?p:null; }
    function render(){
      var ok=ready(); pick.hidden=!ok; tot.hidden=!ok||!beans; hint.hidden=ok; fc.disabled=!ok; fb.disabled=!ok; var fg0=sh.querySelector('.ms-foot .g'); if(fg0) fg0.disabled=!ok;
      if(!ok) return;
      pick.querySelector('p').textContent=(sels.length?'':((document.querySelector('.pd-buy-title')||{}).textContent||'').trim())+sels.map(function(s){ return s.options[s.selectedIndex].text; }).join(' · ')+(cyc&&cyc.querySelector('button.on')?' · '+cyc.querySelector('button.on').textContent+'마다':'');
      pick.querySelector('.ms-qty span').textContent=qty;
      var u=unit(); pick.querySelector('b').textContent=u!=null?won(u*qty):''; if(u!=null) tot.querySelector('b').textContent=won(u*qty); if(!beans){ var pp=document.querySelector('.pd-buy-wrap .pd-price, .pd-price'); if(pp){ pick.querySelector('b').textContent=pp.textContent.trim(); tot.hidden=false; tot.querySelector('b').textContent=pp.textContent.trim(); } }
    }
    sh.querySelectorAll('.ms-tiles[data-i]').forEach(function(t){ t.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; var s=sels[+t.dataset.i]; s.value=b.dataset.v; s.dispatchEvent(new Event('change',{bubbles:true})); t.querySelectorAll('button').forEach(function(x){ x.classList.toggle('on',x===b); }); render(); }); });
    sh.querySelectorAll('.ms-sel').forEach(function(x){ x.addEventListener('change',function(){ var s=sels[+x.dataset.si]; s.value=x.value; s.dispatchEvent(new Event('change',{bubbles:true})); render(); }); });
    var mc=sh.querySelector('.ms-cyc'); if(mc&&cyc) mc.addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; mc.querySelectorAll('button').forEach(function(x){ x.classList.toggle('on',x===b); }); var o=cyc.querySelector('button[data-c="'+b.dataset.c+'"]'); if(o) o.click(); render(); });
    sh.querySelector('.ms-qty').addEventListener('click',function(e){ var b=e.target.closest('button'); if(!b) return; qty=Math.max(1,Math.min(99,qty+(+b.dataset.d))); render(); });
    function open(){ sels.forEach(function(s,i){ var x=sh.querySelector('.ms-sel[data-si="'+i+'"]'); if(x){ x.value=s.value; return; } var t=sh.querySelector('.ms-tiles[data-i="'+i+'"]'); if(!t) return; t.querySelectorAll('button').forEach(function(x){ x.classList.toggle('on',x.dataset.v===s.value); }); }); render(); bg.classList.add('on'); sh.classList.add('on'); document.body.style.overflow='hidden'; }
    function close(){ bg.classList.remove('on'); sh.classList.remove('on'); document.body.style.overflow=''; }
    bg.addEventListener('click',close);
    var y0=null; sh.querySelector('.ms-grip').addEventListener('click',close);
    sh.addEventListener('touchstart',function(e){ y0=e.touches[0].clientY; },{passive:true});
    sh.addEventListener('touchend',function(e){ if(y0!=null && e.changedTouches[0].clientY-y0>80 && sh.querySelector('.ms-body').scrollTop<=0) close(); y0=null; });
    function act(mode){
      if(!ready()) return;
      if(SUB&&window.TCC_SUB_ADD){ var ok=TCC_SUB_ADD(mode==='buy'); if(ok&&mode!=='buy'){ close(); var n=document.querySelector('.pd-note-inline'); if(n){ n.innerHTML='정기배송 장바구니에 담았습니다. <a href="cart.html#sub" style="color:inherit;font-weight:700;text-decoration:underline">장바구니 보기</a>'; n.style.color=''; } } return; }
      if(beans && window.TCC && TCC.add){
        var w=document.getElementById('pdWeight'), g=document.getElementById('pdGrind');
        TCC.add({ name:((document.querySelector('.pd-buy-title')||{}).textContent||document.title.split(' · ')[0]).trim(), opt:w.value+' · '+g.options[g.selectedIndex].text, qty:qty, price:unit() });
        if(mode==='buy'){ (TCC.buyNow?TCC.buyNow():location.href='checkout.html'); return; }
        close(); var n=document.querySelector('.pd-note-inline'); if(n){ n.innerHTML='장바구니에 담았습니다. <a href="cart.html" style="color:inherit;font-weight:700;text-decoration:underline">장바구니 보기</a>'; n.style.color=''; }
        return;
      }
      close(); (mode==='buy'?buy:cart).click();
    }
    var fs=sh.querySelector('.ms-foot .s'); if(fs) fs.addEventListener('click',function(){ close(); location.href=subA.getAttribute('href'); });
    fc.addEventListener('click',function(){ act('cart'); }); fb.addEventListener('click',function(){ act('buy'); });
    var fg=sh.querySelector('.ms-foot .g'); if(fg) fg.addEventListener('click',function(){ if(!ready()) return; close(); giftB.click(); });
    var mg=bar.querySelector('.mb-gift'); if(mg) mg.addEventListener('click',open);
    var mbc=bar.querySelector('.mb-cart'); if(mbc) mbc.addEventListener('click',open);
    bar.querySelector('.mb-buy').addEventListener('click',open);
  }
  function later(){ setTimeout(init,0); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', later); else later();
})();

/* ───────── 상품 카드 통일 — 이름 · 컵노트 · 가격(판매가 + 정가 취소선), 사진 위 장바구니 아이콘 (홈 랭킹 · 함께 보면 좋은 원두 · 검색 · 행사) ───────── */
(function(){
  /* 썸네일 한 줄 = 맛의 방향(산미 · 고소함 · 묵직함). 컵노트는 상세 페이지에서 */ var NOTES={'product-velvet.html':'다크초콜릿의 깊은 풍미와 견과의 고소함','product-aurora.html':'베리와 복숭아의 달콤함, 은은한 꽃향','product-siesta.html':'꽃과 과일 향에 밀크초콜릿의 단맛이 어우러진 블렌드','product-vinchaud.html':'포도와 시나몬, 따뜻한 뱅쇼를 닮은 겨울 블렌드','gift-dripbag.html':'어디서든 간편하게 즐기는\n좋은 커피 한 잔','first-note.html':'직접 고른 네 가지 커피를\n맛보고 기록하는 즐거움','gift-tasting.html':'로스터가 추천하는\n이달의 원두 세 가지','product-png.html':'산뜻한 시트러스와 고소한 아몬드의 조화','product-png-decaf.html':'초콜릿의 단맛과 견과의 고소함을 담은 디카페인','product-colombia.html':'잘 익은 블루베리의 단맛과 흑설탕 같은 진한 여운','product-ethiopia.html':'레몬사탕의 산뜻함과 자스민의 은은한 향','product-kenya.html':'자몽의 산뜻한 산미와 루이보스차 같은 여운','product-guatemala.html':'오렌지 마멀레이드의 단맛과 카카오의 깊은 풍미'};
  var BEANKEY={'product-colombia.html':'colombia','product-ethiopia.html':'ethiopia','product-kenya.html':'kenya','product-guatemala.html':'guatemala','product-png.html':'png','product-png-decaf.html':'png-decaf','product-velvet.html':'velvet','product-aurora.html':'aurora','product-siesta.html':'siesta','product-vinchaud.html':'vinchaud'};
  var BAG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>';
  var css=''
    +'.cv2-cart{position:absolute!important;right:10px;top:10px;z-index:4;width:44px!important;height:44px!important;margin:0!important;padding:0!important;border-radius:50%!important;border:0!important;background:#fff!important;display:flex!important;align-items:center;justify-content:center;cursor:pointer;box-shadow:0 2px 10px rgba(17,25,33,.08);font-size:0!important;color:var(--ink,#111921)!important}'
    +'.cv2-cart svg{width:20px!important;height:20px!important;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linejoin:round;stroke-linecap:round}'
    +'.cv2-cart.done{background:var(--ink,#111921)!important;color:#fff!important}'
    +'.ch-card.cv2{position:relative;border-radius:6px;overflow:hidden}'
    +'.ch-card.cv2 .ch-img{position:relative}'
    +'.ch-card.cv2 .ch-body{display:block!important;padding:16px 16px 18px!important}'
    +'.ch-card.cv2 .ch-no{position:absolute!important;top:10px;left:10px;z-index:3;width:auto!important;min-width:28px;height:28px;padding:0 7px;display:flex;align-items:center;justify-content:center;background:var(--ink,#111921);color:#fff!important;font-size:14px!important;font-weight:700}'
    +'.ch-card.cv2 .ch-name{font-size:18px!important;font-weight:700!important;line-height:1.35}'
    +'.cv2-note{margin-top:6px;font-size:14.5px;color:var(--slate,#454C55);white-space:pre-line;word-break:keep-all;line-height:1.45;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}'
    +'.ch-card.cv2 .ch-price,.cv2 .cap-price{display:flex!important;flex-wrap:nowrap!important;justify-content:flex-start!important;align-items:baseline;gap:8px!important;margin-top:12px!important;white-space:nowrap}'
    +'.ch-card.cv2 .ch-price em,.cv2 .cap-price em{display:none!important}'
    +'.ch-card.cv2 .ch-price b,.cv2 .cap-price b{font-size:20px!important;font-weight:800!important;color:var(--ink,#111921)}'
    +'.ch-card.cv2 .ch-price s,.cv2 .cap-price s{font-size:15px!important;color:var(--slate,#454C55)!important}'
    +'.cv2 .tcc-badges,.cv2 .tcc-heart,.cv2 .ch-acts .tcc-heart,.cv2 .cur-rank{display:none!important}'
    +'.ch-card.cv2 .ch-acts{display:none!important}'
    +'a.pd-related-card.cv2{border:1px solid var(--hair,#E6E4DE);border-radius:6px;background:#fff}'
    +'a.pd-related-card.cv2 .imgbox{position:relative}'
    +'a.pd-related-card.cv2 .pd-related-body b{font-family:inherit!important;font-size:18px!important;font-weight:700!important;margin:0!important}'
    +'a.pd-related-card.cv2 .pd-related-body>span{margin-top:6px;font-size:14.5px!important;white-space:pre-line;word-break:keep-all;line-height:1.45;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}'
    +'a.item.cv2{background:#fff;border:1px solid var(--hair,#E6E4DE);border-radius:6px;overflow:hidden}'
    +'a.item.cv2 .imgbox{position:relative}'
    +'a.item.cv2 .cap{text-align:left!important;padding:16px!important}'
    +'a.item.cv2 .cap h4{font-size:18px!important;font-weight:700!important;margin:0}'
    +'a.item.cv2 .cap>p{margin-top:6px;font-size:14.5px;color:var(--slate,#454C55);white-space:pre-line;word-break:keep-all;line-height:1.45;display:-webkit-box;-webkit-line-clamp:4;-webkit-box-orient:vertical;overflow:hidden}'
    +'@media(max-width:760px){.cv2-cart{width:38px!important;height:38px!important}.cv2-cart svg{width:18px!important;height:18px!important}'
    +'.ch-card.cv2 .ch-name,a.pd-related-card.cv2 .pd-related-body b,a.item.cv2 .cap h4{font-size:16px!important}.cv2-note,a.pd-related-card.cv2 .pd-related-body>span,a.item.cv2 .cap>p{font-size:13px!important}'
    +'.ch-card.cv2 .ch-price b,.cv2 .cap-price b{font-size:17px!important}.ch-card.cv2 .ch-price s,.cv2 .cap-price s{font-size:13px!important}.ch-card.cv2 .ch-body{padding:14px 12px 16px!important}}';
  var st=document.createElement('style'); st.id='cv2-css'; st.textContent=css; (document.head||document.documentElement).appendChild(st);
  function clean(h){ return (h||'').split('#')[0].split('?')[0]; }
  function addBean(h,name,btn){
    var k=BEANKEY[h]; var P=window.TCC_PRICES||{}; var pr=null; try{ pr=P.beans[k]['200g']; }catch(e){}
    if(k&&pr!=null&&window.TCC&&TCC.add){ TCC.add({ name:name, opt:'200g · 분쇄 안 함(홀빈)', qty:1, price:pr }); TCC.badge&&TCC.badge(); btn.classList.add('done'); setTimeout(function(){ btn.classList.remove('done'); },1400); return true; }
    return false;
  }
  function cartBtn(box,h,name,href){
    if(!box||box.querySelector('.cv2-cart,.cv-cart')) return;
    if(getComputedStyle(box).position==='static') box.style.position='relative';
    var b=document.createElement('button'); b.type='button'; b.className='cv2-cart'; b.setAttribute('aria-label',name+' 장바구니 담기'); b.innerHTML=BAG; box.appendChild(b);
    b.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); if(!addBean(h,name,b)) location.href=href; });
  }
  function decorate(){
    document.querySelectorAll('.ch-card:not(.cv2)').forEach(function(c){
      var img=c.querySelector('.ch-img'); if(!img) return; c.classList.add('cv2');
      var h=clean(img.getAttribute('href')); var nm=c.querySelector('.ch-name');
      if(nm&&NOTES[h]&&!c.querySelector('.cv2-note')){ var n=document.createElement('span'); n.className='cv2-note'; n.textContent=NOTES[h]; nm.insertAdjacentElement('afterend',n); }
      var add=c.querySelector('.ch-add');
      if(add){ img.style.position='relative'; add.classList.add('cv2-cart'); add.setAttribute('aria-label',(nm?nm.textContent:'')+' 장바구니 담기');
        img.appendChild(add); add.addEventListener('click',function(e){ e.preventDefault(); },true);
        new MutationObserver(function(){ if(!add.querySelector('svg')) add.innerHTML=BAG+(add.classList.contains('done')?'':''); }).observe(add,{childList:true}); add.innerHTML=BAG; }
      else cartBtn(img,h,nm?nm.textContent.trim():'',img.getAttribute('href'));
    });
    document.querySelectorAll('a.pd-related-card[href]:not(.cv2)').forEach(function(a){
      a.classList.add('cv2'); var h=clean(a.getAttribute('href')); var sp=a.querySelector('.pd-related-body>span'); if(sp&&NOTES[h]) sp.textContent=NOTES[h];
      var b=a.querySelector('.pd-related-body>b'); cartBtn(a.querySelector('.imgbox'),h,b?b.textContent.trim():'',a.getAttribute('href'));
    });
    document.querySelectorAll('a.item[href]:not(.cv2)').forEach(function(a){
      if(a.closest('.collection-full')) return; a.classList.add('cv2'); var h=clean(a.getAttribute('href')); var p=a.querySelector('.cap>p'); if(p&&NOTES[h]) p.textContent=NOTES[h];
      var t=a.querySelector('.cap h4'); cartBtn(a.querySelector('.imgbox'),h,t?t.textContent.trim():'',a.getAttribute('href'));
    });
  }
  function init(){ decorate(); var tm=null; if(window.MutationObserver) new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(decorate,60); }).observe(document.body,{childList:true,subtree:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 모바일 상단 — 로고 · 검색창 · 장바구니 · 메뉴 (SSG식 검색창) ───────── */
(function(){
  function init(){
    var right=document.querySelector('#nav .gnb-right'); if(!right||right.querySelector('.m-search')) return;
    var st=document.createElement('style');
    st.textContent='.m-search{display:none}'
      +'@media(max-width:900px){#nav .gnb-right .m-search{display:flex;align-items:center;justify-content:space-between;gap:8px;flex:1;min-width:0;max-width:170px;height:40px;padding:0 12px 0 16px;border-radius:999px;background:#F1F1EF;color:var(--mist,#8A9099);font-size:13px;text-decoration:none;white-space:nowrap;overflow:hidden}'
      +'#nav .gnb-right .m-search svg{flex:none;width:19px;height:19px;fill:none;stroke:var(--ink,#111921);stroke-width:1.7;stroke-linecap:round}'
      +'#nav .gnb-right .m-search span{overflow:hidden;text-overflow:ellipsis}'
      +'#nav .gnb-right a.icon-btn[aria-label="검색"],#nav .gnb-right a.icon-btn[aria-label="내 계정"],#nav .gnb-right a.icon-btn[aria-label="로그인"]{display:none!important}'
      +'#nav .gnb-right{gap:14px!important;flex:1;justify-content:flex-end;min-width:0;margin-left:14px}#nav>a:first-child,#nav .logo,#nav .gnb-logo{flex:none!important;white-space:nowrap}#nav .gnb-right .m-search{max-width:none;height:42px;font-size:14px;color:#6F767E;background:#F0EFEC}#nav .gnb-right .icon-btn svg{width:23px!important;height:23px!important}#nav .gnb-burger{width:24px!important}}';
    document.head.appendChild(st);
    var a=document.createElement('a'); a.className='m-search'; a.href='search.html'; a.setAttribute('aria-label','검색');
    a.innerHTML='<span>검색</span><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/></svg>';
    right.insertBefore(a,right.firstChild);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 최근 본 상품 — 상세 페이지를 보면 저장, 모바일 화면 오른쪽 아래에 마지막으로 본 상품 사진 (누르면 최근 본 상품 목록) ───────── */
(function(){
  var KEY='tcc_recent';
  function read(){ try{ return JSON.parse(localStorage.getItem(KEY)||'[]'); }catch(e){ return []; } }
  function write(a){ try{ localStorage.setItem(KEY, JSON.stringify(a.slice(0,10))); }catch(e){} }
  var page=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'').split('?')[0];
  var isPd=/^(product-[a-z-]+|first-note|gift-dripbag|gift-tasting)\.html$/.test(page);
  function init(){
    if(isPd){
      var t=document.querySelector('.pd-buy-title, .pd-buy h1, h1'); var name=t?t.textContent.trim():document.title.split('·')[0].trim();
      var img='images/thumbs/'+page.replace('.html','')+'.jpg';
      var a=read().filter(function(x){ return x.href!==page; }); a.unshift({href:page,name:name,img:img}); write(a);
    }
    var list=read().filter(function(x){ return x.href!==page; }); if(!list.length) return;
    var st=document.createElement('style');
    st.textContent='.rv-fab,.rv-sheet,.rv-bg{display:none}'
      +'@media(max-width:760px){.rv-fab{position:fixed;right:14px;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:85;display:block;width:58px;height:58px;padding:0;border-radius:12px;border:1px solid var(--hair,#E6E4DE);background:#fff;box-shadow:0 6px 18px rgba(17,25,33,.16);overflow:hidden;cursor:pointer}'
      +'body.has-mbar .rv-fab{bottom:calc(74px + env(safe-area-inset-bottom,0px))}body.ckm .rv-fab{display:none}'
      +'.rv-fab img{width:100%;height:100%;object-fit:cover;display:block}'
      +'.rv-fab i{position:absolute;left:0;right:0;bottom:0;font-style:normal;font-size:9.5px;font-weight:700;color:#fff;background:rgba(17,25,33,.72);text-align:center;padding:2px 0;letter-spacing:.02em}'
      +'.rv-bg{position:fixed;inset:0;z-index:97;background:rgba(17,25,33,.42);display:block;opacity:0;pointer-events:none;transition:opacity .25s}.rv-bg.on{opacity:1;pointer-events:auto}'
      +'.rv-sheet{position:fixed;left:0;right:0;bottom:0;z-index:98;display:block;background:#fff;border-radius:18px 18px 0 0;padding:10px 0 calc(18px + env(safe-area-inset-bottom,0px));transform:translateY(105%);transition:transform .3s cubic-bezier(.2,.8,.2,1)}.rv-sheet.on{transform:none}'
      +'.rv-sheet .g{width:44px;height:5px;border-radius:3px;background:#D9D7D2;margin:0 auto 12px}'
      +'.rv-sheet h4{margin:0 20px 14px;font-size:18px;font-weight:700;color:var(--ink,#111921)}'
      +'.rv-row{display:flex;gap:12px;overflow-x:auto;padding:0 20px 4px;scrollbar-width:none}.rv-row::-webkit-scrollbar{display:none}'
      +'.rv-row a{flex:0 0 108px;text-decoration:none;color:var(--ink,#111921)}.rv-row img{width:108px;height:108px;object-fit:cover;border-radius:8px;border:1px solid var(--hair,#E6E4DE);display:block;background:#F3F3F3}'
      +'.rv-row span{display:block;margin-top:8px;font-size:13px;line-height:1.4;word-break:keep-all}}';
    document.head.appendChild(st);
    var fab=document.createElement('button'); fab.type='button'; fab.className='rv-fab'; fab.setAttribute('aria-label','최근 본 상품');
    fab.innerHTML='<img alt=""><i>최근 본</i>'; fab.querySelector('img').src=list[0].img; fab.querySelector('img').alt=list[0].name;
    document.body.appendChild(fab);
    var bg=document.createElement('div'); bg.className='rv-bg'; var sh=document.createElement('div'); sh.className='rv-sheet'; sh.setAttribute('role','dialog'); sh.setAttribute('aria-label','최근 본 상품');
    sh.innerHTML='<div class="g"></div><h4>최근 본 상품</h4><div class="rv-row"></div>';
    var row=sh.querySelector('.rv-row'); list.forEach(function(x){ var a=document.createElement('a'); a.href=x.href; a.innerHTML='<img alt=""><span></span>'; a.querySelector('img').src=x.img; a.querySelector('img').alt=x.name; a.querySelector('span').textContent=x.name; row.appendChild(a); });
    document.body.appendChild(bg); document.body.appendChild(sh);
    function open(){ bg.classList.add('on'); sh.classList.add('on'); } function close(){ bg.classList.remove('on'); sh.classList.remove('on'); }
    fab.addEventListener('click',open); bg.addEventListener('click',close); sh.querySelector('.g').addEventListener('click',close);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 가로로 넘기는 줄 — 스크롤 막대 숨김 ───────── */
(function(){ var st=document.createElement('style'); st.textContent='.cf-chips,.cat-tabs,.rv-row,.mm-chips,.ch-rank-row,.notes{scrollbar-width:none;-ms-overflow-style:none}.cf-chips::-webkit-scrollbar,.cat-tabs::-webkit-scrollbar,.rv-row::-webkit-scrollbar,.mm-chips::-webkit-scrollbar,.ch-rank-row::-webkit-scrollbar,.notes::-webkit-scrollbar{display:none;height:0}'; (document.head||document.documentElement).appendChild(st); })();

/* ───────── PC 제품 구매 드롭다운 — 모바일 메뉴와 같은 분류를 4칸으로 ───────── */
(function(){ var st=document.createElement('style'); st.textContent='.simple-drop.pm-drop{display:grid!important;grid-template-columns:repeat(5,max-content);gap:0 6px;padding:18px 14px!important;min-width:0!important;width:max-content!important}'
  +'.pm-drop .pm-col{display:flex;flex-direction:column;min-width:104px;padding:0 6px}.pm-drop .pm-col+.pm-col{border-left:1px solid var(--hair,#E6E4DE)}'
  +'.pm-drop a.pm-h{font-size:14px!important;font-weight:700;color:var(--ink,#111921)!important;padding:8px 12px 10px!important}'
  +'.pm-drop .pm-col a.pm-h+a.pm-h{margin-top:6px}.simple-drop.gd-drop{grid-template-columns:repeat(3,max-content)!important}.gd-drop .pm-col{min-width:150px}'
  +'.pm-drop a:not(.pm-h){font-size:13px!important;padding:8px 12px!important}'
  +'.gd-drop .pm-col a[data-palate]{display:inline-block;align-self:flex-start;margin:10px 12px 2px;padding:8px 16px!important;border-radius:999px;background:var(--ink,#111921);color:#fff!important;font-weight:600;font-size:12.5px!important;line-height:1.2}.gd-drop .pm-col a[data-palate]:hover{background:#232d38}';
  (document.head||document.documentElement).appendChild(st); })();

/* ───────── 상품 카드 한 줄 소개 — 블렌드 라인을 이름 아래 표시 (실개발: PRD 상품 「카드 한 줄 소개」 필드) ───────── */
(function(){
  var KICK={};  /* 제품 카드에서는 빼고, 정기배송 카드 설명에만 반영 */
  var st=document.createElement('style'); st.textContent='.cv-kick{display:block;margin-top:4px;font-size:14px;font-weight:600;color:#A9874F;letter-spacing:-.01em}@media(max-width:760px){.cv-kick{font-size:12.5px}}'; (document.head||document.documentElement).appendChild(st);
  function clean(h){ return (h||'').split('#')[0].split('?')[0]; }
  function run(){
    document.querySelectorAll('a.item[href], a.pd-related-card[href], .ch-card').forEach(function(c){
      if(c.querySelector('.cv-kick')) return;
      var a=c.matches('a')?c:c.querySelector('a.ch-img, a.ch-name'); if(!a) return; var k=KICK[clean(a.getAttribute('href'))]; if(!k) return;
      var t=c.querySelector('.cap h4, .pd-related-body>b, .ch-name'); if(!t) return;
      var s=document.createElement('span'); s.className='cv-kick'; s.textContent=k; t.insertAdjacentElement('afterend',s);
    });
  }
  function init(){ run(); var tm; if(window.MutationObserver) new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(run,80); }).observe(document.body,{childList:true,subtree:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 모바일 가로 넘침 방지 · 폰 미리보기 안에서는 스크롤 막대 숨김 ───────── */
(function(){ var css='@media(max-width:760px){html,body{overflow-x:clip}}'; try{ if(window.self!==window.top) css+='html{scrollbar-width:none}html::-webkit-scrollbar{display:none;width:0;height:0}'; }catch(e){}
  var st=document.createElement('style'); st.textContent=css; (document.head||document.documentElement).appendChild(st); })();

/* ───────── 상세 페이지 링크 공유 — 상품명 오른쪽 공유 아이콘 → 공유 시트(카카오톡 · 문자 · 링크 복사 · 더 보기) ───────── */
(function(){
  var page=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'').split('?')[0];
  function init(){
    var t=document.querySelector('.pd-buy-title'); if(!t||document.querySelector('.pd-share')) return;
    var st=document.createElement('style');
    st.textContent='.pd-share-wrap{position:relative;padding-right:52px}'
      +'.pd-share{position:absolute;right:0;top:50%;transform:translateY(-50%);width:42px;height:42px;border-radius:50%;border:1px solid var(--hair,#E6E4DE);background:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ink,#111921)}'
      +'.pd-share svg{width:20px;height:20px;fill:none;stroke:currentColor;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'
      +'.pd-share:hover{border-color:var(--ink,#111921)}'
      +'.sh-bg{position:fixed;inset:0;z-index:130;background:rgba(17,25,33,.45);opacity:0;pointer-events:none;transition:opacity .25s}.sh-bg.on{opacity:1;pointer-events:auto}'
      +'.sh-box{position:fixed;z-index:131;background:#fff;left:50%;top:50%;width:min(420px,calc(100% - 32px));border-radius:16px;padding:22px 22px 24px;transform:translate(-50%,-46%);opacity:0;pointer-events:none;transition:transform .25s,opacity .25s}'
      +'.sh-box.on{transform:translate(-50%,-50%);opacity:1;pointer-events:auto}'
      +'@media(max-width:760px){.sh-box{left:0;right:0;top:auto;bottom:0;width:auto;border-radius:18px 18px 0 0;padding:10px 20px calc(22px + env(safe-area-inset-bottom,0px));transform:translateY(105%);opacity:1}.sh-box.on{transform:none}.sh-box .sh-g{display:block!important}}'
      +'.sh-g{display:none;width:44px;height:5px;border-radius:3px;background:#D9D7D2;margin:0 auto 14px}'
      +'.sh-hd{display:flex;justify-content:space-between;align-items:center;margin-bottom:16px}.sh-hd b{font-size:18px;font-weight:700;color:var(--ink,#111921)}'
      +'.sh-x{width:36px;height:36px;border:0;background:none;font-size:24px;line-height:1;cursor:pointer;color:var(--ink,#111921)}'
      +'.sh-card{display:flex;gap:14px;align-items:center;padding:12px;border:1px solid var(--hair,#E6E4DE);border-radius:12px}'
      +'.sh-card img{flex:none;width:64px;height:64px;border-radius:8px;object-fit:cover;background:#F3F3F3}'
      +'.sh-card div{min-width:0}.sh-card strong{display:block;font-size:15px;color:var(--ink,#111921)}.sh-card span{display:block;margin-top:4px;font-size:13px;color:var(--slate,#454C55);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}'
      +'.sh-opts{display:grid;grid-template-columns:repeat(4,1fr);gap:8px;margin-top:20px}'
      +'.sh-opts button{display:flex;flex-direction:column;align-items:center;gap:8px;border:0;background:none;font-family:inherit;font-size:12.5px;color:var(--ink,#111921);cursor:pointer;padding:4px 0}'
      +'.sh-opts i{width:54px;height:54px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-style:normal}'
      +'.sh-opts svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
      +'.sh-k i{background:#FEE500;color:#191600}.sh-k svg{fill:#191600;stroke:none}.sh-m i{background:#E8F5EC;color:#1F7A44}.sh-l i{background:#F1F1EF}.sh-o i{background:#F1F1EF}'
      +'.sh-url{display:flex;gap:8px;margin-top:18px}.sh-url input{flex:1;min-width:0;padding:11px 12px;border:1px solid var(--hair,#E6E4DE);border-radius:8px;font:inherit;font-size:12.5px;color:var(--slate,#454C55);background:#FAFAF8}'
      +'.sh-url button{flex:none;padding:0 16px;border:0;border-radius:8px;background:var(--ink,#111921);color:#fff;font-family:inherit;font-size:13px;font-weight:600;cursor:pointer}'
      +'.pd-share-toast{position:fixed;left:50%;bottom:calc(90px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:140;padding:12px 18px;border-radius:999px;background:rgba(17,25,33,.92);color:#fff;font-size:13.5px;white-space:nowrap}';
    document.head.appendChild(st);
    var row=t.parentNode; row.classList.add('pd-share-wrap');
    var b=document.createElement('button'); b.type='button'; b.className='pd-share'; b.setAttribute('aria-label','링크 공유');
    b.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="18" cy="5" r="2.6"/><circle cx="6" cy="12" r="2.6"/><circle cx="18" cy="19" r="2.6"/><path d="M8.3 10.8l7.4-4.4M8.3 13.2l7.4 4.4"/></svg>';
    row.appendChild(b);
    /* 공유 왼쪽 하트 (SSG 방식) — 관심 상품 담기 · 빼기, 구매 영역 하트와 같은 저장소 */
    if(window.TCC_WISH&&TCC_WISH.heart){ var hw=document.createElement('span'); hw.innerHTML=TCC_WISH.heart(location.pathname,'pd-wish'); row.appendChild(hw.firstChild);
      var hs=document.createElement('style'); hs.textContent='.pd-share-wrap .pd-wish{border-color:var(--hair,#E6E4DE)!important;position:absolute;right:52px;top:50%;transform:translateY(-50%);width:42px!important;height:42px!important;border-radius:50%!important}.pd-share-wrap .pd-wish svg{width:19px;height:19px}.pd-share-wrap .pd-wish.on{color:#E04B3C}.pd-share-wrap .pd-wish.on svg{fill:#E04B3C!important}.pd-share-wrap{padding-right:104px!important}'; document.head.appendChild(hs); }
    var url=location.href.split('#')[0].replace(/[?&]sub=1\b/,'').replace(/\?$/,''); var name=t.textContent.trim(); var title=name+' · 더클린커피';
    var sub=(document.querySelector('.pd-concept')||{}).textContent||''; sub=sub.trim();
    var pr=''; try{ if(window.PD_PRICE&&PD_PRICE['200g']!=null) pr=PD_PRICE['200g'].toLocaleString('ko-KR')+'원 (200g)'; }catch(e){} if(!pr){ var m=((document.querySelector('.pd-price-row')||{}).textContent||'').match(/[\d,]+원/); pr=m?m[0]:''; }
    var bg=document.createElement('div'); bg.className='sh-bg';
    var box=document.createElement('div'); box.className='sh-box'; box.setAttribute('role','dialog'); box.setAttribute('aria-label','공유하기');
    box.innerHTML='<div class="sh-g"></div><div class="sh-hd"><b>공유하기</b><button type="button" class="sh-x" aria-label="닫기">×</button></div>'
      +'<div class="sh-card"><img alt=""><div><strong></strong><span></span></div></div>'
      +'<div class="sh-opts">'
      +'<button type="button" class="sh-k"><i><svg viewBox="0 0 24 24"><path d="M12 4C7 4 3 7.2 3 11.1c0 2.5 1.7 4.7 4.2 6l-1 3.6c-.1.3.3.6.6.4l4.2-2.8c.3 0 .7.1 1 .1 5 0 9-3.2 9-7.2S17 4 12 4z"/></svg></i>카카오톡</button>'
      +'<button type="button" class="sh-m"><i><svg viewBox="0 0 24 24"><path d="M4 5h16v11H8l-4 4z"/></svg></i>문자</button>'
      +'<button type="button" class="sh-l"><i><svg viewBox="0 0 24 24"><path d="M10 14a4 4 0 005.7 0l3-3a4 4 0 00-5.7-5.7l-1 1"/><path d="M14 10a4 4 0 00-5.7 0l-3 3a4 4 0 005.7 5.7l1-1"/></svg></i>링크 복사</button>'
      +'<button type="button" class="sh-o"><i><svg viewBox="0 0 24 24"><circle cx="6" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="18" cy="12" r="1.3"/></svg></i>더 보기</button>'
      +'</div><div class="sh-url"><input type="text" readonly aria-label="상품 링크"><button type="button">복사</button></div>';
    box.querySelector('img').src='images/thumbs/'+page.replace('.html','')+'.jpg'; box.querySelector('img').alt=name;
    box.querySelector('strong').textContent=name; box.querySelector('.sh-card span').textContent=(pr?pr.trim()+' · ':'')+sub.replace(/\s+/g,' ');
    box.querySelector('.sh-url input').value=url;
    document.body.appendChild(bg); document.body.appendChild(box);
    function toast(m){ var o=document.querySelector('.pd-share-toast'); if(o) o.remove(); o=document.createElement('div'); o.className='pd-share-toast'; o.textContent=m; document.body.appendChild(o); setTimeout(function(){ o.remove(); },2000); }
    function open(){ bg.classList.add('on'); box.classList.add('on'); }
    function close(){ bg.classList.remove('on'); box.classList.remove('on'); }
    function copy(){ function done(){ toast('링크를 복사했습니다'); close(); }
      if(navigator.clipboard&&navigator.clipboard.writeText){ navigator.clipboard.writeText(url).then(done,fb); } else fb();
      function fb(){ var i=box.querySelector('.sh-url input'); i.select(); try{ document.execCommand('copy'); done(); }catch(e){ toast('링크를 길게 눌러 복사해 주세요'); } } }
    /* 휴대폰에서는 폰 기본 공유 창(카카오톡 · 메시지 · 링크 복사 등)을 바로 띄우고, 지원하지 않는 화면(PC 등)에서는 아래 공유 창 */
    b.addEventListener('click',function(){ var touch=window.matchMedia('(pointer:coarse)').matches; if(touch&&navigator.share){ navigator.share({title:title,text:title,url:url}).catch(function(){}); return; } open(); }); bg.addEventListener('click',close); box.querySelector('.sh-x').addEventListener('click',close); box.querySelector('.sh-g').addEventListener('click',close);
    box.querySelector('.sh-l').addEventListener('click',copy); box.querySelector('.sh-url button').addEventListener('click',copy);
    /* 카카오톡 — 실개발: Kakao JavaScript SDK Kakao.Share.sendDefault (피드형: 상품 사진 · 이름 · 가격 · 「상품 보기」 버튼) */
    box.querySelector('.sh-k').addEventListener('click',function(){ if(window.Kakao&&Kakao.Share){ Kakao.Share.sendScrap({requestUrl:url}); close(); } else toast('카카오톡 공유는 실개발 때 연결됩니다'); });
    box.querySelector('.sh-m').addEventListener('click',function(){ location.href='sms:?&body='+encodeURIComponent(title+'\n'+url); });
    box.querySelector('.sh-o').addEventListener('click',function(){ if(navigator.share){ navigator.share({title:title,url:url}).catch(function(){}); close(); } else copy(); });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(init,0); }); else setTimeout(init,0);
})();

/* ───────── 모바일 홈 — 헤더 아래 제품 카테고리 줄 (원두 · 드립백/스틱 · 선물세트 · 커피용품), 스크롤해도 헤더와 함께 고정 ───────── */
(function(){
  var page=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'home.html').split('?')[0];
  if(page!=='home.html'&&page!=='index.html'&&page!=='') return;
  function init(){
    var nav=document.getElementById('nav'); if(!nav||nav.querySelector('.m-cats')) return;
    var st=document.createElement('style');
    st.textContent='.m-cats{display:none}'
      +'@media(max-width:900px){#nav{flex-wrap:wrap}#nav .m-cats{display:flex;order:99;flex:0 0 100%;justify-content:space-between;gap:4px;margin:6px 0 -6px;padding:0 2px;border-top:1px solid var(--hair,#E6E4DE)}'
      +'#nav .m-cats a{flex:1;text-align:center;padding:12px 0 11px;font-size:15px;font-weight:600;color:var(--ink,#111921);text-decoration:none;white-space:nowrap;letter-spacing:-.01em}'
      +'#nav .m-cats a:active{color:var(--mist,#8A9099)}'
      +'.hero.hero-v2{margin-top:44px}}';
    document.head.appendChild(st);
    var row=document.createElement('div'); row.className='m-cats'; row.setAttribute('aria-label','제품 카테고리');
    row.innerHTML=/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))?'<a href="business-mypage.html#catalog-beans">원두</a><a href="business-mypage.html#catalog-dripbag">드립백</a><a href="business-mypage.html#catalog-giftset">기업 선물</a><a href="business-mypage.html#catalog-bulletproof">방탄커피</a>':'<a href="collection.html#beans">원두</a><a href="collection.html#dripbag">드립백/스틱</a><a href="collection.html#giftset">선물세트</a><a href="collection.html#goods">커피용품</a>';
    nav.appendChild(row);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();

/* ───────── 상세 제목 — 영문 이름 숨김 ───────── */
(function(){
  function init(){
    var t=document.querySelector('.pd-buy-title'), s=document.querySelector('.pd-buy-sub'); if(!t||!s||s.dataset.inl) return; s.dataset.inl='1';
    var st=document.createElement('style'); st.textContent='.pd-buy-sub.inl{display:inline-block!important;margin:0 0 0 8px!important;font-size:13px!important;color:var(--mist,#8A9099)!important;letter-spacing:.01em;align-self:center;white-space:nowrap}.pd-title-row{flex-wrap:wrap;align-items:center}'; document.head.appendChild(st);
    s.remove(); /* 영문 이름은 표시하지 않음 */
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', function(){ setTimeout(init,30); }); else setTimeout(init,30);
})();

/* ───────── 모바일 하단 탭 바 — 관심 · 정기구독 · 홈 · MY · 최근 본 (SSG식). 화면을 아래로 내릴 때 보이고, 위로 올릴 때 숨김. 상세(구매 바) · 결제 화면에서는 숨김 ───────── */
(function(){
  var page=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'home.html').split('?')[0];
  function init(){
    if(document.querySelector('.m-tab')) return;
    if(document.querySelector('.m-buybar')||document.body.classList.contains('ckm')||document.body.classList.contains('ntm')) return;
    var mem=null; try{ mem=JSON.parse(localStorage.getItem('tcc_member')||'null'); }catch(e){}
    var rec=[]; try{ rec=JSON.parse(localStorage.getItem('tcc_recent')||'[]'); }catch(e){}
    var st=document.createElement('style');
    st.textContent='.m-tab{display:none}'
      +'@media(max-width:760px){.m-tab{position:fixed;left:0;right:0;top:auto!important;bottom:0;z-index:88;display:grid;grid-template-columns:repeat(5,1fr);align-items:start;height:calc(74px + env(safe-area-inset-bottom,0px));padding-bottom:calc(12px + env(safe-area-inset-bottom,0px));background:rgba(250,250,248,.97);border-top:1px solid var(--hair,#E6E4DE);transition:transform .28s ease}'
      +'.m-tab.hide{transform:translateY(105%)}'
      +'.m-tab a,.m-tab button{display:flex;flex-direction:column;align-items:center;justify-content:flex-start;gap:4px;height:62px;border:0;background:none;padding:9px 0 0;font-family:inherit;font-size:11.5px;line-height:1.2;color:var(--slate,#454C55);text-decoration:none;cursor:pointer}'
      +'.m-tab svg{width:24px;height:24px;fill:none;stroke:var(--ink,#111921);stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'
      +'.m-tab .on{color:var(--ink,#111921);font-weight:700}'
      +'.m-tab .t-cart{position:relative}.m-tab .t-cart em{position:absolute;top:4px;left:50%;margin-left:6px;min-width:16px;height:16px;padding:0 4px;border-radius:999px;background:var(--sky,#5CC0E1);color:#fff;font-style:normal;font-size:10px;font-weight:700;line-height:16px;text-align:center}.m-tab .t-cart em:empty,.m-tab .t-cart em[data-z]{display:none}'
      +'body.has-tab:not(.biz-pg) #nav .gnb-right a[aria-label="장바구니"]{display:none!important}body.has-tab:not(.biz-pg) #nav .gnb-right .m-search{flex:1 1 auto!important;max-width:none!important}'
      +'.m-tab .home{position:relative}.m-tab .home i{position:absolute;top:-24px;left:50%;transform:translateX(-50%);width:54px;height:54px;border-radius:50%;background:var(--ink,#111921);box-shadow:0 6px 16px rgba(17,25,33,.25);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:5px}'
      +'.m-tab .home i b{display:block;width:11px;height:11px;border-radius:50%;background:#fff}.m-tab .home i b+b{background:var(--sky,#5CC0E1)}.m-tab .home span{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}.m-tab .home i{top:-14px!important}'
      +'.m-tab .rv span{white-space:nowrap;letter-spacing:-.02em}.m-tab .rv img{width:26px;height:26px;margin-top:-1px;border-radius:8px;object-fit:cover;border:1px solid var(--hair,#E6E4DE);background:#F3F3F3}'
      +'body.has-tab{padding-bottom:calc(74px + env(safe-area-inset-bottom,0px))}body.has-tab .rv-fab,body.has-tab .b2b-quick{display:none!important}'
      
      +'.m-tab-toast{position:fixed;left:50%;bottom:90px;transform:translateX(-50%);z-index:140;padding:11px 16px;border-radius:999px;background:rgba(17,25,33,.92);color:#fff;font-size:13px;white-space:nowrap}}';
    document.head.appendChild(st);
    var I={cart:'<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',sub:'<path d="M7 4h10l1.5 4v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V8z"/><path d="M5.5 8h13"/><path d="M14.6 15.2a2.7 2.7 0 1 1-.8-2"/><path d="M14 11.9v1.5h-1.5"/>',my:'<circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',rv:'<rect x="4" y="4" width="16" height="16" rx="2"/><path d="M12 8v4l3 2"/>'};
    function ic(k){ return '<svg viewBox="0 0 24 24" aria-hidden="true">'+I[k]+'</svg>'; }
    var bar=document.createElement('nav'); bar.className='m-tab'; bar.setAttribute('aria-label','하단 메뉴');
    bar.innerHTML='<a href="subscribe.html"'+(page==='subscribe.html'?' class="on"':'')+'>'+ic('sub')+'<span>정기구독</span></a>'
      +'<a href="mypage.html"'+(page==='mypage.html'?' class="on"':'')+'>'+ic('my')+'<span>MY</span></a>'
      +'<a href="home.html" class="home'+(page==='home.html'||page==='index.html'?' on':'')+'" aria-label="홈"><i><b></b><b></b></i><span>홈</span></a>'
      +'<button type="button" class="rv">'+(rec.length?'<img alt="">':ic('rv'))+'<span>최근 본 상품</span></button>'
      +'<a href="cart.html" class="t-cart'+(page==='cart.html'?' on':'')+'">'+ic('cart')+'<em class="cart-badge">'+((window.TCC&&TCC.count)?TCC.count():0)+'</em><span>장바구니</span></a>';
    if(/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))){ var pg=page, hs=location.hash;
      var I2={cat:'<rect x="4" y="4" width="7" height="7" rx="1"/><rect x="13" y="4" width="7" height="7" rx="1"/><rect x="4" y="13" width="7" height="7" rx="1"/><rect x="13" y="13" width="7" height="7" rx="1"/>',smp:'<path d="M7 4h10l-1 4H8z"/><path d="M8 8l-1 12h10L16 8"/>',cart:'<path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/>',ord:'<rect x="5" y="4" width="14" height="16" rx="2"/><path d="M9 9h6M9 13h6M9 17h4"/>'};
      var ic2=function(k){ return '<svg viewBox="0 0 24 24" aria-hidden="true">'+I2[k]+'</svg>'; };
      bar.innerHTML='<a href="business-mypage.html#catalog">'+ic2('cat')+'<span>품목</span></a>'
        +'<a href="business-sample.html"'+(pg==='business-sample.html'?' class="on"':'')+'>'+ic2('smp')+'<span>샘플</span></a>'
        +'<a href="business-mypage.html" class="home'+(pg==='business-mypage.html'?' on':'')+'" aria-label="사업자 홈"><i><b></b><b></b></i><span>홈</span></a>'
        +'<a href="business-cart.html"'+(pg==='business-cart.html'?' class="on"':'')+'>'+ic2('cart')+'<span>장바구니</span></a>'
        +'<a href="business-mypage.html#quotes">'+ic2('ord')+'<span>주문</span></a>';
    }
    if(rec.length&&bar.querySelector('.rv img')){ var im=bar.querySelector('.rv img'); im.src=rec[0].img; im.alt=rec[0].name; }
    document.body.appendChild(bar); document.body.classList.add('has-tab');
    (function z(){ var em=bar.querySelector('.t-cart em'); if(em){ if(em.textContent==='0') em.setAttribute('data-z',''); else em.removeAttribute('data-z'); } setTimeout(z,1500); })();
    if(bar.querySelector('.rv')) bar.querySelector('.rv').addEventListener('click',function(){
      var f=document.querySelector('.rv-fab'); if(f){ f.click(); return; }
      var o=document.createElement('div'); o.className='m-tab-toast'; o.textContent=rec.length?'지금 보고 있는 상품뿐이에요':'최근 본 상품이 없습니다'; document.body.appendChild(o); setTimeout(function(){ o.remove(); },1800);
    });
    /* 아래로 내릴 때 보이고, 위로 올릴 때 숨김 (맨 위 · 맨 아래에서는 항상 보임) */
    var last=window.scrollY, acc=0;
    window.addEventListener('scroll',function(){
      var y=window.scrollY, d=y-last; last=y;
      var bottom=y+window.innerHeight>=document.documentElement.scrollHeight-40;
      if(y<80||bottom){ bar.classList.remove('hide'); acc=0; return; }
      if((d>0&&acc<0)||(d<0&&acc>0)) acc=0; acc+=d;
      if(acc>12) bar.classList.remove('hide'); else if(acc<-12) bar.classList.add('hide');
    },{passive:true});
  }
  function later(){ setTimeout(init,60); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', later); else later();
})();

/* ───────── 정기배송 전환 제안 — 한 번이라도 구매한 회원이 아직 정기배송을 쓰지 않으면 「첫 정기배송 첫 회차에 같은 원두 100g 추가」(할인 없음)
   · 첫 구매(구매 확정 기준) 21일 뒤 알림함 + (광고성 수신 동의 시) 알림톡/문자 한 번 · 상품 정기배송 모드 · 결제에 노출
   · 실개발: 관리자 B2C-13 알림 템플릿 「정기배송 전환 제안」 · B2C-07 혜택 「첫 정기배송 · 20% 할인 + 원두 100g」 · 발송 시각 10:00 (야간 21~08시 발송 안 함) ───────── */
(function(){
  var RATE=0.2, DAYS=21, GIFT='100g';
  function J(k,d){ try{ var v=JSON.parse(localStorage.getItem(k)||'null'); return v==null?d:v; }catch(e){ return d; } }
  function mem(){ return J('tcc_member',null); }
  function firstBuy(){
    var os=J('tcc_orders',[]).filter(function(o){ return !o.sub && !o.guest; });
    var t=os.map(function(o){ return new Date(o.paidAt||o.date).getTime(); }).filter(function(x){ return !isNaN(x); });
    if(t.length) return Math.min.apply(null,t);
    return mem()? new Date('2026-09-07T10:00:00+09:00').getTime() : null;   /* 프로토타입: 마이페이지 표본 주문(방탄커피 9/7) */
  }
  function bought(){ var n={}; J('tcc_orders',[]).filter(function(o){ return !o.sub && !o.guest; }).forEach(function(o){ (o.items||[]).forEach(function(it){ n[(it.name||'').replace(/\s*·.*$/,'').trim()]=1; }); });
    if(!Object.keys(n).length && mem()) n['더클린 방탄커피']=1;   /* 프로토타입 표본 주문 */
    return n; }
  var P=window.TCC_SUBPROMO={
    rate:RATE,
    giftFixed:10000,
    eligible:function(){ var m=mem(); if(!m) return false; if(J('tcc_subs',[]).length) return false; if(localStorage.getItem('tcc_subpromo_used')) return false; return firstBuy()!=null; },
    bought:bought,
    /* 구매 확정한 원두를 정기배송으로 처음 신청하면 — 첫 회차 20% 할인 + 원두 100g(커피팀이 고른 원두) · 회차마다 10% 적립(첫 회차는 할인된 금액 기준) */
    /* FIRST NOTE를 산 회원은 세트에 담겼던 원두만 (맛보기 세트 → 정기배송) · 디스커버리 세트 구매는 해당 없음 · 방탄커피 · 드립백 · 스틱은 대상이 아님 */
    fnBeans:function(){ var set={}, names={}; try{ var bs=(window.TCC_PRICES&&TCC_PRICES.beans)||{}; Object.keys(bs).forEach(function(id){ var nm=(bs[id].name||'').replace(/\s*·.*$/,'').trim(); names[nm]=1; }); }catch(e){}
      J('tcc_orders',[]).filter(function(o){ return !o.sub && !o.guest; }).forEach(function(o){ (o.items||[]).forEach(function(it){ if((it.name||'').indexOf('FIRST NOTE')===0){ (it.opt||'').split('·').forEach(function(t){ t=t.trim(); if(names[t]) set[t]=1; }); } }); });
      return set; },
    taster:function(){ return Object.keys(P.fnBeans()).length>0; },
    /* 이 상품이 첫 정기배송 혜택 대상인지 — 회원 대상 판정 + 원두 + (구매 확정한 같은 원두 또는 FIRST NOTE에 담겼던 원두) */
    itemOk:function(name){ if(!P.eligible()) return false; var k=(name||'').replace(/\s*·.*$/,'').trim(); if(/방탄|드립백|스틱|디스커버리/.test(k)) return false; return !!bought()[k]||!!P.fnBeans()[k]; },
    first:function(price){ return price==null?null:price-Math.floor(price*RATE/10)*10; },
    /* 첫 회차 할인액 — 대상 원두 금액의 20% (10원 단위 내림) */
    amount:function(items){ var t=0; (items||[]).forEach(function(it){ if(P.itemOk(it.name)&&it.price!=null) t+=it.price*(it.qty||1); }); return Math.floor(t*RATE/10)*10; },
    /* 결제 · 계약에 넣는 추가 품목 — 원두 100g 1개 (어떤 원두인지는 커피팀이 출고 때 고름 · 관리자 B2C-03에 기록) */
    gift:function(items){ var ok=false; (items||[]).forEach(function(it){ if(P.itemOk(it.name)) ok=true; }); if(!ok) return null; return { name:'첫 정기배송 혜택 · 원두 '+GIFT, opt:'커피팀이 고른 원두 · 출고 때 정해집니다', qty:1, price:0, gift:true, value:null }; },
    /* 100g 값 — 보내 드린 원두 200g 판매가의 절반 (위약금 산정 기준 · 출고 전에는 범위로 안내) */
    giftValue:function(name){ try{ var bs=(window.TCC_PRICES&&TCC_PRICES.beans)||{}, k=(name||'').replace(/\s*·.*$/,'').trim(), v=null; Object.keys(bs).forEach(function(id){ if(v==null&&bs[id].name===k&&bs[id]['200g']!=null) v=Math.floor(bs[id]['200g']/2); }); return v; }catch(e){ return null; } },
    giftRange:function(){ try{ var bs=(window.TCC_PRICES&&TCC_PRICES.beans)||{}, lo=null, hi=null; Object.keys(bs).forEach(function(id){ var p=bs[id]['200g']; if(p==null) return; var v=Math.floor(p/2); if(lo==null||v<lo) lo=v; if(hi==null||v>hi) hi=v; }); return lo==null?null:[lo,hi]; }catch(e){ return null; } },
    /* 약정 기간 안 해지 위약금 — 첫 회차 20% 할인액 + 원두 100g 값 + 이 정기배송으로 적립된 정기배송 적립금(회차마다 10% · 첫 회차는 할인된 금액 기준 · 결제된 회차 기준) */
    /* 약정 중인지 — 결제된 회차가 lockRounds(3) 미만이면 약정 중 */
    locked:function(sb){ if(!sb||sb.status==='해지') return false; if(sb.lockRounds) return (sb.round||1)<sb.lockRounds; return !!(sb.lockUntil&&sb.lockUntil>new Date().toISOString().slice(0,10)); },
    penalty:function(sb){ if(!P.locked(sb)) return null; var g=0; (sb.items||[]).forEach(function(it){ if(it.price!=null) g+=it.price*(it.qty||1); }); var rate=(window.TCC_PRICE&&TCC_PRICE.subPointRate)?TCC_PRICE.subPointRate():0.10; var rounds=(sb.round||1); var disc=sb.firstDiscount||0; var pts=Math.floor((g-disc)*rate)+Math.floor(g*rate)*Math.max(0,rounds-1); var gift=(sb.firstGift&&sb.firstGift.value!=null)?sb.firstGift.value:P.giftFixed; /* 100g 값 = MD가 정한 고정 금액(COM-04 · 예시안) */ return { discount:disc, points:pts, gift:gift, known:gift!=null, total:disc+pts+(gift||0), rounds:rounds, range:P.giftRange() }; }
  };
  /* 21일이 지나면 알림 한 번 */
  try{
    if(P.eligible() && !localStorage.getItem('tcc_subpromo_sent') && Date.now()-firstBuy() >= DAYS*86400000){
      var m=mem()||{}, list=J('tcc_notices',[]);
      var nm=Object.keys(bought())[0]||'', tst=P.taster();
      list.push({type:'benefit',title:tst?'마음에 든 원두, 정기배송으로 받아보세요':(nm?nm+', ':'')+'다음엔 정기배송으로 받아보세요',body:tst?'FIRST NOTE에 담겼던 원두를 정기배송으로 받아보세요. 처음 시작하시는 분께 첫 상자에 원두 100g을 더 담고, 첫 회차 값도 20% 덜어 드려요.':'지난번 구매하신 원두를 정기배송으로 받아보세요. 처음 시작하시는 분께 첫 상자에 원두 100g을 더 담고, 첫 회차 값도 20% 덜어 드려요. 원하는 주기만 고르면 매번 주문하지 않아도 됩니다.',link:'subscribe.html',at:new Date().toISOString(),read:false,kakao:m.mktConsent?'sent':null});
      localStorage.setItem('tcc_notices',JSON.stringify(list)); localStorage.setItem('tcc_subpromo_sent',new Date().toISOString());
    }
  }catch(e){}
  /* 노출 — 정기배송 페이지 상단 · 상품 정기배송 모드 */
  function banner(){
    return; /* 정기배송 화면은 가격 아래에 첫 회차 100g 추가 안내를 바로 보여 줌(subscribe-mode.js) — 별도 띠 없음 */
    if(!P.eligible()) return;
    var page=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''), isSub=/[?&]sub=1/.test(location.search);
    var host = page==='subscribe.html' ? ((document.querySelector('h1')||{}).parentNode||null) : (isSub ? document.querySelector('.pd-buy-wrap .pd-price-row, .pd-buy-wrap') : null);
    if(page==='subscribe.html') return; /* 정기구독 페이지는 「정기구독 혜택」 혜택 3으로 안내 */
    if(!host||document.querySelector('.sp-ban')) return;
    var st=document.createElement('style');
    st.textContent='.sp-ban{display:flex;align-items:center;gap:14px;margin:18px auto 0;max-width:820px;padding:14px 18px;border:1px solid #E04B3C;background:#FFF6F4;color:var(--ink,#111921);text-decoration:none;word-break:keep-all}'
      +'.sp-ban b{flex:none;font-size:22px;font-weight:800;color:#E04B3C;letter-spacing:-.02em}.sp-ban span{font-size:13.5px;line-height:1.55;text-align:left}.sp-ban span strong{display:block;font-size:14.5px}'
      +'.pd-buy-wrap .sp-ban{margin:14px 0 0}';
    document.head.appendChild(st);
    var a=document.createElement(page==='subscribe.html'?'div':'div'); a.className='sp-ban';
    a.innerHTML=P.taster()?'<b>20%+100g</b><span><strong>첫 정기배송 혜택</strong>FIRST NOTE에 담겼던 원두를 정기배송으로 처음 신청하실 때 첫 회차가 20% 할인되고 커피팀이 고른 원두 100g을 더 드립니다. 결제할 때 자동으로 적용됩니다.</span>'
      :'<b>20%+100g</b><span><strong>첫 정기배송 혜택</strong>구매하셨던 원두를 정기배송으로 처음 신청하시면, 첫 회차가 20% 할인되고 커피팀이 고른 원두 100g을 더 드립니다. 결제할 때 자동으로 적용됩니다.</span>';
    if(page==='subscribe.html'){ host.appendChild(a); }
    else host.parentNode.insertBefore(a,host.nextSibling);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',banner); else banner();
})();

/* ───────── 상단 알림 아이콘 — 장바구니 왼쪽, 안 읽은 알림 수 표시 → 마이페이지 알림함 (로그인 전이면 로그인)
   알림 저장소: tcc_notices (마이페이지 알림함과 같은 곳) · 실개발: 회원 알림 API ───────── */
(function(){
  function init(){
    var right=document.querySelector('#nav .gnb-right'); if(!right||right.querySelector('.nt-bell')) return;
    var cart=right.querySelector('a.icon-btn[aria-label="장바구니"]');
    var mem=null; try{ mem=JSON.parse(localStorage.getItem('tcc_member')||'null'); }catch(e){}
    var list=[]; try{ list=JSON.parse(localStorage.getItem('tcc_notices')||'[]'); }catch(e){}
    if(mem&&!list.length&&!localStorage.getItem('tcc_notices_seeded')){
      var now=Date.now();
      list=[{type:'order',title:'주문하신 원두가 오늘 출고됐어요',body:'콜롬비아 200g · 내일 도착 예정입니다.',at:new Date(now-3600e3).toISOString(),link:'mypage.html#orders',read:false},
            {type:'benefit',title:'리저브 클럽 승급 축하 쿠폰이 도착했어요',body:'쿠폰함에서 확인해 주세요.',at:new Date(now-86400e3).toISOString(),link:'mypage.html#coupons',read:false}];
      try{ localStorage.setItem('tcc_notices',JSON.stringify(list)); localStorage.setItem('tcc_notices_seeded','1'); }catch(e){}
    }
    var unread=mem?list.filter(function(n){ return !n.read; }).length:0;
    var st=document.createElement('style');
    st.textContent='.nt-bell{position:relative}.nt-bell .nt-n{position:absolute;top:2px;right:1px;min-width:15px;height:15px;padding:0 4px;border-radius:8px;background:#E04B3C;color:#fff;font-size:9px;font-weight:700;display:flex;align-items:center;justify-content:center;font-family:var(--sans,inherit)}'
      +'@media(max-width:900px){#nav .gnb-right .nt-bell svg{width:23px!important;height:23px!important}}';
    document.head.appendChild(st);
    var a=document.createElement('a'); a.className='icon-btn nt-bell'; a.href='notices.html'; a.setAttribute('aria-label','알림'+(unread?' '+unread+'개':''));
    a.innerHTML='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 10a6 6 0 0 1 12 0c0 4.5 1.8 6 1.8 6H4.2S6 14.5 6 10z"/><path d="M10 19.5a2 2 0 0 0 4 0"/></svg>'+(unread?'<span class="nt-n">'+unread+'</span>':'');
    if(cart) right.insertBefore(a,cart); else right.appendChild(a);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
/* ───────── 모바일 상품 상세 — 옵션 · 구매 버튼은 하단 「구매하기」 시트에서만 고름 (본문 안 옵션 영역 숨김) ───────── */
(function(){
  var st=document.createElement('style');
  st.textContent='@media(max-width:760px){body.has-mbar .pd-buy-wrap .pd-select-row,body.has-mbar .pd-buy-wrap .pd-optbtns,body.has-mbar .pd-buy-wrap .pd-buy-btns,body.has-mbar .pd-buy-wrap .pd-note-inline,body.has-mbar .pd-buy-wrap .pd-sub-link{display:none!important}}';
  (document.head||document.documentElement).appendChild(st);
})();

/* ───────── 모바일 뒤로가기 · 맨 위로 플로팅 버튼 (SSG 방식) — 조금 내려가면 나타남, 하단 메뉴가 있으면 그 위에 ───────── */
(function(){
  function init(){
    if(document.querySelector('.nf-btn')||document.body.classList.contains('ckm')||document.body.classList.contains('ntm')) return;
    var st=document.createElement('style');
    st.textContent='.nf-btn{display:none}'
      +'@media(max-width:760px){.nf-btn{position:fixed;z-index:86;width:46px;height:46px;border-radius:50%;border:1px solid var(--hair,#E6E4DE);background:rgba(255,255,255,.96);box-shadow:0 4px 14px rgba(17,25,33,.14);display:flex;align-items:center;justify-content:center;padding:0;cursor:pointer;opacity:0;pointer-events:none;transform:translateY(8px);transition:opacity .2s,transform .2s,bottom .28s ease}'
      +'.nf-btn svg{width:22px;height:22px;fill:none;stroke:var(--ink,#111921);stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
      +'.nf-btn.on{opacity:1;pointer-events:auto;transform:none}'
      +'.nf-back{left:14px}.nf-top{right:14px}'
      +'.nf-btn{bottom:calc(var(--nf-b,18px) + env(safe-area-inset-bottom,0px))}}';
    document.head.appendChild(st);
    var back=document.createElement('button'); back.type='button'; back.className='nf-btn nf-back'; back.setAttribute('aria-label','뒤로 가기');
    back.innerHTML='<svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>';
    var top=document.createElement('button'); top.type='button'; top.className='nf-btn nf-top'; top.setAttribute('aria-label','맨 위로');
    top.innerHTML='<svg viewBox="0 0 24 24"><path d="M12 19V5M6 11l6-6 6 6"/></svg>';
    document.body.appendChild(back); document.body.appendChild(top);
    back.addEventListener('click',function(){ if(history.length>1&&document.referrer) history.back(); else location.href='home.html'; });
    top.addEventListener('click',function(){ window.scrollTo({top:0,behavior:'smooth'}); });
    function place(){
      var tab=document.querySelector('.m-tab'), bar=document.querySelector('.m-buybar'), rv=document.querySelector('.rv-fab');
      var b=18;
      if(document.body.classList.contains('has-tab')&&tab&&!tab.classList.contains('hide')) b=88;
      else if(bar&&document.body.classList.contains('has-mbar')) b=74;
      back.style.setProperty('--nf-b',b+'px');
      var rvOn=rv&&getComputedStyle(rv).display!=='none';
      top.style.setProperty('--nf-b',(rvOn?b+66:b)+'px');
      var on=window.scrollY>320; back.classList.toggle('on',on); top.classList.toggle('on',on);
    }
    window.addEventListener('scroll',place,{passive:true}); window.addEventListener('resize',place);
    if(window.MutationObserver){ var t=document.querySelector('.m-tab'); if(t) new MutationObserver(place).observe(t,{attributes:true,attributeFilter:['class']}); }
    place(); setTimeout(place,300);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(init,50); }); else setTimeout(init,50);
})();

/* ───────── 상품 뱃지 — 관리자 PRD-09에서 만든 뱃지(이름 · 색 · 기간)를 상품마다 최대 2개, 자리는 고정
   카드: 사진 왼쪽 위 가로 나열 · 상세: 상품명 오른쪽 · 실개발: 관리자 뱃지 API 값으로 교체 ───────── */
(function(){
  var DEFS={ 'NEW':{label:'NEW',bg:'#E04B3C',fg:'#FFFFFF'}, 'BEST':{label:'BEST',bg:'#111921',fg:'#FFFFFF'}, 'HOT':{label:'HOT',bg:'#FFFFFF',fg:'#111921'}, 'MD추천':{label:'MD추천',bg:'#FFFFFF',fg:'#4A5562'} };
  var MAP={ 'gift-tasting.html':['NEW'], 'product-velvet.html':['BEST'], 'product-colombia.html':['HOT'], 'gift-dripbag.html':['BEST','HOT'], 'first-note.html':['MD추천'], 'product-png.html':['MD추천'] };
  if(window.TCC_BADGE_DEFS) DEFS=window.TCC_BADGE_DEFS; if(window.TCC_PRODUCT_BADGES) MAP=window.TCC_PRODUCT_BADGES;
  var st=document.createElement('style');
  st.textContent='.tcc-bdg-row{position:absolute;top:10px;left:10px;z-index:4;display:flex;gap:4px;pointer-events:none}'
    +'.tcc-bdg{display:inline-block;padding:4px 8px 3px;font-family:var(--latin,Montserrat,sans-serif);font-size:11px;font-weight:700;letter-spacing:.06em;line-height:1;border-radius:2px;white-space:nowrap}'
    +'.tcc-bdg.w{box-shadow:inset 0 0 0 1px #CFC7BD}'
    +'.tcc-bdg-inline{display:inline-flex;gap:4px;vertical-align:middle;margin-left:8px}'
    +'.pd-title-row .tcc-badges,.tcc-badges-top,.tcc-badges{display:none!important}'
    +'.ch-card .ch-no,.ch-card.cv2 .ch-no,.cur-rank{display:none!important}'
    +'@media(max-width:760px){.cv2-note,a.item.cv2 .cap>p,.collection-full .item .cap>p,a.pd-related-card.cv2 .pd-related-body>span{white-space:normal!important}}';
  (document.head||document.documentElement).appendChild(st);
  function clean(h){ return (h||'').split('#')[0].split('?')[0].split('/').pop(); }
  function html(list){ return list.slice(0,2).map(function(id){ var d=DEFS[id]; if(!d) return ''; return '<span class="tcc-bdg'+(d.bg.toUpperCase()==='#FFFFFF'?' w':'')+'" style="background:'+d.bg+';color:'+d.fg+'">'+d.label+'</span>'; }).join(''); }
  function run(){
    document.querySelectorAll('a.item[href], a.pd-related-card[href], .ch-card, a.sub-card[href]').forEach(function(c){
      var a=c.matches('a')?c:c.querySelector('a.ch-img, a.ch-name'); if(!a) return; var l=MAP[clean(a.getAttribute('href'))]; if(!l||!l.length) return;
      var box=c.querySelector('.imgbox, .ch-img'); if(!box||box.querySelector('.tcc-bdg-row')) return;
      if(getComputedStyle(box).position==='static') box.style.position='relative';
      box.insertAdjacentHTML('beforeend','<span class="tcc-bdg-row">'+html(l)+'</span>');
    });
    var l=MAP[clean(location.pathname)]; if(l&&l.length){ var t=document.querySelector('.pd-buy-title'); if(t&&!(t.nextElementSibling&&t.nextElementSibling.classList.contains('tcc-bdg-inline'))){ t.style.display='inline-block'; t.insertAdjacentHTML('afterend','<span class="tcc-bdg-inline">'+html(l)+'</span>'); } }
  }
  function init(){ run(); var tm; if(window.MutationObserver) new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(run,80); }).observe(document.body,{childList:true,subtree:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── 고객 화면에서 내부 작업 메모 숨김 — 사진 자리표시의 촬영 지시 · 연출 의도 · 확인 필요 표시 (실사진 · 확정 정보로 교체 전까지) ───────── */
(function(){
  var st=document.createElement('style');
  st.textContent='.imgbox:not(.has-photo) .tag>b,.imgbox:not(.has-photo) .tag>span:not(.icon),.nt-intent,.pd-placeholder,.pd-flag{display:none!important}';
  (document.head||document.documentElement).appendChild(st);
})();

/* ───────── 상세 구매 버튼 순서 (PC) — 장바구니 · 구매하기 · 선물하기 · 관심 ───────── */
(function(){
  var st=document.createElement('style');
  st.textContent='.pd-buy-btns .btn{white-space:nowrap;display:inline-flex!important;align-items:center;justify-content:center;gap:6px}.pd-buy-btns .btn-gift{order:3}.pd-buy-btns #pdCart,.pd-buy-btns [id$=Cart],.pd-buy-btns .btn-line:not(.btn-gift){order:1}.pd-buy-btns .btn-ink{order:2}.pd-buy-btns .tcc-heart{order:4}';
  (document.head||document.documentElement).appendChild(st);
})();

/* ───────── 상품 Q&A — 상세 「정보 · 리뷰 · Q&A」의 Q&A 구역. 회원이 문의를 남기면 「답변 대기」로 쌓이고, 답변은 관리자 1:1 문의(B2C-19)에서 (프로토타입: 이 브라우저에 저장) ───────── */
(function(){
  function init(){
    if(!document.querySelector('.pd-toc-wrap')||document.getElementById('qna')) return;
    var anchor=document.querySelector('footer')||document.getElementById('info'); if(!anchor) return;
    var key=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'').split('?')[0];
    var name=((document.querySelector('.pd-buy-title')||{}).textContent||document.title.split(' · ')[0]).trim();
    var st=document.createElement('style');
    st.textContent='#qna{background:var(--white,#fff);padding:clamp(56px,8vw,96px) 20px;scroll-margin-top:84px}'
      +'.qa-in{max-width:820px;margin:0 auto}.qa-title{font-family:inherit!important;letter-spacing:-.01em;margin:0 0 18px;font-size:clamp(21px,2.4vw,26px);font-weight:800;color:var(--ink,#111921)}'
      +'.qa-btns{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:8px}.qa-btns>*{display:flex;align-items:center;justify-content:center;height:48px;border:1px solid var(--hair,#D9D7D2);background:#fff;font-family:inherit;font-size:14.5px;color:var(--ink,#111921);text-decoration:none;cursor:pointer}'
      +'.qa-list{}.qa-it{padding:18px 0;border-bottom:1px solid var(--hair,#E6E4DE)}'
      +'.qa-meta{display:flex;align-items:center;gap:8px;font-size:13px;color:var(--mist,#8A9099)}.qa-meta time{margin-left:auto}'
      +'.qa-st{display:inline-block;padding:3px 7px;background:var(--ink,#111921);color:#fff;font-size:11.5px;font-weight:600}.qa-st.wait{background:#fff;color:var(--slate,#454C55);box-shadow:inset 0 0 0 1px var(--hair,#D9D7D2)}'
      +'.qa-it .q{margin-top:10px;font-size:15px;color:var(--ink,#111921);word-break:keep-all;display:flex;gap:6px;align-items:center}.qa-it .q.lock{color:var(--mist,#8A9099)}.qa-it .q svg{width:15px;height:15px;fill:none;stroke:currentColor;stroke-width:1.6}'
      +'.qa-it .a{margin-top:10px;padding:12px 14px;background:var(--paper,#F4F2EC);font-size:14px;color:var(--slate,#454C55);word-break:keep-all}'
      +'.qa-empty{padding:40px 0;text-align:center;font-size:14px;color:var(--mist,#8A9099);border-bottom:1px solid var(--hair,#E6E4DE)}'
      +'.qa-form{margin-top:16px;padding:18px;background:var(--paper,#F4F2EC);display:grid;gap:10px}.qa-form[hidden]{display:none}'
      +'.qa-form textarea{width:100%;min-height:96px;padding:12px;border:1px solid var(--hair,#E6E4DE);font:inherit;font-size:14px;resize:vertical;box-sizing:border-box}'
      +'.qa-form label{display:flex;gap:6px;align-items:center;font-size:13px;color:var(--slate,#454C55)}.qa-form .row{display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap}'
      +'.qa-note{font-size:12px;color:var(--mist,#8A9099);margin:10px 0 0}';
    document.head.appendChild(st);
    var sec=document.createElement('section'); sec.id='qna';
    sec.innerHTML='<div class="qa-in"><h2 class="qa-title">Q&amp;A 문의</h2><p style="margin:-8px 0 16px;font-size:13px;color:var(--mist)">남긴 문의와 답변은 본인에게만 보입니다.</p><div class="qa-btns"><button type="button" class="qa-open">상품/배송일정 문의</button><a href="mypage.html#orders">취소/교환/반품 문의</a></div>'
      +'<div class="qa-list"></div>'
      +'<div class="qa-form" hidden><textarea maxlength="500" placeholder="예: 분쇄도는 어떤 걸 고르면 좋을까요?"></textarea><div class="row"><label><input type="checkbox" class="qa-secret" checked> 비밀글로 남기기</label><div style="display:flex;gap:8px"><button type="button" class="btn btn-line qa-cancel">취소</button><button type="button" class="btn btn-ink qa-send">등록</button></div></div></div>'
      +'<p class="qa-note">답변이 등록되면 알림함으로 알려 드립니다. 주문 건 취소 · 교환 · 반품은 마이페이지 주문 내역에서 신청하실 수 있습니다.</p></div>';
    anchor.parentNode.insertBefore(sec,anchor);
    var list=sec.querySelector('.qa-list'), form=sec.querySelector('.qa-form'), ta=form.querySelector('textarea');
    function load(){ try{ return JSON.parse(localStorage.getItem('tcc_qna')||'{}'); }catch(e){ return {}; } }
    function esc(t){ var d=document.createElement('div'); d.textContent=t; return d.innerHTML; }
    function me(){ var m=window.TCC&&TCC.member?TCC.member():null; return m?String(m.id||m.email||m.name||'member'):null; }
    function paint(){
      var mid=me();
      if(!mid){ list.innerHTML='<div class="qa-empty">로그인하시면 내가 남긴 문의와 답변을 볼 수 있어요.<br><a href="login.html?next='+encodeURIComponent(key+'#qna')+'" style="display:inline-block;margin-top:12px;color:var(--ink);text-decoration:underline;font-weight:600">로그인</a></div>'; return; }
      var all=load(), rows=(all[key]||[]).filter(function(r){ return r.uid===mid; });
      var LOCK='<svg viewBox="0 0 16 16" aria-hidden="true"><rect x="3" y="7" width="10" height="7" rx="1"/><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2"/></svg>';
      list.innerHTML = rows.length ? rows.map(function(r){ return '<div class="qa-it"><div class="qa-meta"><span class="qa-st'+(r.a?'':' wait')+'">'+(r.a?'답변완료':'답변대기')+'</span><span>'+esc(r.type||'')+'</span><time>'+r.at.slice(0,10).replace(/-/g,'.')+'</time></div><div class="q" style="font-weight:700">'+esc(r.q)+'</div>'+(r.body?'<p style="margin:6px 0 0;font-size:13.5px;line-height:1.6;color:var(--slate);word-break:keep-all">'+esc(r.body)+'</p>':'')+(r.a?'<div class="a"><b style="display:block;font-size:12px;color:var(--mist);margin-bottom:4px">더클린커피 답변</b>'+esc(r.a)+'</div>':'')+'</div>'; }).join('')
        : '<div class="qa-empty">이 상품에 남긴 문의가 없습니다.</div>';
    }
    paint();
    sec.querySelector('.qa-open').addEventListener('click',function(){
      var m=window.TCC&&TCC.member?TCC.member():null;
      if(!m){ location.href='login.html?next='+encodeURIComponent(key+'#qna'); return; }
      form.hidden=false; ta.focus();
    });
    sec.querySelector('.qa-cancel').addEventListener('click',function(){ form.hidden=true; ta.value=''; });
    sec.querySelector('.qa-send').addEventListener('click',function(){
      var q=ta.value.trim(); if(q.length<5){ ta.focus(); ta.placeholder='다섯 글자 이상 적어 주세요.'; return; }
      var m=(window.TCC&&TCC.member&&TCC.member())||{}; var nm=(m.id||m.email||m.name||'회원'); nm=String(nm).split('@')[0]; nm=nm.slice(0,3)+'*******';
      var all=load(); (all[key]=all[key]||[]).unshift({q:q,secret:form.querySelector('.qa-secret').checked,who:nm,at:new Date().toISOString(),product:name,a:''});
      try{ localStorage.setItem('tcc_qna',JSON.stringify(all)); }catch(e){}
      form.hidden=true; ta.value=''; paint();
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── 상품 Q&A 문의 작성 화면 (SSG 방식) — 유형 2단 · 상품 · 제목(30자) · 내용(1,000자) · 비밀글 ───────── */
(function(){
  function init(){
    var sec=document.getElementById('qna'); if(!sec||document.querySelector('.qf')) return;
    var key=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'').split('?')[0];
    var name=((document.querySelector('.pd-buy-title')||{}).textContent||document.title.split(' · ')[0]).trim();
    var T={'상품 문의':['원두 · 맛','분쇄 · 추출','재입고','선물 · 포장','기타'],'배송일정 문의':['출고일','도착 예정일','배송지 · 시간','기타']};
    var st=document.createElement('style');
    st.textContent='.qf{position:fixed;inset:0;z-index:200;background:rgba(17,25,33,.45);display:flex;align-items:center;justify-content:center}.qf[hidden]{display:none}'
      +'.qf-p{width:min(560px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:12px}'
      +'.qf-top{position:sticky;top:0;z-index:1;height:58px;display:grid;grid-template-columns:48px 1fr 48px;align-items:center;background:#fff;border-bottom:1px solid var(--hair,#E6E4DE)}'
      +'.qf-top b{text-align:center;font-size:17px;font-weight:700;color:var(--ink,#111921)}.qf-top button{width:48px;height:48px;border:0;background:none;display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--ink,#111921)}'
      +'.qf-top svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
      +'.qf-b{padding:22px 20px 28px}.qf-req{margin:0 0 18px;font-size:13.5px;color:var(--ink,#111921)}.qf-req i,.qf-l i{color:#E04B3C;font-style:normal}'
      +'.qf-r{display:grid;grid-template-columns:64px 1fr;gap:10px;align-items:start;margin-bottom:12px}.qf-l{padding-top:13px;font-size:14px;font-weight:600;color:var(--ink,#111921)}'
      +'.qf-two{display:grid;grid-template-columns:1fr 1fr}.qf select,.qf input[type=text],.qf textarea{width:100%;box-sizing:border-box;border:1px solid var(--hair,#D9D7D2);background:#fff;font-family:inherit;font-size:14.5px;color:var(--ink,#111921);border-radius:0}'
      +'.qf select{height:48px;padding:0 34px 0 12px;-webkit-appearance:none;appearance:none;background:#fff url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%23111921%27 stroke-width=%271.8%27%3E%3Cpath d=%27M6 9l6 6 6-6%27/%3E%3C/svg%3E") no-repeat right 10px center/16px}.qf-two select+select{border-left:0}'
      +'.qf-prod{display:flex;align-items:center;gap:8px;height:48px;padding:0 12px;border:1px solid var(--hair,#D9D7D2);background:var(--paper,#F4F2EC);font-size:14px;color:var(--ink,#111921)}'
      +'.qf input[type=text]{height:48px;padding:0 12px}.qf textarea{min-height:220px;padding:12px;line-height:1.6;resize:vertical}'
      +'.qf-cnt{margin-top:6px;text-align:right;font-size:12.5px;color:var(--mist,#8A9099)}.qf-cnt b{color:#E04B3C;font-weight:500}'
      +'.qf-chk{display:flex;gap:8px;align-items:center;margin:6px 0 0 74px;font-size:13.5px;color:var(--slate,#454C55)}.qf-chk input{accent-color:var(--ink,#111921);width:16px;height:16px}'
      +'.qf-msg{min-height:18px;margin:12px 0 0;font-size:13px;color:#C8362B;text-align:center}'
      +'.qf-go{display:grid;grid-template-columns:1fr 2fr;gap:8px;margin-top:14px}.qf-go button{height:52px;border:1px solid var(--ink,#111921);background:#fff;font-family:inherit;font-size:15.5px;font-weight:600;cursor:pointer;color:var(--ink,#111921)}.qf-go .ok{background:var(--ink,#111921);color:#fff}'
      +'@media(max-width:760px){.qf{background:#fff;align-items:stretch}.qf-p{max-height:none;height:100%;border-radius:0}.qf-r{grid-template-columns:56px 1fr}.qf-chk{margin-left:66px}}';
    document.head.appendChild(st);
    var m=document.createElement('div'); m.className='qf'; m.hidden=true; m.setAttribute('role','dialog'); m.setAttribute('aria-label','상품 문의 작성');
    m.innerHTML='<div class="qf-p"><div class="qf-top"><button type="button" class="qf-x" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><b>상품 문의</b><span></span></div>'
      +'<div class="qf-b"><p class="qf-req"><i>*</i> 필수 항목입니다.</p>'
      +'<div class="qf-r"><div class="qf-l"><i>*</i>유형</div><div class="qf-two"><select class="qf-t1"><option value="">선택하세요</option>'+Object.keys(T).map(function(k){ return '<option>'+k+'</option>'; }).join('')+'</select><select class="qf-t2" disabled><option value="">선택하세요</option></select></div></div>'
      +'<div class="qf-r"><div class="qf-l">상품</div><div class="qf-prod">'+name.replace(/</g,'&lt;')+'</div></div>'
      +'<div class="qf-r"><div class="qf-l"><i>*</i>제목</div><input type="text" class="qf-tt" maxlength="30" placeholder="제목을 입력해 주세요. (30자 이내)"></div>'
      +'<div class="qf-r"><div class="qf-l"><i>*</i>내용</div><div><textarea class="qf-ct" maxlength="1000" placeholder="상품과 배송일정에 대해 궁금한 점을 남겨 주세요.\n\n주문하신 상품의 취소 · 교환 · 반품은 마이페이지 주문 내역에서 바로 신청하실 수 있습니다."></textarea><div class="qf-cnt"><b>0</b> / 1,000자</div></div></div>'
      +'<p class="qf-chk" style="margin-top:2px">남긴 문의와 답변은 나에게만 보입니다.</p>'
      +'<p class="qf-msg" aria-live="polite"></p><div class="qf-go"><button type="button" class="qf-no">취소</button><button type="button" class="ok">등록하기</button></div>'
      +'<p class="qa-note" style="margin-top:14px">답변이 등록되면 알림함으로 알려 드립니다.</p></div></div>';
    document.body.appendChild(m);
    var t1=m.querySelector('.qf-t1'), t2=m.querySelector('.qf-t2'), tt=m.querySelector('.qf-tt'), ct=m.querySelector('.qf-ct'), msg=m.querySelector('.qf-msg');
    t1.addEventListener('change',function(){ var l=T[t1.value]||[]; t2.innerHTML='<option value="">선택하세요</option>'+l.map(function(x){ return '<option>'+x+'</option>'; }).join(''); t2.disabled=!l.length; });
    ct.addEventListener('input',function(){ m.querySelector('.qf-cnt b').textContent=ct.value.length.toLocaleString('ko-KR'); });
    function close(){ m.hidden=true; document.body.style.overflow=''; }
    function open(){ msg.textContent=''; m.hidden=false; document.body.style.overflow='hidden'; m.querySelector('.qf-p').scrollTop=0; }
    m.querySelector('.qf-x').addEventListener('click',close); m.querySelector('.qf-no').addEventListener('click',close);
    m.addEventListener('click',function(e){ if(e.target===m) close(); });
    /* 기존 「상품/배송일정 문의」 버튼 → 이 화면 (로그인 전이면 로그인) */
    var ob=sec.querySelector('.qa-open'); var nb=ob.cloneNode(true); ob.parentNode.replaceChild(nb,ob);
    nb.addEventListener('click',function(){ var mem=window.TCC&&TCC.member?TCC.member():null; if(!mem){ location.href='login.html?next='+encodeURIComponent(key+'#qna'); return; } open(); });
    m.querySelector('.ok').addEventListener('click',function(){
      if(!t1.value||!t2.value){ msg.textContent='문의 유형을 선택해 주세요.'; return; }
      if(!tt.value.trim()){ msg.textContent='제목을 입력해 주세요.'; tt.focus(); return; }
      if(ct.value.trim().length<5){ msg.textContent='내용을 다섯 글자 이상 적어 주세요.'; ct.focus(); return; }
      var mem=(window.TCC&&TCC.member&&TCC.member())||{}; var nm=String(mem.id||mem.email||mem.name||'회원').split('@')[0]; nm=nm.slice(0,3)+'*******';
      var all={}; try{ all=JSON.parse(localStorage.getItem('tcc_qna')||'{}'); }catch(e){}
      (all[key]=all[key]||[]).unshift({type:t1.value+' · '+t2.value,q:tt.value.trim(),body:ct.value.trim(),secret:true,uid:String(mem.id||mem.email||mem.name||'member'),who:nm,at:new Date().toISOString(),product:name,a:''});
      try{ localStorage.setItem('tcc_qna',JSON.stringify(all)); }catch(e){}
      t1.value=''; t1.dispatchEvent(new Event('change')); tt.value=''; ct.value=''; ct.dispatchEvent(new Event('input'));
      close(); location.hash='qna'; location.reload();
    });
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(init,0); }); else setTimeout(init,0);
})();

/* ───────── 모바일 상품 상세 상단 바 (SSG 방식) — 위로 올릴 때만 ← · 상품 정보 · 리뷰 · 구매 안내 · 장바구니 ───────── */
(function(){
  function init(){
    var toc=document.querySelector('.pd-toc-wrap .gd-toc'); if(!toc||document.querySelector('.pd-tb')) return;
    var links=[].slice.call(toc.querySelectorAll('a[href^="#"]')); if(!links.length) return;
    var st=document.createElement('style');
    st.textContent='.pd-tb{display:none}'
      +'@media(max-width:760px){.pd-tb{position:fixed;left:0;right:0;top:0;z-index:120;height:58px;display:grid;grid-template-columns:48px 1fr 48px;align-items:center;background:#fff;box-shadow:0 1px 0 var(--hair,#E6E4DE);transform:translateY(-105%);transition:transform .25s ease}'
      +'.pd-tb.on{transform:none}'
      +'.pd-tb button,.pd-tb>a{width:48px;height:48px;border:0;background:none;display:flex;align-items:center;justify-content:center;color:var(--ink,#111921);cursor:pointer;padding:0}'
      +'.pd-tb svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
      +'.pd-tb .pd-tb-nav{display:flex;justify-content:center;gap:0}'
      +'.pd-tb .pd-tb-nav a{position:relative;padding:8px 9px;font-size:14.5px;font-weight:500;color:var(--slate,#454C55);text-decoration:none;white-space:nowrap}'
      +'.pd-tb .pd-tb-nav a.on{color:#E04B3C;font-weight:700}}'
      +'.pd-toc-wrap .gd-toc a.on{color:#E04B3C!important;font-weight:700;border-color:transparent!important}';
    document.head.appendChild(st);
    var bar=document.createElement('div'); bar.className='pd-tb'; bar.setAttribute('aria-label','상품 상세 메뉴');
    bar.innerHTML='<button type="button" class="pd-tb-back" aria-label="뒤로 가기"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button><div class="pd-tb-nav">'
      +links.map(function(a){ return '<a href="'+a.getAttribute('href')+'">'+a.textContent.trim()+'</a>'; }).join('')+'</div>'
      +'<a href="cart.html" aria-label="장바구니"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg></a>';
    document.body.appendChild(bar);
    bar.querySelector('.pd-tb-back').addEventListener('click',function(){ if(history.length>1&&document.referrer) history.back(); else location.href='collection.html'; });
    var navA=[].slice.call(bar.querySelectorAll('.pd-tb-nav a'));
    navA.forEach(function(a){ a.addEventListener('click',function(e){ var t=document.querySelector(a.getAttribute('href')); if(!t) return; e.preventDefault(); window.scrollTo({top:t.getBoundingClientRect().top+scrollY-64,behavior:'smooth'}); }); });
    var lastY=scrollY, acc=0, start=function(){ var w=document.querySelector('.pd-buy-wrap'); return w?w.offsetTop+w.offsetHeight*0.5:500; };
    function onScroll(){
      var y=scrollY, dy=y-lastY; lastY=y;
      if(y<start()){ bar.classList.remove('on'); acc=0; }
      else { acc = (dy<0) ? Math.min(0,acc)+dy : Math.max(0,acc)+dy; if(acc<-10) bar.classList.add('on'); else if(acc>10) bar.classList.remove('on'); }
      /* 지금 보고 있는 구역 표시 */
      var cur=null; navA.forEach(function(a){ var t=document.querySelector(a.getAttribute('href')); if(t&&t.getBoundingClientRect().top<Math.max(140,innerHeight*0.45)) cur=a; }); if(innerHeight+y>=document.documentElement.scrollHeight-4) cur=navA[navA.length-1];
      navA.forEach(function(a){ a.classList.toggle('on',a===cur); }); var ch=cur&&cur.getAttribute('href'); links.forEach(function(a){ a.classList.toggle('on',a.getAttribute('href')===ch); });
    }
    window.addEventListener('scroll',onScroll,{passive:true}); onScroll();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── 모바일 검색 (SSG 방식) — 상단 검색창을 누르면 페이지 이동 없이 검색 화면이 열리고 바로 키보드가 올라옴
   최근 검색어(이 기기) · 추천 검색어(관리자 사이트 검색 추천어) · 추천 상품 · 입력하면 바로 찾은 상품 ───────── */
(function(){
  var SUGGEST=['디카페인','드립백','초콜릿','산미','선물세트','방탄커피'];          /* 실개발: 관리자 「사이트 검색 추천어」 */
  var PICK=['product-velvet.html','product-colombia.html','gift-tasting.html','first-note.html','product-aurora.html'];   /* 추천 상품 — 관리자 뱃지(BEST · HOT · MD추천 · NEW) 상품 */
  var IMG={'product-velvet.html':'images/thumbs/product-velvet.jpg','product-colombia.html':'images/thumbs/product-colombia.jpg','gift-tasting.html':'images/design/gt-flat.jpg','first-note.html':'images/thumbs/first-note.jpg','product-aurora.html':'images/thumbs/product-aurora.jpg'};
  function init(){
    if(document.querySelector('.sov')) return;
    var st=document.createElement('style');
    st.textContent='.sov{position:fixed;inset:0;z-index:300;background:#fff;display:none;flex-direction:column}.sov.on{display:flex}'
      +'.sov-top{flex:none;display:grid;grid-template-columns:44px 1fr 44px;gap:6px;align-items:center;padding:10px 12px 10px 6px}'
      +'.sov-top button,.sov-top a{width:44px;height:44px;border:0;background:none;display:flex;align-items:center;justify-content:center;color:var(--ink,#111921);padding:0;cursor:pointer}'
      +'.sov svg{width:24px;height:24px;fill:none;stroke:currentColor;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
      +'.sov-f{display:flex;align-items:center;height:48px;padding:0 6px 0 18px;border-radius:999px;background:#F1F1EF}'
      +'.sov-f input{flex:1;min-width:0;height:100%;border:0;background:none;font-family:inherit;font-size:16px;color:var(--ink,#111921);outline:none}.sov-f input::-webkit-search-cancel-button{display:none}'
      +'.sov-f .sx{width:28px;height:28px;border:0;border-radius:50%;background:#CFCDC8;color:#fff;font-size:14px;line-height:1;display:none;cursor:pointer}.sov-f.has .sx{display:block}'
      +'.sov-f .go{width:40px;height:40px;border:0;background:none;display:flex;align-items:center;justify-content:center;color:var(--ink,#111921);cursor:pointer}'
      +'.sov-b{flex:1;overflow:auto;padding:8px 0 40px;-webkit-overflow-scrolling:touch}'
      +'.sov-h{display:flex;justify-content:space-between;align-items:baseline;padding:18px 20px 12px}.sov-h b{font-size:18px;font-weight:800;color:var(--ink,#111921)}.sov-h button{border:0;background:none;font-family:inherit;font-size:14px;color:var(--mist,#8A9099);cursor:pointer}'
      +'.sov-chips{display:flex;gap:8px;overflow-x:auto;padding:0 20px 4px;scrollbar-width:none}.sov-chips::-webkit-scrollbar{display:none}'
      +'.sov-chips a{flex:none;display:inline-flex;align-items:center;gap:8px;height:40px;padding:0 16px;border-radius:999px;font-size:14.5px;color:var(--ink,#111921);text-decoration:none;white-space:nowrap}'
      +'.sov-chips.rec a{border:1px solid var(--hair,#D9D7D2);background:#fff}.sov-chips.rec a i{font-style:normal;color:var(--mist,#8A9099);font-size:15px;padding:4px 0 4px 2px}'
      +'.sov-chips.sug a{background:#F1F1EF}'
      +'.sov-empty{padding:0 20px;font-size:13.5px;color:var(--mist,#8A9099)}'
      +'.sov-prod{display:flex;gap:10px;overflow-x:auto;padding:0 20px;scrollbar-width:none}.sov-prod::-webkit-scrollbar{display:none}'
      +'.sov-prod a{flex:none;width:136px;text-decoration:none;color:inherit}.sov-prod img{display:block;width:136px;height:136px;object-fit:cover;background:#F3F3F3}'
      +'.sov-prod b{display:block;margin-top:8px;font-size:14px;font-weight:700;color:var(--ink,#111921);word-break:keep-all}.sov-prod span{display:block;margin-top:4px;font-size:15px;font-weight:800;color:var(--ink,#111921)}'
      +'.sov-res a{display:block;padding:14px 20px;border-bottom:1px solid var(--hair,#E6E4DE);text-decoration:none;color:var(--ink,#111921)}.sov-res a b{font-size:15px}.sov-res a small{display:block;margin-top:3px;font-size:13px;color:var(--mist,#8A9099)}.sov-res mark{background:none;color:var(--sky-deep,#2F8FB8);font-weight:700}'
      +'.sov-all{display:block;margin:16px 20px 0;height:48px;line-height:48px;text-align:center;border:1px solid var(--ink,#111921);color:var(--ink,#111921);text-decoration:none;font-size:15px;font-weight:600}';
    document.head.appendChild(st);
    var ov=document.createElement('div'); ov.className='sov'; ov.setAttribute('role','dialog'); ov.setAttribute('aria-label','검색');
    ov.innerHTML='<div class="sov-top"><button type="button" class="sov-x" aria-label="닫기"><svg viewBox="0 0 24 24"><path d="M19 12H5M11 6l-6 6 6 6"/></svg></button>'
      +'<form class="sov-f" role="search"><input type="search" enterkeyhint="search" autocomplete="off" placeholder="원두 이름, 컵노트로 찾아보세요" aria-label="검색어"><button type="button" class="sx" aria-label="지우기">×</button><button type="submit" class="go" aria-label="검색"><svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="M20 20l-4-4"/></svg></button></form>'
      +'<a href="cart.html" aria-label="장바구니"><svg viewBox="0 0 24 24"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg></a></div>'
      +'<div class="sov-b"></div>';
    document.body.appendChild(ov);
    var inp=ov.querySelector('input'), form=ov.querySelector('form'), body=ov.querySelector('.sov-b');
    function rec(){ try{ return JSON.parse(localStorage.getItem('tcc_recent_q')||'[]'); }catch(e){ return []; } }
    function saveRec(q){ var l=rec().filter(function(x){ return x!==q; }); l.unshift(q); try{ localStorage.setItem('tcc_recent_q',JSON.stringify(l.slice(0,10))); }catch(e){} }
    function esc(t){ var d=document.createElement('div'); d.textContent=t; return d.innerHTML; }
    function won(n){ return n.toLocaleString('ko-KR')+'원'; }
    function priceOf(h){ var P=window.TCC_PRICES||{}; var k=h.replace('product-','').replace('.html',''); try{ if(P.beans&&P.beans[k]) return P.beans[k]['200g']; }catch(e){} var t=(window.TCC_SEARCH||[]).filter(function(x){ return x.href===h; })[0]; return null; }
    function nameOf(h){ var t=(window.TCC_SEARCH||[]).filter(function(x){ return x.href===h; })[0]; return t?t.t:''; }
    function go(q){ q=(q||'').trim(); if(!q) return; saveRec(q); location.href='search.html?q='+encodeURIComponent(q); }
    function home(){
      var r=rec();
      var h='<div class="sov-h"><b>최근 검색어</b>'+(r.length?'<button type="button" class="sov-clr">전체삭제</button>':'')+'</div>'
        +(r.length?'<div class="sov-chips rec">'+r.map(function(q){ return '<a href="#" data-q="'+esc(q)+'">'+esc(q)+'<i data-del="'+esc(q)+'" aria-label="삭제">×</i></a>'; }).join('')+'</div>':'<p class="sov-empty">최근 검색한 내역이 없습니다.</p>')
        +'<div class="sov-h"><b>추천 검색어</b></div><div class="sov-chips sug">'+SUGGEST.map(function(q){ return '<a href="#" data-q="'+q+'">'+q+'</a>'; }).join('')+'</div>'
        +'<div class="sov-h"><b>추천 상품</b></div><div class="sov-prod">'+PICK.map(function(h){ var p=priceOf(h); return '<a href="'+h+'"><img src="'+IMG[h]+'" alt=""><b>'+esc(nameOf(h)||'')+'</b>'+(p!=null?'<span>'+won(p)+'</span>':'')+'</a>'; }).join('')+'</div>';
      body.innerHTML=h;
    }
    function live(q){
      var L=(window.TCC_SEARCH||[]), k=q.toLowerCase();
      var res=L.filter(function(x){ return (x.t+' '+x.d+' '+(x.n||'')).toLowerCase().indexOf(k)>=0; }).slice(0,8);
      function hl(t){ var i=t.toLowerCase().indexOf(k); return i<0?esc(t):esc(t.slice(0,i))+'<mark>'+esc(t.slice(i,i+q.length))+'</mark>'+esc(t.slice(i+q.length)); }
      body.innerHTML = res.length ? '<div class="sov-res">'+res.map(function(x){ return '<a href="'+x.href+'"><b>'+hl(x.t)+'</b><small>'+hl(x.n||x.d.replace(/<br>/g,' '))+'</small></a>'; }).join('')+'</div><a class="sov-all" href="search.html?q='+encodeURIComponent(q)+'">「'+esc(q)+'」 검색 결과 모두 보기</a>'
        : '<p class="sov-empty" style="padding-top:24px">「'+esc(q)+'」와 맞는 상품이 없습니다. 다른 검색어로 찾아보세요.</p>';
    }
    function paint(){ var q=inp.value.trim(); form.classList.toggle('has',!!q); if(q) live(q); else home(); }
    inp.addEventListener('input',paint);
    form.addEventListener('submit',function(e){ e.preventDefault(); go(inp.value); });
    ov.querySelector('.sx').addEventListener('click',function(){ inp.value=''; paint(); inp.focus(); });
    body.addEventListener('click',function(e){
      var d=e.target.closest('[data-del]'); if(d){ e.preventDefault(); e.stopPropagation(); var l=rec().filter(function(x){ return x!==d.dataset.del; }); try{ localStorage.setItem('tcc_recent_q',JSON.stringify(l)); }catch(x){} home(); return; }
      if(e.target.closest('.sov-clr')){ try{ localStorage.removeItem('tcc_recent_q'); }catch(x){} home(); return; }
      var c=e.target.closest('[data-q]'); if(c){ e.preventDefault(); go(c.dataset.q); }
    });
    function close(){ ov.classList.remove('on'); document.body.style.overflow=''; inp.blur(); }
    ov.querySelector('.sov-x').addEventListener('click',close);
    function open(e){
      if(e) e.preventDefault();
      ov.classList.add('on'); document.body.style.overflow='hidden';
      inp.value=''; paint();
      inp.focus();   /* 같은 탭 동작 안에서 포커스 → 휴대폰 키보드가 바로 올라옴 */
      if(!window.TCC_SEARCH){ var s=document.createElement('script'); s.src='search-index.js'; s.onload=function(){ if(!inp.value) home(); else live(inp.value); }; document.head.appendChild(s); }
    }
    document.addEventListener('click',function(e){
      var a=e.target.closest('#nav .m-search'); if(!a||!window.matchMedia('(max-width:900px)').matches) return;
      open(e);
    },true);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
/* ───────── 사업자 원두 상세 — 테이스팅 샘플 신청 링크 ───────── */
(function(){
  var m=(location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||'').match(/^business-p-(velvet|aurora|siesta|colombia|ethiopia|kenya|guatemala|png|png-decaf)\.html$/);
  if(!m) return;
  function init(){
    var note=document.getElementById('bpNote'); if(!note||document.querySelector('.bp-sample')) return;
    var me=null, done=false; try{ me=JSON.parse(localStorage.getItem('tcc_biz_member')||'null'); var l=JSON.parse(localStorage.getItem('tcc_biz_samples')||'[]'); done=!!(me&&l.some(function(s){ return s.bizNo===me.bizNo; })); }catch(e){}
    var st=document.createElement('style');
    st.textContent='.bp-sample{display:flex;justify-content:space-between;align-items:center;gap:12px;margin-top:16px;padding:14px 16px;border:1px solid var(--hair,#DCD7CF);background:#fff;text-decoration:none;color:var(--ink,#111921)}'
      +'.bp-sample span{font-size:12.5px;color:var(--slate,#4A5562);line-height:1.6;word-break:keep-all}.bp-sample span b{display:block;font-size:13.5px;color:var(--ink,#111921);font-weight:700;margin-bottom:2px}'
      +'.bp-sample i{font-style:normal;font-size:16px;flex:none}.bp-sample:hover{border-color:var(--ink,#111921)}';
    document.head.appendChild(st);
    var a=document.createElement('a'); a.className='bp-sample';
    a.href=done?'business-sample.html':'business-sample.html?pick='+m[1];
    a.innerHTML=done?'<span><b>신청하신 테이스팅 샘플</b>보내드린 샘플과 진행 상황을 확인하실 수 있습니다.</span><i>→</i>'
      :'<span><b>주문 전에 먼저 맛보세요</b>원두 세 가지를 100g씩 보내드리는 테이스팅 샘플 (샘플 무료 · 배송비만 부담 · 1회)</span><i>→</i>';
    note.parentNode.insertBefore(a, note.nextSibling);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── 바로구매 — 장바구니에 담지 않고 고른 상품만 결제 (checkout.html?now=1) ─────────
   상세 페이지들은 TCC.add 다음에 TCC.buyNow()를 부름. add 직전 장바구니를 되돌리고, 방금 고른 상품만 sessionStorage(tcc_now)에 넘김 */
(function(){
  if(!window.TCC || !TCC.add || TCC.__nowWrap) return;
  var orig=TCC.add; TCC.__nowWrap=true;
  TCC.add=function(item){ try{ TCC.__last=JSON.parse(JSON.stringify(item)); TCC.__snap=TCC.read(); }catch(e){} return orig.apply(TCC, arguments); };
  TCC.buyNow=function(){
    if(!TCC.__last){ location.href='checkout.html'; return; }
    try{ if(TCC.__snap) TCC.write(TCC.__snap); sessionStorage.setItem('tcc_now', JSON.stringify([TCC.__last])); }catch(e){ location.href='checkout.html'; return; }
    location.href='checkout.html?now=1';
  };
})();

/* ───────── 취향 찾기(PALATE) 열기 — 모바일 메뉴 카드 · PC 상단 메뉴. 페이지의 열기 버튼(#palateOpen)이 없어져 모달이 열리지 않던 것 보완 ───────── */
(function(){
  function init(){
    var modal=document.getElementById('palateModal'); if(!modal||window.__palateWired) return; window.__palateWired=true;
    var closeBtn=document.getElementById('palateClose'), bd=document.getElementById('palateBackdrop'), last=null;
    function open(src){ var nv=document.querySelector('.mnav.open'); if(nv){ nv.classList.remove('open'); } last=src||null; modal.hidden=false; document.body.style.overflow='hidden'; if(closeBtn) closeBtn.focus(); }
    function close(){ modal.hidden=true; document.body.style.overflow=''; if(last&&last.focus) last.focus(); }
    window.TCC_PALATE_OPEN=open;
    if(!document.getElementById('palateOpen')){
      if(closeBtn) closeBtn.addEventListener('click',close);
      if(bd) bd.addEventListener('click',close);
      document.addEventListener('keydown',function(e){ if(e.key==='Escape'&&!modal.hidden) close(); });
    }
    document.addEventListener('click',function(e){ var t=e.target.closest('[data-palate]'); if(!t) return; e.preventDefault(); e.stopPropagation(); open(t); },true);
    /* PC 상단 메뉴 — 「커피 가이드」 펼침 메뉴 맨 아래 「커피 취향 찾기」 */
    var g=document.querySelector('.gnb-menu, .gnb-center, .gnb-links');
    var gd=document.querySelector('#nav .gd-drop[aria-label="커피 가이드"] .pm-col');
    if(gd && !gd.querySelector('[data-palate]') && !/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))){
      var pa=document.createElement('a'); pa.href='#palate'; pa.setAttribute('data-palate',''); pa.textContent='커피 취향 찾기'; gd.appendChild(pa);
    }
    if(false){
      var a=document.createElement('a');
      var st=document.createElement('style'); st.textContent='@media(max-width:760px){.gnb-palate{display:none!important}}';
      document.head.appendChild(st); g.appendChild(a);
    }
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(init,0); }); else setTimeout(init,0);
})();

/* ───────── 모바일 상단 — 장바구니 옆 햄버거 메뉴 고정 (하단 탭 바와 달리 스크롤해도 움직이지 않음) ───────── */
(function(){ var st=document.createElement('style'); st.textContent=(/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))?'#nav .nt-bell{display:none!important}':'')+'@media(max-width:760px){html body #nav .gnb-right{gap:8px!important;margin-left:10px!important}html body #nav .gnb-right .icon-btn{width:30px!important;min-width:0!important}html body #nav .gnb-right .m-search{padding-left:14px!important;padding-right:12px!important}#nav .gnb-burger{order:99;border:0!important;background:none!important;display:flex!important;flex:none;height:24px;justify-content:center;padding:0;margin-left:2px;cursor:pointer}}'; document.head.appendChild(st); })();

/* ───────── 취향 찾기 2 — 맛 6가지(최대 2개) · 산미 · 카페인 · 즐기는 방식 → 원두 최대 3개 추천 ─────────
   맛 태그는 각 원두의 컵노트(상세페이지 · 사업자 품목 정보)에서만 뽑음. 산미 값은 테이스트 점수(5점) 그대로 */
(function(){
  var B=[
    {id:'velvet',n:'벨벳 블렌드',d:'다크초콜릿의 깊은 풍미와 견과의 고소함',note:'견과 · 커런트 · 다크초콜릿',ac:0.5,bd:4.5,rs:'미디엄',cf:'full',t:['rich','sweet','nutty']},
    {id:'aurora',n:'오로라 블렌드',d:'베리와 복숭아의 달콤함, 은은한 꽃향',note:'베리 · 복숭아 · 플로럴',ac:3.5,bd:2,rs:'미디엄 라이트',cf:'full',t:['bright','floral','sweet']},
    {id:'siesta',n:'시에스타 · 하프카페인 블렌드',d:'꽃과 과일 향에 밀크초콜릿의 단맛이 어우러진 블렌드',note:'꽃향기 · 복숭아 · 오렌지 · 밀크초콜릿',ac:3,bd:2,rs:'미디엄',cf:'half',t:['floral','bright','sweet']},
    {id:'colombia',n:'콜롬비아',d:'잘 익은 블루베리의 단맛과 흑설탕 같은 진한 여운',note:'블루베리 · 흑설탕 · 다크초콜릿',ac:2,bd:3.5,rs:'미디엄',cf:'full',t:['bright','sweet','rich']},
    {id:'ethiopia',n:'에티오피아',d:'레몬사탕의 산뜻함과 자스민의 은은한 향',note:'레몬사탕 · 자스민 · 복숭아 · 그린티',ac:4.5,bd:2,rs:'미디엄 라이트',cf:'full',t:['bright','floral','clean']},
    {id:'kenya',n:'케냐',d:'자몽의 산뜻한 산미와 루이보스차 같은 여운',note:'자몽 · 크랜베리 · 루이보스차 · 아몬드캔디',ac:5,bd:2,rs:'라이트 ~ 미디엄 라이트',cf:'full',t:['bright','clean','nutty']},
    {id:'guatemala',n:'과테말라',d:'오렌지 마멀레이드의 단맛과 카카오의 깊은 풍미',note:'오렌지 마멀레이드 · 캐러멜 · 카카오 · 클린 피니시',ac:1.5,bd:3.5,rs:'미디엄',cf:'full',t:['sweet','rich','clean']},
    {id:'png',n:'파푸아뉴기니',d:'산뜻한 시트러스와 고소한 아몬드의 조화',note:'브라운슈가 · 아몬드 · 시트러스',ac:2,bd:5,rs:'미디엄',cf:'full',t:['rich','nutty','sweet']},
    {id:'png-decaf',n:'파푸아뉴기니 디카페인',d:'초콜릿의 단맛과 견과의 고소함을 담은 디카페인',note:'초콜릿 · 견과 · 스무스 바디 · 시트러스',ac:0.5,bd:5,rs:'미디엄',cf:'decaf',t:['rich','nutty','sweet']}
  ];
  var TASTE=[['rich','묵직하고 진한 맛','다크초콜릿 · 카카오처럼'],['sweet','달콤하고 부드러운 맛','캐러멜 · 밀크초콜릿처럼'],['bright','상큼한 과일 맛','자몽 · 베리 · 청사과처럼'],['floral','화사한 꽃향','자스민 · 복숭아처럼'],['clean','깔끔하고 개운한 맛','차처럼 맑은 끝맛'],['nutty','고소한 맛','아몬드 · 견과처럼']];
  var TL={}; TASTE.forEach(function(x){ TL[x[0]]=x[1]; });
  var ACID=[['low','거의 없게','부드럽고 묵직하게'],['mid','은은하게','단맛과 어우러지는 정도'],['high','또렷하게','과일처럼 산뜻하게']];
  var MILK=[['black','블랙으로','원두 본연의 맛 그대로'],['milk','우유를 넣어서','라떼처럼 부드럽게']];
  var CAF=[['any','상관없어요',''],['full','일반 커피',''],['half','카페인은 절반만','하프카페인'],['decaf','디카페인','']];
  var FMT=[['beans','직접 내려서','드리퍼나 머신으로'],['dripbag','간편하게','물만 부으면 되는 드립백'],['bulletproof','버터와 오일을 더해','방탄커피 한 잔']];

  function acLv(v){ return v<=1.5?'low':(v>=4?'high':'mid'); }
  function rank(a){
    var pool=B.filter(function(b){ return a.caf==='any'||(a.caf==='full'?b.cf==='full':b.cf===a.caf); });
    if(a.caf==='half'||a.caf==='decaf'){ /* 해당 원두가 하나뿐이라 결과가 비지 않게, 다른 쪽(디카페인 ↔ 하프)을 이어서 보여줌 */
      pool=pool.concat(B.filter(function(b){ return b.cf===(a.caf==='half'?'decaf':'half'); }));
    }
    var sc=pool.map(function(b,i){
      var hit=a.taste.filter(function(t){ return b.t.indexOf(t)>-1; });
      var s=hit.length*3, lv=acLv(b.ac);
      if(lv===a.acid) s+=2; else if(a.acid==='mid'||lv==='mid') s+=0.5; else s-=1.5;
      if(b.cf===a.caf) s+=1.5;
      var bodyOk=a.milk==='milk'&&b.bd>=3.5; if(a.milk==='milk'){ if(bodyOk) s+=2.5; else if(b.bd<=2) s-=1.5; }
      return {b:b,s:s,hit:hit,acOk:lv===a.acid,bodyOk:bodyOk,i:i};
    });
    sc.sort(function(x,y){ return y.s-x.s||x.i-y.i; });
    var top=sc.filter(function(x){ return x.s>0; }).slice(0,3); if(!top.length) top=sc.slice(0,2);
    return top;
  }
  function opts(list,key,multi){ return '<div class="pq-options pq2-opts'+(list.length>3?' pq2-grid':'')+'" data-key="'+key+'"'+(multi?' data-multi="2"':'')+'>'+list.map(function(o){ return '<button class="pq-opt" type="button" data-value="'+o[0]+'"><b>'+o[1]+'</b>'+(o[2]?'<span>'+o[2]+'</span>':'')+'</button>'; }).join('')+'</div>'; }

  function init(){
    var quiz=document.getElementById('palateQuiz'); if(!quiz||quiz.dataset.v2) return; quiz.dataset.v2='1';
    var st=document.createElement('style');
    st.textContent='.pq2-opts .pq-opt.selected{box-shadow:inset 0 0 0 1px var(--ink)}.pq2-grid{grid-template-columns:repeat(3,1fr)!important}.pq2-next{display:block;margin-top:22px;width:100%;padding:15px;border:0;background:var(--ink);color:#fff;font:inherit;font-size:14px;font-weight:600;cursor:pointer;border-radius:2px}.pq2-next[disabled]{opacity:.3;cursor:not-allowed}'
      +'.pq-img{margin:0 0 22px;aspect-ratio:16/7;overflow:hidden;background:var(--paper)}.pq-img img,.pq-cover-img img{width:100%;height:100%;object-fit:cover;display:block}.pq-cover-img{margin:0 0 26px;aspect-ratio:16/8;overflow:hidden;background:var(--paper)}.palate-panel.pq-run>.sec-eyebrow,.palate-panel.pq-run>#palateModalTitle,.palate-panel.pq-run>.palate-intro,.palate-panel.pq-run>.pq-cover-img{display:none!important}.palate-panel:not(.pq-run) .pq-steps{display:none}.pq-cover-go .pq2-next{margin-top:6px}@media(max-width:760px){.pq-img{aspect-ratio:16/8;margin-bottom:18px}.pq-cover-img{aspect-ratio:4/3}}'
      +'.pq2-hint{font-size:12px;color:var(--mist);margin:-10px 0 16px}'
      +'.pq2-res{display:grid;gap:12px}.pq2-card{display:grid;grid-template-columns:112px 1fr;gap:16px;align-items:center;padding:14px;border:1px solid var(--hair);background:var(--white,#fff);text-decoration:none;color:var(--ink)}.pq2-card:hover{border-color:var(--ink)}'
      +'.pq2-card img{width:112px;height:112px;object-fit:cover;display:block;background:var(--paper)}.pq2-card .k{font-size:10.5px;letter-spacing:.16em;color:var(--mist);font-weight:700}.pq2-card h4{font-family:var(--serif);font-size:17px;font-weight:600;margin:4px 0 6px;word-break:keep-all}'
      +'.pq2-card p{font-size:12.5px;color:var(--slate);line-height:1.6;margin:0;word-break:keep-all}.pq2-why{display:flex;flex-wrap:wrap;gap:5px;margin-top:8px}.pq2-why i{font-style:normal;font-size:11px;padding:3px 8px;border:1px solid var(--hair);border-radius:999px;color:var(--slate)}'
      +'.pq2-card.pq2-top{border-color:var(--ink);box-shadow:inset 0 0 0 1px var(--ink)}.pq2-badge{display:inline-flex!important;align-items:center;gap:5px;background:var(--ink);color:#fff!important;padding:4px 10px 4px 8px;border-radius:999px;letter-spacing:.06em!important}.pq2-badge svg{width:11px;height:11px}.pq2-card p.pq2-roast{margin-top:4px;font-size:11.5px;color:var(--mist)}.pq2-more{margin-top:18px;padding:16px 18px;background:var(--paper);font-size:13px;color:var(--slate);line-height:1.7;word-break:keep-all}.pq2-more a{color:var(--ink);font-weight:700;text-decoration:underline;text-underline-offset:3px}'
      +'@media(max-width:760px){.pq2-grid{grid-template-columns:1fr 1fr!important}.pq2-grid .pq-opt{padding:14px 12px!important}.pq2-card{grid-template-columns:76px 1fr;gap:12px}.pq2-card img{width:76px;height:76px}}';
    document.head.appendChild(st);
    quiz.innerHTML='<div class="pq-steps">'+[1,2,3,4,5].map(function(i){ return '<span class="pq-step'+'" data-step="'+i+'"></span>'; }).join('')+'</div>'
      +'<div class="pq-panel" data-panel="1" hidden><div class="pq-img"><img src="images/design/velvet-statement.jpg" alt="초콜릿과 견과를 곁들인 커피" loading="lazy"></div><div class="pq-q">Q1 · 어떤 맛을 좋아하시나요?</div><p class="pq2-hint">두 가지까지 고르실 수 있어요.</p>'+opts(TASTE,'taste',true)+'<button class="pq2-next" type="button" data-next="2" disabled>다음</button></div>'
      +'<div class="pq-panel" data-panel="2" hidden><div class="pq-img"><img src="images/design/kenya-statement.jpg" alt="자몽 옆에서 내리는 커피" loading="lazy"></div><div class="pq-q">Q2 · 산미는 어느 정도가 좋으세요?</div>'+opts(ACID,'acid')+'<button class="pq-back" type="button" data-back="1">이전 질문</button></div>'
      +'<div class="pq-panel" data-panel="3" hidden><div class="pq-img"><img src="images/design/guide-brew-hot.jpg" alt="갓 내린 따뜻한 커피" loading="lazy"></div><div class="pq-q">Q3 · 주로 어떻게 드세요?</div>'+opts(MILK,'milk')+'<button class="pq-back" type="button" data-back="2">이전 질문</button></div>'
      +'<div class="pq-panel" data-panel="4" hidden><div class="pq-img"><img src="images/design/png-decaf-moment.jpg" alt="저녁 조명 아래의 커피" loading="lazy"></div><div class="pq-q">Q4 · 카페인은 어떻게 할까요?</div>'+opts(CAF,'caf')+'<button class="pq-back" type="button" data-back="3">이전 질문</button></div>'
      +'<div class="pq-panel" data-panel="5" hidden><div class="pq-img"><img src="images/design/guide-brewing.jpg" alt="드리퍼로 커피를 내리는 장면" loading="lazy"></div><div class="pq-q">Q5 · 어떻게 즐기고 싶으신가요?</div>'+opts(FMT,'fmt')+'<button class="pq-back" type="button" data-back="4">이전 질문</button></div>'
      +'<div class="pq-cover-go" data-panel="0"><button class="pq2-next" type="button" id="pq2Start">시작하기</button></div>'
      +'<div class="pq-result" data-panel="result" hidden><div class="pq-result-eyebrow">추천 원두</div><div class="pq2-res" id="pq2Res"></div><div id="pq2More"></div><button class="pq-restart" type="button" id="pq2Restart">처음부터 다시</button></div>';
    var A={taste:[]};
    function go(n){
      quiz.querySelectorAll('[data-panel]').forEach(function(p){ p.hidden=p.getAttribute('data-panel')!==String(n); });
      quiz.querySelectorAll('.pq-step').forEach(function(s){ var k=+s.getAttribute('data-step'); s.classList.toggle('active',n!=='result'&&k===n); s.classList.toggle('done',n==='result'||k<n); });
      var pn=quiz.closest('.palate-panel'); if(pn){ pn.scrollTop=0; pn.classList.toggle('pq-run',n!==0); }
    }
    function result(){
      var r=rank(A);
      document.getElementById('pq2Res').innerHTML=r.map(function(x,i){
        var why=x.hit.map(function(t){ return '<i>'+TL[t]+'</i>'; }); if(x.acOk) why.push('<i>산미 '+({low:'거의 없게',mid:'은은하게',high:'또렷하게'})[A.acid]+'</i>'); if(x.bodyOk) why.push('<i>우유와 잘 어울려요</i>'); if(x.b.cf!=='full') why.push('<i>'+(x.b.cf==='half'?'하프카페인':'디카페인')+'</i>');
        return '<a class="pq2-card'+(i===0?' pq2-top':'')+'" href="product-'+x.b.id+'.html"><img src="images/design/pq-'+x.b.id+'.jpg" alt="" loading="lazy" onerror="this.style.visibility=\'hidden\'"><div>'+(i===0?'<span class="k pq2-badge"><svg viewBox="0 0 12 12" aria-hidden="true"><path d="M2.5 6.2l2.3 2.3 4.7-5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>가장 잘 맞아요</span>':'<span class="k">이것도 좋아요</span>')+'<h4>'+x.b.n+'</h4><p>'+x.b.note+'</p><p class="pq2-roast">로스팅 · '+x.b.rs+'</p><div class="pq2-why">'+why.join('')+'</div></div></a>';
      }).join('');
      var more='';
      if(A.fmt==='dripbag') more='<div class="pq2-more">물만 부으면 되는 <a href="product-dripbag-single.html">드립백</a>으로도 즐기실 수 있어요. 여러 맛을 한 상자에 담은 <a href="gift-dripbag.html">드립백 세트</a>도 있습니다.</div>';
      else if(A.fmt==='bulletproof') more='<div class="pq2-more">버터와 오일을 더해 드신다면 스틱 하나로 간편한 <a href="product-bulletproof.html">더클린 방탄커피</a>가 잘 맞습니다.</div>';
      else if(r.length>1) more='<div class="pq2-more">아직 하나로 고르기 어렵다면, 원두 네 가지를 직접 골라 비교해 보는 <a href="first-note.html">FIRST NOTE</a>로 시작해 보세요.</div>';
      document.getElementById('pq2More').innerHTML=more;
      go('result');
    }
    quiz.addEventListener('click',function(e){
      var o=e.target.closest('.pq-opt'), nx=e.target.closest('[data-next]'), bk=e.target.closest('[data-back]');
      if(e.target.closest('#pq2Start')){ go(1); return; }
      if(e.target.closest('#pq2Restart')){ A={taste:[]}; quiz.querySelectorAll('.pq-opt.selected').forEach(function(x){ x.classList.remove('selected'); }); quiz.querySelector('[data-next]').disabled=true; go(1); return; }
      if(bk){ go(+bk.getAttribute('data-back')); return; }
      if(nx){ if(A.taste.length) go(+nx.getAttribute('data-next')); return; }
      if(!o) return;
      var box=o.parentNode, key=box.getAttribute('data-key'), v=o.getAttribute('data-value');
      if(box.hasAttribute('data-multi')){
        var i=A.taste.indexOf(v);
        if(i>-1){ A.taste.splice(i,1); o.classList.remove('selected'); }
        else { if(A.taste.length>=2){ var old=A.taste.shift(); var ob=box.querySelector('[data-value="'+old+'"]'); if(ob) ob.classList.remove('selected'); } A.taste.push(v); o.classList.add('selected'); }
        quiz.querySelector('[data-next]').disabled=!A.taste.length; return;
      }
      box.querySelectorAll('.pq-opt').forEach(function(x){ x.classList.toggle('selected',x===o); });
      A[key]=v;
      var n=+o.closest('[data-panel]').getAttribute('data-panel');
      setTimeout(function(){ if(n<5) go(n+1); else result(); },180);
    });
    function reset(){ A={taste:[]}; quiz.querySelectorAll('.pq-opt.selected').forEach(function(x){ x.classList.remove('selected'); }); var nb=quiz.querySelector('[data-next]'); if(nb) nb.disabled=true; go(0); }
    var pnl=quiz.closest('.palate-panel'), md=document.getElementById('palateModal');
    if(pnl&&!pnl.querySelector('.pq-cover-img')){ var ci=document.createElement('div'); ci.className='pq-cover-img'; ci.innerHTML='<img src="images/design/guide-end-cup.jpg" alt="더클린커피 원두와 커피 한 잔">'; pnl.insertBefore(ci,pnl.querySelector('.sec-eyebrow')||pnl.firstChild.nextSibling); }
    if(md) new MutationObserver(function(){ if(!md.hidden) reset(); }).observe(md,{attributes:true,attributeFilter:['hidden']});
    reset();
    window.TCC_PALATE_RANK=rank;
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(init,0); }); else setTimeout(init,0);
})();

/* ───────── 사업자 페이지 — 상단 메뉴(PC)를 사업자용으로 · 일반 검색 숨김 ───────── */
(function(){
  if(!/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))) return;
  function init(){
    var c=document.querySelector('#nav .gnb-center'); if(!c||c.dataset.biz) return; c.dataset.biz='1';
    var A=function(h,t){ return '<a href="business-mypage.html#catalog-'+h+'">'+t+'</a>'; };
    c.innerHTML='<div class="gnb-item"><a href="business-mypage.html#catalog">납품 품목<span class="caret" aria-hidden="true"></span></a>'
      +'<div class="simple-drop pm-drop" role="menu" aria-label="납품 품목">'
      +'<div class="pm-col"><a class="pm-h" href="business-mypage.html#catalog-beans">원두</a>'+A('all','전체')+A('decaf','디카페인')+'</div>'
      +'<div class="pm-col"><a class="pm-h" href="business-mypage.html#catalog-dripbag">드립백</a></div>'
      +'<div class="pm-col"><a class="pm-h" href="business-mypage.html#catalog-giftset">기업 선물</a></div>'
      +'<div class="pm-col"><a class="pm-h" href="business-mypage.html#catalog-bulletproof">방탄커피</a></div>'
      +'</div></div>'
      +'<a href="business-event.html">행사 상품</a>'
      +'<a href="business-sample.html">테이스팅 샘플</a>'
      +'<div class="gnb-item"><a href="business-mypage.html#quotes">주문 · 정산<span class="caret" aria-hidden="true"></span></a>'
      +'<div class="simple-drop pm-drop" role="menu" aria-label="주문 · 정산"><div class="pm-col"><a href="business-mypage.html#quotes">주문 내역</a><a href="business-mypage.html#orders">납품 · 정산 내역</a><a href="business-mypage.html#terms">거래 조건</a><a href="business-mypage.html#account">사업자 정보</a></div></div></div>';
    var st=document.createElement('style');
    st.textContent='#nav .gnb-right .m-search,#nav .gnb-right a[aria-label="검색"],#nav .gnb-right button[aria-label="검색"]{display:none!important}';
    document.head.appendChild(st);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── PC — 취향 찾기 떠 있는 버튼 (사업자 구매 버튼 위, 스크롤해도 따라다님) ───────── */
(function(){
  if(/^business-/.test((location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')||''))) return;
  function init(){
    if(!document.getElementById('palateModal')||document.querySelector('.pq-quick')) return;
    var st=document.createElement('style');
    st.textContent='.pq-quick{position:fixed;right:28px;bottom:84px;z-index:60;display:inline-flex;align-items:center;gap:10px;padding:10px 18px 10px 10px;background:var(--ink,#111921);color:#fff;border:0;border-radius:999px;box-shadow:0 10px 28px rgba(17,25,33,.28);font-family:inherit;cursor:pointer;text-align:left;transition:transform .2s,box-shadow .2s}'
      +'.pq-quick:hover{transform:translateY(-2px);box-shadow:0 14px 32px rgba(17,25,33,.34)}'
      +'.pq-quick i{flex:none;width:36px;height:36px;border-radius:50%;overflow:hidden;background:#F2EFEA;display:block;box-shadow:0 0 0 2px rgba(255,255,255,.18)}.pq-quick i img{width:100%;height:100%;object-fit:cover;display:block}'
      +'.pq-quick,.b2b-quick{box-sizing:border-box}.pq-quick{padding:8px 18px 8px 8px}'
      +'.pq-quick svg{width:16px;height:16px;fill:none;stroke:#fff;stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}'
      +'.pq-quick b{display:block;font-size:13px;font-weight:700;letter-spacing:.02em;line-height:1.2}'
      +'.pq-quick small{display:block;font-size:10.5px;color:rgba(255,255,255,.62);letter-spacing:.01em;margin-top:2px;line-height:1.2}'
      +'@media(max-width:760px){.pq-quick{display:none!important}}';
    document.head.appendChild(st);
    var b=document.createElement('button'); b.type='button'; b.className='pq-quick'; b.setAttribute('data-palate',''); b.setAttribute('aria-label','커피 취향 찾기');
    b.innerHTML='<i><img src="images/design/cup-coffee-mini.jpg" alt=""></i><span><b>커피 취향 찾기</b></span>';
    document.body.appendChild(b);
    /* 사업자 구매 버튼이 없는 화면이면 그 자리로 내림 */
    var q=document.querySelector('.b2b-quick'); if(!q||getComputedStyle(q).display==='none'){ b.style.bottom='28px'; return; }
    /* 두 버튼 가로 폭 맞춤 — 넓은 쪽에 맞추고, 사업자 구매는 가운데 정렬 */
    function fit(){ if(window.innerWidth<=760) return; b.style.width=''; q.style.width=''; var w=Math.ceil(Math.max(b.getBoundingClientRect().width,q.getBoundingClientRect().width)); b.style.width=w+'px'; q.style.width=w+'px'; q.style.justifyContent='center'; }
    fit(); setTimeout(fit,400); if(document.fonts&&document.fonts.ready) document.fonts.ready.then(fit); window.addEventListener('resize',fit);
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',function(){ setTimeout(init,60); }); else setTimeout(init,60);
})();

/* ───────── 가로로 넘기는 줄(칩 · 탭 · 상품 줄) — 마우스로 끌거나 휠을 굴려도 옆으로 넘어가게. 손가락 밀기는 브라우저 기본 동작 ───────── */
(function(){
  function hx(el){
    for(var n=el; n && n!==document.body && n.nodeType===1; n=n.parentElement){
      if(n.scrollWidth>n.clientWidth+2){ var o=getComputedStyle(n).overflowX; if(o==='auto'||o==='scroll') return n; }
    }
    return null;
  }
  var st=document.createElement('style');
  st.textContent='.hs-can{cursor:grab}.hs-drag{cursor:grabbing!important;scroll-behavior:auto!important;user-select:none}.hs-drag *{pointer-events:none}';
  document.head.appendChild(st);
  document.addEventListener('mouseover',function(e){ var s=hx(e.target); if(s&&!s.classList.contains('hs-can')) s.classList.add('hs-can'); },true);
  /* 휠: 세로로 굴려도 옆으로. 끝에 닿으면 페이지가 내려가게 둠 */
  document.addEventListener('wheel',function(e){
    if(e.ctrlKey||Math.abs(e.deltaX)>Math.abs(e.deltaY)) return;
    var s=hx(e.target); if(!s) return;
    var max=s.scrollWidth-s.clientWidth, d=e.deltaY;
    if((d<0&&s.scrollLeft<=0)||(d>0&&s.scrollLeft>=max-1)) return;
    e.preventDefault(); s.scrollLeft+=d;
  },{passive:false});
  /* 마우스로 끌기 — 조금이라도 끌었으면 그 클릭은 무시(칩이 눌리지 않게) */
  var cur=null, sx=0, sl=0, moved=false;
  document.addEventListener('mousedown',function(e){ moved=false; if(e.button!==0) return; var s=hx(e.target); if(!s) return; cur=s; sx=e.clientX; sl=s.scrollLeft; moved=false; },true);
  document.addEventListener('mousemove',function(e){ if(!cur) return; var dx=e.clientX-sx; if(!moved&&Math.abs(dx)>5){ moved=true; cur.classList.add('hs-drag'); } if(moved){ cur.scrollLeft=sl-dx; e.preventDefault(); } },true);
  document.addEventListener('mouseup',function(){ if(!cur) return; var c=cur; cur=null; if(moved){ setTimeout(function(){ c.classList.remove('hs-drag'); },0); } },true);
  document.addEventListener('click',function(e){ if(moved){ e.preventDefault(); e.stopPropagation(); moved=false; } },true);
  document.addEventListener('dragstart',function(e){ if(hx(e.target)) e.preventDefault(); },true);
})();

/* ───────── 상품 카드 — 하트(관심 상품)와 장바구니를 사진 위에서 내려, 가격 줄 오른쪽에 나란히 ───────── */
(function(){
  var st=document.createElement('style');
  st.textContent='.cv-acts{display:inline-flex;gap:6px;margin-left:auto;align-self:center;flex:none}'
    +'.cv-host.cv-host .has-acts.has-acts{align-items:center!important;flex-wrap:wrap!important;row-gap:10px!important;white-space:normal!important}.cv-host .has-acts>b,.cv-host .has-acts>s{white-space:nowrap}'
    +'.cv-acts .tcc-heart,.cv2 .cv-acts .tcc-heart,a.item .cv-acts .tcc-heart{display:inline-flex!important;position:static!important;width:36px!important;height:36px!important;border:1px solid var(--hair,#E6E4DE)!important;border-radius:50%!important;background:#fff!important;box-shadow:none!important}'
    +'.cv-acts .cv-cart,.cv-acts .cv2-cart{position:static!important;width:36px!important;height:36px!important;border:1px solid var(--hair,#E6E4DE)!important;border-radius:50%!important;background:#fff;box-shadow:none!important;display:inline-flex!important;align-items:center;justify-content:center;padding:0}'
    +'.cv-acts .cv-cart.done,.cv-acts .cv2-cart.done{background:var(--ink,#111921)!important;border-color:var(--ink,#111921)!important}'
    +'.cv-acts svg{width:16px!important;height:16px!important}'
    +'.cv-acts .tcc-heart:hover,.cv-acts .cv-cart:hover,.cv-acts .cv2-cart:hover{border-color:var(--ink,#111921)!important}'
    +'.tcc-heart.on svg,.cv-acts .tcc-heart.on svg{fill:#3BC1E4!important;stroke:#3BC1E4!important}'
    +'.tcc-heart-ph{display:none!important}'
    +'@media(max-width:760px){.cv-host .cv-acts{display:none!important}'
    +'.cv-host .tcc-heart.tcc-heart-ph{display:flex!important;position:absolute!important;right:6px!important;bottom:6px!important;top:auto!important;left:auto!important;z-index:4;width:36px!important;height:36px!important;padding:0!important;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;align-items:center;justify-content:center;color:var(--ink,#111921)}'
    +'.cv-host .tcc-heart.tcc-heart-ph svg{width:22px!important;height:22px!important;stroke-width:1.5!important}'
    +'.cv-acts{gap:4px}.cv-acts .tcc-heart,.cv2 .cv-acts .tcc-heart,a.item .cv-acts .tcc-heart,.cv-acts .cv-cart,.cv-acts .cv2-cart{width:32px!important;height:32px!important}.cv-acts svg{width:15px!important;height:15px!important}}';
  document.head.appendChild(st);
  function clean(h){ return (h||'').split('#')[0].split('?')[0].split('/').pop(); }
  function run(){
    document.querySelectorAll('.cv-cart,.cv2-cart').forEach(function(cart){
      if(cart.closest('.cv-acts')) return;
      var card=cart.closest('a.item, a.pd-related-card, .ch-card'); if(!card) return;
      var price=card.querySelector('.cap-price, .ch-price'); if(!price) return;
      var link=card.matches('a')?card:card.querySelector('a.ch-img, a[href]'); var h=clean(link&&link.getAttribute('href'));
      var heart=card.querySelector('.tcc-heart');
      if(!heart && window.TCC_WISH && TCC_WISH.heart && h){ var t=document.createElement('div'); t.innerHTML=TCC_WISH.heart(h); heart=t.firstChild; }
      var acts=document.createElement('span'); acts.className='cv-acts';
      if(heart){ heart.classList.remove('tcc-heart-img'); acts.appendChild(heart); }
      acts.appendChild(cart); price.appendChild(acts); price.classList.add('has-acts'); card.classList.add('cv-host');
      var img=cart.__img||card.querySelector('.imgbox, a.ch-img'); if(img&&h&&window.TCC_WISH&&TCC_WISH.heart&&!img.querySelector('.tcc-heart-ph')){ if(getComputedStyle(img).position==='static') img.style.position='relative'; var t2=document.createElement('div'); t2.innerHTML=TCC_WISH.heart(h,'tcc-heart-ph'); img.appendChild(t2.firstChild); }
    });
  }
  function init(){ setTimeout(run,0); var tm=null; if(window.MutationObserver) new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(run,90); }).observe(document.body,{childList:true,subtree:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();

/* ───────── 모바일 상품 카드 — 사진 오른쪽 아래 장바구니. 원두는 용량 · 분쇄도를 고르는 창을 띄운 뒤 담고, 그 밖은 상세로 ───────── */
(function(){
  var BAG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>';
  var GR=[['whole','분쇄 안 함(홀빈)'],['drip','일반 분쇄(핸드드립)'],['espresso','고운 분쇄(에스프레소)'],['coldbrew','거친 분쇄(프렌치프레스)']];
  function won(n){ return n.toLocaleString('ko-KR')+'원'; }
  var st=document.createElement('style');
  st.textContent='.cart-ph{display:none}'
    +'@media(max-width:760px){.cv-host .cart-ph{display:none!important}'
    +'.cv-host .cart-ph{display:flex;position:absolute;right:6px;bottom:6px;z-index:4;width:36px;height:36px;padding:0;border:0;background:transparent;align-items:center;justify-content:center;color:var(--ink,#111921);cursor:pointer}'
    +'.cv-host .cart-ph svg{width:22px;height:22px;fill:none;stroke:currentColor;stroke-width:1.5;stroke-linejoin:round}.cv-host .cart-ph.done{color:#3BC1E4}}'
    +'.qs-bg{position:fixed;inset:0;z-index:120;background:rgba(17,25,33,.42);opacity:0;transition:opacity .2s}.qs-bg.on{opacity:1}'
    +'.qs{position:fixed;left:0;right:0;bottom:0;z-index:121;background:#fff;border-radius:16px 16px 0 0;padding:20px 20px calc(18px + env(safe-area-inset-bottom,0px));transform:translateY(100%);transition:transform .25s;font-family:inherit}.qs.on{transform:none}'
    +'.qs h4{margin:0;font-size:17px;font-weight:700;color:var(--ink,#111921)}.qs .qs-x{position:absolute;right:14px;top:14px;width:32px;height:32px;border:0;background:none;font-size:22px;line-height:1;color:var(--mist,#8A9099);cursor:pointer}'
    +'.qs label{display:block;margin:16px 0 8px;font-size:12.5px;color:var(--mist,#8A9099);font-weight:600}'
    +'.qs .qs-o{display:grid;grid-template-columns:1fr 1fr;gap:8px}.qs .qs-o button{padding:12px 8px;border:1px solid var(--hair,#E6E4DE);background:#fff;border-radius:6px;font:inherit;font-size:13px;color:var(--slate,#454C55);cursor:pointer;word-break:keep-all}'
    +'.qs .qs-o button.on{border-color:var(--ink,#111921);color:var(--ink,#111921);font-weight:700;box-shadow:inset 0 0 0 1px var(--ink,#111921)}'
    +'.qs .qs-sum{display:flex;justify-content:space-between;align-items:baseline;margin-top:18px;font-size:13px;color:var(--slate,#454C55)}.qs .qs-sum b{font-size:19px;color:var(--ink,#111921)}'
    +'.qs .qs-go{display:block;width:100%;margin-top:14px;padding:15px;border:0;border-radius:6px;background:var(--ink,#111921);color:#fff;font:inherit;font-size:15px;font-weight:600;cursor:pointer}.qs .qs-go:disabled{opacity:.35}'
    +'.qs .qs-msg{margin-top:10px;font-size:12.5px;text-align:center;color:var(--slate,#454C55)}.qs .qs-msg a{color:var(--ink,#111921);font-weight:700;text-decoration:underline}';
  document.head.appendChild(st);
  function key(h){ return (h.match(/^product-([a-z-]+)\.html$/)||[])[1]; }
  function open(name,k,href){
    var B=((window.TCC_PRICES||{}).beans||{})[k]; if(!B){ location.href=href; return; }
    var W=['200g','500g','1kg'].filter(function(w){ return B[w]!=null; }); var w=W[0], g=null;
    var bg=document.createElement('div'); bg.className='qs-bg';
    var s=document.createElement('div'); s.className='qs'; s.setAttribute('role','dialog'); s.setAttribute('aria-label',name+' 옵션 선택');
    s.innerHTML='<button type="button" class="qs-x" aria-label="닫기">×</button><h4>'+name+'</h4>'
      +'<label>용량</label><div class="qs-o" data-k="w">'+W.map(function(x,i){ return '<button type="button" data-v="'+x+'"'+(i?'':' class="on"')+'>'+x+' · '+won(B[x])+'</button>'; }).join('')+'</div>'
      +'<label>분쇄도</label><div class="qs-o" data-k="g">'+GR.map(function(x){ return '<button type="button" data-v="'+x[0]+'">'+x[1]+'</button>'; }).join('')+'</div>'
      +'<div class="qs-sum"><span>합계</span><b>'+won(B[w])+'</b></div><button type="button" class="qs-go" disabled>분쇄도를 선택해 주세요</button><div class="qs-msg"></div>';
    document.body.appendChild(bg); document.body.appendChild(s);
    requestAnimationFrame(function(){ bg.classList.add('on'); s.classList.add('on'); });
    function close(){ bg.classList.remove('on'); s.classList.remove('on'); setTimeout(function(){ bg.remove(); s.remove(); },260); }
    bg.addEventListener('click',close); s.querySelector('.qs-x').addEventListener('click',close);
    var go=s.querySelector('.qs-go'), sum=s.querySelector('.qs-sum b');
    s.addEventListener('click',function(e){ var b=e.target.closest('.qs-o button'); if(!b) return; var grp=b.parentNode;
      grp.querySelectorAll('button').forEach(function(x){ x.classList.toggle('on',x===b); });
      if(grp.dataset.k==='w'){ w=b.dataset.v; sum.textContent=won(B[w]); } else { g=b.dataset.v; }
      go.disabled=!g; go.textContent=g?'장바구니 담기':'분쇄도를 선택해 주세요'; });
    go.addEventListener('click',function(){ if(!g||!window.TCC||!TCC.add) return;
      var gt=GR.filter(function(x){ return x[0]===g; })[0][1];
      TCC.add({ name:name, opt:w+' · '+gt, qty:1, price:B[w] }); TCC.badge&&TCC.badge();
      s.querySelector('.qs-msg').innerHTML='장바구니에 담았습니다. <a href="cart.html">장바구니 보기</a>';
      go.disabled=true; go.textContent='담았습니다'; setTimeout(close,1600); });
  }
  function run(){
    document.querySelectorAll('.cv-host').forEach(function(card){
      var ph=card.querySelector('.tcc-heart-ph'); if(!ph||card.querySelector('.cart-ph')) return;
      var link=card.matches('a')?card:card.querySelector('a.ch-img, a[href]'); var href=((link&&link.getAttribute('href'))||'').split('#')[0].split('?')[0].split('/').pop();
      var nm=card.querySelector('h4, .ch-name, .pd-related-body>b'); var name=nm?nm.textContent.trim():'';
      var b=document.createElement('button'); b.type='button'; b.className='cart-ph'; b.setAttribute('aria-label',name+' 장바구니 담기'); b.innerHTML=BAG;
      ph.parentNode.insertBefore(b,ph);
      b.addEventListener('click',function(e){ e.preventDefault(); e.stopPropagation(); open(name,key(href),href); });
    });
  }
  function init(){ setTimeout(run,120); var tm=null; if(window.MutationObserver) new MutationObserver(function(){ clearTimeout(tm); tm=setTimeout(run,150); }).observe(document.body,{childList:true,subtree:true}); }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();
