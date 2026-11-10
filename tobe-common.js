/* TO-BE 공통 · ① 글꼴을 Pretendard(산세리프)로 통일 ② 모바일 하단 바 삭제 ③ 장바구니 아이콘의 개수 배지 삭제 ④ 최근 본 상품 플로팅 삭제 ⑤ 할인율 · 취소선 정가 삭제 ⑥ 커피 취향 찾기 플로팅 삭제 ⑦ 채널톡 플로팅(모바일·PC) ⑧ 왼쪽 세로선(plumb) 삭제 ⑨ 알림 아이콘 · 하트 삭제 ⑩ 네이버페이 구매 버튼 */
(function () {
  var f = document.createElement('style');
  f.textContent = "@font-face{font-family:'Pretendard Variable';src:url(fonts/PretendardVariable.woff2) format('woff2-variations');font-weight:45 920;font-style:normal;font-display:swap}"
    + ":root{--serif:'Pretendard Variable',Pretendard,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif;--sans:var(--serif);--latin:var(--serif)}"
    + "html,body,body *,body *::before,body *::after{font-family:'Pretendard Variable',Pretendard,-apple-system,'Apple SD Gothic Neo','Malgun Gothic',sans-serif!important}";
  document.head.appendChild(f);
})();
(function () {
  /* 모바일 하단 바 삭제 + 장바구니 개수 배지(파란 점) 삭제 — 하단 바는 catalog.js가 만들므로 만들어지는 즉시 제거 */
  var st = document.createElement('style');
  st.textContent = '.m-tab{display:none!important}body.has-tab{padding-bottom:0!important}.cart-badge{display:none!important}.rv-fab,.rv-sheet,.rv-bg{display:none!important}.pq-quick{display:none!important}.plumb{display:none!important}'
    /* 알림 아이콘 · 관심 상품(하트) 삭제 — 웹은 앱처럼 알림이 쌓이지 않고, 구매가 바로 목적이라 찜이 필요 없음(회의 11/06) */
    + '.nt-bell,#nav a[aria-label="알림"],.tcc-heart,.tcc-heart-ph,.pd-wish,.mb-wish{display:none!important}'
    /* 페이지 자체 스타일(.cv-host .tcc-heart.tcc-heart-ph 등)이 우선순위로 하트를 다시 보이게 해서, 선택자를 겹쳐 확실히 숨김 */
    + '.tcc-heart.tcc-heart.tcc-heart.tcc-heart,.tcc-heart-ph.tcc-heart-ph.tcc-heart-ph.tcc-heart-ph{display:none!important}'
    /* 할인율 숫자 · 취소선 정가 삭제 — 판매가만 보여줌 */
    + '.pd-price-was,.pd-price-off,#dsWas,.cap-price s,.cap-price em,.ch-price s,.ch-price em,.tbc-price s,.b-price s,.b-price em,.mp-wish-card s,.mp-wish-card em{display:none!important}';
  document.head.appendChild(st);
  function off() {
    var b = document.querySelector('.m-tab'); if (b) b.remove();
    document.querySelectorAll('.rv-fab,.rv-sheet,.rv-bg').forEach(function (e) { e.remove(); });
    if (document.body && document.body.classList.contains('has-tab')) document.body.classList.remove('has-tab');
  }
  off(); document.addEventListener('DOMContentLoaded', off);
  new MutationObserver(off).observe(document.documentElement, { childList: true, subtree: true });
})();
(function () {
  if (/^tobe-business-/.test(location.pathname.split('/').pop())) return;
  var HOME = /^tobe-home\.html$/.test(location.pathname.split('/').pop());
  var st = document.createElement('style');
  st.textContent = '.nf-back{display:none!important}'
    /* 헤더 통일: 로고 · 검색 아이콘 · 장바구니 · 메뉴 (홈은 검색창이 바로 아래라 검색 아이콘 없음) */
    + '@media(max-width:900px){'
    + '#nav .gnb-right .m-search,#nav .gnb-right .nt-bell,#nav .gnb-right a[aria-label="알림"],#nav .gnb-right a[aria-label="마이페이지"],body #nav .gnb-right a.icon-btn[aria-label="내 계정"],body #nav .gnb-right a.icon-btn[aria-label="로그인"]{display:none!important}'
    + 'body.tb-hd.tb-hd.tb-hd #nav .gnb-right a.icon-btn[aria-label="장바구니"]{display:flex!important}'
    + 'body.tb-hd.tb-hd.tb-hd #nav .gnb-right a.icon-btn[aria-label="검색"]{display:flex!important}'
    + 'body.tb-hd.tb-hd.tb-hd #nav .gnb-right{gap:18px!important;flex:0 0 auto!important;margin-left:auto!important}'
    + '}';
  document.head.appendChild(st);
  function body() { if (document.body) document.body.classList.add('tb-hd'); }
  body(); document.addEventListener('DOMContentLoaded', body);
})();

