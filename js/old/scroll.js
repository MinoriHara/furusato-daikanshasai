smoothScroll();
//スムーススクロール関数
function smoothScroll() {
  //スクロールリンク取得
  const targets = Array.prototype.slice.call(document.querySelectorAll('a[href^="#"]'),0);
  if(targets.length === 0) {
    return false;
  }

  function easing(t, b, c, d) {
    return c * (0.5 - Math.cos((t / d) * Math.PI) / 2) + b;
  }

  //スクロール速度
  const animeSpeed = 600;

  //クリックイベント設定
  targets.forEach(function(target){
    target.addEventListener('click', function (event) {
      event.preventDefault();
      //スクロールイベント重複防止
      if (document.body.classList.contains('is-scroll-busy')) {
        return false;
      }
      document.body.classList.add('is-scroll-busy');

      //hrefから遷移先を取得
      const href = target.getAttribute('href');
      const scrollStopTarget = document.querySelector(href == '#' || href == '' ? 'html' : href);

      //移動先取得
      const scrollStopTop = scrollStopTarget.getBoundingClientRect().top;

      //現在のスクロール量
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      //アニメーション開始時間
      const start = new Date();
      //スクロールアニメーション関数
      function mainAnime() {
        //イベント発生後の経過時間
        let elapsedTime = new Date() - start;

        //アニメーション終了処理
        if (elapsedTime > animeSpeed) {
          //実行中class削除
          document.body.classList.remove('is-scroll-busy');

          //処理を終了
          return false;
        }

        //スクロール処理
        window.scrollTo(
          0,
          //「アニメーションの経過時間」,「始点」,「変化量」,「変化にかける時間」
          easing(elapsedTime, scrollTop, scrollStopTop, animeSpeed)
        );
        requestAnimationFrame(mainAnime);
      }

      //アニメーション初回呼び出し
      requestAnimationFrame(mainAnime);
    });
  });
}