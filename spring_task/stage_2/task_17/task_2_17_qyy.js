/*
参考以下示例代码，原始数据包含几个城市的空气质量指数数据
用户可以选择查看不同的时间粒度，以选择要查看的空气质量指数是以天为粒度
还是以周或月为粒度
天：显示每天的空气质量指数
周：以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，
如果数据中缺少一个自然周的几天，则按剩余天进行计算
月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值
用户可以通过select切换城市
通过在"aqi-chart-wrap"里添加DOM，来模拟一个柱状图图表，横轴是时间，
纵轴是空气质量指数，参考图（点击打开）。天、周、月的数据只根据用户的选择显示一种。
天：每天的数据是一个很细的矩形
周：每周的数据是一个矩形
月：每周的数据是一个很粗的矩形
鼠标移动到柱状图的某个柱子时，用title属性提示这个柱子的具体日期和数据
 */

var form_gra_time = document.getElementById("form-gra-time"),
    city_select = document.getElementById("city-select"),
    aqi_chart_wrap = document.getElementsByClassName("aqi-chart-wrap")[0];

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = '';
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

var city_aqi_top_obj = {
  "北京": 500,
  "上海": 300,
  "广州": 200,
  "深圳": 100,
  "成都": 300,
  "西安": 500,
  "福州": 100,
  "厦门": 100,
  "沈阳": 500
};

// 用于渲染图表的数据
var chartData = [];

/**
 * 设置进行渲染的数据
 */
function setCharData() {
  //根据pageState来准备需要渲染的数据
  var nowSelectCity = pageState.nowSelectCity || "北京",
      nowGraTime = pageState.nowGraTime || "day",
      city_top_aqi = city_aqi_top_obj[nowSelectCity],
      temp_arr = [];
  pageState.nowSelectCity = nowSelectCity;
  pageState.nowGraTime = nowGraTime;
  for(var time in aqiSourceData[nowSelectCity]) {
    temp_arr.push(time);
  }
  temp_arr.sort();
  switch(nowGraTime) {
    case "day": _set_day_data(); break;
    case "week": _set_week_data(); break;
    case "month": _set_month_data(); break;
  }

  /**
   * 以天为单位准备数据
   */
  function _set_day_data() {
    chartData = [];
    for(var i = 0; i < temp_arr.length; i++) {
      var temp_obj = {};
      temp_obj.title = temp_arr[i];
      temp_obj.percent = aqiSourceData[nowSelectCity][temp_arr[i]] / city_top_aqi;
      chartData.push(temp_obj);
    }
  }

  /**
   * 以星期为单位准备数据
   */
  function _set_week_data() {
    // debugger
    chartData = [];
    var week_num = 1,
        count = 1,
        sum = 0,
        week_arr = [];
    for(var i = 0; i < temp_arr.length; i++) {
        sum += aqiSourceData[nowSelectCity][temp_arr[i]];
      if(new Date(temp_arr[i]).getDay() === 0) {
        var temp_obj = {};
        temp_obj.title = temp_arr[i].slice(0, 7) + "第" + week_num + "个星期";
        temp_obj.percent = sum / count / city_top_aqi;
        chartData.push(temp_obj);
        sum = 0;
        count = 1;
        week_num++;
      }
      if(i !== 0 && temp_arr[i].slice(0, 7) !== temp_arr[i - 1].slice(0, 7)) {
        week_num = 1;
      }
      count++;
    }
  }

  /**
   * 以月为单位准备数据 
   */
  function _set_month_data() {
    chartData = [];
    var sum = 0,
        count = 0;
    for(var i = 0; i < temp_arr.length; i++) {
      sum += aqiSourceData[nowSelectCity][temp_arr[i]];
      if((i !== 0 && temp_arr[i].slice(0, 7) !== temp_arr[i - 1].slice(0, 7))
          || i === temp_arr.length - 1) {
        var temp_obj = {};
        temp_obj.title = temp_arr[i - 1].slice(0, 7);
        temp_obj.percent = sum / count / city_top_aqi;
        chartData.push(temp_obj);
        sum = 0;
        count = -1;
      }
      count++;
    }

  }
}

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: 0,
  nowGraTime: 0
};

/**
 * 渲染图表
 */
function renderChart() {
  //这里应该是节点的生成
  var city_top_aqi = city_aqi_top_obj[pageState.nowSelectCity];
  aqi_chart_wrap.innerHTML = "";
  for(var i = 0; i < chartData.length; i++) {
    var div = document.createElement("div"),
        percent = chartData[i].percent,
        backgroundColor = "";
    div.title = chartData[i].title + " AQI: " + Math.round(percent * city_top_aqi);
    div.style.height = parseInt(window.getComputedStyle(aqi_chart_wrap, null).height) * percent + "px" ;
    div.style.width = (800 / chartData.length > 150 ? 150 : 800 / chartData.length) +"px";
    backgroundColor = Math.ceil(percent * 15777215/*16777215*/).toString(16);
    if(backgroundColor.length !== 6) {
      for(var j = 0; j < 6 - backgroundColor.length + 1; j++) {
        backgroundColor = "0" + backgroundColor;
      }

    }
    div.style.backgroundColor = "#" + backgroundColor;
    aqi_chart_wrap.appendChild(div);
  }
  

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  var nowGraTime = event.target.value;
  // 确定是否选项发生了变化 
  if(pageState.nowGraTime !== nowGraTime) {
    //更新表单选项
    pageState.nowGraTime = nowGraTime;

    // 设置对应数据
    setCharData();

    // 调用图表渲染函数
    renderChart();
  }
  return false;
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  var nowSelectCity = city_select.value;
  // 确定是否选项发生了变化 
  if(pageState.nowSelectCity !== nowSelectCity) {
    //更新表单选项
    pageState.nowSelectCity = nowSelectCity;

    // 设置对应数据
    setCharData();

    // 调用图表渲染函数
    renderChart();
  }
  return false;
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  // 绑定事件
  form_gra_time.onchange = graTimeChange;
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 绑定事件
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  for(var prop in aqiSourceData) {
    if(aqiSourceData.hasOwnProperty(prop)) {
        city_select.innerHTML += "<option>" + prop + "</option>";
    }
  }
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  city_select.onchange = citySelectChange;

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  
  // 处理好的数据存到 chartData 中
  setCharData();
  //图表的渲染
  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();