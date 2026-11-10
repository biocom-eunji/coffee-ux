(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var asis = [
    { sel: '#evbNow .evb-period', at: { top: '-6px', right: '-6px' }, t: '행사 기간이 작은 회색 글씨',
      d: '"10.20 – 12.25 · 상품 4개"가 가장 작고 연한 글씨라 마감 시점이 눈에 띄지 않고, 몇 월 며칠인지도 숫자로만 적혀 있습니다.' },
    { sel: '#evbNow .evb-more', at: { top: '-6px', right: '-6px' }, t: '구매로 이어지는 길이 약함',
      d: '행사에 담긴 상품 이름·가격은 보이지 않고 작은 밑줄 링크 "자세히 보기"만 있어, 상품을 보려면 한 번 더 들어가야 합니다.' },
    { sel: '#evbPast', at: { top: '-6px', right: '-6px' }, t: '지난 행사가 자리표시 이미지',
      d: '종료된 행사 2건이 사선 무늬 자리표시 이미지와 연한 글씨로 계속 보이고, 눌러도 열리지 않습니다.' }
  ];
  var tobe = [
    { sel: '.tb-hero', at: { top: '-6px', right: '-6px' }, t: '진행 중 행사를 가장 크게',
      d: '진행 중 행사를 큰 카드(사진 + 제목 + 기간 + 소개)로 맨 위에 두고, 지난 행사는 아래로 내렸습니다.' },
    { sel: '.tb-state', at: { top: '-6px', right: '-6px' }, t: '"진행 중 · 49일 남음"',
      d: '상태 배지와 남은 일수를 붉은 굵은 글씨로 함께 보여 마감이 한눈에 보입니다. 남은 일수는 오늘 날짜로 자동 계산합니다.' },
    { sel: '.tb-period', at: { top: '-6px', right: '-6px' }, t: '기간을 "10월 20일 ~ 12월 25일"로',
      d: '작은 회색 "10.20 – 12.25" 대신 월·일을 한글로 풀어 16px 굵은 글씨로 보여 줍니다.' },
    { sel: '.tb-items', at: { top: '-6px', right: '-6px' }, t: '행사 상품을 카드에서 바로',
      d: '행사 상품의 이름·한 줄 소개·가격·BEST/HOT 배지를 목록에서 바로 보여 줍니다. 가격은 판매가만 표시합니다.' },
    { sel: '.tb-buy', at: { top: '-6px', right: '-6px' }, t: '"구매하기" 버튼(높이 48px)',
      d: '상품마다 큰 구매하기 버튼을 두어 행사에서 바로 상품 페이지로 이동해 구매할 수 있습니다.' },
    { sel: '.tb-all', at: { top: '-6px', right: '-6px' }, t: '"행사 자세히 보기"를 버튼으로',
      d: '작은 밑줄 링크였던 자세히 보기를 테두리 있는 52px 버튼으로 바꿨습니다.' },
    { sel: '#evbPast', at: { top: '-6px', right: '-6px' }, t: '지난 행사는 한 줄 기록으로',
      d: '자리표시 이미지를 없애고 제목·기간·"종료" 표시만 한 줄씩 보여 비중을 낮췄습니다.' }
  ];
  M['events'] = { asis: asis, tobe: tobe };
  P['events'] = { asis: asis, tobe: tobe };
})();
