
//JQ图片轮播代码在这里！
function JQplayImg() {
	//设置导航li的追加或移除on样式和设置图片淡入淡出
	function setJQplayLiStyleAndImgOpacity($elem) {
		var i = $elem.index();	//用i变量存放元素的下标
		//查找与元素相同下标的图片并设置淡入
		$(".jq-play").find("img").eq(i).fadeIn(700)
		//查找父元素的兄弟元素下的图片并设置淡出
			.parent().siblings().find("img").fadeOut(700)
				//查找图片的祖先元素nav元素的兄弟元素ul元素
				.parents("nav").siblings("ul")
				//查找ul元素下的相同下标li元素并加上on样式
				.find("li").eq(i).addClass("on")
					//查找相同下标的li元素的兄弟元素并移除on样式
					.siblings().removeClass("on");
	}

	$(".jq-play li").click(function() {
		setJQplayLiStyleAndImgOpacity($(this));
	});
	//自动轮播函数
	function autoMoveImg() {
		var $next_Sibling = $(".jq-play li.on").next();
		//查找不到下一个兄弟元素时，重新从头开始轮播
		if ($next_Sibling.index() == -1) {
			$next_Sibling = $(".jq-play li").eq(0);
		}

		setJQplayLiStyleAndImgOpacity($next_Sibling);
	}
	//网页开始里自动轮播
	var time = setInterval(function() {
		autoMoveImg();
	},2000);
	//鼠标移入时清除自动轮播，移出时开始自动轮播
	$(".jq-play li").hover(function() {
		console.log("abc");
		clearInterval(time);
	},function() {
		 time = setInterval(function() {
			autoMoveImg();
		},2000);
	});

}

JQplayImg();