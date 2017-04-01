//获取可视区宽高
function view() {
    return {
        w: document.documentElement.clientWidth,
        h: document.documentElement.clientHeight
    };
}
//兼容绑定事件
function bind(obj, ev, fn) {
    if (obj.addEventListener) {
        obj.addEventListener(ev, fn, false);
    } else {
        obj.attachEvent('on' + ev, function() {
            fn.call(obj);/*指向自己*/
        });
    }
}

// 几秒后入场动画消失
function fnLoad() {
    var itime=new Date().getTime();
    var oW=document.querySelector("#welcome")
    var arr=[""];
    var bImgLoad=true;
    var oTimer=0;
    bind(oW,"webkitTransitionEnd",end);
    bind(oW,"transitionend",end);

    // 入场动画
    oTimer=setInterval(function () {
        if(new Date().getTime()-itime>=2000){
            bTime=true;
        }
        if (bImgLoad&&bTime){
            clearInterval(oTimer);
            oW.style.opacity=0;
        }
    },1000);
    // 执行完动画后删除class
    function end() {
        removeClass(oW,"pageShow");
        fnTab();
    }
}




//    清楚浏览器默认事件
bind(document,"touchmove",function (e) {
    e.preventDefault();
});
   function fnTab() {
var oTab=document.querySelector("#tabPic");/*整个banner*/
var oList=document.querySelector("#picMask");/*下面的字*/
var oNav=oTab.querySelector("nav").children;/*下面的点点*/
var iNow=0;/*当前选中*/
var iX=0;/*第几个屏幕宽度*/
var iW=view().w;/*获取屏幕的宽度*/
var otimer;

var iStartTouchX = 0;/*存放当前手指位置*/
var iStartX=0;/*存放新的手指位置*/
auto();
function auto() {
    //    两千毫秒执行一次
    otimer=setInterval(function () {
        iNow++;
        iNow=iNow%oNav.length;/*1%5=1 5%5=0*/
        tab();
    },2000);
}

//    绑定监听
bind(oTab,"touchstart",fnStart);
bind(oTab,"touchmove",fnMove);
bind(oTab,"touchend",fnEnd);
function fnStart(ev) {
    oList.style.transition="none";
    ev=ev.changedTouches[0];/*手指列表*/
    iStartTouchX=ev.pageX;
    iStartX=iX;/*当前元素的位置*/
    clearInterval(otimer);
}
function fnMove(ev) {
    ev=ev.changedTouches[0];/*手指列表*/
    /*获取差值，就是他移动的距离=当前手指的位置-之前手指移动的位置*/
    var iDis=ev.pageX-iStartTouchX;
    /*元素=元素+差值，手指移动 多少距离也跟着移动多少距离*/
    iX=iStartX+iDis;
    oList.style.transform=oList.style.transform="translateX("+iX+")";
}
function fnEnd() {
    //拖动距离比较大的时候给他换图
    iNow=iX/iW;
    iNow=-Math.round(iNow);
    if(iNow<0)iNow=0;
    if(iNow>oNav.length-1)iNow=oNav.length;
    tab();
    auto();
}
function tab() {
    iX=iNow*iW;/*第一个拼命*当前宽度=整个图屏幕宽度*/
    oList.style.transition="0.5s";
    oList.style.transform=oList.style.transform="translateX("+iX+")";
    for (var i=0; i<oNav.length; i++){
        removeClass(oNav[i],"active")
    }
    addClass(oNav[iNow],"active");
}
   }

// 评分