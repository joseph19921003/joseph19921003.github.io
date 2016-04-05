/**
 * Created by SunshineLXH on 2016/4/4.
 */
//获取元素
var moveBlock = document.getElementsByClassName('moveBlock')[0],
    btn = document.getElementsByTagName('button')[0],
    command = document.getElementsByTagName('input')[0],
    currentDeg;

//绑定事件函数
function addEvent( obj, ev, fn ) {
    if (obj.attachEvent) {
        obj.attachEvent( 'on' + ev, fn );
    }
    else {
        obj.addEventListener( ev, fn, false );
    }
}

//初始化，将运动块旋转角度设置为0度
moveBlock.style.transform = 'rotate(0deg)';

addEvent( btn, 'click', move );

//运动块的运动函数
function move() {
    var commandContent = trim( command.value );
    currentDeg = parseInt(getNum(moveBlock.style.transform));
    command.value = '';
    if ( commandContent == 'TUN LEF' || commandContent == 'tun lef' ) {
        if ( currentDeg < 90 ) currentDeg = 360;
        moveBlock.style.transform = "rotate(" + (currentDeg - 90) + "deg)";
        currentDeg = parseInt(getNum(moveBlock.style.transform));
    }
    else if ( commandContent == 'TUN RIG' || commandContent == 'tun rig' ) {
        moveBlock.style.transform = "rotate(" + (currentDeg + 90) + "deg)";
        currentDeg = parseInt(getNum(moveBlock.style.transform));
    }
    else if ( commandContent == 'TUN BAG' || commandContent == 'tun bag' ) {
        if ( currentDeg >= 360 ) currentDeg = currentDeg - 360;
        moveBlock.style.transform = "rotate(" + (currentDeg + 180) + "deg)";
        currentDeg = parseInt(getNum(moveBlock.style.transform));
    }
    else if ( commandContent == 'GO' || commandContent == 'go' ) {
        if ( currentDeg % 360 == 0 ) {
            if ( moveBlock.offsetTop <= 1 ) {
                alert('已经到头了，请改变方向后重试！');
                return;
            }
            moveBlock.offsetTop = moveBlock.offsetTop - 46 + 'px';
            moveBlock.style.top = moveBlock.offsetTop - 46 + 'px';
        }
        else if ( currentDeg % 360 == 90 ) {
            if ( moveBlock.offsetLeft >= 405 ) {
                alert('已经到头了，请改变方向后重试！');
                return;
            }
            moveBlock.offsetLeft = moveBlock.offsetLeft + 44 + 'px';
            moveBlock.style.left = moveBlock.offsetLeft + 44 + 'px';
        }
        else if ( currentDeg % 360 == 180 ) {
            if ( moveBlock.offsetTop >= 405 ) {
                alert('已经到头了，请改变方向后重试！');
                return;
            }
            moveBlock.offsetTop = moveBlock.offsetTop + 44 + 'px';
            moveBlock.style.top = moveBlock.offsetTop + 44 + 'px';
        }
        else if ( currentDeg % 360 == 270 ) {
            if ( moveBlock.offsetLeft <= 1 ) {
                alert('已经到头了，请改变方向后重试！');
                return;
            }
            moveBlock.offsetLeft = moveBlock.offsetLeft - 46 + 'px';
            moveBlock.style.left = moveBlock.offsetLeft - 46 + 'px';
        }

    }
}

//去除前后空格
function trim( str ) {
    return str.replace( /(^\s*)|(\s*$)/, "" );
}

//去掉字符串非数字字符
function getNum (str) {
    return str.replace( /[^0-9]*/g, "" );
}