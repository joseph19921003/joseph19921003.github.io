/**
 * Created by SunshineLXH on 2016/3/31.
 */
//获取元素
var oBox = document.getElementById('box'),
    aInput = document.getElementsByTagName('input')[0],
    btn = document.getElementsByTagName('button'),
    leftEnBtn = btn[0],
    rightEnBtn = btn[1],
    leftOutBtn = btn[2],
    rightOutBtn = btn[3];

//判断所输入内容为数字的正则
var reg = /^(0|[1-9]\d*)$/;

//将元素从右侧插入
rightEnBtn.onclick = function (){
    var aInputValue = aInput.value;
    if ( reg.test( aInputValue ) ) {
        var aDiv = document.createElement('div');
        aDiv.className = 'ele';
        aDiv.innerHTML = aInputValue;
        addEventHandler(aDiv, 'click', fn);
        oBox.appendChild( aDiv );
    }
    else {
        alert('请输入数字！');
    }
    aInput.value = '';
};

//将元素从左侧插入
leftEnBtn.onclick = function (){
    var aInputValue = aInput.value;
    if ( reg.test( aInputValue ) ) {
        var aDiv = document.createElement('div');
        aDiv.className = 'ele';
        aDiv.innerHTML = aInputValue;
        addEventHandler( aDiv, 'click', fn );
        if ( oBox.children[0] ) {
            oBox.insertBefore( aDiv, oBox.children[0] );
        }
        else {
            oBox.appendChild( aDiv );
        }
    }
    else {
        alert('请输入数字！');
    }
    aInput.value = '';
};

//从右侧删除节点
rightOutBtn.onclick = function (){
    if ( oBox.children.length ) {
        alert( '右侧所删节点元素值为：' + oBox.children[oBox.children.length - 1].innerHTML );
        oBox.removeChild( oBox.children[oBox.children.length - 1] );
    }
    else {
        alert('表中已无节点！');
    }
};

//从左侧删除节点
leftOutBtn.onclick = function (){
    if ( oBox.children.length ) {
        alert( '左侧所删节点元素值为：' + oBox.children[0].innerHTML );
        oBox.removeChild( oBox.children[0] );
    }
    else {
        alert('表中已无节点！');
    }
};

//给动态生成的节点绑定事件
function addEventHandler( oTarget, sEventType, fnHandler ) {
    if ( oTarget.addEventListener ) {
        oTarget.addEventListener( sEventType, fnHandler, false );
    }
    else if ( oTarget.attachEvent ) {
        oTarget.attachEvent( "on" + sEventType, fnHandler );
    }
    else {
        oTarget[ "on" + sEventType ] = fnHandler;
    }
}

//删除本节点
function fn() {
    alert( '所删节点的元素值为：' + this.innerHTML );
    oBox.removeChild(this);
}
