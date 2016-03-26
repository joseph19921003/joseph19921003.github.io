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
    json = {};

var reg1 = /(\s|\n|\,)$/g;
tagsInput.onkeydown = function (event){
    var ev = ev || event;
    var tagsInputValue = tagsInput.value;
    var lastChar = tagsInputValue.charAt(tagsInputValue.length - 1);
    if (ev.keyCode == 13 | ev.keyCode == 188 | ev.keyCode == 32 | lastChar == ',' | lastChar == '，') {
        tagsInputValue = trim(tagsInputValue).replace(/[,，]$/g, '');
        if (!json[tagsInputValue]) {
            json[tagsInputValue] = true;
            tags.innerHTML += '<span>' + tagsInputValue + '</span>';

        }
        tagsInput.value = '';
    }


}