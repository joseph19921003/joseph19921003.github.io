function contentPlay() {

	/*内容切换*/
	for (var i = 2; i >= 0; i--) {
		$(".up-nav-li")[i].onclick = function(event) {
			var contentName = event.currentTarget.getAttribute("_content");
			for (var j = 2; j >= 0; j--) {
				$(".content-up-block")[j].style.display = "none";
				$(".up-nav-li")[j].classList.remove("up-nav-active");
			};
			event.currentTarget.classList.add("up-nav-active");
			$("."+contentName)[0].style.display = "block";
			contentAuto();

		}
	};

	/*内容轮播*/
	contentAuto();
}

/*内容轮播*/
function contentAuto() {
	var blockWidth = 214;
	var nodeLength = [];
	var totleWidth = [];
	for (var i = 2; i >= 0; i--) {
		del_ff($(".content-up-block")[i])
		nodeLength[i] = $(".content-up-block")[i].childNodes.length;
		totleWidth[i] = blockWidth*nodeLength[i];
		$(".content-up-block")[i].style.width = totleWidth[i]+'px';
		$(".content-up-block")[i].style.left = 0+'px';
	};
	var num;
	for (var j = $(".up-nav-li").length-1; j >= 0; j--) {
		if($(".up-nav-li")[j].getAttribute('class') =="up-nav-li up-nav-active"){
			num = j;
		}
	};
	var count = 0;
	var left;
	$(".up-nav-left")[0].onclick = function() {
		count--;
		if(count<0) {
			count = nodeLength[num]-4;
		}
		left = -count*blockWidth;
		$(".content-up-block")[num].style.left = left+'px';
	} 
	$(".up-nav-right")[0].onclick = function() {
		count++;
		if(count>nodeLength[num]-4) {
			count = 0;
		}
		left = -count*blockWidth;
		$(".content-up-block")[num].style.left = left+'px';
	} 
}