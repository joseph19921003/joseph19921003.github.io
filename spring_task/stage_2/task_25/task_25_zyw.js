var faNode = document.querySelectorAll(".fa"),
    chooseNode = document.querySelector(".choose"),
    checkBoxNode = document.querySelectorAll(".checkbox"),
    delectNode = document.querySelector(".delect"),
    addNode = document.querySelector(".add"),
    addinputNode = document.querySelectorAll(".addinput");

(function() {

	for (var i = faNode.length - 1; i >= 0; i--) { //展开与隐藏切换
		addHander(faNode[i], "click", toggle);
	}
	addHander(chooseNode, "click", choose); //选择节点
	addHander(delectNode, "click", delect); //删除节点
	addHander(addNode, "click", add);  //添加节点
})();

/*展开与隐藏切换*/
function toggle(event) {
	del_ff(event.currentTarget);
	var chooseUl = event.currentTarget.parentNode.children[2];
	if(chooseUl) {
	    var ulStyle = chooseUl.style;
		if(ulStyle.display == 'block') {
			ulStyle.display = 'none';
			event.currentTarget.className = "fa fa-plus-square-o "
		}
		else {
			ulStyle.display = 'block';
			event.currentTarget.className = "fa fa-minus-square-o "
		}
	}
}

/*选择节点*/
function choose() {
	for (var j = checkBoxNode.length - 1; j >= 0; j--) {
		if (checkBoxNode[j].style.display == "inline-block") {
			checkBoxNode[j].style.display = "none";
			chooseNode.innerHTML = "选择节点";
		}
		else {
			checkBoxNode[j].style.display = "inline-block";
			chooseNode.innerHTML = "结束操作";
		}
	}
}

//删除节点
function delect() {
	var delectArr = hasChooseNode();
	for (var m = delectArr.length - 1; m >= 0; m--) {
		del_ff(delectArr[m])
		var shouldDelect = delectArr[m].parentNode;
		shouldDelect.parentNode.removeChild(shouldDelect); 
	}
}

//添加节点
function add() {
	var inputValue = document.querySelector(".addinput").value;
	var addArr = hasChooseNode();
	for (var m = addArr.length - 1; m >= 0; m--) {
		del_ff(addArr[m]);
		var shouldAdd = addArr[m].parentNode;
		if (shouldAdd.children.length != 3) {
			var shouldAddNode = document.createElement("ul");
			shouldAddNode.innerHTML = "<li class = 'navli'><i class='fa fa-minus-square-o'></i><input class='checkbox' type = 'checkbox' style = 'display:inline-block'/>"+inputValue+"</li>";
			shouldAdd.appendChild(shouldAddNode);
	        shouldAdd.children[0].className = "fa fa-plus-square-o"
		}
		else {
			var shouldAddNode = document.createElement("li");
			shouldAddNode.innerHTML = "<i class='fa fa-minus-square-o'></i><input class='checkbox' type = 'checkbox' style = 'display:inline-block'/>"+inputValue;
		    shouldAdd.children[2].appendChild(shouldAddNode);
		}
	    addNodeEvent(addArr[m]);
	}
}

/*给新增的节点添加事件*/
function addNodeEvent(node) {
	var liNodeCurrent = node;
	addHander(liNodeCurrent, "click", toggle);
}

//找到已选择节点
function hasChooseNode() {
	var checkBoxNode = document.querySelectorAll(".checkbox");
	var chooseArr = [];
	for (var k = checkBoxNode.length - 1; k >= 0; k--) {
		if (checkBoxNode[k].checked) {
			chooseArr.push(checkBoxNode[k]);
		}
	}
	return chooseArr;
}

/*添加事件*/
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

/*查找树  先序遍历*/
function findNode(node) {
	var current = node;
	for (var i = 0; i <= node.child.length - 1; i++) {
	    if(!(node.child[i] == null)) {
	     	current = findNode(node.child[i]);
		}
		else {
			if(current.data == finddata) {
				//do something
				continue;
			}
			else {
				break;
			}
		}
	}
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