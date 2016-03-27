/**
 * Created by SunshineLXH on 2016/3/26.
 */
//字符串前后空格处理
function trim(str){
    return str.replace(/(^\s*)|(\s*$)/g, '');
}

//获取元素
var tagsInput = document.getElementById('tagsInput'),
    tags = document.getElementById('tags'),
    textArea = document.getElementById('textarea'),
    conBtn = document.getElementById('conBtn'),
    habbies = document.getElementById('habbies'),
    json = {},
    n = 0;

var reg1 = /(\s|\n|\,)$/g;
tagsInput.onkeyup = function (event){
    var ev = ev || event;
    if (ev.keyCode == 13 | ev.keyCode == 188 | ev.keyCode == 32 ) {
        var tagsInputValue = trim(tagsInput.value);
        lastChar = tagsInputValue.charAt(tagsInputValue.length - 1);
        if (lastChar == ',' | lastChar == ' ' | lastChar == '，') {
            tagsInputValue = tagsInputValue.substring(0, tagsInputValue.length - 1) ;
        }
        if (!json[tagsInputValue]) {
            n++;
            json[tagsInputValue] = n;
            tags.innerHTML += '<span>' + tagsInputValue + '</span>';
        }
        tagsInput.value = '';
    }
    console.log(json)
};




