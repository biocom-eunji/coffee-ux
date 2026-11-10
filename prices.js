/* ============================================================
   더클린커피 · 가격표 (단일 관리 파일)
   ------------------------------------------------------------
   이 파일 하나만 고치면 상세 · 장바구니 · 결제 · 추천 카드까지
   사이트 전체 가격이 함께 바뀝니다. 다른 파일은 손대지 마세요.

   [ 수정 방법 ]
   · 숫자만 바꾸면 됩니다. 쉼표·원 표시는 넣지 마세요.
     맞는 예 : 18000        틀린 예 : 18,000원
   · 아직 정해지지 않은 가격은 null 로 두세요.
     null 이면 화면에 "가격 확정 대기"로 표시되고 구매 버튼이 잠깁니다.
   · 판매를 잠시 멈출 때도 null 로 바꾸면 됩니다.

   [ 이력 ]
   · 바꾸신 날짜와 내용을 파일 맨 아래 변경 이력에 한 줄 남겨 주세요.

   마지막 수정 : 2026-09-22 · 관리 담당 : MD
   ※ 프로토타입용 파일 — 실개발 시 MD가 관리자 화면에서 직접 수정 (기능 사양서 §5-A)
   ============================================================ */

window.TCC_PRICES = {

  /* ---------- 원두 (200g / 500g / 1kg) ---------- */
  beans: {
    'colombia'   : { name: '콜롬비아',                 '200g': 19900, '500g': 36900, '1kg': null, list: { '200g': 29900, '500g': null }, show: false },
    'ethiopia'   : { name: '에티오피아',               '200g': 21900, '500g': 41900, '1kg': null, list: { '200g': 31900, '500g': null }, show: false },
    'kenya'      : { name: '케냐',                     '200g': 22900, '500g': 42900, '1kg': null, list: { '200g': 32900, '500g': null }, show: false },
    'guatemala'  : { name: '과테말라',                 '200g': 20900, '500g': 39900, '1kg': null, list: { '200g': 30900, '500g': null }, show: false },
    'png'        : { name: '파푸아뉴기니',             '200g': 19900, '500g': 36900, '1kg': null, list: { '200g': 29900, '500g': null }, show: false },
    'png-decaf'  : { name: '파푸아뉴기니 디카페인',     '200g': 20900, '500g': 39900, '1kg': null, list: { '200g': 30900, '500g': null }, show: false },
    'velvet'     : { name: '벨벳 블렌드',              '200g': 16900, '500g': 26900, '1kg': null, list: { '200g': 26900, '500g': null }, show: false },
    'aurora'     : { name: '오로라 블렌드',            '200g': 19900, '500g': 36900, '1kg': null, list: { '200g': 34000, '500g': null }, show: false },
    'siesta'     : { name: '시에스타 · 하프카페인',     '200g': 26900, '500g': 47900, '1kg': null, list: { '200g': null, '500g': null }, show: false },
    'vinchaud'   : { name: '벨지안 뱅쇼',              '200g': 27900, '500g': null, '1kg': null, list: { '200g': null, '500g': null }, show: true }
    /* list = 정가 · show = 고객 화면에 정가 취소선과 할인율을 보일지(MD가 관리자 PRD-03에서 결정). show가 false면 정가를 넣어 두어도 판매가만 보임. 정가 초기값은 공식몰 정가 기준 — MD 확인 후 확정 */
  },

  /* ------------------------------------------------------------
     정기배송 가격 — 일반 판매가 그대로 (정기배송 할인 없음)
     · 정기배송 회차는 등급과 관계없이 결제 금액의 10%를 적립 (subPointRate) — 첫 정기배송 혜택 첫 회차는 20% 할인된 금액 기준
     · sub 표는 비워 둠 — 값을 넣으면 그 품목만 지정가로 결제됨
     ------------------------------------------------------------ */
  subRate: 0,
  subPointRate: 0.10,
  sub: {},

  /* ---------- 드립백 · 방탄커피 ---------- */
  items: {
    'dripbag-single' : { name: '드립백 단품',            price: 10900, listPrice: null  },
    'dripbag-set'    : { name: '드립백 세트',            price: 42000, listPrice: 66000, show: false },
    'bulletproof'    : { name: '더클린 방탄커피 1BOX',   price: 33900, listPrice: 41900, show: false },
    /* 방탄커피 묶음 — 선택창 옵션 3종 (1박스 / 4+1박스 / 7+3박스) */
    'bulletproof-4p1': { name: '더클린 방탄커피 4+1박스', price: 135600, listPrice: null, boxes: 5  },
    'bulletproof-7p3': { name: '더클린 방탄커피 7+3박스', price: 237300, listPrice: null, boxes: 10 }
  },

  /* ---------- 굿즈 ---------- */
  goods: {
    'tasting-note' : { name: '더클린 테이스팅 노트',   price: 9000 },
    'canister'     : { name: '더클린 진공 커피 캐니스터', price: null },
    'cup-set'      : { name: '더클린커피하우스 찻잔세트',      price: null }
  },

  /* ---------- 선물세트 ---------- */
  gift: {
    'first-note'  : { name: 'FIRST NOTE 4종 세트', price: 100000 },
    'discovery'   : { name: '디스커버리 세트',      price: 31000 }   /* 이후 MD 수정 · 40,000원 미만이라 배송비 3,000원 발생 */
  },

  /* ---------- 배송 ---------- */
  shipping: {
    fee        : 3000,    // 기본 배송비
    freeOver   : 40000,   // 일반 주문: 이 금액 이상 무료배송
    subFreeOver: 30000,   // 정기배송: 회차 금액이 이 금액 이상이면 무료배송
    islandFee  : { jeju: 3000, other: 5000 }   // 제주 · 도서산간 추가 배송비 — 현 공식몰 값으로 교체(관리자 COM-04 배송비에서 수정). 지금 값은 프로토타입 기본값
  },

  /* ---------- B2B 단계별 가격  ----------
     누적 구매량(kg) 구간 4단계 — 기간 없음. supply = 공급가(부가세 별도), sale = 판매가(부가세 포함)
     구간 경계(minKg)·품목별 단가·고정 단가는 커피팀 MD가 관리자 가격 화면에서 입력 (아래 값은 초기값)
     배열 순서: [1단계 10kg 미만, 2단계 10~40kg 미만, 3단계 40~80kg 미만, 4단계 80kg 이상(별도 협의)]
     드립백 · 방탄커피도 원두 200g · 500g과 같은 구간 할인(고정 단가 폐기)                                   */
  b2b: {
    countFrom: 'delivered',  /* 납품 완료 시점부터 누적에 반영 */
    leadTimeDays: 2,         /* 주문부터 출고까지 영업일 — MD가 관리자에서 입력, null이면 화면에 표시하지 않음 */
    moq: { enabled: false, kg: 3 },    /* 오픈 때는 끄고, 나중에 3kg로 켤 예정 */  /* 최소 주문 수량(원두 kg) — MD가 관리자 PRD-04에서 켜고 끔. 켜면 장바구니 원두 합계가 모자랄 때 주문을 막음 */
    deliveryDay: { enabled: true, days: ['화','수','목'] },  /* 정기 납품 요일 지정 — MD가 관리자에서 켜고 끔 · 선택 가능 요일 편집 */
    tiers: [   /* 사업자 화면에는 kg 경계를 보이지 않고 단계 이름만 (단계 이름은 커피팀이 정함) */
      { step: 1, label: '1단계', cond: '1단계', minKg: 0,  ship: 3000, disc: '기본 단가' },
      { step: 2, label: '2단계', cond: '2단계', minKg: 10, ship: 0,    disc: '구간 단가' },
      { step: 3, label: '3단계', cond: '3단계', minKg: 40, ship: 0,    disc: '구간 단가' },
      { step: 4, label: '4단계', cond: '4단계', minKg: 80, ship: null, disc: '별도 협의', negotiable: true }
    ],
    /* 품목별 · 규격별 가격 — 규격 키: '1kg' '500g' '200g' '6pack'(드립백 12g×6개입) 'box'(방탄 1박스 7스틱)
       200g · 500g · 드립백 · 방탄: 소비자가(부가세 포함) × (1 − 할인율) ÷ 1.1 = 공급가(원 미만 절삭) · 할인율 1단계 5% / 2단계 10% / 3단계 15%
       1kg: 사업자 기준가(부가세 별도) × (1 − 할인율) · 할인율 1단계 0% / 2단계 5% / 3단계 10%
       판매가 = 공급가 × 1.1(원 미만 절삭) · 4단계(80kg 이상)는 별도 협의라 값 없음(null) · 에콰도르(The Prestige)는 사업자 판매 제외 */
    items: {
      'colombia'  : { '1kg': { supply: [34000,32300,30600,null], sale: [37400,35530,33660,null] }, '500g': { supply: [31868,30190,28513,null], sale: [35054,33209,31364,null] }, '200g': { supply: [17186,16281,15377,null], sale: [18904,17909,16914,null] } },
      'kenya'     : { '1kg': { supply: [44000,41800,39600,null], sale: [48400,45980,43560,null] }, '500g': { supply: [37050,35100,33150,null], sale: [40755,38610,36465,null] }, '200g': { supply: [19777,18736,17695,null], sale: [21754,20609,19464,null] } },
      'ethiopia'  : { '1kg': { supply: [38000,36100,34200,null], sale: [41800,39710,37620,null] }, '500g': { supply: [36186,34281,32377,null], sale: [39804,37709,35614,null] }, '200g': { supply: [18913,17918,16922,null], sale: [20804,19709,18614,null] } },
      'guatemala' : { '1kg': { supply: [36000,34200,32400,null], sale: [39600,37620,35640,null] }, '500g': { supply: [34459,32645,30831,null], sale: [37904,35909,33914,null] }, '200g': { supply: [18050,17100,16150,null], sale: [19855,18810,17765,null] } },
      'png'       : { '1kg': { supply: [34000,32300,30600,null], sale: [37400,35530,33660,null] }, '500g': { supply: [31868,30190,28513,null], sale: [35054,33209,31364,null] }, '200g': { supply: [17186,16281,15377,null], sale: [18904,17909,16914,null] } },
      'png-decaf' : { '1kg': { supply: [40000,38000,36000,null], sale: [44000,41800,39600,null] }, '500g': { supply: [34459,32645,30831,null], sale: [37904,35909,33914,null] }, '200g': { supply: [18050,17100,16150,null], sale: [19855,18810,17765,null] } },
      'velvet'    : { '1kg': { supply: [27000,25650,24300,null], sale: [29700,28215,26730,null] }, '500g': { supply: [23231,22009,20786,null], sale: [25554,24209,22864,null] }, '200g': { supply: [14595,13827,13059,null], sale: [16054,15209,14364,null] } },
      'aurora'    : { '1kg': { supply: [36000,34200,32400,null], sale: [39600,37620,35640,null] }, '500g': { supply: [31868,30190,28513,null], sale: [35054,33209,31364,null] }, '200g': { supply: [17186,16281,15377,null], sale: [18904,17909,16914,null] } },
      'siesta'    : { '1kg': { supply: [38000,36100,34200,null], sale: [41800,39710,37620,null] }, '500g': { supply: [41368,39190,37013,null], sale: [45504,43109,40714,null] }, '200g': { supply: [23231,22009,20786,null], sale: [25554,24209,22864,null] } },
      'dripbag'   : { '6pack': { supply: [9413,8918,8422,null], sale: [10354,9809,9264,null] } },
      'bulletproof': { 'box': { supply: [29277,27736,26195,null], sale: [32204,30509,28814,null] } }
      /* 기업 선물(FIRST NOTE · 디스커버리 · 드립백 세트): 구간은 원두와 같게 적용하되 사업자 단가 미산정 — 사업자 화면 "가격 확인" */
    },
    note: '단계는 기간 제한 없는 누적 구매 완료량(납품 완료 kg) 기준 · 4단계는 별도 협의 · 도서·산간 배송비 별도 협의 · 생두 시세·환율 변동 시 사전 안내 후 조정'
  }
};

