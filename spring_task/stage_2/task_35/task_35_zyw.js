var ulNumNode = document.querySelector(".ul-num");
var pos = {
	x:1,
	y:1,
	dir:0
}; //小方块状态参数

(function() {
	var btnNode = document.querySelector(".execute");
	var textareaNode = document.querySelector(".input-text")
	addHander(btnNode, "click", play);
	addHander(textareaNode, "keydown", addNum);//左边编号数量同步
	addHander(textareaNode, "scroll", syncNum);//左边编号同步滚动
})();

//左边编号数量同步
function addNum(event) {
	var e = e||event;
	var length = document.querySelectorAll(".ul-num li").length+1,
	    contentLength = document.querySelector(".input-text").length;
    if (e.keyCode == 13) {
		var liNumNode = document.createElement("li");
		liNumNode.innerHTML = length;
		ulNumNode.appendChild(liNumNode);
    }
}

//左边编号同步滚动
function syncNum(event) {
	var e= e||event;
	var scrollTop = e.target.scrollTop,
	    scrollHeight = e.target.scrollHeight,
	    liNumNode = document.querySelectorAll(".ul-num li");
	ulNumNode.style.marginTop = -scrollTop+'px';
	for (var i = liNumNode.length - 1; i >= 0; i--) {
		if (i<scrollHeight/20) {
			continue;
		}
		else {
			ulNumNode.removeChild(liNumNode[i]);
		}
	}
}

//小方块运动判断
function play() {
	var inputValue = document.querySelector(".input-text").value;
	switch (trim(inputValue)) {
		case 'go':
		case 'GO': {
			go(1);
			break;
		}
		case 'tun lef':
		case 'TUN LEF': {
			tunLef();
			break;
		}
		case 'tun rig':
		case 'TUN RIG': {
			tunRig();
			break;
		}
		case 'tun bac':
		case 'TUN BAC': {
			tunBac();
			break;
		}
		case 'tra lef':
		case 'TRA LEF': {
			traLef(1);
			break;
		}
		case 'tra top':
		case 'TRA TOP': {
			traTop(1);
			break;
		}
		case 'tra rig':
		case 'TRA RIG': {
			traRig(1);
			break;
		}
		case 'tra bot':
		case 'TRA BOT': {
			traBot(1);
			break;
		}
		case 'mov lef':
		case 'MOV LEF': {
			movLef(1);
			break;
		}
		case 'mov top':
		case 'MOV TOP': {
			movTop(1);
			break;
		}
		case 'mov rig':
		case 'MOV RIG': {
			movRig(1);
			break;
		}
		case 'mov bot':
		case 'MOV BOT': {
			movBot(1);
			break;
		}

	}
	animate();
}

function tunLef() {
	pos.dir--;
}

function tunRig() {
	pos.dir++;
}

function tunBac() {
	pos.dir+=2;
}

function go(n) {
	if ((Math.abs(positive(pos.dir)%4) == 0)&&(pos.y>n-1)) {
		pos.y = pos.y-n;
	}
	else if((Math.abs(positive(pos.dir)%4) == 1)&&(pos.x<10-n)) {
		pos.x = pos.x+n;
	}
	else if((Math.abs(positive(pos.dir)%4) == 2)&&(pos.y<10-n)) {
		pos.y = pos.y+n;
	}
	else if((Math.abs(positive(pos.dir)%4) == 3)&&(pos.x>n-1)) {
		pos.x = pos.x-n;
	}
}

function traLef(n) {
	if(pos.x>n-1) {
		pos.x = pos.x-n;
	}
}

function traTop(n) {
	if(pos.y>n-1) {
		pos.y = pos.y-n;
	}
}

function traRig(n) {
	if(pos.x<10-n) {
		pos.x = pos.x+n;
	}
}

function traBot(n) {
	if(pos.y<10-n) {
		pos.y = pos.y+n;
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

function animate () {
	var diamondsNode = document.querySelector(".diamonds");
	diamondsNode.style.left = pos.x*45;
	diamondsNode.style.top = pos.y*45;
	diamondsNode.style.transform = "rotate("+pos.dir*90+"deg)";
}

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