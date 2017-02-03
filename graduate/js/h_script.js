var H = {
	//导航条的滑块效果
	slidebarEffect:(function() {
		var $slideBar = $('#topnav .mainnav .slidebar');
		var $navWraper = $('#topnav .mainnav');
		var eventType = 'mouseover';
		var isReset = true;
		
		var $subNav = $('#topnav .subnav');
		var toggleShowStatus = function($elem,isShow) {
			if (isShow === true) {
				$elem.show();
			} else {
				$elem.hide();
			}
		};
		var O = {
			run:function() {
				$navWraper.on(eventType,'.item',function() {
					var targetPosition = $(this).position();
					$slideBar.stop(true).animate(targetPosition,500);
					var index = $(this).index();
					toggleShowStatus($subNav,false);
					if (index == 0) {return;};
					var $currentSubNav = $subNav.eq(index-1);
					toggleShowStatus($currentSubNav,true);
				});
				if (isReset) {
					$navWraper.parent().on('mouseleave',function() {
						var slideBarInitalPosition = $navWraper.find('.item').eq(0).position();
						$slideBar.animate(slideBarInitalPosition);
						toggleShowStatus($subNav,false);
					});
				}
			},
		};
		return O;
	})(),
};
H.slidebarEffect.run();

$('#picture-show').slideBox({
	duration:0.3,
	delay:5,
	clickBarRadius:10
});