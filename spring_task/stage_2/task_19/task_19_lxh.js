/**
 * Created by SunshineLXH on 2016/3/31.
 */
//队列
function Queue() {
    this.dataStore = [];
    this.addFirst = addFirst;
    this.addLast = addLast;
    this.deFirst = deFirst;
    this.deLast = deLast;
}
//首位插入
function addFirst( element ) {
    this.dataStore.unshift( element );
}
//末位插入
function addLast( element ) {
    this.dataStore.push( element );
}
//首位删除
function deFirst() {
    return this.dataStore.shift();
}
//末位删除
function deLast() {
    return this.dataStore.pop();
}

//获取元素
var oBox = document.getElementById('box'),
    aInput = document.getElementsByTagName('input'),
    addNum = aInput[0],
    generNum = aInput[1],
    btn = document.getElementsByTagName('button'),
    leftEnBtn = btn[0],
    rightEnBtn = btn[1],
    leftOutBtn = btn[2],
    rightOutBtn = btn[3],
    randomGenBtn = btn[4],
    bubbleSortBtn = btn[5],
    selectionSortBtn = btn[6],
    //插入数字为1到100，生成个数为2到60
    reg = /^(?:[1-9]\d|100)$/,
    reg1 = /^([2-9]|[1-5][0-9]|60)$/,
    randomNum,
    timer = null;

var queue = new Queue();

//右侧入
rightEnBtn.onclick = function (){
    var addNumValue = addNum.value;
    if ( reg.test( addNumValue ) ) {
        if ( oBox.children.length < 60 ) {
            genADiv( addNumValue, true );
            queue.addLast( addNumValue );
        }
        else {
            alert( '队列元素已到60，请先删除元素再添加！' );
        }
    }
    else {
        alert('请输入10-100的数字！');
    }
    addNum.value = '';
};

//左侧入
leftEnBtn.onclick = function (){
    var addNumValue = addNum.value;
    if ( reg.test( addNumValue ) ) {
        var aDiv = genADiv(addNumValue);
        if ( oBox.children.length < 60 ) {
            if ( oBox.children[0] ) {
                oBox.insertBefore( aDiv, oBox.children[0] );
            }
            else {
                oBox.appendChild( aDiv );
            }
            queue.addFirst( addNumValue );
        }
        else {
            alert( '队列元素已到60，请先删除元素再添加！' );
        }
    }
    else {
        alert('请输入10-100的数字！');
    }
    addNum.value = '';
};

//生成节点函数
function genADiv( value, onOff ) {
    var aDiv = document.createElement('div');
    aDiv.className = 'ele';
    aDiv.innerHTML = value;
    aDiv.style.height = value + 'px';
    addEventHandler(aDiv, 'click', fn);
    if ( onOff ){
        oBox.appendChild( aDiv );
    }
    return aDiv;
}

//右侧出
rightOutBtn.onclick = function (){
    if ( oBox.children.length ) {
        alert( '右侧所删节点元素值为：' + oBox.children[oBox.children.length - 1].innerHTML );
        oBox.removeChild( oBox.children[oBox.children.length - 1] );
        queue.deLast();
    }
    else {
        alert('表中已无节点，请先插入节点！');
    }
};

//左侧出
leftOutBtn.onclick = function (){
    if ( oBox.children.length ) {
        alert( '左侧所删节点元素值为：' + oBox.children[0].innerHTML );
        oBox.removeChild( oBox.children[0] );
        queue.deFirst();
    }
    else {
        alert('表中已无节点,请先插入节点！');
    }
};

//绑定事件函数
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

//删除节点函数，移除oBox中节点，且将queue中对应值删除
function fn() {
    alert( '所删节点的元素值为：' + this.innerHTML );
    oBox.removeChild(this);
    for ( var i = 0; i < queue.dataStore.length; i++ ) {
        if ( queue.dataStore[i] == this.innerHTML ) queue.dataStore.splice(i, 1);
    }
}

//点击随机生成时，验证用户输入值，生成随机数，渲染到oBox中
randomGenBtn.onclick = function (){
    //获取输入值
    var randomGenNumValue = generNum.value;
    if ( reg1.test(randomGenNumValue) ){
        queue.dataStore = [];
        oBox.innerHTML = '';
        for ( var i = 0; i < randomGenNumValue; i++ ){
            randomNum = Math.floor( Math.random() * 91 + 10 );
            genADiv( randomNum, true );
            queue.addLast( randomNum );
        }
    }
    else {
        alert( '请输入2到60的数字！' );
    }
    generNum.value = '';
};

//点击冒泡排序按钮时，根据queue渲染数据，冒泡排序
bubbleSortBtn.onclick = function (){
    if ( oBox.innerHTML == '' ) {
        alert('请先生成数据！');
        return;
    }
    oBox.innerHTML = '';
    redraw();
    bubbleSort();
};

//点击选择排序按钮时，根据queue渲染数据，选择排序
selectionSortBtn.onclick = function (){
    if ( oBox.innerHTML == '' ) {
        alert('请先生成数据！');
        return;
    }
    oBox.innerHTML = '';
    redraw();
    selectionSort();
};

//把queue中数据渲染到oBox中
function redraw (){
    oBox.innerHTML = '';
    for ( var i = 0; i < queue.dataStore.length; i++ ) {
        genADiv( queue.dataStore[i], true );
    }
}

//改变两个节点的样式值
function exchange( ele1, ele2 ) {
    var temp = ele1.offsetHeight;
    ele1.innerHTML = ele2.innerHTML;
    ele1.offsetHeight = ele2.offsetHeight;
    ele1.style.height = ele2.offsetHeight + 'px';
    ele2.innerHTML = temp;
    ele2.offsetHeight = temp;
    ele2.style.height = temp + 'px';
}

//冒泡排序
function bubbleSort() {
    var eles = oBox.querySelectorAll('div'),
        len = eles.length,
        i = len - 1,
        j = 0;

    timer = setInterval(function(){
        if ( i < 1 ) {
            clearInterval(timer);
            timer = null;
            queue.dataStore = [];
            for ( var k = 0; k < len; k++ ) {
                queue.addLast( eles[k].innerHTML );
            }
        }
        if ( j == i ) {
            --i;
            j = 0;
        }
        if ( eles[j].offsetHeight > eles[j + 1].offsetHeight ) {
            exchange( eles[j], eles[j + 1] );
        }
        ++j;
    }, 20 );
}

//选择排序
function selectionSort() {
    var eles = oBox.querySelectorAll('div'),
        len = eles.length,
        i = 0,
        j = 1,
        min = 0;

    timer = setInterval(function(){
        if ( i == len - 1 ) {
            clearInterval( timer );
            timer = null;
            queue.dataStore = [];
            for ( var k = 0; k < len; k++ ) {
                queue.addLast( eles[k].innerHTML );
            }
        }
        if ( j == len ) {
            exchange( eles[i], eles[min] );
            ++i;
            min = i;
            j = i + 1;
        }
        if ( eles[j] && eles[j].offsetHeight < eles[min].offsetHeight ) {
            min = j;
        }
        ++j;
    }, 20 );
}
