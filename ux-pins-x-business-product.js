(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var keys = ['aurora', 'bulletproof', 'colombia', 'discovery', 'dripbag-set', 'dripbag', 'ethiopia', 'first-note', 'guatemala', 'kenya', 'png-decaf', 'png', 'siesta', 'velvet'];
  var tr = { top: '-6px', right: '-6px' };
  function asis() {
    return [
      { sel: '.bp-price', i: 0, at: tr, t: '단가가 한 줄뿐입니다', d: '지금 적용되는 단가 한 가지만 보이고, 다른 단계 단가는 보이지 않습니다. 수량을 늘리면 얼마나 내려가는지 비교할 수 없습니다.' },
      { sel: '.bp-supply', i: 0, at: tr, t: '핵심 정보가 작은 회색 글씨', d: '공급가·적용 단계·배송비·다음 단계 단가가 12px 회색 문장 하나에 이어져 있어 읽기 어렵습니다. (가격이 있는 품목)' },
      { sel: '.bp-qty', i: 0, at: tr, t: '수량 옆에 합계가 없습니다', d: '수량을 바꿔도 합계가 보이지 않아, 장바구니로 가야 금액을 알 수 있습니다. 출고 일정·납품 요일도 이 화면에는 없습니다.' },
      { sel: '.bp-actions', i: 0, at: tr, t: '버튼 두 개가 같은 비중', d: '장바구니와 주문하기가 같은 크기로 나란히 있어 어느 쪽이 주된 행동인지 구분되지 않습니다.' }
    ];
  }
  function tobe(pc) {
    var a = [
      { sel: '.tb-tiers', i: 0, at: tr, t: '단계별 단가표를 한눈에', d: '1~3단계 판매가·공급가·배송비를 표로 나란히 보여 주고, 4단계는 별도 협의로 표시했습니다. 선택한 용량에 맞춰 바뀝니다. (가격이 있는 품목)' },
      { sel: '.tb-tbl .cur', i: 0, at: tr, t: '내 적용 단계 강조', d: '현재 적용 중인 단계를 하늘색으로 표시하고 "적용 중"을 붙였습니다. 단계는 납품 완료 누적량으로 정해지는 기존 기준을 그대로 따릅니다.' },
      { sel: '.tb-buy', i: 0, at: tr, t: '수량 옆에 바로 합계', d: '수량을 바꾸면 바로 옆 칸의 합계(부가세 포함)가 함께 바뀌고, 배송비 여부도 한 줄로 알려 줍니다.' },
      { sel: '#bpOrder', i: 0, at: tr, t: '주문하기를 가장 크게', d: '주문하기를 전체 폭의 가장 큰 버튼으로, 장바구니 담기는 그 아래 보조 버튼으로 나눠 위계를 만들었습니다.' },
      { sel: '.tb-info', i: 0, at: tr, t: '출고 · 납품 요일 · 배송비', d: '주문 후 출고 영업일, 납품 요일, 배송비를 구매 버튼 바로 아래에 모았습니다. 값은 관리자 설정을 읽어 오며, 꺼져 있으면 보이지 않습니다.' },
      { sel: '.bp-sample', i: 0, at: tr, t: '샘플 신청 안내를 크게', d: '원두 품목의 "주문 전에 먼저 맛보세요" 샘플 신청 안내를 구매 버튼 바로 아래에서 글자를 키워 눈에 띄게 했습니다. 연결 대상은 기존 샘플 신청 화면 그대로입니다.' }
    ];
    if (pc) a.push({ sel: '.bp-img', i: 0, at: tr, t: '스크롤해도 이미지 고정', d: '단가표와 옵션이 길어져도 상품 이미지가 왼쪽에 머물러, 비교하며 고를 수 있습니다.' });
    else a.push({ sel: '.tb-hasbar .bp-name', i: 0, at: { top: '-6px', right: '-6px' }, t: '하단 합계·주문 바', d: '구매 버튼이 화면 밖으로 나가면 하단에 합계와 주문하기가 고정되어 끝까지 스크롤하지 않고 주문할 수 있습니다. 글자·입력 칸도 크게 키웠습니다.' });
    return a;
  }
  keys.forEach(function (k) {
    M['business-p-' + k] = { asis: asis(), tobe: tobe(false) };
    P['business-p-' + k] = { asis: asis(), tobe: tobe(true) };
  });
})();
