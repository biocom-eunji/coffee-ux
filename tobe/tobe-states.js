/* 예외 · 빈 상태 화면 (기획 결정 2026-11-11) — 로그인 실패 · 회원가입 입력 오류 · 신규 회원 마이페이지 · 빈 장바구니 결제 · 주문 없는 주문 완료
   쓰는 법: 화면 주소 뒤에 ?state=… 를 붙이면 그 상태를 보여 줍니다 (UX 개선안 쇼케이스의 「예외 상태」 탭이 이 주소를 엽니다).
     tobe-login.html?state=fail          로그인 실패
     tobe-signup.html?state=error        회원가입 입력 오류(2단계)
     tobe-mypage.html?state=new          신규 회원(주문 · 적립금 0건)
     tobe-checkout.html?state=empty      담긴 상품 없이 결제 화면에 들어온 경우
     tobe-order-complete.html?state=none 주문 없이 주문 완료 화면에 들어온 경우
     tobe-find-account.html?state=code-error | code-expired | not-found | id-found | pw-new | pw-done   계정 찾기 결과 · 오류 화면
     tobe-signup.html?state=code         가입 2단계 휴대전화 인증 오류
     tobe-mypage.html?state=sub-manage | sub-fail | sub-card | sub-cancel-lock | sub-cancel | sub-cancel-done   정기배송 관리 · 결제 실패 · 카드 변경 · 해지
     tobe-mypage.html?state=ord-list | ord-cancel | ord-cancel-late | ord-cancel-done | ord-confirm | ord-confirm-done | ord-claim | ord-claim-done | ord-review | ord-review-done | ord-myreviews   주문 후 처리
     tobe-order-lookup.html?state=result 비회원 주문 조회 결과
     tobe-collection.html?state=soldout            품절 상품 카드
     tobe-product-siesta.html?state=soldout | restock | restock-done   품절 상품 상세 · 재입고 알림 신청 · 완료
     tobe-cart.html?state=soldout                  장바구니에 품절 상품
     tobe-checkout.html?state=coupon-min | points-over | points-low   쿠폰 최소 금액 미달 · 적립금 한도 초과 · 적립금 5,000원 미만
     tobe-mypage.html?state=leave | leave-blocked | leave-done   회원 탈퇴 확인 · 탈퇴 불가 · 탈퇴 완료
     tobe-login.html?state=dormant | dormant-done   휴면 계정 안내 · 휴면 해제 완료
     tobe-error.html?state=maint | 500 | offline   점검 중 · 서버 오류 · 인터넷 연결 끊김(새 화면)
     tobe-business-login.html?state=applied (또는 ?applied=1)   사업자 등록 신청 접수 완료
     tobe-business-mypage.html?state=pending | rejected | resubmit | resubmit-done | approved   사업자 확인 중 · 반려 · 서류 재첨부 · 재신청 완료 · 승인 완료
     tobe-business-cart.html?state=order-done    사업자 주문 접수 완료
   결제 · 주문 완료는 상태 주소 없이도 같은 조건(빈 장바구니 · 주문 없음)이면 이 화면이 나옵니다. 실개발에서는 서버가 판정합니다. */
