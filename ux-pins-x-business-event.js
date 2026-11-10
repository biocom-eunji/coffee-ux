(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var asis = [
    { sel: '.coll-page-header h1', i: 0, at: { top: '-6px', right: '-6px' }, t: '행사 기간·혜택 안내 없음', d: '제목 아래에 행사가 언제까지인지, 어떤 단가·배송 조건이 적용되는지 설명이 없어 사업자가 행사 상품이 무엇인지 바로 알기 어렵습니다.' },
    { sel: '#bevGrid .item .imgbox', i: 0, at: { top: '-6px', right: '-6px' }, t: '카드에 가격이 없음', d: '카드에는 상품명과 한 줄 문구뿐이라 단가를 보려면 상품마다 상세 페이지로 들어가야 합니다.' },
    { sel: '#bevGrid .item .cap p', i: 0, at: { top: '-6px', right: '-6px' }, t: '모든 카드가 같은 문구', d: '"회원님의 구간 단가로 주문하실 수 있습니다."가 모든 카드에 똑같이 반복되어 상품을 구분하는 정보(규격·특징)가 되지 못합니다.' },
    { sel: '#bevGrid .item', i: 0, at: { bottom: '-6px', right: '-6px' }, t: '담기 버튼이 없음', d: '카드 전체가 링크일 뿐 "담기"로 이어지는 행동 유도가 보이지 않습니다.' }
  ];
  var tobe = [
    { sel: '#beHero', i: 0, at: { top: '-6px', right: '-6px' }, t: '행사 요약을 맨 위에', d: '사업자 행사 안내와 적용 단계·출고 일정·배송비를 제목 바로 아래에 짧게 모았습니다. 행사 기간은 관리자에 입력된 값이 있을 때 함께 표시됩니다 (기획 외 제안 — 확인 필요).' },
    { sel: '#bevGrid .be-sub', i: 0, at: { top: '-6px', right: '-6px' }, t: '카드마다 다른 서브 카피', d: '반복 문구 대신 상품 특징(있는 경우)과 주문 가능한 규격을 보여 줘 상품을 구분하기 쉽습니다.' },
    { sel: '#bevGrid .be-price', i: 0, at: { top: '-6px', right: '-6px' }, t: '내 구간 단가를 카드에서 확인', d: '회원 단계의 부가세 포함 단가와 다음 단계 단가를 카드에 바로 보여 줍니다. 4단계는 "별도 협의", 단가 미산정 상품은 "가격 확인"으로 표시합니다.' },
    { sel: '#bevGrid .be-go', i: 0, at: { top: '-6px', right: '-6px' }, t: '담기로 바로 이어지는 버튼', d: '높이 50px의 "옵션 선택하고 담기" 버튼을 카드 하단에 두어 상세에서 규격을 고르고 담는 흐름으로 이어집니다.' }
  ];
  M['business-event'] = { asis: asis, tobe: tobe };
  P['business-event'] = { asis: asis, tobe: tobe };
})();
