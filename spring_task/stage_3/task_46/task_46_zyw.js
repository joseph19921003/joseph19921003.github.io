var map,gold;
var start = {x:4, y:0},
    end = {x:4, y:0};
var path = {};
var canvas = document.getElementById("canvas");
canvas.width = $(".canvas-content").width();
canvas.height = _height;
var ctx = canvas.getContext("2d");

var canvasHeight = canvas.clientHeight;
var canvasWidth = canvas.clientWidth;
var colNum = 10;
var colWidth = canvasWidth/colNum;
var heightLength = parseInt(canvasHeight/colWidth);

(function() {
    initMap();
    addHander(canvas, 'click', clickEvent);
})();

//每个单位节点包含的内容
function node(x, y, type) {   
	this.x = x,
	this.y = y,
	this.type = type,  //type是类型，true是障碍物，false是路
	this.coords = x+":"+y, //坐标
	this.neighbours = function(end) {
		var neib = [];
		var dir = [[0,1], [0,-1], [1,0], [-1,0], [1,-1], [1,1], [-1,-1], [-1,1]];
		for (var i = 0; i < 8; i++) {
			if (((this.x+dir[i][0]>=0) && (this.x+dir[i][0]<colNum)) && ((this.y+dir[i][1]>=0) && (this.y+dir[i][1]<heightLength))) {
				var  p = map[this.x+dir[i][0]][this.y+dir[i][1]];
				if (!p.type) {
					neib.push[p];
				}
			}
		}
		return neib;
	}
}

//初始化界面坐标
function initMap() {
	map = new Array();
	for (var i = 0; i < colNum; i++) {
		map[i] = new Array();
		for (var j = 0; j < heightLength; j++) {
			if ((i==4&&j==0)||(i==4&&j==(heightLength-1))) {
				map[i][j] = new node(i, j, false);
			}
			else {
				var t = Math.random()>0.8;
				map[i][j] = new node(i, j, t);
			}
		}
	}
	gold = map[4][heightLength-1];
	draw();
}

//绘制界面图
function draw() {

	//加载人物图片
	var personImage = new Image();
	personImage.onload = function() {
		ctx.drawImage(personImage, colWidth*4, 0, colWidth, colWidth);
	};
	personImage.src = "../../../images/person.png";

	//加载file图片
	var fileImage = new Image();
	fileImage.onload = function() {
		ctx.drawImage(fileImage, colWidth*4, (heightLength-1)*colWidth , colWidth, colWidth);
	};
	fileImage.src = "../../../images/box.png";

	//绘制障碍物
	for (var i = 0; i < colNum; i++) { 
		for (var j = 0; j < heightLength; j++) {
			if(map[i][j].type) {
				ctx.fillStyle = "#2e1e1e";
				ctx.fillRect(i*colWidth, j*colWidth,colWidth, colWidth);
			}
		}
	}
    ctx.fillStyle = "#2e1e1e";
	ctx.fillRect(0, heightLength*colWidth,canvasWidth , canvasHeight-heightLength*colWidth);
}

//设置小人移动的开始与结束的地方
function clickEvent(event) {
	var e = e||event;
	var pos = {x:parseInt(e.clientX/colWidth), y:parseInt(e.clientY/colWidth)};
	if (!map[pos.x][pos.y].type) {
		start.x = end.x;
		start.y = end.y;
		end.x = pos.x;
		end.y = pos.y;
	}
	else {
		start.x = end.x;
		start.y = end.y;
	}
	pathFind(start.x, start.y, end.x, end.y);
}


//A*算法的启发函数
function heuristics(a, b) {
	var dx1 = a.x - b.x
	var dy1 = a.y - b.y
	var dx2 = start.x - b.x
	var dy2 = start.y - b.y
	var cross = Math.abs(dx1*dy2 - dx2*dy1);
	var straight = Math.abs(Math.abs(dx1) - Math.abs(dy1));
	var diagonal = Math.max(Math.abs(a.x-b.x), Math.abs(a.y-b.y)) - straight;
	return straight + 1.01*diagonal + cross*0.001;
}

//寻找路径
function pathFind(x, y, x2, y2) {

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
