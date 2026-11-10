(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var asisM = [
    { sel: '#evMeta', at: { top: '-6px', right: '-6px' }, t: '행사 기간이 작은 회색 글씨', d: '"진행 중 10.20 – 12.25"가 작고 연한 글씨라 언제까지인지 한눈에 들어오지 않습니다.' },
    { sel: '#evIntro', at: { top: '-6px', right: '-6px' }, t: '긴 안내가 상품보다 먼저', d: '쿠폰 발급일 등 두 줄 넘는 안내문이 상품 목록보다 위에 펼쳐져, 상품까지 스크롤이 길어집니다.' },
    { sel: '#evGrid .item', i: 0, at: { top: '-6px', right: '-6px' }, t: '카드에서 바로 담기·구매가 없음', d: '카드를 눌러 상세로 들어가야만 구매할 수 있고, 담기 아이콘은 작은 아이콘 하나뿐입니다.' }
  ];
  var asisP = asisM.slice();
  var tobeM = [
    { sel: '#evMeta', at: { top: '-6px', right: '-6px' }, t: '기간을 크고 굵게 맨 위에', d: '진행 상태와 기간을 17px 굵은 글씨로 키우고, 한 줄 혜택 문구(행사 부제)를 바로 아래에 두었습니다.' },
    { sel: '.tb-more', at: { top: '-6px', right: '-6px' }, t: '긴 안내는 접기', d: '쿠폰 발급일 등 긴 안내는 「행사 안내 자세히 보기」 안으로 접어, 상품이 더 빨리 보입니다.' },
    { sel: '#evGrid .item', i: 0, at: { top: '-6px', right: '-6px' }, t: '카드에 담기·구매하기 버튼', d: '작은 아이콘 대신 높이 50px의 「담기」「구매하기」 버튼을 카드마다 두었습니다. 담기는 기존 옵션 선택·담기 동작을 그대로 씁니다.' }
  ];
  var tobeP = tobeM.slice();
  tobeP.push({ sel: '#evGrid', at: { top: '-6px', left: '-6px' }, t: 'PC는 4열로 한 화면에', d: '상품 4개가 한 줄에 놓여 스크롤 없이 비교할 수 있습니다. (모바일은 2열)' });
  M['event'] = { asis: asisM, tobe: tobeM };
  P['event'] = { asis: asisP, tobe: tobeP };
})();