/* ------------------------------------------------------------
   아래는 손대지 않으셔도 됩니다. (화면 표시용 공통 함수)
   ------------------------------------------------------------ */
/* 정가 · 할인율 노출 — show가 true인 상품만 정가를 화면에 넘김(false면 판매가만 표시) */
(function(){ var g=window.TCC_PRICES; if(!g) return;
  /* 할인 표시 시안 모드 — 주소에 ?sale=1로 들어오면 그 창에서만 PREVIEW 상품의 정가 · 할인율을 켬(?sale=0이면 끔). 실제 노출은 관리자 스위치(show)로만 */
  var PREVIEW=['colombia','velvet'], prev=false;
  try{ var q=location.search||''; if(/[?&]sale=1/.test(q)) sessionStorage.setItem('tcc_sale_preview','1'); if(/[?&]sale=0/.test(q)) sessionStorage.removeItem('tcc_sale_preview'); prev=sessionStorage.getItem('tcc_sale_preview')==='1'; }catch(e){ prev=/[?&]sale=1/.test(location.search||''); }
  if(prev){ PREVIEW.forEach(function(k){ if(g.beans[k]) g.beans[k].show=true; });
    document.addEventListener('DOMContentLoaded',function(){ var t=document.createElement('a'); t.href=location.pathname.split('/').pop().replace(/^(asis|tobe)-/,'')+'?sale=0'; t.textContent='할인 표시 시안 보는 중 · 끄기'; t.setAttribute('style','position:fixed;left:12px;bottom:'+(innerWidth<=760?88:12)+'px;z-index:200;background:#111921;color:#fff;font-size:12px;padding:8px 12px;border-radius:999px;text-decoration:none;opacity:.88'); document.body.appendChild(t); }); }
  Object.keys(g.beans||{}).forEach(function(k){ var b=g.beans[k]; if(b && b.list && b.show!==true){ b.listRaw=b.list; b.list={'200g':null,'500g':null}; } });
  ['items','goods','gift'].forEach(function(t){ var o=g[t]||{}; Object.keys(o).forEach(function(k){ var x=o[k]; if(x && x.listPrice!=null && x.show!==true){ x.listRaw=x.listPrice; x.listPrice=null; } }); });
})();

