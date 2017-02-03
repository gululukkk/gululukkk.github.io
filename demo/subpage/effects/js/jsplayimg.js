//原生JS图片轮播所有代码在这里！
function JSplayImg() {
	var img_Box = document.getElementsByClassName("img-box")[0],
		nav_li = document.getElementsByClassName("nav-circle")[0]
		.getElementsByTagName("li");
	//移除元素的class样式
	function removeClass(elem, class_name) {
		var old_class_name = elem.className;
		new_class_name = old_class_name.replace(class_name, "");
		elem.className = new_class_name;
	}
	//通过改变img-box的margin-left的值实现图片轮播效果
	function moveImg(elem, new_Place, time) {

		if (elem.animate) {
			clearTimeout(elem.animate);
		}

		var old_Place = parseInt(elem.style.marginLeft) || 0,
			dist = new_Place - old_Place;

		if (dist == 0) {
			return false;
		} else if (dist > 0) {
			old_Place += Math.ceil(dist / 10);
		} else {
			old_Place -= Math.ceil(-dist / 10);

		}

		elem.style.marginLeft = old_Place + "px";

		elem.animate = setTimeout(function () {
			moveImg(elem, new_Place, time);
		}, time);
	}
	//设置轮播时导航条li的样式加上on样式，以及移除兄弟元素的on样式
	function setNavliClassName(elem) {
		elem.className += " on";

		for (i = nav_li.length - 1; i >= 0; i--) {

			if (nav_li[i] != elem) {
				removeClass(nav_li[i], "on");
			}

		}
	}

	//自动轮播效果
	function autoMoveImg(elem) {
		var old_Place = parseInt(elem.style.marginLeft) || 0;

		if (-520 < old_Place && old_Place <= 0) {
			moveImg(img_Box, -520, 5);
			setNavliClassName(nav_li[1]);
		}

		if (-1040 < old_Place && old_Place <= -520) {
			moveImg(img_Box, -1040, 5);
			setNavliClassName(nav_li[2]);
		}

		if (-1560 < old_Place && old_Place <= -1040) {
			moveImg(img_Box, -1560, 5);
			setNavliClassName(nav_li[3]);
		}

		if (-2080 < old_Place && old_Place <= -1560) {
			moveImg(img_Box, -2080, 5);
			setNavliClassName(nav_li[4]);
		}

		if (old_Place == -2080) {
			moveImg(img_Box, 0, 5);
			setNavliClassName(nav_li[0]);
		}

	}
	//页面加载完成，运行自动轮播效果
	var time = setInterval(function () {
		autoMoveImg(img_Box);
	}, 2000);
	//鼠标移入时导航li时停止自动轮播，鼠标移出开始自动轮播
	for (i = nav_li.length - 1; i >= 0; i--) {

		nav_li[i].onmouseover = function () {
			clearInterval(time);
		}

		nav_li[i].onmouseout = function () {
			time = setInterval(function () {
				autoMoveImg(img_Box);
			}, 2000);
		}

	}
	//为导航li的鼠标点击事件加上轮播代码，点击导航li移动图片
	nav_li[0].onclick = function () {
		moveImg(img_Box, 0, 5);
		setNavliClassName(this);
	}

	nav_li[1].onclick = function () {
		moveImg(img_Box, -520, 5);
		setNavliClassName(this);
	}

	nav_li[2].onclick = function () {
		moveImg(img_Box, -1040, 5);
		setNavliClassName(this);
	}

	nav_li[3].onclick = function () {
		moveImg(img_Box, -1560, 5);
		setNavliClassName(this);
	}

	nav_li[4].onclick = function () {
		moveImg(img_Box, -2080, 5);
		setNavliClassName(this);
	}

}

JSplayImg();