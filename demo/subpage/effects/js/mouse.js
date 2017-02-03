function followMouse() {
//鼠标离开导航条时滑动条回到初始位置
$(".mouse-follow").hover(function() {},function() {

	$(".mouse-follow > .slid").stop(true).animate({left:0,},100);

});
//当鼠标悬停在导航条某个a标签时滑动条移动到鼠标所在a标签
$(".mouse-follow > a").hover(function() {
	var a_Left = $(this).position().left;

	$(".mouse-follow > .slid").stop(true).animate({left:a_Left + "px",},100);

},function() {});

}

followMouse();