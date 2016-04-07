/**
 * Created by SunshineLXH on 2016/4/5.
 */
//运动块对象，距左边格子数，距上面格子数及此时方向
var state = {
        x : 1
      , y : 1
    , dir : 0
};

//去掉输入框前后空格
function trim( str ) {
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

//绑定事件函数
function bind( obj, ev, fn ) {
    if ( obj.addEventListener ) {
        obj.addEventListener( ev, fn, false );
    }
    else {
        obj.attachEvent( 'on'+ev, fn );
    }
}

//获取元素
var       btn = document.getElementsByTagName('button')[0],
      command = document.getElementsByTagName('input')[0],
    moveBlock = document.getElementsByClassName('moveBlock')[0];

//绑定事件
bind( btn, 'click', move );

//运动块运动判断
function move() {
    var dir = state.dir,
        commandValue = trim(command.value);

    //根据输入改变state.x,state.y,state.dir
    switch( commandValue ) {
        case 'GO':
        case 'go':
            if ( Math.abs(dir % 4) == 0 && state.y > 0 ) state.y--;
            else if ( Math.abs(dir % 4) == 1 && state.x < 9 ) state.x++;
            else if ( Math.abs(dir % 4) == 2 && state.y < 9 ) state.y++;
            else if ( Math.abs(dir % 4) == 3 && state.x > 0 ) state.x--;
            break;
        case 'tun lef':
        case 'TUN LEF':
            state.dir = dir - 1;
            break;
        case 'tun rig':
        case 'TUN RIG':
            state.dir = dir + 1;
            break;
        case 'tun bag':
        case 'TUN BAG':
            state.dir = dir + 2;
            break;
        case 'tra lef':
        case 'TRA LEF':
            if ( state.x > 0 ) state.x--;
            break;
        case 'tra top':
        case 'TRA TOP':
            if ( state.y > 0 ) state.y--;
            break;
        case 'tra rig':
        case 'TRA RIG':
            if ( state.x < 9 ) state.x++;
            break;
        case 'tra bot':
        case 'TRA BOT':
            if ( state.y < 9 ) state.y++;
            break;
        case 'mov lef':
        case 'MOV LEF':
            if ( state.x > 0 ) state.x--;
            state.dir = 3;
            break;
        case 'mov rig':
        case 'MOV RIG':
            if ( state.x < 9 ) state.x++;
            state.dir = 1;
            break;
        case 'mov top':
        case 'MOV TOP':
            if ( state.y > 0 ) state.y--;
            state.dir = 0;
            break;
        case 'mov bot':
        case 'MOV BOT':
            if ( state.y < 9 ) state.y++;
            state.dir = 2;
            break;
        default:
            alert('输入有误，请重新输入！');
    }
    //根据此时状态完成运动
    animate();
}

//运动函数
function animate(){
    moveBlock.style.left = state.x * 45 + 'px';
    moveBlock.style.top = state.y * 45 + 'px';
    moveBlock.style.transform = 'rotate(' + state.dir * 90 + 'deg)';
}