/* ---- 햄버거 메뉴: 왼쪽 큰 묶음 + 오른쪽 세부 (index.html '햄버거 메뉴' 화면과 같은 구성) ---- */
(function () {
  var file = location.pathname.split('/').pop();
  if (/^tobe-business-/.test(file)) return;
  var PAGE = (file.match(/^(?:asis|tobe)-([a-z0-9-]+)\.html$/) || [])[1];
  var IC = {
    bean: '<svg viewBox="0 0 24 24"><ellipse cx="12" cy="12" rx="5.4" ry="8.2" transform="rotate(35 12 12)"/><path d="M8.2 16.6c3-1 3.6-3.4 2.4-5.2-1.2-1.8-.8-3.4 1.6-5.2"/></svg>',
    drip: '<svg viewBox="0 0 24 24"><path d="M6 6h12v3.5l-1.6 2V19a1.6 1.6 0 0 1-1.6 1.6H9.2A1.6 1.6 0 0 1 7.6 19v-7.5L6 9.5z"/><path d="M9.5 6V3.5M14.5 6V3.5"/></svg>',
    gift: '<svg viewBox="0 0 24 24"><rect x="4" y="10" width="16" height="10" rx="1"/><path d="M3 7h18v3H3zM12 7v13M12 7c-1.2-3.2-5-3.2-5 0 0 1.4 2.4 1.6 5 0 2.6 1.6 5 1.4 5 0 0-3.2-3.8-3.2-5 0z"/></svg>',
    cup: '<svg viewBox="0 0 24 24"><path d="M5 9h11v5.5a4.5 4.5 0 0 1-4.5 4.5h-2A4.5 4.5 0 0 1 5 14.5z"/><path d="M16 10.5h1.4a2.6 2.6 0 0 1 0 5.2H15.6M8 3.8v2.4M11.5 3.8v2.4"/></svg>',
    sub: '<svg viewBox="0 0 24 24"><path d="M7 4h10l1.5 4v11a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V8z"/><path d="M5.5 8h13"/><path d="M14.6 15.2a2.7 2.7 0 1 1-.8-2"/></svg>',
    tag: '<svg viewBox="0 0 24 24"><path d="M4 4h8l8 8-8 8-8-8z"/><circle cx="8.5" cy="8.5" r="1.2"/></svg>',
    book: '<svg viewBox="0 0 24 24"><path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/></svg>',
    club: '<svg viewBox="0 0 24 24"><path d="M5 9l3 3 4-6 4 6 3-3-1.5 9h-11z"/></svg>',
    biz: '<svg viewBox="0 0 24 24"><path d="M3 21V8l9-5 9 5v13M9 21v-6h6v6"/></svg>'
  };
  function H(k, label, href) { return '<a class="tbm-h" href="' + href + '"><i>' + IC[k] + '</i><b>' + label + '</b><u>›</u></a>'; }
  function I(label, href) { return '<a class="tbm-i" href="' + href + '">' + label + '</a>'; }
  var FIND = '<a class="tbm-find" href="guide.html#choosing" id="tbmFind"><span>어떤 원두가 맞을지 모르겠다면</span><b>커피 취향 찾기 ›</b></a>';
  var RAIL = [['shop', '제품 구매'], ['sub', '정기구독'], ['event', '이벤트'], ['story', '브랜드 스토리'], ['b2b', '사업자 구매'], ['club', '리저브 클럽']];
  var DIV = '<div class="tbm-div"></div>';
  var PANE = {
    shop: FIND + H('bean', '원두', 'collection.html#beans') + I('전체', 'collection.html#beans') + I('싱글 오리진', 'collection.html#beans-origin') + I('블렌드', 'collection.html#beans-blend') + I('디카페인', 'collection.html#beans-decaf')
      + DIV + H('drip', '드립백/스틱', 'collection.html#dripbag') + I('드립백', 'collection.html#dripbag-db') + I('스틱', 'collection.html#dripbag-stick')
      + DIV + H('gift', '선물세트', 'collection.html#giftset') + I('원두 세트', 'collection.html#giftset-bean') + I('드립백 세트', 'collection.html#giftset-drip')
      + DIV + H('cup', '커피용품', 'collection.html#goods'),
    sub: H('sub', '정기구독', 'subscribe.html') + I('전체', 'subscribe.html') + I('싱글 오리진', 'subscribe.html') + I('블렌드', 'subscribe.html') + I('디카페인', 'subscribe.html') + I('드립백/스틱', 'subscribe.html'),
    event: H('tag', '이벤트', 'events.html') + I('진행 중인 행사', 'events.html') + I('지난 행사', 'events.html'),
    story: H('book', '더클린 스토리', 'story.html') + I('로스터의 노트', 'archive.html')
      + DIV + H('bean', '더클린 기준', 'standard.html') + I('결점두와 핸드픽', 'standard.html#handpick') + I('곰팡이독소 검사', 'standard.html#labtest') + I('로스팅 기준', 'standard.html#roasting')
      + DIV + H('book', '커피 가이드', 'guide.html') + I('원두 고르는 법', 'guide.html#choosing') + I('추출 가이드', 'guide.html#brewing') + I('보관 · 신선도', 'guide.html#storage') + '<a class="tbm-i" href="guide.html#choosing" id="tbmFind2">커피 취향 찾기</a>',
    b2b: H('biz', '사업자 구매', 'business-login.html') + I('사업자 로그인', 'business-login.html') + I('사업자 등록 신청', 'business-signup.html') + I('테이스팅 샘플 신청', 'business-sample.html'),
    club: H('club', '리저브 클럽', 'reserve-club.html') + I('등급과 혜택', 'reserve-club.html') + I('초대장 보기', 'reserve-club.html')
  };
  var css = document.createElement('style');
  css.textContent = '.mnav{display:none!important}'
    + '#tbMenu{position:fixed;inset:0;z-index:130;background:#fff;display:none;flex-direction:column;color:#111921}'
    + '#tbMenu.open{display:flex}'
    + '.tbm-top{display:flex;justify-content:space-between;align-items:center;height:56px;padding:0 20px;flex:none}'
    + '.tbm-top b{font-size:15px;letter-spacing:.06em}'
    + '.tbm-x{background:none;border:0;font-size:28px;line-height:1;color:#111921;cursor:pointer;padding:4px}'
    + '.tbm-acc{margin:0 16px 10px;padding:12px 14px;border:1px solid #E6E4DE;display:flex;justify-content:space-between;align-items:center;gap:10px;flex:none}'
    + '.tbm-acc p{margin:0;font-size:14.5px;font-weight:700}.tbm-acc p span{display:block;margin-top:2px;font-size:12px;font-weight:400;color:#454C55}'
    + '.tbm-acc .b{display:flex;gap:6px;flex:none}.tbm-acc .b a{padding:8px 12px;border:1px solid #E6E4DE;font-size:13.5px;color:#111921;text-decoration:none}'
    + '.tbm-acc .b a:first-child{background:#111921;color:#fff;border-color:#111921}'
    + '.tbm-body{flex:1;display:flex;min-height:0;border-top:1px solid #E6E4DE}'
    + '.tbm-rail{flex:0 0 112px;background:#EFEEEB;padding:8px 0;overflow-y:auto}'
    + '.tbm-rail span{display:block;margin:0 6px 2px;padding:0 8px 0 12px;height:48px;line-height:48px;border-radius:12px;font-size:14.5px;letter-spacing:-.02em;white-space:nowrap;cursor:pointer}'
    + '.tbm-rail span.on{background:#fff;font-weight:700}'
    + '.tbm-rail span.club{margin-top:10px;background:#111921;color:#fff;text-align:center;padding:0;font-size:14px}'
    + '.tbm-rail span.club.on{background:#5CC0E1;color:#111921}'
    + '.tbm-pane{flex:1;min-width:0;padding:6px 16px 24px 18px;overflow-y:auto;background:#fff}'
    + '.tbm-p{display:none}.tbm-p.on{display:block}'
    + '.tbm-h{display:flex;align-items:center;gap:10px;height:56px;text-decoration:none;color:#111921}'
    + '.tbm-h i{width:32px;height:32px;border-radius:50%;background:#F0EDE6;display:flex;align-items:center;justify-content:center;flex:none}'
    + '.tbm-h i svg{width:18px;height:18px;fill:none;stroke:#111921;stroke-width:1.6;stroke-linecap:round;stroke-linejoin:round}'
    + '.tbm-h b{flex:1;font-size:16px;font-weight:700;line-height:1.25}.tbm-h u{text-decoration:none;font-size:22px}'
    + '.tbm-i{display:block;height:44px;line-height:44px;padding-left:42px;font-size:15px;color:#454C55;text-decoration:none}'
    + '.tbm-div{height:1px;background:#E6E4DE;margin:10px 0}'
    + '.tbm-find{display:flex;flex-direction:column;gap:3px;margin-top:16px;padding:14px;background:#F0EDE6;border-radius:6px;text-decoration:none;font-size:12.5px;color:#454C55}'
    + '.tbm-find b{font-size:14px;color:#111921}'
    + '.tbm-foot{flex:none;display:flex;justify-content:space-between;align-items:center;gap:8px;padding:12px 16px calc(12px + env(safe-area-inset-bottom,0px));border-top:1px solid #E6E4DE;background:#fff}'
    + '.tbm-foot .l{display:flex;flex-direction:column;gap:6px;font-size:13px}.tbm-foot .l a{color:#454C55;text-decoration:underline;text-underline-offset:3px}'
    + '.tbm-foot .bz{padding:9px 14px;background:#F0EDE6;border-radius:4px;color:#111921;font-size:13.5px;font-weight:700;text-decoration:none}';
  document.head.appendChild(css);

  var root;
  function build() {
    if (root) return root;
    var m = null; try { m = JSON.parse(localStorage.getItem('tcc_member') || 'null'); } catch (e) {}
    var acc = m
      ? '<div class="tbm-acc"><p>' + (m.name || '회원') + ' 님<span>오늘도 좋은 한 잔 되세요.</span></p><div class="b"><a href="mypage.html">마이페이지</a></div></div>'
      : '<div class="tbm-acc"><p>로그인해 주세요<span>가입하면 웰컴 쿠폰 5종을 드립니다.</span></p><div class="b"><a href="login.html">로그인</a><a href="signup.html">회원가입</a></div></div>';
    root = document.createElement('div'); root.id = 'tbMenu'; root.setAttribute('role', 'dialog'); root.setAttribute('aria-label', '메뉴');
    root.innerHTML = '<div class="tbm-top"><b>MENU</b><button type="button" class="tbm-x" aria-label="메뉴 닫기">×</button></div>' + acc
      + '<div class="tbm-body"><div class="tbm-rail">' + RAIL.map(function (r) { return '<span data-k="' + r[0] + '" class="' + (r[0] === 'shop' ? 'on ' : '') + (r[0] === 'club' ? 'club' : '') + '">' + r[1] + '</span>'; }).join('') + '</div>'
      + '<div class="tbm-pane">' + RAIL.map(function (r) { return '<div class="tbm-p' + (r[0] === 'shop' ? ' on' : '') + '" data-k="' + r[0] + '">' + PANE[r[0]] + '</div>'; }).join('') + '</div></div>'

    document.body.appendChild(root);
    root.querySelector('.tbm-x').addEventListener('click', function () {
      root.classList.remove('open');
      /* AS-IS 쪽 메뉴도 같이 닫기 */
      try { window.parent.postMessage({ src: 'ux', type: 'click', variant: 'tobe', page: PAGE, sel: '.mnav-close' }, '*'); } catch (e) {}
    });
    root.querySelector('.tbm-rail').addEventListener('click', function (e) {
      var r = e.target.closest('span[data-k]'); if (!r) return;
      [].forEach.call(root.querySelectorAll('.tbm-rail span'), function (c) { c.classList.toggle('on', c === r); });
      [].forEach.call(root.querySelectorAll('.tbm-p'), function (p) { p.classList.toggle('on', p.dataset.k === r.dataset.k); });
    });
    root.addEventListener('click', function (e) {
      var f = e.target.closest('#tbmFind, #tbmFind2'); var o = document.getElementById('palateOpen');
      if (f && o) { e.preventDefault(); e.stopPropagation(); root.classList.remove('open'); o.click(); }
    }, true);
    return root;
  }
  window.addEventListener('click', function (e) {
    var b = e.target && e.target.closest && e.target.closest('.gnb-burger');
    if (!b) return;
    build().classList.add('open');
  }, true);
})();

