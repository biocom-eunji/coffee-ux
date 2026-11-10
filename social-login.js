/* 간편 로그인 · 간편 가입 (카카오 · 네이버 · 구글) — login.html · signup.html 공용
   프로토타입: 실제 OAuth 대신 각 서비스에서 받아온 정보를 흉내 내 회원을 만든다.
   실개발: 카카오 로그인 · 네이버 로그인 · Google 로그인 SDK 연동 (기능사양서 「간편 로그인」) */
(function(){
  var P = {
    kakao:{ label:'카카오', email:'clean@kakao.com' },
    naver:{ label:'네이버', email:'clean@naver.com' },
    google:{ label:'구글',  email:'clean@gmail.com' }
  };
  var ICON = {
    kakao:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#000" d="M12 3.6c-5.1 0-9.2 3.2-9.2 7.2 0 2.6 1.7 4.8 4.3 6.1l-1.1 3.9c-.1.3.3.6.6.4l4.6-3.1c.3 0 .5.1.8.1 5.1 0 9.2-3.2 9.2-7.2S17.1 3.6 12 3.6z"/></svg>',
    naver:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#fff" d="M14.3 12.5 9.5 5.6H5.6v12.8h4.1v-6.9l4.8 6.9h3.9V5.6h-4.1z"/></svg>',
    google:'<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="#4285F4" d="M21.6 12.2c0-.7-.1-1.4-.2-2H12v3.8h5.4a4.6 4.6 0 0 1-2 3v2.5h3.2c1.9-1.7 3-4.3 3-7.3z"/><path fill="#34A853" d="M12 22c2.7 0 5-.9 6.6-2.4l-3.2-2.5c-.9.6-2 1-3.4 1-2.6 0-4.8-1.8-5.6-4.1H3.1v2.6A10 10 0 0 0 12 22z"/><path fill="#FBBC05" d="M6.4 14c-.2-.6-.3-1.3-.3-2s.1-1.4.3-2V7.4H3.1a10 10 0 0 0 0 9.2L6.4 14z"/><path fill="#EA4335" d="M12 5.9c1.5 0 2.8.5 3.8 1.5l2.9-2.9A10 10 0 0 0 3.1 7.4L6.4 10c.8-2.3 3-4.1 5.6-4.1z"/></svg>'
  };

  var css=document.createElement('style');
  css.textContent=
   '.sl{margin:0}'
  +'.sl-kakao{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;height:48px;background:#FEE500;color:rgba(0,0,0,.85);border:0;border-radius:2px;font:inherit;font-size:14px;font-weight:600;cursor:pointer;letter-spacing:0}'
  +'.sl-kakao svg{width:20px;height:20px}'
  +'.sl-kakao:hover{filter:brightness(.97)}'
  +'.sl-more{display:flex;justify-content:center;gap:12px;margin-top:14px}'
  +'.sl-circle{width:44px;height:44px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;cursor:pointer;border:1px solid transparent;padding:0}'
  +'.sl-circle svg{width:22px;height:22px}'
  +'.sl-naver{background:#03C75A}'
  +'.sl-google{background:#fff;border-color:var(--hair,#E7E1D8)}'
  +'.sl-cap{text-align:center;font-size:11.5px;color:var(--mist,#8A8178);margin-top:10px;line-height:1.6;word-break:keep-all}'
  +'.slm{position:fixed;inset:0;z-index:600;display:flex;align-items:center;justify-content:center;padding:20px}'
  +'.slm[hidden]{display:none}'
  +'.slm-bg{position:absolute;inset:0;background:rgba(35,23,21,.45)}'
  +'.slm-box{position:relative;background:#fff;width:100%;max-width:420px;max-height:90vh;overflow:auto;padding:28px 24px 24px}'
  +'.slm-x{position:absolute;top:10px;right:12px;background:none;border:0;font-size:22px;cursor:pointer;color:var(--mist,#8A8178)}'
  +'.slm h3{font-size:17px;font-weight:600;color:var(--ink,#231715);margin:0 0 6px}'
  +'.slm-sub{font-size:12.5px;color:var(--slate,#5E564F);line-height:1.7;margin:0 0 16px;word-break:keep-all}'
  +'.slm-info{background:var(--ivory,#F2EFEA);padding:12px 14px;font-size:12.5px;color:var(--ink,#231715);line-height:1.9;margin-bottom:16px}'
  +'.slm-info span{display:inline-block;width:64px;color:var(--mist,#8A8178)}'
  +'.slm label.slm-ag{display:flex;gap:8px;align-items:flex-start;font-size:12.5px;color:var(--slate,#5E564F);line-height:1.6;margin-bottom:9px;cursor:pointer}'
  +'.slm label.slm-ag input{margin-top:3px;accent-color:var(--ink,#231715)}'
  +'.slm-all{font-weight:600;color:var(--ink,#231715)!important;border-bottom:1px solid var(--hair,#E7E1D8);padding-bottom:10px;margin-bottom:12px!important}'
  +'.slm-tag{font-style:normal;font-size:10.5px;font-weight:700;margin-right:5px}'
  +'.slm-req{color:var(--ink,#231715)}.slm-opt{color:var(--mist,#8A8178)}'
  +'.slm-ref{width:100%;border:1px solid var(--hair,#E7E1D8);padding:10px 12px;font:inherit;font-size:13px;margin:4px 0 14px;text-transform:uppercase}'
  +'.slm-go{width:100%;height:48px;background:var(--ink,#231715);color:#fff;border:0;font:inherit;font-size:14px;cursor:pointer;margin-top:6px}'
  +'.slm-note{font-size:12px;color:var(--flag,#B4443C);min-height:16px;margin:8px 0 0;text-align:center}';
  document.head.appendChild(css);

  function q(name){ return (location.search.match(new RegExp('[?&]'+name+'=([^&]+)'))||[])[1]; }

  function member(provider, opts){
    var now=new Date().toISOString();
    return { name:'김클린', phone:'010-2345-6789', email:P[provider].email, birth:'', zip:'', addr:'', addr2:'',
      provider:provider, mktConsent:!!opts.mkt, mktConsentAt:opts.mkt?now:null,
      reviewConsent:!!opts.rv, reviewConsentAt:opts.rv?now:null, ref:opts.ref||null,
      spent12m:0, spent24m:0, spent36m:0, referral12m:0 };
  }
  function done(m){
    localStorage.setItem('tcc_member', JSON.stringify(m));
    var next=q('next'); location.href = next ? decodeURIComponent(next) : 'mypage.html';
  }

  /* 가입 동의 화면 — 간편 가입도 필수 약관 동의는 따로 받는다 */
  var modal;
  function openJoin(provider){
    var label=P[provider].label, refq=q('ref'), refVal=refq?decodeURIComponent(refq).toUpperCase():'';
    if(!modal){ modal=document.createElement('div'); modal.className='slm'; modal.hidden=true; document.body.appendChild(modal); }
    modal.innerHTML=
      '<div class="slm-bg"></div><div class="slm-box" role="dialog" aria-modal="true" aria-labelledby="slmT">'
     +'<button class="slm-x" type="button" aria-label="닫기">×</button>'
     +'<h3 id="slmT">'+label+' 계정으로 가입</h3>'
     +'<p class="slm-sub">'+label+'에서 아래 정보를 받아왔어요. 동의만 하시면 가입이 끝나고 웰컴 쿠폰 5종을 바로 드립니다.</p>'
     +'<div class="slm-info"><span>이름</span>김클린<br><span>이메일</span>'+P[provider].email+'<br><span>휴대폰</span>010-2345-6789</div>'
     +'<label class="slm-ag slm-all"><input type="checkbox" id="slmAll">전체 동의</label>'
     +'<label class="slm-ag"><input type="checkbox" class="slm-c" id="slmReq"><span><em class="slm-tag slm-req">필수</em>이용약관과 개인정보 처리방침에 동의합니다.</span></label>'
     +'<label class="slm-ag"><input type="checkbox" class="slm-c" id="slmMkt"><span><em class="slm-tag slm-opt">선택</em>쿠폰 발급과 혜택 소식을 카카오 알림톡·문자로 받겠습니다.</span></label>'
     /* 리뷰·사진 활용 동의는 가입 때 받지 않고 첫 리뷰 때 한 번만 묻습니다 */
     +'<label style="display:block;font-size:11.5px;font-weight:700;color:var(--ink,#231715);margin-top:10px">친구 추천 코드 <span style="font-weight:500;color:var(--mist,#8A8178)">(선택)</span></label>'
     +'<input class="slm-ref" id="slmRef" type="text" placeholder="예: THECLEAN-7KQ2MX" value="'+refVal+'"'+(refVal?' readonly':'')+'>'
     +'<button class="slm-go" type="button" id="slmGo">가입 완료</button>'
     +'<p class="slm-note" id="slmNote"></p></div>';
    modal.hidden=false; document.body.style.overflow='hidden';
    var $=function(id){ return modal.querySelector('#'+id); };
    function close(){ modal.hidden=true; document.body.style.overflow=''; }
    modal.querySelector('.slm-x').onclick=close; modal.querySelector('.slm-bg').onclick=close;
    $('slmAll').onchange=function(){ var on=this.checked; modal.querySelectorAll('.slm-c').forEach(function(c){ c.checked=on; }); };
    modal.querySelectorAll('.slm-c').forEach(function(c){ c.onchange=function(){ $('slmAll').checked=[].every.call(modal.querySelectorAll('.slm-c'),function(x){return x.checked;}); }; });
    $('slmGo').onclick=function(){
      if(!$('slmReq').checked){ $('slmNote').textContent='필수 약관에 동의해 주세요.'; return; }
      done(member(provider,{ mkt:$('slmMkt').checked, rv:false, ref:$('slmRef').value.trim()||null }));
    };
  }

  function start(provider, mode){
    /* 로그인 화면: 이미 연결된 계정이면 바로 로그인 (프로토타입은 가입된 것으로 가정)
       가입 화면: 동의 화면으로. 실개발 — 로그인 화면에서도 가입 이력이 없으면 같은 동의 화면으로 이어짐 */
    if(mode==='login'){ var m=member(provider,{mkt:true}); m.zip='07807'; m.addr='서울 강서구 마곡중앙로 161-8'; m.addr2='B동 1203호'; m.birth='1990-11-07'; m.mktConsentAt='2026-03-12T10:00:00'; m.spent12m=2140000; m.spent24m=3620000; m.spent36m=4880000; m.referral12m=100000; done(m); }
    else openJoin(provider);
  }

  window.TCCSocial = { mount:function(el, mode){
    el.classList.add('sl');
    el.innerHTML=
      '<button type="button" class="sl-kakao" data-p="kakao">'+ICON.kakao+(mode==='login'?'카카오 로그인':'카카오로 시작하기')+'</button>'
     +'<div class="sl-more">'
     +'<button type="button" class="sl-circle sl-naver" data-p="naver" aria-label="네이버로 '+(mode==='login'?'로그인':'시작하기')+'">'+ICON.naver+'</button>'
     +'<button type="button" class="sl-circle sl-google" data-p="google" aria-label="구글로 '+(mode==='login'?'로그인':'시작하기')+'">'+ICON.google+'</button>'
     +'</div>';
    el.querySelectorAll('[data-p]').forEach(function(b){ b.addEventListener('click', function(){ start(b.dataset.p, mode); }); });
  }};
})();
