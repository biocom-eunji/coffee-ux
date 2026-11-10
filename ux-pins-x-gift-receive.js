(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var asisM = [
    { sel: '#grTitle', i: 0, at: { top: '-6px', right: '-6px' }, t: '큰 제목, 보낸 분이 안 보임', d: '링크가 열리지 않을 때(이 미리보기) 큰 제목만 뜨고 누가 보낸 선물인지, 다음에 무엇을 해야 하는지가 없습니다.' },
    { sel: '.gr-state', i: 0, at: { top: '-6px', right: '-6px' }, t: '다음 행동 버튼 없음', d: '안내가 13.5px 작은 글씨뿐이고 고객센터로 연결하는 버튼이 없어, 낯선 첫 방문자는 어디에 문의할지 알기 어렵습니다.' },
    { sel: '#grCard', i: 0, at: { top: '-6px', right: '-6px' }, t: '정상 링크도 위계가 약함', d: '정상 링크를 직접 열어 보면 메시지·상품이 한 박스에 섞여 있고, 입력창 13px·안내 11~12px, 거절은 12px 회색 밑줄 링크(누르면 기본 확인창)라 눈에 띄지 않습니다.' }
  ];
  var asisP = [
    { sel: '#grTitle', i: 0, at: { top: '-6px', right: '-6px' }, t: '제목이 과하게 큼', d: '큰 제목과 여백이 화면 절반을 차지하고, 링크가 열리지 않을 때는 누가 보낸 선물인지·다음 행동이 없습니다.' },
    { sel: '.gr-state', i: 0, at: { top: '-6px', right: '-6px' }, t: '다음 행동 버튼 없음', d: '안내가 작은 글씨뿐이고 고객센터로 이어지는 버튼이 없습니다.' },
    { sel: '#grCard', i: 0, at: { top: '-6px', right: '-6px' }, t: '정상 링크도 위계가 약함', d: '정상 링크를 직접 열어 보면 메시지·상품이 한 박스에 섞이고, 기한·도서산간 안내는 제출 버튼 아래 작은 글씨, 거절은 12px 회색 밑줄 링크뿐입니다.' }
  ];
  var tobeM = [ { sel: '#tbGiftOff .tb-off-card', at: { top: '-6px', right: '-6px' }, t: '선물하기는 이번 오픈에서 제외', d: '선물하기는 기획 · 개발 리소스에 비해 11/30 오픈 일정 안에서 충분한 완성도를 내기 어렵다고 보아 이번 리뉴얼 범위에서 뺐습니다. 코드는 그대로 두었고 기능 플래그(catalog.js 의 TB_FLAGS.gift)를 true로 바꾸면 되살릴 수 있어요. FIRST NOTE · 드립백 세트 · 디스커버리 세트는 일반 세트 상품으로 그대로 판매합니다.' } ];
  var tobeP = [ { sel: '#tbGiftOff .tb-off-card', at: { top: '-6px', right: '-6px' }, t: '선물하기는 이번 오픈에서 제외', d: '선물하기는 기획 · 개발 리소스에 비해 11/30 오픈 일정 안에서 충분한 완성도를 내기 어렵다고 보아 이번 리뉴얼 범위에서 뺐습니다. 코드는 그대로 두었고 기능 플래그(catalog.js 의 TB_FLAGS.gift)를 true로 바꾸면 되살릴 수 있어요. FIRST NOTE · 드립백 세트 · 디스커버리 세트는 일반 세트 상품으로 그대로 판매합니다.' } ];
  M['gift-receive'] = { asis: asisM, tobe: tobeM };
  P['gift-receive'] = { asis: asisP, tobe: tobeP };
})();