(function () {
  var q = new URLSearchParams(location.search), st = q.get('state') || '';
  var page = location.pathname.split('/').pop().replace(/^tobe-/, '').replace(/\.html$/, '');
  var RED = '#E04B3C';

  var css = document.createElement('style');
  css.textContent =
    '.st-err{margin:6px 0 0;font-size:12.5px;line-height:1.5;color:' + RED + ';word-break:keep-all}' +
    '.st-bad input{border-color:' + RED + '!important}' +
    '.st-banner{margin:0 0 14px;padding:12px 14px;background:#FDF0EE;border:1px solid #F3C9C3;border-radius:8px;font-size:13.5px;line-height:1.55;color:#8A2A1F;word-break:keep-all}' +
    '.st-empty{max-width:420px;margin:0 auto;padding:56px 24px 72px;text-align:center}' +
    '.st-empty .ic{width:64px;height:64px;margin:0 auto 20px;border-radius:50%;background:#F3F1EC;display:flex;align-items:center;justify-content:center}' +
    '.st-empty .ic svg{width:30px;height:30px;fill:none;stroke:var(--ink,#111921);stroke-width:1.5;stroke-linecap:round;stroke-linejoin:round}' +
    '.st-empty h2{margin:0;font-size:20px;font-weight:700;color:var(--ink,#111921);letter-spacing:-.01em}' +
    '.st-empty p{margin:10px 0 0;font-size:14px;line-height:1.65;color:var(--slate,#454C55);word-break:keep-all}' +
    '.st-empty .row{display:flex;flex-direction:column;gap:10px;margin-top:28px}' +
    '.st-empty .row a{display:flex;align-items:center;justify-content:center;height:52px;border-radius:8px;font-size:15.5px;font-weight:600;text-decoration:none}' +
    '.st-empty .row a.p{background:var(--ink,#111921);color:#fff}' +
    '.st-empty .row a.s{border:1px solid var(--hair,#E6E4DE);background:#fff;color:var(--ink,#111921)}' +
    '.st-mp-empty{margin:0 0 14px;padding:28px 20px;background:#fff;border:1px solid var(--hair,#E6E4DE);text-align:center}' +
    '.st-mp-empty b{display:block;font-size:15px;color:var(--ink,#111921)}' +
    '.st-mp-empty p{margin:6px 0 0;font-size:13px;line-height:1.6;color:var(--slate,#454C55);word-break:keep-all}' +
    '.st-mp-empty a{display:inline-flex;align-items:center;justify-content:center;height:44px;margin-top:16px;padding:0 22px;border-radius:8px;background:var(--ink,#111921);color:#fff;font-size:14px;font-weight:600;text-decoration:none}';
  document.head.appendChild(css);

  /* 조건이 맞을 때까지 잠깐 기다렸다가 실행 (다른 스크립트가 화면을 다 만든 뒤) */
  function when(cond, fn, ms) {
    var n = 0, lim = (ms || 4000) / 100;
    (function tick() { var ok = false; try { ok = cond(); } catch (e) {} if (ok) { fn(); return; } if (++n < lim) setTimeout(tick, 100); })();
  }
  function $(id) { return document.getElementById(id); }
  var BAG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 8h12l-1 12H7L6 8z"/><path d="M9 8V6a3 3 0 016 0v2"/></svg>';
  var RECEIPT = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/></svg>';

  /* ───────── 1. 로그인 실패 ───────── */
  function loginFail() {
    when(function () { return document.querySelector('.tb-err') && $('lgId') && $('lgPw'); }, function () {
      var id = $('lgId'), pw = $('lgPw');
      id.value = 'cleancoffee'; pw.value = 'wrongpass1';
      var idF = id.closest('.acc-f'), pwF = pw.closest('.acc-f');
      idF.classList.add('st-bad'); pwF.classList.add('st-bad', 'tb-bad');
      var err = pwF.querySelector('.tb-err'); if (err) { err.textContent = '아이디 또는 비밀번호가 맞지 않아요. 다시 확인해 주세요.'; }
      var note = $('lgNote');
      if (note) { note.innerHTML = '비밀번호가 기억나지 않으면 <a href="find-account.html" style="color:var(--ink,#111921);font-weight:700;text-decoration:underline">비밀번호 찾기</a>에서 다시 설정할 수 있어요.'; }
      id.addEventListener('input', function () { idF.classList.remove('st-bad'); });
    });
  }

  /* ───────── 2. 회원가입 입력 오류 ───────── */
  function fieldErr(input, text) {
    var f = input.closest('.su-field'); if (!f) return;
    f.classList.add('st-bad');
    var p = f.querySelector('.st-err'); if (!p) { p = document.createElement('p'); p.className = 'st-err'; p.setAttribute('role', 'alert'); f.appendChild(p); }
    p.textContent = text;
    [].forEach.call(f.querySelectorAll('.tb-pwrule'), function (r) { r.style.display = 'none'; });
  }
  function fieldOk(input) { var f = input.closest('.su-field'); if (!f) return; f.classList.remove('st-bad'); var p = f.querySelector('.st-err'); if (p) p.remove(); [].forEach.call(f.querySelectorAll('.tb-pwrule'), function (r) { r.style.display = ''; }); }
  function signupCheck() {
    var name = $('suName'), em = $('suEmail'), pw = $('suPw'), code = $('suCode'), bad = [];
    if (!name.value.trim()) { fieldErr(name, '이름을 입력해 주세요.'); bad.push(name); } else fieldOk(name);
    if (!em.value.trim()) { fieldErr(em, '이메일을 입력해 주세요.'); bad.push(em); }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { fieldErr(em, '이메일 형식을 확인해 주세요. (예: you@example.com)'); bad.push(em); } else fieldOk(em);
    if (!pw.value) { fieldErr(pw, '비밀번호를 입력해 주세요.'); bad.push(pw); }
    else if (pw.value.length < 8) { fieldErr(pw, '비밀번호는 8자 이상으로 입력해 주세요.'); bad.push(pw); } else fieldOk(pw);
    if (code && !/^\d{6}$/.test(code.value || '')) { fieldErr(code, '휴대전화 인증번호 6자리를 입력해 주세요.'); bad.push(code); } else if (code) fieldOk(code);
    var note = $('suNote'); if (note) { note.textContent = bad.length ? '입력하신 내용을 다시 확인해 주세요.' : ''; note.style.color = bad.length ? RED : ''; }
    return bad;
  }
  function signupLive() {
    /* 실제 가입하기: 칸마다 오류 문구를 보여 주고, 모두 맞을 때만 기존 가입 처리로 넘어감 */
    var sb = $('suSubmit'); if (!sb || sb.dataset.stv) return; sb.dataset.stv = '1';
    sb.addEventListener('click', function (e) { var bad = signupCheck(); if (bad.length) { e.stopImmediatePropagation(); e.preventDefault(); bad[0].focus(); } }, true);
    ['suName', 'suEmail', 'suPw', 'suCode'].forEach(function (i) { var x = $(i); if (x) x.addEventListener('input', function () { fieldOk(x); }); });
  }
  function signupError() {
    when(function () { return $('tbAll') && $('tbNext') && $('suName'); }, function () {
      var all = $('tbAll'); if (all && !all.checked) all.click();
      $('tbNext').click();
      when(function () { var n = $('suName'); return n && n.offsetParent !== null; }, function () {
        $('suName').value = '김클린'; $('suEmail').value = 'cleancoffee@gmail'; $('suPw').value = 'clean12';
        var ph = $('suPhone'); if (ph) ph.value = '010-2345-6789';
        signupCheck(); window.scrollTo(0, 0);
      }, 3000);
    }, 4000);
  }

  /* ───────── 3. 신규 회원 마이페이지 (가입 직후: 주문 · 적립금 없음) ───────── */
  function mypageNew() {
    try {
      if (!sessionStorage.getItem('st_new_member')) {
        sessionStorage.setItem('st_new_member', '1');
        localStorage.setItem('tcc_member', JSON.stringify({ name: '김클린', phone: '010-2345-6789', email: 'clean@example.com', spent12m: 0 }));
        localStorage.setItem('tcc_orders', '[]'); localStorage.setItem('tcc_subs', '[]'); localStorage.setItem('tcc_wish', '[]');
        localStorage.setItem('tcc_demo_wish', '1'); localStorage.setItem('tcc_demo_seeded', '1');
        location.reload(); return;
      }
    } catch (e) {}
    function emptyBox(title, text, cta) { var d = document.createElement('div'); d.className = 'st-mp-empty'; d.innerHTML = '<b>' + title + '</b><p>' + text + '</p>' + (cta || ''); return d; }
    function patch() {
      /* 이번 달 혜택 띠 · 주문 샘플 · 적립금 샘플 정리 */
      [].forEach.call(document.querySelectorAll('.mp-wrap > .reveal'), function (el) { if (/이번 달 더클린커피에서 받은 혜택/.test(el.textContent) && el.children.length < 4) el.style.display = 'none'; });
      var oh = $('orders');
      if (oh && !document.querySelector('.st-mp-empty[data-k="orders"]')) {
        [].forEach.call(document.querySelectorAll('.mp-order'), function (o) { o.style.display = 'none'; });
        var b = emptyBox('아직 주문 내역이 없어요', '원두를 둘러보고 첫 주문을 시작해 보세요. 가입하면서 받은 웰컴 쿠폰을 첫 주문에 쓸 수 있어요.', '<a href="collection.html">원두 보러 가기</a>'); b.dataset.k = 'orders';
        oh.insertAdjacentElement('afterend', b);
      }
      var ph = $('points');
      if (ph && !document.querySelector('.st-mp-empty[data-k="points"]')) {
        [].forEach.call(document.querySelectorAll('.mp-point-row'), function (r) { r.style.display = 'none'; });
        var b2 = emptyBox('적립금 내역이 없어요', '구매 적립은 주문의 구매 확정 이후, 리뷰 적립은 리뷰를 남기면 쌓여요.'); b2.dataset.k = 'points';
        var card = document.querySelector('#points ~ .mp-card'); if (card) card.insertAdjacentElement('afterbegin', b2); else ph.insertAdjacentElement('afterend', b2);
      }
      /* 요약 칸: 진행 중 주문 0건 · 적립금 0원 · 쿠폰은 목록에 있는 장수 */
      var coupons = document.querySelectorAll('#coupons ~ .mp-card .mp-coupon, #coupons ~ .mp-coupon, #coupons ~ * .mp-coupon').length;
      [].forEach.call(document.querySelectorAll('.mp-sum-cell[data-go]'), function (c) {
        var b = c.querySelector('b'); if (!b) return; var k = c.dataset.go;
        if (k === 'orders') b.textContent = '0건'; else if (k === 'points') b.textContent = '0원'; else if (k === 'coupons' && coupons) b.textContent = coupons + '장';
      });
      /* 주문 단계(입금 대기 ~ 배송 완료) 숫자는 모두 0 */
      [].forEach.call(document.querySelectorAll('.tb-status5 > span'), function (sp) { var b = sp.querySelector('b'); if (b) { b.textContent = '0'; b.style.color = ''; } sp.classList.remove('on', 'has'); });
      /* '내역 3건 더 보기' 같은 더 보기 단추 숨김 */
      [].forEach.call(document.querySelectorAll('button'), function (x) { if (/내역 \d+건 더 보기/.test(x.textContent)) x.style.display = 'none'; });
    }
    var n = 0; (function loop() { try { patch(); } catch (e) {} if (++n < 20) setTimeout(loop, 250); })();
  }

  /* ───────── 4. 담긴 상품 없이 결제 화면 ───────── */
  function guard(opts) {
    var wrap = document.querySelector('.mp-wrap'); if (!wrap || document.querySelector('.st-empty')) return;
    wrap.style.display = 'none';
    ['.ckm-bar', '.coll-page-header'].forEach(function (s) { if (opts.hide.indexOf(s) >= 0) { var e = document.querySelector(s); if (e) e.style.display = 'none'; } });
    var d = document.createElement('div'); d.className = 'st-empty';
    if (opts.top) d.style.paddingTop = opts.top;
    d.innerHTML = '<div class="ic">' + opts.icon + '</div><h2>' + opts.title + '</h2><p>' + opts.text + '</p><div class="row">' + opts.buttons + '</div>';
    wrap.parentNode.insertBefore(d, wrap);
  }
  function checkoutEmpty() {
    var forced = st === 'empty';
    when(function () { return document.querySelector('.mp-wrap') && $('ckPayBtn'); }, function () {
      var sub = /[?&]sub=/.test(location.search), now = /[?&]now=/.test(location.search), cartN = 0;
      try { cartN = (window.TCC && TCC.read ? TCC.read() : []).length; } catch (e) {}
      try { if (sub) cartN += JSON.parse(localStorage.getItem('tcc_sub_cart') || '[]').length; } catch (e) {}
      if (!forced && (cartN > 0 || now || sub)) return;
      guard({ hide: ['.ckm-bar'], icon: BAG, title: '결제할 상품이 없어요', text: '장바구니가 비어 있어요. 마음에 드는 원두를 담은 뒤 다시 결제해 주세요.',
        buttons: '<a class="p" href="collection.html">상품 둘러보기</a><a class="s" href="cart.html">장바구니 보기</a>' });
    }, 5000);
  }

  /* ───────── 5. 주문 없이 주문 완료 화면 ───────── */
  function orderNone() {
    var forced = st === 'none';
    if (forced) { try { /* 시연용 샘플 주문을 끄고 실제 저장된 주문만 본다 */ window.__noSampleOrder = true; var real = TCC.orders; TCC.orders = function () { return forced ? [] : real(); }; } catch (e) {} }
    when(function () { return document.querySelector('.mp-wrap') && $('ocBox'); }, function () {
      var hasOrder = false; try { hasOrder = (window.TCC && TCC.orders ? TCC.orders() : []).length > 0; } catch (e) {}
      if (!forced && hasOrder) return;
      guard({ hide: ['.coll-page-header'], top: '132px', icon: RECEIPT, title: '확인할 주문이 없어요', text: '방금 주문한 내역이 보이지 않아요. 이미 주문하셨다면 주문 · 배송 조회에서 확인해 주세요.',
        buttons: '<a class="p" href="mypage.html#orders">주문 · 배송 조회</a><a class="s" href="collection.html">쇼핑 계속하기</a>' });
    }, 5000);
  }


  /* ───────── 6. 계정 찾기 (아이디 · 비밀번호) 결과 · 오류 ───────── */
  function acField(input, text) {
    var f = input.closest('.acc-f'); if (!f) return;
    f.classList.add('st-bad');
    var p = f.querySelector('.st-err'); if (!p) { p = document.createElement('p'); p.className = 'st-err'; p.setAttribute('role', 'alert'); f.appendChild(p); }
    p.textContent = text;
  }
  function setTab(t) { var b = document.querySelector('.acc-tab[data-t="' + t + '"]'); if (b && !b.classList.contains('on')) b.click(); }
  function fillId(code) {
    $('faName').value = '김클린'; $('faTel').value = '010-2345-6789';
    var c = document.querySelector('#faId .faCode'); c.value = code;
    [].forEach.call(document.querySelectorAll('#faId .faSend'), function (b) { b.textContent = '다시 받기'; });
  }
  function resultCard(opts) {
    var card = document.querySelector('.acc-card'); if (!card) return;
    ['#faId', '#faPw', '.acc-tabs', '#faNote', '.tb-help'].forEach(function (sel) { var e = card.querySelector(sel); if (e) e.style.display = 'none'; });
    var d = document.createElement('div'); d.className = 'st-result';
    d.innerHTML = '<div class="ic">' + opts.icon + '</div><h2>' + opts.title + '</h2>' + (opts.body || '') + '<div class="row">' + opts.buttons + '</div>';
    var steps = $('tbSteps'); if (steps) { var li = steps.children; li[0].className = 'done'; li[0].firstChild.textContent = '✓'; li[1].className = 'on'; $('tbStep2').textContent = opts.step; }
    card.insertBefore(d, steps ? steps.nextSibling : card.firstChild);
  }
  var CHECK = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  css.textContent +=
    '.st-result{text-align:center;padding:8px 4px 4px}' +
    '.st-result .ic{width:56px;height:56px;margin:0 auto 16px;border-radius:50%;background:#EAF5FA;display:flex;align-items:center;justify-content:center}' +
    '.st-result .ic svg{width:28px;height:28px;fill:none;stroke:var(--ink,#111921);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.st-result h2{margin:0;font-size:19px;font-weight:700;color:var(--ink,#111921)}' +
    '.st-result p{margin:8px 0 0;font-size:13.5px;line-height:1.6;color:var(--slate,#454C55);word-break:keep-all}' +
    '.st-result .id{margin:18px 0 0;padding:16px;background:#F7F6F2;border-radius:8px;font-size:17px;font-weight:700;color:var(--ink,#111921);letter-spacing:.01em}' +
    '.st-result .id small{display:block;margin-top:4px;font-size:12px;font-weight:400;color:var(--mist,#8A9099)}' +
    '.st-result .row{display:flex;flex-direction:column;gap:10px;margin-top:22px}' +
    '.st-result .row a{display:flex;align-items:center;justify-content:center;height:52px;border-radius:8px;font-size:15.5px;font-weight:600;text-decoration:none}' +
    '.st-result .row a.p{background:var(--ink,#111921);color:#fff}.st-result .row a.s{border:1px solid var(--hair,#E6E4DE);background:#fff;color:var(--ink,#111921)}' +
    '.st-hl{background:var(--ink,#111921)!important;color:#fff!important;border-color:var(--ink,#111921)!important}';
  function findAccount() {
    when(function () { return $('faName') && $('faTel') && $('faNote') && document.querySelector('.acc-tab'); }, function () {
      var note = $('faNote'), codeEl;
      if (st === 'code-error') {
        setTab('id'); fillId('123456'); codeEl = document.querySelector('#faId .faCode');
        acField(codeEl, '인증번호가 맞지 않아요. 다시 확인해 주세요.');
        note.textContent = '문자를 받지 못했다면 「다시 받기」를 눌러 인증번호를 다시 받아 주세요.';
      } else if (st === 'code-expired') {
        setTab('id'); fillId('482913'); codeEl = document.querySelector('#faId .faCode');
        acField(codeEl, '인증 시간(3분)이 지났어요. 인증번호를 다시 받아 주세요.');
        var sb = document.querySelector('#faId .faSend'); if (sb) sb.classList.add('st-hl');
        note.textContent = '';
      } else if (st === 'not-found') {
        setTab('id'); fillId('482913');
        var ban = document.createElement('div'); ban.className = 'st-banner'; ban.setAttribute('role', 'alert');
        ban.innerHTML = '<b>일치하는 계정이 없어요.</b><br>입력하신 이름과 휴대폰 번호로 가입한 계정을 찾을 수 없어요. 정보를 다시 확인해 주세요.';
        var btn = $('faIdBtn'); btn.parentNode.insertBefore(ban, btn);
        note.innerHTML = '아직 가입 전이라면 <a href="signup.html" style="color:var(--ink,#111921);font-weight:700;text-decoration:underline">회원가입</a>을 해 주세요.';
      } else if (st === 'id-found') {
        resultCard({ icon: CHECK, title: '가입하신 아이디를 찾았어요', step: '아이디 확인',
          body: '<div class="id">thec****@naver.com<small>가입일 2023.04.12</small></div><p>개인정보 보호를 위해 일부는 가려서 보여드려요.</p>',
          buttons: '<a class="p" href="login.html">로그인하기</a><a class="s" href="find-account.html#pw">비밀번호 찾기</a>' });
      } else if (st === 'pw-new') {
        setTab('pw'); $('fpId').value = 'thecleancoffee'; $('fpTel').value = '010-2345-6789'; document.querySelector('#faPw .faCode').value = '482913';
        var pb = $('faPwBtn'); pb.click();
        when(function () { return !$('fpNew').hidden; }, function () {
          $('fpPw1').value = 'cleancoffee'; $('fpPw2').value = 'cleancoffee1';
          acField($('fpPw1'), '비밀번호는 8자 이상, 영문과 숫자를 함께 써 주세요.');
          acField($('fpPw2'), '두 비밀번호가 다릅니다. 다시 확인해 주세요.');
          note.textContent = '';
        }, 2000);
      } else if (st === 'pw-done') {
        resultCard({ icon: CHECK, title: '비밀번호를 바꿨어요', step: '새 비밀번호',
          body: '<p>새 비밀번호로 로그인해 주세요.<br>다른 기기에서 로그인되어 있었다면 다시 로그인해야 할 수 있어요.</p>',
          buttons: '<a class="p" href="login.html">로그인하기</a><a class="s" href="home.html">홈으로</a>' });
      }
    }, 4000);
  }
  function signupCode() {
    when(function () { return $('tbAll') && $('tbNext') && $('suName'); }, function () {
      var all = $('tbAll'); if (all && !all.checked) all.click();
      $('tbNext').click();
      when(function () { var n = $('suName'); return n && n.offsetParent !== null; }, function () {
        $('suName').value = '김클린'; $('suEmail').value = 'cleancoffee@gmail.com'; $('suPw').value = 'clean1234';
        var ph = $('suPhone'); if (ph) ph.value = '010-2345-6789';
        var sendBtn = $('suSend'); if (sendBtn) sendBtn.click();   /* 인증번호 입력칸을 연다 */
        var c = $('suCode'); if (c) { c.value = '123456'; fieldErr(c, '인증번호가 맞지 않아요. 다시 확인해 주세요. 시간이 지났다면 「인증번호 받기」를 다시 눌러 주세요.'); }
        var note = $('suNote'); if (note) { note.textContent = ''; }
        window.scrollTo(0, 0);
        var f = c && c.closest('.su-field'); if (f) f.scrollIntoView({ block: 'center' });
      }, 3000);
    }, 4000);
  }


  /* ───────── 7. 정기배송 관리 · 결제 실패 · 카드 변경 · 해지 ───────── */
  css.textContent +=
    '.st-fail{margin:12px 0 4px;padding:14px;background:#FDF0EE;border:1px solid #F3C9C3;border-radius:8px}' +
    '.st-fail b{display:block;font-size:14px;color:#8A2A1F}' +
    '.st-fail p{margin:6px 0 0;font-size:12.5px;line-height:1.65;color:#8A2A1F;word-break:keep-all}' +
    '.st-fail button{margin-top:12px;height:46px;width:100%;border:0;border-radius:8px;background:var(--ink,#111921);color:#fff;font:inherit;font-size:14.5px;font-weight:600;cursor:pointer}' +
    '.st-sheet-bg{position:fixed;inset:0;z-index:300;background:rgba(17,25,33,.42)}' +
    '.st-sheet{position:fixed;left:0;right:0;bottom:0;z-index:301;max-height:92vh;overflow:auto;background:#fff;border-radius:16px 16px 0 0;padding:20px 20px calc(20px + env(safe-area-inset-bottom,0px));font-family:inherit}' +
    '@media(min-width:761px){.st-sheet{left:50%;right:auto;width:440px;margin-left:-220px;border-radius:16px}}' +
    '.st-sheet h3{margin:0;font-size:18px;font-weight:700;color:var(--ink,#111921)}' +
    '.st-sheet .sub{margin:6px 0 0;font-size:13px;line-height:1.6;color:var(--slate,#454C55);word-break:keep-all}' +
    '.st-sheet .x{position:absolute;right:14px;top:12px;width:34px;height:34px;border:0;background:none;font-size:24px;line-height:1;color:var(--mist,#8A9099);cursor:pointer}' +
    '.st-sheet .f{margin-top:14px}.st-sheet label{display:block;margin-bottom:6px;font-size:12px;font-weight:700;color:var(--ink,#111921)}' +
    '.st-sheet input{width:100%;box-sizing:border-box;height:48px;padding:0 14px;border:1px solid var(--hair,#E6E4DE);border-radius:6px;font:inherit;font-size:15px;color:var(--ink,#111921)}' +
    '.st-sheet .two{display:grid;grid-template-columns:1fr 1fr;gap:10px}' +
    '.st-sheet .f.st-bad input{border-color:' + RED + '}' +
    '.st-sheet .go{margin-top:18px;width:100%;height:54px;border:0;border-radius:8px;background:var(--ink,#111921);color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer}' +
    '.st-sheet .pg{margin-top:10px;font-size:11.5px;line-height:1.6;color:var(--mist,#8A9099);word-break:keep-all}';

  function seedSubs(kind) {
    var d = new Date(), z = function (n) { return String(n).padStart(2, '0'); }, iso = function (x) { return x.getFullYear() + '-' + z(x.getMonth() + 1) + '-' + z(x.getDate()); };
    var add = function (n) { var x = new Date(); x.setDate(x.getDate() + n); return iso(x); };
    var items = [{ name: '콜롬비아', opt: '200g · 분쇄 안 함(홀빈) · 2주', qty: 1, price: 19900 }];
    var lock = (kind === 'sub-manage' || kind === 'sub-cancel-lock' || kind === 'sub-cancel-done');
    var sb = lock
      ? { id: 'S' + iso(d).replace(/-/g, '') + '-4821', cycle: '2w', cycleLabel: '2주마다', items: items, started: add(-1), nextPay: add(13), card: '****-1111', status: '진행 중', round: 1,
          promo: '첫 정기배송 · 20% 할인 + 원두 100g', firstDiscount: 3980, firstGift: { name: '첫 정기배송 혜택 · 원두 100g', opt: '커피팀이 고른 원두', qty: 1, price: 0, gift: true, value: null }, lockRounds: 3, lockUntil: add(41) }
      : { id: 'S' + iso(d).replace(/-/g, '') + '-4821', cycle: '2w', cycleLabel: '2주마다', items: items, started: add(-30), nextPay: kind === 'sub-fail' || kind === 'sub-card' ? iso(d) : add(5), card: '****-1111', status: '진행 중', round: 3, promo: null, firstDiscount: 0, firstGift: null, lockRounds: 0 };
    return [sb];
  }
  function cardSheet() {
    if (document.querySelector('.st-sheet')) return;
    var bg = document.createElement('div'); bg.className = 'st-sheet-bg';
    var sh = document.createElement('div'); sh.className = 'st-sheet'; sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-label', '결제 카드 변경');
    sh.innerHTML = '<button type="button" class="x" aria-label="닫기">×</button><h3>결제 카드 변경</h3>' +
      '<p class="sub">새 카드로 바꾸면 이번 회차부터 이 카드로 결제돼요. 결제가 되지 않은 회차가 있으면 바로 다시 결제해요.</p>' +
      '<div class="f"><label for="stCn">카드 번호</label><input id="stCn" inputmode="numeric" maxlength="19" placeholder="0000-0000-0000-0000" autocomplete="cc-number"></div>' +
      '<div class="two"><div class="f"><label for="stEx">유효기간</label><input id="stEx" inputmode="numeric" maxlength="5" placeholder="MM/YY"></div>' +
      '<div class="f"><label for="stPw">비밀번호 앞 2자리</label><input id="stPw" type="password" inputmode="numeric" maxlength="2" placeholder="••"></div></div>' +
      '<div class="f"><label for="stBd">생년월일 6자리</label><input id="stBd" inputmode="numeric" maxlength="6" placeholder="YYMMDD"></div>' +
      '<button type="button" class="go">카드 변경하고 다시 결제</button>' +
      '<p class="pg">카드 정보는 결제대행사(PG)에 안전하게 등록되며 더클린커피는 카드 번호를 보관하지 않습니다.</p>';
    document.body.appendChild(bg); document.body.appendChild(sh);
    function off() { bg.remove(); sh.remove(); }
    bg.addEventListener('click', off); sh.querySelector('.x').addEventListener('click', off);
    sh.querySelector('.go').addEventListener('click', function () {
      var bad = false;
      function chk(id, ok, msg) { var el = document.getElementById(id), f = el.closest('.f'); var p = f.querySelector('.st-err'); if (!ok) { bad = true; f.classList.add('st-bad'); if (!p) { p = document.createElement('p'); p.className = 'st-err'; f.appendChild(p); } p.textContent = msg; } else { f.classList.remove('st-bad'); if (p) p.remove(); } }
      var cn = $('stCn').value.replace(/\D/g, '');
      chk('stCn', cn.length >= 15, '카드 번호를 확인해 주세요.'); chk('stEx', /^\d{2}\/\d{2}$/.test($('stEx').value), '유효기간을 MM/YY로 입력해 주세요.');
      chk('stPw', $('stPw').value.length === 2, '비밀번호 앞 2자리를 입력해 주세요.'); chk('stBd', $('stBd').value.length === 6, '생년월일 6자리를 입력해 주세요.');
      if (bad) return;
      try { var l = JSON.parse(localStorage.getItem('tcc_subs') || '[]'); if (l[0]) { l[0].card = '****-' + cn.slice(-4); localStorage.setItem('tcc_subs', JSON.stringify(l)); } } catch (e) {}
      off();
      /* 결제 완료 표시: 실패 안내를 지우고 상태를 되돌림 */
      var fb = document.querySelector('.st-fail'); if (fb) { fb.className = 'st-fail ok'; fb.style.background = '#EAF5EE'; fb.style.borderColor = '#BFE0C9'; fb.setAttribute('role', 'status'); fb.innerHTML = '<b style="color:#1F6B3A">카드를 바꾸고 결제가 완료됐어요</b><p style="color:#1F6B3A">결제 카드는 ****-' + cn.slice(-4) + '로 바뀌었어요. 다음 영업일에 발송해요.</p>'; }
      var bd = document.querySelector('#mpSubs .mp-sub span[style*="border:1px solid"]'); if (bd) { bd.textContent = '진행 중'; bd.style.color = ''; bd.style.borderColor = ''; }
    });
  }
  function subDemo() {
    var key = 'st_sub_seed';
    try {
      if (sessionStorage.getItem(key) !== st) {
        sessionStorage.setItem(key, st);
        localStorage.setItem('tcc_member', JSON.stringify({ name: '김클린', phone: '010-2345-6789', email: 'clean@example.com', spent12m: 0 }));
        localStorage.setItem('tcc_subs', JSON.stringify(seedSubs(st)));
        localStorage.setItem('tcc_orders', '[]'); localStorage.setItem('tcc_wish', '[]'); localStorage.setItem('tcc_demo_wish', '1'); localStorage.setItem('tcc_demo_seeded', '1');
        location.reload(); return;
      }
    } catch (e) {}
    when(function () { return document.querySelector('#mpSubs .mp-sub'); }, function () {
      /* 마이페이지 목록에서 접혀 있는 「정기배송 관리」 행을 연다 */
      (function openRow() { var n = 0, t = setInterval(function () { var r = $('subs'); if (r && r.classList.contains('tb-lrow')) { if (r.classList.contains('tb-collapsed')) r.click(); else if (++n > 3) clearInterval(t); } if (++n > 40) clearInterval(t); }, 250); })();
      var card = document.querySelector('#mpSubs .mp-sub'), idx = 0;
      if (st === 'sub-fail') {
        var badge = card.querySelector('span[style*="border:1px solid"]'); if (badge) { badge.textContent = '결제 실패'; badge.style.color = RED; badge.style.borderColor = RED; }
        var box = document.createElement('div'); box.className = 'st-fail'; box.setAttribute('role', 'alert');
        box.innerHTML = '<b>이번 회차 결제가 되지 않았어요</b><p>카드 한도, 잔액, 유효기간을 확인해 주세요. 카드를 바꾸면 바로 다시 결제하고, 결제가 끝나면 다음 영업일에 발송해요.</p><button type="button">카드 변경하고 다시 결제</button>';
        var hd = card.firstChild; hd.insertAdjacentElement('afterend', box);
        box.querySelector('button').addEventListener('click', cardSheet);
        var np = [].filter.call(card.querySelectorAll('p'), function (x) { return /다음 결제/.test(x.textContent); })[0]; if (np) np.innerHTML = np.innerHTML.replace('다음 결제', '결제 예정일');
      } else if (st === 'sub-card') {
        cardSheet();
      } else if (st === 'sub-cancel-lock' || st === 'sub-cancel' || st === 'sub-cancel-done') {
        var cb = card.querySelector('[data-act="cancel"]'); if (cb) cb.click();
        if (st === 'sub-cancel-done') {
          when(function () { return $('scSubmit'); }, function () { var a = $('scAgree'); if (a) a.checked = true; var r = $('scReason'); if (r && r.options.length > 1) r.selectedIndex = 1; $('scSubmit').click(); }, 2000);
        }
        if (st === 'sub-cancel-lock') { /* 위약금 내역과 동의 체크가 보이도록 접수 전 상태로 둔다 */ }
      }
      if (st === 'sub-manage' || st === 'sub-fail') { [900, 1800].forEach(function (ms) { setTimeout(function () { var sub = document.querySelector('#mpSubs .mp-sub'); if (sub && sub.offsetParent !== null) window.scrollTo(0, Math.max(0, sub.getBoundingClientRect().top + window.scrollY - 130)); }, ms); }); }
    }, 6000);
  }


  /* ───────── 8. 주문 후: 취소 · 구매 확정 · 교환·반품 · 리뷰 · 내가 쓴 리뷰 · 비회원 조회 결과 ───────── */
  css.textContent +=
    '.st-sheet .acts{display:flex;gap:10px;margin-top:20px}.st-sheet .acts button{flex:1;height:52px;border-radius:8px;font:inherit;font-size:15.5px;font-weight:600;cursor:pointer}' +
    '.st-sheet .acts .p{border:0;background:var(--ink,#111921);color:#fff}.st-sheet .acts .s{border:1px solid var(--hair,#E6E4DE);background:#fff;color:var(--ink,#111921)}' +
    '.st-sheet .ok{width:52px;height:52px;margin:6px auto 14px;border-radius:50%;background:#EAF5FA;display:flex;align-items:center;justify-content:center}.st-sheet .ok svg{width:26px;height:26px;fill:none;stroke:var(--ink,#111921);stroke-width:2;stroke-linecap:round;stroke-linejoin:round}' +
    '.st-sheet.c{text-align:center}.st-sheet ul.l{margin:14px 0 0;padding:0;list-style:none;text-align:left}.st-sheet ul.l li{padding:10px 0;border-top:1px solid var(--hair,#E6E4DE);font-size:13px;line-height:1.6;color:var(--slate,#454C55);word-break:keep-all}.st-sheet ul.l li b{color:var(--ink,#111921)}' +
    '.st-sheet .rows .r{display:flex;justify-content:space-between;gap:12px;padding:9px 0;font-size:13px;border-top:1px solid var(--hair,#E6E4DE)}.st-sheet .rows .r span{color:var(--mist,#8A9099)}.st-sheet .rows .r b{color:var(--ink,#111921);text-align:right}' +
    '.st-page{position:fixed;inset:0;z-index:290;background:var(--paper,#F4F3EE);overflow:auto;font-family:inherit}.st-page .top{position:sticky;top:0;z-index:2;display:flex;align-items:center;height:56px;padding:0 8px;background:#fff;border-bottom:1px solid var(--hair,#E6E4DE)}' +
    '.st-page .top button{width:44px;height:44px;border:0;background:none;font-size:22px;cursor:pointer;color:var(--ink,#111921)}.st-page .top b{flex:1;text-align:center;font-size:16px;color:var(--ink,#111921)}.st-page .top i{width:44px}' +
    '.st-page .in{max-width:560px;margin:0 auto;padding:16px 16px 40px}.st-page .sum{margin:0 0 14px;font-size:13px;color:var(--slate,#454C55)}.st-page .sum b{color:var(--ink,#111921)}' +
    '.st-rv{margin:0 0 12px;padding:16px;background:#fff;border:1px solid var(--hair,#E6E4DE);border-radius:8px}.st-rv .h{display:flex;justify-content:space-between;gap:10px;align-items:baseline}.st-rv .h b{font-size:14.5px;color:var(--ink,#111921)}.st-rv .h span{font-size:12px;color:var(--mist,#8A9099)}' +
    '.st-rv .star{margin:6px 0 0;font-size:15px;letter-spacing:2px;color:#3BC1E4}.st-rv .tx{margin:8px 0 0;font-size:13.5px;line-height:1.65;color:var(--ink,#111921);word-break:keep-all}.st-rv .ph{display:flex;gap:6px;margin-top:10px}.st-rv .ph i{width:64px;height:64px;background:#ECEAE4;border-radius:4px;display:block}' +
    '.st-rv .rw{margin-top:10px;font-size:12px;color:var(--slate,#454C55)}.st-rv .rw b{color:#2F9FC4}';
  var CHECKSVG = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
  function sheet(o) {
    var old = document.querySelector('.st-sheet'); if (old) { old.remove(); var ob = document.querySelector('.st-sheet-bg'); if (ob) ob.remove(); }
    var bg = document.createElement('div'); bg.className = 'st-sheet-bg';
    var sh = document.createElement('div'); sh.className = 'st-sheet' + (o.center ? ' c' : ''); sh.setAttribute('role', 'dialog'); sh.setAttribute('aria-label', o.title);
    sh.innerHTML = '<button type="button" class="x" aria-label="닫기">×</button>' + (o.ok ? '<div class="ok">' + CHECKSVG + '</div>' : '') + '<h3>' + o.title + '</h3>' + (o.sub ? '<p class="sub">' + o.sub + '</p>' : '') + (o.body || '') +
      '<div class="acts">' + (o.actions || []).map(function (a, i) { return '<button type="button" class="' + (a.p ? 'p' : 's') + '" data-i="' + i + '">' + a.label + '</button>'; }).join('') + '</div>';
    document.body.appendChild(bg); document.body.appendChild(sh);
    function off() { bg.remove(); sh.remove(); }
    bg.addEventListener('click', off); sh.querySelector('.x').addEventListener('click', off);
    [].forEach.call(sh.querySelectorAll('.acts button'), function (b) { b.addEventListener('click', function () { var a = o.actions[+b.dataset.i]; off(); if (a && a.fn) a.fn(); }); });
    return { off: off, el: sh };
  }
  function orderRows(card) {
    var no = ((card.querySelector('.mp-order-head span') || {}).textContent || '').replace('· 주문번호', '').trim();
    var items = [].map.call(card.querySelectorAll('.mp-order-item .mp-oi-info b'), function (b) { return b.textContent.trim(); }).join(', ');
    return '<div class="rows" style="margin-top:12px"><div class="r"><span>주문번호</span><b>' + no + '</b></div><div class="r"><span>상품</span><b>' + items + '</b></div></div>';
  }

  /* 주문 취소: 브라우저 기본 확인창(confirm) 대신 시트로 확인 → 접수 완료 시트 */
  function cutPassed(btn) {
    if (window.__stCut) return window.__stCut === 'late';
    try { var no = btn.dataset.cancel, rec = JSON.parse(localStorage.getItem('tcc_orders') || '[]').filter(function (o) { return o.no === no; })[0]; return new Date() >= TCC_PRICE.cancelUntil((rec && (rec.paidAt || rec.date)) || ''); } catch (e) { return false; }
  }
  function cancelFlow(btn) {
    var card = btn.closest('.mp-order'), late = cutPassed(btn), no = btn.dataset.cancel;
    function doIt() {
      var cl = {}; try { cl = JSON.parse(localStorage.getItem('tcc_claims') || '{}'); } catch (e) {}
      cl[no] = { type: late ? '취소 요청' : '취소', at: new Date().toISOString() }; localStorage.setItem('tcc_claims', JSON.stringify(cl));
      var stEl = card.querySelector('.mp-status'); if (stEl) stEl.textContent = late ? '취소 요청' : '취소 접수';
      var row = btn.closest('.mp-cancel-row'); if (row) row.innerHTML = '<span class="mp-muted">' + (late ? '취소 요청이 접수되었습니다. 출고 전이면 취소해 드리고, 결과를 알림톡으로 안내드립니다.' : '취소가 접수되었습니다. 환불은 결제 수단에 따라 영업일 기준 3~5일 걸립니다.') + '</span>';
      sheet({ ok: true, center: true, title: late ? '취소 요청을 접수했어요' : '주문 취소가 접수됐어요',
        sub: late ? '출고 전이면 취소해 드리고, 결과를 알림톡으로 알려 드려요.' : '결제하신 수단으로 환불돼요. 사용하신 쿠폰과 적립금은 돌려 드려요.',
        body: orderRows(card) + (late ? '' : '<div class="rows"><div class="r"><span>환불 시점</span><b>영업일 기준 3~5일</b></div></div>'),
        actions: [{ label: '확인', p: true }] });
    }
    sheet({ title: late ? '취소를 요청할까요?' : '이 주문을 취소할까요?',
      sub: late ? '로스팅이 시작된 주문이라 바로 취소되지 않아요. 취소 요청을 남기면 확인 후 알림톡으로 안내해 드려요.' : '결제하신 수단으로 환불되고, 사용하신 쿠폰과 적립금은 돌려 드려요.',
      body: orderRows(card), actions: [{ label: '돌아가기' }, { label: late ? '취소 요청하기' : '주문 취소하기', p: true, fn: doIt }] });
  }

  /* 구매 확정: 바로 확정되던 것을 확인 시트(적립 · 교환/반품 안내) → 완료 시트로 */
  function confirmFlow(btn) {
    var card = btn.closest('.mp-order');
    sheet({ title: '구매를 확정할까요?', sub: '상품을 받으신 뒤 문제가 없다면 확정해 주세요.',
      body: orderRows(card) + '<ul class="l"><li><b>적립금</b>이 지급돼요. 구매 적립과 확정 적립 100원이 쌓여요.</li><li><b>리뷰</b>를 남기면 텍스트 300원, 포토·영상 1,000원이 적립돼요.</li><li>확정한 뒤에는 마이페이지에서 교환·반품을 신청할 수 없어요. 문제가 있으면 먼저 신청해 주세요.</li></ul>',
      actions: [{ label: '교환 · 반품 신청', fn: function () { var cb = card.querySelector('[data-claim]'); if (cb) cb.click(); } }, { label: '구매 확정하기', p: true, fn: function () {
        btn.dataset.stOk = '1'; btn.click();
        sheet({ ok: true, center: true, title: '구매가 확정됐어요', sub: '적립금이 지급됐어요. 리뷰를 남기면 적립금을 더 받을 수 있어요.', actions: [{ label: '닫기' }, { label: '리뷰 쓰기', p: true, fn: function () { var rb = [].filter.call(document.querySelectorAll('.mp-order:not([style*="display: none"]) button'), function (x) { return /^리뷰 작성$/.test(x.textContent.trim()) && !x.disabled; })[0]; if (rb) rb.click(); } }] });
      } }] });
  }

  /* 교환·반품 접수 완료: 인라인 한 줄 대신 완료 시트 */
  function claimDone(no, items) {
    sheet({ ok: true, center: true, title: '교환 · 반품 신청이 접수됐어요', sub: '회수 기사님 방문 일정은 알림톡으로 안내해 드려요.',
      body: '<div class="rows" style="text-align:left"><div class="r"><span>주문번호</span><b>' + no + '</b></div><div class="r"><span>신청 상품</span><b>' + items + '</b></div></div><ul class="l"><li>상품은 <b>회수 기사님이 방문</b>해 가져가요. 포장은 그대로 두세요.</li><li>회수한 상품을 확인한 뒤 교환품을 보내거나 환불해 드려요.</li></ul>',
      actions: [{ label: '확인', p: true }] });
  }

  /* 내가 쓴 리뷰: 전체 화면 */
  function reviewsPage() {
    if (document.querySelector('.st-page')) return;
    var rs = []; try { rs = JSON.parse(localStorage.getItem('tcc_reviews') || '[]'); } catch (e) {}
    var star = function (n) { return '★★★★★'.slice(0, n) + '<span style="color:#D5D8DC">' + '★★★★★'.slice(n) + '</span>'; };
    var total = rs.reduce(function (a, r) { return a + (r.reward || 0); }, 0);
    var body = rs.length ? '<p class="sum">작성한 리뷰 <b>' + rs.length + '개</b> · 리뷰 적립 <b>' + total.toLocaleString('ko-KR') + '원</b></p>' + rs.map(function (r) {
      return '<div class="st-rv"><div class="h"><b>' + r.product + '</b><span>' + (r.date || '') + '</span></div><p class="star">' + star(r.rating || 5) + '</p><p class="tx">' + String(r.text).replace(/</g, '&lt;') + '</p>' +
        ((r.photos && r.photos.length) || r.rewardType === 'photo' ? '<div class="ph"><i></i><i></i></div>' : '') + '<p class="rw">' + (r.rewardType === 'photo' ? '포토 리뷰 ' : '텍스트 리뷰 ') + '<b>+' + (r.reward || 0).toLocaleString('ko-KR') + '원</b> 적립</p></div>';
    }).join('') : '<div class="st-empty" style="padding:56px 8px"><div class="ic"><svg viewBox="0 0 24 24"><path d="M12 3l2.6 5.6 6.1.7-4.5 4.2 1.2 6L12 16.5 6.6 19.5l1.2-6L3.3 9.3l6.1-.7z"/></svg></div><h2>아직 작성한 리뷰가 없어요</h2><p>구매를 확정하면 상품별로 리뷰를 쓸 수 있어요. 텍스트 300원, 포토·영상 1,000원이 적립돼요.</p><div class="row"><a class="p" href="mypage.html#orders">주문 · 배송 조회</a></div></div>';
    var pg = document.createElement('div'); pg.className = 'st-page'; pg.setAttribute('role', 'dialog'); pg.setAttribute('aria-label', '내가 쓴 리뷰');
    pg.innerHTML = '<div class="top"><button type="button" aria-label="뒤로">←</button><b>내가 쓴 리뷰</b><i></i></div><div class="in">' + body + '</div>';
    document.body.appendChild(pg); document.body.style.overflow = 'hidden';
    pg.querySelector('.top button').addEventListener('click', function () { pg.remove(); document.body.style.overflow = ''; });
  }

  /* 실제 동작에 끼워 넣기 (마이페이지) */
  function orderHooks() {
    document.addEventListener('click', function (e) {
      var c = e.target.closest && e.target.closest('[data-cancel]'); if (c) { e.stopImmediatePropagation(); e.preventDefault(); cancelFlow(c); return; }
      var f = e.target.closest && e.target.closest('[data-confirm]'); if (f) { if (f.dataset.stOk) { delete f.dataset.stOk; return; } e.stopImmediatePropagation(); e.preventDefault(); confirmFlow(f); return; }
      var r = e.target.closest && e.target.closest('.mp-sum-cell[data-go="myreviews"], #myreviews'); if (r) { e.stopImmediatePropagation(); e.preventDefault(); reviewsPage(); }
    }, true);
    /* 교환·반품 접수 완료 시트 */
    var sub = $('clSubmit'); if (sub) sub.addEventListener('click', function () {
      var no = ($('clNo') || {}).textContent || '';
      setTimeout(function () { var m = $('clModal'); if (m && m.hidden) { var pk = [].map.call(document.querySelectorAll('#clItems .cl-pick:checked'), function (c) { return c.dataset.name; }).join(', ') || '선택 상품'; claimDone(no.replace('주문번호', '').trim(), pk); } }, 150);
    });
    /* 리뷰 등록 완료 시트 */
    var rv = $('rvmSubmit'); if (rv) rv.addEventListener('click', function () {
      setTimeout(function () { var n = $('rvmNote'); if (n && /등록되었습니다/.test(n.textContent)) { var m = $('rvModal'); if (m) m.hidden = true; document.body.style.overflow = ''; sheet({ ok: true, center: true, title: '리뷰가 등록됐어요', sub: '적립금은 리뷰 확인 뒤 지급돼요. 상품 페이지의 리뷰에서도 볼 수 있어요.', actions: [{ label: '닫기' }, { label: '내가 쓴 리뷰 보기', p: true, fn: reviewsPage }] }); } }, 150);
    });
  }

  function ordSeed() {
    var d = new Date(), iso = function (x) { return x.toISOString().slice(0, 10); }, ago = function (n) { var x = new Date(); x.setDate(x.getDate() - n); return x; };
    var mk = function (no, dt, status, name, opt, price) { return { no: no, date: iso(dt), paidAt: dt.toISOString(), items: [{ name: name, opt: opt, qty: 1, price: price }], total: price + 3000, point: 0, pay: '신용카드', status: status, name: '김클린', addr: '서울 강서구 마곡중앙로 161-8, B동 1203호' }; };
    return [mk('20261112-1111', d, '배송 준비 중', '콜롬비아', '200g · 분쇄 안 함(홀빈)', 19900), mk('20261108-2222', ago(4), '배송 완료', '벨벳 블렌드', '200g · 일반 분쇄(핸드드립)', 16900), mk('20261020-3333', ago(23), '구매 확정', '에티오피아', '200g · 분쇄 안 함(홀빈)', 21900)];
  }
  function ordDemo() {
    var key = 'st_ord_seed';
    try {
      if (sessionStorage.getItem(key) !== st) {
        sessionStorage.setItem(key, st);
        localStorage.setItem('tcc_member', JSON.stringify({ name: '김클린', phone: '010-2345-6789', email: 'clean@example.com', spent12m: 0 }));
        localStorage.setItem('tcc_orders', JSON.stringify(ordSeed())); localStorage.setItem('tcc_claims', '{}'); localStorage.setItem('tcc_confirmed', '{}'); localStorage.setItem('tcc_subs', '[]');
        localStorage.setItem('tcc_reviews', st === 'ord-myreviews' ? JSON.stringify([
          { product: '콜롬비아', rating: 5, text: '블루베리 같은 단맛이 은은하게 올라와서 아침마다 내려 마시고 있어요. 산미가 강하지 않아 부담 없이 좋았어요.', photos: ['x', 'x'], rewardType: 'photo', reward: 1000, date: '2026.11' },
          { product: '벨벳 블렌드', rating: 4, text: '다크초콜릿 향이 진하고 고소해요. 우유를 넣어 마시니 더 잘 어울렸습니다. 다음엔 500g으로 사려고요.', photos: [], rewardType: 'text', reward: 300, date: '2026.10' }]) : '[]');
        localStorage.setItem('tcc_wish', '[]'); localStorage.setItem('tcc_demo_wish', '1'); localStorage.setItem('tcc_demo_seeded', '1');
        location.reload(); return;
      }
    } catch (e) {}
    when(function () { return document.querySelector('.tb-status5 > span') && document.querySelector('.mp-order'); }, function () {
      function openGroup(name) { var sp = document.querySelector('.tb-status5 > span[data-ord="' + name + '"]') || document.querySelectorAll('.tb-status5 > span')[name === 'done' ? 4 : 2]; if (sp) sp.click(); }
      function vis(sel, re) { return [].filter.call(document.querySelectorAll(sel), function (x) { return x.getClientRects().length && (!re || re.test(x.textContent.trim())) && !x.disabled; })[0]; }
      var oc = document.querySelector('.mp-sum-cell[data-go="orders"]'); if (oc) oc.click();
      setTimeout(function () {
        if (st === 'ord-list' || st === 'ord-confirm' || st === 'ord-confirm-done' || st === 'ord-claim' || st === 'ord-claim-done') openGroup('done');
        else if (st === 'ord-cancel' || st === 'ord-cancel-late' || st === 'ord-cancel-done') openGroup('ing');
        else if (st === 'ord-review' || st === 'ord-review-done') openGroup('done');
        setTimeout(function () {
          if (st === 'ord-cancel' || st === 'ord-cancel-done') window.__stCut = 'early';
          if (st === 'ord-cancel-late') window.__stCut = 'late';
          if (st === 'ord-cancel' || st === 'ord-cancel-late' || st === 'ord-cancel-done') { var b = vis('[data-cancel]'); if (b) b.click(); if (st === 'ord-cancel-done') setTimeout(function () { var go = document.querySelector('.st-sheet .acts .p'); if (go) go.click(); }, 300); }
          else if (st === 'ord-confirm' || st === 'ord-confirm-done') { var cb = vis('[data-confirm]'); if (cb) cb.click(); if (st === 'ord-confirm-done') setTimeout(function () { var go = document.querySelector('.st-sheet .acts .p'); if (go) go.click(); }, 300); }
          else if (st === 'ord-claim' || st === 'ord-claim-done') { var cl = vis('[data-claim]'); if (cl) cl.click();
            if (st === 'ord-claim-done') setTimeout(function () { var r = $('clReason'); if (r) { r.value = r.options[1] ? r.options[1].value : ''; r.dispatchEvent(new Event('change', { bubbles: true })); } var pick = document.querySelector('#clItems .cl-pick'); if (pick && !pick.checked) pick.click(); var t = $('clText'); if (t) t.value = '포장이 뜯겨 있고 원두가 새어 나왔어요.'; $('clSubmit').click(); }, 400); }
          else if (st === 'ord-review' || st === 'ord-review-done') { var rb = vis('.mp-order button', /^리뷰 작성$/); if (rb) rb.click();
            if (st === 'ord-review-done') setTimeout(function () { var star = document.querySelector('#rvmPick button[data-v="5"]'); if (star) star.click(); $('rvmText').value = '블루베리 같은 단맛이 은은하게 올라와서 아침마다 내려 마시고 있어요. 산미가 강하지 않아 부담 없이 좋았습니다.'; $('rvmSubmit').click(); }, 400); }
          else if (st === 'ord-myreviews') reviewsPage();
        }, 700);
      }, 600);
    }, 7000);
  }

  /* 비회원 주문 조회 결과 */
  function lookupResult() {
    var now = new Date();
    var o = { no: '20261112-5555', date: now.toISOString().slice(0, 10), paidAt: now.toISOString(), items: [{ name: '콜롬비아', opt: '200g · 분쇄 안 함(홀빈)', qty: 1, price: 19900 }], total: 22900, pay: '신용카드', status: '배송 준비 중', guest: true, phone: '010-1234-5678', guestPw: '1234', name: '김클린', addr: '서울 강서구 마곡중앙로 161-8, B동 1203호' };
    try { localStorage.setItem('tcc_orders', JSON.stringify([o])); } catch (e) {}
    when(function () { return $('olNo') && $('olBtn'); }, function () { $('olNo').value = o.no; $('olTel').value = '010-1234-5678'; $('olPw').value = '1234'; $('olBtn').click(); }, 4000);
  }


  /* ───────── 9. 품절 · 재입고 알림 · 쿠폰 최소 금액 · 적립금 한도 ───────── */
  css.textContent +=
    '.st-so-tag{display:inline-block;margin-left:6px;padding:1px 6px;border:1px solid var(--hair,#E6E4DE);font-style:normal;font-size:10.5px;letter-spacing:.08em;color:var(--mist,#8A9099);vertical-align:2px}' +
    '.st-so-card .cart-ph,.st-so-card .cv2-cart{display:none!important}.st-so-card .imgbox img,.st-so-card .ch-img img{filter:grayscale(.35);opacity:.7}' +
    '.st-so-badge{position:absolute;left:12px;top:12px;z-index:3;padding:5px 10px;background:var(--ink,#111921);color:#fff;font-size:11px;letter-spacing:.14em;font-weight:700}' +
    '.st-so-note{margin:14px 0 0;padding:14px;background:#F4F3F0;border-radius:8px;font-size:13.5px;line-height:1.6;color:var(--ink,#111921);word-break:keep-all}.st-so-note b{display:block;font-size:14.5px}.st-so-note p{margin:4px 0 0;color:var(--slate,#454C55);font-size:13px}' +
    '.st-so-btn{opacity:.4;pointer-events:none}' +
    '.st-sheet .chk{display:flex;gap:10px;align-items:flex-start;margin-top:14px;font-size:13px;line-height:1.55;color:var(--slate,#454C55);word-break:keep-all}.st-sheet .chk input{width:20px;height:20px;margin:1px 0 0;flex:none;accent-color:var(--ink,#111921)}' +
    '.ct-item.st-so-row{opacity:1}.ct-item.st-so-row .ct-thumb,.ct-item.st-so-row .ct-info>b,.ct-item.st-so-row .ct-info>span{opacity:.5}.st-so-msg{margin:6px 0 0;font-size:12.5px;color:#8A2A1F;line-height:1.5;word-break:keep-all}' +
    '.st-hint{margin:6px 0 0;font-size:12.5px;line-height:1.5;color:#2F6A8A;word-break:keep-all}.st-hint.bad{color:#C0392B}';

  function nameLike(re) { return function (el) { return re.test(el.textContent); }; }

  /* 1) 품절 상품 카드 (컬렉션) */
  function soldoutList() {
    when(function () { return document.querySelector('.item.cv-host, .item'); }, function () {
      var marks = ['product-siesta.html', 'product-png-decaf.html'];
      function apply() {
        [].forEach.call(document.querySelectorAll('.item'), function (it) {
          var a = it.matches('a') ? it : it.querySelector('a[href]'); var h = ((a && a.getAttribute('href')) || '').split('#')[0].split('?')[0].split('/').pop();
          if (marks.indexOf(h) < 0 || it.classList.contains('st-so-card')) return;
          it.classList.add('st-so-card', 'is-soldout');
          var box = it.querySelector('.imgbox'); if (box) { box.style.position = 'relative'; var b = document.createElement('span'); b.className = 'st-so-badge'; b.textContent = '품절'; box.appendChild(b); }
          var nm = it.querySelector('.cap h4'); if (nm) { var t = document.createElement('em'); t.className = 'st-so-tag'; t.textContent = '재입고 예정'; nm.appendChild(t); }
        });
      }
      apply(); var n = 0; (function l() { apply(); if (++n < 12) setTimeout(l, 400); })();
      setTimeout(function () { var c = document.querySelector('.st-so-card'); if (c) window.scrollTo(0, Math.max(0, c.getBoundingClientRect().top + window.scrollY - 140)); }, 900);
    }, 6000);
  }

  /* 2) 품절 상품 상세 · 재입고 알림 */
  function restockSheet() {
    var mem = null; try { mem = JSON.parse(localStorage.getItem('tcc_member') || 'null'); } catch (e) {}
    var sh = sheet({ title: '재입고 알림 받기', sub: '다시 구매할 수 있게 되면 알림톡으로 알려 드려요.',
      body: '<div class="f"><label for="stRp">휴대폰 번호</label><input id="stRp" type="tel" inputmode="numeric" placeholder="010-0000-0000" value="' + ((mem && mem.phone) || '') + '"></div>' +
        '<label class="chk"><input type="checkbox" id="stRc"><span>재입고 알림톡 수신에 동의합니다. 재입고 안내 후 번호는 지체 없이 파기해요.</span></label>',
      actions: [{ label: '닫기' }, { label: '알림 신청하기', p: true }] });
    var go = sh.el.querySelector('.acts .p'); var clone = go.cloneNode(true); go.parentNode.replaceChild(clone, go);
    clone.addEventListener('click', function () {
      var ph = $('stRp'), ck = $('stRc'), f = ph.closest('.f'), pe = f.querySelector('.st-err');
      var ok = /^01\d{8,9}$/.test(ph.value.replace(/\D/g, ''));
      if (!ok) { f.classList.add('st-bad'); if (!pe) { pe = document.createElement('p'); pe.className = 'st-err'; f.appendChild(pe); } pe.textContent = '휴대폰 번호를 다시 확인해 주세요.'; return; }
      f.classList.remove('st-bad'); if (pe) pe.remove();
      if (!ck.checked) { var ce = sh.el.querySelector('.st-err.c'); if (!ce) { ce = document.createElement('p'); ce.className = 'st-err c'; sh.el.querySelector('.chk').insertAdjacentElement('afterend', ce); } ce.textContent = '알림톡 수신에 동의해 주세요.'; return; }
      restockDone();
    });
  }
  function restockDone() {
    sheet({ ok: true, center: true, title: '재입고 알림을 신청했어요', sub: '다시 구매할 수 있게 되면 알림톡으로 알려 드려요.', actions: [{ label: '다른 원두 둘러보기', fn: function () { location.href = 'collection.html'; } }, { label: '확인', p: true }] });
  }
  function soldoutDetail() {
    var openNow = st === 'restock', doneNow = st === 'restock-done';
    when(function () { return document.querySelector('.m-buybar .mb-buy') && document.querySelector('h1, .pd-buy-title'); }, function () {
      var bar = document.querySelector('.m-buybar'), cart = bar.querySelector('.mb-cart'), buy = bar.querySelector('.mb-buy');
      if (cart) cart.textContent = '재입고 알림 받기';
      if (buy) { buy.textContent = '일시 품절'; buy.classList.add('st-so-btn'); buy.disabled = true; }
      bar.addEventListener('click', function (e) { var c = e.target.closest('.mb-cart'); var b2 = e.target.closest('.mb-buy'); if (c || b2) { e.stopImmediatePropagation(); e.preventDefault(); if (c) restockSheet(); } }, true);
      var h = document.querySelector('.pd-hero h1, .pd-buy-title, h1');
      if (h && !document.querySelector('.st-so-note')) { var n = document.createElement('div'); n.className = 'st-so-note'; n.innerHTML = '<b>지금은 구매할 수 없어요</b><p>일시 품절된 상품이에요. 재입고되면 알림톡으로 알려 드릴게요.</p>'; (h.closest('.pd-title-row, .pd-head') || h).insertAdjacentElement('afterend', n); }
      [].forEach.call(document.querySelectorAll('.pd-sub-link, .m-sheet, .m-sheet-bg'), function (x) { x.style.display = 'none'; });
      window.scrollTo(0, 0);
      if (openNow) setTimeout(restockSheet, 400);
      if (doneNow) setTimeout(restockDone, 400);
    }, 7000);
  }

  /* 3) 장바구니에 품절 상품 */
  function cartSoldout() {
    try {
      if (sessionStorage.getItem('st_cart_so') !== '1') {
        sessionStorage.setItem('st_cart_so', '1');
        localStorage.setItem('tcc_member', JSON.stringify({ name: '김클린', phone: '010-2345-6789', email: 'clean@example.com', spent12m: 0 }));
        localStorage.setItem('tcc_cart', JSON.stringify([{ name: '콜롬비아', opt: '200g · 분쇄 안 함(홀빈)', qty: 1, price: 19900 }, { name: '시에스타 · 하프카페인 블렌드', opt: '200g · 분쇄 안 함(홀빈)', qty: 1, price: 18900 }]));
        localStorage.setItem('tcc_sub_cart', '[]'); localStorage.setItem('tcc_demo_seeded', '1');
        location.reload(); return;
      }
    } catch (e) {}
    when(function () { return document.querySelectorAll('.ct-item').length >= 2 && $('ctOrder'); }, function () {
      var rows = [].filter.call(document.querySelectorAll('.ct-item'), function (r) { return /시에스타/.test(r.textContent); });
      rows.forEach(function (r) {
        r.classList.add('st-so-row');
        var nm = r.querySelector('.ct-info > b'); if (nm && !r.querySelector('.st-so-tag')) { var t = document.createElement('em'); t.className = 'st-so-tag'; t.textContent = '품절'; nm.appendChild(t); }
        var q = r.querySelector('.ct-qty'); if (q) { q.style.display = 'none'; var m = document.createElement('p'); m.className = 'st-so-msg'; m.textContent = '지금은 주문할 수 없어요. 삭제하거나 재입고 알림을 받아 보세요.'; q.insertAdjacentElement('afterend', m); }
      });
      var first = document.querySelector('.ct-item'); var banner = document.createElement('div'); banner.className = 'st-banner'; banner.setAttribute('role', 'alert');
      banner.innerHTML = '<b>품절된 상품이 있어요</b><br>품절 상품을 삭제하면 나머지 상품을 주문할 수 있어요.'; first.parentNode.insertBefore(banner, first);
      var ob = $('ctOrder'); ob.style.opacity = '.4'; ob.style.pointerEvents = 'none'; ob.setAttribute('aria-disabled', 'true');
      [].forEach.call(document.querySelectorAll('a,button'), function (x) { if (x !== ob && /^주문하기/.test(x.textContent.trim())) { x.style.opacity = '.4'; x.style.pointerEvents = 'none'; x.setAttribute('aria-disabled', 'true'); } });
      var hint = document.createElement('p'); hint.className = 'st-so-msg'; hint.style.textAlign = 'center'; hint.textContent = '품절 상품을 삭제하면 주문할 수 있어요.'; ob.insertAdjacentElement('afterend', hint);
      window.scrollTo(0, 0);
    }, 6000);
  }

  /* 4) 쿠폰 최소 금액 미달 · 5) 적립금 한도 */
  function won(n) { return (n || 0).toLocaleString('ko-KR') + '원'; }
  function subTotal() { try { return TCC.read().reduce(function (a, i) { return a + (i.price || 0) * (i.qty || 1); }, 0); } catch (e) { return 0; } }
  function couponHints() {
    when(function () { return document.querySelectorAll('#ckCoupons input[type=radio]').length > 1; }, function () {
      var sub = subTotal();
      [].forEach.call(document.querySelectorAll('#ckCoupons input[disabled]'), function (inp) {
        var lab = inp.closest('label'), m = (lab.textContent.match(/([\d,]+)원 이상 구매 시 사용 가능/) || [])[1]; if (!m || lab.querySelector('.st-hint')) return;
        var need = parseInt(m.replace(/,/g, ''), 10) - sub; if (need <= 0) return;
        var box = lab.querySelector('span span.mp-muted') || lab.querySelector('span'); var p = document.createElement('p'); p.className = 'st-hint'; p.textContent = won(need) + ' 더 담으면 쓸 수 있어요'; box.parentNode.appendChild(p);
        var em = lab.querySelector('em'); if (em && /이상 구매 시/.test(em.textContent)) em.remove();
      });
      lab0 = null;
    }, 6000);
  }
  var lab0;
  function pointHints() {
    when(function () { return $('ckPoint'); }, function () {
      var inp = $('ckPoint'), BAL = parseInt(inp.getAttribute('max') || '0', 10) || 0, field = inp.closest('.ck-field') || inp.parentNode;
      var msg = document.createElement('p'); msg.className = 'st-hint'; msg.setAttribute('role', 'status'); field.appendChild(msg);
      function check() {
        if (inp.dataset.stClamp) { delete inp.dataset.stClamp; return; }   /* 한도로 맞춘 직후 다시 들어오는 입력 이벤트는 건너뜀 */
        var v = parseInt(inp.value || '0', 10) || 0;
        if (inp.disabled) { msg.className = 'st-hint'; msg.textContent = '적립금은 5,000원 이상 모이면 사용할 수 있어요.'; return; }
        var cap = Math.min(BAL, Math.max(0, subTotal() + 3000));
        if (v > BAL) { msg.className = 'st-hint bad'; msg.textContent = '보유 적립금 ' + won(BAL) + '까지 사용할 수 있어요. ' + won(BAL) + '으로 맞췄어요.'; inp.dataset.stClamp = '1'; inp.value = BAL; inp.dispatchEvent(new Event('input', { bubbles: true })); }
        else if (v > 0) { msg.className = 'st-hint'; msg.textContent = won(v) + ' 사용해요. 남는 적립금은 ' + won(BAL - v) + '이에요.'; }
        else msg.textContent = '';
      }
      inp.addEventListener('input', check);
      if (st === 'points-over') { inp.value = 99999; inp.dispatchEvent(new Event('input', { bubbles: true })); }
      if (st === 'points-low') { inp.disabled = true; inp.value = 0; var lb = document.querySelector('label[for="ckPoint"] .mp-muted'); if (lb) lb.textContent = '(보유 3,200원 · 5,000원 이상 모이면 사용 가능)'; check(); }
      if (st === 'points-over' || st === 'points-low') [800, 1800, 3200].forEach(function (ms) { setTimeout(function () { var t = $('ckPoint'); t = t && (t.closest('.mp-card') || t); if (t) window.scrollTo(0, Math.max(0, t.getBoundingClientRect().top + window.scrollY - 200)); }, ms); });
    }, 6000);
  }
  function checkoutDemo() {
    var key = 'st_ck_seed';
    try {
      if (sessionStorage.getItem(key) !== st) {
        sessionStorage.setItem(key, st);
        localStorage.setItem('tcc_member', JSON.stringify({ name: '김클린', phone: '010-2345-6789', email: 'clean@example.com', spent12m: 0, zip: '07807', addr: '서울 강서구 마곡중앙로 161-8', addr2: 'B동 1203호' }));
        localStorage.setItem('tcc_cart', JSON.stringify(st === 'points-over' || st === 'points-low' ? [{ name: '콜롬비아', opt: '200g · 분쇄 안 함(홀빈)', qty: 3, price: 19900 }] : [{ name: '콜롬비아', opt: '200g · 분쇄 안 함(홀빈)', qty: 1, price: 19900 }]));
        localStorage.setItem('tcc_demo_seeded', '1'); location.reload(); return;
      }
    } catch (e) {}
    if (st === 'coupon-min') when(function () { return $('ckCoupons') && document.querySelectorAll('#ckCoupons input[disabled]').length; }, function () { setTimeout(function () { var c = $('ckCoupons'); if (c) window.scrollTo(0, Math.max(0, c.getBoundingClientRect().top + window.scrollY - 140)); }, 500); }, 6000);
  }


  /* ───────── 10. 회원 탈퇴 · 휴면 계정 ───────── */
  function blockers() {
    var o = 0, sb = 0;
    try { o = JSON.parse(localStorage.getItem('tcc_orders') || '[]').filter(function (x) { return /결제 완료|배송 준비 중|배송 중/.test(x.status || ''); }).length; } catch (e) {}
    try { sb = JSON.parse(localStorage.getItem('tcc_subs') || '[]').filter(function (x) { return x.status === '진행 중'; }).length; } catch (e) {}
    return { o: o, sb: sb };
  }
  function leaveFlow(force) {
    var bl = blockers(); if (force === 'blocked' && !bl.o && !bl.sb) bl = { o: 1, sb: 1 };
    if (force !== 'free' && (bl.o || bl.sb)) {
      sheet({ title: '지금은 탈퇴할 수 없어요', sub: '진행 중인 주문이나 정기배송이 끝나야 탈퇴할 수 있어요.',
        body: '<ul class="l">' + (bl.o ? '<li><b>진행 중인 주문 ' + bl.o + '건</b> · 배송이 끝난 뒤에 탈퇴할 수 있어요.</li>' : '') + (bl.sb ? '<li><b>진행 중인 정기배송 ' + bl.sb + '건</b> · 해지한 뒤에 탈퇴할 수 있어요.</li>' : '') + '</ul>',
        actions: [{ label: '닫기' }, { label: bl.sb && !bl.o ? '정기배송 관리' : '주문 · 배송 조회', p: true, fn: function () { var c = document.querySelector('.mp-sum-cell[data-go="' + (bl.sb && !bl.o ? 'subs' : 'orders') + '"]') || $(bl.sb && !bl.o ? 'subs' : 'orders'); if (c) c.click(); } }] });
      return;
    }
    function cell(k) { var c = document.querySelector('.mp-sum-cell[data-go="' + k + '"] b'); return c ? c.textContent.trim() : ''; }
    var pts = cell('points') || '0원', cps = cell('coupons') || '0장';
    var sh = sheet({ title: '정말 탈퇴할까요?', sub: '탈퇴하면 되돌릴 수 없어요. 아래 내용을 꼭 확인해 주세요.',
      body: '<div class="rows" style="margin-top:12px"><div class="r"><span>적립금</span><b>' + pts + ' 사라져요</b></div><div class="r"><span>쿠폰</span><b>' + cps + ' 사라져요</b></div><div class="r"><span>리저브 클럽 등급 · 실적</span><b>사라져요</b></div><div class="r"><span>작성한 리뷰</span><b>남아요</b></div></div>' +
        '<ul class="l"><li>사라진 적립금과 쿠폰은 <b>복구되지 않아요.</b> 쓸 수 있는 혜택은 탈퇴 전에 사용해 주세요.</li><li>개인정보는 바로 삭제되고, 구매 기록은 법령에 따라 <b>5년간</b> 보관돼요.</li></ul>' +
        '<label class="chk"><input type="checkbox" id="stLv"><span>위 내용을 확인했고 탈퇴에 동의합니다.</span></label>',
      actions: [{ label: '돌아가기', p: true }, { label: '탈퇴하기' }] });
    var go = sh.el.querySelectorAll('.acts button')[1], clone = go.cloneNode(true); go.parentNode.replaceChild(clone, go);
    clone.addEventListener('click', function () {
      if (!$('stLv').checked) { var e = sh.el.querySelector('.st-err.c'); if (!e) { e = document.createElement('p'); e.className = 'st-err c'; sh.el.querySelector('.chk').insertAdjacentElement('afterend', e); } e.textContent = '탈퇴 동의에 체크해 주세요.'; return; }
      sh.off();
      if (!force) { try { TCC.logout(); } catch (e) {} }
      sheet({ ok: true, center: true, title: '탈퇴가 완료됐어요', sub: '그동안 더클린커피를 이용해 주셔서 감사합니다. 다시 만나 뵐 수 있으면 좋겠어요.', actions: [{ label: '홈으로', p: true, fn: function () { location.href = 'home.html'; } }] });
    });
  }
  function leaveHook() {
    document.addEventListener('click', function (e) { var b = e.target.closest && e.target.closest('#acLeave'); if (b) { e.stopImmediatePropagation(); e.preventDefault(); leaveFlow(); } }, true);
  }
  function leaveDemo() {
    var key = 'st_leave_seed';
    try {
      if (sessionStorage.getItem(key) !== st) {
        sessionStorage.setItem(key, st);
        localStorage.setItem('tcc_member', JSON.stringify({ name: '김클린', phone: '010-2345-6789', email: 'clean@example.com', spent12m: 0 }));
        localStorage.setItem('tcc_orders', st === 'leave-blocked' ? JSON.stringify(ordSeed().slice(0, 1)) : '[]');
        localStorage.setItem('tcc_subs', st === 'leave-blocked' ? JSON.stringify(seedSubs('sub-manage')) : '[]'); localStorage.setItem('tcc_claims', '{}');
        localStorage.setItem('tcc_wish', '[]'); localStorage.setItem('tcc_demo_wish', '1'); localStorage.setItem('tcc_demo_seeded', '1');
        location.reload(); return;
      }
    } catch (e) {}
    when(function () { return $('acLeave') && document.querySelector('.mp-sum-cell[data-go]'); }, function () {
      setTimeout(function () {
        window.scrollTo(0, 0);
        if (st === 'leave-blocked') leaveFlow('blocked');
        else if (st === 'leave') leaveFlow('free');
        else { leaveFlow('free'); setTimeout(function () { var c = document.getElementById('stLv'); if (c) c.checked = true; var b = document.querySelectorAll('.st-sheet .acts button')[1]; if (b) b.click(); }, 300); }
      }, 600);
    }, 7000);
  }

  var DORM_CSS = '.st-form .f{margin-top:12px;text-align:left}.st-form label{display:block;margin-bottom:6px;font-size:12px;font-weight:700;color:var(--ink,#111921)}.st-form .row2{display:flex;gap:8px}.st-form input{width:100%;box-sizing:border-box;height:48px;padding:0 14px;border:1px solid var(--hair,#E6E4DE);border-radius:6px;font:inherit;font-size:15px}.st-form .row2 button{flex:none;padding:0 14px;height:48px;border:1px solid var(--ink,#111921);background:#fff;border-radius:6px;font:inherit;font-size:13.5px;font-weight:600;cursor:pointer}.st-form .f.st-bad input{border-color:#E04B3C}.st-form .go{margin-top:16px;width:100%;height:54px;border:0;border-radius:8px;background:var(--ink,#111921);color:#fff;font:inherit;font-size:16px;font-weight:600;cursor:pointer}';
  function dormant() {
    css.textContent += DORM_CSS;
    when(function () { return document.querySelector('.acc-card') && $('lgBtn'); }, function () {
      var card = document.querySelector('.acc-card');
      [].forEach.call(card.children, function (c) { c.style.display = 'none'; });
      var d = document.createElement('div'); d.className = 'st-result st-form';
      var MOON = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z"/></svg>';
      if (st === 'dormant-done') {
        d.innerHTML = '<div class="ic">' + CHECKSVG + '</div><h2>휴면이 해제됐어요</h2><p>이용 정보가 다시 제공돼요. 다시 만나서 반가워요.</p><div class="row"><a class="p" href="home.html">홈으로</a><a class="s" href="mypage.html">마이페이지</a></div>';
      } else {
        d.innerHTML = '<div class="ic">' + MOON + '</div><h2>휴면 계정이에요</h2><p>최근 12개월 동안 이용하지 않아 개인정보를 분리해 보관하고 있어요. 본인 확인을 하면 바로 다시 이용할 수 있어요.</p>' +
          '<div class="id">cle****@gmail.com<small>마지막 이용 2025.10.03</small></div>' +
          '<div class="f"><label for="dmTel">휴대폰 번호</label><div class="row2"><input id="dmTel" type="tel" inputmode="numeric" value="010-****-6789" readonly><button type="button" id="dmSend">인증번호 받기</button></div></div>' +
          '<div class="f"><label for="dmCode">인증번호</label><input id="dmCode" inputmode="numeric" maxlength="6" placeholder="인증번호 6자리"></div>' +
          '<button type="button" class="go" id="dmGo">휴면 해제하고 로그인</button>' +
          '<div class="row" style="margin-top:12px"><a class="s" href="login.html">다른 계정으로 로그인</a></div>';
      }
      card.insertBefore(d, card.firstChild);
      /* 로그인 화면의 다른 요소가 나중에 다시 붙어도 계속 숨김 */
      var hn = 0; (function hide() { [].forEach.call(card.children, function (c) { if (c !== d) c.style.display = 'none'; }); [].forEach.call(document.querySelectorAll('.tb-sns2, .tb-lg-side, #lgSocial'), function (c) { c.style.display = 'none'; }); if (++hn < 14) setTimeout(hide, 300); })();
      var send = $('dmSend'); if (send) send.addEventListener('click', function () { send.textContent = '다시 받기'; var f = $('dmCode').closest('.f'), p = f.querySelector('.st-err'); if (p) p.remove(); var h = document.createElement('p'); h.className = 'sub'; h.style.cssText = 'margin:6px 0 0;font-size:12.5px;color:var(--slate,#454C55);text-align:left'; h.textContent = '인증번호를 보냈어요. 3분 안에 입력해 주세요.'; f.appendChild(h); });
      var go = $('dmGo'); if (go) go.addEventListener('click', function () {
        var f = $('dmCode').closest('.f'), p = f.querySelector('.st-err');
        if (!/^\d{6}$/.test($('dmCode').value)) { f.classList.add('st-bad'); if (!p) { p = document.createElement('p'); p.className = 'st-err'; f.appendChild(p); } p.textContent = '인증번호 6자리를 입력해 주세요.'; return; }
        location.search = '?state=dormant-done';
      });
    }, 5000);
  }


  /* ───────── 11. 사업자(B2B) 승인 상태 · 신청 접수 · 주문 접수 ───────── */
  function bizSeed(status) {
    var ok = status === 'approved';
    var acc = { corp: ok ? '카페 모노' : '모닝빈 카페', ceo: '서○○', bizNo: ok ? '412-22-18800' : '220-81-33917', bizType: '카페', name: '담당자', tel: '010-0000-0000', email: 'demo@example.com', zip: '07807', addr: '서울 강서구 마곡중앙로 161-8', addr2: '1층', status: status, certName: '사업자등록증.pdf', demo: true };
    try { var all = JSON.parse(localStorage.getItem('tcc_biz_accounts') || '{}'); all[acc.bizNo.replace(/[^0-9]/g, '')] = acc; localStorage.setItem('tcc_biz_accounts', JSON.stringify(all)); localStorage.setItem('tcc_biz_member', JSON.stringify(acc)); } catch (e) {}
  }
  function bizApplied() {
    css.textContent += '.st-steps{margin:18px 0 0;padding:0;list-style:none;text-align:left;counter-reset:s}.st-steps li{position:relative;padding:0 0 18px 38px;font-size:13.5px;line-height:1.55;color:var(--slate,#454C55);word-break:keep-all}.st-steps li b{display:block;color:var(--ink,#111921);font-size:14px}' +
      '.st-steps li::before{counter-increment:s;content:counter(s);position:absolute;left:0;top:0;width:26px;height:26px;border-radius:50%;background:var(--ink,#111921);color:#fff;font-size:12.5px;font-weight:700;display:flex;align-items:center;justify-content:center}.st-steps li::after{content:"";position:absolute;left:12px;top:30px;bottom:4px;width:2px;background:var(--hair,#E6E4DE)}.st-steps li:last-child{padding-bottom:0}.st-steps li:last-child::after{display:none}';
    when(function () { return document.getElementById('bzApplied') || document.querySelector('.bz-status') || document.querySelector('main, .acc-wrap, .bz-wrap'); }, function () {
      var old = document.getElementById('bzApplied'); if (old) old.hidden = true;
      var host = (old && old.parentNode) || document.querySelector('.bz-wrap, .acc-wrap, main') || document.body;
      var d = document.createElement('div'); d.className = 'st-result st-form'; d.style.cssText = 'max-width:520px;margin:0 auto;padding:28px 20px';
      d.innerHTML = '<div class="ic">' + CHECKSVG + '</div><h2>사업자 등록 신청이 접수됐어요</h2><p>사업자등록증을 확인한 뒤 결과를 이메일로 알려 드려요.</p>' +
        '<ol class="st-steps"><li><b>신청 접수</b>지금 접수가 끝났어요.</li><li><b>사업자 확인 · 영업일 3일 이내</b>제출하신 사업자등록증을 확인해요.</li><li><b>결과 안내</b>승인되면 전용 단가 적용을 이메일로 알려 드려요.</li></ol>' +
        '<div class="row"><a class="p" href="#bzLogin" id="stBizGo">로그인해서 둘러보기</a><a class="s" href="home.html">홈으로</a></div>';
      host.insertBefore(d, old ? old : host.firstChild);
      var go = $('stBizGo'); if (go) go.addEventListener('click', function (e) { e.preventDefault(); var f = document.querySelector('input[type=text], input[type=tel]'); d.style.display = 'none'; });
      window.scrollTo(0, 0);
    }, 5000);
  }
  function bizResubmit() {
    var sh = sheet({ title: '서류 다시 올리기', sub: '사업자등록증을 다시 올리면 영업일 3일 이내에 다시 확인해요.',
      body: '<div class="f"><label for="stBz">사업자등록증 (이미지 · PDF)</label><input id="stBz" type="file" accept="image/*,.pdf"></div><div class="f"><label for="stBm">수정한 내용 <span style="font-weight:500;color:var(--mist,#8A9099)">· 선택</span></label><input id="stBm" type="text" placeholder="예: 대표자명을 사업자등록증과 같게 고쳤어요"></div>',
      actions: [{ label: '취소' }, { label: '다시 신청하기', p: true }] });
    var go = sh.el.querySelectorAll('.acts button')[1], clone = go.cloneNode(true); go.parentNode.replaceChild(clone, go);
    clone.addEventListener('click', function () {
      var f = $('stBz'), box = f.closest('.f'), pe = box.querySelector('.st-err');
      if (!(f.files && f.files.length) && !window.__stFile) { box.classList.add('st-bad'); if (!pe) { pe = document.createElement('p'); pe.className = 'st-err'; box.appendChild(pe); } pe.textContent = '사업자등록증을 올려 주세요.'; return; }
      sh.off(); bizResubmitDone();
    });
    return sh;
  }
  function bizResubmitDone() {
    var m = null; try { m = JSON.parse(localStorage.getItem('tcc_biz_member') || 'null'); if (m) { m.status = 'pending'; localStorage.setItem('tcc_biz_member', JSON.stringify(m)); } } catch (e) {}
    var fb = document.querySelector('.st-fail'); if (fb) fb.remove();
    var bs = $('bmStatus'); if (bs) { bs.textContent = '사업자 확인 중 · 영업일 3일 이내'; bs.style.color = ''; bs.style.borderColor = ''; } var ss = $('bmSumStatus'); if (ss) ss.textContent = '확인 중';
    sheet({ ok: true, center: true, title: '다시 신청이 접수됐어요', sub: '영업일 3일 이내에 다시 확인하고, 결과를 이메일로 알려 드려요.', actions: [{ label: '확인', p: true }] });
  }
  function bizDemo() {
    var want = st === 'approved' ? 'approved' : (st === 'rejected' || st === 'resubmit' || st === 'resubmit-done') ? 'rejected' : 'pending';
    var key = 'st_biz_seed';
    try {
      if (sessionStorage.getItem(key) !== st) { sessionStorage.setItem(key, st); bizSeed(want === 'rejected' ? 'pending' : want); localStorage.setItem('tcc_biz_orders', '[]'); localStorage.setItem('tcc_biz_cart', '[]'); location.reload(); return; }
    } catch (e) {}
    when(function () { return $('bmStatus') && $('bmSumStatus'); }, function () {
      var bs = $('bmStatus');
      if (want === 'rejected') {
        bs.textContent = '사업자 확인 필요'; bs.style.color = RED; bs.style.borderColor = RED; $('bmSumStatus').textContent = '확인 필요';
        var box = document.createElement('div'); box.className = 'st-fail'; box.setAttribute('role', 'alert'); box.style.cssText = 'margin:0 0 16px';
        box.innerHTML = '<b>사업자 확인이 완료되지 않았어요</b><p>사유: 사업자등록증의 대표자명과 입력하신 대표자명이 달라요.<br>서류를 다시 올려 주시면 영업일 3일 이내에 다시 확인해요.</p><button type="button">서류 다시 올리기</button>';
        var anchor = bs.closest('.bm-head, .bm-top, header, section') || bs.parentElement; anchor.insertAdjacentElement('afterend', box);
        box.querySelector('button').addEventListener('click', bizResubmit);
        if (st === 'resubmit') setTimeout(bizResubmit, 500);
        if (st === 'resubmit-done') setTimeout(function () { window.__stFile = true; bizResubmitDone(); }, 500);
      } else if (want === 'approved') {
        setTimeout(function () { sheet({ ok: true, center: true, title: '사업자 확인이 완료됐어요', sub: '이제 전용 단가로 주문할 수 있어요. 납품 가능 품목에서 단가를 확인해 보세요.', actions: [{ label: '닫기' }, { label: '납품 가능 품목 보기', p: true, fn: function () { var a = document.querySelector('a[href="#catalog"], [data-tab="catalog"], #bmCatalogTab'); if (a) a.click(); } }] }); }, 600);
      }
      window.scrollTo(0, 0);
    }, 6000);
  }
  function bizOrderDone() {
    bizSeed('approved');
    when(function () { return $('bcDone') && $('bcMain'); }, function () {
      $('bcMain').hidden = true; $('bcDone').hidden = false;
      var no = 'B' + new Date().toISOString().slice(0, 10).replace(/-/g, '') + '-0123'; $('bcDoneTxt').innerHTML = '주문번호 <b style="color:var(--ink)">' + no + '</b> · 품목 2건 · 412,500원<br>납품 일정은 등록하신 이메일로 안내드립니다.';
      window.scrollTo(0, 0);
    }, 5000);
  }

  /* 분기 */
  if (page === 'mypage') { when(function () { return $('clSubmit') && $('rvmSubmit'); }, orderHooks, 6000); when(function () { return $('acLeave'); }, leaveHook, 6000); }
  if (page === 'mypage') { when(function () { return $('clSubmit') && $('rvmSubmit'); }, orderHooks, 6000); when(function () { return $('acLeave'); }, leaveHook, 6000); }
  if (page === 'login' && st === 'fail') loginFail();
  else if (page === 'login' && /^dormant/.test(st)) dormant();
  else if (page === 'signup') { when(function () { return $('suSubmit'); }, signupLive, 4000); if (st === 'error') signupError(); else if (st === 'code') signupCode(); }
  else if (page === 'find-account' && st) findAccount();
  else if (page === 'mypage' && st === 'new') mypageNew();
  else if (page === 'mypage' && /^sub-/.test(st)) subDemo();
  else if (page === 'mypage' && /^ord-/.test(st)) ordDemo();
  else if (page === 'mypage' && /^leave/.test(st)) leaveDemo();
  else if (page === 'business-mypage' && /^(pending|rejected|resubmit|resubmit-done|approved)$/.test(st)) bizDemo();
  else if (page === 'business-cart' && st === 'order-done') bizOrderDone();
  else if (page === 'business-login' && (st === 'applied' || /[?&]applied=1/.test(location.search))) bizApplied();
  else if (page === 'order-lookup' && st === 'result') lookupResult();
  else if (page === 'collection' && st === 'soldout') soldoutList();
  else if (page === 'cart' && st === 'soldout') cartSoldout();
  else if (/^product-/.test(page) && /^(soldout|restock|restock-done)$/.test(st)) soldoutDetail();
  else if (page === 'checkout') { if (/^(coupon-min|points-over|points-low)$/.test(st)) checkoutDemo(); else checkoutEmpty(); couponHints(); pointHints(); }
  else if (page === 'order-complete') orderNone();
})();
