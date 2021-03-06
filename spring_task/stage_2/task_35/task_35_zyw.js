var ulNumNode = document.querySelector(".ul-num");
var pos = {
	x:4,
	y:4,
	dir:0  //0:上,1:右，2：下，3：左
}; //小方块状态参数
var funQueue = {};//动画队列

(function() {
	var btnNode = document.querySelector(".execute");
	var clearNode = document.querySelector(".reset");
	var textareaNode = document.querySelector(".input-text");
	addHander(clearNode, "click", resetText);
	addHander(btnNode, "click", play);
	addHander(textareaNode, "keydown", addNum);//左边编号数量同步
	addHander(textareaNode, "scroll", syncNum);//左边编号同步滚动
})();

//清除textarea数据
function resetText() {
	document.querySelector(".input-text").value = '';
	var liNumNode = document.querySelectorAll(".ul-num li");
	funQueue ={};
	liNumNode[0].style.backgroundColor = '#ccc';
	for (var i = liNumNode.length - 1; i > 0; i--) {
		ulNumNode.removeChild(liNumNode[i]);
	}
}

//左边编号数量同步
function addNum(event) {
	var e = e||event;
	var liNumNode = document.querySelectorAll(".ul-num li");
	var textArr = getValue();
	var contentLength = textArr.length;
    if (e.keyCode == 13) {
	    var addliNumNode = document.createElement("li");
	    addliNumNode.innerHTML = liNumNode.length+1;
		ulNumNode.appendChild(addliNumNode);
		command();
    }
    if (e.keyCode == 8 && contentLength<liNumNode.length+1) {
    	for (var i = liNumNode.length - 1; i >= 0; i--) {
			if (i<contentLength) {
				continue;
			}
			else {
				ulNumNode.removeChild(liNumNode[i]);
			}
		}
    }
}

//左边编号同步滚动
function syncNum(event) {
	var e= e||event;
	var scrollTop = e.target.scrollTop,
	    scrollHeight = e.target.scrollHeight;
	ulNumNode.style.marginTop = -scrollTop+'px';
}

//获取textarea命令
function getValue() {
	var contentNode = document.querySelector(".input-text");
	var textArr = contentNode.value.split('\n');
	return textArr;
}

//检测是否是数字
function checkNum(data) {
	 return /^[1-9]+[0-9]*]*$/.test(data);
}

//获取对象属性个数
function countO(o) {
	var t = typeof o;
	if (t == 'string') {
		return o.length;
	}
	else if (t=='object') {
		var n = 0;
		for(var i in o) {
			n++;
		}
		return n;
	}
	return false;
}

//执行动画
function play() {
	command();
	var count = countO(funQueue);
	var m = count;
	if (count) {
		var timer = setInterval(function () {
			eval(funQueue[m].fun+"("+funQueue[m].num+")");
			animate();
			m--;
			if (m<1) {
				clearTimeout(timer);
			}
		}, 1000)
	}
}

//小方块运动命令的判断
//将每条命令执行的函数放进函数队列中
function command() {
	var liNumNode = document.querySelectorAll(".ul-num li");
	var textareaArr = getValue();
	var lengthT = textareaArr.length;
	var keyWord = ['go', 'GO', 'tun lef', 'TUN LEF', 'tun rig', 'TUN RIG', 'tun bac', 'TUN BAC', 'tra lef', 'TRA LEF', 'tra top', 'TRA TOP', 'tra rig', 'TRA RIG', 'tra bot', 'TRA BOT', 'mov lef', 'MOV LEF', 'mov top', 'MOV TOP', 'mov rig', 'MOV RIG', 'mov bot', 'MOV BOT']; //命令类型
	var funName = ['go', 'tunLef', 'tunRig', 'tunBac', 'traLef', 'traTop', 'traRig', 'traBot', 'movLef', 'movTop', 'movRig', 'movBot']; //命令对应函数名称
	var orderNum = 1;
	funQueue = {};
	while(lengthT--) {
		var rowValue = trim(textareaArr[lengthT]);
		var hasKey = false; //是否找到命令标志
		for (var i = 0; i <= keyWord.length - 1; i++) {
			var rowValueArr = rowValue.split(' ');
			var j = parseInt(i/2);
			if (i<2) {
				if(rowValueArr.length ==1) {
					if(rowValueArr[0] == keyWord[i]) {
				        funQueue[orderNum] = {fun:funName[0],num:1};
				        hasKey = true;
				        orderNum++;
					}
				}
				else if(rowValueArr[0] == keyWord[i] && checkNum(trim(rowValueArr[1]))) {
					funQueue[orderNum] = {fun:funName[0], num:trim(rowValueArr[1])};
					hasKey = true;
					orderNum++;
				}
			}
			else if(i<8) {
				if (rowValue==keyWord[i]) {
					funQueue[orderNum] = {fun:funName[j], num:null};
					hasKey = true;
					orderNum++;
				}
			}
			else {
				var keyWordArr = keyWord[i].split(' ');
				if (rowValueArr.length ==2) {
					if (rowValue==keyWord[i]) {
						funQueue[orderNum] = {fun:funName[j], num:1};
						hasKey = true;
						orderNum++;
					}
				}
				else if (rowValueArr[0]==keyWordArr[0]&&rowValueArr[1]==keyWordArr[1]&&checkNum(trim(rowValueArr[2]))) {
					funQueue[orderNum] = {fun:funName[j], num:trim(rowValueArr[2])};
					hasKey = true;
					orderNum++;
				}
			}
		}
		if (!hasKey) {
			liNumNode[lengthT].style.borderRadius = '10px';
			liNumNode[lengthT].style.backgroundColor = 'red';
		}
		else {
			liNumNode[lengthT].style.borderRadius = '0px';
			liNumNode[lengthT].style.backgroundColor = '#ccc';
		}
	}
}

