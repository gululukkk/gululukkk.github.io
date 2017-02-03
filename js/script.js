function addLoadEvent(func) {
	var oldonload = window.onload;
	if (typeof window.onload != "function") {
		window.load = func;
	} else {
		window.load = function () {
			oldonload();
			func();
		}
	}
}
/*//借用数组的splice方法操作类数组对象的函数
function splice(jqObj, index, count, addObj) {
    var newJqObj = ((addObj === undefined) ? Array.prototype.splice.call(jqObj, index, count) : Array.prototype.splice.call(jqObj, index, count, addObj));
    return newJqObj;
}*/

//更新时间函数
(function () {
	var dayAry = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
		dateTextNode = document.querySelector("#date");
	//输出日期函数
	function outputNowTime() {
		var nowDate = new Date,
			date;
		date = nowDate.toLocaleDateString() + "<br>" + dayAry[nowDate.getDay()] + " " + nowDate.toLocaleTimeString();
		return date;
	}
	//更新日期显示函数
	function upateTime() {
		var date = outputNowTime();
		dateTextNode.innerHTML = date;
	}

	addLoadEvent(upateTime);

	setInterval(function () {
		upateTime();
	}, 1000);
})();

//图片轮播函数
(function () {
	var $imgList = $(".picshow_win li"),
		$liList = $(".hover_btn li"),
		//i变量存放显示的图片的li标签的下标
		i = 0,
		t;
	$liList.eq(i).css("background", "#fff");
	
	//切换轮播状态函数
	var toggleShowStatus = function ($domAry1, i, $domAry2, j) {
			$imgList.eq(i).show()
				.siblings().hide();
			$domAry2.eq(j).css("background", "#fff")
				.siblings().css("background", "#f0f0f0");
		}
	
	//页面载入开始自动轮播
	t = setInterval(function () {
		if (i == 6) {
			i = 0;
		}
		toggleShowStatus($imgList, i, $liList, i);
		i++;
	}, 3000);

	//鼠标悬停切换轮播状态 移出鼠标开始自动轮播
	$(".hover_btn li").hover(function () {
		clearInterval(t);
		i = $(this).index();
		toggleShowStatus($imgList, i, $liList, i);
	}, function () {
		t = setInterval(function () {
			if (i == 6) {
				i = 0;
			} else {
				i++;
			}
			toggleShowStatus($imgList, i, $liList, i);
		}, 3000);
	});
})();

//切换选项卡函数
(function () {
	var $tabLi = $(".tab_group li"),
		$tabDiv = $(".tab");
	$tabLi.hover(function () {
		var i = $(this).index();
		$tabLi.eq(i).addClass("tab_underline").siblings().removeClass("tab_underline");
		$tabDiv.eq(i).show().siblings(".tab").hide();
		console.log(i++);
	}, function () {});
})();

//切换图片透明度
(function () {
	var $imgWrapper = $(".wallpaper_info");
	$imgWrapper.hover(function (e) {
		if (e.target.nodeName !== "IMG") {
			return;
		} else {
			$(e.target).animate({
				opacity: 0.9
			});
		}
	}, function (e) {
		if (e.target.nodeName !== "IMG") {
			return;
		} else {
			$(e.target).animate({
				opacity: 1
			});
		}
	});
})();

//月历鼠标悬停效果
(function () {
	var $littleImgList = $(".calendar_paper li").find(".little_img"),
		$seeCountList = $littleImgList.parent().siblings(".see_count"),
		$numberList = $littleImgList.parent().siblings(".number"),
		$littleImgList2 = $(".calendar_paper2 li").find(".little_img"),
		$seeCountList2 = $littleImgList2.parent().siblings(".see_count"),
		$numberList2 = $littleImgList2.parent().siblings(".number");
	/*$(".calendar_paper li").hover(function() {
        //i存放元素的下标
        var i = $(this).index(),
            $list = $littleImgList,
            $list2 = $seeCountList,
            $activeImg,
            $activeSpan;
        $activeImg = $(splice($list,i,1)).addClass("hover_little_img").removeClass("little_img");
        $list.removeClass("hover_little_img");
        splice($list,i,0,$activeImg);
        $activeSpan = $(splice($list2,i,1)).addClass("hover_see_count").removeClass("see_count");
        $list2.removeClass("hover_see_count");
        splice($list,i,0,$activeSpan);
    },function() {});*/
	/*//第一部分
	$(".calendar_paper li").hover(function () {
	    var i = $(this).index(),
	        j = $littleImgList.length;
	    $littleImgList.eq(i).addClass("hover_little_img");
	    $seeCountList.eq(i).addClass("hover_see_count");
	    $numberList.eq(i).addClass("hover_number");
	    
	    //判断此元素是不是最后一个li元素，根据结果加上不同样式
	    if (i != j - 1) {
	        $(this).addClass("hover_li");
	    } else {
	        $(this).addClass("hover_last_li");
	    }

	    $(this).siblings("li").removeClass("hover_li hover_last_li");

	    for (; j--;) {

	        if (j !== i) {
	            $littleImgList.eq(j).removeClass("hover_little_img");
	            $seeCountList.eq(j).removeClass("hover_see_count");
	            $numberList.eq(j).removeClass("hover_number");
	        }
	    }
	}, function () {});*/
	//函数抽象化
	function setElemClass($jqElemSet1, $jqElemSet2, $jqElemSet3, $jqElemSet4, className1, className2, className3, className4, className5) {
		$($jqElemSet1).hover(function () {
			var i = $(this).index(),
				j = $jqElemSet2.length;
			$jqElemSet2.eq(i).addClass(className1);
			$jqElemSet3.eq(i).addClass(className2);
			$jqElemSet4.eq(i).addClass(className3);

			//判断此元素是不是最后一个li元素，根据结果加上不同样式
			if (i != j - 1) {
				$(this).addClass(className4);
			} else {
				$(this).addClass(className5);
			}

			$(this).siblings("li").removeClass(className4 + " " + className5);

			//循环遍历$jqElemSet从1到3剩下的元素，移除样式
			for (; j--;) {

				if (j !== i) {
					$jqElemSet2.eq(j).removeClass(className1);
					$jqElemSet3.eq(j).removeClass(className2);
					$jqElemSet4.eq(j).removeClass(className3);
				}
			}
		},function() {});
	}
	setElemClass($(".calendar_paper li"), $littleImgList, $seeCountList, $numberList, "hover_little_img", "hover_see_count", "hover_number", "hover_li", "hover_last_li");
	setElemClass($(".calendar_paper2 li"), $littleImgList2, $seeCountList2, $numberList2, "hover_little_img", "hover_see_count", "hover_number", "hover_li", "hover_last_li");
	/*//第二部分
	$(".calendar_paper2 li").hover(function () {
	    var i = $(this).index(),
	        j = $littleImgList2.length;

	    if (i != j - 1) {
	        $(this).addClass("hover_li");
	    } else {
	        $(this).addClass("hover_last_li");
	    }

	    $littleImgList2.eq(i).addClass("hover_little_img");
	    $seeCountList2.eq(i).addClass("hover_see_count");
	    $numberList2.eq(i).addClass("hover_number");
	    $(this).siblings("li").removeClass("hover_li").removeClass("hover_li hover_last_li");
	    for (; j--;) {
	        if (j !== i) {
	            $littleImgList2.eq(j).removeClass("hover_little_img");
	            $seeCountList2.eq(j).removeClass("hover_see_count");
	            $numberList2.eq(j).removeClass("hover_number");
	        }
	    }
	}, function () {});*/
})();