(function () {
  var M = (window.UX_PINS = window.UX_PINS || {}), P = (window.UX_PINS_PC = window.UX_PINS_PC || {});
  var A_CHIP = { sel: '#ntChips', at: { top: '-6px', right: '-6px' }, t: '분류 8개가 옆으로 잘림',
    d: '"선물하기" 뒤 분류(고객센터·리저브 클럽·혜택/소식)는 밀어 봐야 보여서 전체 분류를 알기 어렵습니다.' };
  var A_ITEM = { sel: '.nt-item', i: 0, at: { top: '-6px', right: '-6px' }, t: '화면으로 가는 안내가 없음',
    d: '알림 카드 전체가 링크인데 "눌러서 어디로 가는지" 표시가 없고, 새 알림과 지난 알림이 한 목록에 섞여 있습니다.' };
  var T_CHIP = { sel: '.nt-chips-wrap', at: { top: '-6px', right: '-6px' }, t: '분류 7개를 한눈에',
    d: '"분류 · 7개" 안내와 함께 4열 격자로 전부 보여 줍니다. 칩 높이를 키워 손가락으로 누르기 쉽게 했고, 읽지 않은 알림이 있는 분류에는 빨간 숫자를 달았습니다. (기획 외 제안 — 확인 필요)' };
  var T_SEC = { sel: '.nt-sec.new', at: { top: '-6px', right: '-6px' }, t: '읽지 않은 알림을 위로',
    d: '"읽지 않은 알림 N건"을 맨 위에 두고 이미 본 알림은 "이전 알림"으로 나눴습니다. 중요 공지가 있으면 그보다 위 "중요 공지"에 굵은 테두리로 고정됩니다. (기획 외 제안 — 확인 필요)' };
  var T_GO = { sel: '.nt-item .go', at: { top: '-6px', right: '-6px' }, t: '가는 곳을 버튼으로',
    d: '"정기배송 관리하기", "답변 확인하기"처럼 분류에 맞는 문구의 버튼을 카드마다 넣어 눌렀을 때 이동하는 화면을 알 수 있게 했습니다. 이동 주소는 기존 그대로입니다.' };
  var T_DEL = { sel: '#tbDel', at: { top: '-6px', right: '-6px' }, t: '알림함 페이지 삭제 제안',
    d: '알림 아이콘을 삭제하기로 해서 이 페이지로 들어오는 길이 없어집니다. 마이페이지의 알림함 섹션과 알림 설정 페이지까지 함께 정리할지 확인이 필요합니다. 남기기로 하면 아래 개선안을 적용합니다. (기획 외 제안 — 확인 필요)' };
  M['notices'] = { asis: [A_CHIP, A_ITEM], tobe: [T_DEL, T_CHIP, T_SEC, T_GO] };
  P['notices'] = { asis: [A_CHIP, A_ITEM], tobe: [T_DEL, T_CHIP, T_SEC, T_GO] };
})();
