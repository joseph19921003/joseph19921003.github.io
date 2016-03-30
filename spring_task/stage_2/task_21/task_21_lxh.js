/**
 * Created by SunshineLXH on 2016/3/26.
 */

//获取元素
var tagsInput = document.getElementById('tagsInput'),
    tags = document.getElementById('tags'),
    textArea = document.getElementById('textarea'),
    conBtn = document.getElementById('conBtn'),
    hobbies = document.getElementById('hobbies'),
    json = {},
    n = 0,
    arr = [],
    arr1 = [],
    aSpan;

/*tag中标签的添加显示*/
tagsInput.onkeyup = function (event){
    var ev = ev || event;
    //如果按键是回车、逗号、空格
    if (ev.keyCode == 13 | ev.keyCode == 188 | ev.keyCode == 32 ) {
        //前后去空格处理
        var tagsInputValue = trim(tagsInput.value);
        lastChar = tagsInputValue.charAt(tagsInputValue.length - 1);
        //如果最后一个字符是逗号或空格，把最后一个字符去掉
        if (lastChar == ',' | lastChar == ' ' | lastChar == '，') {
            tagsInputValue = tagsInputValue.substring(0, tagsInputValue.length - 1) ;
        }
        //如果与之前不重复，则添加到数组，添加span节点
        if (!json[tagsInputValue]) {
            n++;
            json[tagsInputValue] = n;
            arr.push(tagsInputValue);
            tags.innerHTML += '<span>' + tagsInputValue + '</span>';
        }
        tagsInput.value = '';
    }
    //如果arr长度大于10，把前面的删除掉，且把tags中第一个span节点删除
    if (arr.length > 10) {
        delete json[arr[0]];
        arr.shift();
        tags.removeChild(tags.childNodes[0]);
    }
    //对tags中span节点的鼠标移入、移出、点击事件
    aSpan = tags.getElementsByTagName('span');
    for (var i = 0; i < aSpan.length; i++){
        aSpan[i] = i;
        fn(i);
    }
};

//鼠标移入、移出、点击的函数
function fn(i){
    var old = aSpan[i].innerHTML;
    aSpan[i].onmouseover = function (){
        this.innerHTML = '点击删除' + old;
        this.style.background = '#f00';
    };
    aSpan[i].onmouseout = function (){
        this.innerHTML = old;
        this.style.background = '#8DC9FB';
    };
    aSpan[i].onclick = function (){
        this.parentNode.removeChild(this);
        for (var j = 0; j < arr.length; j++){
            console.log(old, arr[j]);
            arrDelJ(old, j);
        }
        console.log(old, arr,json);
    }
}

//删除json里对应属性和arr里对应项
function arrDelJ(old, j){
    if (old == arr[j]) {
        delete json[arr[j]];
        arr.splice(j, 1);
    }
}

/*textarea中爱好添加处理*/
var arrHobbies = [];
conBtn.onclick = function (){
    //初始化
    hobbies.innerHTML = '';
    //分割字符串，循环添加到数组
    var reg = /\s|,|，|、/g;
    arr1 = textArea.value.split(reg);
    for (var i = 0; i < arr1.length; i++){
        arrHobbies.push(trim(arr1[i]));
    }
    //数组去重
    arrHobbies = arrHobbies.unique();
    //如果数组长度超过10，去掉前面的
    if (arrHobbies.length > 10) {
        arrHobbies.splice(0,arrHobbies.length - 10);
    }
    //将数组中的爱好渲染到页面
    for (var j = 0; j < arrHobbies.length; j++){
        hobbies.innerHTML += '<span>' + arrHobbies[j] + '</span>'
    }
    textArea.value = '';
};

//字符串前后空格处理
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

//数组去重
Array.prototype.unique = function (){
    var temp = [];
    var json = {};
    for (var i = 0; i < this.length; i++){
        if (!json[this[i]]) {
            temp.push(this[i]);
            json[this[i]] = true;
        }
    }
    return temp;
};