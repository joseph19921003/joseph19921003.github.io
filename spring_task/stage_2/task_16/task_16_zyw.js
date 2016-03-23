function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var nameNode = document.getElementById("aqi-city-input");
	var dataNode = document.getElementById("aqi-value-input");
	var errorNode = document.getElementById("error");
	var cityName = trim(nameNode.value);
	var cityData = trim(dataNode.value);
	var regName = /^[A-Za-z\u4e00-\u9fa5]{0,}$/;
	var regData = /^[0-9]{0,}$/;
	if(cityName == "") {
		errorNode.innerHTML = "请输入城市名称!";
		nameNode.value = "";
		return false;
	}
	else if(!regName.test(cityName)) {
        errorNode.innerHTML = "城市名称必须为中英文字符!";
        nameNode.value = "";
		return false;
	}
	else if (cityData == "") {
		errorNode.innerHTML = "请输入空气质量指数!";
		dataNode.value = "";
		return false;
	}
	else if (!regData.test(cityData)) {
        errorNode.innerHTML = "空气质量指数必须为整数!";
        dataNode.value = "";
		return false;
	}
	else {
		nameNode.value = "";
		dataNode.value = "";
		renderAqiList(cityName, cityData);
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList(name , data) {
	var tableNode = document.getElementById("aqi-table");
	var trNode = document.createElement('tr');
	trNode.innerHTML = '<td>'+name+'</td><td>'+data+'</td><td><button onclick = "delBtnHandle(event)">删除</button></td>';
	tableNode.appendChild(trNode);
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(event) {
  // do sth.
  	var parentTrNode = event.currentTarget.parentNode.parentNode;
  	parentTrNode.parentNode.removeChild(parentTrNode);
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addAqiData函数
  var addNode = document.getElementById("add-btn");
  if(addNode) {
 	 addNode.onclick = addAqiData;
  }

}

init();