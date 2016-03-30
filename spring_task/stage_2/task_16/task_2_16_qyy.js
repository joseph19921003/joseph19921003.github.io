/*
参考以下示例代码，用户输入城市名称和空气质量指数后，点击“确认添加”按钮后，
就会将用户的输入在进行验证后，添加到下面的表格中，新增一行进行显示
用户输入的城市名必须为中英文字符，空气质量指数必须为整数
用户输入的城市名字和空气质量指数需要进行前后去空格及空字符处理（trim）
用户输入不合规格时，需要给出提示（允许用alert，也可以自行定义提示方式）
用户可以点击表格列中的“删除”按钮，删掉那一行的数据
 */
(function() {
	var city_input = document.getElementById("aqi-city-input"),
		city_value = city_input.value,
		aqi_value_input = document.getElementById("aqi-value-input"),
		aqi_value = aqi_value_input.value,
		add_btn = document.getElementById("add-btn"),
		aqi_table = document.getElementById("aqi-table"),
		aqi_tbody = aqi_table.getElementsByTagName("tbody")[0],
		city_tip = document.getElementById("city_tip"),
		aqi_tip = document.getElementById("aqi_tip"),
		fragment = document.createDocumentFragment(),
		tempElement = document.createElement("div");
		city_reg = /^[\u4e00-\u9fa5a-zA-Z]+$/,
		aqi_reg = /^\d+$/,
		trim_reg = /^[\s|\u00A0]+|[\s|\u00A0]+$/,
		aqiData = {};

	/**
	 * 提交时对每个字段都进行验证
	 * 如果不符合规则则给出提示信息
	 */
	function validation() {
		city_tip.innerHTML = "";
		aqi_tip.innerHTML = "";
		city_value = city_input.value || "";
		aqi_value = aqi_value_input.value || "";
		city_value.replace(trim_reg, "");
		aqi_value.replace(trim_reg, "");
		if(city_value === "") {
			//给出提示信息
			city_tip.innerHTML = "该字段不能为空";
		}
		if(aqi_value === "") {
			//给出提示信息
			aqi_tip.innerHTML = "该字段不能为空";
		}
		if(city_value !== "" && !city_reg.test(city_value)) {
			city_tip.innerHTML = "请输入中英文";
		}
		if(aqi_value !== "" && !aqi_reg.test(aqi_value)) {

			aqi_tip.innerHTML = "请输入数字";
		}
		if(city_value && aqi_value) {
			if(city_reg.test(city_value) && aqi_reg.test(aqi_value)) {
				return true;
			}
		}
		return false;
	}

	/**
	 * 从用户输入中获取数据，向aqiData中增加一条数据
	 * 然后渲染aqi-list列表，增加新增的数据
	 */
	function addAqiData() {
		if(validation()) {
			city_input.value = "";
			aqi_value_input.value = "";
			aqiData[city_value] = aqi_value;
		}
	}

	/**
	 * 渲染aqi-table表格
	 */
	function renderAqiList() {
		aqi_tbody.innerHTML = "";
		for(var prop in aqiData) {
			if(aqiData.hasOwnProperty(prop)) {
				aqi_tbody.innerHTML += "<tr><td>" + prop + "</td>" +
					"<td>" + aqiData[prop] + "</td>" +
						"<td><button>删除</button></td></tr>";
			}
		}
	}

	/**
	 * 点击add-btn时的处理逻辑
	 * 获取用户输入，更新数据，并进行页面呈现的更新
	 */
	function addBtnHandle() {
		addAqiData();
		renderAqiList();
	}

	/**
	 * 点击各个删除按钮的时候的处理逻辑
	 * 获取哪个城市数据被删，删除数据，更新表格显示
	 */
	function delBtnHandle(event) {
	  // 这么寻找元素肯定不妥，暂时没有特别好的方法
	  delete aqiData[event.target.parentNode.parentNode.getElementsByTagName("td")[0].innerHTML];
	  renderAqiList();
	}

	function init() {

	  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	  add_btn.onclick = addBtnHandle;
	  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	  aqi_table.onclick = delBtnHandle;
	}

	init();
})();