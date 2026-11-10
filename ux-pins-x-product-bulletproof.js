(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var A_BEST = { sel: '#best', t: '방탄커피에 원두 리뷰 샘플', d: 'BEST REVIEW가 "200g · 홀빈", "로스팅 날짜" 같은 원두 후기 샘플이에요. 사진 자리도 비어 있어 방탄커피 상세에는 맞지 않습니다.' };
  var A_RECIPE = { sel: '#recipe', t: '먹는 법이 한참 아래에 있음', d: '"온수 120ml + 스틱 1포" 같은 레시피가 재료 소개와 검사 결과를 지나 한참 내려가야 나옵니다. 낯선 상품인데 어떻게 마시는지를 늦게 알게 돼요.' };
  var A_TOC = { sel: '.pd-toc-wrap', t: '작은 회색 탭, Q&A는 이동 안 됨', d: '탭 글씨가 12px 회색이라 눈에 잘 띄지 않고, "Q&A"는 가리키는 위치가 없어 눌러도 이동하지 않습니다.' };
  var A_SEL = { sel: '.pd-select-row', t: '구성별 가격이 드롭다운 안에 숨음', d: '1박스·4+1·7+3 중 무엇이 얼마인지 열어 보기 전에는 알 수 없습니다.' };
  var T_EAT = { sel: '.tb-eat', at: { top: '-6px', right: '-6px' }, t: '먹는 법을 구매 영역에서 바로', d: '제목 아래에 따뜻하게 · 라테 · 시원하게 세 가지를 사진과 분량("온수 120ml + 스틱 1포")으로 보여, 생소한 상품도 스크롤 없이 마시는 법을 알 수 있습니다. 누르면 자세한 먹는 법으로 이동해요.' };
  var T_RATE = { sel: '.tb-rate', at: { top: '-6px', right: '-6px' }, t: '평점 요약을 제목 아래에', d: '별점과 리뷰 수를 제목 아래에 두고 누르면 리뷰로 이동합니다. 수치는 샘플 후기 기준이라 게시 전 실제 집계로 교체가 필요해요.' };
  var T_TOC = { sel: '.pd-toc-wrap', at: { top: '-6px', right: '-6px' }, t: '먹는 법부터 시작하는 4칸 탭', d: '탭을 구매 영역 바로 아래에 4칸으로 크게 두고 스크롤해도 위에 붙게 했습니다. 순서는 먹는 법 · 상품정보 · 리뷰 · Q&A이고, 이동하지 않던 Q&A도 연결했어요.' };
  var T_BEST = { sel: '#best .rv-cards', at: { top: '-6px', right: '-6px' }, t: '글만 있는 베스트 리뷰 카드', d: '빈 사진 자리를 없애고 이 상품에 맞는 한두 줄 후기를 카드로 보여 줍니다. (샘플 문구 — 게시 전 실제 후기로 교체 필요)' };
  var T_RECIPE = { sel: '#recipe', at: { top: '8px', right: '-6px' }, t: '먹는 법을 리뷰 바로 아래로', d: '세 가지 레시피를 재료 소개보다 앞으로 옮기고 분량 글씨를 키웠습니다. 상품 소개를 읽기 전에 마시는 법을 먼저 확인할 수 있어요.' };
  M['product-bulletproof'] = { asis: [A_BEST, A_RECIPE, A_TOC, A_SEL], tobe: [T_EAT, T_RATE, T_TOC, T_BEST, T_RECIPE,
    { sel: '.m-buybar', at: { top: '-6px', right: '8px' }, t: '하단 바는 구매하기 하나로', d: '하단에 구매하기를 한 줄로 두었고, 구매하기를 누르면 구성을 고르는 창이 열립니다. 본문에서는 중복 버튼을 숨겼어요.' }] };
  P['product-bulletproof'] = { asis: [A_BEST, A_RECIPE, A_TOC, A_SEL], tobe: [T_EAT, T_RATE, T_TOC, T_BEST, T_RECIPE] };
})();
