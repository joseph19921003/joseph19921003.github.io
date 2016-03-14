/**
 * Created by SunshineLXH on 2016/3/13.
 */
window.onload = function(){

    //内容部分中的js事件
    contentPlay();

    //获取元素
    var tpBgimg = $(".tp-bgimg", $("#tp-slideshow")),
        tpText  = $(".tp-text"),
        tpArrow = $("span", $(".arrow")[0]),
        tpSpTop = $(".tp-top", $("#tp-slideshow")),
        tpSpMid = $(".tp-middle", $("#tp-slideshow")),
        len     = tpBgimg.length,
        timer   = null,
        n = 1;

    //文字块上面字的内容
    var arr1 = ["SPRING SUMMER 2015", "New Hight Collection"],
        arr2 = ["AUTUMN & SUMMER TRENDING", "Sweet Love Style"];

    //初始化
    if(tpBgimg[0].style.opacity){
        tpBgimg[0].style.opacity = 1;
    }
    else {
        tpBgimg[0].style.filter = "alpha(opacity=100)";
    }
    //显示第一幅图的文字块
    (function (){
        showSp(0);
        setTimeout(function(){
            n++;
            fadeOut(tpBgimg[0], 0, 200);
            showSp(1);
            fadeIn(tpBgimg[1], 100, 200);
        }, 1000)
    })();

    //文字块显示函数
    function showSp(n){
        //暴力清除所有
        for (var i = 0; i < tpSpTop.length; i++){
            tpSpTop[i].innerHTML = "";
            tpSpMid[i].innerHTML = "";
            tpText[i].style.display = "none";
        }
        if (n == 0){
            tpSpTop[0].innerHTML = arr1[0];
            tpSpMid[0].innerHTML = arr1[1];
            tpText[0].style.display = "block";
        }
        else if (n == 1){
            tpSpTop[1].innerHTML = arr2[0];
            tpSpMid[1].innerHTML = arr2[1];
            tpText[1].style.display = "block";
        }
    }

    //开启自动轮播
    start();

    //自动轮播函数
    function start(){
        if (timer) return;
        timer = setInterval(function (){
            if (n < len - 1) ++n;
            else n = 0;
            transform(n);
        }, 3000);
    };

    //背景图变换函数
    function transform(n){
        //第n张淡入，第n-1张淡出
        fadeIn(tpBgimg[n], 100, 200);
        showSp(n);
        if (n == 0){
            fadeOut(tpBgimg[len - 1], 0, 200);
        }
        else {
            fadeOut(tpBgimg[--n], 0, 200);
        }
    };

    //点击左边“<”时
    tpArrow[0].onclick = function (){
        //第n张淡出，第n-1张淡入
        fadeOut(tpBgimg[n], 0, 200);
        tpText[n].style.display = "none";
        n = (n > 0) ? --n : (len - 1);
        fadeIn(tpBgimg[n], 100, 200);
        showSp(n);
    };

    //点击右边“>”时
    tpArrow[1].onclick = function (){
        //n+1后淡入，前一张淡出
        n = (n < len - 1) ? ++n : 0;
        transform(n);
    };

    //鼠标移入左右“<”“>”时clearInterval()
    tpArrow[0].onmouseover = function (){
        clearInterval(timer);
        timer = null;
    };
    tpArrow[1].onmouseover = function (){
        clearInterval(timer);
        timer = null;
    };

    //鼠标移出左右“<”“>”时start()
    tpArrow[0].onmouseout = function (){
        start();
    };
    tpArrow[1].onmouseout = function (){
        start();
    };

    //设置透明度的兼容性代码
    function setOpacity(ele, opacity){
        //兼容FF/GG/新版本IE
        if(ele.style.opacity != undefined){
            ele.style.opacity = opacity / 100;
        }
        //兼容老版本IE
        else {
            ele.style.filter = "alpha(opacity=" + opacity + ")";
        }
    };

    // fadeIn函数
    function fadeIn(ele, opacity, speed){
        var speed = speed || 20,
            opacity = opacity || 100,
            val = 0;
        ele.style.display = 'block';
        setOpacity(ele, 0);
        (function(){
            setOpacity(ele, val);
            val += 15;
            if (val <= opacity) {
                setTimeout(arguments.callee, speed);
            }
        })();
    }

    //fadeOut函数
    function fadeOut(ele, opacity, speed){
        var speed = speed || 20,
            opacity = opacity || 0,
            val = 100;
        (function(){
            setOpacity(ele, val);
            val = -15;
            if (val >= opacity){
                setTimeout(arguments.callee, speed);
            }
            else if(val < 0) {
                ele.style.display = 'none';
            }
        })();
    }
}
