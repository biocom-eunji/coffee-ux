/* ============================================================
   더클린커피 · 선물하기 (휴대폰 번호로 선물)
   ------------------------------------------------------------
   적용: 기프트 상품(FIRST NOTE · 디스커버리 세트 · 드립백 세트)만 — 일반 상품·사업자 페이지 제외
   흐름: 선물하기 → 받는 분 이름·휴대폰 입력 → 결제 → 받는 분에게 알림톡(링크)
        → 받는 분이 링크에서 배송지 입력 → 로스팅·출고
   프로토타입: 결제·알림톡 발송은 시뮬레이션, 선물 기록은 localStorage 'tcc_gifts'
   실개발 사양: 기능 사양서 §5-E
   ============================================================ */
(function(){
  var GIFT_DAYS = 7;   /* 주소 입력 기한 — 지나면 자동 취소·환불 */

  function $(id){ return document.getElementById(id); }
  function won(n){ return n==null ? '가격 확정 대기' : n.toLocaleString('ko-KR')+'원'; }
  /* 배송비 — 기본 정책(40,000원 이상 무료, 미만 3,000원)을 선물 결제에도 동일 적용 */
  function shipFor(price){
    var S=(window.TCC_PRICES && TCC_PRICES.shipping) || { fee:3000, freeOver:40000 };
    return (price==null) ? null : (price >= S.freeOver ? 0 : S.fee);
  }
  function token(){ var c='abcdefghijkmnpqrstuvwxyz23456789', t=''; for(var i=0;i<20;i++) t+=c[Math.floor(Math.random()*c.length)]; return t; }
  function member(){ try{ return JSON.parse(localStorage.getItem('tcc_member')||'null'); }catch(e){ return null; } }
  function title(){ var h=document.querySelector('.pd-buy h1, .pd-title, h1'); return h ? h.textContent.trim() : document.title.split('·')[0].trim(); }

  /* 기프트 상품별 선택값 읽기 — FIRST NOTE / 디스커버리 세트 / 드립백 세트 (일반 상품·사업자 페이지는 선물하기 없음) */
  function num(t){ var m=String(t||'').replace(/,/g,'').match(/(\d{3,})/); return m?parseInt(m[1],10):null; }
  function picks(prefix){
    var out=[]; for(var i=1;i<=4;i++){ var el=$(prefix+i); if(el) out.push(el); } return out;
  }
  function readItem(){
    var page=location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'');
    var gEl=document.getElementById('setGrind'), gT=(gEl&&gEl.value)?gEl.options[gEl.selectedIndex].text:'';
    if(gEl&&!gT) return { err:'분쇄도를 선택해 주세요.' };
    if(page==='first-note.html'){
      var s=picks('fnSelect'); var v=s.map(function(x){return x.value;}).filter(Boolean);
      if(v.length<4) return { err:'원두 네 가지를 모두 선택해 주세요.' };
      return { name:'FIRST NOTE 4종 세트', desc:'더클린커피 원두 네 가지를 200g씩 한 상자에 담은 선물 세트입니다. 산지와 맛이 다른 원두를 하나씩 내려 보며 취향을 찾아가실 수 있어요.', opt:s.map(function(x){return x.options[x.selectedIndex].text;}).join(' · ')+(gT?' · '+gT:''),
               price:(window.TCC_PRICE&&TCC_PRICE.item('first-note')!=null)?TCC_PRICE.item('first-note'):num(($('fnTotal')||{}).textContent) };
    }
    if(page==='gift-dripbag.html'){
      var d=picks('dbSelect'); var w=d.map(function(x){return x.value;}).filter(Boolean);
      if(w.length<4) return { err:'원두 네 가지를 모두 선택해 주세요.' };
      return { name:'드립백 세트', desc:'원두 네 가지를 드립백으로 담은 세트입니다. 컵 위에 걸고 물만 부으면 바로 핸드드립 한 잔이 됩니다.', opt:d.map(function(x){return x.options[x.selectedIndex].text;}).join(' · '),
               price:(window.TCC_PRICE?TCC_PRICE.item('dripbag-set'):null) };
    }
    var pr=document.querySelector('.pd-price'), ds=picks('dsSelect');
    if(ds.some(function(x){return !x.value;})) return { err:'원두 세 가지를 모두 선택해 주세요.' };
    return { name:'디스커버리 세트', desc:'원두 세 가지를 100g씩 담은 세트입니다.', opt:'3 × 100g'+(ds.length?' · '+ds.map(function(x){return x.options[x.selectedIndex].text;}).join(' · '):'')+(gT?' · '+gT:''),
             price:(window.TCC_PRICE&&TCC_PRICE.item('discovery')!=null)?TCC_PRICE.item('discovery'):num(pr&&pr.textContent) };
  }

  var css = ''
  + '.gf-back{position:fixed;inset:0;background:rgba(20,16,14,.46);z-index:9000;display:flex;align-items:center;justify-content:center;padding:18px}'
  + '.gf-back[hidden]{display:none}'
  + '.gf-box{background:#fff;width:100%;max-width:440px;max-height:92vh;overflow:auto;padding:28px 26px 24px;position:relative}'
  + '.gf-x{position:absolute;top:10px;right:12px;border:0;background:none;font-size:22px;color:#8A8178;cursor:pointer}'
  + '.gf-box h3{font-size:18px;color:#231715;margin-bottom:6px;font-weight:700}'
  + '.gf-sub{font-size:12.5px;color:#8A8178;line-height:1.7;margin-bottom:18px}'
  + '.gf-item{background:#F2EFEA;padding:12px 14px;font-size:13px;color:#231715;margin-bottom:16px;line-height:1.6}'
  + '.gf-item small{display:block;color:#8A8178;font-size:12px}'
  + '.gf-f{margin-bottom:12px}.gf-f label{display:block;font-size:12px;font-weight:700;color:#231715;margin-bottom:6px}'
  + '.gf-f input,.gf-f textarea,.gf-f select{width:100%;border:1px solid #E7E1D8;padding:11px 12px;font-family:inherit;font-size:13px;color:#231715;background:#fff}'
  + '.gf-f textarea{min-height:64px;resize:vertical}.gf-f input:focus,.gf-f textarea:focus{outline:none;border-color:#231715}'
  + '.gf-help{font-size:11.5px;color:#8A8178;line-height:1.7;margin:4px 0 14px}'
  + '.gf-note{font-size:12.5px;color:#B4443C;min-height:1.4em;margin-top:8px}'
  + '.gf-btn{display:block;width:100%;text-align:center;padding:14px;font-size:14px;font-family:inherit;cursor:pointer;border:1px solid #231715;background:#231715;color:#F2EFEA;margin-top:6px;text-decoration:none}'
  + '.gf-btn.line{background:#fff;color:#231715}'
  + '.gf-sum{border-top:1px solid #E7E1D8;border-bottom:1px solid #E7E1D8;padding:10px 0;margin:-4px 0 16px;font-size:13px}.gf-sum div{display:flex;justify-content:space-between;padding:3px 0;color:#5E5750}.gf-sum b{color:#231715;font-weight:600}.gf-sum .tot{margin-top:4px;padding-top:8px;border-top:1px dashed #E7E1D8}.gf-sum .tot b{font-size:15px;font-weight:700}'
  + '.gf-pm{display:flex;gap:6px}.gf-pm button{flex:1;padding:10px 0;border:1px solid #E7E1D8;background:#fff;font-family:inherit;font-size:13px;color:#5E5750;cursor:pointer}.gf-pm button.on{border-color:#231715;color:#231715;font-weight:700;box-shadow:inset 0 0 0 1px #231715}'
  + '.gf-agree{display:flex;gap:6px;align-items:flex-start;font-size:12px;color:#5E5750;margin:4px 0 10px;cursor:pointer}.gf-agree input{margin-top:2px;accent-color:#231715}.gf-btn:disabled{opacity:.6;cursor:default}'
  + '.gf-sms{border:1px solid #E7E1D8;background:#FAF8F4;padding:14px 16px;font-size:13px;line-height:1.75;color:#231715;margin:14px 0 6px}'
  + '.gf-sms b{display:block;font-size:11px;color:#8A8178;letter-spacing:.06em;margin-bottom:6px}';
  var st=document.createElement('style'); st.textContent=css; document.head.appendChild(st);

  function modal(){
    var m=$('gfModal'); if(m) return m;
    m=document.createElement('div'); m.className='gf-back'; m.id='gfModal'; m.hidden=true;
    m.innerHTML='<div class="gf-box" role="dialog" aria-modal="true" aria-labelledby="gfTitle"><button class="gf-x" type="button" aria-label="닫기">×</button><div id="gfBody"></div></div>';
    document.body.appendChild(m);
    m.addEventListener('click', function(e){ if(e.target===m || e.target.classList.contains('gf-x')) m.hidden=true; });
    return m;
  }

  function openForm(item){
    var m=modal(), me=member();
    $('gfBody').innerHTML=''
      + '<h3 id="gfTitle">선물하기</h3>'
      + '<p class="gf-sub">받는 분의 휴대폰 번호만 알면 됩니다. 결제 후 받는 분께 알림톡이 가고, 받는 분이 직접 배송지를 적어 주시면 로스팅해 보내드립니다.</p>'
      + '<div class="gf-item">'+item.name+'<small>'+item.opt+'</small></div>'
      + '<div class="gf-sum"><div><span>상품 금액</span><b>'+won(item.price)+'</b></div>'
      + '<div><span>배송비</span><b>'+(shipFor(item.price)===0?'무료':won(shipFor(item.price)))+'</b></div>'
      + '<div class="tot"><span>결제 금액</span><b>'+won(item.price==null?null:item.price+shipFor(item.price))+'</b></div></div>'
      + '<div class="gf-f"><label for="gfName">받는 분 이름</label><input id="gfName" type="text" placeholder="이름"></div>'
      + '<div class="gf-f"><label for="gfPhone">받는 분 휴대폰 번호</label><input id="gfPhone" type="tel" inputmode="numeric" placeholder="010-0000-0000" maxlength="13"></div>'
      + '<div class="gf-f"><label for="gfMsg">함께 보낼 메시지 <span style="font-weight:500;color:#8A8178">(선택)</span></label><textarea id="gfMsg" maxlength="80" placeholder="예: 늘 고마워요. 좋은 아침 보내세요."></textarea></div>'
      + '<div class="gf-f"><label for="gfFrom">보내는 분 이름</label><input id="gfFrom" type="text" value="'+(me&&me.name?me.name:'')+'" placeholder="받는 분께 보일 이름"></div>'
      + '<p class="gf-help">받는 분이 '+GIFT_DAYS+'일 안에 배송지를 입력하지 않으시면 주문이 자동 취소되고 결제 금액은 환불됩니다.</p>'
      + '<button class="gf-btn" type="button" id="gfPay">다음 · 결제하기</button>'
      + '<p class="gf-note" id="gfNote"></p>';
    m.hidden=false;
    var ph=$('gfPhone');
    ph.addEventListener('input', function(){ var n=ph.value.replace(/\D/g,'').slice(0,11); ph.value = n.length>7 ? n.slice(0,3)+'-'+n.slice(3,7)+'-'+n.slice(7) : (n.length>3 ? n.slice(0,3)+'-'+n.slice(3) : n); });
    $('gfPay').addEventListener('click', function(){
      var name=$('gfName').value.trim(), phone=ph.value.replace(/\D/g,''), from=$('gfFrom').value.trim(), note=$('gfNote');
      if(!name){ note.textContent='받는 분 이름을 입력해 주세요.'; return; }
      if(!/^01[016789]\d{7,8}$/.test(phone)){ note.textContent='휴대폰 번호를 다시 확인해 주세요.'; return; }
      if(!from){ note.textContent='보내는 분 이름을 입력해 주세요.'; return; }
      if(item.price==null){ note.textContent='가격이 정해지지 않은 상품은 아직 선물하실 수 없습니다.'; return; }
      openPay(item, { name:name, phone:phone }, from, $('gfMsg').value.trim());
    });
  }


  /* 선물 결제에서도 쿠폰 사용 가능(1주문 1쿠폰, 일반 결제와 같은 규칙) — 실개발: 회원 쿠폰함에서 읽음. 프로토타입은 결제 페이지와 같은 표본 */
  var GIFT_COUPONS=[
    {id:'ref5000', name:'친구 추천 쿠폰 5,000원', type:'amount', value:5000, min:30000},
    {id:'bd8000',  name:'생일 축하 쿠폰 8,000원', type:'amount', value:8000, min:60000},
    {id:'bd4000',  name:'생일 축하 쿠폰 4,000원', type:'amount', value:4000, min:30000},
    {id:'ship',    name:'무료배송 쿠폰',          type:'ship',   value:0,    min:0}
  ];
  /* 2단계 — 결제 (결제 페이지와 같은 구성: 쿠폰 · 적립금 · 결제 수단 · 금액 · 동의) */
  function openPay(item, to, from, msg){
    var ship=shipFor(item.price), me=member(), POINT_BAL=me?7300:0, POINT_HAVE=(POINT_BAL>=5000)?POINT_BAL:0;   /* 보유 적립금 샘플 7,300원 — 5,000원 이상 보유 시에만 사용 가능 */
    $('gfBody').innerHTML=''
      + '<h3 id="gfTitle">결제</h3>'
      + '<p class="gf-sub">결제가 끝나면 받는 분께 알림톡이 바로 발송됩니다.</p>'
      + '<div class="gf-item">'+item.name+'<small>'+item.opt+'</small>'
      + '<small style="margin-top:6px">받는 분 · '+to.name+' ('+to.phone.replace(/(\d{3})\d{3,4}(\d{4})/,'$1-****-$2')+')'+(msg?' · 메시지 있음':'')+'</small></div>'
      + (me ? '<div class="gf-f"><label for="gfCoupon">쿠폰</label><select id="gfCoupon"><option value="">쿠폰 사용 안 함</option>'+GIFT_COUPONS.map(function(c){ var ok=(item.price||0)>=c.min && !(c.type==='ship'&&ship===0); return '<option value="'+c.id+'"'+(ok?'':' disabled')+'>'+c.name+(c.min?' · '+won(c.min)+' 이상':'')+(ok?'':' (사용 불가)')+'</option>'; }).join('')+'</select></div>' : '')
      + (POINT_HAVE ? '<div class="gf-f"><label for="gfPoint">적립금 사용 <span style="font-weight:500;color:#8A8178">(보유 '+won(POINT_HAVE)+' · 5,000원 이상 모이면 사용 가능)</span></label><input id="gfPoint" type="number" min="0" step="100" value="0" inputmode="numeric"></div>' : (POINT_BAL ? '<p style="font-size:12px;color:#8A8178;margin:4px 0 12px">보유 적립금 '+won(POINT_BAL)+' · 적립금은 5,000원 이상 모이면 사용하실 수 있습니다.</p>' : ''))
      + '<div class="gf-f"><label>결제 수단</label><div class="gf-pm" id="gfPm">'
      + '<button type="button" class="on" data-pm="card">신용카드</button><button type="button" data-pm="bank">계좌이체</button><button type="button" data-pm="naver">네이버페이</button><button type="button" data-pm="easy">간편결제</button></div></div>'
      + '<div class="gf-sum"><div><span>상품 금액</span><b>'+won(item.price)+'</b></div>'
      + '<div><span>배송비</span><b>'+(ship===0?'무료':won(ship))+'</b></div>'
      + '<div><span>쿠폰 할인</span><b id="gfCpUse">0원</b></div>'
      + '<div><span>적립금 사용</span><b id="gfPtUse">0원</b></div>'
      + '<div class="tot"><span>최종 결제 금액</span><b id="gfTot">'+won(item.price+ship)+'</b></div></div>'
      + '<label class="gf-agree"><input type="checkbox" id="gfAgree"><span>주문 내용을 확인했으며, 교환/환불 정책에 동의합니다.</span></label>'
      + '<button class="gf-btn" type="button" id="gfDoPay">'+won(item.price+ship)+' 결제하기</button>'
      + '<button class="gf-btn line" type="button" id="gfBack">이전</button>'
      + '<p class="gf-note" id="gfNote2"></p>';
    var pm='card', pt=0, cp=null, cpAmt=0, shipNow=ship;
    function recalc(){
      var cs=$('gfCoupon'); cp=cs&&cs.value?GIFT_COUPONS.filter(function(c){return c.id===cs.value})[0]:null;
      cpAmt=cp&&cp.type==='amount'?Math.min(cp.value,item.price):0; shipNow=cp&&cp.type==='ship'?0:ship;
      var el=$('gfPoint'); pt=el?Math.max(0,Math.min(POINT_HAVE, parseInt(el.value,10)||0, item.price-cpAmt)):0;
      var tot=item.price-cpAmt+shipNow-pt;
      $('gfCpUse').textContent=cp?(cp.type==='ship'?'무료배송':'−'+won(cpAmt)):'0원';
      $('gfPtUse').textContent=pt?('−'+won(pt)):'0원'; $('gfTot').textContent=won(tot); $('gfDoPay').textContent=won(tot)+' 결제하기';
      return tot;
    }
    if($('gfPoint')) $('gfPoint').addEventListener('input', recalc);
    if($('gfCoupon')) $('gfCoupon').addEventListener('change', recalc);
    $('gfPm').addEventListener('click', function(e){ var b=e.target.closest('button'); if(!b) return;
      this.querySelectorAll('button').forEach(function(x){ x.classList.remove('on'); }); b.classList.add('on'); pm=b.dataset.pm; });
    $('gfBack').addEventListener('click', function(){ openForm(item); $('gfName').value=to.name; $('gfPhone').value=to.phone.replace(/(\d{3})(\d{3,4})(\d{4})/,'$1-$2-$3'); $('gfMsg').value=msg; $('gfFrom').value=from; });
    $('gfDoPay').addEventListener('click', function(){
      var n=$('gfNote2');
      if(!$('gfAgree').checked){ n.textContent='주문 내용 확인에 동의해 주세요.'; return; }
      var tot=recalc(), btn=this;
      btn.disabled=true; btn.textContent='결제 진행 중…'; n.textContent='';
      setTimeout(function(){   /* 실개발: PG 결제창 호출 → 승인 후 아래 저장·알림톡 발송 */
        var g={ token:token(), createdAt:new Date().toISOString(), paidAt:new Date().toISOString(), payMethod:pm, pointUsed:pt, coupon:cp?cp.name:null, couponAmt:cpAmt,
                item:item.name, opt:item.opt, price:item.price, ship:shipNow, total:tot, desc:item.desc||'',
                to:to, from:from, msg:msg, status:'waiting', sentCount:1 };
        var list=[]; try{ list=JSON.parse(localStorage.getItem('tcc_gifts')||'[]'); }catch(e){}
        list.push(g); localStorage.setItem('tcc_gifts', JSON.stringify(list));
        showSent(g);
      }, 900);
    });
  }

  function showSent(g){
    var link='gift-receive.html?t='+g.token;
    $('gfBody').innerHTML=''
      + '<h3 id="gfTitle">결제가 완료되어 선물을 보냈습니다</h3>'
      + '<p class="gf-sub">결제 금액 <b style="color:#231715">'+won(g.total)+'</b>'+(g.ship?' (배송비 '+won(g.ship)+' 포함)':' (무료배송)')+(g.pointUsed?' · 적립금 '+won(g.pointUsed)+' 사용':'')+'<br>'+g.to.name+'님('+g.to.phone.replace(/(\d{3})\d{3,4}(\d{4})/,'$1-****-$2')+')께 아래 알림톡이 발송되었습니다. 배송지가 입력되면 알려 드릴게요.</p>'
      + '<div class="gf-sms"><b>받는 분께 가는 알림톡</b>'+g.from+'님이 더클린커피 선물을 보내셨어요.<br>'
      + (g.msg ? '“'+g.msg+'”<br>' : '')
      + '<b style="display:inline;color:#231715;font-size:13px;letter-spacing:0">'+g.item+'</b><br>'+(g.desc?g.desc+'<br>':'')+'<br>아래 링크에서 받으실 주소를 알려 주세요. '+GIFT_DAYS+'일 안에 입력해 주시면 로스팅해 보내드립니다.</div>'
      + '<a class="gf-btn" href="'+link+'" target="_blank" rel="noopener">받는 분 화면 미리보기</a>'
      + '<a class="gf-btn line" href="mypage.html#gifts">보낸 선물 확인하기</a>';
  }

  document.addEventListener('click', function(e){
    var b=e.target.closest('#giftBtn'); if(!b) return;
    e.preventDefault();
    var it=readItem();
    if(it.err){ var n=$('fnSelectNote')||$('dbSelectNote')||document.querySelector('.pd-note-inline'); if(n){ n.textContent=it.err; n.style.color='#C0392B'; } else alert(it.err); return; }
    openForm(it);
  });
})();