function tunLef(n) {
	pos.dir--;
}

function tunRig(n) {
	pos.dir++;
}

function tunBac(n) {
	pos.dir+=2;
}

function go(n) {
	if (Math.abs(positive(pos.dir)%4) == 0) {
		if (pos.y>n-1) {
			pos.y = pos.y-n;
		}
		else {
			pos.y = 0;
		}
	}
	else if(Math.abs(positive(pos.dir)%4) == 1) {
		if (pos.x<10-n) {
			pos.x = pos.x+n;
		}
		else {
			pos.x = 9;
		}
	}
	else if(Math.abs(positive(pos.dir)%4) == 2) {
		if (pos.y<10-n) {
			pos.y = pos.y+n;
		}
		else {
			pos.y = 9;
		}
	}
	else if(Math.abs(positive(pos.dir)%4) == 3) {
		if (pos.x>n-1) {
			pos.x = pos.x-n;
		}
		else {
			pos.x = 0;
		}
	}
}

function traLef(n) {
	if(pos.x>n-1) {
		pos.x = pos.x-n;
	}
	else {
		pos.x = 0;
	}
}

function traTop(n) {
	if(pos.y>n-1) {
		pos.y = pos.y-n;
	}
	else {
		pos.y = 0;
	}
}

function traRig(n) {
	if(pos.x<10-n) {
		pos.x = pos.x+n;
	}
	else {
		pos.x = 9;
	}
}

function traBot(n) {
	if(pos.y<10-n) {
		pos.y = pos.y+n;
	}
	else {
		pos.y = 9;
	}
}

function movLef(n,callback) {
	if((Math.abs(positive(pos.dir)%4) == 0)) {
		tunLef();
	}
	else if((Math.abs(positive(pos.dir)%4) == 1)) {
		tunBac();
	}
	else if((Math.abs(positive(pos.dir)%4) == 2)) {
		tunRig();
	}
	go(n);
}

function movRig(n) {
	if((Math.abs(positive(pos.dir)%4) == 0)) {
		tunRig();
	}
	else if((Math.abs(positive(pos.dir)%4) == 3)) {
		tunBac();
	}
	else if((Math.abs(positive(pos.dir)%4) == 2)) {
		tunLef();
	}
	go(n);
}
function movTop(n) {
	if((Math.abs(positive(pos.dir)%4) == 3)) {
		tunRig();
	}
	else if((Math.abs(positive(pos.dir)%4) == 1)) {
		tunLef();
	}
	else if((Math.abs(positive(pos.dir)%4) == 2)) {
		tunBac();
	}
	go(n);
}
function movBot(n) {
	if((Math.abs(positive(pos.dir)%4) == 0)) {
		tunBac();
	}
	else if((Math.abs(positive(pos.dir)%4) == 1)) {
		tunRig();
	}
	else if((Math.abs(positive(pos.dir)%4) == 3)) {
		tunLef();
	}
	go(n);
}

//执行动画的坐标
function animate () {
	var diamondsNode = document.querySelector(".diamonds");
	diamondsNode.style.left = pos.x*45;
	diamondsNode.style.top = pos.y*45;
	diamondsNode.style.transform = "rotate("+pos.dir*90+"deg)";
}

//定位方向辅助函数
function positive(m) {
	var x = m;
	while (x<0) {
		x = x+4;
	}
	return x;
}

/*添加事件,兼容浏览器*/
function addHander(element, type, handler) {
	if(element.addEventLister) {
		addHanderE = function(element, type, handler) {
			element.addEventLister(type, handler, false);
		}
	}
	else if(element.attachEvent) {
		addHanderE = function(element, type, handler) {
			element.attachEvent("on"+type, handler);
		}
	}
	else {
		addHanderE = function(element, type, handler) {
			element["on"+type] = handler;
		}
	}
	return addHanderE(element, type, handler);
}

//去掉空格
function trim(str) {
	return str.replace(/(^\s*)|(\s*$)/g, "");
}