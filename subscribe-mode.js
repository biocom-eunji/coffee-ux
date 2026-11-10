/* ============================================================
   더클린커피 · 정기배송 모드 (상품 상세)
   ------------------------------------------------------------
   정기구독 페이지에서 들어오면(주소에 ?sub=1) 상품 상세가 정기배송 전용 화면으로 바뀝니다.
     · "정기배송으로 받기" 링크 숨김 (이미 정기배송 화면이므로)
     · 배송 주기 선택 추가 (2주 / 3주 / 4주)
     · 구매하기·장바구니 대신 「정기배송 신청하기」 하나
   일반 상세의 "정기배송으로 받기"는 같은 상품의 정기배송 화면(?sub=1)으로 연결됩니다.
   실개발 사양: 기능 사양서 「정기배송」
   ============================================================ */
(function(){
  var CYCLES = [ ['2w','2주'], ['3w','3주'], ['4w','4주'] ];
  var isSub = /[?&]sub=1\b/.test(location.search);
  var page = location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'');

  function $(id){ return document.getElementById(id); }
  function run(){
    var link = document.querySelector('.pd-sub-link a');
    if(!isSub){
      if(link) link.setAttribute('href', page + '?sub=1');   /* 같은 상품의 정기배송 화면으로 */
      return;
    }
    var btns = document.querySelector('.pd-buy-btns'); if(!btns) return;
    var subLink = document.querySelector('.pd-sub-link'); if(subLink) subLink.remove();

    /* 제목 위 표시 */
    var title = document.querySelector('.pd-buy-title');
    if(title && !document.querySelector('.sub-badge')){
      var bd = document.createElement('div'); bd.className = 'sub-badge'; bd.textContent = '정기배송';
      title.parentNode.insertBefore(bd, title);
    }

    /* 정기배송 결제 금액 — 일반 판매가 그대로 (prices.js subRate 0) · 회차마다 10% 적립 (첫 정기배송 혜택 첫 회차는 할인된 금액 기준) */
    var key = (page.match(/^product-([a-z-]+)\.html$/) || [])[1];
    var won = function(n){ return n.toLocaleString('ko-KR') + '원'; };
    /* 첫 정기배송 혜택 — 대상 원두면 가격 자리에 첫 회차 금액(판매가에서 20% 할인)을 보여 주고 판매가는 취소선, 아래에 100g · 약정 안내.
       정기배송을 한 번 시작했거나 혜택을 쓴 회원 · 대상 원두가 아니면 10% 적립 안내만 보임 */
    function promoOk(n){ return !!(window.TCC_SUBPROMO && TCC_SUBPROMO.itemOk && TCC_SUBPROMO.itemOk(n)); }
    var SUB_PT = (window.TCC_PRICE && TCC_PRICE.subPointRate) ? TCC_PRICE.subPointRate() : 0.10;
    function subPoint(p){ var pt = document.querySelector('#pdPoint b'); if(pt && p != null) pt.textContent = Math.floor(p * SUB_PT).toLocaleString('ko-KR'); }
    function pointNote(){ return '정기배송은 회차마다 결제 금액의 ' + Math.round(SUB_PT * 100) + '%가 적립됩니다'; }
    function firstPrice(el, sp, w){ if(!el) return; var f = TCC_SUBPROMO.first(sp);
      el.className = 'pd-price';
      el.innerHTML = won(f) + (w ? '<span class="pd-price-unit">' + w + '</span>' : '') + '<span class="pd-price-was" style="margin-left:8px">' + won(sp) + '</span>';
      var pt = document.getElementById('pdPoint'); if(pt){ pt.className = 'pd-point-value'; pt.innerHTML = '첫 회차 <b>' + Math.floor(f * SUB_PT).toLocaleString('ko-KR') + '</b> 포인트 적립 예정 · 2회차부터 회차마다 ' + Math.floor(sp * SUB_PT).toLocaleString('ko-KR') + ' 포인트'; } }
    function firstNote(sp){ return '<b style="color:var(--ink,#111921);font-weight:700">첫 정기배송 혜택</b> · 첫 회차 20% 할인 금액이며 2회차부터 ' + won(sp) + ' · 첫 회차에는 커피팀이 고른 원두 100g을 함께 보내 드립니다 · 첫 회차 무료배송은 할인 전 금액 30,000원 이상 기준 · 적립은 회차마다 결제 금액의 ' + Math.round(SUB_PT * 100) + '%(첫 회차는 할인된 금액 기준) · 혜택을 받으시면 3회차 결제가 끝날 때까지 약정이 있습니다(그동안 이번 배송 미루기는 할 수 없고, 약정 기간 안에 해지하시면 받으신 혜택 — 첫 회차 할인 · 원두 100g 값 · 정기배송 적립금 — 만큼 위약금이 있습니다)'; }
    if(window.TCC_PRICE && window.PD_PRICE && key){
      var base = {};
      Object.keys(window.PD_PRICE).forEach(function(w){
        base[w] = window.PD_PRICE[w];
        var sp = TCC_PRICE.subBean(key, w);
        if(sp != null) window.PD_PRICE[w] = sp;
      });
      var sel = $('pdWeight'), priceEl = $('pdPrice');
      var pname = ((document.querySelector('.pd-buy-title')||{}).textContent||'').trim();
      function subNote(){
        var w = sel ? sel.value : null, el = document.getElementById('subPriceNote');
        if(!el){ el = document.createElement('div'); el.id = 'subPriceNote'; el.style.cssText = 'font-size:12px;color:#8A8178;margin-top:6px';
          var row = document.querySelector('.pd-price-row'); if(row) row.parentNode.insertBefore(el, row.nextSibling); }
        var sp = w ? window.PD_PRICE[w] : null;
        subPoint(sp);
        if(sp != null && promoOk(pname)){ firstPrice(priceEl, sp, w); el.innerHTML = firstNote(sp); return; }
        el.textContent = sp != null ? pointNote() : '';
      }
      if(sel){ sel.addEventListener('change', function(){ setTimeout(subNote, 0); }); sel.dispatchEvent(new Event('change')); }
      subNote();
    } else if(window.TCC_PRICE && (page === 'product-bulletproof.html' || page === 'product-dripbag-single.html') && TCC_PRICE.subItem){
      var IK = page === 'product-bulletproof.html' ? 'bulletproof' : 'dripbag-single';
      var bp = TCC_PRICE.item(IK), bs = TCC_PRICE.subItem(IK), pe = document.querySelector('.pd-price-row .pd-price');
      if(pe && bs != null){ pe.textContent = won(bs);
        var el = document.createElement('div'); el.style.cssText = 'font-size:12px;color:#8A8178;margin-top:6px';
        subPoint(bs);
        el.textContent = pointNote();   /* 첫 정기배송 혜택(20% + 100g)은 원두만 */
        var row = document.querySelector('.pd-price-row'); row.parentNode.insertBefore(el, row.nextSibling); }
    }

    /* 방탄커피 정기배송은 1박스만 — 묶음(4+1 · 7+3) 선택지는 정기배송 화면에서 숨김 */
    var bpSel = $('bpQty');
    if(bpSel && page === 'product-bulletproof.html'){
      Array.prototype.slice.call(bpSel.options).forEach(function(o){ if(o.value !== 'bulletproof') o.remove(); });
      bpSel.value = 'bulletproof'; bpSel.dispatchEvent(new Event('change'));
    }

    /* 배송비 안내 — 정기배송은 회차 30,000원 이상 무료 (일반 40,000원 줄은 숨김) */
    Array.prototype.forEach.call(document.querySelectorAll('.pd-ship-normal'),function(el){ el.hidden=true; });
    Array.prototype.forEach.call(document.querySelectorAll('.pd-ship-subonly'),function(el){ el.hidden=false; });

    /* 배송 주기 선택 */
    var row = document.createElement('div'); row.className = 'pd-select-row sub-cycle-row';
    row.innerHTML = '<label>배송 주기</label><div class="sub-cycle" id="subCycle">'
      + CYCLES.map(function(c,i){ return '<button type="button" data-c="'+c[0]+'"'+(i===0?' class="on"':'')+'>'+c[1]+'</button>'; }).join('')
      + '</div>';
    btns.parentNode.insertBefore(row, btns);
    var cycle = CYCLES[0];
    $('subCycle').addEventListener('click', function(e){
      var b = e.target.closest('button'); if(!b) return;
      this.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); }); b.classList.add('on');
      cycle = CYCLES.filter(function(c){ return c[0] === b.dataset.c; })[0];
    });

    /* 버튼: 정기배송 신청하기 하나로 */
    btns.innerHTML = '<a class="btn btn-ink" href="#" id="subApply" style="flex:1 1 100%">정기배송 신청하기</a>';
    var note = document.querySelector('.pd-note-inline');
    if(note) note.textContent = '첫 배송 후 선택하신 주기마다 같은 원두를 보내드립니다.';

    function subAdd(go){
      var w = $('pdWeight'), g = $('pdGrind'), name, opt, price;
      if(w && g){
        if(!w.value || !g.value){ if(note){ note.textContent = '중량과 분쇄도를 선택해 주세요.'; note.style.color = '#C0392B'; } return false; }
        name = (document.querySelector('.pd-buy-title')||{}).textContent || document.title.split('·')[0].trim();
        opt  = w.value + ' · ' + g.options[g.selectedIndex].text.replace(/, 권장$/,'');
        price = (window.PD_PRICE && window.PD_PRICE[w.value] != null) ? window.PD_PRICE[w.value] : null;
      } else if($('dbFlavor')){
        var fl = $('dbFlavor');
        if(!fl.value){ if(note){ note.textContent = '원두를 선택해 주세요.'; note.style.color = '#C0392B'; } return false; }
        name = '드립백 · ' + fl.options[fl.selectedIndex].text; opt = '1박스 (6개입)';
        var dq = +(($('dbQty')||{value:1}).value) || 1;
        price = window.TCC_PRICE ? (TCC_PRICE.subItem ? TCC_PRICE.subItem('dripbag-single') : TCC_PRICE.item('dripbag-single')) : null;
      } else {
        name = '더클린 방탄커피'; opt = '1BOX (16g × 7)';
        price = window.TCC_PRICE ? (TCC_PRICE.subItem ? TCC_PRICE.subItem('bulletproof') : TCC_PRICE.item('bulletproof')) : null;
      }
      if(price == null){ if(note){ note.textContent = '가격이 정해지지 않은 상품은 아직 신청하실 수 없습니다.'; note.style.color = '#C0392B'; } return false; }
      /* 정기배송 장바구니는 일반 장바구니와 분리 (tcc_sub_cart) — 운영정책서 §7-5, 기능사양서 §4 */
      var sc=[]; try{ sc=JSON.parse(localStorage.getItem('tcc_sub_cart')||'[]'); }catch(err){}
      var hit=null; sc.forEach(function(x){ if(x.name===name.trim() && x.opt===opt && x.cycle===cycle[0]) hit=x; });
      var addQ = (typeof dq === 'number' && dq > 0) ? dq : 1;
      if(hit) hit.qty+=addQ; else sc.push({ name: name.trim(), opt: opt, qty: addQ, price: price, cycle: cycle[0], cycleLabel: cycle[1] });
      localStorage.setItem('tcc_sub_cart', JSON.stringify(sc));
      if(window.TCC && TCC.badge) TCC.badge();
      if(go) location.href = 'cart.html#sub';
      return true;
    }
    window.TCC_SUB_ADD = subAdd;
    $('subApply').addEventListener('click', function(e){ e.preventDefault(); subAdd(true); });

    var st = document.createElement('style');
    st.textContent = '.sub-badge{display:inline-block;font-size:10.5px;font-weight:700;letter-spacing:.14em;color:#231715;border:1px solid #231715;padding:3px 9px;margin-bottom:12px}'
      + '.sub-cycle{display:flex;gap:8px;flex:1}.sub-cycle button{flex:1;padding:11px 0;border:1px solid #E7E1D8;background:#fff;font-family:inherit;font-size:13px;color:#5E5750;cursor:pointer}'
      + '.sub-cycle button.on{border-color:#231715;color:#231715;font-weight:700;box-shadow:inset 0 0 0 1px #231715}';
    document.head.appendChild(st);
  }
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', run); else run();
})();
