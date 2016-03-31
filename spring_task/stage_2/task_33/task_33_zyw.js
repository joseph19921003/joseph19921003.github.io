var pos = {
	x:1,
	y:1,
	dir:0
}; //小方块状态参数

(function() {
	var btnNode = document.querySelector(".execute");
	addHander(btnNode, "click", play);
})();

//小方块运动判断
function play() {
	var inputValue = document.querySelector(".input-text").value;
	var diamondsDir = pos.dir;
	switch (trim(inputValue)) {
		case 'go':
		case 'GO': {
			if ((Math.abs(diamondsDir%4) == 0)&&(pos.y>0)) {
				pos.y--;
			}
			else if((Math.abs(diamondsDir%4) == 1)&&(pos.x<9)) {
				pos.x++;
			}
			else if((Math.abs(diamondsDir%4) == 2)&&(pos.y<9)) {
				pos.y++;
			}
			else if((Math.abs(diamondsDir%4) == 3)&&(pos.x>0)) {
				pos.x--;
			}
			break;
		}
		case 'tun lef':
		case 'TUN LEF': {
			pos.dir--;
			break;
		}
		case 'tun rig':
		case 'TUN RIG': {
			pos.dir++;
			break;
		}
		case 'tun bac':
		case 'TUN BAC': {
			pos.dir+=2;
			break;
		}
	}
	animate();
}

function animate () {
	var diamondsNode = document.querySelector(".diamonds");
	diamondsNode.style.left = pos.x*45;
	diamondsNode.style.top = pos.y*45;
	diamondsNode.style.transform = "rotate("+pos.dir*90+"deg)";
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