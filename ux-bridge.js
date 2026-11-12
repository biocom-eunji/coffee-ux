/* 더클린커피 UX 개선안 · 화면 브리지
   iframe 안의 사이트 화면(asis-*.html, tobe-*.html)에서 돌아가며
   ① ux-pins.js의 점(핫스팟)을 화면에 붙이고
   ② 링크 이동·눌림·스크롤을 부모 페이지에 알려 AS-IS와 TO-BE가 같이 움직이게 한다. */
(function () {
  var m = location.pathname.match(/(asis|tobe)-([a-z0-9-]+)\.html$/);
  if (!m || window.parent === window) return;
  var VARIANT = m[1], PAGE = m[2];
  var COLOR = VARIANT === 'asis' ? '#C4553F' : '#3FAFD3';
  /* 핀은 화면 폭에 따라 다른 묶음을 씁니다: 모바일(≤900px)은 UX_PINS, PC는 UX_PINS_PC */
  function isPC() { return window.innerWidth > 900; }
  /* 예외 상태 화면(?state=…)은 일반 화면과 다른 핀 묶음('x-' + 화면 이름)을 씀 */
  var STATE = (location.search.match(/[?&]state=([a-z0-9-]+)/) || [])[1] || '';
  function curPins() {
    var src = (isPC() ? window.UX_PINS_PC : window.UX_PINS) || {};
    /* 상태 화면은 'x-화면:상태' → 'x-화면' → 화면 순서로 핀 묶음을 찾음 */
    var set = STATE ? (src['x-' + PAGE + ':' + STATE] || src['x-' + PAGE]) : src[PAGE];
    return (set || {})[VARIANT] || [];
  }
  var pins = curPins(), mode = isPC();
  var mirroring = false, ignoreScrollUntil = 0, active = 0;

  function send(msg) { msg.src = 'ux'; msg.variant = VARIANT; msg.page = PAGE; window.parent.postMessage(msg, '*'); }

  /* ---------- 점 ---------- */
  var css = document.createElement('style');
  css.textContent =
    '.plumb{display:none!important}' +
    '.uxpin{position:absolute;z-index:3;width:14px;height:14px;border-radius:50%;background:' + COLOR + ';cursor:help;box-shadow:0 0 0 3px ' + COLOR + '40;margin:0;padding:0;border:0}' +
    '.uxpin::before{content:"";position:absolute;inset:-12px}' +
    '@media (prefers-reduced-motion:no-preference){.uxpin{animation:uxp 2.4s ease-out infinite}@keyframes uxp{0%{box-shadow:0 0 0 0 ' + COLOR + '80}80%,100%{box-shadow:0 0 0 9px ' + COLOR + '00}}}' +
    '.ux-on{outline:2px solid ' + COLOR + '!important;outline-offset:-2px!important}';
  document.head.appendChild(css);

  var placed = {};
  function place() {
    if (isPC() !== mode) { mode = isPC(); [].forEach.call(document.querySelectorAll('.uxpin'), function (d) { d.remove(); }); placed = {}; pins = curPins(); }
    pins.forEach(function (p, n) {
      if (placed[n] && placed[n].isConnected) return;
      var el = document.querySelectorAll(p.sel)[p.i || 0];
      if (!el || (!el.offsetParent && getComputedStyle(el).position !== 'fixed' && !el.getClientRects().length)) return;   /* 고정 위치 창(모달) 안의 요소도 화면에 그려져 있으면 점을 붙임 */
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
      var d = document.createElement('i');
      d.className = 'uxpin';
      d.setAttribute('role', 'button'); d.setAttribute('tabindex', '0'); d.setAttribute('aria-label', p.t);
      var at = p.at || { top: '6px', right: '6px' };
      for (var k in at) d.style[k] = at[k];
      d.addEventListener('pointerenter', function () { on(d, el, p); });
      d.addEventListener('pointerleave', function () { off(el); });
      d.addEventListener('focus', function () { on(d, el, p); });
      d.addEventListener('blur', function () { off(el); });
      el.appendChild(d);
      placed[n] = d;
      /* 점이 화면 오른쪽 끝에 걸려 잘리면 안쪽으로 당겨 줌 */
      var rc = d.getBoundingClientRect(), over = rc.right - (document.documentElement.clientWidth - 2);
      if (over > 0 && d.style.right) d.style.right = (parseFloat(d.style.right) + over) + 'px';
    });
  }
  function on(d, el, p) {
    el.classList.add('ux-on');
    var r = d.getBoundingClientRect();
    send({ type: 'pin', t: p.t, d: p.d, rect: { l: r.left, t: r.top, w: r.width, h: r.height } });
  }
  function off(el) { el.classList.remove('ux-on'); send({ type: 'pin-off' }); }

  var timer;
  new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(place, 150); })
    .observe(document.documentElement, { childList: true, subtree: true });
  [0, 400, 1200, 2500].forEach(function (ms) { setTimeout(place, ms); });
  window.addEventListener('load', place);

  /* ---------- 눌림: 이동은 부모가 처리, 그 밖의 눌림은 상대 화면에 되풀이 ---------- */
  function path(el) {
    var parts = [];
    while (el && el.nodeType === 1 && el !== document.body) {
      if (el.id) { parts.unshift('#' + CSS.escape(el.id)); break; }
      var i = 1, s = el;
      while ((s = s.previousElementSibling)) i++;
      parts.unshift(el.tagName.toLowerCase() + ':nth-child(' + i + ')');
      el = el.parentElement;
    }
    return parts.join('>');
  }
  var NO_MIRROR = '[data-wish],[data-name][data-price],.ch-add,.cart-ph,.tcc-heart,[data-rebuy],[data-review],form,input,textarea,select,button[type=submit]';

  document.addEventListener('click', function (e) {
    var t = e.target;
    if (!t || !t.closest) return;
    if (t.closest('.uxpin')) { e.preventDefault(); e.stopPropagation(); return; }
    if (mirroring) return;
    var a = t.closest('a[href]');
    if (a) {
      var h = a.getAttribute('href');
      if (h && h.charAt(0) !== '#') {
        e.preventDefault(); e.stopPropagation();
        var u = new URL(a.href, location.href);
        if (u.origin === location.origin) send({ type: 'nav', file: u.pathname.split('/').pop(), hash: u.hash, search: u.search });
        return;
      }
    }
    /* 햄버거 열기 · 메뉴 닫기는 AS-IS와 TO-BE의 헤더 구조가 달라 위치 경로로는 짝을 못 찾으므로 이름표로 짝을 지음 */
    if (t.closest('.gnb-burger')) { send({ type: 'click', key: 'burger' }); return; }
    if (t.closest('.tbm-x, .mnav-close')) { send({ type: 'click', key: 'menu-close' }); return; }
    if (!t.closest(NO_MIRROR)) send({ type: 'click', sel: path(t) });
  }, true);

  /* location.href = '…' 같은 코드 이동도 링크 클릭처럼 부모가 화면을 바꾸게 함 (쇼케이스 안에서 404로 끊기던 것 보완) */
  if (window.navigation && navigation.addEventListener) {
    navigation.addEventListener('navigate', function (e) {
      if (mirroring || e.hashChange || e.downloadRequest !== null || e.formData) return;
      if (e.navigationType !== 'push' && e.navigationType !== 'replace') return;
      var u;
      try { u = new URL(e.destination.url); } catch (x) { return; }
      if (u.origin !== location.origin) return;
      var f = u.pathname.split('/').pop();
      if (!/\.html$/.test(f)) return;
      e.preventDefault();
      send({ type: 'nav', file: f, hash: u.hash, search: u.search });
    });
  }

  window.addEventListener('message', function (e) {
    var d = e.data;
    if (!d || d.src !== 'ux-parent') return;
    if (d.type === 'click') {
      var el = d.key === 'burger' ? document.querySelector('.gnb-burger')
        : d.key === 'menu-close' ? (document.querySelector('.tbm-x') || document.querySelector('.mnav-close'))
        : document.querySelector(d.sel);
      if (!el) return;
      mirroring = true;
      try { el.click(); } finally { mirroring = false; }
    } else if (d.type === 'hash') {
      var t = document.getElementById(String(d.hash).replace('#', ''));
      if (t) t.scrollIntoView();
    } else if (d.type === 'scroll') {
      var max = document.documentElement.scrollHeight - window.innerHeight;
      ignoreScrollUntil = Date.now() + 200;
      window.scrollTo({ top: Math.max(0, d.ratio * max), behavior: 'instant' });
    }
  });

  /* ---------- 스크롤: 사용자가 만지고 있는 화면만 상대 화면을 따라오게 함 ---------- */
  ['wheel', 'touchstart', 'touchmove', 'pointerdown', 'keydown'].forEach(function (n) {
    window.addEventListener(n, function () { active = Date.now(); }, { passive: true, capture: true });
  });
  var tick = false;
  window.addEventListener('scroll', function () {
    send({ type: 'pin-off' });
    Array.prototype.forEach.call(document.querySelectorAll('.ux-on'), function (n) { n.classList.remove('ux-on'); });
    if (tick || Date.now() < ignoreScrollUntil || Date.now() - active > 1200) return;
    tick = true;
    requestAnimationFrame(function () {
      tick = false;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      send({ type: 'scroll', ratio: max > 0 ? window.scrollY / max : 0 });
    });
  }, { passive: true });

  send({ type: 'ready' });
})();
