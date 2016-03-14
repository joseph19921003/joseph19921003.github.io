/**
 * 该函数用于得到视口的尺寸
 * @param  {[type]} win [windowd对象]
 * @return {[type]}     [description]
 */
function getViewportSize(win) {
	win = win || window;
	if(win.innerWidth) {
		return {
			width: win.innerWidth,
			height: win.innerHeight
		};
	}
	var doc = win.document;
	if(doc.compatMode === "CSS1Compat") {
		return {
			width: doc.documentElement.clientWidth,
			height: doc.documentElement.clientHeight
		};
	}
	return {
		width: doc.body.clientWidth,
		height: doc.body.clientHeight
	};
}

/**
 * 老版本浏览器不支持classList属性
 * 该函数用户模拟该属性得对的DOMTokenList对象
 * 该对象有add remove contains toggle方法
 * @param {[type]} element 元素对象
 */
function ClassList(element) {
	if(element.classList) {
		return element.classList;
	}
	return element ? new _MyClassList(element) : false;
}

function _MyClassList(element) {
	this.element = element;
}

_MyClassList.prototype.contains = function(className) {
	if(className.indexOf(" ") !== -1 || className.length === 0) {
		throw new Error("Invalid Class Name :" + "'" + className + "'");
	}
	var classNames = this.element.className;
	if(classNames === "") {
		return false;
	} else if(classNames === className) {
		return true;
	}
	return classNames.search("\\b"+className+"\\b") !== -1;

};
_MyClassList.prototype.add = function(className) {
	if(this.contains("className")) {
		return;
	}
	var classNames = this.element.className;
	if(classNames && classNames[classNames.length - 1] !== " ") {
		alert(classNames + ",");
		className = " " + className;
	}
	this.element.className = classNames + className;
};
_MyClassList.prototype.remove = function(className) {
	if(className.indexOf(" ") !== -1 || className.length === 0) {
		throw new Error("Invalid Class Name :" + "'" + className + "'");
	}
	var classNames = this.element.className,
		pattern = new RegExp("\\b"+ className + "\\b\\s*", "g");
	alert(classNames, className)
	this.element.className = classNames.replace(pattern, "");

};
_MyClassList.prototype.toggle = function(className) {
	if(this.contains(className)) {
		this.remove(className);
		return false;
	} else {
		this.add(className);
		return true;
	}

};

/*
 * $的封装函数
 * 用于获取元素
 * */
function $(selector,content){
	var firstChar = selector.charAt(0);
	content = content || document;
	if ( firstChar === '#' ){                                // 通过ID来获取时
		return document.getElementById(selector.slice(1));
	}
	else if ( firstChar === '.' ){							 // 通过class来获取时
		var allElement = document.getElementsByTagName('*'); // 首先获取所有元素
		var arr =[];										 // 定义一个数组用来储存获取到的元素
		for ( var i = 0; i < allElement.length ; i++ ){
			var classname = allElement[i].className;         // 循环所有, 并获取其className
			var classArr = classname.split(' ');			 // 把该元素的 className 解析为数组 用空格分开
			for( var j = 0; j < classArr.length ; j++ ){     // 循环该元素的className 每一项 如果有一项与传入的 selector.slice(1) 相同
				if( classArr[j] == selector.slice(1) ){		 // 则表示该元素有其 class 并把它放入数组( arr ) 中
					arr.push( allElement[i] );
					break;                                   // 同时停止该循环
				}
			}
		};
		return arr;                                          //最后输出该数组中的所有元素;
	}else{
		return content.getElementsByTagName(selector);
	}
};


/*通过childNodes获取节点时去掉换行所占的节点*/
function del_ff(elem){
	var elem_child = elem.childNodes;
		for(var i=0; i<elem_child.length;i++){
		if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
			elem.removeChild(elem_child[i])
		}
	}
}