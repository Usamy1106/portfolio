const fadeInSections = document.querySelectorAll('.trigger');
const contentFadeInSections = document.querySelectorAll('contents_flex');
const cassopeFadeInSections = document.querySelectorAll('.character_trigger1');
const dipperFadeInSections = document.querySelectorAll('.character_trigger2');
// 関数：要素の一番上がビューポートの中央より10%下に来たかをチェック
const isElementInViewport = (el) => {
  const rect = el.getBoundingClientRect();
  const threshold = (window.innerHeight || document.documentElement.clientHeight) * 0.6; // 画面の60%の位置を基準に
  return rect.top <= threshold && rect.top >= 0;
};

// 関数：スクロールイベント時に要素をチェックしてクラスを追加
const handleScroll = () => {
  fadeInSections.forEach(section => {
    if (isElementInViewport(section)) {
      section.classList.add('action');
    }
  });
  contentFadeInSections.forEach(section => {
    if (isElementInViewport(section)) {
      section.classList.add('action');
    }
  });
  cassopeFadeInSections.forEach(section => {
    if (isElementInViewport(section)) {
      section.classList.add('action');
    }
  });
  dipperFadeInSections.forEach(section => {
    if (isElementInViewport(section)) {
      section.classList.add('action');
    }
  });
};

// スクロールイベントにハンドラーを追加
window.addEventListener('scroll', handleScroll);

// ページ読み込み時も一度チェック
window.addEventListener('load', handleScroll);



//ハンバーガーメニュー
document.querySelector('.openbtn').addEventListener('click', function() {
  this.classList.toggle('active'); // ボタンに 'active' クラスを付与・除去
  document.getElementById('g-nav').classList.toggle('panelactive'); // ナビゲーションに 'panelactive' クラスを付与・除去
});

// ナビゲーションのリンクがクリックされたときの処理
document.querySelectorAll('#g-nav a').forEach(function(navLink) {
  navLink.addEventListener('click', function() {
    document.querySelector('.openbtn').classList.remove('active'); // ボタンの 'active' クラスを除去
    document.getElementById('g-nav').classList.remove('panelactive'); // ナビゲーションの 'panelactive' クラスを除去
  });
});