/* 시연용: 장바구니가 비어 있으면 샘플 상품을, 최근 본 상품이 없으면 샘플 3개를 한 번만 넣어 둠 (화면 비교용) */
(function () {
  try {
    if (!localStorage.getItem('tcc_demo_recent') && !(JSON.parse(localStorage.getItem('tcc_recent') || '[]')).length) {
      localStorage.setItem('tcc_demo_recent', '1');
      localStorage.setItem('tcc_recent', JSON.stringify([
        { href: 'product-kenya.html', name: '케냐', img: 'images/thumbs/product-kenya.jpg' },
        { href: 'product-ethiopia.html', name: '에티오피아', img: 'images/thumbs/product-ethiopia.jpg' },
        { href: 'product-velvet.html', name: '벨벳 블렌드', img: 'images/thumbs/product-velvet.jpg' }
      ]));
    }
  } catch (e) {}
  try {
    if (localStorage.getItem('tcc_demo_seeded')) return;
    localStorage.setItem('tcc_demo_seeded', '1');
    if ((JSON.parse(localStorage.getItem('tcc_cart') || '[]')).length) return;
    localStorage.setItem('tcc_cart', JSON.stringify([
      { name: '콜롬비아', opt: '200g · 분쇄 안 함(홀빈)', qty: 1, price: 19900 },
      { name: '벨벳 블렌드', opt: '200g · 일반 분쇄(핸드드립)', qty: 2, price: 16900 }
    ]));
  } catch (e) {}
})();
