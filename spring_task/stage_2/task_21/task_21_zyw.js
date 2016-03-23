(function() {
	var inputNode = document.querySelector("input"),
	    liNode = document.querySelectorAll(".tag-list li"),
	    btnNode = document.querySelector(".link-btn");
	addHandler(inputNode, "keydown", keyDown);
	addHandler(btnNode, "click", showLike);
})();

/*tag标签显示*/
function showTag() {
    var inputNode = document.querySelector("input"),
        tagUlNode = document.querySelector(".tag-list"),
        tagLiNode = document.createElement("li"),
        inputValue = trim(inputNode.value);
    if (inputValue) {
    	del_ff(tagUlNode);
    	if(tagUlNode.childNodes.length ==10) {  //超过十个删除第一个
    		tagUlNode.removeChild(tagUlNode.childNodes[0]);
    	}
	    tagLiNode.innerHTML = "<span class = 'delect'>删除</span><span class = 'ivalue'>"+inputValue+"</span>";
	    tagUlNode.appendChild(tagLiNode);
	    addLiEvent(tagUlNode.childNodes.length-1);
    }
    setTimeout(function() {
		inputNode.value = "";
    },0)
};

function keyDown(event) {
	var e = e||event;
    var inputValue = document.querySelector("input").value;
    var lastChar = inputValue.charAt(inputValue.length - 1);
    if (e.keyCode == 13) {
    	setTimeout(function() {
    		showTag();
    	},0);
    	e.preventDefault ? e.preventDefault() : (e.returnValue = false);
    }
    else if ((e.keyCode == 188) ||(e.keyCode == 32)||(lastChar == "，")||(lastChar == "，")) {
    	showTag();
    }
}

/*删除tag标签*/
function delectTag(event) {
	var liNode = event.currentTarget;
  	liNode.parentNode.removeChild(liNode);
};

function showLike() {
// alert(2);
};

/*给新增的tagli添加删除事件*/
function addLiEvent(num) {
	var liNodeCurrent = document.querySelectorAll(".tag-list li")[num];
	addHandler(liNodeCurrent, "click", delectTag);
}

/*添加事件*/
function addHandler(element, type, handler) {
	if(element.addEventLister) {
		addHandlerE = function(element, type, handler) {
			element.addEventLister(type, handler, false);
		}
	}
	else if(element.attachEvent) {
		addHandlerE = function(element, type, handler) {
			element.attachEvent("on"+type, handler);
		}
	}
	else {
		addHandlerE = function(element, type, handler) {
			element["on"+type] = handler;
		}
	}
	return addHandlerE(element, type, handler);
};


//去掉空格和重复的
function trim(str) {
	var strhh = str.replace(/[\r\n]/g,"");
	var strdh = strhh.replace(/(.*)[,，]$/, '$1');
	var strkg = strdh.replace(/(^\s*)|(\s*$)/g, "");
	var ivalue = document.querySelectorAll(".ivalue");
	for (var j = ivalue.length - 1; j >= 0; j--) {
		if (strkg ==document.querySelectorAll(".ivalue")[j].innerHTML) {
			strkg = '';
		}
	}

	return strkg;
}

/*通过childNodes获取节点时去掉换行所占的节点*/
function del_ff(elem){
	var elem_child = elem.childNodes;
		for(var i=0; i<elem_child.length;i++){
		if(elem_child[i].nodeName == "#text" && !/\s/.test(elem_child.nodeValue)){
			elem.removeChild(elem_child[i])
		}
	}
}