//DOMから指定要素を取得
const sidebar = document.getElementById('menu-content'),//サイドバー
      sidebarInner = document.getElementById('nav'),//サイドバーコンテンツ
      mainInner = document.getElementById('main_w');//メインコンテンツ


//付与するクラス名
const sidebarFixedTop = 'sidebar-fixedtop',
      sidebarFixedBottom = 'sidebar-fixedbottom',
      sidebarAbsoBottom = 'sidebar-absobottom';

//クラス付与・削除の関数
const ag2sidebarClass = {
  addFixedTop: function(){
    if(!sidebarInner.classList.contains(sidebarFixedTop)){
      sidebarInner.classList.add(sidebarFixedTop);
      if(sidebarInner.classList.contains(sidebarFixedBottom)) sidebarInner.classList.remove(sidebarFixedBottom);
      if(sidebarInner.classList.contains(sidebarAbsoBottom)) sidebarInner.classList.remove(sidebarAbsoBottom);
    }
  },
  addFixedBottom: function(){
    if(!sidebarInner.classList.contains(sidebarFixedBottom)){
      sidebarInner.classList.add(sidebarFixedBottom);
      if(sidebarInner.classList.contains(sidebarFixedTop)) sidebarInner.classList.remove(sidebarFixedTop);
      if(sidebarInner.classList.contains(sidebarAbsoBottom)) sidebarInner.classList.remove(sidebarAbsoBottom);
    }
  },
  addAbsoBottom: function(){
    if(!sidebarInner.classList.contains(sidebarAbsoBottom)){
      sidebarInner.classList.add(sidebarAbsoBottom);
      if(sidebarInner.classList.contains(sidebarFixedTop)) sidebarInner.classList.remove(sidebarFixedTop);
      if(sidebarInner.classList.contains(sidebarFixedBottom)) sidebarInner.classList.remove(sidebarFixedBottom);
    }
  },
  removeAll: function(){
    if(sidebarInner.classList.contains(sidebarFixedTop)) sidebarInner.classList.remove(sidebarFixedTop);
    if(sidebarInner.classList.contains(sidebarFixedBottom)) sidebarInner.classList.remove(sidebarFixedBottom);
    if(sidebarInner.classList.contains(sidebarAbsoBottom)) sidebarInner.classList.remove(sidebarAbsoBottom);
  }
};

//各数値を保持する変数
let currentY,
    sidebarRect,
    sidebarInnerRect,
    mainInnerRect,
    winH,
    sidebarH,
    sidebarInnerH,
    mainInnerH,
    sidebarTop,
    sidebarBottom;
//Y座標によってサイドバーのクラス名を書き換える関数
const ag2sidebarFix = function(e){
  //windowの現在のY座標(スクロール量)
  currentY = window.pageYOffset;

  //ロードとリサイズのときは各要素の情報を取得
  if(e.type !== 'scroll'){
    //各要素の情報オブジェクトを取得
    sidebarRect = sidebar.getBoundingClientRect(),
    sidebarInnerRect = sidebarInner.getBoundingClientRect(),
    mainInnerRect = mainInner.getBoundingClientRect();
    //各要素の高さを取得
    winH = window.innerHeight,
    sidebarH = sidebarRect.height,
    sidebarInnerH = sidebarInnerRect.height,
    mainInnerH = mainInnerRect.height;

    //document左上を基準点としたsidebarの上下端の座標(サイト内での絶対座標)
    //(ブラウザ基準の相対座標に現在のスクロール量を加算して絶対座標に変換)
    sidebarTop = sidebarRect.top + currentY,
    sidebarBottom = sidebarRect.bottom + currentY;
  }

  //メインコンテンツの高さがwindow、またはサイドバー以下の場合
  if(mainInnerH <= winH || mainInnerH <= sidebarInnerH){

    ag2sidebarClass.removeAll();

  //サイドバーの高さがwindow以下の場合
  }else if(sidebarInnerH <= winH){

    //2カラムの最下端が見えている場合
    if(currentY + sidebarInnerH >= sidebarBottom){
      ag2sidebarClass.addAbsoBottom();
    //スクロールが2カラムの上端を超えた場合
    }else if(currentY > sidebarTop){
      ag2sidebarClass.addFixedTop();
    }else{
      ag2sidebarClass.removeAll();
    }

  //サイドバーがwindowより長い場合
  }else{

    //2カラムの最下端が見えている場合
    if(currentY + winH >= sidebarBottom){
      ag2sidebarClass.addAbsoBottom();
    //サイドバーの下端が見えている場合
    }else if(currentY + winH > sidebarTop + sidebarInnerH){
      ag2sidebarClass.addFixedBottom();
    }else{
      ag2sidebarClass.removeAll();
    }

  }
};

//loadで実行
document.addEventListener('DOMContentLoaded', ag2sidebarFix);
//resizeで実行
window.addEventListener('resize', ag2sidebarFix);
//scrollで実行
window.addEventListener('scroll', ag2sidebarFix);