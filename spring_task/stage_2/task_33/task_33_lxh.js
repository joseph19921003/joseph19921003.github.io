/**
 * Created by SunshineLXH on 2016/4/5.
 */
//运动块状态
var state = {
        x: 1
      , y: 1
    , dir: 0
};

//获取元素
var moveBlock = document.getElementsByClassName('moveBlock')[0],
    btn = document.getElementsByTagName('button')[0],
    command = document.getElementsByTagName('input')[0];

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

//运动块的旋转方向及运动方向判断
function move() {
    var commandValue = trim( command.value );
    var dir = state.dir;
    command.value = '';
    switch( commandValue ) {
        case 'go':
        case 'GO': {
            if ( Math.abs(dir % 4) == 0 && state.y > 0 ) {
                state.y--;
            }
            else if ( Math.abs(dir % 4) == 1 && state.x > 0) {
                state.x++;
            }
            else if ( Math.abs(dir % 4) ==2 && state.y < 9) {
                state.y++;
            }
            else if ( Math.abs(dir % 4) ==3 && state.x < 9 ) {
                state.x--;
            }
            break;
        }
        case 'tun lef':
        case 'TUN LEF': {
            state.dir = dir - 1;
            break;
        }
        case 'tun rig':
        case 'TUN RIG': {
            state.dir = dir + 1;
            break;
        }
        case 'tun bag':
        case 'TUN BAG': {
            state.dir = dir + 2;
            break;
        }
    }
    animate();
}

//根据state的值改变运动块的样式
function animate() {
    moveBlock.style.left = state.x * 45 + 'px';
    moveBlock.style.top = state.y * 45 + 'px';
    moveBlock.style.transform = 'rotate(' + state.dir * 90 + 'deg)';
}

//去除前后空格
function trim( str ) {
    return str.replace( /(^\s*)|(\s*$)/, "" );
}