window.TCC_PRICE = {
  /* 원두 가격: TCC_PRICE.bean('colombia', '200g') */
  bean: function (key, weight) {
    var b = window.TCC_PRICES.beans[key];
    return (b && b[weight] != null) ? b[weight] : null;
  },
  /* 정기배송 결제 금액: TCC_PRICE.subBean('colombia','200g') — sub 표에 있으면 그 값, 없으면 판매가 그대로(subRate 0) */
  subBean: function (key, weight) {
    var g = window.TCC_PRICES, t = g.sub && g.sub[key];
    if (t && t[weight] != null) return t[weight];
    var base = this.bean(key, weight);
    return base == null ? null : Math.floor(base * (1 - (g.subRate || 0)) / 100) * 100;
  },
  subItem: function (key) {
    var g = window.TCC_PRICES, base = this.item(key);
    return base == null ? null : Math.floor(base * (1 - (g.subRate || 0)) / 100) * 100;
  },
  /* 원두 정가(취소선): TCC_PRICE.listBean('colombia','200g') — 없으면 null */
  listBean: function (key, weight) {
    var b = window.TCC_PRICES.beans[key];
    return (b && b.list && b.list[weight] != null) ? b.list[weight] : null;
  },
  listItem: function (key) {
    var g = window.TCC_PRICES, o = (g.items[key] || g.goods[key] || g.gift[key]);
    return (o && o.listPrice != null) ? o.listPrice : null;
  },
  /* 단품 가격: TCC_PRICE.item('bulletproof') */
  item: function (key) {
    var g = window.TCC_PRICES;
    var o = (g.items[key] || g.goods[key] || g.gift[key]);
    return (o && o.price != null) ? o.price : null;
  },
  /* 화면 표기: 값이 없으면 "가격 확정 대기" */
  text: function (n) {
    return (n == null) ? '가격 확정 대기' : n.toLocaleString('ko-KR') + '원';
  },
  /* 가격이 정해졌는지 — 구매 버튼 활성 판단용 */
  ready: function (n) { return n != null; },
  /* 본인 등급의 적립률만 반환 — 상위 등급 적립률은 화면에 노출하지 않음
     비로그인·BASIC 1% / PRIME 2% / CRAFT 3% / INTEGRITY 4% / MASTERY 5% (최근 12개월 구매+추천 실적 기준) */
  /* 사업자 단계 (1~4) — 누적 구매량(kg) 기준(기간 없음), 회원 정보 tier 우선 */
  bizStep: function (m) {
    if (!m) return 1;
    if (m.tier) return m.tier;
    return this.stepByKg(this.bizKgSum(m));
  },
  /* 누적 구매 완료량(kg) — 납품 완료 처리된 주문만 합산, 기간 없음 */
  bizKgSum: function (m) { return (m && (m.kgTotal != null ? m.kgTotal : m.kg24 != null ? m.kg24 : m.monthKg)) || 0; },
  /* 사업자 단가: TCC_PRICE.bizPrice('kenya', '1kg', 2) → { sale, supply, negotiable } | null */
  bizPrice: function (key, size, step) {
    var it = window.TCC_PRICES.b2b.items[key]; if (!it || !it[size]) return null;
    var r = it[size];
    if (r.fixed) return { sale: r.sale, supply: r.supply, negotiable: false, fixed: true };   /* 드립백·방탄: 구간 무관 고정가 */
    var i = Math.max(1, Math.min(4, step || 1)) - 1;
    if (r.sale[i] == null) return { sale: null, supply: null, negotiable: true };   /* 4단계 — 별도 협의 */
    return { sale: r.sale[i], supply: r.supply[i], negotiable: false };
  },
  bizKg: function (key, step) { return this.bizPrice(key, '1kg', step); },
  /* 규격 → kg 환산 (구간 산정용) — 원두만 누적, 드립백·방탄 포함 여부 미확정 */
  sizeKg: function (size) { return size === '1kg' ? 1 : size === '500g' ? 0.5 : size === '200g' ? 0.2 : 0; },
  /* 누적 kg → 적용 구간 */
  stepByKg: function (kg) {
    var t = window.TCC_PRICES.b2b.tiers, s = 1;
    for (var i = 0; i < t.length; i++) if (kg >= t[i].minKg) s = t[i].step;
    return s;
  },
  /* 등급 판정 — 사이트 전체가 이 함수 하나를 씀(실개발은 서버가 확정한 등급 · 적립률을 내려줌).
     기간별로 따로 판정해 충족한 가장 높은 등급 · PRIME·CRAFT 12개월 / INTEGRITY 24개월 / MASTERY 36개월 · 추천 실적 합산 */
  grade: function (m) {
    if (m === undefined) { try { m = JSON.parse(localStorage.getItem('tcc_member') || 'null'); } catch (e) { m = null; } }
    if (!m) return { name: 'BASIC', rate: 0.01 };
    var r12 = m.referral12m || 0, r24 = m.referral24m != null ? m.referral24m : r12, r36 = m.referral36m != null ? m.referral36m : r24;
    var s12 = (m.spent12m || 0) + r12;
    var s24 = (m.spent24m != null ? m.spent24m : m.spent12m || 0) + r24;
    var s36 = (m.spent36m != null ? m.spent36m : (m.spent24m != null ? m.spent24m : m.spent12m || 0)) + r36;
    if (s36 >= 10000000) return { name: 'MASTERY', rate: 0.05 };
    if (s24 >= 5000000)  return { name: 'INTEGRITY', rate: 0.04 };
    if (s12 >= 3000000)  return { name: 'CRAFT', rate: 0.03 };
    if (s12 >= 1500000)  return { name: 'PRIME', rate: 0.02 };
    return { name: 'BASIC', rate: 0.01 };
  },
  pointRate: function () { return this.grade().rate; },
  /* 정기배송 회차 적립률 — 등급과 관계없이 5% (등급 적립과 겹치지 않음) */
  subPointRate: function () { var r = window.TCC_PRICES.subPointRate; return r == null ? 0.10 : r; },
  /* 고객 직접 취소 기한 = 주문(결제) 당일 13:00 하나로 통일. 13:00 이후 결제 건은 바로 취소할 수 없고 고객센터로.
     holidays는 출고 안내(다음 영업일 발송)에만 씀(실개발은 관리자 COM-04 영업일 캘린더). paidAt: ISO 또는 YYYY-MM-DD */
  holidays: ['2026-10-03','2026-10-09','2026-12-25'],
  cancelUntil: function (paidAt) {
    var d = String(paidAt || '').length <= 10 ? new Date(paidAt + 'T00:00:00') : new Date(paidAt);
    var cut = new Date(d); cut.setHours(13, 0, 0, 0);
    return cut;
  },
  cutLabel: function (cut) { var W = ['일','월','화','수','목','금','토']; return (cut.getMonth()+1) + '.' + String(cut.getDate()).padStart(2,'0') + '(' + W[cut.getDay()] + ') 13:00'; },
  /* 제주 · 도서산간 추가 배송비 — 실개발은 우편번호 API · 공식몰 도서산간 우편번호표로 판정. 프로토타입은 제주(63xxx)만 판정 */
  islandFee: function (zip) {
    var f = (window.TCC_PRICES && TCC_PRICES.shipping && TCC_PRICES.shipping.islandFee) || {};
    zip = String(zip || '').replace(/\D/g, '');
    if (/^63/.test(zip)) return f.jeju || 0;
    return 0;
  }
};

