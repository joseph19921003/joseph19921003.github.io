/**
 * Created by SunshineLXH on 2016/3/30.
 */
var arr = [
    {
        title : "计算机书目",
        child : [
            {
                title : "办公类",
                child : [
                    { title : "Windows应用" },
                    { title : "Office快速入门" }
                ]
            },
            {
                title : "编程类",
                child : [
                    { title : "C语言程序设计" },
                    { title : "Java从入门到精通" },
                    { title : "Asp.Net入门经典" }
                ]
            },
            {
                title : "网络类",
                child : [
                    { title : "网络基础" },
                    { title : "ICP/IP协议" }
                ]
            },
            {
                title : "动画类",
                child : [
                    { title : "PhotoShop创意设计" }
                ]
            }
        ]
    }
];

var oUl         = document.getElementById('oUl'),
    btn         = document.getElementsByTagName('button'),
    delNode     = btn[0],
    addNode     = btn[1],
    findNode    = btn[2],
    inputCon    = document.getElementsByTagName('input');
    delInputCon  = inputCon[0],
    addInputCon  = inputCon[1],
    findInputCon = inputCon[2];

//把数据渲染到页面
function fn( oUl, arr ){
    for ( var i = 0; i < arr.length; i ++ ) {
        var aLi = document.createElement('li');
        var oH3 = document.createElement('h3');

        oH3.innerHTML = arr[i].title;
        aLi.appendChild(oH3);

        //如果有arr[i]有child属性，在oH3前面加"+"
        if ( arr[i].child ) {
            oH3.innerHTML = '<span>+</span>' + oH3.innerHTML;
            var level2_Ul = document.createElement('ul');

            fn ( level2_Ul, arr[i].child );

            aLi.appendChild( level2_Ul );
        }
        else {
            oH3.innerHTML = '<span></span>' + oH3.innerHTML;
        }

        oUl.appendChild( aLi );
    }
}

fn( oUl, arr );

/*
* 1.点击每个h3的时候，让h3的下一个兄弟节点ul展开
* 2.再次点击h3，展开的兄弟节点ul应该隐藏
* 3.点击h3父级的兄弟li中的h3的时候，其余的li的ul全部隐藏
* 优化：
*      只有展开的ul下面的h3才有事件
* */

function addEvent( oUl ){
    var aLi = oUl.children;
    //如果存在事件，就什么也不做
    if ( aLi[0].children[0].onclick ) return;

    for ( var i = 0; i < aLi.length; i++ ){
        var oH3 = aLi[i].children[0];

        oH3.onclick = function (){
            var parent = this.parentNode;   //当前节点的父级
            var child = parent.children[1]; //当前父级下的子级ul
            var oSpan = this.children[0];   //当前点击h3下的span
            var parentUl = parent.parentNode;

            //找到当前父级li下所有ul
            var allUl = parentUl.getElementsByTagName('ul');

            for ( var i = 0; i < allUl.length; i++ ){
                //排除掉当前父级li的亲儿子ul
                if ( allUl[i] !== child ){
                    allUl[i].parentNode.children[0].children[0].innerHTML = "+";
                    allUl[i].style.display = 'none';
                }
            }

            if ( child ){

                if ( child.style.display == 'block' ){
                    child.style.display = 'none';
                    oSpan.innerHTML = '+';
                }
                else {
                    child.style.display = 'block';
                    //当前的ul展开了，让下面的h3有事件
                    addEvent( child );
                    oSpan.innerHTML = '-';
                }
            }
        };

        //鼠标移过改变背景颜色
        oH3.onmouseover = function (){
            this.style.background = '#CCE8FF';
        };

        //鼠标移开背景颜色变为白色
        oH3.onmouseout = function (){
            this.style.background = '#fff';
        };

    }
}

addEvent( oUl );

delNode.onclick = function (){
    var delInputConValue = delInputCon.value;

};

addNode.onclick = function (){
    var addInputConValue = addInputCon.value;

};

findNode.onclick = function (){
    var findInputConValue = findInputCon.value;

};


