window.addEventListener("scroll", function () {
  const topBtn = document.getElementById("btn_application");
  const topNav = document.getElementById("nav_w");
  const scroll = window.pageYOffset;
  if (scroll > 600) {
    topBtn.classList.add('scrolldisplay');
  } else topBtn.classList.remove('scrolldisplay');
  const html = document.querySelector('html');
  const bodyHeight = document.body.clientHeight; // bodyの高さを取得
  const windowHeight = window.innerHeight; // windowの高さを取得
  const bottomPoint = bodyHeight - windowHeight - 500; // ページ最下部までスクロールしたかを判定するための位置を計算
  const currentPos = window.pageYOffset; // スクロール量を取得
  if (bottomPoint <= currentPos) {// スクロール量が最下部の位置を過ぎたかどうか
    topBtn.classList.add('scrollEnd');
    topNav.classList.add('scrollEnd');
  } else {
    topBtn.classList.remove('scrollEnd');
    topNav.classList.remove('scrollEnd');
  }
});



// ハンバーガーメニュー
const navInput = document.getElementById('menu-btn-check')
const hamburger = document.querySelectorAll('.menu-content .nav a')
const hamburgerA = Array.from(hamburger)
hamburgerA.forEach( function(element) {
  element.addEventListener('click',function(){
    navInput.checked = false
  })
})

// スライド-過去の大感謝祭のようす
new Splide( '.splide.about_splide', {
  autoplay:true,
  type : 'loop',
  speed: 600,
  perPage: 4,
  gap: '18px',
  pagination:false,
  arrows:false,
  breakpoints: {
  767: {
    perPage: 1.5,
    focus: 'center',
  },
}
}).mount();

// スライド-企画紹介
new Splide( '.splide.project_box', {
  perPage: 3,
  pagination:false,
  arrows:false,
  gap: '18px',
  breakpoints: {
  767: {
    perPage: 1.5,
    focus: 'center',
    autoplay:false,
    rewind:false,
    start: number = 1
  },
}
}).mount();



// スクロールトップボタン
const pageTopBtn = document.getElementById('js-scroll-top');
window.addEventListener("scroll", () => {
  const currentY = window.pageYOffset;
  if ( currentY > 100){
    setTimeout(function(){
      pageTopBtn.style.opacity = 1;
    }, 1);
    pageTopBtn.classList.remove('is-hide');
  } else {
    setTimeout(function(){
      pageTopBtn.style.opacity = 0;
    }, 1);
    pageTopBtn.classList.add('is-hide');
  }
});
scrollTop('js-scroll-top', 150); // 遅すぎるとガクガクになるので注意
function scrollTop(el, duration) {
  const target = document.getElementById(el);
  target.addEventListener('click', function() {
    let currentY = window.pageYOffset; // 現在のスクロール位置を取得
    let step = duration/currentY > 1 ? 10 : 100; // 三項演算子
    let timeStep = duration/currentY * step; // スクロール時間
    let intervalId = setInterval(scrollUp, timeStep);
    // timeStepの間隔でscrollUpを繰り返す。
    // clearItervalのために返り値intervalIdを定義する。

    function scrollUp(){
      currentY = window.pageYOffset;
      if(currentY === 0) {
          clearInterval(intervalId); // ページ最上部に来たら終了
      } else {
          scrollBy( 0, -step ); // step分上へスクロール
      }
    }
  });
}



//スムーススクロール
smoothScroll();
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