/* ============================================================
   변경 이력
   ------------------------------------------------------------
   2026-09-18  파일 신설 · 기존 페이지별 하드코딩을 이 파일로 통합
               (드립백 10,900 / 방탄커피 33,900 / 테이스팅 노트 9,000 / 시에스타 200g 26,900 반영)
   2026-09-18  원두 200g 4종 입력 — 현 공식몰(thecleancoffee.com) 할인가 기준 임시 적용
               콜롬비아 18,300 / 에티오피아 19,300 / 케냐 19,300 / 디카페인 19,300
               (근거: 2025.01 자사 가격 비교표 + 공식몰 케냐 적립 193포인트로 교차 확인)
               ※ 리브랜딩 가격 확정 시 그로스팀·커피팀이 교체
   2026-09-22  시그니처 블렌드 200g 2종 입력 — 공식몰 판매가 기준
               벨벳 16,900 (정가 26,900) / 오로라 19,900 (정가 34,000)
   2026-09-22  파푸아뉴기니 디카페인 200g 19,300 → 20,900 (정가 30,900) — 공식몰 실제 판매가로 교체
               (기존 19,300은 공식몰 과테말라 디카페인 가격을 빌려 넣었던 값)
   2026-09-22  과테말라(와이칸) 200g 20,900 (정가 30,900) — 공식몰 판매가 기준
   2026-09-22  파푸아뉴기니(마라와카 AA 블루마운틴) 200g 19,900 (정가 29,900) — 공식몰 판매가 기준
   2026-09-22  콜롬비아 200g 18,300 → 19,900 (정가 29,900) — 공식몰 최신 판매가로 교체 (기존값은 2025.01 자료)
   2026-09-22  에티오피아 200g 19,300 → 21,900 (정가 31,900) / 케냐 200g 19,300 → 22,900 (정가 32,900)
               — 공식몰 최신 판매가로 교체 (기존값은 2025.01 자료)
   2026-09-22  드립백 세트 42,000 (정가 66,000) — 공식몰 판매가 기준, 구성 드립백 4종 + 쇼핑백
   2026-09-22  FIRST NOTE 4종 세트 100,000 — 세트 고정가 (원두 구성과 무관)
   2026-09-22  B2B 원두 공급가 입력 — 1kg 기준 4단계, 공급가·판매가(부가세 포함) 병기
   2026-09-22  B2B 단계별 가격 반영 — 구간 10/30/100kg, 100kg 이상 별도 협의(참고가), 소포장 200g·500g · 드립백 6개입 · 방탄 1박스 추가
   2026-09-22  원두 500g 소비자가 8종 입력 — B2B 가격표 소비자가 열 기준
   B2B 구간 산정 — 누적 구매량(kg)만, 기간 없음 · 납품 완료 시점부터 반영 · 경계·단가는 MD 입력
   2026-09-23  드립백 · 방탄커피 사업자 가격을 구간 무관 고정 단가로 변경 (드립백 10,355 / 방탄 32,205, 부가세 포함)
   2026-09-23  드립백 · 방탄커피 고정 단가를 가격표 최저 칸(20% 할인)으로 상향 — 매장 재판매 마진 확보 (드립백 8,720 / 방탄 27,120)
   2026-09-23  디스커버리 세트 31,000 — 이후 변경은 MD가 관리자 화면에서
   2026-09-23  소비자가는 공식몰 판매가 기준 — 오로라 200g 19,900 확정, 사업자 200g 단가도 19,900 기준으로 재계산
   2026-09-23  시에스타 200g 26,900 — 공식몰 판매가 확인
   2026-11-02  정기배송 5% 할인 폐지 — 판매가 그대로 결제 · 회차마다 10% 적립(subPointRate · 첫 회차는 할인된 금액 기준) / 첫 정기배송 혜택 = 첫 회차 20% 할인 + 원두 100g(커피팀 선택)
   ============================================================ */
