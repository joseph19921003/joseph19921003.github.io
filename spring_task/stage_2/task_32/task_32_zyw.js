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
                errorId.innerHTML = "此项必填";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(textlength < 4 || textlength >16){
                errorId.innerHTML = "长度为4-16个字符";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(textlength >= 4 && textlength <= 16 ){
                errorId.innerHTML = this.success;
                errorId.style.color = "#555";
                errorId.parentElement.children[1].children[0].style.borderColor = "#e9e9e9";
            }
		}
	}
}
formMaker.psd =  {
	setting : {
		label: "密码",
		id: "psd",
		type: "password",
		rules: "必填,长度为8-20个字符",
		success: "格式正确",
		fail: "格式错误",
		validator: function(inputValue) {
			var textlength  = inputValue.length;
			var errorId = document.getElementById("error_"+this.id);
            if(textlength ===0){
                errorId.innerHTML = "此项必填";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(textlength < 8 || textlength >20){
                errorId.innerHTML = "长度为8-20个字符";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(textlength >= 8 && textlength <= 20 ){
                errorId.innerHTML = this.success;
                errorId.style.color = "#555";
                errorId.parentElement.children[1].children[0].style.borderColor = "#e9e9e9";
            }
		}
	}
}
formMaker.psdAgain =  {
	setting : {
		label: "确认密码",
		id: "psd-again",
		type: "password",
		rules: "必填,确认密码",
		success: "格式正确",
		fail: "格式错误",
		validator: function(inputValue) {
			var textlength  = inputValue.length;
			var errorId = document.getElementById("error_"+this.id);
			var psdValue = document.getElementById("psd").value;
            if(textlength ===0){
                errorId.innerHTML = "此项必填";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(psdValue!= inputValue){
                errorId.innerHTML = "两次输入的密码不一样";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(textlength >= 8 && textlength <= 20 ){
                errorId.innerHTML = this.success;
                errorId.style.color = "#555";
                errorId.parentElement.children[1].children[0].style.borderColor = "#e9e9e9";
            }
		}
	}
}
formMaker.mail =  {
	setting : {
		label: "邮箱",
		id: "mail",
		type: "text",
		rules: "必填,输入邮箱",
		success: "格式正确",
		fail: "格式错误",
		validator: function(inputValue) {
			var textlength  = inputValue.length;
			var errorId = document.getElementById("error_"+this.id);
			var reg = /^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/;
            if(textlength ===0){
                errorId.innerHTML = "此项必填";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(!reg.test(inputValue)){
                errorId.innerHTML = this.fail;
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else {
                errorId.innerHTML = this.success;
                errorId.style.color = "#555";
                errorId.parentElement.children[1].children[0].style.borderColor = "#e9e9e9";
            }
		}
	}
}

formMaker.mobile =  {
	setting : {
		label: "联系方式",
		id: "mobile",
		type: "text",
		rules: "必填,输入联系方式",
		success: "格式正确",
		fail: "格式错误",
		validator: function(inputValue) {
			var textlength  = inputValue.length;
			var errorId = document.getElementById("error_"+this.id);
			var reg = /^1\d{10}$/;
            if(textlength ===0){
                errorId.innerHTML = "此项必填";
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else if(!reg.test(inputValue)){
                errorId.innerHTML = this.fail;
                errorId.style.color = "#DE0C0C";
                errorId.parentElement.children[1].children[0].style.borderColor = "#DE0C0C";
            }
            else {
                errorId.innerHTML = this.success;
                errorId.style.color = "#555";
                errorId.parentElement.children[1].children[0].style.borderColor = "#e9e9e9";
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
	var nameInput=formMaker.addGroup(formMaker.psd);
	var nameInput=formMaker.addGroup(formMaker.psdAgain);
	var nameInput=formMaker.addGroup(formMaker.mail);
	var nameInput=formMaker.addGroup(formMaker.mobile);
})();