/* ---- 채널톡 버튼 (오른쪽 아래 떠 있는 상담 버튼 · 프로토타입 표시용) ---- */
(function () {
  var css = document.createElement('style');
  css.textContent = '#tbChat{position:fixed;right:16px;bottom:16px;z-index:89;width:56px;height:56px;border:0;border-radius:50%;background:#111921;box-shadow:0 8px 22px rgba(17,25,33,.28);display:flex;align-items:center;justify-content:center;cursor:pointer;padding:0;transition:bottom .25s ease}'
    + '#tbChat svg{width:26px;height:26px;fill:none;stroke:#fff;stroke-width:1.7;stroke-linecap:round;stroke-linejoin:round}'
    + '#tbChat .d{position:absolute;top:2px;right:2px;width:12px;height:12px;border-radius:50%;background:#5CC0E1;border:2px solid #fff;box-sizing:border-box}'
    + '#tbChatBox{position:fixed;right:16px;z-index:89;width:min(300px,calc(100vw - 32px));background:#fff;border:1px solid #E6E4DE;border-radius:14px;box-shadow:0 14px 36px rgba(17,25,33,.22);display:none;overflow:hidden}'
    + '#tbChatBox.open{display:block}'
    + '#tbChatBox .h{display:flex;justify-content:space-between;align-items:center;padding:14px 16px;background:#111921;color:#fff;font-size:15px;font-weight:700}'
    + '#tbChatBox .h button{background:none;border:0;color:#fff;font-size:22px;line-height:1;cursor:pointer;padding:0 2px}'
    + '#tbChatBox .b{padding:16px;font-size:13.5px;line-height:1.7;color:#454C55}'
    + '#tbChatBox .b b{color:#111921;display:block;margin-bottom:4px;font-size:14.5px}'
    + '#tbChatBox .n{display:block;margin:0 16px 16px;padding:11px 0;border:1px solid #E6E4DE;border-radius:8px;text-align:center;font-size:13px;color:#111921;text-decoration:none}'
    + '@media(min-width:901px){#tbChat{width:60px;height:60px}#tbChat svg{width:28px;height:28px}#tbChatBox{width:340px}.b2b-quick{bottom:100px!important}}';
  document.head.appendChild(css);
  var btn, box;
  function build() {
    if (btn || !document.body) return;
    btn = document.createElement('button'); btn.id = 'tbChat'; btn.type = 'button'; btn.setAttribute('aria-label', '채널톡 상담');
    btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-7l-4.5 3.5V17H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2z"/><path d="M8.5 10.5h.01M12 10.5h.01M15.5 10.5h.01"/></svg><i class="d"></i>';
    box = document.createElement('div'); box.id = 'tbChatBox'; box.setAttribute('role', 'dialog'); box.setAttribute('aria-label', '채널톡');
    box.innerHTML = '<div class="h"><span>채널톡</span><button type="button" aria-label="닫기">×</button></div><div class="b"><b>무엇을 도와드릴까요?</b>여기에 채널톡 상담 창이 열립니다. (프로토타입 표시 — 실제 연동은 채널톡 플러그인으로 연결)</div><a class="n" href="support.html#contact">1:1 문의 남기기</a>';
    document.body.appendChild(box); document.body.appendChild(btn);
    btn.addEventListener('click', function () { box.classList.toggle('open'); place(); });
    box.querySelector('.h button').addEventListener('click', function () { box.classList.remove('open'); });
  }
  /* 화면 아래에 붙어 있는 바(하단 탭 · 구매 바 · 주문 바 등)를 피해 위로 올림 */
  function place() {
    if (!btn) return;
    var H = window.innerHeight, W = window.innerWidth, lift = 0;
    [].forEach.call(document.body.children, function (e) {
      if (e === btn || e === box) return;
      var cs = getComputedStyle(e);
      if (cs.position !== 'fixed' || cs.display === 'none' || cs.visibility === 'hidden') return;
      var r = e.getBoundingClientRect();
      if (r.width < W * .85 || r.height > 200 || r.height < 30 || r.bottom < H - 100 || r.top >= H - 1) return;
      lift = Math.max(lift, H - r.top);
    });
    var fab = document.querySelector('.rv-fab'); if (fab && getComputedStyle(fab).display !== 'none') { var fr = fab.getBoundingClientRect(); if (fr.top < H) lift = Math.max(lift, H - fr.top + 10); }
    var base = W > 900 ? 28 : 16, sz = W > 900 ? 60 : 56;
    btn.style.right = base + 'px'; box.style.right = base + 'px';
    btn.style.bottom = (lift + base) + 'px';
    box.style.bottom = (lift + base + sz + 10) + 'px';
    /* 맨 위로 버튼은 채널톡 버튼 바로 위에 쌓음 (같은 세로줄로 정렬) — 상담 창이 열려 있으면 잠시 숨김 */
    var up = document.querySelector('.nf-top');
    if (up) {
      up.style.right = (base + 5) + 'px';
      up.style.bottom = (lift + base + sz + 12) + 'px';
      up.style.visibility = box.classList.contains('open') ? 'hidden' : '';
    }
  }
  function init() { build(); place(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  setInterval(place, 400);
  window.addEventListener('scroll', place, { passive: true }); window.addEventListener('resize', place);
})();

/* ---- 상품 상세: 현재 구간 표시를 키컬러(푸른색)로 (기존은 빨간색) ---- */
(function () {
  var css = document.createElement('style');
  css.textContent = 'body .pd-toc-wrap .gd-toc a.on{color:#1E7494!important;font-weight:700!important;border-color:#5CC0E1!important}'
    + '@media(max-width:760px){body .pd-tb .pd-tb-nav a.on{color:#1E7494!important;font-weight:700}}';
  document.head.appendChild(css);
})();

/* ---- 네이버페이: 구매 버튼이 있는 모든 곳(상세 · 하단 구매 바 · 장바구니)에 달고, 결제에서 미리 골라 둠 ----
   네이버페이는 로그인 없이 빠르게 결제하지만 정기결제는 안 되어서, 정기배송 신청에는 달지 않음 */
(function () {
  var file = location.pathname.split('/').pop();
  if (/^tobe-business-/.test(file)) return;
  /* 이번 리뉴얼에서는 네이버페이 제외(기능 플래그 catalog.js TB_FLAGS.npay) — 코드는 그대로 두고 화면에서만 숨김. ?npay=on 이면 복원 */
  var F1 = window.TB_FLAGS = window.TB_FLAGS || { gift: false, npay: false };
  if (window.TB_NPAY_ON === undefined) window.TB_NPAY_ON = !(F1.npay === false) || /[?&]npay=on\b/.test(location.search);
  if (!window.TB_NPAY_ON) {
    var hs = document.createElement('style'); hs.id = 'tb-npay-off-css';
    hs.textContent = '.tb-npay,.ck-pay label:has(input[value="네이버페이"]){display:none!important}';
    (document.head || document.documentElement).appendChild(hs);
    var hideRadio = function () { [].forEach.call(document.querySelectorAll('input[name="ckPay"][value="네이버페이"]'), function (r) { var l = r.closest('label'); if (l) l.style.display = 'none'; if (r.checked) { var c = document.querySelector('input[name="ckPay"][value="신용카드"]'); if (c) c.checked = true; } }); };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', hideRadio); else hideRadio();
    return;
  }
  var st = document.createElement('style');
  st.textContent = '.tb-npay{display:inline-flex;align-items:center;justify-content:center;gap:8px;border:0;border-radius:0;background:#03C75A;color:#fff;font:inherit;font-weight:700;letter-spacing:0;cursor:pointer;text-decoration:none;white-space:nowrap}'
    + '.tb-npay:hover{background:#02b050}'
    + '.tb-npay i{font-style:normal;width:20px;height:20px;border-radius:4px;background:#fff;color:#03C75A;font-size:13px;font-weight:800;line-height:1;display:flex;align-items:center;justify-content:center}'
    + '.tb-npay-pd,.tb-npay-ct{display:flex;width:100%;height:54px;margin-top:10px;font-size:16px}'
    + '@media(max-width:900px){.tb-npay-pd{display:none!important}}'
    + '.tb-pcbar .tb-npay-bar{padding:14px 22px;font-size:15px}'
    + '@media(max-width:760px){.m-buybar .tb-npay{flex:0 0 40%;font-size:15px}.tb-orderbar.on{display:flex!important;gap:8px}.tb-orderbar .tb-npay{flex:0 0 40%;height:54px;font-size:15px}.tb-orderbar a:not(.tb-npay){flex:1}}';
  document.head.appendChild(st);
  function mk(tag, cls, label, fn) {
    var e = document.createElement(tag); if (tag === 'button') e.type = 'button';
    e.className = 'tb-npay ' + cls; e.innerHTML = '<i aria-hidden="true">N</i><span>' + label + '</span>';
    e.addEventListener('click', function (ev) {
      ev.preventDefault(); window.__npayGo = true;
      try { sessionStorage.setItem('tcc_pay', 'naver'); } catch (x) {}
      try { fn(); } finally { window.__npayGo = false; }
    });
    return e;
  }
  function inject() {
    if (!document.body) return;
    var btns = document.querySelector('.pd-buy-btns');
    if (btns && !btns.parentNode.querySelector('.tb-npay-pd')) {
      var buy = btns.querySelector('.btn-ink') || btns.querySelector('a,button');
      if (buy) btns.insertAdjacentElement('afterend', mk('button', 'tb-npay-pd', '네이버페이로 구매', function () { buy.click(); }));
    }
    var mb = document.querySelector('.m-buybar');
    if (mb && !mb.querySelector('.tb-npay')) { var b = mb.querySelector('.mb-buy'); if (b) mb.insertBefore(mk('button', 'tb-npay-mb', '네이버페이', function () { b.click(); }), b); }
    var pb = document.querySelector('.tb-pcbar .in');
    if (pb && !pb.querySelector('.tb-npay')) { var bb = pb.querySelector('button.b'); if (bb) pb.insertBefore(mk('button', 'tb-npay-bar', '네이버페이', function () { bb.click(); }), bb); }
    var o = document.getElementById('ctOrder');
    if (o && !document.querySelector('.tb-npay-ct')) o.insertAdjacentElement('afterend', mk('a', 'tb-npay-ct', '네이버페이로 주문', function () { o.click(); }));
    var ob = document.querySelector('.tb-orderbar');
    if (ob && o && !ob.querySelector('.tb-npay')) ob.insertBefore(mk('a', 'tb-npay-ob', '네이버페이', function () { o.click(); }), ob.firstChild);
  }
  /* 일반 구매 버튼을 누르면 네이버페이 표시를 지움(표시가 남아 다음 결제에 따라오지 않게) */
  document.addEventListener('click', function (e) {
    if (window.__npayGo) return;
    if (e.target.closest && e.target.closest('#pdBuy,.mb-buy,#ctOrder,.tb-orderbar a,.pd-buy-btns .btn-ink,.tb-pcbar button.b')) { try { sessionStorage.removeItem('tcc_pay'); } catch (x) {} }
  }, true);
  /* 결제 화면: 네이버페이로 들어왔으면 결제 수단을 미리 선택 */
  if (/checkout\.html$/.test(file)) {
    var want = false; try { want = sessionStorage.getItem('tcc_pay') === 'naver'; } catch (x) {}
    if (want) {
      /* 페이지가 로드 뒤 기본 선택(신용카드)을 다시 잡을 수 있어, 네이버페이가 선택될 때까지 잠깐 재시도 */
      var tries = 0, tm = setInterval(function () {
        var r = document.querySelector('input[name="ckPay"][value="네이버페이"]');
        if (r && !r.checked) r.click();
        if ((r && r.checked && tries > 3) || ++tries > 30) { clearInterval(tm); try { sessionStorage.removeItem('tcc_pay'); } catch (x) {} }
      }, 150);
    }
  }
  inject(); new MutationObserver(inject).observe(document.documentElement, { childList: true, subtree: true });
  var n = 0, t = setInterval(function () { inject(); if (++n > 60) clearInterval(t); }, 200);
})();

/* 40대+ 기준 — 글자 13px 미만 올리기 · 터치 영역 44px 확보 (푸터·이미지 자리표시 제외) */
(function () {
  var css = document.createElement('style');
  css.id = 'tb-floor-css';
  css.textContent =
    '.icon-btn{width:44px!important;height:44px!important;min-width:44px!important;flex:0 0 44px!important}'
    + '.ct-qty button{width:44px!important;height:44px!important}.ct-qty b{width:44px!important}'
    + '.cf-chip,.ct-remove,.rv-report,button[data-d]{min-height:44px!important}button[data-d]{min-width:44px!important}.cv2-cart{min-width:44px!important;min-height:44px!important}.bp-back{display:inline-flex;align-items:center;min-height:44px}'
    + '.gnb-burger{box-sizing:content-box!important;padding:10px 11px!important}'
    + '.brand{min-height:44px}'
    + '.rv-report,.rv-more{padding:12px 8px!important;margin-top:0!important}'
    + '.sh-x{width:44px!important;height:44px!important}'
    + '.ct-remove{min-width:44px;min-height:44px}'
    + 'input:not([type=checkbox]):not([type=radio]):not([type=hidden]):not([type=range]):not([type=file]),select{min-height:44px}';
  document.head.appendChild(css);
  var SKIP = 'footer,.foot-legal,.foot-biz,.uxpin,#tbChat,.ph,svg';
  function floor() {
    var all = document.body ? document.body.getElementsByTagName('*') : [];
    for (var i = 0; i < all.length; i++) {
      var e = all[i];
      if (/^(SCRIPT|STYLE|OPTION|SVG|PATH)$/i.test(e.tagName) || e.getAttribute('data-fl')) continue;
      var own = false;
      for (var j = 0; j < e.childNodes.length; j++) { var n = e.childNodes[j]; if (n.nodeType === 3 && n.textContent.trim()) { own = true; break; } }
      if (!own) continue;
      var f = parseFloat(getComputedStyle(e).fontSize);
      if (f && f < 13) {
        if (e.closest && e.closest(SKIP)) continue;
        e.style.setProperty('font-size', '13px', 'important');
        e.setAttribute('data-fl', '1');
      }
    }
  }
  var t;
  function later() { clearTimeout(t); t = setTimeout(floor, 150); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', floor); else floor();
  window.addEventListener('load', function () { floor(); setTimeout(floor, 800); });
  try { new MutationObserver(later).observe(document.documentElement, { childList: true, subtree: true }); } catch (x) {}
})();

/* 정기배송 신청 화면(?sub=1): 구매 바의 구매하기를 '정기배송 신청하기'로 바꾸고, 장바구니 · 네이버페이는 숨김 (정기배송은 네이버페이 제외) */
(function () {
  if (!/[?&]sub=1\b/.test(location.search)) return;
  var st = document.createElement('style');
  st.textContent = '.tb-npay{display:none!important}.tb-pcbar .c{display:none!important}.m-buybar .mb-buy{flex:1 1 100%}';
  document.head.appendChild(st);
  var n = 0, t = setInterval(function () {
    var b = document.querySelector('.tb-pcbar button.b');
    if (b && !b.dataset.sub) {
      b.dataset.sub = '1'; b.textContent = '정기배송 신청하기';
      b.addEventListener('click', function (e) { var a = document.getElementById('subApply'); if (a) { e.stopImmediatePropagation(); e.preventDefault(); a.click(); } }, true);
    }
    if ((b && b.dataset.sub) || ++n > 60) clearInterval(t);
  }, 250);
})();

/* ── 선물하기: 이번 리뉴얼 범위에서 제외 (기능 플래그 — catalog.js 의 TB_FLAGS.gift) ──
   화면에서만 숨기고 코드는 그대로 둡니다. true 로 바꾸거나 주소 끝에 ?gift=on 을 붙이면 되살아납니다. */
(function () {
  var F0 = window.TB_FLAGS = window.TB_FLAGS || { gift: false };
  if (window.TB_GIFT_ON === undefined) window.TB_GIFT_ON = !(F0.gift === false) || /[?&]gift=on\b/.test(location.search);
  if (window.TB_GIFT_ON) return;
  var file = location.pathname.split('/').pop().replace(/^(asis|tobe)-/, '').split('?')[0];
  var st = document.createElement('style'); st.id = 'tb-gift-off-css';
  st.textContent = '#giftBtn,.btn-gift,.mb-gift,.tb-set-gifthint,.ms-foot .g,.mp-chip[href="#gifts"],#gifts,#mpGifts,#mpGiftNote,.nt-chips button[data-c="gift"]{display:none!important}'
    + '#tbGiftOff{max-width:640px;margin:0 auto;padding:clamp(110px,16vw,150px) 20px 80px}'
    + '#tbGiftOff .tb-off-card{padding:34px 28px;border:1px solid var(--hair,#E6E4DE);background:#fff;text-align:center}'
    + '#tbGiftOff .tb-off-tag{display:inline-block;margin-bottom:16px;padding:4px 12px;background:#111921;color:#fff;font-size:14px;font-weight:700}'
    + '#tbGiftOff h1{margin:0 0 14px;font-size:26px;line-height:1.4;color:var(--ink,#111921)}'
    + '#tbGiftOff p{margin:0 0 24px;font-size:16px;line-height:1.75;color:#454C55;word-break:keep-all}'
    + '#tbGiftOff .btn{display:block;height:56px;line-height:54px;padding:0;font-size:16px;font-weight:700;text-align:center;box-sizing:border-box;text-decoration:none}'
    + 'html.tb-gift-off body>*:not(#nav):not(footer):not(#tbGiftOff):not(#tbChat):not(.b2b-quick):not(script):not(style):not(.uxpin){display:none!important}';
  (document.head || document.documentElement).appendChild(st);
  function relink() {
    [].forEach.call(document.querySelectorAll('a[href="gift.html"]'), function (a) {
      a.setAttribute('href', 'collection.html#giftset');
      var sp = a.querySelector('span'); if (sp && /선물하기/.test(sp.textContent)) sp.textContent = '원두 · 드립백 세트';
      var b = a.querySelector('b'); if (b && /세트 · 선물/.test(b.textContent)) b.textContent = '선물세트';
    });
    var lb = document.querySelector('.nt-chips-lb'); if (lb && /8개/.test(lb.textContent)) lb.textContent = lb.textContent.replace('8개', '7개');
    var nf = document.querySelector('.nf-note'); if (nf && /선물 링크/.test(nf.textContent)) nf.style.display = 'none';
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', relink); else relink();
  /* 선물 모음 · 선물 받기 화면은 제외 안내로 대신 */
  if (file === 'gift.html' || file === 'gift-receive.html') {
    document.documentElement.classList.add('tb-gift-off');
    var put = function () {
      if (document.getElementById('tbGiftOff') || !document.body) return;
      var d = document.createElement('section'); d.id = 'tbGiftOff';
      d.innerHTML = '<div class="tb-off-card"><span class="tb-off-tag">이번 리뉴얼 범위 제외</span><h1>선물하기는 이번 오픈에서 제외됐어요</h1>'
        + '<p>11/30 오픈 범위에서는 빼고, 오픈 이후 지표를 보며 별도로 검토합니다.<br>선물용으로 팔던 FIRST NOTE · 드립백 세트 · 디스커버리 세트는 일반 세트 상품으로 그대로 구매하실 수 있어요.</p>'
        + '<a class="btn btn-ink" href="collection.html#giftset">선물세트 보러 가기</a></div>';
      var nav = document.getElementById('nav'); if (nav && nav.parentNode) nav.parentNode.insertBefore(d, nav.nextSibling); else document.body.insertBefore(d, document.body.firstChild);
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
  }
})();

/* ── 사업자 구매 입구 정리 (기능 플래그 catalog.js 의 TB_FLAGS.b2bFloat) ──
   떠 있던 「사업자 구매」 버튼을 없애고, PC 헤더 오른쪽 글자 링크와 상품 상세 안내 링크로 정식 입구를 둡니다.
   모바일은 푸터의 「사업자 구매 (B2B)」 버튼만 둡니다. true 로 바꾸거나 ?b2bfloat=on 이면 예전 플로팅이 돌아옵니다. */
(function () {
  var file = location.pathname.split('/').pop();
  if (/^(asis|tobe)-business-/.test(file)) return;
  var F = window.TB_FLAGS = window.TB_FLAGS || {};
  if (F.b2bFloat !== false || /[?&]b2bfloat=on\b/.test(location.search)) return;
  var st = document.createElement('style'); st.id = 'tb-b2b-entry-css';
  st.textContent = '.b2b-quick{display:none!important}'
    + '.tb-b2b-link,.tb-b2b-pd{display:none}'
    + '@media(min-width:901px){'
    + '.tb-b2b-link{display:inline-flex;align-items:center;height:44px;padding:0 4px;font-size:14px;font-weight:500;color:#454C55;text-decoration:none;white-space:nowrap}'
    + '.tb-b2b-link:hover,.tb-b2b-link:focus-visible{color:var(--ink,#111921);text-decoration:underline;text-underline-offset:5px}'
    + '.tb-b2b-pd{display:block;margin:8px 0 0;font-size:13.5px;line-height:1.6}'
    + '.tb-b2b-pd a{color:#5F6772;text-decoration:none;border-bottom:1px solid currentColor;padding-bottom:1px}'
    + '.tb-b2b-pd a:hover{color:var(--ink,#111921)}}';
  (document.head || document.documentElement).appendChild(st);
  function put() {
    var gr = document.querySelector('#nav .gnb-right');
    if (gr && !gr.querySelector('.tb-b2b-link')) {
      var a = document.createElement('a'); a.className = 'tb-b2b-link'; a.href = 'business-login.html'; a.textContent = '사업자 구매';
      a.setAttribute('aria-label', '사업자 구매 안내 (카페 · 사무실 · 호텔 납품)');
      gr.insertBefore(a, gr.firstChild);
    }
    var sl = document.querySelector('.pd-sub-link');
    if (sl && !document.querySelector('.tb-b2b-pd')) {
      var p = document.createElement('p'); p.className = 'tb-b2b-pd';
      p.innerHTML = '<a href="business-login.html">카페 · 사무실 납품이 필요하세요? 사업자 구매 안내 →</a>';
      sl.insertAdjacentElement('afterend', p);
    }
  }
  var n = 0, t = setInterval(function () { put(); if (++n > 40) clearInterval(t); }, 200);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
})();

/* ── PC 헤더: 더클린 스토리 · 더클린 기준 · 커피 가이드 세 개를 「브랜드 스토리」 하나로 (모바일 메뉴와 같은 묶음) ──
   펼침 메뉴는 제품 구매와 같은 열 구조로, 소제목 세 개를 한 번에 보여 줍니다. 되돌리려면 이 블록을 지우세요. */
(function () {
  function run() {
    var gc = document.querySelector('#nav .gnb-center');
    if (!gc || gc.dataset.tbBrand) return !!gc;
    var story = gc.querySelector(':scope > a[href="story.html"]');
    var items = [].slice.call(gc.querySelectorAll(':scope > .gnb-item'));
    var std = items.filter(function (g) { return g.querySelector('a[href="standard.html"]'); })[0];
    var gd = items.filter(function (g) { return g.querySelector('a[href="guide.html"]'); })[0];
    if (!story || !std || !gd) return false;
    gc.dataset.tbBrand = '1';
    var item = document.createElement('div'); item.className = 'gnb-item tb-brand';
    item.innerHTML = '<a href="story.html">브랜드 스토리<span class="caret" aria-hidden="true"></span></a>'
      + '<div class="simple-drop pm-drop gd-drop" role="menu" aria-label="브랜드 스토리 하위 메뉴">'
      + '<div class="pm-col"><a class="pm-h" href="story.html">더클린 스토리</a><a href="archive.html">로스터의 노트</a></div>'
      + '<div class="pm-col"><a class="pm-h" href="standard.html">더클린 기준</a><a href="standard.html#handpick">결점두와 핸드픽</a><a href="standard.html#labtest">곰팡이독소 검사</a><a href="standard.html#roasting">로스팅 기준</a></div>'
      + '<div class="pm-col"><a class="pm-h" href="guide.html">커피 가이드</a><a href="guide.html#choosing">원두 고르는 법</a><a href="guide.html#brewing">추출 가이드</a><a href="guide.html#storage">보관 · 신선도</a></div>'
      + '</div>';
    gc.insertBefore(item, story);
    story.remove(); std.remove(); gd.remove();
    return true;
  }
  var fs = document.createElement('style');
  fs.textContent = '@media(min-width:901px){#nav .gnb-center>a,#nav .gnb-center>.gnb-item>a{font-size:15px!important}}';
  (document.head || document.documentElement).appendChild(fs);
  var n = 0, t = setInterval(function () { if (run() || ++n > 40) clearInterval(t); }, 150);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();

/* ── 이커머스 화면 배경 흰색 (모바일 · PC 공통) ──
   상품 목록 · 정기구독 · 검색 · 상품 상세 · 장바구니 · 결제 · 주문 완료 · 결제 실패 · 주문 조회. 홈 · 스토리 · 마이페이지 등은 그대로.
   미색 바탕이던 화면 바깥과, 화면 폭 전체를 차지하는 미색 구간만 흰색으로 바꿈(카드 안 상자 색은 그대로). */
(function () {
  var file = location.pathname.split('/').pop().replace(/^(asis|tobe)-/, '').split('?')[0];
  if (!/^(collection|subscribe|search|product-[a-z-]+|first-note|gift-dripbag|gift-tasting|cart|checkout|order-complete|payment-fail|order-lookup)\.html$/.test(file)) return;
  var st = document.createElement('style'); st.id = 'tb-white-bg-css';
  st.textContent = 'html,body{background:#fff!important}';
  (document.head || document.documentElement).appendChild(st);
  var CREAM = { 'rgb(245, 243, 238)': 1, 'rgb(241, 241, 239)': 1, 'rgb(243, 241, 236)': 1 };
  function fix() {
    if (!document.body) return;
    [].forEach.call(document.body.children, function (e) {
      if (/^(SCRIPT|STYLE|LINK)$/i.test(e.tagName)) return;
      if (CREAM[getComputedStyle(e).backgroundColor]) e.style.setProperty('background-color', '#fff', 'important');
    });
    /* 스크롤하면 따라오는 줄(고정 탭 · 칩 · 목차)도 같은 흰색으로 */
    [].forEach.call(document.body.querySelectorAll('*'), function (e) {
      var c = getComputedStyle(e);
      if ((c.position === 'sticky' || c.position === 'fixed') && CREAM[c.backgroundColor]) e.style.setProperty('background-color', '#fff', 'important');
    });
  }
  var n = 0, t = setInterval(function () { fix(); if (++n > 20) clearInterval(t); }, 300);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fix); else fix();
  window.addEventListener('load', fix);
})();

/* ── 커피 취향 찾기 입구 (홈 · 상품 목록 원두 탭 · 검색) ──
   플로팅을 없앤 대신, 원두를 고르기 전 막막한 순간에만 보이는 한 줄 안내. 누르면 기존 「커피 취향 찾기」 창이 열립니다(data-palate). 되돌리려면 이 블록을 지우세요. */
(function () {
  var file = location.pathname.split('/').pop().replace(/^(asis|tobe)-/, '').split('?')[0];
  if (!/^(home|collection|search)\.html$/.test(file)) return;
  var st = document.createElement('style'); st.id = 'tb-pal-css';
  st.textContent = '.tb-pal{display:flex;align-items:center;justify-content:space-between;gap:12px;min-height:60px;padding:14px 18px;background:#F3F1EC;border:1px solid #E6E4DE;color:var(--ink,#111921);text-decoration:none;box-sizing:border-box}'
    + '.tb-pal span{font-size:15px;line-height:1.5;color:#454C55;word-break:keep-all}'
    + '.tb-pal b{flex:none;font-size:15px;font-weight:700;color:var(--ink,#111921)}'
    + '.tb-pal:hover{background:#ECE9E2}'
    + '.tb-pal-home{background:#fff;padding:0 20px clamp(28px,4vw,44px)}.tb-pal-home .tb-pal{max-width:720px;margin:0 auto}'
    + '@media(max-width:900px){.tb-pal-home{display:none}}'
    + '.tb-pal-list{margin:36px 0 0}'
    + '.tb-pal-list[hidden]{display:none}'
    + '#tbHome .tb-pal-sec{margin:0 0 8px}';
  (document.head || document.documentElement).appendChild(st);
  function link(text) { return '<a class="tb-pal" href="#palate" data-palate><span>' + text + '</span><b>커피 취향 찾기 ›</b></a>'; }
  function mk(cls, text) { var d = document.createElement('div'); d.className = cls; d.innerHTML = link(text); return d; }
  function put() {
    if (file === 'home.html') {
      var c = document.querySelector('.tb-cats');
      if (c && !document.querySelector('.tb-pal-home')) c.insertAdjacentElement('afterend', mk('tb-pal-home', '어떤 원두가 맞을지 모르겠다면'));
    }
    if (file === 'collection.html') {
      var cb = document.getElementById('beansGrouped');
      if (cb && !document.querySelector('.tb-pal-list')) { cb.insertAdjacentElement('afterend', mk('tb-pal-list', '어떤 원두가 맞을지 모르겠다면')); }
      var w = document.querySelector('.tb-pal-list'), a = document.querySelector('#catTabs .cat-tab.active');
      if (w && a) w.hidden = a.dataset.tab !== 'beans';
    }
    if (file === 'search.html') {
      var hot = document.getElementById('tbHot');
      var sec = hot && hot.closest('section');
      if (sec && !document.querySelector('.tb-pal-sec')) sec.insertAdjacentElement('afterend', mk('tb-pal-sec', '찾는 맛을 모르겠다면'));
      var eb = document.querySelector('#sqEmpty .tb-empty-btns');
      if (eb && !document.querySelector('#sqEmpty .tb-pal')) eb.insertAdjacentElement('beforebegin', mk('tb-pal-empty', '찾는 맛을 모르겠다면'));
    }
  }
  var n = 0, t = setInterval(function () { put(); if (file !== 'collection.html' && ++n > 30) clearInterval(t); }, 250);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', put); else put();
})();

/* 제품 상세 모바일: 읽기 쉽게 (라벨 · 값 크기, 테이스팅 점수 위치, 배송 · 적립 안내) */
(function () {
  if (!document.querySelector('.pd-hero') || document.getElementById('tb-pd-read-css')) return;
  var s = document.createElement('style'); s.id = 'tb-pd-read-css';
  s.textContent = '@media(max-width:760px){' +
    '.pd-hero .pd-price-label,.pd-hero .pd-point-label,.pd-hero .pd-ship-label{font-family:inherit!important;font-size:14px!important;letter-spacing:0!important;color:#5F6772!important;font-weight:600}' +
    '.pd-hero .pd-concept{font-size:17px!important;line-height:1.6!important;color:var(--ink,#111921)!important}' +
    '.pd-hero .pd-notes-val,.pd-hero .pd-notes-val b{font-size:17px!important;line-height:1.5}' +
    '.pd-hero .pd-spec-hero .pd-spec-row{grid-template-columns:48px auto auto!important;justify-content:start;column-gap:14px!important;font-size:16px!important;padding:8px 0!important}' +
    '.pd-hero .pd-spec-hero .taste-dots i{width:15px!important;height:15px!important}' +
    '.pd-hero .tb-sc{font-size:15px!important;min-width:44px;text-align:left!important;color:var(--ink,#111921)}' +
    '.pd-hero .pd-point-value,.pd-hero .pd-point-value *{font-size:15px!important}' +
    '.pd-hero .pd-ship-badge{font-size:15px!important}' +
    '.pd-hero .pd-ship-line{font-size:15px!important;line-height:1.6!important}' +
    '.pd-hero .pd-ship-line[style]{font-size:14px!important;color:#5F6772!important}' +
    '.pd-hero .pd-ship-sub{font-size:14px!important;color:#5F6772!important}' +
    '.pd-hero .tb-opt-hint{font-size:15px!important;line-height:1.65!important;color:#454C55!important}' +
    '.pd-hero .tb-rate{font-size:15px!important}' +
    '.pd-toc-wrap .gd-toc a{font-size:15px!important}' +
    '}';
  document.head.appendChild(s);
})();

/* 제품 상세 배송 정보: 한 줄 요약 + ? 눌러 전체 보기 · 회색만 */
(function () {
  if (document.getElementById('tb-ship-css')) return;
  var st = document.createElement('style'); st.id = 'tb-ship-css';
  st.textContent =
    '.pd-ship-row,.pd-point-row{color:#5F6772!important}' +
    '.pd-point-row .pd-point-value,.pd-point-row .pd-point-value *{color:#5F6772!important}' +
    '.pd-point-row .pd-point-value b{font-weight:600!important}' +
    '.pd-point-row .pd-point-help{display:none!important}' +
    '.pd-ship-row .pd-ship-label,.pd-point-row .pd-point-label{color:#6B7380!important}' +
    '.pd-ship-row .pd-ship-group{display:none!important}' +
    '.pd-ship-row{border-top:0!important;padding-top:0!important;margin-top:10px!important}' +
    '.pd-point-row{border-top:1px solid var(--hair,#E6E4DE);padding-top:14px;margin-top:16px!important}' +
    '.pd-ship-row + .pd-select-row,.pd-ship-row + *{margin-top:24px!important}' +
    '.tb-sh-one{display:flex;flex-wrap:wrap;align-items:center;font-size:13px;line-height:1.6;color:#5F6772;font-weight:400}' +
    '@media(max-width:760px){.pd-hero .tb-sh-one{font-size:15px!important}}' +
    '.tb-help{display:inline-flex;align-items:center;justify-content:center;position:relative;width:22px;height:22px;margin-left:8px;padding:0;border:1px solid #8A9099;border-radius:50%;background:#fff;color:#454C55;font:700 13px/1 inherit;cursor:pointer}' +
    '.tb-help::before{content:"";position:absolute;inset:-11px}' +
    '.tb-help[aria-expanded=true]{background:#5F6772;border-color:#5F6772;color:#fff}' +
    '.tb-tip{flex:0 0 100%;margin:8px 0 2px;padding:10px 12px;background:#F3F1EC;font-size:14px;line-height:1.7;color:#454C55;font-weight:400;word-break:keep-all}' +
    '.tb-tip[hidden]{display:none}.tb-tip div+div{margin-top:4px}';
  document.head.appendChild(st);
  function txt(el) { return el ? el.textContent.replace(/\s*\?\s*$/, '').replace(/\s+/g, ' ').trim() : ''; }
  function build() {
    var row = document.querySelector('.pd-ship-row'), body = row && row.querySelector('.pd-ship-body'); if (!body) return !!row && false;
    if (row.dataset.tbShip) return true; row.dataset.tbShip = '1';
    var badge = row.querySelector('.pd-ship-badge'), bt = txt(badge);
    var one = document.createElement('div'); one.className = 'tb-sh-one';
    var sum = document.createElement('span'); sum.textContent = (bt ? bt + ' · ' : '') + '조건부 무료'; one.appendChild(sum);
    var b = document.createElement('button'); b.type = 'button'; b.className = 'tb-help'; b.textContent = '?'; b.setAttribute('aria-expanded', 'false'); b.setAttribute('aria-label', '배송 안내 자세히 보기');
    var t = document.createElement('div'); t.className = 'tb-tip'; t.hidden = true; t.setAttribute('role', 'note');
    b.addEventListener('click', function (e) {
      e.preventDefault(); e.stopPropagation();
      if (t.hidden) {
        var lines = [];
        function add(x) { if (x && lines.indexOf(x) < 0) lines.push(x); }
        [].forEach.call(row.querySelectorAll('.pd-ship-line'), function (l) {
          if (l.hidden) return;
          var c = l.cloneNode(true), h = c.querySelector('.pd-point-help'), title = h && h.getAttribute('title');
          if (h) h.remove();
          var base = txt(c);
          if (title) { add(title); add(base.replace('제주 · 도서산간 추가 배송비', '').replace(/^[\s·]+/, '')); }
          else add(base);
        });
        /* 앞 줄(발송 안내)에는 '오늘출발 상품' 배지를 붙임 */
        t.innerHTML = ''; lines.forEach(function (x) { var d = document.createElement('div'); d.textContent = x; t.appendChild(d); });
      }
      t.hidden = !t.hidden; b.setAttribute('aria-expanded', t.hidden ? 'false' : 'true');
    });
    one.appendChild(b); one.appendChild(t); body.appendChild(one);
    return true;
  }
  var n = 0, ti = setInterval(function () { if (build() || ++n > 40) clearInterval(ti); }, 150);
})();
