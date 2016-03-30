/**
 * Created by SunshineLXH on 2016/3/26.
 */
//对字符串前后空格进行处理
function trim(str) {
    return str.replace(/(^\s*)|(\s*$)/g, "");
}

//获取元素
var aqiCityInput = document.getElementById('aqi-city-input'),
    aqiValueInput = document.getElementById('aqi-value-input'),
    aStrong = document.getElementsByTagName('strong');
    addBtn = document.getElementById('add-btn'),
    aqiTable = document.getElementById('aqi-table'),
    aqiTableTbody = aqiTable.tBodies[0];

//正则
var reg1 = /^[A-Za-z\u4e00-\u9fa5]{1,}$/,
    reg2 = /^[1-9]{0,}\d$/;

//点击添加
addBtn.onclick = function () {
    var str1 = trim(aqiCityInput.value),
        str2 = trim(aqiValueInput.value);

    if (str1 == '') {
        aStrong[0].innerHTML = '城市名称不能为空！';
        return;
    }
    else if (!reg1.test(str1)) {
        aStrong[0].innerHTML = '城市名称必须为中英文字符！！';
        return;
    }
    else if (str2 == '') {
        aStrong[1].innerHTML = '空气质量指数不能为空！';
        return;
    }
    else if (!reg2.test(str2)) {
        aStrong[1].innerHTML = '空气质量指数必须为整数！';
        return;
    }
    if (aqiTableTbody.innerHTML == '') {
        aqiTableTbody.innerHTML = '<tr><td>' + str1 + '</td><td>' + str2 + '</td><td><button onclick="delBtn(event)">删除</button></td></tr>';
    }
    else {
        aqiTableTbody.innerHTML += '<tr><td>' + str1 + '</td><td>' + str2 + '</td><td><button onclick="delBtn(event)">删除</button></td></tr>';
    }
    aqiCityInput.value = '';
    aqiValueInput.value = '';
    aStrong[1].innerHTML = '';
    aStrong[0].innerHTML = '';
};

//删除某行
function delBtn(event) {
    var trNode = event.currentTarget.parentNode.parentNode;
    trNode.parentNode.removeChild(trNode);
}



