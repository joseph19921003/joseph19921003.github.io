//表单工厂
var formMaker = function() {};

//初始化参数
formMaker.username =  {
	setting : {
		label: "名称",
		id: "username",
		type: "text",
		rules: "必填,长度为4-16个字符",
		success: "格式正确",
		fail: "格式错误",
		validator: function(inputValue) {
			var textlength  = inputValue.length;
			var errorId = document.getElementById("error_"+this.id);
            if(textlength ===0){
                errorId.innerHTML = this.rules;
            }
            else if(textlength < 4 || textlength >16){
                errorId.innerHTML = "长度为4-16个字符";
            }
            else if(textlength >= 4 && textlength <= 16 ){
                errorId.innerHTML = this.success;
            }
		}
	}
}

//构建页面
formMaker.addGroup = function(list) {
	var oForm = "",
	    obj = list.setting;
	var rootNode = document.getElementById("wrap"),
	    childNode = document.createElement('div');
	oForm += "<div class = 'row'>";
	oForm += "<div class = 'input-l'>" + obj.label + "</div>";
	oForm += "<div class = 'input-r'><input type =" + obj.type + " id = "+ obj.id +" placeholder = "+obj.rules+" /></div>";
	oForm += "<div class = 'error' id = 'error_"+obj.id+"'></div>";
	childNode.innerHTML = oForm;
	rootNode.appendChild(childNode);
	addNodeEvent(list)
}

/*给新增的节点添加事件*/
function addNodeEvent(list) {
	var inputNode = document.getElementById(list.setting.id);
	addHander(inputNode, "blur", function() {
	    var inputValue = inputNode.value;
		list.setting.validator(inputValue);
	});
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

(function() {
	var nameInput=formMaker.addGroup(formMaker.username);
})();
